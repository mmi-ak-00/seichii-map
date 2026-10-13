// 地方ボタンに、その地方のスポット数を出します
(function () {
  var REGP = {"tohoku": ["青森", "秋田", "岩手", "山形", "宮城", "福島"], "kanto": ["群馬", "栃木", "茨城", "埼玉", "東京", "神奈川", "千葉"], "chubu": ["長野", "新潟", "岐阜", "静岡", "愛知", "山梨", "富山", "石川", "福井"], "kinki": ["兵庫", "京都", "滋賀", "三重", "奈良", "和歌山", "大阪"], "chugoku-shikoku": ["鳥取", "島根", "岡山", "広島", "山口", "徳島", "香川", "愛媛", "高知"], "kyushu-okinawa": ["福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"], "hokkaido": ["北海道"]};
  var n = {};
  // 各地方のページに出るスポットの数（その地方のスポット ＋ 「その他」や「他の県にもある」チェーン店。同じ地方の中で何県あっても1件）
  (window.SPOTS || []).forEach(function (s) {
    var seen = {}; seen[s.region] = 1;
    var ex = s.region === 'other' ? (Array.isArray(s.pref) ? s.pref : (s.pref ? [s.pref] : [])) : (Array.isArray(s.more) ? s.more : []);
    Object.keys(REGP).forEach(function (r) { if (!seen[r] && ex.some(function (p) { return REGP[r].indexOf(p) >= 0; })) seen[r] = 1; });
    Object.keys(seen).forEach(function (r) { n[r] = (n[r] || 0) + 1; });
  });
  Array.prototype.forEach.call(document.querySelectorAll('.rbtn[data-region]'), function (a) {
    var c = n[a.getAttribute('data-region')] || 0;
    var b = document.createElement('span');
    b.className = 'cnt' + (c ? '' : ' is-zero');
    b.textContent = c + '件';
    b.setAttribute('aria-label', c + '件のスポット');
    a.appendChild(b);
  });
})();
