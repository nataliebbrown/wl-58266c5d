# Wholelicity Dashboard: Visual Design & Layout Specification

> Structural layout inspired by modern dashboard design patterns, infused with Wholelicity's warm, living, sacred aesthetic.

---

## Design Reference & Inspiration

The layout structure draws from contemporary multi-zone dashboard design (card-based, hero + horizontal navigation + multi-column content zones) while the visual language is uniquely Wholelicity — warm, earthy, time-aware, and alive.

### Layout Principles Borrowed

- Multi-column grid — not a single-column scroll. Content lives in distinct zones.
- Hero card at top that immediately communicates "what's happening now"
- Horizontal row of icon circles for quick-access navigation
- Bottom row of equal-height cards for secondary content
- Every element lives in a soft, rounded card container

### Visual Language Borrowed

- Soft gradients over flat colors
- Glassmorphic cards with subtle transparency and backdrop blur
- Very generous border radius (~16-24px)
- Soft shadows, no hard borders
- Clean type hierarchy with understated labels
- Icon circles for quick-access navigation
- Muted, sophisticated palette (not loud or "appy")
- Generous whitespace between cards — nothing feels crowded

### What Makes Wholelicity Different

- Clinical/lavender palette replaced with warm earthy tones (khaki, olive wood, sage green, faded copper)
- Static doctor photo hero replaced with Sophia's breathing orb + contextual message
- Time-of-day warmth infused into gradients (palette shifts throughout the day)
- Organic, living elements (breathing orb, twinkling constellation, growing journey path) — the dashboard feels alive, not static

---

## Dashboard Layout: Desktop

### Full Layout with Proportions

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                          │
│  [WL Logo]                                                          [Time]  [⚙️]         │
│                                                                                          │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐  │
│  │                                                                                    │  │
│  │  ╔══════════════════════════════════════════════════════════════════════════════╗   │  │
│  │  ║                                                                            ║   │  │
│  │  ║  Good morning, Natalie                                                     ║   │  │
│  │  ║                                                                            ║   │  │
│  │  ║  "The steadfast love of the Lord                                           ║   │  │
│  │  ║   never ceases; his mercies are                               [SOPHIA ORB] ║   │  │
│  │  ║   new every morning."                                          (breathing) ║   │  │
│  │  ║                   — Lamentations 3:22                                      ║   │  │
│  │  ║                                                                            ║   │  │
│  │  ║  ┌─ date/time pill ──────────────────────────────────────────────────────┐ ║   │  │
│  │  ║  │ 🕐 Tuesday, January 29, 2026 · Morning                               │ ║   │  │
│  │  ║  └──────────────────────────────────────────────────────────────────────┘ ║   │  │
│  │  ║                                                                            ║   │  │
│  │  ║  [📖 Continue Our Chat]  [✨ Something New]  [🔍 Explore on My Own]       ║   │  │
│  │  ║                                                                            ║   │  │
│  │  ╚══════════════════════════════════════════════════════════════════════════════╝   │  │
│  │                                                                                    │  │
│  └────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                          │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                   │
│  │  💬  │  │  📖  │  │  📅  │  │  💡  │  │  🔗  │  │  🕰️  │  │ •••  │                   │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘                   │
│  Sophia   Scripture  Today    Insights  Patterns  TimeWalk   More                        │
│                                                                                          │
│  ┌──────────────────────┐  ┌───────────────────────┐  ┌────────────────────────────┐     │
│  │                      │  │                       │  │                            │     │
│  │  Your Journey     →  │  │  Your Constellation   │  │  On Your Horizon    ← →   │     │
│  │                      │  │                  12 ★ │  │                            │     │
│  │  ┌────────────────┐  │  │                       │  │  ● "Freedom"         Feb   │     │
│  │  │                │  │  │  ┌─────┐              │  │    Based on your            │     │
│  │  │  ○ Grace       │  │  │  │ img │ Grace        │  │    forgiveness journey      │     │
│  │  │  │  wk 1       │  │  │  │     │ "God's grace │  │                            │     │
│  │  │  │             │  │  │  │     │  is enough"  │  │  ─────────────────────     │     │
│  │  │  ○ Trust       │  │  │  └─────┘              │  │                            │     │
│  │  │  │  wk 2       │  │  │                       │  │  ● "Surrender"       Mar   │     │
│  │  │  │             │  │  │  ┌─────┐              │  │    A thread emerging        │     │
│  │  │  ○ Forgiveness │  │  │  │ img │ Forgiveness  │  │    from trust and           │     │
│  │  │  │  wk 3       │  │  │  │     │ "Letting go  │  │    letting go               │     │
│  │  │  │             │  │  │  │     │  of control" │  │                            │     │
│  │  │  ● NOW         │  │  │  └─────┘              │  │  ─────────────────────     │     │
│  │  │  ·             │  │  │                       │  │                            │     │
│  │  │  ·             │  │  │  ┌─────┐              │  │  ○ "Identity"         —    │     │
│  │  │  ? HORIZON     │  │  │  │ img │ Trust        │  │    Something deeper         │     │
│  │  │                │  │  │  │     │ "Learning to │  │    is forming...             │     │
│  │  └────────────────┘  │  │  │     │  let God     │  │                            │     │
│  │   (scrollable)       │  │  │     │  lead"       │  │                            │     │
│  │                      │  │  └─────┘              │  │                            │     │
│  │  "You've walked      │  │                       │  │                            │     │
│  │   through grace,     │  │  [Sophia orb - tiny]  │  │                            │     │
│  │   trust, and now     │  │  "Grace and           │  │                            │     │
│  │   forgiveness..."    │  │   forgiveness keep    │  │                            │     │
│  │                      │  │   appearing           │  │                            │     │
│  │  [See Full Journey]  │  │   together..."        │  │                            │     │
│  │                      │  │                       │  │                            │     │
│  │                      │  │  [Explore This →]     │  │  [Explore Horizon →]       │     │
│  │                      │  │                       │  │                            │     │
│  └──────────────────────┘  └───────────────────────┘  └────────────────────────────┘     │
│                                                                                          │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Specifications

