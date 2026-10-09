# Sources

- Entries link out to title/edition articles, rating pages, store pages,
  publisher pages. Descriptions are synthesized across these, not copied
  from one.
- `sources/` records, per entry, what was read to write it.
  - Claims checkable without re-researching; survives link rot.
  - Companion record, not rendered on the site.

## Style

- Succinct, point form. Everywhere: this doc and every `sources/` file.
- Fragments over sentences. One fact per bullet.
- No prose paragraphs, no narration, no restating what the entry data
  already says.
- Cut rationale to the shortest form that still justifies the line.

## Keeping it in step with entry data

- Change entry data → update its sources file in the same pass.
- Add/change a `by` credit → add/update an `## Author` line.
  - Cite the page, with the role it states.
  - Name anyone deliberately left out (book illustrator, adaptation's
    game writer).
  - Star `credits` on the existing source line.
- Add/change ISBN, edition, or language link → update `## Editions
  (ISBN)`, resolve the four lookup links.
- Confirmed a lookup → add URL, fact proved, `accessed` date.
- Can't reach/verify a source → say so in the line. Never imply checked.

## File layout

- One file per **entry** (not per edition), flat: `sources/<slug>-<year>.md`
  - `<slug>` = entry's kebab-case `key`
  - `<year>` = entry's own top-level `releaseDate` year (not an edition's)
  - e.g. `final-fantasy-1987.md`
  - Flat: slug+year already unique; entries can be cross-listed across
    groups, so no clean folder answer.
- All editions/sub-parts (remasters, DLC, alt releases) share the one
  file. No per-edition subsections.
- Filename mirrors anchor id: `entry-<SERIES>-<slug>-<year>` → drop
  `entry-` and `<SERIES>-`.
- Mirrored once, at first citation. Then pinned: citable name, never
  renamed by a rebrand.
- **Rename** = later edition promoted to slot `title`, original demoted
  to an `alts[]`/`versions[]` item.
  - Slot anchor follows new title.
  - Pin old anchor on demoted original: set its `id` to pinned filename's
    slug. Anchor becomes `entry-<group>-<id>`.
  - Fix in-page links to old derived anchor (`check-anchors.py` lists them).
  - File keeps citing every edition.
- Slot `id` overridable in `site/data/`. Override wins: rename sources
  file to match.
  - Only for deliberate collision fix, never rebrand.

### Franchise-wide files

- Source spans many entries or documents the franchise: `sources/<slug>.md`,
  no year.
  - e.g. `final-fantasy-franchise.md`
  - Same internal structure as an entry file.
- Still cite the page from each entry's own file too.
  - Franchise file records the page itself, once.

### Group-wide files

- Source covers one subgroup: `sources/<num>-group.md`, no year.
  - `<num>` = site's jump-link code (`#group-XII` → `xii-group.md`),
    not the article's title (`Ivalice` ≠ `XII`).
- Only when a source exists at that scope. Most groups need none.
- Dated = entry, `-group` = group, neither = franchise.
  - Exception: `chocobo-series-1997.md` is a dated entry. "series" is
    its title. Not a template.

## Header policy for entry files: `##` only

- Applies to `sources/` files, not this doc.
- `##` only for top-level sections (`Sources`, `Decisions`, `Surveyed`,
  `Not yet surveyed`). No `###`/`####`.
- Grouping within a section (by site) = plain-text label line.
  - Exception: ratings-site section may split URLs under bare
    `### Omnibus` when some score a multi-game collection page.
  - Exception: `## Editions (ISBN)` may use `### Edition <label>` for
    content-differentiated editions.

## What goes in a file

- Only what this doc calls out.
- Languages/tags/release dates need sourcing only if the source is worth
  recording (e.g. a since-stale wiki).

### Editions (ISBN) — books/comics with many printings

- One label per **book**: `ISBN <isbn>`, else `ASIN <asin>`.
  - Plus identifying detail: language, publisher, date, pages, format.
  - Sub-bullets = that book's sources across sites.
- Content-differentiated editions (different bonus/story, not just
  translation/reprint) → `### Edition <label>` subheadings.
  - Match `site/data/` edition split verbatim (e.g. `subtitleDate`).
- **Goal: language discovery**, not full print catalog. Feeds `languages[]`.
  - Stop once a language is covered for an edition.
  - Don't re-sweep volumes of a multi-volume edition.
  - Don't chase 3rd/4th printings of a confirmed language.
  - Record anything stumbled into anyway.
- Prefer collection/omnibus edition's page over a single volume for the
  `languages[]`/rating link.
