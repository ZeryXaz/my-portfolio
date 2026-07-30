/**
 * animation.js - Single Responsibility: Antigravity Animation Engine
 * Uses IntersectionObserver to reveal elements on scroll and animate progress bars.
 */

export function initAntigravityAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Animate skill progress bars if entry contains one
        const progressFill = entry.target.querySelector('.skill-progress-fill');
        if (progressFill) {
          const targetPercentage = progressFill.getAttribute('data-percentage');
          if (targetPercentage) {
            progressFill.style.width = targetPercentage + '%';
          }
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements marked for reveal animation
  const animateElements = document.querySelectorAll(
    '.antigravity-reveal, .card-reveal, .timeline-anim, .skills-category-card, .project-card, .certificate-card'
  );

  animateElements.forEach(el => {
    if (!el.classList.contains('antigravity-reveal')) {
      el.classList.add('antigravity-reveal');
    }
    revealObserver.observe(el);
  });
}
