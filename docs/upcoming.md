<!-- docs/upcoming.md — owned by vertex-order/kit. Edit here.
     Vendored elsewhere via sync.toml; don't edit the copy there. -->

# Upcoming guidelines

## Guidance

- Don't set a manual `upcoming` flag on an entry — the `Upcoming` badge
  and both pseudo-series are derived automatically from `releaseDate` in
  kit's `site/page.dc.html`.
- Only give an entry a future `releaseDate` once the release is **firmly
  confirmed**, roughly **6-8 months out**. Not for speculative or
  far-off announcements.
- The `Recently Released` window is a fixed **12 months**
  (`RECENT_MONTHS` in `page.dc.html`) — not a curation call. Just give a
  released entry its real release date.
- Both pseudo-series render at the very top of the page, ahead of the
  numbered series list, in every sort mode.
- No per-row "Recent" badge exists or is planned — only `Upcoming` gets
  one.
- The `Upcoming` section carries a fixed note that some entries may
  already have a playable demo. No per-entry demo tracking — it's left
  to the reader to check, based on how close the release is and what
  platform it's on.
- This is guidance, not a hard rule — use judgment where a repo's own
  list shape or content makes a different call reasonable.

## Rationale

### Who this is for

Roughly: **return visitors** asking "what's changed since I last
checked?" — not first-time visitors, who don't need either section.

A new visitor is routed by the intro's own "where to start" jump link,
which points at a specific entry regardless of page layout. Someone
who's already been through the list once doesn't need that routing —
they need "what's new," which is exactly what these two pseudo-series
answer. The two audiences don't compete for the same real estate: the
intro handles one, the pseudo-series handle the other.

### Why the top, not the bottom

The alternative — parking `Upcoming` at the bottom, next to FAQ, on the
theory that unplayable/anticipation-only content shouldn't lead the page
— doesn't hold up once a list gets long. `final-fantasy` runs pages and
pages, with `Other` alone running past a full page at the very end.
"Bottom of the page" on a list that size doesn't mean "the end" to a
reader, it means "past every series *and* past a full page of `Other`" —
which nobody actually scrolls to. A visibility feature that dies past
the fold on the site's biggest list isn't doing its job. Top is the only
placement that survives list growth, and per [Who this is
for](#who-this-is-for) it doesn't cost anything either, since it's not
competing with the intro's job of orienting a new visitor.

### Why 6-8 months for Upcoming

Titles change shape constantly between announcement and release —
delayed, renamed, folded into something else, quietly cancelled. Listing
one too early just means taking it back down later, which is wasted
curation work for no benefit: nobody's decision about what to play *now*
changes because something 3 years out exists. A 6-8 month window also
keeps `Upcoming` close in kind to `Recently Released` — both read as
"happening around now," just on either side of release day — rather
than `Upcoming` becoming a dumping ground for distant hype, which
would've undercut the case for [putting it at the
top](#why-the-top-not-the-bottom).

The code enforces no upper bound on how far a future `releaseDate` can
be — that's intentional. The curator is the gate on what counts as
upcoming, not the code.

### Why 12 months for Recently Released

Sized for the return visitor from [Who this is for](#who-this-is-for):
someone assumed to check back every few months, not daily, so a
12-month rolling window comfortably covers "since I last looked" without
needing a curator decision per entry the way `Upcoming` does.

### Why no per-row Recent badge

`Upcoming` earns a badge because it's a warning wherever the entry shows
up — you can't get this yet. "Recently released" isn't blocking
anything, so the pseudo-section alone (a discovery convenience, not a
warning) is enough.
