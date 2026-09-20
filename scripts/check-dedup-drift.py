#!/usr/bin/env python3
# Owned by vertex-order/kit — edit here. Vendored elsewhere via sync.toml;
# don't edit the copy there.
"""Flag drift between duplicate/cross-listed game entries in site/data/, and
duplicate stable entry/pilcrow keys.

## Dedup drift

A game can be legitimately hand-cross-listed in two series (e.g. a Picture
Book tie-in also listed under its parent game's series). site/page.dc.html
dedupes these at render time (`dupGroups`, ~line 772) so checking one
checkbox checks both. That relies on the two hand-typed copies staying in
sync -- nothing enforces it. This script finds every group of entries
sharing page.dc.html's dedupe key (title|subtitleKey|title_date) and
fails if their description/tags/rating/length/platforms/languages
disagree. It intentionally does not look inside extras/alt/alts
(other-version sub-entries) -- only the entry itself.

## Entry-key collisions

site/page.dc.html derives a stable pilcrow/checked-state key per entry
(`entrySlug`/`subSlug`/`withDedupeSuffix`, ~line 282) from `title` +
title_date's year (or an explicit `id:`), and for an extras/alt.extras
sub-entry from its own `subtitle`/`title` + year, or (for a bare
inheriting sub-entry with neither) the *parent* entry's `title` + year.
That derivation has its own last-resort dedupe suffix (`-2`, `-3`...) so
a collision never breaks rendering outright, but a suffixed key is a
code smell -- it means two different things now render under
near-identical anchors, e.g. `#entry-VII-remaster-2012` and
`...-2012-2`, and links to the second are one accidental data reorder
away from drifting back to the first. This script mirrors that same
derivation in Python and fails on any collision (entry-level or within
one entry's extras/alt.extras), and on any sub-entry with no derivable
label at all -- authors should either fix the underlying `subtitle`/
`title` or add an explicit `id:` rather than ship the review depending
on the fallback.

## Title/year redundancy

The year shown next to `title` at render time is composed separately by
`composeDateLabel()` from `title_date`, never baked into `title` itself
(see the list repos' docs/sources.md for the fuller writeup of why). If
someone also types the year into `title` (redundant with what
`title_date` already carries), the displayed title ends up with a
doubled or confusingly adjacent year, e.g. `Final Fantasy I (1987)
(1987)`. This check flags any entry whose `title` contains `(<same year
as title_date>)` anywhere in the string (not just trailing) -- fix by
removing that redundant year from `title`, not from `title_date`.

site/data/index.js and series-*.js are plain JS object literals (unquoted
keys, single-quoted strings, trailing commas) -- not valid JSON -- so this
includes a small hand-rolled parser for the subset actually in use (no
template literals, no spread/computed keys).

Runs unchanged in kit (checks its own fixture data) and every list repo.

No external deps. Run: python3 scripts/check-dedup-drift.py
"""
import re
import sys
import unicodedata
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent / "site"
DATA = SITE / "data"


class ParseError(Exception):
    pass


# ---------------------------------------------------------------------------
# Minimal JS-object-literal parser: {}/[], bare or quoted keys, single- or
# double-quoted strings (\\ \" \' \n \t \r \uXXXX escapes; raw unicode passes
# through untouched), int/float numbers, true/false/null, trailing commas,
# and // line comments between tokens.
# ---------------------------------------------------------------------------

_WS_RE = re.compile(r"\s+")
_LINE_COMMENT_RE = re.compile(r"//[^\n]*")
_IDENT_RE = re.compile(r"[A-Za-z_$][A-Za-z0-9_$]*")
_NUMBER_RE = re.compile(r"-?\d+(\.\d+)?([eE][+-]?\d+)?")
_ESCAPES = {'"': '"', "'": "'", "\\": "\\", "n": "\n", "t": "\t", "r": "\r", "b": "\b", "f": "\f"}


def _skip_trivia(s, i):
    n = len(s)
    while i < n:
        m = _WS_RE.match(s, i)
        if m:
            i = m.end()
            continue
        m = _LINE_COMMENT_RE.match(s, i)
        if m:
            i = m.end()
            continue
        break
    return i


def _parse_string(s, i):
    quote = s[i]
    i += 1
    out = []
    n = len(s)
    while True:
        if i >= n:
            raise ParseError("unterminated string")
        c = s[i]
        if c == quote:
            return "".join(out), i + 1
        if c == "\\":
            i += 1
            if i >= n:
                raise ParseError("unterminated escape")
            e = s[i]
            if e == "u":
                out.append(chr(int(s[i + 1:i + 5], 16)))
                i += 5
                continue
            out.append(_ESCAPES.get(e, e))
            i += 1
            continue
        out.append(c)
        i += 1


