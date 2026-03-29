// Main JS — Crocodile Rock River Lodge

// WhatsApp floating button — appears after 3s or after scrolling past hero
(function () {
  var btn = document.getElementById('whatsappBtn');
  if (!btn) return;

  var shown = false;

  function show() {
    if (shown) return;
    shown = true;
    btn.classList.add('visible');
  }

  // Show after 3 seconds
  setTimeout(show, 3000);

  // Show after scrolling past the hero
  var hero = document.getElementById('hero');
  function onScroll() {
    if (!hero) { show(); return; }
    if (window.scrollY > hero.offsetHeight * 0.6) {
      show();
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}());
