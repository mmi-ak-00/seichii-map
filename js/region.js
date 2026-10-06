(function () {
  'use strict';

  var key = document.body.getAttribute('data-page');
  var spots = (window.SPOTS || []).filter(function (s) { return s.region === key; });
  var STORE = 'chii-visited-v1';
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
    Object.keys(cards).forEach(function (k) { cards[k].classList.toggle('is-sel', k === selected); });
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
    var li = el('li', 'spot');
    li.tabIndex = 0;
    cards[s.name] = li;
    li.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a,button')) return;
      select(s.name, false);
    });
    li.addEventListener('keydown', function (e) {
      if (e.target !== li) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(s.name, false); }
    });

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

    li.appendChild(el('h3', null, s.name));
    if (s.work) {
      var tag = el('span', 'tag');
      tag.appendChild(pawIcon());
      tag.appendChild(document.createTextNode(s.work));
      li.appendChild(tag);
    }
    if (s.chain) li.appendChild(el('p', 'chain', '🏪 チェーン店'));
    if (s.address) li.appendChild(el('p', 'addr', s.address));
    if (s.note) li.appendChild(el('p', 'note-t', s.note));
    var srcList = (Array.isArray(s.sources) && s.sources.length) ? s.sources
      : ((s.srcName || s.srcUrl || s.postDate) ? [{ name: s.srcName, url: s.srcUrl, date: s.postDate }] : []);
    if (srcList.length) {
      var srcBox = el('div', 'srcs');
      srcList.forEach(function (o) {
        var src = el('p', 'src');
        src.appendChild(document.createTextNode('📎 引用：'));
        var okUrl = /^https?:\/\//i.test(o.url || '');
        if (okUrl) {
          var sa = el('a', null, o.name || '引用先を見る');
          sa.href = o.url; sa.target = '_blank'; sa.rel = 'noopener noreferrer';
          src.appendChild(sa);
        } else if (o.name) src.appendChild(document.createTextNode(o.name));
        var pd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(o.date || '');
        if (pd) src.appendChild(document.createTextNode((okUrl || o.name ? '（' : '') + '投稿日 ' + pd[1] + '年' + (+pd[2]) + '月' + (+pd[3]) + '日' + (okUrl || o.name ? '）' : '')));
        srcBox.appendChild(src);
      });
      li.appendChild(srcBox);
    }

    var act = el('div', 'act');
    var q = encodeURIComponent(s.chain ? s.name : s.name + ' ' + (s.address || ''));
    var map = el('a', 'btn', s.chain ? '近くのお店をさがす ↗' : '地図アプリで開く ↗');
    map.href = 'https://www.google.com/maps/search/?api=1&query=' + q;
    map.target = '_blank';
    map.rel = 'noopener noreferrer';
    act.appendChild(map);

    var v = el('button', 'btn btn-visit');
    v.type = 'button';
    function paint() {
      var on = !!visited[s.name];
      v.classList.toggle('is-done', on);
      v.setAttribute('aria-pressed', on ? 'true' : 'false');
      v.textContent = on ? '✓ 行ったにゃ♡' : '行ったにゃ？';
    }
    paint();
    v.addEventListener('click', function () {
      if (visited[s.name]) delete visited[s.name]; else visited[s.name] = 1;
      save(); paint(); count(); paintPins();
      if (window.ChiiAcct) window.ChiiAcct.push(s, !!visited[s.name]);
    });
    act.appendChild(v);
    li.appendChild(act);
    return li;
  }

  spots.forEach(function (s) { list.appendChild(card(s)); });
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
      if (typeof s.lon !== 'number' || typeof s.lat !== 'number') return;
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
  function prefOfSpot(s) {
    var names = hits.map(function (h) { return h.getAttribute('data-pref'); });
    for (var i = 0; i < names.length; i++) {
      if (s.address && s.address.indexOf(names[i]) >= 0) return names[i];
    }
    if (typeof s.lat === 'number' && s.lat < 28) return '沖縄';
    if (typeof s.lon === 'number' && typeof s.lat === 'number' && svg) {
      var x = 22 + (s.lon - 129.4) * 19.5, y = 28 + (45.7 - s.lat) * 22.5;
      var pt = svg.createSVGPoint(); pt.x = x; pt.y = y;
      for (var j = 0; j < hits.length; j++) {
        if (hits[j].isPointInFill && hits[j].tagName === 'path' && hits[j].isPointInFill(pt)) return hits[j].getAttribute('data-pref');
      }
    }
    return null;
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
      var cnt = spots.filter(function (s) { return prefOf[s.name] === n; }).length;
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
      var ok = !n || s.chain || prefOf[s.name] === n;
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
  count = function () { _count(); if (curPref !== null) { var s = 0, d = 0; spots.forEach(function (x) { if (x.chain || prefOf[x.name] === curPref) { s++; if (visited[x.name]) d++; } }); nAll.textContent = s; nAll2.textContent = s; nDone.textContent = d; } };
  function fromHash() {
    var h = location.hash.replace(/^#/, '');
    try { h = decodeURIComponent(h); } catch (e) {}
    apply(h || null);
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();
})();
