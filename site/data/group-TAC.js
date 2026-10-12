// site/data/group-TAC.js — kit's own fixture data (component gallery
// preview). Deleted by scripts/init-list.py when this repo is used as a
// template for a new list repo — see docs/init-list.md.
// Sections fixture: one section list shared by two orders. Chronological and
// Release use the same sections (each carries both order values) with
// the same membership; Narrative stays flat, so no entry sets narrativeSection.
// schema: group.schema.json
window.__wwGroupReg['TAC'] = { num: 'TAC', chronoOrder: 700, narrativeOrder: 700, title: 'Wyrmwatch Tactics', note: 'A turn-based tactics spin-off — entirely optional, no bearing on the main story.',
  sections: [
    { id: 'Base', title: 'Base Game', orders: ['chrono', 'release'], chronoOrder: 10, releaseOrder: 2021,
      note: 'The original game and its content pack.' },
    { id: 'Remaster', title: 'Remaster', orders: ['chrono', 'release'], chronoOrder: 20, releaseOrder: '2027-09' }
  ],
  media: [
  { chronoOrder: 800, narrativeOrder: 710, mediaType: 'Game', chronoSection: 'Base', releaseSection: 'Base',
    title: 'Wyrmwatch Tactics', titleUrl: 'https://example.com/wiki/Wyrmwatch_Tactics', titleDate: '2021-08-17',
    // A single bare object; an in-page '#...' url opens in the same tab.
    by: { name: 'Emberfall Studio', url: '#group-WW' },
    mediaDesc: ['A grid-based spin-off starring the Ashfall watch’s rank-and-file wardens, squad by squad, unconnected to the mainline story.'],
    primary: { tags: ['Turn-Based', 'Optional'],
      length: [{ value: '12h', tip: 'Main Story' }, { value: '16h', tip: 'Main + Extra' }, { value: '24h', tip: 'Completionist' }],
      languages: [
        { value: 'EN', native: true, textOnly: true },
        { value: 'DE', textOnly: true },
      ],
      ratings: [{ label: 'Fixture rating source', score: '73', url: 'https://example.com/reviews/wyrmwatch-tactics' }],
      profileUrl: 'https://example.com/store/wyrmwatch-tactics',
      platforms: [
        { key: 'nintendo-switch', paren: 'Digital', url: 'https://example.com/store/wyrmwatch-tactics/switch' },
        { key: 'mobile-phone', paren: 'iOS; Android; Digital', url: 'https://example.com/store/wyrmwatch-tactics/mobile' },
      ],
      platformsUrl: 'https://example.com/store/wyrmwatch-tactics',
    },
  },
  { chronoOrder: 850, narrativeOrder: 720, mediaType: 'Game', chronoSection: 'Base', releaseSection: 'Base',
    title: 'Wyrmwatch Tactics: Skirmish Pack', titleUrl: 'https://example.com/wiki/Skirmish_Pack', titleDate: '2022-02-09',
    mediaDesc: [
      ['Adds a versus-only skirmish mode on top of ', { emText: 'Wyrmwatch Tactics (2021)' }, '.'],
    ],
    primary: { tags: ['DLC', 'Optional'],
      length: [{ value: '3h', tip: 'Main Story' }, { value: '5h', tip: 'Main + Extra' }, { value: '7h', tip: 'Completionist' }],
      subtitle: 'DLC',
      ratings: [{ label: 'Fixture rating source', score: '6.9', url: 'https://example.com/reviews/skirmish-pack' }],
      platforms: [
        { key: 'nintendo-switch', paren: 'Digital', url: 'https://example.com/store/skirmish-pack/switch' },
        { key: 'mobile-phone', paren: 'iOS; Android; Digital', url: 'https://example.com/store/skirmish-pack/mobile' },
      ],
      platformsUrl: 'https://example.com/store/wyrmwatch-tactics',
    },
  },
  { chronoOrder: 800, narrativeOrder: 705, mediaType: 'Game', chronoSection: 'Remaster', releaseSection: 'Remaster',
    title: 'Wyrmwatch Tactics', titleUrl: 'https://example.com/wiki/Wyrmwatch_Tactics', titleDate: '2027-09-10',
    mediaDesc: [
      'A grid-based spin-off starring the Ashfall watch’s rank-and-file wardens, squad by squad, unconnected to the mainline story.',
    ],
    primary: { tags: ['Turn-Based', 'Optional'],
      languages: [
        { value: 'EN', native: true, textOnly: true },
        { value: 'DE', textOnly: true },
      ],
      subtitle: 'Remaster', subtitleUrl: 'https://example.com/wiki/Wyrmwatch_Tactics_Remaster', subtitleDate: 2027,
      versionDesc: [
        'This remaster rebuilds the game in HD with reworked lighting and a remixed soundtrack, with no changes to gameplay or story.',
      ],
      profileUrl: 'https://example.com/store/wyrmwatch-tactics-remaster',
      platforms: [
        { key: 'nintendo-switch-2', paren: 'Digital', url: 'https://example.com/store/wyrmwatch-tactics-remaster/switch2' },
        { key: 'mobile-phone', paren: 'iOS; Android; Digital', url: 'https://example.com/store/wyrmwatch-tactics-remaster/mobile' },
      ],
      platformsUrl: 'https://example.com/store/wyrmwatch-tactics-remaster',
    },
  },
]};
