# SmartSpend — Premium Dark Fintech UI Specification

> **For Claude Code implementation.** This spec replaces the old indigo/white design with a premium dark-mode-first green fintech aesthetic. The project uses **React 19 + Vite 8 + Tailwind CSS 4 + React Router v7** (NOT Next.js).

---

## Design Philosophy

A premium, dark-mode-first financial application inspired by modern fintech interfaces. The aesthetic combines deep forest greens with vibrant lime accents, subtle grain textures, glowing gradient blobs, and smooth micro-animations — creating an immersive, trustworthy, high-end financial experience.

**Key Principles:**
- Dark surfaces with luminous lime accents — never flat, always layered
- Depth through translucent borders, backdrop blur, and glow effects
- Grain texture overlay for organic, tactile feel
- Generous whitespace and breathing room
- Monospace numbers for financial data
- Smooth 200-300ms transitions on all interactive elements

---

## Design System

### Primary Color Palette (5 Core Colors)

| Token | Hex | CSS Variable | Usage |
|-------|-----|-------------|-------|
| **Deep Forest** | `#06231D` | `--bg-primary` | Primary background, deepest layer |
| **Forest Green** | `#0C342C` | `--bg-card` | Card backgrounds, navbar, sidebar |
| **Emerald** | `#076653` | `--border` | Borders, dividers, subtle accents |
| **Lime Accent** | `#E3EF26` | `--accent` | CTAs, active states, highlights, branding |
| **Cream White** | `#F5F5F0` | `--text-primary` | Primary text, headings |

### Extended Semantic Tokens

```css
/* Backgrounds */
--bg-primary: #06231D;
--bg-card: #0C342C;
--bg-hover: #0A2B24;
--bg-input: #06231D;

/* Accent */
--accent: #E3EF26;
--accent-hover: #D4E020;
--accent-glow: rgba(227, 239, 38, 0.15);
--accent-subtle: rgba(227, 239, 38, 0.1);

/* Text */
--text-primary: #F5F5F0;
--text-secondary: rgba(245, 245, 240, 0.7);
--text-muted: rgba(245, 245, 240, 0.5);
--text-dim: rgba(245, 245, 240, 0.3);

/* Borders */
--border-primary: rgba(7, 102, 83, 0.5);
--border-hover: #076653;
--border-accent: rgba(227, 239, 38, 0.3);

/* Semantic */
--success: #22C55E;
--danger: #EF4444;
--warning: #F59E0B;
--purple: #8B5CF6;
```

### Gradient Definitions

```css
/* Hero section background */
--gradient-hero: linear-gradient(135deg, #076653 0%, #0C342C 50%, #06231D 100%);

/* Card subtle depth */
--gradient-card: linear-gradient(180deg, #0C342C 0%, #0A2B24 100%);

/* Accent buttons on hover */
--gradient-accent: linear-gradient(135deg, #E3EF26 0%, #A3B818 100%);

/* Lime glow behind premium elements */
--gradient-glow: radial-gradient(ellipse at center, rgba(227, 239, 38, 0.2) 0%, transparent 70%);
```

### Typography

**Font Stack:**
- Primary: `'Inter', system-ui, sans-serif` — import from Google Fonts (weights: 400, 500, 600, 700)
- Mono: `'JetBrains Mono', monospace` — for all currency amounts and numbers

**Type Scale:**

| Element | Size | Weight | Color | Extra |
|---------|------|--------|-------|-------|
| Hero H1 | text-5xl → text-7xl (responsive) | 700 | cream | tracking-tight, leading-tight |
| Page H1 | text-2xl | 700 | cream | — |
| Section H2 | text-xl | 600 | cream | — |
| Card Title | text-base | 600 | cream | — |
| Body | text-sm/text-base | 400 | cream/70 | — |
| Meta/Label | text-xs/text-sm | 500 | cream/50 | — |
| Caption | text-xs | 500 | cream/40 | — |
| Currency | text-xl–text-3xl | 700 | contextual | font-mono, tracking-tight |

### Border & Shadow System

```css
/* Border radius */
--radius-sm: 8px;    /* small buttons, badges */
--radius-md: 12px;   /* inputs, buttons, nav items */
--radius-lg: 16px;   /* cards */
--radius-xl: 20px;   /* modals, premium cards */
--radius-2xl: 24px;  /* login card, hero elements */
--radius-full: 9999px; /* pills, dots, avatars */

/* Shadows — dark mode optimized */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.6);
--shadow-glow: 0 0 40px rgba(227, 239, 38, 0.15);
--shadow-glow-lg: 0 0 80px rgba(227, 239, 38, 0.2);
```

