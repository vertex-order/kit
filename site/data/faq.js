// site/data/faq.js — kit's own fixture data (component gallery preview).
// Deleted by scripts/init-list.py when this repo is used as a template for a
// new list repo — see docs/init-list.md. Franchise-specific items first, then
// the generic items every list shares (data/common-faq.js, owned by kit).
window.FAQ_ITEMS = [
  {
    id: "is-this-real",
    q: "Is Wyrmwatch a real franchise?",
    a: ["No. It's fixture data made up to preview kit's components — the games, novel, and short film below don't exist."],
  },
  ...window.FAQ_ITEMS_COMMON,
];
