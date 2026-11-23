#!/usr/bin/env node
// Self-check: the same automatic checks the grader runs, on your own machine.
// Usage:
//   npm run selfcheck              → all checks, then runs the tests (chromium, shuffled)
//   npm run selfcheck -- --no-run  → static checks only (fast)
import { execSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const noRun = process.argv.includes('--no-run');
const results = [];

function run(name, cmd) {
  process.stdout.write(`\n▶ ${name}\n`);
  try {
    execSync(cmd, { stdio: 'inherit' });
    results.push([name, true]);
  } catch {
    results.push([name, false]);
  }
}

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.ts') ? [p] : [];
  });
}

// 1. Compiles
run('TypeScript compiles (tsc --noEmit)', 'npx tsc --noEmit');

// 2. Lint: missing await, hard waits, test.only, page.pause, non-web-first assertions
run('Lint (missing await, hard waits, test.only…)', 'npx eslint tests');

// 3. Quick scans
process.stdout.write('\n▶ Scans\n');
const files = walk('tests');
const findings = [];
for (const f of files) {
  readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
    const where = `${relative('.', f)}:${i + 1}`;
    if (/waitForTimeout\s*\(/.test(line)) findings.push(`${where}  hard wait (waitForTimeout)`);
    if (/\btest\.only\b|\bdescribe\.only\b/.test(line)) findings.push(`${where}  test.only left in`);
    if (/page\.pause\s*\(/.test(line)) findings.push(`${where}  page.pause() left in`);
    if (/\btest\.(skip|fixme)\(\s*['"`]/.test(line)) findings.push(`${where}  skipped/fixme test — is that intended?`);
  });
}
findings.forEach((x) => console.log('  ' + x));
console.log(findings.length ? `  ${findings.length} finding(s)` : '  nothing found');
results.push(['Scans', !findings.some((x) => !x.includes('intended'))]);

// 4. Count tests
try {
  const out = execSync('npx playwright test --list --project=chromium', { encoding: 'utf8' });
  const m = out.match(/Total: (\d+) tests?/);
  console.log(`\n▶ Tests found (chromium): ${m ? m[1] : '?'}`);
} catch {
  results.push(['List tests', false]);
}

// 5. Run the suite in random order — order-dependent tests fail here
if (!noRun) run('Tests pass in random order (--shuffle)', 'npx playwright test --project=chromium --shuffle');

console.log('\n──────── Self-check summary ────────');
for (const [name, ok] of results) console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
process.exit(results.every(([, ok]) => ok) ? 0 : 1);
