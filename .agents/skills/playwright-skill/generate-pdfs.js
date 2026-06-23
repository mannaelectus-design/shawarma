const { chromium } = require('playwright');
const path = require('path');

const TARGET_URL_SOCIAL = 'http://localhost:5173/social-campaign';
const TARGET_URL_CASE = 'http://localhost:5173/case-study';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Generating Social Campaign Deck PDF...');
  await page.goto(TARGET_URL_SOCIAL, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: path.join(__dirname, 'Shawarma_Social_Campaign.pdf'),
    format: 'A4',
    printBackground: true,
  });
  console.log('Saved Shawarma_Social_Campaign.pdf');

  console.log('Generating Case Study PDF...');
  await page.goto(TARGET_URL_CASE, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: path.join(__dirname, 'Shawarma_Case_Study.pdf'),
    format: 'A4',
    printBackground: true,
  });
  console.log('Saved Shawarma_Case_Study.pdf');

  await browser.close();
})();
