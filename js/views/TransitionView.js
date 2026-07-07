/**
 * TransitionView — the shared full-screen veil + center mark (rings, logo,
 * label) used for both the language switch and page-to-page navigation, so
 * every transition on the site shares the same polished look.
 */
export function showVeil() {
  document.getElementById('langTransition')?.classList.add('show');
}
export function hideVeil() {
  document.getElementById('langTransition')?.classList.remove('show');
}
export function setVeilDrift(on) {
  document.getElementById('langTransition')?.classList.toggle('drift', on);
}

/** Shows the center mark (pulsing rings + logo) with the given label under it. */
export function showCenterMark(label) {
  const sub = document.getElementById('lcmSub');
  if (sub) sub.textContent = label;
  document.getElementById('langCenterMark')?.classList.add('show');
}
export function hideCenterMark() {
  document.getElementById('langCenterMark')?.classList.remove('show');
}
