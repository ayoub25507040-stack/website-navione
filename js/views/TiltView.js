/** TiltView — applies a rotateY/rotateX transform to a 3D-tilted element. */
export function setTransform(el, rotY, rotX) {
  if (el) el.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
}
