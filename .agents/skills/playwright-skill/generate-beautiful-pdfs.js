const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('Starting beautiful PDF generation...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const rootDir = path.resolve(__dirname, '..', '..', '..');
  const templatesDir = path.join(rootDir, 'scripts', 'pdf-templates');

  // 1. Social Campaign
  console.log('Generating Social Campaign Deck PDF...');
  const socialUrl = 'file://' + path.join(templatesDir, 'social-campaign.html').replace(/\\/g, '/');
  await page.goto(socialUrl, { waitUntil: 'networkidle' });
  
  await page.pdf({
    path: path.join(rootDir, 'Shawarma_Social_Campaign_v4.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  console.log('✅ Saved Shawarma_Social_Campaign_v4.pdf');

  // 2. Case Study
  console.log('Generating Case Study PDF...');
  const caseUrl = 'file://' + path.join(templatesDir, 'case-study.html').replace(/\\/g, '/');
  await page.goto(caseUrl, { waitUntil: 'networkidle' });
  
  await page.pdf({
    path: path.join(rootDir, 'Shawarma_Case_Study_v4.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  console.log('✅ Saved Shawarma_Case_Study_v4.pdf');

  await browser.close();
  console.log('Done!');
})();
