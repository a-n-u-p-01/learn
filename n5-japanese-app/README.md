# N5 日本語 — Learn Japanese (JLPT N5) · Cloud Sync

A minimal, dark, single-file React app for studying the JLPT N5: complete kana,
core kanji, themed vocabulary, grammar, audio pronunciation, **spaced-repetition
review (SRS)**, flashcards, quizzes, and **cross-device cloud sync** via Firebase.
Hash-based routing gives every section a shareable URL.

**Account required, cloud-only:** you must sign in with an email/password account,
and all progress is read from and written to Firestore (no local storage). The app
needs an internet connection — there is no offline/guest mode.

## Daily streak & goal

The Overview shows a 🔥 **streak** (consecutive days you reviewed at least one
card) and an editable **daily review goal** (10/20/30/50) with a today's-progress
bar. Both live in your synced `stats` ({ streak, best, lastActive, goal,
todayDate, todayCount }), so they follow you across devices. Streaks are computed
on your local calendar day and reset if you skip a day.

## Spaced repetition (SRS)

Practice → **Review** is an Anki-style SM-2 scheduler. For each card you grade
**Again / Hard / Good / Easy**, and the app schedules when you'll see it next —
hard cards return in minutes, mastered cards in days/weeks. Each card stores
`{ ease, interval, due, reps, lapses }` inside your synced progress, so the
schedule follows you across devices (merged by latest due date). New cards are
introduced up to 20 per session per deck. **Browse** (free flip-through) and
**Quiz** are still there as separate tabs.

## Just want to use it?

Open **`index.html`** in any modern browser **with an internet connection**.
Create an account (or sign in), and your progress reads/writes directly to the
cloud — open it on any device, sign in, and it's the same data. Audio uses your
device's built-in Japanese text-to-speech voice.

## Host it online (recommended for phone + laptop)

It's a static file — upload `index.html` to any static host:

- **Netlify Drop** — app.netlify.com/drop, drag `index.html` in → instant URL.
- **Vercel** — drag-drop in the dashboard, or `vercel deploy`.
- **Firebase Hosting** — `firebase init hosting` then `firebase deploy`.
- **GitHub Pages** — commit `index.html`, enable Pages.

Email/password login works from any of these (and even from a local file).

## Cloud setup (already wired to a Firebase project)

This build is configured with a Firebase web config (in `build.cjs`). It uses:
- **Firebase Authentication** — Email/Password sign-in.
- **Cloud Firestore** — one document per user at `progress/{uid}` holding
  `{ data: { known, best }, updatedAt }`.

The Firebase SDK loads from Google's CDN (`www.gstatic.com`) at runtime, and all
progress is stored only in Firestore (no localStorage). Sign-in and saving require
an internet connection; if the account service can't be reached, the app shows a
"Can't reach sign-in" screen instead of letting you in.

The Firebase web config is **public by design**; your data is protected by these
Firestore security rules (set in the Firebase console → Firestore → Rules):

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

To point this at a **different** Firebase project, edit `FIREBASE_CONFIG` in
`build.cjs` and rebuild.

## Project structure

```
index.html          ← built, ready-to-use app (open or host this)
src/
  app.jsx           ← React app: auth, cloud sync, UI, flashcards, quiz
  styles.css        ← dark visual system
  data/             ← kana.js, kanji.js, vocab.js, grammar.js
build.cjs           ← build: inlines React + Firebase, transpiles JSX → dist/index.html
verify.cjs          ← validation: server-renders every view to catch errors
vendor/             ← React, ReactDOM, Babel (inlined at build)
                      Firebase loads from Google's CDN at runtime (keeps the HTML clean)
```

## Rebuild from source

No `npm install` needed — all libraries are vendored:

```bash
node build.cjs      # writes dist/index.html
node verify.cjs     # server-renders every view to confirm no runtime errors
```

## How sync works

On sign-in the app loads your Firestore doc and merges it with the local cache
(known cards are unioned, best quiz scores take the max). Every change saves to
localStorage instantly and pushes to Firestore (debounced). Offline edits are
kept locally and sync up next time you're online and signed in.

頑張って！ (Good luck!)
