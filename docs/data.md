<!-- docs/data.md (markdown) -->

# `site/data/*.js` files

Broad strokes only — for exact fields see `schemas/*.schema.json`
(machine-readable, one schema per file below), and for worked examples see
`vertex-order/final-fantasy`'s or `vertex-order/kingdom-hearts`' real
`site/data/`. Don't duplicate schema-level field detail here; if this doc
and a schema ever disagree, the schema wins — fix this doc, not the other
way round.

Every file here is a classic `<script>` (not an ES module) assigning
`window.*` global(s) — plain JS, not JSON, so page.dc.html and friends can
load it over `file://` too.

Each file below points at its own schema with a `// schema: <name>.schema.json`
comment before the assignment it covers — `scripts/validate-data.py`
(`just check-data`) scans for that comment and validates against whatever
it names, so the table below is a description of current convention, not
something the validator reads. A file with no such comment (or one naming
a schema outside this directory, e.g. a repo's own local schema) is simply
not covered by kit's default schemas/ — see `schemas/README.md`.

| File | Owned by | Schema | What it holds |
| --- | --- | --- | --- |
| `index.js` | list repo | `index.schema.json` | `GROUP_ORDER` — which `group-*.js` files exist and their display order. Rest of the file is fixed loader boilerplate. |
| `group-<code>.js` | list repo | `group.schema.json` | One group's entries (`games[]`) — the actual list content: titles, ratings, platforms, languages, descriptions. The big one. |
| `site.js` | list repo | `site-config.schema.json` | `SITE_CONFIG` — franchise name/tagline/license/footer config for the whole page. |
| `credits.js` | list repo | `credits.schema.json` | `CREDITS` — the attribution paragraph(s) in the footer. |
| `faq.js` | list repo | `faq.schema.json` | `FAQ_ITEMS` — this franchise's own FAQ entries, plus a spread of kit's `FAQ_ITEMS_COMMON`. |
| `help-wanted.js` | list repo | `help-wanted.schema.json` | `HELP_WANTED_ITEMS` — flat list of open tasks shown in the Help Wanted section. |
| `common-faq.js` | kit (vendored) | `faq.schema.json` | `FAQ_ITEMS_COMMON` — FAQ entries identical across every list, folded into each repo's `faq.js`. |
| `catalogs.js` | kit (vendored) | `catalogs.schema.json` | Fixed lookup tables (language names, rating-source labels, Steam review abbreviations) that entry fields reference by code instead of repeating text. |
| `platform-icons.js` | `vertex-order/platforms` (vendored) | `platform-icons.schema.json` | `PLATFORM_ICONS` — the icon/size/label catalog a group entry's `platformGroups[][].key` looks up. |

A **list repo** (final-fantasy, kingdom-hearts, ...) hand-writes
`index.js`/`group-*.js`/`site.js`/`credits.js`/`faq.js`/`help-wanted.js`
for its own franchise. `common-faq.js`/`catalogs.js`/`platform-icons.js`
are vendored — never hand-edit those copies, edit them at the owning repo
and pull via `just sync`.

## A few things worth knowing before opening a schema

- **`group-*.js` entries recurse.** A `games[]` item's shape (title,
  rating, platforms, languages, description, ...) is the same shape used
  for its own `extras[]` (other versions, behind a toggle), `alt` (a
  singular inline "or" row), and `alts[]` (multiple parallel "or" rows). A
  sub-entry can omit its own title/subtitle and inherit its parent's
  wholesale. See `group.schema.json`'s `GroupEntry` `$def`.
- **`by` is an optional credit line** shown between the title and the tags
  line, in the tags line's look. It is a name (`'Charles'`,
  `{ name, url }`) or an array mixing bare names (the default "by" group)
  and groups `{ role?, label?, names }`, displayed `<role> <label> <names>`
  with `label` defaulting to "by" (`role: 'written'` reads "written by";
  `label: 'featuring'` with no role reads "featuring ..."). Groups appear in
  order of first appearance, and items sharing a role+label
  (case-insensitive; a bare name is the default group) collapse into the
  first one: `['Julie', {role:'written', names:'Charles'}, 'Katie']` shows
  "by Julie, Katie; written by Charles". Only after a group is complete are
  repeats (same name text and url) dropped, within that group only. The
  same name under two roles stays twice. `url` is optional; `#...` opens in
  the same tab, anything else in a new one.
  `by` also works on the slot (inherited by `primary`, `alts[]` and
  `versions[]`, so it survives promoting a new primary), and any node's own
  `by` replaces the inherited one wholesale (`by: null` clears it). A row
  only displays credits when they differ from its parent's: the primary
  always, an alt only if different from the primary, a version only if
  different from its release. ("Tags line" is `tags`/`tagParts` and
  `EntryTags`; "credits" is `by` and `EntryCredits`.)
