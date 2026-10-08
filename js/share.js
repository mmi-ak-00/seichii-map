(function () {
  'use strict';
  var W = 1080, H = 1350;
  var ORDERP = ['北海道','青森','岩手','宮城','秋田','山形','福島','茨城','栃木','群馬','埼玉','千葉','東京','神奈川','新潟','富山','石川','福井','山梨','長野','岐阜','静岡','愛知','三重','滋賀','京都','大阪','兵庫','奈良','和歌山','鳥取','島根','岡山','広島','山口','徳島','香川','愛媛','高知','福岡','佐賀','長崎','熊本','大分','宮崎','鹿児島','沖縄'];
  var REGN = [['hokkaido','北海道'],['tohoku','東北'],['kanto','関東'],['chubu','中部'],['kinki','近畿'],['chugoku-shikoku','中国・四国'],['kyushu-okinawa','九州・沖縄']];
  var NATVB = [0, 14, 352, 446];
  var OKIVB = [8, 366, 140, 88];
  var map = null, loading = null;

  function loadMap() {
    if (window.SHAREMAP) return Promise.resolve(window.SHAREMAP);
    if (loading) return loading;
    var base = '';
    var sc = document.querySelector('script[src*="share.js"]');
    if (sc) base = sc.src.replace(/share\.js([?#].*)?$/, '');
    loading = new Promise(function (ok, ng) {
      var s = document.createElement('script'); s.src = base + 'sharemap.js';
      s.onload = function () { ok(window.SHAREMAP); }; s.onerror = function () { loading = null; ng(new Error('map')); };
      document.head.appendChild(s);
    });
    return loading;
  }
  function prefName(addr) {
    if (!addr) return null;
    var a = String(addr).replace(/^〒?\s*\d{3}-?\d{4}\s*/, '');
    var m = a.match(/^(北海道|東京都|京都府|大阪府|[^\s都道府県]{2,3}県)/);
    if (m) { var t = m[1]; if (t === '北海道') return t; return t.replace(/[都府県]$/, ''); }
    for (var i = 0; i < ORDERP.length; i++) {
      var n = ORDERP[i];
      if (n === '京都' ? /京都府|^京都/.test(a) : n === '東京' ? /東京都/.test(a) : a.indexOf(n) >= 0) return n;
    }
    return null;
  }
  function prefsOf(s) {
    var out = [];
    var pl = Array.isArray(s.pref) ? s.pref : (s.pref ? [s.pref] : []);
    if (pl.length) out = pl.slice(); else { var p = prefName(s.address); if (p) out.push(p); }
    if (Array.isArray(s.more)) s.more.forEach(function (p) { if (out.indexOf(p) < 0) out.push(p); });
    return out;
  }
  function proj(s) {
    if (typeof s.lon !== 'number' || typeof s.lat !== 'number' || s.noPlace) return null;
    if (s.lat < 28) {
      if (s.lon < 127.4 || s.lon > 128.6 || s.lat < 25.9 || s.lat > 27.1) return null;
      return [59.7 + (s.lon - 127.64) * 53.0, 382 + (26.88 - s.lat) * 60.0];
    }
    return [22 + (s.lon - 129.4) * 19.5, 28 + (45.7 - s.lat) * 22.5];
  }
  function pad(vb, p) { var dx = vb[2] * p, dy = vb[3] * p; return [vb[0] - dx, vb[1] - dy, vb[2] + dx * 2, vb[3] + dy * 2]; }
  function two(n) { return n < 10 ? '0' + n : '' + n; }
  function todayStr() { var d = new Date(); return d.getFullYear() + '-' + two(d.getMonth() + 1) + '-' + two(d.getDate()); }
  function fmtDate(s) {
    var p = s.split('-'); var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return { y: p[0], md: p[1] + '.' + p[2], full: p[0] + '.' + p[1] + '.' + p[2], w: '日月火水木金土'.charAt(d.getDay()) };
  }

  /* ---------- 地図（陸地）のSVG ---------- */
  function landSvg(M, scope, view, pxW, pxH) {
    var k = pxW / view[2];
    var cur = scope.region;              // 色をつける地方（null=全国は全部）
    var out = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + view.join(' ') + '" width="' + pxW + '" height="' + pxH + '">';
    out += '<style>.shape{fill:#fff;fill-opacity:.95;stroke:#fff;stroke-width:3px;stroke-linejoin:round}.inset{fill:#fff;fill-opacity:.55;stroke:#ffc9dc;stroke-width:4px;stroke-dasharray:12 9}.pl{fill:none;stroke:#fff;stroke-width:3.5px;stroke-linejoin:round;stroke-linecap:round}.lake{fill:#e3f3ff;stroke:#fff;stroke-width:1px}</style>';
    out += '<defs>' + M.defs + M.pcdefs + '</defs>';
    out += M.inset;
    out += '<g fill="#fff" stroke="#fff" stroke-width="16" stroke-linejoin="round">';
    ['s-hokkaido','s-honshu','s-shikoku','s-kyushu','s-sado','s-awaji','s-oki'].forEach(function (i) { out += '<use href="#' + i + '"/>'; });
    out += '</g>';
    M.shapes.forEach(function (sh) {
      var col = (scope.all || sh.r === cur) ? (M.colors[sh.r] || {}).c : null;
      var st = col ? ' style="fill:' + col + ';fill-opacity:1"' : '';
      if (sh.e) out += sh.e.replace('/>', ' class="shape"' + st + '/>');
      else out += '<use href="#' + sh.u + '" class="shape"' + (sh.c ? ' clip-path="url(#' + sh.c + ')"' : '') + st + '/>';
    });
    var linesFor = scope.lines || [];
    linesFor.forEach(function (rk) {
      var r = M.regions[rk]; if (!r) return;
      out += r.lines.replace(/class="pref-l"/g, 'class="pl"').replace(/vector-effect="non-scaling-stroke"/g, 'vector-effect="non-scaling-stroke"');
      if (r.lake) out += r.lake;
    });
    if (scope.hit) {
      out += '<path d="' + scope.hit.d + '" fill="#fff" fill-opacity=".45" stroke="#ff7eb0" stroke-width="7" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>';
    }
    return out + '</svg>';
  }

  /* ---------- キャンバスの部品 ---------- */
  function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function paw(c, cx, cy, size, fill) {
    var s = size / 24; c.save(); c.translate(cx - size / 2, cy - size / 2); c.scale(s, s); c.fillStyle = fill;
    [[12, 16.3, 6, 4.7], [4.8, 10.8, 2.5, 3.1], [9.3, 6.3, 2.6, 3.3], [14.7, 6.3, 2.6, 3.3], [19.2, 10.8, 2.5, 3.1]].forEach(function (e) { c.beginPath(); c.ellipse(e[0], e[1], e[2], e[3], 0, 0, Math.PI * 2); c.fill(); });
    c.restore();
  }
  function FONT(w, px) { return w + ' ' + px + 'px "Zen Maru Gothic","Hiragino Maru Gothic ProN","Hiragino Sans","Yu Gothic","Noto Sans JP",sans-serif'; }
  function fit(c, text, maxW, px, w) { var p = px; c.font = FONT(w, p); while (c.measureText(text).width > maxW && p > 18) { p -= 2; c.font = FONT(w, p); } return p; }
  function background(c) {
    var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#ffe6f1'); g.addColorStop(.55, '#fdeefa'); g.addColorStop(1, '#eee9ff');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    var spots = [[90, 120, 46, -18], [960, 90, 38, 14], [1010, 640, 44, 22], [60, 760, 40, -24], [980, 1180, 42, -12], [90, 1250, 46, 16], [520, 1310, 34, 8]];
    spots.forEach(function (p) { c.save(); c.translate(p[0], p[1]); c.rotate(p[3] * Math.PI / 180); paw(c, 0, 0, p[2], 'rgba(255,170,205,.35)'); c.restore(); });
  }
  function titlePill(c, text, y) {
    c.font = FONT(800, 64); var px = fit(c, text, 780, 64, 800), w = Math.min(880, c.measureText(text).width + 120), x = (W - w) / 2, h = 118;
    // ねこ耳
    [[x + 70, 1], [x + w - 70, -1]].forEach(function (e) {
      c.beginPath(); c.moveTo(e[0] - 44 * e[1], y + 6); c.lineTo(e[0] + 4 * e[1], y - 56); c.lineTo(e[0] + 52 * e[1], y + 6); c.closePath(); c.fillStyle = '#ffb4d1'; c.fill();
    });
    rr(c, x, y, w, h, 59); c.fillStyle = '#fff'; c.fill(); c.lineWidth = 8; c.strokeStyle = '#ffc3da'; c.stroke();
    c.fillStyle = '#d94b86'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = FONT(800, px); c.fillText(text, W / 2, y + h / 2 + 3);
  }
  function footer(c, nick) {
    c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    c.fillStyle = '#a37cae'; c.font = FONT(700, 30);
    c.fillText('🐱 聖ちぃ巡礼マップ' + (nick ? '  ・  ' + nick + ' さん' : ''), W / 2, 1296);
    c.fillStyle = '#b79bbb'; c.font = FONT(500, 22); c.fillText('※ファンによる非公式サイトです', W / 2, 1330);
  }
  function statBlock(c, done, total, label, y) {
    c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    c.font = FONT(800, 120); var ds = String(done);
    c.font = FONT(800, 120); var wd = c.measureText(ds).width;
    c.font = FONT(800, 52); var tail = ' / ' + total + ' か所';
    var wt = c.measureText(tail).width;
    var x0 = (W - (wd + wt)) / 2;
    c.textAlign = 'left'; c.fillStyle = '#d94b86'; c.font = FONT(800, 120); c.fillText(ds, x0, y + 104);
    c.fillStyle = '#5a4560'; c.font = FONT(800, 52); c.fillText(tail, x0 + wd, y + 104);
    c.textAlign = 'center'; c.fillStyle = '#8a5b94'; c.font = FONT(700, 34); c.fillText(label, W / 2, y + 154);
    var bx = 140, bw = W - 280, by = y + 176, bh = 26;
    rr(c, bx, by, bw, bh, 13); c.fillStyle = '#ffd6e6'; c.fill();
    var p = total ? done / total : 0;
    if (p > 0) { rr(c, bx, by, Math.max(bh, bw * p), bh, 13); c.fillStyle = '#4fc3a8'; c.fill(); }
  }
  function pin(c, x, y, r) {
    c.save(); c.shadowColor = 'rgba(120,40,80,.28)'; c.shadowBlur = r * .5; c.shadowOffsetY = r * .18;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fillStyle = '#d94b86'; c.fill(); c.restore();
    c.lineWidth = Math.max(2, r * .28); c.strokeStyle = '#fff'; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke();
    paw(c, x, y, r * 1.25, '#fff');
  }

  /* ---------- 地図の画像 ---------- */
  function drawMapImage(M, cx, ctx0, scope) {
    // scope: {title, spots, view, region, all, lines, hit, labels:[...], note}
    var spots = scope.spots, vis = ctx0.visited;
    var done = spots.filter(function (s) { return vis[s.name]; });
    return new Promise(function (ok, ng) {
      var PX = 40, PY = 250, PW = W - 80, PH = 745;
      var view = scope.view, asp = view[2] / view[3];
      var pxW = PW, pxH = PH, pa = PW / PH;
      if (asp > pa) { var nh = view[2] / pa; view = [view[0], view[1] - (nh - view[3]) / 2, view[2], nh]; }
      else { var nw = view[3] * pa; view = [view[0] - (nw - view[2]) / 2, view[1], nw, view[3]]; }
      var svg = landSvg(M, scope, view, pxW, pxH);
      var img = new Image();
      img.onload = function () {
        var c = cx;
        background(c); titlePill(c, scope.title, 84);
        // 地図のパネル（海）
        c.save(); rr(c, PX, PY, PW, PH, 44); var g = c.createLinearGradient(0, PY, 0, PY + PH); g.addColorStop(0, '#e6f4ff'); g.addColorStop(1, '#f3ecff'); c.fillStyle = g; c.fill(); c.lineWidth = 8; c.strokeStyle = '#ffd3e4'; c.stroke(); c.clip();
        var ox = PX, oy = PY, k = pxW / view[2];
        c.drawImage(img, ox, oy, pxW, pxH);
        function P(p) { return [ox + (p[0] - view[0]) * k, oy + (p[1] - view[1]) * k]; }
        // 地名
        (scope.labels || []).forEach(function (l) {
          var q = P([l[1], l[2]]), fs = Math.max(20, Math.min(46, l[3] * k * (scope.labelScale || 1.0)));
          c.font = FONT(800, fs); c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.lineWidth = fs * .3; c.strokeStyle = 'rgba(255,255,255,.9)'; c.strokeText(l[0], q[0], q[1]); c.fillStyle = '#5a4560'; c.fillText(l[0], q[0], q[1]);
        });
        var r = Math.max(15, Math.min(26, 21 * Math.sqrt(pxW / 700)));
        var dots = [], pins = [];
        spots.forEach(function (s) {
          var p = proj(s); if (!p) return;
          if (p[0] < view[0] || p[0] > view[0] + view[2] || p[1] < view[1] || p[1] > view[1] + view[3]) return;
          (vis[s.name] ? pins : dots).push(P(p));
        });
        dots.forEach(function (q) { c.beginPath(); c.arc(q[0], q[1], r * .42, 0, Math.PI * 2); c.fillStyle = 'rgba(160,140,175,.55)'; c.fill(); c.lineWidth = 3; c.strokeStyle = '#fff'; c.stroke(); });
        pins.forEach(function (q) { pin(c, q[0], q[1], r); });
        c.restore();
        statBlock(c, done.length, spots.length, scope.sub || '行ったにゃ', 1017);
        footer(c, ctx0.nick);
        ok();
      };
      img.onerror = function () { ng(new Error('svg')); };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
  }

  function buildScope(M, kind, val, ctx0) {
    var all = ctx0.spots;
    if (kind === 'nation') {
      return { title: '全国 聖ちぃ巡礼マップ', spots: all, view: NATVB, all: true, sub: '行ったにゃ', labels: [] };
    }
    if (kind === 'region') {
      var r = M.regions[val], nm = REGN.filter(function (x) { return x[0] === val; })[0][1];
      var sp = all.filter(function (s) { return s.region === val; });
      var labels = r.labels.slice(); if (r.note) { var m = r.note.match(/x="([\d.]+)" y="([\d.]+)"/); if (m) labels.push(['沖縄', +m[1], +m[2], 7]); }
      return { title: nm + ' 聖ちぃ巡礼マップ', spots: sp, view: r.vb, region: val, lines: [val], labels: labels, sub: nm + ' 行ったにゃ' };
    }
    // 都道府県
    var pref = val, rk = null, hit = null;
    if (pref === '沖縄') { rk = 'kyushu-okinawa'; }
    else if (pref === '北海道') { rk = 'hokkaido'; }
    else Object.keys(M.regions).forEach(function (k) { M.regions[k].hits.forEach(function (h) { if (h.p === pref) { rk = k; hit = h; } }); });
    var sp2 = all.filter(function (s) { return prefsOf(s).indexOf(pref) >= 0; });
    var view = pref === '沖縄' ? OKIVB : pref === '北海道' ? pad(M.regions.hokkaido.vb, 0) : pad(hit.vb, .06);
    var lab = hit ? [[pref, hit.vb[0] + hit.vb[2] / 2, hit.vb[1] + 1.2, 3.0]] : [];
    return { title: pref + ' 聖ちぃ巡礼マップ', spots: sp2, view: view, region: rk, lines: rk ? [rk] : [], hit: hit, labels: [], sub: pref + ' 行ったにゃ', labelScale: 1 };
  }

  /* ---------- 今日の記録の画像 ---------- */
  function drawToday(cx, ctx0, dateStr, s, photo) {
    var c = cx, d = fmtDate(dateStr);
    background(c); titlePill(c, (ctx0.nick ? ctx0.nick + 'の' : '') + '聖ちぃ巡礼記録', 84);
    c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    c.fillStyle = '#d94b86'; c.font = FONT(800, 92);
    var dtxt = d.y + '.' + d.md; var fs0 = fit(c, dtxt, W - 160, 92, 800); c.font = FONT(800, fs0); c.fillText(dtxt, W / 2, 330);
    c.fillStyle = '#5a4560'; c.font = FONT(800, 38); c.fillText('（' + d.w + '）に行ったにゃ', W / 2, 384);
    // 写真
    var PX = 90, PY = 420, PW = W - 180, PH = 600;
    c.save(); rr(c, PX, PY, PW, PH, 44);
    c.shadowColor = 'rgba(120,40,80,.18)'; c.shadowBlur = 24; c.shadowOffsetY = 8; c.fillStyle = '#fff'; c.fill(); c.restore();
    c.save(); rr(c, PX + 10, PY + 10, PW - 20, PH - 20, 36); c.clip();
    if (photo) {
      var iw = photo.naturalWidth || photo.width, ih = photo.naturalHeight || photo.height, sc = Math.max((PW - 20) / iw, (PH - 20) / ih);
      var dw = iw * sc, dh = ih * sc; c.drawImage(photo, PX + 10 + (PW - 20 - dw) / 2, PY + 10 + (PH - 20 - dh) / 2, dw, dh);
    } else {
      var g = c.createLinearGradient(0, PY, 0, PY + PH); g.addColorStop(0, '#ffeaf3'); g.addColorStop(1, '#efe6ff'); c.fillStyle = g; c.fillRect(PX, PY, PW, PH);
      paw(c, W / 2, PY + PH / 2, 260, 'rgba(255,170,205,.7)');
    }
    c.restore();
    c.lineWidth = 6; c.strokeStyle = '#ffc3da'; rr(c, PX + 10, PY + 10, PW - 20, PH - 20, 36); c.stroke();
    // 店名
    c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    c.fillStyle = '#5a4560'; var px = fit(c, s.name, W - 160, 62, 800); c.font = FONT(800, px); c.fillText(s.name, W / 2, 1100);
    var ad = prefsOf(s).join('・'); if (ad) { c.fillStyle = '#8a7683'; c.font = FONT(600, 30); c.fillText(ad, W / 2, 1148); }
    var all = ctx0.spots, done = all.filter(function (x) { return ctx0.visited[x.name]; }).length;
    c.fillStyle = '#8a5b94'; c.font = FONT(700, 32); c.fillText('これまでに ' + done + ' / ' + all.length + ' か所 巡ったにゃ', W / 2, 1226);
    footer(c, ctx0.nick);
  }

  /* ---------- 画面 ---------- */
  function h(t, cls, x) { var e = document.createElement(t); if (cls) e.className = cls; if (x != null) e.textContent = x; return e; }
  function mount(host, getCtx) {
    host.textContent = '';
    var kinds = [['today', '聖ちぃ巡礼記録'], ['nation', '全国'], ['region', '地方'], ['pref', '都道府県']];
    var kind = 'today';
    var tabs = h('div', 'sh-tabs'); tabs.setAttribute('role', 'tablist');
    var btns = {};
    kinds.forEach(function (k) {
      var b = h('button', null, k[1]); b.type = 'button'; b.setAttribute('role', 'tab'); btns[k[0]] = b; tabs.appendChild(b);
      b.addEventListener('click', function () { kind = k[0]; paint(); });
    });
    host.appendChild(tabs);
    var opt = h('div', 'sh-opt'); host.appendChild(opt);
    var go = h('button', 'me-go', '画像をつくる'); go.type = 'button'; host.appendChild(go);
    var msg = h('p', 'me-msg'); msg.setAttribute('role', 'status'); host.appendChild(msg);
    var out = h('div', 'sh-out'); out.hidden = true; host.appendChild(out);
    var selReg, selPref, dateIn, photoIn, picked, chk = {};
    function sel(list, init) {
      var s = h('select', 'sh-sel'); list.forEach(function (o) { var op = h('option', null, o[1]); op.value = o[0]; s.appendChild(op); }); if (init) s.value = init; return s;
    }
    function paint() {
      Object.keys(btns).forEach(function (k) { btns[k].setAttribute('aria-selected', k === kind ? 'true' : 'false'); });
      opt.textContent = ''; var cx = getCtx();
      if (kind === 'region') { selReg = sel(REGN, selReg && selReg.value); opt.appendChild(selReg); }
      else if (kind === 'pref') { selPref = sel(ORDERP.map(function (p) { return [p, p]; }), selPref ? selPref.value : '東京'); opt.appendChild(selPref); }
      else if (kind === 'today') {
        var vis = cx.spots.filter(function (s) { return cx.visited[s.name]; });
        if (!vis.length) { opt.appendChild(h('p', 'me-hint', 'まだ「行ったにゃ」の記録がありません。')); }
        else {
          // 日付が新しい順
          vis = vis.slice().sort(function (a, b) { return (cx.dates[b.name] || '').localeCompare(cx.dates[a.name] || ''); });
          var list = h('div', 'sh-list'); picked = null;
          var lb = h('label', 'sh-lb', '日付'); dateIn = h('input', 'sh-date'); dateIn.type = 'date'; dateIn.value = todayStr(); lb.appendChild(dateIn);
          var note = h('p', 'me-hint');
          function upd() {
            var s = picked; note.textContent = '';
            if (s && cx.dates[s.name] && cx.dates[s.name] !== dateIn.value) note.textContent = 'この場所の記録は ' + cx.dates[s.name] + ' です。いまの日付で画像をつくると、記録の日付も変わります。';
            else if (s && !cx.dates[s.name]) note.textContent = 'この場所は日付の記録がないので、えらんだ日付を記録します。';
          }
          vis.forEach(function (s) {
            var l = h('label', 'sh-ck'), i = h('input'); i.type = 'radio'; i.name = 'sh-pick'; i.value = s.name;
            l.appendChild(i); var t = h('span', null, s.name); l.appendChild(t);
            if (cx.dates[s.name]) t.appendChild(h('small', null, ' ' + cx.dates[s.name].replace(/-/g, '/')));
            i.addEventListener('change', function () { picked = s; if (cx.dates[s.name]) dateIn.value = cx.dates[s.name]; upd(); });
            list.appendChild(l);
          });
          dateIn.addEventListener('change', upd);
          var pf = h('label', 'sh-lb', '写真（えらばなくてもOK）'); photoIn = h('input', 'sh-file'); photoIn.type = 'file'; photoIn.accept = 'image/*'; pf.appendChild(photoIn);
          opt.appendChild(h('p', 'me-hint', '行った場所を1つ選んでください。'));
          opt.appendChild(list); opt.appendChild(lb); opt.appendChild(note); opt.appendChild(pf);
          opt.appendChild(h('p', 'me-hint', '写真はこの端末の中だけで使います。サーバーには送られません。'));
        }
      }
      msg.textContent = ''; out.hidden = true;
    }
    go.addEventListener('click', function () {
      var cx = getCtx(); go.disabled = true; msg.className = 'me-msg'; msg.textContent = 'つくっています…';
      var cv = document.createElement('canvas'); cv.width = W; cv.height = H; var c = cv.getContext('2d');
      var fl = (document.fonts && document.fonts.load) ? Promise.all([document.fonts.load('800 40px "Zen Maru Gothic"'), document.fonts.load('700 40px "Zen Maru Gothic"')]).catch(function () {}) : Promise.resolve();
      var job;
      if (kind === 'today') {
        if (!picked) { go.disabled = false; msg.textContent = '行った場所を1つ選んでください。'; return; }
        var sp = picked, dstr = dateIn.value || todayStr();
        var ph = new Promise(function (ok) {
          var f = photoIn && photoIn.files && photoIn.files[0]; if (!f) return ok(null);
          var u = URL.createObjectURL(f), im = new Image(); im.onload = function () { ok(im); }; im.onerror = function () { ok(null); }; im.src = u;
        });
        job = Promise.all([fl, ph]).then(function (r) {
          drawToday(c, cx, dstr, sp, r[1]);
          if (cx.dates[sp.name] !== dstr && cx.setDate) cx.setDate(sp, dstr);
        });
      } else {
        job = Promise.all([loadMap(), fl]).then(function (r) {
          var val = kind === 'region' ? selReg.value : kind === 'pref' ? selPref.value : null;
          return drawMapImage(r[0], c, cx, buildScope(r[0], kind, val, cx));
        });
      }
      job.then(function () {
        cv.toBlob(function (blob) {
          go.disabled = false;
          if (!blob) { msg.textContent = '画像をつくれませんでした。'; return; }
          msg.textContent = '';
          var url = URL.createObjectURL(blob); out.textContent = ''; out.hidden = false;
          var im = h('img', 'sh-img'); im.src = url; im.alt = 'できあがった画像'; out.appendChild(im);
          var name = 'chii-' + kind + '-' + todayStr() + '.png';
          var row = h('div', 'sh-row');
          var dl = h('a', 'me-go sh-dl', '保存する'); dl.href = url; dl.download = name; row.appendChild(dl);
          var file = null; try { file = new File([blob], name, { type: 'image/png' }); } catch (e) {}
          if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
            var sh = h('button', 'me-sub sh-sh', 'シェアする'); sh.type = 'button';
            sh.addEventListener('click', function () { navigator.share({ files: [file], text: '#聖ちぃ巡礼\n#ちぃむみーてぃんぐ2026' }).catch(function () {}); });
            row.appendChild(sh);
          }
          out.appendChild(row);
          out.appendChild(h('p', 'me-hint', 'スマホでは、画像を長押しして保存もできます。'));
          out.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }, 'image/png');
      }).catch(function (e) { console.error('SHERR',e&&e.stack||e); go.disabled = false; msg.textContent = '画像をつくれませんでした。もう一度お試しください。'; });
    });
    paint();
  }
  window.ChiiShare = { mount: mount, _build: buildScope, _prefsOf: prefsOf };
})();
