import { Curriculum } from '@/types/curriculum';

export const theologicalStudiesCurriculum: Curriculum = {
  id: 'theological-studies',
  title: 'Biblical & Theological Studies',
  description:
    'A comprehensive seminary-style degree program for students pursuing advanced study in Scripture, theology, and ministry.',
  personaIntro:
    'Welcome to your seminary-level journey through Biblical and Theological Studies. Sophia will walk alongside you as you engage deeply with Scripture, theology, and the rich history of the Christian faith.',
  learningApproach:
    'This curriculum follows a structured seminary progression, building from foundational languages and surveys through systematic theology and into advanced historical, philosophical, and practical ministry studies.',
  phases: [
    // =============================================
    // Phase 1: Foundation Year
    // =============================================
    {
      id: 'theo-p1',
      title: 'Foundation Year',
      description:
        'Build the essential groundwork in biblical languages, core biblical studies, and theological foundations needed for advanced seminary work.',
      duration: 'Year 1',
      modules: [
        // Module 1: Biblical Languages
        {
          id: 'theo-p1-m1',
          title: 'Biblical Languages',
          description:
            'Introduction to the original languages of Scripture, including Hebrew and Greek grammar, vocabulary, syntax, and exegetical methods.',
          sections: [
            {
              id: 'theo-p1-m1-s1',
              title: 'Biblical Languages',
              lessons: [
                {
                  id: 'theo-p1-m1-s1-l1',
                  title: 'Hebrew I & II',
                  description:
                    'Introduction to biblical Hebrew grammar, vocabulary, and syntax.',
                },
                {
                  id: 'theo-p1-m1-s1-l2',
                  title: 'Greek I & II',
                  description:
                    'Koine Greek fundamentals for New Testament study.',
                },
                {
                  id: 'theo-p1-m1-s1-l3',
                  title: 'Hebrew Exegesis',
                  description: 'Reading and translating Hebrew texts.',
                },
                {
                  id: 'theo-p1-m1-s1-l4',
                  title: 'Greek Exegesis',
                  description: 'Reading and translating Greek texts.',
                },
              ],
            },
          ],
        },
        // Module 2: Biblical Studies Core
        {
          id: 'theo-p1-m2',
          title: 'Biblical Studies Core',
          description:
            'A broad survey of the entire Bible, interpretive principles, and the historical and geographical context of Scripture.',
          sections: [
            {
              id: 'theo-p1-m2-s1',
              title: 'Biblical Studies Core',
              lessons: [
                {
                  id: 'theo-p1-m2-s1-l1',
                  title: 'Old Testament Survey',
                  description:
                    'Genesis through Malachi, historical context and literary structure.',
                },
                {
                  id: 'theo-p1-m2-s1-l2',
                  title: 'New Testament Survey',
                  description:
                    'Gospels through Revelation, authorship and themes.',
                },
                {
                  id: 'theo-p1-m2-s1-l3',
                  title: 'Hermeneutics',
                  description: 'Principles of biblical interpretation.',
                },
                {
                  id: 'theo-p1-m2-s1-l4',
                  title: 'Biblical Geography and Archaeology',
                  description:
                    'Physical and cultural setting of Scripture.',
                },
              ],
            },
          ],
        },
        // Module 3: Theological Foundations
        {
          id: 'theo-p1-m3',
          title: 'Theological Foundations',
          description:
            'An introduction to the discipline of theology and the spiritual practices that sustain theological study.',
          sections: [
            {
              id: 'theo-p1-m3-s1',
              title: 'Theological Foundations',
              lessons: [
                {
                  id: 'theo-p1-m3-s1-l1',
                  title: 'Introduction to Theology',
                  description:
                    'Methodology and major theological categories.',
                },
                {
                  id: 'theo-p1-m3-s1-l2',
                  title: 'Spiritual Formation',
                  description:
                    'Personal devotion, prayer, and character development.',
                },
              ],
            },
          ],
        },
      ],
    },

    // =============================================
    // Phase 2: Intermediate Year
    // =============================================
    {
      id: 'theo-p2',
      title: 'Intermediate Year',
      description:
        'Dive deep into the Old and New Testaments and work through the full systematic theology sequence, building a comprehensive doctrinal framework.',
      duration: 'Year 2',
      modules: [
        // Module 1: Old Testament Studies
        {
          id: 'theo-p2-m1',
          title: 'Old Testament Studies',
          description:
            'An in-depth study of the Old Testament organized by literary genre and canonical division, from the Pentateuch through the Prophets.',
          sections: [
            {
              id: 'theo-p2-m1-s1',
              title: 'Old Testament Studies',
              lessons: [
                {
                  id: 'theo-p2-m1-s1-l1',
                  title: 'Pentateuch',
                  description: 'Genesis through Deuteronomy in depth.',
                },
                {
                  id: 'theo-p2-m1-s1-l2',
                  title: 'Historical Books',
                  description: 'Joshua through Esther.',
                },
                {
                  id: 'theo-p2-m1-s1-l3',
                  title: 'Wisdom Literature',
                  description:
                    'Job, Psalms, Proverbs, Ecclesiastes, Song of Solomon.',
                },
                {
                  id: 'theo-p2-m1-s1-l4',
                  title: 'Major Prophets',
                  description: 'Isaiah, Jeremiah, Ezekiel, Daniel.',
                },
                {
                  id: 'theo-p2-m1-s1-l5',
                  title: 'Minor Prophets',
                  description: 'Hosea through Malachi.',
                },
              ],
            },
          ],
        },
        // Module 2: New Testament Studies
        {
          id: 'theo-p2-m2',
          title: 'New Testament Studies',
          description:
            'A detailed examination of the New Testament writings, covering the Gospels, Acts, the Pauline and General Epistles, and Revelation.',
          sections: [
            {
              id: 'theo-p2-m2-s1',
              title: 'New Testament Studies',
              lessons: [
                {
                  id: 'theo-p2-m2-s1-l1',
                  title: 'Synoptic Gospels',
                  description: 'Matthew, Mark, and Luke.',
                },
                {
                  id: 'theo-p2-m2-s1-l2',
                  title: 'Gospel of John',
                  description:
                    'Theology and structure of the Fourth Gospel.',
                },
                {
                  id: 'theo-p2-m2-s1-l3',
                  title: 'Acts and Early Church',
                  description: 'History of apostolic Christianity.',
                },
                {
                  id: 'theo-p2-m2-s1-l4',
                  title: 'Pauline Epistles I',
                  description: 'Romans, Galatians, 1 & 2 Corinthians.',
                },
                {
                  id: 'theo-p2-m2-s1-l5',
                  title: 'Pauline Epistles II',
                  description:
                    'Ephesians, Philippians, Colossians, 1 & 2 Thessalonians, Pastoral Epistles, Philemon.',
                },
                {
                  id: 'theo-p2-m2-s1-l6',
                  title: 'General Epistles',
                  description:
                    'Hebrews, James, 1 & 2 Peter, 1-3 John, Jude.',
                },
                {
                  id: 'theo-p2-m2-s1-l7',
                  title: 'Revelation and Apocalyptic Literature',
                  description:
                    'A study of the book of Revelation and the genre of apocalyptic literature in its biblical and historical context.',
                },
              ],
            },
          ],
        },
        // Module 3: Systematic Theology Sequence
        {
          id: 'theo-p2-m3',
          title: 'Systematic Theology Sequence',
          description:
            'A comprehensive walk through the major doctrines of the Christian faith, from theological method and the doctrine of Scripture through eschatology.',
          sections: [
            {
              id: 'theo-p2-m3-s1',
              title: 'Systematic Theology Sequence',
              lessons: [
                {
                  id: 'theo-p2-m3-s1-l1',
                  title: 'Prolegomena and Bibliology',
                  description:
                    'Theological method, revelation, and the doctrine of Scripture.',
                },
                {
                  id: 'theo-p2-m3-s1-l2',
                  title: 'Theology Proper',
                  description:
                    'The existence, attributes, and works of God.',
                },
                {
                  id: 'theo-p2-m3-s1-l3',
                  title: 'Trinitarianism',
                  description:
                    'Historical development and biblical basis for Trinitarian doctrine.',
                },
                {
                  id: 'theo-p2-m3-s1-l4',
                  title: 'Christology',
                  description: 'The person and work of Christ.',
                },
                {
                  id: 'theo-p2-m3-s1-l5',
                  title: 'Pneumatology',
                  description: 'The person and work of the Holy Spirit.',
                },
                {
                  id: 'theo-p2-m3-s1-l6',
                  title: 'Angelology and Demonology',
                  description: 'Angels, Satan, and spiritual warfare.',
                },
                {
                  id: 'theo-p2-m3-s1-l7',
                  title: 'Anthropology and Hamartiology',
                  description: 'Humanity and sin.',
                },
                {
                  id: 'theo-p2-m3-s1-l8',
                  title: 'Soteriology',
                  description: 'The doctrine of salvation.',
                },
                {
                  id: 'theo-p2-m3-s1-l9',
                  title: 'Ecclesiology',
                  description:
                    'The nature, purpose, and ordinances of the church.',
                },
                {
                  id: 'theo-p2-m3-s1-l10',
                  title: 'Eschatology',
                  description:
                    'Death, resurrection, judgment, and final things.',
                },
              ],
            },
          ],
        },
      ],
    },

    // =============================================
    // Phase 3: Advanced Year
    // =============================================
    {
      id: 'theo-p3',
      title: 'Advanced Year',
      description:
        'Engage with historical theology, philosophy and apologetics, and contextual and practical ministry studies to prepare for vocational ministry and scholarship.',
      duration: 'Year 3',
      modules: [
        // Module 1: Historical Theology
        {
          id: 'theo-p3-m1',
          title: 'Historical Theology',
          description:
            'A chronological study of Christian thought from the patristic era through modern and contemporary theology, including the American religious tradition.',
          sections: [
            {
              id: 'theo-p3-m1-s1',
              title: 'Historical Theology',
              lessons: [
                {
                  id: 'theo-p3-m1-s1-l1',
                  title: 'Patristics',
                  description:
                    'Church fathers from the apostolic age through Augustine.',
                },
                {
                  id: 'theo-p3-m1-s1-l2',
                  title: 'Medieval Theology',
                  description:
                    'Scholasticism, monasticism, and pre-Reformation developments.',
                },
                {
                  id: 'theo-p3-m1-s1-l3',
                  title: 'Reformation Theology',
                  description:
                    'Luther, Calvin, Zwingli, the Anabaptists, and the Catholic Counter-Reformation.',
                },
                {
                  id: 'theo-p3-m1-s1-l4',
                  title: 'Modern Theology',
                  description:
                    'Enlightenment through contemporary movements.',
                },
                {
                  id: 'theo-p3-m1-s1-l5',
                  title: 'American Religious History',
                  description: 'Christianity in the American context.',
                },
              ],
            },
          ],
        },
        // Module 2: Philosophy and Apologetics
        {
          id: 'theo-p3-m2',
          title: 'Philosophy and Apologetics',
          description:
            'Exploring the philosophical foundations of religious belief, Christian apologetics, comparative religion, and ethical reasoning.',
          sections: [
            {
              id: 'theo-p3-m2-s1',
              title: 'Philosophy and Apologetics',
              lessons: [
                {
                  id: 'theo-p3-m2-s1-l1',
                  title: 'Philosophy of Religion',
                  description:
                    'Arguments for God\'s existence, problem of evil, faith and reason.',
                },
                {
                  id: 'theo-p3-m2-s1-l2',
                  title: 'Christian Apologetics',
                  description:
                    'Defending the faith in contemporary contexts.',
                },
                {
                  id: 'theo-p3-m2-s1-l3',
                  title: 'Christianity and World Religions',
                  description:
                    'Comparative study of major religious traditions.',
                },
                {
                  id: 'theo-p3-m2-s1-l4',
                  title: 'Ethics',
                  description:
                    'Biblical and theological foundations for moral decision-making.',
                },
                {
                  id: 'theo-p3-m2-s1-l5',
                  title: 'Bioethics',
                  description:
                    'Beginning and end of life issues, medical ethics.',
                },
              ],
            },
          ],
        },
        // Module 3: Contextual and Practical Studies
        {
          id: 'theo-p3-m3',
          title: 'Contextual and Practical Studies',
          description:
            'Practical ministry preparation covering preaching, pastoral care, education, missions, urban ministry, and worship.',
          sections: [
            {
              id: 'theo-p3-m3-s1',
              title: 'Contextual and Practical Studies',
              lessons: [
                {
                  id: 'theo-p3-m3-s1-l1',
                  title: 'Homiletics I',
                  description: 'Principles of sermon preparation.',
                },
                {
                  id: 'theo-p3-m3-s1-l2',
                  title: 'Homiletics II',
                  description:
                    'Sermon delivery and advanced preaching methods.',
                },
                {
                  id: 'theo-p3-m3-s1-l3',
                  title: 'Pastoral Theology',
                  description:
                    'Shepherding, counseling, and church leadership.',
                },
                {
                  id: 'theo-p3-m3-s1-l4',
                  title: 'Christian Education',
                  description:
                    'Teaching methods and discipleship models.',
                },
                {
                  id: 'theo-p3-m3-s1-l5',
                  title: 'Missions and Cross-Cultural Ministry',
                  description:
                    'History, theology, and practice of global mission.',
                },
                {
                  id: 'theo-p3-m3-s1-l6',
                  title: 'Urban Ministry',
                  description:
                    'Ministry in multicultural and metropolitan contexts.',
                },
                {
                  id: 'theo-p3-m3-s1-l7',
                  title: 'Worship and Liturgy',
                  description:
                    'Theology and practice of Christian worship.',
                },
              ],
            },
          ],
        },
      ],
    },

    // =============================================
    // Phase 4: Electives and Specializations
    // =============================================
    {
      id: 'theo-p4',
      title: 'Electives and Specializations',
      description:
        'Choose from a range of elective courses in advanced biblical studies, specialized theological topics, ministry specializations, and the academic research track.',
      modules: [
        // Module 1: Advanced Biblical Studies
        {
          id: 'theo-p4-m1',
          title: 'Advanced Biblical Studies',
          description:
            'Elective courses for deeper engagement with biblical texts, including intertestamental literature, textual criticism, and additional biblical languages.',
          sections: [
            {
              id: 'theo-p4-m1-s1',
              title: 'Advanced Biblical Studies',
              lessons: [
                {
                  id: 'theo-p4-m1-s1-l1',
                  title: 'Intertestamental Period',
                  description:
                    'Second Temple Judaism and the world between the testaments.',
                },
                {
                  id: 'theo-p4-m1-s1-l2',
                  title: 'Dead Sea Scrolls',
                  description:
                    'An examination of the Qumran manuscripts and their significance for biblical and Second Temple studies.',
                },
                {
                  id: 'theo-p4-m1-s1-l3',
                  title: 'New Testament Textual Criticism',
                  description:
                    'The methods and principles of establishing the original text of the New Testament from manuscript evidence.',
                },
                {
                  id: 'theo-p4-m1-s1-l4',
                  title: 'Old Testament Textual Criticism',
                  description:
                    'The methods and principles of establishing the original text of the Old Testament from manuscript evidence.',
                },
                {
                  id: 'theo-p4-m1-s1-l5',
                  title: 'Biblical Theology',
                  description: 'Tracing themes across the canon.',
                },
                {
                  id: 'theo-p4-m1-s1-l6',
                  title: 'Aramaic',
                  description:
                    'For Daniel, Ezra, and related texts.',
                },
                {
                  id: 'theo-p4-m1-s1-l7',
                  title: 'Septuagint Studies',
                  description: 'The Greek Old Testament.',
                },
              ],
            },
          ],
        },
        // Module 2: Specialized Theological Topics
        {
          id: 'theo-p4-m2',
          title: 'Specialized Theological Topics',
          description:
            'Elective courses exploring specific theological traditions, movements, and thematic areas within Christian thought.',
          sections: [
            {
              id: 'theo-p4-m2-s1',
              title: 'Specialized Theological Topics',
              lessons: [
                {
                  id: 'theo-p4-m2-s1-l1',
                  title: 'Covenant Theology',
                  description:
                    'A study of the covenant framework as an organizing principle for understanding Scripture and redemptive history.',
                },
                {
                  id: 'theo-p4-m2-s1-l2',
                  title: 'Dispensationalism',
                  description:
                    'An examination of the dispensational approach to biblical interpretation and its theological implications.',
                },
                {
                  id: 'theo-p4-m2-s1-l3',
                  title: 'Theology of the Reformers',
                  description:
                    'A focused study of the theological contributions of the major Protestant Reformers.',
                },
                {
                  id: 'theo-p4-m2-s1-l4',
                  title: 'Eastern Orthodox Theology',
                  description:
                    'An introduction to the distinctive theological emphases and traditions of Eastern Orthodoxy.',
                },
                {
                  id: 'theo-p4-m2-s1-l5',
                  title: 'Catholic Theology',
                  description:
                    'An introduction to Roman Catholic theological traditions, doctrinal developments, and key thinkers.',
                },
                {
                  id: 'theo-p4-m2-s1-l6',
                  title: 'Liberation Theology',
                  description:
                    'An exploration of liberation theology and its emphasis on social justice, poverty, and the marginalized.',
                },
                {
                  id: 'theo-p4-m2-s1-l7',
                  title: 'Feminist and Womanist Theology',
                  description:
                    'An examination of feminist and womanist perspectives within Christian theological discourse.',
                },
                {
                  id: 'theo-p4-m2-s1-l8',
                  title: 'Theology of Suffering',
                  description:
                    'A theological exploration of pain, suffering, and the problem of evil in Christian thought.',
                },
                {
                  id: 'theo-p4-m2-s1-l9',
                  title: 'Theology of Work and Vocation',
                  description:
                    'A study of the biblical and theological foundations for understanding work, calling, and vocation.',
                },
              ],
            },
          ],
        },
        // Module 3: Ministry Specializations
        {
          id: 'theo-p4-m3',
          title: 'Ministry Specializations',
          description:
            'Elective courses focused on specific areas of vocational ministry, from counseling and family ministry to church planting and chaplaincy.',
          sections: [
            {
              id: 'theo-p4-m3-s1',
              title: 'Ministry Specializations',
              lessons: [
                {
                  id: 'theo-p4-m3-s1-l1',
                  title: 'Pastoral Counseling',
                  description:
                    'Principles and practices of counseling within a pastoral ministry context.',
                },
                {
                  id: 'theo-p4-m3-s1-l2',
                  title: 'Marriage and Family Ministry',
                  description:
                    'Ministry to marriages and families, including premarital counseling and family discipleship.',
                },
                {
                  id: 'theo-p4-m3-s1-l3',
                  title: 'Youth and Campus Ministry',
                  description:
                    'Strategies and theology for ministry to adolescents and college students.',
                },
                {
                  id: 'theo-p4-m3-s1-l4',
                  title: 'Children\'s Ministry',
                  description:
                    'Approaches to spiritual formation and education for children in the church.',
                },
                {
                  id: 'theo-p4-m3-s1-l5',
                  title: 'Church Planting',
                  description:
                    'The theology, strategy, and practical steps involved in planting new churches.',
                },
                {
                  id: 'theo-p4-m3-s1-l6',
                  title: 'Church Administration and Leadership',
                  description:
                    'Organizational leadership, governance, and administration in a church setting.',
                },
                {
                  id: 'theo-p4-m3-s1-l7',
                  title: 'Nonprofit and Parachurch Ministry',
                  description:
                    'Ministry leadership within nonprofit organizations and parachurch structures.',
                },
                {
                  id: 'theo-p4-m3-s1-l8',
                  title: 'Chaplaincy',
                  description:
                    'Hospital, military, prison, or corporate settings.',
                },
              ],
            },
          ],
        },
        // Module 4: Academic Track
        {
          id: 'theo-p4-m4',
          title: 'Academic Track',
          description:
            'Courses designed for students pursuing academic research, scholarly writing, and advanced theological study.',
          sections: [
            {
              id: 'theo-p4-m4-s1',
              title: 'Academic Track',
              lessons: [
                {
                  id: 'theo-p4-m4-s1-l1',
                  title: 'Research Methods in Theology',
                  description:
                    'An introduction to scholarly research methodologies used in theological and biblical studies.',
                },
                {
                  id: 'theo-p4-m4-s1-l2',
                  title: 'Academic Writing Seminar',
                  description:
                    'Development of academic writing skills for theological scholarship and publication.',
                },
                {
                  id: 'theo-p4-m4-s1-l3',
                  title: 'Independent Study',
                  description:
                    'A self-directed research project under faculty supervision on a topic of the student\'s choosing.',
                },
                {
                  id: 'theo-p4-m4-s1-l4',
                  title: 'Thesis or Capstone Project',
                  description:
                    'A culminating research project demonstrating mastery of a specialized area within theological studies.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