- **There are three different "styled text run" shapes**, not
  interchangeable: `ConfigPart`/`Paragraph` (site config, credits, FAQ
  answers — `common.schema.json`), `DescPart` (entry `description[]` —
  richer, supports `<abbr>`/tooltips), and `TagPart` (`tagParts[]` —
  narrower still). Using the wrong one for a given field is a schema
  validation error, not a silent no-op.
- **A `Prose` paragraph's own array can mix two kinds of item**: a bare
  `DescPart` object (`{ text: '...' }`/`{ emLinkText: '...', ... }`,
  today's flat run — concatenated exactly as written, never auto-spaced)
  and a "sentence" (a bare string, or a nested `DescPart[]`) — splitting a
  paragraph into sentences purely for editing clarity. Consecutive
  sentences get a convenience space auto-inserted at their seam when
  neither side already has one there (`'Hi.'` next to `'Ho.'` joins as
  `'Hi. Ho.'`, same as `'Hi. '` next to `'Ho.'` or `'Hi.'` next to
  `' Ho.'` — never a double space); plain `DescPart` objects are never
  touched by this, so e.g. a link immediately followed by its own trailing
  period stays glued with no inserted space, exactly as authored. Only the
  *outer* array (`versionDesc`/`mediaDesc`/group `note` itself) creates an
  actual new, visually distinct paragraph — promote a sentence to its own
  outer-array item instead if it's meant to read as a separate paragraph,
  don't rely on the inner grouping for that.
- **Ratings have two unrelated modes**: a `scores[]` array (one or more
  independently-linked scores) or a single text/`<abbr>` badge
  (`textOnly`/`kind`). A `rating` object that's neither renders nothing.
- **`chronoOrder`/`recommendedOrder` are plain sort keys, not positions** —
  space new entries in whole-number gaps (tens, not 1/2/3) so a later
  insertion doesn't need a decimal. Reach for a float only once a gap's
  already exhausted, and treat that as a sign the series is due a full
  renumber (whole numbers, gaps restored) rather than a long-term fix.
- Some real, common fields are annotations with no runtime effect (e.g. a
  language's `native`, a platform item's `noUrl`) — kept valid because
  real data uses them, not because anything reads them.
- **`DateValue`'s `approx`/`ongoing` flags apply to the whole value, not
  per side** of a `{start,end}` range — there's no `startApprox`/`endApprox`
  split. `ongoing` (a franchise/series expected to get more entries) is
  unrelated to `releaseDate`'s future-dated / `Upcoming` machinery (see
  docs/upcoming.md), which is about one specific unreleased title.
- **`releaseOrderDate` is a sort-only date** (on a `media[]` slot, same
  grammar as `titleDate`). It only affects the two release-order modes, for
  a primary that's a renamed remake/Final Mix whose own `titleDate` would
  sort it after entries it actually predates — give it the *original*
  release date. Omitted, nothing changes. It never touches the heading
  year, anchor, dedupe key, or Upcoming/Recent; in those two modes the
  title year's tooltip just gains ", sorted as <date>" so the order isn't
  a mystery.

## Choosing a rating when more than one exists

Applies to every entry with a `ratings`/`scores[]` field — games, books,
films, anything — not just books/comics. See docs/sources.md for which
*site* wins by default per media type; this is about picking *within*
that once several candidate numbers are on the table.

- **Minimum ~10 ratings/reviews to count.** Below that, the number is
  noise — skip it even if it's otherwise the "right" source.
- **Confidence (sample size) beats site-priority when the gap is an
  order of magnitude or more** — 1.3k ratings beats 10 ratings outright,
  regardless of which site each is on. A close gap (1.3k vs 1.5k) isn't
  a clear win either way — judgment call, fall back to the normal
  site-priority pecking order.
- **Not concerned with matching the rating to this exact print/edition.**
  Use the best-confidence rating found across any version/edition of the
  title, not necessarily the one for this specific one — e.g. a book's
  displayed rating can come from an omnibus edition's page even though
  the entry itself represents the individual volumes.

## Naming a work in prose links

Applies to any `emLinkText`/`emLinkUrl` in a description that points at
another entry.

- **Link text = short name + the year that named release first came
  out** (`Birth by Sleep (2010)`), even when the target is a Final Mix or
  remaster primary whose own heading says otherwise.
- **Link the primary entry** when citing the story in general.
- **Link the specific version/alt anchor** when the sentence depends on
  that release's contents or timing (adaptations, borrowings, remakes).
- **Never change a heading's name or date to match a link.** The heading
  keeps the real name and year of the release it represents.
- **A remaster that becomes the primary** is still cited by the original
  year in prose.
