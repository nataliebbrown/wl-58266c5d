# Wholelicity UX Implementation Phases

> Comprehensive roadmap for implementing UX improvements across onboarding, dashboard, chat, and future modules.

This document breaks down the UX proposal and deliverables into prioritized implementation phases with specific tasks, dependencies, and acceptance criteria.

---

## Phase Overview

| Phase | Focus | Priority | Complexity |
|-------|-------|----------|------------|
| **Phase 1** | Critical Fixes | Immediate | Low |
| **Phase 2** | Onboarding Refinement | High | Medium |
| **Phase 3** | Dashboard Reimagination | High | High |
| **Phase 4** | Chat Experience Enhancement | Medium | Medium |
| **Phase 5** | Persona Intelligence | Medium | Medium |
| **Phase 6** | Module Previews & Waitlists | Low | Low |
| **Phase 7** | Future Module Integration | Future | High |

---

## Phase 1: Critical Fixes
**Priority:** Immediate | **Complexity:** Low

These are bugs and issues that significantly impact user experience and should be fixed before any new development.

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

**Task:**
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

**Task:**
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

**Task:**
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

**Task:**
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

**Task:**
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

**Task:**
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

**Task:**
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
  // ... existing fields
}
```

**Acceptance Criteria:**
- Partial quiz progress persists across sessions
- Users can resume quiz from where they left off
- State is properly cleaned up after quiz completion

---

### 2.4 Add Sophia Acknowledgments in Quiz

**File:** `src/components/onboarding/ChatOnboardingPanel.tsx`

**Task:**
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

**Task:**
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

## Phase 3: Dashboard Reimagination
**Priority:** High | **Complexity:** High

Complete redesign of the dashboard based on Sophia-centric, contextual, time-aware concepts.

### 3.1 Design: Sophia-Centric Dashboard

**Concept:** Sophia IS the dashboard. The entire experience is conversational and contextual.

**New File:** `src/components/dashboard/SophiaDashboard.tsx`

**Structure:**
```
┌────────────────────────────────────────────────────────┐
│  [Logo]                              [Time] [Settings] │
├────────────────────────────────────────────────────────┤
│                                                        │
│              [Large Breathing Sophia Orb]              │
│                                                        │
│   [Contextual message from Sophia based on:]           │
│   - Time of day                                        │
│   - Recent conversations                               │
│   - User's spiritual season                            │
│   - Days since last visit                              │
│                                                        │
│   ┌──────────────────────────────────────────────────┐ │
│   │ [Primary Action - Contextual]                    │ │
│   └──────────────────────────────────────────────────┘ │
│   ┌──────────────────────────────────────────────────┐ │
│   │ [Secondary Action - Contextual]                  │ │
│   └──────────────────────────────────────────────────┘ │
│   ┌──────────────────────────────────────────────────┐ │
│   │ [Tertiary Action - "Something new"]              │ │
│   └──────────────────────────────────────────────────┘ │
│                                                        │
│   ─────────────────────────────────────────────────── │
│   [Subtle access to: Insights (n) | Journey | Menu]   │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Tasks:**
- [ ] Create new `SophiaDashboard.tsx` component
- [ ] Implement contextual message generation logic
- [ ] Design and implement new action button system
- [ ] Create subtle secondary navigation
- [ ] Remove old `MainDashboard.tsx` (or keep as fallback)

---

### 3.2 Implement Time-of-Day Awareness

**File:** `src/lib/timeAwareness.ts` (new)

**Task:**
- [ ] Create time period detection (Dawn, Morning, Midday, Evening, Night)
- [ ] Define Sophia messages for each time period
- [ ] Adjust orb colors/animation for time of day
- [ ] Create time-appropriate suggested actions

**Time Periods:**
```typescript
type TimePeriod = 'dawn' | 'morning' | 'midday' | 'evening' | 'night';

const TIME_CONFIG = {
  dawn: { // 5am - 7am
    greeting: "The morning is fresh with possibility...",
    orbColors: ['#FFE4B5', '#FFA07A', '#DED1BA'],
    suggestedAction: 'morning_reflection'
  },
  morning: { // 7am - 12pm
    greeting: "Good morning! What's stirring in your heart today?",
    orbColors: ['#C5B49B', '#DED1BA', '#756653'],
    suggestedAction: 'continue_conversation'
  },
  // ... etc
};
```

