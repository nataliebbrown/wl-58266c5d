import { getQuizData } from '@/lib/onboardingState';
import type { ReadingHistoryEntry } from '@/lib/bibleApi';

// ============ Types ============

export interface BibleRecommendation {
  book: string;
  chapter: number;
  label: string;
  reason: string;
}

// ============ Chapter Connection Map ============
// Maps popular Bible chapters to related passages. When the user has a current
// reading, we look it up here to show context-aware recommendations instead of
// the generic persona × season pair.

interface ChapterConnection {
  book: string;
  chapter: number;
  label: string;
  connectionType: 'cross-reference' | 'thematic' | 'narrative' | 'contrast';
  reason: string;
}

const CHAPTER_CONNECTIONS: Record<string, ChapterConnection[]> = {
  // ── Old Testament Narratives ────────────────────────────
  'Genesis|1': [
    { book: 'John', chapter: 1, label: 'John 1', connectionType: 'cross-reference', reason: 'Genesis opens with "In the beginning, God created" — John opens with "In the beginning was the Word." John reveals that the Word who was with God is the one through whom all things were made.' },
    { book: 'Psalms', chapter: 8, label: 'Psalm 8', connectionType: 'thematic', reason: 'Genesis 1 describes humanity made in God\'s image. Psalm 8 marvels at that same truth — "What is mankind that you are mindful of them?" — and worships the Creator for it.' },
    { book: 'Colossians', chapter: 1, label: 'Colossians 1', connectionType: 'cross-reference', reason: 'Genesis 1 says God created all things. Colossians 1 reveals they were created through Christ and for Christ — "in Him all things hold together."' },
  ],
  'Genesis|12': [
    { book: 'Hebrews', chapter: 11, label: 'Hebrews 11', connectionType: 'cross-reference', reason: 'Genesis 12 records Abraham leaving everything on God\'s promise. Hebrews 11 celebrates that step of faith — "he went out, not knowing where he was going" — and places it in the great cloud of witnesses.' },
    { book: 'Galatians', chapter: 3, label: 'Galatians 3', connectionType: 'cross-reference', reason: 'The promise God makes to Abraham in Genesis 12 — "all nations will be blessed through you" — is the foundation Paul builds on in Galatians 3 to show that justification by faith was always God\'s plan.' },
    { book: 'Romans', chapter: 4, label: 'Romans 4', connectionType: 'thematic', reason: 'Abraham believed God in Genesis 12, and Romans 4 unpacks why that matters — his faith was "credited as righteousness," making him the paradigm for everyone who trusts God\'s promises.' },
  ],
  'Genesis|22': [
    { book: 'Hebrews', chapter: 11, label: 'Hebrews 11', connectionType: 'cross-reference', reason: 'Genesis 22\'s test of Abraham is singled out in Hebrews 11 as the pinnacle of faith — "he considered that God was able even to raise him from the dead."' },
    { book: 'Romans', chapter: 8, label: 'Romans 8', connectionType: 'thematic', reason: 'Genesis 22 shows Abraham willing to give his only son. Romans 8 reveals that God "did not spare His own Son, but gave Him up for us all" — the sacrifice Abraham foreshadowed.' },
    { book: 'John', chapter: 3, label: 'John 3', connectionType: 'thematic', reason: '"God so loved the world that He gave His only Son." Genesis 22 is the shadow of this — a father, a beloved son, a mountain, and a sacrifice. John 3 shows us what it all pointed to.' },
  ],
  'Exodus|3': [
    { book: 'Isaiah', chapter: 6, label: 'Isaiah 6', connectionType: 'thematic', reason: 'Moses encounters God\'s holiness at the burning bush in Exodus 3. Isaiah encounters it in the temple — "Holy, holy, holy." Both are undone, both are sent. These are companion stories of divine calling.' },
    { book: 'John', chapter: 8, label: 'John 8', connectionType: 'cross-reference', reason: 'God reveals His name as "I AM" in Exodus 3. In John 8, Jesus says "Before Abraham was, I AM" — claiming that same name and causing an uproar. The burning bush and John 8 are connected by the same sacred name.' },
    { book: 'Acts', chapter: 7, label: 'Acts 7', connectionType: 'cross-reference', reason: 'Stephen retells the Exodus 3 story in his sermon, connecting Moses\' burning bush encounter to the larger pattern of God working through rejected leaders — pointing ultimately to Jesus.' },
  ],
  'Exodus|14': [
    { book: 'Exodus', chapter: 15, label: 'Exodus 15', connectionType: 'narrative', reason: 'Exodus 14 is the crossing; Exodus 15 is the song. After God parts the sea, Israel erupts in worship. Together these chapters capture the full arc of deliverance — the terror, the miracle, and the praise.' },
    { book: '1 Corinthians', chapter: 10, label: '1 Corinthians 10', connectionType: 'cross-reference', reason: 'Paul reads the Red Sea crossing as a kind of baptism — "they were all baptized into Moses in the cloud and in the sea." He connects Israel\'s deliverance to our own.' },
    { book: 'Isaiah', chapter: 43, label: 'Isaiah 43', connectionType: 'thematic', reason: 'Isaiah promises God will make a way through the waters again — "When you pass through the waters, I will be with you." The Exodus 14 pattern of deliverance becomes God\'s signature move.' },
  ],
  'Isaiah|40': [
    { book: 'Mark', chapter: 1, label: 'Mark 1', connectionType: 'cross-reference', reason: 'Isaiah 40 cries "Prepare the way of the Lord." Mark 1 opens by quoting those exact words and pointing to John the Baptist — the voice in the wilderness Isaiah foretold.' },
    { book: 'Romans', chapter: 8, label: 'Romans 8', connectionType: 'thematic', reason: 'Isaiah 40 promises strength to the weary and declares that nothing is too hard for God. Romans 8 builds on that same assurance — "If God is for us, who can be against us?"' },
    { book: 'Psalms', chapter: 23, label: 'Psalm 23', connectionType: 'thematic', reason: 'Isaiah 40 says God "tends His flock like a shepherd, gathers the lambs in His arms." Psalm 23 is the personal experience of that same shepherding — "The Lord is my shepherd, I shall not want."' },
  ],
  'Isaiah|53': [
    { book: '1 Peter', chapter: 2, label: '1 Peter 2', connectionType: 'cross-reference', reason: 'Peter quotes Isaiah 53 directly — "by His wounds you have been healed" — and applies the suffering servant to Christ\'s death on behalf of sinners. It\'s the clearest NT interpretation of this passage.' },
    { book: 'Philippians', chapter: 2, label: 'Philippians 2', connectionType: 'thematic', reason: 'Isaiah 53\'s servant is "despised and rejected," then exalted. Philippians 2 traces the same arc — Christ humbled Himself to death, "therefore God exalted Him to the highest place."' },
    { book: 'Acts', chapter: 8, label: 'Acts 8', connectionType: 'cross-reference', reason: 'An Ethiopian official is reading Isaiah 53 and asks, "Who is the prophet talking about?" Philip sits down beside him and, starting from that very passage, tells him the good news about Jesus.' },
  ],
  'Daniel|3': [
    { book: '1 Peter', chapter: 4, label: '1 Peter 4', connectionType: 'thematic', reason: 'Daniel 3\'s fiery furnace tests faithfulness at ultimate cost. Peter writes "do not be surprised at the fiery trial" — using the same imagery to encourage believers facing persecution.' },
    { book: 'Hebrews', chapter: 11, label: 'Hebrews 11', connectionType: 'cross-reference', reason: 'Hebrews 11 honors those who "quenched the fury of flames" — Daniel\'s three friends are part of that legacy. Their story illustrates the faith Hebrews celebrates.' },
    { book: 'Isaiah', chapter: 43, label: 'Isaiah 43', connectionType: 'cross-reference', reason: '"When you walk through fire, you will not be burned." Isaiah\'s promise is exactly what happens in Daniel 3 — God doesn\'t prevent the furnace, but He walks through it with them.' },
  ],

  // ── Psalms ──────────────────────────────────────────────
  'Psalms|1': [
    { book: 'Jeremiah', chapter: 17, label: 'Jeremiah 17', connectionType: 'cross-reference', reason: 'Psalm 1\'s "tree planted by streams of water" appears again in Jeremiah 17, with an added contrast — "cursed is the one who trusts in man." Jeremiah deepens Psalm 1\'s two-ways imagery.' },
    { book: 'Matthew', chapter: 7, label: 'Matthew 7', connectionType: 'thematic', reason: 'Psalm 1 contrasts the righteous and the wicked. Jesus closes the Sermon on the Mount with the same structure — two builders, two foundations, two outcomes. The echo is unmistakable.' },
    { book: 'Joshua', chapter: 1, label: 'Joshua 1', connectionType: 'thematic', reason: '"Meditate on this Book of the Law day and night" — God\'s charge to Joshua mirrors Psalm 1\'s portrait of the blessed person. Both ground flourishing in devoted attention to God\'s Word.' },
  ],
  'Psalms|23': [
    { book: 'John', chapter: 10, label: 'John 10', connectionType: 'cross-reference', reason: '"The Lord is my shepherd" finds its fulfillment in John 10, where Jesus declares "I am the good shepherd." He is the one who leads through the valley and lays down His life for the sheep.' },
    { book: 'Ezekiel', chapter: 34, label: 'Ezekiel 34', connectionType: 'thematic', reason: 'Ezekiel 34 records God\'s promise to shepherd His people Himself after human leaders failed them. Psalm 23 is the personal experience of that divine shepherding.' },
    { book: 'Revelation', chapter: 7, label: 'Revelation 7', connectionType: 'cross-reference', reason: 'Psalm 23\'s "green pastures" and "still waters" reach their ultimate fulfillment in Revelation 7 — "the Lamb will shepherd them and lead them to springs of living water, and God will wipe away every tear."' },
  ],
  'Psalms|27': [
    { book: 'John', chapter: 8, label: 'John 8', connectionType: 'thematic', reason: 'Psalm 27 begins "The Lord is my light." In John 8, Jesus says "I am the light of the world." What David sought, Jesus embodies — and offers to anyone who follows Him.' },
    { book: 'Isaiah', chapter: 40, label: 'Isaiah 40', connectionType: 'thematic', reason: 'Psalm 27 ends with "Wait for the Lord; be strong and take heart." Isaiah 40 promises "those who wait on the Lord will renew their strength." Both passages call for patient trust that God will act.' },
    { book: '1 John', chapter: 1, label: '1 John 1', connectionType: 'thematic', reason: 'Psalm 27\'s desire to "dwell in the house of the Lord" and gaze on His beauty finds its New Testament expression in 1 John 1 — walking in the light, enjoying fellowship with God and one another.' },
  ],
  'Psalms|34': [
    { book: '1 Peter', chapter: 2, label: '1 Peter 2', connectionType: 'cross-reference', reason: 'Peter quotes Psalm 34 directly — "taste and see that the Lord is good" — and applies it to believers who have come to Christ, the living Stone. The psalm becomes an invitation to new life.' },
    { book: 'Matthew', chapter: 5, label: 'Matthew 5', connectionType: 'thematic', reason: 'Psalm 34 says "The Lord is close to the brokenhearted." The Beatitudes echo this — "Blessed are the poor in spirit... blessed are those who mourn." God draws near to the same people the world overlooks.' },
    { book: 'Psalms', chapter: 91, label: 'Psalm 91', connectionType: 'thematic', reason: 'Psalm 34 says "The angel of the Lord encamps around those who fear Him." Psalm 91 expands this protection — "He will command His angels concerning you." Together they paint a picture of divine shelter.' },
  ],
  'Psalms|46': [
    { book: 'Isaiah', chapter: 43, label: 'Isaiah 43', connectionType: 'thematic', reason: 'Psalm 46 declares "God is our refuge" even when the earth gives way. Isaiah 43 gives the same assurance — "Fear not, for I have redeemed you; when you pass through the waters, I will be with you."' },
    { book: 'Revelation', chapter: 21, label: 'Revelation 21', connectionType: 'cross-reference', reason: '"God is in the midst of her; she shall not be moved." Psalm 46\'s vision of God dwelling among His people points forward to Revelation 21 — "Behold, the dwelling place of God is with man."' },
    { book: 'Philippians', chapter: 4, label: 'Philippians 4', connectionType: 'thematic', reason: 'Psalm 46\'s "Be still and know that I am God" finds a New Testament partner in Philippians 4 — "Do not be anxious about anything... and the peace of God will guard your hearts."' },
  ],
  'Psalms|51': [
    { book: '2 Samuel', chapter: 12, label: '2 Samuel 12', connectionType: 'narrative', reason: 'Psalm 51 is David\'s prayer of repentance — but 2 Samuel 12 is the backstory. Nathan confronts David, and David\'s world collapses. Reading them together gives the psalm its full weight.' },
    { book: '1 John', chapter: 1, label: '1 John 1', connectionType: 'thematic', reason: 'David cries "Cleanse me from my sin" in Psalm 51. John promises "If we confess our sins, He is faithful and just to forgive." The New Testament answers David\'s prayer with assurance.' },
    { book: 'Ezekiel', chapter: 36, label: 'Ezekiel 36', connectionType: 'cross-reference', reason: 'David prays "Create in me a clean heart" in Psalm 51. God answers through Ezekiel — "I will give you a new heart and put a new spirit in you." The prayer becomes a prophetic promise.' },
  ],
  'Psalms|63': [
    { book: 'John', chapter: 7, label: 'John 7', connectionType: 'thematic', reason: 'Psalm 63 cries "My soul thirsts for you." In John 7, Jesus stands and says "If anyone thirsts, let him come to me and drink." He is the answer to the longing David expressed in the wilderness.' },
    { book: 'Isaiah', chapter: 55, label: 'Isaiah 55', connectionType: 'thematic', reason: 'David thirsts for God in Psalm 63. Isaiah 55 extends that invitation to everyone — "Come, all you who are thirsty, come to the waters." The same deep need, now offered to all who will come.' },
    { book: 'Psalms', chapter: 42, label: 'Psalm 42', connectionType: 'thematic', reason: '"As the deer pants for streams of water, so my soul pants for you, God." Psalm 42 is a companion to Psalm 63 — both written from places of loss, both reaching for God with everything they have.' },
  ],
  'Psalms|91': [
    { book: 'Matthew', chapter: 4, label: 'Matthew 4', connectionType: 'cross-reference', reason: 'Satan quotes Psalm 91 to Jesus during the temptation — "He will command His angels concerning you." This psalm matters enough that the enemy weaponized it. Jesus\' response reveals the difference between trusting God and testing Him.' },
    { book: 'Luke', chapter: 13, label: 'Luke 13', connectionType: 'thematic', reason: 'Psalm 91 speaks of sheltering under God\'s wings. Jesus uses the same image in Luke 13 — "How often I have longed to gather your children, as a hen gathers her chicks under her wings." Divine protection, personally offered.' },
    { book: 'Psalms', chapter: 46, label: 'Psalm 46', connectionType: 'thematic', reason: 'Psalm 91 promises protection in danger — "You will not fear the terror of night." Psalm 46 promises the same thing on a cosmic scale — "God is our refuge... though the earth give way." Together they cover every threat.' },
  ],
  'Psalms|119': [
    { book: 'Joshua', chapter: 1, label: 'Joshua 1', connectionType: 'thematic', reason: 'Psalm 119\'s love for God\'s Word echoes God\'s charge to Joshua — "Meditate on this Book of the Law day and night, so that you may be careful to do everything written in it." Both celebrate the life-giving power of Scripture.' },
    { book: '2 Timothy', chapter: 3, label: '2 Timothy 3', connectionType: 'thematic', reason: 'Psalm 119 declares "Your word is a lamp to my feet." Paul tells Timothy "All Scripture is God-breathed and useful" — the New Testament case for the same conviction that pulses through every verse of Psalm 119.' },
    { book: 'Hebrews', chapter: 4, label: 'Hebrews 4', connectionType: 'cross-reference', reason: 'Psalm 119 celebrates God\'s Word as alive and active in every season. Hebrews 4 confirms it — "The word of God is living and active, sharper than any two-edged sword." It\'s not just text; it\'s an encounter.' },
  ],
  'Psalms|139': [
    { book: 'Jeremiah', chapter: 1, label: 'Jeremiah 1', connectionType: 'cross-reference', reason: '"You knit me together in my mother\'s womb" in Psalm 139 connects to God\'s word to Jeremiah — "Before I formed you in the womb I knew you." Both reveal a God who is intimately involved before we ever take our first breath.' },
    { book: 'Ephesians', chapter: 2, label: 'Ephesians 2', connectionType: 'thematic', reason: 'Psalm 139 says "all my days were ordained before one of them came to be." Ephesians 2 adds that we were "created in Christ Jesus for good works, which God prepared in advance." The purposeful design Psalm 139 celebrates continues into our calling.' },
    { book: 'Romans', chapter: 8, label: 'Romans 8', connectionType: 'thematic', reason: 'Psalm 139 asks "Where can I go from your Spirit?" and finds God everywhere. Romans 8 answers with "nothing can separate us from the love of God." God\'s inescapable presence is not surveillance — it\'s love.' },
  ],

  // ── Gospels ─────────────────────────────────────────────
  'Matthew|5': [
    { book: 'Luke', chapter: 6, label: 'Luke 6', connectionType: 'cross-reference', reason: 'Matthew 5 records Jesus\' Beatitudes on the mountain. Luke 6 gives a parallel account on a plain — with added "woes" that sharpen the contrast between kingdom values and worldly ones.' },
    { book: 'Isaiah', chapter: 61, label: 'Isaiah 61', connectionType: 'cross-reference', reason: 'The Beatitudes echo Isaiah 61 — "good news to the poor, comfort for those who mourn." Jesus is announcing that Isaiah\'s vision is being fulfilled in the lives of His listeners.' },
    { book: 'James', chapter: 2, label: 'James 2', connectionType: 'thematic', reason: '"Blessed are the poor in spirit" — James asks, "Has not God chosen those who are poor in the world to be rich in faith?" James unpacks what the Beatitudes look like when they hit real life.' },
  ],
  'Matthew|6': [
    { book: 'Philippians', chapter: 4, label: 'Philippians 4', connectionType: 'thematic', reason: 'Jesus says "Do not worry about your life" in Matthew 6. Paul says "Do not be anxious about anything" in Philippians 4. Both prescribe the same cure: trust God and bring everything to Him.' },
    { book: 'Luke', chapter: 11, label: 'Luke 11', connectionType: 'cross-reference', reason: 'Matthew 6 gives us the Lord\'s Prayer. Luke 11 gives its parallel — a slightly different version with additional teaching on persistence in prayer. Together they give the full picture.' },
    { book: '1 Peter', chapter: 5, label: '1 Peter 5', connectionType: 'thematic', reason: 'Matthew 6 says "Do not worry about tomorrow." Peter says "Cast all your anxiety on Him, because He cares for you." The same invitation, from Jesus\' lips to Peter\'s pen.' },
  ],
  'Matthew|7': [
    { book: 'James', chapter: 1, label: 'James 1', connectionType: 'thematic', reason: 'Jesus warns about hearing without doing in the parable of the two builders. James echoes Him — "Be doers of the word, not hearers only, deceiving yourselves." Same principle, same urgency.' },
    { book: 'Luke', chapter: 6, label: 'Luke 6', connectionType: 'cross-reference', reason: 'Luke\'s parallel account of the two builders adds a telling detail — the wise builder "dug deep and laid a foundation on the rock." It\'s not just about hearing, but about going deep.' },
    { book: 'Psalms', chapter: 1, label: 'Psalm 1', connectionType: 'thematic', reason: 'Matthew 7\'s two builders echo Psalm 1\'s two ways — the tree versus the chaff, the wise versus the foolish. The pattern is ancient: how you build your life determines whether it stands.' },
  ],
  'John|1': [
    { book: 'Genesis', chapter: 1, label: 'Genesis 1', connectionType: 'cross-reference', reason: '"In the beginning" — John deliberately echoes Genesis 1. But now we learn something new: the Word was there at creation, and the Word is a person. Reading them side by side is stunning.' },
    { book: 'Colossians', chapter: 1, label: 'Colossians 1', connectionType: 'thematic', reason: 'John 1 says "through Him all things were made." Colossians 1 says "all things were created through Him and for Him... in Him all things hold together." Paul and John are singing the same song about Christ\'s cosmic supremacy.' },
    { book: 'Hebrews', chapter: 1, label: 'Hebrews 1', connectionType: 'thematic', reason: 'John 1 calls Jesus the Word. Hebrews 1 calls Him "the radiance of God\'s glory" through whom He created the world. Three different authors, one unmistakable portrait of Christ as divine creator.' },
  ],
  'John|3': [
    { book: 'Ezekiel', chapter: 36, label: 'Ezekiel 36', connectionType: 'cross-reference', reason: 'Jesus tells Nicodemus "You must be born again." Ezekiel 36 is the background — God promises "I will give you a new heart and put a new spirit in you." Jesus expected a teacher of Israel to know this passage.' },
    { book: 'Romans', chapter: 5, label: 'Romans 5', connectionType: 'thematic', reason: '"God so loved the world that He gave His only Son." Romans 5 unpacks the theology — "God demonstrates His love for us in that while we were still sinners, Christ died for us." The love John 3 declares, Romans 5 explains.' },
    { book: 'Genesis', chapter: 22, label: 'Genesis 22', connectionType: 'thematic', reason: 'John 3:16 says God "gave His only Son." Genesis 22 shows Abraham willing to offer his only son Isaac on a mountain. The echo is deliberate — what Abraham was spared from doing, God actually did.' },
  ],
  'John|10': [
    { book: 'Psalms', chapter: 23, label: 'Psalm 23', connectionType: 'cross-reference', reason: 'When Jesus says "I am the good shepherd" in John 10, He is claiming to be the shepherd of Psalm 23. David wrote "The Lord is my shepherd" — Jesus says, "That\'s me."' },
    { book: 'Ezekiel', chapter: 34, label: 'Ezekiel 34', connectionType: 'cross-reference', reason: 'God says "I myself will search for my sheep" in Ezekiel 34 after rebuking Israel\'s failed shepherds. In John 10, Jesus arrives as that promised shepherd — the one who lays down His life for the flock.' },
    { book: '1 Peter', chapter: 5, label: '1 Peter 5', connectionType: 'thematic', reason: 'Jesus calls Himself the good shepherd in John 10. Peter, who heard Him say it, later calls Him "the Chief Shepherd" and instructs church leaders to shepherd God\'s flock with the same heart.' },
  ],
  'John|14': [
    { book: 'John', chapter: 16, label: 'John 16', connectionType: 'narrative', reason: 'John 14 begins Jesus\' farewell — "I am the way, the truth, and the life." John 16 continues it with the promise of the Spirit who will "guide you into all truth." The farewell discourse builds as one sustained conversation.' },
    { book: 'Hebrews', chapter: 10, label: 'Hebrews 10', connectionType: 'cross-reference', reason: 'Jesus says "I am the way" in John 14. Hebrews 10 reveals what that means — "a new and living way opened for us through the curtain, that is, His body." Christ is the way of access to God.' },
    { book: 'Isaiah', chapter: 30, label: 'Isaiah 30', connectionType: 'thematic', reason: 'Jesus says "I am the way" and promises to prepare a place. Isaiah 30 describes the same guidance — "Whether you turn to the right or to the left, your ears will hear a voice saying, This is the way; walk in it."' },
  ],
  'John|15': [
    { book: 'Galatians', chapter: 5, label: 'Galatians 5', connectionType: 'thematic', reason: 'Jesus says "abide in me and you will bear much fruit" in John 15. Galatians 5 describes that fruit — love, joy, peace, patience, kindness. What Jesus promises, the Spirit produces in those who remain connected.' },
    { book: 'Colossians', chapter: 3, label: 'Colossians 3', connectionType: 'thematic', reason: 'John 15 says fruitfulness comes from abiding. Colossians 3 shows what the abiding life looks like in practice — "Set your minds on things above... put on compassion, kindness, humility."' },
    { book: 'Psalms', chapter: 1, label: 'Psalm 1', connectionType: 'thematic', reason: 'Psalm 1\'s tree "planted by streams of water, yielding fruit in season" is the Old Testament picture of what Jesus describes in John 15 — deep roots producing visible fruit through sustained connection to the source.' },
  ],
  'John|16': [
    { book: 'Acts', chapter: 2, label: 'Acts 2', connectionType: 'narrative', reason: 'Jesus promises in John 16 that the Spirit will come after He goes away. Acts 2 is the fulfillment — the Spirit descends at Pentecost and everything Jesus predicted begins to unfold.' },
    { book: 'Romans', chapter: 8, label: 'Romans 8', connectionType: 'thematic', reason: 'John 16 introduces the Spirit who will guide, convict, and comfort. Romans 8 expands on that — "The Spirit Himself intercedes for us with groanings too deep for words." The Helper Jesus promised becomes our deepest advocate.' },
    { book: 'John', chapter: 14, label: 'John 14', connectionType: 'narrative', reason: 'John 16 continues the farewell Jesus began in John 14. Reading back to chapter 14 shows how the promise builds — from "I will ask the Father to give you another Helper" to the Spirit guiding into all truth.' },
  ],
  'John|17': [
    { book: 'Hebrews', chapter: 7, label: 'Hebrews 7', connectionType: 'thematic', reason: 'John 17 shows Jesus praying as high priest for His people. Hebrews 7 explains that He "always lives to intercede for them." The prayer of John 17 isn\'t a one-time event — it\'s His ongoing ministry.' },
    { book: 'Ephesians', chapter: 1, label: 'Ephesians 1', connectionType: 'thematic', reason: 'Jesus prays in John 17 for believers to know the Father and be united. Paul prays in Ephesians 1 for "the eyes of your heart to be enlightened." Both prayers share the same longing — that we would truly know God.' },
    { book: 'Ephesians', chapter: 4, label: 'Ephesians 4', connectionType: 'thematic', reason: 'Jesus prays "that they may be one" in John 17. Ephesians 4 calls the church to "maintain the unity of the Spirit in the bond of peace." Paul\'s instruction is the practical outworking of Jesus\' prayer.' },
  ],
  'Mark|10': [
    { book: 'Philippians', chapter: 2, label: 'Philippians 2', connectionType: 'thematic', reason: 'Jesus says "whoever wants to be great must be servant of all" in Mark 10. Philippians 2 reveals He practiced it — Christ "emptied Himself, taking the form of a servant." The teaching and the life match perfectly.' },
    { book: 'John', chapter: 13, label: 'John 13', connectionType: 'thematic', reason: 'In Mark 10, Jesus teaches servant leadership. In John 13, He demonstrates it — kneeling to wash His disciples\' feet. One is the principle; the other is the picture.' },
    { book: 'Matthew', chapter: 20, label: 'Matthew 20', connectionType: 'cross-reference', reason: 'Matthew 20 records the same servant-leadership teaching with an addition — the parable of workers in the vineyard, where the last are paid first. God\'s kingdom consistently inverts worldly hierarchies.' },
  ],
  'Luke|15': [
    { book: 'Matthew', chapter: 18, label: 'Matthew 18', connectionType: 'cross-reference', reason: 'Luke 15\'s lost sheep parable appears in Matthew 18 with a different emphasis — there it\'s about the church pursuing the wandering. Together they show God\'s heart for the lost from two angles.' },
    { book: 'Ezekiel', chapter: 34, label: 'Ezekiel 34', connectionType: 'thematic', reason: 'Luke 15 tells of a shepherd who leaves ninety-nine to find one lost sheep. Ezekiel 34 is the backstory — God promises "I myself will search for my sheep and look after them." Jesus is fulfilling that promise.' },
    { book: '2 Corinthians', chapter: 5, label: '2 Corinthians 5', connectionType: 'thematic', reason: 'The prodigal son story in Luke 15 is reconciliation made personal. Paul gives the theological framework in 2 Corinthians 5 — "God was reconciling the world to Himself in Christ."' },
  ],

  // ── Pauline Epistles ────────────────────────────────────
  'Romans|1': [
    { book: 'Romans', chapter: 3, label: 'Romans 3', connectionType: 'narrative', reason: 'Romans 1 lays out the problem — humanity\'s rebellion and the wrath it invites. Romans 3 delivers the answer — "justified freely by His grace." The argument builds from diagnosis to remedy.' },
    { book: 'Habakkuk', chapter: 2, label: 'Habakkuk 2', connectionType: 'cross-reference', reason: '"The righteous shall live by faith" — this one verse from Habakkuk 2 is the foundation Paul builds his entire letter on. Going back to its original context adds depth to Romans 1\'s opening argument.' },
    { book: 'Galatians', chapter: 1, label: 'Galatians 1', connectionType: 'thematic', reason: 'Romans 1 and Galatians 1 both open with Paul defending the gospel. Romans does it systematically; Galatians does it passionately. Together they show why Paul considered this message worth his life.' },
  ],
  'Romans|3': [
    { book: 'Genesis', chapter: 15, label: 'Genesis 15', connectionType: 'cross-reference', reason: 'Romans 3 declares we are "justified by faith." In the very next chapter, Paul points to Genesis 15 — Abraham "believed God and it was credited as righteousness." The story behind the theology.' },
    { book: 'Galatians', chapter: 2, label: 'Galatians 2', connectionType: 'thematic', reason: '"A person is not justified by the works of the law, but by faith in Jesus Christ." Galatians 2 makes the same argument as Romans 3, but with raw personal urgency — Paul confronted Peter over this very issue.' },
    { book: 'Isaiah', chapter: 53, label: 'Isaiah 53', connectionType: 'thematic', reason: 'Romans 3 says we are justified by His grace through redemption. Isaiah 53 is the prophetic picture — the suffering servant "pierced for our transgressions, crushed for our iniquities." The cost behind the gift.' },
  ],
  'Romans|5': [
    { book: 'Genesis', chapter: 3, label: 'Genesis 3', connectionType: 'cross-reference', reason: 'Romans 5 explicitly contrasts Adam and Christ — "through one man sin entered the world." Genesis 3 is that story. Reading them together shows why Paul\'s Adam-Christ parallel matters so much.' },
    { book: 'Ephesians', chapter: 2, label: 'Ephesians 2', connectionType: 'thematic', reason: 'Romans 5 says "while we were still sinners, Christ died for us." Ephesians 2 says "by grace you have been saved." Same theology — undeserved love meeting us at our worst — expressed in different words.' },
    { book: 'James', chapter: 1, label: 'James 1', connectionType: 'thematic', reason: 'Romans 5 says "suffering produces perseverance, perseverance character, character hope." James 1 says "the testing of your faith produces steadfastness." Paul and James see the same redemptive pattern in hardship.' },
  ],
  'Romans|8': [
    { book: 'Psalms', chapter: 139, label: 'Psalm 139', connectionType: 'thematic', reason: '"Where can I go from your Spirit?" asks Psalm 139. Romans 8 answers: nowhere — "nothing can separate us from the love of God." God\'s inescapable presence in Psalm 139 becomes unshakable love in Romans 8.' },
    { book: 'John', chapter: 10, label: 'John 10', connectionType: 'cross-reference', reason: 'Romans 8 declares nothing can separate us from God\'s love. Jesus says in John 10, "No one will snatch them out of my hand." The same absolute security, promised by Jesus and proclaimed by Paul.' },
    { book: 'Ephesians', chapter: 1, label: 'Ephesians 1', connectionType: 'thematic', reason: 'Romans 8 says we are "predestined, called, justified, glorified." Ephesians 1 says we were "chosen before the foundation of the world, sealed with the Holy Spirit." Both passages celebrate the same breathtaking security in Christ.' },
  ],
  'Romans|12': [
    { book: 'Ephesians', chapter: 4, label: 'Ephesians 4', connectionType: 'thematic', reason: 'Romans 12 says "present your bodies as living sacrifices." Ephesians 4 says "walk worthy of your calling." Both are turning points where Paul moves from theology to life — and both assume the same truth: doctrine must become action.' },
    { book: '1 Corinthians', chapter: 12, label: '1 Corinthians 12', connectionType: 'thematic', reason: 'Romans 12 and 1 Corinthians 12 both use the body metaphor — many members, one body, different gifts. Reading them together gives the fullest picture of how spiritual gifts build up the community.' },
    { book: 'Matthew', chapter: 5, label: 'Matthew 5', connectionType: 'thematic', reason: 'Romans 12 says "bless those who persecute you... overcome evil with good." Jesus says "love your enemies... pray for those who persecute you" in Matthew 5. Paul is showing what the Sermon on the Mount looks like in the church.' },
  ],
  'Ephesians|1': [
    { book: 'Romans', chapter: 8, label: 'Romans 8', connectionType: 'thematic', reason: 'Ephesians 1 celebrates election and adoption — "chosen before the foundation of the world." Romans 8 develops the same thread — "predestined, called, justified, glorified." Together they form the strongest case for assurance in Scripture.' },
    { book: 'Colossians', chapter: 1, label: 'Colossians 1', connectionType: 'cross-reference', reason: 'Ephesians 1 and Colossians 1 are twin letters — both open with cosmic praise for what God has done in Christ. Colossians adds the stunning Christ Hymn: "In Him all things hold together."' },
    { book: '1 Peter', chapter: 1, label: '1 Peter 1', connectionType: 'thematic', reason: 'Ephesians 1 says we are "chosen according to God\'s purpose." Peter says "chosen according to the foreknowledge of God." Two apostles, one truth — your place in God\'s family was settled before the world began.' },
  ],
  'Ephesians|2': [
    { book: 'Romans', chapter: 3, label: 'Romans 3', connectionType: 'thematic', reason: 'Ephesians 2 says "by grace you have been saved through faith." Romans 3 says "justified freely by His grace." Same gospel, expressed from different starting points — Ephesians from spiritual death, Romans from legal guilt.' },
    { book: 'Titus', chapter: 3, label: 'Titus 3', connectionType: 'cross-reference', reason: '"He saved us, not because of righteous things we had done, but because of His mercy." Titus 3 reads like a compressed version of Ephesians 2 — the same grace, the same undeserved rescue, in three verses.' },
    { book: 'Colossians', chapter: 2, label: 'Colossians 2', connectionType: 'thematic', reason: 'Ephesians 2 says we were "dead in transgressions" and "made alive with Christ." Colossians 2 uses the same language — "when you were dead... God made you alive with Him." The parallel is striking and intentional.' },
  ],
  'Ephesians|3': [
    { book: 'Romans', chapter: 8, label: 'Romans 8', connectionType: 'thematic', reason: 'Paul prays in Ephesians 3 that believers would grasp the "width, length, height, and depth" of Christ\'s love. Romans 8 declares that nothing "in all creation can separate us from that love." One is the prayer; the other is the answer.' },
    { book: 'Colossians', chapter: 1, label: 'Colossians 1', connectionType: 'thematic', reason: 'Ephesians 3 speaks of "the mystery hidden for ages, now revealed." Colossians 1 unpacks the same mystery — "Christ in you, the hope of glory." Both passages marvel at what God kept hidden and then disclosed.' },
    { book: 'John', chapter: 17, label: 'John 17', connectionType: 'thematic', reason: 'Paul prays in Ephesians 3 that believers would know Christ\'s immeasurable love. Jesus prays in John 17 that the love God has for Him would be in them. Both are prayers rooted in the same unfathomable love.' },
  ],
  'Ephesians|4': [
    { book: '1 Corinthians', chapter: 12, label: '1 Corinthians 12', connectionType: 'thematic', reason: 'Ephesians 4 says "one body, one Spirit" with gifts given for the building up of the church. 1 Corinthians 12 develops the body metaphor in full — "the eye cannot say to the hand, I don\'t need you." The most detailed parallel.' },
    { book: 'Romans', chapter: 12, label: 'Romans 12', connectionType: 'thematic', reason: 'Ephesians 4 says "walk worthy of your calling." Romans 12 says "offer your bodies as living sacrifices." Both are the hinge point in their letters — where theology becomes lifestyle.' },
    { book: 'Colossians', chapter: 3, label: 'Colossians 3', connectionType: 'thematic', reason: '"Bear with each other and forgive," Paul writes in both Ephesians 4 and Colossians 3. These parallel letters share the same relational vision — a community shaped by grace, patience, and truth spoken in love.' },
  ],
  'Ephesians|5': [
    { book: 'Romans', chapter: 12, label: 'Romans 12', connectionType: 'thematic', reason: 'Ephesians 5 calls believers to "walk in love." Romans 12 unpacks what that looks like in everyday relationships — from sincerity to service, from patience to generosity.' },
    { book: 'Colossians', chapter: 3, label: 'Colossians 3', connectionType: 'cross-reference', reason: 'Paul gives parallel instructions to the Colossians — same themes of putting off the old self and living in the light, with its own unique emphasis on gratitude and the peace of Christ ruling in your hearts.' },
    { book: '1 John', chapter: 1, label: '1 John 1', connectionType: 'thematic', reason: 'Ephesians 5 speaks of light versus darkness — "walk as children of light." 1 John 1 develops this imagery further, exploring what it means to "walk in the light" and find fellowship there.' },
  ],
  'Ephesians|6': [
    { book: 'Isaiah', chapter: 59, label: 'Isaiah 59', connectionType: 'cross-reference', reason: 'Paul borrows the armor imagery from Isaiah 59, where God Himself puts on "righteousness as a breastplate and salvation as a helmet." The armor of God in Ephesians 6 is God\'s own armor, given to us.' },
    { book: '2 Corinthians', chapter: 10, label: '2 Corinthians 10', connectionType: 'thematic', reason: 'Ephesians 6 describes spiritual armor. 2 Corinthians 10 says "the weapons of our warfare are not carnal, but mighty through God for tearing down strongholds." Same battle, complementary strategy.' },
    { book: '1 Thessalonians', chapter: 5, label: '1 Thessalonians 5', connectionType: 'cross-reference', reason: 'Paul uses armor imagery again in 1 Thessalonians 5 — "putting on faith and love as a breastplate, and the hope of salvation as a helmet." He consistently frames the Christian life as a spiritual conflict requiring divine equipment.' },
  ],
  'Galatians|5': [
    { book: 'John', chapter: 15, label: 'John 15', connectionType: 'thematic', reason: 'The fruit of the Spirit in Galatians 5 — love, joy, peace, patience — is what Jesus promises in John 15 to those who "abide in the vine." Abiding produces the fruit Paul describes.' },
    { book: 'Romans', chapter: 8, label: 'Romans 8', connectionType: 'thematic', reason: 'Galatians 5 says "walk by the Spirit, and you will not gratify the flesh." Romans 8 develops this — "those who live according to the Spirit set their minds on what the Spirit desires." Same principle, fuller explanation.' },
    { book: 'James', chapter: 3, label: 'James 3', connectionType: 'contrast', reason: 'Galatians 5 lists the fruit of the Spirit. James 3 lists the fruit of wisdom — "pure, peaceable, gentle, open to reason, full of mercy." Two complementary portraits of the character God cultivates.' },
  ],
  'Philippians|2': [
    { book: 'Isaiah', chapter: 45, label: 'Isaiah 45', connectionType: 'cross-reference', reason: 'Philippians 2 says "every knee shall bow." Paul is quoting Isaiah 45, where God declares "to me every knee shall bow." By applying these words to Jesus, Paul makes one of Scripture\'s clearest claims about Christ\'s deity.' },
    { book: 'Mark', chapter: 10, label: 'Mark 10', connectionType: 'thematic', reason: 'Jesus teaches in Mark 10 that "whoever wants to be great must be servant of all." Philippians 2 reveals He didn\'t just teach it — He lived it, "emptying Himself, taking the form of a servant."' },
    { book: 'John', chapter: 13, label: 'John 13', connectionType: 'thematic', reason: 'Philippians 2 describes Christ\'s self-emptying in theological terms. John 13 shows it in action — Jesus takes off His outer garment, kneels, and washes His disciples\' feet. The theology becomes a towel and a basin.' },
  ],
  'Philippians|4': [
    { book: 'Matthew', chapter: 6, label: 'Matthew 6', connectionType: 'thematic', reason: 'Paul says "do not be anxious about anything" in Philippians 4. Jesus says "do not worry about your life" in Matthew 6. The same command, from two different speakers, rooted in the same trust that God provides.' },
    { book: '1 Peter', chapter: 5, label: '1 Peter 5', connectionType: 'thematic', reason: '"Cast all your anxiety on Him, because He cares for you." Peter\'s words in 1 Peter 5 are the practical companion to Paul\'s "do not be anxious" — both end at the same place: a God who genuinely cares.' },
    { book: 'Psalms', chapter: 46, label: 'Psalm 46', connectionType: 'thematic', reason: 'Philippians 4 promises "the peace of God will guard your hearts." Psalm 46 says "Be still and know that I am God." Both passages invite the same surrender — releasing control to a God who is sovereign over everything that worries you.' },
  ],
  'Colossians|3': [
    { book: 'Ephesians', chapter: 4, label: 'Ephesians 4', connectionType: 'cross-reference', reason: 'Colossians 3 says "put off the old self, put on the new." Ephesians 4 uses identical language — these twin letters share the same transformation vocabulary. Reading both shows the full scope of what Paul means.' },
    { book: 'Romans', chapter: 6, label: 'Romans 6', connectionType: 'thematic', reason: 'Colossians 3 starts with "you have been raised with Christ — set your minds on things above." Romans 6 lays the foundation — "consider yourselves dead to sin and alive to God." The theological groundwork for the practical change.' },
    { book: 'Galatians', chapter: 5, label: 'Galatians 5', connectionType: 'thematic', reason: 'Colossians 3 tells us to "put on compassion, kindness, humility, gentleness, patience." Galatians 5 calls this "the fruit of the Spirit." Two lists, one transformed life — produced by the Spirit in those who set their minds above.' },
  ],

  // ── General Epistles ────────────────────────────────────
  'James|1': [
    { book: 'Romans', chapter: 5, label: 'Romans 5', connectionType: 'thematic', reason: 'James 1 says "the testing of your faith produces steadfastness." Romans 5 says "suffering produces perseverance, perseverance character, character hope." Paul and James see the same redemptive pattern in trials.' },
    { book: '1 Peter', chapter: 1, label: '1 Peter 1', connectionType: 'thematic', reason: 'James says trials test faith. Peter says faith is "tested by fire, so that it may be proved genuine." Both apostles share the conviction that difficulty refines rather than destroys genuine faith.' },
    { book: 'Matthew', chapter: 7, label: 'Matthew 7', connectionType: 'thematic', reason: '"Be doers of the word, not hearers only." James echoes Jesus\' parable of the two builders in Matthew 7 — hearing without doing is building on sand. Both warn that passive faith is no faith at all.' },
  ],
  'James|2': [
    { book: 'Romans', chapter: 4, label: 'Romans 4', connectionType: 'contrast', reason: 'James 2 says Abraham was "justified by works." Romans 4 says he was "justified by faith." The apparent contradiction dissolves when you see they\'re answering different questions — James asks what living faith looks like; Paul asks how we\'re made right with God.' },
    { book: 'Galatians', chapter: 5, label: 'Galatians 5', connectionType: 'thematic', reason: 'James 2 insists "faith without works is dead." Paul says in Galatians 5 what bridges the gap — "faith working through love." Genuine faith, both agree, naturally produces visible action.' },
    { book: 'Matthew', chapter: 25, label: 'Matthew 25', connectionType: 'thematic', reason: 'James 2 says faith must be visible in caring for the hungry and the naked. Jesus says in Matthew 25 that the sheep and goats are separated by exactly that — "I was hungry and you gave me something to eat." The standard is the same.' },
  ],
  '1 Peter|1': [
    { book: 'Romans', chapter: 8, label: 'Romans 8', connectionType: 'thematic', reason: 'Peter speaks of present suffering and a future inheritance "kept in heaven for you." Romans 8 holds the same tension — "present sufferings are not worth comparing with the glory that will be revealed." Both cling to what\'s coming.' },
    { book: 'James', chapter: 1, label: 'James 1', connectionType: 'thematic', reason: 'Peter says faith is "tested by fire, so that it may be proved genuine." James says trials produce steadfastness. Both apostles use the same refining metaphor — fire doesn\'t destroy faith, it reveals it.' },
    { book: 'Ephesians', chapter: 1, label: 'Ephesians 1', connectionType: 'thematic', reason: '1 Peter 1 celebrates "an inheritance that can never perish, spoil, or fade." Ephesians 1 calls it being "sealed with the Holy Spirit, who is a deposit guaranteeing our inheritance." Two witnesses to the same secured future.' },
  ],
  '1 Peter|2': [
    { book: 'Ephesians', chapter: 2, label: 'Ephesians 2', connectionType: 'thematic', reason: '1 Peter 2 calls believers "living stones being built into a spiritual house" with Christ as the cornerstone. Ephesians 2 says we are "built on the foundation of the apostles and prophets, with Christ as the chief cornerstone." The same temple, the same builder.' },
    { book: 'Isaiah', chapter: 53, label: 'Isaiah 53', connectionType: 'cross-reference', reason: 'Peter quotes Isaiah 53 directly — "He Himself bore our sins in His body on the tree... by His wounds you have been healed." 1 Peter 2 is the clearest New Testament application of the suffering servant to Christ.' },
    { book: 'Psalms', chapter: 34, label: 'Psalm 34', connectionType: 'cross-reference', reason: '"Taste and see that the Lord is good" — Peter quotes Psalm 34 in 1 Peter 2 to describe what it\'s like to come to Christ. The psalm\'s invitation becomes a description of the believer\'s experience.' },
  ],
  '1 John|1': [
    { book: 'John', chapter: 1, label: 'John 1', connectionType: 'cross-reference', reason: 'John opens both his Gospel and this letter with light. The Gospel says "the light shines in the darkness." 1 John says "God is light; in Him there is no darkness at all." One is cosmic; the other is personal.' },
    { book: 'Ephesians', chapter: 5, label: 'Ephesians 5', connectionType: 'thematic', reason: '1 John 1 says "if we walk in the light, we have fellowship with one another." Ephesians 5 says "walk as children of light." Paul and John both call believers out of darkness into a life defined by transparency and truth.' },
    { book: 'Psalms', chapter: 51, label: 'Psalm 51', connectionType: 'thematic', reason: 'David\'s confession in Psalm 51 — "against you, you only, have I sinned" — leads to restoration. 1 John 1 gives the pattern — "if we confess our sins, He is faithful and just to forgive." Confession is always the path back.' },
  ],
  '1 John|3': [
    { book: 'Romans', chapter: 8, label: 'Romans 8', connectionType: 'thematic', reason: '"See what kind of love the Father has given us, that we should be called children of God." 1 John 3 marvels at our identity. Romans 8 develops it — "The Spirit testifies that we are God\'s children, and if children, then heirs."' },
    { book: 'Ephesians', chapter: 1, label: 'Ephesians 1', connectionType: 'thematic', reason: '1 John 3 celebrates being "called children of God." Ephesians 1 reveals this was always the plan — "predestined for adoption as sons." The identity John wonders at, Paul says was designed before the world began.' },
    { book: 'Matthew', chapter: 5, label: 'Matthew 5', connectionType: 'thematic', reason: '1 John 3 describes the character of God\'s children. The Beatitudes describe it too — "blessed are the peacemakers, for they shall be called children of God." Jesus and John both connect identity to character.' },
  ],
  '1 John|4': [
    { book: 'John', chapter: 3, label: 'John 3', connectionType: 'thematic', reason: '"God is love" in 1 John 4 is the theological ground beneath "God so loved the world" in John 3. One defines God\'s nature; the other describes His greatest act. Together they give the fullest picture of divine love in Scripture.' },
    { book: 'Romans', chapter: 5, label: 'Romans 5', connectionType: 'thematic', reason: '1 John 4 says "He loved us and sent His Son." Romans 5 says "God demonstrates His love for us in that while we were still sinners, Christ died for us." Both insist that God\'s love took initiative before we responded.' },
    { book: '1 Corinthians', chapter: 13, label: '1 Corinthians 13', connectionType: 'thematic', reason: '1 John 4 grounds love in God\'s nature. 1 Corinthians 13 describes love\'s character — "patient, kind, does not envy." John tells us where love comes from; Paul tells us what it looks like in action.' },
  ],
  'Hebrews|11': [
    { book: 'Genesis', chapter: 12, label: 'Genesis 12', connectionType: 'cross-reference', reason: 'Abraham\'s call in Genesis 12 is the centerpiece of Hebrews 11 — "By faith Abraham obeyed when he was called to go out to a place he was to receive as an inheritance." Reading the original story brings the hall of faith to life.' },
    { book: 'Romans', chapter: 4, label: 'Romans 4', connectionType: 'thematic', reason: 'Hebrews 11 celebrates Abraham\'s faith. Romans 4 explains its significance — "his faith was credited as righteousness." Both passages point to the same truth: faith has always been the way people relate to God.' },
    { book: 'James', chapter: 2, label: 'James 2', connectionType: 'contrast', reason: 'Hebrews 11 says faith moves people to act — Abel offered, Noah built, Abraham left. James 2 makes the same point explicitly — "faith without works is dead." Both show that real faith is never just a concept; it always has legs.' },
  ],
  'Hebrews|12': [
    { book: '1 Corinthians', chapter: 9, label: '1 Corinthians 9', connectionType: 'thematic', reason: 'Hebrews 12 says "run with endurance the race marked out for us." Paul says in 1 Corinthians 9, "I run in such a way as to get the prize." Both use athletic imagery to describe the focused discipline of faith.' },
    { book: 'Proverbs', chapter: 3, label: 'Proverbs 3', connectionType: 'cross-reference', reason: '"My son, do not make light of the Lord\'s discipline." Hebrews 12 quotes Proverbs 3 directly to explain why God allows difficulty — it\'s not punishment but training, from a Father who loves.' },
    { book: 'Romans', chapter: 5, label: 'Romans 5', connectionType: 'thematic', reason: 'Hebrews 12 says discipline produces "a harvest of righteousness and peace." Romans 5 says suffering produces "perseverance, character, and hope." Both see the same redemptive arc — pain that leads to growth when received in faith.' },
  ],

  // ── Wisdom Literature ───────────────────────────────────
  'Proverbs|3': [
    { book: 'Hebrews', chapter: 12, label: 'Hebrews 12', connectionType: 'cross-reference', reason: '"Do not despise the Lord\'s discipline" — Hebrews 12 quotes Proverbs 3 directly and expands it, explaining that God disciplines those He loves as a Father trains children He\'s raising.' },
    { book: 'Matthew', chapter: 6, label: 'Matthew 6', connectionType: 'thematic', reason: 'Proverbs 3 says "Trust in the Lord with all your heart; do not lean on your own understanding." Jesus says "Do not worry about your life" in Matthew 6. The same counsel — release control to a God who knows what you need.' },
    { book: 'Psalms', chapter: 37, label: 'Psalm 37', connectionType: 'thematic', reason: '"Trust in the Lord" is the heartbeat of Proverbs 3 and Psalm 37 alike. David expands Solomon\'s wisdom into a full meditation — "Commit your way to the Lord; trust in Him, and He will act."' },
  ],
  'Ecclesiastes|3': [
    { book: 'Romans', chapter: 8, label: 'Romans 8', connectionType: 'thematic', reason: 'Ecclesiastes 3 asks whether life has meaning in its seasons. Romans 8 answers — "all things work together for good for those who love God." The restless questioning finds its resting place.' },
    { book: 'Psalms', chapter: 90, label: 'Psalm 90', connectionType: 'thematic', reason: 'Ecclesiastes 3 reflects on time and mortality — "a time to be born and a time to die." Psalm 90 does the same — "teach us to number our days." Both sit honestly with life\'s brevity.' },
    { book: 'James', chapter: 4, label: 'James 4', connectionType: 'thematic', reason: 'Ecclesiastes 3 says God "has made everything beautiful in its time." James 4 echoes the same humility about human limits — "you do not know what tomorrow will bring." Both invite surrender to God\'s timing.' },
  ],
};

