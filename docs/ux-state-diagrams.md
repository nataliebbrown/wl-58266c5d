# Wholelicity State Diagrams

This document defines how screens and components change state based on user actions, system events, and data conditions. It provides the foundation for consistent behavior across the platform.

---

## Table of Contents

1. [State Diagram Legend](#1-state-diagram-legend)
2. [Application State](#2-application-state)
3. [Onboarding State Machine](#3-onboarding-state-machine)
4. [Authentication State](#4-authentication-state)
5. [Chat State](#5-chat-state)
6. [Conversation State](#6-conversation-state)
7. [Message State](#7-message-state)
8. [Dashboard State](#8-dashboard-state)
9. [Modal State](#9-modal-state)
10. [Theme State](#10-theme-state)
11. [Persona State](#11-persona-state)

---

## 1. State Diagram Legend

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STATE DIAGRAM LEGEND                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SYMBOLS                                                                    │
│                                                                             │
│  ●              Initial state (filled circle)                               │
│  ◉              Final state (double circle)                                 │
│                                                                             │
│  ┌─────────┐                                                                │
│  │  State  │    State node (rectangle)                                      │
│  └─────────┘                                                                │
│                                                                             │
│  ───────►       Transition (arrow)                                          │
│                                                                             │
│  [action]       User action or event trigger                                │
│                                                                             │
│  {condition}    Guard condition                                             │
│                                                                             │
│  /effect        Side effect of transition                                   │
│                                                                             │
│                                                                             │
│  EXAMPLE TRANSITION                                                         │
│                                                                             │
│  ┌─────────┐    [click submit]                   ┌─────────┐               │
│  │  Idle   │ ────────────────────────────────►   │ Loading │               │
│  └─────────┘    {form valid}                     └─────────┘               │
│                 /disable button                                             │
│                                                                             │
│  Reads: "From Idle state, when user clicks submit AND form is valid,        │
│          transition to Loading state AND disable the button"                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Application State

### 2.1 Top-Level Application State

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    APPLICATION STATE MACHINE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                              ●                                              │
│                              │                                              │
│                              │ [app loads]                                  │
│                              │ /check auth status                           │
│                              ▼                                              │
│                     ┌────────────────┐                                      │
│                     │  Initializing  │                                      │
│                     └───────┬────────┘                                      │
│                             │                                               │
│              ┌──────────────┼──────────────┐                                │
│              │              │              │                                │
│              ▼              │              ▼                                │
│     ┌────────────────┐      │     ┌────────────────┐                        │
│     │ Unauthenticated│      │     │ Authenticated  │                        │
│     └───────┬────────┘      │     └───────┬────────┘                        │
│             │               │             │                                 │
│             │               │             │ [check onboarding]              │
│             │               │             ▼                                 │
│             │               │    ┌────────────────┐                         │
│             │               │    │  Check         │                         │
│             │               │    │  Onboarding    │                         │
│             │               │    └───────┬────────┘                         │
│             │               │            │                                  │
│             │        ┌──────┴──────┬─────┴─────┐                            │
│             │        │             │           │                            │
│             │        ▼             ▼           ▼                            │
│             │   ┌─────────┐  ┌──────────┐  ┌─────────┐                      │
│             │   │Onboarding│  │Onboarding│  │  Ready  │                      │
│             │   │Not Done  │  │Partial   │  │         │                      │
│             │   └────┬─────┘  └────┬─────┘  └────┬────┘                      │
│             │        │             │             │                          │
│             │        ▼             ▼             ▼                          │
│             │   ┌─────────┐  ┌──────────┐  ┌─────────┐                      │
│             │   │  Show   │  │  Resume  │  │  Show   │                      │
│             │   │  Intro  │  │  Quiz    │  │Dashboard│                      │
│             │   └─────────┘  └──────────┘  └─────────┘                      │
│             │                                                               │
│             │ [login success]                                               │
│             └────────────────────────────────────►                          │
│                                                                             │
│                                                                             │
│  STATE PERSISTENCE:                                                         │
│  • Auth state: Supabase session (cookies/localStorage)                      │
│  • Onboarding state: localStorage                                           │
│  • User preferences: localStorage + Supabase                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Application State Interface

```typescript
interface ApplicationState {
  // Authentication
  auth: {
    status: 'initializing' | 'unauthenticated' | 'authenticated';
    user: User | null;
    session: Session | null;
  };

  // Onboarding
  onboarding: {
    phase: OnboardingPhase;
    quizProgress: QuizProgress | null;
    persona: string | null;
  };

  // UI State
  ui: {
    theme: 'light' | 'dark' | 'system';
    sidebarOpen: boolean;
    activeModal: ModalType | null;
  };

  // Feature Flags
  features: {
    patternExplorer: boolean;
    timeWalk: boolean;
    community: boolean;
    translationBridge: boolean;
    formationHub: boolean;
  };
}
```

---

## 3. Onboarding State Machine

### 3.1 Onboarding Phase States

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ONBOARDING STATE MACHINE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ●                                                                          │
│  │                                                                          │
│  │ [first visit]                                                            │
│  ▼                                                                          │
│  ┌───────────────┐                                                          │
│  │  not-started  │◄──────────────────────────────────────────────┐          │
│  └───────┬───────┘                                               │          │
│          │                                                       │          │
│          │ [complete intro OR skip]                              │          │
│          │ /save intro-seen                                      │          │
│          ▼                                                       │          │
│  ┌───────────────┐                                               │          │
│  │  intro-seen   │                                               │          │
│  └───────┬───────┘                                               │          │
│          │                                                       │          │
│          │ [answer first question]                               │          │
│          │ /save quiz-started + answer                           │          │
│          ▼                                                       │          │
│  ┌───────────────┐     [clear data]                              │          │
│  │ quiz-started  │ ──────────────────────────────────────────────┘          │
│  └───────┬───────┘                                                          │
│          │                                                                  │
│          │ [complete all questions]                                         │
│          │ /calculate persona                                               │
│          │ /save quiz-completed + persona                                   │
│          ▼                                                                  │
│  ┌────────────────┐                                                         │
│  │ quiz-completed │                                                         │
│  └───────┬────────┘                                                         │
│          │                                                                  │
│          │ [send first message OR navigate to dashboard]                    │
│          │ /save fully-onboarded                                            │
│          ▼                                                                  │
│  ┌──────────────────┐                                                       │
│  │ fully-onboarded  │ ◉                                                     │
│  └──────────────────┘                                                       │
│                                                                             │
│                                                                             │
│  PHASE ROUTING:                                                             │
│  ┌─────────────────┬──────────────────────────────────────────────────┐    │
│  │ Phase           │ Route Behavior                                   │    │
│  ├─────────────────┼──────────────────────────────────────────────────┤    │
│  │ not-started     │ Show cinematic intro                             │    │
│  │ intro-seen      │ Show quiz at question 1                          │    │
│  │ quiz-started    │ Resume quiz at last answered + 1                 │    │
│  │ quiz-completed  │ Go to chat (skip WelcomeDashboard)               │    │
│  │ fully-onboarded │ Go to dashboard                                  │    │
│  └─────────────────┴──────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Quiz State Machine

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        QUIZ STATE MACHINE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ●                                                                          │
│  │                                                                          │
│  │ [enter quiz]                                                             │
│  ▼                                                                          │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                          QUIZ CONTEXT                                 │  │
│  │                                                                       │  │
│  │    ┌──────────┐   [answer]   ┌──────────┐   [answer]   ┌──────────┐  │  │
│  │    │Question 1│ ──────────►  │Question 2│ ──────────►  │Question 3│  │  │
│  │    │spiritual │   /save      │ learning │   /save      │community │  │  │
│  │    │background│              │  style   │              │preference│  │  │
│  │    └──────────┘              └────┬─────┘              └────┬─────┘  │  │
│  │         ▲                         │                         │        │  │
│  │         │                    [back]                    [back]        │  │
│  │         │                         │                         │        │  │
│  │         └─────────────────────────┴─────────────────────────┘        │  │
│  │                                                                       │  │
│  │                                        [answer]   ┌──────────┐       │  │
│  │                               ────────────────►   │Question 4│       │  │
│  │                                    /save          │ current  │       │  │
│  │                                                   │  season  │       │  │
│  │                                                   └────┬─────┘       │  │
│  │                                                        │             │  │
│  │                                                   [answer]           │  │
│  │                                                        │             │  │
│  │                                                        ▼             │  │
│  │                                                   ┌──────────┐       │  │
│  │                                                   │ Persona  │       │  │
│  │                                                   │ Reveal   │       │  │
│  │                                                   └────┬─────┘       │  │
│  │                                                        │             │  │
│  └────────────────────────────────────────────────────────┼─────────────┘  │
│                                                           │                │
│                                                      [continue]            │
│                                                           │                │
│                                                           ▼                │
│                                                        ◉ Exit              │
│                                                          (to chat)         │
│                                                                             │
│                                                                             │
│  QUESTION STATE:                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  Each question has these internal states:                           │   │
│  │                                                                     │   │
│  │  ┌──────────┐   [select]   ┌──────────┐   [confirm]   ┌─────────┐  │   │
│  │  │ Awaiting │ ──────────►  │ Selected │ ───────────►  │Confirmed│  │   │
│  │  │  Input   │              │          │               │         │  │   │
│  │  └──────────┘              └────┬─────┘               └─────────┘  │   │
│  │                                 │                                   │   │
│  │                            [deselect]                               │   │
│  │                                 │                                   │   │
│  │                                 ▼                                   │   │
│  │                            ┌──────────┐                             │   │
│  │                            │ Awaiting │                             │   │
│  │                            │  Input   │                             │   │
│  │                            └──────────┘                             │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Onboarding State Interface

```typescript
type OnboardingPhase =
  | 'not-started'
  | 'intro-seen'
  | 'quiz-started'
  | 'quiz-completed'
  | 'fully-onboarded';

interface QuizProgress {
  lastQuestionAnswered: 0 | 1 | 2 | 3 | 4;
  answers: {
    spiritualBackground?: SpiritualBackground;
    learningStyle?: LearningStyle;
    communityPreference?: CommunityPreference;
    currentSeason?: CurrentSeason;
  };
}

interface OnboardingState {
  phase: OnboardingPhase;
  quizProgress: QuizProgress | null;
  persona: string | null;
  quizCompletedAt: string | null;
  firstChatAt: string | null;
  lastVisitAt: string;
  visitCount: number;
}
```

---

## 4. Authentication State

### 4.1 Auth State Machine

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION STATE MACHINE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ●                                                                          │
│  │                                                                          │
│  │ [app init]                                                               │
│  ▼                                                                          │
│  ┌───────────────┐                                                          │
│  │  Checking     │                                                          │
│  │  Session      │                                                          │
│  └───────┬───────┘                                                          │
│          │                                                                  │
│     ┌────┴────┐                                                             │
│     │         │                                                             │
│     ▼         ▼                                                             │
│  {no session} {has session}                                                 │
│     │         │                                                             │
│     ▼         ▼                                                             │
│  ┌─────────────┐      ┌─────────────────┐                                   │
│  │  Logged     │      │  Authenticated  │◄─────────────────┐                │
│  │  Out        │      │                 │                  │                │
│  └──────┬──────┘      └────────┬────────┘                  │                │
│         │                      │                           │                │
│         │ [login attempt]      │ [logout]                  │                │
│         ▼                      ▼                           │                │
│  ┌─────────────┐      ┌─────────────────┐                  │                │
│  │  Logging    │      │   Logging       │                  │                │
│  │  In         │      │   Out           │                  │                │
│  └──────┬──────┘      └────────┬────────┘                  │                │
│         │                      │                           │                │
│    ┌────┴────┐                 │                           │                │
│    │         │                 │                           │                │
│    ▼         ▼                 ▼                           │                │
│ {success} {failure}     ┌─────────────┐                    │                │
│    │         │          │  Logged     │                    │                │
│    │         │          │  Out        │                    │                │
│    │         ▼          └─────────────┘                    │                │
│    │  ┌─────────────┐                                      │                │
│    │  │  Login      │                                      │                │
│    │  │  Error      │                                      │                │
│    │  └──────┬──────┘                                      │                │
│    │         │                                             │                │
│    │         │ [retry]                                     │                │
│    │         └──────────────────────────────┐              │                │
│    │                                        │              │                │
│    └────────────────────────────────────────┴──────────────┘                │
│                                                                             │
│                                                                             │
│  SESSION REFRESH:                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────────────┐   [token expiring]   ┌─────────────────┐      │   │
│  │  │  Authenticated  │ ──────────────────►  │  Refreshing     │      │   │
│  │  └─────────────────┘                      └────────┬────────┘      │   │
│  │          ▲                                         │               │   │
│  │          │                              ┌──────────┴──────────┐    │   │
│  │          │                              │                     │    │   │
│  │          │ [refresh success]            ▼                     ▼    │   │
│  │          └──────────────────────   {success}             {failure} │   │
│  │                                                               │    │   │
│  │                                                               ▼    │   │
│  │                                                        ┌──────────┐│   │
│  │                                                        │ Logged   ││   │
│  │                                                        │ Out      ││   │
│  │                                                        └──────────┘│   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Chat State

### 5.1 Chat Page State Machine

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CHAT PAGE STATE MACHINE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ●                                                                          │
│  │                                                                          │
│  │ [navigate to /chat]                                                      │
│  ▼                                                                          │
│  ┌───────────────┐                                                          │
│  │   Loading     │                                                          │
│  │ Conversations │                                                          │
│  └───────┬───────┘                                                          │
│          │                                                                  │
│          │ [conversations loaded]                                           │
│          ▼                                                                  │
│     ┌────┴────────────────────────────────────────────────┐                 │
│     │                                                     │                 │
│     ▼                                                     ▼                 │
│  {has conversations}                               {no conversations}       │
│     │                                                     │                 │
│     ▼                                                     ▼                 │
│  ┌─────────────────┐                              ┌─────────────────┐       │
│  │ Show Most       │                              │ Show Welcome    │       │
│  │ Recent Convo    │                              │ Screen          │       │
│  └────────┬────────┘                              └────────┬────────┘       │
│           │                                                │                │
│           │                                                │                │
│           └────────────────────┬───────────────────────────┘                │
│                                │                                            │
│                                ▼                                            │
│                       ┌────────────────┐                                    │
│                       │     Ready      │◄─────────────────────────┐         │
│                       │                │                          │         │
│                       └────────┬───────┘                          │         │
│                                │                                  │         │
│         ┌──────────────────────┼──────────────────────┐           │         │
│         │                      │                      │           │         │
│         ▼                      ▼                      ▼           │         │
│  [new conversation]    [select convo]         [send message]      │         │
│         │                      │                      │           │         │
│         ▼                      ▼                      ▼           │         │
│  ┌─────────────┐      ┌─────────────────┐    ┌─────────────┐     │         │
│  │  Create     │      │   Load Convo    │    │  Sending    │     │         │
│  │  New Convo  │      │   Messages      │    │  Message    │     │         │
│  └──────┬──────┘      └────────┬────────┘    └──────┬──────┘     │         │
│         │                      │                    │             │         │
│         │                      │              ┌─────┴─────┐       │         │
│         │                      │              │           │       │         │
│         │                      │              ▼           ▼       │         │
│         │                      │         {success}   {error}      │         │
│         │                      │              │           │       │         │
│         │                      │              │           ▼       │         │
│         │                      │              │    ┌────────────┐ │         │
│         │                      │              │    │ Show Error │ │         │
│         │                      │              │    │ + Retry    │ │         │
│         │                      │              │    └─────┬──────┘ │         │
│         │                      │              │          │        │         │
│         └──────────────────────┴──────────────┴──────────┴────────┘         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Chat Input State

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CHAT INPUT STATE MACHINE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ●                                                                          │
│  │                                                                          │
│  ▼                                                                          │
│  ┌───────────────────┐                                                      │
│  │      Empty        │◄───────────────────────────────────────┐             │
│  │                   │                                        │             │
│  │  [Send disabled]  │                                        │             │
│  └─────────┬─────────┘                                        │             │
│            │                                                  │             │
│            │ [user types]                                     │             │
│            ▼                                                  │             │
│  ┌───────────────────┐                                        │             │
│  │   Has Content     │                                        │             │
│  │                   │    [clear input]                       │             │
│  │  [Send enabled]   │ ───────────────────────────────────────┘             │
│  └─────────┬─────────┘                                                      │
│            │                                                                │
│            │ [press Enter OR click Send]                                    │
│            │ {content.length > 0}                                           │
│            ▼                                                                │
│  ┌───────────────────┐                                                      │
│  │     Sending       │                                                      │
│  │                   │                                                      │
│  │  [Input disabled] │                                                      │
│  │  [Show spinner]   │                                                      │
│  └─────────┬─────────┘                                                      │
│            │                                                                │
│            │ [message sent successfully]                                    │
│            │ /clear input                                                   │
│            ▼                                                                │
│  ┌───────────────────┐                                                      │
│  │      Empty        │                                                      │
│  │                   │                                                      │
│  │  [Ready for next] │                                                      │
│  └───────────────────┘                                                      │
│                                                                             │
│                                                                             │
│  INPUT HEIGHT STATES:                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────────┐   [content > 1 line]   ┌─────────────┐            │   │
│  │  │  Single     │ ────────────────────►  │  Expanded   │            │   │
│  │  │  Line       │                        │  (2-4 lines)│            │   │
│  │  └─────────────┘ ◄────────────────────  └─────────────┘            │   │
│  │                    [content <= 1 line]                              │   │
│  │                                                                     │   │
│  │  Max height: 4 lines, then scroll                                   │   │
│  │  Transition: 150ms ease-out                                         │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Conversation State

### 6.1 Conversation Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CONVERSATION STATE MACHINE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ●                                                                          │
│  │                                                                          │
│  │ [user sends first message OR selects topic]                              │
│  ▼                                                                          │
│  ┌───────────────┐                                                          │
│  │   Creating    │                                                          │
│  └───────┬───────┘                                                          │
│          │                                                                  │
│          │ [conversation created in DB]                                     │
│          │ /generate title from first message                               │
│          ▼                                                                  │
│  ┌───────────────┐                                                          │
│  │    Active     │◄────────────────────────────────────────────┐            │
│  │               │                                             │            │
│  │ • Can send    │                                             │            │
│  │ • Can receive │                                             │            │
│  └───────┬───────┘                                             │            │
│          │                                                     │            │
│          ├──────────────────┬──────────────────┐               │            │
│          │                  │                  │               │            │
│          ▼                  ▼                  ▼               │            │
│   [send message]    [navigate away]    [delete convo]         │            │
│          │                  │                  │               │            │
│          │                  ▼                  ▼               │            │
│          │          ┌─────────────┐    ┌─────────────┐         │            │
│          │          │   Paused    │    │  Deleting   │         │            │
│          │          │             │    └──────┬──────┘         │            │
│          │          │ • Persisted │           │                │            │
│          │          │ • Resumable │           │                │            │
│          │          └──────┬──────┘           │                │            │
│          │                 │                  │                │            │
│          │            [return]                │                │            │
│          │                 │                  │                │            │
│          └─────────────────┴───────┐          │                │            │
│                                    │          │                │            │
│                                    │          ▼                │            │
│                                    │   ┌─────────────┐         │            │
│                                    │   │  Deleted    │ ◉       │            │
│                                    │   └─────────────┘         │            │
│                                    │                           │            │
│                                    └───────────────────────────┘            │
│                                                                             │
│                                                                             │
│  CONVERSATION DATA STATE:                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  interface Conversation {                                           │   │
│  │    id: string;                                                      │   │
│  │    user_id: string;                                                 │   │
│  │    title: string;                                                   │   │
│  │    created_at: string;                                              │   │
│  │    updated_at: string;                                              │   │
│  │    message_count: number;                                           │   │
│  │    status: 'active' | 'archived' | 'deleted';                       │   │
│  │  }                                                                  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Message State

### 7.1 User Message State

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     USER MESSAGE STATE MACHINE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ●                                                                          │
│  │                                                                          │
│  │ [user clicks send]                                                       │
│  ▼                                                                          │
│  ┌───────────────┐                                                          │
│  │   Optimistic  │  Message appears immediately in UI                       │
│  │   (Sending)   │  Shows small spinner/pending indicator                   │
│  └───────┬───────┘                                                          │
│          │                                                                  │
│     ┌────┴────┐                                                             │
│     │         │                                                             │
│     ▼         ▼                                                             │
│  {success} {failure}                                                        │
│     │         │                                                             │
│     ▼         ▼                                                             │
│  ┌─────────┐  ┌─────────────┐                                               │
│  │  Sent   │  │   Failed    │                                               │
│  │         │  │             │                                               │
│  │ ✓ icon  │  │ ⚠ icon      │                                               │
│  └─────────┘  │ [Retry]     │                                               │
│               └──────┬──────┘                                               │
│                      │                                                      │
│                      │ [click retry]                                        │
│                      │                                                      │
│                      ▼                                                      │
│               ┌───────────────┐                                             │
│               │   Retrying    │                                             │
│               └───────┬───────┘                                             │
│                       │                                                     │
│                       │ (same flow as initial send)                         │
│                       ▼                                                     │
│                      ...                                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Sophia Message State

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SOPHIA MESSAGE STATE MACHINE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ●                                                                          │
│  │                                                                          │
│  │ [user message sent]                                                      │
│  ▼                                                                          │
│  ┌───────────────────┐                                                      │
│  │  Typing Indicator │  • Show typing dots                                  │
│  │                   │  • Sophia orb "thinking" state                       │
│  └─────────┬─────────┘                                                      │
│            │                                                                │
│            │ [first token received]                                         │
│            │ /hide typing indicator                                         │
│            ▼                                                                │
│  ┌───────────────────┐                                                      │
│  │    Streaming      │  • Text appears character by character               │
│  │                   │  • Sophia orb "speaking" state                       │
│  │                   │  • Auto-scroll follows text                          │
│  └─────────┬─────────┘                                                      │
│            │                                                                │
│       ┌────┴────┐                                                           │
│       │         │                                                           │
│       ▼         ▼                                                           │
│  [stream ends]  [error]                                                     │
│       │         │                                                           │
│       ▼         ▼                                                           │
│  ┌─────────┐  ┌─────────────────┐                                           │
│  │Complete │  │  Error State    │                                           │
│  │         │  │                 │                                           │
│  │ • Full  │  │  "Sorry, I      │                                           │
│  │   text  │  │   couldn't      │                                           │
│  │ • Actions│  │   respond..."   │                                           │
│  │   visible│  │                 │                                           │
│  └─────────┘  │  [Retry]        │                                           │
│               └─────────────────┘                                           │
│                                                                             │
│                                                                             │
│  CRISIS DETECTION (Parallel State):                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  During streaming, content is analyzed for crisis keywords          │   │
│  │                                                                     │   │
│  │  ┌───────────┐   [keywords detected]   ┌───────────────┐           │   │
│  │  │ Analyzing │ ─────────────────────►  │ Crisis Modal  │           │   │
│  │  │           │                         │ Triggered     │           │   │
│  │  └───────────┘                         └───────────────┘           │   │
│  │        │                                                            │   │
│  │        │ [no keywords]                                              │   │
│  │        ▼                                                            │   │
│  │  ┌───────────┐                                                      │   │
│  │  │  Normal   │                                                      │   │
│  │  │  Flow     │                                                      │   │
│  │  └───────────┘                                                      │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.3 Message Action States

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MESSAGE ACTION STATE MACHINES                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SAVE INSIGHT ACTION                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ●                                                                  │   │
│  │  │                                                                  │   │
│  │  ▼                                                                  │   │
│  │  ┌─────────┐   [hover message]   ┌─────────────┐                   │   │
│  │  │ Hidden  │ ─────────────────►  │  Visible    │                   │   │
│  │  └─────────┘ ◄─────────────────  │  (idle)     │                   │   │
│  │               [leave message]    └──────┬──────┘                   │   │
│  │                                         │                          │   │
│  │                                    [click save]                    │   │
│  │                                         │                          │   │
│  │                                         ▼                          │   │
│  │                                  ┌─────────────┐                   │   │
│  │                                  │ Modal Open  │                   │   │
│  │                                  └──────┬──────┘                   │   │
│  │                                         │                          │   │
│  │                                    ┌────┴────┐                     │   │
│  │                                    │         │                     │   │
│  │                                    ▼         ▼                     │   │
│  │                               [cancel]   [save]                    │   │
│  │                                    │         │                     │   │
│  │                                    │         ▼                     │   │
│  │                                    │  ┌─────────────┐              │   │
│  │                                    │  │   Saving    │              │   │
│  │                                    │  └──────┬──────┘              │   │
│  │                                    │         │                     │   │
│  │                                    │         ▼                     │   │
│  │                                    │  ┌─────────────┐              │   │
│  │                                    │  │   Saved     │              │   │
│  │                                    │  │   ✓         │              │   │
│  │                                    │  └──────┬──────┘              │   │
│  │                                    │         │                     │   │
│  │                                    │         │ [2s delay]          │   │
│  │                                    │         ▼                     │   │
│  │                                    └────► ┌─────────┐              │   │
│  │                                          │  Idle   │              │   │
│  │                                          └─────────┘              │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  COPY ACTION                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────┐   [click]   ┌─────────┐   [1.5s]   ┌─────────┐        │   │
│  │  │  Idle   │ ─────────►  │ Copied! │ ────────►  │  Idle   │        │   │
│  │  │  📋     │             │   ✓     │            │  📋     │        │   │
│  │  └─────────┘             └─────────┘            └─────────┘        │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Dashboard State

### 8.1 Dashboard Loading States

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     DASHBOARD STATE MACHINE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ●                                                                          │
│  │                                                                          │
│  │ [navigate to /dashboard]                                                 │
│  ▼                                                                          │
│  ┌───────────────────┐                                                      │
│  │  Loading          │  Show skeleton UI                                    │
│  │                   │                                                      │
│  └─────────┬─────────┘                                                      │
│            │                                                                │
│            │ [data fetched]                                                 │
│            │                                                                │
│       ┌────┴────────────────────────────┐                                   │
│       │                                 │                                   │
│       ▼                                 ▼                                   │
│  {isFirstTime}                    {isReturning}                             │
│       │                                 │                                   │
│       ▼                                 ▼                                   │
│  ┌─────────────────┐            ┌─────────────────┐                         │
│  │ Welcome         │            │ Main            │                         │
│  │ Dashboard       │            │ Dashboard       │                         │
│  │                 │            │                 │                         │
│  │ • Sophia intro  │            │ • Stats         │                         │
│  │ • Large orb     │            │ • Insights      │                         │
│  │ • Single CTA    │            │ • Modules       │                         │
│  └────────┬────────┘            └────────┬────────┘                         │
│           │                              │                                  │
│           │ [click "Start               │                                  │
│           │  Conversation"]              │                                  │
│           │                              │                                  │
│           ▼                              │                                  │
│    Navigate to /chat                     │                                  │
│    Mark fully-onboarded                  │                                  │
│                                          │                                  │
│                                          │                                  │
│  MAIN DASHBOARD INTERACTIONS:            │                                  │
│           ┌──────────────────────────────┘                                  │
│           │                                                                 │
│           ├────────────────┬─────────────────┬──────────────────┐           │
│           │                │                 │                  │           │
│           ▼                ▼                 ▼                  ▼           │
│    [click Sophia    [click module      [click insight    [click stat       │
│     card]           card]              card]             card]             │
│           │                │                 │                  │           │
│           ▼                ▼                 ▼                  ▼           │
│    Navigate         Check if          Show insight       (Future:          │
│    to /chat         available         detail             stats page)       │
│                          │                                                  │
│                     ┌────┴────┐                                             │
│                     │         │                                             │
│                     ▼         ▼                                             │
│                {available} {coming soon}                                    │
│                     │         │                                             │
│                     ▼         ▼                                             │
│                Navigate    Show "Coming                                     │
│                to module   Soon" modal                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Stats State

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        STATS STATE MACHINE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  DAY STREAK CALCULATION                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ●                                                                  │   │
│  │  │                                                                  │   │
│  │  │ [user visits]                                                    │   │
│  │  ▼                                                                  │   │
│  │  ┌───────────────────┐                                              │   │
│  │  │ Check Last Active │                                              │   │
│  │  └─────────┬─────────┘                                              │   │
│  │            │                                                        │   │
│  │       ┌────┴────┬────────────────┐                                  │   │
│  │       │         │                │                                  │   │
│  │       ▼         ▼                ▼                                  │   │
│  │  {today}    {yesterday}     {older}                                 │   │
│  │       │         │                │                                  │   │
│  │       ▼         ▼                ▼                                  │   │
│  │  Keep same   Increment        Reset to 1                            │   │
│  │  streak      streak           (streak broken)                       │   │
│  │       │         │                │                                  │   │
│  │       └─────────┴────────────────┘                                  │   │
│  │                 │                                                   │   │
│  │                 ▼                                                   │   │
│  │          Update lastActiveAt                                        │   │
│  │          to today                                                   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  STATS DATA STRUCTURE                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  interface JourneyStats {                                           │   │
│  │    currentStreak: number;      // Days in a row                     │   │
│  │    longestStreak: number;      // Personal best                     │   │
│  │    totalConversations: number; // All-time count                    │   │
│  │    totalInsights: number;      // Saved insights count              │   │
│  │    lastActiveAt: string;       // ISO date of last visit            │   │
│  │  }                                                                  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Modal State

### 9.1 Generic Modal State

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MODAL STATE MACHINE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ●                                                                          │
│  │                                                                          │
│  ▼                                                                          │
│  ┌───────────────┐                                                          │
│  │    Closed     │◄─────────────────────────────────────────────┐           │
│  │               │                                              │           │
│  │ • Not visible │                                              │           │
│  │ • Not mounted │                                              │           │
│  └───────┬───────┘                                              │           │
│          │                                                      │           │
│          │ [trigger open]                                       │           │
│          │ /lock body scroll                                    │           │
│          │ /trap focus                                          │           │
│          ▼                                                      │           │
│  ┌───────────────┐                                              │           │
│  │   Opening     │  Backdrop + modal animating in               │           │
│  │   (300ms)     │                                              │           │
│  └───────┬───────┘                                              │           │
│          │                                                      │           │
│          │ [animation complete]                                 │           │
│          ▼                                                      │           │
│  ┌───────────────┐                                              │           │
│  │     Open      │                                              │           │
│  │               │                                              │           │
│  │ • Visible     │                                              │           │
│  │ • Interactive │                                              │           │
│  └───────┬───────┘                                              │           │
│          │                                                      │           │
│          │ [close trigger: X, backdrop, escape, action]         │           │
│          │ /unlock body scroll                                  │           │
│          │ /release focus trap                                  │           │
│          ▼                                                      │           │
│  ┌───────────────┐                                              │           │
│  │   Closing     │  Backdrop + modal animating out              │           │
│  │   (200ms)     │                                              │           │
│  └───────┬───────┘                                              │           │
│          │                                                      │           │
│          │ [animation complete]                                 │           │
│          │ /return focus to trigger                             │           │
│          └──────────────────────────────────────────────────────┘           │
│                                                                             │
│                                                                             │
│  CLOSE TRIGGERS:                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  • Click X button                 → Always available                │   │
│  │  • Click backdrop                 → Unless preventClose=true        │   │
│  │  • Press Escape key               → Unless preventClose=true        │   │
│  │  • Complete primary action        → Modal-specific                  │   │
│  │  • Click Cancel/secondary action  → Modal-specific                  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Crisis Modal State (Special)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     CRISIS MODAL STATE MACHINE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ●                                                                          │
│  │                                                                          │
│  │ [crisis keywords detected in message]                                    │
│  ▼                                                                          │
│  ┌───────────────────┐                                                      │
│  │      Open         │                                                      │
│  │                   │                                                      │
│  │ • Cannot dismiss  │                                                      │
│  │   via backdrop    │                                                      │
│  │ • Cannot dismiss  │                                                      │
│  │   via Escape      │                                                      │
│  │ • Must acknowledge│                                                      │
│  └─────────┬─────────┘                                                      │
│            │                                                                │
│       ┌────┴────┐                                                           │
│       │         │                                                           │
│       ▼         ▼                                                           │
│  [click       [click "I understand,                                         │
│   "Call 988"]  continue with Sophia"]                                       │
│       │         │                                                           │
│       ▼         ▼                                                           │
│  ┌─────────┐  ┌───────────────┐                                             │
│  │ Open    │  │    Closed     │                                             │
│  │ Dialer  │  │               │                                             │
│  │         │  │ /set flag for │                                             │
│  │ (modal  │  │  gentle       │                                             │
│  │  stays  │  │  response     │                                             │
│  │  open)  │  └───────────────┘                                             │
│  └─────────┘                                                                │
│                                                                             │
│                                                                             │
│  POST-CRISIS CONVERSATION STATE:                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  After crisis modal is acknowledged:                                │   │
│  │  • Sophia's response includes extra care/empathy                    │   │
│  │  • Flag stored in conversation context                              │   │
│  │  • Does NOT prevent further conversation                            │   │
│  │  • Does NOT lock user out                                           │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 10. Theme State

### 10.1 Theme State Machine

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        THEME STATE MACHINE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ●                                                                          │
│  │                                                                          │
│  │ [app loads]                                                              │
│  │ /read from localStorage                                                  │
│  │ /fallback to 'system'                                                    │
│  ▼                                                                          │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         THEME CONTEXT                                 │  │
│  │                                                                       │  │
│  │       ┌─────────┐        ┌─────────┐        ┌─────────┐              │  │
│  │       │  Light  │◄──────►│  Dark   │◄──────►│ System  │              │  │
│  │       └────┬────┘        └────┬────┘        └────┬────┘              │  │
│  │            │                  │                  │                    │  │
│  │            │                  │                  │                    │  │
│  │       [toggle]           [toggle]           [toggle]                 │  │
│  │            │                  │                  │                    │  │
│  │            │                  │                  │                    │  │
│  │            └──────────────────┴──────────────────┘                    │  │
│  │                          │                                            │  │
│  │                          ▼                                            │  │
│  │                 /update localStorage                                  │  │
│  │                 /apply theme class to <html>                          │  │
│  │                 /update CSS variables                                 │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│                                                                             │
│  SYSTEM THEME DETECTION:                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  When theme = 'system':                                             │   │
│  │                                                                     │   │
│  │  ┌─────────────┐                                                    │   │
│  │  │   System    │                                                    │   │
│  │  │   Theme     │                                                    │   │
│  │  └──────┬──────┘                                                    │   │
│  │         │                                                           │   │
│  │         │ [check prefers-color-scheme]                              │   │
│  │         │                                                           │   │
│  │    ┌────┴────┐                                                      │   │
│  │    │         │                                                      │   │
│  │    ▼         ▼                                                      │   │
│  │  {dark}    {light}                                                  │   │
│  │    │         │                                                      │   │
│  │    ▼         ▼                                                      │   │
│  │  Apply     Apply                                                    │   │
│  │  dark      light                                                    │   │
│  │  theme     theme                                                    │   │
│  │                                                                     │   │
│  │  Listen for changes:                                                │   │
│  │  window.matchMedia('(prefers-color-scheme: dark)')                  │   │
│  │    .addEventListener('change', updateTheme)                         │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 11. Persona State

### 11.1 Persona Calculation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PERSONA STATE MACHINE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ●                                                                          │
│  │                                                                          │
│  │ [quiz completed with all answers]                                        │
│  ▼                                                                          │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                      PERSONA CALCULATION                              │  │
│  │                                                                       │  │
│  │  INPUT:                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │  │
│  │  │ spiritualBackground: string  (Q1)                               │ │  │
│  │  │ learningStyle: string        (Q2)                               │ │  │
│  │  │ communityPreference: string  (Q3)                               │ │  │
│  │  │ currentSeason: string        (Q4)                               │ │  │
│  │  └─────────────────────────────────────────────────────────────────┘ │  │
│  │                              │                                        │  │
│  │                              ▼                                        │  │
│  │  CALCULATION:                                                         │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │  │
│  │  │                                                                 │ │  │
│  │  │  basePersona = PERSONA_MAP[spiritualBackground][learningStyle]  │ │  │
│  │  │                                                                 │ │  │
│  │  │  modifiers = getModifiers(communityPreference, currentSeason)   │ │  │
│  │  │                                                                 │ │  │
│  │  │  persona = applyModifiers(basePersona, modifiers)               │ │  │
│  │  │                                                                 │ │  │
│  │  └─────────────────────────────────────────────────────────────────┘ │  │
│  │                              │                                        │  │
│  │                              ▼                                        │  │
│  │  OUTPUT:                                                              │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │  │
│  │  │ personaId: string           (e.g., "curious_seeker")            │ │  │
│  │  │ personaTitle: string        (e.g., "The Curious Seeker")        │ │  │
│  │  │ personaDescription: string  (paragraph describing persona)      │ │  │
│  │  │ primaryModules: string[]    (recommended modules)               │ │  │
│  │  │ suggestedTopics: string[]   (persona-specific topics)           │ │  │
│  │  │ sophiaTone: string          (tone setting for AI)               │ │  │
│  │  └─────────────────────────────────────────────────────────────────┘ │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│                                                                             │
│  PERSONA APPLICATION:                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  Once persona is set, it affects:                                   │   │
│  │                                                                     │   │
│  │  ┌─────────────┐     ┌─────────────────────────────────────────┐   │   │
│  │  │   Persona   │────►│ Dashboard greeting                      │   │   │
│  │  │   State     │────►│ Sophia's first message                  │   │   │
│  │  │             │────►│ Suggested topics in sidebar             │   │   │
│  │  │             │────►│ Module emphasis/ordering                │   │   │
│  │  │             │────►│ Sophia's tone and complexity            │   │   │
│  │  │             │────►│ Daily prompts                           │   │   │
│  │  └─────────────┘     └─────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                                                                             │
│  PERSONA PERSISTENCE:                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  Storage: localStorage (primary) + Supabase profile (backup)        │   │
│  │                                                                     │   │
│  │  Immutable after creation (v1)                                      │   │
│  │  Future: Allow re-assessment via settings                           │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Summary

This State Diagrams document defines:

1. **Application State** - Top-level app initialization and routing
2. **Onboarding State Machine** - Phases from first visit to fully onboarded
3. **Authentication State** - Login, logout, session management
4. **Chat State** - Page loading, conversation selection, input handling
5. **Conversation State** - Lifecycle from creation to deletion
6. **Message State** - User and Sophia message states, streaming
7. **Dashboard State** - Loading, first-time vs returning, interactions
8. **Modal State** - Generic and crisis-specific modal behaviors
9. **Theme State** - Light/dark/system theme management
10. **Persona State** - Calculation and application of user persona

### Key State Management Principles:

- **Persistence Strategy**: localStorage for UI state, Supabase for data
- **Optimistic Updates**: Show changes immediately, reconcile with server
- **Graceful Degradation**: Handle errors without crashing
- **State Recovery**: Support resuming interrupted flows (quiz, etc.)
- **Predictable Transitions**: Clear trigger → action → new state

---

*All 4 UX deliverables complete. Next: Implementation Phases*
