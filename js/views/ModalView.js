/** ModalView — open/close DOM state for the contact modal. */
const modal = () => document.getElementById('contactModal');

export function open() {
  modal()?.classList.add('open');
  modal()?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

export function close() {
  modal()?.classList.remove('open');
  modal()?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

export function isOpen() {
  return modal()?.classList.contains('open') ?? false;
}
