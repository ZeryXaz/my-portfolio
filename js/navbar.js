/**
 * navbar.js - Single Responsibility: Navigation UI & Link State
 * Manages sticky navbar scroll backdrop, mobile drawer toggle, and active link state.
 */

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (!navbar) return;

  // Sticky Navbar Scroll Listener
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Drawer Toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isActive = hamburgerBtn.classList.toggle('is-active');
      navMenu.classList.toggle('is-active');
      hamburgerBtn.setAttribute('aria-expanded', isActive);
    });

    // Close menu when clicking a link inside mobile drawer
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('is-active');
        navMenu.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight Active Link based on current page URL
  highlightActiveLink();
}

function highlightActiveLink() {
  let currentPath = window.location.pathname.toLowerCase();

  // Normalize current path
  if (currentPath === "/" || currentPath === "/index.html") {
    currentPath = "/index";
  } else {
    currentPath = currentPath.replace(/\.html$/, "");
  }

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");

    let linkPath = new URL(link.href).pathname.toLowerCase();

    if (linkPath === "/" || linkPath === "/index.html") {
      linkPath = "/index";
    } else {
      linkPath = linkPath.replace(/\.html$/, "");
    }

    if (currentPath === linkPath) {
      link.classList.add("active");
    }
  });
}