**Acceptance Criteria:**
- Dashboard appearance changes based on time
- Sophia's greeting reflects time of day
- Orb colors subtly shift with time periods

---

### 3.3 Implement Contextual Intelligence

**File:** `src/lib/contextualIntelligence.ts` (new)

**Task:**
- [ ] Track recent conversation themes/topics
- [ ] Detect user's current "spiritual thread"
- [ ] Generate contextual Sophia messages based on history
- [ ] Prioritize actions based on context

**Context Signals:**
```typescript
interface UserContext {
  lastVisit: Date;
  daysSinceVisit: number;
  recentThemes: string[];
  currentThread: string | null;
  questionsAsked: number;
  insightsSaved: number;
  persona: string;
  spiritualSeason: string;
}
```

**Sophia Message Logic:**
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

**Acceptance Criteria:**
- Dashboard message reflects user's actual journey
- Actions are contextually relevant
- Experience feels personalized, not generic

---

### 3.4 Remove Stats and Module Grid

**Task:**
- [ ] Remove "Your Journey" stats section (streak, conversations, insights counts)
- [ ] Remove "Explore" module grid with "Coming Soon" badges
- [ ] Move stats to a "Journey" page accessible from subtle nav
- [ ] Move module info to menu or future discovery

**Rationale:**
- Stats create gamification without spiritual meaning
- 5 "Coming Soon" modules are demotivating
- Clutter distracts from Sophia relationship

**Acceptance Criteria:**
- Dashboard is clean and focused on Sophia
- Stats still accessible but not prominent
- No visible "Coming Soon" badges on main dashboard

---

### 3.5 Create Journey Visualization Page

**New File:** `src/pages/Journey.tsx`

**Task:**
- [ ] Create dedicated page for viewing spiritual journey
- [ ] Visualize themes explored over time
- [ ] Show saved insights in context
- [ ] Connect related insights/conversations visually

**Visualization Options:**
1. Timeline view (chronological)
2. Theme clusters (by topic)
3. Constellation/garden (organic growth metaphor)

**Acceptance Criteria:**
- Users can see their journey visually
- Insights and themes are connected
- Page is beautiful and meaningful, not just data

---

### 3.6 Implement Minimalist Design System

**Files:**
- `src/index.css`
- `tailwind.config.ts`

**Task:**
- [ ] Increase whitespace throughout dashboard
- [ ] Reduce visual elements to essentials
- [ ] Create "sacred space" feel with breathing room
- [ ] Ensure orb is focal point, not competing elements

**Design Principles:**
- Maximum 3 interactive elements visible at once
- 60%+ of screen is breathing room
- No decorative elements that don't serve function
- Typography hierarchy: 2 sizes maximum on dashboard

**Acceptance Criteria:**
- Dashboard feels calm and contemplative
- Focus is clearly on Sophia and primary action
- No visual clutter or decision paralysis

---

## Phase 4: Chat Experience Enhancement
**Priority:** Medium | **Complexity:** Medium

Improve the core chat experience with Sophia.

### 4.1 Persona-Aware First Messages

**File:** `src/pages/Chat.tsx` or new `src/lib/sophiaMessages.ts`

**Task:**
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

### 4.2 Add Suggested Topics UI

**File:** `src/pages/Chat.tsx`

**Task:**
- [ ] Display suggested topics below first message
- [ ] Topics are tappable quick-replies
- [ ] Topics vary by persona and context
- [ ] Topics disappear after user sends first message

