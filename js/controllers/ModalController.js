import { AppState } from '../models/AppState.js';
import * as ModalView from '../views/ModalView.js';

/** Wires every contact-modal trigger, its close button, backdrop and Escape key. */
export function init() {
  const modal = document.getElementById('contactModal');
  if (!modal) return;

  function closeModal() {
    ModalView.close();
    AppState.isModalOpen = false;
  }

  document.querySelectorAll('.contact-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      ModalView.open();
      AppState.isModalOpen = true;
    });
  });

  document.getElementById('contactModalBackdrop')?.addEventListener('click', closeModal);
  document.getElementById('contactModalClose')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && ModalView.isOpen()) closeModal();
  });
}
