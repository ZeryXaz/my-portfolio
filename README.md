# IT Student Web Portfolio (Modular & Data-Driven)

A modern, minimal, highly responsive, and high-performance Web Portfolio for Information Technology (IT) students. Built adhering to strict **HTML5**, **CSS3**, and **Vanilla JavaScript (ES Modules)** standards with complete separation of concerns, JSON data abstraction, reusable component partials, and zero external framework dependencies.

---

## Project Overview

This web application serves as a professional showcase for an IT undergraduate student. It highlights technical competencies across Full-Stack Web Development, Cloud Computing, Cybersecurity, and System Architecture. The site features dynamic theme switching (Dark/Light mode), card filtering, typewriter hero effects, custom Antigravity micro-animations via `IntersectionObserver`, and interactive contact forms.

---

## Features

- 🎨 **Modern Minimal Professional Aesthetic**: Tailored HSL color palette with smooth glassmorphism and subtle micro-interactions.
- 🌗 **Dark / Light Mode**: Instant theme switching backed by `localStorage` persistence and automatic OS preference detection.
- 📱 **100% Responsive Design**: Optimized layouts for Desktop, Tablet, and Mobile devices with an interactive drawer menu.
- 🧩 **Modular Architecture**: Component partials (`navbar.html`, `footer.html`) dynamically loaded into root and subpages.
- 📊 **JSON Data Separation**: Portfolio items, skills, and certificates managed cleanly inside the `data/` directory.
- ⚡ **Antigravity Animations**: Lightweight GPU-accelerated scroll reveal, timeline fade, hover lift, image zoom, and skill progress bars without heavy external libraries.
- 🔍 **SEO & Vercel Optimized**: Includes `robots.txt`, `sitemap.xml`, `favicon.ico`, `site.webmanifest`, `vercel.json`, and 100% relative paths for immediate production deployment.

---

## Folder Structure

```
portfolio/
│
├── index.html                  # Main homepage (Hero, Bio summary, Featured projects, Contact CTA)
├── README.md                   # Complete documentation
├── robots.txt                  # Search engine crawling directives
├── sitemap.xml                 # XML Sitemap
├── favicon.ico                 # Site favicon
├── site.webmanifest            # PWA manifest
├── vercel.json                 # Vercel deployment headers & configuration
│
├── assets/
│   ├── images/
│   │   ├── profile.jpg         # Profile portrait image
│   │   ├── project1.png        # Web app project thumbnail
│   │   ├── project2.png        # Cloud & mobile project thumbnail
│   │   └── certificates/
│   │       └── cert1.png       # Cloud & Security certificate sample
│   ├── icons/                  # SVG icons
│   └── resume/
│       └── Resume.pdf          # Downloadable PDF Resume
│
├── components/                 # Reusable HTML Component Partials
│   ├── navbar.html             # Navigation bar HTML
│   └── footer.html             # Footer HTML
│
├── data/                       # JSON Datasets
│   ├── projects.json           # Filterable projects dataset
│   ├── skills.json             # Categorized skills & proficiency percentages
│   └── certificates.json       # Accredited certifications list
│
├── css/                        # Modular CSS Files
│   ├── variables.css           # CSS Variables & Theme tokens
│   ├── reset.css               # Clean baseline reset
│   ├── navbar.css              # Navigation & mobile drawer styling
│   ├── hero.css                # Hero section & profile badge layout
│   ├── about.css               # Biography grid & GPA highlight card
│   ├── projects.css            # Project grid & filter tabs styling
│   ├── skills.css              # Skill category grid & progress bars
│   ├── timeline.css            # Education timeline
│   ├── certificates.css        # Certificate cards & lightbox preview
│   ├── contact.css             # Contact form & social cards
│   ├── footer.css              # Footer layout & copyright
│   ├── animation.css           # Antigravity scroll reveal micro-animations
│   └── responsive.css          # Media queries for Desktop, Tablet, Mobile
│
├── js/                         # Modular Single-Responsibility JavaScript
│   ├── main.js                 # App entry point, component fetch loader & router
│   ├── navbar.js               # Sticky navigation backdrop & mobile menu drawer
│   ├── animation.js            # IntersectionObserver animation engine
│   ├── scroll.js               # Smooth scrolling & scroll-to-top button
│   ├── darkmode.js             # Theme switcher with localStorage sync
│   ├── project-filter.js       # Dynamic project card rendering & category tabs
│   └── typing.js               # Hero typewriter text animation
│
└── pages/                      # Multi-Page Views
    ├── about.html              # Full biography, GPA, career goals & education
    ├── projects.html           # Full filterable projects catalogue
    ├── certificates.html       # Verified certificates showcase
    └── contact.html            # Dedicated contact page & interactive form
```

---

## Installation

Since this project relies purely on standard HTML5, CSS3, and Vanilla JavaScript (ES Modules), no heavy build tools, transpilers, or `node_modules` installation is required!

1. Clone or download the repository into your local directory:
   ```bash
   git clone https://github.com/your-username/it-portfolio.git
   cd portfolio
   ```

2. Verify that all asset files, JSON datasets, and subpages are present in their corresponding subfolders.

---

## Local Development

Due to ES Module security policies (`import` and `fetch()` calls for components & JSON datasets), open the project using a local static web server rather than opening `index.html` directly via `file://`.

### Method 1: Using VS Code Live Server Extension
1. Open the `portfolio/` folder in Visual Studio Code.
2. Click **Go Live** at the bottom right status bar (or right-click `index.html` and select **Open with Live Server**).
3. Access the web app at `http://127.0.0.1:5500/index.html`.

### Method 2: Using Python Simple HTTP Server
```bash
# Python 3.x
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

### Method 3: Using Node.js `npx serve`
```bash
npx serve .
```

---

## Deploy to Vercel

This portfolio is 100% production-ready for **Vercel** instant deployment.

1. Install Vercel CLI (optional) or connect your GitHub repository to [Vercel Dashboard](https://vercel.com).
2. **Framework Preset**: Select **Other** or **Static HTML**.
3. **Root Directory**: Select `portfolio/` (or `./`).
4. Click **Deploy**. Vercel will automatically serve the static files, honor `vercel.json` security headers, and resolve relative paths.

---

## Technologies Used

- **HTML5**: Semantic elements, accessibility ARIA attributes, SEO meta tags.
- **CSS3**: CSS Variables (Custom Properties), Flexbox, CSS Grid, Glassmorphic backdrop filters, custom GPU keyframes.
- **JavaScript (Vanilla ES6+)**: Native ES Modules (`import`/`export`), `fetch` API, `IntersectionObserver`, `localStorage`.

---

## License

This project is licensed under the **MIT License**. Feel free to customize and use it for your personal IT student portfolio!