### 1. Page Header

The Wholelicity logo serves as the page header, replacing a text-based greeting. Settings and time indicator sit on the right.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                          │
│  [WL Logo]                                                          [Time]  [⚙️]         │
│                                                                                          │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

**Design Specs:**

| Property | Value |
|----------|-------|
| Layout | Flex row, space-between, vertically centered |
| Padding | 16px 24px |
| Logo | Light mode: `logo_black.svg`, Dark mode: `logo_white.svg`, height 28px |
| Time indicator | 13px, `font-weight: 400`, `color: text-muted-foreground` |
| Settings icon | 20px gear icon, `#756653`, rounded ghost button |

---

### 2. Hero Card: Sophia / Daily Rhythm (Full Width)

The largest, most prominent element. Immediately tells the user "here's what's happening right now." Two layers: outer glassmorphic card containing an inner gradient card. All call-to-action buttons live **inside** the card.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                        │
│  ╔════════════════════════════════════════════════════════════════════════════════════╗ │
│  ║                                                                                  ║ │
│  ║  Good morning, Natalie                                                           ║ │
│  ║                                                                                  ║ │
│  ║  "The steadfast love of the Lord                                                 ║ │
│  ║   never ceases; his mercies are                                     [SOPHIA ORB] ║ │
│  ║   new every morning."                                                (breathing, ║ │
│  ║                   — Lamentations 3:22                                 80-100px)   ║ │
│  ║                                                                                  ║ │
│  ║  ┌─ date/time pill ──────────────────────────────────────────────────────────┐   ║ │
│  ║  │ 🕐 Tuesday, January 29, 2026 · Morning                                   │   ║ │
│  ║  └──────────────────────────────────────────────────────────────────────────┘   ║ │
│  ║                                                                                  ║ │
│  ║  [📖 Continue Our Chat]    [✨ Something New]    [🔍 Explore on My Own]          ║ │
│  ║                                                                                  ║ │
│  ╚════════════════════════════════════════════════════════════════════════════════════╝ │
│                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Outer Card Specs

| Property | Value |
|----------|-------|
| Background | `rgba(255, 255, 255, 0.7)` with `backdrop-filter: blur(16px)` |
| Border | `1px solid rgba(255, 255, 255, 0.2)` |
| Border radius | 20px |
| Shadow | `0 4px 24px rgba(0, 0, 0, 0.06)` |
| Padding | 24px |
| Width | 100% of content area |

#### Inner Gradient Card Specs

The gradient shifts based on time of day:

| Time Period | Gradient | Text Color | Orb Glow |
|-------------|----------|------------|----------|
| **Dawn** (5-7am) | `linear-gradient(135deg, #FFF8E7 0%, #FFE4B5 50%, #FFA07A 100%)` | `#2D3748` (dark) | Soft gold |
| **Morning** (7am-12pm) | `linear-gradient(135deg, #F5F0E8 0%, #DED1BA 50%, #C5B49B 100%)` | `#2D3748` (dark) | Warm brown |
| **Midday** (12-5pm) | `linear-gradient(135deg, #EDE8E0 0%, #D4C9B8 50%, #C5B49B 100%)` | `#2D3748` (dark) | Clear amber |
| **Evening** (5-9pm) | `linear-gradient(135deg, #5A4C3A 0%, #756653 50%, #8A7356 100%)` | `#F8F6F0` (light) | Rich amber |
| **Night** (9pm-5am) | `linear-gradient(135deg, #1A1A2E 0%, #2D3748 50%, #3D4A5C 100%)` | `#E2E8F0` (soft light) | Soft blue/silver |

| Property | Value |
|----------|-------|
| Border radius | 16px |
| Padding | 32px |
| Min height | 220px |

#### Inner Card Content