// ============ Personalized Recommendation Pairs ============
// Each combo of background × season yields two curated picks:
//   [0] = Foundation pick (accessible entry point)
//   [1] = Growth pick (deeper exploration)

type ComboKey = `${string}|${string}`;

const PERSONALIZED_PAIRS: Record<ComboKey, [BibleRecommendation, BibleRecommendation]> = {
  // ── New to Faith ──────────────────────────────────────
  'new_to_faith|deeper_relationship': [
    {
      book: 'John', chapter: 15, label: 'John 15',
      reason: 'Jesus uses the image of a vine and branches to describe what a relationship with God actually looks like. As you begin your faith journey, this chapter gives you a clear picture of how to stay connected to Him.',
    },
    {
      book: 'Psalms', chapter: 63, label: 'Psalm 63',
      reason: 'David wrote this while wandering in a desert, yet it overflows with longing for God. It models what honest, heartfelt prayer sounds like — no religious language required.',
    },
  ],
  'new_to_faith|questions_doubts': [
    {
      book: 'Mark', chapter: 9, label: 'Mark 9:14-29',
      reason: 'A father tells Jesus, "I believe — help my unbelief." This passage is remarkably honest about what early faith looks like when doubts are real. You\'re allowed to bring both your belief and your questions.',
    },
    {
      book: 'Psalms', chapter: 13, label: 'Psalm 13',
      reason: 'One of the shortest psalms, but it captures the full arc of struggling with God — from "How long?" to "I will sing." It shows that doubt and faith aren\'t opposites.',
    },
  ],
  'new_to_faith|difficult_situation': [
    {
      book: 'Psalms', chapter: 23, label: 'Psalm 23',
      reason: 'The most well-known psalm for a reason — it paints a picture of God as a personal shepherd who walks with you through dark valleys. When life is hard, this is where to start.',
    },
    {
      book: 'Isaiah', chapter: 43, label: 'Isaiah 43:1-7',
      reason: 'God speaks directly to His people: "Fear not, for I have redeemed you." These words were written for a nation in crisis, but they read like a personal letter to anyone walking through difficulty.',
    },
  ],
  'new_to_faith|understand_bible': [
    {
      book: 'John', chapter: 1, label: 'John 1',
      reason: 'The Gospel of John was written specifically so people could believe. Chapter 1 introduces Jesus as the Word who became flesh — it\'s the single best starting point for understanding who He is.',
    },
    {
      book: 'Genesis', chapter: 1, label: 'Genesis 1-2',
      reason: 'Everything in the Bible flows from these opening chapters. They establish who God is, who we are, and what the world was meant to be. Read this alongside John 1 and you\'ll see the echoes.',
    },
  ],
  'new_to_faith|spiritual_growth': [
    {
      book: 'Philippians', chapter: 1, label: 'Philippians 1',
      reason: 'Paul writes this letter from prison, yet it\'s overflowing with joy. For someone beginning their faith, this shows what spiritual maturity can look like — and it\'s not what you\'d expect.',
    },
    {
      book: 'James', chapter: 1, label: 'James 1',
      reason: 'James is the most practical book in the New Testament. Chapter 1 covers trials, wisdom, and what real faith looks like in everyday life. It\'s a perfect complement to Paul\'s theology.',
    },
  ],
  'new_to_faith|ministry_preparation': [
    {
      book: 'John', chapter: 1, label: 'John 1',
      reason: 'Before ministry comes knowing who Jesus is. John opens with the clearest declaration of Christ\'s identity in Scripture. This foundation will shape everything else.',
    },
    {
      book: 'Acts', chapter: 2, label: 'Acts 2',
      reason: 'The birth of the church. Peter\'s first sermon shows what happens when ordinary people are empowered by the Spirit. It\'s an inspiring picture of what ministry was always meant to be.',
    },
  ],

  // ── Believer Going Deeper ─────────────────────────────
  'believer_going_deeper|deeper_relationship': [
    {
      book: '1 John', chapter: 4, label: '1 John 4',
      reason: 'John distills the heart of the Christian life into one idea: God is love, and we love because He first loved us. If you want to deepen your relationship with God, this chapter will recalibrate everything.',
    },
    {
      book: 'Song of Solomon', chapter: 1, label: 'Song of Solomon',
      reason: 'Often overlooked, this book has been read for centuries as a picture of divine intimacy. It\'s passionate, poetic, and a reminder that God\'s love for you is not distant or academic.',
    },
  ],
  'believer_going_deeper|questions_doubts': [
    {
      book: 'Habakkuk', chapter: 1, label: 'Habakkuk 1-2',
      reason: 'Habakkuk does something bold — he directly challenges God about injustice. And God answers. For a believer wrestling with hard questions, this is a model of faithful questioning.',
    },
    {
      book: 'Job', chapter: 38, label: 'Job 38-42',
      reason: 'After 37 chapters of suffering and debate, God finally speaks. His answer isn\'t what anyone expects. These chapters will reshape how you think about God\'s sovereignty and mystery.',
    },
  ],
  'believer_going_deeper|difficult_situation': [
    {
      book: 'Romans', chapter: 8, label: 'Romans 8',
      reason: 'Paul builds to the most triumphant declaration in Scripture: nothing can separate us from the love of God. When you\'re in a hard season, this chapter is an anchor.',
    },
    {
      book: 'Lamentations', chapter: 3, label: 'Lamentations 3',
      reason: 'Written in the aftermath of Jerusalem\'s destruction, this chapter moves from total despair to "His mercies are new every morning." It gives you permission to grieve and hope at the same time.',
    },
  ],
  'believer_going_deeper|understand_bible': [
    {
      book: 'Hebrews', chapter: 1, label: 'Hebrews 1-4',
      reason: 'Hebrews connects the Old Testament to Jesus in ways you may have never seen. It reveals how every sacrifice, priesthood, and promise was pointing to Christ all along.',
    },
    {
      book: 'Romans', chapter: 1, label: 'Romans 1-3',
      reason: 'Paul lays out the most systematic explanation of the gospel in all of Scripture. If you want to understand the theological backbone of Christianity, this is the place.',
    },
  ],
  'believer_going_deeper|spiritual_growth': [
    {
      book: 'Ephesians', chapter: 3, label: 'Ephesians 3',
      reason: 'Paul prays that you would grasp the width, length, height, and depth of Christ\'s love. This chapter is both theological and deeply personal — it\'s a prayer you can make your own.',
    },
    {
      book: 'Colossians', chapter: 3, label: 'Colossians 3',
      reason: 'This is where identity meets practice. Paul moves from "you have been raised with Christ" to specific ways to put on the new self. It\'s the bridge between knowing and becoming.',
    },
  ],
  'believer_going_deeper|ministry_preparation': [
    {
      book: '2 Timothy', chapter: 2, label: '2 Timothy 2',
      reason: 'Paul\'s final letter to his protégé. This chapter is a concentrated guide to being an approved worker — faithful, disciplined, and gentle. It\'s essential reading before leading others.',
    },
    {
      book: '1 Peter', chapter: 5, label: '1 Peter 5',
      reason: 'Peter writes to church leaders with striking humility. "Shepherd the flock... not lording it over them." These words will shape the kind of leader you become.',
    },
  ],

  // ── Pastor / Leader ───────────────────────────────────
  'pastor_leader|deeper_relationship': [
    {
      book: 'Psalms', chapter: 63, label: 'Psalm 63',
      reason: 'Ministry can drain the soul. David wrote this in a wilderness, longing for God with his whole being. Let this psalm be a personal retreat before you pour out for others.',
    },
    {
      book: 'John', chapter: 15, label: 'John 15',
      reason: 'Jesus tells the disciples — and you — that apart from Him, we can do nothing. Before you lead, abide. This chapter resets the posture of ministry.',
    },
  ],
  'pastor_leader|questions_doubts': [
    {
      book: 'Habakkuk', chapter: 1, label: 'Habakkuk 1-3',
      reason: 'A prophet who questions God about the state of the world — and lives to worship anyway. When you carry the weight of others\' doubts alongside your own, Habakkuk is a companion.',
    },
    {
      book: 'Ecclesiastes', chapter: 1, label: 'Ecclesiastes 1-3',
      reason: 'The "Teacher" grapples with meaning, futility, and purpose. It\'s raw, unfiltered wisdom — the kind that helps you sit with people in their questions without rushing to answers.',
    },
  ],
  'pastor_leader|difficult_situation': [
    {
      book: '2 Corinthians', chapter: 1, label: '2 Corinthians 1',
      reason: 'Paul opens with the theology of comfort — God comforts us so we can comfort others. For a leader in a hard season, this reframes your suffering as preparation for deeper ministry.',
    },
    {
      book: 'Psalms', chapter: 23, label: 'Psalm 23',
      reason: 'You shepherd others, but you need a shepherd too. Let this psalm remind you that before you are a leader, you are a sheep in the care of the Good Shepherd.',
    },
  ],
  'pastor_leader|ministry_preparation': [
    {
      book: 'Ezekiel', chapter: 34, label: 'Ezekiel 34',
      reason: 'God rebukes the shepherds of Israel for feeding themselves instead of the flock. It\'s a sobering and clarifying chapter for anyone called to lead. Read it as both warning and invitation.',
    },
    {
      book: 'Acts', chapter: 20, label: 'Acts 20:17-38',
      reason: 'Paul\'s farewell to the Ephesian elders is one of the most moving leadership passages in Scripture. He models vulnerability, vigilance, and total surrender to God\'s calling.',
    },
  ],
  'pastor_leader|understand_bible': [
    {
      book: 'Hebrews', chapter: 1, label: 'Hebrews 1-4',
      reason: 'Hebrews reveals how the entire Old Testament points to Christ. For a leader teaching others, this book equips you to show people the unified story of Scripture.',
    },
    {
      book: 'Luke', chapter: 24, label: 'Luke 24:13-35',
      reason: 'On the road to Emmaus, Jesus walks two disciples through all of Scripture showing how it speaks of Him. This is the model for how to teach the Bible to others.',
    },
  ],
  'pastor_leader|spiritual_growth': [
    {
      book: '1 Timothy', chapter: 4, label: '1 Timothy 4',
      reason: 'Paul tells Timothy to watch his life and doctrine closely. For a leader, spiritual growth isn\'t optional — it\'s the foundation. This chapter makes the personal and public inseparable.',
    },
    {
      book: 'Philippians', chapter: 3, label: 'Philippians 3',
      reason: 'Paul counts everything as loss compared to knowing Christ. Even after years of ministry, he\'s still pressing forward. It\'s a powerful reminder that growth never stops.',
    },
  ],

  // ── Seminary Student ──────────────────────────────────
  'seminary_student|deeper_relationship': [
    {
      book: 'Psalms', chapter: 42, label: 'Psalm 42-43',
      reason: 'The psalmist\'s soul pants for God like a deer for water. Seminary can turn faith into an academic exercise — these psalms pull you back into raw, honest longing for God\'s presence.',
    },
    {
      book: 'John', chapter: 17, label: 'John 17',
      reason: 'Jesus\' high priestly prayer. He prays for His disciples — and for you. Studying this prayer devotionally, not just exegetically, can transform your relationship with God.',
    },
  ],
  'seminary_student|questions_doubts': [
    {
      book: 'Job', chapter: 38, label: 'Job 38-41',
      reason: 'God\'s speech from the whirlwind is the Bible\'s most extensive answer to human suffering — and it\'s not a systematic theology. It\'s an encounter. Let it challenge your categories.',
    },
    {
      book: 'Ecclesiastes', chapter: 1, label: 'Ecclesiastes',
      reason: 'The Teacher pushes every theological assumption to its limit. It\'s the Bible\'s own internal critique of tidy answers. For a student of theology, it\'s essential reading.',
    },
  ],
  'seminary_student|difficult_situation': [
    {
      book: 'Lamentations', chapter: 3, label: 'Lamentations 3',
      reason: 'Masterfully structured acrostic poetry born from national catastrophe. The literary artistry holds the grief — and at the center, a declaration of God\'s faithfulness that has anchored believers for millennia.',
    },
    {
      book: '2 Corinthians', chapter: 4, label: '2 Corinthians 4',
      reason: 'Paul\'s theology of suffering as an apostle. "We are afflicted, but not crushed." The tension between weakness and divine power runs through every verse. It\'s pastoral theology at its finest.',
    },
  ],
  'seminary_student|understand_bible': [
    {
      book: 'Hebrews', chapter: 1, label: 'Hebrews 1-2',
      reason: 'Hebrews is a masterclass in biblical theology — showing how Christ fulfills and surpasses every Old Testament institution. The Christology here is some of the richest in the New Testament.',
    },
    {
      book: 'Romans', chapter: 9, label: 'Romans 9-11',
      reason: 'Paul\'s most complex theological argument: Israel, election, and the mystery of God\'s plan for all nations. These chapters will stretch your understanding of salvation history.',
    },
  ],
  'seminary_student|spiritual_growth': [
    {
      book: 'Ephesians', chapter: 1, label: 'Ephesians 1-3',
      reason: 'Paul\'s cosmic vision of redemption — election, adoption, the mystery of the church, and a prayer for spiritual comprehension. These chapters are both theologically dense and devotionally rich.',
    },
    {
      book: 'Colossians', chapter: 1, label: 'Colossians 1:15-23',
      reason: 'The Christ Hymn. This is one of the highest Christological statements in Scripture — and it leads directly into Paul\'s vision of reconciliation. Study and worship belong together here.',
    },
  ],
  'seminary_student|ministry_preparation': [
    {
      book: '2 Timothy', chapter: 2, label: '2 Timothy 2',
      reason: 'Paul\'s charge to Timothy is the bridge between seminary and ministry. "Be diligent to present yourself approved to God, a worker who doesn\'t need to be ashamed." Let this shape your calling.',
    },
    {
      book: 'Nehemiah', chapter: 8, label: 'Nehemiah 8',
      reason: 'Ezra reads the Law to the people and the Levites help them understand it. It\'s a picture of what faithful teaching looks like — clear, communal, and transformative.',
    },
  ],

  // ── Exploring Faith ───────────────────────────────────
  'exploring_faith|deeper_relationship': [
    {
      book: 'Psalms', chapter: 139, label: 'Psalm 139',
      reason: 'This psalm explores the idea that God knows you completely — every thought, every movement, before you were even born. Whether that comforts or unsettles you, it\'s worth sitting with.',
    },
    {
      book: 'John', chapter: 4, label: 'John 4',
      reason: 'Jesus has an honest, boundary-breaking conversation with a Samaritan woman. No judgment, no religious performance — just a real encounter. It\'s a picture of what relationship with God can look like.',
    },
  ],
  'exploring_faith|questions_doubts': [
    {
      book: 'Ecclesiastes', chapter: 1, label: 'Ecclesiastes 1-3',
      reason: 'Written by someone questioning the meaning of everything. It\'s raw, philosophical, and surprisingly modern. If you\'re exploring faith with honest questions, this book meets you there.',
    },
    {
      book: 'Mark', chapter: 9, label: 'Mark 9:14-29',
      reason: '"I believe — help my unbelief." A father says what many people feel but are afraid to admit. This passage normalizes the tension between wanting to believe and struggling to.',
    },
  ],
  'exploring_faith|difficult_situation': [
    {
      book: 'Psalms', chapter: 23, label: 'Psalm 23',
      reason: 'You don\'t need to be a believer to feel the weight of these words. "Even though I walk through the valley of the shadow of death" — it\'s a poem about not being alone in the dark.',
    },
    {
      book: 'Matthew', chapter: 11, label: 'Matthew 11:28-30',
      reason: 'Jesus says, "Come to me, all who are weary and heavy-laden." These are some of the most inviting words in all of Scripture — and they\'re addressed to people who are exhausted, not people who have it figured out.',
    },
  ],
  'exploring_faith|understand_bible': [
    {
      book: 'John', chapter: 1, label: 'John 1',
      reason: 'John was written so that people exploring faith could come to believe. Chapter 1 introduces Jesus not as a historical figure but as the Word who created everything. It\'s the ideal starting point.',
    },
    {
      book: 'Luke', chapter: 15, label: 'Luke 15',
      reason: 'Three stories about things that were lost and found — a sheep, a coin, a son. Jesus tells these to show what God is actually like. If you want to understand the heart of Christianity, start here.',
    },
  ],
  'exploring_faith|spiritual_growth': [
    {
      book: 'John', chapter: 3, label: 'John 3',
      reason: 'Nicodemus comes to Jesus at night with questions. Jesus talks about being "born again" — and the most famous verse in the Bible is here. It\'s a conversation between curiosity and revelation.',
    },
    {
      book: 'James', chapter: 1, label: 'James 1',
      reason: 'James is less about theology and more about action. It asks: what does real faith look like in practice? For someone exploring, this grounds things in reality rather than abstraction.',
    },
  ],
  'exploring_faith|ministry_preparation': [
    {
      book: 'John', chapter: 1, label: 'John 1',
      reason: 'Before thinking about serving others, get to know who Jesus is. John opens with the most profound introduction in literature — and it only gets more compelling from there.',
    },
    {
      book: 'Acts', chapter: 2, label: 'Acts 2',
      reason: 'The birth of the early church. A small group of ordinary people, transformed by the Spirit, changes the world. It\'s an inspiring origin story whether you\'re inside or outside the faith.',
    },
  ],
};

