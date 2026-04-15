// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 20), { passive: true });

// ── MOBILE MENU TOGGLE ──
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});
// Close menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

// ── SCROLL REVEAL ──
const io = new IntersectionObserver(es => {
  es.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 80);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.rev').forEach(el => io.observe(el));

// ── CURSOR GLOW (smooth lag follow) ──
const glow = document.getElementById('cursor-glow');
let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
let tx = cx, ty = cy;
document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
(function animCursor() {
  cx += (tx - cx) * 0.07;
  cy += (ty - cy) * 0.07;
  glow.style.left = cx + 'px';
  glow.style.top  = cy + 'px';
  requestAnimationFrame(animCursor);
})();
if ('ontouchstart' in window) glow.style.display = 'none';

// ── CARD SHINE (mouse-tracked radial on cards) ──
document.querySelectorAll('.cmp-card, .fc, .pc, .svc').forEach(card => {
  const shine = card.querySelector('.card-shine');
  if (!shine) return;
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
  });
});

// ── HERO GLOW PARALLAX ──
document.addEventListener('mousemove', e => {
  const xP = (e.clientX / window.innerWidth  - 0.5) * 28;
  const yP = (e.clientY / window.innerHeight - 0.5) * 18;
  const hg = document.querySelector('.hero-glow');
  if (hg) hg.style.transform = `translateX(calc(-50% + ${xP}px)) translateY(${yP}px)`;
});

// ── COMMITMENT CARD ACCORDION ──
(function initCommitCards() {
  const cards = document.querySelectorAll('.commit-card');
  if (!cards.length) return;

  // Open first card by default
  cards[0].classList.add('active');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      // Close all
      cards.forEach(c => c.classList.remove('active'));
      // Toggle clicked (if it wasn't already open)
      if (!isActive) card.classList.add('active');
    });
  });
})();
