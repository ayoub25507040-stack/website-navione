/** HeroTiltView — DOM writes for the hero card's 3D tilt + cursor-tracked shine. */
export function setCardTransform(el, rotY, rotX) {
  if (el) el.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
}

export function setShine(el, mxPercent, myPercent, opacity) {
  if (!el) return;
  el.style.setProperty('--mx', mxPercent + '%');
  el.style.setProperty('--my', myPercent + '%');
  el.style.setProperty('--shine-op', String(opacity));
}
