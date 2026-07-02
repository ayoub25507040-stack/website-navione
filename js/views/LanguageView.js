/**
 * LanguageView — DOM reads/writes for the EN/FR switch.
 * Owns no state of its own; every function takes the target language
 * (or nothing) and applies it directly to the DOM.
 */

/** Swaps every translatable node's text/html to the given language. */
export function applyTranslations(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.getAttribute(lang === 'fr' ? 'data-fr' : 'data-en');
    if (val !== null) el.textContent = val;
  });
  document.querySelectorAll('[data-en-html]').forEach(el => {
    const val = el.getAttribute(lang === 'fr' ? 'data-fr-html' : 'data-en-html');
    if (val !== null) el.innerHTML = val;
  });
  document.documentElement.lang = lang;
}

/** Updates the EN/FR pill toggle to reflect the active language. */
export function updateToggleUI(lang) {
  const toggle = document.getElementById('langToggle');
  if (!toggle) return;
  toggle.classList.toggle('fr', lang === 'fr');
  toggle.querySelectorAll('.lt-opt').forEach(o => o.classList.toggle('active', o.dataset.lang === lang));
}

export function showVeil() {
  document.getElementById('langTransition')?.classList.add('show');
}
export function hideVeil() {
  document.getElementById('langTransition')?.classList.remove('show');
}
export function setVeilDrift(on) {
  document.getElementById('langTransition')?.classList.toggle('drift', on);
}

export function showCenterMark(lang) {
  const sub = document.getElementById('lcmSub');
  if (sub) sub.textContent = lang === 'fr' ? 'Français' : 'English';
  document.getElementById('langCenterMark')?.classList.add('show');
}
export function hideCenterMark() {
  document.getElementById('langCenterMark')?.classList.remove('show');
}
