/** TabsView — swaps the active button/panel pair within one tab group. */
export function activate(btns, panels, activeBtn, activePanel) {
  btns.forEach(b => b.classList.remove('active'));
  panels.forEach(p => p.classList.remove('active'));
  activeBtn.classList.add('active');
  activePanel.classList.add('active');
}
