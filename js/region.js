(function () {
  'use strict';

  var key = document.body.getAttribute('data-page');
  var REGP = {"tohoku": ["青森", "秋田", "岩手", "山形", "宮城", "福島"], "kanto": ["群馬", "栃木", "茨城", "埼玉", "東京", "神奈川", "千葉"], "chubu": ["長野", "新潟", "岐阜", "静岡", "愛知", "山梨", "富山", "石川", "福井"], "kinki": ["兵庫", "京都", "滋賀", "三重", "奈良", "和歌山", "大阪"], "chugoku-shikoku": ["鳥取", "島根", "岡山", "広島", "山口", "徳島", "香川", "愛媛", "高知"], "kyushu-okinawa": ["福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"], "hokkaido": ["北海道"]};
  function PL0(s) { return Array.isArray(s.pref) ? s.pref : (s.pref ? [s.pref] : []); }
  // 「その他」で都道府県をえらんだお店も、その県がある地方のページに「その他」の印つきで出す
  function EX(s) { return s.region === 'other' ? PL0(s) : (Array.isArray(s.more) ? s.more : []); }
  function fromOther(s) {
    if (key === 'other' || s.region === key || !REGP[key]) return false;
    return EX(s).some(function (p) { return REGP[key].indexOf(p) >= 0; });
  }
  var spots = (window.SPOTS || []).filter(function (s) { return s.region === key || fromOther(s); });
  // ならび順：引用元の投稿日がいちばん古いものを、そのスポットの日付にして、新しい順（上が最近・下が昔）。
  // 日付のないスポットは日付のあるものの下。「その他」から来たお店は、いちばん下。
  function oldest(s) {
    var l = (Array.isArray(s.sources) && s.sources.length) ? s.sources : (s.postDate ? [{ date: s.postDate }] : []);
    var m = '';
    l.forEach(function (o) { var d = (o && /^\d{4}-\d{2}-\d{2}$/.test(o.date || '')) ? o.date : ''; if (d && (!m || d < m)) m = d; });
    return m;
  }
  spots = spots.map(function (s, i) { return [s, i, oldest(s), s.region !== key ? 1 : 0]; }).sort(function (a, b) {
    if (a[3] !== b[3]) return a[3] - b[3];
    if (!a[2] !== !b[2]) return a[2] ? -1 : 1;
    if (a[2] !== b[2]) return a[2] > b[2] ? -1 : 1;
    return a[1] - b[1];
  }).map(function (x) { return x[0]; });
  var STORE = 'chii-visited-v1';
  var WSTORE = 'chii-want-v1', want = {};
  try { want = JSON.parse(localStorage.getItem(WSTORE) || '{}') || {}; } catch (e) { want = {}; }
  function wsave() { try { localStorage.setItem(WSTORE, JSON.stringify(want)); } catch (e) {} }
  var visited = {};
  try { visited = JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) { visited = {}; }
  function save() { try { localStorage.setItem(STORE, JSON.stringify(visited)); } catch (e) {} }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  var NS = 'http://www.w3.org/2000/svg';
  function pawIcon() {
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('aria-hidden', 'true');
    var u = document.createElementNS(NS, 'use');
    u.setAttribute('href', '#paw');
    s.appendChild(u);
    return s;
  }

  var list = document.getElementById('spots');
  var empty = document.getElementById('empty');
  var nAll = document.getElementById('n-all');
  var nAll2 = document.getElementById('n-all2');
  var nDone = document.getElementById('n-done');

  function count() {
    var d = 0;
    spots.forEach(function (s) { if (visited[s.name]) d++; });
    nAll.textContent = spots.length;
    nAll2.textContent = spots.length;
    nDone.textContent = d;
  }

  function lightbox(src) {
    var b = el('button', 'lb');
    b.type = 'button';
    b.setAttribute('aria-label', '写真を閉じる');
    var img = el('img');
    img.src = src;
    img.alt = '';
    b.appendChild(img);
    function close() { document.removeEventListener('keydown', onKey); if (b.parentNode) b.parentNode.removeChild(b); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    b.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    document.body.appendChild(b);
    b.focus();
  }

  var cards = {}, pinEls = {}, pinParts = [], selected = null;
  function select(name, fromPin) {
    selected = (selected === name && !fromPin) ? null : name;
    if (fromPin && selected === null) selected = name;
    Object.keys(cards).forEach(function (k) {
      cards[k].classList.toggle('is-sel', k === selected);
      var hd = cards[k].querySelector('.spot-head');
      if (hd) hd.setAttribute('aria-expanded', k === selected ? 'true' : 'false');
    });
    Object.keys(pinEls).forEach(function (k) {
      var on = k === selected;
      pinEls[k].classList.toggle('is-sel', on);
      pinEls[k].setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on && pins) pins.appendChild(pinEls[k]);
    });
    if (fromPin && selected && cards[selected]) {
      var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      cards[selected].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    }
  }
  function paintPins() {
    Object.keys(pinEls).forEach(function (k) { pinEls[k].classList.toggle('is-done', !!visited[k]); });
  }

  function card(s) {
    var box = el('li', 'spot');
    var li = el('div', 'spot-body');
    cards[s.name] = box;

    // たたんだ状態：1枚目の写真（なければ肉球）とスポット名だけ
    var h3 = el('h3', 'sp-h');
    var head = el('button', 'spot-head');
    head.type = 'button';
    head.setAttribute('aria-expanded', 'false');
    var th = el('span', 'sp-th');
    function noPhoto() { th.textContent = ''; th.classList.add('is-none'); th.appendChild(pawIcon()); }
    if (s.photos && s.photos.length) {
      var ti = el('img');
      ti.alt = ''; ti.loading = 'lazy';
      var thName = (s.thumb && s.photos.indexOf(s.thumb) >= 0) ? s.thumb : s.photos[0];
      ti.src = '../photos/' + encodeURI(thName);
      ti.addEventListener('error', noPhoto);
      th.appendChild(ti);
    } else noPhoto();
    head.appendChild(th);
    head.appendChild(el('span', 'sp-nm', s.name));
    if (s.region !== key) head.appendChild(el('span', 'sp-oth', 'その他'));
    head.appendChild(el('span', 'sp-vd', '✓'));
    head.appendChild(el('span', 'sp-chev', '›'));
    head.addEventListener('click', function () { select(s.name, false); });
    h3.appendChild(head);
    box.appendChild(h3);

    if (s.photos && s.photos.length) {
      var ph = el('div', 'phs');
      s.photos.forEach(function (f) {
        var src = '../photos/' + encodeURI(f);
        var b = el('button');
        b.type = 'button';
        b.setAttribute('aria-label', s.name + ' の写真を大きく見る');
        var img = el('img');
        img.src = src;
        img.alt = s.name + ' の写真';
        img.loading = 'lazy';
        img.addEventListener('error', function () { if (b.parentNode) b.parentNode.removeChild(b); });
        b.appendChild(img);
        b.addEventListener('click', function () { lightbox(src); });
        ph.appendChild(b);
      });
      li.appendChild(ph);
    }

    var workList = (Array.isArray(s.works) && s.works.length) ? s.works : (s.work ? [s.work] : []);
    if (workList.length) {
      var tags = el('div', 'tags');
      workList.forEach(function (w) {
        if (!w) return;
        var tag = el('span', 'tag');
        tag.appendChild(pawIcon());
        tag.appendChild(document.createTextNode(w));
        tags.appendChild(tag);
      });
      li.appendChild(tags);
    }
    if (s.chain) li.appendChild(el('p', 'chain', '🏪 チェーン店'));
    if (PL(s).length && (s.noPlace || s.region === 'other')) li.appendChild(el('p', 'addr', PL(s).join('・')));
    if (s.address) li.appendChild(el('p', 'addr', s.address));
    if (s.region !== 'other' && EX(s).length) li.appendChild(el('p', 'addr', '店舗エリア一覧：' + EX(s).join('・')));
    if (s.note) li.appendChild(el('p', 'note-t', s.note));
    var srcList = (Array.isArray(s.sources) && s.sources.length) ? s.sources
      : ((s.srcName || s.srcUrl || s.postDate) ? [{ name: s.srcName, url: s.srcUrl, date: s.postDate }] : []);
    if (srcList.length) {
      var srcBox = el('div', 'srcs');
      srcList.forEach(function (o) {
        var src = el('p', 'src');
        src.appendChild(el('span', 'nw', '📎 引用：'));
        var bd = el('span', 'bd');
        var okUrl = /^https?:\/\//i.test(o.url || '');
        if (okUrl) {
          var sa = el('a', null, o.name || '引用先を見る');
          sa.href = o.url; sa.target = '_blank'; sa.rel = 'noopener noreferrer';
          bd.appendChild(sa);
        } else if (o.name) bd.appendChild(document.createTextNode(o.name));
        var pd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(o.date || '');
        if (pd) bd.appendChild(el('span', 'dt', (okUrl || o.name ? '（' : '') + '投稿日 ' + pd[1] + '年' + (+pd[2]) + '月' + (+pd[3]) + '日' + (okUrl || o.name ? '）' : '')));
        src.appendChild(bd);
        srcBox.appendChild(src);
      });
      li.appendChild(srcBox);
    }

    var act = el('div', 'act');
    var noSpot = s.noPlace || (s.chain && !s.address && typeof s.lon !== 'number');
    var q = encodeURIComponent(noSpot ? s.name : s.name + ' ' + (s.address || ''));
    var map = el('a', 'btn', noSpot ? '近くのお店をさがす ↗' : '地図アプリで開く ↗');
    map.href = 'https://www.google.com/maps/search/?api=1&query=' + q;
    map.target = '_blank';
    map.rel = 'noopener noreferrer';
    var row1 = el('div', 'act-r'), row2 = el('div', 'act-r');
    row1.classList.add('is-set');
    row1.appendChild(map);

    var v = el('button', 'btn btn-visit');
    v.type = 'button';
    function paint() {
      var on = !!visited[s.name];
      v.classList.toggle('is-done', on);
      box.classList.toggle('is-visited', on);
      v.setAttribute('aria-pressed', on ? 'true' : 'false');
      v.textContent = on ? '✓ 行ったにゃ♡' : '行ったにゃ？';
    }
    paint();
    v.addEventListener('click', function () {
      if (visited[s.name]) delete visited[s.name]; else visited[s.name] = 1;
      save(); paint(); count(); paintPins();
      if (window.ChiiAcct) window.ChiiAcct.push(s, !!visited[s.name]);
    });
    var pb = el('button', 'btn btn-pinned btn-pn');
    pb.type = 'button';
    function paintPn() {
      var on = !!want[s.name];
      pb.classList.toggle('is-done', on);
      box.classList.toggle('is-pinned', on);
      pb.setAttribute('aria-pressed', on ? 'true' : 'false');
      pb.textContent = '📌';
      pb.setAttribute('aria-label', on ? 'ピン留めを外す' : '行きたいところとしてピン留めする');
      pb.title = on ? 'ピン留め中（押すと外れます）' : 'ピン留めする（行きたいところを一覧の上に出します）';
    }
    paintPn();
    pb.addEventListener('click', function () {
      if (want[s.name]) delete want[s.name]; else want[s.name] = 1;
      var olds = {}, t0 = box.getBoundingClientRect().top;
      Object.keys(cards).forEach(function (k) { if (cards[k].offsetParent) olds[k] = cards[k].getBoundingClientRect().top; });
      wsave(); paintPn(); reorder();
      var d = box.getBoundingClientRect().top - t0;
      // 押したスポットは指の下のまま、ページがすーっと動いて、ほかのスポットが入れかわる
      var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (still || !d) { if (d) window.scrollBy(0, d); return; }
      var offs = {}; Object.keys(olds).forEach(function (k) { offs[k] = olds[k] - cards[k].getBoundingClientRect().top; });
      var y0 = window.pageYOffset, T0 = null, DUR = 450;
      Object.keys(offs).forEach(function (k) { cards[k].classList.add('is-flip'); if (cards[k] === box) box.classList.add('is-lift'); cards[k].style.transform = 'translateY(' + offs[k] + 'px)'; });
      function step(t) {
        if (T0 === null) T0 = t;
        var p = Math.min(1, (t - T0) / DUR), e = 1 - Math.pow(1 - p, 3);
        window.scrollTo(0, y0 + d * e);
        Object.keys(offs).forEach(function (k) { cards[k].style.transform = p < 1 ? 'translateY(' + (offs[k] * (1 - e)) + 'px)' : ''; if (p >= 1) { cards[k].classList.remove('is-flip'); cards[k].classList.remove('is-lift'); } });
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
    row1.appendChild(v);
    h3.appendChild(pb);
    [['tabelog', '食べログ'], ['hp', '🔗HP'], ['insta', 'Instagram']].forEach(function (k) {
      var u = s[k[0]];
      if (!u || !/^https?:\/\//i.test(u)) return;
      var a = el('a', 'btn btn-lk', k[1]);
      if (k[0] === 'tabelog') {
        a.insertAdjacentHTML('afterbegin', '<svg class="ic-bowl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 11h17a8.5 8.5 0 0 1-17 0z"/><path d="M9 20.5h6"/><path d="M8.5 7.5c0-1 .8-1.2.8-2.2M12 7.5c0-1 .8-1.2.8-2.2M15.5 7.5c0-1 .8-1.2.8-2.2"/></svg>');
      }
      if (k[0] === 'insta') {
        a.className = 'btn btn-lk btn-ig';
        a.insertAdjacentHTML('afterbegin', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>');
      }
      a.href = u; a.target = '_blank'; a.rel = 'noopener noreferrer';
      row2.appendChild(a);
    });
    if (row2.children.length) act.appendChild(row2);
    act.appendChild(row1);
    li.appendChild(act);
    box.appendChild(li);
    return box;
  }

  spots.forEach(function (s) { list.appendChild(card(s)); });
  // ピン留めしたスポットは、一覧のいちばん上へ（そのなかでは、いつもの並び順）
  var baseOrder = spots.slice();
  function reorder() {
    baseOrder.map(function (s, i) { return [s, i]; })
      .sort(function (a, b) { return (!!want[b[0].name] - !!want[a[0].name]) || (a[1] - b[1]); })
      .forEach(function (x) { list.appendChild(cards[x[0].name]); });
  }
  reorder();
  empty.hidden = spots.length > 0;
  list.hidden = spots.length === 0;
  count();

  // 地方の地図にピンを立てる（日本地図の描き方と同じ式で位置を決めます）
  var svg = document.getElementById('mini');
  var pins = document.getElementById('pins');
  if (svg && pins) {
    var vb = svg.getAttribute('viewBox').split(' ').map(Number);
    var vb0 = vb.slice();
    var r = vb[2] / 330 * 8;
    spots.forEach(function (s) {
      if (s.region !== key || typeof s.lon !== 'number' || typeof s.lat !== 'number') return;
      var x, y;
      if (s.lat < 28) {
        // 沖縄は左下の枠（別の縮尺）に描いているので、枠の中の位置に直す
        // 枠に描いているのは沖縄本島まわりだけ。ほかの島（宮古・石垣など）はピンを出しません
        if (s.region !== 'kyushu-okinawa' || s.lon < 127.4 || s.lon > 128.6 || s.lat < 25.9 || s.lat > 27.1) return;
        x = 59.7 + (s.lon - 127.64) * 53.0;
        y = 382 + (26.88 - s.lat) * 60.0;
      } else {
        x = 22 + (s.lon - 129.4) * 19.5;
        y = 28 + (45.7 - s.lat) * 22.5;
      }
      var g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'pin');
      g.setAttribute('role', 'button');
      g.setAttribute('tabindex', '0');
      g.setAttribute('aria-pressed', 'false');
      g.setAttribute('aria-label', s.name + ' のピン');
      g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')');
      var ring = document.createElementNS(NS, 'circle');
      ring.setAttribute('class', 'pin-ring');
      ring.setAttribute('r', r.toFixed(2));
      g.appendChild(ring);
      var body = document.createElementNS(NS, 'g');
      body.setAttribute('class', 'pin-body');
      var c = document.createElementNS(NS, 'circle');
      c.setAttribute('class', 'pin-c');
      c.setAttribute('r', r.toFixed(2));
      c.setAttribute('stroke-width', (r * 0.28).toFixed(2));
      var u = document.createElementNS(NS, 'use');
      u.setAttribute('href', '#paw');
      u.setAttribute('class', 'pin-p');
      u.setAttribute('x', (-r * 0.62).toFixed(2));
      u.setAttribute('y', (-r * 0.62).toFixed(2));
      u.setAttribute('width', (r * 1.24).toFixed(2));
      u.setAttribute('height', (r * 1.24).toFixed(2));
      body.appendChild(c);
      body.appendChild(u);
      g.appendChild(body);
      var hit = document.createElementNS(NS, 'circle');
      hit.setAttribute('class', 'pin-hit');
      hit.setAttribute('r', (r * 1.8).toFixed(2));
      g.appendChild(hit);
      g.addEventListener('click', function () { select(s.name, true); });
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(s.name, true); }
      });
      pinEls[s.name] = g;
      pinParts.push({ g: g, ring: ring, c: c, u: u, hit: hit });
      pins.appendChild(g);
    });
    paintPins();
  }

  // ===== 都道府県ごとの表示（地図タップ／ボタンで切りかえ、URLの # で共有できます） =====
  var hits = svg ? Array.prototype.slice.call(svg.querySelectorAll('.pref-hit')) : [];
  var labelsEl = svg ? Array.prototype.slice.call(svg.querySelectorAll('.pref-t')) : [];
  var curW = null, curPref = null, anim = null;
  function layoutPins(w) {
    var r = w / 330 * 8;
    pinParts.forEach(function (p) {
      p.ring.setAttribute('r', r.toFixed(2));
      p.c.setAttribute('r', r.toFixed(2));
      p.c.setAttribute('stroke-width', (r * 0.28).toFixed(2));
      p.u.setAttribute('x', (-r * 0.62).toFixed(2)); p.u.setAttribute('y', (-r * 0.62).toFixed(2));
      p.u.setAttribute('width', (r * 1.24).toFixed(2)); p.u.setAttribute('height', (r * 1.24).toFixed(2));
      p.hit.setAttribute('r', (Math.max(r * 1.8, w / 330 * 11)).toFixed(2));
    });
    var k = w / (vb0 ? vb0[2] : w);
    labelsEl.forEach(function (t) {
      var f = parseFloat(t.getAttribute('data-fs')) * Math.min(1, k) * 1.1;
      t.style.fontSize = f.toFixed(2) + 'px';
      t.style.strokeWidth = (f * 0.28).toFixed(2) + 'px';
    });
  }
  function setVB(v) {
    svg.setAttribute('viewBox', v.map(function (n) { return n.toFixed(2); }).join(' '));
    layoutPins(v[2]);
    svg.classList.toggle('zoomed', Math.abs(v[2] - vb0[2]) > 1);
  }
  function animateVB(to) {
    var from = svg.getAttribute('viewBox').split(' ').map(Number);
    if (anim) cancelAnimationFrame(anim);
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setVB(to); return; }
    var t0 = null, dur = 420;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      setVB(from.map(function (a, i) { return a + (to[i] - a) * e; }));
      if (p < 1) anim = requestAnimationFrame(step); else anim = null;
    }
    anim = requestAnimationFrame(step);
  }
  function PL(s) { return Array.isArray(s.pref) ? s.pref : (s.pref ? [s.pref] : []); }
  function floats(s) { return s.region === key && !PL(s).length && (s.noPlace || (s.chain && !s.address && typeof s.lon !== 'number')); }
  function prefOfSpot(s) {
    if (s.region !== key) return EX(s).slice();
    var base = prefBase(s), ex = EX(s);
    ex.forEach(function (p) { if (base.indexOf(p) < 0) base.push(p); });
    return base;
  }
  function prefBase(s) {
    if (PL(s).length) return PL(s).slice();
    var names = hits.map(function (h) { return h.getAttribute('data-pref'); });
    for (var i = 0; i < names.length; i++) {
      if (s.address && s.address.indexOf(names[i]) >= 0) return [names[i]];
    }
    if (typeof s.lat === 'number' && s.lat < 28) return ['沖縄'];
    if (typeof s.lon === 'number' && typeof s.lat === 'number' && svg) {
      var x = 22 + (s.lon - 129.4) * 19.5, y = 28 + (45.7 - s.lat) * 22.5;
      var pt = svg.createSVGPoint(); pt.x = x; pt.y = y;
      for (var j = 0; j < hits.length; j++) {
        if (hits[j].isPointInFill && hits[j].tagName === 'path' && hits[j].isPointInFill(pt)) return [hits[j].getAttribute('data-pref')];
      }
    }
    return [];
  }
  var prefOf = {};
  spots.forEach(function (s) { prefOf[s.name] = prefOfSpot(s); });

  var bar = null, chips = {};
  if (svg && hits.length) {
    bar = el('div', 'prefbar');
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', '都道府県でしぼりこむ');
    var all = el('button', 'pchip');
    all.type = 'button'; all.setAttribute('aria-pressed', 'true');
    all.appendChild(document.createTextNode('ぜんぶ'));
    var ab = el('b', null, String(spots.length)); all.appendChild(ab);
    all.addEventListener('click', function () { go(null); });
    bar.appendChild(all); chips[''] = all;
    hits.forEach(function (h) {
      var n = h.getAttribute('data-pref');
      var cnt = spots.filter(function (s) { return prefOf[s.name].indexOf(n) >= 0; }).length;
      var b = el('button', 'pchip' + (cnt ? '' : ' is-empty'));
      b.type = 'button'; b.setAttribute('aria-pressed', 'false');
      b.appendChild(document.createTextNode(n));
      b.appendChild(el('b', null, String(cnt)));
      b.addEventListener('click', function () { go(n); });
      bar.appendChild(b); chips[n] = b;
      h.addEventListener('click', function () { go(curPref === n ? null : n); });
    });
    svg.parentNode.insertBefore(bar, svg.nextSibling);
  }
  function go(n) {
    var h = n ? '#' + encodeURIComponent(n) : '#';
    if (location.hash === h || (!n && !location.hash)) apply(n); else location.hash = h;
  }
  function apply(n) {
    if (n && !chips[n]) n = null;
    curPref = n;
    Object.keys(chips).forEach(function (k) { chips[k].setAttribute('aria-pressed', (k === (n || '')) ? 'true' : 'false'); });
    hits.forEach(function (h) { h.classList.toggle('is-on', h.getAttribute('data-pref') === n); });
    labelsEl.forEach(function (t) { t.style.display = (n && t.textContent !== n) ? 'none' : ''; });
    var shown = 0, done = 0;
    spots.forEach(function (s) {
      var ok = !n || floats(s) || prefOf[s.name].indexOf(n) >= 0;
      cards[s.name].hidden = !ok;
      if (pinEls[s.name]) pinEls[s.name].style.display = ok ? '' : 'none';
      if (ok) { shown++; if (visited[s.name]) done++; }
    });
    if (selected && cards[selected] && cards[selected].hidden) select(selected, true);
    nAll.textContent = shown; nAll2.textContent = shown; nDone.textContent = done;
    empty.hidden = shown > 0;
    list.hidden = shown === 0;
    var big = empty.querySelector('.big');
    if (big) {
      if (!big.getAttribute('data-orig')) big.setAttribute('data-orig', big.textContent);
      big.textContent = (n && spots.length) ? n + 'には、まだスポットがないにゃ' : big.getAttribute('data-orig');
    }
    if (svg) {
      var target = vb0;
      if (n) {
        var hh = hits.filter(function (x) { return x.getAttribute('data-pref') === n; })[0];
        if (hh) target = hh.getAttribute('data-vb').split(' ').map(Number);
      }
      animateVB(target);
    }
  }
  var _count = count;
  count = function () { _count(); if (curPref !== null) { var s = 0, d = 0; spots.forEach(function (x) { if (floats(x) || prefOf[x.name].indexOf(curPref) >= 0) { s++; if (visited[x.name]) d++; } }); nAll.textContent = s; nAll2.textContent = s; nDone.textContent = d; } };
  function fromHash() {
    var h = location.hash.replace(/^#/, '');
    try { h = decodeURIComponent(h); } catch (e) {}
    apply(h || null);
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();

  // 「その他」ページ（地図なし）：入っている都道府県のボタンで絞りこみ
  if (!svg && key === 'other') {
    var ORDER = ['北海道','青森','岩手','宮城','秋田','山形','福島','茨城','栃木','群馬','埼玉','千葉','東京','神奈川','新潟','富山','石川','福井','山梨','長野','岐阜','静岡','愛知','三重','滋賀','京都','大阪','兵庫','奈良','和歌山','鳥取','島根','岡山','広島','山口','徳島','香川','愛媛','高知','福岡','佐賀','長崎','熊本','大分','宮崎','鹿児島','沖縄'];
    var used = {};
    spots.forEach(function (s) { PL(s).forEach(function (p) { used[p] = (used[p] || 0) + 1; }); });
    var usedNames = ORDER.filter(function (n) { return used[n]; });
    if (usedNames.length) {
      var obar = el('div', 'prefbar');
      obar.setAttribute('role', 'group'); obar.setAttribute('aria-label', '都道府県でしぼりこむ');
      var ochips = {};
      function oApply(n) {
        Object.keys(ochips).forEach(function (k) { ochips[k].setAttribute('aria-pressed', k === (n || '') ? 'true' : 'false'); });
        var shown = 0, done = 0;
        spots.forEach(function (s) {
          var ok = !n || PL(s).indexOf(n) >= 0;
          cards[s.name].hidden = !ok;
          if (ok) { shown++; if (visited[s.name]) done++; }
        });
        if (selected && cards[selected] && cards[selected].hidden) select(selected, true);
        nAll.textContent = shown; nAll2.textContent = shown; nDone.textContent = done;
        curOther = n;
      }
      var curOther = null;
      function mk(label, n, cnt) {
        var b = el('button', 'pchip');
        b.type = 'button'; b.setAttribute('aria-pressed', 'false');
        b.appendChild(document.createTextNode(label));
        b.appendChild(el('b', null, String(cnt)));
        b.addEventListener('click', function () { oApply(curOther === n ? null : n); });
        obar.appendChild(b); ochips[n || ''] = b;
      }
      mk('ぜんぶ', null, spots.length);
      usedNames.forEach(function (n) { mk(n, n, used[n]); });
      ochips[''].setAttribute('aria-pressed', 'true');
      list.parentNode.insertBefore(obar, list);
      var _c2 = count;
      count = function () { if (curOther) { var s2 = 0, d2 = 0; spots.forEach(function (x) { if (PL(x).indexOf(curOther) >= 0) { s2++; if (visited[x.name]) d2++; } }); nAll.textContent = s2; nAll2.textContent = s2; nDone.textContent = d2; } else _c2(); };
    }
  }
})();
