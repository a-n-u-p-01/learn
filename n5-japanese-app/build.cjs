const fs = require('fs');
const vm = require('vm');

const read = p => fs.readFileSync(p, 'utf8');

// @babel/standalone UMD won't populate CommonJS exports cleanly; run it in a
// VM sandbox so it attaches Babel to the context's global object.
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(read('vendor/babel.min.js'), sandbox);
const Babel = sandbox.Babel;
if (!Babel || typeof Babel.transform !== 'function') {
  throw new Error('Babel standalone failed to load');
}

const react = read('vendor/react.production.min.js');
const reactDom = read('vendor/react-dom.production.min.js');
const css = read('src/styles.css');

// Firebase compat SDK is loaded from the official CDN (script src), NOT inlined:
// the minified bundles contain raw control characters that strict HTML parsers
// (parse5, used by many build/deploy/dev tools) reject. CDN keeps the HTML clean
// and parseable, and Firebase still works when the file is opened locally or hosted.
const FB_VER = '12.15.0';
const FB_CDN = 'https://www.gstatic.com/firebasejs/' + FB_VER;
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAWW_myFQx3mn1_ON0ZwFAGfF87UX-qZzI",
  authDomain: "n5-app.firebaseapp.com",
  projectId: "n5-app",
  storageBucket: "n5-app.firebasestorage.app",
  messagingSenderId: "667102532272",
  appId: "1:667102532272:web:4ef887b4400045f0626175"
};
const data = ['kana','kanji','vocab','grammar','grammarq','reading'].map(n => read('src/data/'+n+'.js')).join('\n');
const appSrc = read('src/app.jsx');

const appJs = Babel.transform(appSrc, { presets: ['react'], compact: false }).code;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
<title>N5 日本語 — Learn Japanese from Zero</title>
<meta name="description" content="A minimal, dark study app for the JLPT N5: kana, kanji, vocabulary, grammar, flashcards and quizzes."/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet"/>
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<script src="${FB_CDN}/firebase-app-compat.js"></script>
<script src="${FB_CDN}/firebase-auth-compat.js"></script>
<script src="${FB_CDN}/firebase-firestore-compat.js"></script>
<script>window.FIREBASE_CONFIG = ${JSON.stringify(FIREBASE_CONFIG)};</script>
<script>${react}</script>
<script>${reactDom}</script>
<script>${data}</script>
<script>${appJs}</script>
</body>
</html>`;

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('Built dist/index.html — ' + (html.length/1024).toFixed(1) + ' KB');
