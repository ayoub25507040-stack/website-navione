import * as CursorGlowView from '../views/CursorGlowView.js';

/** Ambient glow that follows the pointer; hides once the cursor leaves the window. */
export function init() {
  if (!document.getElementById('cursorGlow')) return;
  window.addEventListener('mousemove', (e) => CursorGlowView.moveTo(e.clientX, e.clientY));
  document.addEventListener('mouseleave', () => CursorGlowView.hide());
}