def _parse_object(s, i):
    i = _skip_trivia(s, i + 1)
    obj = {}
    if s[i] == "}":
        return obj, i + 1
    while True:
        i = _skip_trivia(s, i)
        if s[i] in ("\"", "'"):
            key, i = _parse_string(s, i)
        else:
            m = _IDENT_RE.match(s, i)
            if not m:
                raise ParseError(f"expected object key at offset {i}: {s[i:i + 40]!r}")
            key, i = m.group(0), m.end()
        i = _skip_trivia(s, i)
        if s[i] != ":":
            raise ParseError(f"expected ':' at offset {i}: {s[i:i + 40]!r}")
        i = _skip_trivia(s, i + 1)
        obj[key], i = _parse_value(s, i)
        i = _skip_trivia(s, i)
        if s[i] == ",":
            i = _skip_trivia(s, i + 1)
            if s[i] == "}":
                return obj, i + 1
            continue
        if s[i] == "}":
            return obj, i + 1
        raise ParseError(f"expected ',' or '}}' at offset {i}: {s[i:i + 40]!r}")


def _parse_array(s, i):
    i = _skip_trivia(s, i + 1)
    arr = []
    if s[i] == "]":
        return arr, i + 1
    while True:
        i = _skip_trivia(s, i)
        value, i = _parse_value(s, i)
        arr.append(value)
        i = _skip_trivia(s, i)
        if s[i] == ",":
            i = _skip_trivia(s, i + 1)
            if s[i] == "]":
                return arr, i + 1
            continue
        if s[i] == "]":
            return arr, i + 1
        raise ParseError(f"expected ',' or ']' at offset {i}: {s[i:i + 40]!r}")


def _parse_value(s, i):
    i = _skip_trivia(s, i)
    c = s[i]
    if c == "{":
        return _parse_object(s, i)
    if c == "[":
        return _parse_array(s, i)
    if c in ("\"", "'"):
        return _parse_string(s, i)
    if s.startswith("true", i):
        return True, i + 4
    if s.startswith("false", i):
        return False, i + 5
    if s.startswith("null", i):
        return None, i + 4
    m = _NUMBER_RE.match(s, i)
    if m:
        text = m.group(0)
        num = float(text) if ("." in text or "e" in text or "E" in text) else int(text)
        return num, m.end()
    raise ParseError(f"unexpected token at offset {i}: {s[i:i + 40]!r}")


def _parse_value_after(text, anchor_re):
    """Find anchor_re in text, then parse the JS literal starting right after it."""
    m = anchor_re.search(text)
    if not m:
        raise ParseError(f"pattern {anchor_re.pattern!r} not found")
    value, _ = _parse_value(text, m.end())
    return value


# ---------------------------------------------------------------------------
# Data loading. Deliberately doesn't depend on the `window.__xxSeriesReg`
# registry name -- that's franchise-specific and differs per list repo.
# ---------------------------------------------------------------------------

_SERIES_ORDER_RE = re.compile(r"\bSERIES_ORDER\s*=\s*")
_ASSIGN_VALUE_RE = re.compile(r"=\s*(?=[{\[])")


def load_series_order():
    text = (DATA / "index.js").read_text(encoding="utf-8")
    order = _parse_value_after(text, _SERIES_ORDER_RE)
    if not isinstance(order, list) or not all(isinstance(s, str) for s in order):
        raise ParseError("site/data/index.js: SERIES_ORDER is not a list of strings")
    return order


def load_series(slug):
    path = DATA / f"series-{slug}.js"
    if not path.exists():
        raise ParseError(f"{path.name}: listed in SERIES_ORDER but file is missing")
    return _parse_value_after(path.read_text(encoding="utf-8"), _ASSIGN_VALUE_RE)


# ---------------------------------------------------------------------------
# Dedupe key -- mirrors site/page.dc.html's raw/pre-transform dupGroups
# construction (~line 772-773) exactly, including its truthiness asymmetry:
# `g.bylineParts ? ... : ...` is a bare-truthy check in JS, so an empty
# bylineParts array still takes that branch; `g.tags && g.tags.length` needs
# a non-empty array, so an empty tags array falls through to ''.
# ---------------------------------------------------------------------------

def title_date_key(d):
    """Mirrors titleDateKey(): full-precision string for a title_date
    value -- itself if already a string, the year as a string for a plain
    year number, or a {start,end} range's start year."""
    if d is None:
        return ""
    if isinstance(d, dict):
        return str(d["start"])
    return str(d)


def title_date_year(d):
    """Mirrors titleDateYear(): title_date_key() sliced to its year."""
    return title_date_key(d)[:4]


