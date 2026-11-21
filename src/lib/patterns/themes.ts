// ============ Pattern Explorer: theme threads ============
//
// DRAFT content, hidden from users until reviewed (set `reviewed: true` to publish).
// Review list: docs/patterns-review.md. Preview in the app with ?drafts=1.

import type { BibleReference } from '@/lib/bibleApi';

export interface ThreadPoint {
  label: string;
  ref: BibleReference;
  note: string;
}

export interface Theme {
  id: string;
  title: string;
  summary: string;
  aboutGod: string;
  points: ThreadPoint[];
  reviewed: boolean;
}

const p = (label: string, book: string, chapter: number, verse: number, note: string): ThreadPoint => ({ label, ref: { book, chapter, verse }, note });

export const THEMES: Theme[] = [
  {
    id: 'presence',
    title: 'God’s presence with His people',
    summary: 'From a garden to a tent to a temple to a person to a people to a renewed world — God keeps moving closer.',
    aboutGod: 'God wants to dwell with His people. Sin drives us out, but He makes a way back, until finally He lives among us forever.',
    points: [
      p('Genesis 3:8', 'Genesis', 3, 8, 'God walks with Adam and Eve in the garden — until sin breaks the relationship.'),
      p('Exodus 25:8', 'Exodus', 25, 8, '“Let them make Me a sanctuary, that I may dwell among them.” The tabernacle travels with Israel.'),
      p('1 Kings 8:10–11', '1 Kings', 8, 10, 'God’s glory fills Solomon’s temple so fully the priests cannot stand.'),
      p('Ezekiel 10:18', 'Ezekiel', 10, 18, 'Before the exile, Ezekiel sees the glory leave the temple.'),
      p('John 1:14', 'John', 1, 14, 'The Word became flesh and “tabernacled” among us — God’s presence in a person.'),
      p('1 Corinthians 3:16', '1 Corinthians', 3, 16, 'Now God’s people are His temple, and His Spirit lives in them.'),
      p('Revelation 21:3', 'Revelation', 21, 3, '“The dwelling place of God is with man.” The whole new creation becomes His home.'),
    ],
    reviewed: false,
  },
  {
    id: 'lamb',
    title: 'The Lamb and the sacrifice',
    summary: 'From Isaac’s question on the mountain to the Lamb on the throne, the Bible traces one answer to sin.',
    aboutGod: 'God provides the sacrifice Himself. What He required, He gave — His own Son.',
    points: [
      p('Genesis 22:8', 'Genesis', 22, 8, '“God will provide for Himself the lamb,” Abraham tells Isaac.'),
      p('Exodus 12:13', 'Exodus', 12, 13, 'The blood of the Passover lamb on the doorposts: “When I see the blood, I will pass over you.”'),
      p('Leviticus 16:21–22', 'Leviticus', 16, 21, 'On the Day of Atonement, the people’s sins are placed on a goat and carried away.'),
      p('Isaiah 53:7', 'Isaiah', 53, 7, 'The Servant is “like a lamb led to the slaughter” — bearing the sins of many.'),
      p('John 1:29', 'John', 1, 29, '“Behold, the Lamb of God, who takes away the sin of the world!”'),
      p('1 Peter 1:19', '1 Peter', 1, 19, 'Redeemed “with the precious blood of Christ, like that of a lamb without blemish.”'),
      p('Revelation 5:12', 'Revelation', 5, 12, '“Worthy is the Lamb who was slain” — the Lamb now reigns.'),
    ],
    reviewed: false,
  },
  {
    id: 'offspring',
    title: 'The promised offspring',
    summary: 'A promise in the garden narrows to one family, one tribe, one house — and finally one Son.',
    aboutGod: 'God keeps His promises across thousands of years and generations, through failures and exiles, exactly as He said.',
    points: [
      p('Genesis 3:15', 'Genesis', 3, 15, 'The woman’s offspring will crush the serpent’s head.'),
      p('Genesis 22:18', 'Genesis', 22, 18, 'Through Abraham’s offspring all nations will be blessed.'),
      p('Genesis 49:10', 'Genesis', 49, 10, 'The scepter will not depart from Judah.'),
      p('2 Samuel 7:12–13', '2 Samuel', 7, 12, 'God promises David a son whose throne will last forever.'),
      p('Isaiah 9:6–7', 'Isaiah', 9, 6, 'A child born to us will sit on David’s throne with endless peace.'),
      p('Galatians 3:16', 'Galatians', 3, 16, 'The promised offspring is one person: Christ.'),
    ],
    reviewed: false,
  },
  {
    id: 'kingdom',
    title: 'King and kingdom',
    summary: 'Israel wants a king like the nations; God promises a King like no other.',
    aboutGod: 'God is the true King, and He rules through His chosen Son — with justice, humility, and self-giving love.',
    points: [
      p('1 Samuel 8:7', '1 Samuel', 8, 7, '“They have rejected Me from being king over them.”'),
      p('2 Samuel 7:16', '2 Samuel', 7, 16, 'David’s house and kingdom will be established forever.'),
      p('Psalm 2:6', 'Psalms', 2, 6, '“I have set My King on Zion, My holy hill.”'),
      p('Daniel 7:13–14', 'Daniel', 7, 13, 'One like a son of man receives an everlasting kingdom.'),
      p('Mark 1:15', 'Mark', 1, 15, '“The kingdom of God is at hand.”'),
      p('Revelation 11:15', 'Revelation', 11, 15, '“The kingdom of the world has become the kingdom of our Lord and of His Christ.”'),
    ],
    reviewed: false,
  },
  {
    id: 'exodus',
    title: 'Exodus and redemption',
    summary: 'The exodus from Egypt becomes the pattern for every rescue that follows — and for the greatest one.',
    aboutGod: 'God hears the cries of the oppressed and acts with power to set His people free.',
    points: [
      p('Exodus 6:6', 'Exodus', 6, 6, '“I will redeem you with an outstretched arm.”'),
      p('Exodus 14:13', 'Exodus', 14, 13, '“See the salvation of the LORD” at the sea.'),
      p('Isaiah 43:16–19', 'Isaiah', 43, 16, 'The God who made a path through the sea promises “a new thing” — a new exodus.'),
      p('Luke 9:31', 'Luke', 9, 31, 'Moses and Elijah speak with Jesus about His “departure” — literally His exodus — at Jerusalem.'),
      p('1 Corinthians 10:1–4', '1 Corinthians', 10, 1, 'Israel’s journey through the sea and wilderness pictures life in Christ.'),
      p('Revelation 15:3', 'Revelation', 15, 3, 'The redeemed sing “the song of Moses … and the song of the Lamb.”'),
    ],
    reviewed: false,
  },
  {
    id: 'shepherd',
    title: 'The Shepherd',
    summary: 'God leads His flock — and promises a shepherd-king who lays down His life.',
    aboutGod: 'God is not distant: He guides, provides for, protects, and seeks out His people one by one.',
    points: [
      p('Genesis 48:15', 'Genesis', 48, 15, 'Jacob speaks of “the God who has been my shepherd all my life.”'),
      p('Psalm 23:1', 'Psalms', 23, 1, '“The LORD is my shepherd.”'),
      p('Ezekiel 34:11', 'Ezekiel', 34, 11, '“I Myself will search for My sheep.”'),
      p('John 10:11', 'John', 10, 11, '“I am the good shepherd. The good shepherd lays down His life for the sheep.”'),
      p('Hebrews 13:20', 'Hebrews', 13, 20, 'God brought back from the dead “the great Shepherd of the sheep.”'),
      p('Revelation 7:17', 'Revelation', 7, 17, 'The Lamb will be their shepherd and guide them to springs of living water.'),
    ],
    reviewed: false,
  },
  {
    id: 'bread',
    title: 'Bread from heaven',
    summary: 'From manna in the wilderness to the Lord’s Supper, God feeds His people.',
    aboutGod: 'God provides daily — and gives Himself as the bread that truly satisfies.',
    points: [
      p('Exodus 16:4', 'Exodus', 16, 4, '“I will rain bread from heaven for you.”'),
      p('Deuteronomy 8:3', 'Deuteronomy', 8, 3, 'Man does not live by bread alone, but by every word from God.'),
      p('Matthew 6:11', 'Matthew', 6, 11, '“Give us this day our daily bread.”'),
      p('Mark 6:41', 'Mark', 6, 41, 'Jesus feeds five thousand with five loaves.'),
      p('John 6:35', 'John', 6, 35, '“I am the bread of life.”'),
      p('Luke 22:19', 'Luke', 22, 19, '“This is My body, given for you.”'),
    ],
    reviewed: false,
  },
  {
    id: 'water',
    title: 'Living water',
    summary: 'Rivers in Eden, water from the rock, a river from the temple — and the water of life.',
    aboutGod: 'God is the spring of life who satisfies the thirsty and makes dry places bloom.',
    points: [
      p('Genesis 2:10', 'Genesis', 2, 10, 'A river flows out of Eden to water the garden.'),
      p('Exodus 17:6', 'Exodus', 17, 6, 'Water flows from the rock in the desert.'),
      p('Jeremiah 2:13', 'Jeremiah', 2, 13, 'God is “the fountain of living waters,” yet His people dig broken cisterns.'),
      p('Ezekiel 47:1', 'Ezekiel', 47, 1, 'A river flows from the temple, bringing life wherever it goes.'),
      p('John 4:14', 'John', 4, 14, 'Jesus offers water that becomes “a spring welling up to eternal life.”'),
      p('Revelation 22:1', 'Revelation', 22, 1, 'The river of the water of life flows from the throne of God and of the Lamb.'),
    ],
    reviewed: false,
  },
  {
    id: 'light',
    title: 'Light in the darkness',
    summary: 'The first word of creation is light, and the Bible ends in a city that needs no sun.',
    aboutGod: 'God is light. He shines into our darkness and makes His people lights to the world.',
    points: [
      p('Genesis 1:3', 'Genesis', 1, 3, '“Let there be light.”'),
      p('Exodus 13:21', 'Exodus', 13, 21, 'A pillar of fire lights Israel’s way by night.'),
      p('Psalm 27:1', 'Psalms', 27, 1, '“The LORD is my light and my salvation.”'),
      p('Isaiah 9:2', 'Isaiah', 9, 2, 'People walking in darkness have seen a great light.'),
      p('John 8:12', 'John', 8, 12, '“I am the light of the world.”'),
      p('Revelation 21:23', 'Revelation', 21, 23, 'The glory of God gives the city light, and its lamp is the Lamb.'),
    ],
    reviewed: false,
  },
  {
    id: 'rest',
    title: 'Rest',
    summary: 'God rests on the seventh day, gives Israel the Sabbath, and offers a deeper rest in Christ.',
    aboutGod: 'God is not a slave-driver. He invites His people to stop, trust Him, and enjoy what He has done.',
    points: [
      p('Genesis 2:2–3', 'Genesis', 2, 2, 'God rests from His work and blesses the seventh day.'),
      p('Exodus 20:8–11', 'Exodus', 20, 8, '“Remember the Sabbath day, to keep it holy.”'),
      p('Psalm 95:11', 'Psalms', 95, 11, 'A rebellious generation does not enter God’s rest.'),
      p('Matthew 11:28', 'Matthew', 11, 28, '“Come to Me … and I will give you rest.”'),
      p('Hebrews 4:9–10', 'Hebrews', 4, 9, '“There remains a Sabbath rest for the people of God.”'),
      p('Revelation 14:13', 'Revelation', 14, 13, 'Those who die in the Lord rest from their labors.'),
    ],
    reviewed: false,
  },
  {
    id: 'spirit',
    title: 'The Spirit of God',
    summary: 'The Spirit hovers over creation, rests on a few in the Old Testament, and is poured out on all God’s people.',
    aboutGod: 'God does not leave His people on their own — He gives Himself, by His Spirit, to live within them.',
    points: [
      p('Genesis 1:2', 'Genesis', 1, 2, 'The Spirit of God hovers over the waters.'),
      p('Numbers 11:29', 'Numbers', 11, 29, 'Moses longs for all God’s people to have the Spirit.'),
      p('Ezekiel 36:27', 'Ezekiel', 36, 27, '“I will put My Spirit within you.”'),
      p('Joel 2:28', 'Joel', 2, 28, '“I will pour out My Spirit on all flesh.”'),
      p('John 14:16–17', 'John', 14, 16, 'Jesus promises another Helper, the Spirit of truth.'),
      p('Acts 2:4', 'Acts', 2, 4, 'At Pentecost, all are filled with the Holy Spirit.'),
      p('Romans 8:11', 'Romans', 8, 11, 'The Spirit who raised Jesus will give life to our mortal bodies.'),
    ],
    reviewed: false,
  },
  {
    id: 'wilderness',
    title: 'The wilderness',
    summary: 'A place of testing, provision, and meeting God.',
    aboutGod: 'God meets His people in dry and difficult places, and uses them to teach dependence on Him.',
    points: [
      p('Deuteronomy 8:2', 'Deuteronomy', 8, 2, 'God led Israel forty years in the wilderness to humble and test them.'),
      p('1 Kings 19:4', '1 Kings', 19, 4, 'Elijah, exhausted, is fed by God in the wilderness.'),
      p('Hosea 2:14', 'Hosea', 2, 14, 'God will lead His unfaithful people into the wilderness and speak tenderly to her.'),
      p('Isaiah 40:3', 'Isaiah', 40, 3, '“In the wilderness prepare the way of the LORD.”'),
      p('Matthew 4:1', 'Matthew', 4, 1, 'Jesus is tested forty days in the wilderness — and stands where Israel fell.'),
      p('Revelation 12:6', 'Revelation', 12, 6, 'God prepares a place in the wilderness to nourish His people.'),
    ],
    reviewed: false,
  },
  {
    id: 'exile-return',
    title: 'Exile and homecoming',
    summary: 'Sent out of the garden, out of the land — and brought home again.',
    aboutGod: 'God disciplines, but He does not abandon. He goes after His wandering people and brings them home.',
    points: [
      p('Genesis 3:24', 'Genesis', 3, 24, 'Adam and Eve are driven out of the garden.'),
      p('2 Kings 25:11', '2 Kings', 25, 11, 'Judah is carried into exile in Babylon.'),
      p('Jeremiah 29:10–11', 'Jeremiah', 29, 10, 'After seventy years, God will bring them back — “plans for welfare and not for evil.”'),
      p('Ezra 1:3', 'Ezra', 1, 3, 'Cyrus lets the exiles go home to rebuild.'),
      p('Luke 15:20', 'Luke', 15, 20, 'The father runs to welcome the son who comes home.'),
      p('1 Peter 1:1', '1 Peter', 1, 1, 'Christians are “exiles,” on the way to their true home.'),
      p('Revelation 21:2', 'Revelation', 21, 2, 'The holy city comes down — home at last.'),
    ],
    reviewed: false,
  },
  {
    id: 'priest',
    title: 'Priest and mediator',
    summary: 'Priests stood between God and the people; Jesus is the great High Priest, and His people become priests.',
    aboutGod: 'God provides a mediator so sinners can come near Him — and now opens the way for all who trust Christ.',
    points: [
      p('Exodus 28:1', 'Exodus', 28, 1, 'Aaron and his sons are set apart to serve as priests.'),
      p('Psalm 110:4', 'Psalms', 110, 4, '“You are a priest forever after the order of Melchizedek.”'),
      p('Hebrews 4:14–16', 'Hebrews', 4, 14, 'Jesus is our great High Priest — so we draw near with confidence.'),
      p('Hebrews 7:25', 'Hebrews', 7, 25, 'He always lives to intercede for those who draw near to God through Him.'),
      p('1 Peter 2:9', '1 Peter', 2, 9, 'God’s people are “a royal priesthood.”'),
      p('Revelation 1:6', 'Revelation', 1, 6, 'Christ has made us a kingdom, priests to His God and Father.'),
    ],
    reviewed: false,
  },
  {
    id: 'new-creation',
    title: 'Garden and new creation',
    summary: 'The story begins in a garden and ends in a garden-city where everything is made new.',
    aboutGod: 'God does not give up on His world. He will renew it completely, undoing the curse.',
    points: [
      p('Genesis 2:8', 'Genesis', 2, 8, 'God plants a garden in Eden.'),
      p('Genesis 3:17', 'Genesis', 3, 17, 'The ground is cursed because of sin.'),
      p('Isaiah 65:17', 'Isaiah', 65, 17, '“I create new heavens and a new earth.”'),
      p('John 20:15', 'John', 20, 15, 'On resurrection morning, Mary mistakes the risen Jesus for the gardener.'),
      p('2 Corinthians 5:17', '2 Corinthians', 5, 17, 'If anyone is in Christ, he is a new creation.'),
      p('Revelation 22:2–3', 'Revelation', 22, 2, 'The tree of life returns, and there is no more curse.'),
    ],
    reviewed: false,
  },
  {
    id: 'bride',
    title: 'Bride and Bridegroom',
    summary: 'Marriage pictures God’s faithful love for His people, even when they are unfaithful.',
    aboutGod: 'God loves His people with covenant faithfulness — pursuing, forgiving, and finally rejoicing over them like a groom over his bride.',
    points: [
      p('Genesis 2:24', 'Genesis', 2, 24, 'The two become one flesh.'),
      p('Isaiah 54:5', 'Isaiah', 54, 5, '“Your Maker is your husband.”'),
      p('Hosea 2:19–20', 'Hosea', 2, 19, '“I will betroth you to Me forever … in faithfulness.”'),
      p('John 3:29', 'John', 3, 29, 'John the Baptist calls Jesus the bridegroom.'),
      p('Ephesians 5:25–27', 'Ephesians', 5, 25, 'Christ loved the church and gave Himself up for her.'),
      p('Revelation 19:7', 'Revelation', 19, 7, '“The marriage of the Lamb has come, and His Bride has made herself ready.”'),
    ],
    reviewed: false,
  },
  {
    id: 'firstborn',
    title: 'The firstborn',
    summary: 'The firstborn belong to God — and Jesus is the firstborn over all creation and from the dead.',
    aboutGod: 'God claims His people as His own treasured children, and gives His own firstborn Son for them.',
    points: [
      p('Exodus 4:22', 'Exodus', 4, 22, '“Israel is My firstborn son.”'),
      p('Exodus 13:2', 'Exodus', 13, 2, 'Every firstborn is to be set apart to the LORD.'),
      p('Psalm 89:27', 'Psalms', 89, 27, 'God will make David’s heir “the firstborn, the highest of the kings.”'),
      p('Luke 2:7', 'Luke', 2, 7, 'Mary gives birth to her firstborn son.'),
      p('Colossians 1:15–18', 'Colossians', 1, 15, 'Christ is the firstborn of all creation and the firstborn from the dead.'),
      p('Hebrews 12:23', 'Hebrews', 12, 23, 'Believers are “the assembly of the firstborn.”'),
    ],
    reviewed: false,
  },
  {
    id: 'mountain',
    title: 'The mountain of God',
    summary: 'God meets His people on mountains — Moriah, Sinai, Zion, the Mount of Transfiguration.',
    aboutGod: 'The holy God draws near, and in Christ He makes a way for us to come to His holy mountain.',
    points: [
      p('Genesis 22:14', 'Genesis', 22, 14, '“On the mount of the LORD it shall be provided.”'),
      p('Exodus 19:20', 'Exodus', 19, 20, 'The LORD comes down on Mount Sinai.'),
      p('Isaiah 2:2–3', 'Isaiah', 2, 2, 'All nations will stream to the mountain of the LORD’s house.'),
      p('Matthew 17:1–2', 'Matthew', 17, 1, 'Jesus is transfigured on a high mountain.'),
      p('Hebrews 12:22', 'Hebrews', 12, 22, '“You have come to Mount Zion … the city of the living God.”'),
      p('Revelation 21:10', 'Revelation', 21, 10, 'John is carried to a great, high mountain to see the holy city.'),
    ],
    reviewed: false,
  },
  {
    id: 'name',
    title: 'The name of the LORD',
    summary: 'God reveals His name, His people call on it, and every knee will bow to the name above every name.',
    aboutGod: 'God makes Himself known personally. His name is His character — and it is a refuge for all who run to Him.',
    points: [
      p('Exodus 3:14–15', 'Exodus', 3, 14, '“I AM WHO I AM … This is My name forever.”'),
      p('Exodus 34:5–6', 'Exodus', 34, 5, 'God proclaims His name: merciful, gracious, abounding in steadfast love.'),
      p('Psalm 8:1', 'Psalms', 8, 1, '“How majestic is Your name in all the earth!”'),
      p('Proverbs 18:10', 'Proverbs', 18, 10, '“The name of the LORD is a strong tower.”'),
      p('John 17:6', 'John', 17, 6, 'Jesus has made God’s name known.'),
      p('Philippians 2:9–10', 'Philippians', 2, 9, 'God gave Jesus the name above every name.'),
    ],
    reviewed: false,
  },
  {
    id: 'glory',
    title: 'The glory of God',
    summary: 'God’s glory is seen in creation, filling the tabernacle and temple, and shining in the face of Jesus.',
    aboutGod: 'God is weighty, radiant, and worthy — and He shares His glory by making Himself known in Christ.',
    points: [
      p('Psalm 19:1', 'Psalms', 19, 1, '“The heavens declare the glory of God.”'),
      p('Exodus 33:18', 'Exodus', 33, 18, 'Moses prays, “Please show me Your glory.”'),
      p('Isaiah 6:3', 'Isaiah', 6, 3, '“The whole earth is full of His glory.”'),
      p('Ezekiel 43:2', 'Ezekiel', 43, 2, 'The glory returns to the temple in Ezekiel’s vision.'),
      p('John 1:14', 'John', 1, 14, '“We have seen His glory, glory as of the only Son.”'),
      p('2 Corinthians 4:6', '2 Corinthians', 4, 6, 'The light of God’s glory shines in the face of Jesus Christ.'),
    ],
    reviewed: false,
  },
];
