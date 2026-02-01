import { Curriculum, PhaseOverviewData } from '@/types/curriculum';

export const foundationsCurriculum: Curriculum = {
  id: 'foundations',
  title: 'Foundations of Christian Faith',
  description:
    'A welcoming path for new believers beginning their journey in the Christian faith — building a solid biblical and theological foundation while nurturing spiritual growth and community.',
  personaIntro:
    'Welcome to the beginning of an incredible journey. Whether you just made a decision to follow Jesus or you are exploring what faith looks like, this curriculum will walk with you step by step through the foundations of the Christian life.',
  learningApproach:
    'Each lesson is designed to be approachable and practical, moving from core truths to real-life application so that head knowledge leads to heart change and everyday transformation.',
  phases: [
    // =========================================================
    // Phase 1: First Steps
    // =========================================================
    {
      id: 'found-p1',
      title: 'First Steps',
      description:
        'Begin your journey with the essential truths of Christianity, from understanding the gospel to building foundational spiritual habits like Bible reading, prayer, and church community.',
      modules: [
        {
          id: 'found-p1-m1',
          title: 'First Steps',
          description:
            'Core foundations of the Christian faith and the first practices of your new walk with God.',
          sections: [
            {
              id: 'found-p1-s1',
              title: 'Core Foundations',
              lessons: [
                {
                  id: 'found-1-1-1',
                  title: 'What Is Christianity?',
                  description:
                    'An overview of the Christian faith, its history, and core beliefs',
                  estimatedMinutes: 20,
                  objectives: [
                    'Understand what Christianity is at its core and how it differs from mere religion',
                    'Learn the basic story arc of the Bible and God\'s plan for humanity',
                    'Identify the central claims of Christianity and why they matter for your life',
                  ],
                  keyPoints: [
                    {
                      title: 'Christianity Is a Relationship, Not Just a Religion',
                      description:
                        'At its heart, Christianity is about a personal relationship with God through Jesus Christ. It\'s not primarily a set of rules to follow but an invitation to know and be known by your Creator.',
                    },
                    {
                      title: 'One Big Story',
                      description:
                        'The Bible tells a single, unified story: God created humanity for relationship, sin broke that relationship, and God has been working throughout history to restore it through Jesus.',
                    },
                    {
                      title: 'Core Beliefs',
                      description:
                        'Christians believe in one God who exists as Father, Son, and Holy Spirit; that Jesus is God in human form; and that through His death and resurrection, anyone can be reconciled to God.',
                    },
                    {
                      title: 'A Living Faith',
                      description:
                        'Christianity has been transforming lives for over two thousand years. You are joining a global family of believers that spans every culture, language, and nation on earth.',
                    },
                  ],
                  teachingContent:
                    '## More Than a Religion\n\nIf someone asked you to define Christianity in one sentence, you might say it\'s a religion based on the teachings of Jesus Christ. That\'s not wrong, but it misses the most important part. Christianity is, at its deepest level, about a **relationship** -- a restored connection between you and the God who made you.\n\nThink of it this way: imagine receiving a letter from someone who loves you deeply and has been searching for you your whole life. Christianity is the discovery that God has been reaching out to you, and that Jesus is the way He made that connection possible.\n\n## The Big Picture\n\nThe Bible tells one overarching story in four movements: **Creation** -- God made the world and it was good. **Fall** -- humanity chose independence from God, and that choice broke everything. **Redemption** -- God sent His Son, Jesus, to pay the price for that brokenness and open a way back to relationship. **Restoration** -- one day, God will make all things new.\n\nYou are stepping into this story right now, in the redemption chapter. That\'s an amazing place to be.\n\n## What Christians Believe\n\nWhile there are many Christian traditions with different practices, the core beliefs have remained remarkably consistent for two thousand years:\n\n- There is **one God** who exists eternally as Father, Son, and Holy Spirit\n- **Jesus Christ** is fully God and fully human\n- Jesus died on the cross for our sins and **rose from the dead**\n- **Salvation** is a free gift received through faith, not something we earn\n- The **Bible** is God\'s inspired Word and our guide for life\n- Jesus will **return** one day to restore all things\n\n> "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." -- John 3:16\n\nYou don\'t need to understand everything at once. Faith is a journey, and you\'ve already taken the most important step by beginning.',
                  reflectionQuestions: [
                    'Before this lesson, how would you have described Christianity to a friend? Has anything shifted in your understanding?',
                    'Which of the four movements of the Bible\'s story (Creation, Fall, Redemption, Restoration) resonates most with your own experience right now?',
                    'What drew you to explore Christianity in the first place? What are you hoping to find?',
                    'Is there anything about the core beliefs of Christianity that surprises you or that you\'d like to learn more about?',
                  ],
                  practicalApplication: [
                    'Write down in your own words what Christianity means to you right now. Tuck it away and revisit it in a few months to see how your understanding has grown.',
                    'Read John 3:16-17 slowly three times this week. Each time, notice a different word or phrase that stands out to you.',
                    'Share one thing you learned in this lesson with someone you trust -- a friend, family member, or fellow believer.',
                  ],
                  scriptureRefs: [
                    { label: 'John 3:16-17', book: 'John', chapter: 3 },
                    { label: 'Romans 1:16-17', book: 'Romans', chapter: 1 },
                    { label: 'Hebrews 11:1-3', book: 'Hebrews', chapter: 11 },
                  ],
                },
                {
                  id: 'found-1-1-2',
                  title: 'Who Is Jesus?',
                  description:
                    'The life, teachings, death, and resurrection of Christ',
                  estimatedMinutes: 25,
                  objectives: [
                    'Understand who Jesus claimed to be and why those claims matter',
                    'Gain a basic overview of Jesus\' life, ministry, death, and resurrection',
                    'Begin to see Jesus not just as a historical figure but as someone you can know personally',
                  ],
                  keyPoints: [
                    {
                      title: 'Jesus Is the Center of Everything',
                      description:
                        'Christianity isn\'t primarily about a philosophy or a moral code. It\'s about a person -- Jesus of Nazareth -- who claimed to be God in human flesh and backed up that claim by rising from the dead.',
                    },
                    {
                      title: 'Fully God and Fully Human',
                      description:
                        'One of the most astonishing claims of Christianity is that Jesus was not half-God and half-man, but completely both. He experienced hunger, exhaustion, grief, and joy just as you do, while also being the eternal Creator of the universe.',
                    },
                    {
                      title: 'His Life and Ministry',
                      description:
                        'Jesus spent roughly three years teaching, healing, and demonstrating what God\'s kingdom looks like. He welcomed the outcasts, challenged the religious elite, and showed radical love to everyone He met.',
                    },
                    {
                      title: 'Death and Resurrection',
                      description:
                        'Jesus was crucified on a Roman cross, buried in a tomb, and on the third day rose to life again. This event is the foundation of the entire Christian faith -- it changes everything.',
                    },
                    {
                      title: 'A Living Savior',
                      description:
                        'Jesus is not a figure locked in history. Christians believe He is alive right now and that you can have a real, ongoing relationship with Him through prayer, Scripture, and the Holy Spirit.',
                    },
                  ],
                  teachingContent:
                    '## The Most Important Question\n\nC.S. Lewis, a former atheist who became one of the most influential Christian writers of the twentieth century, once pointed out that Jesus doesn\'t leave room for us to call Him merely a "good teacher." Jesus claimed to be **God in human form** -- to forgive sins, to have existed before Abraham, and to be the only way to the Father. That means He was either telling the truth, or He was something far less than a good teacher.\n\nThis is the most important question you\'ll ever consider: **Who is Jesus, really?**\n\n## His Life on Earth\n\nJesus was born in Bethlehem around 4 BC to a young Jewish woman named Mary. He grew up in the small town of Nazareth, worked as a carpenter, and at about age thirty began His public ministry. For three years He traveled throughout Israel, teaching with an authority that astonished people.\n\nHe healed the sick, gave sight to the blind, fed thousands with a boy\'s lunch, and calmed storms with a word. But His miracles weren\'t magic tricks -- they were **signs** pointing to who He truly was.\n\n## His Death\n\nJesus was arrested on false charges, tried in a sham court, and sentenced to crucifixion -- the most brutal form of execution in the Roman world. But this was not an accident or a tragedy that derailed God\'s plan. It **was** the plan.\n\n> "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us." -- Romans 5:8\n\nOn the cross, Jesus took upon Himself the weight of every sin -- past, present, and future -- so that the barrier between you and God could be removed forever.\n\n## His Resurrection\n\nThree days after His death, Jesus\' tomb was found empty. Over the next forty days, He appeared to more than five hundred people. His followers, who had been hiding in fear, were so transformed by seeing the risen Jesus that they spent the rest of their lives telling others about Him -- even when it cost them everything.\n\nThe resurrection is what sets Jesus apart from every other religious leader in history. It is God\'s ultimate confirmation that Jesus is exactly who He claimed to be.\n\n## He Is Alive Today\n\nJesus is not a historical figure you simply study. He is **alive**, seated at the right hand of God the Father, and He invites you into a daily, living relationship with Him. Getting to know Jesus is the adventure of a lifetime, and it starts right where you are.',
                  reflectionQuestions: [
                    'What was your impression of Jesus before this lesson? Has anything shifted?',
                    'Why do you think Jesus\' claim to be God (rather than just a good teacher) matters so much?',
                    'Which aspect of Jesus\' life -- His teaching, His compassion, His sacrifice, or His resurrection -- speaks to you most right now?',
                    'What does it mean to you personally that Jesus is alive and available for relationship today?',
                  ],
                  practicalApplication: [
                    'Read one chapter of the Gospel of Mark each day this week (start with Mark 1). Mark is the shortest Gospel and gives a fast-paced account of Jesus\' life.',
                    'Take a few minutes each day to talk to Jesus as if He were sitting across from you. Tell Him what\'s on your mind. He is listening.',
                    'Write down one thing about Jesus that amazes or surprises you and share it with another believer.',
                  ],
                  scriptureRefs: [
                    { label: 'John 1:1-14', book: 'John', chapter: 1 },
                    { label: 'Romans 5:8', book: 'Romans', chapter: 5 },
                    { label: 'Philippians 2:5-11', book: 'Philippians', chapter: 2 },
                    { label: 'Colossians 1:15-20', book: 'Colossians', chapter: 1 },
                  ],
                },
                {
                  id: 'found-1-1-3',
                  title: 'Understanding the Gospel',
                  description:
                    'The good news of salvation explained simply',
                  estimatedMinutes: 20,
                  objectives: [
                    'Clearly understand what the word "gospel" means and why it is called good news',
                    'Learn the core elements of the gospel message: God, man, Christ, and response',
                    'Be able to explain the gospel simply in your own words',
                  ],
                  keyPoints: [
                    {
                      title: 'Gospel Means "Good News"',
                      description:
                        'The word "gospel" literally means good news. It is the announcement that God has done something extraordinary to rescue humanity from sin and death through Jesus Christ.',
                    },
                    {
                      title: 'The Problem: Sin Separates Us from God',
                      description:
                        'Every person has sinned -- not just in big, obvious ways, but in the everyday ways we choose ourselves over God. That sin creates a gap between us and our Creator that we cannot bridge on our own.',
                    },
                    {
                      title: 'The Solution: Jesus Bridged the Gap',
                      description:
                        'What we could never do for ourselves, God did for us. Jesus lived the perfect life we couldn\'t live, died the death we deserved, and rose again to offer us new life.',
                    },
                    {
                      title: 'Our Response: Faith and Repentance',
                      description:
                        'The gospel invites a response. We receive God\'s gift by placing our trust (faith) in Jesus and turning away from living for ourselves (repentance). It\'s not about earning salvation but about receiving it.',
                    },
                    {
                      title: 'Grace Changes Everything',
                      description:
                        'Grace means receiving what we don\'t deserve. Salvation is a free gift, not a paycheck. You can\'t earn it, and you can\'t lose it by not being "good enough." That is the heart of the good news.',
                    },
                  ],
                  teachingContent:
                    '## What Is the Gospel?\n\nThe word **gospel** comes from an old English word meaning "good news." And it really is the best news you will ever hear. But to understand why it\'s good news, we first need to understand the problem it solves.\n\n## The Problem\n\nGod created human beings for relationship with Himself. He designed us to live in harmony with Him, with each other, and with the world around us. But something went wrong. The Bible calls it **sin** -- our decision, both as a human race and as individuals, to go our own way instead of God\'s way.\n\nSin isn\'t just the "big stuff" like crime or violence. It\'s any time we put ourselves in the place that belongs to God. It\'s pride, selfishness, dishonesty, and indifference to what is right. And every single person has sinned.\n\n> "For all have sinned and fall short of the glory of God." -- Romans 3:23\n\nThe consequence of sin is separation from God -- what the Bible calls death. Not just physical death, but spiritual disconnection from the source of all life, love, and goodness.\n\n## The Solution\n\nHere\'s where the good news comes in. God didn\'t leave us in that broken state. Out of His immense love, He entered our world in the person of **Jesus Christ**.\n\nJesus lived a completely sinless life -- the life none of us could live. Then He went to the cross and took upon Himself the punishment that our sin deserved. He **died in our place**. Three days later, He rose from the dead, proving that sin and death had been defeated once and for all.\n\n> "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord." -- Romans 6:23\n\n## The Invitation\n\nThe gospel isn\'t just information to agree with -- it\'s an invitation to respond to. The Bible says we receive this gift through **faith** (trusting in Jesus rather than in our own goodness) and **repentance** (turning from our old way of living toward God).\n\nThis is not about becoming perfect. It\'s about admitting you need a Savior and accepting the one God has provided. The moment you place your trust in Jesus, you are forgiven, adopted into God\'s family, and given the Holy Spirit to help you grow.\n\n> "For it is by grace you have been saved, through faith -- and this is not from yourselves, it is the gift of God -- not by works, so that no one can boast." -- Ephesians 2:8-9\n\nThat is the gospel. And it really is the best news in the world.',
                  reflectionQuestions: [
                    'Before hearing the gospel explained this way, what did you think a person had to do to be right with God?',
                    'How does it feel to hear that salvation is a free gift and not something you have to earn?',
                    'Is there an area of your life where you\'ve been trying to "earn" God\'s approval? What would it look like to release that to grace?',
                    'If a friend asked you, "What is the gospel?" how would you explain it in your own words?',
                  ],
                  practicalApplication: [
                    'Practice explaining the gospel in 60 seconds or less using your own words. Write it down so you can revisit it.',
                    'Memorize Romans 6:23 this week. Say it aloud each morning to remind yourself of the gift you\'ve received.',
                    'Thank God specifically this week for His grace. Name one area of your life where His grace has made a difference.',
                  ],
                  scriptureRefs: [
                    { label: 'Romans 3:23', book: 'Romans', chapter: 3 },
                    { label: 'Romans 6:23', book: 'Romans', chapter: 6 },
                    { label: 'Ephesians 2:1-10', book: 'Ephesians', chapter: 2 },
                    { label: '1 Corinthians 15:1-8', book: '1 Corinthians', chapter: 15 },
                  ],
                },
                {
                  id: 'found-1-1-4',
                  title: 'Assurance of Salvation',
                  description:
                    'Knowing and understanding your new relationship with God',
                  estimatedMinutes: 20,
                  objectives: [
                    'Understand that salvation is secure and based on God\'s promises, not your performance',
                    'Learn key Bible passages that provide assurance of your relationship with God',
                    'Distinguish between feelings and facts when it comes to your faith',
                  ],
                  keyPoints: [
                    {
                      title: 'Salvation Is God\'s Work, Not Yours',
                      description:
                        'Your salvation doesn\'t depend on how well you perform. It rests on what Jesus has already done. If it depended on you, you\'d have every reason to worry. Because it depends on Him, you can rest.',
                    },
                    {
                      title: 'God\'s Promises Are Trustworthy',
                      description:
                        'The Bible is filled with promises from God about the security of those who trust in Jesus. These promises don\'t depend on your feelings; they depend on God\'s character, and He cannot lie.',
                    },
                    {
                      title: 'Feelings Will Fluctuate, Truth Won\'t',
                      description:
                        'Some days you\'ll feel close to God; other days you won\'t feel much of anything. That\'s normal. Your salvation isn\'t based on emotional highs but on the unchanging truth of what God has said.',
                    },
                    {
                      title: 'The Holy Spirit Confirms Your Belonging',
                      description:
                        'God has given every believer the Holy Spirit as an inner witness -- a deep sense that you belong to Him. This is not the same as emotion; it\'s a settled assurance that grows over time.',
                    },
                  ],
                  teachingContent:
                    '## Can I Really Be Sure?\n\nOne of the most common questions new believers wrestle with is: **"How do I know I\'m really saved?"** Maybe you\'ve had a powerful moment of faith, but a few days later the doubts crept in. Maybe you wonder if you prayed the "right" prayer or if your faith is "strong enough."\n\nHere\'s the truth that will set you free: your assurance doesn\'t rest on you. It rests on **God and His promises**.\n\n## What God Has Promised\n\nLet these words sink in:\n\n> "I give them eternal life, and they shall never perish; no one will snatch them out of my hand." -- John 10:28\n\nJesus didn\'t say "I give them temporary, conditional life." He said **eternal life**. And He said no one -- not even you on your worst day -- can snatch you out of His hand.\n\n> "Therefore, there is now no condemnation for those who are in Christ Jesus." -- Romans 8:1\n\nNo condemnation. Not "less condemnation" or "condemnation only when you mess up." **None.** If you are in Christ, the verdict has already been rendered, and it is: not guilty.\n\n## Feelings vs. Facts\n\nHere\'s something important to understand early in your walk with God: **feelings are real, but they are not always reliable**. You will have days when you feel incredibly close to God and days when He feels a million miles away. Neither feeling changes the reality of your salvation.\n\nThink of it like the sun. On a cloudy day, you can\'t see the sun, but it hasn\'t gone anywhere. Your feelings are the clouds; God\'s promises are the sun. The sun is always there.\n\n## The Role of the Holy Spirit\n\nWhen you placed your faith in Jesus, something remarkable happened: the Holy Spirit came to live inside you. The apostle Paul describes the Spirit as a **deposit guaranteeing** what is to come (Ephesians 1:13-14). He is God\'s seal of ownership on your life.\n\nThe Spirit\'s presence shows up in various ways: a growing desire to know God, conviction when you sin, comfort in difficulty, and a deep sense -- even beneath your doubts -- that you belong to the Father. Over time, as you learn to recognize His voice, your assurance will deepen.\n\n## What Assurance Is Not\n\nAssurance is not the absence of questions or doubts. Even mature believers have moments of uncertainty. The difference is that they\'ve learned to **take their doubts to God** rather than letting doubts pull them away from God. You can do the same.',
                  reflectionQuestions: [
                    'Have you experienced doubts about your salvation? What typically triggers those doubts?',
                    'Which of the Bible verses in this lesson speaks most directly to your need for assurance right now?',
                    'How does it change things to know that your salvation depends on God\'s faithfulness rather than your performance?',
                    'Can you think of a time when your feelings didn\'t match reality in another area of life? How does that parallel apply to faith?',
                  ],
                  practicalApplication: [
                    'Write John 10:28 and Romans 8:1 on a card or sticky note and place it where you\'ll see it daily. Read them aloud when doubts arise.',
                    'Start a short "assurance journal" this week. Each day write one thing that reminds you of God\'s faithfulness -- an answered prayer, a verse, or a moment of peace.',
                    'When doubts come, practice talking to God about them honestly rather than pushing them away. He is not threatened by your questions.',
                  ],
                  scriptureRefs: [
                    { label: 'John 10:27-30', book: 'John', chapter: 10 },
                    { label: 'Romans 8:1', book: 'Romans', chapter: 8 },
                    { label: 'Ephesians 1:13-14', book: 'Ephesians', chapter: 1 },
                    { label: '1 John 5:11-13', book: '1 John', chapter: 5 },
                  ],
                },
                {
                  id: 'found-1-1-5',
                  title: 'The Bible: An Introduction',
                  description:
                    'What the Bible is, how it\'s organized, and why it matters',
                  estimatedMinutes: 20,
                  objectives: [
                    'Understand what the Bible is and why Christians consider it uniquely authoritative',
                    'Learn the basic structure and organization of the Bible',
                    'Feel confident navigating the Bible\'s books, chapters, and verses',
                  ],
                  keyPoints: [
                    {
                      title: 'The Bible Is God\'s Word',
                      description:
                        'Christians believe the Bible is inspired by God -- meaning that while human authors wrote the words, God guided the process so that the result is trustworthy and authoritative for life and faith.',
                    },
                    {
                      title: 'Two Main Sections',
                      description:
                        'The Bible has two major parts: the Old Testament (39 books, written before Jesus) and the New Testament (27 books, written after Jesus). Together they tell one unified story of God\'s love and redemption.',
                    },
                    {
                      title: 'Many Genres, One Story',
                      description:
                        'The Bible contains history, poetry, prophecy, letters, law, and more. Understanding the type of literature you\'re reading helps you interpret it correctly. But through all these genres, one story unfolds.',
                    },
                    {
                      title: 'How to Find Things',
                      description:
                        'Bible references follow a simple pattern: Book Name, Chapter, Verse. For example, "John 3:16" means the book of John, chapter 3, verse 16. A table of contents in any Bible will help you find the right page.',
                    },
                  ],
                  teachingContent:
                    '## What Is the Bible?\n\nThe Bible is the most widely read, most translated, and most influential book in human history. But more than that, Christians believe it is **God\'s Word** -- His primary way of revealing Himself, His character, and His plan for the world.\n\nThe word "Bible" comes from the Greek word *biblia*, meaning "books." And that\'s a helpful way to think about it: the Bible is actually a **library of 66 books**, written by around 40 different authors over roughly 1,500 years. Despite that incredible span of time and diversity of writers, the Bible tells one coherent story from beginning to end.\n\n## How It\'s Organized\n\nThe Bible is divided into two main sections:\n\n**The Old Testament** (39 books) covers everything from the creation of the world to about 400 years before Jesus was born. It includes:\n- **The Law** (Genesis-Deuteronomy): The story of creation, the fall, and God\'s covenant with Israel\n- **History** (Joshua-Esther): Israel\'s story as a nation\n- **Poetry and Wisdom** (Job-Song of Solomon): Songs, prayers, and wise sayings\n- **Prophets** (Isaiah-Malachi): Messages from God calling people back to faithfulness\n\n**The New Testament** (27 books) covers Jesus\' life through the early years of the church:\n- **The Gospels** (Matthew-John): Four accounts of Jesus\' life, death, and resurrection\n- **History** (Acts): The story of the early church\n- **Letters** (Romans-Jude): Teaching and encouragement for churches and individuals\n- **Prophecy** (Revelation): A vision of God\'s ultimate victory\n\n## How to Navigate It\n\nEvery Bible reference follows the same pattern: **Book Name Chapter:Verse**. So when you see "Psalm 23:1," that means the book of Psalms, chapter 23, verse 1. Most Bibles have a table of contents in the front to help you find each book.\n\n> "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness." -- 2 Timothy 3:16\n\n## Why It Matters\n\nThe Bible isn\'t just an ancient text for scholars. It is **living and active** (Hebrews 4:12). Through its pages, God speaks to you -- guiding, comforting, correcting, and encouraging. As you spend time in Scripture, you\'ll find it becomes the foundation your whole life can be built on.',
                  reflectionQuestions: [
                    'What has been your experience with the Bible up to this point? Does it feel familiar or unfamiliar?',
                    'Does knowing the Bible is a library of different genres change how you might approach reading it?',
                    'What part of the Bible are you most curious to explore -- the stories, the teachings of Jesus, the poetry, or something else?',
                    'How does it feel to think of the Bible as God\'s way of speaking to you personally?',
                  ],
                  practicalApplication: [
                    'Get a Bible you can call your own (a modern translation like the NIV, ESV, or NLT is a great place to start). Spend a few minutes exploring the table of contents and flipping through it.',
                    'Practice looking up three references this week: John 3:16, Psalm 23:1, and Romans 8:28. Get comfortable with the book-chapter-verse system.',
                    'Read Psalm 119:105 and ask God to make His Word a lamp to your feet as you begin this journey of reading the Bible regularly.',
                  ],
                  scriptureRefs: [
                    { label: '2 Timothy 3:16-17', book: '2 Timothy', chapter: 3 },
                    { label: 'Hebrews 4:12', book: 'Hebrews', chapter: 4 },
                    { label: 'Psalm 119:105', book: 'Psalms', chapter: 119 },
                  ],
                },
              ],
            },
            {
              id: 'found-p1-s2',
              title: 'Beginning Your Walk',
              lessons: [
                {
                  id: 'found-1-2-1',
                  title: 'How to Read the Bible',
                  description:
                    'Practical tools for daily Scripture reading',
                  estimatedMinutes: 20,
                  objectives: [
                    'Develop a practical, sustainable approach to daily Bible reading',
                    'Learn simple methods for understanding and applying what you read',
                    'Overcome common obstacles that keep people from consistent time in Scripture',
                  ],
                  keyPoints: [
                    {
                      title: 'Consistency Over Quantity',
                      description:
                        'It is far better to read a small portion of the Bible each day with attention than to rush through large chunks without engaging your heart and mind. Start small and build from there.',
                    },
                    {
                      title: 'Start with the Right Books',
                      description:
                        'For new believers, starting with the Gospel of John, then moving to the other Gospels and shorter letters like Philippians or 1 John, provides a strong and encouraging foundation.',
                    },
                    {
                      title: 'Read with Purpose',
                      description:
                        'Ask simple questions as you read: What does this passage say about God? What does it say about people? Is there something to believe, obey, or pray about? This keeps your reading active rather than passive.',
                    },
                    {
                      title: 'Let Scripture Read You',
                      description:
                        'Bible reading isn\'t just about gaining information. As you read, the Holy Spirit uses God\'s Word to speak to your specific situation, convict, comfort, and transform you from the inside out.',
                    },
                  ],
                  teachingContent:
                    '## Getting Started\n\nOpening the Bible for the first time can feel overwhelming. It\'s a big book with small print, unfamiliar names, and ancient settings. That\'s completely normal. The good news is that you don\'t need a seminary degree to read the Bible well. You just need a willing heart and a simple plan.\n\n## Pick a Time and Place\n\nThe single most important step is to **set a regular time**. Many people find that first thing in the morning works best, before the demands of the day crowd in. But what matters most is that you choose a time you can stick with. Find a quiet spot, minimize distractions, and keep your Bible and a notebook nearby.\n\nStart with just **10 to 15 minutes a day**. You can always increase later. The goal right now is to build a habit.\n\n## Where to Begin\n\nDon\'t start with page one and try to read straight through. Instead, begin with the **Gospel of John**. It was written specifically so that people would believe in Jesus (John 20:31), making it the perfect starting point. After John, consider reading Mark, then Philippians or 1 John.\n\n## A Simple Reading Method\n\nHere\'s a practical approach you can use every time you sit down with Scripture:\n\n1. **Pray first.** Ask God to open your eyes to what He wants to show you. Even a simple prayer like, "God, speak to me through your Word today," is enough.\n\n2. **Read the passage slowly.** Don\'t rush. Read it once for the big picture, then read it again more carefully.\n\n3. **Ask three questions:**\n   - What does this teach me about **God**?\n   - What does this teach me about **people** (including myself)?\n   - Is there something here to **believe, obey, or pray about**?\n\n4. **Write down one takeaway.** Capture one thing that stood out to you. This could be a verse, an insight, or a question to explore later.\n\n5. **Respond in prayer.** Talk to God about what you\'ve read. Thank Him, ask for help, or simply sit in His presence.\n\n> "Your word is a lamp for my feet, a light on my path." -- Psalm 119:105\n\n## When It Feels Hard\n\nSome days the Bible will come alive and you\'ll feel deeply moved. Other days it will feel dry and confusing. **Keep showing up anyway.** Spiritual growth, like physical growth, happens through consistent nourishment over time, not through occasional mountain-top experiences.',
                  reflectionQuestions: [
                    'What time of day and what place could you set aside for daily Bible reading this week?',
                    'Have you tried reading the Bible before? What worked well, and what was difficult?',
                    'Which of the three questions (about God, about people, about response) do you think will be most helpful for you?',
                    'What obstacles do you anticipate might keep you from reading consistently? How might you address them?',
                  ],
                  practicalApplication: [
                    'Set a specific time and place for Bible reading this week. Put it in your phone calendar as a daily reminder for at least 10 minutes.',
                    'Begin reading the Gospel of John using the five-step method described in this lesson. Aim for one chapter per day.',
                    'Keep a small notebook or journal next to your Bible. Write down your one takeaway each day so you can look back on what God has been teaching you.',
                  ],
                  scriptureRefs: [
                    { label: 'Psalm 119:105', book: 'Psalms', chapter: 119 },
                    { label: 'John 20:30-31', book: 'John', chapter: 20 },
                    { label: 'Joshua 1:8', book: 'Joshua', chapter: 1 },
                  ],
                },
                {
                  id: 'found-1-2-2',
                  title: 'Learning to Pray',
                  description:
                    'The basics of communicating with God',
                  estimatedMinutes: 20,
                  objectives: [
                    'Understand what prayer is and why it matters in the Christian life',
                    'Learn a simple framework for prayer that you can use starting today',
                    'Feel permission to pray honestly and imperfectly',
                  ],
                  keyPoints: [
                    {
                      title: 'Prayer Is a Conversation, Not a Performance',
                      description:
                        'Prayer is simply talking with God. You don\'t need special words, a special posture, or a special place. God invites you to come to Him honestly, just as you are.',
                    },
                    {
                      title: 'God Wants to Hear from You',
                      description:
                        'Prayer isn\'t about informing God of things He doesn\'t know. He already knows everything. Prayer is about relationship -- bringing your real self before a God who genuinely delights in you.',
                    },
                    {
                      title: 'A Helpful Framework: ACTS',
                      description:
                        'The ACTS model gives you a simple structure: Adoration (praising God for who He is), Confession (admitting your sin honestly), Thanksgiving (expressing gratitude), and Supplication (asking for what you need).',
                    },
                    {
                      title: 'Listening Is Part of Prayer',
                      description:
                        'Prayer isn\'t just talking at God. Part of learning to pray is learning to be still and listen -- through Scripture, through the Holy Spirit\'s gentle promptings, and through the quiet of simply being in God\'s presence.',
                    },
                  ],
                  teachingContent:
                    '## What Is Prayer?\n\nAt its simplest, prayer is **talking with God**. Not at God. Not performing for God. Talking *with* Him -- the way you\'d talk with someone who loves you unconditionally and is always glad to hear your voice.\n\nIf that feels strange at first, that\'s okay. Prayer is a skill you develop over time, much like any relationship deepens through ongoing conversation. The key is to **start where you are** and let it grow from there.\n\n## You Don\'t Need Fancy Words\n\nOne of the biggest myths about prayer is that you need to sound a certain way. Some people grew up hearing formal, elaborate prayers and worry they can\'t measure up. But Jesus actually warned against using prayer as a performance:\n\n> "And when you pray, do not keep on babbling like pagans, for they think they will be heard because of their many words. Do not be like them, for your Father knows what you need before you ask him." -- Matthew 6:7-8\n\nGod doesn\'t need eloquence. He wants **authenticity**. A stumbling, honest prayer means more to Him than a polished, empty one.\n\n## A Simple Framework: ACTS\n\nIf you\'re not sure what to say, the **ACTS** model gives you a helpful starting point:\n\n- **A - Adoration**: Start by telling God what you appreciate about Him. "God, you are faithful. You are powerful. You are kind." This shifts your focus from your problems to His greatness.\n\n- **C - Confession**: Be honest about where you\'ve fallen short. "I was impatient today. I was selfish in that conversation." God already knows, and He responds with grace, not anger.\n\n- **T - Thanksgiving**: Thank God for specific things -- answered prayers, daily provisions, people in your life, the gift of salvation. Gratitude opens your heart.\n\n- **S - Supplication**: Bring your requests to God. Your needs, your worries, your hopes for others. Nothing is too big or too small.\n\n## Praying Throughout the Day\n\nPrayer doesn\'t have to be limited to a set-aside quiet time (though that\'s important). You can also pray throughout your day -- quick conversations with God as you drive, work, or face a challenge. Paul encouraged believers to "pray continually" (1 Thessalonians 5:17), which means staying in an attitude of openness to God all day long.\n\n## When You Don\'t Know What to Say\n\nSometimes you\'ll sit down to pray and feel completely blank. That\'s normal. In those moments, you can pray Scripture back to God (the Psalms are perfect for this), use the Lord\'s Prayer as a guide (Matthew 6:9-13), or simply say, "God, I\'m here. I don\'t have words. But I\'m here." That\'s enough.',
                  reflectionQuestions: [
                    'What has your experience with prayer been like so far? Does it feel natural or awkward?',
                    'Which part of the ACTS framework do you think you\'ll find easiest? Which might be most challenging?',
                    'How does it affect you to know that God welcomes imperfect, honest prayers?',
                    'Is there something on your heart right now that you\'ve been hesitant to bring to God? What holds you back?',
                    'What would it look like to "pray continually" during an ordinary day in your life?',
                  ],
                  practicalApplication: [
                    'Set aside five minutes each day this week specifically for prayer, using the ACTS framework. You can do this right after your Bible reading time.',
                    'Try praying "in the moment" at least three times this week -- a quick prayer during your commute, before a meeting, or when something worries you.',
                    'Read the Lord\'s Prayer in Matthew 6:9-13 and use each phrase as a springboard for your own prayer. Spend a minute or two on each line.',
                  ],
                  scriptureRefs: [
                    { label: 'Matthew 6:5-15', book: 'Matthew', chapter: 6 },
                    { label: '1 Thessalonians 5:16-18', book: '1 Thessalonians', chapter: 5 },
                    { label: 'Philippians 4:6-7', book: 'Philippians', chapter: 4 },
                  ],
                },
                {
                  id: 'found-1-2-3',
                  title: 'What Happens When I Sin?',
                  description:
                    'Confession, repentance, and grace',
                  estimatedMinutes: 20,
                  objectives: [
                    'Understand that sinning after salvation does not mean you\'ve lost your relationship with God',
                    'Learn the difference between guilt that leads to repentance and shame that leads to hiding',
                    'Develop a healthy practice of confession and repentance',
                  ],
                  keyPoints: [
                    {
                      title: 'You Will Still Sin',
                      description:
                        'Becoming a Christian doesn\'t mean you stop sinning. It means you\'ve been given a new nature and the Holy Spirit\'s power to grow, but the process of change takes time. This is normal.',
                    },
                    {
                      title: 'Sin Doesn\'t End Your Relationship with God',
                      description:
                        'When you sin, you don\'t lose your salvation. Think of it like a child who disobeys a parent -- the relationship is strained, but the child is still part of the family. God\'s love for you doesn\'t depend on your performance.',
                    },
                    {
                      title: 'Confession Restores Closeness',
                      description:
                        'Confession means honestly admitting your sin to God without excuses. It doesn\'t earn forgiveness (Jesus already secured that), but it restores the sense of closeness and clears the air in your relationship with God.',
                    },
                    {
                      title: 'Repentance Is Turning Around',
                      description:
                        'Repentance literally means to change your mind and direction. It\'s not just feeling sorry; it\'s choosing, with God\'s help, to move in a different direction. It is always met with grace.',
                    },
                    {
                      title: 'Shame vs. Conviction',
                      description:
                        'The Holy Spirit convicts you of specific sin so you can deal with it and grow. The enemy uses shame to make you feel worthless and want to hide from God. Learn to tell the difference.',
                    },
                  ],
                  teachingContent:
                    '## A Question Every New Believer Asks\n\nSooner or later -- usually sooner -- every new believer faces a moment of real discouragement: **"I sinned again. I thought I was supposed to be different now."** If that\'s you, take a deep breath. What you\'re experiencing is completely normal, and understanding how to handle it is one of the most important lessons in your new faith.\n\n## You\'re Still Family\n\nLet\'s start with the most important truth: **when you sin, you do not lose your salvation.** Your relationship with God is secured by what Jesus did on the cross, not by your ability to be perfect. Just as a child who misbehaves is still part of the family, you are still God\'s child when you stumble.\n\nSin does affect your relationship, though. Not the reality of it, but the **experience** of it. When there\'s unconfessed sin in your life, you may feel distant from God, distracted in prayer, or weighed down emotionally. That\'s why confession and repentance matter.\n\n## Confession: Coming Clean\n\n> "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness." -- 1 John 1:9\n\nConfession simply means **agreeing with God** about your sin. No excuses, no minimizing, no blaming others. "God, I did this. It was wrong. I\'m sorry." That\'s it.\n\nNotice the promise in 1 John 1:9 -- God is **faithful and just** to forgive. This isn\'t uncertain. When you confess, He forgives. Every single time.\n\n## Repentance: Turning Around\n\nConfession names the sin; **repentance changes direction**. The Greek word for repentance (*metanoia*) means a change of mind that leads to a change of behavior. It\'s not just feeling bad -- it\'s choosing, with God\'s help, to walk a different way.\n\nRepentance is not a one-time event. It\'s a daily practice of noticing when you\'ve wandered off course and turning back toward God.\n\n## Conviction vs. Shame\n\nHere\'s a crucial distinction: **conviction** comes from the Holy Spirit and is specific, loving, and leads you toward God. It says, "You did something wrong. Bring it to Me so we can deal with it."\n\n**Shame** comes from the enemy and is vague, crushing, and drives you away from God. It says, "You are something wrong. You\'ll never change. Don\'t bother going to God."\n\nWhen you feel guilty, ask yourself: "Is this leading me toward God or away from Him?" Conviction draws you closer. Shame pushes you into hiding. Always run **toward** God with your sin, never away from Him.\n\n## Growing in Holiness\n\nOver time, as you walk with God, you will sin less -- not because you\'re gritting your teeth harder, but because the Holy Spirit is changing your desires from the inside out. This process is called **sanctification**, and it is a lifelong journey. Be patient with yourself, just as God is patient with you.',
                  reflectionQuestions: [
                    'How do you typically respond when you realize you\'ve done something wrong -- do you tend to run toward God or away from Him?',
                    'Can you identify the difference between conviction and shame in your own experience? What does each feel like?',
                    'Is there a specific sin you\'ve been carrying guilt about? Consider bringing it to God in honest confession right now.',
                    'How does knowing that God\'s forgiveness is guaranteed (not uncertain) change how you approach Him after you\'ve sinned?',
                  ],
                  practicalApplication: [
                    'Practice daily confession this week. At the end of each day, review your day with God and honestly name anything that needs to be confessed. Then receive His forgiveness.',
                    'Memorize 1 John 1:9 and speak it aloud to yourself the next time shame tries to convince you that God is done with you.',
                    'If there\'s a recurring sin you\'re struggling with, consider sharing it with a trusted, mature believer who can pray with you and encourage you. Sin thrives in secrecy.',
                  ],
                  scriptureRefs: [
                    { label: '1 John 1:8-10', book: '1 John', chapter: 1 },
                    { label: 'Psalm 32:1-5', book: 'Psalms', chapter: 32 },
                    { label: 'Romans 8:1-2', book: 'Romans', chapter: 8 },
                    { label: '2 Corinthians 7:10', book: '2 Corinthians', chapter: 7 },
                  ],
                },
                {
                  id: 'found-1-2-4',
                  title: 'Finding a Church Home',
                  description:
                    'Why community matters and how to choose a church',
                  estimatedMinutes: 15,
                  objectives: [
                    'Understand why being part of a church is essential, not optional, for spiritual growth',
                    'Learn what to look for (and what to watch out for) when choosing a church',
                    'Feel encouraged to take the step of visiting a church or getting more connected to one',
                  ],
                  keyPoints: [
                    {
                      title: 'You Were Made for Community',
                      description:
                        'Christianity was never designed to be a solo journey. From the very beginning, God\'s plan has been to form a people, not just save individuals. You need other believers, and they need you.',
                    },
                    {
                      title: 'The Church Is More Than a Building',
                      description:
                        'When the Bible talks about "the church," it\'s not referring to a building or a Sunday service. It\'s referring to the community of believers -- the living body of Christ. The gathering is an expression of that community, not the thing itself.',
                    },
                    {
                      title: 'What to Look For',
                      description:
                        'A healthy church teaches the Bible faithfully, worships God with sincerity, cares for its members, serves its community, and makes room for people to grow and use their gifts. No church is perfect, but these marks are essential.',
                    },
                    {
                      title: 'Give It Time',
                      description:
                        'Finding a church home takes patience. Visit a few times before making a judgment. Look for a place where you can learn, serve, and build genuine relationships -- not just a place with great music or programs.',
                    },
                  ],
                  teachingContent:
                    '## Why Church Matters\n\nIn our individualistic culture, it\'s tempting to think you can be a Christian on your own -- just you, your Bible, and God. But the New Testament paints a very different picture. The earliest Christians **devoted themselves** to gathering together, and the Bible consistently describes believers as members of one body.\n\n> "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another." -- Hebrews 10:24-25\n\nYou need people who will encourage you when you\'re discouraged, challenge you when you\'re complacent, pray for you when you\'re struggling, and celebrate with you when you\'re growing. That happens in the context of a church community.\n\n## What the Church Actually Is\n\nThe Greek word for church is *ekklesia*, meaning "a called-out assembly." It refers to **people, not property**. The church is not a building you visit on Sunday morning. It\'s a family you belong to all week long.\n\nThe apostle Paul describes the church as a **body** (1 Corinthians 12). Every part is necessary. An eye can\'t say to the hand, "I don\'t need you." In the same way, you have a role to play in the body of Christ that no one else can fill.\n\n## What to Look For in a Church\n\nNo church is perfect -- because no people are perfect. But here are some healthy signs to look for:\n\n- **Faithful Bible teaching**: The Scriptures are taught clearly, accurately, and applied to real life\n- **Genuine worship**: Services focus on glorifying God, not entertaining an audience\n- **Authentic community**: People know each other beyond Sunday morning and care for one another\n- **Outward focus**: The church serves its neighborhood and the world, not just its own members\n- **Room to grow**: There are opportunities to learn, ask questions, serve, and develop your gifts\n\n## What to Watch For\n\nBe cautious of churches where the pastor is the only authority with no accountability, where questioning is discouraged, where finances are not transparent, or where pressure and manipulation replace love and grace. A healthy church will welcome your questions and encourage you to think.\n\n## Getting Connected\n\nOnce you find a church, don\'t just attend -- **get involved**. Join a small group or Bible study, volunteer somewhere, and introduce yourself to people. It takes time to feel at home, and that\'s okay. But the investment you make in community will be one of the most important things you do for your spiritual growth.',
                  reflectionQuestions: [
                    'Are you currently connected to a church? If so, how involved are you beyond Sunday attendance?',
                    'What has been your experience with church in the past, positive or negative? How might that be shaping your expectations?',
                    'Which of the "healthy signs" listed in this lesson matters most to you, and why?',
                    'What fears or hesitations do you have about getting more involved in a church community?',
                  ],
                  practicalApplication: [
                    'If you\'re not currently attending a church, visit at least one church this week. Ask a Christian friend for a recommendation, or try a church in your area that a neighbor or coworker attends.',
                    'If you already attend a church, take one step to go deeper: sign up for a small group, volunteer for a serving team, or invite someone to coffee after the service.',
                    'Pray this week that God would lead you to the right church community. Ask Him to give you openness and courage to engage.',
                  ],
                  scriptureRefs: [
                    { label: 'Hebrews 10:24-25', book: 'Hebrews', chapter: 10 },
                    { label: '1 Corinthians 12:12-27', book: '1 Corinthians', chapter: 12 },
                    { label: 'Acts 2:42-47', book: 'Acts', chapter: 2 },
                  ],
                },
                {
                  id: 'found-1-2-5',
                  title: 'Water Baptism',
                  description:
                    'Understanding and preparing for this step of obedience',
                  estimatedMinutes: 15,
                  objectives: [
                    'Understand what baptism is, what it symbolizes, and why Jesus commanded it',
                    'Learn what baptism does and does not do theologically',
                    'Feel prepared and excited to take this step of faith',
                  ],
                  keyPoints: [
                    {
                      title: 'Baptism Is a Public Declaration',
                      description:
                        'Baptism is an outward, visible act that declares an inward, invisible reality. It is your way of publicly saying, "I belong to Jesus now." It\'s like a wedding ring for your faith -- it doesn\'t create the relationship, but it announces it.',
                    },
                    {
                      title: 'Jesus Commanded It',
                      description:
                        'Baptism isn\'t optional for believers. Jesus Himself was baptized, and one of His final instructions was for His followers to baptize new disciples. It is an act of obedience to the one you\'ve chosen to follow.',
                    },
                    {
                      title: 'A Picture of Death and New Life',
                      description:
                        'Going under the water symbolizes dying to your old life -- your old identity, your sin, your independence from God. Coming up out of the water symbolizes being raised to new life in Christ. It is a beautiful, physical picture of what has already happened spiritually.',
                    },
                    {
                      title: 'Baptism Doesn\'t Save You',
                      description:
                        'Baptism is not what makes you a Christian. You were saved the moment you put your faith in Jesus. Baptism is a step of obedience and a celebration of what God has already done in your heart.',
                    },
                  ],
                  teachingContent:
                    '## What Is Baptism?\n\nBaptism is one of the first steps Jesus invites every new believer to take. The word itself comes from the Greek word *baptizo*, meaning "to immerse" or "to dip." In Christian baptism, a person is briefly lowered into water and raised back up as a powerful symbol of their new life in Christ.\n\n> "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." -- Matthew 28:19\n\nJesus didn\'t suggest baptism as something to consider if you\'re comfortable with it. He **commanded** it. And He modeled it Himself at the start of His ministry, being baptized by John in the Jordan River.\n\n## What It Symbolizes\n\nBaptism is a physical picture of a spiritual truth. The apostle Paul explains it beautifully:\n\n> "We were therefore buried with him through baptism into death in order that, just as Christ was raised from the dead through the glory of the Father, we too may live a new life." -- Romans 6:4\n\nWhen you go under the water, it represents your **old life being buried** -- your sin, your guilt, your old way of living. When you come up out of the water, it represents your **new life in Christ** -- forgiven, free, and filled with the Holy Spirit.\n\nIt\'s one of the most meaningful moments in a believer\'s life. Many people describe it as feeling like a weight has been lifted -- even though theologically, the weight was already lifted at the moment of faith.\n\n## What Baptism Does and Doesn\'t Do\n\nBaptism **does** publicly identify you with Jesus and His church. It **does** serve as a powerful moment of testimony and obedience. It **does** connect you to a tradition that stretches back to the very first Christians.\n\nBaptism **does not** wash away your sins (only Jesus\' blood does that). It **does not** make you "more saved" than you already are. And it is **not** something you need to delay until you feel worthy -- because the whole point is that Jesus has made you worthy.\n\n## How to Prepare\n\nIf you haven\'t been baptized since making your decision to follow Christ, here are some practical steps:\n\n1. **Talk to your pastor or church leader.** Most churches have a simple process for baptism and may offer a short class or conversation beforehand.\n\n2. **Think about your story.** Many churches invite you to share a brief testimony at your baptism -- how you came to faith. It doesn\'t need to be dramatic; it just needs to be honest.\n\n3. **Invite people.** Baptism is a celebration. Invite friends and family to witness this important step. Even those who aren\'t believers will be encouraged by seeing your commitment.\n\n4. **Don\'t overthink it.** You don\'t need to have all your questions answered or all your struggles resolved. Baptism is a step of obedience and faith. You take the step; God handles the rest.',
                  reflectionQuestions: [
                    'Have you been baptized since putting your faith in Christ? If not, what has been holding you back?',
                    'How does understanding baptism as a symbol (rather than what saves you) change how you view it?',
                    'If you were to share your story of coming to faith at your baptism, what would you say? Try to summarize it in a few sentences.',
                    'Who would you want to be there when you get baptized? Why?',
                  ],
                  practicalApplication: [
                    'If you haven\'t been baptized, reach out to your pastor or church leader this week to learn about the next opportunity. Take the step.',
                    'Write out a brief version of your faith story (three to five sentences) as practice for sharing at your baptism or with a friend.',
                    'Read Romans 6:1-14 this week and reflect on what it means to be "dead to sin and alive to God in Christ Jesus."',
                  ],
                  scriptureRefs: [
                    { label: 'Matthew 28:18-20', book: 'Matthew', chapter: 28 },
                    { label: 'Romans 6:1-14', book: 'Romans', chapter: 6 },
                    { label: 'Acts 2:38-41', book: 'Acts', chapter: 2 },
                  ],
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'First Steps is where your journey with Jesus begins. This phase is designed specifically for those who are brand new to the Christian faith or returning after time away. You will explore the most essential truths of Christianity — who Jesus is, what the gospel means, and why it matters for your everyday life. Beyond head knowledge, you will start building the foundational spiritual habits that will sustain you for years to come: reading the Bible, learning to pray, understanding what to do when you stumble, finding a church community, and taking the step of baptism. Every lesson is written in a warm, approachable style so that no question feels too basic and no one feels left behind. Think of this phase as laying the cornerstone — everything else you learn and experience in your faith will build on what you discover here.',
        expectations: [
          'Understand the core message of Christianity and the gospel of Jesus Christ',
          'Develop a daily habit of Bible reading using a simple, practical method',
          'Learn how to pray honestly and confidently, even as a beginner',
          'Gain assurance that your relationship with God is secure and built on His promises',
          'Take your first steps into Christian community by exploring church life and baptism',
          'Build a foundation of grace-based living that handles sin through confession and repentance',
        ],
        skillLevel: 'Beginner',
        faq: [
          {
            question: 'Do I need any prior knowledge of the Bible or Christianity?',
            answer:
              'Not at all. This phase is designed for absolute beginners. Every concept is explained from the ground up, and no question is considered too basic. Whether you just made a decision to follow Jesus yesterday or you are simply curious about the faith, you will feel welcome here.',
          },
          {
            question: 'How much time should I plan to spend on each lesson?',
            answer:
              'Each lesson takes approximately 15 to 25 minutes to complete. We recommend working through one or two lessons per week at a pace that feels comfortable, leaving time for reflection and the practical application exercises that accompany each lesson.',
          },
          {
            question: 'How does this phase connect to the rest of the curriculum?',
            answer:
              'First Steps lays the groundwork for everything that follows. Once you complete this phase, you will move into Building Blocks, where you explore who God is in greater depth and discover your identity in Christ. Each subsequent phase builds naturally on what you learn here.',
          },
          {
            question: 'What format do the lessons follow?',
            answer:
              'Each lesson includes clear teaching content, key points to remember, reflection questions for personal thought, practical application steps you can take during the week, and Scripture references for further reading. The format is designed to engage both your mind and your heart.',
          },
        ],
      } satisfies PhaseOverviewData,
    },

    // =========================================================
    // Phase 2: Building Blocks
    // =========================================================
    {
      id: 'found-p2',
      title: 'Building Blocks',
      description:
        'Deepen your understanding of who God is, discover your new identity in Christ, and develop growing spiritual practices like worship, generosity, and rest.',
      modules: [
        {
          id: 'found-p2-m1',
          title: 'Building Blocks',
          description:
            'Knowing God more deeply, understanding your identity in Christ, and growing in spiritual practice.',
          sections: [
            {
              id: 'found-p2-s1',
              title: 'Knowing God',
              lessons: [
                {
                  id: 'found-2-1-1',
                  title: 'The Character of God',
                  description:
                    'Who God is and what He is like',
                },
                {
                  id: 'found-2-1-2',
                  title: 'God as Father',
                  description:
                    'Understanding your adoption into God\'s family',
                },
                {
                  id: 'found-2-1-3',
                  title: 'Jesus as Savior and Lord',
                  description:
                    'Deepening your understanding of Christ\'s work',
                },
                {
                  id: 'found-2-1-4',
                  title: 'The Holy Spirit',
                  description:
                    'Who He is and how He works in your life',
                },
                {
                  id: 'found-2-1-5',
                  title: 'The Trinity Explained',
                  description:
                    'One God in three persons',
                },
              ],
            },
            {
              id: 'found-p2-s2',
              title: 'Knowing Yourself in Christ',
              lessons: [
                {
                  id: 'found-2-2-1',
                  title: 'Your New Identity',
                  description:
                    'Who you are now as a child of God',
                },
                {
                  id: 'found-2-2-2',
                  title: 'Freedom from Shame and Guilt',
                  description:
                    'Living in the reality of forgiveness',
                },
                {
                  id: 'found-2-2-3',
                  title: 'Understanding Grace',
                  description:
                    'Unmerited favor and its implications for daily life',
                },
                {
                  id: 'found-2-2-4',
                  title: 'Spiritual Warfare Basics',
                  description:
                    'Recognizing the enemy and standing firm',
                },
                {
                  id: 'found-2-2-5',
                  title: 'Renewing Your Mind',
                  description:
                    'Transforming thought patterns through Scripture',
                },
              ],
            },
            {
              id: 'found-p2-s3',
              title: 'Growing in Practice',
              lessons: [
                {
                  id: 'found-2-3-1',
                  title: 'Worship as a Lifestyle',
                  description:
                    'More than singing—a whole-life response to God',
                },
                {
                  id: 'found-2-3-2',
                  title: 'Generosity and Stewardship',
                  description:
                    'Managing money, time, and resources God\'s way',
                },
                {
                  id: 'found-2-3-3',
                  title: 'Sabbath and Rest',
                  description:
                    'The rhythm of work and renewal',
                },
                {
                  id: 'found-2-3-4',
                  title: 'Fasting: An Introduction',
                  description:
                    'The purpose and practice of fasting',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'Building Blocks takes you deeper into the heart of your faith. Now that you have established the basics in First Steps, this phase invites you to explore who God truly is — His character, His role as your heavenly Father, and the person and work of the Holy Spirit. You will also begin the transformative journey of understanding your new identity in Christ, learning to live free from shame and guilt, and recognizing the spiritual realities at work around you. Alongside these truths, you will develop growing spiritual practices such as worship that extends beyond Sunday morning, generosity that reflects God\'s heart, the gift of Sabbath rest, and an introduction to fasting. This phase is about moving from knowing about God to truly knowing Him, and from understanding what you believe to letting those beliefs reshape how you live every single day.',
        expectations: [
          'Gain a deeper understanding of God\'s character, including the Trinity and the role of the Holy Spirit',
          'Discover and embrace your new identity as a beloved child of God',
          'Learn to live in freedom from shame, guilt, and the lies of the enemy',
          'Develop worship as a lifestyle that permeates every area of your daily routine',
          'Explore biblical principles of generosity, stewardship, rest, and fasting',
          'Begin renewing your mind through Scripture so your thought patterns align with God\'s truth',
        ],
        skillLevel: 'Beginner',
        faq: [
          {
            question: 'Do I need to complete Phase 1 before starting this phase?',
            answer:
              'While it is not strictly required, we strongly recommend completing First Steps before beginning Building Blocks. The foundational truths and habits established in Phase 1 — such as understanding the gospel, reading the Bible, and prayer — provide the framework that this phase builds upon.',
          },
          {
            question: 'How long does this phase typically take to complete?',
            answer:
              'Building Blocks is designed to be covered over roughly three months, aligning with Months 4 through 6 of the curriculum. Working through one to two lessons per week gives you ample time to absorb the material and put it into practice in your daily life.',
          },
          {
            question: 'How does this phase connect to the phases before and after it?',
            answer:
              'Building Blocks bridges the gap between the introductory truths of First Steps and the deeper biblical exploration in Deepening Roots. Here you solidify your understanding of God and yourself, which prepares you to engage more confidently with the storyline of Scripture in Phase 3.',
          },
          {
            question: 'What format do the lessons follow?',
            answer:
              'Lessons in this phase follow the same approachable format as Phase 1: clear teaching content, key points, reflection questions, practical application steps, and Scripture references. As the material deepens, you will find the reflection questions especially valuable for personal growth.',
          },
        ],
      } satisfies PhaseOverviewData,
    },

    // =========================================================
    // Phase 3: Deepening Roots
    // =========================================================
    {
      id: 'found-p3',
      title: 'Deepening Roots',
      description:
        'Explore the storyline of the Bible from Genesis to Revelation, gaining a solid overview of both the Old and New Testaments and key books within them.',
      modules: [
        {
          id: 'found-p3-m1',
          title: 'Deepening Roots',
          description:
            'An overview of the Old and New Testaments, exploring key books and the grand narrative of Scripture.',
          sections: [
            {
              id: 'found-p3-s1',
              title: 'Old Testament Foundations',
              lessons: [
                {
                  id: 'found-3-1-1',
                  title: 'The Story of the Old Testament',
                  description:
                    'Creation to the prophets in overview',
                },
                {
                  id: 'found-3-1-2',
                  title: 'Genesis: Beginnings',
                  description:
                    'Creation, fall, flood, and the patriarchs',
                },
                {
                  id: 'found-3-1-3',
                  title: 'Exodus and Redemption',
                  description:
                    'Israel\'s deliverance as a picture of salvation',
                },
                {
                  id: 'found-3-1-4',
                  title: 'The Law and the Christian',
                  description:
                    'Understanding the Ten Commandments and their relevance today',
                },
                {
                  id: 'found-3-1-5',
                  title: 'Psalms for Daily Life',
                  description:
                    'Using the Psalms in prayer and worship',
                },
                {
                  id: 'found-3-1-6',
                  title: 'Proverbs: Wisdom for Living',
                  description:
                    'Practical guidance for everyday decisions',
                },
              ],
            },
            {
              id: 'found-p3-s2',
              title: 'New Testament Foundations',
              lessons: [
                {
                  id: 'found-3-2-1',
                  title: 'The Story of the New Testament',
                  description:
                    'Gospels through Revelation in overview',
                },
                {
                  id: 'found-3-2-2',
                  title: 'The Gospel of Mark',
                  description:
                    'A fast-paced introduction to Jesus\' ministry',
                },
                {
                  id: 'found-3-2-3',
                  title: 'The Gospel of John',
                  description:
                    'Jesus revealed as the Son of God',
                },
                {
                  id: 'found-3-2-4',
                  title: 'Acts: The Birth of the Church',
                  description:
                    'How the early church began and grew',
                },
                {
                  id: 'found-3-2-5',
                  title: 'Romans: The Gospel Explained',
                  description:
                    'Paul\'s masterful presentation of salvation',
                },
                {
                  id: 'found-3-2-6',
                  title: 'James: Faith That Works',
                  description:
                    'Practical Christianity in action',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'Deepening Roots is your invitation to explore the grand story of the Bible from beginning to end. In this phase, you will walk through the major events and themes of the Old Testament — from creation and the patriarchs through the Exodus, the giving of the Law, and the wisdom and poetry of the Psalms and Proverbs. Then you will turn to the New Testament, gaining an overview of the Gospels, the birth of the early church in Acts, and foundational letters like Romans and James. Rather than reading the Bible as a collection of disconnected stories, you will begin to see how every book contributes to one unified narrative of God\'s faithfulness and redemption. This phase equips you with the biblical literacy you need to read, understand, and apply Scripture with growing confidence, transforming the Bible from an intimidating library into a trusted companion for life.',
        expectations: [
          'Understand the overarching storyline of the Old Testament from creation through the prophets',
          'Explore key Old Testament books including Genesis, Exodus, Psalms, and Proverbs',
          'Gain a clear overview of the New Testament from the Gospels through Revelation',
          'Study foundational New Testament books such as Mark, John, Acts, Romans, and James',
          'Learn to see the Bible as one unified story of God\'s love and redemption',
          'Develop confidence in navigating and interpreting both testaments of Scripture',
        ],
        skillLevel: 'Beginner',
        faq: [
          {
            question: 'Do I need any previous Bible knowledge to start this phase?',
            answer:
              'This phase assumes you are familiar with the basics covered in Phases 1 and 2, such as what the Bible is and how to read it. However, you do not need to be an expert. Each lesson provides context and background so you can follow along even if the Old or New Testament feels unfamiliar territory.',
          },
          {
            question: 'How much time should I set aside for this phase?',
            answer:
              'Deepening Roots is designed for Months 7 through 9 of the curriculum. Plan on spending one to two lessons per week, with each lesson taking approximately 15 to 25 minutes. You will benefit from additional time reading the actual Bible passages referenced in each lesson.',
          },
          {
            question: 'How does this phase fit into the bigger curriculum?',
            answer:
              'Phases 1 and 2 gave you the spiritual foundations and personal identity truths you need. Deepening Roots now fills in the biblical knowledge that will support everything ahead. When you move into Phase 4, Living It Out, you will apply these scriptural truths to real-world relationships, character, and daily life.',
          },
          {
            question: 'What is the lesson format for this phase?',
            answer:
              'Each lesson includes an overview of the book or theme being studied, key points that highlight the most important takeaways, reflection questions to help you connect the material to your own life, practical steps for the week, and Scripture references for further personal study.',
          },
        ],
      } satisfies PhaseOverviewData,
    },

    // =========================================================
    // Phase 4: Living It Out
    // =========================================================
    {
      id: 'found-p4',
      title: 'Living It Out',
      description:
        'Apply your faith to everyday life through Christian character and virtue, healthy relationships, and faithful engagement with work, culture, and the world around you.',
      modules: [
        {
          id: 'found-p4-m1',
          title: 'Living It Out',
          description:
            'Developing Christian character, building godly relationships, and engaging the world with faith and integrity.',
          sections: [
            {
              id: 'found-p4-s1',
              title: 'Christian Character and Virtue',
              lessons: [
                {
                  id: 'found-4-1-1',
                  title: 'The Fruit of the Spirit',
                  description:
                    'Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control',
                },
                {
                  id: 'found-4-1-2',
                  title: 'Humility and Servanthood',
                  description:
                    'Following Jesus\' example',
                },
                {
                  id: 'found-4-1-3',
                  title: 'Integrity and Honesty',
                  description:
                    'Living transparently before God and others',
                },
                {
                  id: 'found-4-1-4',
                  title: 'Forgiveness: Giving and Receiving',
                  description:
                    'The hard work of letting go',
                },
                {
                  id: 'found-4-1-5',
                  title: 'Purity in Thought and Action',
                  description:
                    'Honoring God with your body and mind',
                },
                {
                  id: 'found-4-1-6',
                  title: 'Contentment and Gratitude',
                  description:
                    'Finding satisfaction in Christ alone',
                },
              ],
            },
            {
              id: 'found-p4-s2',
              title: 'Faith in Relationships',
              lessons: [
                {
                  id: 'found-4-2-1',
                  title: 'Honoring Your Family',
                  description:
                    'Faith in the context of home',
                },
                {
                  id: 'found-4-2-2',
                  title: 'Christian Friendship',
                  description:
                    'Building godly community',
                },
                {
                  id: 'found-4-2-3',
                  title: 'Navigating Difficult Relationships',
                  description:
                    'Boundaries, reconciliation, and wisdom',
                },
                {
                  id: 'found-4-2-4',
                  title: 'Sharing Your Faith',
                  description:
                    'How to naturally talk about Jesus with others',
                },
                {
                  id: 'found-4-2-5',
                  title: 'Loving Your Neighbor',
                  description:
                    'Practical compassion and service',
                },
              ],
            },
            {
              id: 'found-p4-s3',
              title: 'Faith in the World',
              lessons: [
                {
                  id: 'found-4-3-1',
                  title: 'Christianity and Work',
                  description:
                    'Bringing faith into your vocation',
                },
                {
                  id: 'found-4-3-2',
                  title: 'Christianity and Culture',
                  description:
                    'Engaging the world thoughtfully',
                },
                {
                  id: 'found-4-3-3',
                  title: 'Suffering and the Christian Life',
                  description:
                    'Why bad things happen and how to respond',
                },
                {
                  id: 'found-4-3-4',
                  title: 'Money, Possessions, and the Kingdom',
                  description:
                    'A biblical perspective on wealth',
                },
                {
                  id: 'found-4-3-5',
                  title: 'Justice, Mercy, and the Poor',
                  description:
                    'God\'s heart for the vulnerable',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'Living It Out is where faith meets everyday reality. By this point in the curriculum, you have built a solid foundation of biblical knowledge, spiritual habits, and identity in Christ. Now it is time to explore what it looks like to live out those truths in the messiness and beauty of real life. This phase covers three vital areas: Christian character and virtue, including the fruit of the Spirit, humility, integrity, forgiveness, and contentment; faith in relationships, from family and friendships to sharing your faith and loving your neighbor; and faith in the broader world, including your vocation, culture, suffering, money, and justice. You will be challenged to move beyond passive belief into active, Christ-shaped living that transforms your home, your workplace, and your community. This is where the rubber meets the road — and where the joy of following Jesus becomes most tangible.',
        expectations: [
          'Develop Christ-like character qualities such as love, patience, humility, and integrity',
          'Learn biblical principles for navigating family relationships, friendships, and difficult people',
          'Gain practical confidence in sharing your faith naturally with those around you',
          'Explore how your faith applies to your work, your engagement with culture, and social justice',
          'Develop a biblical perspective on money, possessions, and the purpose of wealth',
          'Learn to trust God through suffering and find His purposes even in difficult seasons',
        ],
        skillLevel: 'Intermediate',
        faq: [
          {
            question: 'What background do I need before starting this phase?',
            answer:
              'Living It Out is designed for learners who have worked through the earlier phases or who already have a solid grounding in the basics of the faith, Bible reading, and personal identity in Christ. The lessons assume familiarity with core Christian concepts and focus on applying them to practical life situations.',
          },
          {
            question: 'How much time does this phase take?',
            answer:
              'This phase is designed for Months 10 through 12 of the curriculum. With three sections containing a total of sixteen lessons, you can plan on one to two lessons per week. Each lesson takes about 15 to 25 minutes, but the application exercises may extend into your daily routines throughout the week.',
          },
          {
            question: 'How does this phase relate to the rest of the curriculum?',
            answer:
              'Phases 1 through 3 gave you the knowledge and habits you need. Living It Out is where you begin to integrate all of that learning into how you actually live. After completing this phase, you can continue into Going Deeper for advanced disciplines and ministry preparation, or explore elective topics in Phase 6.',
          },
          {
            question: 'What does the lesson format look like?',
            answer:
              'Lessons follow a consistent format of teaching content, key takeaways, reflection questions, and practical application steps. Because this phase is application-heavy, you will notice that the practical exercises are especially detailed and designed to be lived out in real relationships and real situations throughout your week.',
          },
        ],
      } satisfies PhaseOverviewData,
    },

    // =========================================================
    // Phase 5: Going Deeper
    // =========================================================
    {
      id: 'found-p5',
      title: 'Going Deeper',
      description:
        'Advance your spiritual life through deeper disciplines, theological literacy, and hands-on ministry and service in your church and beyond.',
      modules: [
        {
          id: 'found-p5-m1',
          title: 'Going Deeper',
          description:
            'Spiritual disciplines, theological foundations, and practical ministry training for continued growth.',
          sections: [
            {
              id: 'found-p5-s1',
              title: 'Spiritual Disciplines',
              lessons: [
                {
                  id: 'found-5-1-1',
                  title: 'Solitude and Silence',
                  description:
                    'Meeting God in stillness',
                },
                {
                  id: 'found-5-1-2',
                  title: 'Scripture Meditation',
                  description:
                    'Moving beyond reading to dwelling in the Word',
                },
                {
                  id: 'found-5-1-3',
                  title: 'Intercessory Prayer',
                  description:
                    'Praying for others with purpose',
                },
                {
                  id: 'found-5-1-4',
                  title: 'Journaling as a Spiritual Practice',
                  description:
                    'Tracking your journey with God',
                },
                {
                  id: 'found-5-1-5',
                  title: 'Spiritual Retreat',
                  description:
                    'Extended times of renewal and focus',
                },
                {
                  id: 'found-5-1-6',
                  title: 'Practicing the Presence of God',
                  description:
                    'Cultivating awareness of God throughout the day',
                },
              ],
            },
            {
              id: 'found-p5-s2',
              title: 'Theological Literacy',
              lessons: [
                {
                  id: 'found-5-2-1',
                  title: 'Basic Doctrine Survey',
                  description:
                    'The essential beliefs of Christianity',
                },
                {
                  id: 'found-5-2-2',
                  title: 'Church History for Beginners',
                  description:
                    'How we got here from there',
                },
                {
                  id: 'found-5-2-3',
                  title: 'Understanding Different Denominations',
                  description:
                    'What unites and distinguishes Christian traditions',
                },
                {
                  id: 'found-5-2-4',
                  title: 'Creeds and Confessions',
                  description:
                    'The Apostles\' Creed, Nicene Creed, and why they matter',
                },
                {
                  id: 'found-5-2-5',
                  title: 'How We Got the Bible',
                  description:
                    'Canon, translation, and transmission',
                },
                {
                  id: 'found-5-2-6',
                  title: 'Interpreting the Bible',
                  description:
                    'Basic principles for understanding Scripture correctly',
                },
              ],
            },
            {
              id: 'found-p5-s3',
              title: 'Ministry and Service',
              lessons: [
                {
                  id: 'found-5-3-1',
                  title: 'Discovering Your Spiritual Gifts',
                  description:
                    'Identifying how God has equipped you to serve',
                },
                {
                  id: 'found-5-3-2',
                  title: 'Serving in the Local Church',
                  description:
                    'Finding your place in the body of Christ',
                },
                {
                  id: 'found-5-3-3',
                  title: 'Introduction to Small Group Leadership',
                  description:
                    'Facilitating community and growth',
                },
                {
                  id: 'found-5-3-4',
                  title: 'Caring for Others',
                  description:
                    'Basic pastoral care and encouragement',
                },
                {
                  id: 'found-5-3-5',
                  title: 'Personal Evangelism',
                  description:
                    'Practical training in sharing the gospel',
                },
                {
                  id: 'found-5-3-6',
                  title: 'Introduction to Missions',
                  description:
                    'God\'s global purpose and your part in it',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'Going Deeper is for believers who have established a strong foundation and are hungry for more. This phase takes your spiritual life to the next level through three focused areas. First, you will explore spiritual disciplines that go beyond the basics — solitude, silence, Scripture meditation, intercessory prayer, journaling, spiritual retreats, and practicing the presence of God throughout your day. Second, you will build theological literacy by surveying essential Christian doctrine, church history, denominational distinctives, historic creeds, how we received the Bible, and principles of biblical interpretation. Third, you will receive hands-on ministry training, including discovering your spiritual gifts, serving in the local church, leading a small group, caring for others, personal evangelism, and an introduction to missions. This phase is designed to equip you not only to grow personally but to begin pouring into the lives of others as a maturing follower of Christ.',
        expectations: [
          'Practice advanced spiritual disciplines such as solitude, silence, meditation, and retreat',
          'Build theological literacy through a survey of essential Christian doctrine and church history',
          'Understand denominational differences and the historic creeds that unite believers',
          'Discover your spiritual gifts and learn how to use them in service to others',
          'Gain practical skills for small group leadership, pastoral care, and personal evangelism',
          'Develop a heart for global missions and understand your role in God\'s worldwide purposes',
        ],
        skillLevel: 'Intermediate',
        faq: [
          {
            question: 'What preparation is recommended before starting this phase?',
            answer:
              'Going Deeper is designed for those who have completed or are familiar with the material in Phases 1 through 4. A solid understanding of the gospel, regular spiritual habits, biblical literacy, and practical Christian living will help you get the most from these more advanced topics.',
          },
          {
            question: 'How long will this phase take to work through?',
            answer:
              'This phase is designed for Year 2 and beyond. With eighteen lessons across three sections, you can pace yourself at one lesson per week or adjust based on your schedule. Some disciplines, like solitude or spiritual retreat, may require setting aside additional time beyond the lesson itself.',
          },
          {
            question: 'How does this phase connect to the earlier ones and to Phase 6?',
            answer:
              'Phases 1 through 4 built your knowledge, identity, and practical faith. Going Deeper expands your inner life through disciplines and theology while also turning you outward through ministry and service. Phase 6, Electives and Special Topics, can be explored alongside or after this phase based on your interests and life circumstances.',
          },
          {
            question: 'What is the lesson format at this level?',
            answer:
              'Lessons maintain the same core structure of teaching content, key points, reflection questions, and practical application. At this level, the application steps are often more experiential — you may be asked to practice a discipline over several days, lead a discussion, or serve in a new capacity at your church.',
          },
        ],
      } satisfies PhaseOverviewData,
    },

    // =========================================================
    // Phase 6: Special Topics
    // =========================================================
    {
      id: 'found-p6',
      title: 'Special Topics',
      description:
        'Explore topics relevant to your specific life stage, deepen your ability to give a reason for your faith, and study focused passages of Scripture in greater detail.',
      modules: [
        {
          id: 'found-p6-m1',
          title: 'Special Topics',
          description:
            'Life-stage topics, worldview and apologetics, and specialized Bible studies for continued exploration.',
          sections: [
            {
              id: 'found-p6-s1',
              title: 'Life Stages and Situations',
              lessons: [
                {
                  id: 'found-6-1-1',
                  title: 'Faith and Singleness',
                  description:
                    'Following Jesus as an unmarried person',
                },
                {
                  id: 'found-6-1-2',
                  title: 'Preparing for Christian Marriage',
                  description:
                    'Foundations for a God-centered relationship',
                },
                {
                  id: 'found-6-1-3',
                  title: 'Parenting with Purpose',
                  description:
                    'Raising children in the faith',
                },
                {
                  id: 'found-6-1-4',
                  title: 'Faith in the Workplace',
                  description:
                    'Monday through Friday Christianity',
                },
                {
                  id: 'found-6-1-5',
                  title: 'Navigating Doubt',
                  description:
                    'Honest questions and the life of faith',
                },
                {
                  id: 'found-6-1-6',
                  title: 'Grief and Loss',
                  description:
                    'Walking through dark valleys with God',
                },
                {
                  id: 'found-6-1-7',
                  title: 'Addiction and Recovery',
                  description:
                    'Finding freedom through Christ and community',
                },
                {
                  id: 'found-6-1-8',
                  title: 'Mental Health and Faith',
                  description:
                    'Understanding anxiety, depression, and getting help',
                },
              ],
            },
            {
              id: 'found-p6-s2',
              title: 'Worldview and Apologetics',
              lessons: [
                {
                  id: 'found-6-2-1',
                  title: 'Why Believe?',
                  description:
                    'Reasons for faith in a skeptical age',
                },
                {
                  id: 'found-6-2-2',
                  title: 'Tough Questions',
                  description:
                    'Addressing common objections to Christianity',
                },
                {
                  id: 'found-6-2-3',
                  title: 'Science and Faith',
                  description:
                    'Understanding the relationship between the two',
                },
                {
                  id: 'found-6-2-4',
                  title: 'Christianity and Other Religions',
                  description:
                    'What makes Christianity distinct',
                },
                {
                  id: 'found-6-2-5',
                  title: 'Ethics for Everyday Life',
                  description:
                    'Making moral decisions as a Christian',
                },
              ],
            },
            {
              id: 'found-p6-s3',
              title: 'Specialized Bible Studies',
              lessons: [
                {
                  id: 'found-6-3-1',
                  title: 'The Sermon on the Mount',
                  description:
                    'Jesus\' vision for kingdom living',
                },
                {
                  id: 'found-6-3-2',
                  title: 'The Parables of Jesus',
                  description:
                    'Stories that reveal the heart of God',
                },
                {
                  id: 'found-6-3-3',
                  title: 'Philippians: Joy in All Circumstances',
                  description:
                    'A study of Paul\'s letter on finding joy regardless of circumstances',
                },
                {
                  id: 'found-6-3-4',
                  title: 'Ephesians: Life in Christ',
                  description:
                    'A study of Paul\'s letter on identity, grace, and living as the body of Christ',
                },
                {
                  id: 'found-6-3-5',
                  title: '1 John: Assurance and Love',
                  description:
                    'A study of John\'s letter on confidence in faith and the centrality of love',
                },
                {
                  id: 'found-6-3-6',
                  title: 'The Lord\'s Prayer',
                  description:
                    'A phrase-by-phrase study',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'Special Topics is a flexible collection of electives designed to meet you wherever you are in life. Unlike the sequential phases that come before it, this phase can be explored in any order and at any time based on your personal interests, current circumstances, and spiritual needs. It covers three rich areas: life stages and situations, including singleness, marriage preparation, parenting, workplace faith, doubt, grief, addiction, and mental health; worldview and apologetics, helping you give a thoughtful reason for your faith and engage with tough questions about science, other religions, and everyday ethics; and specialized Bible studies that take you deeper into beloved passages like the Sermon on the Mount, the parables of Jesus, and key letters such as Philippians, Ephesians, and 1 John. Whether you are walking through a specific season of life or simply want to explore a topic that sparks your curiosity, this phase provides a welcoming space to keep growing.',
        expectations: [
          'Explore topics tailored to your current life stage, from singleness and marriage to parenting and the workplace',
          'Find biblical guidance for navigating doubt, grief, addiction, and mental health challenges',
          'Develop the ability to articulate and defend your faith in conversations with skeptics',
          'Engage thoughtfully with questions about science, other religions, and everyday moral decisions',
          'Dive deeper into specific books and passages of the Bible through focused study',
          'Choose your own learning path based on personal interest and present need',
        ],
        skillLevel: 'All Levels',
        faq: [
          {
            question: 'Do I need to complete the other phases before exploring these topics?',
            answer:
              'Not necessarily. While some topics assume a basic understanding of the faith covered in earlier phases, many lessons in this section are accessible to learners at any level. Feel free to jump into a topic that is relevant to your life right now, and return to other topics as your interests or circumstances evolve.',
          },
          {
            question: 'How much time should I expect to spend on this phase?',
            answer:
              'Because this phase is elective-based, there is no set timeline. Each lesson takes approximately 15 to 25 minutes. You might choose to study one topic intensively over a few weeks or sample different lessons over several months. The pace is entirely up to you.',
          },
          {
            question: 'Can I study these topics alongside the other phases?',
            answer:
              'Absolutely. Special Topics is designed to complement the rest of the curriculum rather than follow it in strict sequence. If you are working through Phase 3 or 4 and a life situation arises that one of these electives addresses, you are encouraged to pause and explore that topic whenever it is most helpful.',
          },
          {
            question: 'What format do the elective lessons follow?',
            answer:
              'Each lesson follows the same trusted format used throughout the curriculum: clear teaching content, key points, reflection questions, practical application steps, and Scripture references. The tone remains warm and accessible, regardless of how advanced or sensitive the topic may be.',
          },
        ],
      } satisfies PhaseOverviewData,
    },
  ],
};
