# Sources

- Every entry links out to a title article, edition/subtitle articles, a
  rating page, store/platform pages, a publisher page. Descriptions
  (esp. the plot intro) are usually synthesized across several of these
  plus store marketing copy — not copied from one.
- `sources/` records, per entry, what was actually read to write it — so
  a claim can be checked without re-researching, and survives link rot.
  Companion record, not rendered on the site.

## File layout

- One file per **entry** (not per edition), flat under `sources/`:
  `sources/<slug>-<year>.md`
  - `<slug>` = entry's kebab-case `key`
  - `<year>` = entry's own top-level `releaseDate` year (not an edition's)
  - e.g. `final-fantasy-1987.md`
  - Flat, not grouped by series: slug+year is already unique catalog-wide,
    so a series subfolder isn't needed for disambiguation — and some
    entries are cross-listed under more than one series in `site/data/`,
    which would leave no clean answer for "which folder." One file, no
    ambiguity.
- All editions/sub-parts of the entry (remasters, DLC, alt releases) go in
  the same one file, combined — no per-edition subsections.
- Path mirrors the entry's own anchor id: `entry-<SERIES>-<slug>-<year>` →
  drop the `entry-` prefix and the `<SERIES>-` segment, what's left is the
  filename (`sources/<slug>-<year>.md`).
- Id is overridable in `site/data/`. Override wins — rename the sources
  file to match it, don't re-derive from key/year.

### Franchise-wide files

