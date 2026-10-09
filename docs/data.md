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

## Editing an entry? Update its sources file

- Entry facts (credits, links, ISBNs, "has results" checks) are backed by
  `sources/<slug>-<year>.md`; change both together.
- Format and what to record: docs/sources.md, "Keeping it in step with
  entry data".

## A few things worth knowing before opening a schema

- **`group-*.js` entries recurse.** A `games[]` item's shape (title,
  rating, platforms, languages, description, ...) is the same shape used
  for its own `extras[]` (other versions, behind a toggle), `alt` (a
  singular inline "or" row), and `alts[]` (multiple parallel "or" rows). A
  sub-entry can omit its own title/subtitle and inherit its parent's
  wholesale. See `group.schema.json`'s `GroupEntry` `$def`.
- **`id` on an `alts[]` or `versions[]` item is its whole anchor**
  (`entry-<group>-<id>`), not a suffix.
  - Keeps a release's original anchor when a later edition takes over the
    slot title and the original is demoted (e.g. Final Mix promoted → the
    original keeps `#entry-II-kingdom-hearts-ii-2005`).
  - Without it, alts use `-or`/`-or-N` and versions use `-x-<slug>`.
  - Match the pinned sources filename (`sources/<id>.md`) so anchor and
    sources file line up.
  - Must be unique page-wide; `check-anchors.py` fails a collision.
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
- **Native release is the authoritative date** for `titleDate`
  start/end.
  - Use the original-language release, even when a translation lands later.
  - Range `end`: latest native release (e.g. last native volume), not
    the translation's.
  - Translation dates stay in `sources/`, unstarred.
- **`releaseOrderDate` is a sort-only date** (on a `media[]` slot, same
  grammar as `titleDate`). It only affects the two release-order modes, for
  a primary that's a renamed remake/Final Mix whose own `titleDate` would
  sort it after entries it actually predates — give it the *original*
  release date. Omitted, nothing changes. It never touches the heading
  year, anchor, dedupe key, or Upcoming/Recent; in those two modes the
  title year's tooltip just gains ", sorted as <date>" so the order isn't
  a mystery.

## Book format labels (tags and platform names)

- Name the **format** of the book, in the form of its country of origin:
  `Manga`, `Manhwa`, `Light Novel`, `Novel`, `Novella`, `Gamebook`,
  `Picture Book`, `Short Stories` (a true collection).
- `Light Novel`: only when the book is officially called one, in its
  Japanese edition (a light-novel imprint such as a bunko line) or its
  English edition (e.g. Yen On titles). Otherwise `Novel`. Genre tags on
  Goodreads don't count.
- `YA Novel`: only a book sold as young-adult in the West.
- Content goes elsewhere (description, tags like `Short Stories`), not in
  place of the format.

## Book platform link (book entries only)

- The `book` platform row helps a reader find a copy in their language
  from a store. We don't list stores: too regional, too many.
- Pick, in order:
  - Goodreads **series** page, when the series exists: it links every
    volume and its language editions.
  - Else a Goodreads book page that lists the other languages as alternate
    editions.
  - Otherwise the DuckDuckGo search row
    (`paren: 'DuckDuckGo', search: 'duckduckgo'`).
- Never repeat `profileUrl` in the `book` row (e.g. the publisher's English
  store page). Same page twice, and no route to a store.
- Search row:
  - Omit `searchTitle` unless punctuation breaks the results.
  - No language word in the query; the reader adds their own.
  - `noResults` only if the search really comes back empty.

## Descriptions

- Help a reader find the work and know what it is: what it adapts or
  tells, and the names it goes by.
- Leave out publishers, paperback vs hardcover, imprints and other
  edition minutiae. That belongs in the sources file; the format already
  shows in the tags and platform.
- Rare exception: versions with different bonus content may need a
  publisher to tell them apart (e.g. the KH1 novel or manga). Don't add
  one where there wasn't one; don't remove an existing one.

## What belongs on a list

- **Stories only:** adapted stories or original stories (novels, manga,
  comics, audio dramas, scripts of them).
- **Not listed:**
  - pure artbooks;
  - walkthroughs and game guides;
  - books that just list what is in the game (encyclopedias, ultimanias);
  - behind-the-scenes and developer content (interviews, making-of,
    commemorative books).
- **Gag strips and 4-koma:** a book of them about one game qualifies once
  there are enough to form a body of content, with or without a continuing
  story; a lone strip inside an unrelated book (a game guide, say) doesn't.
  Anthologies by many artists follow the same test.
  - A general Final Fantasy gag book (not tied to one game) can go in
    "other"; being limited to one game makes it a stronger yes.
- **Mixed books:** judge by the story content; a guide or encyclopedia that
  carries original comics or stories is borderline, so decide per book.

