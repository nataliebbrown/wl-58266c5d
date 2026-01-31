# Wholelicity UX Implementation Phases v2

> Comprehensive roadmap for implementing the Sacred Rhythm + Living Journey dashboard, Sophia character integration, onboarding improvements, and future module foundation.

This v2 supersedes the original implementation phases document. It reflects the new dashboard design (hero card, Quick Access circles, Journey/Constellation/Horizon cards), the Sophia character definition, the glassmorphic design system, responsive layouts, and the sacred transition for returning users.

---

## Phase Overview

| Phase | Focus | Priority | Complexity | New in v2 |
|-------|-------|----------|------------|-----------|
| **Phase 1** | Critical Fixes | Immediate | Low | — |
| **Phase 2** | Onboarding Refinement | High | Medium | — |
| **Phase 3** | Design System Foundation | High | Medium | **New phase** |
| **Phase 4** | Dashboard: Sacred Rhythm + Living Journey | High | High | **Fully redesigned** |
| **Phase 5** | Bible Reader & Scripture Experience | High | High | **New phase** |
| **Phase 6** | Chat Experience Enhancement | Medium | Medium | Updated for Constellation |
| **Phase 7** | Persona Intelligence | Medium | Medium | — |
| **Phase 8** | Module Previews & Quick Access | Medium | Low-Medium | **Redesigned** |
| **Phase 9** | Responsive & Mobile | Medium | Medium | **New phase** |
| **Phase 10** | Future Module Integration | Future | High | — |

### What Changed from v1

| v1 Phase | v2 Equivalent | What Changed |
|----------|---------------|--------------|
| Phase 1: Critical Fixes | Phase 1 | Same |
| Phase 2: Onboarding Refinement | Phase 2 | Same |
| Phase 3: Dashboard Reimagination | **Phases 3 + 4** | Split into Design System Foundation + Dashboard Build. Dashboard fully redesigned: hero card with CTAs inside, Quick Access circles, Journey/Constellation/Horizon cards, sacred transition, time-of-day system |
| — | **Phase 5** | New: Built-in Bible Reader with navigation, reading view, highlights, Ask Sophia hermeneutics, dashboard integration |
| Phase 4: Chat Enhancement | Phase 6 | Save Insight now feeds Constellation; pattern-noticing added |
| Phase 5: Persona Intelligence | Phase 7 | Same |
| Phase 6: Module Previews | Phase 8 | Module grid removed, replaced with Quick Access circle row + preview modals |
| — | **Phase 9** | New: Responsive layouts (mobile single-column + bottom tab bar, tablet two-column) |
| Phase 7: Future Modules | Phase 10 | Same |

---

## Phase 1: Critical Fixes

**Priority:** Immediate | **Complexity:** Low

Bugs and issues that significantly impact user experience. Fix before any new development.

### 1.1 Re-enable Returning User Detection

**File:** `src/pages/Index.tsx`

**Current State:**
```typescript
// TEMPORARILY DISABLED: Always show intro for testing
// if (isReturningUser()) {
//   navigate('/dashboard');
//   return;
// }
```

**Tasks:**
- [ ] Uncomment the returning user detection logic
- [ ] Test that returning users skip intro and go to dashboard
- [ ] Verify `isReturningUser()` function works correctly in `onboardingState.ts`

**Acceptance Criteria:**
- Users who have completed onboarding land on Dashboard
- Users who haven't completed onboarding see the intro
- State persists across browser sessions

---

### 1.2 Make Skip Button Immediately Visible

**File:** `src/components/onboarding/CinematicIntro.tsx`

**Current State:** Skip button appears after 2 seconds delay

**Tasks:**
- [ ] Remove or reduce the delay for skip button visibility
- [ ] Ensure skip button is visible from the start (0ms delay)
- [ ] Style skip button to be subtle but discoverable

**Acceptance Criteria:**
- Skip button visible immediately when intro starts
- Skip button doesn't distract from intro experience
- Tapping skip immediately advances to quiz

---

### 1.3 Add Sophia's Proactive First Message

**File:** `src/pages/Chat.tsx`

**Current State:** Chat opens with empty state, user must initiate

**Tasks:**
- [ ] Detect if this is user's first chat session
- [ ] If first session, display a proactive greeting from Sophia
- [ ] Use persona-aware greeting (can be simple version initially)

**Initial Implementation (Simple):**
```typescript
const FIRST_MESSAGE = {
  role: 'assistant',
  content: `Welcome! I'm Sophia, and I'm so glad you're here.

I'm here to explore faith, Scripture, and life's big questions with you. There's no agenda - just conversation at whatever pace feels right.

What's been on your heart lately? Or if you'd prefer, I have some topics we could explore together.`
};
```

**Acceptance Criteria:**
- First-time chat users see a greeting from Sophia
- Message appears with typing indicator animation
- User can respond naturally to the greeting

---

### 1.4 Reduce Cinematic Intro Duration

**File:** `src/components/onboarding/CinematicIntro.tsx`

**Current State:** ~15 seconds with 11 animation phases

**Tasks:**
- [ ] Consolidate animation phases from 11 to 6-7
- [ ] Reduce total duration to 8-10 seconds
- [ ] Make CTA clickable after 5 seconds (not 10)
- [ ] Add subtle progress indicator

**Proposed Phases:**
1. Logo fade in/out (0-2s)
2. Overlay + tagline appear (2-4s)
3. Sophia orb rises and settles (4-6s)
4. Transform to CTA button (6-7s)
5. Text types "Begin Your Journey" (7-9s)
6. Ready state (9s+)

**Acceptance Criteria:**
- Intro completes in under 10 seconds
- User can interact after 5 seconds
- Experience still feels cinematic and meaningful

---

## Phase 2: Onboarding Refinement

**Priority:** High | **Complexity:** Medium

Improve the quiz experience to reduce friction and increase completion rates.

### 2.1 Add Back Navigation to Quiz

**Files:**
- `src/components/onboarding/SplitOnboarding.tsx`
- `src/components/onboarding/ChatOnboardingPanel.tsx`

**Tasks:**
- [ ] Add "Back" button on questions 2, 3, and 4
- [ ] Store answers in state so they persist when going back
- [ ] Pre-select previous answer when returning to a question
- [ ] Update progress indicator to show current position

**Acceptance Criteria:**
- Users can navigate backwards in the quiz
- Previous answers are preserved
- Progress indicator reflects current question
- Back button hidden on question 1

---

### 2.2 Add Skip Option for Quiz

**Files:**
- `src/components/onboarding/SplitOnboarding.tsx`
- `src/components/onboarding/ChatOnboardingPanel.tsx`
- `src/lib/onboardingState.ts`

**Tasks:**
- [ ] Add "Skip for now" link on each question
- [ ] Define sensible defaults for skipped questions
- [ ] Allow users to skip entire quiz with "I'll personalize later"
- [ ] Track which questions were skipped for later prompting

**Default Values:**
```typescript
const QUIZ_DEFAULTS = {
  spiritualBackground: 'exploring',
  learningStyle: 'conversation',
  communityPreference: 'solo',
  currentSeason: 'curious'
};
```

**Acceptance Criteria:**
- Users can skip individual questions
- Users can skip entire quiz
- Defaults are applied for skipped questions
- Users can be prompted to complete quiz later

---

### 2.3 Add Quiz Progress Persistence

**File:** `src/lib/onboardingState.ts`

**Tasks:**
- [ ] Save quiz progress after each question answered
- [ ] Add `quiz-started` state to onboarding phases
- [ ] Store partial answers: `{ lastQuestionAnswered: number, answers: {...} }`
- [ ] On return, resume from last unanswered question

**New State Schema:**
```typescript
interface OnboardingState {
  phase: 'not-started' | 'intro-seen' | 'quiz-started' | 'quiz-completed' | 'fully-onboarded';
  quizProgress?: {
    lastQuestionAnswered: number;
    answers: {
      spiritualBackground?: string;
      learningStyle?: string;
      communityPreference?: string;
      currentSeason?: string;
    };
  };
  persona?: string;
  quizCompletedAt?: string;
  firstChatAt?: string;
  lastVisitAt: string;
  visitCount: number;
}
```

**Acceptance Criteria:**
- Partial quiz progress persists across sessions
- Users can resume quiz from where they left off
- State is properly cleaned up after quiz completion

---

