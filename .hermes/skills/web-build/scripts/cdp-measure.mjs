#!/usr/bin/env node
/**
 * Measures the built Casa Alta site through Chrome DevTools Protocol.
 *
 * This replaces the old habit of dropping a probe page into `public/`: that left
 * an artifact in the app's public directory, was served as a real asset, and had
 * to be remembered and deleted. CDP talks to a real browser and the repo never
 * knows.
 *
 * Start a browser first:
 *   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
 *     --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
 *     --user-data-dir=/tmp/casa-cdp --remote-debugging-port=9333 \
 *     --window-size=1440,900 http://localhost:3000/
 *
 * Then:
 *   node cdp-measure.mjs http://localhost:3000/ --width 1440
 *   node cdp-measure.mjs http://localhost:3000/ --width 1440 --screenshot /tmp/wall.png --clip-wall
 *
 * Emits one JSON object on stdout. Exit 1 if the page never became measurable.
 *
 * Known limitation: `--screenshot` can come back blank against a headless
 * browser for any region below the first fold, even after the eager-load rewrite
 * below. A flat colour compresses to roughly 10 KB at 1440 wide, so treat a
 * suspiciously small PNG as a failed capture and say the visual could not be
 * produced rather than presenting it as evidence. The measurement output is the
 * reliable half, and is what any claim should rest on.
 */

const CDP_PORT = process.env.CDP_PORT ?? 9333;
const args = process.argv.slice(2);
const url = args[0];
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const width = Number(flag("width", 1440));
const height = Number(flag("height", 900));
const settleMs = Number(flag("settle", 2500));

if (!url) {
  console.error("usage: node cdp-measure.mjs <url> [--width N] [--height N]");
  process.exit(2);
}

// The expression runs in the page. Grouping is by geometry, not by selector, so
// it survives markup changes: the wall's items are the only boxes that declare
// `break-inside-avoid`, and their columns are recovered from their left edges.
const EXPRESSION = `(() => {
  const imgs = [...document.querySelectorAll('img')].filter((i) =>
    (i.currentSrc || i.src || '').includes('/images/'));
  const srcs = imgs.map((i) => new URL(i.currentSrc || i.src, location.href).pathname);
  const seen = new Map();
  for (const s of srcs) seen.set(s, (seen.get(s) ?? 0) + 1);
  const duplicated = [...seen.entries()].filter(([, n]) => n > 1);

  const byLeft = new Map();
  for (const el of document.querySelectorAll('div.break-inside-avoid')) {
    const r = el.getBoundingClientRect();
    const key = Math.round((r.left + scrollX) / 8) * 8;
    const box = byLeft.get(key) ?? { left: key, top: 1e9, bottom: 0, count: 0, w: new Set() };
    box.top = Math.min(box.top, r.top + scrollY);
    box.bottom = Math.max(box.bottom, r.bottom + scrollY);
    box.count += 1;
    box.w.add(Math.round(r.width));
    byLeft.set(key, box);
  }
  const columns = [...byLeft.values()]
    .map((b) => ({ leftPx: b.left, items: b.count, widths: [...b.w],
                   topPx: Math.round(b.top), bottomPx: Math.round(b.bottom),
                   runPx: Math.round(b.bottom - b.top) }))
    .sort((a, b) => a.leftPx - b.leftPx);

  const bounds = columns.length
    ? {
        x: Math.min(...columns.map((c) => c.leftPx)),
        y: Math.min(...columns.map((c) => c.topPx)),
        width: Math.max(...columns.map((c) => c.leftPx + Math.max(...c.widths))) -
               Math.min(...columns.map((c) => c.leftPx)),
        height: Math.max(...columns.map((c) => c.bottomPx)) -
                Math.min(...columns.map((c) => c.topPx)),
      }
    : null;

  const headings = (t) => document.querySelectorAll(t).length;
  return JSON.stringify({
    url: location.pathname,
    viewportW: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    pageHeight: Math.round(document.documentElement.scrollHeight),
    photos: imgs.length,
    broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
    lazy: imgs.filter((i) => i.loading === 'lazy').length,
    distinctSizes: [...new Set(imgs.map((i) => i.sizes).filter(Boolean))],
    duplicated,
    headings: { h1: headings('h1'), h2: headings('h2'), h3: headings('h3'), h4: headings('h4') },
    wall: { items: columns.reduce((n, c) => n + c.items, 0), columns, bounds,
            imbalancePx: columns.length ? Math.max(...columns.map((c) => c.runPx)) - Math.min(...columns.map((c) => c.runPx)) : 0 },
  });
})()`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let page;
for (let attempt = 0; attempt < 40; attempt += 1) {
  try {
    const res = await fetch(`http://localhost:${CDP_PORT}/json/list`);
    const list = await res.json();
    page = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
    if (page) break;
  } catch {
    // Chrome is still coming up.
  }
  await sleep(500);
}

