(function () {
  'use strict';

  // 更新ZIPに入れるサイトのファイル一覧（写真は spots.js から自動で集めます）。
  // サイトにファイルを足したときは、ここにも書き足してください。
  var SITE_FILES = [
    "README.txt",
    "admin/admin.css",
    "admin/admin.js",
    "admin/index.html",
    "admin/update.html",
    "css/style.css",
    "index.html",
    "js/account.js",
    "js/branch.js",
    "js/counts.js",
    "js/main.js",
    "js/me.js",
    "js/menu.js",
    "js/region.js",
    "js/share.js",
    "js/sharemap.js",
    "js/spots.js",
    "js/totop.js",
    "me.html",
    "photos/README.txt",
    "regions/chubu.html",
    "regions/chugoku-shikoku.html",
    "regions/hokkaido.html",
    "regions/kanto.html",
    "regions/kinki.html",
    "regions/kyushu-okinawa.html",
    "regions/other.html",
    "regions/tohoku.html"
  ];
  var REGIONS = [["hokkaido", "北海道"], ["tohoku", "東北"], ["kanto", "関東"], ["chubu", "中部"], ["kinki", "近畿"], ["chugoku-shikoku", "中国・四国"], ["kyushu-okinawa", "九州・沖縄"], ["other", "その他"]];

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  var NS = 'http://www.w3.org/2000/svg';

  var spots = [];          // 作業中のスポット一覧
  var loaded = false;
  var store = {};          // 新しく選んだ写真（ファイル名 -> Blob）
  var cur = [];            // フォームに出ている写真 [{name,url,isNew}]
  var editing = -1;        // 編集中のスポット（-1 は新規）
  var dirty = false;
  var pos = null;          // {lon,lat}
  var building = false;
  var dlUrl = null;
  var uid = 0;

  /* ---------- 読み込み ---------- */
  function fetchText(path) {
    return fetch(path, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error(path + ' ' + r.status);
      return r.text();
    });
  }
  var jsHeader = '';
  function loadSpots() {
    return fetchText('../js/spots.js').then(function (t) {
      var m = /^window\.SPOTS\s*=/m.exec(t);
      jsHeader = m ? t.slice(0, m.index) : '';
      var w = {};
      new Function('window', t)(w);
      spots = (w.SPOTS || []).map(function (s) { return JSON.parse(JSON.stringify(s)); });
      loaded = true;
      $('list-msg').textContent = '';
      renderList();
      $('b-build').disabled = false;
      ghUpdateButtons();
    }).catch(function () {
      $('list-msg').textContent = '登録ずみのスポットを読み込めませんでした。サイトに公開したあとのアドレスから、このページを開いてください。';
      $('b-build').disabled = true;
    });
  }

  /* ---------- 一覧 ---------- */
  function regionName(k) {
    for (var i = 0; i < REGIONS.length; i++) if (REGIONS[i][0] === k) return REGIONS[i][1];
    return k || '';
  }
  var filterText = '';
  var openRegs = {};   // 地方ごとの「ひらく／とじる」
  function renderList() {
    var box = $('list');
    box.textContent = '';
    $('q-wrap').hidden = spots.length < 6;
    if (!spots.length) {
      $('list-msg').textContent = 'まだスポットがありません。「＋ スポットを追加」から入れてね。';
      return;
    }
    var ft = filterText.trim().toLowerCase(), shown = 0;
    REGIONS.forEach(function (r) {
      var idx = [];
      spots.forEach(function (s, i) {
        if (s.region !== r[0]) return;
        if (ft && [s.name, s.address, worksOf(s).join(' '), s.note].join(' ').toLowerCase().indexOf(ft) < 0) return;
        idx.push(i);
      });
      if (!idx.length) return;
      shown += idx.length;
      var isOpen = ft ? true : (openRegs[r[0]] === undefined ? spots.length <= 6 : openRegs[r[0]]);
      var gh = el('h3', 'grp');
      var gb = el('button', 'grp-b'); gb.type = 'button';
      gb.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      gb.appendChild(el('span', 'grp-n', r[1]));
      gb.appendChild(el('span', 'grp-c', idx.length + '件'));
      gb.appendChild(el('span', 'grp-chev', '›'));
      (function (key) { gb.addEventListener('click', function () { if (ft) return; openRegs[key] = !(openRegs[key] === undefined ? spots.length <= 6 : openRegs[key]); renderList(); }); })(r[0]);
      gh.appendChild(gb); box.appendChild(gh);
      var ul = el('ul', 'rows');
      ul.hidden = !isOpen;
      idx.forEach(function (i) {
        var s = spots[i];
        var li = el('li');
        var b = el('button', 'row'); b.type = 'button';
        b.setAttribute('aria-label', s.name + ' を直す');
        var t = el('span', 'rt');
        t.appendChild(el('b', null, s.name));
        var sub = [s.chain ? 'チェーン店' : '', worksOf(s).join('・'), s.address].filter(Boolean).join(' ／ ');
        if (sub) t.appendChild(el('small', null, sub));
        b.appendChild(t);
        var np = (s.photos || []).length;
        if (np) b.appendChild(el('span', 'ph', '写真' + np));
        b.appendChild(el('span', 'chev', '›'));
        b.setAttribute('aria-hidden', 'false');
        b.addEventListener('click', function () { startEdit(i); });
        li.appendChild(b); ul.appendChild(li);
      });
      box.appendChild(ul);
    });
    if (!$('list-msg').getAttribute('data-keep')) $('list-msg').textContent = ft ? shown + '件 見つかりました' : 'スポット ' + spots.length + '件（タップして直す）';
    if (ft && !shown) $('list-msg').textContent = '見つかりませんでした。';
  }
  $('q').addEventListener('input', function () { filterText = this.value; $('list-msg').removeAttribute('data-keep'); renderList(); });

  /* ---------- 画面の切りかえ（一覧 ⇔ 追加・直す） ---------- */
  function inFormView() { return document.body.classList.contains('view-form'); }
  function showForm() {
    document.body.classList.add('view-form');
    if (location.hash !== '#form') { try { history.pushState(null, '', location.pathname + location.search + '#form'); } catch (e) { location.hash = '#form'; } }
    window.scrollTo(0, 0);
  }
  function showHome(msg) {
    document.body.classList.remove('view-form');
    if (location.hash === '#form') { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} }
    resetForm();
    var lm = $('list-msg');
    if (msg) { lm.textContent = msg; lm.setAttribute('data-keep', '1'); } else lm.removeAttribute('data-keep');
    renderList();
    if (msg) lm.setAttribute('data-keep', '1');
    window.scrollTo(0, 0);
  }
  window.addEventListener('popstate', function () {
    if (location.hash !== '#form' && inFormView()) { document.body.classList.remove('view-form'); resetForm(); renderList(); }
  });

  /* ---------- 削除の取り消し ---------- */
  var undoSpot = null, undoTimer = null;
  function showUndo(spot, index) {
    undoSpot = { spot: spot, index: index };
    var u = $('undo'); u.textContent = '';
    u.appendChild(document.createTextNode('「' + spot.name + '」を削除しました。 '));
    var b = el('button', 'btn', '元に戻す'); b.type = 'button';
    b.addEventListener('click', function () {
      if (!undoSpot) return;
      spots.splice(Math.min(undoSpot.index, spots.length), 0, undoSpot.spot);
      undoSpot = null; u.hidden = true; clearTimeout(undoTimer);
      setDirty(); renderList();
    });
    u.appendChild(b); u.hidden = false;
    clearTimeout(undoTimer);
    undoTimer = setTimeout(function () { undoSpot = null; u.hidden = true; cleanStore(); }, 20000);
  }

  /* ---------- 変更の状態 ---------- */
  function setDirty() {
    dirty = true;
    var d = $('dirty');
    d.textContent = '変更があります。「公開する」を押すと反映されます。';
    d.classList.add('on');
    $('dl').hidden = true;
    $('build-msg').textContent = '';
    $('pub-msg').textContent = ghReady() ? '' : '先に、下の「GitHubの設定」を済ませてね。';
  }
  window.addEventListener('beforeunload', function (e) {
    if (dirty) { e.preventDefault(); e.returnValue = ''; }
  });
  function referenced() {
    var m = {};
    spots.forEach(function (s) { (s.photos || []).forEach(function (n) { m[n] = 1; }); });
    if (undoSpot) (undoSpot.spot.photos || []).forEach(function (n) { m[n] = 1; });
    cur.forEach(function (p) { m[p.name] = 1; });
    return m;
  }
  function cleanStore() {
    var m = referenced();
    Object.keys(store).forEach(function (n) { if (!m[n]) delete store[n]; });
  }

  /* ---------- フォーム ---------- */
  function setPos(lon, lat, label) {
    pos = { lon: lon, lat: lat };
    $('f-lon').value = lon.toFixed(5);
    $('f-lat').value = lat.toFixed(5);
    $('pos-msg').textContent = (label ? label + ' ' : '') + '位置を決めました（経度 ' + lon.toFixed(4) + ' / 緯度 ' + lat.toFixed(4) + '）';
    drawMark();
  }



  /* ---------- 作品名・メニュー名（いくつでも） ---------- */
  function worksOf(s) {
    if (Array.isArray(s.works) && s.works.length) return s.works.filter(Boolean);
    return s.work ? [s.work] : [];
  }
  function addWorkRow(v) {
    var row = el('div', 'workrow');
    var i = document.createElement('input');
    i.type = 'text'; i.className = 'work-in'; i.autocomplete = 'off'; i.value = typeof v === 'string' ? v : '';
    i.placeholder = '例：いちごタルト（かき氷）'; i.setAttribute('aria-label', 'メニュー名');
    row.appendChild(i);
    var bar = el('div', 'work-bar');
    var up = el('button', 'btn', '↑'); up.type = 'button'; up.setAttribute('aria-label', '上へ');
    var dn = el('button', 'btn', '↓'); dn.type = 'button'; dn.setAttribute('aria-label', '下へ');
    var x = el('button', 'btn', '✕'); x.type = 'button'; x.setAttribute('aria-label', 'このメニューを消す');
    up.addEventListener('click', function () { var p = row.previousElementSibling; if (p) row.parentNode.insertBefore(row, p); });
    dn.addEventListener('click', function () { var n = row.nextElementSibling; if (n) row.parentNode.insertBefore(n, row); });
    x.addEventListener('click', function () { row.remove(); });
    bar.appendChild(up); bar.appendChild(dn); bar.appendChild(x);
    row.appendChild(bar);
    $('works').appendChild(row);
    return row;
  }
  function readWorks() {
    var out = [];
    Array.prototype.forEach.call($('works').querySelectorAll('.work-in'), function (i) { var t = i.value.trim(); if (t) out.push(t); });
    return out;
  }
  $('b-addwork').addEventListener('click', function () { addWorkRow().querySelector('input').focus(); });

  /* ---------- 引用先（いくつでも） ---------- */
  function srcsOf(s) {
    if (Array.isArray(s.sources) && s.sources.length) return s.sources;
    if (s.srcName || s.srcUrl || s.postDate) return [{ name: s.srcName || '', url: s.srcUrl || '', date: s.postDate || '' }];
    return [];
  }
  function addSrcRow(o) {
    o = o || {};
    var row = el('div', 'srcrow');
    function inp(cls, type, ph, val, label) {
      var i = document.createElement('input');
      i.type = type; i.className = cls; i.placeholder = ph; i.value = val || '';
      i.autocomplete = 'off'; i.setAttribute('aria-label', label);
      if (type === 'url') { i.inputMode = 'url'; i.autocapitalize = 'off'; }
      return i;
    }
    row.appendChild(inp('src-name', 'text', '名前（例：ちぃちゃんのInstagram）', o.name, '引用先の名前'));
    row.appendChild(inp('src-url', 'url', 'リンク（https://…）', o.url, '引用先のリンク'));
    var d = inp('src-date', 'date', '', o.date, '投稿日');
    row.appendChild(d);
    var bar = el('div', 'src-bar');
    var up = el('button', 'btn', '↑ 上へ'); up.type = 'button';
    var dn = el('button', 'btn', '↓ 下へ'); dn.type = 'button';
    up.addEventListener('click', function () { var p = row.previousElementSibling; if (p) row.parentNode.insertBefore(row, p); });
    dn.addEventListener('click', function () { var n = row.nextElementSibling; if (n) row.parentNode.insertBefore(n, row); });
    var x = el('button', 'btn src-x', '✕ 消す'); x.type = 'button';
    x.addEventListener('click', function () { row.remove(); });
    bar.appendChild(up); bar.appendChild(dn); bar.appendChild(x);
    row.appendChild(bar);
    $('srcs').appendChild(row);
    return row;
  }
  function readSrcs() {
    var out = [];
    Array.prototype.forEach.call($('srcs').querySelectorAll('.srcrow'), function (r) {
      var o = { name: r.querySelector('.src-name').value.trim(), url: r.querySelector('.src-url').value.trim(), date: r.querySelector('.src-date').value };
      if (o.name || o.url || o.date) out.push(o);
    });
    return out;
  }
  $('b-addsrc').addEventListener('click', function () { addSrcRow().querySelector('.src-name').focus(); });

  // チェーン店の店舗リスト
  function brId() { return 'b' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }
  function addBrRow(o) {
    o = o || {};
    var row = el('div', 'srcrow brrow');
    row.setAttribute('data-id', o.id || brId());
    if (isFinite(o.lon) && isFinite(o.lat)) { row.setAttribute('data-lon', o.lon); row.setAttribute('data-lat', o.lat); }
    function inp(cls, ph, val, label) {
      var i = document.createElement('input');
      i.type = 'text'; i.className = cls; i.placeholder = ph; i.value = val || ''; i.autocomplete = 'off'; i.setAttribute('aria-label', label);
      return i;
    }
    row.appendChild(inp('br-name', '店舗名（例：原宿店）', o.name, '店舗名'));
    row.appendChild(inp('br-addr', '住所（例：東京都渋谷区神宮前1-14-30）', o.address, '住所'));
    var st = el('p', 'hint br-pos', isFinite(o.lon) ? '位置：決まっています' : '位置：まだありません');
    var bar = el('div', 'src-bar');
    var fb = el('button', 'btn', '位置をさがす'); fb.type = 'button';
    fb.addEventListener('click', function () {
      var a = row.querySelector('.br-addr').value.trim();
      if (!a) { st.textContent = '先に住所を入れてね。'; return; }
      fb.disabled = true; st.textContent = 'さがしています…';
      fetch('https://msearch.gsi.go.jp/address-search/AddressSearch?q=' + encodeURIComponent(a))
        .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
        .then(function (j) {
          if (!j || !j.length || !j[0].geometry) { st.textContent = '見つかりませんでした。住所を少し変えてみてね。'; return; }
          var c = j[0].geometry.coordinates; row.setAttribute('data-lon', c[0]); row.setAttribute('data-lat', c[1]);
          st.textContent = '位置：決まりました（' + ((j[0].properties && j[0].properties.title) || a) + '）';
        })
        .catch(function () { st.textContent = '位置をさがせませんでした。'; })
        .then(function () { fb.disabled = false; });
    });
    row.querySelector('.br-addr').addEventListener('input', function () { row.removeAttribute('data-lon'); row.removeAttribute('data-lat'); st.textContent = '位置：まだありません（「位置をさがす」を押してね）'; });
    var x = el('button', 'btn src-x', '✕ 消す'); x.type = 'button';
    x.addEventListener('click', function () { row.remove(); });
    bar.appendChild(fb); bar.appendChild(x);
    row.appendChild(st); row.appendChild(bar);
    $('brs').appendChild(row);
    return row;
  }
  function readBrs() {
    var out = [];
    Array.prototype.forEach.call($('brs').querySelectorAll('.brrow'), function (r) {
      var n = r.querySelector('.br-name').value.trim(); if (!n) return;
      var o = { id: r.getAttribute('data-id'), name: n }, a = r.querySelector('.br-addr').value.trim();
      if (a) o.address = a;
      var lo = parseFloat(r.getAttribute('data-lon')), la = parseFloat(r.getAttribute('data-lat'));
      if (isFinite(lo) && isFinite(la)) { o.lon = +lo.toFixed(5); o.lat = +la.toFixed(5); }
      out.push(o);
    });
    return out;
  }
  $('b-addbr').addEventListener('click', function () { addBrRow().querySelector('.br-name').focus(); });

  var PREFS = {"other": ["北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島", "茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川", "新潟", "富山", "石川", "福井", "山梨", "長野", "岐阜", "静岡", "愛知", "三重", "滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山", "鳥取", "島根", "岡山", "広島", "山口", "徳島", "香川", "愛媛", "高知", "福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"], "tohoku": ["青森", "秋田", "岩手", "山形", "宮城", "福島"], "kanto": ["群馬", "栃木", "茨城", "埼玉", "東京", "神奈川", "千葉"], "chubu": ["長野", "新潟", "岐阜", "静岡", "愛知", "山梨", "富山", "石川", "福井"], "kinki": ["兵庫", "京都", "滋賀", "三重", "奈良", "和歌山", "大阪"], "chugoku-shikoku": ["鳥取", "島根", "岡山", "広島", "山口", "徳島", "香川", "愛媛", "高知"], "kyushu-okinawa": ["福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"]};
  var isOther = function () { return $('f-region').value === 'other'; };
  function prefsOf(s) { return Array.isArray(s.pref) ? s.pref.slice() : (s.pref ? [s.pref] : []); }
  function pickedPrefs() { return Array.prototype.map.call($('f-pref').querySelectorAll('input:checked'), function (i) { return i.value; }); }
  function fillPrefs(keep) {
    var box = $('f-pref'), list = PREFS[$('f-region').value] || [];
    var cur = keep !== undefined ? keep : pickedPrefs();
    box.textContent = '';
    list.forEach(function (n) {
      var l = document.createElement('label'), i = document.createElement('input');
      i.type = 'checkbox'; i.value = n; i.checked = cur.indexOf(n) >= 0;
      l.appendChild(i); l.appendChild(document.createTextNode(n)); box.appendChild(l);
    });
  }
  function pickedMore() { return Array.prototype.map.call($('f-more').querySelectorAll('input:checked'), function (i) { return i.value; }); }
  function fillMore(keep) {
    var box = $('f-more'), cur = keep !== undefined ? keep : pickedMore();
    box.textContent = '';
    (PREFS.other || []).forEach(function (n) {
      var l = document.createElement('label'), i = document.createElement('input');
      i.type = 'checkbox'; i.value = n; i.checked = cur.indexOf(n) >= 0;
      l.appendChild(i); l.appendChild(document.createTextNode(n)); box.appendChild(l);
    });
  }
  function syncChain() {
    var np = $('f-noplace').checked, on = np || $('f-region').value === 'other';
    $('wrap-pos').hidden = on;
    $('em-addr').hidden = on;
    fillPrefs();
    fillMore();
    $('wrap-more').hidden = !($('f-chain').checked && !isOther());
    $('wrap-br').hidden = !$('f-chain').checked;
    $('wrap-pref').hidden = !((np || isOther()) && (PREFS[$('f-region').value] || []).length);
  }
  $('f-chain').addEventListener('change', syncChain);
  $('f-noplace').addEventListener('change', syncChain);
  $('f-region').addEventListener('change', syncChain);
  function readPosInputs() {
    var lo = parseFloat($('f-lon').value), la = parseFloat($('f-lat').value);
    if (isFinite(lo) && isFinite(la) && lo > 120 && lo < 150 && la > 20 && la < 47) pos = { lon: lo, lat: la };
    else pos = null;
    if (pos) $('pos-msg').textContent = '位置を決めました（経度 ' + pos.lon.toFixed(4) + ' / 緯度 ' + pos.lat.toFixed(4) + '）';
    else $('pos-msg').textContent = '数字が正しくありません。経度は120〜150、緯度は20〜47の間で入れてね。';
    drawMark();
  }
  $('f-lon').addEventListener('change', readPosInputs);
  $('f-lat').addEventListener('change', readPosInputs);

  $('b-search').addEventListener('click', function () {
    var a = $('f-addr').value.trim();
    var m = $('pos-msg');
    if (!a) { m.textContent = '先に住所を入れてね。'; $('f-addr').focus(); return; }
    var b = $('b-search'); b.disabled = true; m.textContent = 'さがしています…';
    fetch('https://msearch.gsi.go.jp/address-search/AddressSearch?q=' + encodeURIComponent(a))
      .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
      .then(function (j) {
        if (!j || !j.length || !j[0].geometry) { m.textContent = '住所から見つかりませんでした。「地図でえらぶ」で位置を決めてね。'; return; }
        var c = j[0].geometry.coordinates;
        setPos(c[0], c[1], '「' + (j[0].properties && j[0].properties.title || a) + '」で');
      })
      .catch(function () { m.textContent = '位置をさがせませんでした。「地図でえらぶ」で位置を決めてね。'; })
      .then(function () { b.disabled = false; });
  });

  function projX(lon) { return 22 + (lon - 129.4) * 19.5; }
  function projY(lat) { return 28 + (45.7 - lat) * 22.5; }
  var pickSvg = null;
  function drawMark() {
    if (!pickSvg) return;
    var old = pickSvg.querySelector('#mark'); if (old) old.remove();
    if (!pos || pos.lat < 28) return;
    var vb = pickSvg.getAttribute('viewBox').split(' ').map(Number);
    var r = vb[2] / 330 * 8;
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('id', 'mark');
    g.setAttribute('transform', 'translate(' + projX(pos.lon).toFixed(1) + ' ' + projY(pos.lat).toFixed(1) + ')');
    var c = document.createElementNS(NS, 'circle');
    c.setAttribute('class', 'mark-c'); c.setAttribute('r', r.toFixed(2)); c.setAttribute('stroke-width', (r * 0.28).toFixed(2));
    var u = document.createElementNS(NS, 'use');
    u.setAttribute('href', '#paw'); u.setAttribute('fill', '#fff');
    u.setAttribute('x', (-r * 0.62).toFixed(2)); u.setAttribute('y', (-r * 0.62).toFixed(2));
    u.setAttribute('width', (r * 1.24).toFixed(2)); u.setAttribute('height', (r * 1.24).toFixed(2));
    g.appendChild(c); g.appendChild(u);
    pickSvg.appendChild(g);
  }
  function openPick() {
    var key = $('f-region').value, box = $('pickmap');
    box.hidden = false; box.textContent = '';
    box.appendChild(el('p', 'tip', '地図を読み込んでいます…'));
    fetchText('../regions/' + key + '.html').then(function (t) {
      var doc = new DOMParser().parseFromString(t, 'text/html');
      var svg = doc.getElementById('mini');
      if (!svg) throw new Error();
      var node = document.importNode(svg, true);
      node.removeAttribute('id');
      var pins = node.querySelector('#pins'); if (pins) pins.remove();
      node.setAttribute('role', 'img');
      node.setAttribute('aria-label', regionName(key) + 'の地図。タップして位置を決めます');
      node.addEventListener('click', function (e) {
        var pt = node.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
        var c = pt.matrixTransform(node.getScreenCTM().inverse());
        if (key === 'kyushu-okinawa' && c.y > 360) { $('pos-msg').textContent = '沖縄は、住所から位置をさがしてね。'; return; }
        setPos((c.x - 22) / 19.5 + 129.4, 45.7 - (c.y - 28) / 22.5);
      });
      box.textContent = '';
      box.appendChild(el('p', 'tip', '場所をタップしてね。やり直すときは、もう一度タップ。'));
      box.appendChild(node);
      pickSvg = node;
      drawMark();
    }).catch(function () {
      box.textContent = '';
      box.appendChild(el('p', 'tip', '地図を読み込めませんでした。「位置を数字で直す」から入れてね。'));
      pickSvg = null;
    });
  }
  $('b-pick').addEventListener('click', openPick);
  $('f-region').addEventListener('change', function () { if (!$('pickmap').hidden) openPick(); });

  /* 写真 */
  function resize(file) {
    return new Promise(function (res, rej) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        var w = img.naturalWidth, h = img.naturalHeight, s = Math.min(1, 1100 / Math.max(w, h));
        var cw = Math.max(1, Math.round(w * s)), ch = Math.max(1, Math.round(h * s));
        var c = document.createElement('canvas'); c.width = cw; c.height = ch;
        var x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, cw, ch); x.drawImage(img, 0, 0, cw, ch);
        URL.revokeObjectURL(url);
        c.toBlob(function (b) { b ? res(b) : rej(new Error()); }, 'image/jpeg', 0.82);
      };
      img.onerror = function () { URL.revokeObjectURL(url); rej(new Error()); };
      img.src = url;
    });
  }
  var curThumb = '';   // 一覧（たたんだ状態）のサムネにする写真。空なら1枚目
  function renderThumbs() {
    var ul = $('thumbs'); ul.textContent = '';
    cur.forEach(function (p, i) {
      var li = el('li');
      var img = el('img'); img.src = p.url; img.alt = '選んだ写真 ' + (i + 1);
      var b = el('button', null, '×'); b.type = 'button'; b.setAttribute('aria-label', '写真 ' + (i + 1) + ' をはずす');
      b.addEventListener('click', function () { if (curThumb === cur[i].name) curThumb = ''; cur.splice(i, 1); cleanStore(); renderThumbs(); });
      li.appendChild(img); li.appendChild(b);
      var mv = el('div', 'mv');
      var l = el('button', null, '‹'); l.type = 'button'; l.setAttribute('aria-label', '写真 ' + (i + 1) + ' を前へ');
      var r = el('button', null, '›'); r.type = 'button'; r.setAttribute('aria-label', '写真 ' + (i + 1) + ' を後ろへ');
      l.disabled = i === 0; r.disabled = i === cur.length - 1;
      l.addEventListener('click', function () { var t = cur[i]; cur[i] = cur[i - 1]; cur[i - 1] = t; renderThumbs(); });
      r.addEventListener('click', function () { var t = cur[i]; cur[i] = cur[i + 1]; cur[i + 1] = t; renderThumbs(); });
      mv.appendChild(l); mv.appendChild(el('span', null, String(i + 1))); mv.appendChild(r);
      li.appendChild(mv);
      var isTh = (curThumb ? curThumb === p.name : i === 0);
      var tb = el('button', 'th-b' + (isTh ? ' on' : ''), isTh ? '★ サムネ' : '☆ サムネに');
      tb.type = 'button'; tb.setAttribute('aria-pressed', isTh ? 'true' : 'false');
      tb.setAttribute('aria-label', '写真 ' + (i + 1) + ' を一覧のサムネにする');
      tb.addEventListener('click', function () { curThumb = p.name; renderThumbs(); });
      li.appendChild(tb);
      ul.appendChild(li);
    });
  }
  $('f-photos').addEventListener('change', function (e) {
    var files = Array.prototype.slice.call(e.target.files || []);
    e.target.value = '';
    var bad = 0;
    files.reduce(function (p, f) {
      return p.then(function () {
        if (!/^image\//.test(f.type)) { bad++; return; }
        return resize(f).then(function (blob) {
          var name = 'p' + Date.now().toString(36) + (uid++) + '.jpg';
          store[name] = blob;
          cur.push({ name: name, url: URL.createObjectURL(blob), isNew: true });
        }).catch(function () { bad++; });
      });
    }, Promise.resolve()).then(function () {
      renderThumbs();
      $('f-err').textContent = bad ? '読み込めない写真が ' + bad + '枚 ありました。' : '';
    });
  });

  function resetForm() {
    editing = -1; pos = null; cur = []; curThumb = '';
    $('works').textContent = '';
    $('f-chain').checked = false; $('f-noplace').checked = false; fillPrefs([]); fillMore([]); syncChain();
    $('srcs').textContent = ''; $('brs').textContent = '';
    ['f-name', 'f-addr', 'f-note', 'f-lon', 'f-lat', 'f-tabelog', 'f-hp', 'f-insta'].forEach(function (i) { $(i).value = ''; });
    $('pos-msg').textContent = 'まだ決まっていません。';
    $('f-err').textContent = '';
    $('mode').hidden = true; $('b-del').hidden = true; $('b-save').textContent = '追加する';
    $('t-form').textContent = 'スポットを追加';
    $('pickmap').hidden = true; $('pickmap').textContent = ''; pickSvg = null;
    renderThumbs(); cleanStore();
  }
  function startEdit(i) {
    var s = spots[i];
    resetForm();
    editing = i; openRegs[s.region] = true; curThumb = s.thumb || '';
    $('f-region').value = s.region;
    $('f-name').value = s.name || '';
    $('f-addr').value = s.address || '';
    worksOf(s).forEach(addWorkRow);
    $('f-note').value = s.note || '';
    $('f-tabelog').value = s.tabelog || ''; $('f-hp').value = s.hp || ''; $('f-insta').value = s.insta || '';
    $('f-chain').checked = !!s.chain;
    $('f-noplace').checked = !!s.noPlace || (!!s.chain && !s.address && !isFinite(s.lon));   // 前の形（チェーン店＝場所なし）も引き継ぐ
    fillPrefs(prefsOf(s)); fillMore(Array.isArray(s.more) ? s.more : []); syncChain();
    srcsOf(s).forEach(addSrcRow);
    (Array.isArray(s.branches) ? s.branches : []).forEach(addBrRow);
    if (isFinite(s.lon) && isFinite(s.lat)) setPos(+s.lon, +s.lat);
    cur = (s.photos || []).map(function (n) {
      return store[n] ? { name: n, url: URL.createObjectURL(store[n]), isNew: true } : { name: n, url: '../photos/' + encodeURI(n), isNew: false };
    });
    renderThumbs();
    $('mode').textContent = '「' + s.name + '」を直しています';
    $('mode').hidden = false; $('b-del').hidden = false; $('b-save').textContent = '直したら保存';
    $('t-form').textContent = 'スポットを直す';
    showForm();
  }
  $('b-cancel').addEventListener('click', function () { showHome(); });
  $('b-back').addEventListener('click', function () { showHome(); });
  $('b-new').addEventListener('click', function () { resetForm(); $('f-region').value = $('f-region').value; showForm(); });
  var delTimer = null;
  $('b-del').addEventListener('click', function () {
    var d = $('b-del');
    if (!d.classList.contains('sure')) {
      d.classList.add('sure'); d.textContent = '本当に削除する？';
      clearTimeout(delTimer); delTimer = setTimeout(function () { d.classList.remove('sure'); d.textContent = 'このスポットを削除'; }, 3500);
      return;
    }
    d.classList.remove('sure'); d.textContent = 'このスポットを削除';
    if (editing < 0) return;
    var idx = editing, gone = spots.splice(idx, 1)[0];
    editing = -1;
    showUndo(gone, idx);
    setDirty();
    showHome('「' + gone.name + '」を削除しました。');
  });

  $('spot-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var err = $('f-err');
    var name = $('f-name').value.trim(), addr = $('f-addr').value.trim();
    if (!loaded) { err.textContent = '登録ずみのスポットを読み込めていないので、保存できません。'; return; }
    if (!name) { err.textContent = 'スポット名を入れてね。'; $('f-name').focus(); return; }
    var isChain = $('f-chain').checked, noPlace = $('f-noplace').checked, loose = noPlace || $('f-region').value === 'other';
    if (!addr && !loose) { err.textContent = '住所を入れてね。'; $('f-addr').focus(); return; }
    var srcs = readSrcs();
    for (var k = 0; k < srcs.length; k++) {
      if (srcs[k].url && !/^https?:\/\/[^\s]+$/i.test(srcs[k].url)) { err.textContent = '引用先のリンクは、https:// から始まるアドレスを入れてね。'; var us = document.querySelectorAll('#srcs .src-url'); if (us[k]) us[k].focus(); return; }
    }
    var tb = $('f-tabelog').value.trim(), hpv = $('f-hp').value.trim(), igv = $('f-insta').value.trim();
    if ((tb && !/^https?:\/\/[^\s]+$/i.test(tb)) || (hpv && !/^https?:\/\/[^\s]+$/i.test(hpv)) || (igv && !/^https?:\/\/[^\s]+$/i.test(igv))) { err.textContent = '食べログ・ホームページ・Instagramのリンクは、https:// から始まるアドレスを入れてね。'; return; }
    readPosInputs();
    if (!pos && !loose) { err.textContent = '位置を決めてね。「住所から位置をさがす」か「地図でえらぶ」を押してね。'; return; }
    var s = {
      region: $('f-region').value, name: name, address: addr,
      works: readWorks(), note: $('f-note').value.trim(),
      sources: srcs,
      photos: cur.map(function (p) { return p.name; })
    };
    if (curThumb && s.photos.indexOf(curThumb) > 0) s.thumb = curThumb;
    if (tb) s.tabelog = tb;
    if (hpv) s.hp = hpv;
    if (igv) s.insta = igv;
    if (!srcs.length) delete s.sources;
    if (!s.works.length) delete s.works;
    if (isChain) { s.chain = true; var brs = readBrs(); if (brs.length) s.branches = brs; }
    if (noPlace) s.noPlace = true;
    if (noPlace || loose) { var pp = pickedPrefs(); if (pp.length) s.pref = pp.length === 1 ? pp[0] : pp; }
    if (isChain && !isOther()) { var mm = pickedMore(); if (mm.length) s.more = mm; }
    if (!noPlace && pos) { s.lon = +pos.lon.toFixed(5); s.lat = +pos.lat.toFixed(5); }
    openRegs[s.region] = true;
    var msg;
    function hs(t) { var h = 5381; for (var i = 0; i < t.length; i++) h = ((h << 5) + h + t.charCodeAt(i)) >>> 0; return h.toString(36); }
    if (editing >= 0) { s.id = spots[editing].id || ('n' + hs(spots[editing].name)); }
    else { s.id = 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }
    if (editing >= 0) { spots[editing] = s; msg = '「' + name + '」を直しました。'; }
    else { spots.push(s); msg = '「' + name + '」を追加しました。'; }
    setDirty();
    showHome(msg);
  });



  /* ---------- zip を読んで GitHub へ送る ---------- */
  function readZip(file) {
    return file.arrayBuffer().then(function (buf) {
      var dv = new DataView(buf), u8 = new Uint8Array(buf), n = u8.length, eocd = -1;
      for (var i = n - 22; i >= Math.max(0, n - 70000); i--) { if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; } }
      if (eocd < 0) throw new Error('zipとして読めませんでした。');
      var cnt = dv.getUint16(eocd + 10, true), off = dv.getUint32(eocd + 16, true), ents = [];
      for (var k = 0; k < cnt; k++) {
        if (dv.getUint32(off, true) !== 0x02014b50) throw new Error('zipの中身が壊れています。');
        var meth = dv.getUint16(off + 10, true), csz = dv.getUint32(off + 20, true), nl = dv.getUint16(off + 28, true), el = dv.getUint16(off + 30, true), cl = dv.getUint16(off + 32, true), lo = dv.getUint32(off + 42, true);
        var name = new TextDecoder().decode(u8.subarray(off + 46, off + 46 + nl));
        ents.push({ name: name, meth: meth, csz: csz, lo: lo });
        off += 46 + nl + el + cl;
      }
      return ents.reduce(function (pr, e) {
        return pr.then(function (acc) {
          if (/\/$/.test(e.name)) return acc;
          var ln = dv.getUint16(e.lo + 26, true), le = dv.getUint16(e.lo + 28, true), st = e.lo + 30 + ln + le;
          var raw = u8.subarray(st, st + e.csz), data;
          if (e.meth === 0) data = Promise.resolve(raw);
          else if (e.meth === 8) data = new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer().then(function (b) { return new Uint8Array(b); });
          else throw new Error('このzipの形式には対応していません。');
          return data.then(function (d) { acc.push({ path: e.name.replace(/^\.?\//, ''), data: d }); return acc; });
        });
      }, Promise.resolve([]));
    });
  }
  $('f-zip').addEventListener('change', function () { ghUpdateButtons(); });
  $('b-gh-zip').addEventListener('click', function () {
    var f = $('f-zip').files[0]; if (!f) return;
    $('pub-msg').textContent = 'zipを読んでいます…';
    readZip(f).then(function (ents) {
      var jobs = ents.filter(function (e) {
        return e.path && !/(^|\/)\.|__MACOSX/.test(e.path) && e.path !== 'js/spots.js' && !/^photos\//.test(e.path);
      }).map(function (e) { return { path: e.path, blob: new Blob([e.data]) }; });
      if (!jobs.some(function (j) { return j.path === 'index.html'; })) throw new Error('index.html が入っていません。サイトのzipか確認してね。');
      publish(false, jobs);
    }).catch(function (e) { $('pub-msg').textContent = (e && e.message) || 'zipを読めませんでした。'; });
  });

  /* ---------- GitHub へ公開 ---------- */
  var GH_KEY = 'chii-admin-gh-v1';
  var gh = { repo: '', branch: 'main', token: '' };
  try { var _g = JSON.parse(localStorage.getItem(GH_KEY) || 'null'); if (_g) gh = { repo: _g.repo || '', branch: _g.branch || 'main', token: _g.token || '' }; } catch (e) {}
  function ghSave() { try { localStorage.setItem(GH_KEY, JSON.stringify(gh)); } catch (e) {} }
  function ghReady() { return !!(gh.repo && gh.token && /^[\w.-]+\/[\w.-]+$/.test(gh.repo)); }
  $('f-gh-repo').value = gh.repo; $('f-gh-branch').value = gh.branch; $('f-gh-token').value = gh.token;
  function ghReadInputs() {
    gh.repo = $('f-gh-repo').value.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '').replace(/\/+$/, '');
    gh.branch = $('f-gh-branch').value.trim() || 'main';
    gh.token = $('f-gh-token').value.trim();
    $('f-gh-repo').value = gh.repo;
  }
  function ghUpdateButtons() {
    $('b-pub').disabled = !(ghReady() && loaded) || building;
    $('b-gh-full').disabled = !(ghReady() && loaded) || building;
    $('b-gh-zip').disabled = !(ghReady() && loaded) || building || !$('f-zip').files.length;
    if (!dirty && ghReady()) $('pub-msg').textContent = $('pub-msg').textContent || '';
  }
  function api(path, opt) {
    opt = opt || {};
    return fetch('https://api.github.com/repos/' + gh.repo + path, {
      method: opt.method || 'GET',
      headers: { 'Authorization': 'Bearer ' + gh.token, 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json' },
      body: opt.body ? JSON.stringify(opt.body) : undefined,
      cache: 'no-store'
    }).then(function (r) {
      if (r.ok) return r.json();
      return r.json().catch(function () { return {}; }).then(function (j) {
        var e = new Error((j && j.message) || ('HTTP ' + r.status)); e.status = r.status; e.where = (opt.method || 'GET') + ' ' + path; throw e;
      });
    });
  }
  function ghErr(e) {
    var st = e && e.status;
    var d = (e && e.where) ? '［詳細：' + e.where + ' → ' + e.status + ' ' + (e.message || '') + '］' : '';
    return ghErr0(e) + d;
  }
  function ghErr0(e) {
    var st = e && e.status;
    if (st === 401) return 'トークンが正しくないか、期限が切れています。新しいトークンを作って入れ直してね。';
    if (st === 403) return 'このトークンには権限がありません。「Contents」を「Read and write」にしたか確認してね。';
    if (st === 404) return 'リポジトリが見つかりません。「ユーザー名/リポジトリ名」と、トークンで選んだリポジトリを確認してね。';
    if (st === 409) return 'リポジトリが空のようです。「Add a README file」にチェックして作り直すか、README を1つ追加してね。';
    if (st === 422) return 'ブランチ名を確認してね（普通は main です）。';
    return '通信できませんでした（' + (e && e.message ? e.message : '不明なエラー') + '）。';
  }
  function blobToB64(blob) {
    return new Promise(function (res, rej) {
      var fr = new FileReader();
      fr.onload = function () { var s = String(fr.result); res(s.slice(s.indexOf(',') + 1)); };
      fr.onerror = function () { rej(new Error('read')); };
      fr.readAsDataURL(blob);
    });
  }
  function bytesToB64(u8) { return blobToB64(new Blob([u8])); }
  var EMPTY_TREE = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
  function headTree() {
    return api('/git/ref/heads/' + encodeURIComponent(gh.branch)).then(function (ref) {
      var sha = ref.object.sha;
      return api('/git/commits/' + sha).then(function (c) {
        if (c.tree.sha === EMPTY_TREE) return { commit: sha, tree: null, paths: {}, truncated: false };
        return api('/git/trees/' + c.tree.sha + '?recursive=1').then(function (t) {
          var paths = {}; (t.tree || []).forEach(function (n) { if (n.type === 'blob') paths[n.path] = n.sha; });
          return { commit: sha, tree: c.tree.sha, paths: paths, truncated: !!t.truncated };
        });
      });
    });
  }
  function publish(full, extra) {
    if (building || !loaded || !ghReady()) return;
    building = true; ghUpdateButtons();
    var msg = $('pub-msg');
    var jsText = spotsJs();
    try {
      var chk = {}; new Function('window', jsText)(chk);
      if (!chk.SPOTS || chk.SPOTS.length !== spots.length) throw new Error('count');
    } catch (e) { msg.textContent = 'スポットのデータを正しく作れませんでした。ページを開き直して、もう一度ためしてね。'; building = false; ghUpdateButtons(); return; }
    var head = null, files = [], dels = [];
    msg.textContent = 'GitHub につなげています…';
    headTree().then(function (h) {
      head = h;
      var needFull = full || !h.paths['index.html'];
      var refd = referenced();
      var jobs = [];
      jobs.push({ path: 'js/spots.js', text: jsText });
      (extra || []).forEach(function (j) { jobs.push(j); });
      if (needFull) SITE_FILES.forEach(function (p) { if (p !== 'js/spots.js' && !(extra || []).some(function (x) { return x.path === p; })) jobs.push({ path: p, fetch: true }); });
      Object.keys(refd).forEach(function (n) {
        var p = 'photos/' + n;
        if (h.paths[p]) return;
        if (store[n]) jobs.push({ path: p, blob: store[n] });
        else jobs.push({ path: p, fetch: true, photo: true });
      });
      if (!h.truncated) Object.keys(h.paths).forEach(function (p) {
        if (/^photos\//.test(p) && p !== 'photos/README.txt' && !refd[p.slice(7)]) dels.push(p);
      });
      var done = 0, skipped = [];
      return jobs.reduce(function (pr, j) {
        return pr.then(function () {
          msg.textContent = 'ファイルを送っています… ' + (++done) + ' / ' + jobs.length;
          var get;
          if (j.text != null) get = bytesToB64(new TextEncoder().encode(j.text));
          else if (j.blob) get = blobToB64(j.blob);
          else get = fetch('../' + encodeURI(j.path), { cache: 'no-store' }).then(function (r) {
            if (r.status === 404 && j.photo) { skipped.push(j.path); return null; }
            if (!r.ok) throw new Error(j.path + ' ' + r.status);
            return r.arrayBuffer().then(function (b) { return bytesToB64(new Uint8Array(b)); });
          });
          return get.then(function (b64) {
            if (b64 == null) return;
            return api('/git/blobs', { method: 'POST', body: { content: b64, encoding: 'base64' } }).then(function (b) {
              files.push({ path: j.path, mode: '100644', type: 'blob', sha: b.sha });
            });
          });
        });
      }, Promise.resolve()).then(function () { return skipped; });
    }).then(function (skipped) {
      var entries = files.slice();
      dels.forEach(function (p) { entries.push({ path: p, mode: '100644', type: 'blob', sha: null }); });
      msg.textContent = '公開の準備をしています…';
      return api('/git/trees', { method: 'POST', body: head.tree ? { base_tree: head.tree, tree: entries } : { tree: entries } }).then(function (t) {
        var d = new Date();
        return api('/git/commits', { method: 'POST', body: { message: '管理ページから更新 ' + d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()), tree: t.sha, parents: [head.commit] } });
      }).then(function (c) {
        return api('/git/refs/heads/' + encodeURIComponent(gh.branch), { method: 'PATCH', body: { sha: c.sha } }).then(function () { return { sha: c.sha, skipped: skipped }; });
      });
    }).then(function (r) {
      dirty = false;
      var dd = $('dirty'); dd.textContent = 'GitHub に送りました。'; dd.classList.remove('on');
      msg.textContent = 'GitHub に送りました。公開まで1〜2分かかります。';
      if (r.skipped.length) msg.textContent += ' ※見つからなかった写真があり、送っていません: ' + r.skipped.join(', ');
      watchLive(jsText);
    }).catch(function (e) {
      msg.textContent = ghErr(e) + '（まだ公開されていません）';
    }).then(function () { building = false; ghUpdateButtons(); });
  }
  var watchTimer = null;
  function watchLive(jsText) {
    clearInterval(watchTimer);
    var n = 0, msg = $('pub-msg');
    watchTimer = setInterval(function () {
      n++;
      fetch('../js/spots.js?t=' + Date.now(), { cache: 'no-store' }).then(function (r) { return r.ok ? r.text() : ''; }).then(function (t) {
        if (t === jsText) { clearInterval(watchTimer); msg.textContent = '公開されました ✓ サイトに反映されています。'; }
        else if (n > 40) { clearInterval(watchTimer); msg.textContent = 'GitHub には送れています。まだサイトに反映されていません。Cloudflare の Deployments で、ビルドが成功しているか確認してね。'; }
      }).catch(function () {});
    }, 8000);
  }
  $('b-pub').addEventListener('click', function () { publish(false); });
  $('b-gh-full').addEventListener('click', function () { publish(true); });
  $('b-gh-test').addEventListener('click', function () {
    ghReadInputs(); ghSave(); ghUpdateButtons();
    var m = $('gh-msg');
    if (!ghReady()) { m.textContent = '「ユーザー名/リポジトリ名」と「トークン」を入れてね。'; return; }
    m.textContent = 'つないでいます…';
    api('').then(function (r) {
      var can = r.permissions && r.permissions.push;
      return headTree().then(function (h) {
        m.textContent = '接続できました ✓ ' + r.full_name + '（' + gh.branch + '）' + (can === false ? ' ※書きこみ権限がないようです。' : '') +
          (h.paths['index.html'] ? ' サイトのファイルは入っています。' : ' まだサイトのファイルが入っていません。「サイト全体を送る」を押してね。');
        ghUpdateButtons();
      });
    }).catch(function (e) { m.textContent = ghErr(e); });
  });
  $('b-gh-clear').addEventListener('click', function () {
    gh = { repo: '', branch: 'main', token: '' };
    try { localStorage.removeItem(GH_KEY); } catch (e) {}
    $('f-gh-repo').value = ''; $('f-gh-branch').value = 'main'; $('f-gh-token').value = '';
    $('gh-msg').textContent = 'この端末から、設定を消しました。'; ghUpdateButtons();
  });

  /* ---------- 更新ZIP ---------- */
  var CRC = (function () {
    var t = [], c, n, k;
    for (n = 0; n < 256; n++) { c = n; for (k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
    return t;
  })();
  function crc32(u8) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < u8.length; i++) c = CRC[(c ^ u8[i]) & 255] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }
  function makeZip(files) {
    var enc = new TextEncoder(), parts = [], central = [], offset = 0, d = new Date();
    var time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
    var date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    files.forEach(function (f) {
      var nb = enc.encode(f.name), crc = crc32(f.data), size = f.data.length;
      var lh = new DataView(new ArrayBuffer(30));
      lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true); lh.setUint16(8, 0, true);
      lh.setUint16(10, time, true); lh.setUint16(12, date, true); lh.setUint32(14, crc, true);
      lh.setUint32(18, size, true); lh.setUint32(22, size, true); lh.setUint16(26, nb.length, true); lh.setUint16(28, 0, true);
      parts.push(new Uint8Array(lh.buffer), nb, f.data);
      var ch = new DataView(new ArrayBuffer(46));
      ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true); ch.setUint16(8, 0x0800, true);
      ch.setUint16(10, 0, true); ch.setUint16(12, time, true); ch.setUint16(14, date, true); ch.setUint32(16, crc, true);
      ch.setUint32(20, size, true); ch.setUint32(24, size, true); ch.setUint16(28, nb.length, true);
      ch.setUint32(42, offset, true);
      central.push(new Uint8Array(ch.buffer), nb);
      offset += 30 + nb.length + size;
    });
    var cd = 0; central.forEach(function (p) { cd += p.length; });
    var end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true);
    end.setUint32(12, cd, true); end.setUint32(16, offset, true);
    return new Blob(parts.concat(central, [new Uint8Array(end.buffer)]), { type: 'application/zip' });
  }

  function spotsJs() {
    var head = jsHeader || '// スポットのデータ\n\n';
    return head + 'window.SPOTS = ' + JSON.stringify(spots, null, 2) + ';\n';
  }
  function bytes(buf) { return new Uint8Array(buf); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function build() {
    if (building || !loaded) return;
    building = true;
    var btn = $('b-build'), msg = $('build-msg');
    btn.disabled = true; $('dl').hidden = true;
    var jsText = spotsJs();
    $('js-out').value = jsText;
    try {
      var chk = {};
      new Function('window', jsText)(chk);
      if (!chk.SPOTS || chk.SPOTS.length !== spots.length) throw new Error('count');
    } catch (e) {
      msg.textContent = 'スポットのデータを正しく作れませんでした。更新ファイルは作りません。ページを開き直して、もう一度ためしてね。';
      building = false; btn.disabled = false;
      return;
    }

    var photoNames = Object.keys(referenced());
    var jobs = [];
    SITE_FILES.forEach(function (p) { jobs.push({ path: p, kind: 'site' }); });
    photoNames.forEach(function (n) { jobs.push({ path: 'photos/' + n, kind: 'photo', name: n }); });

    var out = [], skipped = [], done = 0;
    jobs.reduce(function (p, j) {
      return p.then(function () {
        msg.textContent = 'ファイルを集めています… ' + (++done) + ' / ' + jobs.length;
        if (j.path === 'js/spots.js') { out.push({ name: j.path, data: new TextEncoder().encode(jsText) }); return; }
        if (j.kind === 'photo' && store[j.name]) {
          return store[j.name].arrayBuffer().then(function (b) { out.push({ name: j.path, data: bytes(b) }); });
        }
        return fetch('../' + encodeURI(j.path), { cache: 'no-store' }).then(function (r) {
          if (r.status === 404 && j.kind === 'photo') { skipped.push(j.name); return; }
          if (!r.ok) throw new Error(j.path + ' ' + r.status);
          return r.arrayBuffer().then(function (b) { out.push({ name: j.path, data: bytes(b) }); });
        });
      });
    }, Promise.resolve()).then(function () {
      var d = new Date();
      var fname = 'chii-site-' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + '-' + pad(d.getHours()) + pad(d.getMinutes()) + '.zip';
      var blob = makeZip(out);
      if (dlUrl) URL.revokeObjectURL(dlUrl);
      dlUrl = URL.createObjectURL(blob);
      var a = $('dl'); a.href = dlUrl; a.download = fname; a.hidden = false;
      var mb = (blob.size / 1048576).toFixed(1);
      msg.textContent = '更新ファイルができました（' + out.length + 'ファイル、' + mb + 'MB）。「ZIPを保存する」を押してね。' +
        (skipped.length ? ' ※見つからなかった写真があり、入れていません: ' + skipped.join(', ') : '');
      dirty = false;
      var dd = $('dirty'); dd.textContent = '更新ファイルを作りました。保存してアップロードすると公開されます。'; dd.classList.remove('on');
    }).catch(function (e) {
      msg.textContent = '更新ファイルを作れませんでした（' + (e && e.message ? e.message : '不明なエラー') + '）。通信を確認して、もう一度押してね。サイトのファイルが欠けたZIPは作りません。';
    }).then(function () { building = false; btn.disabled = false; });
  }
  $('b-build').addEventListener('click', build);
  $('b-build').disabled = true;

  loadSpots();
})();
