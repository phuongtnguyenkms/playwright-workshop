import { test, expect } from '@playwright/test';

// Session 1 homework — see homework/session-1/README.md for the four test cases.
// Write one test per test case below. Submit on branch hw/s1.

test.describe('Session 1 homework', () => {
  test('TC-01 — Contact form: validation, then a successful message', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Contact', exact: true }).click();

    await page.getByRole('button', { name: 'Send', exact: true }).click();
    await expect(page.getByText('First name is required')).toBeVisible();
    await expect(page.getByText('Last name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Subject is required')).toBeVisible();
    await expect(page.getByText('Message is required')).toBeVisible();

    await page.getByLabel('First name').fill('Pat');
    await page.getByLabel('Last name').fill('Tester');
    await page.getByLabel('Email address').fill('not-an-email');
    await page.getByLabel('Subject').selectOption({ label: 'Warranty' });
    await page.getByLabel('Message *').fill('Too short');
    await page.getByRole('button', { name: 'Send', exact: true }).click();
    await expect(page.getByText('Email format is invalid')).toBeVisible();
    await expect(page.getByText('Message must be minimal 50 characters')).toBeVisible();

    await page.getByLabel('Email address').fill('pat.tester@example.com');
    await page.getByLabel('Message *').fill(
      'I would appreciate your help with a warranty question about a recent purchase.',
    );
    await page.getByLabel('Message *').press('Tab');
    await expect(page.getByText('Message must be minimal 50 characters')).toBeHidden();
    await page.getByRole('button', { name: 'Send', exact: true }).click();
    await expect(page.getByText('Thanks for your message! We will contact you shortly.')).toBeVisible();
  });

  test('TC-02 — Cart: quantities, totals and removing an item', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('checkbox', { name: 'Pliers', exact: true }).check();
    await page.getByRole('link', { name: /Slip Joint Pliers/ }).click();

    await page.getByRole('button', { name: /increase quantity/i }).click();
    await page.getByRole('button', { name: /increase quantity/i }).click();
    await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
    await expect(page.getByText('Product added to shopping cart.')).toBeVisible();
    const cartIcon = page.getByRole('link', { name: /cart/i });
    await expect(cartIcon).toContainText('3');

    await cartIcon.click();
    const productRow = page.getByRole('row', { name: /Slip Joint Pliers/ });
    const totalRow = page.getByRole('row', { name: /^Total/ });
    await expect(productRow).toContainText('$27.51');
    await expect(totalRow).toContainText('$27.51');
    await page.getByRole('spinbutton').fill('1');
    await page.getByRole('spinbutton').press('Enter');
    await expect(page.getByText('Product quantity updated.')).toBeVisible();
    await expect(productRow).toContainText('$9.17');
    await expect(totalRow).toContainText('$9.17');
    await expect(cartIcon).toContainText('1');

    // The remove control is an icon-only link with no accessible name, so scope its link locator to this product's row.
    await productRow.locator('a').click();
    await expect(page.getByText('Product deleted.')).toBeVisible();
    await expect(page.getByText('The cart is empty. Nothing to display.')).toBeVisible();
  });

  test('TC-03 an out-of-stock product cannot be added to the cart', async ({ page }) => {
    await page.goto('/');
    // Wait for the initial product list so the search below is not overwritten by a late page load.
    await expect(page.getByRole('heading', { level: 5 })).not.toHaveCount(0);

    await page.getByRole('textbox', { name: 'Search' }).fill('long nose');
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await expect(page.getByTestId('search-result-count')).toHaveText("1 product found for 'long nose'");
    await expect(page.getByRole('link', { name: /Long Nose Pliers/ })).toContainText('Out of stock');

    await page.getByRole('link', { name: /Long Nose Pliers/ }).click();
    await expect(page.getByRole('heading', { name: 'Long Nose Pliers' })).toBeVisible();

    await expect(page.getByRole('button', { name: 'Add to cart', exact: true })).toBeDisabled();
    await expect(page.getByRole('spinbutton')).toBeDisabled();
    await expect(page.getByRole('button', { name: /increase quantity/i })).toBeDisabled();
    await expect(page.getByRole('button', { name: /decrease quantity/i })).toBeDisabled();
  });

  test('TC-04 filtering by Drill and sorting by price lists the drills cheapest first', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('checkbox', { name: 'Drill', exact: true }).check();
    await page.getByRole('combobox', { name: 'sort' }).selectOption({ label: 'Price (Low - High)' });

    // Exactly two products are listed, cheapest first. toHaveText with an array checks both the count and the order.
    await expect(page.getByRole('heading', { level: 5 })).toHaveText([
      'Cordless Drill 12V',
      'Cordless Drill 24V',
    ]);

    // Check each price inside its own product card, so a price attached to the wrong product fails the test.
    await expect(page.getByRole('link', { name: /Cordless Drill 12V/ })).toContainText('$46.50');
    await expect(page.getByRole('link', { name: /Cordless Drill 24V/ })).toContainText('$66.54');

    // The shop sells four cordless drills, but only two are listed here because the default price range is 0-100$
    // I verified this manually by adjusting the price range 0-200, the other two drills which have prices more than 100$ are listed.
  });
});
