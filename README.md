# 🌿 Digital Life Lessons — Client Application

<div align="center">
  <h3>✨ A Modern Editorial Wisdom-Sharing & Mindset Journaling Platform</h3>
  <p>Crafted with a blend of Medium, Notion, and Linear aesthetics. Designed for mindful reflection, personal insight preservation, and community growth.</p>
  
  <p>
    <a href="https://digital-life-lessons-client-side.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
    <a href="https://digital-life-lessons-server-side.onrender.com" target="_blank">
      <img src="https://img.shields.io/badge/API_Server-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render API" />
    </a>
  </p>
</div>

---

## 🚀 Live Links & Credentials

- **Live Frontend (Vercel):** [https://digital-life-lessons-client-side.vercel.app/](https://digital-life-lessons-client-side.vercel.app/)
- **Live API Engine (Render):** [https://digital-life-lessons-server-side.onrender.com/](https://digital-life-lessons-server-side.onrender.com/)
- **Primary Administrator Credentials:**
  - **Email:** `admin@digitallife.com`
  - **Password:** `adminADMIN`

---

## 🎨 Tech Stack & Libraries

- **Framework:** React 18 (Vite SPA)
- **Styling & Design System:** Tailwind CSS v3 with custom HSL palette & dark mode tokens
- **Animations & Micro-interactions:** Framer Motion
- **Icons:** Lucide React
- **Data Visualization & Analytics:** Recharts (Interactive Stacked Ratio & Area Charts)
- **Authentication:** Firebase Auth (Google Sign-In + Email/Password) + MongoDB Atlas sync
- **Payments:** Stripe SDK (`@stripe/stripe-js`)
- **Routing:** React Router v6 with automatic scroll restoration & ErrorBoundary protection

---

## ✨ Key Features & User Experience

### 1. 🌟 VIP & Role Distinction
- **Platform Administrator (`admin@digitallife.com`):** Soft crimson glowing avatar aura with `🛡️` Shield badge, access to the full Management Panel, and subtle homepage aura.
- **Lifetime Premium VIP Members:** Golden glowing avatar aura (`⭐` badge), unrestricted access to locked wisdom lessons, and ambient gold homepage glow.
- **Free Members:** Clean member workspace, public lesson reading, bookmarking, and liking.

### 2. 📖 Editorial Public Features
- **Hero Slider:** Auto-cycling editorial wisdom showcase.
- **Daily Wisdom Widget:** Daily mental model quote generator with shuffle capability.
- **Interactive Filtering & Search:** Category pills (*Personal Growth, Career, Relationships, Mindset, Mistakes Learned*), emotional tones (*Motivational, Sad, Realization, Gratitude*), and sort modes (*Newest, Most Saved*).
- **Article Reader View (`/lessons/:id`):** 
  - Dynamic Reading Time calculation.
  - Sticky Reading Progress Bar.
  - Interactive Like Bounce (with Framer Motion heart bursts) and Favorite toggle.
  - In-browser PDF Export / Print.
  - Share modal & Content Report modal.
  - Community comment threads.
  - 6 Related Lesson Recommendations.
- **Creator Public Profiles (`/author/:id`):** Author spotlight showing verified stats, total likes, saves, and published catalogue.

### 3. 📊 Interactive Member & Admin Workspaces
- **Member Workspace (`/dashboard`):**
  - **Metrics:** Authored lessons, saved bookmarks, reactions received, and consistency streak.
  - **20-Week Reflection Activity Heatmap:** GitHub-style daily journaling frequency tracker.
  - **Weekday Reflection Analytics:** Smooth Recharts AreaChart.
  - **Lesson Management:** Full CRUD (Create, Edit, Delete, Toggle Public/Private).
- **Platform Management Panel (`/dashboard/admin`):**
  - **Interactive Ratio Graphs with `<` and `>` Pagination:**
    - **Content Analytics:** Stacked ratio bars showing Public vs. Premium lessons. Supports Days mode (3-day stepping) & Months mode (1-month stepping).
    - **User Demographics:** Stacked ratio bars showing Free Members vs. Premium Subscribers.
  - **Manage All Lessons (`/dashboard/admin/lessons`):** Toggle Featured status or permanently delete.
  - **Manage Users (`/dashboard/admin/users`):** Real-time MongoDB Atlas member registry with role promotions/demotions and account deletion.
  - **Reported Lessons (`/dashboard/admin/reports`):** Flagged content queue with resolution actions.

---

## 💻 Local Development Setup

### 1. Clone & Install
```bash
git clone https://github.com/ibtee12/digital-life-lessons-client-side-.git
cd digital-life-lessons-client-side-
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root of the client project:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🚢 Deployment to Vercel

1. Push your repository to GitHub.
2. Go to **[Vercel](https://vercel.com)** ➔ Import Git Repository.
3. Set Environment Variables matching your `.env` file.
4. Set `VITE_API_URL` to your live Render backend URL (`https://your-server.onrender.com/api`).
5. Click **Deploy**.
6. *(Important)* Add your Vercel URL to **Firebase Console ➔ Authentication ➔ Settings ➔ Authorized Domains**.

---

<div align="center">
  <sub>Built with ❤️ for thoughtful thinkers and continuous learners.</sub>
</div>