**UI:**
```
┌──────────────────────────────────────────────────────┐
│  [Sophia's greeting message...]                      │
│                                                      │
│  ┌────────────────────┐ ┌────────────────────┐      │
│  │ I have questions   │ │ Show me something  │      │
│  │ about faith        │ │ surprising         │      │
│  └────────────────────┘ └────────────────────┘      │
│  ┌────────────────────┐ ┌────────────────────┐      │
│  │ I'm going through  │ │ Help me understand │      │
│  │ something hard     │ │ a passage          │      │
│  └────────────────────┘ └────────────────────┘      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Acceptance Criteria:**
- Topics appear with first message
- Tapping a topic sends it as user message
- Topics are persona-appropriate
- Topics hide after first user message

---

### 4.3 Improve Typing Indicator

**File:** `src/components/chat/TypingIndicator.tsx`

**Task:**
- [ ] Review current typing indicator design
- [ ] Ensure it feels like Sophia is "thinking"
- [ ] Add subtle orb reference/animation
- [ ] Consider adding "Sophia is composing..." text

**Acceptance Criteria:**
- Typing indicator feels alive and personal
- Matches Sophia's visual identity (orb aesthetic)
- Provides feedback that response is coming

---

### 4.4 Add Save Insight Functionality

**Files:**
- `src/pages/Chat.tsx`
- New: `src/components/chat/SaveInsightModal.tsx`
- New: `src/lib/insights.ts`

**Task:**
- [ ] Add "Save" button/icon on Sophia's messages
- [ ] Create modal for naming/tagging insight
- [ ] Store insights in localStorage or Supabase
- [ ] Show confirmation toast on save

**Insight Schema:**
```typescript
interface Insight {
  id: string;
  content: string;
  title: string;
  tags: string[];
  conversationId: string;
  savedAt: string;
  theme?: string;
}
```

**Acceptance Criteria:**
- Users can save meaningful messages from Sophia
- Insights are stored persistently
- Saved insights accessible from Journey page

---

### 4.5 Add Crisis Detection and Response

**File:** `src/lib/crisisDetection.ts` (new)

**Task:**
- [ ] Implement keyword/phrase detection for crisis indicators
- [ ] Create compassionate intervention modal
- [ ] Provide crisis resources (hotlines, etc.)
- [ ] Log for safety (if applicable)

**Crisis Keywords:**
- Suicide, self-harm, ending it, can't go on
- Abuse, hurting me, afraid for my life
- Emergency, crisis, need help now

**Response:**
```
┌──────────────────────────────────────────────────────┐
│  I hear you, and I'm concerned about your safety.   │
│                                                      │
│  You matter deeply, and there are people who can    │
│  help right now:                                     │
│                                                      │
│  National Suicide Prevention: 988                    │
│  Crisis Text Line: Text HOME to 741741              │
│                                                      │
│  [I'm safe, continue conversation]                   │
│  [Connect me to resources]                           │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Acceptance Criteria:**
- Crisis language triggers supportive intervention
- Resources are clearly provided
- User can dismiss if not in crisis
- Sophia continues with extra care after crisis flag

---

## Phase 5: Persona Intelligence
**Priority:** Medium | **Complexity:** Medium

Deepen the persona system to provide truly personalized experiences.

### 5.1 Expand Persona Configuration

**File:** `src/types/wholelicity.ts`

**Task:**
- [ ] Expand `PERSONA_CONFIGS` with full configuration
- [ ] Add suggested topics per persona
- [ ] Add Sophia tone descriptors
- [ ] Add module emphasis rankings

**Expanded Config:**
```typescript
const PERSONA_CONFIGS = {
  curious_seeker: {
    name: 'The Curious Seeker',
    greeting: "I'm here to help you explore at your own pace.",
    sophiaTone: 'warm_patient_exploratory',
    primaryModules: ['wisdom', 'community'],
    suggestedTopics: [
      "Who is Jesus and why does he matter?",
      "How do I read the Bible?",
      "I have doubts - is that okay?",
      "What does faith actually mean?"
    ],
    firstMessage: "...",
    dashboardMessage: "...",
  },
  // ... full configurations for all personas
};
```

**Acceptance Criteria:**
- All persona types have complete configuration
- Configuration drives all personalized experiences
- Easy to add/modify personas

---

### 5.2 Implement Persona Calculation Logic

**File:** `src/lib/personaCalculation.ts` (new)

**Task:**
- [ ] Create algorithm to determine persona from quiz answers
- [ ] Handle partial quiz completion (use defaults)
- [ ] Allow persona to evolve based on behavior
- [ ] Store calculated persona in user state

**Calculation Matrix:**
```typescript
function calculatePersona(answers: QuizAnswers): PersonaType {
  const { spiritualBackground, learningStyle, communityPref, season } = answers;

  // Primary determination from spiritual background
  // Modified by learning style
  // Influenced by community preference
  // Colored by current season

  return determinedPersona;
}
```

**Acceptance Criteria:**
- Persona calculated correctly from quiz answers
- Handles all answer combinations
- Defaults applied for missing answers

---

### 5.3 Persona-Driven Module Recommendations

**File:** `src/lib/moduleRecommendations.ts` (new)

**Task:**
- [ ] Create module ranking per persona
- [ ] Surface "recommended" modules based on persona
- [ ] Prepare for future module integration

**Use Case (Future):**
When Pattern Explorer launches, "Discovery Veteran" personas see it prominently, while "Curious Seeker" personas see Wisdom Guide and Community emphasized.

**Acceptance Criteria:**
- Each persona has module priority ranking
- Ready for future module integration
- Doesn't surface "Coming Soon" prominently

---

## Phase 6: Module Previews & Waitlists
**Priority:** Low | **Complexity:** Low

Provide meaningful engagement for unavailable modules.

### 6.1 Create Module Preview System

**New File:** `src/components/modules/ModulePreview.tsx`

**Task:**
- [ ] Create preview component for each module
- [ ] Show teaser content/visualization
- [ ] Explain what module will offer
- [ ] CTA: "Notify me" or "Talk to Sophia about this"

**Example - Pattern Explorer Preview:**
```
┌──────────────────────────────────────────────────────┐
│  Pattern Explorer                                    │
│  Discover hidden biblical connections                │
│                                                      │
│  [Static visualization of "Light/Darkness" theme]   │
│                                                      │
│  Imagine seeing how themes like "light" appear       │
│  across all of Scripture, from Genesis to            │
│  Revelation, revealing God's consistent story.       │
│                                                      │
│  [Notify Me When Available]                          │
│  [Ask Sophia About Biblical Patterns]                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Acceptance Criteria:**
- Each module has a preview experience
- Previews provide real value (not just "coming soon")
- Users can engage meaningfully with concepts

---

### 6.2 Implement Waitlist System

**File:** `src/lib/waitlist.ts` (new)

**Task:**
- [ ] Create waitlist signup per module
- [ ] Store in localStorage or Supabase
- [ ] Show confirmation on signup
- [ ] Prepare for notification system (future)

**Acceptance Criteria:**
- Users can express interest in specific modules
- Interest is tracked for prioritization
- Users feel heard, not dismissed

---

### 6.3 Sophia-Integrated Module Discussions

**Task:**
- [ ] Enable Sophia to discuss future module concepts
- [ ] "Tell me about Pattern Explorer" → Sophia explains
- [ ] Provides value now for features coming later
- [ ] Builds anticipation through conversation

**Example Prompt Handling:**
```
User: "What is TimeWalk?"

Sophia: "TimeWalk is something I'm really excited about! Imagine being able to
walk through ancient Jerusalem, stand where David stood, or experience the
temple as a first-century worshiper would have.

It's still being built, but when it's ready, I'll be right there with you as
your guide through history. Want me to tell you more about what we'll explore
together?"
```

**Acceptance Criteria:**
- Sophia can discuss any module concept
- Responses build excitement without frustration
- Users feel informed about the product vision

---

## Phase 7: Future Module Integration
**Priority:** Future | **Complexity:** High

Framework for integrating modules as they become available.

### 7.1 Module Architecture Foundation

**Task:**
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

### 7.2 Cross-Module Suggestions

**Task:**
- [ ] After chat responses, suggest relevant modules
- [ ] Context-aware module recommendations
- [ ] Seamless transitions between modules

**Example:**
```
User asks about the woman at the well...

Sophia responds with insight, then:

┌──────────────────────────────────────────────────────┐
│  Explore Further:                                    │
│  • [TimeWalk] Experience 1st century Samaria         │
│  • [Patterns] See "living water" across Scripture    │
│  • [Community] Others discussing this passage        │
└──────────────────────────────────────────────────────┘
```

---

### 7.3 Unified Sophia Intelligence

**Task:**
- [ ] Sophia maintains context across all modules
- [ ] Conversation in chat informs TimeWalk suggestions
- [ ] Pattern discoveries inform chat topics
- [ ] Single intelligent companion throughout

---

## Implementation Dependencies

```
Phase 1 (Critical Fixes)
    │
    ├── 1.1 Returning User Detection
    ├── 1.2 Skip Button
    ├── 1.3 Sophia First Message ──────┐
    └── 1.4 Intro Duration             │
                                       │
Phase 2 (Onboarding)                   │
    │                                  │
    ├── 2.1 Back Navigation            │
    ├── 2.2 Skip Option                │
    ├── 2.3 Progress Persistence       │
    ├── 2.4 Sophia Acknowledgments     │
    └── 2.5 Remove WelcomeDashboard ───┼─── Depends on 1.3
                                       │
Phase 3 (Dashboard) ───────────────────┘
    │
    ├── 3.1 Sophia-Centric Design ─────┬── Depends on Phase 2
    ├── 3.2 Time Awareness             │
    ├── 3.3 Contextual Intelligence    │
    ├── 3.4 Remove Stats/Grid          │
    ├── 3.5 Journey Page               │
    └── 3.6 Minimalist Design          │
                                       │
Phase 4 (Chat) ────────────────────────┘
    │
    ├── 4.1 Persona Messages ──────────── Depends on Phase 5.1
    ├── 4.2 Suggested Topics
    ├── 4.3 Typing Indicator
    ├── 4.4 Save Insight
    └── 4.5 Crisis Detection

Phase 5 (Persona)
    │
    ├── 5.1 Persona Config ────────────── Can run parallel to Phase 3
    ├── 5.2 Calculation Logic
    └── 5.3 Module Recommendations

Phase 6 (Previews)
    │
    ├── 6.1 Preview System ────────────── Can run parallel to Phase 4-5
    ├── 6.2 Waitlist
    └── 6.3 Sophia Discussions

Phase 7 (Future Modules) ──────────────── After Phases 1-6 complete
```

---

## Success Metrics

### Phase 1-2 Metrics
- **Onboarding completion rate:** 85%+ (currently estimated 61-68%)
- **Time to first chat message:** < 2 minutes from start
- **Quiz completion rate:** 90%+ of those who start

### Phase 3 Metrics
- **Dashboard engagement:** 80%+ click-through to chat
- **Time on dashboard:** < 30 seconds (get to value quickly)
- **Return visit rate:** 60%+ day-1 retention

### Phase 4 Metrics
- **First response rate:** 95%+ respond to Sophia's greeting
- **Messages per session:** 5+ average
- **Insight save rate:** 20%+ of sessions include a save

### Phase 5-6 Metrics
- **Persona accuracy:** User feedback confirms persona feels accurate
- **Module interest:** Track waitlist signups per module
- **Anticipation engagement:** Users asking Sophia about future features

---

## Appendix: File Change Summary

### New Files to Create
- `src/components/dashboard/SophiaDashboard.tsx`
- `src/lib/timeAwareness.ts`
- `src/lib/contextualIntelligence.ts`
- `src/lib/sophiaMessages.ts`
- `src/lib/personaCalculation.ts`
- `src/lib/moduleRecommendations.ts`
- `src/lib/insights.ts`
- `src/lib/crisisDetection.ts`
- `src/lib/waitlist.ts`
- `src/components/chat/SaveInsightModal.tsx`
- `src/components/modules/ModulePreview.tsx`
- `src/pages/Journey.tsx`

### Files to Modify
- `src/pages/Index.tsx` - Routing logic, returning user detection
- `src/pages/Chat.tsx` - First message, suggested topics, save insight
- `src/pages/Dashboard.tsx` - Use new SophiaDashboard
- `src/components/onboarding/CinematicIntro.tsx` - Duration, skip button
- `src/components/onboarding/SplitOnboarding.tsx` - Back nav, skip
- `src/components/onboarding/ChatOnboardingPanel.tsx` - Acknowledgments
- `src/components/chat/TypingIndicator.tsx` - Redesign
- `src/lib/onboardingState.ts` - Quiz progress persistence
- `src/types/wholelicity.ts` - Expanded persona configs
- `src/index.css` - Minimalist design updates
- `tailwind.config.ts` - Time-aware color themes

### Files to Deprecate/Remove
- `src/components/dashboard/WelcomeDashboard.tsx` - Remove
- `src/components/dashboard/MainDashboard.tsx` - Replace with SophiaDashboard

---

## Next Steps

1. **Review and approve** this implementation plan
2. **Begin Phase 1** - Critical fixes (can start immediately)
3. **Design review** for Phase 3 dashboard concepts
4. **Prioritize** Phase 4-6 based on resource availability
5. **Plan user testing** after Phase 2 completion

---

*This document is the implementation roadmap derived from:*
- `docs/ux-proposal.md`
- `docs/ux-user-flow-diagrams.md`
- `docs/ux-information-architecture.md`
- `docs/ux-interaction-patterns.md`
- `docs/ux-state-diagrams.md`
