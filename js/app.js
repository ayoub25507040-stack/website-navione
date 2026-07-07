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
import * as PageTransitionController from './controllers/PageTransitionController.js?v=202607071540';
import * as PreloaderController from './controllers/PreloaderController.js?v=202607071540';
import * as LanguageController from './controllers/LanguageController.js?v=202607071540';
import * as ModalController from './controllers/ModalController.js?v=202607071540';
import * as SolutionModalController from './controllers/SolutionModalController.js?v=202607071540';
import * as CursorGlowController from './controllers/CursorGlowController.js?v=202607071540';
import * as AboutTiltController from './controllers/AboutTiltController.js?v=202607071540';
import * as HeroTiltController from './controllers/HeroTiltController.js?v=202607071540';
import * as ScrollController from './controllers/ScrollController.js?v=202607071540';
import * as NavController from './controllers/NavController.js?v=202607071540';
import * as RevealController from './controllers/RevealController.js?v=202607071540';
import * as CounterController from './controllers/CounterController.js?v=202607071540';
import * as TabsController from './controllers/TabsController.js?v=202607071540';

function init() {
  PageTransitionController.init();
  PreloaderController.init();
  LanguageController.init();
  ModalController.init();
  SolutionModalController.init();
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
