// =============================================================
// MD. Ismail Hossain — Portfolio
// Vanilla JS only — no dependencies, no build step required.
// =============================================================

document.addEventListener('DOMContentLoaded', function () {
  /* ---------- Mobile navigation toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var siteHeader = document.getElementById('siteHeader');
  function onScroll() {
    if (siteHeader) {
      siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll-spy: highlight the active nav link ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navAnchors = document.querySelectorAll('#navLinks a');

  if ('IntersectionObserver' in window && sections.length) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navAnchors.forEach(function (a) {
              a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(function (s) { spyObserver.observe(s); });
  }

  /* ---------- Reveal-on-scroll (respects reduced motion) ---------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
