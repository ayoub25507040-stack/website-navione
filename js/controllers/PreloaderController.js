import * as PreloaderView from '../views/PreloaderView.js';

/** Hides the preloader shortly after the page finishes loading. */
export function init() {
  window.addEventListener('load', () => {
    setTimeout(PreloaderView.hidePreloader, 500);
  });
}
