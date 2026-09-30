// site/data/index.js — kit's own fixture data (component gallery preview).
// Deleted by scripts/init-list.py when this repo is used as a template for a
// new list repo — see docs/init-list.md. A real list repo writes its own
// index.js/group-*.js from scratch using final-fantasy's or kingdom-hearts'
// site/data/ as the schema reference; this fixture exists only so kit's own
// page.dc.html has something to render in preview.
//
// One entry per group file, in display order. Add/remove a group by editing
// this list. Classic script (not an ES module) so it also loads over file://
// — browsers block module/import and fetch on file://, but plain <script src>
// tags still work.
// schema: index.schema.json
var GROUP_ORDER = [
  "WW",
  "CH",
  "TAC"
];

// Each group-*.js assigns its object here as `window.__wwGroupReg['<slug>'] = {...}`.
window.__wwGroupReg = window.__wwGroupReg || {};

// Resolve group-*.js against this file's own location (…/data/), captured now
// because document.currentScript is null inside the async callbacks below.
var _indexScript = document.currentScript;
var DATA_BASE = _indexScript
  ? _indexScript.src.replace(/[^/]*$/, "")
  : new URL("data/", document.baseURI).href;

function _loadGroup(slug) {
  return new Promise(function (resolve, reject) {
    if (window.__wwGroupReg[slug]) return resolve();
    var el = document.createElement("script");
    el.src = DATA_BASE + "group-" + slug + ".js";
    el.onload = function () { resolve(); };
    el.onerror = function () { reject(new Error("failed to load group-" + slug + ".js")); };
    document.head.appendChild(el);
  });
}

window.loadAllGroups = function loadAllGroups() {
  return Promise.all(GROUP_ORDER.map(_loadGroup)).then(function () {
    return GROUP_ORDER.map(function (slug) { return window.__wwGroupReg[slug]; });
  });
};
