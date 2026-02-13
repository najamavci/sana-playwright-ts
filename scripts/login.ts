import { chromium, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

async function main() {
    const baseURL = process.env.SANA_BASE_URL ?? "https://sana.ai/79Us8e17keYm";
    const authStatePath = path.resolve("playwright", ".auth", "state.json");

    fs.mkdirSync(path.dirname(authStatePath), { recursive: true });

    const browser = await chromium.launch({ headless: false, slowMo: 150 });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${baseURL}/workflows`);

    // Click Sign in / Log in (adjust if needed)
    const signIn = page.getByRole("link", { name: /sign in|log in/i })
        .or(page.getByRole("button", { name: /sign in|log in/i }));

    if (await signIn.isVisible().catch(() => false)) {
        await signIn.click();
    }

    // Wait for email field; you said it has id="email"
    const email = page.locator("#email");
    await expect(email).toBeVisible({ timeout: 30_000 });

    // Fill email (use env var, not hardcoded)
    await email.fill(process.env.SANA_EMAIL ?? "<SANA_EMAIL>");

    // Continue/Next/Sign in button (adjust label if needed)
    const continueBtn = page.getByRole("button", { name: /continue|next|sign in|log in/i });
    if (await continueBtn.isVisible().catch(() => false)) {
        await continueBtn.click();
    }

    // At this point, OTP may be required.
    // Complete OTP manually in the opened browser, then press Enter in the terminal.
    process.stdout.write("Complete login (OTP etc.) in the browser, then press Enter here...");
    await new Promise<void>((resolve) => process.stdin.once("data", () => resolve()));

    // Confirm we’re logged in by checking we can see /workflows
    await page.goto(`${baseURL}/workflows`);
    await page.waitForURL(/\/workflows(\b|\/|\?)/i, { timeout: 30_000 });

    await context.storageState({ path: authStatePath });
    console.log(`\nSaved auth session to: ${authStatePath}`);

    await browser.close();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});