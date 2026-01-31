import { lazy, Suspense, useState, useEffect } from 'react';
import { BookOpen, Sparkles, Compass, ChevronRight, Calendar, X } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ExpandButton } from '@/components/ui/ExpandButton';
import { useDrawerExpand } from './DrawerExpandContext';
import { getReadingHistory, fetchPassage, type BibleReference, type BiblePassage } from '@/lib/bibleApi';
import { getRecommendedReading, getRecommendedReadingPair, type BibleRecommendation } from '@/lib/bibleRecommendations';
import { getQuizData } from '@/lib/onboardingState';

// ============ Topic Filters ============

interface TopicPassage {
  label: string;
  book: string;
  chapter: number;
  description: string;
}

interface TopicFilter {
  label: string;
  passages: TopicPassage[];
}

const PERSONA_TOPICS: Record<string, TopicFilter[]> = {
  new_to_faith: [
    {
      label: 'Grace',
      passages: [
        { label: 'Ephesians 2', book: 'Ephesians', chapter: 2, description: 'This is one of the clearest pictures of grace in all of Scripture — saved not by anything we\'ve done, but as a gift. If you\'re just beginning to understand what God has done for you, start here.' },
        { label: 'Titus 3', book: 'Titus', chapter: 3, description: 'Paul reminds Titus that God saved us not because of righteous things we\'d done, but because of His mercy. A short, powerful chapter that makes the gospel personal.' },
        { label: 'Romans 5', book: 'Romans', chapter: 5, description: 'While we were still sinners, Christ died for us. Paul explains how grace meets us exactly where we are — not after we\'ve cleaned ourselves up, but right in the middle of our mess.' },
      ],
    },
    {
      label: "God's Love",
      passages: [
        { label: '1 John 4', book: '1 John', chapter: 4, description: 'John makes the stunning declaration that God is love — not just that He shows love, but that love defines His very nature. This chapter transforms how we understand both God and each other.' },
        { label: 'Romans 8', book: 'Romans', chapter: 8, description: 'One of the most powerful chapters in all of Scripture — nothing can separate us from the love of God. If you need to be reminded that God is for you, start here.' },
        { label: 'John 3', book: 'John', chapter: 3, description: 'For God so loved the world that He gave His only Son. This chapter contains the most quoted verse in the Bible — and the story behind it is even richer than you might expect.' },
      ],
    },
    {
      label: 'Forgiveness',
      passages: [
        { label: 'Psalm 103', book: 'Psalms', chapter: 103, description: 'David sings about a God who removes our sins as far as the east is from the west. This psalm is pure comfort — a reminder that God\'s compassion never runs out.' },
        { label: '1 John 1', book: '1 John', chapter: 1, description: 'If we confess our sins, He is faithful and just to forgive. John writes with warmth and honesty about walking in the light and what it means to be made clean.' },
        { label: 'Colossians 3', book: 'Colossians', chapter: 3, description: 'Paul calls us to forgive as the Lord forgave us — and shows what a life reshaped by Christ actually looks like. Practical, beautiful, and deeply grounding.' },
      ],
    },
    {
      label: 'Who Jesus Is',
      passages: [
        { label: 'John 1', book: 'John', chapter: 1, description: 'In the beginning was the Word — and the Word became flesh. John opens his gospel with one of the most majestic introductions ever written, revealing who Jesus truly is.' },
        { label: 'Colossians 1', book: 'Colossians', chapter: 1, description: 'The image of the invisible God, the firstborn over all creation. Paul paints the most complete portrait of Christ\'s supremacy found anywhere in Scripture.' },
        { label: 'Hebrews 1', book: 'Hebrews', chapter: 1, description: 'The radiance of God\'s glory and the exact representation of His being. This chapter shows that Jesus is not just a prophet or teacher — He is God\'s final word to humanity.' },
      ],
    },
    {
      label: 'Salvation',
      passages: [
        { label: 'Romans 10', book: 'Romans', chapter: 10, description: 'If you confess with your mouth and believe in your heart. Paul makes the path to salvation breathtakingly simple — and explains why the good news is for everyone.' },
        { label: 'Acts 2', book: 'Acts', chapter: 2, description: 'Peter\'s sermon at Pentecost — the day the Spirit fell and 3,000 believed. This is the moment the church was born, and Peter\'s message is as urgent and clear today as it was then.' },
        { label: 'Ephesians 1', book: 'Ephesians', chapter: 1, description: 'Chosen before the foundation of the world, adopted as children, sealed with the Spirit. Paul unpacks the staggering scope of what God has done to bring us to Himself.' },
      ],
    },
    {
      label: 'Prayer',
      passages: [
        { label: 'Matthew 6', book: 'Matthew', chapter: 6, description: 'Jesus teaches His disciples how to pray — not with many words, but with honesty and trust. The Lord\'s Prayer isn\'t just a formula; it\'s a window into how Jesus related to His Father.' },
        { label: 'Philippians 4', book: 'Philippians', chapter: 4, description: 'Paul invites us to bring everything to God — every anxiety, every need — with thanksgiving. What follows is one of Scripture\'s greatest promises: the peace of God will guard your heart and mind.' },
        { label: 'Psalm 23', book: 'Psalms', chapter: 23, description: 'The Lord is my shepherd — I shall not want. Perhaps the most beloved psalm ever written. It\'s been a source of comfort for thousands of years, and it meets you wherever you are.' },
      ],
    },
  ],

  believer_going_deeper: [
    {
      label: 'Abiding',
      passages: [
        { label: 'John 15', book: 'John', chapter: 15, description: 'I am the vine, you are the branches — abide in me. Jesus speaks these words on the night before His death, revealing the secret to a fruitful spiritual life: staying connected to Him.' },
        { label: 'Psalm 1', book: 'Psalms', chapter: 1, description: 'Like a tree planted by streams of water, yielding fruit in season. This psalm draws a vivid contrast between two ways to live — and invites us to choose the one rooted in God\'s Word.' },
        { label: 'Colossians 3', book: 'Colossians', chapter: 3, description: 'Set your minds on things above — your life is hidden with Christ in God. Paul lays out what it looks like when our inner life with God reshapes everything on the outside.' },
      ],
    },
    {
      label: 'Spiritual Gifts',
      passages: [
        { label: '1 Corinthians 12', book: '1 Corinthians', chapter: 12, description: 'One body, many parts — each gifted by the Spirit for the good of all. Paul dismantles comparison and shows that every believer has an irreplaceable role in the body of Christ.' },
        { label: 'Romans 12', book: 'Romans', chapter: 12, description: 'Different gifts according to grace — use them faithfully. Paul moves from theology to practice, showing what a life transformed by the gospel actually looks like day to day.' },
        { label: 'Ephesians 4', book: 'Ephesians', chapter: 4, description: 'Gifts given to equip the saints and build up the body of Christ. Paul reveals that spiritual gifts aren\'t for personal glory — they\'re for the maturity of the whole church.' },
      ],
    },
    {
      label: 'Holiness',
      passages: [
        { label: '1 Peter 1', book: '1 Peter', chapter: 1, description: 'Be holy, because I am holy. Peter writes to believers scattered by persecution and calls them to a life set apart — not out of fear, but because of the incredible price that was paid for them.' },
        { label: 'Romans 12', book: 'Romans', chapter: 12, description: 'Offer your body as a living sacrifice, holy and pleasing to God. This is where Paul\'s great theological letter becomes deeply personal — an invitation to let God transform every part of your life.' },
        { label: 'Hebrews 12', book: 'Hebrews', chapter: 12, description: 'God disciplines those He loves — that we may share in His holiness. This chapter reframes hard seasons as evidence of a Father who cares deeply about who we\'re becoming.' },
      ],
    },
    {
      label: 'Suffering',
      passages: [
        { label: 'Romans 5', book: 'Romans', chapter: 5, description: 'Suffering produces perseverance, perseverance character, and character hope. Paul traces a path through pain that doesn\'t minimize it — but shows where it leads when God is in it.' },
        { label: 'James 1', book: 'James', chapter: 1, description: 'Count it joy when you face trials of various kinds — knowing that the testing of your faith produces steadfastness. James doesn\'t offer easy answers, but he offers something better: purpose.' },
        { label: '2 Corinthians 4', book: '2 Corinthians', chapter: 4, description: 'This light momentary affliction is preparing for us an eternal weight of glory. Paul writes from his own suffering, and the perspective he offers has sustained believers through the darkest valleys.' },
      ],
    },
    {
      label: 'Surrender',
      passages: [
        { label: 'Galatians 2', book: 'Galatians', chapter: 2, description: 'I have been crucified with Christ — it is no longer I who live, but Christ who lives in me. Paul describes the radical exchange at the heart of the Christian life: our life for His.' },
        { label: 'Philippians 3', book: 'Philippians', chapter: 3, description: 'I count everything as loss compared to the surpassing worth of knowing Christ Jesus. Paul had every reason to boast — and he gave it all up. This chapter reshapes what we value most.' },
        { label: 'Luke 9', book: 'Luke', chapter: 9, description: 'Whoever wants to save their life will lose it, but whoever loses their life for my sake will find it. Jesus speaks plainly about what it costs — and what it gains — to follow Him.' },
      ],
    },
    {
      label: 'Joy',
      passages: [
        { label: 'Philippians 4', book: 'Philippians', chapter: 4, description: 'Rejoice in the Lord always — I will say it again, rejoice. Paul writes this from prison. That context makes these words not a platitude but a testimony of joy that circumstances can\'t touch.' },
        { label: 'Nehemiah 8', book: 'Nehemiah', chapter: 8, description: 'The joy of the Lord is your strength. After years of exile, the people hear God\'s Word again and weep — but Nehemiah tells them to celebrate. Joy isn\'t the absence of grief; it\'s the presence of God.' },
        { label: 'Psalm 16', book: 'Psalms', chapter: 16, description: 'In your presence there is fullness of joy; at your right hand are pleasures forevermore. David discovers that the deepest joy isn\'t found in circumstances but in the presence of God Himself.' },
      ],
    },
  ],

  pastor_leader: [
    {
      label: 'Servant Leadership',
      passages: [
        { label: 'Mark 10', book: 'Mark', chapter: 10, description: 'Whoever wants to be great among you must be servant of all. Jesus turns the world\'s model of leadership inside out — and shows that true authority flows from humility and sacrifice.' },
        { label: 'John 13', book: 'John', chapter: 13, description: 'Jesus takes off His outer garment, kneels down, and washes His disciples\' feet. This isn\'t just a lesson about humility — it\'s a portrait of the kind of leader God is forming you to be.' },
        { label: 'Philippians 2', book: 'Philippians', chapter: 2, description: 'He emptied Himself, taking the form of a servant. Paul holds up Jesus as the ultimate model — someone who had every right to lead from above, but chose to lead from below.' },
      ],
    },
    {
      label: 'Shepherding',
      passages: [
        { label: 'John 10', book: 'John', chapter: 10, description: 'The good shepherd lays down his life for the sheep. Jesus defines what it means to truly care for people — not as a hired hand, but with the kind of love that costs something.' },
        { label: '1 Peter 5', book: '1 Peter', chapter: 5, description: 'Shepherd the flock of God that is among you — not lording over them, but being examples. Peter writes to fellow pastors with the tenderness and authority of someone who learned the hard way.' },
        { label: 'Ezekiel 34', book: 'Ezekiel', chapter: 34, description: 'God confronts the shepherds of Israel who fed themselves instead of their flocks — then promises to shepherd His people Himself. A sobering and hopeful chapter for anyone who leads.' },
      ],
    },
    {
      label: 'Endurance',
      passages: [
        { label: 'Hebrews 12', book: 'Hebrews', chapter: 12, description: 'Run the race with endurance, looking to Jesus the author and finisher of our faith. This chapter is for every leader who is tired, discouraged, or tempted to quit.' },
        { label: '2 Timothy 4', book: '2 Timothy', chapter: 4, description: 'I have fought the good fight, I have finished the race. Paul\'s final words to Timothy — written from a Roman prison — are some of the most moving in all of Scripture.' },
        { label: 'Galatians 6', book: 'Galatians', chapter: 6, description: 'Let us not grow weary of doing good — for in due season we will reap, if we do not give up. Paul speaks directly to the exhaustion that faithful leaders know all too well.' },
      ],
    },
    {
      label: 'Teaching',
      passages: [
        { label: '2 Timothy 2', book: '2 Timothy', chapter: 2, description: 'A worker who has no need to be ashamed, rightly handling the word of truth. Paul charges Timothy with the sacred task of teaching well — and shows what faithful labor looks like.' },
        { label: 'Titus 2', book: 'Titus', chapter: 2, description: 'Teach what accords with sound doctrine. Paul gives Titus a framework for discipleship that is practical, intergenerational, and deeply rooted in the gospel.' },
        { label: 'Ezra 7', book: 'Ezra', chapter: 7, description: 'Ezra set his heart to study the Law of the Lord, to practice it, and to teach it. The order matters: study, practice, then teach. Ezra models a pattern every teacher needs.' },
      ],
    },
    {
      label: 'Calling',
      passages: [
        { label: 'Isaiah 6', book: 'Isaiah', chapter: 6, description: 'Here am I — send me. Isaiah encounters the holiness of God and is undone. From that encounter comes one of Scripture\'s most iconic responses — and a calling that changes everything.' },
        { label: 'Jeremiah 1', book: 'Jeremiah', chapter: 1, description: 'Before you were born I set you apart and appointed you. God speaks to a reluctant young prophet and reminds him — and us — that calling comes before confidence.' },
        { label: 'Ephesians 4', book: 'Ephesians', chapter: 4, description: 'Walk worthy of the calling you have received. Paul describes the unity and maturity that God\'s calling is meant to produce — in us and in the people we serve.' },
      ],
    },
    {
      label: 'Intercession',
      passages: [
        { label: 'Exodus 32', book: 'Exodus', chapter: 32, description: 'Moses stands in the gap and pleads for a rebellious people. This chapter shows what it looks like for a leader to carry their people before God — even when they don\'t deserve it.' },
        { label: 'Daniel 9', book: 'Daniel', chapter: 9, description: 'Daniel\'s prayer of confession and petition for Israel is one of the most powerful intercessions in the Bible. He doesn\'t stand apart from the sin — he identifies with his people.' },
        { label: '1 Timothy 2', book: '1 Timothy', chapter: 2, description: 'I urge that prayers and intercessions be made for all people. Paul grounds the life of the church in prayer — and shows that leading well always begins on our knees.' },
      ],
    },
  ],

  seminary_student: [
    {
      label: 'Covenant',
      passages: [
        { label: 'Genesis 15', book: 'Genesis', chapter: 15, description: 'God makes an unconditional covenant with Abraham — passing between the pieces alone. This chapter reveals the one-sided nature of God\'s promise and anchors the entire biblical storyline.' },
        { label: 'Jeremiah 31', book: 'Jeremiah', chapter: 31, description: 'A new covenant — not like the one I made with their fathers. Jeremiah looks ahead to a covenant written on hearts, not stone. This is the theological hinge of redemptive history.' },
        { label: 'Hebrews 8', book: 'Hebrews', chapter: 8, description: 'Jesus mediates a better covenant, established on better promises. The author of Hebrews connects Jeremiah\'s vision to Christ and shows how the old covenant finds its fulfillment.' },
      ],
    },
    {
      label: 'Atonement',
      passages: [
        { label: 'Leviticus 16', book: 'Leviticus', chapter: 16, description: 'The Day of Atonement — Israel\'s most sacred day, foreshadowing the ultimate sacrifice. Every detail in this chapter points forward to what Christ would accomplish once for all.' },
        { label: 'Isaiah 53', book: 'Isaiah', chapter: 53, description: 'He was pierced for our transgressions, crushed for our iniquities. The suffering servant passage is the Old Testament\'s most detailed portrait of substitutionary atonement.' },
        { label: 'Romans 3', book: 'Romans', chapter: 3, description: 'Justified freely by His grace through the redemption that is in Christ Jesus. Paul presents the theological heart of the gospel — how God can be both just and the justifier.' },
      ],
    },
    {
      label: 'Redemption',
      passages: [
        { label: 'Exodus 15', book: 'Exodus', chapter: 15, description: 'The song of Moses — Israel\'s first hymn of praise after God redeems them from Egypt. This chapter establishes the pattern: God rescues, and His people respond with worship.' },
        { label: 'Ruth 4', book: 'Ruth', chapter: 4, description: 'Boaz the kinsman-redeemer — a stunning picture of Christ embedded in a love story. The legal details of this chapter carry profound theological weight about how God redeems.' },
        { label: 'Galatians 3', book: 'Galatians', chapter: 3, description: 'Christ redeemed us from the curse of the law by becoming a curse for us. Paul connects Abraham, Moses, and Christ in a breathtaking argument about faith and freedom.' },
      ],
    },
    {
      label: 'Prophecy',
      passages: [
        { label: 'Isaiah 9', book: 'Isaiah', chapter: 9, description: 'Unto us a child is born — Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace. Isaiah speaks into the darkness of exile with a promise that would take 700 years to fulfill.' },
        { label: 'Micah 5', book: 'Micah', chapter: 5, description: 'Out of you, Bethlehem, shall come one who is to be ruler in Israel — whose coming forth is from of old. A minor prophet with a major prophecy, pinpointing the birthplace of the Messiah.' },
        { label: 'Daniel 7', book: 'Daniel', chapter: 7, description: 'One like a Son of Man, coming with the clouds of heaven — given dominion, glory, and a kingdom. This apocalyptic vision shapes how Jesus understood and described His own mission.' },
      ],
    },
    {
      label: 'Sovereignty',
      passages: [
        { label: 'Job 38', book: 'Job', chapter: 38, description: 'Where were you when I laid the earth\'s foundation? After 37 chapters of human debate, God finally speaks — and the answer isn\'t an explanation, but a revelation of who He is.' },
        { label: 'Romans 9', book: 'Romans', chapter: 9, description: 'The potter and the clay — God\'s sovereign purpose in election. Paul wrestles with the hardest theological questions and arrives not at a neat answer, but at worship.' },
        { label: 'Isaiah 46', book: 'Isaiah', chapter: 46, description: 'I am God, and there is no other — my purpose will stand, and I will do all that I please. Isaiah contrasts the powerless idols of Babylon with the God who declares the end from the beginning.' },
      ],
    },
    {
      label: 'Wisdom',
      passages: [
        { label: 'Proverbs 8', book: 'Proverbs', chapter: 8, description: 'Wisdom calls out — present before the world was made, rejoicing at God\'s side. This chapter personifies wisdom in ways that early Christians saw as pointing to Christ Himself.' },
        { label: 'Ecclesiastes 12', book: 'Ecclesiastes', chapter: 12, description: 'The conclusion of the matter: fear God and keep His commandments. After the most honest exploration of life\'s meaning in Scripture, Qohelet arrives here — and it\'s worth the journey.' },
        { label: 'Job 28', book: 'Job', chapter: 28, description: 'Where can wisdom be found? Humanity can mine the earth but not discover wisdom — only God understands its place. A poem about the limits of human knowledge and the beginning of true understanding.' },
      ],
    },
  ],

  exploring_faith: [
    {
      label: 'Meaning',
      passages: [
        { label: 'Ecclesiastes 3', book: 'Ecclesiastes', chapter: 3, description: 'A time for everything — God has set eternity in the human heart. The writer of Ecclesiastes is brutally honest about life\'s rhythms and asks the questions we all carry but rarely voice.' },
        { label: 'Psalm 8', book: 'Psalms', chapter: 8, description: 'What is mankind that you are mindful of them? David looks up at the night sky and asks the question that science can describe but never quite answer: why do we matter?' },
        { label: 'Romans 8', book: 'Romans', chapter: 8, description: 'All things work together for good for those who love God. Paul offers a vision of meaning that doesn\'t depend on everything going well — but on a God who is weaving it all together.' },
      ],
    },
    {
      label: 'Truth',
      passages: [
        { label: 'John 14', book: 'John', chapter: 14, description: 'I am the way, the truth, and the life. Jesus makes one of His boldest claims — not that He teaches truth, but that He is truth. This chapter is an invitation to explore what that means.' },
        { label: 'John 8', book: 'John', chapter: 8, description: 'You will know the truth, and the truth will set you free. Jesus speaks to people who thought they were already free — and gently shows them there\'s a deeper freedom available.' },
        { label: 'Proverbs 2', book: 'Proverbs', chapter: 2, description: 'Seek understanding like silver and search for it as hidden treasure. Solomon invites us on a treasure hunt — promising that the one who seeks wisdom wholeheartedly will find it.' },
      ],
    },
    {
      label: 'Doubt',
      passages: [
        { label: 'Mark 9', book: 'Mark', chapter: 9, description: 'I believe — help my unbelief! A desperate father speaks the most honest prayer in the Bible. If you\'ve ever felt caught between faith and doubt, this story was written for you.' },
        { label: 'Psalm 13', book: 'Psalms', chapter: 13, description: 'How long, O Lord? Will you forget me forever? David doesn\'t hide his frustration from God — he brings it directly. This psalm gives us permission to be honest about where we really are.' },
        { label: 'Habakkuk 1', book: 'Habakkuk', chapter: 1, description: 'Why do you tolerate wrongdoing? Habakkuk looks at the state of the world and demands answers from God. What makes this book remarkable is that God actually responds — and the conversation changes everything.' },
      ],
    },
    {
      label: 'Purpose',
      passages: [
        { label: 'Jeremiah 29', book: 'Jeremiah', chapter: 29, description: 'I know the plans I have for you — plans to prosper you, to give you hope and a future. Often quoted, rarely read in context. The full chapter makes these words even more powerful.' },
        { label: 'Ephesians 2', book: 'Ephesians', chapter: 2, description: 'Created in Christ Jesus for good works, which God prepared in advance for us to do. Paul says purpose isn\'t something we create — it\'s something we were created for.' },
        { label: 'Psalm 139', book: 'Psalms', chapter: 139, description: 'Fearfully and wonderfully made — all your days ordained before one of them came to be. David marvels at a God who was there before you were born and has been writing your story ever since.' },
      ],
    },
    {
      label: 'Hope',
      passages: [
        { label: 'Romans 8', book: 'Romans', chapter: 8, description: 'Nothing can separate us from the love of God. Paul makes his case for why hope isn\'t wishful thinking — it\'s rooted in a God who is unshakably, irreversibly for you.' },
        { label: 'Lamentations 3', book: 'Lamentations', chapter: 3, description: 'His mercies are new every morning — great is His faithfulness. Written from the depths of grief and exile, this chapter shows that real hope doesn\'t require pretending things are fine.' },
        { label: '1 Peter 1', book: '1 Peter', chapter: 1, description: 'A living hope through the resurrection of Jesus Christ. Peter writes to people who had every reason to despair — and gives them something that death itself couldn\'t destroy.' },
      ],
    },
    {
      label: 'Belonging',
      passages: [
        { label: 'Ephesians 1', book: 'Ephesians', chapter: 1, description: 'Chosen and adopted — accepted in the Beloved. Paul reveals that belonging isn\'t something you earn; it was decided before you were born by a God who wanted you in His family.' },
        { label: '1 John 3', book: '1 John', chapter: 3, description: 'See what kind of love the Father has given us, that we should be called children of God — and so we are. John marvels at the identity God gives to those who come to Him.' },
        { label: 'Romans 8', book: 'Romans', chapter: 8, description: 'You did not receive a spirit of slavery, but a spirit of adoption — by which we cry, "Abba, Father." Paul says we\'re not outsiders or strangers. We\'re heirs. We belong.' },
      ],
    },
  ],
};

