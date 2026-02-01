import { Curriculum } from '@/types/curriculum';

export const exploringFaithCurriculum: Curriculum = {
  id: 'exploring-faith',
  title: 'Exploring Faith',
  description:
    'An open, honest path for seekers, skeptics, and the spiritually curious who want to investigate Christianity, its claims, its founder, and what it means to follow Jesus — intellectually rigorous, personally relevant, and genuinely open to questions.',
  personaIntro:
    'Welcome to your journey of exploration. Whether you are a skeptic, a seeker, or simply curious, this curriculum is designed to help you investigate the claims of Christianity honestly and at your own pace.',
  learningApproach:
    'This path invites you to explore with intellectual honesty, genuine curiosity, and personal reflection. You are encouraged to ask hard questions, voice doubts, and engage critically as you investigate faith on your own terms.',
  phases: [
    // ========================================================
    // Phase 1: Foundations for Exploration
    // ========================================================
    {
      id: 'expl-p1',
      title: 'Foundations for Exploration',
      description:
        'Establish a foundation for honest exploration by examining worldviews, clearing misconceptions, and engaging the big questions of life.',
      modules: [
        {
          id: 'expl-p1-m1',
          title: 'Starting Points',
          description:
            'Begin the journey by reflecting on the human search for meaning, understanding what religion is, and preparing for honest investigation.',
          sections: [
            {
              id: 'expl-p1-m1-s1',
              title: 'Starting Points',
              lessons: [
                {
                  id: 'expl-p1-m1-s1-l1',
                  title: 'Why Explore Faith at All?',
                  description:
                    'The human search for meaning, purpose, and transcendence',
                },
                {
                  id: 'expl-p1-m1-s1-l2',
                  title: 'What Is Religion?',
                  description:
                    'Definitions, functions, and varieties of religious experience',
                },
                {
                  id: 'expl-p1-m1-s1-l3',
                  title: 'Worldviews 101',
                  description:
                    'How everyone operates from a set of assumptions about reality',
                },
                {
                  id: 'expl-p1-m1-s1-l4',
                  title: 'Your Story So Far',
                  description:
                    'Reflecting on your own spiritual background and current beliefs',
                },
                {
                  id: 'expl-p1-m1-s1-l5',
                  title: 'Common Misconceptions About Christianity',
                  description:
                    'Clearing away caricatures to see what Christians actually claim',
                },
                {
                  id: 'expl-p1-m1-s1-l6',
                  title: 'How to Be a Good Skeptic',
                  description:
                    'Intellectual honesty, openness, and the courage to follow evidence',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p1-m2',
          title: 'The Big Questions',
          description:
            'Engage the fundamental questions of existence, meaning, morality, and truth that drive the search for faith.',
          sections: [
            {
              id: 'expl-p1-m2-s1',
              title: 'The Big Questions',
              lessons: [
                {
                  id: 'expl-p1-m2-s1-l1',
                  title: 'Does God Exist?',
                  description:
                    'Arguments for and against, and what\'s at stake',
                },
                {
                  id: 'expl-p1-m2-s1-l2',
                  title: 'Why Is There Something Rather Than Nothing?',
                  description: 'The cosmological question',
                },
                {
                  id: 'expl-p1-m2-s1-l3',
                  title: 'Why Is There Order and Design?',
                  description: 'The teleological question',
                },
                {
                  id: 'expl-p1-m2-s1-l4',
                  title: 'Why Do Humans Have Moral Intuitions?',
                  description: 'The moral argument',
                },
                {
                  id: 'expl-p1-m2-s1-l5',
                  title: 'Is There Meaning to Life?',
                  description:
                    'Existential questions and possible answers',
                },
                {
                  id: 'expl-p1-m2-s1-l6',
                  title: 'What Happens When We Die?',
                  description:
                    'Mortality and the question of eternity',
                },
                {
                  id: 'expl-p1-m2-s1-l7',
                  title: 'Why Is There Suffering?',
                  description: 'The problem of evil and pain',
                },
                {
                  id: 'expl-p1-m2-s1-l8',
                  title: 'Can We Know Truth?',
                  description:
                    'Epistemology and the limits of human knowledge',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p1-m3',
          title: 'Comparing Worldviews',
          description:
            'Survey the major worldviews and belief systems to understand where Christianity fits in the broader landscape of human thought.',
          sections: [
            {
              id: 'expl-p1-m3-s1',
              title: 'Comparing Worldviews',
              lessons: [
                {
                  id: 'expl-p1-m3-s1-l1',
                  title: 'Atheism and Naturalism',
                  description:
                    'A universe without God: implications and challenges',
                },
                {
                  id: 'expl-p1-m3-s1-l2',
                  title: 'Agnosticism',
                  description:
                    'The limits of knowledge and living with uncertainty',
                },
                {
                  id: 'expl-p1-m3-s1-l3',
                  title: 'Pantheism and Eastern Thought',
                  description:
                    'God as everything: Hinduism, Buddhism, New Age',
                },
                {
                  id: 'expl-p1-m3-s1-l4',
                  title: 'Islam',
                  description:
                    'Submission to Allah: beliefs, practices, and comparison to Christianity',
                },
                {
                  id: 'expl-p1-m3-s1-l5',
                  title: 'Judaism',
                  description:
                    'The God of Israel: history, belief, and relationship to Christianity',
                },
                {
                  id: 'expl-p1-m3-s1-l6',
                  title: 'Secular Humanism',
                  description: 'Human flourishing without God',
                },
                {
                  id: 'expl-p1-m3-s1-l7',
                  title: 'Postmodernism and Relativism',
                  description: 'Is truth subjective?',
                },
                {
                  id: 'expl-p1-m3-s1-l8',
                  title: 'Christianity in the Landscape',
                  description:
                    'Where does it fit and what makes it distinct?',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'This opening phase is designed for anyone beginning to investigate faith — whether you consider yourself a skeptic, an agnostic, or simply someone with genuine questions. Rather than asking you to accept any conclusions up front, Foundations for Exploration invites you to examine the assumptions everyone carries about reality, clear away common misconceptions about Christianity, and engage honestly with the biggest questions human beings have ever asked: Does God exist? Is there meaning to life? Why is there suffering? You will survey the major worldviews — atheism, pantheism, secular humanism, and more — so you can see where Christianity sits in the broader landscape of human thought. The goal is not to persuade you but to equip you with the intellectual tools and self-awareness needed to explore with integrity, wherever that exploration leads.',
        expectations: [
          'Reflect on your own worldview assumptions and spiritual background',
          'Clear away caricatures and common misconceptions about Christianity',
          'Engage the big existential questions — meaning, morality, suffering, and truth',
          'Survey major worldviews including atheism, agnosticism, and Eastern thought',
          'Develop skills for honest, courageous intellectual inquiry',
          'Understand where Christianity fits among competing belief systems',
        ],
        skillLevel: 'All Levels',
        faq: [
          {
            question: 'Do I need to believe anything before starting this phase?',
            answer:
              'Not at all. This phase is built for people at every point on the belief spectrum — firm skeptics, curious agnostics, and everyone in between. You are welcome exactly as you are.',
          },
          {
            question: 'How much time should I expect to spend?',
            answer:
              'Each lesson is designed to take roughly 15 to 30 minutes. You can move through the material at whatever pace feels right — there is no deadline and no pressure to rush.',
          },
          {
            question: 'What if I have doubts or disagree with something?',
            answer:
              'Doubts and disagreements are not only expected — they are welcomed. This curriculum is designed to be a safe space for honest questions, and you will never be asked to set aside your critical thinking.',
          },
          {
            question: 'How does this phase connect to the rest of the curriculum?',
            answer:
              'Foundations for Exploration provides the intellectual groundwork for everything that follows. Once you have examined your own assumptions and the big questions, you will be prepared to investigate the Bible, the person of Jesus, and the evidence for and against Christianity in later phases.',
          },
        ],
      },
    },

    // ========================================================
    // Phase 2: Understanding the Bible
    // ========================================================
    {
      id: 'expl-p2',
      title: 'Understanding the Bible',
      description:
        'Learn what the Bible is, how it came to be, the overarching story it tells, and which texts are most relevant for seekers.',
      modules: [
        {
          id: 'expl-p2-m1',
          title: 'What Is the Bible?',
          description:
            'Explore the nature, origins, preservation, and interpretation of the Bible as a collection of texts.',
          sections: [
            {
              id: 'expl-p2-m1-s1',
              title: 'What Is the Bible?',
              lessons: [
                {
                  id: 'expl-p2-m1-s1-l1',
                  title: 'Introduction to the Bible',
                  description:
                    'What it is, how it\'s organized, and what it claims to be',
                },
                {
                  id: 'expl-p2-m1-s1-l2',
                  title: 'How the Bible Came to Be',
                  description:
                    'Authorship, compilation, and canonization',
                },
                {
                  id: 'expl-p2-m1-s1-l3',
                  title: 'How the Bible Was Preserved',
                  description:
                    'Manuscripts, transmission, and textual reliability',
                },
                {
                  id: 'expl-p2-m1-s1-l4',
                  title: 'How the Bible Has Been Interpreted',
                  description:
                    'Different approaches through history',
                },
                {
                  id: 'expl-p2-m1-s1-l5',
                  title: 'How to Read the Bible',
                  description:
                    'Genre, context, and avoiding common mistakes',
                },
                {
                  id: 'expl-p2-m1-s1-l6',
                  title: 'Controversies About the Bible',
                  description:
                    'Addressing common criticisms and questions',
                },
                {
                  id: 'expl-p2-m1-s1-l7',
                  title: 'The Bible and Other Holy Books',
                  description:
                    'Comparison with the Quran, Vedas, and other scriptures',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p2-m2',
          title: 'The Story of the Bible',
          description:
            'Trace the overarching narrative of the Bible from creation through the coming of Jesus and the birth of the church.',
          sections: [
            {
              id: 'expl-p2-m2-s1',
              title: 'The Story of the Bible',
              lessons: [
                {
                  id: 'expl-p2-m2-s1-l1',
                  title: 'Creation and the Beginning',
                  description:
                    'Genesis and the origin of all things',
                },
                {
                  id: 'expl-p2-m2-s1-l2',
                  title: 'The Fall and the Human Problem',
                  description:
                    'What went wrong and why it matters',
                },
                {
                  id: 'expl-p2-m2-s1-l3',
                  title: 'The Promise and the Patriarchs',
                  description:
                    'Abraham, Isaac, Jacob, and the beginning of Israel',
                },
                {
                  id: 'expl-p2-m2-s1-l4',
                  title: 'Exodus and Redemption',
                  description:
                    'Slavery, deliverance, and the birth of a nation',
                },
                {
                  id: 'expl-p2-m2-s1-l5',
                  title: 'Law and Covenant',
                  description:
                    'What God asked of Israel and why',
                },
                {
                  id: 'expl-p2-m2-s1-l6',
                  title: 'Kings and Prophets',
                  description:
                    'Israel\'s rise, fall, and hope for the future',
                },
                {
                  id: 'expl-p2-m2-s1-l7',
                  title: 'Exile and Return',
                  description:
                    'Judgment, survival, and waiting for a Messiah',
                },
                {
                  id: 'expl-p2-m2-s1-l8',
                  title: 'The Intertestamental Period',
                  description:
                    'What happened between the Old and New Testaments',
                },
                {
                  id: 'expl-p2-m2-s1-l9',
                  title: 'The Coming of Jesus',
                  description: 'The turning point of the story',
                },
                {
                  id: 'expl-p2-m2-s1-l10',
                  title: 'The Birth of the Church',
                  description:
                    'From a small movement to a world religion',
                },
                {
                  id: 'expl-p2-m2-s1-l11',
                  title: 'The End of the Story',
                  description:
                    'Where Christianity says history is heading',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p2-m3',
          title: 'Key Texts for Seekers',
          description:
            'Discover the most important biblical books and passages for those beginning to explore the Christian faith.',
          sections: [
            {
              id: 'expl-p2-m3-s1',
              title: 'Key Texts for Seekers',
              lessons: [
                {
                  id: 'expl-p2-m3-s1-l1',
                  title: 'The Gospel of Mark',
                  description:
                    'The fastest introduction to Jesus\' life and claims',
                },
                {
                  id: 'expl-p2-m3-s1-l2',
                  title: 'The Gospel of John',
                  description:
                    'Jesus in his own words, written for those seeking to believe',
                },
                {
                  id: 'expl-p2-m3-s1-l3',
                  title: 'The Book of Acts',
                  description:
                    'How the early Christians lived and spread their message',
                },
                {
                  id: 'expl-p2-m3-s1-l4',
                  title: 'Romans',
                  description:
                    'Paul\'s explanation of what Christianity is and why it matters',
                },
                {
                  id: 'expl-p2-m3-s1-l5',
                  title: 'Ecclesiastes',
                  description:
                    'Ancient wisdom on meaning, futility, and what endures',
                },
                {
                  id: 'expl-p2-m3-s1-l6',
                  title: 'Psalms',
                  description:
                    'Honest prayers of faith, doubt, anger, and praise',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'The Bible is the most influential book in Western civilization, yet many people have never read it carefully or understood how it came together. This phase gives you the tools to engage Scripture on its own terms — without demanding that you accept it as sacred before you begin. You will learn what the Bible actually is, how it was written and preserved over centuries, and how scholars ancient and modern have interpreted it. From there you will trace the overarching narrative from Genesis to Revelation, seeing how its individual books connect into a single sweeping story. Finally, you will read the key texts that are most relevant to seekers: the Gospels of Mark and John, the book of Acts, Paul\'s letter to the Romans, and the reflective wisdom of Ecclesiastes and the Psalms. The aim is informed, critical engagement — the kind that lets you draw your own conclusions.',
        expectations: [
          'Understand how the Bible was written, compiled, and preserved',
          'Learn to read biblical texts in their proper literary and historical context',
          'Trace the overarching storyline from creation through the early church',
          'Engage directly with the key biblical books recommended for seekers',
          'Examine common controversies and criticisms about the Bible honestly',
          'Compare the Bible with other holy books and religious texts',
        ],
        skillLevel: 'All Levels',
        faq: [
          {
            question: 'Do I need to believe the Bible is true to benefit from this phase?',
            answer:
              'No. This phase treats the Bible as a text worth understanding on its own terms, regardless of what you ultimately conclude about its claims. Many people find that simply reading it carefully — without pressure to believe — is an illuminating experience.',
          },
          {
            question: 'How much time will this phase take?',
            answer:
              'Individual lessons run about 15 to 30 minutes. Because this phase includes direct reading of biblical passages, you may want to set aside a bit of extra time for the Key Texts module so you can read at a comfortable pace.',
          },
          {
            question: 'What if parts of the Bible seem confusing or troubling?',
            answer:
              'That is a normal part of the process. The curriculum addresses difficult passages and common criticisms directly. You are encouraged to sit with your questions rather than ignore them — honest engagement is far more valuable than forced agreement.',
          },
          {
            question: 'Do I need to complete Phase 1 before starting here?',
            answer:
              'It is not strictly required, but the foundational thinking skills and worldview awareness from Phase 1 will help you engage the Bible more thoughtfully. If you are eager to dive into Scripture, you can always revisit Phase 1 later.',
          },
        ],
      },
    },

    // ========================================================
    // Phase 3: Investigating Jesus
    // ========================================================
    {
      id: 'expl-p3',
      title: 'Investigating Jesus',
      description:
        'Examine the historical evidence for Jesus, his claims about himself, and the most common objections and hard questions about him.',
      modules: [
        {
          id: 'expl-p3-m1',
          title: 'The Historical Jesus',
          description:
            'Investigate the historical evidence for Jesus\' existence, life, ministry, death, and resurrection.',
          sections: [
            {
              id: 'expl-p3-m1-s1',
              title: 'The Historical Jesus',
              lessons: [
                {
                  id: 'expl-p3-m1-s1-l1',
                  title: 'Did Jesus Exist?',
                  description:
                    'Historical evidence inside and outside the Bible',
                },
                {
                  id: 'expl-p3-m1-s1-l2',
                  title: 'Sources for Jesus\' Life',
                  description:
                    'Gospels, letters, and non-Christian references',
                },
                {
                  id: 'expl-p3-m1-s1-l3',
                  title: 'The World Jesus Lived In',
                  description:
                    'First-century Judaism, Roman occupation, and cultural context',
                },
                {
                  id: 'expl-p3-m1-s1-l4',
                  title: 'The Life of Jesus',
                  description:
                    'Birth, childhood, and early years',
                },
                {
                  id: 'expl-p3-m1-s1-l5',
                  title: 'The Ministry of Jesus',
                  description:
                    'Teaching, healing, and gathering followers',
                },
                {
                  id: 'expl-p3-m1-s1-l6',
                  title: 'The Teachings of Jesus',
                  description:
                    'What he actually said and what it means',
                },
                {
                  id: 'expl-p3-m1-s1-l7',
                  title: 'The Miracles of Jesus',
                  description:
                    'What was claimed and how to evaluate it',
                },
                {
                  id: 'expl-p3-m1-s1-l8',
                  title: 'The Death of Jesus',
                  description:
                    'Why he was crucified and what Christians believe it accomplished',
                },
                {
                  id: 'expl-p3-m1-s1-l9',
                  title: 'The Resurrection of Jesus',
                  description:
                    'The central claim: did it happen?',
                },
                {
                  id: 'expl-p3-m1-s1-l10',
                  title: 'Evaluating the Evidence',
                  description:
                    'Historical method and the resurrection',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p3-m2',
          title: 'The Claims of Jesus',
          description:
            'Explore what Jesus claimed about himself and what those claims mean for those investigating the faith.',
          sections: [
            {
              id: 'expl-p3-m2-s1',
              title: 'The Claims of Jesus',
              lessons: [
                {
                  id: 'expl-p3-m2-s1-l1',
                  title: 'Jesus and God',
                  description:
                    'Did Jesus claim to be divine? What did he mean?',
                },
                {
                  id: 'expl-p3-m2-s1-l2',
                  title: 'Jesus as Messiah',
                  description:
                    'The Jewish expectation and Jesus\' fulfillment',
                },
                {
                  id: 'expl-p3-m2-s1-l3',
                  title: 'Jesus as Savior',
                  description: 'From what? To what? How?',
                },
                {
                  id: 'expl-p3-m2-s1-l4',
                  title: 'Jesus as Lord',
                  description: 'What it means to follow him',
                },
                {
                  id: 'expl-p3-m2-s1-l5',
                  title: 'Jesus as Teacher',
                  description: 'His wisdom and its challenge',
                },
                {
                  id: 'expl-p3-m2-s1-l6',
                  title: 'Jesus as Prophet',
                  description:
                    'Speaking for God and confronting injustice',
                },
                {
                  id: 'expl-p3-m2-s1-l7',
                  title: 'Jesus and Other Religious Figures',
                  description:
                    'Comparison with Buddha, Muhammad, and others',
                },
                {
                  id: 'expl-p3-m2-s1-l8',
                  title: 'Why Jesus Still Matters',
                  description:
                    'His lasting influence on history and culture',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p3-m3',
          title: 'Objections and Hard Questions About Jesus',
          description:
            'Confront the most common objections and difficult questions people raise about Jesus and his story.',
          sections: [
            {
              id: 'expl-p3-m3-s1',
              title: 'Objections and Hard Questions About Jesus',
              lessons: [
                {
                  id: 'expl-p3-m3-s1-l1',
                  title: 'Was Jesus Just a Good Teacher?',
                  description:
                    'The "Lord, Liar, or Lunatic" argument',
                },
                {
                  id: 'expl-p3-m3-s1-l2',
                  title: 'Did the Disciples Make It Up?',
                  description:
                    'Conspiracy theories and their problems',
                },
                {
                  id: 'expl-p3-m3-s1-l3',
                  title: 'Were the Gospels Changed Over Time?',
                  description:
                    'Textual criticism and reliability',
                },
                {
                  id: 'expl-p3-m3-s1-l4',
                  title: 'What About the "Lost Gospels"?',
                  description:
                    'Gnostic writings and why they were excluded',
                },
                {
                  id: 'expl-p3-m3-s1-l5',
                  title: 'Did Jesus Really Rise from the Dead?',
                  description: 'Alternative theories examined',
                },
                {
                  id: 'expl-p3-m3-s1-l6',
                  title: 'Why Would God Become Human?',
                  description: 'The logic of the incarnation',
                },
                {
                  id: 'expl-p3-m3-s1-l7',
                  title: 'Why Did Jesus Have to Die?',
                  description:
                    'Theories of atonement explained',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'Christianity stands or falls on the person of Jesus of Nazareth, so this phase puts him under the microscope. You will examine the historical evidence for Jesus\' existence — from biblical manuscripts to Roman and Jewish sources — and explore the world he lived in so you can understand his words and actions in context. You will then consider his remarkable claims: that he was the Jewish Messiah, that he had divine authority, and that his death and resurrection changed everything. Rather than glossing over difficulties, this phase devotes an entire module to the hardest objections people raise about Jesus — whether the Gospels were altered over time, whether the disciples fabricated the resurrection, and why a loving God would need to become human and die. The tone throughout is investigative, not devotional. You are being invited to weigh the evidence and reach your own verdict.',
        expectations: [
          'Evaluate the historical evidence for Jesus\' existence and ministry',
          'Understand the first-century Jewish and Roman context of Jesus\' life',
          'Examine what Jesus claimed about himself and why those claims matter',
          'Confront the strongest objections and alternative theories about Jesus',
          'Compare Jesus with other major religious figures',
          'Form your own informed assessment of who Jesus was',
        ],
        skillLevel: 'All Levels',
        faq: [
          {
            question: 'Do I need to believe Jesus was divine to engage with this phase?',
            answer:
              'Absolutely not. This phase is designed for investigation, not devotion. You can approach the material as a historian, a philosopher, or simply a curious person. The only requirement is a willingness to look at the evidence honestly.',
          },
          {
            question: 'How long will it take to work through this phase?',
            answer:
              'With three modules and roughly 25 lessons, most people spend several weeks here. Each lesson takes about 15 to 30 minutes, but some of the evidence-heavy lessons — especially around the resurrection — reward slower, more reflective engagement.',
          },
          {
            question: 'What if I find the objections more convincing than the claims?',
            answer:
              'Then this phase has done its job. The goal is not to convince you of a predetermined conclusion but to give you the strongest versions of both sides so you can think clearly. Honest investigation sometimes leads away from faith, and that is respected here.',
          },
          {
            question: 'How does this phase relate to Phase 5, Examining the Evidence?',
            answer:
              'Phase 3 focuses specifically on Jesus — his history, his claims, and the objections surrounding him. Phase 5 broadens the lens to evaluate the cumulative case for and against Christianity as a whole, including philosophical arguments, the problem of evil, and the role of doubt.',
          },
        ],
      },
    },

    // ========================================================
    // Phase 4: Understanding Christian Belief
    // ========================================================
    {
      id: 'expl-p4',
      title: 'Understanding Christian Belief',
      description:
        'Explore the core doctrines of Christianity, deeper theological concepts, and the diversity of Christian traditions.',
      modules: [
        {
          id: 'expl-p4-m1',
          title: 'Core Christian Doctrines',
          description:
            'Understand the foundational beliefs that define Christianity, from the nature of God to the future of history.',
          sections: [
            {
              id: 'expl-p4-m1-s1',
              title: 'Core Christian Doctrines',
              lessons: [
                {
                  id: 'expl-p4-m1-s1-l1',
                  title: 'God: Who Christians Believe God Is',
                  description:
                    'One God, personal, powerful, loving',
                },
                {
                  id: 'expl-p4-m1-s1-l2',
                  title: 'The Trinity Explained',
                  description:
                    'Father, Son, and Holy Spirit: what it means and why it matters',
                },
                {
                  id: 'expl-p4-m1-s1-l3',
                  title: 'Creation: Where Everything Came From',
                  description: 'God as creator and sustainer',
                },
                {
                  id: 'expl-p4-m1-s1-l4',
                  title: 'Humanity: Who We Are',
                  description:
                    'Made in God\'s image, but broken',
                },
                {
                  id: 'expl-p4-m1-s1-l5',
                  title: 'Sin: What Went Wrong',
                  description:
                    'The Christian diagnosis of the human problem',
                },
                {
                  id: 'expl-p4-m1-s1-l6',
                  title: 'Salvation: The Christian Solution',
                  description:
                    'Grace, faith, and what Jesus accomplished',
                },
                {
                  id: 'expl-p4-m1-s1-l7',
                  title: 'The Holy Spirit: God Present and Active',
                  description:
                    'Who the Spirit is and what he does',
                },
                {
                  id: 'expl-p4-m1-s1-l8',
                  title: 'The Church: The Community of Believers',
                  description:
                    'What the church is supposed to be',
                },
                {
                  id: 'expl-p4-m1-s1-l9',
                  title: 'The Future: Where History Is Going',
                  description:
                    'Death, judgment, heaven, hell, and new creation',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p4-m2',
          title: 'Christian Beliefs in Depth',
          description:
            'Dive deeper into key Christian theological concepts including grace, faith, repentance, and the afterlife.',
          sections: [
            {
              id: 'expl-p4-m2-s1',
              title: 'Christian Beliefs in Depth',
              lessons: [
                {
                  id: 'expl-p4-m2-s1-l1',
                  title: 'What Is Grace?',
                  description:
                    'Unearned favor and its implications',
                },
                {
                  id: 'expl-p4-m2-s1-l2',
                  title: 'What Is Faith?',
                  description:
                    'More than belief: trust, commitment, and relationship',
                },
                {
                  id: 'expl-p4-m2-s1-l3',
                  title: 'What Is Repentance?',
                  description:
                    'Turning around and starting fresh',
                },
                {
                  id: 'expl-p4-m2-s1-l4',
                  title: 'What Is Forgiveness?',
                  description:
                    'Being pardoned and pardoning others',
                },
                {
                  id: 'expl-p4-m2-s1-l5',
                  title: 'What Is Salvation?',
                  description:
                    'Rescue, healing, restoration, and eternal life',
                },
                {
                  id: 'expl-p4-m2-s1-l6',
                  title: 'What Is Justification?',
                  description: 'Being declared righteous',
                },
                {
                  id: 'expl-p4-m2-s1-l7',
                  title: 'What Is Sanctification?',
                  description:
                    'The process of becoming holy',
                },
                {
                  id: 'expl-p4-m2-s1-l8',
                  title: 'What Is Heaven?',
                  description:
                    'The Christian hope for the future',
                },
                {
                  id: 'expl-p4-m2-s1-l9',
                  title: 'What Is Hell?',
                  description:
                    'The difficult doctrine and what Christians actually believe',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p4-m3',
          title: 'Varieties of Christianity',
          description:
            'Survey the major branches, denominations, and movements within Christianity and what unites them.',
          sections: [
            {
              id: 'expl-p4-m3-s1',
              title: 'Varieties of Christianity',
              lessons: [
                {
                  id: 'expl-p4-m3-s1-l1',
                  title: 'The Major Branches',
                  description:
                    'Catholic, Orthodox, Protestant: what unites and divides them',
                },
                {
                  id: 'expl-p4-m3-s1-l2',
                  title: 'Protestant Denominations',
                  description:
                    'Baptist, Methodist, Presbyterian, Pentecostal, and others',
                },
                {
                  id: 'expl-p4-m3-s1-l3',
                  title: 'Evangelical Christianity',
                  description:
                    'What it means and what it emphasizes',
                },
                {
                  id: 'expl-p4-m3-s1-l4',
                  title: 'Progressive Christianity',
                  description:
                    'Liberal approaches to the faith',
                },
                {
                  id: 'expl-p4-m3-s1-l5',
                  title: 'Global Christianity',
                  description:
                    'The church in Africa, Asia, Latin America, and beyond',
                },
                {
                  id: 'expl-p4-m3-s1-l6',
                  title: 'What All Christians Agree On',
                  description:
                    'The core that unites despite differences',
                },
                {
                  id: 'expl-p4-m3-s1-l7',
                  title: 'Navigating Differences',
                  description:
                    'How to understand diverse Christian perspectives',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'If you have been investigating the foundations, the Bible, and the person of Jesus, you may be wondering: what do Christians actually believe, and why? This phase walks you through the core doctrines of Christianity — God, the Trinity, creation, sin, salvation, the Holy Spirit, the church, and the future — without assuming you accept any of them. You will then go deeper into theological concepts like grace, faith, repentance, justification, and the difficult doctrines of heaven and hell, exploring what each term means and why it matters to those who hold it. Finally, you will survey the rich diversity within Christianity itself: Catholic, Orthodox, Protestant, Evangelical, Progressive, and the rapidly growing global church. Understanding this diversity is essential because Christianity is not a monolith. By the end of this phase you will have a clear, honest map of what Christians believe and where they disagree — equipping you to evaluate the faith on its strongest terms.',
        expectations: [
          'Understand the core doctrines that define Christianity across traditions',
          'Explore deeper theological concepts like grace, justification, and sanctification',
          'Engage honestly with difficult doctrines such as hell and divine judgment',
          'Survey the major branches and denominations of Christianity',
          'Recognize what unites all Christians despite their significant differences',
          'Gain vocabulary and frameworks for evaluating Christian claims on their own terms',
        ],
        skillLevel: 'All Levels',
        faq: [
          {
            question: 'Do I need to accept these beliefs to study them?',
            answer:
              'Not at all. Understanding a belief system and agreeing with it are two different things. This phase aims to give you an accurate, fair-minded account of what Christians actually believe so you can make your own assessment.',
          },
          {
            question: 'How much time should I plan for this phase?',
            answer:
              'There are three substantial modules with about 25 lessons total. At 15 to 30 minutes per lesson, you could finish in a few weeks of regular study, though many people prefer to take longer with the more conceptually dense material.',
          },
          {
            question: 'What if some of these doctrines seem unreasonable or off-putting?',
            answer:
              'That is a perfectly valid response, and the curriculum does not shy away from it. Many Christians themselves wrestle with doctrines like hell, the Trinity, or substitutionary atonement. Your discomfort is part of the honest exploration process.',
          },
          {
            question: 'Should I complete the earlier phases before this one?',
            answer:
              'Phases 1 through 3 provide helpful context — especially the biblical narrative and the investigation of Jesus — but you can enter here if Christian doctrine is your primary area of curiosity. The phases are designed to build on each other, yet each one can also stand alone.',
          },
        ],
      },
    },

    // ========================================================
    // Phase 5: Examining the Evidence
    // ========================================================
    {
      id: 'expl-p5',
      title: 'Examining the Evidence',
      description:
        'Weigh the evidence for and against Christianity and learn how to navigate doubt honestly.',
      modules: [
        {
          id: 'expl-p5-m1',
          title: 'The Case for Christianity',
          description:
            'Explore the philosophical, historical, and experiential arguments that support the truth claims of Christianity.',
          sections: [
            {
              id: 'expl-p5-m1-s1',
              title: 'The Case for Christianity',
              lessons: [
                {
                  id: 'expl-p5-m1-s1-l1',
                  title: 'The Existence of God',
                  description:
                    'Philosophical arguments revisited',
                },
                {
                  id: 'expl-p5-m1-s1-l2',
                  title: 'The Fine-Tuning of the Universe',
                  description:
                    'Design and the anthropic principle',
                },
                {
                  id: 'expl-p5-m1-s1-l3',
                  title: 'The Origin of Life',
                  description:
                    'Complexity and the limits of naturalism',
                },
                {
                  id: 'expl-p5-m1-s1-l4',
                  title: 'The Reliability of the New Testament',
                  description:
                    'Manuscript evidence and historical accuracy',
                },
                {
                  id: 'expl-p5-m1-s1-l5',
                  title: 'The Resurrection of Jesus',
                  description: 'Historical evidence examined',
                },
                {
                  id: 'expl-p5-m1-s1-l6',
                  title: 'The Transformation of the Disciples',
                  description: 'From cowards to martyrs',
                },
                {
                  id: 'expl-p5-m1-s1-l7',
                  title: 'The Spread of Christianity',
                  description:
                    'How an unlikely movement conquered the Roman Empire',
                },
                {
                  id: 'expl-p5-m1-s1-l8',
                  title: 'Changed Lives',
                  description:
                    'Personal transformation as evidence',
                },
                {
                  id: 'expl-p5-m1-s1-l9',
                  title: 'The Persistence of Faith',
                  description:
                    'Why Christianity hasn\'t disappeared',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p5-m2',
          title: 'The Case Against Christianity',
          description:
            'Honestly confront the strongest objections and criticisms raised against Christianity.',
          sections: [
            {
              id: 'expl-p5-m2-s1',
              title: 'The Case Against Christianity',
              lessons: [
                {
                  id: 'expl-p5-m2-s1-l1',
                  title: 'The Problem of Evil',
                  description:
                    'Why would a good God allow suffering?',
                },
                {
                  id: 'expl-p5-m2-s1-l2',
                  title: 'The Problem of Divine Hiddenness',
                  description:
                    'Why doesn\'t God make himself more obvious?',
                },
                {
                  id: 'expl-p5-m2-s1-l3',
                  title: 'Science and Faith',
                  description: 'Are they in conflict?',
                },
                {
                  id: 'expl-p5-m2-s1-l4',
                  title: 'Evolution and Creation',
                  description:
                    'Different Christian views and the debate',
                },
                {
                  id: 'expl-p5-m2-s1-l5',
                  title: 'Violence in the Bible',
                  description:
                    'Genocide, slavery, and troubling texts',
                },
                {
                  id: 'expl-p5-m2-s1-l6',
                  title: 'Violence in Church History',
                  description:
                    'Crusades, inquisitions, and religious wars',
                },
                {
                  id: 'expl-p5-m2-s1-l7',
                  title: 'Hypocrisy of Christians',
                  description:
                    'When believers fail to live up to their beliefs',
                },
                {
                  id: 'expl-p5-m2-s1-l8',
                  title: 'Religious Pluralism',
                  description:
                    'Are all religions equally valid paths to God?',
                },
                {
                  id: 'expl-p5-m2-s1-l9',
                  title: 'Biblical Criticism',
                  description:
                    'Scholarly challenges to traditional views',
                },
                {
                  id: 'expl-p5-m2-s1-l10',
                  title: 'Miracles and the Modern Mind',
                  description:
                    'Can we believe in the supernatural?',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p5-m3',
          title: 'Wrestling with Doubt',
          description:
            'Learn to navigate doubt constructively, understanding the roles of evidence, experience, and community in forming beliefs.',
          sections: [
            {
              id: 'expl-p5-m3-s1',
              title: 'Wrestling with Doubt',
              lessons: [
                {
                  id: 'expl-p5-m3-s1-l1',
                  title: 'Doubt Is Not the Enemy',
                  description:
                    'Honest questions as part of the journey',
                },
                {
                  id: 'expl-p5-m3-s1-l2',
                  title: 'Faith and Certainty',
                  description:
                    'What kind of confidence can we have?',
                },
                {
                  id: 'expl-p5-m3-s1-l3',
                  title: 'Living with Unanswered Questions',
                  description:
                    'Mystery and the limits of human understanding',
                },
                {
                  id: 'expl-p5-m3-s1-l4',
                  title: 'The Role of Evidence',
                  description:
                    'What can be proven and what must be trusted',
                },
                {
                  id: 'expl-p5-m3-s1-l5',
                  title: 'The Role of Experience',
                  description:
                    'Personal encounters and their validity',
                },
                {
                  id: 'expl-p5-m3-s1-l6',
                  title: 'The Role of Community',
                  description:
                    'How others influence our beliefs',
                },
                {
                  id: 'expl-p5-m3-s1-l7',
                  title: 'Making a Decision',
                  description:
                    'How to move from investigating to committing (or not)',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'At some point every honest seeker must weigh the evidence — and that means looking at both sides of the ledger with equal rigor. This phase first builds the strongest case for Christianity: the fine-tuning of the universe, the reliability of the New Testament, the historical evidence for the resurrection, the transformation of the early disciples, and the enduring impact of the faith across two millennia. Then it turns around and presents the strongest case against Christianity with the same intellectual honesty: the problem of evil, divine hiddenness, the tension between science and faith, violence in the Bible and in church history, religious pluralism, and the hypocrisy of believers. Finally, you will learn how to wrestle with doubt constructively — understanding the roles that evidence, personal experience, and community each play in shaping belief. The goal is not to tip the scales in either direction but to give you the clearest possible picture so you can make a decision that is genuinely your own.',
        expectations: [
          'Evaluate the philosophical, historical, and experiential case for Christianity',
          'Confront the strongest objections and criticisms with intellectual honesty',
          'Understand how evidence, experience, and community each shape belief',
          'Learn to navigate doubt as a constructive part of the search for truth',
          'Develop a personal framework for weighing competing claims',
        ],
        skillLevel: 'All Levels',
        faq: [
          {
            question: 'Does this phase try to convince me that Christianity is true?',
            answer:
              'No. It presents the strongest arguments on both sides and gives you tools for evaluating them. You will encounter persuasive points for and against Christianity, and the phase respects your ability to draw your own conclusions.',
          },
          {
            question: 'How much time should I set aside for this phase?',
            answer:
              'This is one of the larger phases, with about 26 lessons across three modules. At 15 to 30 minutes per lesson, plan for several weeks. The material rewards thoughtful reflection, so do not feel pressured to rush.',
          },
          {
            question: 'What if I still feel uncertain after examining the evidence?',
            answer:
              'Uncertainty is a perfectly reasonable outcome. The module on Wrestling with Doubt is designed precisely for that situation. Faith, skepticism, and continued seeking are all treated as legitimate responses to the evidence.',
          },
          {
            question: 'How does this phase connect to the phases on Jesus and Christian belief?',
            answer:
              'Phases 3 and 4 focus on specific content — who Jesus was and what Christians believe. Phase 5 steps back and asks the broader question: is any of this actually true? It synthesizes material from the earlier phases and adds new arguments you have not yet encountered.',
          },
        ],
      },
    },

    // ========================================================
    // Phase 6: The Christian Life Examined
    // ========================================================
    {
      id: 'expl-p6',
      title: 'The Christian Life Examined',
      description:
        'Discover what Christians actually do, how they make ethical decisions, and what Christian community looks like in practice.',
      modules: [
        {
          id: 'expl-p6-m1',
          title: 'What Christians Actually Do',
          description:
            'Learn about the practices, rituals, and rhythms that define the Christian life.',
          sections: [
            {
              id: 'expl-p6-m1-s1',
              title: 'What Christians Actually Do',
              lessons: [
                {
                  id: 'expl-p6-m1-s1-l1',
                  title: 'Worship',
                  description:
                    'What it is and why Christians do it',
                },
                {
                  id: 'expl-p6-m1-s1-l2',
                  title: 'Prayer',
                  description:
                    'Talking to God: does it work?',
                },
                {
                  id: 'expl-p6-m1-s1-l3',
                  title: 'Reading the Bible',
                  description:
                    'How and why Christians engage Scripture',
                },
                {
                  id: 'expl-p6-m1-s1-l4',
                  title: 'Church Attendance',
                  description:
                    'Why Christians gather and what happens when they do',
                },
                {
                  id: 'expl-p6-m1-s1-l5',
                  title: 'Communion and Baptism',
                  description: 'The rituals explained',
                },
                {
                  id: 'expl-p6-m1-s1-l6',
                  title: 'Giving and Generosity',
                  description:
                    'Why Christians share their resources',
                },
                {
                  id: 'expl-p6-m1-s1-l7',
                  title: 'Service and Compassion',
                  description:
                    'Faith expressed through action',
                },
                {
                  id: 'expl-p6-m1-s1-l8',
                  title: 'Evangelism',
                  description:
                    'Why Christians share their faith (and why it can be off-putting)',
                },
                {
                  id: 'expl-p6-m1-s1-l9',
                  title: 'Christian Holidays',
                  description:
                    'Christmas, Easter, and the church calendar',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p6-m2',
          title: 'Christian Ethics',
          description:
            'Explore how Christians approach moral questions, from love and justice to politics and the environment.',
          sections: [
            {
              id: 'expl-p6-m2-s1',
              title: 'Christian Ethics',
              lessons: [
                {
                  id: 'expl-p6-m2-s1-l1',
                  title: 'How Christians Make Moral Decisions',
                  description:
                    'Sources of authority and reasoning',
                },
                {
                  id: 'expl-p6-m2-s1-l2',
                  title: 'Love as the Center',
                  description: 'The greatest commandment',
                },
                {
                  id: 'expl-p6-m2-s1-l3',
                  title: 'The Sermon on the Mount',
                  description:
                    'Jesus\' radical ethical teaching',
                },
                {
                  id: 'expl-p6-m2-s1-l4',
                  title: 'Christian Sexual Ethics',
                  description:
                    'What the Bible says and why it\'s controversial',
                },
                {
                  id: 'expl-p6-m2-s1-l5',
                  title: 'Christian Political Engagement',
                  description: 'Faith in the public square',
                },
                {
                  id: 'expl-p6-m2-s1-l6',
                  title: 'Christian Views on Money',
                  description:
                    'Generosity, contentment, and justice',
                },
                {
                  id: 'expl-p6-m2-s1-l7',
                  title: 'Christian Views on Work',
                  description:
                    'Vocation and meaning in daily labor',
                },
                {
                  id: 'expl-p6-m2-s1-l8',
                  title: 'Christian Views on Justice',
                  description:
                    'Caring for the poor and oppressed',
                },
                {
                  id: 'expl-p6-m2-s1-l9',
                  title: 'Christian Views on War and Peace',
                  description:
                    'Pacifism, just war, and debate',
                },
                {
                  id: 'expl-p6-m2-s1-l10',
                  title: 'Christian Views on the Environment',
                  description: 'Stewardship of creation',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p6-m3',
          title: 'Christian Community',
          description:
            'Understand what the church is, why community matters, and what to expect if you decide to explore one.',
          sections: [
            {
              id: 'expl-p6-m3-s1',
              title: 'Christian Community',
              lessons: [
                {
                  id: 'expl-p6-m3-s1-l1',
                  title: 'What Is the Church?',
                  description:
                    'More than a building: a people',
                },
                {
                  id: 'expl-p6-m3-s1-l2',
                  title: 'Why Community Matters',
                  description:
                    'Individualism vs. belonging',
                },
                {
                  id: 'expl-p6-m3-s1-l3',
                  title: 'The Good, the Bad, and the Ugly',
                  description:
                    'Honest look at church culture',
                },
                {
                  id: 'expl-p6-m3-s1-l4',
                  title: 'Finding a Church',
                  description:
                    'What to look for if you decide to explore',
                },
                {
                  id: 'expl-p6-m3-s1-l5',
                  title: 'What to Expect When Visiting',
                  description:
                    'Demystifying the Sunday experience',
                },
                {
                  id: 'expl-p6-m3-s1-l6',
                  title: 'Cults and Unhealthy Groups',
                  description:
                    'Warning signs and how to recognize them',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'Beliefs are one thing; practices are another. Even if you are not yet sure what you think about Christianity\'s truth claims, you may be curious about what Christians actually do and why. This phase offers an honest, ground-level tour of the Christian life. You will explore the everyday practices — worship, prayer, Bible reading, church attendance, communion, baptism, generosity, and service — and learn what each one means to the people who do it. You will then examine Christian ethics: how believers approach moral questions about love, sex, money, work, justice, war, and the environment. Finally, you will look at Christian community itself — what the church is, why it matters, what can go wrong, and how to find a healthy one if you decide to visit. The tone here is descriptive and candid rather than prescriptive. You are observing a way of life so you can decide whether it holds any appeal or credibility.',
        expectations: [
          'Understand the core practices that define everyday Christian life',
          'Explore how Christians approach moral and ethical decisions',
          'Learn what to expect if you visit a church for the first time',
          'Examine the strengths, weaknesses, and failures of Christian community honestly',
          'Recognize warning signs of unhealthy or manipulative religious groups',
          'Gain a practical picture of what it would actually look like to follow Jesus',
        ],
        skillLevel: 'All Levels',
        faq: [
          {
            question: 'Do I have to participate in any of these practices?',
            answer:
              'No. This phase is purely observational. You are learning about what Christians do and why, not being asked to do any of it yourself. If you later choose to experiment with any practice, Phase 8 provides guidance for that.',
          },
          {
            question: 'How long does this phase take?',
            answer:
              'With three modules and roughly 25 lessons, most learners spend a few weeks here at a comfortable pace. The lessons on ethics and community can spark a lot of personal reflection, so allow extra time if those topics resonate with you.',
          },
          {
            question: 'What if Christian ethical positions bother me?',
            answer:
              'Many of them bother many people — including many Christians. The curriculum presents these positions honestly and acknowledges the controversy around issues like sexuality, politics, and war. Your disagreement is a valid and important part of your exploration.',
          },
          {
            question: 'How does this phase relate to the evidence-focused earlier phases?',
            answer:
              'The earlier phases ask "Is Christianity true?" This phase asks "What does Christianity look like in practice?" Both questions matter. Some people find that seeing the faith lived out — for better and for worse — is just as important as evaluating its intellectual claims.',
          },
        ],
      },
    },

    // ========================================================
    // Phase 7: Obstacles and Objections
    // ========================================================
    {
      id: 'expl-p7',
      title: 'Obstacles and Objections',
      description:
        'Address the intellectual, emotional, and social obstacles that can stand in the way of honest exploration of faith.',
      modules: [
        {
          id: 'expl-p7-m1',
          title: 'Intellectual Obstacles',
          description:
            'Tackle the intellectual challenges people face when considering Christianity, from science to history to social issues.',
          sections: [
            {
              id: 'expl-p7-m1-s1',
              title: 'Intellectual Obstacles',
              lessons: [
                {
                  id: 'expl-p7-m1-s1-l1',
                  title: 'Science vs. Religion',
                  description: 'Must we choose?',
                },
                {
                  id: 'expl-p7-m1-s1-l2',
                  title: 'Evolution and Christianity',
                  description:
                    'Theistic evolution, intelligent design, creationism',
                },
                {
                  id: 'expl-p7-m1-s1-l3',
                  title: 'The Age of the Universe',
                  description:
                    'Young earth, old earth, and why it matters',
                },
                {
                  id: 'expl-p7-m1-s1-l4',
                  title: 'Miracles in a Scientific Age',
                  description: 'Can the supernatural happen?',
                },
                {
                  id: 'expl-p7-m1-s1-l5',
                  title: 'Biblical Contradictions',
                  description:
                    'Are there errors in the Bible?',
                },
                {
                  id: 'expl-p7-m1-s1-l6',
                  title: 'Which Bible Is Right?',
                  description:
                    'Translations, versions, and the canon',
                },
                {
                  id: 'expl-p7-m1-s1-l7',
                  title: 'The Crusades, Inquisition, and Religious Violence',
                  description: 'Christianity\'s dark history',
                },
                {
                  id: 'expl-p7-m1-s1-l8',
                  title: 'Slavery and the Bible',
                  description:
                    'How Christians have both defended and opposed it',
                },
                {
                  id: 'expl-p7-m1-s1-l9',
                  title: 'Colonialism and Missions',
                  description:
                    'The complicated legacy of spreading the faith',
                },
                {
                  id: 'expl-p7-m1-s1-l10',
                  title: 'Christianity and Women',
                  description: 'Oppression or liberation?',
                },
                {
                  id: 'expl-p7-m1-s1-l11',
                  title: 'Christianity and LGBTQ+ Issues',
                  description: 'The ongoing controversy',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p7-m2',
          title: 'Emotional Obstacles',
          description:
            'Process the emotional barriers to faith, including past hurt, fear, pride, and anger.',
          sections: [
            {
              id: 'expl-p7-m2-s1',
              title: 'Emotional Obstacles',
              lessons: [
                {
                  id: 'expl-p7-m2-s1-l1',
                  title: 'Hurt by Christians',
                  description: 'When believers cause pain',
                },
                {
                  id: 'expl-p7-m2-s1-l2',
                  title: 'Hurt by the Church',
                  description:
                    'Institutional failures and abuse',
                },
                {
                  id: 'expl-p7-m2-s1-l3',
                  title: 'Religious Trauma',
                  description:
                    'Healing from harmful religious experiences',
                },
                {
                  id: 'expl-p7-m2-s1-l4',
                  title: 'Fear of What You Might Lose',
                  description:
                    'Relationships, identity, and lifestyle',
                },
                {
                  id: 'expl-p7-m2-s1-l5',
                  title: 'Fear of What You Might Have to Believe',
                  description:
                    'Doctrines that seem unacceptable',
                },
                {
                  id: 'expl-p7-m2-s1-l6',
                  title: 'Fear of Being Wrong',
                  description:
                    'The stakes of spiritual commitment',
                },
                {
                  id: 'expl-p7-m2-s1-l7',
                  title: 'Pride and Intellectual Resistance',
                  description:
                    'Not wanting to submit to anything',
                },
                {
                  id: 'expl-p7-m2-s1-l8',
                  title: 'Anger at God',
                  description:
                    'Wrestling with a deity who may have let you down',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p7-m3',
          title: 'Social and Cultural Obstacles',
          description:
            'Navigate the social pressures, cultural perceptions, and political associations that complicate the exploration of faith.',
          sections: [
            {
              id: 'expl-p7-m3-s1',
              title: 'Social and Cultural Obstacles',
              lessons: [
                {
                  id: 'expl-p7-m3-s1-l1',
                  title: 'What Will People Think?',
                  description:
                    'Social pressure and fear of judgment',
                },
                {
                  id: 'expl-p7-m3-s1-l2',
                  title: 'Losing Friends or Family',
                  description:
                    'When faith creates relational tension',
                },
                {
                  id: 'expl-p7-m3-s1-l3',
                  title: 'Political Associations',
                  description:
                    'Is Christianity inherently conservative?',
                },
                {
                  id: 'expl-p7-m3-s1-l4',
                  title: 'Anti-Intellectualism',
                  description:
                    'The perception that faith requires ignorance',
                },
                {
                  id: 'expl-p7-m3-s1-l5',
                  title: 'Scandals and Hypocrisy',
                  description:
                    'When Christian leaders fail spectacularly',
                },
                {
                  id: 'expl-p7-m3-s1-l6',
                  title: 'Christianity and Privilege',
                  description:
                    'The critique from social justice perspectives',
                },
                {
                  id: 'expl-p7-m3-s1-l7',
                  title: 'Christianity in a Pluralistic World',
                  description:
                    'Is exclusive truth arrogant?',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'Honest exploration often stalls — not because the evidence is lacking but because something else stands in the way. This phase names those obstacles directly. You will tackle the intellectual barriers first: the tension between science and religion, evolution and the age of the universe, biblical contradictions, and the troubling history of the Crusades, slavery, colonialism, and the treatment of women and LGBTQ+ people. Then you will move to the emotional barriers that can be even harder to address: hurt caused by Christians or churches, religious trauma, fear of what you might lose or have to believe, intellectual pride, and anger at a God who may have let you down. Finally, you will confront the social and cultural obstacles — fear of judgment, losing relationships, political associations, scandals, and the charge that exclusive truth claims are inherently arrogant. By bringing these obstacles into the open rather than ignoring them, this phase gives you the freedom to process what is genuinely blocking you and decide how to move forward.',
        expectations: [
          'Confront the major intellectual objections to Christianity with rigor and honesty',
          'Process emotional barriers including past hurt, trauma, and fear',
          'Navigate social pressures and cultural perceptions that complicate exploration',
          'Understand how Christianity has historically engaged with science, justice, and diversity',
          'Develop the self-awareness to distinguish between evidence-based objections and emotional resistance',
          'Gain clarity on what is genuinely blocking your exploration and how to address it',
        ],
        skillLevel: 'All Levels',
        faq: [
          {
            question: 'Is this phase going to dismiss my objections?',
            answer:
              'No. This phase takes every obstacle seriously — intellectual, emotional, and social. The goal is not to argue you out of your objections but to help you understand them more clearly so you can decide which ones are deal-breakers and which ones deserve further investigation.',
          },
          {
            question: 'How much time should I plan for?',
            answer:
              'There are three modules with about 26 lessons. Some lessons, especially those dealing with emotional obstacles and religious trauma, may require more time for personal reflection. Move at whatever pace feels safe and honest.',
          },
          {
            question: 'What if I have been genuinely hurt by the church or by Christians?',
            answer:
              'This phase devotes several lessons specifically to that experience. It does not minimize your pain or ask you to forgive prematurely. Religious trauma is real, and honest healing requires acknowledgment, not dismissal.',
          },
          {
            question: 'Can I skip this phase if I do not feel like I have obstacles?',
            answer:
              'You can, but many people find that obstacles they were not fully aware of surface during this phase. Even if you feel intellectually satisfied, the modules on emotional and social barriers can reveal hidden factors influencing your exploration.',
          },
        ],
      },
    },

    // ========================================================
    // Phase 8: Personal Exploration
    // ========================================================
    {
      id: 'expl-p8',
      title: 'Personal Exploration',
      description:
        'Move from study to experience through visiting churches, spiritual experiments, and ultimately making a personal decision.',
      modules: [
        {
          id: 'expl-p8-m1',
          title: 'Experiential Exploration',
          description:
            'Engage with Christianity through direct experience: visiting churches, talking to believers and former believers, and participating in community.',
          sections: [
            {
              id: 'expl-p8-m1-s1',
              title: 'Experiential Exploration',
              lessons: [
                {
                  id: 'expl-p8-m1-s1-l1',
                  title: 'Visiting a Church',
                  description:
                    'What to expect and how to process the experience',
                },
                {
                  id: 'expl-p8-m1-s1-l2',
                  title: 'Attending Different Traditions',
                  description:
                    'Catholic Mass, Orthodox liturgy, Protestant worship, Pentecostal service',
                },
                {
                  id: 'expl-p8-m1-s1-l3',
                  title: 'Talking to Believers',
                  description:
                    'Asking questions of thoughtful Christians',
                },
                {
                  id: 'expl-p8-m1-s1-l4',
                  title: 'Talking to Former Believers',
                  description: 'Hearing from those who left',
                },
                {
                  id: 'expl-p8-m1-s1-l5',
                  title: 'Reading Christian Classics',
                  description:
                    'Engaging great Christian thinkers',
                },
                {
                  id: 'expl-p8-m1-s1-l6',
                  title: 'Reading Christian Critics',
                  description:
                    'Engaging thoughtful atheists and skeptics',
                },
                {
                  id: 'expl-p8-m1-s1-l7',
                  title: 'Observing Christian Community',
                  description: 'How believers live together',
                },
                {
                  id: 'expl-p8-m1-s1-l8',
                  title: 'Serving with Christians',
                  description:
                    'Participating in compassion ministries',
                },
                {
                  id: 'expl-p8-m1-s1-l9',
                  title: 'Attending an Alpha Course',
                  description:
                    'A popular exploration program',
                },
                {
                  id: 'expl-p8-m1-s1-l10',
                  title: 'Going on a Retreat',
                  description:
                    'Extended time for reflection and discussion',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p8-m2',
          title: 'Spiritual Experiments',
          description:
            'Try spiritual practices firsthand, from prayer and Bible reading to silence, fasting, and journaling.',
          sections: [
            {
              id: 'expl-p8-m2-s1',
              title: 'Spiritual Experiments',
              lessons: [
                {
                  id: 'expl-p8-m2-s1-l1',
                  title: 'Trying Prayer',
                  description:
                    'What happens if you talk to God?',
                },
                {
                  id: 'expl-p8-m2-s1-l2',
                  title: 'Reading the Bible Devotionally',
                  description:
                    'Approaching Scripture with openness',
                },
                {
                  id: 'expl-p8-m2-s1-l3',
                  title: 'Practicing Silence and Solitude',
                  description:
                    'Creating space for reflection',
                },
                {
                  id: 'expl-p8-m2-s1-l4',
                  title: 'Exploring Worship',
                  description:
                    'Engaging with music, liturgy, and praise',
                },
                {
                  id: 'expl-p8-m2-s1-l5',
                  title: 'Fasting',
                  description:
                    'Ancient practice, modern application',
                },
                {
                  id: 'expl-p8-m2-s1-l6',
                  title: 'Journaling Your Journey',
                  description:
                    'Documenting questions, insights, and changes',
                },
                {
                  id: 'expl-p8-m2-s1-l7',
                  title: 'The "Seeker\'s Prayer"',
                  description:
                    'Asking God to reveal himself if he exists',
                },
                {
                  id: 'expl-p8-m2-s1-l8',
                  title: 'Openness to Experience',
                  description:
                    'Paying attention to potential divine moments',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p8-m3',
          title: 'Making a Decision',
          description:
            'Reflect on the journey so far and consider what it would mean to believe, not believe, or continue seeking.',
          sections: [
            {
              id: 'expl-p8-m3-s1',
              title: 'Making a Decision',
              lessons: [
                {
                  id: 'expl-p8-m3-s1-l1',
                  title: 'What Would It Mean to Believe?',
                  description: 'Counting the cost',
                },
                {
                  id: 'expl-p8-m3-s1-l2',
                  title: 'What Would It Mean Not to Believe?',
                  description: 'Also counting the cost',
                },
                {
                  id: 'expl-p8-m3-s1-l3',
                  title: 'The Leap of Faith',
                  description:
                    'Is commitment possible without certainty?',
                },
                {
                  id: 'expl-p8-m3-s1-l4',
                  title: 'Becoming a Christian',
                  description:
                    'What the Bible says about starting the journey',
                },
                {
                  id: 'expl-p8-m3-s1-l5',
                  title: 'Next Steps After Belief',
                  description:
                    'What happens if you say yes',
                },
                {
                  id: 'expl-p8-m3-s1-l6',
                  title: 'Remaining a Seeker',
                  description:
                    'What if you\'re not ready to decide',
                },
                {
                  id: 'expl-p8-m3-s1-l7',
                  title: 'Rejecting Christianity',
                  description:
                    'What if you conclude it\'s not true?',
                },
                {
                  id: 'expl-p8-m3-s1-l8',
                  title: 'The Ongoing Journey',
                  description:
                    'Faith as a process, not just a moment',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'Up to this point the curriculum has been largely intellectual — reading, analyzing, and evaluating ideas. This phase invites you to move from study to experience. You will explore Christianity firsthand by visiting different church traditions, talking to thoughtful believers and former believers, reading both Christian classics and their sharpest critics, and participating in community service. Then you will try a set of spiritual experiments: prayer, devotional Bible reading, silence, fasting, worship, and journaling. These are not commitments — they are experiments you can try with full intellectual honesty and set aside if they do not resonate. Finally, the curriculum brings you to the moment of decision. What would it mean to believe? What would it mean not to? Is commitment possible without certainty? You will consider what the Bible says about becoming a Christian, what happens next if you say yes, and what it looks like to remain a seeker or to walk away entirely. Whatever you decide, this phase honors the seriousness of the choice.',
        expectations: [
          'Experience Christianity firsthand through church visits and conversations',
          'Try spiritual practices like prayer, silence, and journaling as honest experiments',
          'Engage with both Christian thinkers and thoughtful skeptics',
          'Reflect on what belief or disbelief would concretely mean for your life',
          'Reach a point of personal clarity — whether that means faith, continued seeking, or walking away',
        ],
        skillLevel: 'All Levels',
        faq: [
          {
            question: 'Will I be pressured to make a decision?',
            answer:
              'No. The decision module presents believing, continuing to seek, and rejecting Christianity as equally legitimate outcomes. The phase respects that some people need more time, and that an honest "no" is better than a forced "yes."',
          },
          {
            question: 'How much time should I expect to spend on this phase?',
            answer:
              'This phase is more experiential than the others, so timing depends on how many activities you choose to try. The spiritual experiments and church visits may unfold over several weeks or even months. Take the time you need.',
          },
          {
            question: 'What if the spiritual experiments feel awkward or meaningless?',
            answer:
              'That is completely normal and does not mean anything has gone wrong. Many people feel self-conscious praying for the first time or attending an unfamiliar worship service. The curriculum encourages you to notice your reactions honestly without forcing any particular outcome.',
          },
          {
            question: 'What happens after this phase?',
            answer:
              'Phase 9 offers Guided Exploration Tracks — curated pathways tailored to different types of seekers. If you decide to embrace the faith, you may also transition into other curricula focused on growing as a new believer.',
          },
        ],
      },
    },

    // ========================================================
    // Phase 9: Guided Exploration Tracks
    // ========================================================
    {
      id: 'expl-p9',
      title: 'Guided Exploration Tracks',
      description:
        'Curated pathways through the curriculum tailored to different types of seekers, from the intellectual to the experiential to the culturally minded.',
      modules: [
        {
          id: 'expl-p9-m1',
          title: 'Track A: The Intellectual Seeker',
          description:
            'For those who need to think their way toward (or away from) faith.',
          sections: [
            {
              id: 'expl-p9-m1-s1',
              title: 'Track A: The Intellectual Seeker',
              lessons: [
                {
                  id: 'expl-p9-m1-s1-l1',
                  title: 'Does God Exist?',
                  description:
                    'Arguments for and against, and what\'s at stake',
                },
                {
                  id: 'expl-p9-m1-s1-l2',
                  title: 'Worldviews 101',
                  description:
                    'How everyone operates from a set of assumptions about reality',
                },
                {
                  id: 'expl-p9-m1-s1-l3',
                  title: 'The Reliability of the New Testament',
                  description:
                    'Manuscript evidence and historical accuracy',
                },
                {
                  id: 'expl-p9-m1-s1-l4',
                  title: 'Did Jesus Exist?',
                  description:
                    'Historical evidence inside and outside the Bible',
                },
                {
                  id: 'expl-p9-m1-s1-l5',
                  title: 'The Resurrection of Jesus',
                  description: 'Historical evidence examined',
                },
                {
                  id: 'expl-p9-m1-s1-l6',
                  title: 'The Problem of Evil',
                  description:
                    'Why would a good God allow suffering?',
                },
                {
                  id: 'expl-p9-m1-s1-l7',
                  title: 'Science and Faith',
                  description: 'Are they in conflict?',
                },
                {
                  id: 'expl-p9-m1-s1-l8',
                  title: 'Making a Decision',
                  description:
                    'How to move from investigating to committing (or not)',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p9-m2',
          title: 'Track B: The Experiential Seeker',
          description:
            'For those who learn through experience and relationship.',
          sections: [
            {
              id: 'expl-p9-m2-s1',
              title: 'Track B: The Experiential Seeker',
              lessons: [
                {
                  id: 'expl-p9-m2-s1-l1',
                  title: 'Your Story So Far',
                  description:
                    'Reflecting on your own spiritual background and current beliefs',
                },
                {
                  id: 'expl-p9-m2-s1-l2',
                  title: 'Visiting a Church',
                  description:
                    'What to expect and how to process the experience',
                },
                {
                  id: 'expl-p9-m2-s1-l3',
                  title: 'The Gospel of Mark',
                  description:
                    'The fastest introduction to Jesus\' life and claims',
                },
                {
                  id: 'expl-p9-m2-s1-l4',
                  title: 'Talking to Believers',
                  description:
                    'Asking questions of thoughtful Christians',
                },
                {
                  id: 'expl-p9-m2-s1-l5',
                  title: 'Trying Prayer',
                  description:
                    'What happens if you talk to God?',
                },
                {
                  id: 'expl-p9-m2-s1-l6',
                  title: 'Christian Community',
                  description:
                    'Understanding what the church is and why community matters',
                },
                {
                  id: 'expl-p9-m2-s1-l7',
                  title: 'Serving with Christians',
                  description:
                    'Participating in compassion ministries',
                },
                {
                  id: 'expl-p9-m2-s1-l8',
                  title: 'Making a Decision',
                  description:
                    'How to move from investigating to committing (or not)',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p9-m3',
          title: 'Track C: The Wounded Seeker',
          description:
            'For those processing religious hurt or trauma.',
          sections: [
            {
              id: 'expl-p9-m3-s1',
              title: 'Track C: The Wounded Seeker',
              lessons: [
                {
                  id: 'expl-p9-m3-s1-l1',
                  title: 'Common Misconceptions About Christianity',
                  description:
                    'Clearing away caricatures to see what Christians actually claim',
                },
                {
                  id: 'expl-p9-m3-s1-l2',
                  title: 'Hurt by Christians',
                  description: 'When believers cause pain',
                },
                {
                  id: 'expl-p9-m3-s1-l3',
                  title: 'Religious Trauma',
                  description:
                    'Healing from harmful religious experiences',
                },
                {
                  id: 'expl-p9-m3-s1-l4',
                  title: 'The Good, the Bad, and the Ugly of Church',
                  description:
                    'Honest look at church culture',
                },
                {
                  id: 'expl-p9-m3-s1-l5',
                  title: 'What Jesus Actually Taught',
                  description:
                    'What he actually said and what it means',
                },
                {
                  id: 'expl-p9-m3-s1-l6',
                  title: 'Grace and Forgiveness',
                  description:
                    'Unearned favor, being pardoned, and pardoning others',
                },
                {
                  id: 'expl-p9-m3-s1-l7',
                  title: 'Finding Healthy Community',
                  description:
                    'What to look for if you decide to explore',
                },
                {
                  id: 'expl-p9-m3-s1-l8',
                  title: 'Making a Decision',
                  description:
                    'How to move from investigating to committing (or not)',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p9-m4',
          title: 'Track D: The Philosophical Seeker',
          description:
            'For those interested in deep questions and worldview analysis.',
          sections: [
            {
              id: 'expl-p9-m4-s1',
              title: 'Track D: The Philosophical Seeker',
              lessons: [
                {
                  id: 'expl-p9-m4-s1-l1',
                  title: 'The Big Questions',
                  description:
                    'Engaging the fundamental questions of existence, meaning, morality, and truth',
                },
                {
                  id: 'expl-p9-m4-s1-l2',
                  title: 'Comparing Worldviews',
                  description:
                    'Surveying the major worldviews and belief systems',
                },
                {
                  id: 'expl-p9-m4-s1-l3',
                  title: 'The Case for Christianity',
                  description:
                    'Philosophical, historical, and experiential arguments for the faith',
                },
                {
                  id: 'expl-p9-m4-s1-l4',
                  title: 'The Case Against Christianity',
                  description:
                    'The strongest objections and criticisms raised against Christianity',
                },
                {
                  id: 'expl-p9-m4-s1-l5',
                  title: 'Core Christian Doctrines',
                  description:
                    'The foundational beliefs that define Christianity',
                },
                {
                  id: 'expl-p9-m4-s1-l6',
                  title: 'Christian Ethics',
                  description:
                    'How Christians approach moral questions',
                },
                {
                  id: 'expl-p9-m4-s1-l7',
                  title: 'Faith and Certainty',
                  description:
                    'What kind of confidence can we have?',
                },
                {
                  id: 'expl-p9-m4-s1-l8',
                  title: 'Making a Decision',
                  description:
                    'How to move from investigating to committing (or not)',
                },
              ],
            },
          ],
        },
        {
          id: 'expl-p9-m5',
          title: 'Track E: The Cultural Seeker',
          description:
            'For those shaped by contemporary social and political concerns.',
          sections: [
            {
              id: 'expl-p9-m5-s1',
              title: 'Track E: The Cultural Seeker',
              lessons: [
                {
                  id: 'expl-p9-m5-s1-l1',
                  title: 'Christianity in the Landscape',
                  description:
                    'Where does it fit and what makes it distinct?',
                },
                {
                  id: 'expl-p9-m5-s1-l2',
                  title: 'Christianity and Politics',
                  description:
                    'Faith in the public square',
                },
                {
                  id: 'expl-p9-m5-s1-l3',
                  title: 'Christianity and Women',
                  description: 'Oppression or liberation?',
                },
                {
                  id: 'expl-p9-m5-s1-l4',
                  title: 'Christianity and LGBTQ+ Issues',
                  description: 'The ongoing controversy',
                },
                {
                  id: 'expl-p9-m5-s1-l5',
                  title: 'Christian Views on Justice',
                  description:
                    'Caring for the poor and oppressed',
                },
                {
                  id: 'expl-p9-m5-s1-l6',
                  title: 'Varieties of Christianity',
                  description:
                    'The major branches, denominations, and movements within Christianity',
                },
                {
                  id: 'expl-p9-m5-s1-l7',
                  title: 'Christianity in a Pluralistic World',
                  description:
                    'Is exclusive truth arrogant?',
                },
                {
                  id: 'expl-p9-m5-s1-l8',
                  title: 'Making a Decision',
                  description:
                    'How to move from investigating to committing (or not)',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'Not every seeker follows the same path, and this final phase acknowledges that by offering five curated tracks tailored to different starting points and temperaments. The Intellectual Seeker track prioritizes evidence, arguments, and logical reasoning. The Experiential Seeker track emphasizes firsthand encounters — visiting churches, talking to believers, and trying prayer. The Wounded Seeker track creates a safe space for those processing religious hurt or trauma to re-examine the faith at their own pace. The Philosophical Seeker track dives deep into worldview analysis, ethics, and the nature of certainty. And the Cultural Seeker track engages the social and political dimensions of Christianity that matter most in contemporary culture. Each track draws from lessons across the earlier phases, organized into a coherent eight-lesson journey that can be completed independently. Choose the track that matches where you are right now — or explore more than one.',
        expectations: [
          'Choose a curated track that matches your personality and primary questions',
          'Experience a focused eight-lesson journey through the curriculum\'s best material',
          'Engage with the specific angle — intellectual, experiential, emotional, philosophical, or cultural — that resonates most with you',
          'Arrive at a point of personal clarity and decision, whatever that decision may be',
        ],
        skillLevel: 'All Levels',
        faq: [
          {
            question: 'Do I need to complete all earlier phases before choosing a track?',
            answer:
              'No. The tracks are designed to work as standalone journeys. They draw from material across the curriculum, so you may encounter lessons you have already completed or ones that are new. Either way, the curated sequence provides a coherent path.',
          },
          {
            question: 'How long does a single track take?',
            answer:
              'Each track contains eight lessons, so at 15 to 30 minutes per lesson you could complete one in about two to four hours of total study time — or spread it out over a week or two at a relaxed pace.',
          },
          {
            question: 'Can I do more than one track?',
            answer:
              'Absolutely. Many people find that more than one track speaks to them. You might start with the Intellectual Seeker track and then move to the Experiential Seeker track to balance head and heart. There is no wrong way to use them.',
          },
          {
            question: 'What should I do after finishing a track?',
            answer:
              'That depends on where you land. If you want to go deeper, you can explore the full phases that your track drew from. If you have decided to pursue faith, other curricula in this platform are designed for new believers. And if you have decided Christianity is not for you, the curriculum respects that conclusion.',
          },
        ],
      },
    },
  ],
};
