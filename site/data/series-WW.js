// site/data/series-WW.js — kit's own fixture data (component gallery
// preview). Deleted by scripts/init-list.py when this repo is used as a
// template for a new list repo — see docs/init-list.md. Schema modeled on
// vertex-order/final-fantasy's site/data/series-*.js (the in-depth reference
// example); a real list repo should copy that repo's shape, not this one.
// schema: series.schema.json
window.__wwSeriesReg['WW'] = { num: 'WW', chronoOrder: 100, recommendedOrder: 100, title: 'Wyrmwatch', url: 'https://example.com/wiki/Wyrmwatch_(franchise)', note: 'The flagship tactics series: bond with wild wyrms to hold the Ashfall frontier’s watchtowers.', media: [
  { releases: [
    { mediaType: 'Game', chronoOrder: 200, recommendedOrder: 100, mainline: true, tags: [],
      length: [{ value: '22h', tip: 'Main Story' }, { value: '31h', tip: 'Main + Extra' }, { value: '50h', tip: 'Completionist' }],
      languages: [
        { value: 'EN', native: true, voice: true },
        { value: 'FR', voice: true },
        { value: 'DE', voice: true },
        { value: 'JA', voice: true },
      ],
      title: 'Wyrmwatch', titleUrl: 'https://example.com/wiki/Wyrmwatch', titleDate: '2014-03-11',
      subtitle: 'Remaster', subtitleUrl: 'https://example.com/wiki/Wyrmwatch_Remaster', subtitleDate: 2022,
      profileUrl: 'https://example.com/store/wyrmwatch',
      description: [
        'Recruit-and-bond tactics RPG. Warden Rook Ashvane arrives at the Ashfall frontier and must bond with wild wyrms to hold the watchtowers against the Blightswarm.',
        'Includes a free rebalance patch and an optional hard difficulty added post-launch.',
        'This remaster reworks lighting, remixes the soundtrack, redraws the UI, and adds a photo mode. Released as Wyrmwatch: Anniversary Remaster.',
        ['Also sold as ', { emText: 'Wyrmwatch: Warden’s Edition' }, ' in some regions.'],
      ],
      ratings: [
        { label: 'Wyrmreview', score: '91', url: 'https://example.com/reviews/wyrmwatch' },
        { label: 'Wyrmreview Players', score: '8.6', url: 'https://example.com/reviews/wyrmwatch' },
        { label: 'Fixture storefront', score: 'Fixture', url: 'https://example.com/store/wyrmwatch' },
      ],
      platforms: [
        { key: 'steam', paren: 'PC', url: 'https://example.com/store/wyrmwatch/steam' },
        { key: 'windows', paren: 'Digital', url: 'https://example.com/store/wyrmwatch/windows' },
        { key: 'playstation4', paren: 'Physical; Digital', url: 'https://example.com/store/wyrmwatch/ps4' },
        { key: 'playstation5', paren: 'PS4 compat', url: 'https://example.com/store/wyrmwatch/ps4' },
        { key: 'xbox-one', paren: 'Physical; Digital', url: 'https://example.com/store/wyrmwatch/xbox' },
        { key: 'nintendo-switch', paren: 'Digital', url: 'https://example.com/store/wyrmwatch/switch' },
        { key: 'nintendo-switch-2', paren: 'Digital', url: 'https://example.com/store/wyrmwatch/switch2' },
      ],
      platformsUrl: 'https://example.com/store/wyrmwatch',
      versions: [
        {
          // title omitted: inherits 'Wyrmwatch' (2014) wholesale from the primary release.
          subtitle: 'Mobile', subtitleUrl: 'https://example.com/wiki/Wyrmwatch_Mobile', subtitleDate: 2015,
          description: [
            ['A feature-phone port with simplified bonding menus and two bonding chapters cut for hardware limits. Released as ', { emText: 'Wyrmwatch Go' }, '.'],
          ],
          languages: [{ value: 'EN', textOnly: true }],
          platforms: [
            { key: 'mobile-phone', paren: 'iOS; Android; Digital', terminated: true },
          ],
        },
        {
          // title and subtitle both omitted: just the inherited base title, no edition tag.
          label: 'Wyrmwatch (2014)', url: 'https://example.com/wiki/Wyrmwatch',
          description: ['The original release, before the free rebalance patch and the 2022 remaster.'],
          languages: [{ value: 'EN', native: true, voice: true }],
          platforms: [
            { key: 'nintendo-wii-u', paren: 'Digital', terminated: true },
          ],
        },
      ],
    },
  ] },
  { releases: [
    { mediaType: 'Game', chronoOrder: 250, recommendedOrder: 300, tags: ['Expansion', 'Optional'],
      length: [{ value: '8h', tip: 'Main Story' }, { value: '11h', tip: 'Main + Extra' }, { value: '14h', tip: 'Completionist' }],
      languages: [
        { value: 'EN', native: true, voice: true },
        { value: 'FR', textOnly: true },
      ],
      title: 'Wyrmwatch: Ashfall Uprising', titleUrl: 'https://example.com/wiki/Ashfall_Uprising', titleDate: '2015-06-02',
      subtitle: 'Expansion',
      description: [
        ['Standalone expansion set ', { emText: 'immediately after' }, ' the base game — the Blightswarm regroups beyond the watchtowers.'],
      ],
      ratings: [{ label: 'Fixture rating source', score: '7.6', url: 'https://example.com/reviews/ashfall-uprising' }],
      profileUrl: 'https://example.com/store/ashfall-uprising',
      platforms: [
        { key: 'steam', paren: 'PC', url: 'https://example.com/store/ashfall-uprising/steam' },
        { key: 'playstation4', paren: 'Digital', url: 'https://example.com/store/ashfall-uprising/ps4' },
        { key: 'playstation5', paren: 'PS4 compat', url: 'https://example.com/store/ashfall-uprising/ps4' },
        { key: 'xbox-one', paren: 'Digital', url: 'https://example.com/store/ashfall-uprising/xbox' },
      ],
      platformsUrl: 'https://example.com/store/ashfall-uprising',
    },
  ] },
  { releases: [
    { mediaType: 'Game', chronoOrder: 50, recommendedOrder: 200, mainline: true, tags: ['Prequel'],
      length: [{ value: '26h', tip: 'Main Story' }, { value: '35h', tip: 'Main + Extra' }, { value: '55h', tip: 'Completionist' }],
      languages: [
        { value: 'EN', native: true, voice: true },
        { value: 'JA', voice: true },
        { value: 'FR', voice: true },
        { value: 'DE', textOnly: true },
        { value: 'ES', textOnly: true },
      ],
      title: 'Wyrmwatch II', titleUrl: 'https://example.com/wiki/Wyrmwatch_II', titleDate: '2019-05-14',
      subtitle: 'Edit', subtitleUrl: 'https://example.com/wiki/Wyrmwatch_II#Edit', subtitleDate: 2021,
      profileUrl: 'https://example.com/store/wyrmwatch-ii',
      description: [
        'Set decades before the original: young warden-in-training Isolde Marrow first tames a wyrm and discovers the Blightswarm’s origin at the frontier’s founding.',
        'Adds a mounted-flight traversal layer and a wyrm-breeding metagame on top of the original’s bonding and tactics systems.',
        'This edit added a selectable Hard difficulty and New Game+, with no changes to visuals or story.',
      ],
      ratings: [
        { label: 'Wyrmreview', score: '88', url: 'https://example.com/reviews/wyrmwatch-ii' },
        { label: 'Wyrmreview Players', score: '8.4', url: 'https://example.com/reviews/wyrmwatch-ii' },
        { label: 'Fixture storefront', score: 'Fixture', url: 'https://example.com/store/wyrmwatch-ii' },
      ],
      platforms: [
        { key: 'steam', paren: 'PC', url: 'https://example.com/store/wyrmwatch-ii/steam' },
        { key: 'playstation5', paren: 'Physical; Digital', url: 'https://example.com/store/wyrmwatch-ii/ps5' },
        { key: 'xbox-xs', paren: 'Physical; Digital', url: 'https://example.com/store/wyrmwatch-ii/xbox' },
        { key: 'nintendo-switch', paren: 'Digital; cloud-streamed', url: 'https://example.com/store/wyrmwatch-ii/switch' },
      ],
      platformsUrl: 'https://example.com/store/wyrmwatch-ii',
      versions: [
        {
          // title and subtitle both omitted: just the inherited base title, no edition tag.
          label: 'Wyrmwatch II (2019)', url: 'https://example.com/wiki/Wyrmwatch_II',
          description: ['The original release, before the Hard difficulty and New Game+ edit.'],
        },
      ],
    },
    {
      // title omitted: inherits 'Wyrmwatch II' (2019) wholesale from the primary release.
      subtitle: 'Remake', subtitleUrl: 'https://example.com/wiki/Wyrmwatch_II_Reborn', subtitleDate: 2024,
      label: 'Wyrmwatch II: Reborn',
      description: [
        ['Replaces the original’s turn-based tactics with real-time combat, and adds a new prologue chapter and an alternate ending. Released as ', { emText: 'Wyrmwatch II: Reborn' }, '.'],
      ],
      languages: [
        { value: 'EN', native: true, voice: true },
        { value: 'JA', voice: true },
      ],
      profileUrl: 'https://example.com/store/wyrmwatch-ii-reborn',
      ratings: [{ label: 'Fixture rating source', score: '79', url: 'https://example.com/reviews/wyrmwatch-ii-reborn' }],
      length: [{ value: '24h', tip: 'Main Story' }, { value: '33h', tip: 'Main + Extra' }, { value: '52h', tip: 'Completionist' }],
      platforms: [
        { key: 'steam', paren: 'PC', url: 'https://example.com/store/wyrmwatch-ii-reborn/steam' },
        { key: 'nintendo-switch-2', paren: 'Digital', url: 'https://example.com/store/wyrmwatch-ii-reborn/switch2' },
      ],
    },
  ] },
  { releases: [
    { mediaType: 'Game', chronoOrder: 260, recommendedOrder: 350, tags: ['Expansion', 'Optional'],
      length: [{ value: '9h', tip: 'Main Story' }, { value: '13h', tip: 'Main + Extra' }, { value: '17h', tip: 'Completionist' }],
      languages: [
        { value: 'EN', native: true, voice: true },
        { value: 'FR', textOnly: true },
      ],
      title: 'Wyrmwatch: Ember Reckoning', titleUrl: 'https://example.com/wiki/Ember_Reckoning', titleDate: '2026-02-14',
      subtitle: 'Expansion',
      description: [
        ['A standalone expansion set alongside ', { emText: 'Wyrmwatch II (2019)' }, ', following a splinter watch as they hold a collapsing tower in the frontier’s ember basin.'],
      ],
      ratings: [{ label: 'Fixture rating source', score: '81', url: 'https://example.com/reviews/ember-reckoning' }],
      profileUrl: 'https://example.com/store/ember-reckoning',
      platforms: [
        { key: 'steam', paren: 'PC', url: 'https://example.com/store/ember-reckoning/steam' },
        { key: 'nintendo-switch-2', paren: 'Digital', url: 'https://example.com/store/ember-reckoning/switch2' },
      ],
      platformsUrl: 'https://example.com/store/ember-reckoning',
    },
  ] },
  { releases: [
    { mediaType: 'Game', chronoOrder: 350, recommendedOrder: 400, mainline: true, tags: ['Sequel'],
      languages: [
        { value: 'EN', native: true, voice: true },
        { value: 'JA', voice: true },
      ],
      title: 'Wyrmwatch III', titleUrl: 'https://example.com/wiki/Wyrmwatch_III', titleDate: '2027-03-18',
      profileUrl: 'https://example.com/store/wyrmwatch-iii',
      description: [
        'Warden Rook Ashvane returns to the Ashfall frontier after a decade of peace, as a new Blightswarm strain breaches the outer watchtowers.',
      ],
      platforms: [
        { key: 'steam', paren: 'PC', url: 'https://example.com/store/wyrmwatch-iii/steam' },
        { key: 'playstation5', paren: 'Digital', url: 'https://example.com/store/wyrmwatch-iii/ps5' },
        { key: 'xbox-xs', paren: 'Digital', url: 'https://example.com/store/wyrmwatch-iii/xbox' },
      ],
      platformsUrl: 'https://example.com/store/wyrmwatch-iii',
    },
  ] },
]};
