// Stagger the funnel stages in on load
document.querySelectorAll('.fstage').forEach((el) => {
  const i = parseInt(el.dataset.i, 10) || 0;
  el.style.animationDelay = (0.25 + i * 0.22) + 's';
});

// Count-up for the honest process stats (not results claims — no fabricated data)
function countUp(el, end, prefix = '', suffix = '', duration = 1000) {
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = end * eased;
    el.firstChild.textContent = prefix + Math.round(val) + suffix + ' ';
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

window.addEventListener('DOMContentLoaded', () => {
  const days = document.getElementById('stat-days');
  const inhouse = document.getElementById('stat-inhouse');
  const channels = document.getElementById('stat-channels');
  if (days) countUp(days, 14, '', 'd');
  if (inhouse) countUp(inhouse, 100, '', '%');
  if (channels) countUp(channels, 2, '', '');
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Panel tilt on mouse move
const panel = document.getElementById('panel');
const panelWrap = document.querySelector('.panel-wrap');
if (!reduceMotion && panel && panelWrap) {
  panelWrap.addEventListener('mousemove', (e) => {
    const rect = panel.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    panel.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  panelWrap.addEventListener('mouseleave', () => {
    panel.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}

// Nav shadow on scroll
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  });
}

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
