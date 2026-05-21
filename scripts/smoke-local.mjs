const targets = ["/home", "/about"];
const baseUrl = process.env.SMOKE_BASE_URL ?? "http://localhost:5173";

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

async function run() {
  for (const route of targets) {
    await checkRoute(route);
    console.log(`PASS ${route}`);
  }
  console.log("Smoke test passed for local shell routes.");
}

run().catch((error) => {
  console.error("Smoke test failed:", error.message);
  process.exit(1);
});
