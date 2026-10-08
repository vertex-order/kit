#!/usr/bin/env python3
# Owned by vertex-order/kit — edit here. Vendored elsewhere via sync.toml;
# don't edit the copy there.
"""Fail if any `#entry-...` fragment link in site/data/*.js doesn't resolve
to an anchor site/page.dc.html will actually render.

Every in-page cross-reference (a `DescPart`'s `emLinkUrl`, or any other
string field that happens to hold a bare `#entry-...` fragment) is a hash
link into the *same* page, generated at render time -- nothing checks at
edit time that the target actually exists. A typo, a stale link left over
from a rename, or a wrong guess at how a sub-entry's anchor is built all
fail silently: the link just does nothing when clicked, with no console
error and no visual sign anything's wrong.

This mirrors site/page.dc.html's three distinct anchor shapes exactly, so a
false positive here means this script drifted from page.dc.html, not that
the link is actually broken:

- A media[] slot itself: `entry-<NUM>-<entrySlug(slot)>`.
- A `versions[]` item, on the slot's own `primary` *or on any `alts[]`
  item*: `<releaseAnchor>-x-<subSlug(item, titleSrc)>`, where `titleSrc` is
  the release's own resolved title source (resolveTitleSource) -- a release
  with no `title` override shares the slot's title/date, so its versions[]
  items inherit from the slot, not from the title-less release itself.
- An `alts[]` item itself: a fixed *positional* anchor, `<slotAnchor>-or`
  for the first alt, `-or-2`/`-or-3`/... after that -- never a derived
  slug, regardless of the alt's own title/subtitle. Easy to get backwards
  (it reads like it should mirror versions[]'s subSlug scheme; it doesn't).

site/data/index.js and group-*.js are plain JS object literals (unquoted
keys, single-quoted strings, trailing commas) -- not valid JSON -- so this
shares scripts/js_literal.py's hand-rolled parser for the subset actually in
use (no template literals, no spread/computed keys).

Runs unchanged in kit (checks its own fixture data) and every list repo.

No external deps. Run: python3 scripts/check-anchors.py
"""

import re
import sys
import unicodedata
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from js_literal import ParseError
from js_literal import parse_value_after as _parse_value_after

SITE = Path(__file__).resolve().parent.parent / "site"
DATA = SITE / "data"

_GROUP_ORDER_RE = re.compile(r"\bGROUP_ORDER\s*=\s*")
_ASSIGN_VALUE_RE = re.compile(r"=\s*(?=[{\[])")
_HREF_RE = re.compile(r"'(#entry-[A-Za-z0-9][^']*)'")


def load_group_order():
    text = (DATA / "index.js").read_text(encoding="utf-8")
    order = _parse_value_after(text, _GROUP_ORDER_RE)
    if not isinstance(order, list) or not all(isinstance(s, str) for s in order):
        raise ParseError("site/data/index.js: GROUP_ORDER is not a list of strings")
    return order


def load_group(slug):
    path = DATA / f"group-{slug}.js"
    if not path.exists():
        raise ParseError(f"{path.name}: listed in GROUP_ORDER but file is missing")
    return _parse_value_after(path.read_text(encoding="utf-8"), _ASSIGN_VALUE_RE)


# ---------------------------------------------------------------------------
# Slug derivation -- mirrors site/page.dc.html's entrySlug/subSlug/
# resolveTitleSource exactly (same trio check-dedup-drift.py's
# check_entry_keys() mirrors, for the same reason: there is no single
# source of truth to import from, since page.dc.html is JS and this is
# Python run against the same data).
# ---------------------------------------------------------------------------


def title_date_key(d):
    if d is None:
        return ""
    if isinstance(d, dict):
        return str(d["start"])
    return str(d)


def title_date_year(d):
    return title_date_key(d)[:4]


def resolve_title_source(node, fallback):
    return node if node.get("title") is not None else fallback