### Special Effects

**Grain Texture Overlay** — Apply to body or main containers via `::before`:
```css
.grain::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}
```

**Gradient Glow Blobs** — Positioned absolutely behind hero and key sections:
```html
<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E3EF26]/20 rounded-full blur-[120px]" />
<div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#076653]/40 rounded-full blur-[100px]" />
```

**Glow Classes:**
```css
.glow-lime { box-shadow: 0 0 40px rgba(227, 239, 38, 0.15); }
.glow-text { text-shadow: 0 0 20px rgba(227, 239, 38, 0.3); }
```

---

## Animations & Transitions

```css
/* Base transition — apply to all interactive elements */
transition: all 200ms ease;

/* Hover lift — cards, feature items */
.hover-lift:hover {
  transform: translateY(-4px);
  border-color: #076653;
}

/* Glow pulse — premium badges, CTAs */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(227, 239, 38, 0.1); }
  50% { box-shadow: 0 0 40px rgba(227, 239, 38, 0.25); }
}

/* Fade in up — page sections on scroll / mount */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Stagger children — list items, grid cards */
.stagger-children > *:nth-child(1) { animation-delay: 0ms; }
.stagger-children > *:nth-child(2) { animation-delay: 80ms; }
.stagger-children > *:nth-child(3) { animation-delay: 160ms; }
/* etc. */

/* Spinner */
@keyframes spin { to { transform: rotate(360deg); } }

/* Scale on hover for buttons */
.hover-scale:hover { transform: scale(1.02); }
```

**Implementation:** Use `framer-motion` or CSS animations. Every card, button, and section should animate in on mount with fade-in-up. Page transitions should feel smooth.

---

## Page-by-Page UI Specification

---

### PAGE 1: Landing Page
**Route:** `/`
**Access:** Public (no sidebar, no navbar)

**Full-page dark layout** with grain overlay on body.

---

#### Section 1: Hero

**Background:** `--gradient-hero` with positioned gradient glow blobs (lime/20, emerald/40) using `blur-[120px]`. Grain overlay at 30% opacity on top.

**Navigation Bar (fixed top, z-50):**
```
Height: 72px
Background: transparent initially
On scroll (>50px): bg-[#06231D]/90 + backdrop-blur-xl + border-b border-[rgba(7,102,83,0.3)]
Max-width: 1280px, mx-auto
Padding: 0 24px

Left:
  - Sparkles icon (lime #E3EF26, 24px)
  - "SmartSpend" text (cream, text-xl, font-bold, tracking-tight)

Center (hidden mobile, flex md+):
  - Links: "Features", "Pricing", "About"
  - Style: cream/80, text-sm, font-medium
  - Hover: cream/100, transition

Right:
  - "Login" text button (cream, text-sm, font-medium)
  - "Get Started" button:
    bg-[#E3EF26], text-[#06231D], text-sm, font-semibold
    px-5 py-2.5, rounded-xl
    Hover: bg-[#D4E020], shadow-glow
```

**Hero Content (centered, max-w-4xl mx-auto):**
```
padding-top: 160px (pt-40)
padding-bottom: 120px (pb-28)
text-align: center

Headline:
  "Shaping Financial futures with expertise and care."
  - "futures" word highlighted in lime (#E3EF26)
  - text-5xl sm:text-6xl lg:text-7xl, font-bold
  - text-cream, tracking-tight, leading-tight
  - text-balance

Subheadline:
  "We offer a comprehensive suite of services, from personal tracking
   to AI-powered insights, all delivered with precision."
  - text-lg sm:text-xl
  - cream/70 color
  - max-w-2xl mx-auto
  - mt-6

CTA Buttons (flex row, gap-4, justify-center, mt-10):

  Primary "Get Started":
    bg-[#E3EF26], text-[#06231D]
    text-lg, font-semibold
    px-8 py-4, rounded-xl
    shadow-glow
    Hover: bg-[#D4E020], scale(1.02)

  Secondary "Watch Demo":
    bg-transparent, border border-[#076653]
    text-cream, text-lg, font-medium
    px-8 py-4, rounded-xl
    Play icon (16px) before text
    Hover: bg-[#076653]/20, border-cream/50
```

