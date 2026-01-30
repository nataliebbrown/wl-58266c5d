import { getQuizData } from '@/lib/onboardingState';
import type { ReadingHistoryEntry } from '@/lib/bibleApi';

// ============ Types ============

export interface BibleRecommendation {
  book: string;
  chapter: number;
  label: string;
  reason: string;
}

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

export function getRecommendedReadingPair(
  history: ReadingHistoryEntry[],
  excludeBook?: string,
): [BibleRecommendation, BibleRecommendation] {
  const quizData = getQuizData();
  const recentBooks = new Set(history.map((e) => e.book));
  if (excludeBook) recentBooks.add(excludeBook);

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
