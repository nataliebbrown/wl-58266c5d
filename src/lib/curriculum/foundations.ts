import { Curriculum } from '@/types/curriculum';

export const foundationsCurriculum: Curriculum = {
  id: 'foundations',
  title: 'Foundations of Christian Faith',
  description:
    'A comprehensive program for new believers beginning their journey in the Christian faith. This curriculum is designed to build a solid biblical and theological foundation while nurturing spiritual growth and community involvement.',
  personaIntro:
    'Welcome to the beginning of an incredible journey. Whether you just made a decision to follow Jesus or you are exploring what faith looks like, this curriculum will walk with you step by step through the foundations of the Christian life.',
  learningApproach:
    'Each lesson is designed to be approachable and practical, moving from core truths to real-life application so that head knowledge leads to heart change and everyday transformation.',
  phases: [
    // =========================================================
    // Phase One: First Steps (Months 1-3)
    // =========================================================
    {
      id: 'found-p1',
      title: 'First Steps',
      description:
        'Begin your journey with the essential truths of Christianity, from understanding the gospel to building foundational spiritual habits like Bible reading, prayer, and church community.',
      duration: 'Months 1-3',
      modules: [
        {
          id: 'found-p1-m1',
          title: 'First Steps',
          description:
            'Core foundations of the Christian faith and the first practices of your new walk with God.',
          duration: 'Months 1-3',
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
                },
                {
                  id: 'found-1-1-2',
                  title: 'Who Is Jesus?',
                  description:
                    'The life, teachings, death, and resurrection of Christ',
                },
                {
                  id: 'found-1-1-3',
                  title: 'Understanding the Gospel',
                  description:
                    'The good news of salvation explained simply',
                },
                {
                  id: 'found-1-1-4',
                  title: 'Assurance of Salvation',
                  description:
                    'Knowing and understanding your new relationship with God',
                },
                {
                  id: 'found-1-1-5',
                  title: 'The Bible: An Introduction',
                  description:
                    'What the Bible is, how it\'s organized, and why it matters',
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
                },
                {
                  id: 'found-1-2-2',
                  title: 'Learning to Pray',
                  description:
                    'The basics of communicating with God',
                },
                {
                  id: 'found-1-2-3',
                  title: 'What Happens When I Sin?',
                  description:
                    'Confession, repentance, and grace',
                },
                {
                  id: 'found-1-2-4',
                  title: 'Finding a Church Home',
                  description:
                    'Why community matters and how to choose a church',
                },
                {
                  id: 'found-1-2-5',
                  title: 'Water Baptism',
                  description:
                    'Understanding and preparing for this step of obedience',
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================
    // Phase Two: Building Blocks (Months 4-6)
    // =========================================================
    {
      id: 'found-p2',
      title: 'Building Blocks',
      description:
        'Deepen your understanding of who God is, discover your new identity in Christ, and develop growing spiritual practices like worship, generosity, and rest.',
      duration: 'Months 4-6',
      modules: [
        {
          id: 'found-p2-m1',
          title: 'Building Blocks',
          description:
            'Knowing God more deeply, understanding your identity in Christ, and growing in spiritual practice.',
          duration: 'Months 4-6',
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
    },

    // =========================================================
    // Phase Three: Deepening Roots (Months 7-9)
    // =========================================================
    {
      id: 'found-p3',
      title: 'Deepening Roots',
      description:
        'Explore the storyline of the Bible from Genesis to Revelation, gaining a solid overview of both the Old and New Testaments and key books within them.',
      duration: 'Months 7-9',
      modules: [
        {
          id: 'found-p3-m1',
          title: 'Deepening Roots',
          description:
            'An overview of the Old and New Testaments, exploring key books and the grand narrative of Scripture.',
          duration: 'Months 7-9',
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
    },

    // =========================================================
    // Phase Four: Living It Out (Months 10-12)
    // =========================================================
    {
      id: 'found-p4',
      title: 'Living It Out',
      description:
        'Apply your faith to everyday life through Christian character and virtue, healthy relationships, and faithful engagement with work, culture, and the world around you.',
      duration: 'Months 10-12',
      modules: [
        {
          id: 'found-p4-m1',
          title: 'Living It Out',
          description:
            'Developing Christian character, building godly relationships, and engaging the world with faith and integrity.',
          duration: 'Months 10-12',
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
    },

    // =========================================================
    // Phase Five: Going Deeper (Year Two and Beyond)
    // =========================================================
    {
      id: 'found-p5',
      title: 'Going Deeper',
      description:
        'Advance your spiritual life through deeper disciplines, theological literacy, and hands-on ministry and service in your church and beyond.',
      duration: 'Year Two and Beyond',
      modules: [
        {
          id: 'found-p5-m1',
          title: 'Going Deeper',
          description:
            'Spiritual disciplines, theological foundations, and practical ministry training for continued growth.',
          duration: 'Year Two and Beyond',
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
    },

    // =========================================================
    // Phase Six: Electives and Special Topics
    // =========================================================
    {
      id: 'found-p6',
      title: 'Electives and Special Topics',
      description:
        'Explore topics relevant to your specific life stage, deepen your ability to give a reason for your faith, and study focused passages of Scripture in greater detail.',
      modules: [
        {
          id: 'found-p6-m1',
          title: 'Electives and Special Topics',
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
    },
  ],
};