- For a source that isn't tied to one entry — spans many entries, or
  documents the franchise/series as a whole (a catalog/list page, a
  series-overview article) — file as `sources/<slug>.md`, no year.
  - e.g. `final-fantasy-franchise.md` for
    [List of Final Fantasy video games](https://wikipedia.org/wiki/List_of_Final_Fantasy_video_games).
  - Same internal structure as an entry file (`## Sources`, `##
    Decisions`, etc. — see below).
- Doesn't replace per-entry citing: a page like the list article above
  still gets cited from each entry's own file too (it's genuinely a
  source for that entry's dates/platforms). The franchise file is for
  the fact that the page *itself*, as a franchise-spanning catalog, is
  worth recording once — not a substitute for the per-entry lines.

### Series-wide files

- For a source covering one subseries — file as `sources/<num>-series.md`,
  no year. `<num>` = the site's own jump-link code (`#series-XII` →
  `xii-series.md`), not the source's topic name — a series' article
  title often doesn't match its series name (`Ivalice` vs. `XII`).
  - e.g. `xii-series.md`, sourced from
    [Ivalice](https://wikipedia.org/wiki/Ivalice).
- Only add one when a source actually exists at that scope (a
  series-overview article) — most series don't need one.
- `-series` (no year) vs. entry's `-<year>`: dated = entry, `-series` =
  series rollup, neither = franchise-wide.
  - Exception: `chocobo-series-1997.md` is a real dated entry (cross-
    listed in `site/data/` in lieu of a full series section) — "series"
    is just its title, not this pattern. Not a template to copy.

## Header policy for entry files: `##` only

- Applies to files under `sources/`, not this doc.
- `##` only, for the named top-level sections (`Sources`, `Decisions`,
  `Surveyed`, `Not yet surveyed`). No `###`, no `####`.
- Grouping *within* a section (by site) is a plain-text label line, not a
  heading — these files are hand-edited plaintext far more than rendered.

## What goes in a file

Not every field needs an entry — only what this doc calls out. Languages/
tags/release dates usually don't need sourcing unless from something
worth recording (e.g. a wiki that's since gone stale).

### Sources — one flat, deduped list

- Group by **site** (plain-text label), not by entry field.
  - A URL is a stable identity; entry fields move around as the entry
    gets edited. Group by what holds still.
  - Field-based grouping would also require hand-tracking the real data
    schema as a second, separately-drifting copy — don't.
  - Field info instead lives as a **per-URL tag**, so it's still
    greppable by field.
- One line per **use**, not per URL string — a bare URL and an anchored
  URL are the same line unless they genuinely fed different facts.
- `[Title]` label only when the URL itself doesn't say what it is (opaque
  numeric app-store ID). A slug or named `#anchor` doesn't need one.
  - Anchors rot faster than pages (silent rename) — if the anchor name
    might drift, say the section name in words too.
- Same page, multiple anchors: one line for the bare page URL, each
  `#anchor` as its own indented sub-bullet below it — full
  `<url>#anchor`, not just `#anchor`, so the sub-bullet stays clickable
  on its own — not separate flat lines.
- **`*` on a tag** = "this fact is actually reflected in the entry right
  now." Unstarred = "this page covers it too," not a claim of origin.
  - Coarse, not a footnote — no per-word/per-sentence tracing.
  - Does **not** mean "linked from `site/data/`" — that would require
    re-verifying against the live data file on every edit (the exact
    sync burden this file exists to avoid). Star it because you know the
    fact is real, not because you matched it to a literal href.
- Line shape:
  `<url> — <field(s) fed> — accessed YYYY-MM-DD — archived: <wayback-or-archive.today-url>`
  - Drop `archived:` only when truly unarchivable (paywalled app-store
    deep links). `archived: TODO` is fine — batch-fill later; access
    date alone is enough to find/create a snapshot afterward.
  - Archive via [web.archive.org/save](https://web.archive.org/save),
    fallback [archive.today](https://archive.ph/).
  - Only skimmed, not read closely? Append `— shallow: <what wasn't
    checked>` (same tag as Surveyed, below).
- Platform-store/rating links that are already the site's own outbound
  link still get a line — they're the most likely to be taken down.
- Duplicate/mirror site (breezewiki mirroring Fandom): don't bolt a
  second URL onto the canonical page's line. If the mirror was actually
  consulted, it's its own line in `## Surveyed`, marked `dup`, nested
  under the page it duplicates.

### Which source wins for a given fact

Default pecking order when multiple sources could back the same fact.
Default to reach for, not a hard rule — override and say why in
`## Decisions` when needed.

- **story** — publisher/dev site > platform store page > fan wiki > Wikipedia
- **platforms** — fan wiki ≈ Wikipedia for describing which platforms;
  a store page only proves *its own* platform's existence (different job)
- **versions** — fan wiki > Wikipedia > platform store page > publisher/dev site
- **game ratings** — Metacritic (critic, then user)
- **video/film ratings** — IMDB > Metacritic
- **book ratings** — Goodreads
- **game age rating** — not site-priority: use whichever page(s) show an
  actual ESRB rating (not marketing blurb); disagreement → take the lowest
- **languages** — platform store page > fan wiki
- **game length** — not site-priority: HowLongToBeat always wins (see
  below); multiple HLTB entries for the same game → take the longest

### Typical tags by site (reference, not a taxonomy)

Free text, not a controlled vocabulary — write what's true for the page
in front of you. Memory aid for what a site usually offers and which tag
defaults to `*`. Default star only where a site is *unconditionally* top
(a store always proves its own platform exists); context-dependent picks
(story, versions, which rating site) aren't pre-starred — decide per entry.

- **Wikipedia** — dates, story, platforms, tags, versions
- **Fandom wikis (+ mirrors)** — dates, platforms\*, tags, versions\*, age
  — starred: top/tied-top of the platforms/versions pecking order
- **MobyGames** — credits, platforms, regional release info
- **Metacritic** — ratings\*, story, platforms, age — starred: top of the
  game-ratings order
- **Digital storefronts** (Steam, Xbox, PlayStation, Nintendo, Google
  Play, Apple App Store, Apple Arcade, Amazon) — age\*, dates, platforms,
  story, ratings, tags, versions
  - `age*`: store page is the direct source for its own real ESRB rating
  - `platforms` unstarred: proves *its own* platform exists, but that's
    narrower than being the primary source for the platforms *list*
    (a wiki table beats one store visit per platform) — note existence
    as plain text ("proves existence of platform"), not a star
  - Visiting the page is routine (confirm the release is real); its
    marketing copy/story/version claims stay unstarred and unused unless
    something else about the entry looks off and it's being used to
    sanity-check
  - `languages*` confirmed reliable on: Steam, Xbox, Apple App Store,
    Apple Arcade, Nintendo, Amazon. Known exceptions (expected, not a
    flag): PlayStation generally lacks it, Google Play unreliable.
    Missing on any of the other six → worth a second look.
  - Only PlayStation and Xbox listings give per-platform variant detail
    (e.g. "Xbox Series X|S Optimized", "PS4 Pro Enhanced")
- **Publisher site (store/marketing page)** — story\*, platforms, versions,
  dates, languages — starred: top of the story order
- **Publisher press kit / blog post** — story, platforms, versions, dates
  — promotional boilerplate, rarely worth a star even from the publisher
- **HowLongToBeat** — length\*, dates, platforms
  - Games only, unconditionally the length source (not context-dependent)
  - Platform list may reflect emulation, not official releases; release
    dates often unverified — both informational only
  - Books/film use Goodreads/IMDB for length instead
- **IMDB** — ratings\*, story, dates, credits — starred: top of the
  video/film ratings order (film/TV `mediaType`, not games)
- **Goodreads** — ratings\*, length (page count), dates, story — starred:
  only book-ratings source in the order, wins by default for books

Add a site here when you notice a pattern — don't pre-populate for sites
you haven't hit yet.

**Old titles:** publisher/platform pages disappear fast. Pre-2010 pages
are unlikely to still be online; pre-2000 usually never existed online.
Missing storefront/publisher rows on an old entry isn't a gap to chase —
it's expected, and wikis are doing real work there a store page couldn't.
Wayback Machine doesn't rescue this either — it's a lookup by known URL,
not a search engine. No recorded URL means nothing to look up.

### Plot intro sourcing

Synthesized across sources — don't quote it, map each claim to its
origin as a plain-text label + bullets:

```md
Final Fantasy (1987) — plot intro
> Four Warriors of Light depart on a quest to restore light to the crystals, defeat Chaos, and save their world.
- premise / Warriors of Light / crystals: [Wikipedia](https://wikipedia.org/wiki/Final_Fantasy_(video_game)) — intro para — accessed 2026-09-18
- "Chaos" as antagonist: [Final Fantasy Wiki](https://finalfantasy.fandom.com/wiki/Chaos) — accessed 2026-09-18
```

Unsourced claim = signal something was invented — fix it or find the
source, don't backfill a citation to match it.

### Decisions

Record a choice only when there *was* one (among rating sites, or wikis
disagreeing). One line each, latest reasoning is enough:

```md
## Decisions

- Rating: Metacritic critic (80) over Metacritic user (7.0, same page) and Steam (no numeric score, "Overwhelmingly Positive" tag only) — critic score used as the headline number per site convention.
- Villain name: used "Garland" (Wikipedia, Final Fantasy Wiki) over "Garuda" (an early fan-translation-era spelling still on one stale wiki mirror).
```

### Surveyed — the research catalog, rough

`## Sources` only holds what got cited. Research usually covers far more
— wiki mirrors, marketing copy that says nothing new, true-but-unused
facts. Keep that too (link rot doesn't spare it) at a lower bar: flat
list, **no headers ever** — a header invites pasting an article into it;
a bullet can't hold 200 lines without looking obviously wrong.

```md
## Surveyed

Rough. No polish obligation. Tags: `used` · `dup` · `mine` · `empty` · `shallow`

- [Fandom – Final Fantasy I](https://finalfantasy.fandom.com/wiki/Final_Fantasy_(video_game)) — infobox + prose — mine: unused enemy roster detail
  - breezewiki mirror — dup
  - finalfantasywiki.com — dup, wording only
- [MobyGames](https://www.mobygames.com/game/final-fantasy/) — full credits, regional box art — used, shallow: took the credits list; full regional release table not read
- [Square Enix press kit](https://...) — 2021 Pixel Remaster copy — empty for this (1987) entry

## Not yet surveyed

- ja.wikipedia.org · Famitsu archive · Nintendo Power scans
```

Line shape: `- [Title](url) — what's uniquely here — verdict[, verdict…]`.
Tags are **non-exclusive** — combine (`used, shallow` is normal):

- `used` — reflected in `## Sources`; this is the fuller note
- `dup` — same content as another entry; nest under it, don't re-list
- `mine` — has something not yet in the entry, worth a look later (the
  one that makes this a todo list, not just an archive of dead ends)
- `empty` — checked, nothing usable
- `shallow` — skimmed, not read closely; combine with `used`/`mine`.
  This is how "deserves a deeper pass" gets recorded — a tag, not a
  second list. `## Not yet surveyed` stays literal: *never opened*.

Never paste article text — write one line while reading, move on.
Pasting defers the real work and reproduces licensed text at volume far
beyond what Quotes (below) covers. Out of time? Stop and list what's
left under `## Not yet surveyed` — an honest partial catalog beats one
that implies completeness.

Two independent sources agreeing is enough — don't keep surveying past
that. Mirror turns out to be a dead end? Mark `dup`, move on — no need
to pre-check anything, just don't linger once it's obviously a repeat.

### Quotes

Sparingly — only a contested/load-bearing fact where exact wording
matters, never the default citation method. Short (well under a
paragraph), plainest sentence that states the fact, license tagged:

```md
> "The game was originally planned to be Square's swan song before an unexpected commercial success."
— [Wikipedia: Final Fantasy (video game)](https://wikipedia.org/wiki/Final_Fantasy_(video_game)), CC BY-SA 4.0, accessed 2026-09-18
```

A quote keeps the *source's* license, not this repo's ([LICENSE](../LICENSE))
— true for BY-SA or BY-NC-SA: unmodified reproduction of a fragment
stands alone under its own terms if clearly quoted/attributed. Paraphrase
+ keep the license tag = wrong — a paraphrase is an adaptation, inherits
the source's terms for real.

## What this doc is not

- Not a citation footnote system for the live site — the page stays
  clean prose, `sources/` holds the receipts.
- Not a mechanism to justify every word choice — only sourced facts and
  cross-source conflicts need a line.
- Not retroactive — new/edited entries get a sources file going forward,
  no obligation to backfill.
