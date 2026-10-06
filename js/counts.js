// 地方ボタンに、その地方のスポット数を出します
(function () {
  var n = {};
  (window.SPOTS || []).forEach(function (s) { n[s.region] = (n[s.region] || 0) + 1; });
  Array.prototype.forEach.call(document.querySelectorAll('.rbtn[data-region]'), function (a) {
    var c = n[a.getAttribute('data-region')] || 0;
    var b = document.createElement('span');
    b.className = 'cnt' + (c ? '' : ' is-zero');
    b.textContent = c + '件';
    b.setAttribute('aria-label', c + '件のスポット');
    a.appendChild(b);
  });
})();
