import * as TiltView from '../views/TiltView.js';

const REST = { rotY: 10, rotX: -4 };

/** Mouse-tracked 3D tilt on the About section photo card. */
export function init() {
  const stage = document.querySelector('.about-visual.tilt-3d');
  const inner = stage?.querySelector('.tilt-inner');
  if (!stage || !inner) return;

  stage.addEventListener('mousemove', (e) => {
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotY = (px - 0.5) * 22 + 4;
    const rotX = (0.5 - py) * 16 - 2;
    TiltView.setTransform(inner, rotY, rotX);
  });

  stage.addEventListener('mouseleave', () => {
    TiltView.setTransform(inner, REST.rotY, REST.rotX);
  });
}