**Hero Visual (below CTAs, mt-20):**
```
Centered phone mockup:
  - 288px wide, 500px tall
  - bg-gradient-to-b from-[#0C342C] to-[#06231D]
  - rounded-[3rem], border border-[#076653]
  - shadow-2xl shadow-[#E3EF26]/10
  - Phone notch at top (dark bar)

  Inside phone:
    - "Statistic" label, Week/Month/Year pills (Month active in lime)
    - Bar chart with 10 bars, gradient from emerald to lime
    - "Total Spendings" label + "₹6,340.00" in white bold
    - User avatar circles at bottom

Floating Cards (absolute positioned around phone):

  Top-Left Card (+374.00):
    - bg-[#0C342C]/90 backdrop-blur-sm
    - border border-[#076653], rounded-2xl, p-4
    - "+374.00" text-xl font-bold white
    - "+3.4%" lime with ArrowUpRight icon
    - "Income this month" text-xs gray-400

  Left Card (BTC/USDT):
    - Same card style
    - Bitcoin icon (orange circle)
    - "BTC/USDT" label, "$41,984.00" bold white
    - "+18.25%" lime with TrendingUp icon
    - "Sell" lime button

  Right Card (Balance):
    - "Balance" label
    - "64,573.00" text-2xl bold white
    - "+17%" lime badge pill

  Bottom-Right Card (User):
    - Avatar + "Devil Ron" + date
    - Mini SVG line chart in lime
    - "-18,985.00" in red-400

All floating cards: shadow-xl, slight opacity, hidden on mobile (visible lg+)
```

---

#### Section 2: Client Logos / Trust Bar
```
Background: #06231D
border-top + border-bottom: 1px solid rgba(7, 102, 83, 0.3)
Padding: 60px 0

Title: "Our Recent Clients & Partners"
  - text-sm, font-medium, uppercase, tracking-widest
  - cream/50 color, text-center, mb-8

Logo Row: 5 logos, flex, justify-between, items-center
  - Opacity: 0.5, hover: 0.9, transition
  - Filter: brightness(0) invert(1) to make white
  - Use placeholder brand names: "Boltshift", "Lightbox", "FeatherDev", "GlobalBank", "Nietzsche"
  - Render as styled text with dot-icon prefixes
```

---

#### Section 3: Features Grid
```
Background: #0C342C with grain overlay
Padding: 100px 24px
Max-width: 1200px, mx-auto

Section Header:
  "Banking features designed to turn your product vision into reality."
  - text-3xl sm:text-4xl, font-bold, cream
  - text-center, max-w-3xl mx-auto, mb-16

Grid: 3 columns (1 mobile, 2 sm, 3 lg), gap-6

Feature Card:
  - bg-[#06231D]
  - border: 1px solid rgba(7, 102, 83, 0.5)
  - rounded-[20px], p-8
  - Hover: border-[#076653], translateY(-4px), transition-all 300ms
  - Group hover for icon glow

  Icon Container:
    - 48px × 48px, rounded-xl
    - bg-[rgba(227,239,38,0.1)]
    - Icon: lime #E3EF26, 24px
    - Group-hover: bg-[rgba(227,239,38,0.2)]

  Title: text-lg, font-semibold, cream, mt-5 mb-3
  Description: text-sm, cream/60, leading-relaxed

Features (6 cards):
  1. BarChart3 | "Visual Dashboard" | "See income, expenses, and balance at a glance with beautiful interactive charts"
  2. Sparkles | "AI Insights" | "Get personalized spending analysis and savings tips powered by Google Gemini AI"
  3. Shield | "Secure Payments" | "Upgrade to premium securely with Razorpay. One-time payment, lifetime access"
  4. Wallet | "Smart Tracking" | "Categorize and track every transaction with intelligent categorization"
  5. TrendingUp | "Growth Analysis" | "Understand financial growth with month-over-month comparisons"
  6. Bell | "Smart Alerts" | "Get notified about unusual spending patterns and budget limits"
```

---