| Element | Spec |
|---------|------|
| **Greeting** | 28px, `font-weight: 300` (light), top-left |
| **Scripture verse** | 16px, serif or italic, `font-style: italic`, `line-height: 1.6` |
| **Attribution** | 14px, `font-weight: 500`, right-aligned under verse |
| **Sophia Orb** | 80-100px, right-aligned, vertically centered, floating with `animation: float 6s ease-in-out infinite`, soft radial glow behind |
| **Date/time pill** | Frosted background (`rgba(255, 255, 255, 0.2)` on dark gradients, `rgba(0, 0, 0, 0.06)` on light), border-radius 100px, padding 8px 16px, 12px text |

#### Action Buttons (Inside Card)

Three equal-width buttons inside the inner gradient card, below the date/time pill:

| Property | Value |
|----------|-------|
| Layout | Flex row, equal width, 12px gap |
| Background | `rgba(255, 255, 255, 0.2)` (on dark gradients), `rgba(0, 0, 0, 0.05)` (on light gradients) |
| Border | `1px solid rgba(255, 255, 255, 0.2)` (dark) or `1px solid rgba(0, 0, 0, 0.08)` (light) |
| Border radius | 12px |
| Padding | 12px 16px |
| Text | 14px, `font-weight: 500`, inherits from gradient text color |
| Icon | 16px, left of text |
| Hover | Background opacity increases by 0.1, `transform: scale(1.02)`, subtle glow |

#### Contextual First Button Variations

| Context | Label |
|---------|-------|
| Continuing a thread | "Continue: Forgiveness" |
| No recent thread | "Start a Conversation" |
| Sophia has a question | "Sophia Has a Question" |
| After long absence | "Welcome Back" |

---

### 3. Quick Access: Horizontal Circle Row

A single horizontal row of icon circles providing fast navigation to all areas of Wholelicity. Sits between the hero card and the content cards below.

```
┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
│  💬  │  │  📖  │  │  📅  │  │  💡  │  │  🔗  │  │  🕰️  │  │ •••  │
└──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘
Sophia   Scripture  Today    Insights  Patterns  TimeWalk   More
```

**Design Specs:**

| Property | Value |
|----------|-------|
| Layout | Flex row, centered, evenly spaced |
| Margin | 24px top and bottom (breathes between hero and content cards) |
| No card container | Circles float directly on the page background — no enclosing card |

#### Icon Circle Specs

| Property | Value |
|----------|-------|
| Size | 56px |
| Background | `rgba(255, 255, 255, 0.7)` with `backdrop-filter: blur(8px)` |
| Border | `1px solid rgba(222, 209, 186, 0.3)` |
| Border radius | 50% (circle) |
| Shadow | `0 2px 8px rgba(0, 0, 0, 0.04)` |
| Icon | 22px, line style, color `#756653` |
| Label | 11px, centered below circle, `color: text-muted-foreground`, 6px gap below circle |

#### Circle States

| State | Treatment |
|-------|-----------|
| **Default** | As specified above |
| **Hover** | Background `rgba(222, 209, 186, 0.4)`, `transform: scale(1.08)`, `box-shadow: 0 4px 12px rgba(117, 102, 83, 0.12)`, transition 200ms |
| **Active/Pressed** | `transform: scale(0.96)`, background `rgba(222, 209, 186, 0.5)` |
| **Unavailable** | `opacity: 0.6`, no hover scale, cursor default |

#### Pathway Mapping

| Circle | Destination | Status |
|--------|-------------|--------|
| Sophia | Chat / Wisdom Guide | Available now |
| Scripture | Bible browser / search | Future (Phase 2+) |
| Today | Daily reading / devotional | Future (Phase 2+) |
| Insights | Full constellation view | Available now |
| Patterns | Pattern Explorer module | Future |
| TimeWalk | TimeWalk Immersion module | Future |
| More | Overflow menu / all features | Available now |

#### Handling Unavailable Modules

- Unavailable circles display at 70% opacity (not grayed out — still warm)
- No "Coming Soon" badge text
- Tapping opens a rich preview modal explaining the module with waitlist signup and "Ask Sophia About This" option
- High-interest modules (Patterns, TimeWalk) show preview; lower-interest modules can be hidden until available

---

### 4. Your Journey Card (Left)

A tall card with a vertical, scrollable spiritual journey path. Theme nodes stack top-to-bottom, showing the user's progression through spiritual themes. Journey narration and CTA sit below the path.

Inspired by a tall grid-style card layout, but reimagined as an organic vertical path.

