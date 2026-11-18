(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Theme toggle
  var btn = document.getElementById('theme');
  if (btn) btn.addEventListener('click', function () {
    var cur = root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Motive toggle: same behaviors, three framings
  document.querySelectorAll('.motive').forEach(function (box) {
    var buttons = box.querySelectorAll('.frames button');
    var speaker = box.querySelector('.speaker');
    function set(i) {
      box.setAttribute('data-frame', i);
      buttons.forEach(function (b, j) { b.setAttribute('aria-pressed', String(i === j)); });
      if (speaker) speaker.textContent = buttons[i].getAttribute('data-speaker') || '';
    }
    buttons.forEach(function (b, i) { b.addEventListener('click', function () { set(i); }); });
    set(0);
  });
})();