#### Section 4: How It Works
```
Background: #06231D
Padding: 100px 24px
Max-width: 1000px, mx-auto

Header: "How SmartSpend Works"
  - text-3xl sm:text-4xl, font-bold, cream, text-center, mb-16

Steps: flex row (column mobile), gap-12, items-center

Connector Lines (desktop only):
  - Dashed line between step circles
  - border-dashed, border-[rgba(7,102,83,0.5)]

Step Card (text-center, flex-1):
  Number Badge:
    - 48px circle, bg-[#E3EF26], text-[#06231D]
    - text-xl, font-bold
    - mx-auto, mb-6

  Title: text-lg, font-semibold, cream, mb-3
  Description: text-sm, cream/60

Steps:
  1. "Sign Up Free" | "Create your account in seconds with just email and password"
  2. "Track Spending" | "Log income and expenses by category with our intuitive interface"
  3. "Get Insights" | "Unlock AI-powered financial advice tailored to your spending habits"
```

---

#### Section 5: Premium CTA
```
Background: gradient from #076653 → #0C342C
Position: relative, overflow-hidden
Padding: 80px 24px, text-center

Background glow: radial-gradient lime at center, opacity 0.1

Sparkles icon: 40px, lime, mb-6
Headline: "Unlock Premium for just ₹1"
  - text-3xl sm:text-4xl, font-bold, cream, mb-4
Subtext: "One-time payment. Lifetime AI insights."
  - text-lg, cream/70, mb-8

CTA Button:
  - bg-[#E3EF26], text-[#06231D]
  - text-base, font-semibold
  - px-8 py-4, rounded-xl
  - shadow-glow, hover: scale(1.02)
```

---

#### Section 6: Footer
```
Background: #06231D
border-top: 1px solid rgba(7, 102, 83, 0.3)
Padding: 48px 24px
Max-width: 1200px, mx-auto

Layout: flex row (column mobile), justify-between, items-center

Left:
  - Sparkles icon (lime) + "SmartSpend" (cream, font-bold)
  - "© 2026 SmartSpend. All rights reserved." (text-sm, cream/50)

Right:
  - Links: "Features", "Pricing", "Login", "Register"
  - cream/60, hover: cream/100, text-sm, gap-8
```

---

### PAGE 2: Login Page
**Route:** `/login`
**Access:** Public

```
Full viewport, min-h-screen
Background: #06231D with grain overlay
Display: flex items-center justify-center
Padding: 24px

Login Card:
  bg-[#0C342C]
  border: 1px solid rgba(7, 102, 83, 0.5)
  rounded-3xl (24px)
  p-10 (40px)
  w-full max-w-[420px]
  shadow-lg

  Branding (centered, mb-8):
    - Sparkles icon (lime, 28px) inside bg-[rgba(227,239,38,0.1)] rounded-full p-3
    - "SmartSpend" (cream, text-2xl, font-bold, mt-3)
    - "Sign in to your account" (cream/50, text-sm, mt-1)

  Form Fields (space-y-5):

    Label:
      text-sm, font-medium, cream/80, mb-2

    Input:
      bg-[#06231D]
      border: 1px solid rgba(7, 102, 83, 0.5)
      rounded-xl (12px)
      px-4 py-3.5 (14px 16px)
      text-cream, text-[15px]
      placeholder: cream/30
      Focus: border-[#E3EF26], ring-2 ring-[rgba(227,239,38,0.1)]
      Transition: border-color 200ms

    Error text: text-xs, text-red-400, mt-1

  Submit Button (mt-2):
    w-full, bg-[#E3EF26], text-[#06231D]
    text-[15px], font-semibold
    py-3.5, rounded-xl
    Hover: bg-[#D4E020]
    Loading: animate-spin spinner, disabled opacity-60
    Transition: all 200ms

  Register Link (mt-6, text-center):
    "Don't have an account?"  — text-sm, cream/50
    "Sign up" — text-[#E3EF26], font-medium, hover:underline
    Links to /register
```

---

### PAGE 3: Register Page
**Route:** `/register`

Identical layout to Login with:
- Subtitle: "Create your free account"
- Additional fields: **Full name** (first field), **Confirm password** (after password)
- Button text: "Create Account"
- Bottom link: "Already have an account?" + "Sign in" → /login

---

### PAGE 4: Dashboard Page
**Route:** `/dashboard`
**Access:** Protected (authenticated)

Uses shared **Layout** component (Navbar + Sidebar + Content).

---

