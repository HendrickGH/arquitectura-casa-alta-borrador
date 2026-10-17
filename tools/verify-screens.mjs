import { chromium } from "playwright-core";
import { spawn } from "node:child_process";

const executablePath =
  "/Users/hendrick/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

async function main() {
  console.log("Starting next server...");
  const server = spawn("pnpm", ["start", "-p", "3333"], {
    stdio: "inherit",
    detached: true,
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const browser = await chromium.launch({
      executablePath,
      headless: true,
    });
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
    });

    console.log("Visiting landing page...");
    await page.goto("http://localhost:3333", { waitUntil: "networkidle" });
    await page.screenshot({ path: "/tmp/casa-alta-landing-hero.png" });

    console.log("Visiting /arquitectura-interiores...");
    await page.goto("http://localhost:3333/arquitectura-interiores", {
      waitUntil: "networkidle",
    });
    await page.screenshot({ path: "/tmp/casa-alta-interiores-hero.png" });

    await page.evaluate(() => window.scrollBy(0, 950));
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: "/tmp/casa-alta-interiores-meaningful.png" });

    await page.evaluate(() => window.scrollBy(0, 1200));
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: "/tmp/casa-alta-interiores-galerias.png" });

    console.log("Visiting /proyectos...");
    await page.goto("http://localhost:3333/proyectos", { waitUntil: "networkidle" });
    await page.screenshot({ path: "/tmp/casa-alta-proyectos-hero.png" });

    await browser.close();
    console.log("Screenshots captured successfully!");
  } finally {
    process.kill(-server.pid);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