def dedupe_key(game):
    byline_parts = game.get("bylineParts")
    if byline_parts is not None:
        subtitle_key = "".join((p.get("text") or "") for p in byline_parts)
    else:
        tags = game.get("tags")
        subtitle_key = " · ".join(tags) if tags else ""
    return f'{game.get("title", "")}|{subtitle_key}|{title_date_key(game.get("title_date"))}'


# ---------------------------------------------------------------------------
# Comparison -- entry-level fields only, never extras/alt/alts. Some fields
# have two spellings depending on media type (page.dc.html:814-815, :976):
# game entries use lengthParts/platformGroups, book/video entries use the
# plain length/platforms strings.
# ---------------------------------------------------------------------------

COMPARED_FIELDS = {
    "description": ("description",),
    "tags": ("tags",),
    "rating": ("rating",),
    "length": ("lengthParts", "length"),
    "platforms": ("platformGroups", "platforms"),
    "languages": ("languages",),
}


def _run_text(part):
    if isinstance(part, dict):
        return part.get("text") or part.get("emText") or ""
    return part if isinstance(part, str) else ""


def normalize_description(desc):
    """A cross-listed entry's description legitimately differs from its
    sibling in exactly one place: the sentence naming which *other* series
    it's also found in ("Entry also found in our X series."). Rather than
    trying to recognize that cross-reference by matching series slugs/titles
    (fragile -- titles and slugs are both used interchangeably, and neither
    is available to a plain per-field comparison), drop any top-level
    paragraph/string mentioning "series" outright before comparing -- it's
    expected to differ by construction, so it's never real drift."""
    if not isinstance(desc, list):
        return desc
    out = []
    for item in desc:
        if isinstance(item, list):
            text = "".join(_run_text(p) for p in item)
            if "series" in text.lower():
                continue
            out.append(item)
        elif isinstance(item, str):
            if "series" in item.lower():
                continue
            out.append(item)
        else:
            out.append(item)
    return out


def field_snapshot(game, raw_keys, label):
    if label == "description":
        return tuple(normalize_description(game.get(k)) for k in raw_keys)
    return tuple(game.get(k) for k in raw_keys)


def slugify_title(s):
    """Mirrors site/page.dc.html's slugifyTitle() exactly."""
    s = unicodedata.normalize("NFKD", s or "")
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.replace("'", "").replace("’", "")
    s = re.sub(r"[^A-Za-z0-9]+", "-", s)
    s = s.strip("-")
    return s.lower()


def entry_slug(game):
    """Mirrors entrySlug(): explicit id: wins, else title + release year
    (from title_date)."""
    if game.get("id"):
        return game["id"]
    year = title_date_year(game.get("title_date"))
    base = slugify_title(game.get("title") or "")
    return base + ("-" + year if year else "")


def sub_slug(node, parent):
    """Mirrors subSlug(): own subtitle + year if it has one, else own title
    + year if it has one (a cross-reference to a different entry), else the
    *parent* games[] entry's title + year (a bare inheriting sub-entry with
    no edition tag), else the legacy bare `label` field."""
    if node.get("id"):
        return node["id"]
    if node.get("subtitle"):
        yr = title_date_year(node.get("subtitle_date"))
        return slugify_title(node["subtitle"]) + (f"-{yr}" if yr else "")
    has_own = node.get("title") is not None
    title = node.get("title") if has_own else (parent.get("title") if parent else None)
    title_date = node.get("title_date") if has_own else (parent.get("title_date") if parent else None)
    if title:
        yr = title_date_year(title_date)
        return slugify_title(title) + (f"-{yr}" if yr else "")
    return slugify_title(node.get("label") or "")


def with_dedupe_suffix(base_keys):
    """Mirrors withDedupeSuffix(): -2, -3... on repeats, in order."""
    seen = {}
    out = []
    for k in base_keys:
        n = seen.get(k, 0) + 1
        seen[k] = n
        out.append(k if n == 1 else f"{k}-{n}")
    return out


