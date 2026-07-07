import * as PageTransitionView from '../views/PageTransitionView.js';
import * as TransitionView from '../views/TransitionView.js';

const REVEAL_DELAY = 150; // ms before the entrance fade starts, so it reads as intentional
const MARK_DELAY = 200;   // ms to wait after covering before the logo mark appears, so it never pops in over a still-transparent veil
const HOLD = 500;         // ms the mark stays on screen (rings pulsing) before the browser actually navigates

/** True for links that should navigate to another local page (not an in-page anchor,
 *  not external, not opened in a new tab). */
function isLocalPageLink(link) {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#')) return false;
  if (link.target === '_blank') return false;
  if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  return true;
}

/** Reveals the page shortly after load, and plays a cover + logo-mark send-off
 *  before following any link to a local sub-page (e.g. bovi-gest/). */
export function init() {
  setTimeout(PageTransitionView.reveal, REVEAL_DELAY);

  document.querySelectorAll('a[href]').forEach(link => {
    if (!isLocalPageLink(link)) return;
    link.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();

      PageTransitionView.cover();
      const label = link.dataset.transitionLabel || document.title.split(' ')[0];
      setTimeout(() => TransitionView.showCenterMark(label), MARK_DELAY);
      setTimeout(() => { window.location.href = link.href; }, MARK_DELAY + HOLD);
    });
  });
}