if (!page) {
  console.error(`no CDP page target on port ${CDP_PORT}`);
  process.exit(1);
}

await sleep(settleMs);

const ws = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
let nextId = 1;

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

ws.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error
      ? reject(new Error(JSON.stringify(msg.error)))
      : resolve(msg.result);
  }
});

await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve, { once: true });
  ws.addEventListener("error", reject, { once: true });
});

await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: false,
});

let result;
for (let attempt = 0; attempt < 30; attempt += 1) {
  const out = await send("Runtime.evaluate", {
    expression: EXPRESSION,
    returnByValue: true,
    awaitPromise: false,
  });
  if (out?.result?.value) {
    const parsed = JSON.parse(out.result.value);
    if (parsed.photos > 0) {
      result = parsed;
      break;
    }
  }
  await sleep(500);
}

if (!result) {
  ws.close();
  console.error("page never became measurable");
  process.exit(1);
}

const shot = flag("screenshot", null);
if (shot) {
  // captureScreenshot is refused on a domain that was never enabled, and a
  // refused screenshot must never cost the measurement.
  try {
    const fs = await import("node:fs");
    await send("Page.enable");

    // Every photograph but the hero is loading="lazy", so anything below the
    // fold paints blank in a screenshot. Flipping them to eager and walking the
    // page once makes the browser actually fetch and paint what is about to be
    // captured -- the wall is five screens down.
    const forcePaint = async () => {
      await send("Runtime.evaluate", {
        expression: `document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = "eager"; }); window.scrollTo(0, document.body.scrollHeight);`,
      });
      await sleep(4000);
    };

    let clip;
    if (args.includes("--clip-wall") && result.wall.bounds) {
      const h = Math.min(result.wall.bounds.height + 48, 3000);
      await send("Emulation.setDeviceMetricsOverride", {
        width,
        height: h,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await forcePaint();

      // Resizing the viewport moves the wall: the hero is min-h-svh, so its
      // height follows the viewport. Re-read the wall's top after the resize and
      // scroll to it, then clip in VIEWPORT coordinates -- with
      // captureBeyondViewport off, a page-coordinate clip captures whatever the
      // viewport happens to be showing, which is how this first came out blank.
      const top = await send("Runtime.evaluate", {
        expression: `(() => {
          const els = [...document.querySelectorAll('div.break-inside-avoid')];
          if (!els.length) return 0;
          return Math.round(Math.min(...els.map((e) => e.getBoundingClientRect().top + scrollY)) - 24);
        })()`,
        returnByValue: true,
      });
      await send("Runtime.evaluate", {
        expression: `window.scrollTo(0, ${Math.max(0, top?.result?.value ?? 0)})`,
      });
      await sleep(2000);
      clip = { x: 0, y: 0, width, height: h, scale: 1 };
    } else {
      await forcePaint();
      await send("Runtime.evaluate", { expression: `window.scrollTo(0, 0)` });
      await sleep(1500);
      clip = {
        x: 0,
        y: 0,
        width: result.viewportW,
        height: Math.min(result.pageHeight, 4000),
        scale: 1,
      };
    }

    const shotOut = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: !args.includes("--clip-wall"),
      clip,
    });
    fs.writeFileSync(shot, Buffer.from(shotOut.data, "base64"));
    const bytes = fs.statSync(shot).size;
    console.error(
      `screenshot: ${shot} (${clip.width}x${clip.height}, ${bytes} bytes)`,
    );
    if (bytes < 60000) {
      console.error(
        "  WARNING: that is small enough to be a flat colour -- treat the capture as failed",
      );
    }
  } catch (error) {
    console.error(
      `screenshot failed (measurement still valid): ${error.message}`,
    );
  }
}

console.log(JSON.stringify(result, null, 2));
ws.close();
