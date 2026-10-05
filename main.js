(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('[data-region]');

  // 地図と下のリストで、同じ地方をいっしょに光らせる
  function setActive(name, on) {
    var list = document.querySelectorAll('[data-region="' + name + '"]');
    for (var i = 0; i < list.length; i++) list[i].classList.toggle('is-active', on);
  }
  function clearAll() {
    for (var i = 0; i < targets.length; i++) targets[i].classList.remove('is-active');
  }

  // タップした場所に肉球をぽんっと出す
  function pop(x, y) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'paw-pop');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.left = x + 'px';
    svg.style.top = y + 'px';
    var use = document.createElementNS(ns, 'use');
    use.setAttribute('href', '#paw');
    svg.appendChild(use);
    document.body.appendChild(svg);
    setTimeout(function () { if (svg.parentNode) svg.parentNode.removeChild(svg); }, 700);
  }

  Array.prototype.forEach.call(targets, function (el) {
    var name = el.getAttribute('data-region');
    var timer;

    el.addEventListener('mouseenter', function () { setActive(name, true); });
    el.addEventListener('mouseleave', function () { setActive(name, false); });
    el.addEventListener('focus', function () { setActive(name, true); });
    el.addEventListener('blur', function () { setActive(name, false); });
    el.addEventListener('touchstart', function () { clearTimeout(timer); setActive(name, true); }, { passive: true });
    el.addEventListener('touchend', function () { timer = setTimeout(function () { setActive(name, false); }, 300); });
    el.addEventListener('touchcancel', function () { setActive(name, false); });

    el.addEventListener('click', function (e) {
      // 新しいタブで開く操作などはそのまま通す
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var href = el.getAttribute('href');
      if (!href || reduce) return;
      e.preventDefault();
      var x = e.clientX, y = e.clientY;
      if (!x && !y) {
        var r = el.getBoundingClientRect();
        x = r.left + r.width / 2;
        y = r.top + r.height / 2;
      }
      pop(x, y);
      setTimeout(function () { window.location.href = href; }, 220);
    });
  });

  // 「戻る」で戻ってきたときに光ったままにならないように
  window.addEventListener('pageshow', clearAll);
})();
