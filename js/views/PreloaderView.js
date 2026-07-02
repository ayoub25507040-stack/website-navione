/** Hides the full-screen preloader once the page has finished loading. */
export function hidePreloader() {
  document.getElementById('preloader')?.classList.add('done');
}