### 2.4 Add Sophia Acknowledgments in Quiz

**File:** `src/components/onboarding/ChatOnboardingPanel.tsx`

**Tasks:**
- [ ] After each answer, show brief Sophia response
- [ ] Response acknowledges their choice warmly
- [ ] Small delay (500ms) before advancing to next question
- [ ] Responses are persona-relevant

**Example Responses:**
```typescript
const SOPHIA_ACKNOWLEDGMENTS = {
  spiritualBackground: {
    'new-to-faith': "That's exciting! I'm here to help you explore at your own pace.",
    'going-deeper': "Wonderful. Let's discover depths you haven't seen before.",
    'pastor-leader': "I'm honored to walk alongside you in your calling.",
    'seminary': "I love a curious, rigorous mind. Let's dive deep together.",
    'exploring': "Questions are welcome here. Let's explore together."
  },
  // ... other questions
};
```

**Acceptance Criteria:**
- Each answer triggers a brief Sophia acknowledgment
- Acknowledgments feel personal, not automated
- Smooth transition to next question

---

### 2.5 Remove WelcomeDashboard for First-Time Users

**Files:**
- `src/pages/Index.tsx`
- `src/components/dashboard/WelcomeDashboard.tsx`

**Tasks:**
- [ ] After quiz completion, navigate directly to `/chat`
- [ ] Remove or deprecate WelcomeDashboard component
- [ ] Ensure first chat experience has Sophia greeting (Phase 1.3)
- [ ] Dashboard becomes accessible after first chat interaction

**Routing Logic:**
```typescript
case 'quiz-completed':
  // Skip WelcomeDashboard, go directly to chat
  navigate('/chat');
  break;
```

**Acceptance Criteria:**
- First-time users go Intro → Quiz → Chat (no WelcomeDashboard)
- Dashboard is still accessible from navigation
- No orphaned components or routes

---

## Phase 3: Design System Foundation

**Priority:** High | **Complexity:** Medium

> **New in v2.** Extracted from the old Phase 3 into its own phase. The glassmorphic design system, time-of-day engine, and brand tokens must exist before the dashboard components can be built.

### 3.1 Implement Glassmorphic Card System

**New File:** `src/components/ui/GlassCard.tsx`

**Tasks:**
- [ ] Create reusable `GlassCard` component with light/dark mode
- [ ] Implement base card treatment: `rgba(255, 255, 255, 0.7)`, `backdrop-filter: blur(16px)`, border-radius 20px, soft shadow
- [ ] Dark mode variant: `rgba(30, 30, 40, 0.6)`, adjusted border and shadow
- [ ] Support optional inner gradient card (for hero)
- [ ] Support configurable padding (24px default)

**Card Treatment Specs:**

| Mode | Background | Border | Shadow |
|------|-----------|--------|--------|
| Light | `rgba(255, 255, 255, 0.7)` + `blur(16px)` | `1px solid rgba(255, 255, 255, 0.2)` | `0 4px 24px rgba(0, 0, 0, 0.06)` |
| Dark | `rgba(30, 30, 40, 0.6)` + `blur(16px)` | `1px solid rgba(255, 255, 255, 0.08)` | `0 4px 24px rgba(0, 0, 0, 0.2)` |

**Acceptance Criteria:**
- GlassCard renders correctly in both light and dark mode
- Blur and transparency visible when content is behind the card
- All dashboard cards will use this component

---

### 3.2 Implement Time-of-Day Engine

**New File:** `src/lib/timeAwareness.ts`

**Tasks:**
- [ ] Create time period detection: `dawn | morning | midday | evening | night`
- [ ] Define gradient configs, greeting text, orb colors, and Scripture per period
- [ ] Create `useTimePeriod()` hook that updates on period change
- [ ] Define suggested actions per time period
- [ ] Support manual override for testing

**Time Periods:**
```typescript
type TimePeriod = 'dawn' | 'morning' | 'midday' | 'evening' | 'night';

const TIME_CONFIG: Record<TimePeriod, TimeConfig> = {
  dawn: {    // 5-7am
    hours: [5, 7],
    gradient: 'linear-gradient(135deg, #FFF8E7 0%, #FFE4B5 50%, #FFA07A 100%)',
    textColor: '#2D3748',
    greeting: "The morning is new with mercy...",
    orbGlow: 'soft-gold',
    scripture: { text: '"His mercies are new every morning."', ref: '— Lamentations 3:23' },
  },
  morning: {  // 7am-12pm
    hours: [7, 12],
    gradient: 'linear-gradient(135deg, #F5F0E8 0%, #DED1BA 50%, #C5B49B 100%)',
    textColor: '#2D3748',
    greeting: "Good morning, {name}",
    orbGlow: 'warm-brown',
    scripture: { text: '"The steadfast love of the Lord never ceases..."', ref: '— Lamentations 3:22' },
  },
  midday: {   // 12-5pm
    hours: [12, 17],
    gradient: 'linear-gradient(135deg, #EDE8E0 0%, #D4C9B8 50%, #C5B49B 100%)',
    textColor: '#2D3748',
    greeting: "A moment of peace in your day",
    orbGlow: 'clear-amber',
    scripture: { text: '"Be still, and know that I am God."', ref: '— Psalm 46:10' },
  },
  evening: {  // 5-9pm
    hours: [17, 21],
    gradient: 'linear-gradient(135deg, #5A4C3A 0%, #756653 50%, #8A7356 100%)',
    textColor: '#F8F6F0',
    greeting: "As the day settles...",
    orbGlow: 'rich-amber',
    scripture: { text: '"Let the peace of Christ rule in your hearts."', ref: '— Colossians 3:15' },
  },
  night: {    // 9pm-5am
    hours: [21, 5],
    gradient: 'linear-gradient(135deg, #1A1A2E 0%, #2D3748 50%, #3D4A5C 100%)',
    textColor: '#E2E8F0',
    greeting: "Rest in His presence",
    orbGlow: 'soft-blue',
    scripture: { text: '"He gives to His beloved sleep."', ref: '— Psalm 127:2' },
  },
};
```

**Acceptance Criteria:**
- Correct time period detected based on local time
- Gradient, greeting, orb, Scripture all resolve correctly
- Hook re-evaluates when period boundary is crossed
- Override available for testing/development

---

### 3.3 Implement Brand Tokens & Page Background

**Files:**
- `tailwind.config.ts`
- `src/index.css`

**Tasks:**
- [ ] Add Wholelicity brand colors to Tailwind config:
  - `khaki-beige: #C5B49B`
  - `olive-wood: #756653`
  - `faded-copper: #8A7356`
  - `pale-oak: #DED1BA`
  - `sage-green: #87A96B`
  - `deep-navy: #1A1A2E`
  - `warm-cream: #F8F6F0`
- [ ] Set page background to `#F8F6F0` (light) / `#1A1A2E` (dark)
- [ ] Add optional subtle noise overlay (2-3% opacity) via CSS
- [ ] Define animation keyframes for breathing, floating, pulsing, twinkling, glow

**Animation Keyframes:**
```css
@keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
@keyframes glow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
@keyframes twinkle { 0%, 100% { opacity: 0.6; } 50% { opacity: 1.0; } }
```

**Acceptance Criteria:**
- All brand colors available as Tailwind utilities
- Page background is warm cream (not white) in light mode, deep navy in dark mode
- Animation keyframes available globally
- Design tokens match `docs/ux-dashboard-design.md` specifications

---

### 3.4 Implement Contextual Intelligence Service

**New File:** `src/lib/contextualIntelligence.ts`

**Tasks:**
- [ ] Define `UserContext` interface (lastVisit, daysSinceVisit, recentThemes, currentThread, insightsSaved, persona, etc.)
- [ ] Build `getUserContext()` from localStorage / Supabase
- [ ] Build `generateDashboardMessage(context)` for Sophia's hero card text
- [ ] Build `getContextualCTAs(context)` for hero card button labels
- [ ] Build `getContextualScripture(context, timePeriod)` — combining user context with time of day

**Context Signals:**
```typescript
interface UserContext {
  lastVisit: Date;
  daysSinceVisit: number;
  recentThemes: string[];
  currentThread: string | null;
  questionsAsked: number;
  insightsSaved: number;
  journeyNodes: JourneyNode[];
  persona: string;
  spiritualSeason: string;
}
```