```
┌──────────────────────────┐
│                          │
│  Your Journey         →  │
│                          │
│  ┌────────────────────┐  │
│  │                    │  │
│  │  ○ Grace           │  │
│  │  │  wk 1           │  │
│  │  │                 │  │
│  │  ○ Trust           │  │
│  │  │  wk 2           │  │
│  │  │                 │  │
│  │  ○ Forgiveness     │  │
│  │  │  wk 3           │  │
│  │  │                 │  │
│  │  ● NOW             │  │
│  │  ·                 │  │
│  │  ·                 │  │
│  │  ? HORIZON         │  │
│  │                    │  │
│  └────────────────────┘  │
│   (scrollable)           │
│                          │
│  "You've walked through  │
│   grace, trust, and now  │
│   forgiveness. Something │
│   is forming..."         │
│                          │
│  [See Full Journey →]    │
│                          │
└──────────────────────────┘
```

#### Card Container Specs

| Property | Value |
|----------|-------|
| Background | Same glassmorphic treatment as all cards |
| Border radius | 20px |
| Padding | 24px |
| Min height | 400px |
| Max height | 500px (scroll activates beyond this) |
| Width | ~33% of content area (one of three equal columns) |
| Header | "Your Journey", 16px, `font-weight: 600` |
| Header arrow | 16px chevron-right icon, links to full Journey page |

#### Vertical Path Visualization

| Element | Spec |
|---------|------|
| **Rendering** | SVG or Canvas inside a scrollable container |
| **Scroll** | Vertical scroll within the path area, smooth, subtle scrollbar or hidden scrollbar with touch/drag support |
| **Past nodes** | 14px circles, fill `#C5B49B` at 60% opacity, left-aligned with vertical line connecting them |
| **Current node** | 16px circle, fill `#756653`, subtle pulse animation (`animation: pulse 3s ease-in-out infinite`) |
| **Connecting lines** | 2px vertical, `#C5B49B` at 40%, straight or slightly organic |
| **Theme labels** | 14px, right of node, `color: foreground`, `font-weight: 500` |
| **Time labels** | 12px, right of node below theme label, `color: text-muted-foreground` |
| **Node spacing** | 48-56px vertical gap between nodes |
| **Horizon element** | Below current node, connected by dotted line. Radial gradient glow: `radial-gradient(circle, rgba(222, 209, 186, 0.6) 0%, transparent 70%)`, 20px diameter, soft pulsing animation |
| **Horizon label** | 14px, "HORIZON", `letter-spacing: 0.1em`, `color: text-muted-foreground` |

#### Journey Narration

Below the scrollable path area:

| Property | Value |
|----------|-------|
| Text | Sophia's voice — two to three sentences summarizing the journey |
| Font | 14px, `line-height: 1.5`, `color: text-muted-foreground` |
| Style | Slightly italic to distinguish as Sophia's voice |
| Separator | Subtle 1px divider or 16px gap above narration |

#### Journey CTA

| Property | Value |
|----------|-------|
| Text | "See Full Journey" |
| Style | 14px, `font-weight: 500`, color `#756653`, with arrow icon |
| Hover | Underline, slight color shift |
| Position | Bottom of card, left-aligned |

#### Empty State (New Users)

```
┌──────────────────────────┐
│                          │
│  Your Journey            │
│                          │
│  ┌────────────────────┐  │
│  │                    │  │
│  │  ● START           │  │
│  │  ·                 │  │
│  │  ·                 │  │
│  │  ? HORIZON         │  │
│  │                    │  │
│  └────────────────────┘  │
│                          │
│  "Every journey begins   │
│   with a single step.    │
│   Yours just started."   │
│                          │
└──────────────────────────┘
```

---

### 5. Your Constellation Card (Center)

A vertical list of saved insights, each displayed as a row with a visual thumbnail/icon on the left and text content on the right. Sophia's pattern-noticing message sits at the bottom.

Inspired by a tips/content list card layout, reimagined as a collection of spiritual insights.

```
┌───────────────────────────┐
│                           │
│  Your Constellation 12 ★  │
│                           │
│  ┌─────┐                  │
│  │ ★   │ Grace            │
│  │     │ "God's grace     │
│  │     │  is enough"      │
│  └─────┘                  │
│                           │
│  ┌─────┐                  │
│  │ ★   │ Forgiveness      │
│  │     │ "Letting go      │
│  │     │  of control"     │
│  └─────┘                  │
│                           │
│  ┌─────┐                  │
│  │ ★   │ Trust            │
│  │     │ "Learning to     │
│  │     │  let God lead"   │
│  └─────┘                  │
│                           │
│  [Sophia orb - tiny]      │
│  "Grace and forgiveness   │
│   keep appearing          │
│   together. There might   │
│   be something bigger     │
│   here..."                │
│                           │
│  [Explore This →]         │
│                           │
└───────────────────────────┘
```

#### Card Container Specs

| Property | Value |
|----------|-------|
| Background | Same glassmorphic treatment |
| Border radius | 20px |
| Padding | 24px |
| Min height | 400px (matches Journey card) |
| Max height | 500px (scroll if more than ~5 insights) |
| Width | ~33% of content area (one of three equal columns) |
| Header | "Your Constellation", 16px, `font-weight: 600` |
| Star count | Right-aligned pill, 12px, `12 ★`, subtle background `rgba(222, 209, 186, 0.3)`, border-radius 100px, padding 4px 10px |

