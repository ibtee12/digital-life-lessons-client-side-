# 🌿 Digital Life Lessons — Client Side Application

> A modern, editorial wisdom-sharing platform (Medium + Notion + Linear aesthetic) designed for mindful reflection, personal insight preservation, and community growth.

---

## 🌟 Key Architecture & Features

### 1. Design Philosophy & System Tokens
- **Color Tokens**: Primary Emerald (`#059669`), Teal (`#0D9488`), Light Theme BG (`#FAFAF9`), Dark Theme BG (`#0C0A09`), and Premium Gold (`#F59E0B`).
- **Typography & Grid**: Strict 4px spacing scale, Inter font family, 65ch prose article reading width.
- **Theme Persistence**: Instant light/dark mode switcher with system preference detection and `localStorage` persistence.

### 2. Interactive Navigation & Micro-Interactions
- **Navbar (`Navbar.jsx`)**: 72px fixed height, scrolled glassmorphism backdrop blur, active route dot indicator, notification bell with unread count, and live Evaluator Mode role switcher (Free / Premium / Admin / Logged Out).
- **Command Palette (`CommandPalette.jsx`)**: Instant global search modal triggered via `Cmd+K` / `Ctrl+K` with auto-focus and route jump actions.
- **Scroll-To-Top (`ScrollToTop.jsx`)**: Floating button with animated SVG circular progress ring tracking viewport scroll depth.
- **Micro-Animations**: Framer Motion heart burst particles on like actions (`HeartBurst.jsx`), sticky scroll reading progress bar (`ReadingProgressBar.jsx`), and 5-second auto-rotating hero slider (`HeroSlider.jsx`).

### 3. Public Platform & Editorial Views
- **Home Page (`HomePage.jsx`)**: Hero slider, Daily Wisdom mental model quote shuffle widget (`DailyQuoteWidget.jsx`), Featured Wisdom showcase, 4 Benefit Cards, Top Contributors, and Most Saved Lessons.
- **Public Lessons (`LessonsPage.jsx`)**: Full-width search bar, category pills (*Personal Growth, Career, Relationships, Mindset, Mistakes Learned*), emotional tone pills (*Motivational, Sad, Realization, Gratitude*), sorting (*Newest, Most Saved*), and pagination.
- **Lesson Details View (`LessonDetailPage.jsx`)**: 16/9 hero image, reading time calculator, dedicated Author Card, engagement bar (like bounce, save to favorites, report modal, share modal, PDF export), comments discussion thread, and 6 recommended lesson cards.
- **Public Creator Profile (`CreatorPublicProfile.jsx`)**: Dedicated author page (`/author/:id`) showcasing verified badges, total community likes, saves, and published lesson cards.
- **Gated Premium Experience**: Free users view blurred lock overlays with upgrade prompts, while keeping titles and metadata visible.

### 4. Dashboards & System Pages
- **User Dashboard (`/dashboard`)**: 280px sidebar, overview metrics, Recharts reflection analytics, 20-week **Activity Heatmap & Streak Tracker** (`ActivityHeatmap.jsx`), Add Lesson with disabled premium tooltips for free users, My Lessons with Custom Emerald Switch Toggle (`Public`/`Private`), My Favorites, and Profile.
- **Admin Dashboard (`/dashboard/admin`)**: Platform analytics growth graphs, Manage Users panel (promote/delete), Manage Lessons panel (toggle featured homepage status), and Reported Content moderation panel with modal reason logs.
- **Help & Feedback Modal (`HelpSupportModal.jsx`)**: Editorial feedback submission modal accessible from the footer.
- **404 Not Found (`NotFoundPage.jsx`)**: Clean 120px typography layout without navbar/footer.

---

## 📦 Packages Used

- `react` & `react-dom` (^18.3.1)
- `react-router-dom` (^6.28.0)
- `framer-motion` (^11.11.17)
- `lucide-react` (^0.460.0)
- `recharts` (^2.13.3)
- `clsx` & `tailwind-merge`
- `tailwindcss` (^3.4.15) & `autoprefixer`
- `vite` (^5.4.11)

---

## 🚀 Setup & Local Development

1. **Clone repository**:
   ```bash
   git clone https://github.com/ibtee12/digital-life-lessons-client-side-.git
   cd digital-life-lessons-client-side-
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build production bundle**:
   ```bash
   npm run build
   ```