**Dashboard Message Logic:**
```typescript
function generateDashboardMessage(context: UserContext): string {
  if (context.daysSinceVisit > 7) {
    return "It's been a while! I've missed our conversations...";
  }
  if (context.currentThread) {
    return `Last time we were exploring ${context.currentThread}. Want to continue?`;
  }
  if (context.recentThemes.length > 0) {
    return `You've been thinking about ${context.recentThemes[0]} lately...`;
  }
  return getTimeBasedGreeting(context.persona);
}
```

**CTA Label Logic:**
```typescript
function getContextualCTAs(context: UserContext): CTAConfig[] {
  const primary = context.currentThread
    ? { label: `Continue: ${context.currentThread}`, icon: '📖', action: 'continue' }
    : context.daysSinceVisit > 7
      ? { label: 'Welcome Back', icon: '👋', action: 'welcome' }
      : { label: 'Continue Our Chat', icon: '📖', action: 'continue' };

  return [
    primary,
    { label: 'Something New', icon: '✨', action: 'new' },
    { label: 'Explore on My Own', icon: '🔍', action: 'explore' },
  ];
}
```

**Acceptance Criteria:**
- Dashboard message reflects user's actual journey and recent conversations
- CTA labels adapt to context (continuing a thread, returning after absence, etc.)
- Scripture selection combines time of day with user context
- System degrades gracefully when no context data is available (new users)

---

## Phase 4: Dashboard — Sacred Rhythm + Living Journey

**Priority:** High | **Complexity:** High

> **Fully redesigned in v2.** This is the core dashboard build. Depends on Phase 3 (design system, time engine, contextual intelligence).

### 4.1 Build Page Header

**New File:** `src/components/dashboard/DashboardHeader.tsx`

**Tasks:**
- [ ] Wholelicity logo left (`logo_black.svg` light / `logo_white.svg` dark, height 28px)
- [ ] Time indicator right (13px, muted)
- [ ] Settings gear icon right (20px, `#756653`, ghost button)
- [ ] Flex row, space-between, vertically centered, padding 16px 24px

**Acceptance Criteria:**
- Logo displays correctly in both modes
- Header is clean and minimal
- Settings navigates to settings page

---

### 4.2 Build Hero Card: Sophia / Daily Rhythm

**New File:** `src/components/dashboard/HeroCard.tsx`

This is the largest, most prominent dashboard element. Two layers: outer `GlassCard` containing an inner gradient card that shifts with time of day.

**Tasks:**
- [ ] Outer glassmorphic card (full width, 24px padding)
- [ ] Inner gradient card (border-radius 16px, 32px padding, min-height 220px)
- [ ] Gradient sourced from `useTimePeriod()` hook
- [ ] Time-of-day greeting (28px, font-weight 300, top-left)
- [ ] Contextual Scripture verse (16px, serif/italic, line-height 1.6) — from contextual intelligence
- [ ] Attribution (14px, font-weight 500, right-aligned under verse)
- [ ] Breathing Sophia orb (80-100px, right-aligned, vertically centered)
  - `animation: breathe 5s ease-in-out infinite, float 6s ease-in-out infinite`
  - Soft radial glow behind, color matches time period
- [ ] Date/time pill (frosted background, border-radius 100px, 12px text)
- [ ] Three equal-width CTA buttons inside the inner card (below date/time pill)
  - Frosted background, border-radius 12px, 14px text, icon left
  - Labels from `getContextualCTAs()`
  - Hover: background opacity +0.1, scale 1.02, subtle glow

**Acceptance Criteria:**
- Hero card gradient shifts correctly across all 5 time periods
- Text colors adapt (dark text on light gradients, light text on dark gradients)
- Orb breathing animation is smooth and organic
- CTAs are inside the card and functional
- Card looks correct in both light and dark mode

---

### 4.3 Build Quick Access Circle Row

**New File:** `src/components/dashboard/QuickAccessRow.tsx`

**Tasks:**
- [ ] Horizontal flex row, centered, evenly spaced
- [ ] 7 icon circles (56px, border-radius 50%, glassmorphic background)
- [ ] Labels below each circle (11px, centered, 6px gap)
- [ ] Icons: 22px, line style, color `#756653`
- [ ] No enclosing card — floats on page background
- [ ] Margin: 24px top and bottom
- [ ] States: default, hover (scale 1.08 + shadow), active (scale 0.96), unavailable (opacity 0.6)

**Circle Mapping:**

| Circle | Icon | Label | Destination | Status |
|--------|------|-------|-------------|--------|
| 1 | 💬 | Sophia | `/chat` | Available |
| 2 | 📖 | Scripture | `/bible` | Available |
| 3 | 📅 | Today | Daily reading | Future |
| 4 | 💡 | Insights | `/insights` | Available |
| 5 | 🔗 | Patterns | Pattern Explorer | Future |
| 6 | 🕰️ | TimeWalk | TimeWalk module | Future |
| 7 | ••• | More | Overflow menu | Available |

**Handling Unavailable Modules:**
- [ ] Display at 70% opacity (warm, not gray)
- [ ] No "Coming Soon" badge text
- [ ] Tapping opens rich preview modal (built in Phase 7)
- [ ] For now, tapping shows simple "Coming Soon" toast

**Acceptance Criteria:**
- All 7 circles render with correct icons and labels
- Available circles navigate to correct destinations
- Unavailable circles have reduced opacity and correct tap behavior
- Hover/active states are smooth

---

### 4.4 Build Your Journey Card

**New File:** `src/components/dashboard/JourneyCard.tsx`

A tall glassmorphic card with a vertical, scrollable spiritual journey path. Theme nodes stack top-to-bottom. Sophia's narration sits below the path. Ends with the Horizon element.

**Tasks:**
- [ ] Glassmorphic card container (~33% width on desktop, min-height 400px, max-height 500px)
- [ ] Header: "Your Journey" (16px, semibold) + chevron-right link to full Journey page
- [ ] Scrollable vertical path area (SVG or Canvas):
  - Past nodes: 14px circles, `#C5B49B` at 60%, connected by 2px vertical lines (`#C5B49B` at 40%)
  - Current node: 16px circle, `#756653`, pulse animation (3s cycle)
  - Theme labels: 14px, right of node, font-weight 500
  - Time labels: 12px, right of node below theme, muted
  - Node spacing: 48-56px vertical gap
- [ ] Horizon element at bottom of path:
  - Connected by dotted line from current node
  - Radial gradient glow (`rgba(222, 209, 186, 0.6)` → transparent), 20px diameter
  - Pulsing glow animation (5s cycle)
  - Label: "HORIZON", 14px, letter-spacing 0.1em, muted
- [ ] Sophia narration below scroll area (14px, italic, muted — 2-3 sentences)
- [ ] CTA: "See Full Journey" (14px, font-weight 500, `#756653`, arrow icon)

**Data Source:**
```typescript
interface JourneyNode {
  id: string;
  theme: string;
  startedAt: string;
  duration: string;  // "wk 1", "2 days", etc.
  status: 'past' | 'current' | 'horizon';
}
```

**Empty State (New Users):**
- Single "START" node → dotted line → HORIZON element
- Narration: "Every journey begins with a single step. Yours just started."

**Acceptance Criteria:**
- Vertical path renders with correct node types and connecting lines
- Current node pulses, Horizon element glows
- Scroll works smoothly within the card
- Sophia narration updates based on journey data
- Empty state displays correctly for new users

---

### 4.5 Build Your Constellation Card

**New File:** `src/components/dashboard/ConstellationCard.tsx`

A glassmorphic card with a vertical list of saved insights. Each row has a star thumbnail left and text right. Sophia's pattern-noticing message sits at the bottom.

**Tasks:**
- [ ] Glassmorphic card container (~33% width, min 400px, max 500px height)
- [ ] Header: "Your Constellation" (16px, semibold) + star count pill right-aligned (`12 ★`, pale-oak background, 12px, border-radius 100px)
- [ ] Insight rows (scrollable if > ~5):
  - 48x48px thumbnail (border-radius 10px, dark background with centered glowing star point `#C5B49B`)
  - Title: 14px, font-weight 500
  - Description: 13px, muted, max 2 lines (line-clamp 2)
  - Row hover: `rgba(222, 209, 186, 0.1)` background
  - Tap: opens full insight view
  - Divider: 1px `rgba(0, 0, 0, 0.04)` between rows
