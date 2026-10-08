(function () {
  'use strict';
  // チェーン店の「行った店舗」の記録と、店舗をえらぶ画面
  var BS = 'chii-br-v1', VS = 'chii-visited-v1', DS = 'chii-vdate-v1';
  function hash(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36); }
  function idOf(s) { return s.id || ('n' + hash(s.name)); }
  function spots() { return window.SPOTS || []; }
  function rd(k) { try { return JSON.parse(localStorage.getItem(k) || '{}') || {}; } catch (e) { return {}; } }
  function wr(k, o) { try { localStorage.setItem(k, JSON.stringify(o)); } catch (e) {} }
  function today() { var t = new Date(); return t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2) + '-' + ('0' + t.getDate()).slice(-2); }
  function regOf(s) { return (Array.isArray(s.branches) ? s.branches : []).filter(function (b) { return b && b.id && b.name; }); }
  function visitId(s, k) { return (!k || k === '_') ? idOf(s) : idOf(s) + '.' + k; }
  function clean(info) {
    var o = { n: String(info.n || '').slice(0, 40), a: String(info.a || '').slice(0, 120) };
    if (typeof info.x === 'number' && typeof info.y === 'number' && isFinite(info.x) && isFinite(info.y)) { o.x = +info.x.toFixed(5); o.y = +info.y.toFixed(5); }
    if (info.c) o.c = 1;
    return o;
  }
  function listOf(s) {
    var m = rd(BS)[s.name] || {};
    return Object.keys(m).map(function (k) { var e = m[k]; return { k: k, n: e.n || '', a: e.a || '', x: e.x, y: e.y, d: e.d || '', c: !!e.c }; });
  }
  function has(s) { return listOf(s).length > 0; }
  function sync(s, st) {
    var m = st[s.name] || {}, ks = Object.keys(m), v = rd(VS), d = rd(DS);
    if (!ks.length) { delete st[s.name]; delete v[s.name]; delete d[s.name]; }
    else {
      v[s.name] = 1; var mx = '';
      ks.forEach(function (k) { if ((m[k].d || '') > mx) mx = m[k].d; });
      if (mx) d[s.name] = mx; else delete d[s.name];
    }
    wr(BS, st); wr(VS, v); wr(DS, d);
  }
  function add(s, k, info, date) {
    var st = rd(BS), m = st[s.name] = st[s.name] || {};
    if (!Object.keys(m).length && rd(VS)[s.name]) m['_'] = { d: rd(DS)[s.name] || '' };   // 店舗を決めずに記録していた分を引き継ぐ
    var e = clean(info); e.d = date || today(); m[k] = e;
    sync(s, st); return e;
  }
  function remove(s, k) { var st = rd(BS); if (st[s.name]) delete st[s.name][k]; sync(s, st); }
  function setDate(s, k, d) { var st = rd(BS); if (st[s.name] && st[s.name][k]) { st[s.name][k].d = d; sync(s, st); } }
  function custKey(n, a) { return 'c' + hash(a + '|' + n); }

  // この端末の記録を、サーバーに送る形にする
  function localPayload() {
    var v = rd(VS), d = rd(DS), st = rd(BS), ids = [], dates = {}, places = {};
    spots().forEach(function (s) {
      if (!v[s.name]) return;
      var m = st[s.name], ks = m ? Object.keys(m) : [];
      if (!ks.length) { var i = idOf(s); ids.push(i); if (d[s.name]) dates[i] = d[s.name]; return; }
      ks.forEach(function (k) {
        var id = visitId(s, k), e = m[k]; ids.push(id);
        if (e.d) dates[id] = e.d;
        if (e.c) places[id] = clean(e);
      });
    });
    return { ids: ids, dates: dates, places: places };
  }
  // サーバーの記録を、この端末の記録にそろえる（変わったら true）
  function fromServer(ids, dates, places) {
    dates = dates || {}; places = places || {};
    var by = {}; spots().forEach(function (s) { by[idOf(s)] = s; });
    var ent = {}, plain = {};
    (ids || []).forEach(function (id) {
      var i = id.lastIndexOf('.');
      if (by[id]) { plain[by[id].name] = id; return; }
      if (i <= 0 || !by[id.slice(0, i)]) return;
      var s = by[id.slice(0, i)], k = id.slice(i + 1), info = null;
      var b = regOf(s).filter(function (x) { return x.id === k; })[0];
      if (b) info = { n: b.name, a: b.address || '', x: b.lon, y: b.lat };
      else if (places[id]) info = { n: places[id].n, a: places[id].a, x: places[id].x, y: places[id].y, c: 1 };
      if (!info) return;
      var e = clean(info); e.d = dates[id] || ''; (ent[s.name] = ent[s.name] || {})[k] = e;
    });
    var od = rd(DS), nv = {}, nd = {}, nb = {};
    spots().forEach(function (s) {
      var n = s.name, m = ent[n];
      if (m) {
        if (plain[n]) m['_'] = { d: dates[plain[n]] || '' };
        nv[n] = 1; nb[n] = m; var mx = '';
        Object.keys(m).forEach(function (k) { if ((m[k].d || '') > mx) mx = m[k].d; });
        if (mx) nd[n] = mx;
      } else if (plain[n]) { nv[n] = 1; var dd = dates[plain[n]] || od[n]; if (dd) nd[n] = dd; }
    });
    var before = JSON.stringify([rd(VS), rd(DS), rd(BS)]);
    wr(VS, nv); wr(DS, nd); wr(BS, nb);
    return before !== JSON.stringify([nv, nd, nb]);
  }

  /* ---------- 店舗をえらぶ画面 ---------- */
  var cssDone = false;
  function css() {
    if (cssDone) return; cssDone = true;
    var st = document.createElement('style');
    st.textContent = '.br-dlg{border:0;border-radius:22px;padding:0;width:min(94vw,400px);max-height:88vh;background:#fff;color:#5b4a55;box-shadow:0 12px 40px rgba(120,60,90,.3)}'
      + '.br-dlg::backdrop{background:rgba(90,50,70,.45)}'
      + '.br-in{padding:18px 16px 16px}.br-in h2{margin:0 0 2px;font-size:18px;color:var(--pink-d,#e0558a)}'
      + '.br-sub{margin:0 0 10px;font-size:13px;color:#8a7683}'
      + '.br-row{display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box;text-align:left;appearance:none;font:inherit;color:inherit;background:#fff6fa;border:2.5px solid var(--line,#f6cfe0);border-radius:16px;padding:10px 12px;margin:7px 0;cursor:pointer;min-height:48px}'
      + '.br-row[aria-pressed="true"]{background:#ffe3ee;border-color:var(--pink,#ff8fb8)}'
      + '.br-ck{flex:none;width:22px;height:22px;border-radius:50%;border:2.5px solid var(--pink,#ff8fb8);background:#fff;color:#fff;font-size:14px;line-height:17px;text-align:center;font-weight:800}'
      + '.br-row[aria-pressed="true"] .br-ck{background:var(--pink,#ff8fb8)}'
      + '.br-tx{flex:1;min-width:0;font-weight:800;font-size:15px}.br-tx small{display:block;font-weight:500;font-size:12px;color:#8a7683;margin-top:2px;word-break:break-all}'
      + '.br-d{flex:none;font-size:12px;color:#a37cae;font-weight:700}'
      + '.br-more,.br-x,.br-go2,.br-find{appearance:none;font:inherit;cursor:pointer}'
      + '.br-more{display:block;width:100%;margin-top:10px;padding:11px;border-radius:999px;border:2.5px dashed #c9a8e0;background:#fff;color:#7a55a8;font-weight:800;font-size:14px}'
      + '.br-x{display:block;width:100%;margin-top:10px;padding:11px;border-radius:999px;border:2px solid var(--line,#f6cfe0);background:#fff;color:#8a7683;font-weight:700;font-size:14px}'
      + '.br-go2{display:block;width:100%;margin-top:10px;padding:12px;border-radius:999px;border:0;background:var(--pink,#ff8fb8);color:#fff;font-weight:800;font-size:15px;box-shadow:0 4px 0 #e96aa0}'
      + '.br-go2:disabled{opacity:.5}'
      + '.br-add{margin-top:12px;padding-top:10px;border-top:2px dashed var(--line,#f6cfe0)}'
      + '.br-add label{display:block;font-size:13px;font-weight:700;margin:8px 0 4px}'
      + '.br-add input{width:100%;box-sizing:border-box;font:inherit;font-size:16px;padding:10px 12px;border:2.5px solid var(--line,#f6cfe0);border-radius:12px;color:inherit;background:#fff}'
      + '.br-find{margin-top:8px;padding:10px 16px;border-radius:999px;border:2.5px solid var(--pink,#ff8fb8);background:#fff;color:var(--pink-d,#e0558a);font-weight:800;font-size:14px}'
      + '.br-msg{min-height:18px;margin:8px 0 0;font-size:13px;color:#d33a64;line-height:1.5}.br-msg.ok{color:#2f8f5b}'
      + '.br-hit{background:#fff;border-style:solid}';
    document.head.appendChild(st);
  }
  function h(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
  function fmtD(d) { return d ? d.replace(/-/g, '/') : ''; }

  function openSheet(s, onChange) {
    css();
    var dlg = h('dialog', 'br-dlg'); document.body.appendChild(dlg);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () { if (dlg.parentNode) dlg.parentNode.removeChild(dlg); });
    function push(on, k, date, e) {
      if (window.ChiiAcct && ChiiAcct.push) ChiiAcct.push(s, on, date, k, e && e.c ? e : null);
      if (onChange) onChange();
    }
    function render() {
      dlg.textContent = '';
      var box = h('div', 'br-in'); dlg.appendChild(box);
      box.appendChild(h('h2', null, 'どの店舗に行きましたか？'));
      box.appendChild(h('p', 'br-sub', s.name + '　行った店舗にチェックを入れてください'));
      var cur = {}; listOf(s).forEach(function (e) { cur[e.k] = e; });
      var rows = [];
      regOf(s).forEach(function (b) { rows.push({ k: b.id, n: b.name, a: b.address || '', x: b.lon, y: b.lat }); });
      listOf(s).forEach(function (e) { if (e.c) rows.push({ k: e.k, n: e.n, a: e.a, x: e.x, y: e.y, c: 1 }); });
      if (cur['_']) rows.push({ k: '_', n: '店舗を決めずに記録した分', a: '' });
      if (!rows.length) box.appendChild(h('p', 'br-sub', 'まだ登録されている店舗がありません。下の「リストにない店舗」から足せます。'));
      rows.forEach(function (r) {
        var on = !!cur[r.k];
        var b = h('button', 'br-row'); b.type = 'button'; b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.appendChild(h('span', 'br-ck', on ? '✓' : ''));
        var tx = h('span', 'br-tx', r.n); if (r.a) tx.appendChild(h('small', null, r.a)); b.appendChild(tx);
        if (on && cur[r.k].d) b.appendChild(h('span', 'br-d', fmtD(cur[r.k].d)));
        b.addEventListener('click', function () {
          if (on) { remove(s, r.k); push(false, r.k, null, r); }
          else { var e = add(s, r.k, r, today()); push(true, r.k, e.d, e); }
          render();
        });
        box.appendChild(b);
      });
      var more = h('button', 'br-more', '＋ リストにない店舗を住所で追加する'); more.type = 'button';
      var area = h('div'); box.appendChild(more); box.appendChild(area);
      more.addEventListener('click', function () { more.hidden = true; addForm(area, render); });
      var x = h('button', 'br-x', 'とじる'); x.type = 'button'; x.addEventListener('click', function () { dlg.close(); }); box.appendChild(x);
    }
    function addForm(area, again) {
      var f = h('div', 'br-add');
      var l1 = h('label', null, '住所で探す'); l1.setAttribute('for', 'br-q');
      var q = h('input'); q.id = 'br-q'; q.maxLength = 100; q.placeholder = '例：東京都新宿区新宿3-1'; q.setAttribute('autocomplete', 'off');
      var fb = h('button', 'br-find', 'さがす'); fb.type = 'button';
      var msg = h('p', 'br-msg'); msg.setAttribute('role', 'status');
      var res = h('div');
      var l2 = h('label', null, '店舗の呼び名（なくてもOK）'); l2.setAttribute('for', 'br-n');
      var nm = h('input'); nm.id = 'br-n'; nm.maxLength = 30; nm.placeholder = '例：新宿三丁目店';
      var go = h('button', 'br-go2', 'この場所で「行ったにゃ」'); go.type = 'button'; go.disabled = true;
      var pick = null;
      [l1, q, fb, msg, res, l2, nm, go].forEach(function (e) { f.appendChild(e); });
      area.appendChild(f); q.focus();
      function setPick(p) { pick = p; go.disabled = !p; }
      function textOnly() {
        var a = q.value.trim(); if (!a) { msg.textContent = '住所を入れてください。'; return; }
        res.textContent = ''; setPick({ a: a }); msg.className = 'br-msg ok'; msg.textContent = '地図には出さず、入れた住所だけで記録します。';
      }
      fb.addEventListener('click', function () {
        var a = q.value.trim(); if (!a) { msg.className = 'br-msg'; msg.textContent = '住所を入れてください。'; return; }
        msg.className = 'br-msg'; msg.textContent = 'さがしています…'; res.textContent = ''; setPick(null);
        fetch('https://msearch.gsi.go.jp/address-search/AddressSearch?q=' + encodeURIComponent(a))
          .then(function (r) { return r.json(); })
          .then(function (j) {
            var list = (Array.isArray(j) ? j : []).filter(function (o) { return o && o.geometry && o.geometry.coordinates && o.properties; }).slice(0, 5);
            if (!list.length) { msg.textContent = '見つかりませんでした。住所を少し短くするか、'; var t = h('button', 'br-find', '住所だけで記録する'); t.type = 'button'; t.addEventListener('click', textOnly); res.appendChild(t); return; }
            msg.className = 'br-msg ok'; msg.textContent = '近いものをえらんでください。';
            list.forEach(function (o) {
              var b = h('button', 'br-row br-hit'); b.type = 'button'; b.setAttribute('aria-pressed', 'false');
              b.appendChild(h('span', 'br-ck', '')); b.appendChild(h('span', 'br-tx', o.properties.title || a));
              b.addEventListener('click', function () {
                Array.prototype.forEach.call(res.children, function (c) { c.setAttribute('aria-pressed', 'false'); c.firstChild.textContent = ''; });
                b.setAttribute('aria-pressed', 'true'); b.firstChild.textContent = '✓';
                setPick({ a: o.properties.title || a, x: +o.geometry.coordinates[0], y: +o.geometry.coordinates[1] });
              });
              res.appendChild(b);
            });
          })
          .catch(function () {
            msg.className = 'br-msg'; msg.textContent = 'うまく探せませんでした。通信を確認するか、';
            var t = h('button', 'br-find', '住所だけで記録する'); t.type = 'button'; t.addEventListener('click', textOnly); res.appendChild(t);
          });
      });
      go.addEventListener('click', function () {
        if (!pick) return;
        var n = nm.value.trim() || pick.a, k = custKey(n, pick.a);
        var e = add(s, k, { n: n, a: pick.a, x: pick.x, y: pick.y, c: 1 }, today());
        push(true, k, e.d, e); again();
      });
    }
    render(); dlg.showModal();
  }

  window.ChiiBr = {
    idOf: idOf, visitId: visitId, list: listOf, has: has, add: add, remove: remove, setDate: setDate,
    registered: regOf, localPayload: localPayload, fromServer: fromServer, openSheet: openSheet, today: today
  };
})();
