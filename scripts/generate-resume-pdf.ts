import { chromium } from "playwright";
import { spawn } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../public/lindsay-wardell-resume.pdf");
const DEV_URL = "http://localhost:4321/resume";
const MAX_WAIT_MS = 30_000;

async function waitForServer(url: string): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < MAX_WAIT_MS) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // Server not ready yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not become ready at ${url} within ${MAX_WAIT_MS}ms`);
}

async function main() {
  console.log("Starting Astro dev server...");
  const server = spawn("npm", ["run", "dev"], {
    cwd: resolve(__dirname, ".."),
    stdio: "pipe",
  });

  try {
    await waitForServer(DEV_URL);
    console.log("Dev server is ready.");

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(DEV_URL, { waitUntil: "networkidle" });

    await page.pdf({
      path: OUTPUT_PATH,
      format: "Letter",
      displayHeaderFooter: false,
      printBackground: false,
      margin: {
        top: "0.4in",
        bottom: "0.4in",
        left: "0.5in",
        right: "0.5in",
      },
    });

    console.log(`PDF saved to ${OUTPUT_PATH}`);
    await browser.close();
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