// ============ Reading Plans ============

interface ReadingPlan {
  name: string;
  duration: string;
  description: string;
  firstBook: string;
  firstChapter: number;
}

const READING_PLANS: Record<string, ReadingPlan> = {
  new_to_faith: {
    name: 'The Story of Jesus',
    duration: '7 days',
    description: 'Walk through the life of Jesus in the Gospel of John — from His first miracle to His final words.',
    firstBook: 'John',
    firstChapter: 1,
  },
  believer_going_deeper: {
    name: 'The Heart of the Gospel',
    duration: '10 days',
    description: 'Journey through Romans and discover the theological foundation that has shaped believers for two thousand years.',
    firstBook: 'Romans',
    firstChapter: 1,
  },
  pastor_leader: {
    name: 'Leading Like Jesus',
    duration: '7 days',
    description: 'Explore how Jesus shaped, challenged, and empowered the people He led — from calling disciples to sending them out.',
    firstBook: 'Mark',
    firstChapter: 1,
  },
  seminary_student: {
    name: 'Christ in All of Scripture',
    duration: '14 days',
    description: 'Trace the thread of redemption from Genesis to Revelation and see how every book points to Jesus.',
    firstBook: 'Genesis',
    firstChapter: 1,
  },
  exploring_faith: {
    name: 'Honest Questions',
    duration: '7 days',
    description: 'Read alongside people who asked hard questions — from a doubting father to a searching philosopher.',
    firstBook: 'Ecclesiastes',
    firstChapter: 1,
  },
};

