// Owned by vertex-order/kit — edit here. Vendored elsewhere via sync.toml;
// don't edit the copy there.
//
// Fixed lookup tables `page.dc.html`'s resolveRating/resolvePl/mapLangs
// merge an entry's own fields against, so an entry states a `kind`/language
// code instead of repeating that kind's label text verbatim. Extend these
// when a new language code or rating source shows up in data — no runtime
// logic to touch.
//
// Classic script (not a module) so it loads via a plain <script src>.

// Plain display name per language code — LanguageTag's tooltip is this name
// plus an auto " — full audio" / " — text only" suffix from an entry's own
// `voice`/`textOnly` flags (see mapLangs in page.dc.html); an entry only
// states its own `tip` for something a flag can't capture (fan-translation
// credits, "content up to", etc.), used verbatim with no suffix appended.
window.LANGUAGE_NAMES = {
  JA: 'Japanese',
  EN: 'English',
  'EN-US': 'English (US)',
  'EN-GB': 'English (British)',
  FR: 'French',
  'FR-CA': 'French (Canada)',
  DE: 'German',
  IT: 'Italian',
  KO: 'Korean',
  ES: 'Spanish',
  'ES-ES': 'Spanish (Spain)',
  'ES-419': 'Spanish (Latin America)',
  PT: 'Portuguese',
  'PT-BR': 'Portuguese (Brazil)',
  'PT-PT': 'Portuguese (Portugal)',
  RU: 'Russian',
  TH: 'Thai',
  PL: 'Polish',
  AR: 'Arabic',
  ID: 'Indonesian',
  HI: 'Hindi',
  HU: 'Hungarian',
  CS: 'Czech',
  SV: 'Swedish',
  FA: 'Persian',
  UK: 'Ukrainian',
  EL: 'Greek',
  FI: 'Finnish',
  'ZH-CN': 'Simplified Chinese',
  'ZH-TW': 'Traditional Chinese',
  '…?': 'Unknown additional languages',
};

// Rating label boilerplate per `kind` — see resolveRating in page.dc.html.
// Two shapes share this table: a `rating.scores[i].kind` entry (score-link
// mode) reads only `.label` — one independent kind per score, so a
// mixed-source rating (e.g. IMDb critic + Metacritic user) just lists two
// differently-kinded scores instead of needing a combo kind. A top-level
// `rating.kind` in badge mode (`rating.textOnly`) reads `abbrTerm`/`abbrDef`
// instead; `abbrTermLinked`/`abbrTermPlain` are derived from whether `url`
// is set.
window.RATING_KINDS = {
  metacritic: { label: 'Metacritic' },
  'metacritic-user': { label: 'Metacritic User Score' },
  imdb: { label: 'IMDb' },
  goodreads: { label: 'Goodreads' },
  nyr: { abbrTerm: 'NYR', abbrDef: 'Not Yet Rated', textOnly: true },
  tbd: { abbrTerm: 'TBD', abbrDef: 'To Be Determined', textOnly: true },
};

// Steam review-adjective abbreviation shown on a `kind: 'steam'` score
// (the abbreviation is the score's own `score` value) -> the full word(s)
// used in its tooltip (`Steam; <full text>`).
window.STEAM_REVIEW_LABELS = {
  VP: 'Very Positive',
  MP: 'Mostly Positive',
  OP: 'Overwhelmingly Positive',
};
