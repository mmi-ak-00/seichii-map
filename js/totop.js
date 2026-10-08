(function () {
  var b = document.createElement('button');
  b.type = 'button'; b.className = 'totop';
  b.setAttribute('aria-label', 'ページのいちばん上へ'); b.title = 'いちばん上へ';
  b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 15l7-7 7 7"/></svg>';
  var on = false, tick = false;
  function upd() { tick = false; var v = (window.pageYOffset || document.documentElement.scrollTop) > 260; if (v !== on) { on = v; b.classList.toggle('is-on', v); b.tabIndex = v ? 0 : -1; } }
  b.tabIndex = -1;
  window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
  b.addEventListener('click', function () {
    var r = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: r ? 'auto' : 'smooth' });
  });
  document.body.appendChild(b);
  upd();
})();
