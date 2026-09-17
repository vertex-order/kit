#!/usr/bin/env node
// tests/site/verify-ssr.js — kit-owned. Not vendored (see sync.toml
// [publish] — tests/ isn't in it; see docs/testing.md for why this lives
// outside scripts/).
//
// Regression test for the exact bug class fixed in fbb80c1 ("SSR prerender
// was shipping a permanently inert page"): scripts/ssr-render.js's output
// can look like a fully-rendered page — settled markup, no thrown errors —
// while support.js's real client boot() silently never runs, because the
// one <x-dc> the entry file had was consumed producing the snapshot. That
// shipped to production for a while before anyone noticed, because nothing
// *looked* wrong and nothing threw.
//
// This loads an already-built build/<entry> exactly as a real visitor's
// browser would (a second, independent JSDOM instance — the fetch/CDN/
// matchMedia mechanics are scripts/ssr-lib.js, shared with ssr-render.js
// so this can't drift from what actually ships) and asserts the page is
// genuinely interactive:
//   1. The live #dc-root mounts (not just the #dc-root-ssr snapshot).
//   2. #dc-root-ssr is removed once the live root takes over (the cleanup
//      script ssr-render.js appends).
//   3. A theme-toggle button is present and clicking it actually changes
//      the rendered theme — proof event handlers are wired, not just that
//      *some* markup exists.
//
// Run by `just build` (right after ssr-render.js, when Node is on PATH)
// and by .github/workflows/test.yml on every PR — see docs/testing.md.

'use strict';

const fs = require('fs');
const path = require('path');
const { SSR_ORIGIN, bootDom, waitForStableElement } = require('../../scripts/ssr-lib');

function fail(message) {
  console.error('[verify-ssr] FAIL: ' + message);
  process.exitCode = 1;
}

async function main() {
  const buildDir = process.argv[2];
  if (!buildDir) {
    console.error('usage: node tests/site/verify-ssr.js <build-dir> [entry-file]');
    process.exit(1);
  }
  const entryFile = process.argv[3] || 'index.html';
  const entryPath = path.join(buildDir, entryFile);
  const html = fs.readFileSync(entryPath, 'utf8');

  const dom = bootDom(html, { url: SSR_ORIGIN + '/' + entryFile, buildDir: path.resolve(buildDir) });
  const { window } = dom;
  const errors = [];
  window.addEventListener('error', (e) => errors.push(e.error || e.message));

  const liveRoot = await waitForStableElement(window, 'dc-root').catch((err) => {
    fail('live #dc-root never mounted — client boot() likely didn\'t run: ' + err.message);
    return null;
  });

  if (liveRoot) {
    if (!liveRoot.innerHTML.trim()) {
      fail('#dc-root mounted but rendered no content');
    }

    const ssrSnapshot = window.document.getElementById('dc-root-ssr');
    if (ssrSnapshot) {
      fail('#dc-root-ssr snapshot is still present after the live root settled — cleanup script did not remove it');
    }

    const toggleButton = window.document.querySelector('button[title="Toggle light/dark mode"]');
    if (!toggleButton) {
      fail('no theme-toggle button (button[title="Toggle light/dark mode"]) found in the live render');
    } else {
      const themedEl = window.document.querySelector('[data-theme]');
      if (!themedEl) {
        fail('no element carries data-theme after mount — theme is not being applied at all');
      } else {
        const before = themedEl.getAttribute('data-theme');
        toggleButton.dispatchEvent(new window.Event('click', { bubbles: true }));
        await new Promise((resolve) => setTimeout(resolve, 50));
        const after = window.document.querySelector('[data-theme]').getAttribute('data-theme');
        if (after === before) {
          fail('clicking the theme toggle did not change data-theme (still "' + before + '") — handler is not wired');
        }
      }
    }
  }

  if (errors.length) {
    fail(errors.length + ' runtime error(s) during boot: ' + errors.map((e) => (e && e.message) || String(e)).join('; '));
  }

  window.close();

  if (process.exitCode) {
    console.error('[verify-ssr] ' + entryPath + ' failed real-visitor verification.');
    process.exit(1);
  }
  console.log('[verify-ssr] ' + entryPath + ' boots and is interactive.');
}

main().catch((err) => {
  console.error('[verify-ssr] failed:', err);
  process.exit(1);
});
