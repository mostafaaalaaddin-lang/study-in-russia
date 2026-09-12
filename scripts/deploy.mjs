/**
 * Build the static export for the GitHub Pages sub-path and publish it to the
 * gh-pages branch.
 *
 * Exists as a Node script rather than an npm script line because setting
 * environment variables inline does not work in the Windows shell, and this
 * project is developed on Windows.
 */
import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const REPO_NAME = 'study-in-russia';
const BASE_PATH = `/${REPO_NAME}`;

function run(command, args, env) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, ...env },
  });
  if (result.status !== 0) {
    console.error(`\nFailed: ${command} ${args.join(' ')}`);
    process.exit(result.status ?? 1);
  }
}

console.log(`Building for ${BASE_PATH} ...`);
run('npx', ['next', 'build'], {
  GITHUB_PAGES: 'true',
  PAGES_BASE_PATH: BASE_PATH,
});

// Pages serves branch builds through Jekyll, which ignores any directory
// starting with an underscore. Without this file, _next/ is dropped and the
// site loads with no CSS or JavaScript.
writeFileSync('out/.nojekyll', '');

console.log('\nPublishing to gh-pages ...');
run('npx', ['--yes', 'gh-pages@6', '-d', 'out', '-t', '-b', 'gh-pages', '-m', 'Deploy static site']);

console.log(`\nDone. https://mostafaaalaaddin-lang.github.io${BASE_PATH}/`);
