/**
 * project-filter.js - Single Responsibility: Projects Rendering & Dynamic Category Filtering
 * Fetches data/projects.json and dynamically builds project cards with live filtering.
 */
import { initAntigravityAnimations } from './animation.js';

export async function initProjectFilter(containerId, jsonPath = 'data/projects.json', assetPrefix = '') {
  const container = document.getElementById(containerId);
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!container) return;

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const projects = await response.json();

    // Render Initial All Projects
    renderProjects(projects, container, assetPrefix);

    // ให้ Browser render DOM ก่อน แล้วค่อยเริ่ม Animation
    requestAnimationFrame(() => {
      initAntigravityAnimations();
    });

    // Setup Filter Button Event Listeners
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle Active Class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');
        if (category === 'all') {
          renderProjects(projects, container, assetPrefix);
        } else {
          const filtered = projects.filter(p => p.category === category);
          renderProjects(filtered, container, assetPrefix);
        }

        requestAnimationFrame(() => {
          initAntigravityAnimations();
        });
      });
    });

  } catch (error) {
    console.error('Error loading projects data:', error);
    container.innerHTML = `<p class="error-msg">ไม่สามารถโหลดข้อมูลผลงานได้ในขณะนี้ (${error.message})</p>`;
  }
}

function renderProjects(projectsList, container, assetPrefix) {
  if (!projectsList || projectsList.length === 0) {
    container.innerHTML = `<p class="no-projects-msg">ไม่พบผลงานในหมวดหมู่นี้</p>`;
    return;
  }

  container.innerHTML = projectsList.map((project, index) => {
    const delayClass = `antigravity-delay-${(index % 4) + 1}`;
    const imgPath = assetPrefix ? `${assetPrefix}${project.image}` : project.image;
    const videoPath = project.video
      ? (assetPrefix ? `${assetPrefix}${project.video}` : project.video)
      : null;
    const imageList = project.images || [project.image];
    const firstImage = assetPrefix
      ? `${assetPrefix}${imageList[0]}`
      : imageList[0];

    const tagsHTML = project.tags
      .map(tag => `<span class="tech-pill">${tag}</span>`)
      .join('');

    return `
      <article class="project-card antigravity-reveal ${delayClass}">
        <div class="project-thumb-wrapper">
          ${
            videoPath
              ? `
              <video
                class="project-thumb-img"
                autoplay
                muted
                loop
                playsinline>
                <source src="${videoPath}" type="video/mp4">
              </video>
              `
              : `
              <img
                src="${firstImage}"
                alt="${project.title}"
                class="project-thumb-img slideshow-img"
                data-images='${JSON.stringify(imageList)}'
                loading="lazy">

              ${
                imageList.length > 1
                  ? `
                  <div class="project-dots">
                    ${imageList
                      .map(
                        (_, i) => `
                        <span class="project-dot ${i === 0 ? "active" : ""}"
                              data-index="${i}"></span>`
                      )
                      .join("")}
                  </div>
                  `
                  : ""
              }
              `
          }

          <span class="project-category-badge">
            ${project.categoryName}
          </span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-tech-stack">
            ${tagsHTML}
          </div>
          <div class="project-links">
            ${project.github ? `
              <a href="${project.github}" target="_blank" class="project-link-btn">
                GitHub Code
              </a>
            ` : project.inProgress ? `
              <span class="project-link-btn disabled">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                In Progress
              </span>
            ` : ''}
           ${project.figma ? `
              <a href="${project.figma}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
                <svg role="img" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M15.783 2.1H12.26v4.522h3.522a2.261 2.261 0 000-4.522zm-3.522 9.044v4.522a2.261 2.261 0 104.522 0 2.261 2.261 0 00-4.522-4.522zm0-4.522v4.522h3.522a2.261 2.261 0 100-4.522H12.26zm-4.522 0h4.522V2.1H7.739a2.261 2.261 0 100 4.522zm0 4.522h4.522V6.622H7.739a2.261 2.261 0 100 4.522zm0 4.522h4.522v-4.522H7.739a2.261 2.261 0 100 4.522z"/>
                </svg>
                Figma
              </a>
            ` : ''}
            ${project.demo ? `
              <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Live Demo
              </a>
            ` : ''}
            ${project.prototype ? `
              <a href="${project.prototype}" target="_blank" class="project-link-btn">
                <!-- Play Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                View Prototype
              </a>
              ` : ''}
            ${project.slides ? `
              <a href="${project.slides}" target="_blank" class="project-link-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                View PDF
              </a>
              ` : ''}
          </div>
      </article>
    `;
  }).join('');
  container.querySelectorAll(".slideshow-img").forEach(img => {

    const images = JSON.parse(img.dataset.images);

    if (images.length <= 1) return;

    const wrapper = img.closest(".project-thumb-wrapper");
    const dots = wrapper.querySelectorAll(".project-dot");

    dots.forEach(dot => {

        dot.addEventListener("click", () => {

            const index = Number(dot.dataset.index);

            img.src = assetPrefix
                ? `${assetPrefix}${images[index]}`
                : images[index];

            dots.forEach(d => d.classList.remove("active"));
            dot.classList.add("active");

        });

    });

});
}
