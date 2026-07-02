/**
 * AppState — single in-memory store for anything that changes while the
 * page is open (current language, animation flags, tilt values).
 * Views read from it to know what to render; Controllers are the only
 * code allowed to mutate it.
 */
export const AppState = {
  language: 'en',
  isLangAnimating: false,
  isMenuOpen: false,
  isModalOpen: false,

  // Hero card 3D tilt — spring-lerp target/current + idle-drift toggle
  heroTilt: {
    rest: { rotY: -14, rotX: 6 },
    target: { rotY: -14, rotX: 6 },
    current: { rotY: -14, rotX: 6 },
    hovering: false,
    time: 0
  }
};
