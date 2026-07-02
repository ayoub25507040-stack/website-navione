/** CursorGlowView — positions the ambient glow that follows the pointer. */
const glow = () => document.getElementById('cursorGlow');

export function moveTo(x, y) {
  const el = glow();
  if (!el) return;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.opacity = '1';
}

export function hide() {
  const el = glow();
  if (el) el.style.opacity = '0';
}
