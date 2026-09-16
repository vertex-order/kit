// site/data/series-WW.js — kit's own fixture data (component gallery
// preview). Deleted by scripts/init-list.py when this repo is used as a
// template for a new list repo — see docs/init-list.md. Schema modeled on
// vertex-order/final-fantasy's site/data/series-*.js (the in-depth reference
// example); a real list repo should copy that repo's shape, not this one.
window.__wwSeriesReg['WW'] = { num: 'WW', releaseDate: '2014-03-11', chronoOrder: 100, recommendedOrder: 100, title: 'Wyrmwatch', url: 'https://example.com/wiki/Wyrmwatch_(franchise)', note: 'The flagship tactics series: bond with wild wyrms to hold the Ashfall frontier’s watchtowers.', games: [
  { title: 'Wyrmwatch', releaseDate: '2014-03-11', chronoOrder: 200, recommendedOrder: 100, mainline: true, tags: [], mediaType: 'Game',
    lengthParts: [{ value: '22h', tip: 'Main Story', sep: true, sepChar: ' / ' }, { value: '31h', tip: 'Main + Extra', sep: true, sepChar: ' / ' }, { value: '48h', tip: 'Completionist' }],
    languages: [
      { value: 'EN', tip: 'English — full audio', native: true, voice: true },
      { value: 'FR', tip: 'French — full audio', voice: true },
      { value: 'DE', tip: 'German — full audio', voice: true },
      { value: 'JA', tip: 'Japanese — full audio', voice: true },
    ],
    parts: [
      { label: 'Wyrmwatch (2014)', url: 'https://example.com/wiki/Wyrmwatch' },
      { label: 'Remaster (2022)', url: 'https://example.com/wiki/Wyrmwatch_Remaster', small: true },
    ],
    storeUrl: 'https://example.com/store/wyrmwatch',
    description: [
      'Recruit-and-bond tactics RPG. Warden Rook Ashvane arrives at the Ashfall frontier and must bond with wild wyrms to hold the watchtowers against the Blightswarm.',
      'Includes a free rebalance patch and an optional hard difficulty added post-launch.',
      'This remaster reworks lighting, remixes the soundtrack, redraws the UI, and adds a photo mode. Released as Wyrmwatch: Anniversary Remaster.',
      ['Also sold as ', { emText: 'Wyrmwatch: Warden’s Edition' }, ' in some regions.'],
    ],
    rating: { scoreLabelText: 'Wyrmreview', midLabelText: 'Wyrmreview Players', score: '91', midScore: '8.6', midUrl: 'https://example.com/reviews/wyrmwatch', source: 'Fixture', url: 'https://example.com/reviews/wyrmwatch', sourceUrl: 'https://example.com/store/wyrmwatch', sourceLabel: 'Fixture storefront' },
    lengthParts: [{ value: '22h', tip: 'Main Story', sep: true, sepChar: ' / ' }, { value: '31h', tip: 'Main + Extra', sep: true, sepChar: ' / ' }, { value: '50h', tip: 'Completionist' }],
    platformGroups: [
      [{ key: 'steam', paren: 'PC', url: 'https://example.com/store/wyrmwatch/steam' }],
      [{ key: 'windows', paren: 'Digital', url: 'https://example.com/store/wyrmwatch/windows' }],
      [
        { key: 'playstation4', paren: 'Physical; Digital', url: 'https://example.com/store/wyrmwatch/ps4' },
        { key: 'playstation5', paren: 'PS4 compat', url: 'https://example.com/store/wyrmwatch/ps4' },
      ],
      [{ key: 'xbox-one', paren: 'Physical; Digital', url: 'https://example.com/store/wyrmwatch/xbox' }],
      [{ key: 'nintendo-switch', paren: 'Digital', url: 'https://example.com/store/wyrmwatch/switch' }],
      [{ key: 'nintendo-switch-2', paren: 'Digital', url: 'https://example.com/store/wyrmwatch/switch2' }],
    ],
    platformsUrl: 'https://example.com/store/wyrmwatch',
    extras: [
      {
        parts: [
          { label: 'Wyrmwatch (2014)', url: 'https://example.com/wiki/Wyrmwatch' },
          { label: 'Mobile (2015)', url: 'https://example.com/wiki/Wyrmwatch_Mobile', small: true },
        ],
        description: [
          ['A feature-phone port with simplified bonding menus and two bonding chapters cut for hardware limits. Released as ', { emText: 'Wyrmwatch Go' }, '.'],
        ],
        languages: [{ value: 'EN', tip: 'English — text only' }],
        platformGroups: [
          [{ key: 'mobile-phone', name: 'iOS; Android (Digital); terminated', terminated: true, strikeColor: 'currentColor', contentOpacity: 0.5 }],
        ],
      },
      {
        label: 'Wyrmwatch (2014)', url: 'https://example.com/wiki/Wyrmwatch',
        description: ['The original release, before the free rebalance patch and the 2022 remaster.'],
        languages: [{ value: 'EN', tip: 'English — full audio', native: true, voice: true }],
        platformGroups: [
          [{ key: 'nintendo-wii-u', name: 'Nintendo Wii U (Digital); terminated', terminated: true, strikeColor: 'currentColor', contentOpacity: 0.5 }],
        ],
      },
    ],
  },
  { title: 'Wyrmwatch: Ashfall Uprising', releaseDate: '2015-06-02', chronoOrder: 250, recommendedOrder: 300, tags: ['Expansion', 'Optional'], mediaType: 'Game',
    lengthParts: [{ value: '8h', tip: 'Main Story', sep: true, sepChar: ' / ' }, { value: '11h', tip: 'Main + Extra', sep: true, sepChar: ' / ' }, { value: '14h', tip: 'Completionist' }],
    languages: [
      { value: 'EN', tip: 'English — full audio', native: true, voice: true },
      { value: 'FR', tip: 'French — text only' },
    ],
    parts: [
      { label: 'Wyrmwatch: Ashfall Uprising (2015)', url: 'https://example.com/wiki/Ashfall_Uprising' },
      { label: 'Expansion', url: null, small: true },
    ],
    description: [
      ['Standalone expansion set ', { emText: 'immediately after' }, ' the base game — the Blightswarm regroups beyond the watchtowers.'],
    ],
    rating: { scoreLabelText: 'Wyrmreview', score: '7.6', url: 'https://example.com/reviews/ashfall-uprising', single: true, sourceLabel: 'Fixture rating source' },
    storeUrl: 'https://example.com/store/ashfall-uprising',
    platformGroups: [
      [{ key: 'steam', paren: 'PC', url: 'https://example.com/store/ashfall-uprising/steam' }],
      [
        { key: 'playstation4', paren: 'Digital', url: 'https://example.com/store/ashfall-uprising/ps4' },
        { key: 'playstation5', paren: 'PS4 compat', url: 'https://example.com/store/ashfall-uprising/ps4' },
      ],
      [{ key: 'xbox-one', paren: 'Digital', url: 'https://example.com/store/ashfall-uprising/xbox' }],
    ],
    platformsUrl: 'https://example.com/store/ashfall-uprising',
  },
  { title: 'Wyrmwatch II', releaseDate: '2019-05-14', chronoOrder: 50, recommendedOrder: 200, mainline: true, tags: ['Prequel'], mediaType: 'Game',
    lengthParts: [{ value: '26h', tip: 'Main Story', sep: true, sepChar: ' / ' }, { value: '35h', tip: 'Main + Extra', sep: true, sepChar: ' / ' }, { value: '55h', tip: 'Completionist' }],
    languages: [
      { value: 'EN', tip: 'English — full audio', native: true, voice: true },
      { value: 'JA', tip: 'Japanese — full audio', voice: true },
      { value: 'FR', tip: 'French — full audio', voice: true },
      { value: 'DE', tip: 'German — text only' },
      { value: 'ES', tip: 'Spanish — text only' },
    ],
    parts: [
      { label: 'Wyrmwatch II (2019)', url: 'https://example.com/wiki/Wyrmwatch_II' },
      { label: 'Edit (2021)', url: 'https://example.com/wiki/Wyrmwatch_II#Edit', small: true },
    ],
    storeUrl: 'https://example.com/store/wyrmwatch-ii',
    description: [
      'Set decades before the original: young warden-in-training Isolde Marrow first tames a wyrm and discovers the Blightswarm’s origin at the frontier’s founding.',
      'Adds a mounted-flight traversal layer and a wyrm-breeding metagame on top of the original’s bonding and tactics systems.',
      'This edit added a selectable Hard difficulty and New Game+, with no changes to visuals or story.',
    ],
    rating: { scoreLabelText: 'Wyrmreview', midLabelText: 'Wyrmreview Players', score: '88', midScore: '8.4', midUrl: 'https://example.com/reviews/wyrmwatch-ii', source: 'Fixture', url: 'https://example.com/reviews/wyrmwatch-ii', sourceUrl: 'https://example.com/store/wyrmwatch-ii', sourceLabel: 'Fixture storefront' },
    platformGroups: [
      [{ key: 'steam', paren: 'PC', url: 'https://example.com/store/wyrmwatch-ii/steam' }],
      [{ key: 'playstation5', paren: 'Physical; Digital', url: 'https://example.com/store/wyrmwatch-ii/ps5' }],
      [{ key: 'xbox-xs', paren: 'Physical; Digital', url: 'https://example.com/store/wyrmwatch-ii/xbox' }],
      [{ key: 'nintendo-switch', name: 'Nintendo Switch (Digital); cloud-streamed', url: 'https://example.com/store/wyrmwatch-ii/switch' }],
    ],
    platformsUrl: 'https://example.com/store/wyrmwatch-ii',
    extras: [
      {
        label: 'Wyrmwatch II (2019)', url: 'https://example.com/wiki/Wyrmwatch_II',
        description: ['The original release, before the Hard difficulty and New Game+ edit.'],
      },
    ],
    alt: {
      label: 'Wyrmwatch II: Reborn',
      parts: [
        { label: 'Wyrmwatch II (2019)', url: 'https://example.com/wiki/Wyrmwatch_II' },
        { label: 'Remake (2024)', url: 'https://example.com/wiki/Wyrmwatch_II_Reborn', small: true },
      ],
      description: [
        ['Replaces the original’s turn-based tactics with real-time combat, and adds a new prologue chapter and an alternate ending. Released as ', { emText: 'Wyrmwatch II: Reborn' }, '.'],
      ],
      languages: [
        { value: 'EN', tip: 'English — full audio', native: true, voice: true },
        { value: 'JA', tip: 'Japanese — full audio', voice: true },
      ],
      storeUrl: 'https://example.com/store/wyrmwatch-ii-reborn',
      rating: { scoreLabelText: 'Wyrmreview', score: '79', url: 'https://example.com/reviews/wyrmwatch-ii-reborn', single: true, sourceLabel: 'Fixture rating source' },
      lengthParts: [{ value: '24h', tip: 'Main Story', sep: true, sepChar: ' / ' }, { value: '33h', tip: 'Main + Extra', sep: true, sepChar: ' / ' }, { value: '52h', tip: 'Completionist' }],
      platformGroups: [
        [{ key: 'steam', paren: 'PC', url: 'https://example.com/store/wyrmwatch-ii-reborn/steam' }],
        [{ key: 'nintendo-switch-2', paren: 'Digital', url: 'https://example.com/store/wyrmwatch-ii-reborn/switch2' }],
      ],
    },
  },
  { title: 'Wyrmwatch: Ember Reckoning', releaseDate: '2026-02-14', chronoOrder: 260, recommendedOrder: 350, tags: ['Expansion', 'Optional'], mediaType: 'Game',
    lengthParts: [{ value: '9h', tip: 'Main Story', sep: true, sepChar: ' / ' }, { value: '13h', tip: 'Main + Extra', sep: true, sepChar: ' / ' }, { value: '17h', tip: 'Completionist' }],
    languages: [
      { value: 'EN', tip: 'English — full audio', native: true, voice: true },
      { value: 'FR', tip: 'French — text only' },
    ],
    parts: [
      { label: 'Wyrmwatch: Ember Reckoning (2026)', url: 'https://example.com/wiki/Ember_Reckoning' },
      { label: 'Expansion', url: null, small: true },
    ],
    description: [
      ['A standalone expansion set alongside ', { emText: 'Wyrmwatch II (2019)' }, ', following a splinter watch as they hold a collapsing tower in the frontier’s ember basin.'],
    ],
    rating: { scoreLabelText: 'Wyrmreview', score: '81', url: 'https://example.com/reviews/ember-reckoning', single: true, sourceLabel: 'Fixture rating source' },
    storeUrl: 'https://example.com/store/ember-reckoning',
    platformGroups: [
      [{ key: 'steam', paren: 'PC', url: 'https://example.com/store/ember-reckoning/steam' }],
      [{ key: 'nintendo-switch-2', paren: 'Digital', url: 'https://example.com/store/ember-reckoning/switch2' }],
    ],
    platformsUrl: 'https://example.com/store/ember-reckoning',
  },
  { title: 'Wyrmwatch III', releaseDate: '2027-03-18', chronoOrder: 350, recommendedOrder: 400, mainline: true, tags: ['Sequel'], mediaType: 'Game',
    languages: [
      { value: 'EN', tip: 'English — full audio', native: true, voice: true },
      { value: 'JA', tip: 'Japanese — full audio', voice: true },
    ],
    parts: [
      { label: 'Wyrmwatch III (2027)', url: 'https://example.com/wiki/Wyrmwatch_III' },
    ],
    storeUrl: 'https://example.com/store/wyrmwatch-iii',
    description: [
      'Warden Rook Ashvane returns to the Ashfall frontier after a decade of peace, as a new Blightswarm strain breaches the outer watchtowers.',
    ],
    platformGroups: [
      [{ key: 'steam', paren: 'PC', url: 'https://example.com/store/wyrmwatch-iii/steam' }],
      [{ key: 'playstation5', paren: 'Digital', url: 'https://example.com/store/wyrmwatch-iii/ps5' }],
      [{ key: 'xbox-xs', paren: 'Digital', url: 'https://example.com/store/wyrmwatch-iii/xbox' }],
    ],
    platformsUrl: 'https://example.com/store/wyrmwatch-iii',
  },
]};
