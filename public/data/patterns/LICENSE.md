# Pattern Explorer data — sources and licenses

Built by `scripts/build-patterns.mjs`.

| File | Source | License |
|---|---|---|
| `arcs.json`, `connections/*.json` | OpenBible.info cross-references (the 60,000 most-voted of ~340,000) | CC BY 4.0 — https://www.openbible.info/labs/cross-references/ |
| `quotes.json` | Free Use Bible API (bible.helloao.org), “quoting passages” data | Public domain / free use |
| `people-web.json`, `line.json` | Theographic Bible Metadata (people and verse data) | CC BY-SA 4.0 — https://github.com/robertrouse/theographic-bible-metadata |

`people-web.json` and `line.json` are adaptations of Theographic data and are shared under the same license (CC BY-SA 4.0).

Curated content (themes, promises, patterns, covenants, names of God, places) is original WL writing in `src/lib/patterns/`.
