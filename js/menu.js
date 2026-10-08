(function () {
  'use strict';
  var REG = [["hokkaido", "北海道"], ["tohoku", "東北"], ["kanto", "関東"], ["chubu", "中部"], ["kinki", "近畿"], ["chugoku-shikoku", "中国・四国"], ["kyushu-okinawa", "九州・沖縄"], ["other", "その他"]];
  var sc = document.currentScript, base = '';
  if (sc && sc.src) base = sc.src.replace(/js\/[^\/?#]*([?#].*)?$/, '');
  var here = location.pathname.replace(/\/index\.html$/, '/');
  var NS = 'http://www.w3.org/2000/svg';
  function h(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
  var tab = h('button', 'mn-tab'); tab.type = 'button'; tab.setAttribute('aria-label', 'メニューをひらく'); tab.setAttribute('aria-expanded', 'false');
  tab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  var ov = h('div', 'mn-ov');
  var mn = h('nav', 'mn'); mn.setAttribute('aria-label', 'メニュー'); mn.setAttribute('aria-hidden', 'true');
  var hd = h('div', 'mn-h'); hd.appendChild(h('p', 'mn-t', '🐱 聖ちぃ巡礼マップ'));
  var x = h('button', 'mn-x', '✕'); x.type = 'button'; x.setAttribute('aria-label', 'メニューをとじる'); hd.appendChild(x);
  mn.appendChild(hd);
  function link(href, label, sub, id) {
    var li = h('li'), a = h('a'); a.href = base + href;
    var t = h('span'); t.appendChild(document.createTextNode(label));
    if (sub) { var s = h('span', 'sub', sub); s.id = id || ''; t.appendChild(s); }
    a.appendChild(t);
    var p = (base + href).replace(location.origin, '').replace(/index\.html$/, '');
    if (p === here || (p + 'index.html') === here) a.setAttribute('aria-current', 'page');
    li.appendChild(a); return li;
  }
  var l1 = h('ul', 'mn-l');
  l1.appendChild(link('index.html', '🏠 トップ'));
  l1.appendChild(link('me.html', '📒 マイ記録', 'ログインして記録を残しましょう', 'mn-nick'));
  mn.appendChild(l1);
  mn.appendChild(h('p', 'mn-s', '地方からさがす'));
  var l2 = h('ul', 'mn-l');
  REG.forEach(function (r) { l2.appendChild(link('regions/' + r[0] + '.html', r[1])); });
  mn.appendChild(l2);
  var last = null;
  function open() { last = document.activeElement; ov.classList.add('is-open'); mn.classList.add('is-open'); mn.setAttribute('aria-hidden', 'false'); tab.setAttribute('aria-expanded', 'true'); x.focus(); document.addEventListener('keydown', onKey); }
  function close() { ov.classList.remove('is-open'); mn.classList.remove('is-open'); mn.setAttribute('aria-hidden', 'true'); tab.setAttribute('aria-expanded', 'false'); document.removeEventListener('keydown', onKey); if (last && last.focus) last.focus(); }
  function onKey(e) { if (e.key === 'Escape') close(); }
  tab.addEventListener('click', open); x.addEventListener('click', close); ov.addEventListener('click', close);
  // 左へスワイプで閉じる
  var sx = null;
  mn.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  mn.addEventListener('touchend', function (e) { if (sx !== null && sx - e.changedTouches[0].clientX > 50) close(); sx = null; }, { passive: true });
  document.body.appendChild(ov); document.body.appendChild(mn); document.body.appendChild(tab);
  // ログイン中なら、ニックネームを出す
  fetch('/api/me', { credentials: 'same-origin' }).then(function (r) { return r.json(); }).then(function (r) {
    var s = document.getElementById('mn-nick');
    if (s && r && r.ok && r.nick) s.textContent = '🐱 ' + r.nick + ' さん';
  }).catch(function () {});
})();
