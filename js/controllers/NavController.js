import { AppState } from '../models/AppState.js';
import * as NavView from '../views/NavView.js';

/** Wires the hamburger menu to the full-screen overlay navigation. */
export function init() {
  const menuToggle = document.getElementById('menuToggle');
  const menuLabel = document.getElementById('menuLabel');
  const overlayNav = document.getElementById('overlayNav');
  if (!menuToggle || !overlayNav) return;

  function closeNav() {
    AppState.isMenuOpen = false;
    NavView.close(overlayNav, menuToggle, menuLabel);
  }

  menuToggle.addEventListener('click', () => {
    AppState.isMenuOpen = !AppState.isMenuOpen;
    if (AppState.isMenuOpen) NavView.open(overlayNav, menuToggle, menuLabel);
    else NavView.close(overlayNav, menuToggle, menuLabel);
  });

  overlayNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
}