#### Shared: Navbar
```
Height: 64px (h-16)
Background: #0C342C
border-bottom: 1px solid rgba(7, 102, 83, 0.3)
Position: sticky top-0 z-40
Padding: 0 24px
Display: flex items-center justify-between

Left:
  - Link to /dashboard
  - Sparkles icon (lime, 22px)
  - "SmartSpend" (cream, text-lg, font-bold, tracking-tight)

Right (flex items-center gap-4):

  Premium Badge (if user.isPremium):
    - bg-[rgba(227,239,38,0.15)]
    - border: 1px solid rgba(227,239,38,0.3)
    - text-[#E3EF26], text-xs, font-medium
    - px-2.5 py-1, rounded-full
    - Crown icon (14px) + "Premium"
    - animation: glow-pulse 3s infinite

  User Name (hidden mobile, visible sm+):
    - cream/70, text-sm

  Logout Button:
    - 36px × 36px, rounded-lg
    - bg-transparent, hover: bg-[rgba(7,102,83,0.3)]
    - LogOut icon (18px, cream/60)
    - Transition: all 200ms
```

#### Shared: Sidebar
```
Width: 240px (w-60)
Background: #0C342C
border-right: 1px solid rgba(7, 102, 83, 0.3)
Padding: 24px 16px
Display: hidden mobile, flex flex-col md+

Nav Items (space-y-1):

  Default State:
    - px-4 py-3, rounded-xl
    - cream/60, text-sm, font-medium
    - Hover: bg-[rgba(7,102,83,0.3)], cream/100
    - Transition: all 200ms
    - flex items-center gap-3

  Active State:
    - bg-[rgba(227,239,38,0.1)]
    - text-[#E3EF26]
    - border: 1px solid rgba(227,239,38,0.2)

Items:
  1. LayoutDashboard | "Dashboard" | /dashboard
  2. ArrowLeftRight | "Transactions" | /transactions
  3. Sparkles | "AI Insights" | /insights
     PRO badge: bg-[rgba(227,239,38,0.15)], text-[#E3EF26], text-[10px], font-semibold, px-1.5, rounded, ml-auto
  4. Zap | "Upgrade" | /upgrade (hidden if premium)
```

#### Shared: Layout Component
```
min-h-screen, bg-[#06231D]

Structure:
  <div class="min-h-screen bg-[#06231D]">
    <Navbar />
    <div class="max-w-6xl mx-auto px-4 flex gap-6 pt-6 pb-10">
      <Sidebar />
      <main class="flex-1 min-w-0">{children}</main>
    </div>
  </div>
```

---

#### Dashboard Content

**Page Header:**
```
mb-6
H1: "Dashboard" — text-2xl, font-bold, cream
Subtitle: "Your financial overview" — text-sm, cream/50
```

**Section 1: Summary Cards**
```
Grid: 3 columns (1 mobile), gap-5
Margin-bottom: 8

Card:
  bg-[#0C342C]
  border: 1px solid rgba(7, 102, 83, 0.5)
  rounded-2xl (16px), p-6
  Hover: border-[#076653], transition 200ms

  Layout: flex items-start gap-4

  Icon Container:
    44px × 44px, rounded-xl
    flex items-center justify-center

  Text:
    Label: text-sm, cream/50, mb-1
    Amount: text-2xl, font-bold, font-mono, tracking-tight

Cards:
  1. Total Income:
     Icon bg: rgba(34, 197, 94, 0.15)
     Icon: TrendingUp #22C55E
     Amount: #22C55E

  2. Total Expenses:
     Icon bg: rgba(239, 68, 68, 0.15)
     Icon: TrendingDown #EF4444
     Amount: #EF4444

  3. Net Balance:
     Icon bg: rgba(227, 239, 38, 0.15)
     Icon: Wallet #E3EF26
     Amount: #E3EF26 (positive) or #F59E0B (negative)
```

**Section 2: Charts**
```
Grid: 2 columns (1 mobile), gap-5, mb-8

Chart Card:
  bg-[#0C342C]
  border: 1px solid rgba(7, 102, 83, 0.5)
  rounded-2xl, p-6

  Title: text-base, font-semibold, cream, mb-5

Pie Chart — "Spending by Category":
  - Recharts PieChart, donut style (innerRadius="60%")
  - Height: 240px
  - Colors: use Category Colors below
  - Custom dark tooltip: bg-[#06231D], border-[#076653], text-cream
  - Legend below: colored dots + category name, text-xs, cream/60
  - Empty: "No expense data yet" cream/40 centered

Bar Chart — "Monthly Overview":
  - Recharts BarChart, grouped (Income + Expense)
  - Height: 240px
  - Income bar: #22C55E, Expense bar: #EF4444
  - Grid lines: rgba(7, 102, 83, 0.3), dashed
  - Axis text: cream/50, text-xs
  - Custom dark tooltip
  - Legend: colored circles + labels
  - Empty: "No monthly data yet" cream/40 centered
```

