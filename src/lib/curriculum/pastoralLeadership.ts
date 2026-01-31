import { Curriculum } from '@/types/curriculum';

export const pastoralLeadershipCurriculum: Curriculum = {
  id: 'pastoral-leadership',
  title: 'Pastoral Ministry & Leadership',
  description:
    'A comprehensive program for pastors, church planters, ministry directors, and vocational Christian leaders. This curriculum integrates biblical scholarship, theological depth, leadership development, and practical ministry skills for those called to lead God\'s people.',
  personaIntro:
    'Welcome, pastor and ministry leader. This curriculum has been designed to equip you with the biblical foundation, theological depth, and practical skills you need to faithfully shepherd God\'s people and lead with confidence.',
  learningApproach:
    'This program integrates rigorous biblical and theological study with hands-on pastoral training, leadership development, and personal spiritual formation to prepare you for every dimension of vocational ministry.',
  phases: [
    // =====================================================================
    // PHASE 1: Core Division One — Biblical Foundation
    // =====================================================================
    {
      id: 'past-p1',
      title: 'Core Division One: Biblical Foundation',
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
    },

    // =====================================================================
    // PHASE 2: Core Division Two — Theological Foundation
    // =====================================================================
    {
      id: 'past-p2',
      title: 'Core Division Two: Theological Foundation',
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
    },

    // =====================================================================
    // PHASE 3: Core Division Three — Pastoral Ministry
    // =====================================================================
    {
      id: 'past-p3',
      title: 'Core Division Three: Pastoral Ministry',
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
    },

    // =====================================================================
    // PHASE 4: Core Division Four — Leadership and Administration
    // =====================================================================
    {
      id: 'past-p4',
      title: 'Core Division Four: Leadership and Administration',
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
    },

    // =====================================================================
    // PHASE 5: Core Division Five — Mission and Evangelism
    // =====================================================================
    {
      id: 'past-p5',
      title: 'Core Division Five: Mission and Evangelism',
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
    },

    // =====================================================================
    // PHASE 6: Core Division Six — Specialized Ministries
    // =====================================================================
    {
      id: 'past-p6',
      title: 'Core Division Six: Specialized Ministries',
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
    },

    // =====================================================================
    // PHASE 7: Core Division Seven — The Pastor's Personal Life
    // =====================================================================
    {
      id: 'past-p7',
      title: 'Core Division Seven: The Pastor\'s Personal Life',
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
    },

    // =====================================================================
    // PHASE 8: Core Division Eight — Contemporary Issues
    // =====================================================================
    {
      id: 'past-p8',
      title: 'Core Division Eight: Contemporary Issues',
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
    },

    // =====================================================================
    // PHASE 9: Capstone and Integrative Experiences
    // =====================================================================
    {
      id: 'past-p9',
      title: 'Capstone and Integrative Experiences',
      description:
        'Academic, practical, and spiritual capstone experiences designed to synthesize learning and prepare pastors for the fullness of vocational ministry.',
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
    },

    // =====================================================================
    // PHASE 10: Continuing Education Tracks
    // =====================================================================
    {
      id: 'past-p10',
      title: 'Continuing Education Tracks',
      description:
        'Ongoing professional development tracks for established pastors, ministry specialists, and bivocational and lay leaders.',
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
    },
  ],
};
