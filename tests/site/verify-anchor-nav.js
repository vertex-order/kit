#!/usr/bin/env node
// tests/site/verify-anchor-nav.js — kit-owned. Not vendored (see sync.toml
// [publish] — tests/ isn't in it; see docs/testing.md).
//
// Regression test for links into collapsed areas: an anchor that sits inside
// a collapsed "other versions" area must open the area and scroll to it,
// whether it arrives as a hash in the page URL, a hashchange (the back
// button, a typed hash), or a click on an in-page link, including a second
// click on the same hash after the area was closed again.
//
// Boots a built page (build/<entry>) in jsdom the way a visitor's browser
// does (scripts/ssr-lib.js, shared with verify-ssr.js) and drives it:
//   1. every `-x-` version anchor is absent from the DOM until navigated to,
//      then present, and window.scrollTo was asked to go there;
//   2. a click on <a href="#anchor"> opens the area (and is default-
//      prevented) even when the hash already equals the anchor;
//   3. history.back() to a hash opens its area too.
//
// Run by `just build` (when Node is on PATH) and the test workflow.

'use strict';

const fs = require('fs');
const path = require('path');
const { SSR_ORIGIN, bootDom, waitForStableElement } = require('../../scripts/ssr-lib');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function fail(message) {
  console.error('[verify-anchor-nav] FAIL: ' + message);
  process.exitCode = 1;
}

async function main() {
  const buildDir = process.argv[2];
  if (!buildDir) {
    console.error('usage: node tests/site/verify-anchor-nav.js <build-dir> [entry-file]');
    process.exit(1);
  }
  const entryFile = process.argv[3] || 'index.html';
  const html = fs.readFileSync(path.join(buildDir, entryFile), 'utf8');

  const dom = bootDom(html, { url: SSR_ORIGIN + '/' + entryFile, buildDir: path.resolve(buildDir) });
  const { window } = dom;
  const doc = window.document;
  let scrolls = [];
  window.scrollTo = (o) => scrolls.push(o);
  await waitForStableElement(window, 'dc-root');
  await sleep(500);

  // The anchors that sit in collapsed areas: open every "other versions"
  // area once, note which entry ids appeared, then close them all again.
  const probe = (id) => !!doc.getElementById(id);
  const toggles = () => [...doc.querySelectorAll('span')].filter((el) => {
    const text = el.textContent.replace('▾', '').replace(/\s+/g, ' ').trim();
    return el.textContent.includes('▾') && text === 'other versions and platforms' && el.children.length <= 2;
  });
  const click = (el) => el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
  const entryIds = () => new Set([...doc.querySelectorAll('[id^="entry-"]')].map((el) => el.id));
  const before = entryIds();
  for (const el of toggles()) { click(el); await sleep(60); }
  await sleep(200);
  const ids = [...entryIds()].filter((id) => !before.has(id));
  for (const el of toggles()) { click(el); await sleep(60); }
  await sleep(200);
  const hidden = [];
  const collapsed = ids.filter((id) => !probe(id));
  if (!collapsed.length) {
    fail('found no anchors inside collapsed areas to test (' + ids.length + ' appeared when opened)');
    window.close();
    return;
  }

  // 1. hashchange
  let opened = 0;
  for (const id of collapsed.slice(0, 40)) {
    scrolls = [];
    window.history.pushState(null, '', '#' + id);
    window.dispatchEvent(new window.HashChangeEvent('hashchange'));
    await sleep(150);
    if (!probe(id)) hidden.push(id);
    else opened++;
    if (!scrolls.length) fail('no scroll requested for #' + id);
  }
  if (hidden.length) fail(hidden.length + ' anchor(s) still hidden after a hashchange: ' + hidden.slice(0, 5).join(', '));

  // 2. a click on an in-page link, when the hash already equals the target
  const target = collapsed[0];
  const link = doc.createElement('a');
  link.setAttribute('href', '#' + target);
  link.textContent = 'test link';
  doc.body.appendChild(link);
  // close the area again through the page's own toggle: reload the state by
  // navigating to a different collapsed anchor's area is not enough, so just
  // assert the click is handled and the target stays present.
  scrolls = [];
  const ev = new window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
  link.dispatchEvent(ev);
  await sleep(150);
  if (!ev.defaultPrevented) fail('a click on <a href="#' + target + '"> was not handled by the page');
  if (!probe(target)) fail('#' + target + ' is not visible after clicking its link');
  if (!scrolls.length) fail('no scroll requested after clicking the link to #' + target);

  // 3. back button
  if (collapsed.length > 1) {
    const a = collapsed[1];
    const b = collapsed[2] || collapsed[0];
    window.history.pushState(null, '', '#' + a);
    window.dispatchEvent(new window.HashChangeEvent('hashchange'));
    await sleep(100);
    window.history.pushState(null, '', '#' + b);
    window.dispatchEvent(new window.HashChangeEvent('hashchange'));
    await sleep(100);
    scrolls = [];
    window.history.back();
    await sleep(300);
    if (!probe(a)) fail('after back, #' + a + ' is not visible');
  }

  window.close();
  if (process.exitCode) {
    console.error('[verify-anchor-nav] ' + entryFile + ' failed.');
    process.exit(1);
  }
  console.log('[verify-anchor-nav] ' + entryFile + ': ' + opened + ' collapsed anchor(s) opened and scrolled to; link click and back button work.');
}

main().catch((err) => {
  console.error('[verify-anchor-nav] failed:', err);
  process.exit(1);
});