**Section 3: Recent Transactions**
```
Card:
  bg-[#0C342C]
  border: 1px solid rgba(7, 102, 83, 0.5)
  rounded-2xl, p-6

Header: flex justify-between items-center, mb-4
  Title: "Recent Transactions" — text-base, font-semibold, cream
  Link: "View all" — text-sm, text-[#E3EF26], hover:underline → /transactions

List: space-y-3, max 5 items

Transaction Item:
  bg-[#06231D]
  border: 1px solid rgba(7, 102, 83, 0.3)
  rounded-xl, p-4
  Hover: border-[rgba(7,102,83,0.5)], transition 200ms

  Layout: flex items-center gap-3

  Category Dot: 10px circle, category color

  Content (flex-1, min-w-0):
    Description: text-sm, font-medium, cream, truncate
    Meta: text-xs, cream/40 — "Category · Mar 26, 2026"

  Amount (text-right):
    text-sm, font-semibold, font-mono
    Income: #22C55E with "+"
    Expense: #EF4444 with "-"

  Actions (flex gap-2, opacity-0, group-hover:opacity-100):
    Edit: Pencil 16px, cream/30, hover: #E3EF26
    Delete: Trash2 16px, cream/30, hover: #EF4444

Empty: "No transactions yet." cream/40 centered +
  "Add your first one" text-[#E3EF26] link
```

---

### PAGE 5: Transactions Page
**Route:** `/transactions`
**Access:** Protected

**Header:**
```
flex justify-between items-center, mb-6

Left:
  "Transactions" — text-2xl, font-bold, cream
  Count: "(24)" — text-sm, cream/40, ml-2

Right:
  "Add" button:
    bg-[#E3EF26], text-[#06231D]
    text-sm, font-semibold
    px-5 py-2.5, rounded-xl
    Plus icon (16px), gap-2
    Hover: bg-[#D4E020]
```

**Filter Bar:**
```
flex flex-wrap gap-3, mb-6

All Inputs/Selects:
  bg-[#0C342C]
  border: 1px solid rgba(7, 102, 83, 0.5)
  rounded-[10px]
  px-3.5 py-2.5
  text-cream, text-sm
  Focus: border-[#E3EF26]

  - Month picker: input type="month"
  - Type select: "All Types", "income", "expense"
  - Category select: "All Categories" + category list

  Clear button (when filters active):
    cream/40, hover: #EF4444
    X icon, text-sm
```

**Transaction List:**
```
space-y-3
Same TransactionItem component as Dashboard
Full edit/delete actions always visible (not on hover)
```

**Add/Edit Modal:**
```
Overlay: fixed inset-0, bg-black/60, backdrop-blur-sm, z-50

Modal Card:
  bg-[#0C342C]
  border: 1px solid rgba(7, 102, 83, 0.5)
  rounded-2xl, shadow-xl
  max-w-md, mx-4, p-6
  Animation: fade-in-up 200ms

  Header: flex justify-between items-center, mb-6
    Title: "Add Transaction" / "Edit Transaction" — text-lg, font-semibold, cream
    X button: cream/40, hover cream, 20px

  TransactionForm:

    Type Toggle (flex gap-3, mb-5):
      Two buttons, flex-1, text-center
      py-2, rounded-xl, text-sm, font-medium, cursor-pointer

      "Expense" active: bg-[rgba(239,68,68,0.15)], text-red-400, border border-red-400/30
      "Income" active: bg-[rgba(34,197,94,0.15)], text-green-400, border border-green-400/30
      Inactive: bg-[#06231D], border border-[rgba(7,102,83,0.5)], cream/60

    Fields (same Input styling as Login page):
      - Amount: type number, step 0.01
      - Category: select dropdown
      - Date: date picker, default today
      - Description: text, placeholder "e.g., Grocery shopping"

    Submit Button:
      w-full, bg-[#E3EF26], text-[#06231D]
      text-[15px], font-semibold
      py-3, rounded-xl
      "Add Transaction" or "Update"
      Loading: spinner + disabled
```

