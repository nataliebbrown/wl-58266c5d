import { Curriculum } from '@/types/curriculum';

export const deeperWalkCurriculum: Curriculum = {
  id: 'deeper-walk',
  title: 'The Deeper Walk',
  description:
    'A comprehensive program for established believers seeking to deepen their relationship with Christ, expand their biblical knowledge, and grow in spiritual maturity. This curriculum bridges the gap between foundational discipleship and formal seminary training.',
  personaIntro:
    'Welcome to The Deeper Walk. You have laid the foundation of faith, and now you are ready to go further — deeper into Scripture, closer to Christ, and more fully formed in His image.',
  learningApproach:
    'This curriculum can be pursued sequentially, simultaneously across tracks, or selectively based on your areas of greatest need. Every doctrine learned should lead to deeper worship, and every discipline practiced should produce more of the Spirit\'s fruit.',
  phases: [
    // =========================================================
    // Phase 1: Track One — Intimate Knowledge of God
    // =========================================================
    {
      id: 'deep-p1',
      title: 'Track One: Intimate Knowledge of God',
      description:
        'A deep exploration of who God is — Father, Son, and Holy Spirit — moving from theological understanding to intimate, experiential knowledge.',
      modules: [
        // Module 1: The Nature and Character of God
        {
          id: 'deep-p1-m1',
          title: 'The Nature and Character of God',
          description:
            'Systematic study of God\'s attributes, names, and essential character as revealed throughout Scripture.',
          sections: [
            {
              id: 'deep-p1-m1-s1',
              title: 'The Nature and Character of God',
              lessons: [
                {
                  id: 'deep-1-1-1-1',
                  title: 'The Attributes of God',
                  description:
                    'Systematic study of who God is: holiness, sovereignty, omniscience, love, justice, mercy, and more',
                },
                {
                  id: 'deep-1-1-1-2',
                  title: 'The Names of God',
                  description:
                    'Hebrew and Greek names revealing God\'s character throughout Scripture',
                },
                {
                  id: 'deep-1-1-1-3',
                  title: 'The Holiness of God',
                  description:
                    'Understanding God\'s transcendence and our response',
                },
                {
                  id: 'deep-1-1-1-4',
                  title: 'The Sovereignty of God',
                  description:
                    'Divine providence, human responsibility, and trusting God\'s plan',
                },
                {
                  id: 'deep-1-1-1-5',
                  title: 'The Love of God',
                  description:
                    'The breadth, depth, and implications of divine love',
                },
                {
                  id: 'deep-1-1-1-6',
                  title: 'The Wrath of God',
                  description:
                    'A neglected attribute and its place in biblical theology',
                },
                {
                  id: 'deep-1-1-1-7',
                  title: 'God as Creator and Sustainer',
                  description:
                    'Theology of creation and ongoing providence',
                },
              ],
            },
          ],
        },
        // Module 2: Deepening Your Life with Christ
        {
          id: 'deep-p1-m2',
          title: 'Deepening Your Life with Christ',
          description:
            'An in-depth study of the person and work of Jesus Christ, moving from doctrinal understanding to lived experience of union with Him.',
          sections: [
            {
              id: 'deep-p1-m2-s1',
              title: 'Deepening Your Life with Christ',
              lessons: [
                {
                  id: 'deep-1-2-1-1',
                  title: 'The Person of Christ',
                  description:
                    'Fully God and fully man: the hypostatic union explored',
                },
                {
                  id: 'deep-1-2-1-2',
                  title: 'The Offices of Christ',
                  description: 'Prophet, Priest, and King',
                },
                {
                  id: 'deep-1-2-1-3',
                  title: 'Christ in the Old Testament',
                  description:
                    'Typology, prophecy, and Christophanies',
                },
                {
                  id: 'deep-1-2-1-4',
                  title: 'The Atonement: Theories and Theology',
                  description:
                    'How Christ\'s death saves: ransom, substitution, satisfaction, and more',
                },
                {
                  id: 'deep-1-2-1-5',
                  title: 'Union with Christ',
                  description:
                    'The believer\'s mystical and vital connection to Jesus',
                },
                {
                  id: 'deep-1-2-1-6',
                  title: 'Abiding in Christ',
                  description:
                    'Moving from theology to lived experience (John 15)',
                },
                {
                  id: 'deep-1-2-1-7',
                  title: 'The Supremacy of Christ',
                  description:
                    'Jesus as Lord over all creation and every area of life',
                },
              ],
            },
          ],
        },
        // Module 3: Life in the Spirit
        {
          id: 'deep-p1-m3',
          title: 'Life in the Spirit',
          description:
            'Understanding the person and work of the Holy Spirit, and learning to walk daily in His power and guidance.',
          sections: [
            {
              id: 'deep-p1-m3-s1',
              title: 'Life in the Spirit',
              lessons: [
                {
                  id: 'deep-1-3-1-1',
                  title: 'The Person of the Holy Spirit',
                  description:
                    'Identity, deity, and personhood',
                },
                {
                  id: 'deep-1-3-1-2',
                  title: 'The Work of the Holy Spirit',
                  description:
                    'Conviction, regeneration, sanctification, empowerment',
                },
                {
                  id: 'deep-1-3-1-3',
                  title: 'Walking in the Spirit',
                  description:
                    'Daily dependence and sensitivity to the Spirit\'s leading',
                },
                {
                  id: 'deep-1-3-1-4',
                  title: 'The Gifts of the Spirit',
                  description:
                    'Understanding, discovering, and exercising spiritual gifts',
                },
                {
                  id: 'deep-1-3-1-5',
                  title: 'The Fruit of the Spirit: In-Depth',
                  description:
                    'Character formation through the Spirit\'s work',
                },
                {
                  id: 'deep-1-3-1-6',
                  title: 'The Spirit and Prayer',
                  description:
                    'Praying in and through the Holy Spirit',
                },
                {
                  id: 'deep-1-3-1-7',
                  title: 'Discerning the Spirit\'s Voice',
                  description:
                    'Guidance, wisdom, and avoiding deception',
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================
    // Phase 2: Track Two — Mastering the Scriptures
    // =========================================================
    {
      id: 'deep-p2',
      title: 'Track Two: Mastering the Scriptures',
      description:
        'A comprehensive study of both Old and New Testaments, along with essential Bible study methods and tools for lifelong engagement with God\'s Word.',
      modules: [
        // Module 1: Old Testament Studies
        {
          id: 'deep-p2-m1',
          title: 'Old Testament Studies',
          description:
            'A thorough journey through the Old Testament, covering the Pentateuch, Historical Books, Wisdom Literature, Prophets, and Old Testament theology.',
          sections: [
            // Section 1: Pentateuch (Torah)
            {
              id: 'deep-p2-m1-s1',
              title: 'Pentateuch (Torah)',
              lessons: [
                {
                  id: 'deep-2-1-1-1',
                  title: 'Genesis: Creation, Fall, and Promise',
                  description: 'Foundations of biblical theology',
                },
                {
                  id: 'deep-2-1-1-2',
                  title: 'Exodus: Redemption and Covenant',
                  description: 'Deliverance, law, and tabernacle',
                },
                {
                  id: 'deep-2-1-1-3',
                  title: 'Leviticus: Holiness and Sacrifice',
                  description:
                    'The sacrificial system and its fulfillment in Christ',
                },
                {
                  id: 'deep-2-1-1-4',
                  title: 'Numbers: Wilderness Wanderings',
                  description:
                    'Faith, failure, and God\'s faithfulness',
                },
                {
                  id: 'deep-2-1-1-5',
                  title: 'Deuteronomy: Covenant Renewal',
                  description:
                    'Moses\' final sermons and the heart of the law',
                },
              ],
            },
            // Section 2: Historical Books
            {
              id: 'deep-p2-m1-s2',
              title: 'Historical Books',
              lessons: [
                {
                  id: 'deep-2-1-2-1',
                  title: 'Joshua and Judges',
                  description:
                    'Conquest, cycles, and the need for a king',
                },
                {
                  id: 'deep-2-1-2-2',
                  title: 'Ruth and Esther',
                  description:
                    'Providence, redemption, and women in God\'s story',
                },
                {
                  id: 'deep-2-1-2-3',
                  title: '1 & 2 Samuel',
                  description:
                    'The rise of kingship and the heart of David',
                },
                {
                  id: 'deep-2-1-2-4',
                  title: '1 & 2 Kings',
                  description:
                    'The divided kingdom and prophetic witness',
                },
                {
                  id: 'deep-2-1-2-5',
                  title: '1 & 2 Chronicles',
                  description:
                    'Retelling history with theological purpose',
                },
                {
                  id: 'deep-2-1-2-6',
                  title: 'Ezra, Nehemiah, and the Return',
                  description:
                    'Restoration, reform, and rebuilding',
                },
              ],
            },
            // Section 3: Wisdom Literature
            {
              id: 'deep-p2-m1-s3',
              title: 'Wisdom Literature',
              lessons: [
                {
                  id: 'deep-2-1-3-1',
                  title: 'Job: Suffering and the Sovereignty of God',
                  description: 'Wrestling with theodicy',
                },
                {
                  id: 'deep-2-1-3-2',
                  title: 'Psalms: The Prayer Book of the Bible',
                  description:
                    'Genres, theology, and devotional use',
                },
                {
                  id: 'deep-2-1-3-3',
                  title: 'Proverbs: The Art of Skillful Living',
                  description: 'Wisdom for everyday decisions',
                },
                {
                  id: 'deep-2-1-3-4',
                  title: 'Ecclesiastes: Meaning Under the Sun',
                  description:
                    'Vanity, purpose, and fearing God',
                },
                {
                  id: 'deep-2-1-3-5',
                  title: 'Song of Solomon: Love, Marriage, and Divine Romance',
                  description: 'Interpretation and application',
                },
              ],
            },
            // Section 4: Prophetic Books
            {
              id: 'deep-p2-m1-s4',
              title: 'Prophetic Books',
              lessons: [
                {
                  id: 'deep-2-1-4-1',
                  title: 'Isaiah: The Gospel Prophet',
                  description:
                    'Judgment, comfort, and the Servant Songs',
                },
                {
                  id: 'deep-2-1-4-2',
                  title: 'Jeremiah and Lamentations',
                  description:
                    'The weeping prophet and covenant faithfulness',
                },
                {
                  id: 'deep-2-1-4-3',
                  title: 'Ezekiel: Visions of God\'s Glory',
                  description:
                    'Judgment, restoration, and the new temple',
                },
                {
                  id: 'deep-2-1-4-4',
                  title: 'Daniel: Faithfulness in Exile',
                  description:
                    'Apocalyptic literature and kingdom hope',
                },
                {
                  id: 'deep-2-1-4-5',
                  title: 'The Twelve Minor Prophets',
                  description:
                    'Message and relevance of each prophet',
                },
              ],
            },
            // Section 5: Old Testament Theology
            {
              id: 'deep-p2-m1-s5',
              title: 'Old Testament Theology',
              lessons: [
                {
                  id: 'deep-2-1-5-1',
                  title: 'Covenant Theology',
                  description:
                    'The unifying thread of Scripture from Adam to Christ',
                },
                {
                  id: 'deep-2-1-5-2',
                  title: 'The Messianic Hope',
                  description:
                    'Tracing the promise of the coming King',
                },
                {
                  id: 'deep-2-1-5-3',
                  title: 'Old Testament Ethics',
                  description:
                    'Applying ancient law to modern life',
                },
                {
                  id: 'deep-2-1-5-4',
                  title: 'Typology and the Old Testament',
                  description: 'Shadows pointing to Christ',
                },
              ],
            },
          ],
        },
        // Module 2: New Testament Studies
        {
          id: 'deep-p2-m2',
          title: 'New Testament Studies',
          description:
            'A comprehensive study of the New Testament, from the Gospels through the Epistles to Revelation, including the theology of the early church.',
          sections: [
            // Section 1: The Gospels
            {
              id: 'deep-p2-m2-s1',
              title: 'The Gospels',
              lessons: [
                {
                  id: 'deep-2-2-1-1',
                  title: 'Matthew: The King and His Kingdom',
                  description: 'Jesus as Messiah to Israel',
                },
                {
                  id: 'deep-2-2-1-2',
                  title: 'Mark: The Suffering Servant',
                  description:
                    'Action, discipleship, and the cross',
                },
                {
                  id: 'deep-2-2-1-3',
                  title: 'Luke: The Savior for All People',
                  description:
                    'Compassion, outcasts, and the Spirit',
                },
                {
                  id: 'deep-2-2-1-4',
                  title: 'John: The Word Made Flesh',
                  description:
                    'Signs, discourses, and believing',
                },
                {
                  id: 'deep-2-2-1-5',
                  title: 'Harmony of the Gospels',
                  description: 'Integrating the four accounts',
                },
                {
                  id: 'deep-2-2-1-6',
                  title: 'The Parables of Jesus: In-Depth',
                  description:
                    'Interpretation and kingdom implications',
                },
                {
                  id: 'deep-2-2-1-7',
                  title: 'The Miracles of Jesus',
                  description:
                    'Meaning, purpose, and theological significance',
                },
                {
                  id: 'deep-2-2-1-8',
                  title: 'The Passion Narratives',
                  description:
                    'Detailed study of the final week',
                },
              ],
            },
            // Section 2: Acts and Early Church
            {
              id: 'deep-p2-m2-s2',
              title: 'Acts and Early Church',
              lessons: [
                {
                  id: 'deep-2-2-2-1',
                  title: 'Acts: The Continuing Work of Christ',
                  description: 'Spirit-empowered expansion',
                },
                {
                  id: 'deep-2-2-2-2',
                  title: 'The Apostolic Fathers',
                  description:
                    'Writings of the generation after the apostles',
                },
                {
                  id: 'deep-2-2-2-3',
                  title: 'Early Church Life and Practice',
                  description:
                    'Worship, community, and mission in the first centuries',
                },
              ],
            },
            // Section 3: Pauline Epistles
            {
              id: 'deep-p2-m2-s3',
              title: 'Pauline Epistles',
              lessons: [
                {
                  id: 'deep-2-2-3-1',
                  title: 'Romans: The Masterpiece',
                  description: 'In-depth verse-by-verse study',
                },
                {
                  id: 'deep-2-2-3-2',
                  title: '1 Corinthians: Church Problems and Solutions',
                  description:
                    'Unity, gifts, love, and resurrection',
                },
                {
                  id: 'deep-2-2-3-3',
                  title: '2 Corinthians: Strength in Weakness',
                  description:
                    'Apostolic suffering and ministry',
                },
                {
                  id: 'deep-2-2-3-4',
                  title: 'Galatians: Freedom in Christ',
                  description:
                    'Law, grace, and the gospel defended',
                },
                {
                  id: 'deep-2-2-3-5',
                  title: 'Ephesians: The Church in God\'s Plan',
                  description:
                    'Identity, unity, and spiritual warfare',
                },
                {
                  id: 'deep-2-2-3-6',
                  title: 'Philippians: Joy in All Circumstances',
                  description:
                    'Partnership, humility, and contentment',
                },
                {
                  id: 'deep-2-2-3-7',
                  title: 'Colossians: The Supremacy of Christ',
                  description: 'Countering false teaching',
                },
                {
                  id: 'deep-2-2-3-8',
                  title: '1 & 2 Thessalonians: Living in Light of His Return',
                  description: 'Eschatology and daily life',
                },
                {
                  id: 'deep-2-2-3-9',
                  title: 'The Pastoral Epistles',
                  description:
                    '1 & 2 Timothy and Titus: church order and faithful ministry',
                },
                {
                  id: 'deep-2-2-3-10',
                  title: 'Philemon: Reconciliation and Brotherhood',
                  description:
                    'The gospel applied to relationships',
                },
                {
                  id: 'deep-2-2-3-11',
                  title: 'The Theology of Paul',
                  description:
                    'Major themes across the Pauline corpus',
                },
              ],
            },
            // Section 4: General Epistles
            {
              id: 'deep-p2-m2-s4',
              title: 'General Epistles',
              lessons: [
                {
                  id: 'deep-2-2-4-1',
                  title: 'Hebrews: The Superiority of Christ',
                  description:
                    'Old covenant, new covenant, and perseverance',
                },
                {
                  id: 'deep-2-2-4-2',
                  title: 'James: Authentic Faith',
                  description:
                    'Works, wisdom, and the tongue',
                },
                {
                  id: 'deep-2-2-4-3',
                  title: '1 Peter: Hope in Suffering',
                  description:
                    'Identity and perseverance under trial',
                },
                {
                  id: 'deep-2-2-4-4',
                  title: '2 Peter and Jude: Guarding the Faith',
                  description:
                    'False teachers and standing firm',
                },
                {
                  id: 'deep-2-2-4-5',
                  title: '1, 2, 3 John: Fellowship and Assurance',
                  description:
                    'Love, truth, and confidence',
                },
                {
                  id: 'deep-2-2-4-6',
                  title: 'The Theology of the General Epistles',
                  description: 'Themes and integration',
                },
              ],
            },
            // Section 5: Apocalyptic Literature
            {
              id: 'deep-p2-m2-s5',
              title: 'Apocalyptic Literature',
              lessons: [
                {
                  id: 'deep-2-2-5-1',
                  title: 'Revelation: Unveiling the Future',
                  description:
                    'Interpretive approaches and verse-by-verse study',
                },
                {
                  id: 'deep-2-2-5-2',
                  title: 'Old Testament Apocalyptic',
                  description:
                    'Daniel, Ezekiel, Zechariah and their New Testament connections',
                },
                {
                  id: 'deep-2-2-5-3',
                  title: 'Biblical Eschatology',
                  description:
                    'Comparing millennial views and end-times frameworks',
                },
              ],
            },
          ],
        },
        // Module 3: Bible Study Methods and Tools
        {
          id: 'deep-p2-m3',
          title: 'Bible Study Methods and Tools',
          description:
            'Essential methods and tools for studying the Bible with skill and depth, from inductive study to original languages.',
          sections: [
            {
              id: 'deep-p2-m3-s1',
              title: 'Bible Study Methods and Tools',
              lessons: [
                {
                  id: 'deep-2-3-1-1',
                  title: 'Inductive Bible Study',
                  description:
                    'Observation, interpretation, and application',
                },
                {
                  id: 'deep-2-3-1-2',
                  title: 'Word Studies',
                  description:
                    'Using concordances, lexicons, and original languages',
                },
                {
                  id: 'deep-2-3-1-3',
                  title: 'Historical-Cultural Background',
                  description:
                    'Context that illuminates meaning',
                },
                {
                  id: 'deep-2-3-1-4',
                  title: 'Literary Analysis',
                  description:
                    'Genre, structure, and rhetorical devices',
                },
                {
                  id: 'deep-2-3-1-5',
                  title: 'Theological Interpretation',
                  description:
                    'Reading Scripture as unified divine revelation',
                },
                {
                  id: 'deep-2-3-1-6',
                  title: 'Devotional Reading vs. Study',
                  description: 'Balancing head and heart',
                },
                {
                  id: 'deep-2-3-1-7',
                  title: 'Teaching the Bible to Others',
                  description:
                    'Preparing and presenting biblical content',
                },
                {
                  id: 'deep-2-3-1-8',
                  title: 'Introduction to Biblical Languages',
                  description:
                    'Hebrew and Greek for the non-specialist',
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================
    // Phase 3: Track Three — Theological Depth
    // =========================================================
    {
      id: 'deep-p3',
      title: 'Track Three: Theological Depth',
      description:
        'A rigorous study of systematic theology, historical theology, apologetics, and worldview, building a robust theological framework for faith and life.',
      modules: [
        // Module 1: Systematic Theology
        {
          id: 'deep-p3-m1',
          title: 'Systematic Theology',
          description:
            'A comprehensive survey of the major doctrines of the Christian faith, from the doctrine of Scripture through eschatology.',
          sections: [
            {
              id: 'deep-p3-m1-s1',
              title: 'Systematic Theology',
              lessons: [
                {
                  id: 'deep-3-1-1-1',
                  title: 'Prolegomena',
                  description:
                    'How we know what we know about God',
                },
                {
                  id: 'deep-3-1-1-2',
                  title: 'Bibliology',
                  description:
                    'The doctrine of Scripture: inspiration, authority, inerrancy, sufficiency',
                },
                {
                  id: 'deep-3-1-1-3',
                  title: 'Theology Proper',
                  description:
                    'The being and attributes of God',
                },
                {
                  id: 'deep-3-1-1-4',
                  title: 'Trinitarianism',
                  description:
                    'One God in three persons: biblical basis and historical development',
                },
                {
                  id: 'deep-3-1-1-5',
                  title: 'Christology',
                  description:
                    'The person and work of Christ in depth',
                },
                {
                  id: 'deep-3-1-1-6',
                  title: 'Pneumatology',
                  description:
                    'The person and work of the Holy Spirit',
                },
                {
                  id: 'deep-3-1-1-7',
                  title: 'Angelology',
                  description:
                    'Angels, demons, and the unseen realm',
                },
                {
                  id: 'deep-3-1-1-8',
                  title: 'Anthropology',
                  description:
                    'The doctrine of humanity: image of God, constitution, purpose',
                },
                {
                  id: 'deep-3-1-1-9',
                  title: 'Hamartiology',
                  description:
                    'The doctrine of sin: origin, nature, effects, and transmission',
                },
                {
                  id: 'deep-3-1-1-10',
                  title: 'Soteriology',
                  description:
                    'The doctrine of salvation: election, calling, regeneration, justification, sanctification, glorification',
                },
                {
                  id: 'deep-3-1-1-11',
                  title: 'Ecclesiology',
                  description:
                    'The doctrine of the church: nature, mission, ordinances, government',
                },
                {
                  id: 'deep-3-1-1-12',
                  title: 'Eschatology',
                  description:
                    'The doctrine of last things: death, intermediate state, resurrection, judgment, heaven, hell, new creation',
                },
              ],
            },
          ],
        },
        // Module 2: Historical Theology
        {
          id: 'deep-p3-m2',
          title: 'Historical Theology',
          description:
            'Tracing the development of Christian doctrine from the early church through the modern era and across the globe.',
          sections: [
            {
              id: 'deep-p3-m2-s1',
              title: 'Historical Theology',
              lessons: [
                {
                  id: 'deep-3-2-1-1',
                  title: 'The Early Church (100\u2013500 AD)',
                  description:
                    'Fathers, councils, and creedal development',
                },
                {
                  id: 'deep-3-2-1-2',
                  title: 'The Medieval Church (500\u20131500 AD)',
                  description:
                    'Monasticism, scholasticism, and pre-Reformation movements',
                },
                {
                  id: 'deep-3-2-1-3',
                  title: 'The Reformation (1500\u20131600)',
                  description:
                    'Luther, Calvin, Zwingli, Anabaptists, and the Catholic response',
                },
                {
                  id: 'deep-3-2-1-4',
                  title: 'Post-Reformation and Puritanism',
                  description:
                    'Confessional development and experiential piety',
                },
                {
                  id: 'deep-3-2-1-5',
                  title: 'Modern Theology (1700\u2013present)',
                  description:
                    'Enlightenment, liberalism, fundamentalism, and contemporary movements',
                },
                {
                  id: 'deep-3-2-1-6',
                  title: 'Global Christianity',
                  description:
                    'The church in Africa, Asia, Latin America, and the Global South',
                },
              ],
            },
          ],
        },
        // Module 3: Apologetics and Worldview
        {
          id: 'deep-p3-m3',
          title: 'Apologetics and Worldview',
          description:
            'Equipping believers to defend the faith, engage competing worldviews, and address the toughest questions about Christianity.',
          sections: [
            {
              id: 'deep-p3-m3-s1',
              title: 'Apologetics and Worldview',
              lessons: [
                {
                  id: 'deep-3-3-1-1',
                  title: 'Classical Apologetics',
                  description:
                    'Arguments for God\'s existence and the truth of Christianity',
                },
                {
                  id: 'deep-3-3-1-2',
                  title: 'Presuppositional Apologetics',
                  description:
                    'Worldview foundations and the impossibility of the contrary',
                },
                {
                  id: 'deep-3-3-1-3',
                  title: 'Evidential Apologetics',
                  description:
                    'Historical and scientific evidence for the faith',
                },
                {
                  id: 'deep-3-3-1-4',
                  title: 'The Problem of Evil',
                  description:
                    'Theodicy and the goodness of God',
                },
                {
                  id: 'deep-3-3-1-5',
                  title: 'Faith and Science',
                  description:
                    'Creation, evolution, and the integration of knowledge',
                },
                {
                  id: 'deep-3-3-1-6',
                  title: 'Christianity and Culture',
                  description:
                    'Engaging art, media, politics, and society',
                },
                {
                  id: 'deep-3-3-1-7',
                  title: 'Comparative Worldviews',
                  description:
                    'Naturalism, postmodernism, Eastern thought, and secularism',
                },
                {
                  id: 'deep-3-3-1-8',
                  title: 'World Religions',
                  description:
                    'Islam, Judaism, Hinduism, Buddhism, and new religious movements',
                },
                {
                  id: 'deep-3-3-1-9',
                  title: 'Cults and Aberrant Movements',
                  description:
                    'Identifying and responding to false teaching',
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================
    // Phase 4: Track Four — Spiritual Formation and Transformation
    // =========================================================
    {
      id: 'deep-p4',
      title: 'Track Four: Spiritual Formation and Transformation',
      description:
        'Focused on the interior life, advanced spiritual disciplines, character formation, and the ongoing process of sanctification and holiness.',
      modules: [
        // Module 1: The Interior Life
        {
          id: 'deep-p4-m1',
          title: 'The Interior Life',
          description:
            'Exploring the soul\'s journey, honest self-examination, and the cultivation of deep desire for God.',
          sections: [
            {
              id: 'deep-p4-m1-s1',
              title: 'The Interior Life',
              lessons: [
                {
                  id: 'deep-4-1-1-1',
                  title: 'The Soul\'s Journey',
                  description:
                    'Stages of spiritual growth and development',
                },
                {
                  id: 'deep-4-1-1-2',
                  title: 'Self-Examination and Spiritual Inventory',
                  description:
                    'Honest assessment before God',
                },
                {
                  id: 'deep-4-1-1-3',
                  title: 'Dealing with Besetting Sins',
                  description:
                    'Strategies for lasting change',
                },
                {
                  id: 'deep-4-1-1-4',
                  title: 'Healing from the Past',
                  description:
                    'Addressing wounds, trauma, and strongholds',
                },
                {
                  id: 'deep-4-1-1-5',
                  title: 'The Dark Night of the Soul',
                  description:
                    'Seasons of spiritual dryness and their purpose',
                },
                {
                  id: 'deep-4-1-1-6',
                  title: 'Cultivating Desire for God',
                  description: 'Rekindling holy longing',
                },
                {
                  id: 'deep-4-1-1-7',
                  title: 'Living from the Heart',
                  description:
                    'Integrating emotion, will, and intellect in spiritual life',
                },
              ],
            },
          ],
        },
        // Module 2: Advanced Spiritual Disciplines
        {
          id: 'deep-p4-m2',
          title: 'Advanced Spiritual Disciplines',
          description:
            'Deepening the practice of spiritual disciplines including contemplative prayer, lectio divina, fasting, and spiritual direction.',
          sections: [
            {
              id: 'deep-p4-m2-s1',
              title: 'Advanced Spiritual Disciplines',
              lessons: [
                {
                  id: 'deep-4-2-1-1',
                  title: 'Contemplative Prayer',
                  description:
                    'Listening, waiting, and resting in God\'s presence',
                },
                {
                  id: 'deep-4-2-1-2',
                  title: 'Lectio Divina',
                  description: 'Sacred reading of Scripture',
                },
                {
                  id: 'deep-4-2-1-3',
                  title: 'Extended Silence and Solitude',
                  description:
                    'Retreating to encounter God',
                },
                {
                  id: 'deep-4-2-1-4',
                  title: 'Fasting: Advanced Practice',
                  description:
                    'Extended fasts and their spiritual purpose',
                },
                {
                  id: 'deep-4-2-1-5',
                  title: 'The Examen',
                  description:
                    'Daily review of life with God',
                },
                {
                  id: 'deep-4-2-1-6',
                  title: 'Rule of Life',
                  description:
                    'Creating sustainable rhythms for spiritual growth',
                },
                {
                  id: 'deep-4-2-1-7',
                  title: 'Journaling for Transformation',
                  description:
                    'Reflective writing as a spiritual tool',
                },
                {
                  id: 'deep-4-2-1-8',
                  title: 'Practicing the Presence of God',
                  description:
                    'Brother Lawrence and continuous communion',
                },
                {
                  id: 'deep-4-2-1-9',
                  title: 'Spiritual Direction',
                  description:
                    'Receiving and eventually giving guidance to others',
                },
                {
                  id: 'deep-4-2-1-10',
                  title: 'Corporate Spiritual Disciplines',
                  description:
                    'Confession, worship, celebration, and service together',
                },
              ],
            },
          ],
        },
        // Module 3: Character Formation
        {
          id: 'deep-p4-m3',
          title: 'Character Formation',
          description:
            'Cultivating Christlike character through the study and practice of the Beatitudes, virtues, and the fruit of the Spirit.',
          sections: [
            {
              id: 'deep-p4-m3-s1',
              title: 'Character Formation',
              lessons: [
                {
                  id: 'deep-4-3-1-1',
                  title: 'The Beatitudes: Life in the Kingdom',
                  description:
                    'In-depth study and application',
                },
                {
                  id: 'deep-4-3-1-2',
                  title: 'Humility: The Foundation of All Virtue',
                  description:
                    'Learning from Christ\'s example',
                },
                {
                  id: 'deep-4-3-1-3',
                  title: 'Patience and Long-Suffering',
                  description:
                    'Endurance in a hurried world',
                },
                {
                  id: 'deep-4-3-1-4',
                  title: 'Courage and Boldness',
                  description:
                    'Holy confidence in the face of opposition',
                },
                {
                  id: 'deep-4-3-1-5',
                  title: 'Gentleness and Self-Control',
                  description: 'Strength under control',
                },
                {
                  id: 'deep-4-3-1-6',
                  title: 'Wisdom and Discernment',
                  description:
                    'Developing spiritual judgment',
                },
                {
                  id: 'deep-4-3-1-7',
                  title: 'Integrity and Consistency',
                  description:
                    'Being the same person in every context',
                },
                {
                  id: 'deep-4-3-1-8',
                  title: 'Compassion and Mercy',
                  description:
                    'The heart of God for the broken',
                },
              ],
            },
          ],
        },
        // Module 4: Sanctification and Holiness
        {
          id: 'deep-p4-m4',
          title: 'Sanctification and Holiness',
          description:
            'Understanding the theology and practice of sanctification, from the mortification of sin to persevering faith.',
          sections: [
            {
              id: 'deep-p4-m4-s1',
              title: 'Sanctification and Holiness',
              lessons: [
                {
                  id: 'deep-4-4-1-1',
                  title: 'Theology of Sanctification',
                  description:
                    'Positional, progressive, and ultimate holiness',
                },
                {
                  id: 'deep-4-4-1-2',
                  title: 'The Mortification of Sin',
                  description:
                    'John Owen and the killing of sin',
                },
                {
                  id: 'deep-4-4-1-3',
                  title: 'The Pursuit of Holiness',
                  description:
                    'Practical steps toward Christlikeness',
                },
                {
                  id: 'deep-4-4-1-4',
                  title: 'Living by Faith',
                  description:
                    'Trusting God in everyday circumstances',
                },
                {
                  id: 'deep-4-4-1-5',
                  title: 'The Role of Suffering in Sanctification',
                  description:
                    'Trials as tools for growth',
                },
                {
                  id: 'deep-4-4-1-6',
                  title: 'Perseverance of the Saints',
                  description:
                    'Assurance, security, and faithful endurance',
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================
    // Phase 5: Track Five — Living on Mission
    // =========================================================
    {
      id: 'deep-p5',
      title: 'Track Five: Living on Mission',
      description:
        'Equipping believers for personal evangelism, discipleship and multiplication, the church\'s mission, and integrating faith with vocation and kingdom work.',
      modules: [
        // Module 1: Personal Evangelism
        {
          id: 'deep-p5-m1',
          title: 'Personal Evangelism',
          description:
            'The theology and practice of sharing the gospel, from understanding the lost to effective follow-up and discipleship.',
          sections: [
            {
              id: 'deep-p5-m1-s1',
              title: 'Personal Evangelism',
              lessons: [
                {
                  id: 'deep-5-1-1-1',
                  title: 'The Theology of Evangelism',
                  description:
                    'Why we share and what we share',
                },
                {
                  id: 'deep-5-1-1-2',
                  title: 'Understanding the Lost',
                  description:
                    'The condition and mindset of unbelievers',
                },
                {
                  id: 'deep-5-1-1-3',
                  title: 'Conversational Evangelism',
                  description:
                    'Natural, relational approaches to sharing faith',
                },
                {
                  id: 'deep-5-1-1-4',
                  title: 'Apologetics in Evangelism',
                  description:
                    'Answering questions and removing obstacles',
                },
                {
                  id: 'deep-5-1-1-5',
                  title: 'Sharing Your Testimony',
                  description:
                    'Crafting and communicating your story effectively',
                },
                {
                  id: 'deep-5-1-1-6',
                  title: 'Gospel Presentations',
                  description:
                    'Various methods and frameworks',
                },
                {
                  id: 'deep-5-1-1-7',
                  title: 'Follow-Up and Discipleship',
                  description:
                    'What to do after someone responds',
                },
              ],
            },
          ],
        },
        // Module 2: Discipleship and Multiplication
        {
          id: 'deep-p5-m2',
          title: 'Discipleship and Multiplication',
          description:
            'From the Great Commission to multiplication mindset, learning to invest deeply in others and develop future disciple-makers.',
          sections: [
            {
              id: 'deep-p5-m2-s1',
              title: 'Discipleship and Multiplication',
              lessons: [
                {
                  id: 'deep-5-2-1-1',
                  title: 'The Great Commission Unpacked',
                  description:
                    'Jesus\' mandate for every believer',
                },
                {
                  id: 'deep-5-2-1-2',
                  title: 'One-on-One Discipleship',
                  description:
                    'Investing deeply in another person\'s growth',
                },
                {
                  id: 'deep-5-2-1-3',
                  title: 'Small Group Leadership',
                  description:
                    'Facilitating transformative community',
                },
                {
                  id: 'deep-5-2-1-4',
                  title: 'Developing Leaders',
                  description:
                    'Identifying and investing in future disciple-makers',
                },
                {
                  id: 'deep-5-2-1-5',
                  title: 'Multiplication Mindset',
                  description:
                    'Moving from addition to multiplication',
                },
                {
                  id: 'deep-5-2-1-6',
                  title: 'Mentoring Relationships',
                  description:
                    'Being mentored and mentoring others',
                },
              ],
            },
          ],
        },
        // Module 3: The Church and Its Mission
        {
          id: 'deep-p5-m3',
          title: 'The Church and Its Mission',
          description:
            'Understanding the local church, its health and mission, and engaging in both global and local missions.',
          sections: [
            {
              id: 'deep-p5-m3-s1',
              title: 'The Church and Its Mission',
              lessons: [
                {
                  id: 'deep-5-3-1-1',
                  title: 'Ecclesiology for the Layperson',
                  description:
                    'Understanding the church\'s nature and purpose',
                },
                {
                  id: 'deep-5-3-1-2',
                  title: 'The Local Church and You',
                  description:
                    'Your role in the body of Christ',
                },
                {
                  id: 'deep-5-3-1-3',
                  title: 'Church Health and Revitalization',
                  description:
                    'What makes a church flourish',
                },
                {
                  id: 'deep-5-3-1-4',
                  title: 'Unity and Diversity',
                  description:
                    'Navigating differences within the body',
                },
                {
                  id: 'deep-5-3-1-5',
                  title: 'Church History and Tradition',
                  description:
                    'Learning from those who came before',
                },
                {
                  id: 'deep-5-3-1-6',
                  title: 'Global Missions Awareness',
                  description:
                    'The unreached, the persecuted, and the sending church',
                },
                {
                  id: 'deep-5-3-1-7',
                  title: 'Local Missions and Community Engagement',
                  description:
                    'Serving your neighbors and city',
                },
              ],
            },
          ],
        },
        // Module 4: Vocation and Kingdom Work
        {
          id: 'deep-p5-m4',
          title: 'Vocation and Kingdom Work',
          description:
            'Integrating faith with everyday work, cultural engagement, justice, and the stewardship of influence for God\'s purposes.',
          sections: [
            {
              id: 'deep-p5-m4-s1',
              title: 'Vocation and Kingdom Work',
              lessons: [
                {
                  id: 'deep-5-4-1-1',
                  title: 'Theology of Work',
                  description:
                    'Seeing all legitimate work as worship',
                },
                {
                  id: 'deep-5-4-1-2',
                  title: 'Faith in the Marketplace',
                  description:
                    'Integrating belief and business',
                },
                {
                  id: 'deep-5-4-1-3',
                  title: 'Kingdom Ethics in Daily Life',
                  description:
                    'Making moral decisions at work and home',
                },
                {
                  id: 'deep-5-4-1-4',
                  title: 'Cultural Engagement',
                  description:
                    'Being salt and light in a secular world',
                },
                {
                  id: 'deep-5-4-1-5',
                  title: 'Justice, Mercy, and Compassion',
                  description:
                    'Practical care for the vulnerable',
                },
                {
                  id: 'deep-5-4-1-6',
                  title: 'Stewardship of Influence',
                  description:
                    'Using your platform for God\'s purposes',
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================
    // Phase 6: Track Six — Wisdom for Life
    // =========================================================
    {
      id: 'deep-p6',
      title: 'Track Six: Wisdom for Life',
      description:
        'Practical biblical wisdom for relationships, family, navigating trials, and the everyday decisions that shape a life of faithfulness.',
      modules: [
        // Module 1: Relationships and Family
        {
          id: 'deep-p6-m1',
          title: 'Relationships and Family',
          description:
            'Biblical wisdom for marriage, parenting, singleness, friendship, conflict resolution, and the hard work of forgiveness.',
          sections: [
            {
              id: 'deep-p6-m1-s1',
              title: 'Relationships and Family',
              lessons: [
                {
                  id: 'deep-6-1-1-1',
                  title: 'Biblical Manhood',
                  description:
                    'Identity, responsibility, and Christlike leadership',
                },
                {
                  id: 'deep-6-1-1-2',
                  title: 'Biblical Womanhood',
                  description:
                    'Identity, dignity, and flourishing in God\'s design',
                },
                {
                  id: 'deep-6-1-1-3',
                  title: 'Christian Marriage: Going Deeper',
                  description:
                    'Covenant, intimacy, and sanctification through marriage',
                },
                {
                  id: 'deep-6-1-1-4',
                  title: 'Parenting for Faith Formation',
                  description:
                    'Raising children who love God',
                },
                {
                  id: 'deep-6-1-1-5',
                  title: 'Honoring Aging Parents',
                  description:
                    'The fifth commandment in practice',
                },
                {
                  id: 'deep-6-1-1-6',
                  title: 'Singleness and the Kingdom',
                  description:
                    'Undivided devotion and unique calling',
                },
                {
                  id: 'deep-6-1-1-7',
                  title: 'Friendship and Community',
                  description:
                    'Building deep, lasting relationships',
                },
                {
                  id: 'deep-6-1-1-8',
                  title: 'Conflict Resolution',
                  description:
                    'Biblical peacemaking and reconciliation',
                },
                {
                  id: 'deep-6-1-1-9',
                  title: 'Forgiveness: The Hard Cases',
                  description:
                    'Extending grace when it costs everything',
                },
              ],
            },
          ],
        },
        // Module 2: Navigating Trials
        {
          id: 'deep-p6-m2',
          title: 'Navigating Trials',
          description:
            'Addressing suffering, grief, anxiety, depression, illness, financial hardship, unanswered prayer, and seasons of doubt with biblical wisdom.',
          sections: [
            {
              id: 'deep-p6-m2-s1',
              title: 'Navigating Trials',
              lessons: [
                {
                  id: 'deep-6-2-1-1',
                  title: 'Theology of Suffering',
                  description:
                    'Why God allows pain and what it produces',
                },
                {
                  id: 'deep-6-2-1-2',
                  title: 'Grief and Loss',
                  description:
                    'Walking through death, divorce, and disappointment',
                },
                {
                  id: 'deep-6-2-1-3',
                  title: 'Anxiety and Fear',
                  description:
                    'Biblical strategies for the anxious heart',
                },
                {
                  id: 'deep-6-2-1-4',
                  title: 'Depression and Spiritual Darkness',
                  description: 'Faith in the valley',
                },
                {
                  id: 'deep-6-2-1-5',
                  title: 'Physical Illness and Chronic Pain',
                  description:
                    'Trusting God in the body\'s weakness',
                },
                {
                  id: 'deep-6-2-1-6',
                  title: 'Financial Hardship',
                  description:
                    'Contentment and faith when resources are scarce',
                },
                {
                  id: 'deep-6-2-1-7',
                  title: 'When Prayers Go Unanswered',
                  description:
                    'Sustaining faith in God\'s silence',
                },
                {
                  id: 'deep-6-2-1-8',
                  title: 'Doubt and Deconstruction',
                  description:
                    'Honest wrestling without losing faith',
                },
              ],
            },
          ],
        },
        // Module 3: Practical Wisdom
        {
          id: 'deep-p6-m3',
          title: 'Practical Wisdom',
          description:
            'Biblical guidance for everyday life including decision-making, time management, technology, rest, money, health, and aging well.',
          sections: [
            {
              id: 'deep-p6-m3-s1',
              title: 'Practical Wisdom',
              lessons: [
                {
                  id: 'deep-6-3-1-1',
                  title: 'Biblical Decision-Making',
                  description:
                    'Discerning God\'s will in complex situations',
                },
                {
                  id: 'deep-6-3-1-2',
                  title: 'Time Management and Priorities',
                  description:
                    'Stewarding your days for eternity',
                },
                {
                  id: 'deep-6-3-1-3',
                  title: 'Technology and the Christian Life',
                  description:
                    'Phones, social media, and digital discipleship',
                },
                {
                  id: 'deep-6-3-1-4',
                  title: 'Rest, Sabbath, and Sustainability',
                  description:
                    'Avoiding burnout in ministry and life',
                },
                {
                  id: 'deep-6-3-1-5',
                  title: 'Money and Possessions',
                  description:
                    'Generosity, contentment, and eternal investment',
                },
                {
                  id: 'deep-6-3-1-6',
                  title: 'Health and the Body',
                  description:
                    'Stewardship of physical life',
                },
                {
                  id: 'deep-6-3-1-7',
                  title: 'Aging and Finishing Well',
                  description:
                    'Preparing for the final chapters',
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================
    // Phase 7: Capstone Experiences
    // =========================================================
    {
      id: 'deep-p7',
      title: 'Capstone Experiences',
      description:
        'Integrative projects and practical experiences that bring together everything learned across the curriculum into tangible, transformative outcomes.',
      modules: [
        // Module 1: Integrative Projects
        {
          id: 'deep-p7-m1',
          title: 'Integrative Projects',
          description:
            'Culminating academic and reflective projects that synthesize learning into personal theology, autobiography, and ministry philosophy.',
          sections: [
            {
              id: 'deep-p7-m1-s1',
              title: 'Integrative Projects',
              lessons: [
                {
                  id: 'deep-7-1-1-1',
                  title: 'Personal Systematic Theology',
                  description:
                    'Writing your own statement of faith with biblical support',
                },
                {
                  id: 'deep-7-1-1-2',
                  title: 'Spiritual Autobiography',
                  description:
                    'Tracing God\'s work throughout your life',
                },
                {
                  id: 'deep-7-1-1-3',
                  title: 'Bible Book Mastery',
                  description:
                    'In-depth study and teaching preparation for one book',
                },
                {
                  id: 'deep-7-1-1-4',
                  title: 'Theological Research Paper',
                  description:
                    'Investigating a doctrine or issue in depth',
                },
                {
                  id: 'deep-7-1-1-5',
                  title: 'Ministry Philosophy Development',
                  description:
                    'Articulating your approach to serving',
                },
              ],
            },
          ],
        },
        // Module 2: Practical Experiences
        {
          id: 'deep-p7-m2',
          title: 'Practical Experiences',
          description:
            'Hands-on ministry experiences including spiritual retreats, cross-cultural missions, teaching, discipleship, evangelism, and service immersion.',
          sections: [
            {
              id: 'deep-p7-m2-s1',
              title: 'Practical Experiences',
              lessons: [
                {
                  id: 'deep-7-2-1-1',
                  title: 'Extended Spiritual Retreat',
                  description:
                    '3\u20137 days of silence, solitude, and seeking God',
                },
                {
                  id: 'deep-7-2-1-2',
                  title: 'Cross-Cultural Missions Experience',
                  description:
                    'Short-term trip or local cross-cultural engagement',
                },
                {
                  id: 'deep-7-2-1-3',
                  title: 'Teaching Practicum',
                  description:
                    'Preparing and delivering biblical teaching',
                },
                {
                  id: 'deep-7-2-1-4',
                  title: 'Discipleship Relationship',
                  description:
                    'Completing a full cycle of one-on-one discipleship',
                },
                {
                  id: 'deep-7-2-1-5',
                  title: 'Evangelism Intensive',
                  description:
                    'Focused season of outreach and gospel sharing',
                },
                {
                  id: 'deep-7-2-1-6',
                  title: 'Service Immersion',
                  description:
                    'Extended engagement with the poor, marginalized, or suffering',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
