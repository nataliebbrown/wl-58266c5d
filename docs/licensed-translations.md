# Licensed Bible translations — to revisit

Translation Bridge's **Versions** view currently shows the free translations we can use today:
YLT, KJV, ESV (via the ESV API key), BSB, NET, BBE, and T4T.

These popular translations were requested but are copyrighted and need permission from the
publisher before they can be shown in WL. They're listed in code at
`LICENSED_TRANSLATIONS` in `src/lib/translations.ts`, and the Versions view is built so they can
be added to `ENGLISH_TRANSLATIONS` once access is granted.

| Translation | Publisher | Likely route |
|---|---|---|
| **NKJV** — New King James Version | Thomas Nelson (HarperCollins Christian Publishing) | API.Bible (American Bible Society); publisher approval required |
| **NIV** — New International Version | Biblica / Zondervan | Biblica licensing, or API.Bible with approval |
| **CSB** — Christian Standard Bible | Holman Bible Publishers (Lifeway) | API.Bible, or direct permission from Holman |
| **NLT** — New Living Translation | Tyndale House Publishers | Tyndale's NLT API (developer key + terms), or API.Bible |
| **MSG** — The Message | NavPress (Tyndale) | Direct permission from NavPress/Tyndale |

Notes:
- Each publisher sets its own limits (number of verses shown at once, attribution wording,
  commercial vs. non-commercial use). Check the terms before going live.
- API.Bible requires an account and an application describing the app; some versions are only
  available to approved partners.
- When access is granted, add a fetcher for that API in `src/lib/translations.ts`
  (`fetchVerse`) and an entry in `ENGLISH_TRANSLATIONS` with its approach on the spectrum.
