import { Curriculum } from '@/types/curriculum';

export const pastoralLeadershipCurriculum: Curriculum = {
  id: 'pastoral-leadership',
  title: 'Pastoral Ministry & Leadership',
  description:
    'A comprehensive path for pastors, church planters, ministry directors, and Christian leaders — integrating biblical scholarship, theological depth, leadership development, and practical ministry skills.',
  personaIntro:
    'Welcome, pastor and ministry leader. This curriculum has been designed to equip you with the biblical foundation, theological depth, and practical skills you need to faithfully shepherd God\'s people and lead with confidence.',
  learningApproach:
    'This path integrates rigorous biblical and theological study with hands-on pastoral training, leadership development, and personal spiritual formation.',
  phases: [
    // =====================================================================
    // Phase 1: Biblical Foundation
    // =====================================================================
    {
      id: 'past-p1',
      title: 'Biblical Foundation',
      description:
        'A thorough study of the Old and New Testaments, biblical languages, and hermeneutics to establish the scriptural foundation for pastoral ministry.',
      modules: [
        // ----- Module 1: Old Testament Studies -----
        {
          id: 'past-p1-m1',
          title: 'Old Testament Studies',
          description:
            'A comprehensive survey of the Old Testament, covering the Pentateuch, Historical Books, Wisdom Literature, Prophetic Books, and Old Testament theology for preaching.',
          sections: [
            {
              id: 'past-p1-m1-s1',
              title: 'Pentateuch',
              lessons: [
                {
                  id: 'past-1-1-1-1',
                  title: 'Genesis',
                  description:
                    'Creation, fall, flood, patriarchs, and the foundations of redemptive history',
                },
                {
                  id: 'past-1-1-1-2',
                  title: 'Exodus',
                  description:
                    'Deliverance, covenant, law, and tabernacle',
                },
                {
                  id: 'past-1-1-1-3',
                  title: 'Leviticus',
                  description:
                    'Holiness, sacrifice, and priestly ministry',
                },
                {
                  id: 'past-1-1-1-4',
                  title: 'Numbers',
                  description:
                    'Wilderness journey, faithfulness, and failure',
                },
                {
                  id: 'past-1-1-1-5',
                  title: 'Deuteronomy',
                  description:
                    'Covenant renewal and Moses\' pastoral legacy',
                },
              ],
            },
            {
              id: 'past-p1-m1-s2',
              title: 'Historical Books',
              lessons: [
                {
                  id: 'past-1-1-2-1',
                  title: 'Joshua and Judges',
                  description:
                    'Conquest, compromise, and the cycle of sin',
                },
                {
                  id: 'past-1-1-2-2',
                  title: 'Ruth',
                  description:
                    'Providence, redemption, and the Davidic line',
                },
                {
                  id: 'past-1-1-2-3',
                  title: '1 & 2 Samuel',
                  description:
                    'Kingship, the heart of David, and leadership lessons',
                },
                {
                  id: 'past-1-1-2-4',
                  title: '1 & 2 Kings',
                  description:
                    'Divided kingdom, prophetic witness, and the consequences of unfaithfulness',
                },
                {
                  id: 'past-1-1-2-5',
                  title: '1 & 2 Chronicles',
                  description:
                    'Theological history and the importance of worship',
                },
                {
                  id: 'past-1-1-2-6',
                  title: 'Ezra-Nehemiah',
                  description:
                    'Restoration, reform, and rebuilding community',
                },
                {
                  id: 'past-1-1-2-7',
                  title: 'Esther',
                  description:
                    'Providence and courage in hostile environments',
                },
              ],
            },
            {
              id: 'past-p1-m1-s3',
              title: 'Wisdom Literature',
              lessons: [
                {
                  id: 'past-1-1-3-1',
                  title: 'Job',
                  description:
                    'Theodicy, suffering, and pastoral care in crisis',
                },
                {
                  id: 'past-1-1-3-2',
                  title: 'Psalms',
                  description:
                    'Worship, lament, praise, and the prayer life of God\'s people',
                },
                {
                  id: 'past-1-1-3-3',
                  title: 'Proverbs',
                  description:
                    'Wisdom for leadership and daily life',
                },
                {
                  id: 'past-1-1-3-4',
                  title: 'Ecclesiastes',
                  description:
                    'Meaning, vanity, and the fear of God',
                },
                {
                  id: 'past-1-1-3-5',
                  title: 'Song of Solomon',
                  description:
                    'Love, marriage, and human flourishing',
                },
              ],
            },
            {
              id: 'past-p1-m1-s4',
              title: 'Prophetic Books',
              lessons: [
                {
                  id: 'past-1-1-4-1',
                  title: 'Isaiah',
                  description:
                    'Judgment, comfort, the Servant, and messianic hope',
                },
                {
                  id: 'past-1-1-4-2',
                  title: 'Jeremiah',
                  description:
                    'Faithful ministry in declining times',
                },
                {
                  id: 'past-1-1-4-3',
                  title: 'Lamentations',
                  description:
                    'Grief, suffering, and the faithfulness of God',
                },
                {
                  id: 'past-1-1-4-4',
                  title: 'Ezekiel',
                  description:
                    'Visions, judgment, restoration, and God\'s glory',
                },
                {
                  id: 'past-1-1-4-5',
                  title: 'Daniel',
                  description:
                    'Faithfulness in exile and apocalyptic hope',
                },
                {
                  id: 'past-1-1-4-6',
                  title: 'Minor Prophets Survey',
                  description:
                    'Twelve voices calling God\'s people to repentance and hope',
                },
              ],
            },
            {
              id: 'past-p1-m1-s5',
              title: 'Old Testament Theology for Preaching',
              lessons: [
                {
                  id: 'past-1-1-5-1',
                  title: 'Biblical Theology of the Old Testament',
                  description: 'The storyline of Scripture',
                },
                {
                  id: 'past-1-1-5-2',
                  title: 'Preaching from the Old Testament',
                  description: 'Hermeneutics for proclamation',
                },
                {
                  id: 'past-1-1-5-3',
                  title: 'Christ in the Old Testament',
                  description:
                    'Typology, prophecy, and christocentric interpretation',
                },
                {
                  id: 'past-1-1-5-4',
                  title: 'Old Testament Ethics for Today',
                  description:
                    'Applying ancient texts to contemporary life',
                },
              ],
            },
          ],
        },

        // ----- Module 2: New Testament Studies -----
        {
          id: 'past-p1-m2',
          title: 'New Testament Studies',
          description:
            'A comprehensive survey of the New Testament, covering the Gospels, Acts, Pauline Epistles, General Epistles, Revelation, and New Testament theology for preaching.',
          sections: [
            {
              id: 'past-p1-m2-s1',
              title: 'The Gospels',
              lessons: [
                {
                  id: 'past-1-2-1-1',
                  title: 'Matthew',
                  description: 'The King and His kingdom',
                },
                {
                  id: 'past-1-2-1-2',
                  title: 'Mark',
                  description:
                    'The Servant and the way of discipleship',
                },
                {
                  id: 'past-1-2-1-3',
                  title: 'Luke',
                  description: 'The Savior for all people',
                },
                {
                  id: 'past-1-2-1-4',
                  title: 'John',
                  description: 'The Word made flesh',
                },
                {
                  id: 'past-1-2-1-5',
                  title: 'The Life and Teachings of Jesus',
                  description:
                    'Integrated study across all four Gospels',
                },
                {
                  id: 'past-1-2-1-6',
                  title: 'The Parables',
                  description: 'Interpretation and preaching',
                },
                {
                  id: 'past-1-2-1-7',
                  title: 'The Sermon on the Mount',
                  description:
                    'Kingdom ethics and pastoral application',
                },
              ],
            },
            {
              id: 'past-p1-m2-s2',
              title: 'Acts and the Early Church',
              lessons: [
                {
                  id: 'past-1-2-2-1',
                  title: 'Acts',
                  description:
                    'The Spirit, the church, and the mission',
                },
                {
                  id: 'past-1-2-2-2',
                  title: 'The Apostolic Church',
                  description:
                    'Patterns for contemporary ministry',
                },
                {
                  id: 'past-1-2-2-3',
                  title: 'Paul\'s Missionary Journeys',
                  description:
                    'Strategy, suffering, and church planting',
                },
              ],
            },
            {
              id: 'past-p1-m2-s3',
              title: 'Pauline Epistles',
              lessons: [
                {
                  id: 'past-1-2-3-1',
                  title: 'Romans',
                  description:
                    'The gospel systematically explained',
                },
                {
                  id: 'past-1-2-3-2',
                  title: '1 Corinthians',
                  description:
                    'Addressing church problems with apostolic wisdom',
                },
                {
                  id: 'past-1-2-3-3',
                  title: '2 Corinthians',
                  description:
                    'Ministry, suffering, and apostolic authority',
                },
                {
                  id: 'past-1-2-3-4',
                  title: 'Galatians',
                  description:
                    'The gospel defended against legalism',
                },
                {
                  id: 'past-1-2-3-5',
                  title: 'Ephesians',
                  description:
                    'The church in God\'s eternal plan',
                },
                {
                  id: 'past-1-2-3-6',
                  title: 'Philippians',
                  description:
                    'Joy, unity, and partnership in the gospel',
                },
                {
                  id: 'past-1-2-3-7',
                  title: 'Colossians',
                  description:
                    'The supremacy and sufficiency of Christ',
                },
                {
                  id: 'past-1-2-3-8',
                  title: '1 & 2 Thessalonians',
                  description:
                    'Eschatology and faithful living',
                },
                {
                  id: 'past-1-2-3-9',
                  title: '1 & 2 Timothy',
                  description:
                    'Pastoral leadership and sound doctrine',
                },
                {
                  id: 'past-1-2-3-10',
                  title: 'Titus',
                  description:
                    'Church order and godly living',
                },
                {
                  id: 'past-1-2-3-11',
                  title: 'Philemon',
                  description:
                    'Reconciliation and the gospel in relationships',
                },
              ],
            },
            {
              id: 'past-p1-m2-s4',
              title: 'General Epistles and Revelation',
              lessons: [
                {
                  id: 'past-1-2-4-1',
                  title: 'Hebrews',
                  description:
                    'Christ\'s superiority and pastoral warnings',
                },
                {
                  id: 'past-1-2-4-2',
                  title: 'James',
                  description:
                    'Practical faith and pastoral wisdom',
                },
                {
                  id: 'past-1-2-4-3',
                  title: '1 & 2 Peter',
                  description:
                    'Suffering, hope, and guarding against false teaching',
                },
                {
                  id: 'past-1-2-4-4',
                  title: '1, 2, 3 John',
                  description: 'Love, truth, and assurance',
                },
                {
                  id: 'past-1-2-4-5',
                  title: 'Jude',
                  description: 'Contending for the faith',
                },
                {
                  id: 'past-1-2-4-6',
                  title: 'Revelation',
                  description:
                    'Worship, witness, and the consummation of all things',
                },
              ],
            },
            {
              id: 'past-p1-m2-s5',
              title: 'New Testament Theology for Preaching',
              lessons: [
                {
                  id: 'past-1-2-5-1',
                  title: 'Biblical Theology of the New Testament',
                  description:
                    'Major themes and their integration',
                },
                {
                  id: 'past-1-2-5-2',
                  title: 'Preaching from the Epistles',
                  description: 'Genre-specific hermeneutics',
                },
                {
                  id: 'past-1-2-5-3',
                  title: 'Preaching from Narrative',
                  description: 'Gospels and Acts',
                },
                {
                  id: 'past-1-2-5-4',
                  title: 'Preaching Apocalyptic Literature',
                  description: 'Daniel and Revelation',
                },
              ],
            },
          ],
        },

        // ----- Module 3: Biblical Languages -----
        {
          id: 'past-p1-m3',
          title: 'Biblical Languages',
          description:
            'Study of Hebrew and Greek to equip pastors for reading and interpreting the Scriptures in their original languages.',
          sections: [
            {
              id: 'past-p1-m3-s1',
              title: 'Biblical Languages',
              lessons: [
                {
                  id: 'past-1-3-1-1',
                  title: 'Hebrew I',
                  description: 'Grammar, vocabulary, and syntax',
                },
                {
                  id: 'past-1-3-1-2',
                  title: 'Hebrew II',
                  description: 'Continued grammar and reading',
                },
                {
                  id: 'past-1-3-1-3',
                  title: 'Hebrew Exegesis',
                  description:
                    'Reading and interpreting Hebrew texts for preaching',
                },
                {
                  id: 'past-1-3-1-4',
                  title: 'Greek I',
                  description: 'Grammar, vocabulary, and syntax',
                },
                {
                  id: 'past-1-3-1-5',
                  title: 'Greek II',
                  description: 'Continued grammar and reading',
                },
                {
                  id: 'past-1-3-1-6',
                  title: 'Greek Exegesis',
                  description:
                    'Reading and interpreting Greek texts for preaching',
                },
                {
                  id: 'past-1-3-1-7',
                  title: 'Maintaining Biblical Languages',
                  description:
                    'Tools and habits for ongoing use',
                },
              ],
            },
          ],
        },

        // ----- Module 4: Hermeneutics and Bible Study Methods -----
        {
          id: 'past-p1-m4',
          title: 'Hermeneutics and Bible Study Methods',
          description:
            'Principles and methods of biblical interpretation for faithful exposition and teaching of Scripture.',
          sections: [
            {
              id: 'past-p1-m4-s1',
              title: 'Hermeneutics and Bible Study Methods',
              lessons: [
                {
                  id: 'past-1-4-1-1',
                  title: 'Principles of Biblical Interpretation',
                  description:
                    'Historical, grammatical, literary, and theological interpretation',
                },
                {
                  id: 'past-1-4-1-2',
                  title: 'Genre and the Bible',
                  description:
                    'Narrative, poetry, prophecy, wisdom, epistle, apocalyptic',
                },
                {
                  id: 'past-1-4-1-3',
                  title: 'Context and Background',
                  description:
                    'Historical, cultural, and literary context',
                },
                {
                  id: 'past-1-4-1-4',
                  title: 'Application and Contextualization',
                  description:
                    'Moving from ancient text to contemporary relevance',
                },
                {
                  id: 'past-1-4-1-5',
                  title: 'Teaching the Bible',
                  description:
                    'Methods for various settings and audiences',
                },
                {
                  id: 'past-1-4-1-6',
                  title: 'Exegetical Method',
                  description: 'From text to sermon preparation',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'This phase provides pastors and ministry leaders with an exhaustive study of the entire biblical canon, equipping you to handle the Scriptures with precision, depth, and pastoral sensitivity. You will work through the Old and New Testaments book by book, engage with the original Hebrew and Greek languages, and master the hermeneutical principles that undergird faithful exposition. Rather than a surface-level survey, each module is designed to sharpen your ability to move from exegesis to proclamation — ensuring that every sermon, Bible study, and counseling conversation you lead is grounded in careful, text-driven interpretation. Whether you are preparing a sermon series, training lay teachers, or simply deepening your own walk with God through His Word, this phase gives you the tools to read Scripture on its own terms and teach it with confidence.',
        expectations: [
          'Complete a thorough book-by-book study of both the Old and New Testaments with attention to pastoral application',
          'Develop working knowledge of biblical Hebrew and Greek sufficient for sermon preparation and exegesis',
          'Master hermeneutical principles including historical, grammatical, literary, and theological interpretation',
          'Learn to preach faithfully from every major biblical genre — narrative, poetry, prophecy, epistle, and apocalyptic',
          'Build a christocentric approach to reading and teaching the whole Bible',
          'Establish sustainable habits for maintaining and using your language skills throughout your ministry career',
        ],
        skillLevel: 'Advanced',
        faq: [
          {
            question: 'Do I need prior experience with biblical languages to begin this phase?',
            answer:
              'No. The Hebrew and Greek modules start from the beginning with grammar and vocabulary and progress through exegesis. However, this phase moves at an intensive pace suited for pastors and leaders, so a commitment to consistent study and practice is essential.',
          },
          {
            question: 'How much time should I expect to invest in this phase?',
            answer:
              'This is a substantial phase covering four full modules. Most learners spend several months working through the material. We recommend dedicating at least five to seven hours per week, with additional time for language exercises and sermon preparation assignments.',
          },
          {
            question: 'How will this phase improve my preaching and teaching?',
            answer:
              'Every module is oriented toward proclamation. You will not only study the content of each biblical book but also learn genre-specific hermeneutics for preaching, practice moving from text to sermon, and develop a biblical-theological framework that enriches every message you deliver.',
          },
          {
            question: 'How does this phase connect to the rest of the Pastoral Ministry curriculum?',
            answer:
              'Biblical Foundation is the bedrock of the entire curriculum. The theological, practical, and leadership phases that follow all presuppose the scriptural competency built here. Completing this phase first ensures that your doctrine, counseling, leadership, and mission work are anchored in sound biblical interpretation.',
          },
        ],
      },
    },

    // =====================================================================
    // Phase 2: Theological Foundation
    // =====================================================================
    {
      id: 'past-p2',
      title: 'Theological Foundation',
      description:
        'A deep exploration of systematic theology, historical theology, ethics, apologetics, and confessional studies to build the doctrinal framework for pastoral ministry.',
      modules: [
        // ----- Module 1: Systematic Theology -----
        {
          id: 'past-p2-m1',
          title: 'Systematic Theology',
          description:
            'A comprehensive study of the major doctrines of the Christian faith organized in a systematic framework.',
          sections: [
            {
              id: 'past-p2-m1-s1',
              title: 'Systematic Theology',
              lessons: [
                {
                  id: 'past-2-1-1-1',
                  title: 'Prolegomena',
                  description:
                    'The nature and method of theology',
                },
                {
                  id: 'past-2-1-1-2',
                  title: 'Revelation and Scripture',
                  description:
                    'How God has made Himself known; bibliology',
                },
                {
                  id: 'past-2-1-1-3',
                  title: 'The Doctrine of God',
                  description:
                    'Existence, attributes, Trinity',
                },
                {
                  id: 'past-2-1-1-4',
                  title: 'The Doctrine of Christ',
                  description: 'Person and work of Jesus',
                },
                {
                  id: 'past-2-1-1-5',
                  title: 'The Doctrine of the Holy Spirit',
                  description: 'Person, work, and gifts',
                },
                {
                  id: 'past-2-1-1-6',
                  title: 'The Doctrine of Humanity',
                  description:
                    'Creation, image of God, constitution',
                },
                {
                  id: 'past-2-1-1-7',
                  title: 'The Doctrine of Sin',
                  description:
                    'Origin, nature, effects, and transmission',
                },
                {
                  id: 'past-2-1-1-8',
                  title: 'The Doctrine of Salvation',
                  description:
                    'Election, atonement, application of redemption',
                },
                {
                  id: 'past-2-1-1-9',
                  title: 'The Doctrine of the Church',
                  description:
                    'Nature, mission, ordinances, government',
                },
                {
                  id: 'past-2-1-1-10',
                  title: 'The Doctrine of Last Things',
                  description:
                    'Death, intermediate state, return of Christ, resurrection, judgment, eternal state',
                },
              ],
            },
          ],
        },

        // ----- Module 2: Historical Theology -----
        {
          id: 'past-p2-m2',
          title: 'Historical Theology',
          description:
            'A survey of the development of Christian thought and practice from the early church to the present day.',
          sections: [
            {
              id: 'past-p2-m2-s1',
              title: 'Historical Theology',
              lessons: [
                {
                  id: 'past-2-2-1-1',
                  title: 'The Early Church (100-500)',
                  description:
                    'Fathers, councils, creeds, and controversies',
                },
                {
                  id: 'past-2-2-1-2',
                  title: 'The Medieval Church (500-1500)',
                  description:
                    'East and West, monasticism, scholasticism',
                },
                {
                  id: 'past-2-2-1-3',
                  title: 'The Reformation (1500-1650)',
                  description:
                    'Luther, Calvin, Zwingli, Anabaptists, Catholic response',
                },
                {
                  id: 'past-2-2-1-4',
                  title: 'Post-Reformation to Modern (1650-1900)',
                  description:
                    'Puritanism, Pietism, Enlightenment, revivals',
                },
                {
                  id: 'past-2-2-1-5',
                  title: 'Modern and Contemporary Theology (1900-Present)',
                  description:
                    'Liberalism, neo-orthodoxy, evangelicalism, global Christianity',
                },
                {
                  id: 'past-2-2-1-6',
                  title: 'History of Preaching',
                  description:
                    'Great preachers and movements through the centuries',
                },
                {
                  id: 'past-2-2-1-7',
                  title: 'Denominational History and Distinctives',
                  description:
                    'Understanding your own tradition',
                },
              ],
            },
          ],
        },

        // ----- Module 3: Ethics and Apologetics -----
        {
          id: 'past-p2-m3',
          title: 'Ethics and Apologetics',
          description:
            'A study of Christian ethics across personal, pastoral, and social domains, paired with apologetics for defending the faith.',
          sections: [
            {
              id: 'past-p2-m3-s1',
              title: 'Ethics and Apologetics',
              lessons: [
                {
                  id: 'past-2-3-1-1',
                  title: 'Christian Ethics',
                  description:
                    'Foundations, method, and application',
                },
                {
                  id: 'past-2-3-1-2',
                  title: 'Pastoral Ethics',
                  description:
                    'Integrity, boundaries, and professional conduct',
                },
                {
                  id: 'past-2-3-1-3',
                  title: 'Bioethics',
                  description:
                    'Beginning and end of life issues',
                },
                {
                  id: 'past-2-3-1-4',
                  title: 'Sexual Ethics',
                  description:
                    'Biblical sexuality in a confused culture',
                },
                {
                  id: 'past-2-3-1-5',
                  title: 'Social Ethics',
                  description:
                    'Justice, politics, economics, and the common good',
                },
                {
                  id: 'past-2-3-1-6',
                  title: 'Apologetics for Pastors',
                  description:
                    'Defending the faith in preaching and pastoral care',
                },
                {
                  id: 'past-2-3-1-7',
                  title: 'World Religions and Cults',
                  description:
                    'Understanding and engaging other faiths',
                },
                {
                  id: 'past-2-3-1-8',
                  title: 'Christianity and Contemporary Culture',
                  description:
                    'Engaging secularism, pluralism, and postmodernism',
                },
              ],
            },
          ],
        },

        // ----- Module 4: Confessional and Creedal Studies -----
        {
          id: 'past-p2-m4',
          title: 'Confessional and Creedal Studies',
          description:
            'An examination of the historic creeds, confessions, and contemporary statements of faith that define Christian orthodoxy.',
          sections: [
            {
              id: 'past-p2-m4-s1',
              title: 'Confessional and Creedal Studies',
              lessons: [
                {
                  id: 'past-2-4-1-1',
                  title: 'The Apostles\' and Nicene Creeds',
                  description:
                    'Foundation of Christian orthodoxy',
                },
                {
                  id: 'past-2-4-1-2',
                  title: 'Major Confessions of Faith',
                  description:
                    'Westminster, Augsburg, Baptist confessions, etc.',
                },
                {
                  id: 'past-2-4-1-3',
                  title: 'Your Denominational Standards',
                  description:
                    'In-depth study of your tradition\'s documents',
                },
                {
                  id: 'past-2-4-1-4',
                  title: 'Contemporary Statements of Faith',
                  description:
                    'Lausanne Covenant, Chicago Statement, etc.',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'This phase immerses you in the doctrinal heritage of the Christian faith, moving from systematic theology through the sweep of church history and into the ethical and apologetic challenges that confront every pastor. You will study the major loci of Christian doctrine — God, Christ, the Spirit, humanity, sin, salvation, the church, and eschatology — and trace how these doctrines developed, were debated, and were codified across two millennia of church history. Alongside doctrinal study, you will engage Christian ethics at the personal, pastoral, and social levels, and learn to defend the faith in both the pulpit and the counseling room. By grounding your ministry in robust theology, you gain the clarity to preach with conviction, counsel with wisdom, and lead with discernment when difficult questions arise in your congregation.',
        expectations: [
          'Articulate the major doctrines of the Christian faith with precision and pastoral sensitivity',
          'Trace the development of Christian thought from the early church fathers through the Reformation to the present day',
          'Navigate complex ethical issues — bioethics, sexual ethics, social justice — with a biblically informed framework',
          'Defend the faith using apologetic approaches suited to pastoral ministry and congregational contexts',
          'Study and apply the historic creeds, confessions, and contemporary statements of faith relevant to your tradition',
          'Develop the theological vocabulary and reasoning needed for seminary-level discourse and congregational teaching',
        ],
        skillLevel: 'Advanced',
        faq: [
          {
            question: 'Do I need formal theological training before starting this phase?',
            answer:
              'Completing the Biblical Foundation phase is strongly recommended, as it provides the scriptural competency that systematic and historical theology build upon. However, pastors with significant prior biblical study can engage this material productively even if they begin here.',
          },
          {
            question: 'How much time should I expect to devote to this phase?',
            answer:
              'This phase covers four dense modules spanning systematic theology, church history, ethics, apologetics, and confessional studies. Plan on five to eight hours per week over several months. The material rewards careful reading and reflection, so allow time for journaling and discussion.',
          },
          {
            question: 'How will this phase help me in practical pastoral ministry?',
            answer:
              'Strong theology is the backbone of every pastoral task. Whether you are counseling a grieving family, preaching on a controversial topic, or navigating church conflict, the doctrinal and ethical frameworks you develop here will give you confidence and clarity in real-world ministry situations.',
          },
          {
            question: 'How does this phase connect to the other phases in the curriculum?',
            answer:
              'Theological Foundation follows Biblical Foundation and precedes Pastoral Ministry. The doctrines and ethical reasoning you master here directly inform your preaching, pastoral care, worship leadership, and engagement with contemporary issues addressed in later phases.',
          },
        ],
      },
    },

    // =====================================================================
    // Phase 3: Pastoral Ministry
    // =====================================================================
    {
      id: 'past-p3',
      title: 'Pastoral Ministry',
      description:
        'Practical training in preaching, pastoral care and counseling, worship leadership, and the administration of ordinances and special services.',
      modules: [
        // ----- Module 1: Preaching and Communication -----
        {
          id: 'past-p3-m1',
          title: 'Preaching and Communication',
          description:
            'Comprehensive training in the theology, preparation, structure, delivery, and ongoing development of preaching.',
          sections: [
            {
              id: 'past-p3-m1-s1',
              title: 'Preaching and Communication',
              lessons: [
                {
                  id: 'past-3-1-1-1',
                  title: 'Introduction to Homiletics',
                  description:
                    'Theology and practice of preaching',
                },
                {
                  id: 'past-3-1-1-2',
                  title: 'Sermon Preparation',
                  description: 'From text to manuscript',
                },
                {
                  id: 'past-3-1-1-3',
                  title: 'Sermon Structure',
                  description:
                    'Organizing for clarity and impact',
                },
                {
                  id: 'past-3-1-1-4',
                  title: 'Sermon Delivery',
                  description:
                    'Voice, body, presence, and the work of the Spirit',
                },
                {
                  id: 'past-3-1-1-5',
                  title: 'Expository Preaching',
                  description:
                    'Book-by-book and passage-by-passage proclamation',
                },
                {
                  id: 'past-3-1-1-6',
                  title: 'Topical and Doctrinal Preaching',
                  description:
                    'Addressing themes and teaching doctrine',
                },
                {
                  id: 'past-3-1-1-7',
                  title: 'Narrative Preaching',
                  description: 'Preaching stories with power',
                },
                {
                  id: 'past-3-1-1-8',
                  title: 'Preaching to the Heart',
                  description:
                    'Affections, application, and transformation',
                },
                {
                  id: 'past-3-1-1-9',
                  title: 'Preaching for Decision',
                  description:
                    'Evangelistic and revival preaching',
                },
                {
                  id: 'past-3-1-1-10',
                  title: 'Preaching in Special Contexts',
                  description:
                    'Funerals, weddings, holidays, crises',
                },
                {
                  id: 'past-3-1-1-11',
                  title: 'Sermon Evaluation and Improvement',
                  description: 'Growing as a preacher',
                },
                {
                  id: 'past-3-1-1-12',
                  title: 'Preaching Practicum',
                  description:
                    'Supervised practice with feedback',
                },
                {
                  id: 'past-3-1-1-13',
                  title: 'The Preacher\'s Life',
                  description:
                    'Spiritual formation for those who preach',
                },
                {
                  id: 'past-3-1-1-14',
                  title: 'Preaching and Worship',
                  description:
                    'Integrating the sermon into corporate worship',
                },
              ],
            },
          ],
        },

        // ----- Module 2: Pastoral Care and Counseling -----
        {
          id: 'past-p3-m2',
          title: 'Pastoral Care and Counseling',
          description:
            'Training in the theology and practice of pastoral care, biblical counseling, and specialized counseling contexts.',
          sections: [
            {
              id: 'past-p3-m2-s1',
              title: 'Pastoral Care and Counseling',
              lessons: [
                {
                  id: 'past-3-2-1-1',
                  title: 'Theology of Pastoral Care',
                  description: 'The shepherd\'s calling',
                },
                {
                  id: 'past-3-2-1-2',
                  title: 'Pastoral Visitation',
                  description:
                    'Hospitals, homes, and crisis situations',
                },
                {
                  id: 'past-3-2-1-3',
                  title: 'Biblical Counseling Foundations',
                  description:
                    'Scripture-based care for souls',
                },
                {
                  id: 'past-3-2-1-4',
                  title: 'Counseling Methods and Models',
                  description:
                    'Various approaches compared',
                },
                {
                  id: 'past-3-2-1-5',
                  title: 'Premarital Counseling',
                  description:
                    'Preparing couples for marriage',
                },
                {
                  id: 'past-3-2-1-6',
                  title: 'Marriage and Family Counseling',
                  description:
                    'Helping struggling relationships',
                },
                {
                  id: 'past-3-2-1-7',
                  title: 'Grief and Loss Counseling',
                  description: 'Walking with the bereaved',
                },
                {
                  id: 'past-3-2-1-8',
                  title: 'Crisis Counseling',
                  description:
                    'Trauma, disaster, and acute distress',
                },
                {
                  id: 'past-3-2-1-9',
                  title: 'Addiction and Recovery Ministry',
                  description:
                    'Substance abuse, pornography, and other addictions',
                },
                {
                  id: 'past-3-2-1-10',
                  title: 'Counseling Depression and Anxiety',
                  description:
                    'Mental health in pastoral context',
                },
                {
                  id: 'past-3-2-1-11',
                  title: 'Counseling Sexual and Abuse Issues',
                  description:
                    'Sensitive care for survivors',
                },
                {
                  id: 'past-3-2-1-12',
                  title: 'When to Refer',
                  description:
                    'Recognizing limits and building referral networks',
                },
                {
                  id: 'past-3-2-1-13',
                  title: 'The Counselor\'s Heart',
                  description:
                    'Self-care and avoiding burnout',
                },
                {
                  id: 'past-3-2-1-14',
                  title: 'Pastoral Ethics in Counseling',
                  description:
                    'Confidentiality, boundaries, and dual relationships',
                },
              ],
            },
          ],
        },

        // ----- Module 3: Worship and Liturgy -----
        {
          id: 'past-p3-m3',
          title: 'Worship and Liturgy',
          description:
            'A study of the theology, history, and practice of Christian corporate worship, including music, sacraments, and worship planning.',
          sections: [
            {
              id: 'past-p3-m3-s1',
              title: 'Worship and Liturgy',
              lessons: [
                {
                  id: 'past-3-3-1-1',
                  title: 'Theology of Worship',
                  description:
                    'Biblical foundations for corporate praise',
                },
                {
                  id: 'past-3-3-1-2',
                  title: 'History of Christian Worship',
                  description:
                    'From the early church to contemporary practice',
                },
                {
                  id: 'past-3-3-1-3',
                  title: 'Planning and Leading Worship',
                  description:
                    'Elements, flow, and preparation',
                },
                {
                  id: 'past-3-3-1-4',
                  title: 'Music in Worship',
                  description:
                    'Theology, selection, and leadership',
                },
                {
                  id: 'past-3-3-1-5',
                  title: 'The Church Calendar',
                  description:
                    'Advent, Lent, Easter, and the Christian year',
                },
                {
                  id: 'past-3-3-1-6',
                  title: 'The Lord\'s Supper',
                  description:
                    'Theology and practice of communion',
                },
                {
                  id: 'past-3-3-1-7',
                  title: 'Baptism',
                  description:
                    'Theology and practice across traditions',
                },
                {
                  id: 'past-3-3-1-8',
                  title: 'Prayer in Corporate Worship',
                  description: 'Leading public prayer',
                },
                {
                  id: 'past-3-3-1-9',
                  title: 'Scripture Reading in Worship',
                  description:
                    'The ministry of the Word read aloud',
                },
                {
                  id: 'past-3-3-1-10',
                  title: 'Worship in Various Contexts',
                  description:
                    'Traditional, contemporary, blended, multicultural',
                },
                {
                  id: 'past-3-3-1-11',
                  title: 'Technology in Worship',
                  description: 'Using media wisely',
                },
                {
                  id: 'past-3-3-1-12',
                  title: 'Worship and Formation',
                  description:
                    'How worship shapes believers',
                },
              ],
            },
          ],
        },

        // ----- Module 4: Ordinances, Ceremonies, and Special Services -----
        {
          id: 'past-p3-m4',
          title: 'Ordinances, Ceremonies, and Special Services',
          description:
            'Practical preparation for administering ordinances and leading special services in the life of the church.',
          sections: [
            {
              id: 'past-p3-m4-s1',
              title: 'Ordinances, Ceremonies, and Special Services',
              lessons: [
                {
                  id: 'past-3-4-1-1',
                  title: 'Baptism: Theology and Practice',
                  description: 'Administering the ordinance',
                },
                {
                  id: 'past-3-4-1-2',
                  title: 'The Lord\'s Supper: Theology and Practice',
                  description: 'Serving communion',
                },
                {
                  id: 'past-3-4-1-3',
                  title: 'Weddings',
                  description:
                    'Premarital preparation and ceremony design',
                },
                {
                  id: 'past-3-4-1-4',
                  title: 'Funerals and Memorial Services',
                  description:
                    'Ministering to the grieving',
                },
                {
                  id: 'past-3-4-1-5',
                  title: 'Baby Dedications and Christenings',
                  description: 'Celebrating new life',
                },
                {
                  id: 'past-3-4-1-6',
                  title: 'Ordination and Commissioning',
                  description: 'Recognizing God\'s call',
                },
                {
                  id: 'past-3-4-1-7',
                  title: 'Installation Services',
                  description: 'Welcoming new leaders',
                },
                {
                  id: 'past-3-4-1-8',
                  title: 'Church Discipline',
                  description:
                    'Restoration and, when necessary, removal',
                },
                {
                  id: 'past-3-4-1-9',
                  title: 'Membership Classes and Reception',
                  description: 'Welcoming new members',
                },
                {
                  id: 'past-3-4-1-10',
                  title: 'Building Dedications and Groundbreakings',
                  description: 'Marking milestones',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'This phase equips you with the core competencies of pastoral practice: preaching, pastoral care and counseling, worship leadership, and the administration of ordinances and special services. Preaching is treated not merely as a communication skill but as a theological act — you will learn to prepare, structure, and deliver sermons across every genre and occasion, from weekly exposition to funerals and evangelistic calls. In pastoral care, you will develop the ability to walk with people through crisis, grief, addiction, mental health challenges, and relational brokenness, while maintaining healthy boundaries and knowing when to refer. Worship and liturgy studies will deepen your understanding of how corporate praise forms believers and honors God. Finally, you will gain practical confidence in administering baptism, the Lord\'s Supper, weddings, funerals, and other ceremonies that mark the significant moments of congregational life.',
        expectations: [
          'Develop a comprehensive preaching practice spanning expository, topical, narrative, and special-occasion sermons',
          'Build proficiency in pastoral counseling including premarital, grief, crisis, addiction, and mental health contexts',
          'Understand the theology and history of Christian worship and learn to plan and lead corporate services',
          'Gain hands-on competence in administering ordinances such as baptism and the Lord\'s Supper',
          'Learn to lead weddings, funerals, dedications, ordinations, and other special services with pastoral sensitivity',
          'Integrate the preacher\'s spiritual life with the practice of proclamation for long-term fruitfulness',
        ],
        skillLevel: 'Advanced',
        faq: [
          {
            question: 'What prior experience do I need for this phase?',
            answer:
              'Completion of the Biblical Foundation and Theological Foundation phases is highly recommended. Effective preaching and pastoral care require the scriptural and doctrinal grounding provided in those earlier phases. Some prior ministry experience — even informal — will help you connect theory to practice more quickly.',
          },
          {
            question: 'How much time should I plan to invest?',
            answer:
              'This phase contains four substantial modules with over fifty lessons. Plan on six to eight hours per week across several months, including time for sermon preparation exercises, role-play counseling scenarios, and reflective journaling on worship practices.',
          },
          {
            question: 'Will I get practical experience, or is this all classroom learning?',
            answer:
              'While the lessons provide robust content and frameworks, the preaching module includes a supervised practicum, and the counseling and worship modules emphasize real-world application. We strongly encourage you to practice these skills in your local ministry context as you study.',
          },
          {
            question: 'How does this phase relate to the Leadership and Administration phase that follows?',
            answer:
              'Pastoral Ministry focuses on the shepherd\'s core tasks — preaching, caring, and leading worship — while Leadership and Administration addresses organizational skills like governance, finance, and strategic planning. Together they form a complete picture of effective pastoral service.',
          },
        ],
      },
    },

    // =====================================================================
    // Phase 4: Leadership and Administration
    // =====================================================================
    {
      id: 'past-p4',
      title: 'Leadership and Administration',
      description:
        'Training in pastoral leadership, church administration, organizational development, and specialized ministry contexts.',
      modules: [
        // ----- Module 1: Pastoral Leadership -----
        {
          id: 'past-p4-m1',
          title: 'Pastoral Leadership',
          description:
            'A study of the theology, character, skills, and practices of effective pastoral leadership in the local church.',
          sections: [
            {
              id: 'past-p4-m1-s1',
              title: 'Pastoral Leadership',
              lessons: [
                {
                  id: 'past-4-1-1-1',
                  title: 'Theology of Leadership',
                  description:
                    'Biblical foundations for leading God\'s people',
                },
                {
                  id: 'past-4-1-1-2',
                  title: 'The Character of a Leader',
                  description:
                    'Integrity, humility, and Christlikeness',
                },
                {
                  id: 'past-4-1-1-3',
                  title: 'The Pastor as Shepherd',
                  description:
                    'Feeding, leading, protecting the flock',
                },
                {
                  id: 'past-4-1-1-4',
                  title: 'The Pastor as Servant',
                  description:
                    'Jesus\' model of leadership',
                },
                {
                  id: 'past-4-1-1-5',
                  title: 'Spiritual Authority',
                  description:
                    'Leading with conviction and grace',
                },
                {
                  id: 'past-4-1-1-6',
                  title: 'Vision and Strategic Thinking',
                  description:
                    'Where are we going and how will we get there?',
                },
                {
                  id: 'past-4-1-1-7',
                  title: 'Decision-Making and Discernment',
                  description:
                    'Wisdom for complex situations',
                },
                {
                  id: 'past-4-1-1-8',
                  title: 'Leading Change',
                  description:
                    'Navigating transition and transformation',
                },
                {
                  id: 'past-4-1-1-9',
                  title: 'Conflict Resolution',
                  description:
                    'Peacemaking in the local church',
                },
                {
                  id: 'past-4-1-1-10',
                  title: 'Building and Leading Teams',
                  description:
                    'Collaboration and delegation',
                },
                {
                  id: 'past-4-1-1-11',
                  title: 'Developing Other Leaders',
                  description:
                    'Multiplication and succession',
                },
                {
                  id: 'past-4-1-1-12',
                  title: 'Multi-Staff Dynamics',
                  description:
                    'Working with associates, support staff, and volunteers',
                },
                {
                  id: 'past-4-1-1-13',
                  title: 'Leading Volunteers',
                  description:
                    'Recruiting, training, motivating, and retaining',
                },
                {
                  id: 'past-4-1-1-14',
                  title: 'Women in Ministry Leadership',
                  description:
                    'Perspectives and practices across traditions',
                },
              ],
            },
          ],
        },

        // ----- Module 2: Church Administration -----
        {
          id: 'past-p4-m2',
          title: 'Church Administration',
          description:
            'Practical training in governance, finances, human resources, facilities, and the administrative systems that support effective ministry.',
          sections: [
            {
              id: 'past-p4-m2-s1',
              title: 'Church Administration',
              lessons: [
                {
                  id: 'past-4-2-1-1',
                  title: 'Church Governance',
                  description:
                    'Polity, constitutions, bylaws, and structures',
                },
                {
                  id: 'past-4-2-1-2',
                  title: 'Elder and Deacon Ministry',
                  description:
                    'Developing and working with church officers',
                },
                {
                  id: 'past-4-2-1-3',
                  title: 'Church Membership',
                  description:
                    'Meaning, process, and pastoral care',
                },
                {
                  id: 'past-4-2-1-4',
                  title: 'Church Finances',
                  description:
                    'Budgeting, stewardship, and financial integrity',
                },
                {
                  id: 'past-4-2-1-5',
                  title: 'Nonprofit Law and Compliance',
                  description:
                    'Legal requirements for churches',
                },
                {
                  id: 'past-4-2-1-6',
                  title: 'Human Resources for Churches',
                  description:
                    'Hiring, evaluation, termination, and employment law',
                },
                {
                  id: 'past-4-2-1-7',
                  title: 'Risk Management',
                  description:
                    'Insurance, liability, and protecting the church',
                },
                {
                  id: 'past-4-2-1-8',
                  title: 'Facilities Management',
                  description:
                    'Buildings, grounds, and stewardship of property',
                },
                {
                  id: 'past-4-2-1-9',
                  title: 'Technology and the Church',
                  description:
                    'Websites, databases, communication systems',
                },
                {
                  id: 'past-4-2-1-10',
                  title: 'Administrative Systems',
                  description:
                    'Processes that free ministry to happen',
                },
                {
                  id: 'past-4-2-1-11',
                  title: 'Time Management for Pastors',
                  description:
                    'Stewarding the pastor\'s most precious resource',
                },
                {
                  id: 'past-4-2-1-12',
                  title: 'The Pastor\'s Compensation',
                  description:
                    'Salary, benefits, and financial health',
                },
                {
                  id: 'past-4-2-1-13',
                  title: 'Sabbatical and Renewal',
                  description:
                    'Sustaining long-term ministry',
                },
              ],
            },
          ],
        },

        // ----- Module 3: Organizational Development -----
        {
          id: 'past-p4-m3',
          title: 'Organizational Development',
          description:
            'Understanding the life cycle, health, strategic planning, and interpersonal dynamics of local church organizations.',
          sections: [
            {
              id: 'past-p4-m3-s1',
              title: 'Organizational Development',
              lessons: [
                {
                  id: 'past-4-3-1-1',
                  title: 'Congregational Life Cycle',
                  description:
                    'Birth, growth, plateau, decline, and renewal',
                },
                {
                  id: 'past-4-3-1-2',
                  title: 'Church Health Assessment',
                  description:
                    'Diagnosing strengths and weaknesses',
                },
                {
                  id: 'past-4-3-1-3',
                  title: 'Strategic Planning',
                  description:
                    'Setting goals and measuring progress',
                },
                {
                  id: 'past-4-3-1-4',
                  title: 'Implementing Change',
                  description: 'From vision to reality',
                },
                {
                  id: 'past-4-3-1-5',
                  title: 'Communication in Organizations',
                  description:
                    'Keeping people informed and aligned',
                },
                {
                  id: 'past-4-3-1-6',
                  title: 'Meetings That Work',
                  description:
                    'Running effective boards, committees, and teams',
                },
                {
                  id: 'past-4-3-1-7',
                  title: 'Dealing with Difficult People',
                  description:
                    'Grace and wisdom for challenging relationships',
                },
                {
                  id: 'past-4-3-1-8',
                  title: 'Navigating Church Politics',
                  description:
                    'Power, influence, and leading through complexity',
                },
              ],
            },
          ],
        },

        // ----- Module 4: Specialized Ministry Contexts -----
        {
          id: 'past-p4-m4',
          title: 'Specialized Ministry Contexts',
          description:
            'Exploring the unique challenges and opportunities of pastoral leadership across different church sizes, settings, and cultural contexts.',
          sections: [
            {
              id: 'past-p4-m4-s1',
              title: 'Specialized Ministry Contexts',
              lessons: [
                {
                  id: 'past-4-4-1-1',
                  title: 'Small Church Ministry',
                  description:
                    'Leading with limited resources and great potential',
                },
                {
                  id: 'past-4-4-1-2',
                  title: 'Large Church Ministry',
                  description:
                    'Complexity, systems, and scale',
                },
                {
                  id: 'past-4-4-1-3',
                  title: 'Multisite Church Ministry',
                  description:
                    'One church in multiple locations',
                },
                {
                  id: 'past-4-4-1-4',
                  title: 'Rural Ministry',
                  description:
                    'Unique challenges and opportunities',
                },
                {
                  id: 'past-4-4-1-5',
                  title: 'Urban Ministry',
                  description:
                    'Diversity, density, and social complexity',
                },
                {
                  id: 'past-4-4-1-6',
                  title: 'Suburban Ministry',
                  description:
                    'Reaching the comfortable and transient',
                },
                {
                  id: 'past-4-4-1-7',
                  title: 'Multicultural Ministry',
                  description:
                    'Leading diverse congregations',
                },
                {
                  id: 'past-4-4-1-8',
                  title: 'Revitalization Ministry',
                  description:
                    'Bringing new life to declining churches',
                },
                {
                  id: 'past-4-4-1-9',
                  title: 'Transitional Ministry',
                  description:
                    'Interim pastorates and seasons of change',
                },
                {
                  id: 'past-4-4-1-10',
                  title: 'International Ministry Contexts',
                  description:
                    'Cross-cultural pastoral leadership',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'This phase addresses the organizational and strategic dimensions of pastoral ministry that are essential yet often overlooked in traditional training. You will study pastoral leadership from a biblical and theological foundation, examining the character, vision, decision-making, and relational skills that distinguish effective shepherds. Church administration modules cover governance structures, financial stewardship, human resources, legal compliance, facilities, and technology — the operational realities that enable ministry to flourish. Organizational development training helps you assess congregational health, lead strategic planning, implement change, and navigate the interpersonal dynamics that can either fuel or derail a church\'s mission. Finally, you will explore specialized ministry contexts — small and large churches, urban and rural settings, multicultural congregations, revitalization efforts, and cross-cultural leadership — so you are prepared to lead faithfully wherever God calls you.',
        expectations: [
          'Develop a theology of leadership rooted in servant-hearted, Christ-centered shepherding',
          'Acquire practical skills in church governance, budgeting, legal compliance, and human resources',
          'Learn to cast vision, lead strategic planning, and implement organizational change',
          'Build competence in conflict resolution, team building, and developing other leaders',
          'Understand the unique dynamics of ministry across various church sizes, settings, and cultural contexts',
          'Integrate administrative excellence with spiritual priorities so that systems serve the mission rather than hinder it',
        ],
        skillLevel: 'Advanced',
        faq: [
          {
            question: 'Is this phase only for senior pastors or lead ministers?',
            answer:
              'Not at all. Associate pastors, ministry directors, church planters, and even lay leaders serving on church boards will benefit greatly from this material. Effective leadership and sound administration are responsibilities shared across every level of church governance.',
          },
          {
            question: 'How much time should I expect this phase to take?',
            answer:
              'With four modules covering leadership, administration, organizational development, and specialized contexts, plan on five to seven hours per week over several months. Some lessons include practical exercises such as drafting a church budget or conducting a health assessment that may take additional time.',
          },
          {
            question: 'I already have secular leadership experience. Will this phase still be valuable?',
            answer:
              'Absolutely. While transferable leadership principles are acknowledged, this phase is specifically grounded in the theology and unique dynamics of the local church. Topics like elder and deacon ministry, church polity, pastoral authority, and navigating church politics address realities that are distinct from corporate or nonprofit management.',
          },
          {
            question: 'How does this phase connect to the phases before and after it?',
            answer:
              'Leadership and Administration builds on the biblical, theological, and pastoral skills developed in Phases 1 through 3. It prepares you to lead the outward-facing mission work covered in Phase 5 (Mission and Evangelism) and to oversee the specialized ministries addressed in Phase 6.',
          },
        ],
      },
    },

    // =====================================================================
    // Phase 5: Mission and Evangelism
    // =====================================================================
    {
      id: 'past-p5',
      title: 'Mission and Evangelism',
      description:
        'Training in evangelism, discipleship, global missions, and church planting to equip pastors for the Great Commission.',
      modules: [
        // ----- Module 1: Evangelism -----
        {
          id: 'past-p5-m1',
          title: 'Evangelism',
          description:
            'A study of the theology, methods, and contexts of sharing the gospel with unbelievers and equipping the congregation for outreach.',
          sections: [
            {
              id: 'past-p5-m1-s1',
              title: 'Evangelism',
              lessons: [
                {
                  id: 'past-5-1-1-1',
                  title: 'Theology of Evangelism',
                  description:
                    'Why we share and what we share',
                },
                {
                  id: 'past-5-1-1-2',
                  title: 'Personal Evangelism',
                  description:
                    'One-on-one gospel conversations',
                },
                {
                  id: 'past-5-1-1-3',
                  title: 'Evangelistic Preaching',
                  description:
                    'Calling for response from the pulpit',
                },
                {
                  id: 'past-5-1-1-4',
                  title: 'Evangelism Training',
                  description:
                    'Equipping the congregation to share their faith',
                },
                {
                  id: 'past-5-1-1-5',
                  title: 'Apologetics in Evangelism',
                  description:
                    'Answering questions and removing obstacles',
                },
                {
                  id: 'past-5-1-1-6',
                  title: 'Evangelism and Social Action',
                  description: 'Word and deed together',
                },
                {
                  id: 'past-5-1-1-7',
                  title: 'Evangelism in a Post-Christian Context',
                  description:
                    'Reaching the secular and skeptical',
                },
                {
                  id: 'past-5-1-1-8',
                  title: 'Digital Evangelism',
                  description:
                    'Using technology for gospel outreach',
                },
                {
                  id: 'past-5-1-1-9',
                  title: 'Event Evangelism',
                  description:
                    'Outreach events and their effectiveness',
                },
                {
                  id: 'past-5-1-1-10',
                  title: 'Follow-Up and Integration',
                  description:
                    'From conversion to church membership',
                },
              ],
            },
          ],
        },

        // ----- Module 2: Discipleship and Spiritual Formation -----
        {
          id: 'past-p5-m2',
          title: 'Discipleship and Spiritual Formation',
          description:
            'Developing strategies and models for nurturing believers from initial faith to mature disciple-makers.',
          sections: [
            {
              id: 'past-p5-m2-s1',
              title: 'Discipleship and Spiritual Formation',
              lessons: [
                {
                  id: 'past-5-2-1-1',
                  title: 'Theology of Discipleship',
                  description:
                    'The Great Commission and its implications',
                },
                {
                  id: 'past-5-2-1-2',
                  title: 'Discipleship Models',
                  description:
                    'One-on-one, small group, and congregational approaches',
                },
                {
                  id: 'past-5-2-1-3',
                  title: 'Curriculum Development',
                  description:
                    'Creating and selecting discipleship materials',
                },
                {
                  id: 'past-5-2-1-4',
                  title: 'Assessing Spiritual Growth',
                  description:
                    'How do we know people are maturing?',
                },
                {
                  id: 'past-5-2-1-5',
                  title: 'Mentoring and Coaching',
                  description:
                    'Deep investment in emerging believers and leaders',
                },
                {
                  id: 'past-5-2-1-6',
                  title: 'Spiritual Formation in Community',
                  description:
                    'The role of the congregation in growth',
                },
                {
                  id: 'past-5-2-1-7',
                  title: 'Discipleship Pathway Design',
                  description:
                    'From first contact to mature disciple-maker',
                },
                {
                  id: 'past-5-2-1-8',
                  title: 'Intergenerational Discipleship',
                  description:
                    'Connecting generations in faith formation',
                },
              ],
            },
          ],
        },

        // ----- Module 3: Missions -----
        {
          id: 'past-p5-m3',
          title: 'Missions',
          description:
            'A study of global missions from biblical theology through contemporary strategies, mobilization, and partnership.',
          sections: [
            {
              id: 'past-p5-m3-s1',
              title: 'Missions',
              lessons: [
                {
                  id: 'past-5-3-1-1',
                  title: 'Biblical Theology of Mission',
                  description:
                    'God\'s global purpose from Genesis to Revelation',
                },
                {
                  id: 'past-5-3-1-2',
                  title: 'History of Missions',
                  description:
                    'From the early church to the present',
                },
                {
                  id: 'past-5-3-1-3',
                  title: 'Contemporary Mission Strategies',
                  description:
                    'Unreached peoples, church planting movements, and more',
                },
                {
                  id: 'past-5-3-1-4',
                  title: 'The Local Church and Global Mission',
                  description:
                    'Sending, supporting, and going',
                },
                {
                  id: 'past-5-3-1-5',
                  title: 'Short-Term Missions',
                  description:
                    'Best practices and avoiding harm',
                },
                {
                  id: 'past-5-3-1-6',
                  title: 'Missionary Care',
                  description:
                    'Supporting those who serve cross-culturally',
                },
                {
                  id: 'past-5-3-1-7',
                  title: 'Missions Mobilization',
                  description:
                    'Awakening the congregation to the Great Commission',
                },
                {
                  id: 'past-5-3-1-8',
                  title: 'Partnership and Collaboration',
                  description:
                    'Working with agencies, networks, and national churches',
                },
                {
                  id: 'past-5-3-1-9',
                  title: 'Urban Mission',
                  description:
                    'Reaching the cities of the world',
                },
                {
                  id: 'past-5-3-1-10',
                  title: 'Business as Mission',
                  description:
                    'Marketplace strategies for the gospel',
                },
                {
                  id: 'past-5-3-1-11',
                  title: 'Missions and Social Justice',
                  description:
                    'Holistic ministry to the whole person',
                },
              ],
            },
          ],
        },

        // ----- Module 4: Church Planting -----
        {
          id: 'past-p5-m4',
          title: 'Church Planting',
          description:
            'Training in the theology, models, assessment, and practical skills needed to plant and multiply new churches.',
          sections: [
            {
              id: 'past-p5-m4-s1',
              title: 'Church Planting',
              lessons: [
                {
                  id: 'past-5-4-1-1',
                  title: 'Theology of Church Planting',
                  description: 'Why start new churches?',
                },
                {
                  id: 'past-5-4-1-2',
                  title: 'Church Planting Models',
                  description:
                    'Various approaches and contexts',
                },
                {
                  id: 'past-5-4-1-3',
                  title: 'The Church Planter\'s Assessment',
                  description:
                    'Calling, gifting, and readiness',
                },
                {
                  id: 'past-5-4-1-4',
                  title: 'Gathering a Core Team',
                  description:
                    'Building the initial community',
                },
                {
                  id: 'past-5-4-1-5',
                  title: 'Launch and Early Development',
                  description: 'The first two years',
                },
                {
                  id: 'past-5-4-1-6',
                  title: 'Funding Church Plants',
                  description:
                    'Bivocational, fully funded, and creative approaches',
                },
                {
                  id: 'past-5-4-1-7',
                  title: 'Church Planting in Hard Places',
                  description:
                    'Resistant contexts and creative access',
                },
                {
                  id: 'past-5-4-1-8',
                  title: 'Multiplying Churches',
                  description:
                    'From one plant to a movement',
                },
                {
                  id: 'past-5-4-1-9',
                  title: 'Denominations and Church Planting Networks',
                  description: 'Resources and partnerships',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'This phase turns your attention outward to the mission that lies at the heart of the church\'s calling. You will study the theology and practice of evangelism — from personal gospel conversations and evangelistic preaching to equipping your congregation for outreach in an increasingly post-Christian context. Discipleship and spiritual formation modules help you design intentional pathways that move new believers toward maturity and multiplication. A comprehensive missions component traces God\'s global purpose from Genesis to Revelation and equips you to mobilize, send, support, and partner in cross-cultural ministry. Finally, church planting training covers the theology, models, assessment, fundraising, and multiplication strategies needed to launch and sustain new congregations. Whether your context is a local neighborhood or an unreached people group, this phase prepares you to lead your church in fulfilling the Great Commission.',
        expectations: [
          'Develop a robust theology of evangelism and learn practical methods for personal and congregational outreach',
          'Design a discipleship pathway that guides believers from initial faith to mature disciple-making',
          'Understand the history and current landscape of global missions and learn to mobilize your church effectively',
          'Gain practical knowledge of church planting models, team formation, funding, and multiplication strategies',
          'Learn to integrate evangelism with social action for holistic, gospel-centered community engagement',
          'Equip your congregation to share their faith confidently in both digital and face-to-face settings',
        ],
        skillLevel: 'Advanced',
        faq: [
          {
            question: 'Do I need to be involved in church planting to benefit from this phase?',
            answer:
              'No. While the church planting module is valuable for those exploring that calling, every pastor benefits from understanding evangelism strategies, discipleship systems, and missions mobilization. These skills are essential for any local church leader committed to the Great Commission.',
          },
          {
            question: 'How much time should I allocate to this phase?',
            answer:
              'This phase contains four modules with nearly forty lessons. Plan on five to seven hours per week over several months. Some modules include field assignments — such as engaging in a gospel conversation or developing a discipleship plan — that require time beyond the lesson content itself.',
          },
          {
            question: 'How does this phase address evangelism in a secular or post-Christian culture?',
            answer:
              'Dedicated lessons cover evangelism in post-Christian contexts, digital evangelism, apologetics as a tool for outreach, and reaching the religiously unaffiliated. The material recognizes that effective witness today requires both theological clarity and cultural fluency.',
          },
          {
            question: 'How does this phase connect to the rest of the curriculum?',
            answer:
              'Mission and Evangelism builds on the biblical, theological, pastoral, and leadership foundations of Phases 1 through 4. It equips you to channel those competencies outward. The specialized ministries in Phase 6 and the personal formation of Phase 7 complement and sustain the missional momentum developed here.',
          },
        ],
      },
    },

    // =====================================================================
    // Phase 6: Specialized Ministries
    // =====================================================================
    {
      id: 'past-p6',
      title: 'Specialized Ministries',
      description:
        'Training in age-specific and specialized care ministries, equipping pastors to lead or oversee children\'s, youth, young adult, adult, and specialized care ministries.',
      modules: [
        // ----- Module 1: Children's Ministry -----
        {
          id: 'past-p6-m1',
          title: 'Children\'s Ministry',
          description:
            'Understanding the theology, development, teaching methods, and administration of ministry to children.',
          sections: [
            {
              id: 'past-p6-m1-s1',
              title: 'Children\'s Ministry',
              lessons: [
                {
                  id: 'past-6-1-1-1',
                  title: 'Theology of Children\'s Ministry',
                  description:
                    'The place of children in God\'s kingdom',
                },
                {
                  id: 'past-6-1-1-2',
                  title: 'Child Development and Faith Formation',
                  description:
                    'How children grow spiritually',
                },
                {
                  id: 'past-6-1-1-3',
                  title: 'Teaching Children the Bible',
                  description:
                    'Age-appropriate communication',
                },
                {
                  id: 'past-6-1-1-4',
                  title: 'Children\'s Ministry Administration',
                  description:
                    'Recruiting, training, and organizing',
                },
                {
                  id: 'past-6-1-1-5',
                  title: 'Family Ministry Integration',
                  description: 'Partnering with parents',
                },
                {
                  id: 'past-6-1-1-6',
                  title: 'Child Safety and Protection',
                  description:
                    'Policies, screening, and prevention',
                },
                {
                  id: 'past-6-1-1-7',
                  title: 'Special Needs Ministry',
                  description:
                    'Including children with disabilities',
                },
                {
                  id: 'past-6-1-1-8',
                  title: 'Vacation Bible School and Events',
                  description:
                    'Programming for outreach and growth',
                },
              ],
            },
          ],
        },

        // ----- Module 2: Youth Ministry -----
        {
          id: 'past-p6-m2',
          title: 'Youth Ministry',
          description:
            'A comprehensive study of adolescent development, youth programming, discipleship, evangelism, and leadership for effective ministry to teenagers.',
          sections: [
            {
              id: 'past-p6-m2-s1',
              title: 'Youth Ministry',
              lessons: [
                {
                  id: 'past-6-2-1-1',
                  title: 'Theology of Youth Ministry',
                  description: 'Adolescence and the church',
                },
                {
                  id: 'past-6-2-1-2',
                  title: 'Adolescent Development',
                  description:
                    'Understanding teenagers spiritually, emotionally, and socially',
                },
                {
                  id: 'past-6-2-1-3',
                  title: 'Teaching and Preaching to Youth',
                  description:
                    'Communication that connects',
                },
                {
                  id: 'past-6-2-1-4',
                  title: 'Youth Ministry Programming',
                  description:
                    'Worship, small groups, events, and retreats',
                },
                {
                  id: 'past-6-2-1-5',
                  title: 'Youth Discipleship',
                  description:
                    'Deep investment in teenage faith',
                },
                {
                  id: 'past-6-2-1-6',
                  title: 'Youth Evangelism',
                  description:
                    'Reaching unchurched students',
                },
                {
                  id: 'past-6-2-1-7',
                  title: 'Youth Ministry Leadership',
                  description:
                    'Building adult teams and student leaders',
                },
                {
                  id: 'past-6-2-1-8',
                  title: 'Youth and Family',
                  description: 'Partnering with parents',
                },
                {
                  id: 'past-6-2-1-9',
                  title: 'Campus Ministry',
                  description:
                    'Reaching students on high school and college campuses',
                },
                {
                  id: 'past-6-2-1-10',
                  title: 'Youth Culture and Trends',
                  description:
                    'Understanding the world teenagers inhabit',
                },
                {
                  id: 'past-6-2-1-11',
                  title: 'Navigating Sensitive Issues',
                  description:
                    'Sexuality, mental health, technology, and more',
                },
              ],
            },
          ],
        },

        // ----- Module 3: College and Young Adult Ministry -----
        {
          id: 'past-p6-m3',
          title: 'College and Young Adult Ministry',
          description:
            'Training in the unique developmental, intellectual, and spiritual needs of emerging adults in campus and church contexts.',
          sections: [
            {
              id: 'past-p6-m3-s1',
              title: 'College and Young Adult Ministry',
              lessons: [
                {
                  id: 'past-6-3-1-1',
                  title: 'Young Adult Development',
                  description:
                    'The unique challenges of emerging adulthood',
                },
                {
                  id: 'past-6-3-1-2',
                  title: 'Campus Ministry',
                  description:
                    'Reaching college and university students',
                },
                {
                  id: 'past-6-3-1-3',
                  title: 'Young Adult Community',
                  description:
                    'Building authentic fellowship',
                },
                {
                  id: 'past-6-3-1-4',
                  title: 'Apologetics for the University',
                  description:
                    'Equipping students for intellectual challenges',
                },
                {
                  id: 'past-6-3-1-5',
                  title: 'Vocational Discipleship',
                  description:
                    'Integrating faith, work, and calling',
                },
                {
                  id: 'past-6-3-1-6',
                  title: 'Young Adult Retention',
                  description:
                    'Keeping young people connected to the church',
                },
                {
                  id: 'past-6-3-1-7',
                  title: 'Transitions Ministry',
                  description:
                    'Helping young adults navigate life changes',
                },
              ],
            },
          ],
        },

        // ----- Module 4: Adult Ministry -----
        {
          id: 'past-p6-m4',
          title: 'Adult Ministry',
          description:
            'A study of education, small groups, gender-specific ministries, and life-stage ministries for adults in the local church.',
          sections: [
            {
              id: 'past-p6-m4-s1',
              title: 'Adult Ministry',
              lessons: [
                {
                  id: 'past-6-4-1-1',
                  title: 'Adult Education',
                  description:
                    'Sunday school, classes, and seminars',
                },
                {
                  id: 'past-6-4-1-2',
                  title: 'Small Group Ministry',
                  description:
                    'Philosophy, structure, and leadership development',
                },
                {
                  id: 'past-6-4-1-3',
                  title: 'Men\'s Ministry',
                  description:
                    'Discipleship, fellowship, and accountability',
                },
                {
                  id: 'past-6-4-1-4',
                  title: 'Women\'s Ministry',
                  description:
                    'Bible study, community, and spiritual growth',
                },
                {
                  id: 'past-6-4-1-5',
                  title: 'Singles Ministry',
                  description:
                    'Community for the unmarried',
                },
                {
                  id: 'past-6-4-1-6',
                  title: 'Marriage Ministry',
                  description:
                    'Enrichment, support, and crisis intervention',
                },
                {
                  id: 'past-6-4-1-7',
                  title: 'Divorce Care and Blended Family Ministry',
                  description:
                    'Support for broken and blending families',
                },
                {
                  id: 'past-6-4-1-8',
                  title: 'Senior Adult Ministry',
                  description:
                    'Engaging the wisdom generation',
                },
                {
                  id: 'past-6-4-1-9',
                  title: 'Empty Nesters and Midlife Ministry',
                  description:
                    'Addressing transitions and renewed purpose',
                },
              ],
            },
          ],
        },

        // ----- Module 5: Specialized Care Ministries -----
        {
          id: 'past-p6-m5',
          title: 'Specialized Care Ministries',
          description:
            'Training in chaplaincy, recovery, mental health, disability, poverty, refugee, and crisis ministries for specialized pastoral care.',
          sections: [
            {
              id: 'past-p6-m5-s1',
              title: 'Specialized Care Ministries',
              lessons: [
                {
                  id: 'past-6-5-1-1',
                  title: 'Hospital and Healthcare Chaplaincy',
                  description:
                    'Ministry to the sick and medical professionals',
                },
                {
                  id: 'past-6-5-1-2',
                  title: 'Military Chaplaincy',
                  description: 'Serving those who serve',
                },
                {
                  id: 'past-6-5-1-3',
                  title: 'Prison and Jail Ministry',
                  description: 'Reaching the incarcerated',
                },
                {
                  id: 'past-6-5-1-4',
                  title: 'Addiction Recovery Ministry',
                  description:
                    'Celebrate Recovery and similar programs',
                },
                {
                  id: 'past-6-5-1-5',
                  title: 'Mental Health Ministry',
                  description:
                    'Supporting those with psychological struggles',
                },
                {
                  id: 'past-6-5-1-6',
                  title: 'Grief Support Ministry',
                  description:
                    'Walking with the bereaved',
                },
                {
                  id: 'past-6-5-1-7',
                  title: 'Disability Ministry',
                  description:
                    'Including those with physical and intellectual disabilities',
                },
                {
                  id: 'past-6-5-1-8',
                  title: 'Poverty and Compassion Ministry',
                  description:
                    'Practical care for the poor',
                },
                {
                  id: 'past-6-5-1-9',
                  title: 'Refugee and Immigrant Ministry',
                  description: 'Welcoming the stranger',
                },
                {
                  id: 'past-6-5-1-10',
                  title: 'Crisis and Disaster Response',
                  description:
                    'Mobilizing the church when disaster strikes',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'This phase equips you to lead or oversee the full range of age-specific and specialized care ministries that constitute a healthy church. You will study children\'s ministry — from theology and child development to safety policies and family partnership — and youth ministry, including adolescent development, programming, discipleship, and navigating sensitive cultural issues. College and young adult ministry addresses the unique challenges of emerging adulthood, campus engagement, and vocational discipleship. Adult ministry training covers small groups, gender-specific programs, marriage enrichment, senior care, and life-stage transitions. Finally, specialized care ministries prepare you for chaplaincy, addiction recovery, mental health support, disability inclusion, poverty response, refugee care, and disaster relief. Even if you do not personally lead each of these areas, pastoral oversight requires a working knowledge of every ministry under your charge.',
        expectations: [
          'Understand the theology, developmental dynamics, and best practices for ministry to children, youth, and young adults',
          'Learn to design and oversee adult ministry programs including small groups, gender-specific ministries, and life-stage support',
          'Develop competence in specialized care areas such as chaplaincy, addiction recovery, mental health, and disability inclusion',
          'Build policies and structures that ensure child safety, volunteer training, and quality programming',
          'Gain skills for partnering with parents and families as co-laborers in faith formation',
          'Prepare to provide pastoral oversight across diverse ministry departments even when specialists lead the day-to-day work',
        ],
        skillLevel: 'Advanced',
        faq: [
          {
            question: 'Do I need to complete earlier phases before tackling this one?',
            answer:
              'While earlier phases are not strict prerequisites, the biblical, theological, and pastoral competencies from Phases 1 through 3 will significantly enhance your ability to lead these specialized areas with depth and discernment. We recommend completing at least the first three phases beforehand.',
          },
          {
            question: 'How much time should I expect to spend on this phase?',
            answer:
              'With five modules covering children, youth, young adults, adults, and specialized care, this is one of the larger phases. Plan on five to eight hours per week over several months. Some lessons include policy-drafting exercises and ministry planning assignments that may require additional time.',
          },
          {
            question: 'What if I am a solo pastor and handle all these areas myself?',
            answer:
              'This phase is especially valuable for you. Understanding each ministry area allows you to set appropriate standards, recruit and train volunteers, and allocate your limited time wisely. The material helps you identify which areas need the most attention and how to develop lay leaders to share the load.',
          },
          {
            question: 'How does this phase connect to the broader curriculum?',
            answer:
              'Specialized Ministries applies the leadership and administrative skills from Phase 4 to specific congregational contexts. It also draws on the counseling and pastoral care training from Phase 3. The personal formation addressed in Phase 7 helps sustain you as you carry the weight of overseeing so many ministry areas.',
          },
        ],
      },
    },

    // =====================================================================
    // Phase 7: The Pastor's Personal Life
    // =====================================================================
    {
      id: 'past-p7',
      title: 'The Pastor\'s Personal Life',
      description:
        'Focused attention on the pastor\'s spiritual formation, family life, physical and emotional health, and resilience for long-term fruitful ministry.',
      modules: [
        // ----- Module 1: Spiritual Formation for Pastors -----
        {
          id: 'past-p7-m1',
          title: 'Spiritual Formation for Pastors',
          description:
            'Cultivating the pastor\'s personal relationship with God through devotional practice, prayer, spiritual direction, and sustainable spiritual rhythms.',
          sections: [
            {
              id: 'past-p7-m1-s1',
              title: 'Spiritual Formation for Pastors',
              lessons: [
                {
                  id: 'past-7-1-1-1',
                  title: 'The Pastor\'s Devotional Life',
                  description:
                    'Maintaining personal relationship with God',
                },
                {
                  id: 'past-7-1-1-2',
                  title: 'The Pastor\'s Prayer Life',
                  description:
                    'Communion with God as foundation for ministry',
                },
                {
                  id: 'past-7-1-1-3',
                  title: 'The Pastor\'s Study of Scripture',
                  description:
                    'Reading for the soul, not just for sermons',
                },
                {
                  id: 'past-7-1-1-4',
                  title: 'Solitude, Silence, and Sabbath',
                  description:
                    'Rest and renewal for the minister',
                },
                {
                  id: 'past-7-1-1-5',
                  title: 'Spiritual Direction for Pastors',
                  description:
                    'Receiving guidance for the journey',
                },
                {
                  id: 'past-7-1-1-6',
                  title: 'The Pastor\'s Accountability',
                  description:
                    'Relationships that protect and encourage',
                },
                {
                  id: 'past-7-1-1-7',
                  title: 'Fasting and Other Disciplines',
                  description:
                    'Spiritual practices for ministry leaders',
                },
                {
                  id: 'past-7-1-1-8',
                  title: 'The Pastor\'s Rule of Life',
                  description:
                    'Sustainable rhythms for long-term fruitfulness',
                },
              ],
            },
          ],
        },

        // ----- Module 2: The Pastor's Family -----
        {
          id: 'past-p7-m2',
          title: 'The Pastor\'s Family',
          description:
            'Addressing the unique pressures and opportunities of pastoral family life, including marriage, parenting, and protecting the home.',
          sections: [
            {
              id: 'past-p7-m2-s1',
              title: 'The Pastor\'s Family',
              lessons: [
                {
                  id: 'past-7-2-1-1',
                  title: 'The Pastor as Spouse',
                  description:
                    'Prioritizing marriage in ministry',
                },
                {
                  id: 'past-7-2-1-2',
                  title: 'The Pastor as Parent',
                  description:
                    'Raising children in the fishbowl',
                },
                {
                  id: 'past-7-2-1-3',
                  title: 'Protecting the Pastor\'s Family',
                  description:
                    'Boundaries, privacy, and realistic expectations',
                },
                {
                  id: 'past-7-2-1-4',
                  title: 'The Pastor\'s Home',
                  description:
                    'Hospitality, rest, and sanctuary',
                },
                {
                  id: 'past-7-2-1-5',
                  title: 'When Ministry Hurts the Family',
                  description: 'Healing and prevention',
                },
                {
                  id: 'past-7-2-1-6',
                  title: 'PK (Pastor\'s Kid) Issues',
                  description:
                    'Understanding the unique pressures',
                },
              ],
            },
          ],
        },

        // ----- Module 3: The Pastor's Health -----
        {
          id: 'past-p7-m3',
          title: 'The Pastor\'s Health',
          description:
            'A holistic approach to pastoral well-being covering physical, emotional, mental, relational, financial, and vocational health.',
          sections: [
            {
              id: 'past-p7-m3-s1',
              title: 'The Pastor\'s Health',
              lessons: [
                {
                  id: 'past-7-3-1-1',
                  title: 'Physical Health for Pastors',
                  description: 'Exercise, diet, and rest',
                },
                {
                  id: 'past-7-3-1-2',
                  title: 'Emotional Health for Pastors',
                  description:
                    'Processing the weight of ministry',
                },
                {
                  id: 'past-7-3-1-3',
                  title: 'Mental Health for Pastors',
                  description:
                    'Recognizing depression, anxiety, and burnout',
                },
                {
                  id: 'past-7-3-1-4',
                  title: 'Relational Health for Pastors',
                  description:
                    'Friendships, mentors, and peer support',
                },
                {
                  id: 'past-7-3-1-5',
                  title: 'Financial Health for Pastors',
                  description:
                    'Stewardship, retirement, and contentment',
                },
                {
                  id: 'past-7-3-1-6',
                  title: 'Vocational Health for Pastors',
                  description:
                    'Career stages, transitions, and finishing well',
                },
              ],
            },
          ],
        },

        // ----- Module 4: Pastoral Hazards and Resilience -----
        {
          id: 'past-p7-m4',
          title: 'Pastoral Hazards and Resilience',
          description:
            'Identifying the common dangers facing pastors and building the resilience needed for long-term faithful ministry.',
          sections: [
            {
              id: 'past-p7-m4-s1',
              title: 'Pastoral Hazards and Resilience',
              lessons: [
                {
                  id: 'past-7-4-1-1',
                  title: 'Temptation and the Pastor',
                  description:
                    'Sexual, financial, and pride-related dangers',
                },
                {
                  id: 'past-7-4-1-2',
                  title: 'Burnout and Compassion Fatigue',
                  description: 'Recognizing and recovering',
                },
                {
                  id: 'past-7-4-1-3',
                  title: 'Loneliness in Ministry',
                  description:
                    'Finding community when isolated',
                },
                {
                  id: 'past-7-4-1-4',
                  title: 'Criticism and Conflict',
                  description:
                    'Handling opposition with grace',
                },
                {
                  id: 'past-7-4-1-5',
                  title: 'Moral Failure and Restoration',
                  description:
                    'Prevention, consequences, and the path back',
                },
                {
                  id: 'past-7-4-1-6',
                  title: 'Leaving Well',
                  description:
                    'Transitions, terminations, and honoring the past',
                },
                {
                  id: 'past-7-4-1-7',
                  title: 'Pastoral Resilience',
                  description: 'What helps pastors last?',
                },
                {
                  id: 'past-7-4-1-8',
                  title: 'Retirement and Legacy',
                  description:
                    'Finishing strong and handing off well',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'This phase addresses the most neglected yet most critical dimension of pastoral effectiveness: the pastor\'s own soul, family, and well-being. Ministry can be profoundly rewarding, but it also carries unique pressures — public scrutiny, emotional weight, relational isolation, and spiritual dryness — that erode even the most gifted leaders if left unattended. You will cultivate sustainable devotional practices, a vibrant prayer life, and rhythms of solitude and sabbath that keep your relationship with God primary rather than merely professional. Family modules tackle the realities of being a spouse and parent in the fishbowl of ministry, establishing boundaries that protect your home. Health modules cover physical, emotional, mental, relational, financial, and vocational well-being with honesty and practical guidance. Finally, you will confront the hazards that sideline pastors — temptation, burnout, loneliness, moral failure — and build the resilience habits that sustain decades of faithful service.',
        expectations: [
          'Establish sustainable spiritual disciplines including devotional reading, prayer, solitude, sabbath, and fasting',
          'Learn to protect and strengthen your marriage and family amid the unique pressures of pastoral ministry',
          'Develop a holistic health plan covering physical, emotional, mental, relational, and financial well-being',
          'Identify the most common pastoral hazards — burnout, temptation, isolation, moral failure — and build safeguards against them',
          'Create a personal rule of life that sustains long-term fruitfulness and joy in ministry',
          'Build accountability relationships and learn when and how to seek help from mentors, counselors, and peers',
        ],
        skillLevel: 'Advanced',
        faq: [
          {
            question: 'Is this phase only for pastors who are struggling?',
            answer:
              'Not at all. This phase is designed for every pastor, whether you are thriving or in crisis. The healthiest leaders are proactive about their spiritual formation, family life, and personal resilience. Engaging this material when things are going well builds the foundation that sustains you when difficulties arise.',
          },
          {
            question: 'How much time should I set aside for this phase?',
            answer:
              'This phase contains four modules with around twenty-eight lessons. Plan on four to six hours per week over several months. Importantly, some exercises — such as developing a rule of life or scheduling a retreat — involve implementation beyond study time and are best spread over weeks.',
          },
          {
            question: 'Will this phase address the pressures my family faces because of my ministry role?',
            answer:
              'Yes, extensively. An entire module is devoted to the pastor\'s family, covering marriage, parenting, protecting privacy, pastor\'s kids, and what to do when ministry hurts the home. The material is honest about the unique strains and offers practical strategies for health and healing.',
          },
          {
            question: 'How does this phase fit into the overall curriculum sequence?',
            answer:
              'The Pastor\'s Personal Life is positioned after the outward-facing phases on ministry, leadership, mission, and specialized care — intentionally so. By this point you understand the scope of pastoral demands, which makes the personal formation material deeply relevant. It also prepares you for the Contemporary Issues and capstone phases that follow.',
          },
        ],
      },
    },

    // =====================================================================
    // Phase 8: Contemporary Issues
    // =====================================================================
    {
      id: 'past-p8',
      title: 'Contemporary Issues',
      description:
        'Engaging the pressing cultural, ethical, technological, and ecclesiological issues facing the church in the contemporary world.',
      modules: [
        // ----- Module 1: Church and Culture -----
        {
          id: 'past-p8-m1',
          title: 'Church and Culture',
          description:
            'Equipping pastors to engage the cultural, political, racial, economic, and environmental issues of our time with biblical wisdom.',
          sections: [
            {
              id: 'past-p8-m1-s1',
              title: 'Church and Culture',
              lessons: [
                {
                  id: 'past-8-1-1-1',
                  title: 'Engaging Secularism',
                  description:
                    'Ministry in a post-Christian West',
                },
                {
                  id: 'past-8-1-1-2',
                  title: 'Christianity and Politics',
                  description:
                    'Navigating the public square',
                },
                {
                  id: 'past-8-1-1-3',
                  title: 'Racial Reconciliation and the Church',
                  description: 'Pursuing unity and justice',
                },
                {
                  id: 'past-8-1-1-4',
                  title: 'Immigration and the Church',
                  description:
                    'Biblical and pastoral perspectives',
                },
                {
                  id: 'past-8-1-1-5',
                  title: 'Economic Justice',
                  description:
                    'Poverty, wealth, and Christian responsibility',
                },
                {
                  id: 'past-8-1-1-6',
                  title: 'Environmental Stewardship',
                  description:
                    'Creation care as Christian witness',
                },
                {
                  id: 'past-8-1-1-7',
                  title: 'Religious Liberty',
                  description:
                    'Understanding and defending freedom of conscience',
                },
              ],
            },
          ],
        },

        // ----- Module 2: Sexuality and Gender -----
        {
          id: 'past-p8-m2',
          title: 'Sexuality and Gender',
          description:
            'Addressing the complex and sensitive topics of biblical sexuality, gender, abuse, and related pastoral concerns.',
          sections: [
            {
              id: 'past-p8-m2-s1',
              title: 'Sexuality and Gender',
              lessons: [
                {
                  id: 'past-8-2-1-1',
                  title: 'Biblical Sexuality',
                  description:
                    'A theology of sex, marriage, and singleness',
                },
                {
                  id: 'past-8-2-1-2',
                  title: 'Homosexuality and the Church',
                  description:
                    'Pastoral and theological responses',
                },
                {
                  id: 'past-8-2-1-3',
                  title: 'Transgender Issues',
                  description:
                    'Understanding and pastoral care',
                },
                {
                  id: 'past-8-2-1-4',
                  title: 'Singleness, Divorce, and Remarriage',
                  description:
                    'Navigating complex situations',
                },
                {
                  id: 'past-8-2-1-5',
                  title: 'Pornography and Sexual Addiction',
                  description:
                    'Ministry in a sexualized culture',
                },
                {
                  id: 'past-8-2-1-6',
                  title: 'Abuse and the Church',
                  description:
                    'Prevention, response, and care for survivors',
                },
                {
                  id: 'past-8-2-1-7',
                  title: '#MeToo and the Church',
                  description:
                    'Power, accountability, and protection',
                },
              ],
            },
          ],
        },

        // ----- Module 3: Technology and Media -----
        {
          id: 'past-p8-m3',
          title: 'Technology and Media',
          description:
            'Exploring how technology, social media, digital culture, and emerging tools shape ministry and spiritual formation.',
          sections: [
            {
              id: 'past-p8-m3-s1',
              title: 'Technology and Media',
              lessons: [
                {
                  id: 'past-8-3-1-1',
                  title: 'The Pastor and Social Media',
                  description:
                    'Opportunity, danger, and wisdom',
                },
                {
                  id: 'past-8-3-1-2',
                  title: 'Technology in Ministry',
                  description:
                    'Tools that serve the mission',
                },
                {
                  id: 'past-8-3-1-3',
                  title: 'Digital Discipleship',
                  description:
                    'Forming believers in a connected age',
                },
                {
                  id: 'past-8-3-1-4',
                  title: 'Online Church',
                  description:
                    'Possibilities and limitations',
                },
                {
                  id: 'past-8-3-1-5',
                  title: 'Screen Culture and Spiritual Formation',
                  description:
                    'How technology shapes souls',
                },
                {
                  id: 'past-8-3-1-6',
                  title: 'Artificial Intelligence and Ministry',
                  description:
                    'Emerging questions and applications',
                },
              ],
            },
          ],
        },

        // ----- Module 4: Trends in Church and Ministry -----
        {
          id: 'past-p8-m4',
          title: 'Trends in Church and Ministry',
          description:
            'Understanding the major trends, movements, and future directions shaping the church today.',
          sections: [
            {
              id: 'past-p8-m4-s1',
              title: 'Trends in Church and Ministry',
              lessons: [
                {
                  id: 'past-8-4-1-1',
                  title: 'The Rise of the Nones',
                  description:
                    'Reaching the religiously unaffiliated',
                },
                {
                  id: 'past-8-4-1-2',
                  title: 'Deconstructing Faith',
                  description:
                    'Understanding and responding to those leaving',
                },
                {
                  id: 'past-8-4-1-3',
                  title: 'Church Decline and Renewal',
                  description:
                    'Facing hard realities with hope',
                },
                {
                  id: 'past-8-4-1-4',
                  title: 'Fresh Expressions and New Models',
                  description:
                    'Innovative approaches to church',
                },
                {
                  id: 'past-8-4-1-5',
                  title: 'The Global Church',
                  description:
                    'Learning from Christians around the world',
                },
                {
                  id: 'past-8-4-1-6',
                  title: 'Ecumenism and Evangelical Unity',
                  description:
                    'Working together across traditions',
                },
                {
                  id: 'past-8-4-1-7',
                  title: 'Future of the Church',
                  description: 'Anticipating what\'s ahead',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'This phase engages you with the urgent cultural, ethical, technological, and ecclesiological questions facing the church today. Ministry does not take place in a vacuum, and pastors must be equipped to guide their congregations through complex and often divisive issues with biblical fidelity, pastoral wisdom, and genuine compassion. You will explore the church\'s relationship to secular culture, politics, racial reconciliation, economic justice, and environmental stewardship. Sensitive topics in sexuality and gender — including homosexuality, transgender issues, abuse, and sexual ethics — are addressed with theological rigor and pastoral care. Technology and media modules prepare you to navigate social media, online church, digital discipleship, and emerging tools like artificial intelligence. Finally, you will examine the major trends reshaping the church landscape: the rise of the religiously unaffiliated, faith deconstruction, church decline and renewal, innovative ecclesial models, and the growth of global Christianity.',
        expectations: [
          'Develop a biblically grounded framework for engaging contemporary cultural and political issues from the pulpit and in pastoral conversations',
          'Address sexuality and gender topics — including homosexuality, transgender concerns, and abuse — with theological clarity and pastoral compassion',
          'Understand how technology, social media, and digital culture shape spiritual formation and learn to use these tools wisely in ministry',
          'Analyze current trends in church attendance, faith deconstruction, and innovative ecclesial models to position your ministry for relevance and faithfulness',
          'Learn to lead your congregation through divisive issues without compromising biblical conviction or relational unity',
          'Engage the global church and ecumenical landscape to broaden your perspective and strengthen collaborative ministry',
        ],
        skillLevel: 'Advanced',
        faq: [
          {
            question: 'Do I need to have a position on every controversial issue before starting this phase?',
            answer:
              'No. This phase is designed to help you develop informed positions rooted in Scripture, theology, and pastoral wisdom. The material presents the major perspectives within orthodox Christianity and equips you to think through these issues carefully rather than imposing a single viewpoint.',
          },
          {
            question: 'How much time should I expect to invest in this phase?',
            answer:
              'With four modules covering culture, sexuality, technology, and church trends, plan on five to seven hours per week over several months. Some topics will benefit from additional reading and conversation with trusted colleagues, so build margin for that as well.',
          },
          {
            question: 'How does this phase help me avoid alienating people in my congregation?',
            answer:
              'Each module emphasizes pastoral tone and relational wisdom alongside theological substance. You will learn not only what to say but how to say it — modeling grace and truth in ways that invite dialogue rather than division, even on the most sensitive subjects.',
          },
          {
            question: 'Where does this phase fit in the overall curriculum?',
            answer:
              'Contemporary Issues follows the personal formation phase and precedes the capstone experiences. By this point, you have the biblical, theological, pastoral, and leadership foundations needed to engage complex cultural questions with maturity. The capstone phases that follow allow you to synthesize and apply everything you have learned.',
          },
        ],
      },
    },

    // =====================================================================
    // Phase 9: Bringing It Together
    // =====================================================================
    {
      id: 'past-p9',
      title: 'Bringing It Together',
      description:
        'Practical and spiritual experiences that bring together everything you have learned and prepare you for the fullness of ministry.',
      modules: [
        // ----- Module 1: Academic Capstones -----
        {
          id: 'past-p9-m1',
          title: 'Academic Capstones',
          description:
            'Major academic projects that integrate theological and practical learning, including research papers, comprehensive exams, and thesis work.',
          sections: [
            {
              id: 'past-p9-m1-s1',
              title: 'Academic Capstones',
              lessons: [
                {
                  id: 'past-9-1-1-1',
                  title: 'Pastoral Theology Integration Paper',
                  description:
                    'Synthesizing theological and practical learning',
                },
                {
                  id: 'past-9-1-1-2',
                  title: 'Exegetical Project',
                  description:
                    'Major research paper on a biblical book or passage',
                },
                {
                  id: 'past-9-1-1-3',
                  title: 'Ministry Philosophy Development',
                  description:
                    'Articulating your approach to pastoral leadership',
                },
                {
                  id: 'past-9-1-1-4',
                  title: 'Comprehensive Examinations',
                  description:
                    'Demonstrating mastery of core disciplines',
                },
                {
                  id: 'past-9-1-1-5',
                  title: 'Thesis or Doctoral Project',
                  description:
                    'Original research contributing to the field',
                },
              ],
            },
          ],
        },

        // ----- Module 2: Practical Capstones -----
        {
          id: 'past-p9-m2',
          title: 'Practical Capstones',
          description:
            'Hands-on ministry experiences including internships, residencies, clinical pastoral education, and cross-cultural immersion.',
          sections: [
            {
              id: 'past-p9-m2-s1',
              title: 'Practical Capstones',
              lessons: [
                {
                  id: 'past-9-2-1-1',
                  title: 'Supervised Ministry Internship',
                  description:
                    'Extended field experience with mentorship',
                },
                {
                  id: 'past-9-2-1-2',
                  title: 'Clinical Pastoral Education (CPE)',
                  description:
                    'Hospital-based pastoral training',
                },
                {
                  id: 'past-9-2-1-3',
                  title: 'Church Residency',
                  description:
                    'One to two years embedded in a local church',
                },
                {
                  id: 'past-9-2-1-4',
                  title: 'Church Planting Practicum',
                  description:
                    'Hands-on experience launching a new congregation',
                },
                {
                  id: 'past-9-2-1-5',
                  title: 'Preaching Intensive',
                  description:
                    'Extended feedback and development as a preacher',
                },
                {
                  id: 'past-9-2-1-6',
                  title: 'Cross-Cultural Immersion',
                  description:
                    'Extended experience in a different cultural context',
                },
              ],
            },
          ],
        },

        // ----- Module 3: Spiritual Capstones -----
        {
          id: 'past-p9-m3',
          title: 'Spiritual Capstones',
          description:
            'Intensive spiritual formation experiences including retreats, pilgrimage, sabbatical planning, and developing a personal rule of life.',
          sections: [
            {
              id: 'past-p9-m3-s1',
              title: 'Spiritual Capstones',
              lessons: [
                {
                  id: 'past-9-3-1-1',
                  title: 'Extended Retreat',
                  description:
                    'Week-long spiritual formation experience',
                },
                {
                  id: 'past-9-3-1-2',
                  title: 'Pilgrimage',
                  description:
                    'Traveling to sites of historical and spiritual significance',
                },
                {
                  id: 'past-9-3-1-3',
                  title: 'Sabbatical Planning',
                  description:
                    'Designing future rhythms of rest and renewal',
                },
                {
                  id: 'past-9-3-1-4',
                  title: 'Spiritual Direction Intensive',
                  description:
                    'Deepening the contemplative dimension of ministry',
                },
                {
                  id: 'past-9-3-1-5',
                  title: 'Rule of Life Development',
                  description:
                    'Creating a sustainable plan for spiritual health',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'This phase is the culminating experience of your pastoral training, designed to integrate everything you have studied into a coherent and deeply personal preparation for ministry. Academic capstones challenge you to produce substantive written work — a pastoral theology integration paper, an exegetical project, a ministry philosophy statement, comprehensive examinations, and potentially a thesis or doctoral project — that demonstrates mastery across the disciplines. Practical capstones move you from the classroom into the field through supervised internships, clinical pastoral education, church residencies, church planting practicums, preaching intensives, and cross-cultural immersion experiences. Spiritual capstones ensure that your formation as a person keeps pace with your formation as a professional, through extended retreats, pilgrimage, sabbatical planning, spiritual direction, and the development of a sustainable rule of life. Together, these experiences confirm your readiness and deepen your confidence as you step into the fullness of pastoral calling.',
        expectations: [
          'Complete major academic projects that synthesize your biblical, theological, and practical learning',
          'Gain supervised, hands-on ministry experience through internships, residencies, or church planting practicums',
          'Develop your preaching further through an intensive feedback-driven practicum',
          'Engage in extended spiritual formation experiences such as retreats, pilgrimage, and spiritual direction',
          'Articulate a clear, personal ministry philosophy that reflects your theology, gifts, and calling',
          'Create a sustainable rule of life and sabbatical plan that will sustain your ministry for decades to come',
        ],
        skillLevel: 'Advanced',
        faq: [
          {
            question: 'Do I need to complete all previous phases before beginning this one?',
            answer:
              'Yes. The capstone phase is designed to integrate and demonstrate mastery of the material from Phases 1 through 8. Attempting this phase without that foundation would undermine the depth and cohesion these culminating experiences are meant to provide.',
          },
          {
            question: 'How much time should I expect to invest in the capstone phase?',
            answer:
              'This varies significantly depending on which capstone experiences you pursue. Academic projects may take several weeks of concentrated writing, while a church residency or clinical pastoral education placement may span an entire year. Plan this phase in close consultation with a mentor or advisor.',
          },
          {
            question: 'Are the practical capstones required, or can I choose from the options listed?',
            answer:
              'The capstones are presented as a menu of culminating experiences. Your specific path will depend on your calling, context, and goals. At minimum, we recommend completing one academic, one practical, and one spiritual capstone to ensure a well-rounded preparation for ministry.',
          },
          {
            question: 'How does this phase prepare me for what comes next?',
            answer:
              'Bringing It Together bridges your training and your vocation. The academic work sharpens your thinking, the practical work tests your readiness, and the spiritual work anchors your identity. Upon completion you are prepared either to enter full-time pastoral ministry or to continue growing through the Continuing Growth phase.',
          },
        ],
      },
    },

    // =====================================================================
    // Phase 10: Continuing Growth
    // =====================================================================
    {
      id: 'past-p10',
      title: 'Continuing Growth',
      description:
        'Ongoing growth paths for established pastors, ministry specialists, and lay leaders.',
      modules: [
        // ----- Module 1: For Established Pastors -----
        {
          id: 'past-p10-m1',
          title: 'For Established Pastors',
          description:
            'Advanced development opportunities for experienced pastors seeking to deepen their skills and broaden their impact.',
          sections: [
            {
              id: 'past-p10-m1-s1',
              title: 'For Established Pastors',
              lessons: [
                {
                  id: 'past-10-1-1-1',
                  title: 'Advanced Preaching',
                  description:
                    'Refining skills for experienced preachers',
                },
                {
                  id: 'past-10-1-1-2',
                  title: 'Pastoral Renewal',
                  description:
                    'Refreshment and recalibration mid-career',
                },
                {
                  id: 'past-10-1-1-3',
                  title: 'Leadership at Scale',
                  description:
                    'Growing as leader of a growing church',
                },
                {
                  id: 'past-10-1-1-4',
                  title: 'Navigating Conflict',
                  description:
                    'Advanced skills for church disputes',
                },
                {
                  id: 'past-10-1-1-5',
                  title: 'Coaching and Consulting',
                  description:
                    'Helping other pastors and churches',
                },
                {
                  id: 'past-10-1-1-6',
                  title: 'Writing for Publication',
                  description:
                    'Communicating beyond the pulpit',
                },
                {
                  id: 'past-10-1-1-7',
                  title: 'Doctoral Studies',
                  description:
                    'D.Min., Ph.D., or Th.D. programs',
                },
              ],
            },
          ],
        },

        // ----- Module 2: For Ministry Specialists -----
        {
          id: 'past-p10-m2',
          title: 'For Ministry Specialists',
          description:
            'Targeted training for those serving in specialized ministry roles such as executive pastor, worship pastor, missions pastor, and more.',
          sections: [
            {
              id: 'past-p10-m2-s1',
              title: 'For Ministry Specialists',
              lessons: [
                {
                  id: 'past-10-2-1-1',
                  title: 'Executive Pastor Development',
                  description:
                    'Leading operations and administration',
                },
                {
                  id: 'past-10-2-1-2',
                  title: 'Worship Pastor Development',
                  description:
                    'Leading the worship ministry',
                },
                {
                  id: 'past-10-2-1-3',
                  title: 'Children\'s and Youth Ministry Leadership',
                  description:
                    'Advanced training for specialists',
                },
                {
                  id: 'past-10-2-1-4',
                  title: 'Missions Pastor Development',
                  description:
                    'Mobilizing the church for global impact',
                },
                {
                  id: 'past-10-2-1-5',
                  title: 'Counseling Certification',
                  description:
                    'Additional credentials for pastoral counselors',
                },
                {
                  id: 'past-10-2-1-6',
                  title: 'Nonprofit Leadership',
                  description:
                    'Leading parachurch organizations',
                },
              ],
            },
          ],
        },

        // ----- Module 3: For Bivocational and Lay Leaders -----
        {
          id: 'past-p10-m3',
          title: 'For Bivocational and Lay Leaders',
          description:
            'Essential training for those serving in ministry while maintaining other vocations, or leading as lay officers and volunteers.',
          sections: [
            {
              id: 'past-p10-m3-s1',
              title: 'For Bivocational and Lay Leaders',
              lessons: [
                {
                  id: 'past-10-3-1-1',
                  title: 'Bivocational Ministry',
                  description:
                    'Thriving with dual callings',
                },
                {
                  id: 'past-10-3-1-2',
                  title: 'Lay Preaching',
                  description:
                    'Training for non-ordained preachers',
                },
                {
                  id: 'past-10-3-1-3',
                  title: 'Elder and Deacon Training',
                  description:
                    'Equipping church officers',
                },
                {
                  id: 'past-10-3-1-4',
                  title: 'Small Group Leadership',
                  description:
                    'Leading community effectively',
                },
                {
                  id: 'past-10-3-1-5',
                  title: 'Ministry Team Leadership',
                  description:
                    'Heading up church ministries as a volunteer',
                },
              ],
            },
          ],
        },
      ],
      overview: {
        overviewDescription:
          'This phase recognizes that pastoral development is a lifelong endeavor that does not end with formal training. Whether you are an established pastor looking to sharpen your skills, a ministry specialist seeking targeted development, or a bivocational or lay leader serving with limited formal education, this phase provides tailored growth paths to meet you where you are. Established pastors can pursue advanced preaching, leadership at scale, pastoral renewal, conflict navigation, coaching, writing, and doctoral-level studies. Ministry specialists — executive pastors, worship pastors, missions directors, children\'s and youth leaders, counselors, and nonprofit executives — will find focused training for their unique roles. Bivocational and lay leaders gain access to practical modules on preaching, elder and deacon service, small group leadership, and volunteer ministry management. The goal is continued faithfulness, fruitfulness, and joy in whatever sphere of service God has placed you.',
        expectations: [
          'Access advanced development tracks tailored to your current ministry role and career stage',
          'Refine your preaching, leadership, and counseling skills through focused, experienced-level training',
          'Explore doctoral and publishing pathways for pastors seeking academic or literary contributions',
          'Gain specialized training for roles such as executive pastor, worship pastor, missions director, or counselor',
          'Equip bivocational pastors and lay leaders with practical, accessible ministry skills',
          'Develop a lifelong learning plan that sustains growth, prevents stagnation, and keeps your ministry fresh',
        ],
        skillLevel: 'Advanced',
        faq: [
          {
            question: 'Do I need to complete the entire curriculum before accessing this phase?',
            answer:
              'Not necessarily. While the earlier phases provide the comprehensive foundation, Continuing Growth is designed to be accessible to pastors and leaders at various stages. Established pastors with years of experience may find this phase immediately relevant even if they have not worked through every preceding module.',
          },
          {
            question: 'How much time does this phase require?',
            answer:
              'This phase is open-ended by design. You might spend a few weeks on a single module or engage with its content over years as your ministry evolves. The key is to return to it regularly as new challenges and opportunities arise in your leadership journey.',
          },
          {
            question: 'Is there content here for non-pastoral leaders like elders, deacons, or small group leaders?',
            answer:
              'Yes. The bivocational and lay leaders module specifically addresses elder and deacon training, lay preaching, small group leadership, and volunteer ministry management. This makes the phase valuable not only for ordained ministers but for the broader leadership team of any church.',
          },
          {
            question: 'How does this phase relate to the rest of the Pastoral Ministry and Leadership curriculum?',
            answer:
              'Continuing Growth is the capstone of a lifelong learning posture. It builds on everything from Phases 1 through 9 and provides the framework for sustained development beyond formal training. Think of it as the phase you never truly finish — a companion for every season of your ministry career.',
          },
        ],
      },
    },
  ],
};