def slugify_title(s):
    s = unicodedata.normalize("NFKD", s or "")
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.replace("'", "").replace("’", "")
    s = re.sub(r"[^A-Za-z0-9]+", "-", s)
    s = s.strip("-")
    return s.lower()


def entry_slug(slot):
    if slot.get("id"):
        return slot["id"]
    year = title_date_year(slot.get("titleDate"))
    base = slugify_title(slot.get("title") or "")
    return base + ("-" + year if year else "")


def sub_slug(node, parent):
    if node.get("id"):
        return node["id"]
    if node.get("subtitle"):
        yr = title_date_year(node.get("subtitleDate"))
        return slugify_title(node["subtitle"]) + (f"-{yr}" if yr else "")
    has_own = node.get("title") is not None
    title = node.get("title") if has_own else (parent.get("title") if parent else None)
    title_date = (
        node.get("titleDate")
        if has_own
        else (parent.get("titleDate") if parent else None)
    )
    if title:
        yr = title_date_year(title_date)
        return slugify_title(title) + (f"-{yr}" if yr else "")
    return ""


# ---------------------------------------------------------------------------
# Build the full set of ids site/page.dc.html will actually render.
# ---------------------------------------------------------------------------


def _add_versions(ids, release, release_anchor, slot):
    title_src = resolve_title_source(release, slot)
    for ver in release.get("versions") or []:
        ids.add(f"{release_anchor}-x-{sub_slug(ver, title_src)}")


def collect_valid_ids(order):
    ids = set()
    for slug in order:
        group = load_group(slug)
        num = group.get("num", slug)
        for slot in group.get("media", []):
            anchor_id = f"entry-{num}-{entry_slug(slot)}"
            ids.add(anchor_id)
            _add_versions(ids, slot["primary"], anchor_id, slot)
            for idx, alt in enumerate(slot.get("alts") or []):
                alt_anchor = anchor_id + "-or" + (f"-{idx + 1}" if idx > 0 else "")
                ids.add(alt_anchor)
                _add_versions(ids, alt, alt_anchor, slot)
    return ids


# ---------------------------------------------------------------------------
# Scan every group-*.js file's raw text for '#entry-...' string literals,
# wherever they appear -- not just under emLinkUrl -- so a fragment href
# typed under a different key (or a future field this doesn't know about
# yet) still gets checked instead of silently skipped.
# ---------------------------------------------------------------------------


def find_hrefs(slug):
    path = DATA / f"group-{slug}.js"
    text = path.read_text(encoding="utf-8")
    out = []
    for m in _HREF_RE.finditer(text):
        line = text.count("\n", 0, m.start()) + 1
        out.append((m.group(1)[1:], line))  # strip leading '#'
    return out


def main():
    try:
        order = load_group_order()
    except FileNotFoundError:
        print("check-anchors: no site/data/index.js, nothing to check")
        return 0
    except (ParseError, IndexError, ValueError) as e:
        print(
            f"check-anchors: failed to parse site/data/index.js: {e}", file=sys.stderr
        )
        return 1

    try:
        valid_ids = collect_valid_ids(order)
    except (ParseError, IndexError, ValueError) as e:
        print(f"check-anchors: {e}", file=sys.stderr)
        return 1

    findings = []
    total_refs = 0
    for slug in order:
        for href, line in find_hrefs(slug):
            total_refs += 1
            if href not in valid_ids:
                findings.append(
                    f"group-{slug}.js:{line}: '#{href}' -- no entry renders this anchor"
                )

    if findings:
        print(f"check-anchors: {len(findings)} dangling anchor reference(s):")
        for finding in findings:
            print(f"  {finding}")
        print(
            "Fix: correct the href (check entrySlug/subSlug in site/page.dc.html -- "
            "note alts[] use a fixed '-or'/'-or-N' anchor, never a derived slug), "
            "or fix the title/subtitle/id the anchor is meant to derive from."
        )
        return 1

    print(
        f"check-anchors: checked {total_refs} anchor reference(s) across {len(order)} "
        f"group(s) against {len(valid_ids)} rendered anchor(s), no dangling links"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
