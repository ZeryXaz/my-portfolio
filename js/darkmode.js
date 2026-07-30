/**
 * darkmode.js - Single Responsibility: Light/Dark Theme Management
 * Manages theme toggling, localStorage persistence, and system preference detection.
 */

export function initDarkMode() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'portfolio_theme';

  // Detect initial theme
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  // Apply theme to html root tag
  applyTheme(initialTheme);

  // Event listener for toggle button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }
}