// ============ Learning Style Enhancements ============
// Append a brief note to the reason based on how the user learns best.

const LEARNING_STYLE_NOTES: [string, string] = [
  "Let's go through this together.",
  "I'd love to walk through this with you.",
];

// ============ Universal Fallback Pair ============

const FALLBACK_PAIR: [BibleRecommendation, BibleRecommendation] = [
  {
    book: 'John', chapter: 1, label: 'John 1',
    reason: 'The Gospel of John was written so that anyone could come to know who Jesus is. Chapter 1 begins with one of the most powerful openings in all of literature — and it only gets richer from there.',
  },
  {
    book: 'Psalms', chapter: 23, label: 'Psalm 23',
    reason: 'The most beloved psalm for a reason. It paints a picture of God as a shepherd who provides, protects, and walks with you through the darkest valleys. It\'s where countless people have found comfort.',
  },
];

// ============ Main Functions ============

const CONNECTION_LABELS: Record<ChapterConnection['connectionType'], string> = {
  'cross-reference': 'Cross-reference',
  thematic: 'Shared theme',
  narrative: 'Continues the story',
  contrast: 'Different angle',
};

/**
 * Try to find recommendations that are contextually related to the user's
 * current reading. Returns null if no match exists in the connection map.
 */
function getContextualRecommendations(
  currentBook: string,
  currentChapter: number,
  recentBooks: Set<string>,
): [BibleRecommendation, BibleRecommendation] | null {
  const key = `${currentBook}|${currentChapter}`;
  const connections = CHAPTER_CONNECTIONS[key];
  if (!connections) return null;

  // Filter out books the user has recently read (but keep at least 2)
  const filtered = connections.filter((c) => !recentBooks.has(c.book));
  const pool = filtered.length >= 2 ? filtered : connections;

  // Take the first two
  if (pool.length < 2) return null;

  return [pool[0], pool[1]].map((c) => ({
    book: c.book,
    chapter: c.chapter,
    label: c.label,
    reason: `${CONNECTION_LABELS[c.connectionType]} · ${c.reason}`,
  })) as [BibleRecommendation, BibleRecommendation];
}

