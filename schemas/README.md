<!-- schemas/README.md (markdown) -->

# `/data` JSON Schemas

Owned by `vertex-order/kit` -- edit here. Vendored into every list repo via
`sync.toml`; don't hand-edit the vendored copy.

Each schema documents the shape of the value one `site/data/*.js` file
assigns to its `window.*` global(s) -- not the `.js` file itself (a plain
`<script>`, not JSON). A validator needs to extract that literal first (e.g.
run the file in a sandboxed VM and read the resulting global back out); no
such extraction tooling is wired up yet, this directory is the schemas
themselves.

| Schema | Data file | Global(s) |
| --- | --- | --- |
| `series.schema.json` | `site/data/series-<code>.js` | `window.__<prefix>SeriesReg['<num>']` |
| `index.schema.json` | `site/data/index.js` | `SERIES_ORDER` (the rest of the file is fixed loader boilerplate) |
| `site-config.schema.json` | `site/data/site.js` | `window.SITE_CONFIG` |
| `credits.schema.json` | `site/data/credits.js` | `window.CREDITS` |
| `faq.schema.json` | `site/data/faq.js` and kit's `site/data/common-faq.js` | `window.FAQ_ITEMS` / `window.FAQ_ITEMS_COMMON` (identical shape) |
| `help-wanted.schema.json` | `site/data/help-wanted.js` | `window.HELP_WANTED_ITEMS` |
| `catalogs.schema.json` | kit's `site/data/catalogs.js` | `window.LANGUAGE_NAMES` / `window.RATING_KINDS` / `window.STEAM_REVIEW_LABELS` |
| `platform-icons.schema.json` | `vertex-order/platforms`' `site/data/platform-icons.js` | `window.PLATFORM_ICONS` |
| `common.schema.json` | -- | shared `$defs` (`ConfigPart`, `Paragraph`) referenced by the schemas above via `$ref` |

`series.schema.json` is the one most worth reading end to end -- it holds
the `SeriesEntry` `$def`, which is recursive (`extras[]`, `alt`, `alts[]`
are all the same shape as a top-level `games[]` entry) and covers the
`rating`/`platformGroups`/`languages`/`description` sub-shapes as nested
`$defs` in the same file.

Checked against every real `site/data/*.js` file in `vertex-order/kit` and
`vertex-order/final-fantasy` at the time these were written (all pass); a
schema gap found against real data is a bug in the schema, not the data --
fix the schema, don't loosen a franchise repo's file to match.
