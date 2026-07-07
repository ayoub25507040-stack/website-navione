/** PageTransitionView — opacity toggling for the full-page fade veil. */
const veil = () => document.getElementById('pageTransition');

/** Fades the veil away, revealing the page (used right after load). */
export function reveal() {
  veil()?.classList.add('hidden');
  veil()?.classList.remove('leaving');
}

/** Fades the veil back in to fully cover the page before navigating away. */
export function cover() {
  veil()?.classList.remove('hidden');
  veil()?.classList.add('leaving');
}
