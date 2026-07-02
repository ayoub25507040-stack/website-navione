import * as RevealView from '../views/RevealView.js';

/** Fades/slides elements into view the first time they enter the viewport. */
export function init() {
  const revealEls = document.querySelectorAll('.fade-in, .reveal-left, .reveal-right, .pop-in');
  if (!revealEls.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        RevealView.reveal(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => io.observe(el));
}