## Deciding what counts as one entry

How many entries a body of work gets (labelling is docs/subtitle.md).

- **Primary medium sets the grain.** Games franchise: games listed
  finely. Book franchise: books. Film franchise: films.
  - Lean verbose in the primary medium: list individual releases even
    when minor (standalone minigames, small spin-offs); don't collapse.
  - Lean compact in secondary media: completeness and discovery only.
- **Roll parts into one entry (secondary media) when they:**
  - are numbered/marketed as volumes of one work (`Vol. 1`, `Vol. 2`);
  - tell one finite story, "complete" when it ends;
  - are read together, in order, and skipped or marked read as a unit;
  - are sometimes re-released as one omnibus.
- **Rolled-up entry format:**
  - `length`: `N volumes`.
  - Volume subtitles in the description, for lookup.
  - Link the omnibus, else the first volume.
  - Usual cases: manga, multi-volume game novelizations.
  - Chapters never listed; nobody looks them up once volumes exist.
- **Keep separate** when each part has its own title identity and stands
  alone, or the run is open-ended with no single story to complete.
- **Pointer entry:** one entry pointing at a huge family of minor
  releases (dozens of titles) instead of listing each.
  - Use when listing would add pages of text for little return.
  - Judgment call, revisitable.
  - Less justified in the primary medium; prefer listing there.

## Crediting books and comics (`by`)

- **Books:** credit the author only, as a bare name (`by: 'Name'`).
  - Reads "by Name"; no `written` role, it's implied.
  - Skip illustrators; books are mainly words.
- **Comics/manga/manhwa:** art counts, so credit it.
  - Same person writes and draws: bare name.
  - Different people: `written` and `illustrated` roles, both explicit.
- **Adaptations:** when it's clearly an adaptation of source material
  (a game's novelization or manga), the credit becomes `adapted` ("adapted
  by").
  - Flags that the original story came from someone else, without listing
    them.
  - Books: `adapted` replaces the bare name.
  - Comics, same writer and artist: `adapted` replaces the bare name.
  - Comics, different writer and artist: `adapted` and `illustrated`
    (the adapter takes the place of `written`).
  - `written` and `illustrated` are for original, non-adapted comics.
- **Source's creator in a description:**
  - Book source: name its author, unless the description links the
    source's own entry (it already credits them).
  - Game or film source: don't name the writer or director.
  - Never add them to the adaptation's `by`.

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

## Search links: `searchTitle`

- **Default is the entry's own title.** Be lazy: if a search on the
  straight title gives the results we want, don't override it.
- **Override `searchTitle` only when it gets us something:**
  - results where there were none;
  - higher-quality results;
  - more results.
  - What it takes: removing punctuation (e.g. `~...~`), or changing or
    shrinking the title.
- **Why not by default:** every override can drift from the real title.
  Fewer overrides, less to keep in step.
- Use `searchQualifier` to narrow a search that is otherwise fine
  (e.g. an author or format word) instead of rewriting the title.

## `~...~` in titles

- `~Something~` is our **format suffix**, e.g. `Final Fantasy ~Manga~`,
  `Final Fantasy IV ~Novel~`.
  - Mainly for an adaptation with the exact same title as its source,
    no extra characters or subtitle.
- Japanese and englishified Japanese titles also use `~Something~` for a
  subtitle, so the two can be confused.
- We still use it to disambiguate a potential conflict, or wherever a
  clarification in the title helps.
- **Exception:** when the title already carries a `~Subtitle~` (e.g. the
  XI books), put the format in parentheses instead: `Final Fantasy XI
  ~Winds of Prayer~ (Manga)`.
  - A second tilde group would read as another subtitle.
  - The `(series)` titles already put a lowercase parenthetical before the
    date.

## Dates for serialized comics

- **Start:** the first release or serialization date we can find; a reprint
  or collected volume never replaces it.
- **Use the best information available:** what we can find and record in
  sources, not just what the entry already shows. Look for serialization
  dates first.
  - Most sources only date books and volumes, not magazine
    serializations; when that's all there is, use the volume dates.
  - Start known but not the end: end at the last volume's date, and say
    in the sources file that it's a fallback.

## Naming a work with no official English title

- **Title:** the best-sourced translation (usually the wiki's literal
  one), kept stable. Follow the group's style; see "`~...~` in titles".
- **Description:** "Released as *<transliterated original>* (<original
  script>, literally "<gloss>")", then "sometimes referred to as"
  followed by other names in use.
- **Alternate names:** list any name people actually use (forum posts,
  marketplace listings), including machine translations; they're what a
  searcher types.
  - Leave out names nobody uses.
- **Sources:** record each alternate name in the entry's sources file
  with where it was seen and a `*`.
