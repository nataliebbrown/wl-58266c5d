# Wholelicity Information Architecture

This document defines how content, features, and data are organized within the Wholelicity platform. It provides the structural foundation for navigation, content hierarchy, and feature organization.

---

## Table of Contents

1. [Site Map](#1-site-map)
2. [Navigation Structure](#2-navigation-structure)
3. [Content Hierarchy](#3-content-hierarchy)
4. [Module Architecture](#4-module-architecture)
5. [Data Architecture](#5-data-architecture)
6. [Persona-Content Mapping](#6-persona-content-mapping)
7. [Feature Taxonomy](#7-feature-taxonomy)
8. [URL Structure](#8-url-structure)
9. [Search & Discovery](#9-search--discovery)

---

## 1. Site Map

### 1.1 Current Site Structure

```
wholelicity.app
│
├── / (Index)
│   └── Entry point - routes based on onboarding state
│
├── /onboarding
│   ├── Cinematic Intro
│   ├── Quiz (4 questions)
│   └── Persona Reveal
│
├── /dashboard
│   ├── Welcome Dashboard (first-time)
│   └── Main Dashboard (returning)
│       ├── Greeting Section
│       ├── Sophia Card
│       ├── Journey Stats
│       ├── Recent Insights
│       └── Module Explorer
│
├── /chat
│   ├── Sidebar
│   │   ├── Conversations List
│   │   └── Suggested Topics
│   ├── Message Area
│   │   ├── Welcome Screen (empty state)
│   │   └── Conversation View
│   └── Input Area
│
└── /orb-test (development only)
```

### 1.2 Proposed Site Structure (Full Vision)

```
wholelicity.app
│
├── / (Index)
│   └── Smart routing based on user state
│
├── /onboarding
│   ├── /intro - Cinematic introduction
│   ├── /quiz - Personalization quiz with Sophia
│   └── /welcome - First chat experience (replaces WelcomeDashboard)
│
├── /dashboard
│   ├── Overview (home)
│   │   ├── Greeting & Sophia prompt
│   │   ├── Journey stats
│   │   ├── Recent insights
│   │   └── Quick actions
│   ├── /insights - Saved insights library
│   └── /settings - User preferences
│
├── /chat (Wisdom Guide)
│   ├── /chat - New/continue conversation
│   └── /chat/:conversationId - Specific conversation
│
├── /patterns (Pattern Explorer) [Future]
│   ├── /patterns - Discovery home
│   ├── /patterns/explore - Interactive exploration
│   └── /patterns/:patternId - Specific pattern detail
│
├── /timewalk (TimeWalk Immersion) [Future]
│   ├── /timewalk - Experience library
│   └── /timewalk/:experienceId - Specific immersion
│
├── /community (Community Catalyst) [Future]
│   ├── /community - Groups home
│   ├── /community/groups - Available groups
│   ├── /community/:groupId - Group discussion
│   └── /community/create - Create new group
│
├── /translation (Translation Bridge) [Future]
│   ├── /translation - Tool home
│   └── /translation/:passageId - Passage analysis
│
├── /formation (Formation Hub) [Future]
│   ├── /formation - Personal growth dashboard
│   ├── /formation/journey - Growth tracking
│   └── /formation/pathways - Curated pathways
│
└── /account
    ├── /profile - User profile
    ├── /subscription - Plan management
    └── /preferences - App settings
```

### 1.3 Visual Site Map

```
                                    ┌─────────────┐
                                    │      /      │
                                    │   (Index)   │
                                    └──────┬──────┘
                                           │
              ┌────────────────────────────┼────────────────────────────┐
              │                            │                            │
              ▼                            ▼                            ▼
     ┌────────────────┐           ┌────────────────┐           ┌────────────────┐
     │  /onboarding   │           │   /dashboard   │           │    /chat       │
     └───────┬────────┘           └───────┬────────┘           └───────┬────────┘
             │                            │                            │
    ┌────────┼────────┐          ┌────────┼────────┐                   │
    │        │        │          │        │        │                   │
    ▼        ▼        ▼          ▼        ▼        ▼                   ▼
┌───────┐┌───────┐┌───────┐ ┌────────┐┌────────┐┌────────┐    ┌─────────────┐
│ intro ││ quiz  ││welcome│ │overview││insights││settings│    │conversation │
└───────┘└───────┘└───────┘ └────────┘└────────┘└────────┘    │    :id      │
                                                               └─────────────┘

                    ┌──────────────────────────────────────────┐
                    │           FUTURE MODULES                 │
                    ├──────────┬──────────┬──────────┬─────────┤
                    │          │          │          │         │
                    ▼          ▼          ▼          ▼         ▼
               ┌────────┐┌────────┐┌──────────┐┌─────────┐┌─────────┐
               │patterns││timewalk││community ││translate││formation│
               └────────┘└────────┘└──────────┘└─────────┘└─────────┘
```

---

## 2. Navigation Structure

### 2.1 Primary Navigation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PRIMARY NAVIGATION                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MOBILE (Bottom Tab Bar)                                                    │
│  ┌─────────┬─────────┬─────────┬─────────┬─────────┐                       │
│  │  Home   │  Chat   │ Explore │ Insights│ Profile │                       │
│  │   🏠    │   💬    │   🔍    │   💡    │   👤    │                       │
│  └─────────┴─────────┴─────────┴─────────┴─────────┘                       │
│                                                                             │
│  DESKTOP (Top Navigation Bar)                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ [Logo]    Dashboard    Chat    Explore ▼    Insights    [Profile ▼]  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  "Explore" Dropdown (Desktop):                                              │
│  ┌─────────────────────────┐                                                │
│  │ Wisdom Guide      ✓     │                                                │
│  │ Pattern Explorer  Soon  │                                                │
│  │ TimeWalk          Soon  │                                                │
│  │ Community         Soon  │                                                │
│  │ Translation       Soon  │                                                │
│  │ Formation Hub     Soon  │                                                │
│  └─────────────────────────┘                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Secondary Navigation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SECONDARY NAVIGATION                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CHAT SIDEBAR                                                               │
│  ┌───────────────────────┐                                                  │
│  │ [+ New Chat]          │  ← Primary action                                │
│  │                       │                                                  │
│  │ Conversations         │  ← Section header                                │
│  │ ├── Today             │  ← Time grouping                                 │
│  │ │   └── Conv 1        │                                                  │
│  │ ├── Yesterday         │                                                  │
│  │ │   └── Conv 2        │                                                  │
│  │ └── This Week         │                                                  │
│  │     └── Conv 3        │                                                  │
│  │                       │                                                  │
│  │ ─────────────────     │  ← Divider                                       │
│  │                       │                                                  │
│  │ Suggested Topics      │  ← Section header                                │
│  │ ├── Topic 1           │  ← Persona-specific                              │
│  │ ├── Topic 2           │                                                  │
│  │ └── Topic 3           │                                                  │
│  └───────────────────────┘                                                  │
│                                                                             │
│  DASHBOARD SECTIONS (Vertical scroll)                                       │
│  ┌───────────────────────┐                                                  │
│  │ 1. Greeting & Date    │                                                  │
│  │ 2. Sophia Card        │  ← Primary CTA                                   │
│  │ 3. Journey Stats      │                                                  │
│  │ 4. Recent Insights    │  ← If any exist                                  │
│  │ 5. Explore Modules    │  ← 6 module cards                                │
│  └───────────────────────┘                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Contextual Navigation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CONTEXTUAL NAVIGATION                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  WITHIN CHAT MESSAGE (Sophia's response)                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ [Message content...]                                                │   │
│  │                                                                     │   │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                    │   │
│  │ │ 💾 Save     │ │ 📋 Copy     │ │ 🔗 Share    │  ← Message actions │   │
│  │ └─────────────┘ └─────────────┘ └─────────────┘                    │   │
│  │                                                                     │   │
│  │ Related:                                                 [Future]  │   │
│  │ ┌────────────────────────────────────────────────────────────────┐ │   │
│  │ │ 🕰️ TimeWalk  │  🔗 Patterns  │  🌍 Translation  │  👥 Community │ │   │
│  │ └────────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  WITHIN DASHBOARD MODULE CARD                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Pattern Explorer                                                    │   │
│  │ [Icon]                                                              │   │
│  │                                                                     │   │
│  │ "Discover hidden connections"              Status: Coming Soon      │   │
│  │                                                                     │   │
│  │ Actions when clicked:                                               │   │
│  │ • Notify me when ready                                              │   │
│  │ • Preview patterns                                                  │   │
│  │ • Ask Sophia about patterns                                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Content Hierarchy

### 3.1 Global Content Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CONTENT HIERARCHY                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LEVEL 1: Platform                                                          │
│  └── Wholelicity                                                            │
│                                                                             │
│  LEVEL 2: Modules (6 total)                                                 │
│  ├── Wisdom Guide (Sophia Chat)         ← PRIMARY (available now)           │
│  ├── Personal Formation Hub             ← CORE (coming soon)                │
│  ├── Pattern Explorer                   ← DISCOVERY (coming soon)           │
│  ├── TimeWalk Immersion                 ← EXPERIENCE (coming soon)          │
│  ├── Translation Bridge                 ← SCHOLARLY (coming soon)           │
│  └── Community Catalyst                 ← SOCIAL (coming soon)              │
│                                                                             │
│  LEVEL 3: Features within Modules                                           │
│  ├── Wisdom Guide                                                           │
│  │   ├── Conversations                                                      │
│  │   ├── Suggested Topics                                                   │
│  │   ├── Crisis Support                                                     │
│  │   └── Insight Saving                                                     │
│  │                                                                          │
│  ├── Personal Formation Hub                                                 │
│  │   ├── Dashboard Overview                                                 │
│  │   ├── Journey Stats                                                      │
│  │   ├── Saved Insights                                                     │
│  │   ├── Growth Pathways                                                    │
│  │   └── Personalized Recommendations                                       │
│  │                                                                          │
│  ├── Pattern Explorer                                                       │
│  │   ├── Theme Visualizations                                               │
│  │   ├── Connection Maps                                                    │
│  │   ├── Pattern Search                                                     │
│  │   └── Discovery History                                                  │
│  │                                                                          │
│  ├── TimeWalk Immersion                                                     │
│  │   ├── Experience Library                                                 │
│  │   ├── Historical Contexts                                                │
│  │   ├── Cultural Backgrounds                                               │
│  │   └── Guided Tours                                                       │
│  │                                                                          │
│  ├── Translation Bridge                                                     │
│  │   ├── Passage Analysis                                                   │
│  │   ├── Language Comparisons                                               │
│  │   ├── Cultural Context                                                   │
│  │   └── Word Studies                                                       │
│  │                                                                          │
│  └── Community Catalyst                                                     │
│      ├── Discussion Groups                                                  │
│      ├── Group Creation                                                     │
│      ├── Facilitation Tools                                                 │
│      └── Shared Discoveries                                                 │
│                                                                             │
│  LEVEL 4: User-Generated Content                                            │
│  ├── Conversations (with Sophia)                                            │
│  ├── Saved Insights                                                         │
│  ├── Pattern Discoveries                                                    │
│  ├── Group Discussions                                                      │
│  └── Personal Notes                                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Content Types

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CONTENT TYPES                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SYSTEM CONTENT (Platform-provided)                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Type              │ Description              │ Source               │   │
│  ├───────────────────┼──────────────────────────┼──────────────────────┤   │
│  │ Sophia Responses  │ AI-generated guidance    │ Claude API           │   │
│  │ Suggested Topics  │ Persona-based prompts    │ Topic database       │   │
│  │ Pattern Data      │ Biblical connections     │ Pattern database     │   │
│  │ Historical Content│ TimeWalk experiences     │ Content database     │   │
│  │ Translation Data  │ Language analysis        │ Biblical corpus      │   │
│  │ Crisis Resources  │ Support information      │ Static content       │   │
│  │ Onboarding Content│ Quiz, intro, etc.        │ Static content       │   │
│  └───────────────────┴──────────────────────────┴──────────────────────┘   │
│                                                                             │
│  USER CONTENT (User-generated)                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Type              │ Description              │ Storage              │   │
│  ├───────────────────┼──────────────────────────┼──────────────────────┤   │
│  │ Messages          │ Chat with Sophia         │ Supabase             │   │
│  │ Conversations     │ Message threads          │ Supabase             │   │
│  │ Saved Insights    │ Bookmarked responses     │ Supabase             │   │
│  │ Profile Data      │ Persona, preferences     │ Supabase + Local     │   │
│  │ Journey Stats     │ Streaks, counts          │ Supabase             │   │
│  │ Group Posts       │ Community discussions    │ Supabase [Future]    │   │
│  └───────────────────┴──────────────────────────┴──────────────────────┘   │
│                                                                             │
│  CONTEXTUAL CONTENT (Dynamic)                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Type              │ Description              │ Derivation           │   │
│  ├───────────────────┼──────────────────────────┼──────────────────────┤   │
│  │ Personalized      │ Based on persona         │ Quiz answers +       │   │
│  │ Recommendations   │                          │ Usage patterns       │   │
│  │ Module Suggestions│ Cross-module prompts     │ Current context +    │   │
│  │                   │                          │ Conversation topic   │   │
│  │ Daily Prompts     │ Sophia's greeting        │ Time + Persona +     │   │
│  │                   │                          │ Recent activity      │   │
│  │ Related Content   │ "You might also like"    │ Topic similarity     │   │
│  └───────────────────┴──────────────────────────┴──────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Module Architecture

### 4.1 Module Relationships

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MODULE RELATIONSHIPS                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                         ┌─────────────────────┐                             │
│                         │    SOPHIA (AI)      │                             │
│                         │  Central Brain      │                             │
│                         │                     │                             │
│                         │  • Memory across    │                             │
│                         │    all modules      │                             │
│                         │  • Unified persona  │                             │
│                         │  • Cross-context    │                             │
│                         │    awareness        │                             │
│                         └──────────┬──────────┘                             │
│                                    │                                        │
│              ┌─────────────────────┼─────────────────────┐                  │
│              │                     │                     │                  │
│              ▼                     ▼                     ▼                  │
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐         │
│  │   WISDOM GUIDE    │ │  FORMATION HUB    │ │    COMMUNITY      │         │
│  │                   │ │                   │ │                   │         │
│  │  Chat interface   │ │  Growth tracking  │ │  Group discussions│         │
│  │  Q&A with Sophia  │ │  Pathways         │ │  Facilitation     │         │
│  │  Socratic dialog  │ │  Personal stats   │ │  Shared discovery │         │
│  └─────────┬─────────┘ └─────────┬─────────┘ └─────────┬─────────┘         │
│            │                     │                     │                    │
│            │     ┌───────────────┼───────────────┐     │                    │
│            │     │               │               │     │                    │
│            ▼     ▼               ▼               ▼     ▼                    │
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐         │
│  │ PATTERN EXPLORER  │ │ TIMEWALK IMMERSE  │ │ TRANSLATION BRIDGE│         │
│  │                   │ │                   │ │                   │         │
│  │  Theme discovery  │ │  Historical exp.  │ │  Language study   │         │
│  │  Connection maps  │ │  Cultural context │ │  Cultural insight │         │
│  │  Visual learning  │ │  Immersive story  │ │  Word analysis    │         │
│  └───────────────────┘ └───────────────────┘ └───────────────────┘         │
│                                                                             │
│                                                                             │
│  INTEGRATION PATTERNS:                                                      │
│                                                                             │
│  Chat ←→ Patterns    "Discover connections in what we discussed"            │
│  Chat ←→ TimeWalk    "Experience the historical context"                    │
│  Chat ←→ Translation "Understand the original language"                     │
│  Chat ←→ Community   "Others are discussing similar topics"                 │
│                                                                             │
│  Patterns ←→ TimeWalk    "See this pattern in historical context"           │
│  Patterns ←→ Translation "How this theme appears across languages"          │
│  Patterns ←→ Community   "Explore patterns together"                        │
│                                                                             │
│  TimeWalk ←→ Translation "Hear it in the original language"                 │
│  TimeWalk ←→ Community   "Experience history together"                      │
│                                                                             │
│  All → Formation Hub     "Track your growth across all modules"             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Module Feature Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MODULE FEATURE MATRIX                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                    │Wisdom│Format│Pattern│TimeWk│Transl│Commun│             │
│  Feature           │Guide │ Hub  │Explore│Immers│Bridge│Cataly│             │
│  ──────────────────┼──────┼──────┼───────┼──────┼──────┼──────┤             │
│  AI Conversation   │  ●   │  ○   │   ○   │  ○   │  ○   │  ○   │             │
│  Voice Input       │  ●   │  ○   │   ○   │  ○   │  ○   │  ○   │             │
│  Save Insights     │  ●   │  ●   │   ●   │  ●   │  ●   │  ●   │             │
│  Visual Content    │  ○   │  ●   │   ●   │  ●   │  ●   │  ○   │             │
│  Interactive Maps  │  ○   │  ○   │   ●   │  ●   │  ○   │  ○   │             │
│  Historical Data   │  ○   │  ○   │   ○   │  ●   │  ●   │  ○   │             │
│  Language Data     │  ○   │  ○   │   ○   │  ○   │  ●   │  ○   │             │
│  Group Features    │  ○   │  ○   │   ○   │  ○   │  ○   │  ●   │             │
│  Progress Tracking │  ●   │  ●   │   ●   │  ●   │  ●   │  ●   │             │
│  Persona-Aware     │  ●   │  ●   │   ●   │  ●   │  ●   │  ●   │             │
│  ──────────────────┼──────┼──────┼───────┼──────┼──────┼──────┤             │
│  Status            │ LIVE │ SOON │ SOON  │ SOON │ SOON │ SOON │             │
│                                                                             │
│  Legend: ● = Primary feature  ○ = Secondary/integrated feature              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Module Entry Points

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MODULE ENTRY POINTS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  WISDOM GUIDE (Chat with Sophia)                                            │
│  ├── Dashboard → "Continue Conversation" button                             │
│  ├── Dashboard → Module card click                                          │
│  ├── Navigation → Chat tab/link                                             │
│  ├── Suggested Topic → Click from sidebar                                   │
│  ├── Cross-module → "Ask Sophia about this"                                 │
│  └── Deep link → /chat or /chat/:conversationId                             │
│                                                                             │
│  PATTERN EXPLORER [Future]                                                  │
│  ├── Dashboard → Module card click                                          │
│  ├── Chat → "Discover patterns" contextual link                             │
│  ├── Navigation → Explore dropdown                                          │
│  ├── TimeWalk → "See related patterns"                                      │
│  └── Deep link → /patterns or /patterns/:patternId                          │
│                                                                             │
│  TIMEWALK IMMERSION [Future]                                                │
│  ├── Dashboard → Module card click                                          │
│  ├── Chat → "Experience historical context" link                            │
│  ├── Navigation → Explore dropdown                                          │
│  ├── Pattern Explorer → "See in context"                                    │
│  └── Deep link → /timewalk or /timewalk/:experienceId                       │
│                                                                             │
│  COMMUNITY CATALYST [Future]                                                │
│  ├── Dashboard → Module card click                                          │
│  ├── Chat → "Others discussing this" link                                   │
│  ├── Navigation → Explore dropdown                                          │
│  ├── Insight save → "Share with community"                                  │
│  └── Deep link → /community or /community/:groupId                          │
│                                                                             │
│  TRANSLATION BRIDGE [Future]                                                │
│  ├── Dashboard → Module card click                                          │
│  ├── Chat → "Original language" contextual link                             │
│  ├── Navigation → Explore dropdown                                          │
│  ├── Pattern Explorer → "Cross-language patterns"                           │
│  └── Deep link → /translation or /translation/:passageId                    │
│                                                                             │
│  FORMATION HUB [Future]                                                     │
│  ├── Dashboard → Integrated into main dashboard                             │
│  ├── Navigation → Dedicated section                                         │
│  ├── Any module → "Track this in my journey"                                │
│  └── Deep link → /formation                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Data Architecture

### 5.1 Data Model Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DATA MODEL OVERVIEW                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                            USER                                     │   │
│  │  id, email, created_at, updated_at                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│         │                                                                   │
│         │ 1:1                                                               │
│         ▼                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          PROFILE                                    │   │
│  │  user_id, persona, spiritual_background, learning_style,            │   │
│  │  community_preference, current_season, onboarding_completed_at      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│         │                                                                   │
│         │ 1:N                                                               │
│         ▼                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                       CONVERSATIONS                                 │   │
│  │  id, user_id, title, created_at, updated_at, message_count          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│         │                                                                   │
│         │ 1:N                                                               │
│         ▼                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         MESSAGES                                    │   │
│  │  id, conversation_id, user_id, role (user/assistant),               │   │
│  │  content, created_at                                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         INSIGHTS                                    │   │
│  │  id, user_id, message_id, title, preview, category,                 │   │
│  │  full_content, created_at                                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      JOURNEY_STATS                                  │   │
│  │  user_id, current_streak, longest_streak, total_conversations,      │   │
│  │  total_insights, last_active_at                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Local Storage Schema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      LOCAL STORAGE SCHEMA                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  KEY: wholelicity_onboarding                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ {                                                                   │   │
│  │   "phase": "not-started" | "intro-seen" | "quiz-started" |         │   │
│  │            "quiz-completed" | "fully-onboarded",                    │   │
│  │   "quizProgress": {                                                 │   │
│  │     "lastQuestionAnswered": 0-4,                                    │   │
│  │     "answers": {                                                    │   │
│  │       "spiritualBackground": "string",                              │   │
│  │       "learningStyle": "string",                                    │   │
│  │       "communityPreference": "string",                              │   │
│  │       "currentSeason": "string"                                     │   │
│  │     }                                                               │   │
│  │   },                                                                │   │
│  │   "persona": "string",                                              │   │
│  │   "quizCompletedAt": "ISO date string",                             │   │
│  │   "firstChatAt": "ISO date string",                                 │   │
│  │   "lastVisitAt": "ISO date string",                                 │   │
│  │   "visitCount": number                                              │   │
│  │ }                                                                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  KEY: wholelicity_preferences                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ {                                                                   │   │
│  │   "theme": "light" | "dark" | "system",                             │   │
│  │   "sidebarOpen": boolean,                                           │   │
│  │   "notificationsEnabled": boolean                                   │   │
│  │ }                                                                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  KEY: wholelicity_chat_draft                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ {                                                                   │   │
│  │   "conversationId": "string" | null,                                │   │
│  │   "content": "string"                                               │   │
│  │ }                                                                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DATA FLOW DIAGRAM                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                              ┌──────────────┐                               │
│                              │    USER      │                               │
│                              │   ACTIONS    │                               │
│                              └──────┬───────┘                               │
│                                     │                                       │
│        ┌────────────────────────────┼────────────────────────────┐          │
│        │                            │                            │          │
│        ▼                            ▼                            ▼          │
│  ┌───────────┐              ┌───────────────┐              ┌───────────┐   │
│  │   Quiz    │              │  Send Message │              │   Save    │   │
│  │  Answers  │              │               │              │  Insight  │   │
│  └─────┬─────┘              └───────┬───────┘              └─────┬─────┘   │
│        │                            │                            │          │
│        ▼                            ▼                            ▼          │
│  ┌───────────┐              ┌───────────────┐              ┌───────────┐   │
│  │  Local    │              │   Supabase    │              │ Supabase  │   │
│  │  Storage  │              │   Function    │              │  Direct   │   │
│  │           │              │               │              │           │   │
│  │ (persona, │              │ (streaming    │              │ (insights │   │
│  │  state)   │              │  response)    │              │  table)   │   │
│  └─────┬─────┘              └───────┬───────┘              └─────┬─────┘   │
│        │                            │                            │          │
│        │                            ▼                            │          │
│        │                    ┌───────────────┐                    │          │
│        │                    │  Claude API   │                    │          │
│        │                    │               │                    │          │
│        │                    │ (AI response) │                    │          │
│        │                    └───────┬───────┘                    │          │
│        │                            │                            │          │
│        │                            ▼                            │          │
│        │                    ┌───────────────┐                    │          │
│        │                    │   Supabase    │                    │          │
│        │                    │   Database    │                    │          │
│        │                    │               │                    │          │
│        │                    │ (messages,    │◄───────────────────┘          │
│        │                    │  conversations│                               │
│        │                    │  stored)      │                               │
│        │                    └───────┬───────┘                               │
│        │                            │                                       │
│        └────────────────────────────┼────────────────────────────┐          │
│                                     │                            │          │
│                                     ▼                            ▼          │
│                              ┌─────────────────────────────────────┐        │
│                              │              UI UPDATE              │        │
│                              │                                     │        │
│                              │  • Chat messages displayed          │        │
│                              │  • Insights list updated            │        │
│                              │  • Stats recalculated               │        │
│                              │  • Persona applied                  │        │
│                              └─────────────────────────────────────┘        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Persona-Content Mapping

### 6.1 Persona → Content Relationships

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PERSONA-CONTENT MAPPING                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SPIRITUAL BACKGROUND → Content Complexity                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Background         │ Content Level │ Assumed Knowledge              │   │
│  ├────────────────────┼───────────────┼────────────────────────────────┤   │
│  │ new_to_faith       │ Foundational  │ None - explain everything      │   │
│  │ exploring_faith    │ Introductory  │ Basic cultural awareness       │   │
│  │ believer_deeper    │ Intermediate  │ Bible familiarity, basic terms │   │
│  │ pastor_leader      │ Advanced      │ Theological vocabulary         │   │
│  │ seminary_student   │ Scholarly     │ Academic biblical knowledge    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  LEARNING STYLE → Content Format                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Style              │ Primary Format │ Module Emphasis               │   │
│  ├────────────────────┼────────────────┼────────────────────────────────┤   │
│  │ reading_reflection │ Text, articles │ Wisdom Guide, Formation       │   │
│  │ visual             │ Maps, diagrams │ Pattern Explorer, TimeWalk    │   │
│  │ conversation       │ Dialogue, Q&A  │ Wisdom Guide, Community       │   │
│  │ hands_on           │ Interactive    │ TimeWalk, Pattern Explorer    │   │
│  │ patterns           │ Visualizations │ Pattern Explorer, Translation │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  COMMUNITY PREFERENCE → Social Features                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Preference         │ Community Visibility │ Group Features          │   │
│  ├────────────────────┼──────────────────────┼─────────────────────────┤   │
│  │ individual_study   │ Minimal              │ Hidden by default       │   │
│  │ small_group        │ Moderate             │ Group suggestions       │   │
│  │ lead_groups        │ High                 │ Facilitation tools      │   │
│  │ seeking_community  │ High                 │ Group matching          │   │
│  │ both_personal_group│ Balanced             │ Toggle available        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  CURRENT SEASON → Suggested Topics                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Season             │ Topic Themes                                   │   │
│  ├────────────────────┼────────────────────────────────────────────────┤   │
│  │ deeper_relationship│ Intimacy with God, prayer, presence           │   │
│  │ questions_doubts   │ Apologetics, hard questions, wrestling        │   │
│  │ difficult_situation│ Comfort, hope, lament, God's faithfulness     │   │
│  │ ministry_prep      │ Leadership, teaching, sermon prep             │   │
│  │ understand_bible   │ Hermeneutics, context, interpretation         │   │
│  │ spiritual_growth   │ Disciplines, formation, transformation        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Suggested Topics by Persona

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SUGGESTED TOPICS BY PERSONA                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  NEW TO FAITH                                                               │
│  ├── "Who is Jesus and why does he matter?"                                 │
│  ├── "How do I read the Bible?"                                             │
│  ├── "What is prayer and how do I do it?"                                   │
│  ├── "I have questions about Christianity"                                  │
│  └── "Where do I start?"                                                    │
│                                                                             │
│  BELIEVER GOING DEEPER                                                      │
│  ├── "Show me something new in a familiar passage"                          │
│  ├── "Help me understand [theological concept]"                             │
│  ├── "What patterns connect across Scripture?"                              │
│  ├── "I'm wrestling with [difficult doctrine]"                              │
│  └── "Deepen my prayer life"                                                │
│                                                                             │
│  PASTOR/LEADER                                                              │
│  ├── "Help me prepare a sermon on [passage]"                                │
│  ├── "Wisdom for a pastoral situation"                                      │
│  ├── "Equip my small group leaders"                                         │
│  ├── "Fresh perspective for teaching [topic]"                               │
│  └── "Balance ministry and personal formation"                              │
│                                                                             │
│  SEMINARY STUDENT                                                           │
│  ├── "Explore the original language of [passage]"                           │
│  ├── "Historical context of [book/event]"                                   │
│  ├── "Compare scholarly interpretations of [text]"                          │
│  ├── "Intertextual connections in [section]"                                │
│  └── "Integrate academics with devotion"                                    │
│                                                                             │
│  EXPLORING FAITH                                                            │
│  ├── "I'm not sure what I believe"                                          │
│  ├── "Questions about faith and science"                                    │
│  ├── "Why do Christians believe [x]?"                                       │
│  ├── "I was hurt by the church"                                             │
│  └── "Exploring spirituality"                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Feature Taxonomy

### 7.1 Feature Categories

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FEATURE TAXONOMY                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CORE FEATURES (Essential functionality)                                    │
│  ├── Authentication & Account                                               │
│  │   ├── Sign up / Sign in                                                  │
│  │   ├── Profile management                                                 │
│  │   └── Session management                                                 │
│  ├── Onboarding                                                             │
│  │   ├── Cinematic intro                                                    │
│  │   ├── Personalization quiz                                               │
│  │   ├── Persona assignment                                                 │
│  │   └── First chat experience                                              │
│  └── Navigation                                                             │
│      ├── Primary navigation                                                 │
│      ├── Module switching                                                   │
│      └── Deep linking                                                       │
│                                                                             │
│  ENGAGEMENT FEATURES (User interaction)                                     │
│  ├── Conversation                                                           │
│  │   ├── Send messages                                                      │
│  │   ├── Receive AI responses (streaming)                                   │
│  │   ├── Conversation history                                               │
│  │   └── Suggested topics                                                   │
│  ├── Content Saving                                                         │
│  │   ├── Save insights                                                      │
│  │   ├── Categorize insights                                                │
│  │   └── Review saved content                                               │
│  └── Progress Tracking                                                      │
│      ├── Day streaks                                                        │
│      ├── Conversation counts                                                │
│      └── Insight counts                                                     │
│                                                                             │
│  DISCOVERY FEATURES (Content exploration)                                   │
│  ├── Pattern Discovery [Future]                                             │
│  │   ├── Theme exploration                                                  │
│  │   ├── Connection visualization                                           │
│  │   └── Pattern search                                                     │
│  ├── Historical Immersion [Future]                                          │
│  │   ├── Time period experiences                                            │
│  │   ├── Cultural context                                                   │
│  │   └── Guided tours                                                       │
│  └── Language Study [Future]                                                │
│      ├── Translation comparison                                             │
│      ├── Word studies                                                       │
│      └── Cultural interpretation                                            │
│                                                                             │
│  SOCIAL FEATURES (Community) [Future]                                       │
│  ├── Group Participation                                                    │
│  │   ├── Join discussions                                                   │
│  │   ├── Share discoveries                                                  │
│  │   └── React to others                                                    │
│  └── Group Leadership                                                       │
│      ├── Create groups                                                      │
│      ├── Facilitate discussions                                             │
│      └── AI-assisted moderation                                             │
│                                                                             │
│  SAFETY FEATURES (User protection)                                          │
│  ├── Crisis Detection                                                       │
│  │   ├── Keyword monitoring                                                 │
│  │   ├── Resource display                                                   │
│  │   └── Hotline integration                                                │
│  └── Content Moderation                                                     │
│      ├── AI guardrails                                                      │
│      └── Report functionality [Future]                                      │
│                                                                             │
│  PERSONALIZATION FEATURES                                                   │
│  ├── Persona System                                                         │
│  │   ├── Quiz-based assignment                                              │
│  │   ├── Content adaptation                                                 │
│  │   └── Module recommendations                                             │
│  ├── Preferences                                                            │
│  │   ├── Theme (dark/light)                                                 │
│  │   ├── Notification settings                                              │
│  │   └── UI customization                                                   │
│  └── Sophia Adaptation                                                      │
│      ├── Tone adjustment                                                    │
│      ├── Complexity calibration                                             │
│      └── Topic suggestions                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Feature Availability Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FEATURE AVAILABILITY MATRIX                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Feature                    │ Status     │ Tier      │ Platform            │
│  ───────────────────────────┼────────────┼───────────┼─────────────────────│
│  Authentication             │ ✅ Live    │ Free      │ All                 │
│  Cinematic Intro            │ ✅ Live    │ Free      │ All                 │
│  Onboarding Quiz            │ ✅ Live    │ Free      │ All                 │
│  Persona Assignment         │ ✅ Live    │ Free      │ All                 │
│  Chat with Sophia           │ ✅ Live    │ Free*     │ All                 │
│  Conversation History       │ ✅ Live    │ Free      │ All                 │
│  Suggested Topics           │ ✅ Live    │ Free      │ All                 │
│  Save Insights              │ ✅ Live    │ Free      │ All                 │
│  Dark/Light Mode            │ ✅ Live    │ Free      │ All                 │
│  Dashboard                  │ ✅ Live    │ Free      │ All                 │
│  Journey Stats              │ ✅ Live    │ Free      │ All                 │
│  Crisis Detection           │ ✅ Live    │ Free      │ All                 │
│  ───────────────────────────┼────────────┼───────────┼─────────────────────│
│  Pattern Explorer           │ 🔜 Soon   │ TBD       │ All                 │
│  TimeWalk Immersion         │ 🔜 Soon   │ TBD       │ All                 │
│  Translation Bridge         │ 🔜 Soon   │ TBD       │ All                 │
│  Community Groups           │ 🔜 Soon   │ TBD       │ All                 │
│  Formation Hub              │ 🔜 Soon   │ TBD       │ All                 │
│  Voice Input                │ 🔜 Soon   │ TBD       │ All                 │
│  Insight Categories         │ 🔜 Soon   │ Free      │ All                 │
│  ───────────────────────────┼────────────┼───────────┼─────────────────────│
│  Advanced Analytics         │ 📋 Planned│ Premium   │ All                 │
│  Group Facilitation Tools   │ 📋 Planned│ Premium   │ All                 │
│  API Access                 │ 📋 Planned│ Premium   │ All                 │
│  Custom Pathways            │ 📋 Planned│ Premium   │ All                 │
│                                                                             │
│  * Free tier may have message limits in future                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. URL Structure

### 8.1 URL Patterns

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          URL STRUCTURE                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PATTERN                        │ DESCRIPTION                               │
│  ───────────────────────────────┼───────────────────────────────────────────│
│  /                              │ Entry point, smart routing                │
│  /dashboard                     │ Main dashboard                            │
│  /chat                          │ New/current conversation                  │
│  /chat/:conversationId          │ Specific conversation                     │
│  /insights                      │ Saved insights library                    │
│  /insights/:insightId           │ Specific insight detail                   │
│  /settings                      │ User settings                             │
│  /settings/profile              │ Profile settings                          │
│  /settings/preferences          │ App preferences                           │
│  /settings/subscription         │ Subscription management                   │
│  ───────────────────────────────┼───────────────────────────────────────────│
│  FUTURE MODULES:                │                                           │
│  /patterns                      │ Pattern Explorer home                     │
│  /patterns/:patternId           │ Specific pattern                          │
│  /patterns/search               │ Pattern search                            │
│  /timewalk                      │ TimeWalk home                             │
│  /timewalk/:experienceId        │ Specific experience                       │
│  /community                     │ Community home                            │
│  /community/groups              │ Browse groups                             │
│  /community/:groupId            │ Specific group                            │
│  /community/create              │ Create new group                          │
│  /translation                   │ Translation Bridge home                   │
│  /translation/:passageId        │ Passage analysis                          │
│  /formation                     │ Formation Hub                             │
│  /formation/journey             │ Personal journey                          │
│  /formation/pathways            │ Growth pathways                           │
│  ───────────────────────────────┼───────────────────────────────────────────│
│  AUTHENTICATION:                │                                           │
│  /login                         │ Sign in                                   │
│  /signup                        │ Create account                            │
│  /forgot-password               │ Password recovery                         │
│  /reset-password                │ Password reset                            │
│  ───────────────────────────────┼───────────────────────────────────────────│
│  ONBOARDING (internal routes):  │                                           │
│  / (with state=intro)           │ Cinematic intro                           │
│  / (with state=quiz)            │ Quiz flow                                 │
│  /dashboard (first time)        │ Welcome dashboard                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Deep Link Support

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DEEP LINK SUPPORT                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SHAREABLE LINKS (Public):                                                  │
│  ──────────────────────────────────────────────────────────────────────     │
│  wholelicity.app/patterns/light-and-darkness                                │
│  → Opens Pattern Explorer to "Light and Darkness" theme                     │
│                                                                             │
│  wholelicity.app/timewalk/jerusalem-temple                                  │
│  → Opens TimeWalk to Jerusalem Temple experience                            │
│                                                                             │
│  wholelicity.app/community/forgiveness-group-123                            │
│  → Opens Community to specific discussion group                             │
│                                                                             │
│  USER-SPECIFIC LINKS (Authenticated):                                       │
│  ──────────────────────────────────────────────────────────────────────     │
│  wholelicity.app/chat/abc123                                                │
│  → Opens user's specific conversation                                       │
│                                                                             │
│  wholelicity.app/insights/xyz789                                            │
│  → Opens user's specific saved insight                                      │
│                                                                             │
│  LINK BEHAVIOR:                                                             │
│  ──────────────────────────────────────────────────────────────────────     │
│  • Unauthenticated user → Redirect to login, then to destination            │
│  • New user → Complete onboarding, then to destination                      │
│  • Authenticated user → Direct to destination                               │
│  • Invalid link → 404 page with suggestions                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Search & Discovery

### 9.1 Search Architecture (Future)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       SEARCH ARCHITECTURE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GLOBAL SEARCH (Header)                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 Search Wholelicity...                                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  SEARCH SCOPE:                                                              │
│  ├── Conversations (your chat history)                                      │
│  ├── Saved Insights (your bookmarks)                                        │
│  ├── Patterns (biblical themes)                                             │
│  ├── TimeWalk Experiences (historical content)                              │
│  ├── Community Discussions (public groups)                                  │
│  └── Scripture References (passages)                                        │
│                                                                             │
│  SEARCH RESULTS:                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Results for "forgiveness"                                           │   │
│  │                                                                     │   │
│  │ YOUR CONTENT                                                        │   │
│  │ ├── 📝 Conversation: "Discussion about forgiveness" (2 days ago)    │   │
│  │ └── 💡 Insight: "Forgiveness as release" (saved last week)          │   │
│  │                                                                     │   │
│  │ PATTERNS                                                            │   │
│  │ ├── 🔗 "Forgiveness" theme (127 connections)                        │   │
│  │ └── 🔗 "Reconciliation" theme (89 connections)                      │   │
│  │                                                                     │   │
│  │ EXPERIENCES                                                         │   │
│  │ └── 🕰️ "The Unforgiving Servant" - TimeWalk                        │   │
│  │                                                                     │   │
│  │ COMMUNITY                                                           │   │
│  │ └── 👥 "Practicing Forgiveness" - Active discussion (5 members)     │   │
│  │                                                                     │   │
│  │ [Ask Sophia about "forgiveness" →]                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Discovery Mechanisms

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DISCOVERY MECHANISMS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SOPHIA SUGGESTIONS (AI-Driven)                                             │
│  ├── Based on current conversation topic                                    │
│  │   "Since we're discussing [topic], you might enjoy exploring..."         │
│  ├── Based on user persona                                                  │
│  │   "Visual learners often love the Pattern Explorer..."                   │
│  ├── Based on time/context                                                  │
│  │   "Good morning! Here's a reflection to start your day..."              │
│  └── Based on usage patterns                                                │
│      "You haven't saved an insight recently. Found something meaningful?"   │
│                                                                             │
│  MODULE CROSS-PROMOTION (Contextual)                                        │
│  ├── Chat → Patterns: "Discover connections in what we discussed"           │
│  ├── Chat → TimeWalk: "Experience this story in its original context"       │
│  ├── Chat → Community: "Others are discussing similar questions"            │
│  ├── Patterns → Chat: "Ask Sophia to explain this pattern"                  │
│  ├── TimeWalk → Patterns: "See how this story connects to others"           │
│  └── Community → Chat: "Continue this conversation privately"               │
│                                                                             │
│  BROWSING (User-Initiated)                                                  │
│  ├── Module home pages with featured content                                │
│  ├── "Explore" section on dashboard                                         │
│  ├── Category browsing within modules                                       │
│  └── "Related" sections on content pages                                    │
│                                                                             │
│  PERSONALIZED FEED (Dashboard)                                              │
│  ├── Daily Sophia prompt                                                    │
│  ├── Suggested topics (persona-based)                                       │
│  ├── "Continue where you left off"                                          │
│  └── "Trending in community" [Future]                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Summary

This Information Architecture document defines:

1. **Site Map** - Complete structure of current and proposed pages
2. **Navigation Structure** - Primary, secondary, and contextual navigation
3. **Content Hierarchy** - How content is organized and prioritized
4. **Module Architecture** - Relationships between the 6 core modules
5. **Data Architecture** - Data models, storage, and flow
6. **Persona-Content Mapping** - How personas affect content delivery
7. **Feature Taxonomy** - Categorization of all platform features
8. **URL Structure** - Consistent URL patterns and deep linking
9. **Search & Discovery** - How users find content across the platform

### Key Architectural Decisions:

- **Sophia as central hub** - All modules connect through Sophia
- **Persona-driven content** - Quiz answers shape entire experience
- **Progressive disclosure** - Features revealed based on context and readiness
- **Cross-module integration** - Seamless transitions between discovery modes
- **Local + Cloud storage** - State in localStorage, content in Supabase

---

*Next deliverable: Interaction Patterns*
