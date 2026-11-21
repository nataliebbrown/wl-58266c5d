# Pattern Explorer — content review

Everything written by hand in Pattern Explorer starts as a **draft** and stays hidden from users until it is reviewed.
The data-driven views (Connections arc web, OT in the NT, the promised line itself, Word threads, People web, and the strongest-links list in the Cross-refs tab) come straight from open datasets and are live now.

## How to review

1. Open the app with `?drafts=1` once (e.g. `/patterns?drafts=1`). Drafts appear with a **Draft** badge. `?drafts=0` turns preview off.
2. Read each item below. Check every Bible reference, and that the “What this reveals about God” line is faithful to the text.
3. To publish an item, set `reviewed: true` on it in the file listed. The tests check that every reference points to a real verse and that its label matches.

## Judgment calls to look at first

- **Promise links marked “a traditional Christian reading”** (not made explicitly by the New Testament): The serpent crusher, Joseph: rejected, then exalted, The scarlet cord, The kinsman-redeemer, The champion who fights for his people, The Beloved and His bride.
- **Promised-line markers**: the Adam marker calls Genesis 3:15 a traditional Christian reading.
- **Promised-line notes** (shown live, factual): Matthew’s shortened genealogy, Luke’s line through Nathan, and Zerubbabel as son of Shealtiel or Pedaiah.
- **“Forty”** carries a caveat against reading hidden codes into numbers.
- **Covenants** carry a note that traditions (e.g. covenant theology and dispensationalism) relate them differently.
- **Compound names of God** (YHWH Yireh, Nissi, Shalom, Tsidkenu): STEPBible tags these as two words, so the word study opens the distinctive second word (see, banner, peace, righteousness).

## Themes (20) — `src/lib/patterns/themes.ts`

- [ ] God’s presence with His people (`presence`)
- [ ] The Lamb and the sacrifice (`lamb`)
- [ ] The promised offspring (`offspring`)
- [ ] King and kingdom (`kingdom`)
- [ ] Exodus and redemption (`exodus`)
- [ ] The Shepherd (`shepherd`)
- [ ] Bread from heaven (`bread`)
- [ ] Living water (`water`)
- [ ] Light in the darkness (`light`)
- [ ] Rest (`rest`)
- [ ] The Spirit of God (`spirit`)
- [ ] The wilderness (`wilderness`)
- [ ] Exile and homecoming (`exile-return`)
- [ ] Priest and mediator (`priest`)
- [ ] Garden and new creation (`new-creation`)
- [ ] Bride and Bridegroom (`bride`)
- [ ] The firstborn (`firstborn`)
- [ ] The mountain of God (`mountain`)
- [ ] The name of the LORD (`name`)
- [ ] The glory of God (`glory`)

## Promise and fulfillment (42) — `src/lib/patterns/promises.ts`

