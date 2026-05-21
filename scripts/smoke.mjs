import { spawn } from "node:child_process";

const targets = ["/home", "/about"];
const baseUrl = process.env.SMOKE_BASE_URL ?? "http://localhost:5173";
const timeoutMs = 30000;
const pollMs = 500;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer() {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/home`);
      if (response.ok) return;
    } catch {
      // Continue polling until timeout.
    }
    await sleep(pollMs);
  }
  throw new Error(`Timed out waiting for ${baseUrl}/home`);
}

async function checkRoute(route) {
  const response = await fetch(`${baseUrl}${route}`);
  if (!response.ok) {
    throw new Error(`Route ${route} failed with status ${response.status}`);
  }
  const html = await response.text();
  if (!html.includes('id="root"')) {
    throw new Error(`Route ${route} did not return expected shell HTML`);
  }
}

async function runChecks() {
  for (const route of targets) {
    await checkRoute(route);
    console.log(`PASS ${route}`);
  }
  console.log("Smoke test passed for local shell routes.");
}

const shellProc = spawn("npm run dev:shell", {
  shell: true,
  stdio: "inherit"
});

try {
  await waitForServer();
  await runChecks();
} catch (error) {
  console.error("Smoke test failed:", error.message);
  process.exitCode = 1;
} finally {
  if (!shellProc.killed) {
    shellProc.kill("SIGTERM");
  }
}
