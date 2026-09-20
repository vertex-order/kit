// site/data/common-faq.js — owned by vertex-order/kit. Edit here.
// Vendored elsewhere via sync.toml; don't edit the copy there.
//
// Generic FAQ_ITEMS entries that apply to every Vertex Order list, not just
// one franchise (verified identical, word-for-word, across final-fantasy and
// kingdom-hearts before being pulled out here). A consuming repo's own
// data/faq.js spreads this array in alongside its franchise-specific items,
// wherever it reads best:
//
//   window.FAQ_ITEMS = [
//     { q: "Do I need to play the franchise in order?", a: [...] },  // franchise-specific
//     ...window.FAQ_ITEMS_COMMON,
//   ];
//
// Load this script after data/site.js and before data/faq.js in page.dc.html:
// after, because the "contribute" entry below reads window.SITE_CONFIG.discussionsUrl;
// before, so the global exists when faq.js runs. Same schema as FAQ_ITEMS — see
// FAQ.dc.html.
//
// Every entry needs a stable, hand-picked `id` (kebab-case) -- it becomes the
// question's #faq-<id> pilcrow anchor. Never derived from the question text or
// array index, so existing links don't break when questions are reworded,
// reordered, or entries are added/removed around them.
// schema: faq.schema.json
window.FAQ_ITEMS_COMMON = [
  {
    id: "which-version",
    q: "Which version should I play?",
    a: [
      "We've tried to only list releases that have significant differences, to better help you choose. We tend to recommend one or two releases prominently as working for the most people and put the others behind a other versions toggle.",
      "The platforms you already own is a good start. MacOS and most Linux distributions now have abstractions layers like Proton that can play most Windows games without problem. Console emulation is at best a legal grey area we cannot promote.",
      "Even if a bit less convenient at times, we recommend owning outright instead of licenses. That means physical media over digital; and GOG or direct from publisher instead of gaming services like Steam or Epic. Last would be digital services tied directly to console hardware, which tend to be terminated after a few years; and game streaming services whose titles may come and go. Good questions to ask yourself on if you actually own something is \"Can I resell it? Can I transfer my license? Can I use the product if the purchase platform is terminated?\".",
    ],
  },
  {
    id: "language-mismatch",
    q: "Why doesn't the language list always match?",
    a: ["Some platforms drop a language or two for the same release depending on the market they target. Verify languages for your chosen platform — our list is a guideline, not a guarantee."],
  },
  {
    id: "which-language",
    q: "What language should I experience something in?",
    a: ["Either the language in which you can best enjoy it (usually your native tongue), the language it was originally produced in (if you're sufficiently proficient), or a mixture of both when subtitles are appropriate. One trick: if you find the voices grating, switch the audio to a language you don't understand — reading subtitles often lets you fill in your own characterization. Any of these can be the right answer."],
  },
  {
    id: "unfamiliar-language",
    q: "How do I read something if it's not available in any languages I am familiar with?",
    a: ["If you're able to obtain a digital copy of the text, you may be able to generate a rudimentary machine translation using offline local-only AI (like in Firefox) or online services (like DeepL or Google Translate). Be aware it won't be very accurate, especially in translating culture or expressions, but sometimes it is better than nothing, and it has the advantage of being able to translate into dozens if not hundreds of languages. When able, translate from a source language similar in grammar to your target language."],
  },
  {
    id: "terminated-digital",
    q: "Why are only digital downloads marked as terminated?",
    a: ["When official means of obtaining digital downloads are terminated, there is no other legal recourse. For physical media (e.g. cartridge, CD, or DVD) you can still legally obtain them on the reseller market as a used copy."],
  },
  {
    id: "multi-platform-physical",
    q: "Why are some physical releases marked for multiple platforms?",
    a: ["If a platform has a compatibility layer to play media from an older platform, we will mark that platform with a note in the tooltip. The idea is to know what games you can play on what platforms, not which release it is (that's what the version title is for!)"],
  },
  {
    id: "title-missing",
    q: "Why is a title missing?",
    a: ["It may have come out after the last update of this list, check last updated at the bottom of the page and if so, please submit it!"],
  },
  {
    id: "release-missing",
    q: "Why is a specific release missing?",
    a: ["When release content is mostly identical (minor differences aside) we generally roll them into a single entry in our list (combining platforms), using the original release date only. Our list is meant to be a play order, not a detailed accounting of every release made, so only information that is important when choosing which release to play is generally included."],
  },
  {
    id: "help-improve",
    q: "Interested in helping improve this list?",
    a: [
      { parts: [
        { text: "See the Help Wanted section below for specific tasks, or head to " },
        { text: "this list's discussion page", url: window.SITE_CONFIG && window.SITE_CONFIG.discussionsUrl },
        { text: " to propose something else — missing entries, corrections, or anything the list is getting wrong." },
      ] },
    ],
  },
  {
    id: "fan-art",
    q: "Have fan art you want to share alongside entries in this list?",
    a: [
      { parts: [
        { text: "We're always looking for simple small " },
        { em: "original" },
        { text: " fan art to go beside entries in this list (with full in-place attribution), and rotate through multiples when we can. Hand-drawn or digitally painted (Photoshop, tablet, etc.) work is welcome, but we'd prefer to avoid AI-generated art for now. Head to " },
        { text: "this list's discussion page", url: window.SITE_CONFIG && window.SITE_CONFIG.discussionsUrl },
        { text: " to tell us about your work." },
      ] },
      { parts: [
        { text: "So we can display it freely, we only accept " },
        { text: "CC-BY", url: "https://creativecommons.org/licenses/by/4.0/deed.en" },
        { text: " licensed work. Let us know if something is being displayed in error." },
      ] },
    ],
  },
];