**Empty State:**
```
text-center, py-12
"No transactions found." — cream/40, text-sm
"Add your first one" — text-[#E3EF26], hover:underline
```

---

### PAGE 6: AI Insights Page
**Route:** `/insights`
**Access:** Protected + Premium only

**Non-Premium State — PremiumBanner:**
```
bg-gradient from #076653 → #0C342C
border: 1px solid rgba(227, 239, 38, 0.2)
rounded-[20px], p-12
text-center
shadow-glow

Sparkles icon in bg-[rgba(227,239,38,0.2)] rounded-full p-4 (56px total)
Title: "Unlock AI Insights" — text-2xl, font-bold, cream, mt-6
Description: "Get personalized analysis..." — text-base, cream/70, mt-3, max-w-md mx-auto
CTA: "Upgrade for ₹1" — lime button with Zap icon, mt-6
  bg-[#E3EF26], text-[#06231D], font-semibold
  px-6 py-3, rounded-xl
  Links to /upgrade
```

**Premium State:**

**Header:**
```
flex justify-between items-center, mb-8

Left: flex items-center gap-3
  Sparkles icon (lime, 24px)
  "AI Insights" — text-2xl, font-bold, cream

Right:
  Refresh button:
    border border-[rgba(227,239,38,0.3)], text-[#E3EF26]
    text-sm, font-medium
    px-4 py-2, rounded-xl
    RefreshCw icon (16px), gap-2
    Hover: bg-[rgba(227,239,38,0.1)]
```

**Empty State:**
```
text-center, py-16
Sparkles icon (cream/20, 48px)
"No insights yet" — cream/40, text-lg, mt-4
"Analyze My Spending" button — lime, rounded-xl, mt-6
```

**Loading State:**
```
flex flex-col items-center justify-center, py-16
Spinner (lime colored, 32px, animate-spin)
"Analyzing your spending patterns..." — cream/50, text-sm, mt-4
```

**Insight Cards (space-y-5):**
```
Overview Card:
  bg-[rgba(227,239,38,0.05)]
  border: 1px solid rgba(227,239,38,0.2)
  rounded-2xl, p-6
  Title: "Overview" — font-semibold, cream + TrendingUp icon (lime)
  Body: text-sm, cream/80, leading-relaxed

Top Spending Card:
  bg-[#0C342C]
  border: 1px solid rgba(7,102,83,0.5)
  rounded-2xl, p-6
  Title: "Top Spending" — font-semibold, cream + TrendingDown icon (#EF4444)
  List items: flex justify-between
    Category name (font-medium, cream) ... Amount (font-semibold, font-mono, cream/70)
    Insight below (text-xs, cream/40)
    Divider: border-[rgba(7,102,83,0.3)]

Warnings Card:
  bg-[rgba(245,158,11,0.05)]
  border: 1px solid rgba(245,158,11,0.2)
  rounded-2xl, p-6
  Title: "Warnings" — font-semibold, amber-300 + AlertTriangle icon (amber-400)
  Bulleted list: text-sm, amber-200/90

Savings Tips Card:
  bg-[rgba(34,197,94,0.05)]
  border: 1px solid rgba(34,197,94,0.2)
  rounded-2xl, p-6
  Title: "Savings Tips" — font-semibold, green-300 + Lightbulb icon (green-400)
  List: CheckCircle icons (green-400) + text-sm, green-200/90

Budget Advice Card:
  bg-[rgba(139,92,246,0.05)]
  border: 1px solid rgba(139,92,246,0.2)
  rounded-2xl, p-6
  Title: "Budget Advice" — font-semibold, purple-300 + PiggyBank icon (purple-400)
  Body: text-sm, purple-200/80
```

**Error State:**
```
bg-[rgba(239,68,68,0.05)]
border: 1px solid rgba(239,68,68,0.2)
rounded-2xl, p-6
Error message + "Try Again" button (outline, red border)
```

---

### PAGE 7: Upgrade Page
**Route:** `/upgrade`
**Access:** Protected

**Already Premium:**
```
Centered, max-w-sm
bg-[#0C342C], rounded-[20px], p-12, text-center

Green checkmark in bg-[rgba(34,197,94,0.2)] rounded-full p-4
"You're Premium!" — text-2xl, font-bold, #22C55E, mt-6
"Enjoy your AI-powered insights" — text-sm, cream/60, mt-2
"View AI Insights" → /insights — text-[#E3EF26], font-medium, mt-4
```

