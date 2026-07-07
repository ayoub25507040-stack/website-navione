import * as SolutionModalView from '../views/SolutionModalView.js';

/** Wires every "See More" solution link, the modal's close button, backdrop and Escape key. */
export function init() {
  const modal = document.getElementById('solutionModal');
  if (!modal) return;

  function closeModal() {
    SolutionModalView.close();
  }

  document.querySelectorAll('.solution-more').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      SolutionModalView.showPanel(el.dataset.solution);
      SolutionModalView.open();
    });
  });

  document.getElementById('solutionModalBackdrop')?.addEventListener('click', closeModal);
  document.getElementById('solutionModalClose')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && SolutionModalView.isOpen()) closeModal();
  });
}
