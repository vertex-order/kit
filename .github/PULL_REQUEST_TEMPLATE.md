<!-- PULL_REQUEST_TEMPLATE.md (markdown) -->

## What & why

<!-- What does this change, and what's it for? -->

## Discussed in

<!-- REQUIRED: link the Discussion or issue where this change was raised and
     agreed. Open a Discussion first if there isn't one — PRs without a prior
     thread may be closed unreviewed. -->

-

## Checklist

- [ ] Links the Discussion or issue where this was agreed (above)
- [ ] Previewed locally — checked `PlatformIcon.dc.html` against real data if it or Nocturne tokens changed
- [ ] Ran `just bundle-components` and committed `site/components.js` (if any `site/*.dc.html` changed)
- [ ] Updated [`NOTICE.md`](../NOTICE.md) (if a UI icon was added or its source changed)
- [ ] Considered the blast radius — this ships to every list that consumes kit
- [ ] Commits signed off (`git commit -s`); contribution licensed per [CONTRIBUTING.md](../CONTRIBUTING.md#licensing)
