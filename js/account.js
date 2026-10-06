(function () {
  'use strict';
  var STORE = 'chii-visited-v1';
  var API = '../api/';
  var nick = null;
  var ready = false;

  function hash(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36); }
  function idOf(s) { return s.id || ('n' + hash(s.name)); }
  function allSpots() { return window.SPOTS || []; }
  function readLocal() { try { return JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) { return {}; } }
  function writeLocal(o) { try { localStorage.setItem(STORE, JSON.stringify(o)); } catch (e) {} }
  function localIds() { var v = readLocal(); return allSpots().filter(function (s) { return v[s.name]; }).map(idOf); }

  function call(path, method, body) {
    return fetch(API + path, {
      method: method, credentials: 'same-origin',
      headers: body ? { 'content-type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined
    }).then(function (r) { return r.json().catch(function () { return { ok: false, message: 'うまく通信できませんでした。' }; }); })
      .catch(function () { return { ok: false, message: 'ネットにつながっていないみたい。' }; });
  }

  // サーバーの記録を、この端末の表示にそろえる（変わったときだけ再読み込み）
  function applyServer(ids) {
    var set = {}; ids.forEach(function (i) { set[i] = 1; });
    var next = {};
    allSpots().forEach(function (s) { if (set[idOf(s)]) next[s.name] = 1; });
    var cur = readLocal();
    var a = Object.keys(next).sort().join('\n'), b = Object.keys(cur).sort().join('\n');
    writeLocal(next);
    return a !== b;
  }

  /* ---------- 見た目 ---------- */
  var css = document.createElement('style');
  css.textContent = '.acct{margin-left:auto}.acct-btn{appearance:none;font:inherit;font-size:13px;font-weight:700;color:var(--pink-d,#e0558a);background:#fff;border:2.5px solid var(--line,#f6cfe0);border-radius:999px;padding:6px 12px;min-height:38px;cursor:pointer;box-shadow:0 3px 0 var(--line,#f6cfe0);max-width:46vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'
    + '.acct-btn:focus-visible{outline:3px solid var(--pink-d,#e0558a);outline-offset:2px}'
    + '.acct-dlg{border:0;border-radius:22px;padding:0;width:min(92vw,380px);background:#fff;color:#5b4a55;box-shadow:0 12px 40px rgba(120,60,90,.3)}'
    + '.acct-dlg::backdrop{background:rgba(90,50,70,.45)}'
    + '.acct-in{padding:18px 18px 16px}.acct-in h2{margin:0 0 10px;font-size:18px;color:var(--pink-d,#e0558a);text-align:center}'
    + '.acct-tabs{display:flex;gap:8px;margin-bottom:12px}.acct-tabs button{flex:1;appearance:none;font:inherit;font-weight:700;font-size:14px;border:2.5px solid var(--line,#f6cfe0);background:#fff;color:var(--pink-d,#e0558a);border-radius:999px;padding:8px;min-height:42px;cursor:pointer}'
    + '.acct-tabs button[aria-selected="true"]{background:var(--pink,#ff8fb8);border-color:var(--pink,#ff8fb8);color:#fff}'
    + '.acct-in label{display:block;font-size:13px;font-weight:700;margin:10px 0 4px}.acct-in input{width:100%;box-sizing:border-box;font:inherit;font-size:16px;padding:10px 12px;border:2.5px solid var(--line,#f6cfe0);border-radius:14px;min-height:44px}'
    + '.acct-hint{font-size:12px;color:#8a7683;margin:6px 0 0;line-height:1.5}.acct-msg{min-height:20px;font-size:13px;color:#d33a64;margin:10px 0 0;line-height:1.5}.acct-msg.ok{color:#2f8f5b}'
    + '.acct-go{width:100%;margin-top:12px;appearance:none;font:inherit;font-weight:800;font-size:16px;color:#fff;background:var(--pink,#ff8fb8);border:0;border-radius:999px;min-height:48px;box-shadow:0 4px 0 #f06fa0;cursor:pointer}.acct-go[disabled]{opacity:.6}'
    + '.acct-sub{width:100%;margin-top:10px;appearance:none;font:inherit;font-weight:700;font-size:14px;color:#8a7683;background:#fff;border:2px solid var(--line,#f6cfe0);border-radius:999px;min-height:42px;cursor:pointer}'
    + '.acct-danger{color:#d33a64}';
  document.head.appendChild(css);

  var top = document.querySelector('.rp-top');
  if (!top) return;
  var wrap = document.createElement('div'); wrap.className = 'acct';
  var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'acct-btn'; btn.textContent = 'ログイン';
  wrap.appendChild(btn); top.appendChild(wrap);

  var dlg = document.createElement('dialog'); dlg.className = 'acct-dlg';
  document.body.appendChild(dlg);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

  function paintBtn() { btn.textContent = nick ? '🐱 ' + nick : 'ログイン'; }
  function el(h) { var d = document.createElement('div'); d.innerHTML = h; return d; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }


  function showCode(code, then, title) {
    dlg.innerHTML = '';
    var box = el('<div class="acct-in"><h2>' + (title || '再設定コード') + '</h2>'
      + '<p class="acct-hint">合言葉を忘れたときに、このコードで自分で再設定できます。<b>管理者にも見えないので、いま書き留めるかスクショしてね。</b>この画面はもう一度は見られません。</p>'
      + '<p style="text-align:center;font-size:22px;font-weight:800;letter-spacing:1px;margin:14px 0;color:#e0558a;user-select:all" id="ac-c"></p>'
      + '<button class="acct-sub" type="button" id="ac-cp">コピーする</button>'
      + '<label style="display:flex;gap:8px;align-items:center;margin-top:12px;font-weight:700"><input type="checkbox" id="ac-ck" style="width:auto;min-height:0"> 控えました</label>'
      + '<button class="acct-go" type="button" id="ac-ok" disabled>つぎへ</button></div>').firstChild;
    dlg.appendChild(box);
    box.querySelector('#ac-c').textContent = code;
    box.querySelector('#ac-cp').addEventListener('click', function () { try { navigator.clipboard.writeText(code); this.textContent = 'コピーしたよ'; } catch (e) {} });
    var ck = box.querySelector('#ac-ck'), ok = box.querySelector('#ac-ok');
    ck.addEventListener('change', function () { ok.disabled = !ck.checked; });
    ok.addEventListener('click', then);
    if (!dlg.open) dlg.showModal();
  }
  function afterAuth(r) {
    nick = r.nick;
    var mine = localIds();
    var fin = function (ids) { applyServer(ids); location.reload(); };
    var go = function () {
      if (mine.length) call('visited/merge', 'POST', { ids: mine }).then(function (m) { fin(m.ok ? m.visited : (r.visited || [])); });
      else fin(r.visited || []);
    };
    if (r.code) showCode(r.code, go); else go();
  }
  function openRecover() {
    dlg.innerHTML = '';
    var box = el('<div class="acct-in"><h2>合言葉の再設定</h2>'
      + '<form><label for="rc-n">ニックネーム</label><input id="rc-n" maxlength="20" autocapitalize="off" autocomplete="username">'
      + '<label for="rc-c">再設定コード</label><input id="rc-c" autocapitalize="characters" autocomplete="off" placeholder="XXXX-XXXX-XXXX-XXXX">'
      + '<label for="rc-p">新しい合言葉</label><input id="rc-p" type="password" autocomplete="new-password" maxlength="72">'
      + '<p class="acct-hint">コードをなくしたときは、再設定できません。別のニックネームで新しく登録してね。</p><p class="acct-msg" id="rc-m" role="alert"></p>'
      + '<button class="acct-go" type="submit">再設定する</button></form>'
      + '<button class="acct-sub" type="button" id="rc-b">もどる</button></div>').firstChild;
    dlg.appendChild(box);
    var msg = box.querySelector('#rc-m'), go = box.querySelector('.acct-go');
    box.querySelector('#rc-b').addEventListener('click', function () { openLogin('login'); });
    box.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault(); go.disabled = true; msg.textContent = '送っています…';
      call('recover', 'POST', { nick: box.querySelector('#rc-n').value, code: box.querySelector('#rc-c').value, pass: box.querySelector('#rc-p').value }).then(function (r) {
        if (!r.ok) { go.disabled = false; msg.textContent = r.message || 'うまくいきませんでした。'; return; }
        r.code = r.code; afterAuth(r);
      });
    });
    if (!dlg.open) dlg.showModal();
  }

  function openLogin(mode) {
    mode = mode || 'login';
    dlg.innerHTML = '';
    var box = el('<div class="acct-in"><h2>ログイン</h2>'
      + '<div class="acct-tabs" role="tablist"><button type="button" role="tab" data-m="login">ログイン</button><button type="button" role="tab" data-m="reg">はじめて</button></div>'
      + '<form autocomplete="on"><label for="ac-n">ニックネーム</label><input id="ac-n" name="username" autocomplete="username" maxlength="20" autocapitalize="off">'
      + '<label for="ac-p">合言葉</label><input id="ac-p" name="password" type="password" autocomplete="current-password" maxlength="72">'
      + '<p class="acct-hint" id="ac-h"></p><p class="acct-msg" id="ac-m" role="alert"></p>'
      + '<button class="acct-go" type="submit"></button></form>'
      + '<button class="acct-sub" type="button" id="ac-fg">合言葉を忘れたとき</button>'
      + '<button class="acct-sub" type="button" id="ac-x">とじる</button></div>').firstChild;
    dlg.appendChild(box);
    box.querySelector('#ac-fg').addEventListener('click', openRecover);
    var tabs = box.querySelectorAll('.acct-tabs button'), go = box.querySelector('.acct-go'), msg = box.querySelector('#ac-m'), hint = box.querySelector('#ac-h'), pw = box.querySelector('#ac-p');
    function setMode(m) {
      mode = m;
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t.getAttribute('data-m') === m ? 'true' : 'false'); });
      go.textContent = m === 'reg' ? '登録する' : 'ログイン';
      pw.setAttribute('autocomplete', m === 'reg' ? 'new-password' : 'current-password');
      hint.textContent = m === 'reg'
        ? 'メールアドレスは要らないよ。合言葉は6文字以上。忘れたときは登録のあとに出る「再設定コード」で自分で再設定できます。この端末の「行ったにゃ」も引き継ぐよ。'
        : 'ほかの端末でも、同じニックネームと合言葉で続きから使えるよ。';
      msg.textContent = '';
    }
    tabs.forEach(function (t) { t.addEventListener('click', function () { setMode(t.getAttribute('data-m')); }); });
    box.querySelector('#ac-x').addEventListener('click', function () { dlg.close(); });
    setMode(mode);
    box.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      go.disabled = true; msg.className = 'acct-msg'; msg.textContent = '送っています…';
      call(mode === 'reg' ? 'register' : 'login', 'POST', { nick: box.querySelector('#ac-n').value, pass: pw.value }).then(function (r) {
        if (!r.ok) { go.disabled = false; msg.textContent = r.message || 'うまくいきませんでした。'; return; }
        afterAuth(r);
      });
    });
    dlg.showModal();
  }

  function openMenu() {
    dlg.innerHTML = '';
    var box = el('<div class="acct-in"><h2>🐱 ' + esc(nick) + ' さん</h2>'
      + '<p class="acct-hint" style="text-align:center">ログイン中。「行ったにゃ」はほかの端末でも同じになるよ。</p>'
      + '<p class="acct-msg" id="ac-m" role="alert"></p>'
      + '<button class="acct-go" type="button" id="ac-out">ログアウト</button>'
      + '<button class="acct-sub" type="button" id="ac-x">とじる</button>'
      + '<button class="acct-sub" type="button" id="ac-nc">再設定コードを作り直す</button>'
      + '<button class="acct-sub acct-danger" type="button" id="ac-leave">退会して記録を消す</button></div>').firstChild;
    dlg.appendChild(box);
    var msg = box.querySelector('#ac-m');
    box.querySelector('#ac-x').addEventListener('click', function () { dlg.close(); });
    box.querySelector('#ac-out').addEventListener('click', function () {
      call('logout', 'POST', {}).then(function () { writeLocal({}); nick = null; location.reload(); });
    });
    box.querySelector('#ac-nc').addEventListener('click', function () {
      var p = window.prompt('合言葉を入れてね。新しいコードを作ると、前のコードは使えなくなります。');
      if (!p) return;
      call('newcode', 'POST', { pass: p }).then(function (r) {
        if (!r.ok) { msg.textContent = r.message || 'できませんでした。'; return; }
        showCode(r.code, function () { dlg.close(); }, '新しい再設定コード');
      });
    });
    box.querySelector('#ac-leave').addEventListener('click', function () {
      var b = this;
      if (!b.getAttribute('data-ask')) { b.setAttribute('data-ask', '1'); b.textContent = 'もう一度おすと、合言葉を聞くよ'; return; }
      var p = window.prompt('退会します。記録はすべて消えて元に戻せません。合言葉を入れてね。');
      if (!p) return;
      call('leave', 'POST', { pass: p }).then(function (r) {
        if (!r.ok) { msg.textContent = r.message || 'できませんでした。'; return; }
        writeLocal({}); location.reload();
      });
    });
    dlg.showModal();
  }

  btn.addEventListener('click', function () { if (nick) openMenu(); else openLogin('login'); });

  // 「行ったにゃ」を押したとき、ログイン中ならサーバーにも保存
  window.ChiiAcct = {
    push: function (s, on) {
      if (!nick) return;
      call('visited', 'PUT', { id: idOf(s), on: !!on }).then(function (r) {
        if (!r.ok && r.error === 'login') { nick = null; paintBtn(); }
      });
    }
  };

  call('me', 'GET').then(function (r) {
    if (r && r.ok && r.nick) {
      nick = r.nick; paintBtn();
      if (applyServer(r.visited || [])) location.reload();
    } else if (r && r.error === 'not_configured') { wrap.hidden = true; }
  });
})();
