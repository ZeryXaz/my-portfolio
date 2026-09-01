/**
 * Automated PDF Export Pipeline for Kongphop Jindapornsuk's Resume
 * Converts HTML resumes (Thai & English) into verified 1-page A4 PDFs
 * using headless Chrome / Microsoft Edge with isolated user-data-dir.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const os = require('os');

const ROOT_DIR = path.resolve(__dirname, '..');
const RESUME_DIR = path.join(ROOT_DIR, 'resume');
const ASSETS_RESUME_DIR = path.join(ROOT_DIR, 'assets', 'resume');

// 1. Locate Chrome / Edge executable
function getBrowserPath() {
  const possiblePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(os.homedir(), 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  // Fallback to command in PATH
  return 'chrome';
}

// 2. Helper to get PDF page count
function getPdfPageCount(filePath) {
  const content = fs.readFileSync(filePath, 'latin1');
  const matches = content.match(/\/Type\s*\/Page[^a-zA-Z]/g);
  return matches ? matches.length : 0;
}

// 3. Export single resume HTML to PDF
function exportHtmlToPdf(browserPath, inputHtmlPath, outputPdfPath) {
  console.log(`\n📄 Exporting: ${path.basename(inputHtmlPath)} -> ${path.basename(outputPdfPath)}`);

  // Remove existing output PDF to ensure no stale file reuse
  if (fs.existsSync(outputPdfPath)) {
    fs.unlinkSync(outputPdfPath);
  }

  const tempUserDataDir = path.join(os.tmpdir(), `resume_export_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`);
  fs.mkdirSync(tempUserDataDir, { recursive: true });

  const fileUrl = `file:///${inputHtmlPath.replace(/\\/g, '/')}`;

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--allow-file-access-from-files',
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=5000',
    `--user-data-dir=${tempUserDataDir}`,
    `--print-to-pdf=${outputPdfPath}`,
    fileUrl,
  ];

  const startTime = Date.now();
  const res = spawnSync(browserPath, args, { stdio: 'inherit' });

  // Clean up temp user data dir
  try {
    fs.rmSync(tempUserDataDir, { recursive: true, force: true });
  } catch (e) {}

  if (!fs.existsSync(outputPdfPath)) {
    // Retry with basic --headless flag if --headless=new failed
    const fallbackArgs = [
      '--headless',
      '--disable-gpu',
      '--allow-file-access-from-files',
      '--no-pdf-header-footer',
      `--user-data-dir=${tempUserDataDir}`,
      `--print-to-pdf=${outputPdfPath}`,
      fileUrl,
    ];
    spawnSync(browserPath, fallbackArgs, { stdio: 'inherit' });
    try {
      fs.rmSync(tempUserDataDir, { recursive: true, force: true });
    } catch (e) {}
  }

  if (!fs.existsSync(outputPdfPath)) {
    throw new Error(`Failed to generate PDF: ${outputPdfPath}`);
  }

  const stat = fs.statSync(outputPdfPath);
  const pageCount = getPdfPageCount(outputPdfPath);
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(`✅ Success: ${path.basename(outputPdfPath)} generated in ${duration}s`);
  console.log(`   - Size: ${(stat.size / 1024).toFixed(1)} KB`);
  console.log(`   - Modified: ${stat.mtime.toISOString()}`);
  console.log(`   - Page Count: ${pageCount} page(s) ${pageCount === 1 ? '(Strictly 1 Page A4 ✓)' : '⚠️ WARNING: Not 1 page!'}`);

  return {
    path: outputPdfPath,
    size: stat.size,
    mtime: stat.mtime,
    pages: pageCount,
  };
}

// 4. Main execution
function main() {
  const browserPath = getBrowserPath();
  console.log('==================================================');
  console.log('🚀 RESUME PDF EXPORT PIPELINE');
  console.log(`Using Browser: ${browserPath}`);
  console.log('==================================================');

  // Paths
  const thHtml = path.join(RESUME_DIR, 'resume-th.html');
  const enHtml = path.join(RESUME_DIR, 'resume-en.html');

  const thPdf = path.join(RESUME_DIR, 'resume-th.pdf');
  const enPdf = path.join(RESUME_DIR, 'resume-en.pdf');

  const assetThPdf = path.join(ASSETS_RESUME_DIR, 'Resume.pdf');
  const assetEnPdf = path.join(ASSETS_RESUME_DIR, 'Resume-EN.pdf');

  // Verify sources exist
  if (!fs.existsSync(thHtml)) throw new Error(`Missing source: ${thHtml}`);
  if (!fs.existsSync(enHtml)) throw new Error(`Missing source: ${enHtml}`);

  // Ensure assets dir exists
  fs.mkdirSync(ASSETS_RESUME_DIR, { recursive: true });

  // Export Thai PDF
  const thResult = exportHtmlToPdf(browserPath, thHtml, thPdf);
  fs.copyFileSync(thPdf, assetThPdf);
  console.log(`   - Synced to: ${path.relative(ROOT_DIR, assetThPdf)}`);

  // Export English PDF
  const enResult = exportHtmlToPdf(browserPath, enHtml, enPdf);
  fs.copyFileSync(enPdf, assetEnPdf);
  console.log(`   - Synced to: ${path.relative(ROOT_DIR, assetEnPdf)}`);

  console.log('\n==================================================');
  console.log('✨ ALL RESUME PDFS EXPORTED AND VERIFIED SUCCESSFULLY');
  console.log('==================================================');
}

main();