**Non-Premium:**
```
Centered, max-w-md

Header (text-center, mb-8):
  Sparkles icon in bg-[rgba(227,239,38,0.1)] rounded-2xl p-4 (64px area)
  "Unlock Premium" — text-3xl, font-bold, cream, mt-6
  "Get AI-powered insights for your spending" — text-base, cream/60, mt-2

Pricing Card:
  bg-[#0C342C]
  border: 1px solid rgba(227, 239, 38, 0.2)
  rounded-[20px], p-8
  shadow-glow

  Price: "₹1" — text-5xl, font-bold, font-mono, text-[#E3EF26]
  "one-time payment" — text-sm, cream/50, mt-1

  Feature List (mt-8, space-y-4):
    Each: flex items-center gap-3
    CheckCircle icon (16px, #22C55E)
    Text: text-sm, cream/80

    Features:
      1. "AI-powered monthly spending analysis"
      2. "Identify top spending categories"
      3. "Personalized savings tips"
      4. "Smart budget recommendations"
      5. "Powered by Google Gemini AI"

  Pay Button (mt-8):
    w-full, bg-[#E3EF26], text-[#06231D]
    text-base, font-semibold
    py-4, rounded-xl
    Zap icon (18px), gap-2
    "Pay ₹1 & Unlock Premium"
    Hover: bg-[#D4E020], shadow-glow
    Loading: spinner

  Security Note (mt-4, text-center):
    "Secured by Razorpay · Test mode active"
    text-xs, cream/40
    Shield icon (12px) before text
```

---

## Category Colors

| Category | Color | Hex |
|----------|-------|-----|
| Food | Orange | #F97316 |
| Transport | Blue | #3B82F6 |
| Entertainment | Purple | #A855F7 |
| Shopping | Pink | #EC4899 |
| Bills | Yellow | #EAB308 |
| Health | Green | #22C55E |
| Salary | Teal | #14B8A6 |
| Other | Gray | #6B7280 |

---

## Currency Formatting

All monetary values in Indian Rupees:
- Symbol: ₹ (or "Rs.")
- Format: ₹XX,XXX.XX (Indian comma system, 2 decimal places)
- Font: font-mono (JetBrains Mono)
- Income: #22C55E with "+" prefix
- Expense: #EF4444 with "-" prefix

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|---------------|
| Mobile | < 768px | No sidebar, stacked grids, hamburger menu hidden, full-width cards |
| Tablet | 768px–1024px | Sidebar visible, 2-column grids, content adjusts |
| Desktop | > 1024px | Full sidebar + content, 3-column summary, 2-column charts |

---

## Implementation Notes for Claude Code

1. **index.css:** Define all CSS custom properties (colors, shadows, gradients). Import Google Fonts (Inter 400-700, JetBrains Mono 400-700). Add grain overlay, glow animations, and fade-in keyframes.

2. **Tailwind Config:** Extend theme with custom colors matching the palette. Use arbitrary values `bg-[#0C342C]` for colors not in theme.

3. **Component Architecture:** Keep the existing component file structure. Update each component's classNames from indigo/white/gray to the new dark green palette.

4. **Charts:** Update Recharts config — dark tooltips, new grid colors, dark axis text. Import dark theme colors.

5. **Animations:** Add `framer-motion` or use CSS `@keyframes` for fade-in-up on page mount, hover-lift on cards, glow-pulse on premium elements.

6. **Font Loading:** Add `<link>` tags in `index.html` for Inter and JetBrains Mono from Google Fonts. Apply via Tailwind font-family.

7. **Grain Effect:** Add grain pseudo-element on the `<body>` or root `<div>`. Keep it `pointer-events: none` and `position: fixed`.

8. **Landing Page:** This is a new page at `/`. Create `LandingPage.jsx` with all 6 sections as separate sub-components for maintainability.

9. **Toast Notifications:** Style `react-hot-toast` with dark theme — bg-[#0C342C], text-cream, border-emerald.

10. **All existing functionality stays the same** — only the visual layer changes. Do NOT modify API calls, auth logic, form validation, or routing structure.

---

*This spec transforms SmartSpend from a generic indigo/white UI to a premium dark fintech aesthetic inspired by modern banking interfaces like Meco.*
