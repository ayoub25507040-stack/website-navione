import { AppState } from '../models/AppState.js';
import * as LanguageView from '../views/LanguageView.js';
import * as TransitionView from '../views/TransitionView.js';

// Timings for the 3D "blinds" veil transition.
const FADE = 600; // ms — matches the CSS opacity transition on #langTransition
const HOLD = 500; // ms the fully-covered state is held while the text swaps

let pendingTimers = [];
function clearPendingTimers() { pendingTimers.forEach(clearTimeout); pendingTimers = []; }
function after(fn, ms) { const id = setTimeout(fn, ms); pendingTimers.push(id); return id; }

/**
 * Plays the veil transition and swaps translated text at the midpoint,
 * once the page is fully covered — this is what makes the swap flicker-free.
 * Total runtime is fixed and short (~820ms), so it can never hang mid-way.
 */
function playTransition(lang) {
  if (AppState.isLangAnimating) return;
  AppState.isLangAnimating = true;
  clearPendingTimers();

  TransitionView.showVeil();

  after(() => {
    TransitionView.showCenterMark(lang === 'fr' ? 'Français' : 'English');
    TransitionView.setVeilDrift(true);
    LanguageView.applyTranslations(lang);
    LanguageView.updateToggleUI(lang);
  }, FADE);

  after(() => {
    TransitionView.hideCenterMark();
    TransitionView.setVeilDrift(false);
    TransitionView.hideVeil();
  }, FADE + HOLD);

  after(() => { AppState.isLangAnimating = false; }, FADE + HOLD + FADE + 60);
}

/** Wires the EN/FR toggle button to drive language switches. */
export function init() {
  const toggle = document.getElementById('langToggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    if (AppState.isLangAnimating) return;
    AppState.language = AppState.language === 'en' ? 'fr' : 'en';
    playTransition(AppState.language);
  });
}
