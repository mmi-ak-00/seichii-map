// 聖ちぃ巡礼マップ：ログインと「行ったにゃ」の保存（Cloudflare Pages Functions）
// 保存先: KV（変数名 USERS）。管理者は合言葉を扱いません（忘れたときは「再設定コード」で本人が再設定）。
const COOKIE = 'chii_s';
const SESSION_DAYS = 60;
const MAX_VISITED = 2000;
const ITER = 100000; // Workers の PBKDF2 は 100000 回まで

const enc = new TextEncoder();
const hex = (u8) => [...u8].map((b) => b.toString(16).padStart(2, '0')).join('');
const unhex = (s) => Uint8Array.from(s.match(/../g) || [], (h) => parseInt(h, 16));

function json(obj, status = 200, headers = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });
}
const fail = (status, error, message) => json({ ok: false, error, message }, status);

async function pbkdf2(pass, salt, iter) {
  const key = await crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: iter }, key, 256);
  return new Uint8Array(bits);
}
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i];
  return d === 0;
}
function normNick(n) { return String(n || '').normalize('NFKC').trim().toLowerCase(); }
function checkNick(n) {
  const s = String(n || '').normalize('NFKC').trim();
  if (!s) return 'ニックネームを入れてね。';
  if ([...s].length > 20) return 'ニックネームは20文字までだよ。';
  if (/[\u0000-\u001f\u007f<>"'&\\\/]/.test(s)) return 'ニックネームに使えない文字が入っているよ。';
  return '';
}
function checkPass(p) {
  const s = String(p || '');
  if (s.length < 6) return '合言葉は6文字以上にしてね。';
  if (s.length > 72) return '合言葉は72文字までだよ。';
  return '';
}
function cookieOf(req, name) {
  const c = req.headers.get('cookie') || '';
  const m = c.split(/;\s*/).find((x) => x.startsWith(name + '='));
  return m ? decodeURIComponent(m.slice(name.length + 1)) : '';
}
function setCookie(url, value, maxAge) {
  const secure = url.protocol === 'https:' ? '; Secure' : '';
  return `${COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secure}`;
}
function randomToken() { return hex(crypto.getRandomValues(new Uint8Array(24))); }

async function readBody(req) {
  const t = await req.text();
  if (t.length > 20000) throw new Error('big');
  return t ? JSON.parse(t) : {};
}
async function getUser(env, norm) {
  const t = await env.USERS.get('u:' + norm);
  return t ? JSON.parse(t) : null;
}
async function putUser(env, norm, u) { await env.USERS.put('u:' + norm, JSON.stringify(u)); }

async function session(env, req) {
  const tok = cookieOf(req, COOKIE);
  if (!tok || !/^[0-9a-f]{48}$/.test(tok)) return null;
  const s = await env.USERS.get('s:' + tok);
  if (!s) return null;
  const { n, v } = JSON.parse(s);
  const user = await getUser(env, n);
  if (!user || (user.ver || 0) !== v) return null;
  return { tok, norm: n, user };
}
async function startSession(env, url, norm, user) {
  const tok = randomToken();
  await env.USERS.put('s:' + tok, JSON.stringify({ n: norm, v: user.ver || 0 }), { expirationTtl: SESSION_DAYS * 86400 });
  return setCookie(url, tok, SESSION_DAYS * 86400);
}

// 失敗が続いたら、しばらく止める（総当たり対策）
async function tooMany(env, key, limit) {
  const v = parseInt((await env.USERS.get(key)) || '0', 10);
  return v >= limit;
}
async function bump(env, key, ttl) {
  const v = parseInt((await env.USERS.get(key)) || '0', 10) + 1;
  await env.USERS.put(key, String(v), { expirationTtl: ttl });
}

function okDate(d) { return typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d) && d >= '2000-01-01' && d <= '2100-12-31'; }
function cleanDates(o) {
  const out = {};
  if (!o || typeof o !== 'object') return out;
  let n = 0;
  for (const k of Object.keys(o)) {
    if (!k || k.length > 64 || !/^[\w.\-]+$/.test(k) || !okDate(o[k])) continue;
    out[k] = o[k]; if (++n >= MAX_VISITED) break;
  }
  return out;
}
function datesOf(u) {
  const vis = new Set(u.visited || []), out = {}, d = u.dates || {};
  for (const k of Object.keys(d)) if (vis.has(k)) out[k] = d[k];
  return out;
}

function cleanIds(arr) {
  const out = [];
  const seen = new Set();
  for (const x of Array.isArray(arr) ? arr : []) {
    if (typeof x !== 'string' || !x || x.length > 64 || !/^[\w.\-]+$/.test(x) || seen.has(x)) continue;
    seen.add(x); out.push(x);
    if (out.length >= MAX_VISITED) break;
  }
  return out;
}

const CODE_CH = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function makeCode() {
  const r = crypto.getRandomValues(new Uint8Array(16));
  let o = '';
  for (let i = 0; i < 16; i++) { o += CODE_CH[r[i] % 32]; if (i % 4 === 3 && i < 15) o += '-'; }
  return o;
}
const normCode = (c) => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
async function setCode(user) {
  const code = makeCode();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  user.rsalt = hex(salt);
  user.rhash = hex(await pbkdf2(normCode(code), salt, ITER));
  return code;
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const route = url.pathname.replace(/^\/api\/?/, '').replace(/\/+$/, '');
  const method = request.method;

  if (!env.USERS) return fail(503, 'not_configured', 'ログインの準備がまだ終わっていません。');

  if (method !== 'GET' && method !== 'HEAD') {
    const o = request.headers.get('origin');
    if (o && new URL(o).host !== url.host) return fail(403, 'bad_origin', '送り元が正しくありません。');
  }

  try {
    // ---- 自分の情報 ----
    if (route === 'me' && method === 'GET') {
      const s = await session(env, request);
      if (!s) return json({ ok: true, nick: null });
      return json({ ok: true, nick: s.user.nick, visited: s.user.visited || [], dates: datesOf(s.user) });
    }

    // ---- 新規登録 ----
    if (route === 'register' && method === 'POST') {
      const b = await readBody(request);
      const ne = checkNick(b.nick); if (ne) return fail(400, 'nick', ne);
      const pe = checkPass(b.pass); if (pe) return fail(400, 'pass', pe);
      const ip = request.headers.get('cf-connecting-ip') || 'x';
      if (await tooMany(env, 'r:' + ip, 10)) return fail(429, 'busy', '登録が多すぎます。しばらくしてからためしてね。');
      const norm = normNick(b.nick);
      if (await getUser(env, norm)) return fail(409, 'taken', 'そのニックネームは、もう使われているよ。別の名前にしてね。');
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const hash = await pbkdf2(String(b.pass), salt, ITER);
      const user = { nick: String(b.nick).normalize('NFKC').trim(), salt: hex(salt), hash: hex(hash), iter: ITER, ver: 0, created: Date.now(), visited: [] };
      await putUser(env, norm, user);
      await bump(env, 'r:' + ip, 3600);
      const code = await setCode(user);
      await putUser(env, norm, user);
      const ck = await startSession(env, url, norm, user);
      return json({ ok: true, nick: user.nick, visited: [], code }, 200, { 'set-cookie': ck });
    }

    // ---- ログイン ----
    if (route === 'login' && method === 'POST') {
      const b = await readBody(request);
      const norm = normNick(b.nick);
      if (!norm || !b.pass) return fail(400, 'input', 'ニックネームと合言葉を入れてね。');
      if (await tooMany(env, 'f:' + norm, 5)) return fail(429, 'locked', '何回か間違えたので、10分ほど待ってからためしてね。');
      const user = await getUser(env, norm);
      let ok = false;
      if (user) {
        const h = await pbkdf2(String(b.pass), unhex(user.salt), user.iter || ITER);
        ok = safeEqual(h, unhex(user.hash));
      } else {
        await pbkdf2(String(b.pass), new Uint8Array(16), ITER); // 時間をそろえる
      }
      if (!ok) { await bump(env, 'f:' + norm, 600); return fail(401, 'wrong', 'ニックネームか合言葉が違います。'); }
      await env.USERS.delete('f:' + norm);
      const ck = await startSession(env, url, norm, user);
      return json({ ok: true, nick: user.nick, visited: user.visited || [], dates: datesOf(user) }, 200, { 'set-cookie': ck });
    }

    // ---- ログアウト ----
    if (route === 'logout' && method === 'POST') {
      const tok = cookieOf(request, COOKIE);
      if (/^[0-9a-f]{48}$/.test(tok)) await env.USERS.delete('s:' + tok);
      return json({ ok: true }, 200, { 'set-cookie': setCookie(url, '', 0) });
    }

    // ---- 行ったにゃ：1件 ----
    if (route === 'visited' && method === 'PUT') {
      const s = await session(env, request);
      if (!s) return fail(401, 'login', 'ログインが切れました。もう一度ログインしてね。');
      const b = await readBody(request);
      const ids = cleanIds([b.id]);
      if (!ids.length) return fail(400, 'id', 'スポットが正しくありません。');
      const set = new Set(s.user.visited || []);
      if (b.on) set.add(ids[0]); else set.delete(ids[0]);
      s.user.visited = [...set].slice(0, MAX_VISITED);
      const dts = s.user.dates || {};
      if (b.on && okDate(b.date)) dts[ids[0]] = b.date; else if (!b.on) delete dts[ids[0]];
      s.user.dates = dts;
      await putUser(env, s.norm, s.user);
      return json({ ok: true, count: s.user.visited.length });
    }

    // ---- 行ったにゃ：まとめて追加（この端末の記録を引き継ぐ） ----
    if (route === 'visited/merge' && method === 'POST') {
      const s = await session(env, request);
      if (!s) return fail(401, 'login', 'ログインが切れました。もう一度ログインしてね。');
      const b = await readBody(request);
      const set = new Set(s.user.visited || []);
      cleanIds(b.ids).forEach((x) => set.add(x));
      s.user.visited = [...set].slice(0, MAX_VISITED);
      const dts = s.user.dates || {}, add = cleanDates(b.dates);
      for (const k of Object.keys(add)) if (set.has(k) && !dts[k]) dts[k] = add[k];
      s.user.dates = dts;
      await putUser(env, s.norm, s.user);
      return json({ ok: true, visited: s.user.visited, dates: datesOf(s.user) });
    }

    // ---- 合言葉を忘れたとき：再設定コードで本人が再設定 ----
    if (route === 'recover' && method === 'POST') {
      const b = await readBody(request);
      const norm = normNick(b.nick);
      const pe = checkPass(b.pass); if (pe) return fail(400, 'pass', pe);
      if (!norm || !normCode(b.code)) return fail(400, 'input', 'ニックネームと再設定コードを入れてね。');
      if (await tooMany(env, 'f:' + norm, 5)) return fail(429, 'locked', '何回か間違えたので、10分ほど待ってからためしてね。');
      const user = await getUser(env, norm);
      let ok = false;
      if (user && user.rsalt) {
        const h = await pbkdf2(normCode(b.code), unhex(user.rsalt), ITER);
        ok = safeEqual(h, unhex(user.rhash));
      } else { await pbkdf2('x', new Uint8Array(16), ITER); }
      if (!ok) { await bump(env, 'f:' + norm, 600); return fail(401, 'wrong', 'ニックネームか再設定コードが違います。'); }
      const salt = crypto.getRandomValues(new Uint8Array(16));
      user.salt = hex(salt); user.hash = hex(await pbkdf2(String(b.pass), salt, ITER)); user.iter = ITER;
      user.ver = (user.ver || 0) + 1;
      const code = await setCode(user); // 使ったコードは無効。新しいコードに交換
      await putUser(env, norm, user);
      await env.USERS.delete('f:' + norm);
      const ck = await startSession(env, url, norm, user);
      return json({ ok: true, nick: user.nick, visited: user.visited || [], dates: datesOf(user), code }, 200, { 'set-cookie': ck });
    }

    // ---- 再設定コードを作り直す（ログイン中・合言葉が必要） ----
    if (route === 'newcode' && method === 'POST') {
      const s = await session(env, request);
      if (!s) return fail(401, 'login', 'ログインが切れました。もう一度ログインしてね。');
      const b = await readBody(request);
      const h = await pbkdf2(String(b.pass || ''), unhex(s.user.salt), s.user.iter || ITER);
      if (!safeEqual(h, unhex(s.user.hash))) return fail(401, 'wrong', '合言葉が違います。');
      const code = await setCode(s.user);
      await putUser(env, s.norm, s.user);
      return json({ ok: true, code });
    }

    // ---- 退会（自分のデータを消す） ----
    if (route === 'leave' && method === 'POST') {
      const s = await session(env, request);
      if (!s) return fail(401, 'login', 'ログインが切れました。もう一度ログインしてね。');
      const b = await readBody(request);
      const h = await pbkdf2(String(b.pass || ''), unhex(s.user.salt), s.user.iter || ITER);
      if (!safeEqual(h, unhex(s.user.hash))) return fail(401, 'wrong', '合言葉が違います。');
      await env.USERS.delete('u:' + s.norm);
      await env.USERS.delete('s:' + s.tok);
      return json({ ok: true }, 200, { 'set-cookie': setCookie(url, '', 0) });
    }

    return fail(404, 'not_found', 'ページが見つかりません。');
  } catch (e) {
    return fail(400, 'bad_request', '送られた内容が正しくありません。');
  }
}
