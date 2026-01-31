# Wholelicity Brand System

Design tokens, typography hierarchy, and color specifications for the Wholelicity app.

---

## Color Palette

Six warm-toned color columns, each with 11 shades from lightest (50) to darkest (950).

### Earth `wl-earth` — #5A4C3A

Deep warm brown. Used for primary text, dark mode backgrounds, and grounding elements.

| Shade | Hex | Usage |
|-------|-----|-------|
| 50 | `#F1EDE9` | Light mode drawer background |
| 100 | `#E3DCD3` | Light mode outer shell background |
| 200 | `#C7B9A7` | — |
| 300 | `#AA967A` | — |
| 400 | `#867156` | — |
| **500** | **`#5A4C3A`** | **Base / DEFAULT** |
| 600 | `#483D2E` | — |
| 700 | `#362E23` | Dark mode hover surfaces |
| 800 | `#241E17` | Dark mode drawer background |
| 900 | `#120F0C` | Dark mode deepest background |
| 950 | `#090806` | — |

### Olive `wl-olive` — #746653

Warm olive. The primary UI accent — buttons, borders, labels, interactive elements.

| Shade | Hex | Usage |
|-------|-----|-------|
| 50 | `#F2F0ED` | — |
| 100 | `#E5E1DB` | Light icon backgrounds |
| 200 | `#CBC2B6` | Dark mode body text (runtime JS) |
| 300 | `#B2A492` | Dark mode labels, badges, accent text |
| 400 | `#98856D` | — |
| **500** | **`#746653`** | **Base / DEFAULT — CTA borders, text, icons** |
| 600 | `#5D5142` | — |
| 700 | `#463D32` | — |
| 800 | `#2F2921` | Dark mode card backgrounds (runtime JS) |
| 900 | `#171411` | Dark mode outer shell background |
| 950 | `#0C0A08` | — |

### Stone `wl-stone` — #8A7356

Warm stone. Used for badges, secondary accents, and the primary semantic color.

| Shade | Hex | Usage |
|-------|-----|-------|
| 50 | `#F4F1ED` | Scripture preview background (light mode) |
| 100 | `#E9E3DC` | — |
| 200 | `#D3C7B9` | — |
| 300 | `#BDAB96` | — |
| 400 | `#A78F72` | — |
| **500** | **`#8A7356`** | **Base / DEFAULT — badges, `--primary`** |
| 600 | `#6E5C45` | — |
| 700 | `#534534` | — |
| 800 | `#372E23` | — |
| 900 | `#1C1711` | — |
| 950 | `#0E0B09` | — |

### Sage `wl-sage` — #C5B49B

Khaki beige. Light accent for highlights, SVG star fills, and warm tones.

| Shade | Hex | Usage |
|-------|-----|-------|
| 50 | `#F9F8F5` | — |
| 100 | `#F3F0EB` | — |
| 200 | `#E8E1D7` | — |
| 300 | `#DCD2C3` | — |
| 400 | `#D1C3AF` | — |
| **500** | **`#C5B49B`** | **Base / DEFAULT — star fills, constellation accents** |
| 600 | `#AC936E` | CinematicIntro accent |
| 700 | `#866F4D` | — |
| 800 | `#594A33` | — |
| 900 | `#2D251A` | — |
| 950 | `#16130D` | — |

### Parchment `wl-parchment` — #DED1BA

Light parchment. Subtle backgrounds and warm badges.

| Shade | Hex | Usage |
|-------|-----|-------|
| 50 | `#FCFAF8` | — |
| 100 | `#F8F6F1` | — |
| 200 | `#F2EDE3` | — |
| 300 | `#EBE3D6` | — |
| 400 | `#E4DAC8` | — |
| **500** | **`#DED1BA`** | **Base / DEFAULT — badge backgrounds, NoiseOrb** |
| 600 | `#C3AC83` | — |
| 700 | `#A58650` | — |
| 800 | `#6E5935` | — |
| 900 | `#372D1B` | — |
| 950 | `#1C160D` | — |

### Linen `wl-linen` — #F4EFE6

