# Digital Life Lessons — Design System & Specifications

## 1. Design Philosophy
- **Style**: Modern, clean, editorial-inspired (like Medium + Notion + Linear)
- **Vibe**: Warm, reflective, trustworthy, premium
- **Quality**: No "gobindo design" — every pixel intentional, feeling like a $10,000 ThemeForest template.
- **Accents**: Subtle gradients, glassmorphism accents, and smooth micro-interactions.

## 2. Color System

### Light Theme (Default)
- **Background Primary**: `#FAFAF9` (warm off-white)
- **Background Secondary**: `#F5F5F4` (slightly darker)
- **Background Card**: `#FFFFFF`
- **Background Elevated**: `#FFFFFF` with shadow
- **Text Primary**: `#1C1917` (warm black)
- **Text Secondary**: `#78716C` (warm gray)
- **Text Muted**: `#A8A29E`
- **Border**: `#E7E5E4`
- **Border Light**: `#F5F5F4`

### Dark Theme
- **Background Primary**: `#0C0A09`
- **Background Secondary**: `#1C1917`
- **Background Card**: `#292524`
- **Background Elevated**: `#292524`
- **Text Primary**: `#FAFAF9`
- **Text Secondary**: `#A8A29E`
- **Text Muted**: `#78716C`
- **Border**: `#44403C`
- **Border Light**: `#292524`

### Accent Colors (Both Themes)
- **Primary Brand**: `#059669` (emerald — growth/wisdom)
- **Primary Brand Hover**: `#047857`
- **Primary Brand Light**: `#D1FAE5`
- **Secondary Accent**: `#0D9488` (teal)
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`
- **Success**: `#10B981`
- **Premium Gold**: `#F59E0B` (for premium badges/accents)

### Gradients & Glows
- **Hero Gradient**: `linear-gradient(135deg, #059669 0%, #0D9488 50%, #0891B2 100%)`
- **Card Hover Glow**: `0 20px 25px -5px rgba(5, 150, 105, 0.1), 0 10px 10px -5px rgba(5, 150, 105, 0.04)`
- **Premium Glow**: `0 0 20px rgba(245, 158, 11, 0.3)`

## 3. Typography
- **Font Family**: `'Inter', system-ui, -apple-system, sans-serif`
- **Headings**: Weight 700-800, letter-spacing `-0.02em`
- **Body**: Weight 400-500, line-height 1.65
- **Labels/Small**: Weight 500, uppercase, letter-spacing `0.05em`
- **Scale**:
  - H1: 48px/56px (mobile: 32px/40px)
  - H2: 36px/44px (mobile: 28px/36px)
  - H3: 24px/32px
  - H4: 20px/28px
  - Body Large: 18px/28px
  - Body: 16px/24px
  - Small: 14px/20px
  - Tiny: 12px/16px

## 4. Spacing System
4px base grid (`xs: 4px`, `sm: 8px`, `md: 16px`, `lg: 24px`, `xl: 32px`, `2xl: 48px`, `3xl: 64px`, `4xl: 96px`).
- Section padding: 80px vertical (mobile: 48px)
- Container max-width: 1280px centered
- Container padding: 16px (mobile), 24px (tablet), 32px (desktop)

## 5. Component Specifications
- **Buttons**: Primary `#059669`, Hover `#047857`, Active `scale(0.98)`, Secondary transparent with `#E7E5E4` border, Ghost `#059669` text with `#D1FAE5` hover bg, Premium CTA gold gradient with shadow glow.
- **Cards**: Generous 16px border-radius, equal height stretch alignment, hover `translateY(-4px)` with Emerald glow shadow, 24px padding.
- **Inputs**: 44px min height, 8px rounded, focus `#059669` border and `#D1FAE5` ring.
- **Badges**: Category (`#F5F5F4` / `#57534E`), Emotional Tone (4px left border: Motivational `#059669`/`#ECFDF5`, Sad `#6366F1`/`#EEF2FF`, Realization `#F59E0B`/`#FFFBEB`, Gratitude `#EC4899`/`#FDF2F8`), Premium (`#FFFBEB`/`#B45309` gold), Free (`#ECFDF5`/`#047857`).
- **Navigation**: 72px height, backdrop blur on scroll, emerald leaf logo, active indicator dot, responsive mobile drawer.
- **Footer**: Always dark `#1C1917`, `#A8A29E` links, X logo for Twitter/X.

## 6. Page Specifications
- **Home**: Hero Slider (5s autoplay, 3 slides, dots), Featured Wisdom (3-col equal height cards, ribbon, accent line), Why Learning Matters (4 cards with icons), Top Contributors & Most Saved.
- **Public Lessons**: Search bar (rounded-full max-w-2xl), Category & Emotional tone filter pills, Sort dropdown, Premium locked overlay (blur, gold border, lock icon, "Upgrade to View").
- **Lesson Details**: Article layout max-w 800px, 16/9 hero image, H1, Author & metadata, Prose content, Engagement bar (Heart scale animation, Bookmark, Report, Share), Comments thread, Author card.
- **Dashboard**: 280px sidebar, stats cards 4-col, Recharts charts, My Lessons table with custom switch toggle, Create/Edit forms.
- **Pricing**: Side-by-side Free vs Premium (gold glow, ৳1500 lifetime CTA, feature list with icons), payment status indicators.
- **Auth (Login/Register)**: Split layout, Google button, live password requirements checklist.
- **404 Page**: 120px text, Lucide broken pencil/book icon, "This lesson hasn't been written yet".

## 7. Quality & Interactive Rules
- Dark Mode toggle on all pages
- Framer Motion page transitions & scroll animations
- Sonner Toast notifications
- Equal card height in grid layouts
- Free vs Premium user state switching for live demonstration
