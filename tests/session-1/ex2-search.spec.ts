import { test, expect } from '@playwright/test';

// Exercise 2 — Search
// Manual test case:
//   1. Open the home page
//   2. Type "pliers" in the search box and press Enter
//   Expected: the page says "Searched for: pliers" and every product shown has "pliers" in its name
//
// Change test.fixme to test, then write the steps.
// Tip: right after you search, the OLD product list is still on screen for a moment.
//      Write the check so it waits for the new list — ask: "would this pass before the search finished?"

test('searching for pliers shows only matching products', async ({ page }) => {
  // TODO 1: open the home page
  await page.goto('http://45.77.169.70:4200/');


  // TODO 2: search for "pliers"
  await page.locator('[data-test="search-query"]').click();
  await page.locator('[data-test="search-query"]').fill('pliers');
  await page.locator('[data-test="search-submit"]').click();

  // TODO 3: check the search term is shown
  await expect(page.getByTestId('search-result-count')).toContainText('0 products found for \'pliers\'');

  // TODO 4: check no product without "pliers" in its name is shown, and at least one product is
 await expect(page.locator('[data-test="no-results"]')).toContainText('There are no products found.');
});