- [ ] Sophia's pattern notice (below list):
  - Tiny Sophia orb (24px, inline-start)
  - Notice text: 13px, italic, muted — Sophia's observation about connections
  - CTA: "Explore This Connection" (14px, font-weight 500, `#756653`, arrow)

**Data Source:**
```typescript
interface Insight {
  id: string;
  title: string;       // Theme name ("Grace")
  content: string;     // Saved text snippet
  tags: string[];
  conversationId: string;
  savedAt: string;
  theme?: string;
}
```

**Empty State (New Users):**
- Faint scattered decorative stars (3-5, opacity 0.15)
- Message: "Every insight you save becomes a star. Over time, they'll form patterns you never expected."
- CTA: "Start a Conversation to Discover Your First Star"

**Growth Stages:**

| Stage | Stars | Treatment |
|-------|-------|-----------|
| Empty sky | 0 | Faint stars, inviting message |
| First stars | 1-5 | Individual rows, each celebrated |
| Clusters forming | 6-15 | Thumbnails show mini-clusters, Sophia notices patterns |
| Constellation emerging | 16-30 | Regular pattern-noticing messages |
| Rich constellation | 30+ | Dense list, deep personal collection |

**Acceptance Criteria:**
- Insight rows render correctly with thumbnails, titles, descriptions
- Sophia's pattern notice appears when connections exist (6+ insights)
- Star count updates accurately
- Empty state shows correctly for new users
- Scroll activates for long lists

---

### 4.6 Build On Your Horizon Card

**New File:** `src/components/dashboard/HorizonCard.tsx`

A glassmorphic card with a vertical timeline of forward-looking Horizon invitations. Navigation arrows allow browsing through Horizon sets.

**Tasks:**
- [ ] Glassmorphic card container (~33% width, min 400px, max 500px height)
- [ ] Header: "On Your Horizon" (16px, semibold) + left/right navigation arrows (16px, right-aligned)
- [ ] Horizon items (vertical timeline):
  - Status dot: 10px circle, left-aligned
    - Near-term: filled `#756653`
    - Emerging: filled `#C5B49B` at 50%
    - Distant: open `#C5B49B` at 30%
  - Theme title: 16px, font-weight 600, in quotes
  - Time hint: 13px, muted, right-aligned same line as title ("Feb", "Mar", "—")
  - Description: 13px, muted, 1-2 sentences from Sophia
  - Divider: 1px `rgba(0, 0, 0, 0.06)` between items
  - Row padding: 16px vertical
  - Hover: `rgba(222, 209, 186, 0.1)` background
  - Tap: opens Horizon exploration view with Sophia
- [ ] CTA: "Explore Horizon" (14px, font-weight 500, `#756653`, arrow)

**Data Source:**
```typescript
interface HorizonItem {
  id: string;
  theme: string;
  description: string;
  proximity: 'near' | 'emerging' | 'distant';
  timeHint?: string;   // "Feb", "Next week", "—"
  sourceThemes: string[];  // What journey themes generated this
}
```

**Empty State (New Users):**
- Soft horizon glow visual
- Message: "The horizon is forming. As you explore with Sophia, themes will emerge that point to what's next in your journey."
- CTA: "Start Exploring"

**Acceptance Criteria:**
- Horizon items render with correct dot states (near/emerging/distant)
- Time hints display correctly, "—" for distant items
- Navigation arrows cycle through Horizon sets
- Descriptions connect to user's actual journey themes
- Empty state shows correctly for new users

---

### 4.7 Build Sacred Transition (Returning Users)

**New File:** `src/components/transitions/SacredTransition.tsx`

A 2-3 second Calm-inspired transition screen shown to returning users before the dashboard.

**Tasks:**
- [ ] Full-screen overlay with time-of-day background (matching hero card gradient)
- [ ] Large breathing Sophia orb (center, 120-160px)
- [ ] Rotating spiritual phrase (fade in/out):
  - "Be still." / "You are seen." / "Grace upon grace." / "Come as you are."
  - "The Lord is near." / "Rest in Him." / "He is faithful." / "New mercies."
  - "You are loved." / "Breathe."
- [ ] Tap anywhere to skip immediately
- [ ] Auto-advances after 2-3 seconds
- [ ] Fades seamlessly into dashboard (opacity + scale transition)

**Integration:**
```typescript
// In Index.tsx routing logic
case 'fully-onboarded':
  showSacredTransition(() => navigate('/dashboard'));
  break;
```

**Acceptance Criteria:**
- Transition displays for returning users only
- Orb matches current time-of-day palette
- Phrase rotates daily (or per time period)
- Tap-to-skip is responsive
- Transition fades smoothly into dashboard
- Does not display for first-time users

---

### 4.8 Assemble Dashboard Page

**Files:**
- `src/pages/Dashboard.tsx`
- New: `src/components/dashboard/SacredRhythmDashboard.tsx`

**Tasks:**
- [ ] Create `SacredRhythmDashboard.tsx` assembling all components:
  - `DashboardHeader`
  - `HeroCard`
  - `QuickAccessRow`
  - Three-column layout: `JourneyCard` | `ConstellationCard` | `HorizonCard`
- [ ] Desktop: three equal-width columns for bottom cards
- [ ] Wire up `useTimePeriod()` hook to hero card
- [ ] Wire up `getUserContext()` to hero card message + CTAs
- [ ] Update `Dashboard.tsx` to render `SacredRhythmDashboard`
- [ ] Remove or deprecate `MainDashboard.tsx`
- [ ] Page scrolls naturally as single flowing page
- [ ] Card entrance animation: opacity + translateY, 500ms, staggered 100ms

**Layout (Desktop):**
```
┌──────────────────────────────────────────────────────────────┐
│  [DashboardHeader]                                           │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ [HeroCard - full width]                                  ││
│  └──────────────────────────────────────────────────────────┘│
│  [QuickAccessRow - circles]                                  │
│  ┌────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │ JourneyCard    │  │ ConstellationCard │  │ HorizonCard  │ │
│  └────────────────┘  └──────────────────┘  └──────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

**Acceptance Criteria:**
- All dashboard sections render correctly
- Time-of-day awareness working end-to-end (gradient, greeting, orb, Scripture)
- Contextual intelligence working (personalized messages, CTAs)
- Cards animate in on page load
- 40-50% breathing room (whitespace) maintained
- Old MainDashboard no longer rendered

---

## Phase 5: Bible Reader & Scripture Experience

**Priority:** High | **Complexity:** High

> **New in v2.** The Bible is the foundation of Wholelicity. This phase builds a native Scripture reading experience with highlights, annotations, and deep Sophia integration for hermeneutical study. Users can access the Bible at any point, highlight verses, and ask Sophia to expound on any passage with historical, linguistic, and theological depth.

### 5.1 Bible Data Source & API

**New File:** `src/lib/bibleApi.ts`

**Tasks:**
- [ ] Evaluate and select Bible API (API.Bible, ESV API, or similar)
- [ ] Implement API client with caching for fast page loads
- [ ] Build book/chapter/verse data structure
- [ ] Implement search by keyword, phrase, and reference
- [ ] Handle translation selection (primary + future multi-translation support)
- [ ] Cache recently read chapters for offline-like performance

**Data Interfaces:**
```typescript
interface BibleBook {
  id: string;
  name: string;
  testament: 'old' | 'new';
  chapters: number;
  genre: 'narrative' | 'poetry' | 'prophecy' | 'epistle' | 'gospel' | 'law' | 'wisdom';
}

interface BibleChapter {
  bookId: string;
  chapter: number;
  verses: BibleVerse[];
}

