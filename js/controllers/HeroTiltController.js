import { AppState } from '../models/AppState.js';
import * as HeroTiltView from '../views/HeroTiltView.js';

/** Spring-lerp 3D tilt + cursor-tracked shine + idle float on the hero photo card. */
export function init() {
  const stage = document.querySelector('.hero-3d-stage');
  const card = document.getElementById('hero3dCard');
  const shine = document.getElementById('hero3dShine');
  if (!stage || !card) return;

  const tilt = AppState.heroTilt;

  stage.addEventListener('mousemove', (e) => {
    tilt.hovering = true;
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    tilt.target.rotY = (px - 0.5) * 40 - 14;
    tilt.target.rotX = (0.5 - py) * 28 + 6;
    HeroTiltView.setShine(shine, px * 100, py * 100, 1);
  });

  stage.addEventListener('mouseleave', () => {
    tilt.hovering = false;
    tilt.target = { ...tilt.rest };
    HeroTiltView.setShine(shine, 50, 30, 0);
  });

  function animate() {
    tilt.time += 0.012;
    // Spring-lerp toward target for a smooth, weighted feel.
    tilt.current.rotY += (tilt.target.rotY - tilt.current.rotY) * 0.08;
    tilt.current.rotX += (tilt.target.rotX - tilt.current.rotX) * 0.08;
    // Gentle idle drift when the pointer isn't engaging the card.
    const idle = tilt.hovering ? 0 : Math.sin(tilt.time) * 2.5;
    HeroTiltView.setCardTransform(card, tilt.current.rotY + idle, tilt.current.rotX);
    requestAnimationFrame(animate);
  }
  animate();
}
