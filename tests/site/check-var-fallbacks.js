#!/usr/bin/env node
// tests/site/check-var-fallbacks.js — kit-owned. Not vendored (tests/
// isn't in sync.toml [publish] — see docs/testing.md).
//
// Regression guard for the bug class fixed in 82a08e4 ("letter-spacing
// fallback var(--font-display-tracking, normal), not 0"): a CSS custom
// property meant to be optionally overridden downstream (theme-overridable
// tokens like --font-display-tracking are never given a value in
// site/_ds/*/styles.css's :root block — see check-token-snapshot.js's
// scope note) has no single place its "true" default is recorded except
// every `var(--name, fallback)` call site that uses it. If two call sites
// drift to different fallbacks, whichever one is wrong is a silent,
// no-op-breaking visual change for any repo that hasn't defined that var
// itself — exactly what happened.
//
// This scans every site/*.dc.html and site/_ds/*/styles.css for
// `var(--name, fallback)` and fails if the same --name is ever given two
// different fallback values. It does not — and can't — know which
// fallback is *correct*, only that they must all agree.

'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

function findSourceFiles() {
  const siteDir = path.join(REPO_ROOT, 'site');
  const out = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.dc.html') || entry.name.endsWith('.css')) out.push(full);
    }
  })(siteDir);
  return out;
}

// Matches `var(--name, fallback)`, where fallback may itself contain a
// nested `var(...)` (e.g. `var(--font-display, var(--font-heading))`) but
// not deeper nesting than that — matches every fallback pattern actually
// in use today (see the header comment); a third level would need a real
// parser, not worth it for the cases that exist.
const VAR_FALLBACK_RE = /var\(\s*(--[a-zA-Z0-9-]+)\s*,\s*((?:[^()]|\([^()]*\))*)\)/g;

function extractVarFallbacks(text) {
  const pairs = [];
  let m;
  while ((m = VAR_FALLBACK_RE.exec(text))) {
    pairs.push({ name: m[1], fallback: m[2].trim() });
  }
  return pairs;
}

function main() {
  const files = findSourceFiles();
  const byName = new Map(); // name -> Map(fallback -> [file, ...])

  for (const file of files) {
    const rel = path.relative(REPO_ROOT, file).split(path.sep).join('/');
    const text = fs.readFileSync(file, 'utf8');
    for (const { name, fallback } of extractVarFallbacks(text)) {
      if (!byName.has(name)) byName.set(name, new Map());
      const byFallback = byName.get(name);
      if (!byFallback.has(fallback)) byFallback.set(fallback, []);
      byFallback.get(fallback).push(rel);
    }
  }

  const problems = [];
  for (const [name, byFallback] of byName) {
    if (byFallback.size > 1) {
      const lines = [...byFallback.entries()].map(([fallback, filesFor]) => '    "' + fallback + '" in ' + filesFor.join(', '));
      problems.push(name + ' has inconsistent fallbacks:\n' + lines.join('\n'));
    }
  }

  if (problems.length) {
    console.error('[check-var-fallbacks] FAIL: inconsistent var() fallback values:');
    for (const p of problems) console.error('  ' + p);
    console.error('Every var(--X, fallback) call site for the same --X must use the same fallback.');
    process.exit(1);
  }
  console.log('[check-var-fallbacks] all var() fallbacks are consistent (' + byName.size + ' distinct custom properties checked).');
}

main();