interface BibleVerse {
  id: string;         // "JHN.15.5"
  bookId: string;
  chapter: number;
  verse: number;
  text: string;
  reference: string;  // "John 15:5"
}
```

**Acceptance Criteria:**
- Bible text loads quickly (< 500ms for a chapter)
- All 66 books navigable
- Search returns relevant results
- API errors handled gracefully with cached fallback

---

### 5.2 Bible Navigation Component

**New File:** `src/components/bible/BibleNavigator.tsx`

**Tasks:**
- [ ] Book selection view (Old Testament / New Testament sections, genre groupings)
- [ ] Chapter grid selection (tap a chapter number)
- [ ] Verse-level jump navigation (search or reference input)
- [ ] Breadcrumb showing current location: Book > Chapter
- [ ] Recent history (last 5 chapters read)

**Acceptance Criteria:**
- Users can navigate to any book/chapter/verse in 3 taps or fewer
- Recent history persists across sessions
- Search resolves references ("John 3:16") and keywords ("love your neighbor")

---

### 5.3 Bible Reading View

**New Files:**
- `src/pages/Bible.tsx`
- `src/components/bible/ReadingView.tsx`
- `src/components/bible/VerseText.tsx`

**Tasks:**
- [ ] Clean, distraction-free reading layout
- [ ] Serif typography for Scripture text (line-height 1.8+)
- [ ] Inline verse numbers (subtle, muted, smaller font)
- [ ] Chapter navigation (swipe or arrows)
- [ ] User-adjustable text size (14-22px range)
- [ ] Warm cream background matching dashboard (`#F8F6F0`)
- [ ] Dark mode support (deep navy background)
- [ ] Reading progress tracking (optional, stored per book)

**Acceptance Criteria:**
- Scripture text is beautiful and highly readable
- Swipe/arrow chapter navigation is smooth
- Text size preference persists across sessions
- Matches Wholelicity's warm design system

---

### 5.4 Highlight System

**New Files:**
- `src/components/bible/HighlightBar.tsx`
- `src/lib/highlights.ts`

**Tasks:**
- [ ] Text selection triggers floating action bar: [Highlight] [Ask Sophia] [Copy] [Share]
- [ ] 5 highlight colors: Gold (`#C5B49B`), Green (`#87A96B`), Blue (`#6B9FBF`), Purple (`#8B7BB5`), Red (`#C47A6B`)
- [ ] Highlighted verses persist across sessions (localStorage / Supabase)
- [ ] Personal annotations on highlighted verses
- [ ] "My Highlights" collection view (organized by book, date, or color)
- [ ] Highlighted text renders with colored background in reading view
- [ ] Highlighted verses optionally become Constellation stars

**Highlight Schema:**
```typescript
interface Highlight {
  id: string;
  verseId: string;       // "JHN.15.5"
  reference: string;     // "John 15:5"
  text: string;
  color: 'gold' | 'green' | 'blue' | 'purple' | 'red';
  annotation?: string;
  createdAt: string;
  addedToConstellation: boolean;
}
```

**Acceptance Criteria:**
- Users can highlight any verse in 2 taps (select → color)
- Highlights render visually in the reading view
- Annotations can be added and edited
- Highlights persist across sessions
- "My Highlights" view is accessible and searchable

---

### 5.5 Ask Sophia — Hermeneutical Integration

**New Files:**
- `src/components/bible/AskSophiaPanel.tsx`
- `src/lib/sophiaHermeneutics.ts`

**Tasks:**
- [ ] "Ask Sophia" button in floating action bar (appears on verse selection)
- [ ] Contextual chat panel (slide-up on mobile, side panel on desktop)
- [ ] Pass selected verse(s) + book context to Sophia
- [ ] Sophia system prompt includes hermeneutical framework:
  - Historical context (authorship, audience, setting)
  - Literary context (genre, devices, structure)
  - Original language (Hebrew/Greek word studies)
  - Cross-references and intertextual connections
  - Theological significance
  - Personal application questions
  - Denominational awareness for disputed interpretations
- [ ] Follow-up paths after initial response (cross-refs, deeper study, personal reflection)
- [ ] Save Sophia's response as Constellation insight
- [ ] Return to reading view with context preserved

**Sophia Hermeneutical System Prompt:**
```typescript
const HERMENEUTICS_CONTEXT = `
When the user asks about a Bible passage, provide depth across these layers:
1. Historical/Cultural Context — Who wrote this, when, to whom, what was happening
2. Literary Context — Genre, literary devices, where this sits in the book's structure
3. Original Language — Key Hebrew/Greek words, nuances, word studies
4. Cross-References — Related passages across Scripture
5. Theological Significance — How this fits in the larger biblical narrative
6. Application — Thoughtful questions connecting this to their life

When interpretations vary across traditions, present perspectives fairly.
Always end with a question that invites personal reflection.
`;
```

**Acceptance Criteria:**
- Sophia provides rich, multi-layered responses to passage questions
- Responses include historical, linguistic, and theological depth
- Follow-up paths are relevant and engaging
- Panel transitions are smooth
- Insights from this conversation are saveable to Constellation

---

### 5.6 Dashboard & Platform Integration

**Files to modify:**
- `src/components/dashboard/QuickAccessRow.tsx` — Scripture circle becomes active
- `src/components/dashboard/ConstellationCard.tsx` — Scripture-type stars
- `src/components/dashboard/JourneyCard.tsx` — Bible reading nodes
- `src/components/dashboard/HorizonCard.tsx` — Scripture-informed Horizon items
- `src/components/dashboard/HeroCard.tsx` — Scripture verse links to Bible Reader

**Tasks:**
- [ ] Scripture Quick Access circle becomes active → navigates to `/bible`
- [ ] Hero card Scripture verse is tappable → opens passage in Bible Reader
- [ ] Highlighted verses appear as Scripture-type stars in Constellation (distinct thumbnail treatment)
- [ ] Extended Bible reading creates Journey nodes ("2 weeks in the Psalms")
- [ ] Scripture themes inform Horizon suggestions
- [ ] Add Bible to bottom tab bar on mobile (or include in "More" menu)

**Acceptance Criteria:**
- Scripture circle navigates to Bible Reader
- Hero card verse links to the passage
- Constellation shows Scripture insights alongside chat insights
- Bible reading themes integrate naturally into Journey and Horizon

---

## Phase 6: Chat Experience Enhancement

**Priority:** Medium | **Complexity:** Medium

Improve the core chat experience with Sophia. **Updated in v2** to integrate with the Constellation system.

### 6.1 Persona-Aware First Messages

**File:** `src/pages/Chat.tsx` or new `src/lib/sophiaMessages.ts`

**Tasks:**
- [ ] Create persona-specific first message templates
- [ ] Pull user's persona from onboarding state
- [ ] Display appropriate message based on persona
- [ ] Include persona-relevant suggested topics

**Message Templates:**
```typescript
const FIRST_MESSAGES = {
  curious_seeker: `Hi there! I'm Sophia, and I'm genuinely glad you're here.
Exploring faith can feel overwhelming, but there's no pressure here - just conversation at whatever pace feels right.
What drew you to start this journey?`,

  discovery_veteran: `Welcome! I can tell you've been walking this path for a while.
After years of studying Scripture, it's easy to think you've seen it all. But I have a feeling there are connections waiting to surprise you.
What passage has been on your mind lately?`,

  equipped_shepherd: `Welcome, friend. I know ministry keeps you constantly giving to others.