const Bible = lazy(() => import('@/pages/Bible'));

// ============ Sub-components ============

function RecommendationRow({
  recommendation,
  onClick,
}: {
  recommendation: BibleRecommendation;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full text-left py-3.5 px-2 -mx-2 rounded-xl hover:bg-foreground/[0.03] transition-colors group"
    >
      <div className="w-9 h-9 rounded-lg bg-[#756653]/10 dark:bg-[#A5A597]/10 flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-[#756653]/70 dark:text-[#A5A597]/70" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground/80 truncate">
          {recommendation.label}
        </p>
        <p className="text-[11px] text-foreground/40">
          {recommendation.reason}
        </p>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-foreground/20 group-hover:text-foreground/40 transition-colors flex-shrink-0" />
    </button>
  );
}

function BrowseRow({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full text-left py-2 px-2 -mx-2 rounded-xl hover:bg-foreground/[0.03] transition-colors group"
    >
      <div className="w-8 h-8 rounded-lg bg-foreground/[0.04] flex items-center justify-center flex-shrink-0">
        <Compass className="w-4 h-4 text-foreground/35" />
      </div>
      <p className="text-sm text-foreground/50 font-medium">
        Browse All Books
      </p>
      <ChevronRight className="w-3.5 h-3.5 text-foreground/15 group-hover:text-foreground/35 transition-colors flex-shrink-0 ml-auto" />
    </button>
  );
}