#### Insight Row Specs

Each insight is a horizontal row:

| Element | Spec |
|---------|------|
| **Layout** | Flex row, 12px gap between thumbnail and text |
| **Row padding** | 12px vertical |
| **Divider** | 1px `rgba(0, 0, 0, 0.04)` between rows |
| **Thumbnail** | 48px × 48px rounded square (border-radius 10px), subtle background gradient or constellation-star visual |
| **Thumbnail style** | Dark background (`rgba(26, 26, 46, 0.08)`) with a glowing star point (`#C5B49B`) centered — each thumbnail is a mini constellation reference |
| **Title** | 14px, `font-weight: 500`, `color: foreground` |
| **Description** | 13px, `font-weight: 400`, `color: text-muted-foreground`, max 2 lines, `line-clamp: 2` |
| **Hover** | Row background shifts to `rgba(222, 209, 186, 0.1)`, cursor pointer |
| **Tap** | Opens full insight view |

#### Sophia's Pattern Notice

Below the insight list:

| Element | Spec |
|---------|------|
| **Separator** | 16px gap or subtle divider |
| **Sophia orb** | 24px, inline-start with text |
| **Notice text** | 13px, `line-height: 1.4`, `color: text-muted-foreground`, italic, Sophia's voice |
| **CTA** | "Explore This Connection", 14px, `font-weight: 500`, color `#756653` with arrow |

#### Empty State (New Users)

```
┌───────────────────────────┐
│                           │
│  Your Constellation       │
│                           │
│  ┌───────────────────────┐│
│  │                       ││
│  │  [Faint scattered     ││
│  │   stars — decorative] ││
│  │                       ││
│  │  "Every insight you   ││
│  │   save becomes a      ││
│  │   star. Over time,    ││
│  │   they'll form        ││
│  │   patterns you never  ││
│  │   expected."          ││
│  │                       ││
│  └───────────────────────┘│
│                           │
│  [Start a Conversation    │
│   to Discover Your        │
│   First Star →]           │
│                           │
└───────────────────────────┘
```

| Empty state property | Value |
|---------------------|-------|
| Decorative stars | 3-5 very faint (`opacity: 0.15`) static star points |
| Message | Centered, 14px, italic, `color: text-muted-foreground` |
| CTA | Warm accent link pointing to chat |

#### Constellation Growth Stages

| Stage | Stars | Visual Treatment |
|-------|-------|------------------|
| **Empty sky** | 0 | Faint decorative stars, inviting message |
| **First stars** | 1-5 | Insights appear as rows, each thumbnail has a single star |
| **Clusters forming** | 6-15 | Thumbnails start showing mini-clusters, Sophia notices patterns |
| **Constellation emerging** | 16-30 | Sophia regularly surfaces connections between insights |
| **Rich constellation** | 30+ | Dense list, rich pattern-noticing, deeply personal collection |

---

### 6. On Your Horizon Card (Right)

A vertical timeline of Horizon invitations — themes, questions, and areas of Scripture that Sophia senses are emerging next in the user's journey. Navigation arrows allow browsing through Horizon suggestions.

Inspired by a result/history timeline card, reimagined as forward-looking spiritual invitations.

```
┌────────────────────────────────┐
│                                │
│  On Your Horizon        ← →   │
│                                │
│  ● "Freedom"            Feb    │
│    Based on your               │
│    forgiveness journey         │
│                                │
│  ────────────────────────────  │
│                                │
│  ● "Surrender"          Mar    │
│    A thread emerging           │
│    from trust and              │
│    letting go                  │
│                                │
│  ────────────────────────────  │
│                                │
│  ○ "Identity"            —     │
│    Something deeper            │
│    is forming...               │
│                                │
│  ────────────────────────────  │
│                                │
│  ○ "Belonging"           —     │
│    Community themes            │
│    are surfacing               │
│                                │
│                                │
│  [Explore Horizon →]           │
│                                │
└────────────────────────────────┘
```

#### Card Container Specs

| Property | Value |
|----------|-------|
| Background | Same glassmorphic treatment |
| Border radius | 20px |
| Padding | 24px |
| Min height | 400px (matches Journey and Constellation cards) |
| Max height | 500px |
| Width | ~33% of content area (one of three equal columns) |
| Header | "On Your Horizon", 16px, `font-weight: 600` |
| Navigation arrows | Left/right arrows, 16px, right-aligned in header, for browsing through Horizon sets |

#### Horizon Item Specs

Each Horizon invitation is a timeline row:

| Element | Spec |
|---------|------|
| **Layout** | Vertical stack per item, separated by 1px dividers |
| **Row padding** | 16px vertical |
| **Divider** | 1px `rgba(0, 0, 0, 0.06)` between items |
| **Status dot** | 10px circle, left-aligned |
| **Active dot** | Fill `#756653` — these are near-term, clearer invitations |
| **Emerging dot** | Fill `#C5B49B` at 50% — these are further out, less defined |
| **Theme title** | 16px, `font-weight: 600`, `color: foreground`, in quotes |
| **Time hint** | 13px, `font-weight: 400`, `color: text-muted-foreground`, right-aligned on same line as title |
| **Description** | 13px, `line-height: 1.4`, `color: text-muted-foreground` — one to two sentences from Sophia explaining why this theme is emerging |

#### Horizon Item States

| State | Treatment |
|-------|-----------|
| **Near-term** | Filled dot (`#756653`), bolder title, specific time hint ("Feb", "Next week") |
| **Emerging** | Half-filled dot (`#C5B49B`), standard title, vaguer time hint ("Mar", "Soon") |
| **Distant** | Open dot (`#C5B49B` at 30%), lighter title, no time hint (dash: "—") |
| **Hover** | Row background shifts to `rgba(222, 209, 186, 0.1)`, cursor pointer |
| **Tap** | Opens Horizon exploration view with Sophia guiding into the theme |

#### Horizon CTA

| Property | Value |
|----------|-------|
| Text | "Explore Horizon" |
| Style | 14px, `font-weight: 500`, color `#756653`, with arrow icon |
| Position | Bottom of card |
| Hover | Underline, slight color shift |

#### Empty State (New Users)

```
┌────────────────────────────────┐
│                                │
│  On Your Horizon               │
│                                │
│  [Soft horizon glow visual]    │
│                                │
│  "The horizon is forming.      │
│   As you explore with Sophia,  │
│   themes will emerge that      │
│   point to what's next in      │
│   your journey."               │
│                                │
│  [Start Exploring →]           │
│                                │
└────────────────────────────────┘
```

---

## Mobile Layout

On mobile, the layout collapses to a single scrollable column. Navigation uses a bottom tab bar.

```
┌────────────────────────────────┐
│  [WL Logo]             [⚙️]    │
├────────────────────────────────┤
│                                │
│  ┌────────────────────────────┐│
│  │                            ││
│  │  [GRADIENT HERO CARD]      ││
│  │  Greeting                  ││
│  │  Scripture + [SOPHIA ORB]  ││
│  │  [date/time pill]          ││
│  │                            ││
│  │  [Continue][New][Explore]  ││
│  │                            ││
│  └────────────────────────────┘│
│                                │
│  ┌────┐┌────┐┌────┐┌────┐┌──┐ │
│  │Soph││Scri││Today││Insi││••│ │
│  └────┘└────┘└────┘└────┘└──┘ │
│  (horizontal scroll for more)  │
│                                │
│  ── Your Journey ────────────  │
│  ┌────────────────────────────┐│
│  │ ○ Grace                   ││
│  │ │                         ││
│  │ ○ Trust                   ││
│  │ │                         ││
│  │ ● NOW                     ││
│  │ · ? HORIZON               ││
│  │                           ││
│  │ [narration]               ││
│  │ [See Full Journey →]      ││
│  └────────────────────────────┘│
│                                │
│  ── Constellation ───────────  │
│  ┌────────────────────────────┐│
│  │ [★ img] Grace insight...  ││
│  │ [★ img] Forgiveness...    ││
│  │ [★ img] Trust insight...  ││
│  │                           ││
│  │ [Sophia notice]           ││
│  │ [Explore This →]          ││
│  └────────────────────────────┘│
│                                │
│  ── Horizon ─────────────────  │
│  ┌────────────────────────────┐│
│  │ ● "Freedom"          Feb  ││
│  │   Based on forgiveness... ││
│  │ ─────────────────────     ││
│  │ ● "Surrender"        Mar  ││
│  │   A thread emerging...    ││
│  │                           ││
│  │ [Explore Horizon →]       ││
│  └────────────────────────────┘│
│                                │
├────────────────────────────────┤
│  [🏠]  [💬]  [🗺️]  [💡]  [•••] │
│  Home  Sophia Journey Ins  More │
└────────────────────────────────┘
```

### Mobile-Specific Specs

| Element | Mobile Treatment |
|---------|------------------|
| **Header** | Logo left, settings icon right, 56px height |
| **Hero card** | Full width with 16px horizontal margin, CTAs inside card as stacked or compact row |
| **Quick Access** | Horizontal scrollable row of circles, 48px circles, 12px gap, no wrapping |
| **Journey card** | Full width, vertical path shows 3-4 nodes with scroll |
| **Constellation card** | Full width, 3 most recent insights shown, "View all" link |
| **Horizon card** | Full width, 2-3 horizon items shown |
| **Bottom tab bar** | 5 items, 64px height + safe area inset |
| **Section labels** | Left-aligned, 14px, `font-weight: 600`, 24px top margin |
| **Card spacing** | 16px between cards |

### Bottom Tab Bar Specs

