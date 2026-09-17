<!-- docs/testing.md — owned by vertex-order/kit. Edit here.
     Not vendored (not in sync.toml [publish]) — see "Scope" below. -->

# Testing philosophy

kit has no test framework, and doesn't need a big one. This doc says what
we test, why, and — as important — what we deliberately don't.

## What we're actually guarding against

Every regression we've hit so far shares a shape: the page *looks* fine —
settled markup, nothing thrown — while some specific invariant silently
breaks.

- SSR prerender shipped a page that never boots for a real visitor
  (fixed in fbb80c1). `scripts/ssr-render.js`'s output was well-formed,
  serialized cleanly, and support.js's client-side `boot()` still
  silently no-opped on every real page load, because the one `<x-dc>`
  the entry file had was already consumed producing the snapshot.
- A new theming variable's fallback came out wrong (fixed in 82a08e4):
  `var(--font-display-tracking, 0)` where every other call site said
  `var(--font-display-tracking, normal)`. Nothing crashed — it just
  applied `letter-spacing: 0` instead of leaving it alone, for any repo
  that hadn't defined that token itself. A no-op change that wasn't one.

Neither of these needed a browser, a screenshot, or a real user clicking
around to catch. They needed something asserting the specific invariant
that broke, run automatically before the change ships. That's the bar for
everything below: each check exists because it locks in a real invariant
we've already watched break, not because "more coverage" is inherently
good.

## Scope: kit only, for now

This suite lives entirely under `tests/site/` and is **not** in
`sync.toml`'s `[publish]` — it doesn't get vendored into `platforms` or
any list repo. `scripts/ssr-render.js` and `justfile` *are* published, so
the same SSR-inert-page bug class can in principle happen in any repo that
builds its own `page.dc.html` — but list repos aren't pulling this test
suite (yet). `justfile`'s `build` recipe only runs
`tests/site/verify-ssr.js` when that file is present
(`if [ -f tests/site/verify-ssr.js ]`), so a repo that hasn't vendored
`tests/` gets the exact same `build` behavior as before this suite existed
— nothing here can break a downstream build. If this class of bug recurs
downstream, that's the signal to add `tests/site/` (and `.github/workflows/
test.yml`) to `[publish]` and let it propagate for real.

## What's checked, and how

Two kinds of check, both cheap and deterministic — no browser automation,
no screenshots, no pixel diffing:

**`tests/site/verify-ssr.js`** — boots a *second*, independent JSDOM
instance against the already-built `build/index.html`, exactly as a real
visitor's browser would (same fetch/CDN/matchMedia shims as
`scripts/ssr-render.js` itself, factored into `scripts/ssr-lib.js` so the
two can't drift apart). Asserts the live `#dc-root` actually mounts, the
`#dc-root-ssr` snapshot gets cleaned up, and clicking the theme toggle
actually changes the rendered theme. Runs as the last step of `just build`
whenever Node is on `PATH` — so it gates `just serve` and every deploy
(`static.yml` → `just build`), not just CI.

**`tests/site/check-token-snapshot.js`** — snapshots the `:root { ... }`
block of `site/_ds/nocturne-*/styles.css` (design token *values* — the one
part of that generated file kit hand-edits, per `CLAUDE.md`'s ownership
section) to `tests/site/token-snapshot.json`, and fails if any token's
value changed, was added, or was removed without the baseline being
updated to match. Update it with:

```sh
node tests/site/check-token-snapshot.js --update
```

and review the diff like any other change — that review step is the whole
point; a token-value change should always be a visible line in a PR, not a
280-line generated CSS file nobody's re-reading.

**`tests/site/check-var-fallbacks.js`** — scans every `site/*.dc.html` and
`site/_ds/*/styles.css` for `var(--name, fallback)` and fails if the same
`--name` is ever given two different fallback values across call sites.
Tokens like `--font-display-tracking` are deliberately never defined in
`:root` (they're theme-overridable per-repo), so the fallback *is* the
only recorded default — this is the check that would have caught 82a08e4
directly.

Run the fast checks without a full build:

```sh
just check-tokens
```

Run everything (fast checks + a real `just build`, which includes
`verify-ssr.js`):

```sh
just test
```

CI (`.github/workflows/test.yml`) runs both on every PR and on push to
`main`.

## What we don't do, on purpose

- **No Playwright/Cypress-style browser E2E.** Clicking through real DOM
  in a real browser is the highest-fidelity check available, and also the
  most expensive to maintain — brittle against unrelated markup changes,
  slow, and flaky in CI in ways that erode trust in the suite faster than
  they catch bugs. For sites this size, that trade isn't worth it.
- **No pixel/visual regression testing** (Percy, BackstopJS, etc). The
  token-snapshot check above catches the actual failure mode we've hit
  ("a default changed when it shouldn't have") without screenshot infra,
  font-rendering flakiness across CI runners, or a review flow nobody
  actually looks at closely.
- **No tests of `support.js` or `site/_ds/**` internals.** Both are
  vendored Claude Design output — "don't hand-edit" applies to testing
  them too. `verify-ssr.js` tests the *integration* of kit's own
  `*.dc.html` against that runtime (the actual seam that broke), not the
  runtime's internals.
- **No proactive sweep of every checkbox/dropdown/control.** That's the
  classic brittle-UI-test trap: broad coverage, high maintenance cost, and
  for a component library this size, low odds any given control breaks
  silently without someone noticing in the tuning-bench preview first.

## When to add a new check

Add one when a bug actually ships, not speculatively. The pattern each
time:

1. Something broke silently — no exception, no obviously-wrong markup,
   just a wrong invariant.
2. Fix it, then write the smallest check that would have caught *that*
   specific break before it shipped.
3. Put it in `tests/site/` if it exercises kit's own `*.dc.html` /
   `site/_ds/*/styles.css` output (own file extraction/scan is fine — see
   `check-token-snapshot.js`'s approach); reserve `tests/scripts/` for
   anything that ends up testing `scripts/*.py` in isolation (pure-ish,
   no rendering involved) if that suite gets started later. Keep the two
   separate — different failure domains, different invocation (`node` vs
   `python3`), no reason for one command to run both.
