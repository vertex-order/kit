#!/usr/bin/env node
// tests/site/verify-more-platforms.js — kit-owned. Not vendored (see sync.toml
// [publish] — tests/ isn't in it; see docs/testing.md).
//
// A contents[] part's `more: true` platform rows hide behind a "+N" chip:
// the compact line shows only the other rows, the chip's tooltip names the
// hidden platforms, and a click shows them in place (and "−" hides them
// again). Boots the built page in JSDOM like verify-anchor-nav.js, opens the
// kit fixture's "games" list (group EXT, "Hatchling Dash 2": steam shown,
// nintendo-switch and playstation5 `more`; other parts carry one or three) and drives the chip.
//
// Run by `just build` (when Node is on PATH) and the test workflow.

'use strict';

const fs = require('fs');
const path = require('path');
const { SSR_ORIGIN, bootDom, waitForStableElement } = require('../../scripts/ssr-lib');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function fail(message) {
  console.error('[verify-more-platforms] FAIL: ' + message);
  process.exitCode = 1;
}

async function main() {
  const buildDir = process.argv[2];
  if (!buildDir) {
    console.error('usage: node tests/site/verify-more-platforms.js <build-dir> [entry-file]');
    process.exit(1);
  }
  const entryFile = process.argv[3] || 'index.html';
  const html = fs.readFileSync(path.join(buildDir, entryFile), 'utf8');
  const dom = bootDom(html, { url: SSR_ORIGIN + '/' + entryFile, buildDir: path.resolve(buildDir) });
  const { window } = dom;
  const doc = window.document;
  await waitForStableElement(window, 'dc-root');
  await sleep(500);
  const click = (el) => el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));

  const bars = [...doc.querySelectorAll('span')].filter(
    (el) => el.textContent.replace('▾', '').trim() === 'games' && el.children.length <= 2
  );
  if (!bars.length) { fail('found no "games" list toggle in the fixture'); window.close(); return; }
  for (const bar of bars) { click(bar); await sleep(80); }
  await sleep(200);

  const chips = () => [...doc.querySelectorAll('[role="button"][aria-expanded]')].filter((el) => /^[+−]/.test(el.textContent.trim()));
  const dash2 = () => chips().find((el) => /PlayStation 5/.test(el.getAttribute('title') || ''));
  const chip = dash2();
  if (!chip) { fail('no "+N" chip rendered for a part with `more` platforms'); window.close(); return; }
  const line = chip.parentElement;
  const icons = () => line.querySelectorAll('img').length;
  const before = icons();
  if (chip.textContent.trim() !== '+2') fail('chip reads ' + JSON.stringify(chip.textContent.trim()) + ', expected "+2"');
  if (!/Also on: .*Nintendo Switch.*PlayStation 5/.test(chip.getAttribute('title') || '')) fail('chip tooltip does not name the hidden platforms: ' + chip.getAttribute('title'));
  if (chip.getAttribute('aria-expanded') !== 'false') fail('chip should start collapsed');

  click(chip);
  await sleep(200);
  const open = chips().find((el) => el.getAttribute('aria-expanded') === 'true');
  if (!open || open.getAttribute('aria-expanded') !== 'true') fail('chip did not expand on click');
  if (icons() !== before + 2) fail('expanding showed ' + (icons() - before) + ' more icon(s), expected 2');

  click(open);
  await sleep(200);
  if (icons() !== before) fail('collapsing left ' + icons() + ' icons, expected ' + before);

  if (!process.exitCode) console.log('[verify-more-platforms] +N chip shows the hidden platforms on click and hides them again.');
  window.close();
}

main().catch((err) => { console.error(err); process.exit(1); });
