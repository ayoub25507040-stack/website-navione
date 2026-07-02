/** NavView — open/close DOM state for the full-screen overlay navigation. */
export function open(overlay, toggle, label) {
  overlay?.classList.add('open');
  toggle?.classList.add('open');
  if (label) label.textContent = 'Close';
}

export function close(overlay, toggle, label) {
  overlay?.classList.remove('open');
  toggle?.classList.remove('open');
  if (label) label.textContent = 'Menu';
}
