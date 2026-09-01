# My Portfolio

A modern, responsive, and interactive personal portfolio website built with **HTML5**, **CSS3**, and **Vanilla JavaScript (ES Modules)**.

This portfolio showcases my profile, technical skills, academic projects, certificates, activities, resume, and contact information in a clean and professional design.

🌐 **Live Website:** https://kongphop-portfolio.vercel.app/
🐙 **GitHub:** https://github.com/ZeryXaz/my-portfolio

---

## About

This portfolio was developed to present my academic projects, technical skills, and achievements as an **Information Technology student**.

The website uses a modular structure with reusable HTML components, separated CSS and JavaScript files, and JSON-based data management. It is designed to provide a responsive experience across desktop, tablet, and mobile devices.

---

## Features

* Responsive design
* Dark / Light mode
* Typing animation
* Scroll animations
* Project filtering
* Modular HTML components
* JSON-based data management
* Project showcase
* Technical skills section
* Certificates section
* Activities section
* Contact section
* Thai and English resume
* Resume PDF files
* Resume PDF export and verification scripts
* SEO-friendly structure
* Favicon and Web Manifest
* Vercel deployment

---

## Project Structure

```text
portfolio/
│
├── index.html
├── package.json
├── README.md
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json
├── export-pdf.ps1
├── serve.ps1
│
├── assets/
│   ├── files/
│   ├── icons/
│   ├── images/
│   │   └── certificates/
│   ├── resume/
│   └── video/
│
├── components/
│   ├── footer.html
│   └── navbar.html
│
├── css/
│   ├── about.css
│   ├── animation.css
│   ├── certificates.css
│   ├── contact.css
│   ├── footer.css
│   ├── hero.css
│   ├── navbar.css
│   ├── projects.css
│   ├── reset.css
│   ├── responsive.css
│   ├── skills.css
│   ├── timeline.css
│   └── variables.css
│
├── data/
│   ├── certificates.json
│   ├── projects.json
│   └── skills.json
│
├── js/
│   ├── animation.js
│   ├── darkmode.js
│   ├── main.js
│   ├── navbar.js
│   ├── project-filter.js
│   ├── scroll.js
│   └── typing.js
│
├── pages/
│   ├── about.html
│   ├── certificates.html
│   ├── contact.html
│   └── projects.html
│
├── resume/
│   ├── fonts/
│   ├── index.html
│   ├── resume.css
│   ├── resume-en.css
│   ├── resume-en.html
│   ├── resume-en.pdf
│   ├── resume-th.css
│   ├── resume-th.html
│   └── resume-th.pdf
│
└── scripts/
    ├── export-pdf.js
    └── verify-pdf.js
```

---

## Technologies

* HTML5
* CSS3
* JavaScript (ES6 Modules)
* JSON
* EmailJS
* Git
* GitHub
* Vercel
* PowerShell
* PDF Export Tools

---

## Resume

The project includes both **Thai and English versions** of my resume.

Resume source files, stylesheets, fonts, and generated PDF files are stored in:

```text
resume/
```

PDF copies used by the main portfolio website are stored separately in:

```text
assets/resume/
```

---

## PDF Export

The project includes scripts for generating and verifying resume PDF files.

### Export Script

```text
scripts/export-pdf.js
```

### PDF Verification

```text
scripts/verify-pdf.js
```

### PowerShell Export Script

```text
export-pdf.ps1
```

These scripts are used to generate and verify the resume PDF output.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ZeryXaz/my-portfolio.git
```

### 2. Go to the Project Directory

```bash
cd my-portfolio
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Locally

Open the project using a local web server.

You can also use the included PowerShell development script:

```powershell
.\serve.ps1
```

---

## Deployment

This project is deployed using **Vercel**.

### Live Website

https://kongphop-portfolio.vercel.app/

### Deploy Your Own Version

1. Fork or clone this repository.
2. Import the repository into Vercel.
3. Configure the project as a static website if required.
4. Deploy.

---

## Contact

**Kongphop Jindapornsuk**

Email: [kongphop693@gmail.com](mailto:kongphop693@gmail.com)

Portfolio: https://kongphop-portfolio.vercel.app/

GitHub: https://github.com/ZeryXaz

---

## License

This project is available for personal and educational use.
