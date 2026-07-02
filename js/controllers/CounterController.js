import * as CounterView from '../views/CounterView.js';

const DURATION = 1400; // ms

/** Animates each [data-count] number up from 0 once it scrolls into view. */
export function init() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      countIO.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => countIO.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const start = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / DURATION, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    CounterView.setValue(el, Math.floor(eased * target));
    if (p < 1) requestAnimationFrame(tick);
    else CounterView.setValue(el, target);
  }
  requestAnimationFrame(tick);
}