- [ ] The serpent crusher (`first-gospel`) — traditional reading, prophecy
- [ ] All nations blessed (`blessing-nations`) — made by the NT, prophecy
- [ ] Melchizedek, priest and king (`melchizedek`) — made by the NT, type
- [ ] The beloved son on the mountain (`isaac`) — made by the NT, type
- [ ] The ladder to heaven (`jacobs-ladder`) — made by the NT, type
- [ ] Joseph: rejected, then exalted (`joseph`) — traditional reading, type
- [ ] The Passover Lamb (`passover`) — made by the NT, type
- [ ] Bread from heaven (`manna`) — made by the NT, type
- [ ] Water from the rock (`rock`) — made by the NT, type
- [ ] God’s dwelling (`tabernacle`) — made by the NT, type
- [ ] The Day of Atonement (`atonement`) — made by the NT, type
- [ ] The bronze serpent (`serpent`) — made by the NT, type
- [ ] A prophet like Moses (`prophet`) — made by the NT, prophecy
- [ ] The scarlet cord (`rahab`) — traditional reading, type
- [ ] The kinsman-redeemer (`boaz`) — traditional reading, type
- [ ] The champion who fights for his people (`david-goliath`) — traditional reading, type
- [ ] David’s everlasting throne (`davids-son`) — made by the NT, prophecy
- [ ] “You are My Son” (`ps2`) — made by the NT, prophecy
- [ ] Not abandoned to the grave (`ps16`) — made by the NT, prophecy
- [ ] The forsaken sufferer (`ps22`) — made by the NT, prophecy
- [ ] Zeal for God’s house (`ps69`) — made by the NT, prophecy
- [ ] The LORD says to my Lord (`ps110`) — made by the NT, prophecy
- [ ] The rejected cornerstone (`ps118`) — made by the NT, prophecy
- [ ] Immanuel (`immanuel`) — made by the NT, prophecy
- [ ] Light in Galilee (`galilee-light`) — made by the NT, prophecy
- [ ] A voice in the wilderness (`voice`) — made by the NT, prophecy
- [ ] The suffering Servant (`servant`) — made by the NT, prophecy
- [ ] Good news to the poor (`good-news`) — made by the NT, prophecy
- [ ] The new covenant (`new-covenant`) — made by the NT, prophecy
- [ ] One like a son of man (`son-of-man`) — made by the NT, prophecy
- [ ] Out of Egypt (`out-of-egypt`) — made by the NT, type
- [ ] The Spirit poured out (`spirit-poured`) — made by the NT, prophecy
- [ ] The sign of Jonah (`jonah`) — made by the NT, type
- [ ] A ruler from Bethlehem (`bethlehem`) — made by the NT, prophecy
- [ ] The humble King on a donkey (`humble-king`) — made by the NT, prophecy
- [ ] The one they pierced (`pierced`) — made by the NT, prophecy
- [ ] The messenger before the Lord (`messenger`) — made by the NT, prophecy
- [ ] The first and last Adam (`adam`) — made by the NT, type
- [ ] Saved through water (`flood`) — made by the NT, type
- [ ] Blood that speaks (`abel`) — made by the NT, type
- [ ] “I AM” (`i-am`) — made by the NT, type
- [ ] The Beloved and His bride (`song`) — traditional reading, type

## Repeated patterns (8) — `src/lib/patterns/stories.ts`

- [ ] Barren women who give birth (`barren`)
- [ ] The younger over the older (`younger`)
- [ ] Forty days and forty years (`forty`)
- [ ] On the third day (`third-day`)
- [ ] Meetings at a well (`wells`)
- [ ] Mountain encounters with God (`mountains`)
- [ ] God lifts the lowly (`lowly-lifted`)
- [ ] Passing through the waters (`water-crossings`)

## Covenants (5) — `src/lib/patterns/stories.ts`

- [ ] The covenant with Noah (`noah`)
- [ ] The covenant with Abraham (`abraham`)
- [ ] The covenant at Sinai (`sinai`)
- [ ] The covenant with David (`david`)
- [ ] The new covenant (`new`)

## Names of God (15) — `src/lib/patterns/stories.ts`

- [ ] Elohim (`elohim`, H0430)
- [ ] YHWH (the LORD) (`yhwh`, H3068)
- [ ] Adonai (`adonai`, H0136)
- [ ] El Elyon (`el-elyon`, H5945)
- [ ] El Roi (`el-roi`, H7210)
- [ ] El Shaddai (`el-shaddai`, H7706)
- [ ] YHWH Yireh (`yhwh-yireh`, H7200)
- [ ] YHWH Rapha (`yhwh-rapha`, H7495)
- [ ] YHWH Nissi (`yhwh-nissi`, H5251)
- [ ] YHWH Shalom (`yhwh-shalom`, H7965)
- [ ] YHWH Tsebaoth (`yhwh-tsebaoth`, H6635)
- [ ] YHWH Roi (`yhwh-roi`, H7462)
- [ ] YHWH Tsidkenu (`yhwh-tsidkenu`, H6664)
- [ ] Immanuel (`immanuel`, H6005)
- [ ] Abba, Father (`abba`, G0005)

## Places through the story (9) — `src/lib/patterns/stories.ts`

- [ ] Bethlehem (`bethlehem`)
- [ ] Bethel (`bethel`)
- [ ] Mount Moriah (`moriah`)
- [ ] Jerusalem (`jerusalem`)
- [ ] Egypt (`egypt`)
- [ ] The Jordan River (`jordan`)
- [ ] Shechem (`shechem`)
- [ ] Babylon (`babylon`)
- [ ] Mount Sinai (Horeb) (`sinai`)

## Promised-line markers (8) — `src/lib/patterns/stories.ts`

- [ ] Adam
- [ ] Noah
- [ ] Abraham
- [ ] Isaac
- [ ] Jacob
- [ ] Judah
- [ ] David
- [ ] Jesus
