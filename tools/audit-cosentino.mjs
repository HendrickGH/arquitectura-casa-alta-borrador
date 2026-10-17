import { chromium } from "playwright-core";
import fs from "fs";

const browser = await chromium.launch({
  executablePath:
    "/Users/hendrick/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  headless: true,
});

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
console.log("Navigating to https://www.cosentino.com/es/...");
await page.goto("https://www.cosentino.com/es/", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await page.waitForTimeout(3500);

// Accept cookies if present
try {
  const cookieBtn = await page.$("#onetrust-accept-btn-handler");
  if (cookieBtn) {
    await cookieBtn.click();
    await page.waitForTimeout(1000);
  }
} catch (e) {
  console.log("Cookie banner note:", e.message);
}

// Find sections and headings
const sections = await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll("h1, h2, h3, h4, [class*='meaningful'], [class*='inspiration'], [class*='gallery'], section"));
  return all.map((el) => ({
    tag: el.tagName,
    text: el.innerText ? el.innerText.trim().slice(0, 100) : "",
    className: typeof el.className === "string" ? el.className : "",
    id: el.id,
  })).filter((x) => x.text.length > 0);
});

console.log("Found sections count:", sections.length);
fs.writeFileSync("/tmp/cosentino-sections.json", JSON.stringify(sections, null, 2));

// Search for Meaningful Design and Inspiracion elements
const matches = await page.evaluate(() => {
  const result = [];
  const walk = (node) => {
    if (node.nodeType === 3) {
      const text = node.textContent.trim();
      if (/meaningful/i.test(text) || /galer[ií]a/i.test(text) || /inspiraci/i.test(text)) {
        if (node.parentElement) {
          result.push({
            text,
            tag: node.parentElement.tagName,
            className: node.parentElement.className,
            html: node.parentElement.outerHTML.slice(0, 300),
          });
        }
      }
    } else if (node.nodeType === 1) {
      for (const child of node.childNodes) walk(child);
    }
  };
  walk(document.body);
  return result;
});
console.log("Found text matches:", matches.length);
fs.writeFileSync("/tmp/cosentino-matches.json", JSON.stringify(matches, null, 2));

// Scroll and take screenshots
for (let y = 0; y <= 7000; y += 1000) {
  await page.evaluate((pos) => window.scrollTo(0, pos), y);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `/tmp/cosentino-y${y}.png` });
}

await browser.close();
console.log("Audit complete.");
