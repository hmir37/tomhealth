import { test, expect } from "@playwright/test";

test("home page shows catalog heading", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /explore public health data/i })
  ).toBeVisible();
});

test("dataset card links to explorer", async ({ page }) => {
  await page.goto("/");
  const card = page.getByRole("link", { name: /covid/i }).first();
  await card.click();
  await expect(page).toHaveURL(/\/explore\//);
});