def check_entry_keys(order):
    """Fail on any derived pilcrow/status key collision (entry-level, or
    within one entry's extras/alt.extras), and on any sub-entry with no
    derivable label at all (a bare `alt: { extras: [...] }` with no parts[]
    of its own is fine -- it always uses the fixed `-alt` suffix, never a
    derived one)."""
    findings = []
    for slug in order:
        series = load_series(slug)
        games = series.get("games", [])
        entry_keys = with_dedupe_suffix([entry_slug(g) for g in games])
        seen_entries = {}
        for i, key in enumerate(entry_keys):
            seen_entries.setdefault(key, []).append(i)
        for key, idxs in seen_entries.items():
            if len(idxs) > 1:
                findings.append(
                    f"series-{slug}.js: duplicate entry key '{slug}-{key}' at games{idxs} "
                    "-- add an explicit id: to one of them"
                )

        for i, game in enumerate(games):
            sub_groups = []
            if game.get("extras"):
                sub_groups.append(("x", game["extras"]))
            alt = game.get("alt")
            if alt and alt.get("extras"):
                sub_groups.append(("alt-x", alt["extras"]))
            for tag, nodes in sub_groups:
                base = [sub_slug(n, game) for n in nodes]
                sub_keys = with_dedupe_suffix(base)
                seen_sub = {}
                for j, key in enumerate(sub_keys):
                    if not base[j]:
                        findings.append(
                            f"series-{slug}.js games[{i}].{'extras' if tag == 'x' else 'alt.extras'}[{j}]: "
                            "no derivable label for its pilcrow key -- add a subtitle/title (or a parent "
                            "title to inherit) or an explicit id:"
                        )
                    seen_sub.setdefault(key, []).append(j)
                for key, idxs in seen_sub.items():
                    if len(idxs) > 1:
                        findings.append(
                            f"series-{slug}.js games[{i}].{'extras' if tag == 'x' else 'alt.extras'}: "
                            f"duplicate derived key '{key}' at indices {idxs} -- add an explicit id: to one of them"
                        )
    return findings


def check_title_year_redundancy(entries):
    """Flag any entry whose title contains "(<year>)" matching its own
    title_date year -- see the module docstring's "Title/year redundancy"
    section. Checks for the year anywhere in title, not just trailing,
    since a legitimate edition suffix (e.g. "Remake (2018)") can sit after
    a redundant leading "(<title_date year>)"."""
    findings = []
    for slug, idx, game in entries:
        title = game.get("title")
        year = title_date_year(game.get("title_date"))
        if title and year and f"({year})" in title:
            findings.append(
                f"series-{slug}.js games[{idx}]: title {title!r} redundantly "
                f"repeats its own title_date year ({year}) -- remove it from "
                "title, composeDateLabel() already composes it for display"
            )
    return findings


def main():
    try:
        order = load_series_order()
    except FileNotFoundError:
        print("check-dedup-drift: no site/data/index.js, nothing to check")
        return 0
    except (ParseError, IndexError, ValueError) as e:
        print(f"check-dedup-drift: failed to parse site/data/index.js: {e}", file=sys.stderr)
        return 1

    entries = []  # (slug, index, game)
    try:
        for slug in order:
            series = load_series(slug)
            for idx, game in enumerate(series.get("games", [])):
                entries.append((slug, idx, game))
    except (ParseError, IndexError, ValueError) as e:
        print(f"check-dedup-drift: {e}", file=sys.stderr)
        return 1

    groups = {}
    for slug, idx, game in entries:
        groups.setdefault(dedupe_key(game), []).append((slug, idx, game))
    dup_groups = {k: v for k, v in groups.items() if len(v) > 1}

    findings = []
    for members in dup_groups.values():
        for label, raw_keys in COMPARED_FIELDS.items():
            snapshots = [field_snapshot(g, raw_keys, label) for _, _, g in members]
            if any(snap != snapshots[0] for snap in snapshots[1:]):
                where = ", ".join(f"series-{slug}.js games[{idx}]" for slug, idx, _ in members)
                entry_title = members[0][2].get("title", "?")
                findings.append(f"  {entry_title!r} ({where}): {label} differs")

    try:
        key_findings = check_entry_keys(order)
    except (ParseError, IndexError, ValueError) as e:
        print(f"check-dedup-drift: {e}", file=sys.stderr)
        return 1

    year_findings = check_title_year_redundancy(entries)

    if findings or key_findings or year_findings:
        if findings:
            print(f"check-dedup-drift: {len(findings)} drift finding(s) across {len(dup_groups)} duplicate group(s):")
            for finding in findings:
                print(finding)
            print("Fix: reconcile the duplicate entries so description/tags/rating/length/platforms/languages match.")
        if key_findings:
            print(f"check-dedup-drift: {len(key_findings)} entry-key finding(s):")
            for finding in key_findings:
                print(f"  {finding}")
        if year_findings:
            print(f"check-dedup-drift: {len(year_findings)} title/year redundancy finding(s):")
            for finding in year_findings:
                print(f"  {finding}")
        return 1

    print(f"check-dedup-drift: checked {len(dup_groups)} duplicate group(s) across {len(entries)} entries, "
          f"{len(order)} series' entry keys, and title/year redundancy, no drift")
    return 0


if __name__ == "__main__":
    sys.exit(main())
