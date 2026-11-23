# Playwright Workshop for QA

Course repository for the KMS QC Guild **Playwright Workshop for QA** — 6 sessions that take you from manual testing to writing, running and maintaining Playwright UI and API tests.

| | |
|---|---|
| Playwright | **1.65.1** (pinned — don't upgrade during the course) |
| Language | TypeScript |
| Node.js | current LTS, **22 or newer** |
| Practice app | Toolshop — <http://45.77.169.70:4200> |
| API docs (Swagger) | <http://45.77.169.70:8091/api/documentation> |

## Practice app: Toolshop

Our own deployment of Testsmith's open-source [practice-software-testing](https://github.com/testsmith-io/practice-software-testing), a web shop built for practising test automation. It has a web UI and a documented REST API, and its elements carry stable `data-test` attributes (this repo's config sets `testIdAttribute: 'data-test'`).

Demo accounts (from the upstream README):

| Role | Email | Password |
|---|---|---|
| Admin | admin@practicesoftwaretesting.com | welcome01 |
| Customer | customer@practicesoftwaretesting.com | welcome01 |
| Customer | customer2@practicesoftwaretesting.com | welcome01 |
| Customer | customer3@practicesoftwaretesting.com | pass123 |

The site is **shared by the whole cohort** and its data is reset before every session. Please don't change these accounts' passwords, and don't run load or security tests against it. Tests should create their own data rather than rely on what someone else left behind.

## Pre-work (before Session 1)

1. Install **Node.js** (current LTS), **Git**, **VS Code** and the VS Code extension **Playwright Test for VSCode**.
2. Get your own copy of this repo (your instructor will tell you whether to fork it or use it as a template), clone it, and install:
   ```bash
   npm ci
   npx playwright install --with-deps chromium firefox
   ```
3. Run the smoke test — it must be green:
   ```bash
   npx playwright test smoke
   ```
4. Do the TypeScript exercises in `prework/exercises.ts`, then check them:
   ```bash
   npm run prework
   ```
   To pass: at least **12 of 15** exercises, and **all** async/await exercises (11–15).

## Project layout

```
playwright-workshop/
  tests/
    smoke.spec.ts          pre-work smoke test
    session-1/             in-class exercises (ex1–ex4) and homework for Session 1
  homework/session-1/      homework brief: manual test cases + scoring
  prework/                 TypeScript exercises + auto-grader
  docs/review-checklist.md what reviewers look for (grows each session)
  scripts/selfcheck.mjs    run the grader's automatic checks yourself
  playwright.config.ts     browsers, baseURL, reporters — the course template
  .github/workflows/       CI: runs on every pull request
```

## Everyday commands

| Command | What it does |
|---|---|
| `npx playwright test` | Run all tests (Chromium and Firefox), headless |
| `npx playwright test session-1` | Run one folder or file |
| `npx playwright test -g "log in"` | Run tests whose name matches |
| `npx playwright test --headed` | Watch the browser |
| `npx playwright test --project=chromium` | One browser only |
| `npm run test:ui` | UI mode — step through tests, pick locators |
| `npm run report` | Open the last HTML report |
| `npx playwright codegen http://45.77.169.70:4200` | Record clicks to discover locators |
| `npm run selfcheck` | The grader's automatic checks, before you submit |

To point tests at another Toolshop instance, copy `.env.example` to `.env` and change `BASE_URL`.

## In-class exercises

Each hands-on exercise is a file in `tests/session-<N>/`. The test starts as `test.fixme` with TODO comments:
change it to `test`, fill in the steps, and run it.

| Session 1 exercise | File |
|---|---|
| 1 — Login | `tests/session-1/ex1-login.spec.ts` |
| 2 — Search | `tests/session-1/ex2-search.spec.ts` |
| 3 — Filter by category | `tests/session-1/ex3-filter.spec.ts` |
| 4 — Locator review (rewrite brittle locators) | `tests/session-1/ex4-locator-review.spec.ts` |

Fell behind? Ask the instructor — reference solutions are shared after the exercise, not before.

## Homework and grading

- Homework for session *N* is in `homework/session-N/`. Submit it as a **pull request from branch `hw/sN`** in your copy of this repo, **48 hours before the next session**.
- Run `npm run selfcheck` first: it compiles, lints (missing `await`, hard waits, `test.only`…), scans and runs your tests in random order.
- Grading: automatic checks → a run against a fresh Toolshop → AI review against the session rubric with file:line evidence → **instructor approval**. Feedback arrives as a comment on your pull request within 24 hours of the deadline.
- Don't change `playwright.config.ts` retries or timeouts to make tests pass — the grader compares it with the course template.

## Rules of thumb

- Prefer `getByRole` → `getByLabel` → `getByPlaceholder`/`getByText` → `getByTestId`; CSS/XPath only as a last resort.
- Every action and assertion needs `await`.
- No `page.waitForTimeout()` — wait for a condition instead.
- [playwright.dev](https://playwright.dev) is the reference. Many online tutorials show outdated APIs.
