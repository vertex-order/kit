#!/usr/bin/env node
// tests/site/check-token-snapshot.js — kit-owned. Not vendored (tests/
// isn't in sync.toml [publish] — see docs/testing.md).
//
// Regression guard for the class of bug where a design-token edit changes
// what was meant to be a no-op default: CLAUDE.md calls out that
// site/_ds/nocturne-*/styles.css's `:root { ... }` block is the one part
// of that generated file kit hand-edits ("design token *values*"). This
// snapshots exactly that block — nothing else in the file, which is
// Claude Design's generated output and not kit's to guard — and fails the
// build if any token's value changed, was added, or was removed without
// the committed baseline being updated to match.
//
// A silent diff here is precisely how "we added a theming variable and
// its default came out wrong" ships unnoticed: nobody's eyeballing a
// 290-line generated CSS file on every PR. Forcing the baseline to be
// updated explicitly (`--update`) makes every token-value change a visible
// line in the diff of tests/site/token-snapshot.json, reviewable same as
// any other change.
//
// Usage:
//   node tests/site/check-token-snapshot.js          # check (CI mode)
//   node tests/site/check-token-snapshot.js --update  # regenerate baseline

'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SNAPSHOT_PATH = path.join(__dirname, 'token-snapshot.json');

function findStylesCssFiles() {
  const dsDir = path.join(REPO_ROOT, 'site', '_ds');
  if (!fs.existsSync(dsDir)) return [];
  return fs.readdirSync(dsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(dsDir, e.name, 'styles.css'))
    .filter((p) => fs.existsSync(p));
}

// Extracts the `--name: value;` declarations from the first top-level
// `:root { ... }` block only — the rest of styles.css is Claude Design's
// generated component-class output, out of scope for this snapshot (see
// CLAUDE.md's ownership section).
function extractRootTokens(css) {
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rootStart = noComments.indexOf(':root');
  if (rootStart === -1) throw new Error('no :root block found');
  const braceStart = noComments.indexOf('{', rootStart);
  let depth = 0;
  let end = -1;
  for (let i = braceStart; i < noComments.length; i++) {
    if (noComments[i] === '{') depth++;
    else if (noComments[i] === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end === -1) throw new Error(':root block never closes');
  const body = noComments.slice(braceStart + 1, end);

  const tokens = {};
  // Split on ';' at depth 0 so multi-value declarations like the shadow
  // tokens (commas, nested rgba()/color-mix() parens) stay intact.
  let decl = '';
  let parenDepth = 0;
  const decls = [];
  for (const ch of body) {
    if (ch === '(') parenDepth++;
    if (ch === ')') parenDepth--;
    if (ch === ';' && parenDepth === 0) { decls.push(decl); decl = ''; }
    else decl += ch;
  }
  if (decl.trim()) decls.push(decl);

  for (const rawDecl of decls) {
    const line = rawDecl.trim();
    if (!line) continue;
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const name = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/\s+/g, ' ');
    if (!name.startsWith('--')) continue;
    tokens[name] = value;
  }
  return tokens;
}

function buildSnapshot() {
  const files = findStylesCssFiles();
  if (!files.length) throw new Error('no site/_ds/*/styles.css found');
  const snapshot = {};
  for (const file of files) {
    const key = path.relative(REPO_ROOT, file).split(path.sep).join('/');
    const tokens = extractRootTokens(fs.readFileSync(file, 'utf8'));
    const sorted = {};
    for (const name of Object.keys(tokens).sort()) sorted[name] = tokens[name];
    snapshot[key] = sorted;
  }
  return snapshot;
}

function diffSnapshots(baseline, current) {
  const diffs = [];
  const files = new Set([...Object.keys(baseline), ...Object.keys(current)]);
  for (const file of files) {
    const base = baseline[file] || {};
    const cur = current[file] || {};
    const names = new Set([...Object.keys(base), ...Object.keys(cur)]);
    for (const name of names) {
      if (!(name in base)) diffs.push(file + ': ' + name + ' added (' + cur[name] + ')');
      else if (!(name in cur)) diffs.push(file + ': ' + name + ' removed (was ' + base[name] + ')');
      else if (base[name] !== cur[name]) diffs.push(file + ': ' + name + ' changed: ' + base[name] + ' -> ' + cur[name]);
    }
  }
  return diffs;
}

function main() {
  const update = process.argv.includes('--update');
  const current = buildSnapshot();

  if (update) {
    fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(current, null, 2) + '\n');
    console.log('[check-token-snapshot] wrote ' + SNAPSHOT_PATH);
    return;
  }

  if (!fs.existsSync(SNAPSHOT_PATH)) {
    console.error('[check-token-snapshot] FAIL: no baseline at ' + SNAPSHOT_PATH + ' — run with --update to create it.');
    process.exit(1);
  }
  const baseline = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
  const diffs = diffSnapshots(baseline, current);
  if (diffs.length) {
    console.error('[check-token-snapshot] FAIL: design-token defaults changed:');
    for (const d of diffs) console.error('  ' + d);
    console.error('If intentional, run `node tests/site/check-token-snapshot.js --update` and commit the updated snapshot.');
    process.exit(1);
  }
  console.log('[check-token-snapshot] token defaults match the committed baseline.');
}

main();
