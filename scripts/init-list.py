#!/usr/bin/env python3
"""One-shot bootstrap for a new Vertex Order list repo created by using
vertex-order/kit as a GitHub template.

kit's own sync.toml is shaped for kit itself ([publish] +
[subscribe.platforms]) — wrong for a list repo, which needs a plain
[subscribe.kit] manifest instead. sync.list.toml, checked in next to this
script, already has that shape (same as vertex-order/final-fantasy's real
sync.toml). This script promotes it:

  1. Deletes sync.toml (kit's own — no longer applicable here).
  2. Renames sync.list.toml to sync.toml.

That's all it does. Everything else a new list repo needs to change by hand
is in docs/init-list.md — read that next.

Deliberately not in kit's sync.toml [publish] list, same as sync.list.toml:
neither has any reason to reach an already-existing repo via `just
sync-update kit` — they exist only for the moment right after templating.
Safe to delete this script once it's run; `just sync` never looks for it.

Usage:
  python3 scripts/init-list.py
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LIST_TOML = ROOT / "sync.list.toml"
TOML = ROOT / "sync.toml"


def main():
    if not LIST_TOML.exists():
        print(f"{LIST_TOML.name} not found — already promoted, or this isn't "
              "a fresh kit template. Nothing to do.")
        return 0
    TOML.unlink(missing_ok=True)
    LIST_TOML.rename(TOML)
    print(f"{TOML.name} now holds the list-shaped [subscribe.kit] manifest.")
    print("Next: read docs/init-list.md for everything else this repo needs.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
