<!-- README.md (markdown) -->

# kit

The shared build substrate for the [Vertex Order](https://vertex-order.github.io)
game-list sites: the Design Component runtime, the **Nocturne** design system
(tokens + component CSS), and the `*.dc.html` components every list renders
with. A component library, not a framework — it gives you pieces to compose,
it doesn't run your app.

## What's here

```
site/
├── support.js              Design Component runtime (vendored from Claude Design)
├── PlatformIcon.dc.html    one platform icon at listing-row size
├── BackToTop.dc.html       floating back-to-top control
├── HelpWanted.dc.html      renders a "Help Wanted" list
├── components.js           AUTO-GENERATED bundle of the *.dc.html above — don't hand-edit
├── images/ui/              chrome glyphs (arrow-up, sun, moon-stars), inlined into components
└── _ds/nocturne-.../       Nocturne: styles.css (design tokens + classes), plus vendored runtime/manifest

scripts/    bundle-components, normalize-svg, strip-c2pa, trim-svg
justfile    build / bundle-components / serve / clean / install-hooks / normalize-svg / trim-svg
```

## Dependency direction

```
vertex-order/kit  ← this repo: runtime + Nocturne + components (source of truth)
   │    ▲
   │    └── pulls  site/data/platform-icons.js + site/images/platforms/  from vertex-order/platforms
   │
   ├── vertex-order/platforms      pulls _ds/, images/ui/, support.js, *.dc.html from here;
   │                               owns ZoomedPlatformIcon.dc.html and the tuning bench
   └── vertex-order/final-fantasy, /kingdom-hearts, …   consume kit to render their lists
```

`PlatformIcon.dc.html` lives here. `ZoomedPlatformIcon.dc.html` (the 2×
tuning wrapper) lives in `platforms` and is not needed here.

## Working on it

Plain HTML / CSS / JS, no build step, no Node (except the one-time
`just trim-svg`). Edit a `*.dc.html` or `styles.css`, preview in a browser.
After any `*.dc.html` change run `just bundle-components` and commit
`site/components.js` — CI fails the PR otherwise. See
[CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

[MIT](LICENSE). Interface icons are Bootstrap Icons (MIT); the DC runtime and
Nocturne are vendored Claude Design output — see [NOTICE.md](NOTICE.md).
Platform icons are pulled from `vertex-order/platforms` and credited in
[its NOTICE](https://github.com/vertex-order/platforms/blob/main/NOTICE.md).

Notes for AI coding tools: [AGENTS.md](AGENTS.md) and
[`.claude/CLAUDE.md`](.claude/CLAUDE.md).
