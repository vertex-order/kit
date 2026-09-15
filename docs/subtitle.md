<!-- docs/subtitle.md (markdown) -->

# Subtitle guidelines

A **subtitle** is the small label on an entry's byline — `Remake (2018)`,
`Remaster (2016)`, `Director's Cut`. At-a-glance only; summary detail goes in
the description/tags.

## Games

**General rule:** label by what the *player* feels, not how the dev built
it. Wikipedia/MobyGames use a production axis (same platform = remaster,
new platform = remake) regardless of whether anything changed for the
player — wrong axis for a reader picking a version. A zero-change platform
port is a `Remake` by dev history but reads as "nothing new" to a player;
we go with the player's read.

### The scale

Least to most changed, from the player's seat:

| Subtitle | Meaning |
|---|---|
| **Edit** | Small gameplay/content tweak, no fidelity change. See [Edit](#edit) below. |
| **Remaster** | Graphics/audio fidelity bump. Content stays faithful. |
| **Remake** | Significant gameplay/story changes — a different experience, not just prettier. (Often bundles a fidelity bump too, but that's not what earns it.) |

- Same-platform patch that changes gameplay (usually difficulty) → **Edit**.

### Port

- Almost never its own entry. A straight platform move with no fidelity
  bump and no content change is just another line in the *original*
  entry's platform list — dated to the original release year, not the
  port's.
- `Port` mainly defines the floor of the scale: the "nothing changed"
  case, so a from-scratch recode that plays and looks identical doesn't
  get mislabeled `Remake` just because the code was rewritten.
- Only give a port its own entry/subtitle if it's bundled with something
  that clears the [Edit](#edit) bar or higher — an unremarkable port on
  its own folds into the platform list, not a new entry.

### Edit

- Mostly historical: pre-patch consoles couldn't update in place, so
  publishers occasionally shipped a revised cartridge/disc instead.
- **Bar for its own entry:** would the general public (not a
  completionist) care which copy they got?
  - Minor translation reword → no. Fold into the original entry.
  - `International`/`Easy Type`-style changes (selectable difficulty,
    added voice acting, a language added for an underserved market) →
    yes, these were marketed and people cared. Give it its own entry.
- `Edit` never touches graphics/audio fidelity (that's `Remaster`) — small
  text/music changes are fine as long as gameplay/story don't shift.
- **Naming:** if the release has its own name (`International`,
  `Easy Type`, `Anniversary Edition`), use that name, not the word
  `Edit` — see [marketing override](#marketing-override).

### Marketing override

If the publisher's own marketing uses one of these words in the release's
actual name (*Pixel Remaster*, *HD Remaster*), keep their term even if the
pedantic definition disagrees. Readers know the product by that name.

### Mobile

Three cases — only two touch the byline:

1. **Plain smartphone port**, nothing mobile-specific about the design →
   no tag, no subtitle. Just another platform.
2. **Built around mobile tropes** (microtransactions, gacha/gambling
   pulls, energy-purchase systems, sessions redesigned much shorter) →
   `Mobile` **tag**, a genre marker like `Turn-based RPG`.
3. **Feature-phone (pre-smartphone) port**, content/gameplay/story cut to
   fit weak hardware → `Mobile` **subtitle**, same role as `Remake`:
   signals a genuinely different experience on this version.

## Movies

- Default: quote the release's actual marketed cut name as the subtitle
  (`Director's Cut`, `Theatrical Cut`, `Extended Cut`, `Snyder Cut`,
  `Ultimate Edition`) — same principle as [marketing override](#marketing-override),
  but the default here, not the exception. Don't genericize a name down to
  a bucket term (`Snyder Cut` → `Remake`, or a bare `Cut`) — that loses
  the one thing the name communicated.
- Fallback: `Remaster` from the [games scale](#the-scale), only for a
  re-release with no distinct cut branding — just a straight visual/audio
  upgrade (e.g. an unbranded 4K remaster).
- Skip `Port`/`Edit` — a disc-format change (DVD → Blu-ray) isn't a
  consumer decision the way a console generation is, and movies rarely
  ship small unbranded edits worth flagging.

## Books

Doesn't use the [games scale](#the-scale) — different axis entirely.

### New Editions

- Usually **not** a separate entry. New cover, new foreword, a bundled
  preview chapter, minor translation/copyedit fixes → none of it changes
  the reader's experience, so no entry, no subtitle, regardless of ISBN.
- Same [bar as `Edit`](#edit): would the general public care which copy
  they got? Books almost never clear it — that's why there's effectively
  no book equivalent of `Edit`.

### Multiple Novelizations

- Subtitle by **format/audience**, not degree of change: `Short Story`,
  `Novel`, `YA Novel`.

### Revised or Expanded Story

- Rare (digital-distribution-enabled): an author rewrites or adds
  chapters post-publication. No case exists on the list yet.
- If it happens: [marketing override](#marketing-override) first — use
  the publisher's own term if one exists. Otherwise default to `Revised`
  (rewrites) or `Extended` (added content), whichever fits.
