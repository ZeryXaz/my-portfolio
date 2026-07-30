/**
 * main.js - Master Application Entry & Component Loader
 * Loads HTML components (navbar, footer), adjusts relative paths for subpages,
 * and initializes feature modules.
 */

import { initDarkMode } from './darkmode.js';
import { initNavbar } from './navbar.js';
import { initTypingEffect } from './typing.js';
import { initScrollControls } from './scroll.js';
import { initAntigravityAnimations } from './animation.js';
import { initProjectFilter } from './project-filter.js';

document.addEventListener('DOMContentLoaded', async () => {
  const isSubpage = window.location.pathname.includes('/pages/');
  const componentPathPrefix = isSubpage ? '../components/' : './components/';
  const dataPathPrefix = isSubpage ? '../data/' : './data/';
  const assetPathPrefix = isSubpage ? '../' : './';

  // Step 1: Load Navbar Component
  await loadComponent('navbar-placeholder', `${componentPathPrefix}navbar.html`, (el) => {
    fixRelativeLinks(el, isSubpage);
  });

  // Step 2: Load Footer Component
  await loadComponent('footer-placeholder', `${componentPathPrefix}footer.html`, (el) => {
    fixRelativeLinks(el, isSubpage);
  });

  // Step 3: Initialize Global Core Modules
  initDarkMode();
  initNavbar();
  initScrollControls();

  // Step 4: Page-Specific Initialization
  initPageFeatures(isSubpage, dataPathPrefix, assetPathPrefix);

  // Step 5: Trigger Antigravity Animations Observer
  initAntigravityAnimations();
});

/**
 * Helper to fetch and inject external HTML component partials
 */
async function loadComponent(placeholderId, filePath, callback) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const htmlText = await response.text();
    placeholder.innerHTML = htmlText;

    if (callback) callback(placeholder);
  } catch (error) {
    console.error(`Failed to load component from ${filePath}:`, error);
  }
}

/**
 * Adjusts relative link URLs in dynamically injected components for subpages inside /pages/
 */
function fixRelativeLinks(container, isSubpage) {
  if (!isSubpage) return;

  // Fix nav and footer links
  container.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;

    if (href === 'index.html') {
      a.setAttribute('href', '../index.html');
    } else if (href.startsWith('pages/')) {
      a.setAttribute('href', `../${href}`);
    } else if (href.startsWith('assets/')) {
      a.setAttribute('href', `../${href}`);
    }
  });

  // Fix brand logo href
  const navLogo = container.querySelector('#nav-logo-link');
  if (navLogo) navLogo.setAttribute('href', '../index.html');
  const footerLogo = container.querySelector('#footer-logo-link');
  if (footerLogo) footerLogo.setAttribute('href', '../index.html');
}

/**
 * Initializes section/page specific features based on active DOM elements
 */
function initPageFeatures(isSubpage, dataPrefix, assetPrefix) {
  // Hero Tagline Typing Effect
  if (document.getElementById('typing-role')) {
    initTypingEffect('typing-role', [
      'ก้องภพ จินดาพรสุข',
      'นักศึกษาเทคโนโลยีสารสนเทศ',
      'IT Support',
      'Web Developer'
    ]);
  }

  // Projects Grid Filtering
  if (document.getElementById('projects-grid-container')) {
    initProjectFilter('projects-grid-container', `${dataPrefix}projects.json`, assetPrefix);
  }

  // Skills Data Loading
  if (document.getElementById('skills-container')) {
    loadSkillsData(`${dataPrefix}skills.json`);
  }

  // Certificates Data Loading
  if (document.getElementById('certificates-container')) {
    loadCertificatesData(`${dataPrefix}certificates.json`, assetPrefix);
  }

  // Contact Form Handling
  if (document.getElementById('contact-form')) {
    initContactForm();
  }
}

/**
 * Load and render skills from JSON dataset
 */
async function loadSkillsData(jsonPath) {
  const container = document.getElementById('skills-container');
  if (!container) return;

  try {
    const res = await fetch(jsonPath);
    const data = await res.json();

    container.innerHTML = data.categories.map(cat => `
      <div class="skills-category-card antigravity-reveal">
        <div class="category-header">
          <div class="category-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </div>
          <h3 class="category-title">${cat.title}</h3>
        </div>
        <div class="skills-list">
          ${cat.skills.map(s => `
            <div class="skill-item">
              <div class="skill-item-header">
                <span class="skill-name">${s.name}</span>
                <span class="skill-level-badge">${s.level}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    initAntigravityAnimations();
  } catch (err) {
    console.error('Error loading skills data:', err);
  }
}

/**
 * Load and render certificates from JSON dataset
 */
async function loadCertificatesData(jsonPath, assetPrefix) {
  const container = document.getElementById('certificates-container');
  if (!container) return;

  try {
    const res = await fetch(jsonPath);
    const certs = await res.json();

    container.innerHTML = certs.map(c => {
      const imgPath = assetPrefix ? `${assetPrefix}${c.image}` : c.image;
      const pdfPath = assetPrefix ? `${assetPrefix}${c.pdf}` : c.pdf;
      return `
        <article class="certificate-card antigravity-reveal">
          <div class="cert-img-wrapper">
            <img src="${imgPath}" alt="${c.title}" class="cert-img" loading="lazy" />
          </div>
          <div class="cert-body">
            <span class="cert-issuer">${c.issuer}</span>
            <h3 class="cert-title">${c.title}</h3>
            <span class="cert-date">${c.date} • ID: ${c.credentialId}</span>
            <p class="cert-desc">${c.description}</p>
            <a href="${pdfPath}" target="_blank" rel="noopener noreferrer" class="cert-verify-link">
              View Certificate →
            </a>
          </div>
        </article>
      `;
    }).join('');

    initAntigravityAnimations();
  } catch (err) {
    console.error('Error loading certificates data:', err);
  }
}

/**
 * Interactive Contact Form Submission Handler
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const alertBox = document.getElementById("form-status-alert");
  const sendBtn = document.getElementById("send-btn");

  if (!form || !alertBox || !sendBtn) return;

  emailjs.init({
    publicKey: "LsGItebPFWOqx1GnC"
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alertBox.textContent = "กรุณากรอกข้อมูลให้ครบทุกช่อง";
      alertBox.className = "form-status-alert error";
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "กำลังส่ง...";

    try {

      await emailjs.send(
        "service_yisiuji",
        "template_nt1py7l",
        {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message
        }
      );

      alertBox.textContent = "✅ ส่งข้อความเรียบร้อยแล้ว";
      alertBox.className = "form-status-alert success";

      form.reset();

    } catch (err) {

      console.error(err);

      alertBox.textContent = "❌ ส่งข้อความไม่สำเร็จ";
      alertBox.className = "form-status-alert error";

    } finally {

      sendBtn.disabled = false;
      sendBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg"
      width="18" height="18"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 24 24">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
      ส่งข้อความ (Send Message)
      `;
    }

  });
}
