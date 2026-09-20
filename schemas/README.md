<!-- schemas/README.md (markdown) -->

# `/data` JSON Schemas

Owned by `vertex-order/kit` -- edit here. Vendored into every list repo via
`sync.toml`; don't hand-edit the vendored copy.

Each schema documents the shape of the value one `site/data/*.js` file
assigns to its `window.*` global(s) -- not the `.js` file itself (a plain
`<script>`, not JSON). `scripts/validate-data.py` extracts that literal
(`scripts/js_literal.py` -- a real JSON parser can't read these files) and
checks it against whichever schema the data file itself declares.

## How a data file points at its schema

A data file declares its own schema with a comment anywhere before the
assignment it covers:

```js
// schema: series.schema.json
window.__ffSeriesReg['III'] = { ... };
```

`scripts/validate-data.py` scans every `site/data/*.js` for `// schema:
<ref>` comments and validates the next assignment after each one against
that ref -- no hardcoded file-to-schema table to keep in sync. A file with
several globals (kit's own `catalogs.js`) carries one directive per
assignment, `#/<json-pointer>`-qualified into a schema file that holds
several defs:

```js
// schema: catalogs.schema.json#/$defs/LanguageNames
window.LANGUAGE_NAMES = { ... };
```

A file with no directive at all is simply not checked. This is also how a
repo-local, non-vendored schema gets picked up automatically -- e.g. the
org landing page's `schemas/franchise-list.schema.json` (own to that repo,
not listed here) is declared from `site/data/games.js` the same way as any
schema in this directory.

| Schema | Typical data file(s) |
| --- | --- |
| `series.schema.json` | `site/data/series-<code>.js` |
| `index.schema.json` | `site/data/index.js` (`SERIES_ORDER`; the rest of the file is fixed loader boilerplate, no directive there) |
| `site-config.schema.json` | `site/data/site.js` |
| `credits.schema.json` | `site/data/credits.js` |
| `faq.schema.json` | `site/data/faq.js` and kit's `site/data/common-faq.js` (identical shape) |
| `help-wanted.schema.json` | `site/data/help-wanted.js` |
| `catalogs.schema.json` | kit's `site/data/catalogs.js` -- three defs, one directive each (see above) |
| `platform-icons.schema.json` | `vertex-order/platforms`' `site/data/platform-icons.js` |
| `common.schema.json` | -- no data file declares this one directly; shared `$defs` (`ConfigPart`, `Paragraph`) the schemas above `$ref` into |

`series.schema.json` is the one most worth reading end to end -- it holds
the `SeriesEntry` `$def`, which is recursive (`extras[]`, `alt`, `alts[]`
are all the same shape as a top-level `games[]` entry) and covers the
`rating`/`platformGroups`/`languages`/`description` sub-shapes as nested
`$defs` in the same file.

Checked against every real `site/data/*.js` file in `vertex-order/kit` and
`vertex-order/final-fantasy` at the time these were written (all pass); a
schema gap found against real data is a bug in the schema, not the data --
fix the schema, don't loosen a franchise repo's file to match.
