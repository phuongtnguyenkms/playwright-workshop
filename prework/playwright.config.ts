import { defineConfig } from '@playwright/test';

// Runs the pre-work TypeScript exercises. No browser needed.
export default defineConfig({
  testDir: '.',
  testMatch: 'exercises.spec.ts',
  reporter: [['list']],
  workers: 1,
});