I'm here to help fill your cup while equipping you to serve better. Whether you need personal formation or teaching preparation - I'm here.
What's most pressing for you right now?`,
  // ... additional personas
};
```

**Acceptance Criteria:**
- First message reflects user's persona
- Suggested topics align with persona needs
- Experience feels personally tailored

---

### 6.2 Add Suggested Topics UI

**File:** `src/pages/Chat.tsx`

**Tasks:**
- [ ] Display suggested topics below first message
- [ ] Topics are tappable quick-replies (chip/pill style)
- [ ] Topics vary by persona and context
- [ ] Topics disappear after user sends first message

**Acceptance Criteria:**
- Topics appear with first message
- Tapping a topic sends it as user message
- Topics are persona-appropriate
- Topics hide after first user message

---

### 6.3 Add Save Insight Functionality (Feeds Constellation)

**Files:**
- `src/pages/Chat.tsx`
- New: `src/components/chat/SaveInsightButton.tsx`
- New: `src/lib/insights.ts`

> **Updated in v2:** Insights saved here directly feed the Constellation card on the dashboard.

**Tasks:**
- [ ] Add subtle "Save" icon on each Sophia message (bookmark style)
- [ ] On tap, save with auto-generated title (from theme extraction) and content snippet
- [ ] Store in localStorage or Supabase using `Insight` interface
- [ ] Show confirmation toast ("Star saved to your Constellation ✨")
- [ ] Track theme tags automatically from conversation context
- [ ] Expose `getInsights()` and `getInsightCount()` for Constellation card

**Insight Schema:**
```typescript
interface Insight {
  id: string;
  title: string;
  content: string;
  tags: string[];
  conversationId: string;
  savedAt: string;
  theme?: string;
}
```

**Acceptance Criteria:**
- Users can save meaningful messages from Sophia
- Insights persist across sessions
- Saved insights appear in Constellation card on dashboard
- Star count updates in real time if dashboard is open

---

### 6.4 Implement Pattern-Noticing Intelligence (Feeds Constellation)

**New File:** `src/lib/patternNoticing.ts`

> **New in v2.** This is Sophia's ability to notice connections between saved insights, which powers the pattern notice at the bottom of the Constellation card.

**Tasks:**
- [ ] Analyze saved insights for recurring themes
- [ ] Detect when multiple insights share tags or themes
- [ ] Generate Sophia observation messages for the Constellation card
- [ ] Trigger at thresholds: 6+ insights, or 2+ insights sharing a theme

**Pattern Notice Logic:**
```typescript
function generatePatternNotice(insights: Insight[]): string | null {
  const themeCounts = countThemes(insights);
  const topPair = findMostConnectedPair(themeCounts);

  if (!topPair) return null;

  return `${topPair[0]} and ${topPair[1]} keep appearing together in your journey. There might be something deeper here...`;
}
```

**Acceptance Criteria:**
- Pattern notices surface when meaningful connections exist
- Notices use Sophia's voice (warm, inviting, not prescriptive)
- No notice shown when insufficient data

---

### 6.5 Improve Typing Indicator

**File:** `src/components/chat/TypingIndicator.tsx`

**Tasks:**
- [ ] Review current typing indicator design
- [ ] Ensure it feels like Sophia is "thinking"
- [ ] Add subtle orb reference/animation
- [ ] Consider adding "Sophia is composing..." text

**Acceptance Criteria:**
- Typing indicator feels alive and personal
- Matches Sophia's visual identity (orb aesthetic)
- Provides feedback that response is coming

---

### 6.6 Implement Crisis Detection and Response

**New File:** `src/lib/crisisDetection.ts`

**Tasks:**
- [ ] Implement keyword/phrase detection for crisis indicators
- [ ] Tier 1 (Immediate): suicidal ideation, self-harm, abuse — resources + intervention
- [ ] Tier 2 (Urgent): spiritual crisis, severe grief, addiction — extra care + professional suggestion
- [ ] Tier 3 (Sensitive): church hurt, deconstruction, major life transition — gentle tone adjustment
- [ ] Create compassionate intervention modal for Tier 1
- [ ] Adjust Sophia's tone for Tier 2 and 3

**Crisis Response (Tier 1):**
```
I hear you, and I'm concerned about your safety.
You matter deeply, and there are people who can help right now:

• National Suicide Prevention: 988
• Crisis Text Line: Text HOME to 741741

