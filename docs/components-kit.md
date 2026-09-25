<!-- docs/components-kit.md (markdown) -->

# `site/*.dc.html` components

What each vendored component renders and how they compose — for exact
props see the component's own `data-props` (the `<script type="text/x-dc"
data-dc-script data-props="...">` tag near the top of every `*.dc.html`
file; it's also what drives each component's standalone `$preview` in
Claude Design). Don't duplicate prop-level detail here; if this doc and a
component's `data-props` ever disagree, the component wins — fix this doc,
not the other way round. For the JS shapes these props expect
(`SeriesEntry`, `rating`, language objects, …), see [data.md](data.md) and
`schemas/*.schema.json`.

All of these are **vendored** (see [AGENTS.md](../AGENTS.md) → "Cross-repo
sync") — never hand-edit a list repo's copy. The one exception is
`Intro.dc.html`, which a list repo owns outright from the moment it's
created (see [init-list.md](init-list.md)) and is not covered here.

## Two layers

`page.dc.html` only `<dc-import>`s eight of these directly; everything else
is a leaf or mid-level component pulled in *by* one of those eight (or by
each other), not something a list repo composes on its own.

```
page.dc.html
├── Metadata            <head> title/description, from SITE_CONFIG
├── BackToTop            floating scroll-to-top control
├── Intro                 "Where to start?" — not vendored, see above
├── InPageControls        order/jump/display/language menus + backup-restore
│   └── FloatingNav        (mirrors InPageControls once the page scrolls past it)
│       └── ThemeToggle    (also reachable via FloatingCorner, mobile/narrow layouts)
├── SeriesSection × N      one per series in SERIES_ORDER
│   ├── MediaEntry × N      one per game/book/video entry (and per extra/alt)
│   │   ├── EntryTitleLinks   title + external links + pilcrow anchor
│   │   ├── EntryByline       byline text + pilcrow anchor (alt shape)
│   │   ├── RatingDisplay     score badges / text-only rating
│   │   ├── LengthDisplay     playtime/runtime string
│   │   ├── PlatformIcon × N   one per platform in a platformGroup
│   │   ├── LanguageTag × N    one per supported language
│   │   ├── ExtrasToggle       chevron control that reveals extras[]
│   │   └── TextSpan × N        any styled/tooltip/abbr text run in the row
│   └── TextSpan             series-level blurb, same component as above
├── FAQ                   accordion over FAQ_ITEMS (+ FAQ_ITEMS_COMMON)
├── HelpWanted             renders HELP_WANTED_ITEMS
└── Footer                 credits/license/disclosures
```

`FloatingCorner.dc.html` isn't in this tree at all in the desktop layout —
it's `ThemeToggle`'s standalone mobile/narrow-viewport mount point, wired
by `page.dc.html`'s own responsive logic rather than nested under
`InPageControls`. See [responsive-design.md](responsive-design.md).

## Orchestration vs. leaf components

`InPageControls` and `FloatingNav` take a long prop list (`onOrderChange`,
`toggleLangMenu`, `jumpRef`, `restoreProgress`, …) that's really
`page.dc.html`'s own state and handlers, threaded through as props so the
markup can live in a separate file. They're not meant to be reused or
previewed meaningfully standalone — their `$preview` fixture exists so
Claude Design doesn't error, not because the isolated component is useful
on its own. If a list needs different in-page-controls behavior, that's a
`page.dc.html`-level change, not a props change from the outside.

Everything under `MediaEntry` (`EntryTitleLinks`, `EntryByline`,
`RatingDisplay`, `LengthDisplay`, `LanguageTag`, `TextSpan`, `ExtrasToggle`,
`PlatformIcon`) is a true leaf: props are plain data (strings, the row's
own `rating`/`length`/`platformGroups` shape), no callbacks back into page
state beyond `onToggle`/`onPilcrowClick`-style local UI. These are the ones
worth opening standalone in Claude Design to see a prop's effect in
isolation.

## The `show*` toggle convention

`SeriesSection` and `MediaEntry` both take `showRating` / `showLength` /
`showPlatforms` / `showLanguages` / `showCol2` / `showStackedRl` — one
component threads the same six booleans straight into the other, one row
per entry. These come from `InPageControls`' display-toggle menu
(`displayToggles`), not from `site/data/`; a list repo doesn't set them per
entry. `sideBySide` / `stacked` (`SeriesSection` only) are the two-column
vs. stacked layout modes; `showStackedRl` additionally governs whether the
stacked layout repeats the release/language row per platform group.

## Text-run components

`TextSpan` is the one component every styled inline text run ultimately
renders through — series blurbs, entry descriptions, FAQ answers, credits,
tooltips. Its own props (`tip`, `abbrTerm`/`abbrDef`, `emLinkText`/
`emLinkUrl`, `jpTag`, …) are the render targets for whichever of the three
"styled text run" JS shapes fed it — see [data.md](data.md) → "three
different 'styled text run' shapes" for which JS field maps to which of
these. `LanguageTag` is a narrower, single-purpose sibling: one language
badge (`value`/`tip`/`url`/`active`/`muted`), not a general text run.

## Standalone preview

Every component's `data-props` includes a `$preview` (fixture width/height)
so opening any single `*.dc.html` in Claude Design — off the live
`site/*.dc.html`, not through `page.dc.html` — renders it immediately with
its declared `default`s, no wiring required. That's the fastest way to
check a prop's visual effect before threading it through `page.dc.html` or
`site/data/*.js`. Useful mainly for the leaf components above; an
orchestration component's standalone preview shows its fixture defaults,
not real page state.
