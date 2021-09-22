const puppeteer = require('puppeteer');
const url = 'https://www.google.com/maps/';
const cities = [
  'Lyon 1e',
  'Gennevilliers',
  'Paris 01',
  'Paris 10',
  'Paris 12',
  'Strasbourg',
  'Nice',
  'Paris 15',
  'Neuilly-Sur-Seine',
  'Boulogne-Billancourt',
  'Aubervilliers',
  'Colombes',
  'Nanterre',
  'Paris 17',
  'Paris 18',
  'Paris 5e',
  'Asnières-Sur-Seine',
  'Paris 9',
  'Savigny-Sur-Orge',
  'Toulouse',
  'Paris 9',
  'Bezons',
];
const takeScreenShot = async (page, city) => {
  await page.goto(`${url}search/${city}`);
  await page.waitForTimeout(5000);
  await page.mouse.click(1300, 800);
  await page.keyboard.press('Minus');
  await page.waitForTimeout(5000);
  await page.screenshot({
    path: `./${city}.png`,
    clip: { width: 535, height: 711, x: 520, y: 100 },
  });
};
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 30000,
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1400, height: 900 });
  for (const city of cities) {
    await takeScreenShot(page, city);
    console.log(`${city} screenshot saved`);
  }
  await page.close();
  await browser.close();
})();
