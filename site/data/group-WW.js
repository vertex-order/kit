// site/data/group-WW.js — kit's own fixture data (component gallery
// preview). Deleted by scripts/init-list.py when this repo is used as a
// template for a new list repo — see docs/init-list.md. Schema modeled on
// vertex-order/final-fantasy's site/data/group-*.js (the in-depth reference
// example); a real list repo should copy that repo's shape, not this one.
// Sections fixture: all three orders are sectioned, each with its own
// sections and its own membership (continuities in Narrative, eras in
// Chronological, release eras in Release), so every entry carries all
// three *Section fields. `releaseOrder` shows an integer year and
// year-month dates; the Reforged entry keeps its releaseOrderDate.
// schema: group.schema.json
window.__wwGroupReg['WW'] = { num: 'WW', chronoOrder: 100, narrativeOrder: 100, title: 'Wyrmwatch', url: 'https://example.com/wiki/Wyrmwatch_(franchise)', note: 'The flagship tactics series: bond with wild wyrms to hold the Ashfall frontier’s watchtowers.',
  sections: [
    { id: 'Saga', title: 'Wyrmwatch Saga', orders: ['narrative'], narrativeOrder: 10,
      note: 'The numbered games, in the order the story is best read.' },
    { id: 'Ashfall', title: 'Ashfall Cycle', orders: ['narrative'], narrativeOrder: 20,
      note: 'The Ashfall spin-offs: a self-contained arc set on the frontier.' },
    { id: 'Dawn', title: 'Age of Dawn', orders: ['chrono'], chronoOrder: 10 },
    { id: 'Embers', title: 'Age of Embers', orders: ['chrono'], chronoOrder: 20,
      note: 'Everything set while the watchtowers were still burning.' },
    { id: 'Rebirth', title: 'Age of Rebirth', orders: ['chrono'], chronoOrder: 30 },
    { id: 'Launch', title: 'First Wave', orders: ['release'], releaseOrder: 2014 },
    { id: 'Second', title: 'Second Wave', orders: ['release'], releaseOrder: '2019-05' },
    { id: 'Next', title: 'Next Wave', orders: ['release'], releaseOrder: '2026-02' }
  ],
  media: [
  { mediaType: 'Game', chronoOrder: 200, narrativeOrder: 100, narrativeSection: 'Saga', chronoSection: 'Embers', releaseSection: 'Launch',
    title: 'Wyrmwatch', titleUrl: 'https://example.com/wiki/Wyrmwatch', titleDate: '2014-03-11',
    by: ['Aldous Venn', 'Marit Okonkwo'],
    mediaDesc: [
      'Recruit-and-bond tactics RPG. Warden Rook Ashvane arrives at the Ashfall frontier and must bond with wild wyrms to hold the watchtowers against the Blightswarm.',
      'Includes a free rebalance patch and an optional hard difficulty added post-launch.',
    ],
    primary: { mainline: true, tags: [],
      length: [{ value: '22h', tip: 'Main Story' }, { value: '31h', tip: 'Main + Extra' }, { value: '50h', tip: 'Completionist' }],
      languages: [
        { value: 'EN', native: true, voice: true },
        { value: 'FR', voice: true },
        { value: 'DE', voice: true },
        { value: 'JA', voice: true },
      ],
      subtitle: 'Remaster', subtitleUrl: 'https://example.com/wiki/Wyrmwatch_Remaster', subtitleDate: 2022,
      profileUrl: 'https://example.com/store/wyrmwatch',
      versionDesc: [
        ['This remaster reworks lighting, remixes the soundtrack, redraws the UI, and adds a photo mode. Released as Wyrmwatch: Anniversary Remaster, also sold as ', { emText: 'Wyrmwatch: Warden’s Edition' }, ' in some regions.'],
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
        // search: no searchTitle/searchQualifier/searchSuffix override at all -- defaults to this row's own title ('Wyrmwatch') + the fan-movie catalog suffix ('game movie').
        { key: 'fan-movie', search: 'youtube' },
      ],
      platformsUrl: 'https://example.com/store/wyrmwatch',
      versions: [
        {
          // title omitted: inherits 'Wyrmwatch' (2014) wholesale from primary, which itself has no title override.
          subtitle: 'Mobile', subtitleUrl: 'https://example.com/wiki/Wyrmwatch_Mobile', subtitleDate: 2015,
          versionDesc: [
            ['A feature-phone port with simplified bonding menus and two bonding chapters cut for hardware limits. Released as ', { emText: 'Wyrmwatch Go' }, '.'],
          ],
          // Own `by` replaces the slot's wholesale; shown because it differs.
          by: [{ role: 'ported', names: { name: 'Pocket Forge', url: 'https://example.com/studios/pocket-forge' } }],
          languages: [{ value: 'EN', textOnly: true }],
          terminated: true,
          platforms: [
            { key: 'mobile-phone', paren: 'iOS; Android; Digital', terminated: true, jpTag: true },
            // search: no searchTitle given either -- defaults to the inherited 'Wyrmwatch' title (same chain as the title display above), narrowed with searchQualifier rather than retyping 'Wyrmwatch mobile' by hand.
            { key: 'fan-playthrough', search: 'youtube', searchQualifier: 'mobile' },
          ],
        },
        {
          // subtitle omitted: just its own title and link, no edition tag.
          title: 'Wyrmwatch', titleUrl: 'https://example.com/wiki/Wyrmwatch', titleDate: 2014,
          versionDesc: ['The original release, before the free rebalance patch and the 2022 remaster.'],
          languages: [{ value: 'EN', native: true, voice: true }],
          platforms: [
            { key: 'nintendo-wii-u', paren: 'Digital', terminated: true },
          ],
        },
      ],
    },
  },
  { mediaType: 'Game', chronoOrder: 250, narrativeOrder: 300, narrativeSection: 'Ashfall', chronoSection: 'Embers', releaseSection: 'Launch',
    title: 'Wyrmwatch: Ashfall Uprising', titleUrl: 'https://example.com/wiki/Ashfall_Uprising', titleDate: '2015-06-02',
    mediaDesc: [
      ['Standalone expansion set ', { emText: 'immediately after' }, ' the base game — the Blightswarm regroups beyond the watchtowers.'],
    ],
    primary: { tags: ['Expansion', 'Optional'],
      length: [{ value: '8h', tip: 'Main Story' }, { value: '11h', tip: 'Main + Extra' }, { value: '14h', tip: 'Completionist' }],
      languages: [
        { value: 'EN', native: true, voice: true },
        { value: 'FR', textOnly: true },
      ],
      subtitle: 'Expansion',
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
  },
  { mediaType: 'Game', chronoOrder: 50, narrativeOrder: 200, narrativeSection: 'Saga', chronoSection: 'Dawn', releaseSection: 'Second',
    title: 'Wyrmwatch II', titleUrl: 'https://example.com/wiki/Wyrmwatch_II', titleDate: '2019-05-14',
    // Slot-level credits are inherited by the primary, every alt and every
    // versions[] item; a row only displays them when they differ from its
    // parent's (here: the primary, and the Remake alt that overrides them).
    by: [{ role: 'directed', names: { name: 'Katie Sorrel', url: 'https://example.com/people/katie-sorrel' } }, { role: 'written', names: 'Charles Whitlock' }],
    mediaDesc: [
      'Set decades before the original: young warden-in-training Isolde Marrow first tames a wyrm.',
      'Adds a mounted-flight traversal layer and a wyrm-breeding metagame on top of the original’s bonding and tactics systems.',
    ],
    primary: { mainline: true, tags: ['Prequel', { abbrTerm: 'RPG', abbrDef: 'Role-Playing Game' }, 'Single-player'],
      length: [{ value: '26h', tip: 'Main Story' }, { value: '35h', tip: 'Main + Extra' }, { value: '55h', tip: 'Completionist' }],
      languages: [
        { value: 'EN', native: true, voice: true },
        { value: 'JA', voice: true },
        { value: 'FR', voice: true },
        { value: 'DE', textOnly: true },
        { value: 'ES', textOnly: true },
      ],
      subtitle: 'Edit', subtitleUrl: 'https://example.com/wiki/Wyrmwatch_II#Edit', subtitleDate: 2021,
      profileUrl: 'https://example.com/store/wyrmwatch-ii',
      versionDesc: [
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
          // subtitle omitted: just its own title and link, no edition tag.
          title: 'Wyrmwatch II', titleUrl: 'https://example.com/wiki/Wyrmwatch_II', titleDate: 2019,
          versionDesc: ['The original release, before the Hard difficulty and New Game+ edit.'],
        },
      ],
    },
    alts: [
      {
        // title omitted: inherits 'Wyrmwatch II' (2019) wholesale from the slot root.
        subtitle: 'Remake', subtitleUrl: 'https://example.com/wiki/Wyrmwatch_II_Reborn', subtitleDate: 2024,
        by: [{ role: 'directed', names: 'Naomi Reyes' }, { role: 'written', names: 'Charles Whitlock' }],
        versionDesc: [
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
      {
        // title omitted: inherits 'Wyrmwatch II' (2019) wholesale from the slot root.
        subtitle: 'Definitive Edition', subtitleUrl: 'https://example.com/wiki/Wyrmwatch_II_Definitive_Edition', subtitleDate: 2020,
        versionDesc: [
          'Bundles the base game with every pre-order bonus and a director’s commentary track, with no gameplay changes.',
        ],
        languages: [
          { value: 'EN', native: true, voice: true },
          { value: 'JA', voice: true },
        ],
        profileUrl: 'https://example.com/store/wyrmwatch-ii-definitive',
        ratings: [{ label: 'Fixture rating source', score: '85', url: 'https://example.com/reviews/wyrmwatch-ii-definitive' }],
        platforms: [
          { key: 'playstation4', paren: 'Digital', url: 'https://example.com/store/wyrmwatch-ii-definitive/ps4' },
        ],
        versions: [
          {
            // subtitle omitted: just its own title and link, no edition tag.
            title: 'Wyrmwatch II: Definitive Edition (Early Access)', titleUrl: 'https://example.com/wiki/Wyrmwatch_II_Definitive_Edition',
            by: null, // explicit "no credits" (this build has none to show)
            versionDesc: ['An early-access build sold briefly ahead of the full release, missing the director’s commentary track.'],
            platforms: [
              { key: 'steam', paren: 'PC; Early Access', terminated: true },
            ],
          },
        ],
      },
    ],
  },
  { mediaType: 'Game', chronoOrder: 55, narrativeOrder: 205, narrativeSection: 'Ashfall', chronoSection: 'Dawn', releaseSection: 'Launch',
    // The renamed 2025 release is the primary (it's the name readers search
    // for), but the game first came out in 2015 -- `releaseOrderDate` makes
    // the release-order modes sort it with the 2015 entries instead of
    // among the 2025 ones, and those modes add ", sorted as 2015-11-03" to
    // the year's tooltip. Heading year and anchor stay on `titleDate`.
    title: 'Wyrmwatch: Ashfall Reforged', titleUrl: 'https://example.com/wiki/Ashfall_Reforged', titleDate: '2025-04-22', releaseOrderDate: '2015-11-03',
    mediaDesc: [
      'A short side story following a lone scout who rides the first wyrm through the Ashfall frontier, told between the events of the original and its sequel.',
    ],
    primary: { tags: ['Optional'],
      length: [{ value: '6h', tip: 'Main Story' }, { value: '9h', tip: 'Main + Extra' }],
      languages: [
        { value: 'EN', native: true, textOnly: true },
      ],
      subtitle: 'Remaster', subtitleUrl: 'https://example.com/wiki/Ashfall_Reforged#Remaster', subtitleDate: 2025,
      versionDesc: [
        'Renamed for its 2025 re-release, with an HD pass and no story changes.',
      ],
      profileUrl: 'https://example.com/store/ashfall-reforged',
      platforms: [
        { key: 'steam', paren: 'PC', url: 'https://example.com/store/ashfall-reforged/steam' },
      ],
      versions: [
        {
          title: 'Wyrmwatch: Ashfall', titleUrl: 'https://example.com/wiki/Ashfall_Reforged', titleDate: '2015-11-03',
          versionDesc: ['The original release, before the rename.'],
        },
      ],
    },
  },
  { mediaType: 'Game', chronoOrder: 260, narrativeOrder: 350, narrativeSection: 'Ashfall', chronoSection: 'Embers', releaseSection: 'Next',
    title: 'Wyrmwatch: Ember Reckoning', titleUrl: 'https://example.com/wiki/Ember_Reckoning', titleDate: '2026-02-14',
    mediaDesc: [
      ['A standalone expansion set alongside ', { emText: 'Wyrmwatch II (2019)' }, ', following a splinter watch as they hold a collapsing tower in the frontier’s ember basin.'],
    ],
    primary: { tags: ['Expansion', 'Optional'],
      length: [{ value: '9h', tip: 'Main Story' }, { value: '13h', tip: 'Main + Extra' }, { value: '17h', tip: 'Completionist' }],
      languages: [
        { value: 'EN', native: true, voice: true },
        { value: 'FR', textOnly: true },
      ],
      subtitle: 'Expansion',
      ratings: [{ label: 'Fixture rating source', score: '81', url: 'https://example.com/reviews/ember-reckoning' }],
      profileUrl: 'https://example.com/store/ember-reckoning',
      platforms: [
        { key: 'steam', paren: 'PC', url: 'https://example.com/store/ember-reckoning/steam' },
        { key: 'nintendo-switch-2', paren: 'Digital', url: 'https://example.com/store/ember-reckoning/switch2' },
      ],
      platformsUrl: 'https://example.com/store/ember-reckoning',
    },
  },
  { mediaType: 'Game', chronoOrder: 350, narrativeOrder: 400, narrativeSection: 'Saga', chronoSection: 'Rebirth', releaseSection: 'Next',
    title: 'Wyrmwatch III', titleUrl: 'https://example.com/wiki/Wyrmwatch_III', titleDate: '2027-03-18',
    mediaDesc: [
      'Warden Rook Ashvane returns to the Ashfall frontier after a decade of peace, as a new Blightswarm strain breaches the outer watchtowers.',
    ],
    primary: { mainline: true, tags: ['Sequel'],
      languages: [
        { value: 'EN', native: true, voice: true },
        { value: 'JA', voice: true },
      ],
      profileUrl: 'https://example.com/store/wyrmwatch-iii',
      platforms: [
        { key: 'steam', paren: 'PC', url: 'https://example.com/store/wyrmwatch-iii/steam' },
        { key: 'playstation5', paren: 'Digital', url: 'https://example.com/store/wyrmwatch-iii/ps5' },
        { key: 'xbox-xs', paren: 'Digital', url: 'https://example.com/store/wyrmwatch-iii/xbox' },
      ],
      platformsUrl: 'https://example.com/store/wyrmwatch-iii',
    },
  },
]};