// ============ Expanded Content ============

function ExpandedBible({ initialReference }: { initialReference?: BibleReference }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full text-foreground/40">Loading...</div>}>
      <Bible embedded initialReference={initialReference} />
    </Suspense>
  );
}

// ============ Main Component ============

export function ContinueReadingCard() {
  const { expand } = useDrawerExpand();
  const history = getReadingHistory();

  const mostRecent = history[0];
  const recommendation = getRecommendedReading(history, mostRecent?.book);
  const recommendationPair = getRecommendedReadingPair(history, mostRecent?.book);
  const quizData = getQuizData();

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topicFilters = PERSONA_TOPICS[quizData.spiritualBackground ?? ''] ?? PERSONA_TOPICS.exploring_faith;
  const activeFilter = topicFilters.find((f) => f.label === selectedTopic) ?? null;

  const emptyStateHeadline = (() => {
    switch (quizData.spiritualBackground) {
      case 'new_to_faith': return 'Start Your Bible Journey';
      case 'believer_going_deeper': return 'Go Deeper in Scripture';
      case 'pastor_leader': return 'Fuel Your Ministry';
      case 'seminary_student': return 'Sharpen Your Study';
      case 'exploring_faith': return 'Explore Scripture';
      default: return 'Discover Scripture';
    }
  })();

  const expandBible = (ref?: BibleReference) =>
    expand(<ExpandedBible initialReference={ref} />, 'bible');

  const handleNavigateToRec = () => {
    expandBible({ book: recommendation.book, chapter: recommendation.chapter });
  };

  const handleExpand = () =>
    expandBible(mostRecent ? { book: mostRecent.book, chapter: mostRecent.chapter } : undefined);

  const readingPlan = READING_PLANS[quizData.spiritualBackground ?? ''] ?? READING_PLANS.exploring_faith;

  if (!mostRecent) {
    // Empty state — personalized recommendations, topics, reading plan
    return (
      <GlassCard padding="none" className="flex flex-col h-full overflow-hidden relative">
        <div className="absolute top-4 right-4 z-10">
          <ExpandButton onClick={handleExpand} />
        </div>

        {/* Header */}
        <div className="px-5 pt-8 pb-4 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#756653]/10 dark:bg-[#E3E3DE]/10 flex items-center justify-center mb-6">
            <BookOpen className="w-8 h-8 text-[#756653]/60 dark:text-[#E3E3DE]/60" />
          </div>
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-foreground/40 dark:text-[#A5A597]">
            Scripture
          </p>
          <h3 className="text-2xl leading-snug mt-2 text-[#262721] dark:text-[#D0D0C8]">
            {emptyStateHeadline}
          </h3>
          <p className="text-sm text-foreground/40 mt-1">
            Passages chosen for where you are
          </p>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
          {/* Topic filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center pb-3">
            {topicFilters.map((filter) => {
              const isActive = selectedTopic === filter.label;
              return (
                <button
                  key={filter.label}
                  onClick={() => setSelectedTopic(isActive ? null : filter.label)}
                  className={`
                    flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
                    ${isActive
                      ? 'bg-[#756653]/12 border-[#756653]/40 text-foreground/80 dark:border-[#A5A597] dark:bg-[#A5A597]/12 dark:text-[#D0D0C8]'
                      : 'border-[#756653]/10 bg-[#756653]/[0.03] text-foreground/60 hover:border-[#756653]/25 hover:bg-[#756653]/5 hover:text-foreground/80 dark:border-[#A5A597]/20 dark:bg-[#A5A597]/[0.06] dark:text-[#A5A597] dark:hover:border-[#A5A597]/50 dark:hover:bg-[#A5A597]/10'}
                  `}
                >
                  {filter.label}
                  {isActive && (
                    <X className="w-3 h-3 text-foreground/40" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Filtered passage cards */}
          {activeFilter ? (
            activeFilter.passages.map((passage) => (
              <button
                key={passage.book + passage.chapter}
                onClick={() => expandBible({ book: passage.book, chapter: passage.chapter })}
                className="w-full rounded-xl text-left px-5 py-5 border border-[#756653]/15 dark:border-[#A5A597]/15 hover:border-[#756653]/35 dark:hover:border-[#A5A597]/35 hover:bg-[#756653]/5 dark:hover:bg-[#A5A597]/5 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-[#756653]/60 dark:text-[#A5A597]/60 flex-shrink-0" />
                  <span className="text-base font-semibold text-foreground/85">{passage.label}</span>
                </div>
                <p className="text-[13px] leading-relaxed text-foreground/55">
                  {passage.description}
                </p>
              </button>
            ))
          ) : (
            <>
              {/* Two recommendation cards (default view) */}
              {recommendationPair.map((rec) => (
                <button
                  key={rec.book + rec.chapter}
                  onClick={() => expandBible({ book: rec.book, chapter: rec.chapter })}
                  className="w-full rounded-xl text-left px-5 py-5 border border-[#756653]/15 dark:border-[#A5A597]/15 hover:border-[#756653]/35 dark:hover:border-[#A5A597]/35 hover:bg-[#756653]/5 dark:hover:bg-[#A5A597]/5 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-[#756653]/60 dark:text-[#A5A597]/60 flex-shrink-0" />
                    <span className="text-base font-semibold text-foreground/85">{rec.label}</span>
                    <span className="ml-auto text-[9px] font-medium uppercase tracking-wider text-foreground/30">
                      Start Here
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-foreground/55">
                    {rec.reason}
                  </p>
                </button>
              ))}

              {/* Reading plan card */}
              <button
                onClick={() => expandBible({ book: readingPlan.firstBook, chapter: readingPlan.firstChapter })}
                className="w-full rounded-xl text-left px-5 py-5 border border-foreground/[0.08] hover:border-[#756653]/25 dark:hover:border-[#A5A597]/25 hover:bg-[#756653]/[0.03] dark:hover:bg-[#A5A597]/[0.03] hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[#756653]/50 dark:text-[#A5A597]/50 flex-shrink-0" />
                  <span className="text-base font-semibold text-foreground/80">{readingPlan.name}</span>
                </div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[#756653]/60 dark:text-[#A5A597]/60 bg-[#756653]/10 dark:bg-[#A5A597]/10 px-2 py-0.5 rounded-full">
                    {readingPlan.duration}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/30">
                    Reading Plan
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-foreground/50">
                  {readingPlan.description}
                </p>
              </button>
            </>
          )}
        </div>

        {/* Browse all */}
        <div className="px-5 pb-4 pt-2 border-t border-foreground/[0.05]">
          <button
            onClick={() => expandBible()}
            className="flex items-center justify-center gap-1 w-full text-xs font-medium text-foreground/40 hover:text-foreground/60 transition-colors py-1"
          >
            Browse All Books
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </GlassCard>
    );
  }

  return (
    <ActiveReadingCard
      mostRecent={mostRecent}
      recommendation={recommendation}
      expandBible={expandBible}
      handleExpand={handleExpand}
      handleNavigateToRec={handleNavigateToRec}
    />
  );
}

// ============ Active Reading Card (has history) ============

function ActiveReadingCard({
  mostRecent,
  recommendation,
  expandBible,
  handleExpand,
  handleNavigateToRec,
}: {
  mostRecent: { book: string; chapter: number };
  recommendation: BibleRecommendation;
  expandBible: (ref?: BibleReference) => void;
  handleExpand: () => void;
  handleNavigateToRec: () => void;
}) {
  const [preview, setPreview] = useState<BiblePassage | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPassage({ book: mostRecent.book, chapter: mostRecent.chapter }).then(
      (passage) => {
        if (!cancelled) setPreview(passage);
      }
    );
    return () => { cancelled = true; };
  }, [mostRecent.book, mostRecent.chapter]);

  const resumeRef: BibleReference = { book: mostRecent.book, chapter: mostRecent.chapter };

  return (
    <GlassCard padding="none" className="flex flex-col h-full overflow-hidden">
      {/* Header — label + expand */}
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#756653]/10 dark:bg-[#E3E3DE]/10 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-4 h-4 text-[#756653]/70 dark:text-[#E3E3DE]/70" />
          </div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/40 dark:text-[#A5A597]">
            Continue Reading
          </p>
        </div>
        <ExpandButton onClick={handleExpand} />
      </div>

      {/* Book + Chapter headline */}
      <h3 className="text-lg font-semibold text-foreground dark:text-[#D0D0C8] leading-tight px-5 mt-2 mb-3">
        {mostRecent.book} <span className="text-foreground/50 font-normal">{mostRecent.chapter}</span>
      </h3>

      {/* Passage preview */}
      <button
        onClick={() => expandBible(resumeRef)}
        className="mx-5 flex-1 min-h-0 rounded-xl relative overflow-hidden text-left transition-colors"
        style={{ backgroundColor: '#F5F2ED' }}
      >
        <div className="px-4 pt-3 pb-6">
          {preview ? (
            <p className="text-[13px] leading-relaxed text-foreground/70">
              {preview.verses.map((v) => (
                <span key={v.number}>
                  <sup className="text-[9px] text-foreground/30 mr-0.5">{v.number}</sup>
                  {v.text}{' '}
                </span>
              ))}
            </p>
          ) : (
            <div className="space-y-2 animate-pulse">
              <div className="h-3 bg-foreground/[0.06] rounded w-full" />
              <div className="h-3 bg-foreground/[0.06] rounded w-[90%]" />
              <div className="h-3 bg-foreground/[0.06] rounded w-[75%]" />
            </div>
          )}
        </div>
        {/* Fade-out gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(245,242,237,0), #F5F2ED)',
          }}
        />
      </button>

      {/* Resume CTA */}
      <div className="px-5 pt-4 pb-4 border-b border-foreground/[0.06]">
        <button
          onClick={() => expandBible(resumeRef)}
          className="w-full py-2.5 rounded-xl text-sm font-medium text-[#756653] dark:text-[#A5A597] border border-[#756653]/25 dark:border-[#A5A597]/25 hover:bg-[#756653]/10 dark:hover:bg-[#A5A597]/10 hover:border-[#756653]/40 dark:hover:border-[#A5A597]/40 hover:shadow-sm transition-all duration-200"
        >
          Resume Reading
        </button>
      </div>

      {/* Recommended Reading */}
      <div className="px-5 pt-4 pb-4 border-b border-foreground/[0.06]">
        <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/40 mb-1 px-2">
          Recommended Reading
        </p>
        <RecommendationRow
          recommendation={recommendation}
          onClick={handleNavigateToRec}
        />
      </div>

      {/* Browse All Books */}
      <div className="px-5 pt-3 pb-4">
        <BrowseRow onClick={() => expandBible()} />
      </div>
    </GlassCard>
  );
}