```
┌────────────────────────────────────────────┐
│  [🏠]    [💬]    [🗺️]    [💡]    [•••]     │
│  Home   Sophia  Journey Insights  More     │
└────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Height | 64px + safe area |
| Background | `rgba(255, 255, 255, 0.9)` with `backdrop-filter: blur(16px)` |
| Border top | `1px solid rgba(0, 0, 0, 0.06)` |
| Icons | 24px, active fills with `#756653`, inactive `#9CA3AF` |
| Labels | 10px, below icon |
| Active indicator | Filled icon + bold label + subtle dot above icon |

---

## Tablet Layout (Landscape)

On tablet, the layout keeps the full-width hero and horizontal circles, but uses a two-column arrangement for Journey/Constellation with Horizon spanning full width below.

```
┌──────────────────────────────────────────────────────────────────┐
│ [WL Logo]                                     [Time] [Settings]  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Sophia Hero Card (full width, CTAs inside)               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  [○ Sophia] [○ Scripture] [○ Today] [○ Insights] [○ Patterns]  │
│                                                                  │
│  ┌────────────────────────────┐  ┌────────────────────────────┐ │
│  │ Your Journey               │  │ Your Constellation         │ │
│  │ [vertical path]            │  │ [insight list]             │ │
│  │ [narration]                │  │ [sophia notice]            │ │
│  └────────────────────────────┘  └────────────────────────────┘ │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ On Your Horizon (full width, items in horizontal row)    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  [🏠]    [💬]    [🗺️]    [💡]    [•••]                           │
└──────────────────────────────────────────────────────────────────┘
```

---

## Visual Design System

### Card Treatment (Global)

Every card on the dashboard uses this base treatment:

**Light Mode:**

| Property | Value |
|----------|-------|
| Background | `rgba(255, 255, 255, 0.7)` |
| Backdrop filter | `blur(16px)` |
| Border | `1px solid rgba(255, 255, 255, 0.2)` |
| Border radius | 20px |
| Shadow | `0 4px 24px rgba(0, 0, 0, 0.06)` |
| Padding | 24px |

**Dark Mode:**

| Property | Value |
|----------|-------|
| Background | `rgba(30, 30, 40, 0.6)` |
| Backdrop filter | `blur(16px)` |
| Border | `1px solid rgba(255, 255, 255, 0.08)` |
| Border radius | 20px |
| Shadow | `0 4px 24px rgba(0, 0, 0, 0.2)` |
| Padding | 24px |

### Page Background

**Light Mode:**

| Property | Value |
|----------|-------|
| Base color | `#F8F6F0` (warm cream — NOT pure white) |
| Subtle texture | Optional noise overlay at 2-3% opacity |
| Time-aware tint | Very subtle color shift matching time of day |

**Dark Mode:**

| Property | Value |
|----------|-------|
| Base color | `#1A1A2E` (deep navy with warmth) |
| Cards | Slightly lighter surfaces for contrast |
| Light sources | Orb glow and constellation stars become primary light |

### Typography

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| **Card headers** | Sans-serif | 16px | 600 (semibold) | `foreground` |
| **Hero greeting** | Sans-serif | 28px | 300 (light) | Inherits from gradient |
| **Scripture verse** | Serif or italic | 16px | 400 | Inherits from gradient at 90% |
| **Scripture attribution** | Sans-serif | 14px | 500 | `text-muted-foreground` |
| **Insight/Horizon titles** | Sans-serif | 14-16px | 500-600 | `foreground` |
| **Body/narration** | Sans-serif | 14px | 400 | `text-muted-foreground` |
| **Sophia's voice** | Sans-serif | 13-14px | 400, italic | `text-muted-foreground` |
| **Labels** | Sans-serif | 11-12px | 400 | `text-muted-foreground` |
| **CTAs** | Sans-serif | 14px | 500 | `#756653` |

### Animation Specs

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| **Sophia orb breathing** | Scale 1.0 → 1.03 → 1.0 | 5s | ease-in-out, infinite |
| **Sophia orb float** | TranslateY 0 → -4px → 0 | 6s | ease-in-out, infinite |
| **Orb glow** | Opacity 0.4 → 0.6 → 0.4 | 4s | ease-in-out, infinite |
| **Journey node pulse** | Scale 1.0 → 1.15 → 1.0 on active node | 3s | ease-in-out, infinite |
| **Horizon glow** | Opacity 0.3 → 0.6 → 0.3 on Horizon element in Journey | 5s | ease-in-out, infinite |
| **Star twinkle** | Opacity 0.6 → 1.0 → 0.6 on insight thumbnails, staggered | 4-8s random | ease-in-out, infinite |
| **Card entrance** | Opacity 0 → 1, translateY 20 → 0 | 500ms | ease-out, staggered 100ms |
| **Button hover** | Scale 1.0 → 1.02 | 200ms | ease-out |
| **Circle hover** | Scale 1.0 → 1.08 | 200ms | ease-out |
| **Row hover** | Background opacity shift | 150ms | ease-out |

