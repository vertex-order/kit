#!/usr/bin/env python3
# Owned by vertex-order/kit — edit here. Vendored elsewhere via sync.toml;
# don't edit the copy there.
"""Flag drift between duplicate/cross-listed game entries in site/data/.

A game can be legitimately hand-cross-listed in two series (e.g. a Picture
Book tie-in also listed under its parent game's series). site/page.dc.html
dedupes these at render time (`dupGroups`, ~line 772) so checking one
checkbox checks both. That relies on the two hand-typed copies staying in
sync -- nothing enforces it. This script finds every group of entries
sharing page.dc.html's dedupe key (title|subtitleKey|releaseDate) and fails
if their description/tags/rating/length/platforms/languages disagree. It
intentionally does not look inside extras/alt/alts (other-version
sub-entries) -- only the entry itself.

site/data/index.js and series-*.js are plain JS object literals (unquoted
keys, single-quoted strings, trailing commas) -- not valid JSON -- so this
includes a small hand-rolled parser for the subset actually in use (no
template literals, no spread/computed keys).

Runs unchanged in kit (checks its own fixture data) and every list repo.

No external deps. Run: python3 scripts/check-dedup-drift.py
"""
import re
import sys
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

def dedupe_key(game):
    byline_parts = game.get("bylineParts")
    if byline_parts is not None:
        subtitle_key = "".join((p.get("text") or "") for p in byline_parts)
    else:
        tags = game.get("tags")
        subtitle_key = " · ".join(tags) if tags else ""
    return f'{game.get("title", "")}|{subtitle_key}|{game.get("releaseDate") or ""}'


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
                title = members[0][2].get("title", "?")
                findings.append(f"  {title!r} ({where}): {label} differs")

    if findings:
        print(f"check-dedup-drift: {len(findings)} drift finding(s) across {len(dup_groups)} duplicate group(s):")
        for finding in findings:
            print(finding)
        print("Fix: reconcile the duplicate entries so description/tags/rating/length/platforms/languages match.")
        return 1

    print(f"check-dedup-drift: checked {len(dup_groups)} duplicate group(s) across {len(entries)} entries, no drift")
    return 0


if __name__ == "__main__":
    sys.exit(main())
