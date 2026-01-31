# Wholelicity User Flow Diagrams

This document provides visual maps of all user journeys through the Wholelicity platform, covering both current implementation and proposed improvements.

---

## Table of Contents

1. [Flow Legend](#1-flow-legend)
2. [High-Level Application Flow](#2-high-level-application-flow)
3. [First-Time User Journey](#3-first-time-user-journey)
4. [Returning User Journey](#4-returning-user-journey)
5. [Onboarding Detail Flows](#5-onboarding-detail-flows)
6. [Chat Experience Flows](#6-chat-experience-flows)
7. [Dashboard Navigation Flows](#7-dashboard-navigation-flows)
8. [Persona-Based Flow Variations](#8-persona-based-flow-variations)
9. [Error & Edge Case Flows](#9-error--edge-case-flows)
10. [Future Module Integration Flows](#10-future-module-integration-flows)

---

## 1. Flow Legend

```
┌─────────────┐
│   Screen    │     Rectangle = Screen/Page
└─────────────┘

╔═════════════╗
║  Decision   ║     Double-border = Decision point
╚═════════════╝

(  Action   )        Parentheses = User action

[  System  ]         Brackets = System action

     │
     ▼                Arrow = Flow direction

     ●                Filled circle = Start point

     ◉                Double circle = End point

- - - - - - -        Dashed line = Optional/conditional path

═════════════        Double line = Primary/happy path
```

---

## 2. High-Level Application Flow

### 2.1 Current Implementation

```
                                    ●
                                    │
                                    ▼
                          ┌─────────────────┐
                          │   / (Index)     │
                          │   Entry Point   │
                          └────────┬────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │      [Check localStorage]    │
                    │      onboarding state        │
                    └──────────────┬──────────────┘
                                   │
              ╔════════════════════╩════════════════════╗
              ║                                         ║
              ║   NOTE: Returning user check is        ║
              ║   currently DISABLED in code           ║
              ║                                         ║
              ╚════════════════════╤════════════════════╝
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │    Cinematic Intro       │
                    │    (~15 seconds)         │
                    └────────────┬─────────────┘
                                 │
                    (Click CTA or Skip)
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │    Split Onboarding      │
                    │    (4-Question Quiz)     │
                    └────────────┬─────────────┘
                                 │
                    (Complete all questions)
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │    Persona Reveal        │
                    │    + Continue CTA        │
                    └────────────┬─────────────┘
                                 │
                    (Click "Continue to Dashboard")
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │    Welcome Dashboard     │
                    │    (First-time users)    │
                    └────────────┬─────────────┘
                                 │
                    (Click "Start Conversation")
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │    /chat                 │
                    │    (Sophia Chat)         │
                    └────────────┬─────────────┘
                                 │
                                 ◉
```

### 2.2 Proposed Implementation

```
                                    ●
                                    │
                                    ▼
                          ┌─────────────────┐
                          │   / (Index)     │
                          │   Entry Point   │
                          └────────┬────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │      [Check localStorage]    │
                    │      onboarding state        │
                    └──────────────┬──────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
╔═══════════════════╗  ╔═══════════════════╗  ╔═══════════════════╗
║ fully-onboarded?  ║  ║ quiz-completed?   ║  ║ not-started?      ║
╚════════╤══════════╝  ╚════════╤══════════╝  ╚════════╤══════════╝
         │                      │                      │
         ▼                      ▼                      ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   /dashboard    │    │     /chat       │    │ Cinematic Intro │
│   (Main)        │    │ (Skip Welcome   │    │ (8-10 seconds)  │
│                 │    │  Dashboard)     │    │                 │
└─────────────────┘    └─────────────────┘    └────────┬────────┘
                                                       │
                                          (Click CTA or Skip)
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │  Quiz with      │
                                              │  Sophia         │
                                              └────────┬────────┘
                                                       │
                                          (Complete quiz)
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │  /chat          │
                                              │  (Sophia greets │
                                              │   proactively)  │
                                              └────────┬────────┘
                                                       │
                                                       ◉
```

---

## 3. First-Time User Journey

### 3.1 Current Flow (Detailed)

```
●
│
▼
┌───────────────────────────────────────────────────────────────────────────┐
│                           CINEMATIC INTRO                                  │
│                                                                           │
│  Phase 1: Logo fade (0-800ms)                                             │
│      │                                                                    │
│      ▼                                                                    │
│  Phase 2: Overlay + Tagline appear (800-4000ms)                           │
│      │    "Where ancient wisdom meets modern discovery"                   │
│      ▼                                                                    │
│  Phase 3: Sophia orb rises at 5x scale (4000-4800ms)                      │
│      │                                                                    │
│      ▼                                                                    │
│  Phase 4: Orb shrinks to 1x (4800-8400ms)                                 │
│      │                                                                    │
│      ▼                                                                    │
│  Phase 5: Wholelicity text appears (8400-9900ms)                          │
│      │                                                                    │
│      ▼                                                                    │
│  Phase 6: Orb transforms to button (9900-10600ms)                         │
│      │                                                                    │
│      ▼                                                                    │
│  Phase 7: CTA pill expands (10600-11400ms)                                │
│      │                                                                    │
│      ▼                                                                    │
│  Phase 8: "Begin Your Journey" types (11400-13400ms)                      │
│      │                                                                    │
│      ▼                                                                    │
│  Phase 9: Cursor blinks (13400-14900ms)                                   │
│      │                                                                    │
│      ▼                                                                    │
│  Phase 10: Complete - CTA clickable                                       │
│                                                                           │
│  [Skip intro] button appears at 2000ms                                    │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
│
├─────────────────────────────────┐
│                                 │
(Click "Begin Your Journey")    (Click "Skip intro")
│                                 │
└─────────────────┬───────────────┘
                  │
                  ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                         SPLIT ONBOARDING QUIZ                              │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ LEFT SIDE                    │ RIGHT SIDE                           │  │
│  │                              │                                      │  │
│  │ "Let's get started!"         │ ┌──────────────────────────────────┐ │  │
│  │ (SVG graphic)                │ │     GLASSMORPHIC CHAT PANEL      │ │  │
│  │                              │ │                                  │ │  │
│  │ ○ ○ ○ ○                      │ │  [Sophia Avatar]                 │ │  │
│  │ Progress dots                │ │                                  │ │  │
│  │                              │ │  "Welcome! I'm Sophia..."        │ │  │
│  │                              │ │                                  │ │  │
│  │                              │ │  Q1: Spiritual background        │ │  │
│  │                              │ │  ┌──────────────────────┐        │ │  │
│  │                              │ │  │ Option buttons       │        │ │  │
│  │                              │ │  └──────────────────────┘        │ │  │
│  │                              │ └──────────────────────────────────┘ │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
│
▼
┌───────────────────────────────────────────────────────────────────────────┐
│                           QUIZ QUESTION FLOW                               │
│                                                                           │
│  Q1: "Where are you in your spiritual journey?"                           │
│      │                                                                    │
│      (Select option) ──► [User answer appears as chat bubble]             │
│      │                                                                    │
│      ▼                                                                    │
│  Q2: "How do you learn best?"                                             │
│      │                                                                    │
│      (Select option) ──► [User answer appears as chat bubble]             │
│      │                                                                    │
│      ▼                                                                    │
│  Q3: "How do you prefer to grow spiritually?"                             │
│      │                                                                    │
│      (Select option) ──► [User answer appears as chat bubble]             │
│      │                                                                    │
│      ▼                                                                    │
│  Q4: "What brings you to explore deeper spiritual formation?"             │
│      │                                                                    │
│      (Select option) ──► [User answer appears as chat bubble]             │
│      │                                                                    │
│      ▼                                                                    │
│  [Processing animation: "Thank you for sharing!"]                         │
│      │                                                                    │
│      ▼                                                                    │
│  PERSONA REVEAL                                                           │
│  "Based on your responses, I see you as..."                               │
│  "[Persona Title]"                                                        │
│  "[Persona Description]"                                                  │
│  "I'm excited to journey with you!"                                       │
│      │                                                                    │
│      ▼                                                                    │
│  [Continue to Dashboard] button appears                                   │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
│
(Click "Continue to Dashboard")
│
▼
┌───────────────────────────────────────────────────────────────────────────┐
│                         WELCOME DASHBOARD                                  │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ Header: Logo + Date                                                 │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │                                                                     │  │
│  │  "Good [morning/afternoon/evening]"                                 │  │
│  │  "Welcome, Friend"                                                  │  │
│  │  [Persona-specific greeting]                                        │  │
│  │                                                                     │  │
│  │           ┌─────────────────┐                                       │  │
│  │           │                 │                                       │  │
│  │           │   [Sophia Orb]  │                                       │  │
│  │           │                 │                                       │  │
│  │           └─────────────────┘                                       │  │
│  │                                                                     │  │
│  │           ✨ MEET SOPHIA                                            │  │
│  │                                                                     │  │
│  │  "I'm your AI companion for spiritual formation..."                 │  │
│  │                                                                     │  │
│  │        ┌──────────────────────────────┐                             │  │
│  │        │   [Start Conversation →]     │                             │  │
│  │        └──────────────────────────────┘                             │  │
│  │                                                                     │  │
│  │  "No pressure. Just conversation."                                  │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
│
(Click "Start Conversation")
│
▼
┌───────────────────────────────────────────────────────────────────────────┐
│                              /CHAT                                         │
│                                                                           │
│  [markFirstActionTaken() called - user is now "fully-onboarded"]          │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ ┌─────────┐                                          ┌───────────┐ │  │
│  │ │ Sidebar │   [Sophia Avatar] Sophia                 │ Dark/Light│ │  │
│  │ │ (hidden │   "Your spiritual companion"             │   Toggle  │ │  │
│  │ │  mobile)│                                          └───────────┘ │  │
│  │ └─────────┘                                                        │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │                                                                     │  │
│  │                    WELCOME SCREEN                                   │  │
│  │                                                                     │  │
│  │              [Sophia Orb Animation]                                 │  │
│  │                                                                     │  │
│  │     "What would you like to explore today?"                         │  │
│  │                                                                     │  │
│  │     Suggested Topics:                                               │  │
│  │     ┌────────────────────────────────────────┐                      │  │
│  │     │ [Topic based on persona]               │                      │  │
│  │     └────────────────────────────────────────┘                      │  │
│  │     ┌────────────────────────────────────────┐                      │  │
│  │     │ [Topic based on persona]               │                      │  │
│  │     └────────────────────────────────────────┘                      │  │
│  │     ┌────────────────────────────────────────┐                      │  │
│  │     │ [Topic based on persona]               │                      │  │
│  │     └────────────────────────────────────────┘                      │  │
│  │                                                                     │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │  ┌─────────────────────────────────────────────────────────────┐   │  │
│  │  │ Type a message...                                     [Send]│   │  │
│  │  └─────────────────────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
│
◉ END (User begins conversation)
```

### 3.2 Proposed Flow (Streamlined)

```
●
│
▼
┌───────────────────────────────────────────────────────────────────────────┐
│                      CINEMATIC INTRO (STREAMLINED)                         │
│                                                                           │
│  Duration: 8-10 seconds (reduced from 15)                                 │
│                                                                           │
│  [Skip] button visible IMMEDIATELY (top right)                            │
│  [Progress indicator] subtle dots at bottom                               │
│                                                                           │
│  Phase 1: Logo fade (0-1.5s)                                              │
│      │                                                                    │
│      ▼                                                                    │
│  Phase 2: Overlay + Tagline (1.5-3.5s)                                    │
│      │                                                                    │
│      ▼                                                                    │
│  Phase 3: Sophia orb rises + shrinks (3.5-6s)                             │
│      │                                                                    │
│      ▼                                                                    │
│  Phase 4: Transform to CTA (6-7s)                                         │
│      │    *** CTA BECOMES CLICKABLE HERE ***                              │
│      ▼                                                                    │
│  Phase 5: Text types + Ready (7-9s)                                       │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
│
├─────────────────────────────────┐
│                                 │
(Click CTA at 5s+)              (Click "Skip" anytime)
│                                 │
└─────────────────┬───────────────┘
                  │
                  ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                    QUIZ WITH SOPHIA (ENHANCED)                             │
│                                                                           │
│  NEW FEATURES:                                                            │
│  • [Back] button on Q2-Q4                                                 │
│  • [Skip for now] option on each question                                 │
│  • Sophia acknowledges each answer                                        │
│  • Progress persists (can resume if interrupted)                          │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │  [Sophia]: "Welcome! I'm Sophia, your spiritual companion.          │  │
│  │            Let me ask a few questions to personalize your journey." │  │
│  │                                                                     │  │
│  │  Q1: Where are you in your spiritual journey?                       │  │
│  │                                                                     │  │
│  │  ┌─────────────────────────────────────────┐                        │  │
│  │  │ I'm new to faith and the Bible          │                        │  │
│  │  └─────────────────────────────────────────┘                        │  │
│  │  ┌─────────────────────────────────────────┐                        │  │
│  │  │ I've been a believer for years...       │                        │  │
│  │  └─────────────────────────────────────────┘                        │  │
│  │  ...                                                                │  │
│  │  ┌─────────────────────────────────────────┐                        │  │
│  │  │ Skip for now                            │  (uses default)        │  │
│  │  └─────────────────────────────────────────┘                        │  │
│  │                                                                     │  │
│  │  ○ ● ○ ○                                         [Back if Q2+]     │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                           │
│  SOPHIA ACKNOWLEDGMENTS (after each answer):                              │
│  • "New to faith" → "That's exciting! I'll help you explore gently."     │
│  • "Going deeper" → "Wonderful! Let's discover new depths together."     │
│  • "Visual learner" → "I'll make sure to show you patterns visually."    │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
│
(Complete quiz OR skip remaining)
│
▼
┌───────────────────────────────────────────────────────────────────────────┐
│                    PERSONA REVEAL (INTEGRATED)                             │
│                                                                           │
│  [Sophia]: "Based on what you've shared, I see you as..."                 │
│                                                                           │
│            "The [Modifier] [Base Title]"                                  │
│            (e.g., "The Contemplative Curious Seeker")                     │
│                                                                           │
│            "[Persona-specific description]"                               │
│                                                                           │
│            "Ready to start our first conversation?"                       │
│                                                                           │
│            ┌──────────────────────────────────┐                           │
│            │     Start Conversation →         │                           │
│            └──────────────────────────────────┘                           │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
│
(Click "Start Conversation")
│
▼
┌───────────────────────────────────────────────────────────────────────────┐
│                /CHAT - SOPHIA'S PROACTIVE GREETING                         │
│                                                                           │
│  *** SKIP WELCOME DASHBOARD - GO DIRECT TO CHAT ***                       │
│                                                                           │
│  [markQuizCompleted() called]                                             │
│                                                                           │
│  Sophia immediately sends personalized greeting based on persona:         │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │  [Sophia Avatar]                                                    │  │
│  │                                                                     │  │
│  │  [PERSONA-BASED GREETING - see examples below]                      │  │
│  │                                                                     │  │
│  │  Suggested Topics (persona-specific):                               │  │
│  │  ┌────────────────────────────────────────┐                         │  │
│  │  │ [Relevant to spiritual background]     │                         │  │
│  │  └────────────────────────────────────────┘                         │  │
│  │  ┌────────────────────────────────────────┐                         │  │
│  │  │ [Relevant to current season]           │                         │  │
│  │  └────────────────────────────────────────┘                         │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                           │
│  GREETING EXAMPLES BY PERSONA:                                            │
│                                                                           │
│  "New to Faith" + "Conversation Learner":                                 │
│  "Hi there! I'm so glad you're here. Since you mentioned you're new      │
│   to exploring faith and love learning through conversation, I thought   │
│   we could start by talking about whatever's on your mind.               │
│   What drew you to start this journey?"                                  │
│                                                                           │
│  "Going Deeper" + "Pattern Discoverer":                                   │
│  "Welcome! I can tell you've been walking with God for years and love    │
│   discovering connections. After all that time, there are still depths   │
│   in Scripture that might surprise you. What familiar passage would      │
│   you like to see with fresh eyes?"                                      │
│                                                                           │
│  "Pastor/Leader" + "Group Facilitator":                                   │
│  "Welcome, friend. I know ministry leadership keeps you constantly       │
│   giving. I'm here to help fill your cup while equipping you to serve    │
│   better. What's most pressing for you right now?"                       │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
│
(User sends first message OR clicks suggested topic)
│
▼
┌───────────────────────────────────────────────────────────────────────────┐
│                    FIRST INTERACTION COMPLETE                              │
│                                                                           │
│  [markFullyOnboarded() called]                                            │
│  User is now a "returning user"                                           │
│  Stats begin tracking                                                     │
│  Dashboard unlocked with full features                                    │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
│
◉ END
```

---

## 4. Returning User Journey

### 4.1 Current Flow (BROKEN)

```
●
│
▼
┌─────────────────────────────────────────────────────────────────┐
│                         / (Index)                                │
│                                                                  │
│  Current code (lines 25-38 of Index.tsx):                        │
│                                                                  │
│  // TEMPORARILY DISABLED: Always show intro for testing          │
│  // if (isReturningUser()) {                                     │
│  //   navigate('/dashboard');                                    │
│  //   return;                                                    │
│  // }                                                            │
│                                                                  │
│  RESULT: Returning users see cinematic intro EVERY TIME          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────┐
│                   CINEMATIC INTRO (AGAIN)                        │
│                                                                  │
│  Returning user must watch/skip intro they've already seen       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
│
▼
❌ POOR USER EXPERIENCE
```

### 4.2 Proposed Flow (FIXED)

```
●
│
▼
┌─────────────────────────────────────────────────────────────────┐
│                         / (Index)                                │
│                                                                  │
│  [getOnboardingState()]                                          │
│                                                                  │
└───────────────────────────────┬─────────────────────────────────┘
                                │
          ╔═════════════════════╩═════════════════════╗
          ║         What is user's phase?             ║
          ╚═════════════════════╤═════════════════════╝
                                │
     ┌──────────────┬───────────┼───────────┬──────────────┐
     │              │           │           │              │
     ▼              ▼           ▼           ▼              ▼
╔═════════╗  ╔═══════════╗ ╔═════════╗ ╔═════════╗  ╔═══════════╗
║ fully-  ║  ║  quiz-    ║ ║  quiz-  ║ ║ intro-  ║  ║   not-    ║
║onboarded║  ║ completed ║ ║ started ║ ║  seen   ║  ║  started  ║
╚════╤════╝  ╚═════╤═════╝ ╚════╤════╝ ╚════╤════╝  ╚═════╤═════╝
     │             │            │           │              │
     ▼             ▼            ▼           ▼              ▼
┌─────────┐  ┌──────────┐ ┌──────────┐ ┌─────────┐  ┌───────────┐
│  Main   │  │  /chat   │ │  Resume  │ │  Show   │  │ Cinematic │
│Dashboard│  │(skip WD) │ │  Quiz    │ │  Quiz   │  │   Intro   │
└────┬────┘  └────┬─────┘ │ at last  │ │         │  └─────┬─────┘
     │            │       │ question │ │         │        │
     ▼            │       └────┬─────┘ └────┬────┘        │
                  │            │            │             │
                  └────────────┴────────────┴─────────────┘
                                │
                                ▼
                               ◉
```

### 4.3 Returning User Dashboard Flow

```
●
│
▼
┌───────────────────────────────────────────────────────────────────────────┐
│                          MAIN DASHBOARD                                    │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ [Logo]                                              [Dark/Light]    │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │                                                                     │  │
│  │  [Date]                                                             │  │
│  │  Good [time of day], [Name]                                         │  │
│  │  [Persona greeting]                                                 │  │
│  │                                                                     │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │                                                                     │  │
│  │  ┌───────────────────────────────────────────────────────────────┐  │  │
│  │  │  SOPHIA CARD                                                  │  │  │
│  │  │                                                               │  │  │
│  │  │  [Sophia Orb]        ✨ Sophia                                │  │  │
│  │  │                                                               │  │  │
│  │  │                      "[Daily prompt]"                         │  │  │
│  │  │                                                               │  │  │
│  │  │                      [Continue Conversation →]                │  │  │
│  │  │                                                               │  │  │
│  │  └───────────────────────────────────────────────────────────────┘  │  │
│  │                                                                     │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │  Your Journey                                                       │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐                             │  │
│  │  │ [Days]  │  │ [Convs] │  │[Insights│                             │  │
│  │  │ Streak  │  │         │  │  Saved] │                             │  │
│  │  └─────────┘  └─────────┘  └─────────┘                             │  │
│  │                                                                     │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │  Recent Insights (if any)                                          │  │
│  │  ┌─────────────────────────────────────────────────────────────┐   │  │
│  │  │ [Insight 1]                                      [date]     │   │  │
│  │  └─────────────────────────────────────────────────────────────┘   │  │
│  │                                                                     │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │  Explore                                                           │  │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐                         │  │
│  │  │ Wisdom    │ │ Formation │ │ Community │                         │  │
│  │  │ Guide ✓   │ │ [Soon]    │ │ [Soon]    │                         │  │
│  │  └───────────┘ └───────────┘ └───────────┘                         │  │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐                         │  │
│  │  │ Pattern   │ │ TimeWalk  │ │Translation│                         │  │
│  │  │ [Soon]    │ │ [Soon]    │ │ [Soon]    │                         │  │
│  │  └───────────┘ └───────────┘ └───────────┘                         │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
│
│
├────────────────────────────┬────────────────────────────┐
│                            │                            │
(Click "Continue             (Click Module               (Click Insight)
 Conversation")               Card)                       │
│                            │                            │
▼                            ▼                            ▼
┌─────────────┐      ╔═══════════════╗           ┌─────────────┐
│   /chat     │      ║ Is module     ║           │ Insight     │
│             │      ║ available?    ║           │ Detail      │
└─────────────┘      ╚═══════╤═══════╝           │ (Future)    │
                             │                   └─────────────┘
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
        ╔═════════╗                  ╔═════════════╗
        ║   Yes   ║                  ║  No (Soon)  ║
        ╚════╤════╝                  ╚══════╤══════╝
             │                              │
             ▼                              ▼
      ┌────────────┐              ┌─────────────────┐
      │ Navigate   │              │ "Coming Soon"   │
      │ to module  │              │ Toast/Modal     │
      └────────────┘              │                 │
                                  │ Options:        │
                                  │ • Notify me     │
                                  │ • Preview       │
                                  │ • Talk to Sophia│
                                  └─────────────────┘
```

---

## 5. Onboarding Detail Flows

### 5.1 Quiz Question Flow (Current)

```
┌─────────────────────────────────────────────────────────────────┐
│                    QUIZ QUESTION FLOW                            │
│                                                                  │
│  Q1 ─────► Q2 ─────► Q3 ─────► Q4 ─────► Persona Reveal         │
│                                                                  │
│  • No back navigation                                            │
│  • No skip option                                                │
│  • Must complete all 4                                           │
│  • Progress lost if user leaves                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Quiz Question Flow (Proposed)

```
┌─────────────────────────────────────────────────────────────────┐
│                    QUIZ QUESTION FLOW (ENHANCED)                 │
│                                                                  │
│                        ┌───────┐                                 │
│           ┌───────────►│ Skip  │◄───────────┐                    │
│           │            │ Quiz  │            │                    │
│           │            └───┬───┘            │                    │
│           │                │                │                    │
│           │     (Uses default persona)      │                    │
│           │                │                │                    │
│           │                ▼                │                    │
│  ┌────┐   │   ┌────┐   ┌────┐   ┌────┐     │                    │
│  │ Q1 │◄──┴──►│ Q2 │◄─►│ Q3 │◄─►│ Q4 │─────┴───► Persona        │
│  └─┬──┘       └─┬──┘   └─┬──┘   └─┬──┘          Reveal          │
│    │            │        │        │                              │
│    │            │        │        │                              │
│    ▼            ▼        ▼        ▼                              │
│  [Save]      [Save]   [Save]   [Save]                            │
│  answer      answer   answer   answer                            │
│  to state    to state to state to state                          │
│                                                                  │
│  ◄─── Back navigation available on Q2, Q3, Q4                    │
│                                                                  │
│  "Skip for now" option on each question uses default:            │
│  • Spiritual: "exploring_faith"                                  │
│  • Learning: "reading_reflection"                                │
│  • Community: "both_personal_group"                              │
│  • Season: "spiritual_growth"                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Quiz Interruption Recovery Flow (Proposed)

```
●  User starts quiz
│
▼
┌─────────────────┐
│ Q1: Answered    │──► [Save to localStorage: quiz-started, Q1 answer]
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Q2: Answered    │──► [Save to localStorage: Q2 answer]
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Q3: In Progress │
└────────┬────────┘
         │
    ╔════╧════╗
    ║  USER   ║
    ║ LEAVES  ║
    ║  PAGE   ║
    ╚════╤════╝
         │
         ▼
    [State saved:
     phase: 'quiz-started'
     lastQuestion: 2
     answers: {Q1, Q2}]

         ⋮
    (Time passes)
         ⋮

●  User returns
│
▼
┌─────────────────┐
│ Check state     │
└────────┬────────┘
         │
    ╔════╧════╗
    ║ phase = ║
    ║  quiz-  ║
    ║ started ║
    ╚════╤════╝
         │
         ▼
┌───────────────────────────────────────┐
│ RESUME MODAL                          │
│                                       │
│ "Welcome back! You were in the        │
│  middle of setting up your profile."  │
│                                       │
│ [Continue where I left off]           │
│ [Start over]                          │
│                                       │
└───────────────────────────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
Continue    Start
at Q3       at Q1
(answers    (clear
preserved)  answers)
```

---

## 6. Chat Experience Flows

### 6.1 Chat Navigation Flow

```
┌───────────────────────────────────────────────────────────────────────────┐
│                         CHAT PAGE STRUCTURE                                │
│                                                                           │
│  ┌────────────────┬────────────────────────────────────────────────────┐  │
│  │                │                                                    │  │
│  │   SIDEBAR      │                    MAIN AREA                       │  │
│  │   (Desktop)    │                                                    │  │
│  │                │   ┌────────────────────────────────────────────┐   │  │
│  │ ┌────────────┐ │   │ HEADER                                     │   │  │
│  │ │ New Chat   │ │   │ [Menu] [Back] [Sophia Avatar] [Dark/Light] │   │  │
│  │ └────────────┘ │   └────────────────────────────────────────────┘   │  │
│  │                │                                                    │  │
│  │ Conversations  │   ┌────────────────────────────────────────────┐   │  │
│  │ ┌────────────┐ │   │                                            │   │  │
│  │ │ Conv 1     │ │   │              MESSAGE AREA                  │   │  │
│  │ └────────────┘ │   │                                            │   │  │
│  │ ┌────────────┐ │   │   Messages scroll here                     │   │  │
│  │ │ Conv 2     │ │   │                                            │   │  │
│  │ └────────────┘ │   │   [Sophia message]                         │   │  │
│  │                │   │   [User message]                           │   │  │
│  │ ─────────────  │   │   [Sophia message]                         │   │  │
│  │                │   │   ...                                      │   │  │
│  │ Suggested      │   │                                            │   │  │
│  │ Topics         │   │   [Typing indicator when Sophia responds]  │   │  │
│  │ ┌────────────┐ │   │                                            │   │  │
│  │ │ Topic 1    │ │   └────────────────────────────────────────────┘   │  │
│  │ └────────────┘ │                                                    │  │
│  │ ┌────────────┐ │   ┌────────────────────────────────────────────┐   │  │
│  │ │ Topic 2    │ │   │ INPUT AREA                                 │   │  │
│  │ └────────────┘ │   │ [Type a message...]              [Send]    │   │  │
│  │                │   └────────────────────────────────────────────┘   │  │
│  │                │                                                    │  │
│  └────────────────┴────────────────────────────────────────────────────┘  │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Conversation Flow

```
●  User enters /chat
│
▼
╔═══════════════════════════════════════╗
║  Is there a current conversation?     ║
╚════════════════╤══════════════════════╝
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
   ╔═════════╗       ╔═════════╗
   ║   Yes   ║       ║   No    ║
   ╚════╤════╝       ╚════╤════╝
        │                 │
        ▼                 ▼
┌─────────────────┐ ┌─────────────────────────────┐
│ Load messages   │ │ Show Welcome Screen         │
│ from database   │ │ • Sophia orb animation      │
│                 │ │ • "What would you like to   │
│ Display in      │ │    explore today?"          │
│ message area    │ │ • Suggested topics          │
│                 │ │                             │
│                 │ │ *** PROPOSED: Add Sophia's  │
│                 │ │     proactive greeting ***  │
└────────┬────────┘ └──────────────┬──────────────┘
         │                         │
         │                         │
         ▼                         ▼
┌─────────────────────────────────────────────────┐
│              USER ACTION                         │
└─────────────────────────────────────────────────┘
         │
    ┌────┴────┬────────────┬────────────┐
    │         │            │            │
    ▼         ▼            ▼            ▼
(Type     (Click      (Click       (Click
message)  topic)      sidebar      "New Chat")
    │         │        conv)            │
    │         │            │            │
    ▼         ▼            ▼            ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────────┐
│ Create │ │ Create │ │ Load   │ │ Clear      │
│ conv   │ │ conv   │ │ that   │ │ messages   │
│ if none│ │ with   │ │ conv's │ │ Show       │
│        │ │ topic  │ │messages│ │ welcome    │
│ Send   │ │ as     │ │        │ │ screen     │
│ message│ │ title  │ │        │ │            │
└────┬───┘ └────┬───┘ └────────┘ └────────────┘
     │          │
     ▼          ▼
┌────────────────────────────────────────────────┐
│              SEND TO SOPHIA                     │
│                                                │
│  [Show typing indicator]                       │
│                   │                            │
│                   ▼                            │
│  [Stream response from API]                    │
│                   │                            │
│                   ▼                            │
│  [Display Sophia's response]                   │
│                   │                            │
│                   ▼                            │
│  [Check for crisis keywords]                   │
│       │                                        │
│  ┌────┴────┐                                   │
│  │         │                                   │
│  ▼         ▼                                   │
│ None    Detected                               │
│  │         │                                   │
│  │         ▼                                   │
│  │    ┌────────────┐                           │
│  │    │ Show       │                           │
│  │    │ CrisisModal│                           │
│  │    │ with       │                           │
│  │    │ resources  │                           │
│  │    └────────────┘                           │
│  │                                             │
│  ▼                                             │
│ [User can continue conversation]               │
│                                                │
└────────────────────────────────────────────────┘
```

### 6.3 Save Insight Flow

```
●  Sophia sends a response
│
▼
┌─────────────────────────────────────────────┐
│ MESSAGE BUBBLE                               │
│                                             │
│ [Sophia Avatar]                             │
│                                             │
│ "This is Sophia's response about the topic  │
│  the user asked about..."                   │
│                                             │
│ [💾 Save Insight]  [📋 Copy]                │
│                                             │
└─────────────────────────────────────────────┘
│
(Click "Save Insight")
│
▼
┌─────────────────────────────────────────────┐
│ SAVE INSIGHT MODAL                          │
│                                             │
│ Title:                                      │
│ ┌─────────────────────────────────────────┐ │
│ │ [Auto-generated from message preview]   │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Category:                                   │
│ ○ Pattern Discovery                         │
│ ○ Cultural Context                          │
│ ○ Personal Growth                           │
│ ○ Theological                               │
│                                             │
│ [Cancel]                    [Save Insight]  │
│                                             │
└─────────────────────────────────────────────┘
│
(Click "Save Insight")
│
▼
┌─────────────────────────────────────────────┐
│ [Save to user profile]                      │
│ [Show toast: "Insight saved to dashboard"]  │
│ [Mark message as saved (change icon)]       │
└─────────────────────────────────────────────┘
│
◉
```

---

## 7. Dashboard Navigation Flows

### 7.1 Module Exploration Flow (Current)

```
●  User on Dashboard
│
▼
┌─────────────────────────────────────────────┐
│ EXPLORE MODULES                             │
│                                             │
│ ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│ │ Wisdom ✓  │ │ Formation │ │ Community │  │
│ │           │ │ [Soon]    │ │ [Soon]    │  │
│ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘  │
│       │             │             │         │
└───────┼─────────────┼─────────────┼─────────┘
        │             │             │
   (Click)       (Click)       (Click)
        │             │             │
        ▼             ▼             ▼
   ┌─────────┐  ┌───────────┐ ┌───────────┐
   │ Navigate│  │ Toast:    │ │ Toast:    │
   │ to /chat│  │ "Coming   │ │ "Coming   │
   │         │  │  Soon!"   │ │  Soon!"   │
   └─────────┘  └───────────┘ └───────────┘
```

### 7.2 Module Exploration Flow (Proposed)

```
●  User on Dashboard
│
▼
┌─────────────────────────────────────────────┐
│ EXPLORE MODULES                             │
│                                             │
│ ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│ │ Wisdom ✓  │ │ Formation │ │ Pattern   │  │
│ │           │ │ [Soon]    │ │ [Soon]    │  │
│ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘  │
│       │             │             │         │
└───────┼─────────────┼─────────────┼─────────┘
        │             │             │
   (Click)       (Click)       (Click)
        │             │             │
        ▼             ▼             ▼
   ┌─────────┐  ┌─────────────────────────────────────┐
   │ Navigate│  │ COMING SOON MODAL                   │
   │ to /chat│  │                                     │
   │         │  │ ┌─────────────────────────────────┐ │
   └─────────┘  │ │ [Preview visualization/image]   │ │
                │ │                                 │ │
                │ └─────────────────────────────────┘ │
                │                                     │
                │ "Pattern Explorer"                  │
                │ Discover hidden connections across  │
                │ all of Scripture.                   │
                │                                     │
                │ This module is coming soon!         │
                │                                     │
                │ ┌───────────────────────────────┐   │
                │ │ Notify me when ready          │   │
                │ └───────────────────────────────┘   │
                │ ┌───────────────────────────────┐   │
                │ │ Preview sample patterns       │   │
                │ └───────────────────────────────┘   │
                │ ┌───────────────────────────────┐   │
                │ │ Ask Sophia about patterns     │   │
                │ └───────────────────────────────┘   │
                │                                     │
                │                          [Close]    │
                └─────────────────────────────────────┘
                        │
         ┌──────────────┼──────────────┐
         │              │              │
         ▼              ▼              ▼
    (Notify)       (Preview)      (Ask Sophia)
         │              │              │
         ▼              ▼              ▼
    ┌─────────┐   ┌─────────┐    ┌─────────┐
    │ Save    │   │ Show    │    │ Navigate│
    │ email   │   │ static  │    │ to /chat│
    │ for     │   │ preview │    │ with    │
    │ waitlist│   │ content │    │ pattern │
    │         │   │         │    │ prompt  │
    └─────────┘   └─────────┘    └─────────┘
```

---

## 8. Persona-Based Flow Variations

### 8.1 Persona Determination Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    PERSONA CALCULATION                           │
│                                                                  │
│  INPUT: 4 Quiz Answers                                           │
│                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐                      │
│  │ Spiritual       │ +  │ Learning        │ = Base Persona       │
│  │ Background      │    │ Style           │                      │
│  └─────────────────┘    └─────────────────┘                      │
│                                                                  │
│  COMBINATIONS:                                                   │
│                                                                  │
│  new_to_faith + conversation    = "Curious Seeker"               │
│  new_to_faith + visual          = "Visual Explorer"              │
│  new_to_faith + reading         = "Reflective Beginner"          │
│  new_to_faith + hands_on        = "Active Discoverer"            │
│  new_to_faith + patterns        = "Pattern Seeker"               │
│                                                                  │
│  believer_going_deeper + patterns = "Discovery Veteran"          │
│  believer_going_deeper + reading  = "Contemplative Student"      │
│  believer_going_deeper + visual   = "Holistic Artist"            │
│  ...                                                             │
│                                                                  │
│  pastor_leader + groups          = "Equipped Shepherd"           │
│  pastor_leader + conversation    = "Pastoral Guide"              │
│  ...                                                             │
│                                                                  │
│  MODIFIERS from Community Preference & Current Season:           │
│  • small_group → emphasize Community module                      │
│  • individual_study → de-emphasize Community                     │
│  • difficult_situation → softer Sophia tone                      │
│  • ministry_preparation → practical focus                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 Persona → Experience Mapping

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PERSONA EXPERIENCE MAPPING                                │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ CURIOUS SEEKER (new_to_faith + conversation)                        │    │
│  │                                                                     │    │
│  │ Sophia Tone: Warm, patient, exploratory                             │    │
│  │ Primary Modules: Wisdom Guide, Community                            │    │
│  │ Suggested Topics:                                                   │    │
│  │   • "Who is Jesus and why does he matter?"                          │    │
│  │   • "I have questions about faith"                                  │    │
│  │   • "How do I read the Bible?"                                      │    │
│  │ First Message Style: Welcoming, no pressure, curious about story    │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ DISCOVERY VETERAN (believer_going_deeper + patterns)                │    │
│  │                                                                     │    │
│  │ Sophia Tone: Scholarly, surprising, assumes biblical literacy       │    │
│  │ Primary Modules: Pattern Explorer, Wisdom Guide                     │    │
│  │ Suggested Topics:                                                   │    │
│  │   • "Show me connections I've never seen"                           │    │
│  │   • "Fresh insights on familiar passages"                           │    │
│  │   • "Deep theological exploration"                                  │    │
│  │ First Message Style: Acknowledges maturity, promises new depths     │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ EQUIPPED SHEPHERD (pastor_leader + groups)                          │    │
│  │                                                                     │    │
│  │ Sophia Tone: Practical, equipping, peer-level                       │    │
│  │ Primary Modules: Community, Wisdom Guide                            │    │
│  │ Suggested Topics:                                                   │    │
│  │   • "Help me prepare a sermon"                                      │    │
│  │   • "Wisdom for pastoral situation"                                 │    │
│  │   • "Equip my small group leaders"                                  │    │
│  │ First Message Style: Acknowledges burden of ministry, offers help   │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ VISUAL EXPLORER (any + visual)                                      │    │
│  │                                                                     │    │
│  │ Sophia Tone: Illustrative, story-driven, shows vs tells             │    │
│  │ Primary Modules: TimeWalk, Pattern Explorer                         │    │
│  │ Suggested Topics:                                                   │    │
│  │   • "Show me what [place] looked like"                              │    │
│  │   • "Visualize the patterns in [book]"                              │    │
│  │   • "Walk me through [event]"                                       │    │
│  │ First Message Style: Promises visual discoveries, may include       │    │
│  │   ASCII art or description of what they'll see                      │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Error & Edge Case Flows

### 9.1 Network Error During Chat

```
●  User sends message
│
▼
┌─────────────────┐
│ [Show typing    │
│  indicator]     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│ [API call to Sophia]        │
└────────────────┬────────────┘
                 │
         ╔═══════╧═══════╗
         ║    Error?     ║
         ╚═══════╤═══════╝
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
   ╔═════════╗       ╔═════════╗
   ║   No    ║       ║   Yes   ║
   ╚════╤════╝       ╚════╤════╝
        │                 │
        ▼                 ▼
   ┌─────────┐      ┌─────────────────────────────┐
   │ Display │      │ ERROR STATE                 │
   │ response│      │                             │
   └─────────┘      │ [Hide typing indicator]     │
                    │                             │
                    │ Show error message:         │
                    │ "Sorry, I couldn't connect. │
                    │  Please try again."         │
                    │                             │
                    │ [Retry] [Dismiss]           │
                    │                             │
                    └─────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
               (Retry)             (Dismiss)
                    │                   │
                    ▼                   ▼
              ┌─────────┐         ┌─────────┐
              │ Resend  │         │ Remove  │
              │ message │         │ error   │
              └─────────┘         │ message │
                                  │ Keep    │
                                  │ user's  │
                                  │ message │
                                  │ in input│
                                  └─────────┘
```

### 9.2 Crisis Detection Flow

```
●  User sends message containing crisis keywords
│
▼
┌─────────────────────────────────────┐
│ [Message sent to Sophia]            │
│ [Crisis keywords detected]          │
│                                     │
│ Keywords: "suicide", "self-harm",   │
│ "end my life", "kill myself", etc.  │
│                                     │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────┐
│ CRISIS MODAL                                                     │
│                                                                  │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │                                                            │  │
│ │  It sounds like you might be going through                 │  │
│ │  a difficult time.                                         │  │
│ │                                                            │  │
│ │  If you're in crisis, please reach out to:                 │  │
│ │                                                            │  │
│ │  🆘 National Suicide Prevention Lifeline                   │  │
│ │     988 (call or text)                                     │  │
│ │                                                            │  │
│ │  💬 Crisis Text Line                                       │  │
│ │     Text HOME to 741741                                    │  │
│ │                                                            │  │
│ │  🌐 International Association for Suicide Prevention       │  │
│ │     https://www.iasp.info/resources/Crisis_Centres/        │  │
│ │                                                            │  │
│ │  Sophia is here to talk, but trained counselors            │  │
│ │  can provide the support you need right now.               │  │
│ │                                                            │  │
│ └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  [I understand, continue talking with Sophia]                    │
│  [Call 988 now]                                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                   │
         ┌────────┴────────┐
         │                 │
         ▼                 ▼
    (Continue)         (Call 988)
         │                 │
         ▼                 ▼
    ┌─────────┐      ┌─────────────┐
    │ Close   │      │ Open phone  │
    │ modal   │      │ dialer with │
    │         │      │ 988         │
    │ Continue│      └─────────────┘
    │ chat    │
    │         │
    │ Sophia  │
    │ responds│
    │ with    │
    │ care &  │
    │ empathy │
    └─────────┘
```

### 9.3 Empty State Flows

```
┌─────────────────────────────────────────────────────────────────┐
│                    EMPTY STATES                                  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ NO CONVERSATIONS (Sidebar)                                  │ │
│  │                                                             │ │
│  │ "No conversations yet"                                      │ │
│  │ "Start a new conversation with Sophia"                      │ │
│  │                                                             │ │
│  │ [+ New Conversation]                                        │ │
│  │                                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ NO INSIGHTS (Dashboard)                                     │ │
│  │                                                             │ │
│  │ "No insights saved yet"                                     │ │
│  │ "Save meaningful moments from your conversations            │ │
│  │  with Sophia to review later."                              │ │
│  │                                                             │ │
│  │ [Start a Conversation]                                      │ │
│  │                                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ STATS AT ZERO (Dashboard)                                   │ │
│  │                                                             │ │
│  │ Day Streak: 1 (not 0 - they're here today!)                 │ │
│  │ Conversations: 0 → "Start your first"                       │ │
│  │ Insights: 0 → "Save your first"                             │ │
│  │                                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. Future Module Integration Flows

### 10.1 Cross-Module Discovery Flow (Future Vision)

```
●  User chatting with Sophia about "the woman at the well"
│
▼
┌─────────────────────────────────────────────────────────────────┐
│ SOPHIA RESPONSE                                                  │
│                                                                  │
│ "The woman at the well is such a beautiful encounter. Jesus     │
│  crossed cultural boundaries that most Jews wouldn't cross..."   │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ CONTEXTUAL MODULE SUGGESTIONS                               │ │
│ │                                                             │ │
│ │ 🕰️ TimeWalk: Experience 1st century Samaria               │ │
│ │ 🔗 Patterns: See "living water" theme across Scripture     │ │
│ │ 🌍 Translation: How different cultures understand this     │ │
│ │ 👥 Community: Others discussing this passage               │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
│
(User clicks "TimeWalk")
│
▼
┌─────────────────────────────────────────────────────────────────┐
│ TIMEWALK MODULE                                                  │
│                                                                  │
│ [Immersive historical experience loads]                          │
│                                                                  │
│ "You're standing at Jacob's well in Sychar, Samaria.            │
│  The sun is high - it's about noon. A woman approaches          │
│  alone, unusual for this time of day when the heat is           │
│  most intense. She carries a water jar..."                       │
│                                                                  │
│ [Visual: Ancient well, dusty road, Middle Eastern landscape]    │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Continue in TimeWalk | Return to Sophia | See Patterns      │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
│
(User clicks "See Patterns")
│
▼
┌─────────────────────────────────────────────────────────────────┐
│ PATTERN EXPLORER                                                 │
│                                                                  │
│ "Living Water" Theme Across Scripture                            │
│                                                                  │
│            ┌─────────────────────────────────────┐               │
│            │                                     │               │
│   Genesis ─┤   "Springs of water"                │               │
│            │           │                         │               │
│            │           ▼                         │               │
│   Exodus ──┤   "Water from the rock"             │               │
│            │           │                         │               │
│            │           ▼                         │               │
│   Psalms ──┤   "Streams of living water"         │               │
│            │           │                         │               │
│            │           ▼                         │               │
│   John 4 ──┤   "Living water" (woman at well)  ◄─── YOU ARE HERE│
│            │           │                         │               │
│            │           ▼                         │               │
│   John 7 ──┤   "Rivers of living water"          │               │
│            │           │                         │               │
│            │           ▼                         │               │
│   Rev 22 ──┤   "River of life"                   │               │
│            │                                     │               │
│            └─────────────────────────────────────┘               │
│                                                                  │
│ [Discuss with Sophia] [Explore in TimeWalk] [Share to Community]│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 10.2 Community Integration Flow (Future Vision)

```
●  User saves insight from Sophia conversation
│
▼
┌─────────────────────────────────────────────────────────────────┐
│ INSIGHT SAVED                                                    │
│                                                                  │
│ "Your insight about forgiveness in the prodigal son story       │
│  has been saved."                                                │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 👥 3 others are exploring forgiveness this week.            │ │
│ │    Would you like to join their discussion?                 │ │
│ │                                                             │ │
│ │    [Join Discussion] [Maybe Later]                          │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
│
(User clicks "Join Discussion")
│
▼
┌─────────────────────────────────────────────────────────────────┐
│ COMMUNITY CATALYST                                               │
│                                                                  │
│ "Forgiveness" Discussion Group                                   │
│ 4 participants • Active now                                      │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Sophia - Facilitator]                                      │ │
│ │ "Welcome to the group! We're exploring what Scripture       │ │
│ │  teaches about forgiveness. What's been on your heart?"     │ │
│ │                                                             │ │
│ │ [Margaret - Veteran]                                        │ │
│ │ "I've been wrestling with forgiving someone who..."         │ │
│ │                                                             │ │
│ │ [You - Just joined]                                         │ │
│ │ [Type a message or share your insight...]                   │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Related Resources:                                          │ │
│ │ • Pattern: "Forgiveness" across Scripture                   │ │
│ │ • TimeWalk: The unforgiving servant's world                 │ │
│ │ • Sophia: Private questions about forgiveness               │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Summary

This document provides comprehensive user flow diagrams for Wholelicity covering:

1. **Current vs. Proposed flows** highlighting key improvements
2. **First-time user journey** from landing to first chat
3. **Returning user journey** with proper state detection
4. **Detailed onboarding flows** including quiz and persona assignment
5. **Chat experience flows** including conversation management
6. **Dashboard navigation** including module exploration
7. **Persona-based variations** showing personalized experiences
8. **Error and edge cases** ensuring graceful failure handling
9. **Future module integration** showing the vision for cross-module discovery

### Key Improvements Highlighted:
- Shorter, more interactive cinematic intro
- Quiz with back navigation and skip options
- Skip WelcomeDashboard - go direct to chat
- Sophia's proactive personalized greeting
- Fixed returning user detection
- Richer "Coming Soon" module interactions
- Cross-module discovery flows (future)

---

*Next deliverable: Information Architecture*
