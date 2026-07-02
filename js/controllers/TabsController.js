import * as TabsView from '../views/TabsView.js';

/** Wires each .tabs group (the Solutions section has two) independently. */
export function init() {
  document.querySelectorAll('.tabs').forEach(tabsEl => {
    const btns = Array.from(tabsEl.querySelectorAll('.tab-btn'));
    const panels = btns.map(b => document.getElementById(b.dataset.tab)).filter(Boolean);

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = document.getElementById(btn.dataset.tab);
        if (panel) TabsView.activate(btns, panels, btn, panel);
      });
    });
  });
}