### Color Palette Reference

#### Core Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Khaki Beige | `#C5B49B` | Primary warm tone, orb color, star color, emerging dots |
| Olive Wood | `#756653` | Primary text accent, icons, CTAs, active dots |
| Faded Copper | `#8A7356` | Secondary warm tone, gradient |
| Pale Oak | `#DED1BA` | Light backgrounds, hover states, fills, pills |
| Sage Green | `#87A96B` | Growth accent, Sophia label, connection highlights |

#### Neutral Colors

| Name | Hex | Usage |
|------|-----|-------|
| Deep Navy | `#1A1A2E` | Dark mode background |
| Dark Slate | `#2D3748` | Dark mode text, dark surfaces |
| Muted Slate | `#4A5568` | Secondary text |
| Warm Cream | `#F8F6F0` | Light mode background |
| Soft Cream | `#F0E6D6` | Light mode card variation |

---

## Design Comparison: What's Borrowed vs. What's Unique

| Element | Borrowed Pattern | Wholelicity Adaptation |
|---------|-----------------|------------------------|
| **Hero card** | Card-in-card with gradient, overlapping visual element | Breathing orb replaces photo, gradient shifts with time of day, Scripture verse replaces appointment details, CTAs live inside |
| **Horizontal circle row** | Inline icon circles with labels for quick navigation | Spiritual pathways instead of medical shortcuts, floats without enclosing card |
| **Vertical scrollable card** | Tall card with grid of categorized items | Organic vertical journey path with theme nodes and Horizon |
| **List card with thumbnails** | Content list with image + title + description rows | Insight constellation items with star thumbnails and Sophia's pattern-noticing |
| **Timeline card** | Chronological result/history with dots and dates | Forward-looking Horizon invitations with near/emerging/distant states |
| **Glassmorphic cards** | Transparency, blur, soft shadows | Warmer palette, time-of-day adaptation, living animations |
| **Soft rounded aesthetic** | Border-radius, no hard edges | Organic animations (breathing, twinkling, pulsing) |

---

## Key Design Principle

The reference dashboard is a well-organized information display. The Wholelicity dashboard should feel like a **living, sacred space** you step into — organized with the same structural clarity, but animated with warmth, spiritual intentionality, and a sense of presence. Every element breathes. The gradients shift with the sun. The constellation grows with the user's journey. Sophia is there, but she waits. The Horizon glows, but it doesn't push.

**Structure borrowed. Soul is original.**

---

## Saved for Future: Left Sidebar Navigation

The left sidebar has been removed from the current dashboard layout for a cleaner, full-width experience. It is saved here for potential restoration in a future phase when more modules are available and persistent navigation becomes necessary.

<details>
<summary>Sidebar Specification (Click to expand)</summary>

Icon + label vertical navigation. Always visible on desktop, collapses to hamburger or bottom tab bar on mobile.

```
┌─────────────────┐
│                  │
│  [WL Logo]       │
│                  │
│  ● Dashboard     │  ← active: filled bg, bold text
│                  │
│  ○ Sophia        │  ← opens chat
│                  │
│  ○ Scripture     │  ← Bible explorer (future)
│                  │
│  ○ Journey       │  ← full journey view
│                  │
│  ○ Insights      │  ← full constellation view
│                  │
│  ○ Discover      │  ← modules/exploration
│                  │
│                  │
│                  │
│                  │
│  ─────────────── │
│  ○ Support       │
│  ○ Settings      │
│                  │
└─────────────────┘
```

| Property | Value |
|----------|-------|
| Width | 220px |
| Background | `rgba(255, 255, 255, 0.6)` with `backdrop-filter: blur(16px)` |
| Position | Fixed left |
| Logo | Top, with 24px padding |
| Nav items | 48px height, 16px left padding, 12px gap between items |
| Icon | 20px, line style, `#756653` |
| Label | 14px, `font-weight: 400`, `#4A5568` |
| Active state | Background `rgba(222, 209, 186, 0.3)`, text `#756653`, `font-weight: 600`, border-radius 12px |
| Hover state | Background `rgba(222, 209, 186, 0.15)` |
| Divider | 1px `rgba(0, 0, 0, 0.06)`, 16px horizontal margin |
| Bottom section | Support + Settings, pinned to bottom |

</details>

---

## Relationship to Other Documents

| Document | Relationship |
|----------|-------------|
| `docs/ux-dashboard-vision.md` | This design spec implements the vision laid out in that document |
| `docs/ux-dashboard-brainstorm.md` | This design synthesizes concepts from the brainstorm |
| `docs/sophia-definition.md` | Sophia's dashboard presence follows her defined character |
| `docs/ux-implementation-phases.md` | Phase 3 builds this dashboard |
| `docs/ux-interaction-patterns.md` | Animations and interactions reference established patterns |

---

*This document provides the structural and visual specification. Pair with high-fidelity mockups in Figma or similar tool before implementation begins.*
