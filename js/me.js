(function () {
  'use strict';
  var STORE = 'chii-visited-v1', API = '/api/';
  var REG = [["hokkaido", "北海道"], ["tohoku", "東北"], ["kanto", "関東"], ["chubu", "中部"], ["kinki", "近畿"], ["chugoku-shikoku", "中国・四国"], ["kyushu-okinawa", "九州・沖縄"], ["other", "その他"]];
  var root = document.getElementById('me-root');
  function hash(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36); }
  function idOf(s) { return s.id || ('n' + hash(s.name)); }
  function spots() { return window.SPOTS || []; }
  function readLocal() { try { return JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) { return {}; } }
  function writeLocal(o) { try { localStorage.setItem(STORE, JSON.stringify(o)); } catch (e) {} }
  function call(path, method, body) {
    return fetch(API + path, { method: method, credentials: 'same-origin', headers: body ? { 'content-type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined })
      .then(function (r) { return r.json().catch(function () { return { ok: false, message: 'うまく通信できませんでした。' }; }); })
      .catch(function () { return { ok: false, message: 'ネットにつながっていないみたい。' }; });
  }
  function h(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
  function card(title) { var c = h('section', 'me-card'); if (title) { var p = h('h2', 'pill', title); c.appendChild(p); } return c; }
  var nick = null, notConf = false;

  function mergeAndGo(r) {
    // この端末の「行ったにゃ」をアカウントに合流させてから、表示をそろえる
    var loc = readLocal(), mine = spots().filter(function (s) { return loc[s.name]; }).map(idOf);
    function fin(ids) {
      var set = {}; ids.forEach(function (i) { set[i] = 1; });
      var next = {}; spots().forEach(function (s) { if (set[idOf(s)]) next[s.name] = 1; });
      writeLocal(next); nick = r.nick; render();
    }
    if (mine.length) call('visited/merge', 'POST', { ids: mine }).then(function (m) { fin(m.ok ? m.visited : (r.visited || [])); });
    else fin(r.visited || []);
  }
  function showCode(code, then, title) {
    root.textContent = '';
    var c = card(title || '再設定コード');
    c.appendChild(h('p', 'me-hint', '合言葉を忘れたときに、このコードで自分で再設定できます。管理者にも見えないので、いま書き留めるかスクショしてね。この画面はもう一度は見られません。'));
    c.appendChild(h('p', 'me-code', code));
    var cp = h('button', 'me-sub', 'コピーする'); cp.type = 'button';
    cp.addEventListener('click', function () { try { navigator.clipboard.writeText(code); cp.textContent = 'コピーしたよ'; } catch (e) {} });
    c.appendChild(cp);
    var lb = h('label'); lb.style.cssText = 'display:flex;gap:8px;align-items:center;margin-top:12px;font-weight:700';
    var ck = h('input'); ck.type = 'checkbox'; ck.style.cssText = 'width:auto;min-height:0';
    lb.appendChild(ck); lb.appendChild(document.createTextNode(' 控えました')); c.appendChild(lb);
    var ok = h('button', 'me-go', 'つぎへ'); ok.type = 'button'; ok.disabled = true;
    ck.addEventListener('change', function () { ok.disabled = !ck.checked; });
    ok.addEventListener('click', then);
    c.appendChild(ok); root.appendChild(c);
  }
  function afterAuth(r) { if (r.code) showCode(r.code, function () { mergeAndGo(r); }); else mergeAndGo(r); }

  function loginView(mode) {
    mode = mode || 'login'; root.textContent = '';
    var c = card('ログイン');
    var loc = readLocal(), n = Object.keys(loc).length;
    if (n) c.appendChild(h('p', 'me-loc', 'この端末には「行ったにゃ」が ' + n + '件あります。ログインすると、アカウントに引き継ぐよ。'));
    var tabs = h('div', 'me-tabs'); tabs.setAttribute('role', 'tablist');
    var tl = h('button', null, 'ログイン'), tr = h('button', null, 'はじめて');
    [tl, tr].forEach(function (t) { t.type = 'button'; t.setAttribute('role', 'tab'); tabs.appendChild(t); });
    c.appendChild(tabs);
    var f = h('form', 'me-f'); f.setAttribute('autocomplete', 'on');
    f.innerHTML = '<label for="me-n">ニックネーム</label><input id="me-n" type="text" name="username" autocomplete="username" maxlength="20" autocapitalize="off">'
      + '<label for="me-p">合言葉</label><input id="me-p" type="password" name="password" autocomplete="current-password" maxlength="72">'
      + '<p class="me-hint" id="me-h"></p><p class="me-msg" id="me-m" role="alert"></p><button class="me-go" type="submit"></button>';
    c.appendChild(f);
    var fg = h('button', 'me-sub', '合言葉を忘れたとき'); fg.type = 'button'; fg.addEventListener('click', recoverView); c.appendChild(fg);
    root.appendChild(c);
    var go = f.querySelector('.me-go'), msg = f.querySelector('#me-m'), hint = f.querySelector('#me-h'), pw = f.querySelector('#me-p');
    function setMode(m) {
      mode = m; tl.setAttribute('aria-selected', m === 'login'); tr.setAttribute('aria-selected', m === 'reg');
      go.textContent = m === 'reg' ? '登録する' : 'ログイン';
      pw.setAttribute('autocomplete', m === 'reg' ? 'new-password' : 'current-password');
      hint.textContent = m === 'reg'
        ? 'メールアドレスは要らないよ。合言葉は6文字以上。忘れたときは登録のあとに出る「再設定コード」で自分で再設定できます。この端末の「行ったにゃ」も引き継ぐよ。'
        : 'ほかの端末でも、同じニックネームと合言葉で続きから使えるよ。';
      msg.textContent = '';
    }
    tl.addEventListener('click', function () { setMode('login'); }); tr.addEventListener('click', function () { setMode('reg'); });
    setMode(mode);
    f.addEventListener('submit', function (e) {
      e.preventDefault(); go.disabled = true; msg.className = 'me-msg'; msg.textContent = '送っています…';
      call(mode === 'reg' ? 'register' : 'login', 'POST', { nick: f.querySelector('#me-n').value, pass: pw.value }).then(function (r) {
        if (!r.ok) { go.disabled = false; msg.textContent = r.message || 'うまくいきませんでした。'; return; }
        afterAuth(r);
      });
    });
  }
  function recoverView() {
    root.textContent = '';
    var c = card('合言葉の再設定');
    var f = h('form', 'me-f');
    f.innerHTML = '<label for="rc-n">ニックネーム</label><input id="rc-n" type="text" maxlength="20" autocapitalize="off" autocomplete="username">'
      + '<label for="rc-c">再設定コード</label><input id="rc-c" type="text" autocapitalize="characters" autocomplete="off" placeholder="XXXX-XXXX-XXXX-XXXX">'
      + '<label for="rc-p">新しい合言葉</label><input id="rc-p" type="password" autocomplete="new-password" maxlength="72">'
      + '<p class="me-hint">コードをなくしたときは、再設定できません。別のニックネームで新しく登録してね。</p><p class="me-msg" id="rc-m" role="alert"></p><button class="me-go" type="submit">再設定する</button>';
    c.appendChild(f);
    var bk = h('button', 'me-sub', 'もどる'); bk.type = 'button'; bk.addEventListener('click', function () { loginView('login'); }); c.appendChild(bk);
    root.appendChild(c);
    var msg = f.querySelector('#rc-m'), go = f.querySelector('.me-go');
    f.addEventListener('submit', function (e) {
      e.preventDefault(); go.disabled = true; msg.textContent = '送っています…';
      call('recover', 'POST', { nick: f.querySelector('#rc-n').value, code: f.querySelector('#rc-c').value, pass: f.querySelector('#rc-p').value }).then(function (r) {
        if (!r.ok) { go.disabled = false; msg.textContent = r.message || 'うまくいきませんでした。'; return; }
        afterAuth(r);
      });
    });
  }

  function recordsView() {
    root.textContent = '';
    var vis = readLocal(), all = spots(), mine = all.filter(function (s) { return vis[s.name]; });
    var total = all.length, done = mine.length;
    var c = card('巡礼の記録');
    if (nick) { var w = h('p', 'me-who', '🐱 ' + nick + ' さん'); c.appendChild(w); }
    else c.appendChild(h('p', 'me-loc', 'まだログインしていません。いまの記録は、この端末だけに保存されています。ログインすると、ほかの端末でも同じ記録が見られるよ。'));
    var sum = h('p', 'me-sum'); sum.appendChild(h('b', null, String(done))); sum.appendChild(document.createTextNode(' / ' + total + ' 件 行ったにゃ')); c.appendChild(sum);
    var bar = h('div', 'me-bar'); var bi = h('i'); bar.appendChild(bi); c.appendChild(bar);
    setTimeout(function () { bi.style.width = (total ? Math.round(done / total * 100) : 0) + '%'; }, 30);
    var rg = h('ul', 'me-rg');
    REG.forEach(function (r) {
      var t = all.filter(function (s) { return s.region === r[0]; }), d = t.filter(function (s) { return vis[s.name]; });
      if (!t.length) return;
      var li = h('li'); li.appendChild(h('span', null, r[1]));
      var b = h('div', 'me-bar'), i = h('i'); i.style.width = Math.round(d.length / t.length * 100) + '%'; b.appendChild(i); li.appendChild(b);
      li.appendChild(h('em', null, d.length + '/' + t.length)); rg.appendChild(li);
    });
    c.appendChild(rg);
    root.appendChild(c);

    var lc = card('行ったところ');
    if (!mine.length) lc.appendChild(h('p', 'me-empty', 'まだ記録がないにゃ。\nスポットの「行ったにゃ？」を押すと、ここに並びます。'));
    REG.forEach(function (r) {
      var g = mine.filter(function (s) { return s.region === r[0]; });
      if (!g.length) return;
      var gh = h('h3', 'me-gh', r[1]); gh.appendChild(h('span', null, g.length + '件')); lc.appendChild(gh);
      var ul = h('ul', 'me-sp');
      g.forEach(function (s) {
        var li = h('li'), t = h('span', 'nm', s.name);
        var ad = (Array.isArray(s.pref) ? s.pref.join('・') : (s.pref || s.address || ''));
        if (ad) t.appendChild(h('span', 'ad', ad));
        li.appendChild(t);
        var b = h('button', null, 'とりけす'); b.type = 'button';
        b.addEventListener('click', function () {
          var v = readLocal(); delete v[s.name]; writeLocal(v);
          if (nick) call('visited', 'PUT', { id: idOf(s), on: false });
          recordsView();
        });
        li.appendChild(b); ul.appendChild(li);
      });
      lc.appendChild(ul);
    });
    root.appendChild(lc);

    var ac = card(nick ? 'アカウント' : 'ログイン');
    if (!nick) {
      var lb = h('button', 'me-go', 'ログイン・はじめて'); lb.type = 'button'; lb.addEventListener('click', function () { loginView('login'); }); ac.appendChild(lb);
    } else {
      var msg = h('p', 'me-msg'); msg.setAttribute('role', 'alert');
      var out = h('button', 'me-go', 'ログアウト'); out.type = 'button';
      out.addEventListener('click', function () { call('logout', 'POST', {}).then(function () { writeLocal({}); nick = null; render(); }); });
      var nc = h('button', 'me-sub', '再設定コードを作り直す'); nc.type = 'button';
      nc.addEventListener('click', function () {
        var p = window.prompt('合言葉を入れてね。新しいコードを作ると、前のコードは使えなくなります。'); if (!p) return;
        call('newcode', 'POST', { pass: p }).then(function (r) { if (!r.ok) { msg.textContent = r.message || 'できませんでした。'; return; } showCode(r.code, render, '新しい再設定コード'); });
      });
      var lv = h('button', 'me-sub me-danger', '退会して記録を消す'); lv.type = 'button';
      lv.addEventListener('click', function () {
        if (!lv.getAttribute('data-ask')) { lv.setAttribute('data-ask', '1'); lv.textContent = 'もう一度おすと、合言葉を聞くよ'; return; }
        var p = window.prompt('退会します。記録はすべて消えて元に戻せません。合言葉を入れてね。'); if (!p) return;
        call('leave', 'POST', { pass: p }).then(function (r) { if (!r.ok) { msg.textContent = r.message || 'できませんでした。'; return; } writeLocal({}); nick = null; render(); });
      });
      ac.appendChild(out); ac.appendChild(nc); ac.appendChild(lv); ac.appendChild(msg);
    }
    root.appendChild(ac);
  }
  function render() { recordsView(); var s = document.getElementById('mn-nick'); if (s) s.textContent = nick ? '🐱 ' + nick + ' さん' : 'ログインして記録を残そう'; }

  root.appendChild(h('p', 'me-empty', '読みこみ中…'));
  call('me', 'GET').then(function (r) {
    if (r && r.ok && r.nick) {
      nick = r.nick;
      var set = {}; (r.visited || []).forEach(function (i) { set[i] = 1; });
      var next = {}; spots().forEach(function (s) { if (set[idOf(s)]) next[s.name] = 1; }); writeLocal(next);
    } else if (r && r.error === 'not_configured') notConf = true;
    render();
  });
})();
