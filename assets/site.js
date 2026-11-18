(function () {
  var root = document.documentElement;

  // Theme toggle
  var btn = document.getElementById('theme');
  if (btn) btn.addEventListener('click', function () {
    var cur = root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // The syllogism figure: one argument form, five eras.
  var fig = document.getElementById('syllogism');
  if (!fig) return;
  var ERAS = [
    { era: 'Calvinist · c. 1550–1700', c: '--e1',
      major: 'The elect bear fruit in their calling.',
      minor: 'My calling bears fruit.',
      concl: 'Therefore I am, in all likelihood, elect.',
      auth: 'God, by an eternal decree' },
    { era: 'Enlightenment · c. 1730–1820', c: '--e2',
      major: 'The industrious and frugal prosper.',
      minor: 'I am industrious and frugal, and I prosper.',
      concl: 'Therefore I am of good character.',
      auth: 'Providence, read through reason and results' },
    { era: 'Self-made · c. 1820–1920', c: '--e3',
      major: 'The able rise by their own effort.',
      minor: 'I have risen by my own effort.',
      concl: 'Therefore I have made something of myself.',
      auth: 'The market and public opinion' },
    { era: 'Therapeutic · c. 1920–1970', c: '--e4',
      major: 'The healthy self is a fulfilled self.',
      minor: 'I feel fulfilled.',
      concl: 'Therefore I am well.',
      auth: 'The self, assisted by experts' },
    { era: 'Contemporary · c. 1970–', c: '--e5',
      major: 'The <span class="blank" aria-label="blank">______</span> are worthy.',
      minor: 'My output, my metrics, my side.',
      concl: '<span class="pending">Therefore I am … verdict pending.</span>',
      auth: 'none identifiable' }
  ];
  var q = function (s) { return fig.querySelector(s); };
  var buttons = fig.querySelectorAll('.syl-eras button');
  var timer = null, current = ERAS.length - 1;

  function render(i, instant) {
    var d = ERAS[i];
    current = i;
    buttons.forEach(function (b, j) { b.setAttribute('aria-pressed', String(i === j)); });
    fig.style.setProperty('--c', 'var(' + d.c + ')');
    var apply = function () {
      q('.era').textContent = d.era;
      q('.major').innerHTML = d.major;
      q('.minor').innerHTML = d.minor;
      q('.concl-text').innerHTML = d.concl;
      q('.auth b').textContent = d.auth;
      fig.classList.remove('swapping');
    };
    if (instant) { apply(); return; }
    fig.classList.add('swapping');
    setTimeout(apply, 220);
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  buttons.forEach(function (b, i) {
    b.addEventListener('click', function () { stop(); render(i); });
  });

  // Play through the eras once, ending on the blank premise — unless reduced motion.
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { render(ERAS.length - 1, true); return; }
  render(0, true);
  var step = 0;
  timer = setInterval(function () {
    step++;
    render(step);
    if (step >= ERAS.length - 1) stop();
  }, 2400);
})();
