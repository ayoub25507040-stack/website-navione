/** SolutionModalView — open/close DOM state and panel switching for the "See More" detail modal. */
const modal = () => document.getElementById('solutionModal');

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

/** Shows the detail panel matching the given solution id (e.g. "t1"), hides the rest. */
export function showPanel(solutionId) {
  document.querySelectorAll('.solution-detail-panel').forEach(panel => {
    panel.classList.toggle('active', panel.dataset.solution === solutionId);
  });
}
