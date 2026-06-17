# JobTrack — Job Application Tracker (React + Firebase PWA)

A production Progressive Web App for tracking job applications, with a **live,
global directory of verified companies** to find where to apply next. Built with
**React + Vite + React Router + Firebase (Auth + Firestore)**.

- **Email/password authentication** with protected routes
- Per-user application tracker (CRUD) synced in real time with Cloud Firestore
- **Companies** directory — 225 curated companies across 26 countries that hire backend/full-stack talent:
  - Global coverage (US, India, Japan, Korea, Europe, Israel, SE Asia, LatAm, Middle East, Africa)
  - Real company **logos** (DuckDuckGo + Google favicon, with a clean monogram fallback)
  - Filter by **country** and by **stack** (Java, Spring Boot, React, DevOps, Cloud…), numbered pagination
  - Instant search, plus an optional live "worldwide directory" lookup (Wikidata)
  - One-click **"Track"** to add a company to your tracker
- Light **and** dark theme (remembers your choice, follows system preference)
- Installable **PWA** with offline app-shell caching
- Firestore security rules so every user sees only their own data
- Top-level error boundary, loading/empty states, responsive layout

---

## 1. Install & run

```bash
npm install
npm run dev
```

The app requires a Firebase project. Until you add one (next step), it shows a
short **"Connect Firebase"** setup screen instead of the login form.

---

## 2. Configure Firebase

### a. Create the project
1. [Firebase Console](https://console.firebase.google.com/) → **Add project**.
2. Click the **Web** icon (`</>`) to register a web app and copy its `firebaseConfig`.

### b. Add your config
```bash
cp .env.example .env
```
Fill in the values in `.env`:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
Restart `npm run dev`. The login screen now appears and auth/data are live.

### c. Enable Authentication
Firebase Console → **Build → Authentication → Get started** → enable
**Email/Password**.

### d. Create Firestore + publish rules
Firebase Console → **Build → Firestore Database → Create database** (Production mode).
Publish the included [`firestore.rules`](./firestore.rules) (paste into the Rules tab,
or `firebase deploy --only firestore:rules`). They enforce:
```
match /users/{userId}/applications/{appId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

### e. Authorize your domain
Authentication → **Settings → Authorized domains** — add your production domain
(`localhost` is already allowed).

---

## 3. Build & deploy

```bash
npm run build      # → dist/
npm run preview    # preview the production build
```
Deploy to **Firebase Hosting** (config included):
```bash
npm i -g firebase-tools && firebase login
firebase use --add
firebase deploy
```
Also deploys cleanly to **Vercel / Netlify** — set the same `VITE_FIREBASE_*`
env vars and add an SPA fallback to `index.html`.

---

## 4. Company directory

The **Companies** page ships with a curated set of **225 companies across 26 countries**
that actively hire backend / full-stack engineers (`src/data/companies.js`) — strong India
coverage (CRED, Groww, Razorpay, Swiggy, Zerodha, Freshworks, Zoho…) plus global product,
fintech, DevOps and IT-services employers (US, Europe, Israel, SE Asia, LatAm, Middle East,
Africa). Loads instantly, no API wait, no junk.

- **Logos**: each card shows the real company logo using a fallback chain —
  DuckDuckGo's icon service, then Google's favicon service (both free, no key), then a
  tasteful colored monogram. ~98% of companies render a real logo; the brand domain is
  derived smartly from the careers URL (e.g. `flipkartcareers.com → flipkart.com`).
- **Browse + pagination**: 12 per page with numbered pagination.
- **Country filter**: India, US, Japan, UK, Germany, Israel, and more (chips auto-generated).
- **Stack filter**: Java, Spring Boot, React, DevOps, Cloud, Kubernetes, Microservices…
  Each card shows the stacks that company hires for.
- **Search**: instant, over name, industry, country and stack.
- **Search the worldwide directory** (optional): when a company isn't in the curated
  list, one click runs a live lookup against Wikidata's EntitySearch to reach the long
  tail — kept on-demand so the default view stays fast.

> Tuning: add or remove entries in `src/data/companies.js`; the country chips and
> counts update automatically.

---

## 5. Data model

```
users/{uid}/applications/{appId}
  company   string (required)   role     string
  status    Wishlist|Applied|Interviewing|Offer|Rejected
  date      string (YYYY-MM-DD) location string
  salary    string              url      string
  notes     string              createdAt timestamp
```

---

## 6. Project structure

```
src/
├─ main.jsx              # providers (ErrorBoundary, Theme, Auth, Toast, Router)
├─ App.jsx               # routes
├─ firebase.js           # init + isFirebaseEnabled
├─ index.css             # design tokens + light/dark themes
├─ context/              # ThemeContext, AuthContext (email/password)
├─ services/
│  ├─ applications.js    # Firestore CRUD
│  └─ companies.js       # optional live "worldwide directory" search (Wikidata)
├─ hooks/                # useApplications
├─ data/                 # companies.js (225 curated companies + stack tags)
├─ components/           # Navbar, modals, CompanyCard, ErrorBoundary, icons…
└─ pages/                # Login, Dashboard, Companies, NotFound
```

## 7. Tech stack
React 18 · Vite 5 · React Router 6 · Firebase 10 (Auth + Firestore) ·
vite-plugin-pwa (Workbox) · Wikidata SPARQL · plain CSS custom properties.
