# Wholelicity Interaction Patterns

This document defines how components behave throughout the Wholelicity platform, including animations, transitions, micro-interactions, feedback patterns, and gesture handling.

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Animation System](#2-animation-system)
3. [Component Interactions](#3-component-interactions)
4. [Form Patterns](#4-form-patterns)
5. [Feedback Patterns](#5-feedback-patterns)
6. [Loading States](#6-loading-states)
7. [Gesture Patterns](#7-gesture-patterns)
8. [Modal & Overlay Patterns](#8-modal--overlay-patterns)
9. [Navigation Transitions](#9-navigation-transitions)
10. [Sophia-Specific Interactions](#10-sophia-specific-interactions)

---

## 1. Design Principles

### 1.1 Core Interaction Principles

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      INTERACTION PRINCIPLES                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. WARMTH & INVITATION                                                     │
│     • Interactions should feel welcoming, not mechanical                    │
│     • Animations are gentle, not abrupt                                     │
│     • Feedback is encouraging, not punitive                                 │
│                                                                             │
│  2. SPIRITUAL RHYTHM                                                        │
│     • Pacing allows for reflection                                          │
│     • Not everything needs to be instant                                    │
│     • Some deliberate pauses create contemplative space                     │
│                                                                             │
│  3. PROGRESSIVE REVELATION                                                  │
│     • Information appears when needed                                       │
│     • Complexity unfolds gradually                                          │
│     • Users never feel overwhelmed                                          │
│                                                                             │
│  4. CONSISTENT PERSONALITY                                                  │
│     • Sophia's presence felt throughout                                     │
│     • Interactions match her warm, wise character                           │
│     • Orb animations convey her "aliveness"                                 │
│                                                                             │
│  5. GRACEFUL DEGRADATION                                                    │
│     • Works without animations (reduced motion)                             │
│     • Meaningful without JavaScript                                         │
│     • Accessible to all users                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Timing Guidelines

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        TIMING GUIDELINES                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  DURATION SCALE                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Name        │ Duration │ Use Case                                   │   │
│  ├─────────────┼──────────┼────────────────────────────────────────────┤   │
│  │ instant     │ 0ms      │ Immediate state changes                    │   │
│  │ quick       │ 100ms    │ Micro-interactions, hover states           │   │
│  │ fast        │ 200ms    │ Button presses, toggles                    │   │
│  │ normal      │ 300ms    │ Standard transitions, modals               │   │
│  │ slow        │ 500ms    │ Page transitions, major reveals            │   │
│  │ deliberate  │ 800ms    │ Onboarding animations, emphasis            │   │
│  │ contemplative│ 1200ms+ │ Sophia typing, orb breathing               │   │
│  └─────────────┴──────────┴────────────────────────────────────────────┘   │
│                                                                             │
│  EASING FUNCTIONS                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Name              │ CSS                        │ Use Case           │   │
│  ├───────────────────┼────────────────────────────┼────────────────────┤   │
│  │ ease-out          │ cubic-bezier(0, 0, 0.2, 1) │ Entering elements  │   │
│  │ ease-in           │ cubic-bezier(0.4, 0, 1, 1) │ Exiting elements   │   │
│  │ ease-in-out       │ cubic-bezier(0.4, 0, 0.2, 1)│ Moving elements   │   │
│  │ bounce            │ cubic-bezier(.68,-0.55,.27,1.55)│ Playful feedback│   │
│  │ smooth            │ cubic-bezier(0.25, 0.1, 0.25, 1) │ Sophia orb   │   │
│  └───────────────────┴────────────────────────────┴────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Animation System

### 2.1 Entrance Animations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ENTRANCE ANIMATIONS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FADE IN                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ @keyframes fadeIn {                                                 │   │
│  │   from { opacity: 0; }                                              │   │
│  │   to { opacity: 1; }                                                │   │
│  │ }                                                                   │   │
│  │                                                                     │   │
│  │ Duration: 300ms                                                     │   │
│  │ Easing: ease-out                                                    │   │
│  │ Use: Default for most appearing elements                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  FADE IN UP                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ @keyframes fadeInUp {                                               │   │
│  │   from {                                                            │   │
│  │     opacity: 0;                                                     │   │
│  │     transform: translateY(20px);                                    │   │
│  │   }                                                                 │   │
│  │   to {                                                              │   │
│  │     opacity: 1;                                                     │   │
│  │     transform: translateY(0);                                       │   │
│  │   }                                                                 │   │
│  │ }                                                                   │   │
│  │                                                                     │   │
│  │ Duration: 400ms                                                     │   │
│  │ Easing: ease-out                                                    │   │
│  │ Use: Cards, messages, content blocks                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  SCALE IN                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ @keyframes scaleIn {                                                │   │
│  │   from {                                                            │   │
│  │     opacity: 0;                                                     │   │
│  │     transform: scale(0.9);                                          │   │
│  │   }                                                                 │   │
│  │   to {                                                              │   │
│  │     opacity: 1;                                                     │   │
│  │     transform: scale(1);                                            │   │
│  │   }                                                                 │   │
│  │ }                                                                   │   │
│  │                                                                     │   │
│  │ Duration: 300ms                                                     │   │
│  │ Easing: ease-out                                                    │   │
│  │ Use: Modals, dialogs, popovers                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  STAGGER CHILDREN                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ // Framer Motion example                                            │   │
│  │ const container = {                                                 │   │
│  │   hidden: { opacity: 0 },                                           │   │
│  │   show: {                                                           │   │
│  │     opacity: 1,                                                     │   │
│  │     transition: {                                                   │   │
│  │       staggerChildren: 0.1                                          │   │
│  │     }                                                               │   │
│  │   }                                                                 │   │
│  │ };                                                                  │   │
│  │                                                                     │   │
│  │ Stagger Delay: 100ms between items                                  │   │
│  │ Use: Lists, quiz options, module cards                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Exit Animations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         EXIT ANIMATIONS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FADE OUT                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Duration: 200ms (faster than entrance)                              │   │
│  │ Easing: ease-in                                                     │   │
│  │ Use: Default for disappearing elements                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  FADE OUT DOWN                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Duration: 300ms                                                     │   │
│  │ Easing: ease-in                                                     │   │
│  │ Use: Dismissing cards, removing items                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  SCALE OUT                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Duration: 200ms                                                     │   │
│  │ Easing: ease-in                                                     │   │
│  │ Use: Closing modals                                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Continuous Animations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CONTINUOUS ANIMATIONS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SOPHIA ORB BREATHING                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ @keyframes orbBreathing {                                           │   │
│  │   0%, 100% {                                                        │   │
│  │     transform: scale(1);                                            │   │
│  │     filter: brightness(1);                                          │   │
│  │   }                                                                 │   │
│  │   50% {                                                             │   │
│  │     transform: scale(1.05);                                         │   │
│  │     filter: brightness(1.1);                                        │   │
│  │   }                                                                 │   │
│  │ }                                                                   │   │
│  │                                                                     │   │
│  │ Duration: 4000ms                                                    │   │
│  │ Iteration: infinite                                                 │   │
│  │ Easing: ease-in-out                                                 │   │
│  │ Use: Sophia's orb in resting state                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  SOPHIA ORB THINKING (Active)                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ @keyframes orbThinking {                                            │   │
│  │   0%, 100% {                                                        │   │
│  │     transform: scale(1) rotate(0deg);                               │   │
│  │     filter: brightness(1.2);                                        │   │
│  │   }                                                                 │   │
│  │   25% {                                                             │   │
│  │     transform: scale(1.08) rotate(2deg);                            │   │
│  │   }                                                                 │   │
│  │   75% {                                                             │   │
│  │     transform: scale(1.08) rotate(-2deg);                           │   │
│  │   }                                                                 │   │
│  │ }                                                                   │   │
│  │                                                                     │   │
│  │ Duration: 2000ms                                                    │   │
│  │ Iteration: infinite                                                 │   │
│  │ Use: When Sophia is processing/typing                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  TYPING INDICATOR DOTS                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ @keyframes typingDot {                                              │   │
│  │   0%, 60%, 100% {                                                   │   │
│  │     transform: translateY(0);                                       │   │
│  │     opacity: 0.4;                                                   │   │
│  │   }                                                                 │   │
│  │   30% {                                                             │   │
│  │     transform: translateY(-8px);                                    │   │
│  │     opacity: 1;                                                     │   │
│  │   }                                                                 │   │
│  │ }                                                                   │   │
│  │                                                                     │   │
│  │ Duration: 1400ms                                                    │   │
│  │ Stagger: 200ms between dots                                         │   │
│  │ Use: Sophia typing indicator                                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  PULSE GLOW                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ @keyframes pulseGlow {                                              │   │
│  │   0%, 100% {                                                        │   │
│  │     box-shadow: 0 0 20px rgba(197, 180, 155, 0.3);                  │   │
│  │   }                                                                 │   │
│  │   50% {                                                             │   │
│  │     box-shadow: 0 0 40px rgba(197, 180, 155, 0.6);                  │   │
│  │   }                                                                 │   │
│  │ }                                                                   │   │
│  │                                                                     │   │
│  │ Duration: 2000ms                                                    │   │
│  │ Use: CTA buttons, focus states                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Interactions

### 3.1 Button Interactions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       BUTTON INTERACTIONS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PRIMARY BUTTON                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  DEFAULT STATE                                                      │   │
│  │  ┌───────────────────────────┐                                      │   │
│  │  │     Continue →            │  bg: primary                         │   │
│  │  └───────────────────────────┘  text: white                         │   │
│  │                                                                     │   │
│  │  HOVER STATE (200ms ease-out)                                       │   │
│  │  ┌───────────────────────────┐                                      │   │
│  │  │     Continue →            │  bg: primary-dark                    │   │
│  │  └───────────────────────────┘  transform: translateY(-1px)         │   │
│  │                                 box-shadow: elevated                 │   │
│  │                                                                     │   │
│  │  PRESSED STATE (100ms)                                              │   │
│  │  ┌───────────────────────────┐                                      │   │
│  │  │     Continue →            │  transform: translateY(0)            │   │
│  │  └───────────────────────────┘  box-shadow: none                    │   │
│  │                                                                     │   │
│  │  DISABLED STATE                                                     │   │
│  │  ┌───────────────────────────┐                                      │   │
│  │  │     Continue →            │  opacity: 0.5                        │   │
│  │  └───────────────────────────┘  cursor: not-allowed                 │   │
│  │                                                                     │   │
│  │  LOADING STATE                                                      │   │
│  │  ┌───────────────────────────┐                                      │   │
│  │  │     ◌ Loading...          │  spinner animation                   │   │
│  │  └───────────────────────────┘  pointer-events: none                │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  SECONDARY BUTTON                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  DEFAULT: bg: transparent, border: primary, text: primary           │   │
│  │  HOVER: bg: primary/10, border: primary-dark                        │   │
│  │  PRESSED: bg: primary/20                                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  GHOST BUTTON                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  DEFAULT: bg: transparent, text: muted                              │   │
│  │  HOVER: bg: muted/10, text: foreground                              │   │
│  │  PRESSED: bg: muted/20                                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ICON BUTTON                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  DEFAULT: opacity: 0.7                                              │   │
│  │  HOVER: opacity: 1, transform: scale(1.1)                           │   │
│  │  PRESSED: transform: scale(0.95)                                    │   │
│  │  Transition: 150ms                                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Card Interactions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CARD INTERACTIONS                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MODULE CARD (Dashboard)                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  DEFAULT                                                            │   │
│  │  ┌─────────────────────────────────┐                                │   │
│  │  │  [Icon]                         │                                │   │
│  │  │  Wisdom Guide                   │  border: 1px solid border      │   │
│  │  │  Your spiritual companion       │  bg: card                      │   │
│  │  └─────────────────────────────────┘                                │   │
│  │                                                                     │   │
│  │  HOVER (300ms ease-out)                                             │   │
│  │  ┌─────────────────────────────────┐                                │   │
│  │  │  [Icon]                         │                                │   │
│  │  │  Wisdom Guide                   │  transform: translateY(-4px)   │   │
│  │  │  Your spiritual companion       │  box-shadow: lg                │   │
│  │  └─────────────────────────────────┘  border-color: primary/30      │   │
│  │                                                                     │   │
│  │  PRESSED                                                            │   │
│  │  ┌─────────────────────────────────┐                                │   │
│  │  │  [Icon]                         │                                │   │
│  │  │  Wisdom Guide                   │  transform: translateY(-2px)   │   │
│  │  │  Your spiritual companion       │  box-shadow: md                │   │
│  │  └─────────────────────────────────┘                                │   │
│  │                                                                     │   │
│  │  COMING SOON (hover)                                                │   │
│  │  ┌─────────────────────────────────┐                                │   │
│  │  │  [Icon]          🔒             │                                │   │
│  │  │  Pattern Explorer               │  transform: none               │   │
│  │  │  Coming Soon                    │  cursor: pointer               │   │
│  │  └─────────────────────────────────┘  opacity on content: 0.7       │   │
│  │                                       Shows tooltip/badge           │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  CONVERSATION CARD (Sidebar)                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  DEFAULT: bg: transparent                                           │   │
│  │  HOVER: bg: muted/50                                                │   │
│  │  SELECTED: bg: primary/10, border-left: 2px primary                 │   │
│  │  Transition: 150ms                                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  INSIGHT CARD                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  DEFAULT: standard card styling                                     │   │
│  │  HOVER: subtle lift, show action buttons                            │   │
│  │  Action buttons fade in on hover (200ms)                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Input Interactions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        INPUT INTERACTIONS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TEXT INPUT / TEXTAREA                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  DEFAULT                                                            │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ Placeholder text...                                         │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │  border: 1px solid border                                           │   │
│  │  bg: background                                                     │   │
│  │                                                                     │   │
│  │  FOCUS (200ms)                                                      │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ |                                                           │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │  border: 2px solid primary                                          │   │
│  │  box-shadow: 0 0 0 3px primary/20                                   │   │
│  │  outline: none                                                      │   │
│  │                                                                     │   │
│  │  ERROR                                                              │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ Invalid input                                               │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │  border: 2px solid destructive                                      │   │
│  │  + Error message appears below (fade in)                            │   │
│  │                                                                     │   │
│  │  DISABLED                                                           │   │
│  │  bg: muted/50                                                       │   │
│  │  opacity: 0.6                                                       │   │
│  │  cursor: not-allowed                                                │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  CHAT INPUT (Special)                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────┬──────┐    │   │
│  │  │ Type a message...                                   │ Send │    │   │
│  │  └─────────────────────────────────────────────────────┴──────┘    │   │
│  │                                                                     │   │
│  │  • Auto-expands as user types (max 4 lines)                         │   │
│  │  • Send button disabled when empty                                  │   │
│  │  • Send button pulses subtly when content present                   │   │
│  │  • Enter to send, Shift+Enter for newline                           │   │
│  │  • Smooth height transition: 150ms                                  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.4 Quiz Option Interactions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     QUIZ OPTION INTERACTIONS                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  QUIZ OPTION BUTTON                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  DEFAULT                                                            │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ I'm new to faith and the Bible                              │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │  bg: card                                                           │   │
│  │  border: 1px solid border                                           │   │
│  │                                                                     │   │
│  │  HOVER (200ms)                                                      │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ I'm new to faith and the Bible                              │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │  bg: primary/10                                                     │   │
│  │  border-color: primary/50                                           │   │
│  │  transform: translateX(4px)                                         │   │
│  │                                                                     │   │
│  │  SELECTED (300ms with bounce)                                       │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ ✓ I'm new to faith and the Bible                            │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │  bg: primary                                                        │   │
│  │  text: white                                                        │   │
│  │  border-color: primary                                              │   │
│  │  checkmark animates in (scale + fade)                               │   │
│  │                                                                     │   │
│  │  AFTER SELECTION (other options)                                    │   │
│  │  Unselected options fade to 50% opacity                             │   │
│  │  Selected option remains prominent                                  │   │
│  │  Transition: 400ms                                                  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  STAGGER ENTRANCE                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Options appear one by one when question loads                      │   │
│  │  Stagger delay: 80ms between options                                │   │
│  │  Animation: fadeInUp                                                │   │
│  │  Duration: 300ms each                                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Form Patterns

### 4.1 Form Validation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FORM VALIDATION                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  VALIDATION TIMING                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • Validate on blur (when user leaves field)                        │   │
│  │  • Re-validate on change after first error                          │   │
│  │  • Final validation on submit                                       │   │
│  │  • Don't show errors while user is still typing                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ERROR MESSAGE ANIMATION                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ email@invalid                                               │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │  ↓ Error slides down + fades in (200ms)                            │   │
│  │  ⚠️ Please enter a valid email address                             │   │
│  │                                                                     │   │
│  │  Animation: slideDown + fadeIn                                      │   │
│  │  Color: destructive                                                 │   │
│  │  Icon: warning icon pulses once                                     │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  SUCCESS STATE                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ email@valid.com                                         ✓   │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  Checkmark scales in (200ms with slight bounce)                     │   │
│  │  Border color transitions to success green                          │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Form Submission

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       FORM SUBMISSION                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SUBMISSION SEQUENCE                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  1. User clicks submit                                              │   │
│  │     ┌────────────────┐                                              │   │
│  │     │    Submit      │                                              │   │
│  │     └────────────────┘                                              │   │
│  │                                                                     │   │
│  │  2. Button shows loading state (instant)                            │   │
│  │     ┌────────────────┐                                              │   │
│  │     │  ◌ Saving...   │  Button disabled                             │   │
│  │     └────────────────┘  Form inputs disabled                        │   │
│  │                                                                     │   │
│  │  3a. SUCCESS                                                        │   │
│  │     ┌────────────────┐                                              │   │
│  │     │    ✓ Saved     │  Green bg, checkmark                         │   │
│  │     └────────────────┘                                              │   │
│  │     Then: navigate or reset (300ms delay)                           │   │
│  │                                                                     │   │
│  │  3b. ERROR                                                          │   │
│  │     ┌────────────────┐                                              │   │
│  │     │    Submit      │  Returns to normal                           │   │
│  │     └────────────────┘                                              │   │
│  │     Error toast appears at top                                      │   │
│  │     Form re-enables                                                 │   │
│  │     Focus moves to first error field                                │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Feedback Patterns

### 5.1 Toast Notifications

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       TOAST NOTIFICATIONS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TOAST ANATOMY                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │ [Icon]  Message text here                              [✕]    │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  │                                                                     │   │
│  │  Position: Bottom center (mobile), Bottom right (desktop)           │   │
│  │  Max width: 400px                                                   │   │
│  │  Margin from edge: 16px                                             │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  TOAST TYPES                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  SUCCESS                                                            │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │ ✓  Insight saved to your dashboard                            │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  │  bg: success/10, border: success, icon: checkmark                   │   │
│  │  Auto-dismiss: 4 seconds                                            │   │
│  │                                                                     │   │
│  │  ERROR                                                              │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │ ⚠  Something went wrong. Please try again.              [✕]   │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  │  bg: destructive/10, border: destructive, icon: warning             │   │
│  │  Auto-dismiss: 6 seconds (longer for errors)                        │   │
│  │  Has close button                                                   │   │
│  │                                                                     │   │
│  │  INFO                                                               │   │
│  │  ┌───────────────────────────────────────────────────────────────┐ │   │
│  │  │ ℹ  Pattern Explorer is coming soon!                           │ │   │
│  │  └───────────────────────────────────────────────────────────────┘ │   │
│  │  bg: primary/10, border: primary, icon: info                        │   │
│  │  Auto-dismiss: 4 seconds                                            │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  TOAST ANIMATION                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Entrance: slideInUp + fadeIn (300ms, ease-out)                     │   │
│  │  Exit: slideOutDown + fadeOut (200ms, ease-in)                      │   │
│  │  Stack: New toasts push existing ones up                            │   │
│  │  Max visible: 3 toasts                                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Inline Feedback

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        INLINE FEEDBACK                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MESSAGE SENT FEEDBACK                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  User message appears immediately (optimistic)                      │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                                    Your message here        │   │   │
│  │  │                                                      ◌      │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │  Small spinner shows sending status                                 │   │
│  │                                                                     │   │
│  │  On success: spinner becomes checkmark (200ms)                      │   │
│  │  On error: spinner becomes ⚠, retry button appears                  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  INSIGHT SAVED FEEDBACK                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  Before: 💾 Save Insight                                            │   │
│  │  During: ◌ Saving...                                                │   │
│  │  After:  ✓ Saved                                                    │   │
│  │                                                                     │   │
│  │  Icon transitions with scale animation                              │   │
│  │  "Saved" state reverts after 2 seconds                              │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  COPY TO CLIPBOARD                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  Before: 📋 Copy                                                    │   │
│  │  After:  ✓ Copied!                                                  │   │
│  │                                                                     │   │
│  │  Brief color flash on success                                       │   │
│  │  Reverts after 1.5 seconds                                          │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Progress Indicators

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PROGRESS INDICATORS                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  QUIZ PROGRESS                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ● ○ ○ ○   (Question 1 of 4)                                        │   │
│  │  ● ● ○ ○   (Question 2 of 4)                                        │   │
│  │  ● ● ● ○   (Question 3 of 4)                                        │   │
│  │  ● ● ● ●   (Question 4 of 4)                                        │   │
│  │                                                                     │   │
│  │  Filled dot: scale animation when becomes active                    │   │
│  │  Transition: 300ms ease-out                                         │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  CINEMATIC INTRO PROGRESS (Proposed)                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  Subtle progress bar at bottom of screen                            │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  Height: 2px                                                        │   │
│  │  Color: primary at 50% opacity                                      │   │
│  │  Animation: smooth width transition                                 │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  STREAMING RESPONSE PROGRESS                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  No explicit progress bar - text streams in character by character  │   │
│  │  Cursor blinks at end of streaming text                             │   │
│  │  Sophia orb shows "thinking" animation during streaming             │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Loading States

### 6.1 Skeleton Screens

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SKELETON SCREENS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  DASHBOARD SKELETON                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌──────────────────────────────────────────────────────────────┐  │   │
│  │  │ ████████████████                                             │  │   │
│  │  │ ████████                        ← Greeting skeleton          │  │   │
│  │  └──────────────────────────────────────────────────────────────┘  │   │
│  │                                                                     │   │
│  │  ┌──────────────────────────────────────────────────────────────┐  │   │
│  │  │                                                              │  │   │
│  │  │       ○              ████████████████████                    │  │   │
│  │  │                      ████████████████                        │  │   │
│  │  │                      ████████████████████████████            │  │   │
│  │  │                                                              │  │   │
│  │  │                      ┌────────────────────┐                  │  │   │
│  │  │                      │████████████████████│                  │  │   │
│  │  │                      └────────────────────┘                  │  │   │
│  │  │                                                              │  │   │
│  │  └──────────────────────────────────────────────────────────────┘  │   │
│  │                         ← Sophia card skeleton                      │   │
│  │                                                                     │   │
│  │  ┌────────┐  ┌────────┐  ┌────────┐                                │   │
│  │  │ ████   │  │ ████   │  │ ████   │  ← Stats skeleton              │   │
│  │  │ ██     │  │ ██     │  │ ██     │                                │   │
│  │  └────────┘  └────────┘  └────────┘                                │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  SKELETON ANIMATION                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  @keyframes shimmer {                                               │   │
│  │    0% { background-position: -200% 0; }                             │   │
│  │    100% { background-position: 200% 0; }                            │   │
│  │  }                                                                  │   │
│  │                                                                     │   │
│  │  background: linear-gradient(                                       │   │
│  │    90deg,                                                           │   │
│  │    muted 0%,                                                        │   │
│  │    muted-foreground/20 50%,                                         │   │
│  │    muted 100%                                                       │   │
│  │  );                                                                 │   │
│  │  background-size: 200% 100%;                                        │   │
│  │  animation: shimmer 1.5s infinite;                                  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Spinner States

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SPINNER STATES                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  BUTTON SPINNER                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────┐                                │   │
│  │  │     ◌ Loading...                │                                │   │
│  │  └─────────────────────────────────┘                                │   │
│  │                                                                     │   │
│  │  Spinner: 16px, same color as button text                           │   │
│  │  Animation: rotate 360deg, 800ms, linear, infinite                  │   │
│  │  Replaces button text/icon                                          │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  PAGE SPINNER (Full page loading)                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │                         [Sophia Orb]                                │   │
│  │                                                                     │   │
│  │                      Loading your journey...                        │   │
│  │                                                                     │   │
│  │  Use Sophia orb with breathing animation instead of generic spinner │   │
│  │  Reinforces brand and Sophia's presence                             │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  INLINE SPINNER                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  [◌] Processing...                                                  │   │
│  │                                                                     │   │
│  │  Size: 14px                                                         │   │
│  │  Color: muted-foreground                                            │   │
│  │  Used for: saving, fetching small data                              │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Empty States

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          EMPTY STATES                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  NO CONVERSATIONS                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │                         💬                                          │   │
│  │                                                                     │   │
│  │               No conversations yet                                  │   │
│  │                                                                     │   │
│  │         Start a conversation with Sophia                            │   │
│  │              to begin your journey.                                 │   │
│  │                                                                     │   │
│  │              ┌────────────────────────┐                             │   │
│  │              │   Start Conversation   │                             │   │
│  │              └────────────────────────┘                             │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  NO INSIGHTS                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │                         💡                                          │   │
│  │                                                                     │   │
│  │               No insights saved yet                                 │   │
│  │                                                                     │   │
│  │       Save meaningful moments from your conversations               │   │
│  │               with Sophia to revisit later.                         │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  EMPTY STATE ANIMATION                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Icon: gentle float animation (translateY ±5px, 3s)                 │   │
│  │  Text: fadeIn on mount (400ms)                                      │   │
│  │  Button: fadeIn with delay (600ms)                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Gesture Patterns

### 7.1 Touch Gestures (Mobile)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        TOUCH GESTURES                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TAP                                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • Single tap: Primary action (buttons, links, cards)               │   │
│  │  • Feedback: Ripple effect or opacity change                        │   │
│  │  • Duration: 100ms visual feedback                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  LONG PRESS                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • Duration: 500ms to trigger                                       │   │
│  │  • Use: Context menus, additional options                           │   │
│  │  • Feedback: Scale down slightly (0.98), then haptic + menu         │   │
│  │  • Example: Long press message → Copy, Save, Share options          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  SWIPE                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • Swipe left on conversation: Delete/Archive option revealed       │   │
│  │  • Swipe right on message: Quick save insight                       │   │
│  │  • Swipe down from top: Refresh (pull-to-refresh)                   │   │
│  │  • Threshold: 50px minimum swipe distance                           │   │
│  │  • Feedback: Element follows finger, snaps back or completes        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  PINCH (Future - Pattern Explorer)                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • Pinch to zoom pattern visualizations                             │   │
│  │  • Smooth scaling with momentum                                     │   │
│  │  • Min/max zoom limits                                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Keyboard Interactions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      KEYBOARD INTERACTIONS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CHAT INPUT                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Enter         → Send message                                       │   │
│  │  Shift+Enter   → New line                                           │   │
│  │  Escape        → Clear input / Close modal                          │   │
│  │  Cmd/Ctrl+K    → Focus search (future)                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  GLOBAL SHORTCUTS                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Cmd/Ctrl+/    → Show keyboard shortcuts                            │   │
│  │  Cmd/Ctrl+N    → New conversation                                   │   │
│  │  Cmd/Ctrl+,    → Open settings                                      │   │
│  │  Tab           → Navigate focusable elements                        │   │
│  │  Escape        → Close modal/sidebar/menu                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  QUIZ NAVIGATION                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  1-5           → Select option by number                            │   │
│  │  Enter         → Confirm selection and continue                     │   │
│  │  Backspace     → Go to previous question                            │   │
│  │  Tab           → Navigate between options                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  FOCUS INDICATORS                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • Visible focus ring on all interactive elements                   │   │
│  │  • Focus ring: 2px solid primary, 2px offset                        │   │
│  │  • Focus visible only on keyboard navigation (not mouse)            │   │
│  │  • Tab order follows logical reading order                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Modal & Overlay Patterns

### 8.1 Modal Dialogs

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MODAL DIALOGS                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MODAL ANATOMY                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                          [✕]                                │   │   │
│  │  │  Modal Title                                                │   │   │
│  │  │                                                             │   │   │
│  │  │  Modal content goes here. This can include forms,           │   │   │
│  │  │  information, or confirmation messages.                     │   │   │
│  │  │                                                             │   │   │
│  │  │  ┌─────────────┐  ┌─────────────┐                           │   │   │
│  │  │  │   Cancel    │  │   Confirm   │                           │   │   │
│  │  │  └─────────────┘  └─────────────┘                           │   │   │
│  │  │                                                             │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  MODAL BEHAVIOR                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  OPEN:                                                              │   │
│  │  • Backdrop fades in (200ms, 0 → 50% black)                         │   │
│  │  • Modal scales in from 95% → 100% + fades in (300ms)               │   │
│  │  • Focus trapped inside modal                                       │   │
│  │  • Body scroll locked                                               │   │
│  │                                                                     │   │
│  │  CLOSE:                                                             │   │
│  │  • Modal scales out 100% → 95% + fades out (200ms)                  │   │
│  │  • Backdrop fades out (200ms)                                       │   │
│  │  • Focus returns to trigger element                                 │   │
│  │  • Body scroll restored                                             │   │
│  │                                                                     │   │
│  │  DISMISS METHODS:                                                   │   │
│  │  • Click X button                                                   │   │
│  │  • Click backdrop (unless preventClose)                             │   │
│  │  • Press Escape key                                                 │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Save Insight Modal (Specific)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      SAVE INSIGHT MODAL                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                                                       [✕]   │   │   │
│  │  │  💡 Save Insight                                            │   │   │
│  │  │                                                             │   │   │
│  │  │  Title                                                      │   │   │
│  │  │  ┌─────────────────────────────────────────────────────┐   │   │   │
│  │  │  │ The meaning of grace in Romans 5                    │   │   │   │
│  │  │  └─────────────────────────────────────────────────────┘   │   │   │
│  │  │                                                             │   │   │
│  │  │  Category                                                   │   │   │
│  │  │  ┌────────────┐ ┌────────────┐                             │   │   │
│  │  │  │ ○ Pattern  │ │ ● Personal │                             │   │   │
│  │  │  └────────────┘ └────────────┘                             │   │   │
│  │  │  ┌────────────┐ ┌────────────┐                             │   │   │
│  │  │  │ ○ Cultural │ │ ○ Theology │                             │   │   │
│  │  │  └────────────┘ └────────────┘                             │   │   │
│  │  │                                                             │   │   │
│  │  │  Preview                                                    │   │   │
│  │  │  ┌─────────────────────────────────────────────────────┐   │   │   │
│  │  │  │ "Grace in Romans 5 represents God's unmerited       │   │   │   │
│  │  │  │  favor, freely given to humanity despite our..."    │   │   │   │
│  │  │  └─────────────────────────────────────────────────────┘   │   │   │
│  │  │                                                             │   │   │
│  │  │  ┌─────────────┐  ┌─────────────────────┐                  │   │   │
│  │  │  │   Cancel    │  │   💾 Save Insight   │                  │   │   │
│  │  │  └─────────────┘  └─────────────────────┘                  │   │   │
│  │  │                                                             │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  INTERACTIONS:                                                              │
│  • Title auto-generated from message preview, editable                      │
│  • Category selection: radio buttons with selection animation               │
│  • Save button disabled until title entered                                 │
│  • Success: modal closes, toast appears                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.3 Crisis Modal (Specific)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CRISIS MODAL                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TRIGGER: Detected crisis keywords in user message                          │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                                                             │   │   │
│  │  │  ❤️ We're Here For You                                      │   │   │
│  │  │                                                             │   │   │
│  │  │  It sounds like you might be going through a difficult      │   │   │
│  │  │  time. You're not alone.                                    │   │   │
│  │  │                                                             │   │   │
│  │  │  If you're in crisis, please reach out:                     │   │   │
│  │  │                                                             │   │   │
│  │  │  🆘 National Suicide Prevention Lifeline                    │   │   │
│  │  │     988 (call or text)                                      │   │   │
│  │  │     ┌────────────────────┐                                  │   │   │
│  │  │     │     Call 988       │                                  │   │   │
│  │  │     └────────────────────┘                                  │   │   │
│  │  │                                                             │   │   │
│  │  │  💬 Crisis Text Line                                        │   │   │
│  │  │     Text HOME to 741741                                     │   │   │
│  │  │                                                             │   │   │
│  │  │  ─────────────────────────────────────────────             │   │   │
│  │  │                                                             │   │   │
│  │  │  Sophia is here to talk, but trained counselors can         │   │   │
│  │  │  provide the support you need right now.                    │   │   │
│  │  │                                                             │   │   │
│  │  │  ┌─────────────────────────────────────────────────────┐   │   │   │
│  │  │  │   I understand, continue talking with Sophia        │   │   │   │
│  │  │  └─────────────────────────────────────────────────────┘   │   │   │
│  │  │                                                             │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  SPECIAL BEHAVIORS:                                                         │
│  • Cannot be dismissed by clicking backdrop                                 │
│  • Must acknowledge to continue                                             │
│  • "Call 988" opens phone dialer                                            │
│  • Sophia responds with extra care after dismissal                          │
│  • Warm, non-clinical design                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Navigation Transitions

### 9.1 Page Transitions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PAGE TRANSITIONS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  STANDARD PAGE TRANSITION                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  Old page → fades out (150ms)                                       │   │
│  │  New page → fades in (200ms)                                        │   │
│  │                                                                     │   │
│  │  Total perceived transition: ~300ms                                 │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ONBOARDING TRANSITIONS                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  Cinematic Intro → Quiz                                             │   │
│  │  • Orb transforms into central element                              │   │
│  │  • Background crossfades                                            │   │
│  │  • Duration: 500ms                                                  │   │
│  │                                                                     │   │
│  │  Quiz Question → Next Question                                      │   │
│  │  • Current question slides out left + fades                         │   │
│  │  • New question slides in from right + fades in                     │   │
│  │  • Options stagger in                                               │   │
│  │  • Duration: 400ms                                                  │   │
│  │                                                                     │   │
│  │  Quiz → Chat (or Dashboard)                                         │   │
│  │  • Glassmorphic panel fades/scales out                              │   │
│  │  • New page fades in                                                │   │
│  │  • Duration: 400ms                                                  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  DASHBOARD → CHAT                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  • Standard crossfade                                               │   │
│  │  • Sophia orb may have continuity (appears to travel)               │   │
│  │  • Chat welcome screen animates in with stagger                     │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Sidebar Transitions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       SIDEBAR TRANSITIONS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  DESKTOP SIDEBAR (Chat)                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  • Always visible on desktop                                        │   │
│  │  • Can be collapsed with toggle                                     │   │
│  │                                                                     │   │
│  │  COLLAPSE:                                                          │   │
│  │  Width: 280px → 60px                                                │   │
│  │  Content fades out, icons remain                                    │   │
│  │  Duration: 250ms                                                    │   │
│  │  Easing: ease-in-out                                                │   │
│  │                                                                     │   │
│  │  EXPAND:                                                            │   │
│  │  Width: 60px → 280px                                                │   │
│  │  Content fades in after width transition                            │   │
│  │  Duration: 250ms                                                    │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  MOBILE SIDEBAR (Sheet)                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  OPEN:                                                              │   │
│  │  • Slides in from left                                              │   │
│  │  • Backdrop fades in                                                │   │
│  │  • Duration: 300ms                                                  │   │
│  │  • Can be swiped open                                               │   │
│  │                                                                     │   │
│  │  CLOSE:                                                             │   │
│  │  • Slides out to left                                               │   │
│  │  • Backdrop fades out                                               │   │
│  │  • Duration: 250ms                                                  │   │
│  │  • Can be swiped closed                                             │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 10. Sophia-Specific Interactions

### 10.1 Orb States & Animations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SOPHIA ORB STATES                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RESTING STATE                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │              ╭───────────╮                                          │   │
│  │            ╱               ╲                                        │   │
│  │           │   ∿∿∿∿∿∿∿∿∿   │   Subtle noise texture                  │   │
│  │           │   ∿∿∿∿∿∿∿∿∿   │   Slow breathing (4s cycle)             │   │
│  │            ╲               ╱   Soft glow                             │   │
│  │              ╰───────────╯                                          │   │
│  │                                                                     │   │
│  │  Animation: scale 1.0 → 1.05 → 1.0, brightness pulse                │   │
│  │  Duration: 4000ms, infinite                                         │   │
│  │  Use: Dashboard, Welcome screen, Chat header                        │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  THINKING STATE                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │              ╭───────────╮                                          │   │
│  │            ╱   ✧ ✦ ✧     ╲                                         │   │
│  │           │   ∿∿∿∿∿∿∿∿∿   │   Increased brightness                  │   │
│  │           │   ∿∿∿∿∿∿∿∿∿   │   Faster pulsing (2s cycle)             │   │
│  │            ╲     ✧ ✦     ╱   Slight rotation wobble                 │   │
│  │              ╰───────────╯                                          │   │
│  │                                                                     │   │
│  │  Animation: Enhanced breathing + subtle rotation                    │   │
│  │  Duration: 2000ms, infinite                                         │   │
│  │  Use: While Sophia is generating a response                         │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  SPEAKING STATE (During streaming)                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  • Subtle pulse with each "word" or chunk                           │   │
│  │  • Brightness fluctuates gently                                     │   │
│  │  • Gives sense of "voice" coming from the orb                       │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ATTENTION STATE (Wants user to notice)                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  • Brighter glow                                                    │   │
│  │  • Single gentle "bounce" animation                                 │   │
│  │  • Used when Sophia has a suggestion or greeting                    │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 10.2 Typing Indicator

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      TYPING INDICATOR                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ANATOMY                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────┐                    │   │
│  │  │ [Sophia]                                    │                    │   │
│  │  │                                             │                    │   │
│  │  │    ●  ●  ●                                  │                    │   │
│  │  │                                             │                    │   │
│  │  └─────────────────────────────────────────────┘                    │   │
│  │                                                                     │   │
│  │  Message bubble with 3 animated dots                                │   │
│  │  Appears immediately when user sends message                        │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  DOT ANIMATION                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  Each dot: bounces up and down                                      │   │
│  │  Stagger: 200ms between dots                                        │   │
│  │  Duration: 1400ms full cycle                                        │   │
│  │                                                                     │   │
│  │  Frame 0%:   ●  ●  ●   (all at baseline)                            │   │
│  │  Frame 20%:  ⬆  ●  ●   (dot 1 up)                                   │   │
│  │  Frame 40%:  ●  ⬆  ●   (dot 2 up)                                   │   │
│  │  Frame 60%:  ●  ●  ⬆   (dot 3 up)                                   │   │
│  │  Frame 100%: ●  ●  ●   (all at baseline)                            │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  TRANSITION TO RESPONSE                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  • Typing indicator fades out (150ms)                               │   │
│  │  • First response text immediately appears                          │   │
│  │  • Text streams in as it's generated                                │   │
│  │  • Smooth scroll keeps newest text visible                          │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 10.3 Chat Message Interactions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CHAT MESSAGE INTERACTIONS                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  USER MESSAGE                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │                         ┌─────────────────────────────────────────┐ │   │
│  │                         │                                         │ │   │
│  │                         │    User's message appears here          │ │   │
│  │                         │                                         │ │   │
│  │                         └─────────────────────────────────────────┘ │   │
│  │                                                                     │   │
│  │  Entrance: Slide in from right + fade (200ms)                       │   │
│  │  Position: Right-aligned                                            │   │
│  │  Background: primary color                                          │   │
│  │  Text: white                                                        │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  SOPHIA MESSAGE                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌──────────────────────────────────────────────────────────────┐  │   │
│  │  │ [Sophia avatar]                                              │  │   │
│  │  │                                                              │  │   │
│  │  │ Sophia's response text streams in here as it's generated...  │  │   │
│  │  │                                                              │  │   │
│  │  │ ────────────────────────────────────────────────────────     │  │   │
│  │  │ [💾 Save] [📋 Copy]                    (appear on hover)     │  │   │
│  │  └──────────────────────────────────────────────────────────────┘  │   │
│  │                                                                     │   │
│  │  Entrance: Fade in from left (200ms)                                │   │
│  │  Text: Streams in character by character                            │   │
│  │  Actions: Fade in on hover (200ms)                                  │   │
│  │  Position: Left-aligned                                             │   │
│  │  Background: card color                                             │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  MESSAGE ACTIONS                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  HOVER: Action buttons fade in below message                        │   │
│  │  SAVE INSIGHT:                                                      │   │
│  │    • Click → Modal opens                                            │   │
│  │    • Fill form → Save                                               │   │
│  │    • Success → Button shows "✓ Saved" briefly                       │   │
│  │  COPY:                                                              │   │
│  │    • Click → Text copied to clipboard                               │   │
│  │    • Button shows "✓ Copied!" for 1.5s                              │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Summary

This Interaction Patterns document defines:

1. **Design Principles** - Warmth, spiritual rhythm, progressive revelation
2. **Animation System** - Entrance, exit, and continuous animations with timing
3. **Component Interactions** - Buttons, cards, inputs, quiz options
4. **Form Patterns** - Validation, submission, error handling
5. **Feedback Patterns** - Toasts, inline feedback, progress indicators
6. **Loading States** - Skeletons, spinners, empty states
7. **Gesture Patterns** - Touch and keyboard interactions
8. **Modal & Overlay Patterns** - Dialogs, sheets, specific modals
9. **Navigation Transitions** - Page and sidebar transitions
10. **Sophia-Specific Interactions** - Orb states, typing indicator, messages

### Key Interaction Guidelines:

- **Timing matters**: Deliberate pacing creates contemplative space
- **Sophia is alive**: Her orb breathes, thinks, and responds visually
- **Feedback is immediate**: Users always know their actions registered
- **Accessibility first**: All interactions work with keyboard and screen readers
- **Graceful degradation**: Core experience works without animations

---

*Next deliverable: State Diagrams*
