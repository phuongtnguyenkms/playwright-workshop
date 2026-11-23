// Lint rules that catch the most common Playwright mistakes.
// `npm run lint` and `npm run selfcheck` run these; so does the grader.
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  { ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'eslint.config.mjs', 'scripts/'] },
  {
    files: ['**/*.ts'],
    extends: [tseslint.configs.base],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      // A missing `await` is the #1 cause of confusing, flaky failures.
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
    },
  },
  {
    files: ['tests/**/*.ts'],
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-wait-for-timeout': 'error', // hard waits are not allowed
      'playwright/missing-playwright-await': 'error',
      'playwright/no-focused-test': 'error', // no test.only
      'playwright/no-page-pause': 'error',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/no-skipped-test': 'off', // skip/fixme are allowed — with a reason
      'playwright/expect-expect': 'warn',
    },
  },
);