export function getRecommendedReadingPair(
  history: ReadingHistoryEntry[],
  excludeBook?: string,
  currentBook?: string,
  currentChapter?: number,
): [BibleRecommendation, BibleRecommendation] {
  const quizData = getQuizData();
  const recentBooks = new Set(history.map((e) => e.book));
  if (excludeBook) recentBooks.add(excludeBook);

  // Try context-aware recommendations based on current reading
  if (currentBook && currentChapter != null) {
    const contextual = getContextualRecommendations(currentBook, currentChapter, recentBooks);
    if (contextual) return contextual;
  }

  const bg = quizData.spiritualBackground;
  const season = quizData.currentSeason;
  // Try personalized pair from background × season
  if (bg && season) {
    const key: ComboKey = `${bg}|${season}`;
    const pair = PERSONALIZED_PAIRS[key];
    if (pair) {
      const styled = pair.map((rec, i) => ({
        ...rec,
        reason: `${rec.reason} ${LEARNING_STYLE_NOTES[i]}`,
      })) as [BibleRecommendation, BibleRecommendation];

      // Filter out recently read books but always return 2
      const filtered = styled.filter((r) => !recentBooks.has(r.book));
      if (filtered.length >= 2) return [filtered[0], filtered[1]];
      if (filtered.length === 1) return [filtered[0], styled.find((r) => r !== filtered[0])!];
      return styled;
    }
  }

  return FALLBACK_PAIR;
}

/** Backwards-compatible single recommendation (used by active reading card). */
export function getRecommendedReading(
  history: ReadingHistoryEntry[],
  excludeBook?: string,
): BibleRecommendation {
  return getRecommendedReadingPair(history, excludeBook)[0];
}
