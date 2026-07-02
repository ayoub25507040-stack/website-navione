import * as ScrollView from '../views/ScrollView.js';

/** Updates the top progress bar, header "scrolled" state and back-to-top button. */
export function init() {
  const progress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const header = document.getElementById('siteHeader');
  if (!progress || !backToTop || !header) return;

  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    ScrollView.setProgress(progress, scrolled);
    ScrollView.toggleBackToTop(backToTop, h.scrollTop > 500);
    ScrollView.toggleHeaderScrolled(header, h.scrollTop > 40);
  });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