- **Every ISBN'd book gets 4 lookup links** (ASIN-only skip):
  - `wikipedia: https://wikipedia.org/wiki/Special:BookSources?isbn=<isbn>` — permanent.
  - `goodreads: https://www.goodreads.com/search?q=<isbn>` — placeholder.
  - `google books: https://www.google.com/search?tbm=bks&q=isbn:<isbn>` — placeholder.
  - `open library: https://openlibrary.org/search?isbn=<isbn>` — placeholder.
  - Placeholder checked:
    - Hit → replace with edition page + `accessed <date>`.
    - Miss → keep line, append `-- no results as of <date>`.
    - Bare search URL never lingers once acted on.
- **Coverage, not triple-confirmation.** Priority: `goodreads > google
  books > open library`.
  - One hit per ISBN is enough.
  - Goodreads covers the languages → leave other two unresolved
    (deprioritized todo).
- Same order for the `languages[]` link in `site/data/`.
  - Goodreads exists for language → google books/open library link is a
    bug, swap it.
  - Google books/open library correct only when no goodreads page found.

### Sources — one flat, deduped list

- Group by **site** (plain-text label), not entry field.
  - URL is stable; fields move.
  - Field grouping = second drifting copy of the schema.
  - Field info = per-URL tag instead.
- One line per **use**, not per URL string.
  - Bare + anchored URL = same line unless they fed different facts.
- `[Title]` only when URL is opaque (numeric app-store ID).
  - Anchor might drift → also name the section in words.
- Same page, multiple anchors: one bare-URL line, each anchor an
  indented sub-bullet with full `<url>#anchor`.
- **`*` on a tag** = fact is reflected in the entry now.
  - Unstarred = page covers it too, no claim of origin.
  - Coarse, no per-sentence tracing.
  - Not "linked from `site/data/`". Star because the fact is real.
