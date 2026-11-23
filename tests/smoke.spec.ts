import { test, expect } from '@playwright/test';

// Pre-work smoke test: proves your machine can run Playwright against the course Toolshop.
// Run it with: npx playwright test smoke
test('Toolshop home page shows products', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Toolshop/);
  await expect(page.getByTestId('product-name').first()).toBeVisible();
});
