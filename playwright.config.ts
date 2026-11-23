import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Optional local overrides live in .env (copy .env.example). Never commit .env.
dotenv.config({ quiet: true });

// Course template config. The grader compares your copy against this file:
// changing retries or timeouts to make tests pass is flagged.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    // The course Toolshop instance. Override with BASE_URL in .env or CI.
    baseURL: process.env.BASE_URL ?? 'http://45.77.169.70:4200',
    // Toolshop marks elements with data-test="…", not Playwright's default data-testid.
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});