- Line shape:
  `<url> — <field(s) fed> — accessed YYYY-MM-DD — archived: <url>`
  - Drop `archived:` only if unarchivable (paywalled app-store links).
  - `archived: TODO` fine; batch-fill later.
  - Archive via [web.archive.org/save](https://web.archive.org/save),
    fallback [archive.today](https://archive.ph/).
  - Skimmed only → append `— shallow: <what wasn't checked>`.
- Site's own outbound platform-store/rating links still get a line
  (likeliest to be taken down).
- Mirror site (breezewiki for Fandom): own line in `## Surveyed`, tagged
  `dup`, nested under the canonical page. Don't add to canonical line.
- Strip locale when recording URLs:
  - `en.wikipedia.org` → `wikipedia.org`
  - Google Books country TLD → `.com`
  - Drop `?hl=<lang>`

### Which source wins for a given fact

Default pecking order. Override only with a `## Decisions` line (see
Decisions rules).

- **dates** — Wikipedia ≈ specialized/fan wiki > others (goodreads,
  amazon, google books, storefronts)
  - Retailer drift of a few days = noise, not a competing fact.
- **story** — publisher/dev site > platform store > fan wiki > Wikipedia
- **platforms** — fan wiki ≈ Wikipedia
  - Store page proves only its own platform.
- **versions** — fan wiki > Wikipedia > platform store > publisher/dev site
- **game ratings** — Metacritic (critic, then user)
- **video/film ratings** — IMDB > Metacritic > TMDB
- **book ratings** — Goodreads
- **game age rating** — any page showing an actual ESRB rating
  - Disagreement → lowest.
- **languages** — platform store > fan wiki
- **game length** — HowLongToBeat always
  - Multiple HLTB entries → longest.

### Typical tags by site (reference, not taxonomy)

- Free text. Memory aid for what a site offers and which tag defaults
  to `*`.
- Default star only where a site is *unconditionally* top.
- Context-dependent picks (story, versions, ratings site): decide per entry.

Sites:

- **Wikipedia** — dates\*, story, platforms, tags, versions
- **Fandom wikis (+ mirrors)** — dates\*, platforms\*, tags, versions\*, age
- **MobyGames** — credits, platforms, regional release info
- **Metacritic** — ratings\*, story, platforms, age
- **Digital storefronts** (Steam, Xbox, PlayStation, Nintendo, Google
  Play, Apple App Store, Apple Arcade, Amazon) — age\*, dates, platforms,
  story, ratings, tags, versions
  - `age*`: direct source of its own ESRB rating.
  - `platforms` unstarred: proves own platform only. Note as plain text
    ("proves existence of platform").
  - Visiting = routine existence check. Marketing copy/story/versions
    unstarred, unused unless entry looks off.
  - `languages*` reliable on: Steam, Xbox, Apple App Store, Apple
    Arcade, Nintendo, Amazon.
    - Exceptions: PlayStation generally lacks it, Google Play unreliable.
    - Missing on the other six → second look.
  - Only PlayStation and Xbox give per-platform variant detail
    ("Xbox Series X|S Optimized", "PS4 Pro Enhanced").
- **Publisher site (store/marketing)** — story\*, platforms, versions,
  dates, languages
- **Publisher press kit / blog** — story, platforms, versions, dates
  - Promotional; rarely starred.
- **HowLongToBeat** — length\*, dates, platforms
  - Games only; unconditional length source.
  - Platforms may reflect emulation; dates often unverified. Informational.
  - Books use Goodreads, film IMDB, for length.
- **IMDB** — ratings\*, story, dates, credits
  - Film/TV `mediaType` only.
- **Goodreads** — ratings\*, length (pages), dates, story
  - Only book-ratings source.
- **TMDB** — ratings\*
  - Starred only when IMDB and Metacritic both lack an entry.

Add a site when a pattern shows up. Don't pre-populate.

**Old titles:**

- Pre-2010 publisher/platform pages mostly gone; pre-2000 rarely existed.
- Missing storefront/publisher rows on old entries = expected, not a gap.
- Wayback is lookup-by-URL, not search. No recorded URL, nothing to look up.

### Plot intro sourcing

- Synthesized. Don't quote; map each claim to origin: label + bullets.

```md
Final Fantasy (1987) — plot intro
> Four Warriors of Light depart on a quest to restore light to the crystals, defeat Chaos, and save their world.
- premise / Warriors of Light / crystals: [Wikipedia](https://wikipedia.org/wiki/Final_Fantasy_(video_game)) — intro para — accessed 2026-09-18
- "Chaos" as antagonist: [Final Fantasy Wiki](https://finalfantasy.fandom.com/wiki/Chaos) — accessed 2026-09-18
```

- Unsourced claim = something invented. Fix it or find the source. Don't
  backfill a citation to match.

### Decisions

- Rare. Only for what the sources can't carry on their own:
  - Serious, large conflicts between sources.
  - Disambiguations.
  - Calls not backed by the information itself.
  - Opinion, especially human.
- NOT for: ordinary edits, credits, links, ISBNs, dates, descriptions,
  anything already in the pecking order, anything communicated elsewhere
  (commits, chat, entry data, other sections).
- One line each: standing choice + why.
- **Assistant never adds a line on its own prompting.** Not "proposed
  and left in".
  - Add only when the user clearly says to, in so many words.
  - Absent that, `## Decisions` stays untouched.
- **Assistant should suggest** when it hits any of:
  - Very large decision.
  - Large conflict resolution.
  - Opinion (esp. human) shaping the entry.
  - Suggest = ask in chat: "Add to Decisions?" + the proposed line.
  - Then wait. No answer, or no clear yes = not added.
  - Don't suggest for minor choices. Don't nag.
- **Not an editing-history log.** Line states the standing choice, never
  the edit ("switched from X to Y", "old link had a bug").
  - Choice changes → overwrite in place. Don't stack.
  - Whole file: no session-by-session narration.

```md
## Decisions

- Rating: Metacritic critic (80) over Metacritic user (7.0) and Steam (no numeric score) — critic score is the headline number per site convention.
- Villain name: "Garland" (Wikipedia, Final Fantasy Wiki) over "Garuda" (early fan-translation spelling on one stale mirror).
```

### Surveyed — the research catalog, rough

- `## Sources` = cited only. `## Surveyed` = everything else researched:
  mirrors, empty marketing copy, true-but-unused facts.
- Lower bar. Flat list, **no headers ever**.
  - A header invites pasting an article.

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

- Line shape: `- [Title](url) — what's uniquely here — verdict[, verdict…]`
- Tags non-exclusive (`used, shallow` normal):
  - `used` — reflected in `## Sources`; fuller note there
  - `dup` — same content as another entry; nest under it
  - `mine` — has something not yet in the entry; the todo marker
  - `empty` — checked, nothing usable
  - `shallow` — skimmed; combine with `used`/`mine`. Records "deserves
    deeper pass". `## Not yet surveyed` = never opened.
- Never paste article text. One line while reading, move on.
- Out of time → list the rest under `## Not yet surveyed`. Honest partial
  beats implied complete.
- Two agreeing sources = enough. Obvious repeat/dead-end → `dup`, move on.

### Quotes

- Sparingly: contested/load-bearing fact where exact wording matters.
- Short (well under a paragraph), plainest sentence, license tagged.

```md
> "The game was originally planned to be Square's swan song before an unexpected commercial success."
— [Wikipedia: Final Fantasy (video game)](https://wikipedia.org/wiki/Final_Fantasy_(video_game)), CC BY-SA 4.0, accessed 2026-09-18
```

- Quote keeps the *source's* license, not this repo's ([LICENSE](../LICENSE)).
- Paraphrase + license tag = wrong. Paraphrase is an adaptation, inherits
  source terms.

## What this doc is not

- Not a footnote system for the live site. Page stays clean; `sources/`
  holds receipts.
- Not a justification for every word choice. Only sourced facts and
  cross-source conflicts.
- Not retroactive. New/edited entries only.
- Not an editing-history/changelog. Current facts and standing decisions
  only. History belongs in commit messages.
