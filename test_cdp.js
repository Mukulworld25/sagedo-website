import { spawn } from 'child_process';
import WebSocket from 'ws';
import fs from 'fs';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log("Starting Chrome...");
  // Make sure we stop any existing chrome instances
  console.log("Cleaning up previous Chrome instances...");
  try {
    spawn('taskkill', ['/F', '/IM', 'chrome.exe']);
    await sleep(2000);
  } catch (e) {
    // ignore
  }

  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--remote-debugging-port=9222',
    '--user-data-dir=C:\\Users\\admin\\chrome-dev-profile',
    '--no-first-run',
    '--headless=new',
    'about:blank'
  ]);

  chrome.on('error', (err) => {
    console.error("Failed to start Chrome:", err);
  });

  // Wait for Chrome to initialize
  await sleep(4000);

  try {
    console.log("Fetching list of pages...");
    const res = await fetch('http://127.0.0.1:9222/json/list');
    if (!res.ok) {
      throw new Error(`Failed to fetch pages: ${res.statusText}`);
    }
    const pages = await res.json();
    console.log("Pages found:", pages);

    if (pages.length === 0) {
      throw new Error("No pages found!");
    }

    const page = pages[0];
    const wsUrl = page.webSocketDebuggerUrl;
    console.log(`Connecting to page WebSocket: ${wsUrl}`);

    const ws = new WebSocket(wsUrl);

    ws.on('open', async () => {
      console.log("WebSocket connected. Enabling Page domain...");
      
      // Enable Page domain
      ws.send(JSON.stringify({
        id: 1,
        method: 'Page.enable'
      }));

      await sleep(500);

      // Navigate to Google Business Profile
      console.log("Navigating to Google Business Profile...");
      ws.send(JSON.stringify({
        id: 2,
        method: 'Page.navigate',
        params: { url: 'https://www.google.com/business/' }
      }));

      // Wait for page to load (8 seconds)
      await sleep(8000);

      // Take screenshot
      console.log("Capturing screenshot...");
      ws.send(JSON.stringify({
        id: 3,
        method: 'Page.captureScreenshot',
        params: { format: 'png' }
      }));
    });

    ws.on('message', (data) => {
      const message = JSON.parse(data.toString());
      if (message.id === 3 && message.result && message.result.data) {
        console.log("Screenshot captured successfully! Saving to file...");
        const buffer = Buffer.from(message.result.data, 'base64');
        const outputPath = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\a9232bec-1452-4b81-b6c4-28f6372654b5\\gbp_login_screen.png';
        fs.writeFileSync(outputPath, buffer);
        console.log(`Screenshot saved to: ${outputPath}`);
        ws.close();
      } else if (message.error) {
        console.error("CDP Error:", message.error);
      }
    });

    ws.on('close', () => {
      console.log("WebSocket closed. Terminating Chrome...");
      chrome.kill();
      process.exit(0);
    });

    // Timeout safety
    await sleep(25000);
    console.log("Timeout reached. Force closing...");
    ws.close();
    chrome.kill();
    process.exit(1);

  } catch (error) {
    console.error("Error during execution:", error);
    chrome.kill();
    process.exit(1);
  }
}

run();
