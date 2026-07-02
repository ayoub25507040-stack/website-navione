/** ScrollView — DOM writes for the top progress bar, header and back-to-top button. */
export function setProgress(el, percent) {
  if (el) el.style.width = percent + '%';
}

export function toggleBackToTop(el, show) {
  el?.classList.toggle('show', show);
}

export function toggleHeaderScrolled(el, scrolled) {
  el?.classList.toggle('scrolled', scrolled);
}
