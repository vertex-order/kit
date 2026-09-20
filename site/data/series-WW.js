// site/data/series-WW.js — kit's own fixture data (component gallery
// preview). Deleted by scripts/init-list.py when this repo is used as a
// template for a new list repo — see docs/init-list.md. Schema modeled on
// vertex-order/final-fantasy's site/data/series-*.js (the in-depth reference
// example); a real list repo should copy that repo's shape, not this one.
// schema: series.schema.json
window.__wwSeriesReg['WW'] = { num: 'WW', releaseDate: '2014-03-11', chronoOrder: 100, recommendedOrder: 100, title: 'Wyrmwatch', url: 'https://example.com/wiki/Wyrmwatch_(franchise)', note: 'The flagship tactics series: bond with wild wyrms to hold the Ashfall frontier’s watchtowers.', games: [
  { chronoOrder: 200, recommendedOrder: 100, mainline: true, tags: [], mediaType: 'Game',
    lengthParts: [{ value: '22h', tip: 'Main Story', sep: true, sepChar: ' / ' }, { value: '31h', tip: 'Main + Extra', sep: true, sepChar: ' / ' }, { value: '48h', tip: 'Completionist' }],
    languages: [
      { value: 'EN', native: true, voice: true },
      { value: 'FR', voice: true },
      { value: 'DE', voice: true },
      { value: 'JA', voice: true },
    ],
    title: 'Wyrmwatch', title_url: 'https://example.com/wiki/Wyrmwatch', title_date: '2014-03-11',
    subtitle: 'Remaster', subtitle_url: 'https://example.com/wiki/Wyrmwatch_Remaster', subtitle_date: 2022,
    storeUrl: 'https://example.com/store/wyrmwatch',
    description: [
      'Recruit-and-bond tactics RPG. Warden Rook Ashvane arrives at the Ashfall frontier and must bond with wild wyrms to hold the watchtowers against the Blightswarm.',
      'Includes a free rebalance patch and an optional hard difficulty added post-launch.',
      'This remaster reworks lighting, remixes the soundtrack, redraws the UI, and adds a photo mode. Released as Wyrmwatch: Anniversary Remaster.',
      ['Also sold as ', { emText: 'Wyrmwatch: Warden’s Edition' }, ' in some regions.'],
    ],
    rating: { scores: [{ label: 'Wyrmreview', score: '91', url: 'https://example.com/reviews/wyrmwatch' }, { label: 'Wyrmreview Players', score: '8.6', url: 'https://example.com/reviews/wyrmwatch' }, { label: 'Fixture storefront', score: 'Fixture', url: 'https://example.com/store/wyrmwatch' }] },
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
        // title omitted: inherits 'Wyrmwatch' (2014) wholesale from the parent entry.
        subtitle: 'Mobile', subtitle_url: 'https://example.com/wiki/Wyrmwatch_Mobile', subtitle_date: 2015,
        description: [
          ['A feature-phone port with simplified bonding menus and two bonding chapters cut for hardware limits. Released as ', { emText: 'Wyrmwatch Go' }, '.'],
        ],
        languages: [{ value: 'EN', textOnly: true }],
        platformGroups: [
          [{ key: 'mobile-phone', name: 'iOS; Android (Digital); terminated', terminated: true }],
        ],
      },
      {
        // title and subtitle both omitted: just the inherited base title, no edition tag.
        label: 'Wyrmwatch (2014)', url: 'https://example.com/wiki/Wyrmwatch',
        description: ['The original release, before the free rebalance patch and the 2022 remaster.'],
        languages: [{ value: 'EN', native: true, voice: true }],
        platformGroups: [
          [{ key: 'nintendo-wii-u', name: 'Nintendo Wii U (Digital); terminated', terminated: true }],
        ],
      },
    ],
  },
  { chronoOrder: 250, recommendedOrder: 300, tags: ['Expansion', 'Optional'], mediaType: 'Game',
    lengthParts: [{ value: '8h', tip: 'Main Story', sep: true, sepChar: ' / ' }, { value: '11h', tip: 'Main + Extra', sep: true, sepChar: ' / ' }, { value: '14h', tip: 'Completionist' }],
    languages: [
      { value: 'EN', native: true, voice: true },
      { value: 'FR', textOnly: true },
    ],
    title: 'Wyrmwatch: Ashfall Uprising', title_url: 'https://example.com/wiki/Ashfall_Uprising', title_date: '2015-06-02',
    subtitle: 'Expansion',
    description: [
      ['Standalone expansion set ', { emText: 'immediately after' }, ' the base game — the Blightswarm regroups beyond the watchtowers.'],
    ],
    rating: { scores: [{ label: 'Fixture rating source', score: '7.6', url: 'https://example.com/reviews/ashfall-uprising' }] },
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
  { chronoOrder: 50, recommendedOrder: 200, mainline: true, tags: ['Prequel'], mediaType: 'Game',
    lengthParts: [{ value: '26h', tip: 'Main Story', sep: true, sepChar: ' / ' }, { value: '35h', tip: 'Main + Extra', sep: true, sepChar: ' / ' }, { value: '55h', tip: 'Completionist' }],
    languages: [
      { value: 'EN', native: true, voice: true },
      { value: 'JA', voice: true },
      { value: 'FR', voice: true },
      { value: 'DE', textOnly: true },
      { value: 'ES', textOnly: true },
    ],
    title: 'Wyrmwatch II', title_url: 'https://example.com/wiki/Wyrmwatch_II', title_date: '2019-05-14',
    subtitle: 'Edit', subtitle_url: 'https://example.com/wiki/Wyrmwatch_II#Edit', subtitle_date: 2021,
    storeUrl: 'https://example.com/store/wyrmwatch-ii',
    description: [
      'Set decades before the original: young warden-in-training Isolde Marrow first tames a wyrm and discovers the Blightswarm’s origin at the frontier’s founding.',
      'Adds a mounted-flight traversal layer and a wyrm-breeding metagame on top of the original’s bonding and tactics systems.',
      'This edit added a selectable Hard difficulty and New Game+, with no changes to visuals or story.',
    ],
    rating: { scores: [{ label: 'Wyrmreview', score: '88', url: 'https://example.com/reviews/wyrmwatch-ii' }, { label: 'Wyrmreview Players', score: '8.4', url: 'https://example.com/reviews/wyrmwatch-ii' }, { label: 'Fixture storefront', score: 'Fixture', url: 'https://example.com/store/wyrmwatch-ii' }] },
    platformGroups: [
      [{ key: 'steam', paren: 'PC', url: 'https://example.com/store/wyrmwatch-ii/steam' }],
      [{ key: 'playstation5', paren: 'Physical; Digital', url: 'https://example.com/store/wyrmwatch-ii/ps5' }],
      [{ key: 'xbox-xs', paren: 'Physical; Digital', url: 'https://example.com/store/wyrmwatch-ii/xbox' }],
      [{ key: 'nintendo-switch', name: 'Nintendo Switch (Digital); cloud-streamed', url: 'https://example.com/store/wyrmwatch-ii/switch' }],
    ],
    platformsUrl: 'https://example.com/store/wyrmwatch-ii',
    extras: [
      {
        // title and subtitle both omitted: just the inherited base title, no edition tag.
        label: 'Wyrmwatch II (2019)', url: 'https://example.com/wiki/Wyrmwatch_II',
        description: ['The original release, before the Hard difficulty and New Game+ edit.'],
      },
    ],
    alt: {
      // title omitted: inherits 'Wyrmwatch II' (2019) wholesale from the parent entry.
      subtitle: 'Remake', subtitle_url: 'https://example.com/wiki/Wyrmwatch_II_Reborn', subtitle_date: 2024,
      label: 'Wyrmwatch II: Reborn',
      description: [
        ['Replaces the original’s turn-based tactics with real-time combat, and adds a new prologue chapter and an alternate ending. Released as ', { emText: 'Wyrmwatch II: Reborn' }, '.'],
      ],
      languages: [
        { value: 'EN', native: true, voice: true },
        { value: 'JA', voice: true },
      ],
      storeUrl: 'https://example.com/store/wyrmwatch-ii-reborn',
      rating: { scores: [{ label: 'Fixture rating source', score: '79', url: 'https://example.com/reviews/wyrmwatch-ii-reborn' }] },
      lengthParts: [{ value: '24h', tip: 'Main Story', sep: true, sepChar: ' / ' }, { value: '33h', tip: 'Main + Extra', sep: true, sepChar: ' / ' }, { value: '52h', tip: 'Completionist' }],
      platformGroups: [
        [{ key: 'steam', paren: 'PC', url: 'https://example.com/store/wyrmwatch-ii-reborn/steam' }],
        [{ key: 'nintendo-switch-2', paren: 'Digital', url: 'https://example.com/store/wyrmwatch-ii-reborn/switch2' }],
      ],
    },
  },
  { chronoOrder: 260, recommendedOrder: 350, tags: ['Expansion', 'Optional'], mediaType: 'Game',
    lengthParts: [{ value: '9h', tip: 'Main Story', sep: true, sepChar: ' / ' }, { value: '13h', tip: 'Main + Extra', sep: true, sepChar: ' / ' }, { value: '17h', tip: 'Completionist' }],
    languages: [
      { value: 'EN', native: true, voice: true },
      { value: 'FR', textOnly: true },
    ],
    title: 'Wyrmwatch: Ember Reckoning', title_url: 'https://example.com/wiki/Ember_Reckoning', title_date: '2026-02-14',
    subtitle: 'Expansion',
    description: [
      ['A standalone expansion set alongside ', { emText: 'Wyrmwatch II (2019)' }, ', following a splinter watch as they hold a collapsing tower in the frontier’s ember basin.'],
    ],
    rating: { scores: [{ label: 'Fixture rating source', score: '81', url: 'https://example.com/reviews/ember-reckoning' }] },
    storeUrl: 'https://example.com/store/ember-reckoning',
    platformGroups: [
      [{ key: 'steam', paren: 'PC', url: 'https://example.com/store/ember-reckoning/steam' }],
      [{ key: 'nintendo-switch-2', paren: 'Digital', url: 'https://example.com/store/ember-reckoning/switch2' }],
    ],
    platformsUrl: 'https://example.com/store/ember-reckoning',
  },
  { chronoOrder: 350, recommendedOrder: 400, mainline: true, tags: ['Sequel'], mediaType: 'Game',
    languages: [
      { value: 'EN', native: true, voice: true },
      { value: 'JA', voice: true },
    ],
    title: 'Wyrmwatch III', title_url: 'https://example.com/wiki/Wyrmwatch_III', title_date: '2027-03-18',
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
