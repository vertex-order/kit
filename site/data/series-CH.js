// site/data/series-CH.js — kit's own fixture data (component gallery
// preview). Deleted by scripts/init-list.py when this repo is used as a
// template for a new list repo — see docs/init-list.md.
// schema: series.schema.json
window.__wwSeriesReg['CH'] = { num: 'CH', chronoOrder: 400, recommendedOrder: 400, title: 'Wyrmwatch Chronicles', url: 'https://example.com/wiki/Wyrmwatch_Chronicles', note: 'A novel and a short film expanding the Ashfall frontier beyond the games — entirely optional.', media: [
  { releases: [
    { chronoOrder: 300, recommendedOrder: 410, tags: ['Novel'], mediaType: 'Book',
      length: '384p; P',
      languages: [
        { value: 'EN', native: true, url: 'https://example.com/books/ashfall-codex/en' },
        { value: 'ES', tip: 'Spanish (Castilian)', url: 'https://example.com/books/ashfall-codex/es' },
      ],
      title: 'Wyrmwatch Chronicles: The Ashfall Codex', titleUrl: 'https://example.com/wiki/The_Ashfall_Codex', titleDate: '2017-10-03',
      subtitle: 'Book',
      description: [
        ['Before the watchtowers, warden-in-training Isolde Marrow keeps a diary of her first wyrm bonding. A prequel companion to ', { emText: 'Wyrmwatch II (2019)' }, '. Also known as ', { emText: 'The Codex of Ashfall' }, ' in some markets.'],
      ],
      ratings: [{ label: 'Fixture rating source', score: '4.12', url: 'https://example.com/books/ashfall-codex' }],
      platforms: [
        { key: 'book', name: 'Novel', noUrl: true },
        { key: 'fan-audiobook', paren: 'Youtube', url: 'https://example.com/audiobook/ashfall-codex' },
      ],
    },
  ] },
  { releases: [
    { chronoOrder: 900, recommendedOrder: 420, tags: ['Short Film', 'Optional'], mediaType: 'Video',
      length: '52m',
      languages: [
        { value: 'EN', native: true, voice: true },
        { value: 'JA', tip: 'Japanese — dub', voice: true },
        { value: 'FR', tip: 'French — subtitles only' },
      ],
      title: 'Wyrmwatch: Rise of the Wyrm', titleUrl: 'https://example.com/wiki/Rise_of_the_Wyrm', titleDate: '2020-11-20',
      description: [
        ['A 52-minute animated short following the founding of the first watchtower, made as a tie-in for ', { emText: 'Wyrmwatch II (2019)' }, '.'],
      ],
      ratings: [{ label: 'Fixture rating source', score: '7.4', url: 'https://example.com/reviews/rise-of-the-wyrm' }],
      platforms: [
        { key: 'blu-ray', paren: 'Physical', url: 'https://example.com/store/rise-of-the-wyrm/bluray' },
        { key: 'youtube', name: 'Streaming (YouTube)', url: 'https://example.com/watch/rise-of-the-wyrm' },
      ],
    },
  ] },
  { releases: [
    { chronoOrder: 320, recommendedOrder: 415, tags: ['Novel', 'Optional'], mediaType: 'Book',
      length: '312p',
      languages: [
        { value: 'EN', native: true, url: 'https://example.com/books/cinderwake/en' },
      ],
      title: 'Wyrmwatch Chronicles: Cinderwake', titleUrl: 'https://example.com/wiki/Cinderwake', titleDate: '2025-11-12',
      subtitle: 'Book',
      description: [
        ['Set shortly after ', { emText: 'Ashfall Uprising (2015)' }, ', a retired warden is called back to the frontier when the ember basin towers go dark.'],
      ],
      ratings: [{ label: 'Fixture rating source', score: '3.95', url: 'https://example.com/books/cinderwake' }],
      platforms: [
        { key: 'book', name: 'Novel', noUrl: true },
      ],
    },
  ] },
]};
