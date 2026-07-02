/**
 * NAVIONE — front-end entry point.
 *
 * MVC layering:
 *   models/      single source of truth for runtime state (AppState)
 *   views/       read/write the DOM, no event listeners, no state
 *   controllers/ listen for DOM events and coordinate Model + View
 *
 * This file just wires every Controller to the page once it's parsed.
 */
import * as PreloaderController from './controllers/PreloaderController.js';
import * as LanguageController from './controllers/LanguageController.js';
import * as ModalController from './controllers/ModalController.js';
import * as CursorGlowController from './controllers/CursorGlowController.js';
import * as AboutTiltController from './controllers/AboutTiltController.js';
import * as HeroTiltController from './controllers/HeroTiltController.js';
import * as ScrollController from './controllers/ScrollController.js';
import * as NavController from './controllers/NavController.js';
import * as RevealController from './controllers/RevealController.js';
import * as CounterController from './controllers/CounterController.js';
import * as TabsController from './controllers/TabsController.js';

function init() {
  PreloaderController.init();
  LanguageController.init();
  ModalController.init();
  CursorGlowController.init();
  AboutTiltController.init();
  HeroTiltController.init();
  ScrollController.init();
  NavController.init();
  RevealController.init();
  CounterController.init();
  TabsController.init();
}

document.addEventListener('DOMContentLoaded', init);
