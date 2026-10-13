// site/data/group-EXT.js — kit's own fixture data (component gallery
// preview). Deleted by scripts/init-list.py when this repo is used as a
// template for a new list repo — see docs/init-list.md.
// Tags fixture: a group with no sections, every order flat, and one entry for
// each of the less common tags (Alternate Universe, Fan-made, Prologue + Demo
// with the Demo subtitle, Incomplete, Mashup, Spin-off). No marker tag: every
// entry here reads as Optional, since this list marks Essential instead.
// schema: group.schema.json
window.__wwGroupReg['EXT'] = { num: 'EXT', chronoOrder: 900, narrativeOrder: 900, title: 'Wyrmwatch Extras', note: 'Odds and ends around the frontier: official retellings, fan work, a demo with a story of its own, and a crossover. None of it is needed for the main story.', media: [
  { mediaType: 'Comic', chronoOrder: 910, narrativeOrder: 910,
    title: 'Wyrmwatch: Shattered Frontier', titleUrl: 'https://example.com/wiki/Shattered_Frontier', titleDate: '2021-05-14',
    by: [{ role: 'written', names: 'Marit Okonkwo' }, { role: 'illustrated', names: 'Tobias Lindqvist' }],
    mediaDesc: [
      ['An official manga retelling of the first game in which the watchtowers fall early and the wyrms choose their own wardens.'],
    ],
    primary: { tags: ['Alternate Universe', 'Manga'],
      subtitle: 'Comic',
      length: '4 volumes',
      languages: [{ value: 'EN', native: true }, { value: 'JA', tip: 'Japanese — text only' }],
      platforms: [{ key: 'book', name: 'Manga', url: 'https://example.com/store/shattered-frontier' }],
    },
  },
  { mediaType: 'Comic', chronoOrder: 920, narrativeOrder: 920,
    title: 'Wyrmwatch: Watchtower Tales', titleUrl: 'https://example.com/webcomic/watchtower-tales', titleDate: '2018-09-01',
    by: 'Dana Pruitt',
    mediaDesc: [
      ['A fan-drawn webcomic following the night shift at a remote watchtower.'],
    ],
    primary: { tags: ['Fan-made', 'Webcomic', 'Free'],
      subtitle: 'Comic',
      languages: [{ value: 'EN', native: true }],
      platforms: [{ key: 'globe', name: 'Website', url: 'https://example.com/webcomic/watchtower-tales' }],
    },
  },
  { mediaType: 'Game', chronoOrder: 930, narrativeOrder: 930,
    title: 'Wyrmwatch III: Ashen Gate Prologue', titleUrl: 'https://example.com/wiki/Ashen_Gate_Prologue', titleDate: '2026-12-05',
    mediaDesc: [
      ['Warden Rook Ashvane crosses the Ashen Gate a decade before the third game, in a short story built on the same engine.'],
    ],
    primary: { tags: ['Prologue', 'Demo'],
      subtitle: 'Demo',
      length: [{ value: '1h', tip: 'Main Story' }],
      languages: [{ value: 'EN', native: true, voice: true }],
      platforms: [{ key: 'steam', paren: 'PC; Digital', url: 'https://example.com/store/ashen-gate-prologue' }],
    },
  },
  { mediaType: 'Comic', chronoOrder: 940, narrativeOrder: 940,
    title: 'Wyrmwatch: The Warden Diaries', titleUrl: 'https://example.com/wiki/The_Warden_Diaries', titleDate: { start: '2016-03', end: '2016-08' },
    by: [{ role: 'written', names: 'Julie Ferren' }, { role: 'illustrated', names: 'Katie Sorrel' }],
    mediaDesc: [
      ['A serialized manga about the wardens-in-training of the frontier.'],
    ],
    primary: { tags: ['Manga', 'Incomplete'],
      subtitle: 'Comic',
      length: '3 issues',
      languages: [{ value: 'JA', native: true }, { value: 'EN', tip: 'English — fan translation' }],
      platforms: [{ key: 'fan-recap', search: 'youtube', searchTitle: 'Wyrmwatch The Warden Diaries' }],
    },
  },
  { mediaType: 'Game', chronoOrder: 950, narrativeOrder: 950,
    title: 'Wyrmwatch Rally', titleUrl: 'https://example.com/wiki/Wyrmwatch_Rally', titleDate: '2023-07-20',
    mediaDesc: [
      ['A kart racer where wyrm riders from the frontier race against characters borrowed from several other franchises.'],
    ],
    primary: { tags: ['Spin-off', 'Mashup', 'Mobile', 'Free-to-play'],
      length: [{ value: '10h', tip: 'Main Story' }],
      languages: [{ value: 'EN', native: true }],
      platforms: [
        { key: 'mobile-phone', paren: 'iOS; Android; Digital', url: 'https://example.com/store/wyrmwatch-rally' },
      ],
    },
  },
] };
