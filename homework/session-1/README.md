# Session 1 homework — automate 4 manual test cases

**Due:** 48 hours before Session 2 · **Time:** about 2–3 hours
**Write your tests in:** `tests/session-1/homework.spec.ts` — one Playwright test per test case
**Submit:** a pull request from branch `hw/s1` (see the course README)

These scenarios are longer than the in-class exercises: several steps, several checks, and a few surprises
you'll need to explore before you can automate them. Explore each one by hand first.

Each test must **pass**, and must **fail if the feature it checks is broken**. Before you submit, run `npm run selfcheck`.
All test cases start **not logged in** (every Playwright test gets a fresh browser, so that is the default).

---

## TC-01 — Contact form: validation, then a successful message

| | |
|---|---|
| **Steps** | 1. Open the home page and go to **Contact** using the header link <br> 2. Click **Send** without filling anything in <br> 3. Fill First name, Last name, Email `not-an-email`, Subject **Warranty**, Message `Too short`, and click **Send** <br> 4. Correct the email to a valid address and write a message of at least 50 characters, then click **Send** |
| **Expected result** | After step 2: "First name is required", "Last name is required", "Email is required", "Subject is required" and "Message is required" are shown. <br> After step 3: "Email format is invalid" and "Message must be minimal 50 characters" are shown. <br> After step 4: "Thanks for your message! We will contact you shortly." is shown. |

## TC-02 — Cart: quantities, totals and removing an item

| | |
|---|---|
| **Steps** | 1. Open the product page for **Slip Joint Pliers** (find it like a user would) <br> 2. Increase the quantity to **3** and click **Add to cart** <br> 3. Open the cart from the header <br> 4. Change the quantity in the cart to **1** <br> 5. Remove the item from the cart |
| **Expected result** | After step 2: "Product added to shopping cart." appears and the cart icon shows **3**. <br> After step 3: the line total and cart total are both **$27.51**. <br> After step 4: "Product quantity updated." appears, the total is **$9.17** and the cart icon shows **1**. <br> After step 5: "Product deleted." appears and the page says "The cart is empty. Nothing to display." |

> Watch out in step 5: look at the remove button with Pick locator. What does Playwright suggest, and why?
> Choose the best locator you can and add a comment explaining your choice.

## TC-03 — An out-of-stock product cannot be bought

| | |
|---|---|
| **Steps** | 1. Open the home page and search for `long nose` <br> 2. Open the product **Long Nose Pliers** |
| **Expected result** | After step 1: "1 product found for 'long nose'" is shown, and the product card says **Out of stock**. <br> After step 2: the **Add to cart** button, the quantity field and the + / − buttons are all disabled. |

## TC-04 — Filter and sort together

| | |
|---|---|
| **Steps** | 1. Open the home page <br> 2. Tick the **Drill** category <br> 3. Sort by **Price (Low - High)** |
| **Expected result** | Exactly **2** products are listed, in this order: **Cordless Drill 12V** ($46.50), then **Cordless Drill 24V** ($66.54). |

> The shop sells four cordless drills. Why are only two listed? Find out, and explain it in a comment in your test.

---

## What's scored

| Criterion | Weight |
|---|---|
| Tests run and pass | Gate |
| Locator quality (see the locator ladder) | 35% |
| Meaningful assertions — each test would fail if its feature broke | 35% |
| Steps and checks match the test case | 20% |
| Clear test names, and comments where asked | 10% |

## Hints

- Explore by hand first, then use **Pick locator** in UI mode (`npm run test:ui`) to see which locator Playwright suggests.
- Codegen (`npx playwright codegen http://45.77.169.70:4200`) helps you *find* locators — don't paste its whole recording.
- Don't navigate to hard-coded product URLs: product ids change when the data is reset. Search or click like a user.
- A test can contain several checks in a row — check each expected result right after the step it belongs to.
- Go through `docs/review-checklist.md` (Session 1 section) before you open the pull request.
