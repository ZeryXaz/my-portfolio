/**
 * typing.js - Single Responsibility: Typewriter Tagline Animation
 * Renders typing and deleting effect for hero section IT career titles.
 */

export function initTypingEffect(elementId, roles = []) {
  const targetElement = document.getElementById(elementId);
  if (!targetElement || roles.length === 0) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 50;
  const pauseDuration = 2000;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      targetElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      targetElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseDuration;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}