[I'm safe, continue conversation]
[Connect me to resources]
```

**Acceptance Criteria:**
- Crisis language triggers appropriate intervention
- Resources are clearly provided for Tier 1
- User can dismiss if not in crisis
- Sophia continues with extra care after any crisis flag
- No false positives on common spiritual language ("dying to self", "wrestling with God")

---

## Phase 7: Persona Intelligence

**Priority:** Medium | **Complexity:** Medium

Deepen the persona system to drive personalization across the entire platform.

### 7.1 Expand Persona Configuration

**File:** `src/types/wholelicity.ts` or new `src/lib/personas.ts`

**Tasks:**
- [ ] Create full `PERSONA_CONFIGS` with all 7 persona types
- [ ] Each config includes: name, greeting, sophiaTone, primaryModules, suggestedTopics, firstMessage, dashboardMessage
- [ ] Add Sophia relational posture per persona

**Persona Types:**
1. The Curious Seeker (new to faith + conversation)
2. The Visual Explorer (new to faith + visual)
3. The Discovery Veteran (going deeper + patterns)
4. The Contemplative Student (going deeper + reading)
5. The Equipped Shepherd (pastor/leader + groups)
6. The Academic Scholar (seminary + patterns)
7. The Open Questioner (exploring + conversation)

**Acceptance Criteria:**
- All persona types have complete configuration
- Configuration drives all personalized experiences
- Easy to add/modify personas

---

### 7.2 Implement Persona Calculation Logic

**New File:** `src/lib/personaCalculation.ts`

**Tasks:**
- [ ] Create algorithm to determine persona from quiz answers
- [ ] Handle partial quiz completion (use defaults)
- [ ] Allow persona to evolve based on behavior (future)
- [ ] Store calculated persona in user state

**Acceptance Criteria:**
- Persona calculated correctly from quiz answers
- Handles all answer combinations
- Defaults applied for missing answers

---

### 7.3 Persona-Driven Module Recommendations

**New File:** `src/lib/moduleRecommendations.ts`

**Tasks:**
- [ ] Create module ranking per persona
- [ ] Surface "recommended" modules based on persona
- [ ] Integrate with Quick Access circle ordering (highlight recommended modules)
- [ ] Prepare for future module integration

**Acceptance Criteria:**
- Each persona has module priority ranking
- Quick Access circles subtly emphasize persona-recommended modules
- Ready for future module activation

---

## Phase 8: Module Previews & Quick Access

**Priority:** Medium | **Complexity:** Low-Medium

> **Redesigned in v2.** The "Coming Soon" module grid is gone. Replaced with rich preview modals triggered from Quick Access circles.

### 8.1 Create Module Preview Modal

**New File:** `src/components/modules/ModulePreviewModal.tsx`

**Tasks:**
- [ ] Create modal component for each unavailable module
- [ ] Each modal includes:
  - Module name and description
  - Teaser visualization or illustration
  - What the module will offer (2-3 bullet points)
  - "Notify me when available" button
  - "Ask Sophia about this" button (opens chat with prompt)
- [ ] Modal opens when tapping an unavailable Quick Access circle
- [ ] Glassmorphic styling consistent with dashboard

**Example — Pattern Explorer Preview:**
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  Pattern Explorer                                    │
│  Discover hidden biblical connections                │
│                                                      │
│  [Teaser visualization - connected themes]           │
│                                                      │
│  • See how themes weave across all of Scripture      │
│  • Discover connections you've never noticed         │
│  • Visual maps of biblical patterns                  │
│                                                      │
│  [Notify Me When Available]                          │
│  [Ask Sophia About Biblical Patterns →]              │
│                                                      │
│                                          [Close ×]   │
└──────────────────────────────────────────────────────┘
```

**Acceptance Criteria:**
- Each unavailable module has a meaningful preview
- Previews provide real value (not just "coming soon")
- Users can engage meaningfully with the concept
- Modal dismisses cleanly

---

### 8.2 Implement Waitlist System

**New File:** `src/lib/waitlist.ts`

**Tasks:**
- [ ] Create waitlist signup per module
- [ ] Store in localStorage or Supabase
- [ ] Show confirmation on signup ("You'll be the first to know!")
- [ ] Track interest per module for roadmap prioritization

**Acceptance Criteria:**
- Users can express interest in specific modules
- Interest is tracked per module
- Users feel heard, not dismissed

---

### 8.3 Sophia-Integrated Module Discussions

**Tasks:**
- [ ] Enable Sophia to discuss future module concepts in chat
- [ ] "Tell me about Pattern Explorer" / "What is TimeWalk?" → Sophia explains
- [ ] Connect "Ask Sophia About This" button from preview modals to chat with pre-filled prompt
- [ ] Sophia's explanations build anticipation without frustration

**Acceptance Criteria:**
- Sophia can discuss any module concept naturally
- Responses match her defined character (warm, excited but honest)
- Users feel informed about the product vision

---

## Phase 9: Responsive & Mobile

**Priority:** Medium | **Complexity:** Medium

> **New in v2.** Dedicated phase for responsive layouts. The dashboard must work beautifully across desktop, tablet, and mobile.

### 9.1 Mobile Layout (Single Column)

**Tasks:**
- [ ] Hero card: full width, 16px horizontal margin, CTAs as compact row or stacked
- [ ] Quick Access: horizontal scrollable row, 48px circles, 12px gap, no wrapping
- [ ] Journey card: full width, 3-4 nodes visible with scroll
- [ ] Constellation card: full width, 3 most recent insights, "View all" link
- [ ] Horizon card: full width, 2-3 items
- [ ] Section labels: left-aligned, 14px semibold, 24px top margin
- [ ] Card spacing: 16px between cards
- [ ] Sophia orb: same size but repositioned for mobile (centered or above text)

**Mobile Layout:**
```
┌────────────────────────────────┐
│  [WL Logo]             [⚙️]    │
├────────────────────────────────┤
│  [Hero Card - full width]      │
│  [Quick Access - scroll]       │
│  [Journey Card]                │
│  [Constellation Card]          │
│  [Horizon Card]                │
├────────────────────────────────┤
│  [Bottom Tab Bar]              │
└────────────────────────────────┘
```

**Acceptance Criteria:**
- All dashboard content accessible on mobile
- No horizontal overflow
- Cards stack naturally in single column
- Quick Access scrolls horizontally
- Touch targets are 44px+ minimum

---

### 9.2 Bottom Tab Bar

**New File:** `src/components/navigation/BottomTabBar.tsx`

**Tasks:**
- [ ] 5-item tab bar: Home, Sophia, Journey, Insights, More
- [ ] Height: 64px + safe area inset
- [ ] Glassmorphic background: `rgba(255, 255, 255, 0.9)` + `blur(16px)`
- [ ] Border top: `1px solid rgba(0, 0, 0, 0.06)`
- [ ] Icons: 24px, active fills `#756653`, inactive `#9CA3AF`
- [ ] Labels: 10px, below icon
- [ ] Active indicator: filled icon + bold label + subtle dot above icon
- [ ] Only visible on mobile/tablet (hidden on desktop)

**Tab Mapping:**

| Tab | Icon | Destination |
|-----|------|-------------|
| Home | 🏠 | Dashboard |
| Sophia | 💬 | Chat |
| Journey | 🗺️ | Journey page |
| Insights | 💡 | Constellation view |
| More | ••• | Menu/settings |

**Acceptance Criteria:**
- Tab bar renders correctly on mobile and tablet
- Active state clearly indicates current page
- Safe area respected on notched devices
- Hidden on desktop

---

### 9.3 Tablet Layout (Two-Column + Full-Width)

**Tasks:**
- [ ] Hero card: full width
- [ ] Quick Access: full row, no scroll needed
- [ ] Journey + Constellation: two-column, equal width
- [ ] Horizon: full width below, items arranged in horizontal row
- [ ] Bottom tab bar: visible
- [ ] Breakpoint: 768px-1024px

**Tablet Layout:**
```
┌──────────────────────────────────────────────────────┐
│  [Hero Card - full width]                             │
│  [Quick Access - full row]                            │
│  ┌──────────────────┐  ┌──────────────────────────┐  │
│  │ Journey           │  │ Constellation             │  │
│  └──────────────────┘  └──────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐│
│  │ Horizon (full width, items in row)                ││
│  └──────────────────────────────────────────────────┘│
│  [Bottom Tab Bar]                                     │
└──────────────────────────────────────────────────────┘
```

**Acceptance Criteria:**
- Two-column layout renders correctly at tablet breakpoints
- Horizon card spans full width with horizontal item layout
- No content overflow or awkward spacing

---

### 9.4 Responsive Breakpoints

**File:** `tailwind.config.ts`

**Tasks:**
- [ ] Define breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
- [ ] Dashboard grid:
  - Mobile: single column
  - Tablet: two-column + full-width
  - Desktop: three equal columns
- [ ] Hero card: full width at all breakpoints
- [ ] Quick Access: scrollable on mobile, full row on tablet+

**Acceptance Criteria:**
- Smooth transitions between breakpoints
- No layout bugs at boundary widths
- Content readable at all sizes

---

## Phase 10: Future Module Integration

**Priority:** Future | **Complexity:** High

Framework for integrating modules as they become available.

### 10.1 Module Architecture Foundation

**Tasks:**
- [ ] Define module interface/contract
- [ ] Create module registration system
- [ ] Establish Sophia integration points per module
- [ ] Design cross-module navigation patterns

**Module Interface:**
```typescript
interface WholelicityModule {
  id: ModuleType;
  name: string;
  description: string;
  available: boolean;
  routes: RouteConfig[];
  sophiaIntegrations: SophiaIntegration[];
  dashboardWidget?: DashboardWidget;
  contextualTriggers: ContextTrigger[];
}
```

---

### 10.2 Cross-Module Suggestions

**Tasks:**
- [ ] After chat responses, suggest relevant modules contextually
- [ ] Integrate module content into Journey, Constellation, and Horizon cards
- [ ] Seamless transitions between modules

**Example:**
```
User asks about the woman at the well...
Sophia responds, then:
┌─────────────────────────────────────────────────┐
│  Explore Further:                                │
│  • [TimeWalk] Experience 1st century Samaria     │
│  • [Patterns] See "living water" across Scripture │
│  • [Community] Others discussing this passage    │
└─────────────────────────────────────────────────┘
```

---

### 10.3 Unified Sophia Intelligence

**Tasks:**
- [ ] Sophia maintains context across all modules
- [ ] Conversation in Wisdom Guide informs TimeWalk suggestions
- [ ] Pattern discoveries inform chat topics
- [ ] Community discussions inform follow-up questions
- [ ] Saved insights from any module inform Constellation pattern recognition
- [ ] All module activity feeds Horizon generation

---

### 10.4 Sidebar Navigation Restoration

**Tasks:**
- [ ] When 3+ modules are available, evaluate adding left sidebar
- [ ] Sidebar spec saved in `docs/ux-dashboard-design.md` (collapsed `<details>` section)
- [ ] Width 220px, glassmorphic, fixed left
- [ ] Nav items: Dashboard, Sophia, Scripture, Journey, Insights, Discover, Support, Settings

**Trigger:** When at least 3 modules are fully available and persistent navigation becomes necessary.

---

## Implementation Dependencies

```
Phase 1 (Critical Fixes) ─── No dependencies
    │
    ├── 1.1 Returning User Detection
    ├── 1.2 Skip Button
    ├── 1.3 Sophia First Message
    └── 1.4 Intro Duration

Phase 2 (Onboarding) ─── Depends on Phase 1
    │
    ├── 2.1 Back Navigation
    ├── 2.2 Skip Option
    ├── 2.3 Progress Persistence
    ├── 2.4 Sophia Acknowledgments
    └── 2.5 Remove WelcomeDashboard ──── Depends on 1.3

Phase 3 (Design System) ─── Can run parallel to Phase 2
    │
    ├── 3.1 Glassmorphic Card System
    ├── 3.2 Time-of-Day Engine
    ├── 3.3 Brand Tokens & Animations
    └── 3.4 Contextual Intelligence Service

Phase 4 (Dashboard Build) ─── Depends on Phase 3
    │
    ├── 4.1 Page Header
    ├── 4.2 Hero Card ──────────── Depends on 3.1, 3.2, 3.4
    ├── 4.3 Quick Access Row ───── Depends on 3.1
    ├── 4.4 Journey Card ──────── Depends on 3.1, 3.3
    ├── 4.5 Constellation Card ── Depends on 3.1, 6.3 (insight data)
    ├── 4.6 Horizon Card ──────── Depends on 3.1, 3.4
    ├── 4.7 Sacred Transition ─── Depends on 3.2
    └── 4.8 Assemble Dashboard ── Depends on 4.1-4.7

Phase 5 (Bible Reader) ─── Depends on Phase 3; can run parallel to Phase 4
    │
    ├── 5.1 Bible API ────────── Depends on 3.3 (brand tokens)
    ├── 5.2 Navigation ──────── Depends on 5.1
    ├── 5.3 Reading View ────── Depends on 5.1, 3.1 (GlassCard)
    ├── 5.4 Highlight System ── Depends on 5.3
    ├── 5.5 Ask Sophia ──────── Depends on 5.3
    └── 5.6 Dashboard Integration ── Depends on 5.4, 5.5, Phase 4

Phase 6 (Chat Enhancement) ─── Can run parallel to Phase 4-5
    │
    ├── 6.1 Persona Messages ───── Depends on 7.1
    ├── 6.2 Suggested Topics
    ├── 6.3 Save Insight ──────── Feeds 4.5 (Constellation)
    ├── 6.4 Pattern Noticing ──── Depends on 6.3, feeds 4.5
    ├── 6.5 Typing Indicator
    └── 6.6 Crisis Detection

Phase 7 (Persona) ─── Can run parallel to Phase 4-6
    │
    ├── 7.1 Persona Config ────── Feeds 6.1
    ├── 7.2 Calculation Logic
    └── 7.3 Module Recommendations

Phase 8 (Module Previews) ─── Can run parallel to Phase 4-7
    │
    ├── 8.1 Preview Modal ─────── Connects to 4.3 (Quick Access)
    ├── 8.2 Waitlist System
    └── 8.3 Sophia Module Discussions

Phase 9 (Responsive) ─── Depends on Phase 4
    │
    ├── 9.1 Mobile Layout
    ├── 9.2 Bottom Tab Bar
    ├── 9.3 Tablet Layout
    └── 9.4 Breakpoints

Phase 10 (Future Modules) ─── After Phases 1-9 complete
    │
    ├── 10.1 Module Architecture
    ├── 10.2 Cross-Module Suggestions
    ├── 10.3 Unified Intelligence
    └── 10.4 Sidebar Restoration
```

### Parallel Execution Opportunities

These phases can run simultaneously:

| Track A | Track B | Track C |
|---------|---------|---------|
| Phase 2 (Onboarding) | Phase 3 (Design System) | — |
| — | Phase 4 (Dashboard) | Phase 5 (Bible Reader) |
| — | — | Phase 6 (Chat) + Phase 7 (Persona) |
| — | Phase 9 (Responsive) | Phase 8 (Previews) |

---

## Success Metrics

### Phase 1-2 Metrics (Onboarding)
- **Onboarding completion rate:** 85%+ (currently estimated 61-68%)
- **Time to first chat message:** < 2 minutes from start
- **Quiz completion rate:** 90%+ of those who start
- **Returning user detection:** 100% accuracy

### Phase 3-4 Metrics (Dashboard)
- **Click-through rate:** 80%+ engage with at least one dashboard section
- **Time on dashboard:** 15-45 seconds (orient quickly, not linger)
- **Sophia engagement rate:** 50%+ engage with hero card CTA
- **Journey views:** 40%+ tap "See Full Journey" within first month
- **Constellation engagement:** 30%+ tap to explore connections
- **Quick Access diversity:** Users use 2+ different pathways
- **Time-of-day distribution:** Usage spread across day, not just one time

### Phase 5 Metrics (Bible Reader)
- **Bible access rate:** 30%+ of users open Bible Reader within first week
- **Reading session length:** 3+ minutes average per reading session
- **Highlight rate:** 25%+ of reading sessions include a highlight
- **Ask Sophia rate:** 15%+ of reading sessions include an "Ask Sophia" interaction
- **Cross-feature flow:** 10%+ of Bible highlights added to Constellation
- **Navigation efficiency:** Users reach desired passage in < 3 taps

### Phase 6 Metrics (Chat)
- **First response rate:** 95%+ respond to Sophia's greeting
- **Messages per session:** 5+ average
- **Insight save rate:** 20%+ of sessions include a save
- **Crisis detection accuracy:** 0 missed Tier 1 events

### Phase 7-8 Metrics (Persona & Previews)
- **Persona accuracy:** User feedback confirms persona feels accurate
- **Module interest:** Track waitlist signups per module
- **Anticipation engagement:** Users asking Sophia about future features
- **Preview modal engagement:** 15%+ of unavailable circle taps result in waitlist signup

### Phase 9 Metrics (Responsive)
- **Mobile usability:** All interactive elements 44px+ touch targets
- **Layout correctness:** No overflow bugs across breakpoints
- **Bottom tab engagement:** Even distribution across tab items

### Overall
- **Day 1 retention:** 60%+
- **Day 7 retention:** 40%+
- **NPS score:** 50+
- **App store rating:** 4.5+

---

## Appendix: File Change Summary

### New Files to Create

**Phase 3 — Design System:**
- `src/components/ui/GlassCard.tsx`
- `src/lib/timeAwareness.ts`
- `src/lib/contextualIntelligence.ts`

**Phase 4 — Dashboard:**
- `src/components/dashboard/SacredRhythmDashboard.tsx`
- `src/components/dashboard/DashboardHeader.tsx`
- `src/components/dashboard/HeroCard.tsx`
- `src/components/dashboard/QuickAccessRow.tsx`
- `src/components/dashboard/JourneyCard.tsx`
- `src/components/dashboard/ConstellationCard.tsx`
- `src/components/dashboard/HorizonCard.tsx`
- `src/components/transitions/SacredTransition.tsx`

**Phase 5 — Bible Reader:**
- `src/pages/Bible.tsx`
- `src/components/bible/BibleNavigator.tsx`
- `src/components/bible/ReadingView.tsx`
- `src/components/bible/VerseText.tsx`
- `src/components/bible/HighlightBar.tsx`
- `src/components/bible/AskSophiaPanel.tsx`
- `src/lib/bibleApi.ts`
- `src/lib/highlights.ts`
- `src/lib/sophiaHermeneutics.ts`

**Phase 6 — Chat:**
- `src/lib/sophiaMessages.ts`
- `src/lib/insights.ts`
- `src/lib/patternNoticing.ts`
- `src/lib/crisisDetection.ts`
- `src/components/chat/SaveInsightButton.tsx`

**Phase 7 — Persona:**
- `src/lib/personas.ts`
- `src/lib/personaCalculation.ts`
- `src/lib/moduleRecommendations.ts`

**Phase 8 — Previews:**
- `src/components/modules/ModulePreviewModal.tsx`
- `src/lib/waitlist.ts`

**Phase 9 — Responsive:**
- `src/components/navigation/BottomTabBar.tsx`

### Files to Modify

- `src/pages/Index.tsx` — Routing logic, returning user detection, sacred transition
- `src/pages/Chat.tsx` — First message, suggested topics, save insight, crisis detection
- `src/pages/Dashboard.tsx` — Use new SacredRhythmDashboard
- `src/components/onboarding/CinematicIntro.tsx` — Duration, skip button
- `src/components/onboarding/SplitOnboarding.tsx` — Back nav, skip
- `src/components/onboarding/ChatOnboardingPanel.tsx` — Acknowledgments
- `src/components/chat/TypingIndicator.tsx` — Redesign
- `src/lib/onboardingState.ts` — Quiz progress persistence, state schema
- `src/index.css` — Glassmorphic styles, animations, page background
- `tailwind.config.ts` — Brand colors, breakpoints, animation keyframes

### Files to Deprecate/Remove

- `src/components/dashboard/WelcomeDashboard.tsx` — Remove (Phase 2.5)
- `src/components/dashboard/MainDashboard.tsx` — Replace with SacredRhythmDashboard (Phase 4.8)

---

## Next Steps

1. **Review and approve** this implementation plan
2. **Begin Phase 1** — Critical fixes (can start immediately)
3. **Begin Phase 3 in parallel** — Design system foundation
4. **Design review** for Phase 4 dashboard components (pair with high-fidelity mockups)
5. **Begin Phase 5 (Bible Reader) in parallel** when Phase 3 completes
6. **Begin Phase 6 (Chat) + Phase 7 (Persona) in parallel** once Phase 4 is underway
7. **Plan user testing** after Phase 4 + Phase 5 completion
8. **Evaluate Phase 9** responsive needs based on target audience device distribution

---

## Document Ecosystem

| Document | Relationship to This |
|----------|---------------------|
| `docs/ux-proposal-v2.md` | Master UX strategy — this doc implements it |
| `docs/ux-dashboard-design.md` | Visual specs for each dashboard component — Phase 4 builds from this |
| `docs/ux-dashboard-vision.md` | Conceptual vision — this doc operationalizes it |
| `docs/sophia-definition.md` | Sophia's character — informs all Sophia-related tasks |
| `docs/ux-dashboard-brainstorm.md` | Original concepts — Phase 4 synthesizes the chosen hybrid |
| `docs/ux-audit.md` | Original issues — Phases 1-2 address the critical findings |
| `docs/ux-user-flow-diagrams.md` | Flow diagrams — Phases 1-2 implement the revised flows |
| `docs/ux-information-architecture.md` | IA — Phases 4, 7, 9 follow this structure |
| `docs/ux-interaction-patterns.md` | Interaction specs — all phases follow these patterns |
| `docs/ux-state-diagrams.md` | State machines — Phase 2.3 implements the onboarding state |

---

*This v2 implementation roadmap supersedes `docs/ux-implementation-phases.md` and aligns with `docs/ux-proposal-v2.md`.*