Off-white. The primary light-mode page background.

| Shade | Hex | Usage |
|-------|-----|-------|
| 50 | `#FEFDFD` | — |
| 100 | `#FDFCFA` | — |
| 200 | `#FBF9F5` | Dark mode light text (runtime JS), tooltip backgrounds |
| 300 | `#F8F6F0` | FullScreenModal background |
| 400 | `#F6F2EB` | — |
| **500** | **`#F4EFE6`** | **Base / DEFAULT — `--background` (light mode)** |
| 600 | `#D7C5A4` | — |
| 700 | `#BA9B62` | — |
| 800 | `#846A3A` | — |
| 900 | `#42351D` | — |
| 950 | `#211A0E` | — |

### Highlight Colors `hl-*`

Functional accent colors for the Bible reader and interactive UI elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `hl-gold` | `#C5B49B` | Primary highlight (same as wl-sage) |
| `hl-green` | `#87A96B` | Active states, buttons, spinners, progress bars |
| `hl-blue` | `#6B9FBF` | Bible highlight option |
| `hl-purple` | `#8B7BB5` | Bible highlight option |
| `hl-red` | `#C47A6B` | Bible highlight option |

---

## Semantic Colors (CSS Variables)

These CSS custom properties adapt automatically between light and dark mode.

| Variable | Light Mode | Dark Mode | Role |
|----------|-----------|-----------|------|
| `--background` | wl-linen (#F4EFE6) | Carbon (#262721) | Page background |
| `--foreground` | Warm charcoal (#3D3330) | wl-linen (#F4EFE6) | Primary text |
| `--card` | White | #303028 | Card surfaces |
| `--primary` | wl-stone (#8A7356) | Lighter stone (#9A8A6F) | Primary actions |
| `--secondary` | wl-sage (#C5B49B) | Muted olive (#6B6052) | Secondary actions |
| `--muted` | #D4C6B8 | #3D3B36 | Disabled states |
| `--muted-foreground` | #5C504A | #B8A887 | Muted text |
| `--accent` | wl-sage (#C5B49B) | Lighter sage (#9A8865) | Accent highlights |
| `--border` | #D4C6B8 | #4A4740 | Borders |
| `--destructive` | #FF5F4E | #C41F3D | Danger/delete |

---

## Typography

### Font Families

| Token | Stack | Usage |
|-------|-------|-------|
| `font-sans` | Inter, sans-serif | Default body text |
| `font-spiritual` | Crimson Pro, serif | Scripture and devotional content |
| `font-lato` | Lato, Inter, sans-serif | Alternative sans-serif |
| `font-bodoni` | Libre Bodoni, Georgia, serif | Elegant serif headings |

### Type Scale — Dashboard Cards

All dashboard cards follow a shared typography hierarchy. Classes listed are Tailwind utilities.

#### Headings

| Level | Classes | Example |
|-------|---------|---------|
| **Hero title** | `text-2xl leading-snug` | "Start Your Bible Journey" |
| **Active title** | `text-lg font-semibold leading-tight` | "Romans 8" |

Hero titles use `text-wl-earth dark:text-wl-olive-200` for content cards, or `text-foreground` for the Sophia panel (which sits over the orb). Active titles use `text-foreground dark:text-wl-olive-200`.

All dashboard cards use `<h3>` for their heading element.

#### Labels

| Level | Classes | Example |
|-------|---------|---------|
| **Hero label** | `text-[10px] font-medium uppercase tracking-[0.35em] text-foreground/40 dark:text-wl-olive-300` | "SCRIPTURE" |
| **Section label** | `text-[10px] font-medium uppercase tracking-wider text-foreground/40` | "UP NEXT" |
| **Badge / chip** | `text-[10px] font-medium uppercase tracking-wider` + bg treatment | "42 LESSONS" |

Hero labels are centered above a hero title. Section labels are left-aligned above content sections. Badges add a rounded-full background and padding (`px-2.5 py-0.5 rounded-full`).

#### Body Text

| Level | Classes | Usage |
|-------|---------|-------|
| **Subtitle** | `text-sm text-foreground/40` | Under card titles |
| **Item title** | `text-sm font-medium text-foreground/80` | Primary text in list rows |
| **Item description** | `text-[11px] text-foreground/40` | Secondary text in list rows |
| **Rich body** | `text-[13px] leading-relaxed text-foreground/55` | Passage descriptions, longer content |
| **Interactive card label** | `text-base font-semibold text-foreground/85` | Empty-state button labels |
| **Meta** | `text-xs text-foreground/50` | Progress indicators, counts |

#### CTA Buttons

| Level | Classes | Usage |
|-------|---------|-------|
| **Primary (filled)** | `py-3 rounded-xl text-sm font-semibold text-white dark:text-wl-olive-900 bg-wl-olive dark:bg-wl-olive-300` | Main action, one per card |
| **Secondary (outline)** | `py-2.5 rounded-xl text-sm font-medium text-wl-olive dark:text-wl-olive-300 border border-wl-olive/25 dark:border-wl-olive-300/25` | Resume, continue actions |
| **Tertiary (text link)** | `text-xs font-medium text-foreground/40 hover:text-foreground/60` | "Browse All Books", "View full chat history" |

Secondary CTA hover state: `hover:bg-wl-olive/10 dark:hover:bg-wl-olive-300/10 hover:border-wl-olive/40 dark:hover:border-wl-olive-300/40 hover:shadow-sm transition-all duration-200`.

#### Dark Mode Text Mapping

When a Tailwind class references a light-mode color, use the `dark:` variant with its warm palette counterpart:

| Light Mode | Dark Mode |
|-----------|-----------|
| `text-foreground` | Automatic via CSS variable |
| `text-foreground/{opacity}` | Automatic via CSS variable |
| `text-wl-earth` | `dark:text-wl-olive-200` |
| `text-wl-olive` | `dark:text-wl-olive-300` |
| `text-wl-olive/{opacity}` | `dark:text-wl-olive-300/{opacity}` |
| `border-wl-olive/{opacity}` | `dark:border-wl-olive-300/{opacity}` |
| `bg-wl-olive/{opacity}` | `dark:bg-wl-olive-300/{opacity}` |

---

## Spacing — Dashboard Cards

| Area | Padding |
|------|---------|
| Header (active state) | `px-5 pt-5` |
| Header (empty/hero state) | `px-5 pt-8 pb-4` |
| Content area | `px-5` |
| Footer with primary CTA | `px-5 pb-5 pt-3` |
| Footer with secondary CTA | `px-5 pb-4 pt-2` |
| Section dividers | `border-t border-foreground/[0.05]` |
| Internal content blocks | `rounded-xl px-4 py-3` (e.g. progress bar container) |

---

## Animations

| Token | Effect | Duration | Usage |
|-------|--------|----------|-------|
| `animate-pulse-gentle` | Opacity 1 to 0.7 | 2s infinite | Subtle emphasis |
| `animate-float` | Y translate 0 to -4px | 6s infinite | Gentle floating |
| `animate-breathe` | Scale 1 to 1.03 | 5s infinite | Subtle breathing |
| `animate-glow` | Opacity 0.3 to 0.6 | 4s infinite | Pulsating glow |
| `animate-twinkle` | Opacity 0.6 to 1 | 3s infinite | Star twinkling |
| `animate-pulse-node` | Scale 1 to 1.15 + opacity | 3s infinite | Node pulse |

---

## Glass Card Pattern

Dashboard cards use the `<GlassCard>` component with `padding="none"` and apply internal padding manually for layout control. The card surface uses:

- Light: white with subtle transparency
- Dark: `--card` variable (#303028)
- Overflow: `overflow-hidden` on the outer card
- Inner scrollable areas: `flex-1 overflow-y-auto`
- Fixed CTA areas: `mt-auto` to pin to bottom

---

## Files

| File | Contains |
|------|----------|
| `tailwind.config.ts` | Color scales, fonts, animations, border radius |
| `src/index.css` | CSS custom properties, gradient utilities, chat colors |
