# N5 日本語 — Learn Japanese from Zero (React + Vite)

A complete JLPT N5 study app built with **React 18** and **Vite**: kana, kanji,
640 vocabulary words, 41 grammar points, numbers/time/counters, flashcards,
spaced-repetition review, quizzes (kana / vocab / kanji / listening / grammar),
reading passages, a timed mock exam with history, text-to-speech audio, a daily
"Today" plan with streaks, and cross-device cloud sync via Firebase
(Email/Password login).

## Run it

```bash
npm install
npm run dev        # start the dev server (Vite prints a local URL)
```

Then open the URL Vite prints (usually http://localhost:5173).

Build for production:

```bash
npm run build      # outputs static files to dist/
npm run preview    # preview the production build locally
```

Deploy the contents of `dist/` to any static host (Firebase Hosting, Netlify,
Vercel, GitHub Pages, …).

> An account + internet connection are required — progress is saved to your
> Firebase account and synced across devices (there is no local-only mode).

## Project structure

```
index.html              Vite entry
vite.config.js
src/
  main.jsx              mounts <Root/>
  app.jsx              the whole app (components, routing, SRS, cloud sync)
  styles.css           dark theme
  firebase-config.js   your Firebase client config
  data/                kana, kanji, vocab, grammar, grammar quiz, reading, numbers
```

## Use your own Firebase project

`firebase-config.js` ships with a public Firebase **client** config (safe to
embed). To use your own database:

1. Create a Firebase project, enable **Email/Password** auth and **Cloud
   Firestore**.
2. Paste your web app's config into `src/firebase-config.js`.
3. Use Firestore rules that restrict each user to their own document:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /progress/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```
