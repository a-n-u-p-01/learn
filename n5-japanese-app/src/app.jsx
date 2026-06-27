import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { LEVELS, LEVEL_ORDER } from './levels/registry.js';

/* ---------- helpers ---------- */
function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
const cx = (...a)=>a.filter(Boolean).join(' ');

/* ---------- hash routing ---------- */
const VIEWS = ['home','kana','kanji','vocab','grammar','numbers','practice'];
function parseHash(){
  let h=''; try{ h = window.location.hash || ''; }catch(e){}
  h = h.replace(/^#\/?/,'');
  const parts = h.split('/').filter(Boolean);
  const view = VIEWS.indexOf(parts[0])>=0 ? parts[0] : 'home';
  return { view, sub: parts[1]||'', sub2: parts[2]||'' };
}
function useHashRoute(){
  const [route,setRoute] = useState(parseHash);
  useEffect(()=>{
    const on=()=>setRoute(parseHash());
    try{ window.addEventListener('hashchange',on); }catch(e){}
    return ()=>{ try{ window.removeEventListener('hashchange',on); }catch(e){} };
  },[]);
  const navigate = useCallback((view,sub,sub2)=>{
    const target = '#/'+view+(sub?('/'+sub):'')+(sub&&sub2?('/'+sub2):'');
    try{ if(window.location.hash!==target) window.location.hash=target; else setRoute(parseHash()); }
    catch(e){ setRoute({view, sub:sub||'', sub2:sub2||''}); }
  },[]);
  return [route, navigate];
}

/* ===== CLOUD:MODULAR — modular Firebase SDK (Vite build) ===== */
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { FIREBASE_CONFIG } from './firebase-config.js';
const cloud = {
  ok: false,
  auth: null,
  db: null,

  init() {
    try {
      if (!FIREBASE_CONFIG || !FIREBASE_CONFIG.apiKey) return;
      const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
      this.auth = getAuth(app);
      this.db = getFirestore(app);
      this.ok = true;
    } catch (e) {
      this.ok = false;
    }
  },

  // Ensure db is initialised before any operation
  _ensure() {
    if (!this.ok || !this.db) {
      this.init();
    }
    return this.ok && this.db;
  },

  onAuth(cb) {
    try {
      this._ensure();
      return onAuthStateChanged(this.auth, cb);
    } catch (e) {
      return function () {};
    }
  },

  signInGoogle() {
    this._ensure();
    if (!this.ok) return Promise.reject(new Error('Firebase not initialised'));
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  },

  signOut() {
    try {
      if (this.auth) return fbSignOut(this.auth);
    } catch (e) {}
  },

 load(uid) {
  if (!this._ensure()) return Promise.reject(new Error('Firestore not initialised'));
  return getDoc(doc(this.db, 'progress', uid)).then(snap => {
    if (!snap.exists()) return null;
    return {
      version: snap.data().version || 0,
      data: snap.data().data || {}
    };
  });
},

save(uid, data, version) {
  if (!this._ensure()) return Promise.reject(new Error('Firestore not initialised'));
  return setDoc(
    doc(this.db, 'progress', uid),
    {
      version: version || 0,
      updatedAt: serverTimestamp(),  // <-- Firebase server time
      data: data || {}
    },
    { merge: true }
  );
},
  subscribe(uid, cb) {
    if (!this._ensure()) return function () {};
    return onSnapshot(
      doc(this.db, 'progress', uid),
      snap => {
        if (snap.metadata && snap.metadata.hasPendingWrites) return;
        cb(snap.exists() ? snap.data().data || null : null);
      },
      () => {}
    );
  }
};
/* ===== /CLOUD ===== */
/* ---------- local store (guest-first; the app works with no account) ---------- */
const GUEST_KEY = 'nihongo_guest_v1';
function lsGet(k){ try{ return JSON.parse(window.localStorage.getItem(k)||'null'); }catch(e){ return null; } }
function lsSet(k,v){ try{ window.localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function lsDel(k){ try{ window.localStorage.removeItem(k); }catch(e){} }
function userKey(uid){ return 'nihongo_u_'+uid; }
function getCachedPhoto(uid) {
  return lsGet('photo_' + uid) || null;
}

/* ---------- progress (cloud only — Firestore is the single source of truth) ---------- */
function mergeProg(a,b){
  a=a||{known:{},best:{},srs:{}, reading:{}};
  b=b||{known:{},best:{},srs:{}, reading:{}};
  const known=Object.assign({},a.known); const bk=b.known||{};
  for(const d in bk){ known[d]=Object.assign({}, known[d]||{}, bk[d]||{}); }
  const best=Object.assign({},a.best); const bb=b.best||{};
  for(const m in bb){ best[m]=Math.max(best[m]||0, bb[m]||0); }
  const srs=Object.assign({}, a.srs); const bs=b.srs||{};
  for(const d in bs){ const dd=Object.assign({}, srs[d]||{}); const bd=bs[d]||{};
    for(const f in bd){ const av=dd[f], bv=bd[f]; dd[f]=(!av || (bv && bv.due>av.due)) ? bv : av; }
    srs[d]=dd; }
  const stats=mergeStats(a.stats,b.stats);
  const mh={}; (a.mockHistory||[]).concat(b.mockHistory||[]).forEach(function(x){ if(x&&x.t!=null) mh[x.t]=x; });
  const mockHistory=Object.keys(mh).map(function(k){return mh[k];}).sort(function(x,y){return x.t-y.t;}).slice(-50);
  const examDate=a.examDate||b.examDate||'';
  const daily=Object.assign({}, a.daily); const bd=b.daily||{};
  for(const d in bd){ daily[d]=Object.assign({}, daily[d]||{}, bd[d]||{}); }
  const secA=a.secStats||{}, secB=b.secStats||{}, secStats={};
  Object.keys(secA).concat(Object.keys(secB)).forEach(function(k){ const aa=secA[k]||[], bb=secB[k]||[]; secStats[k]=(aa.length>=bb.length?aa:bb).slice(-30); });
  const mk={}; (a.mistakes||[]).concat(b.mistakes||[]).forEach(function(x){ if(x&&x.prompt!=null) mk[(x.section||'')+'|'+x.prompt+'|'+x.correct]=x; });
  const mistakes=Object.keys(mk).map(function(k){return mk[k];}).sort(function(x,y){return (x.t||0)-(y.t||0);}).slice(-100);
  // ---- NEW: merge reading ----
  const reading = Object.assign({}, a.reading||{}, b.reading||{});
  return {known, best, srs, stats, mockHistory, examDate, daily, secStats, mistakes, reading};
}
/* ---------- multi-level document (one Firestore doc per user, progress per level) ---------- */
function migrateDoc(d){
  if(!d) return {levels:{}, activeLevel:'n5'};
  if(d.levels) return { levels:Object.assign({},d.levels), activeLevel:d.activeLevel||'n5' };
  // legacy flat shape ({known,srs,...}) → wrap as the n5 level so existing users keep everything
  if(d.known||d.srs||d.stats||d.best||d.mockHistory||d.examDate||d.daily) return { levels:{ n5:d }, activeLevel:'n5' };
  return {levels:{}, activeLevel:'n5'};
}
function mergeDoc(a,b){
  a=migrateDoc(a); b=migrateDoc(b);
  const levels=Object.assign({}, a.levels);
  for(const k in b.levels){ levels[k]=mergeProg(levels[k], b.levels[k]); }
  return { levels:levels, activeLevel:a.activeLevel||b.activeLevel||'n5' };
}

/* ---------- spaced repetition (SM-2 lite) ---------- */
const DAY_MS = 86400000;
const NEW_PER_DAY = 15;
const REVIEW_BUFFER_DAYS = 10; // pure-review run-up before the exam (new material finishes by exam − this)
const MIN_NEW_PER_DAY = 10;    // never schedule a slower pace than this — a far-off date means you finish early, not crawl
function srsUpdate(s, grade){
  let ease=s?s.ease:2.5, interval=s?s.interval:0, reps=s?s.reps:0, lapses=s?s.lapses:0;
  if(grade==='again'){ 
    lapses = lapses + 1;
    // 🔥 Leech protection: if they've missed it 3 times, drop ease aggressively
    if(lapses >= 3) ease = Math.max(1.3, ease - 0.4); 
    else ease = Math.max(1.3, ease - 0.2);
    return {ease, interval:0, reps:0, lapses, due:Date.now()+60000}; 
  }  if(grade==='hard'){ reps=reps+1; ease=Math.max(1.3,ease-0.15); interval=interval>0?Math.max(1,Math.round(interval*1.2)):1; }
  else if(grade==='easy'){ reps=reps+1; ease=ease+0.15; interval=reps===1?2:Math.round((interval||1)*ease*1.3); }
  else { reps=reps+1; interval=reps===1?1:(reps===2?3:Math.round((interval||1)*ease)); } // good
  interval=Math.min(Math.max(interval,1),365);
  return {ease, interval, reps, lapses, due:Date.now()+interval*DAY_MS};
}
function fmtDays(d){ if(d<1)return '<1d'; if(d<30)return d+'d'; if(d<365)return Math.round(d/30)+'mo'; return Math.round(d/365)+'y'; }
function gradePreview(s, grade){ return grade==='again' ? '~1m' : fmtDays(srsUpdate(s,grade).interval); }
function fmtUntil(ms){ const d=ms-Date.now(); if(d<=0)return 'now'; const m=Math.round(d/60000); if(m<60)return 'in '+m+'m'; const h=Math.round(m/60); if(h<24)return 'in '+h+'h'; return 'in '+Math.round(h/24)+'d'; }
function newIntroducedToday(srsDeck, today){ let n=0; for(const f in srsDeck){ if(srsDeck[f] && srsDeck[f].first===today) n++; } return n; }
function buildQueue(cards, srsDeck, today){
  today = today || dayStr();
  const now=Date.now();
  const due=cards.filter(c=> srsDeck[c.front] && srsDeck[c.front].due<=now).sort((a,b)=>srsDeck[a.front].due-srsDeck[b.front].due);
  // cap NEW cards per local day so the queue counts down and doesn't refill on remount
  const allowance=Math.max(0, NEW_PER_DAY - newIntroducedToday(srsDeck, today));
  const fresh=cards.filter(c=> !srsDeck[c.front]).slice(0, allowance);
  return due.concat(fresh);
}
function dueCount(srs){ const now=Date.now(); let n=0; const s=srs||{}; for(const d in s){ for(const f in s[d]){ if(s[d][f].due<=now)n++; } } return n; }
function remainingNewInDeck(srs, deckId){ const s=(srs||{})[deckId]||{}; const fronts=buildDeck(deckId).map(function(c){return c.front;}); let n=0; for(let i=0;i<fronts.length;i++){ if(!s[fronts[i]])n++; } return n; }
function daysBetween(a,b){ const pa=a.split('-').map(Number), pb=b.split('-').map(Number); return Math.round((new Date(pb[0],pb[1]-1,pb[2]) - new Date(pa[0],pa[1]-1,pa[2]))/86400000); }
// ---- daily-plan math (across all decks) ----
function totalRemainingNew(srs){ let n=0; for(let i=0;i<DECKS.length;i++){ n+=remainingNewInDeck(srs,DECKS[i][0]); } return n; }
function newDoneTodayAll(srs, today){ let n=0; const s=srs||{}; for(let i=0;i<DECKS.length;i++){ n+=newIntroducedToday(s[DECKS[i][0]]||{}, today); } return n; }
// fastest you can introduce every remaining card: each deck is capped at NEW_PER_DAY/day,
// so the floor is the largest single deck (decks can be studied in parallel).
function maxDeckDays(srs){ let m=0; for(let i=0;i<DECKS.length;i++){ m=Math.max(m, Math.ceil(remainingNewInDeck(srs,DECKS[i][0])/NEW_PER_DAY)); } return m; }
function fmtYmd(s){ if(!s) return ''; const p=s.split('-').map(Number); return p[2]+' '+MONTHS[p[1]-1]+' '+p[0]; } // "12 Jun 2026"

/* ---------- daily streak & goal ---------- */
function dayStr(d){ d=d||new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function addDays(str,n){ const p=str.split('-').map(Number); const dt=new Date(p[0],p[1]-1,p[2]); dt.setDate(dt.getDate()+n); return dayStr(dt); }
function bumpStats(stats, today){
  const s=Object.assign({streak:0,best:0,lastActive:'',goal:20,todayDate:'',todayCount:0}, stats||{});
  if(s.todayDate!==today){ s.streak = (s.lastActive===addDays(today,-1)) ? (s.streak||0)+1 : 1; s.todayDate=today; s.todayCount=0; }
  s.todayCount=(s.todayCount||0)+1; s.lastActive=today; s.best=Math.max(s.best||0,s.streak||0);
  return s;
}
// Count due cards in a single deck (flat object { front: card })
function dueCountInDeck(deckSrs) {
  const now = Date.now();
  let n = 0;
  for (const f in deckSrs) {
    if (deckSrs[f].due <= now) n++;
  }
  return n;
}
function effectiveStreak(stats){ if(!stats||!stats.lastActive)return 0; const t=dayStr(); return (stats.lastActive===t||stats.lastActive===addDays(t,-1))?(stats.streak||0):0; }
function mergeStats(a,b){ if(!a)return b||null; if(!b)return a; const base=(a.lastActive>=b.lastActive)?a:b; const out=Object.assign({},base); out.best=Math.max(a.best||0,b.best||0); out.goal=base.goal||a.goal||b.goal||20; if(a.todayDate&&a.todayDate===b.todayDate)out.todayCount=Math.max(a.todayCount||0,b.todayCount||0); return out; }
function useCloudProgress(user, level) {
  const signedIn = !!(user && user.uid);
  const uid = signedIn ? user.uid : null;

  const setDaily = (key, value) => commit(prev => {
  const t = dayStr();
  const daily = Object.assign({}, prev.daily || {});
  const day = Object.assign({}, daily[t] || {});
  day[key] = value;
  daily[t] = day;
  // Keep only last 7 days
  const keys = Object.keys(daily).sort();
  while (keys.length > 7) { delete daily[keys.shift()]; }
  return Object.assign({}, prev, { daily });
});

  // ---- Synchronous local storage read on every render ----
  const getLocalDoc = () => {
    const key = signedIn ? userKey(uid) : GUEST_KEY;
    const d = lsGet(key) || { levels: {}, activeLevel: 'n5' };
    return migrateDoc(d);
  };

  const [doc, setDoc] = useState(getLocalDoc);
  const [connectionStatus, setConnectionStatus] = useState(signedIn ? 'offline' : 'local');

  // ---- Refs ----
  const docRef = useRef(doc);
  useEffect(() => { docRef.current = doc; }, [doc]);

  const dirtyRef = useRef(false);
  const localVersionRef = useRef(0);
  const remoteVersionRef = useRef(0);
  const syncingRef = useRef(false);

  const saveTimer = useRef(null);
  const syncTimer = useRef(null);

  // ---- Persist: local storage only, marks dirty ----
  const persist = (next) => {
    if (signedIn) {
      lsSet(userKey(uid), next);
      dirtyRef.current = true;
    } else {
      lsSet(GUEST_KEY, next);
      setConnectionStatus('local');
    }
  };

  // ---- Commit: updates active level slice ----
  const commit = useCallback((updater) => {
    setDoc(prev => {
      const cur = (prev.levels && prev.levels[level]) || { known: {}, best: {}, srs: {}, reading: {} };      const nextSlice = typeof updater === 'function' ? updater(cur) : updater;
      const levels = Object.assign({}, prev.levels);
      levels[level] = nextSlice;
      const next = Object.assign({}, prev, { levels });
      persist(next);
      return next;
    });
  }, [uid, level, signedIn]);

// ---- SaveWorker (every 5 sec if dirty) ----
useEffect(() => {
  if (!signedIn) return;

  saveTimer.current = setInterval(async () => {
    if (syncingRef.current) return;
    if (!dirtyRef.current) return;

    // 🔥 Skip if offline – keep dirty true so it retries later
    if (!navigator.onLine) {
      setConnectionStatus('offline');
      return;
    }

    syncingRef.current = true;
    setConnectionStatus('syncing');

    try {
      const snapshot = docRef.current;
      if (!snapshot) {
        return;
      }
      const remote = await cloud.load(uid);

      const remoteVersion = remote?.version || 0;
      const localVersion = localVersionRef.current || 0;

      let docToSave = snapshot;
      let newVersion = localVersion + 1;

      if (remote && remoteVersion > localVersion) {
        const merged = mergeDoc(snapshot, migrateDoc(remote.data));

        docRef.current = merged;
        setDoc(merged);
        lsSet(userKey(uid), merged);
        docToSave = merged;
        newVersion = remoteVersion + 1;
      }

      await cloud.save(uid, docToSave, newVersion);

      localVersionRef.current = newVersion;
      remoteVersionRef.current = newVersion;
      setConnectionStatus('synced');

      if (docRef.current !== docToSave) {
        dirtyRef.current = true;
      } else {
        dirtyRef.current = false;
      }
    } catch (err) {
      console.error('[SaveWorker] Save error:', err);
      setConnectionStatus('offline');
    } finally {
      syncingRef.current = false;
    }
  }, 5000);

  return () => clearInterval(saveTimer.current);
}, [signedIn, uid]);

  // ---- SyncWorker (every 30 sec) ----
const checkRemote = useCallback(async () => {
  if (syncingRef.current) return;
  // 🔥 Skip if offline
  if (!navigator.onLine) return;

  try {
    const remote = await cloud.load(uid);
    if (!remote) return;

    remoteVersionRef.current = remote.version;

    if (remote.version <= localVersionRef.current) return;

    const snapshot = docRef.current;
    const merged = mergeDoc(snapshot, migrateDoc(remote.data));

    if (docRef.current === snapshot) {
      docRef.current = merged;
      setDoc(merged);
      lsSet(userKey(uid), merged);
    } else {
      const latestMerged = mergeDoc(docRef.current, migrateDoc(remote.data));
      docRef.current = latestMerged;
      setDoc(latestMerged);
      lsSet(userKey(uid), latestMerged);
    }

    localVersionRef.current = remote.version;
    setConnectionStatus('synced');
  } catch (e) {
    // ignore
  }
}, [uid]);

  useEffect(() => {
    if (!signedIn) return;

    // Check immediately on mount
    checkRemote();

    syncTimer.current = setInterval(checkRemote, 30000);

    return () => clearInterval(syncTimer.current);
  }, [signedIn, uid]);

  // ---- Visibility: poll immediately when tab becomes visible ----
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkRemote();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [checkRemote]);

  // ---- Network status (only UI, no data ops) ----
  useEffect(() => {
    const handleOnline = () => {
      setConnectionStatus(
        dirtyRef.current ? 'syncing' : 'synced'
      );
      checkRemote(); // also check for remote changes
    };
    const handleOffline = () => setConnectionStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (navigator.onLine) {
      setConnectionStatus(dirtyRef.current ? 'syncing' : 'synced');
    } else {
      setConnectionStatus('offline');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkRemote]);

  // ---- Effect: handle user changes (sign‑in / sign‑out) ----
 useEffect(() => {
  if (!signedIn) {
    if (uid) lsDel(userKey(uid));
    const guestDoc = migrateDoc(lsGet(GUEST_KEY) || { levels: {}, activeLevel: 'n5' });
    setDoc(guestDoc);
    setConnectionStatus('local');
    localVersionRef.current = 0;
    remoteVersionRef.current = 0;
    dirtyRef.current = false;
    return;
  }

  const localDoc = migrateDoc(lsGet(userKey(uid)) || { levels: {}, activeLevel: 'n5' });
  setDoc(localDoc);
  setConnectionStatus('syncing');

  if (!cloud.ok) {
    setConnectionStatus('offline');
    return;
  }

  // 🔥 If offline, don't try to load from Firebase
  if (!navigator.onLine) {
    setConnectionStatus('offline');
    return;
  }

  let alive = true;
  const guest = lsGet(GUEST_KEY);

  cloud.load(uid)
    .then(remote => {
      if (!alive) return;
      let merged = localDoc;
      if (remote) {
        merged = mergeDoc(merged, migrateDoc(remote.data));
        localVersionRef.current = remote.version || 0;
        remoteVersionRef.current = remote.version || 0;
      }
      if (guest) merged = mergeDoc(merged, migrateDoc(guest));
      lsSet(userKey(uid), merged);
      setDoc(merged);
      if (guest) lsDel(GUEST_KEY);
      dirtyRef.current = true; // trigger SaveWorker to upload merged data
      setConnectionStatus('synced');
    })
    .catch(() => {
      if (!alive) return;
      setConnectionStatus('offline');
    });

  return () => { alive = false; };
}, [uid, signedIn]);

  // ---- Level preference ----
  const setLevelPref = (lv) => {
    setDoc(prev => {
      const next = Object.assign({}, prev, { activeLevel: lv });
      persist(next);
      return next;
    });
  };

  // ---- All updaters (unchanged, but now they only call commit) ----
  const markKnown = (deck, front) => commit(prev => {
    const d = Object.assign({}, (prev.known || {})[deck] || {});
    if (d[front]) delete d[front];
    else d[front] = 1;
    const known = Object.assign({}, prev.known);
    known[deck] = d;
    return Object.assign({}, prev, { known });
  });

  const setBest = (mode, score) => commit(prev => {
    const best = Object.assign({}, prev.best);
    best[mode] = Math.max(best[mode] || 0, score);
    return Object.assign({}, prev, { best });
  });

 const reviewCard = (deck, front, grade) => commit(prev => {
  const srs = Object.assign({}, prev.srs || {});
  const dd = Object.assign({}, srs[deck] || {});
  const prevCard = dd[front];
  const ns = srsUpdate(prevCard, grade);
  ns.first = (prevCard && prevCard.first) ? prevCard.first : dayStr();
  dd[front] = ns;
  srs[deck] = dd;
  const known = Object.assign({}, prev.known);
  const kd = Object.assign({}, known[deck] || {});
  if (grade !== 'again' && ns.reps >= 2) kd[front] = 1;
  if (grade === 'again') delete kd[front];
  known[deck] = kd;
  const stats = bumpStats(prev.stats, dayStr());

  // --- NEW: increment per‑deck daily review count ---
  const today = dayStr();
  const daily = Object.assign({}, prev.daily || {});
  const day = Object.assign({}, daily[today] || {});
  const key = deck + '_reviewed';
  day[key] = (day[key] || 0) + 1;
  daily[today] = day;

  return Object.assign({}, prev, { known, srs, stats, daily });
});

  const setGoal = (n) => commit(prev => {
    const stats = Object.assign({ streak: 0, best: 0, lastActive: '', goal: 20, todayDate: '', todayCount: 0 }, prev.stats || {});
    stats.goal = Math.max(5, Math.min(200, n));
    return Object.assign({}, prev, { stats });
  });

  const addMockResult = (score, total) => commit(prev => {
    const pct = Math.round(score / (total || 1) * 100);
    const mockHistory = (prev.mockHistory || []).concat([{ t: Date.now(), score, total, pct }]).slice(-50);
    const best = Object.assign({}, prev.best);
    best.mock = Math.max(best.mock || 0, score);
    return Object.assign({}, prev, { best, mockHistory });
  });

  const setExamDate = (d) => commit(prev => Object.assign({}, prev, { examDate: d || '' }));

  const toggleDaily = (key) => commit(prev => {
    const t = dayStr();
    const daily = Object.assign({}, prev.daily || {});
    const day = Object.assign({}, daily[t] || {});
    day[key] = !day[key];
    daily[t] = day;
    const keys = Object.keys(daily).sort();
    while (keys.length > 7) { delete daily[keys.shift()]; }
    return Object.assign({}, prev, { daily });
  });

  const recordAttempt = (section, correct) => commit(prev => {
    if (!section) return prev;
    const ss = Object.assign({}, prev.secStats || {});
    ss[section] = (ss[section] || []).concat([correct ? 1 : 0]).slice(-30);
    return Object.assign({}, prev, { secStats: ss });
  });

  const addMistake = (item) => commit(prev => {
    if (!item || item.prompt == null) return prev;
    const key = (item.section || '') + '|' + item.prompt + '|' + item.correct;
    const list = (prev.mistakes || []).filter(m => ((m.section || '') + '|' + m.prompt + '|' + m.correct) !== key);
    list.push(Object.assign({}, item, { t: Date.now() }));
    return Object.assign({}, prev, { mistakes: list.slice(-100) });
  });

  const clearMistake = (key) => commit(prev => {
    const list = (prev.mistakes || []).filter(m => ((m.section || '') + '|' + m.prompt + '|' + m.correct) !== key);
    return Object.assign({}, prev, { mistakes: list });
  });

  const recordBatch = (attempts, mistakeItems) => commit(prev => {
    const ss = Object.assign({}, prev.secStats || {});
    (attempts || []).forEach(a => {
      if (a.section) ss[a.section] = (ss[a.section] || []).concat([a.ok ? 1 : 0]).slice(-30);
    });
    let list = (prev.mistakes || []).slice();
    (mistakeItems || []).forEach(item => {
      if (item && item.prompt != null) {
        const key = (item.section || '') + '|' + item.prompt + '|' + item.correct;
        list = list.filter(m => ((m.section || '') + '|' + m.prompt + '|' + m.correct) !== key);
        list.push(Object.assign({}, item, { t: Date.now() }));
      }
    });
    return Object.assign({}, prev, { secStats: ss, mistakes: list.slice(-100) });
  });

  // ---- Derived data ----
const prog = useMemo(() => {
  const lvl = (doc.levels && doc.levels[level]) || { known: {}, best: {}, srs: {}, reading: {} };
  // ensure reading exists even if level exists but reading not set
  if (!lvl.reading) lvl.reading = {};
  return lvl;
}, [doc, level]);

const levelDue = useMemo(() => {
  const result = {};
  try {
    (typeof LEVEL_ORDER !== 'undefined' ? LEVEL_ORDER : []).forEach(id => {
      result[id] = dueCount(((doc.levels || {})[id] || {}).srs);
    });
  } catch (e) {}
  return result;
}, [doc]);
const updateProgress = useCallback((updater) => {
  commit(updater);
}, [commit]);
  // ---- Return ----
  return {
    prog,
    signedIn,
    activeLevel: doc.activeLevel,
    levelDue,
    setLevelPref,
    markKnown,
    setBest,
    reviewCard,
    setGoal,
    addMockResult,
    setExamDate,
    toggleDaily,
    recordAttempt,
    addMistake,
    clearMistake,
    recordBatch,
    connectionStatus,
    updateProgress,
    setDaily,
  };
}
/* ---------- voice (Web Speech API) ---------- */
let JA_VOICE = null;
function _loadVoices(){ try{ const vs=window.speechSynthesis.getVoices()||[]; JA_VOICE=vs.filter(v=>v.lang&&v.lang.toLowerCase().indexOf('ja')===0)[0]||null; }catch(e){} }
let speechSupported = false;
// ===== NEW: Voice loading promise =====
let voicesResolve = null;
const voicesReady = new Promise((resolve) => {
  voicesResolve = resolve;
});
let voiceLoadAttempted = false;

function ensureVoicesLoaded() {
  if (voiceLoadAttempted) return voicesReady;
  voiceLoadAttempted = true;
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    voicesResolve();
    return voicesReady;
  }
  const synth = window.speechSynthesis;
  if (synth.getVoices().length > 0) {
    voicesResolve();
    return voicesReady;
  }
  synth.onvoiceschanged = () => {
    voicesResolve();
    synth.onvoiceschanged = null;
  };
  // Fallback: resolve after 3 seconds anyway
  setTimeout(voicesResolve, 3000);
  return voicesReady;
}
// ===== /NEW =====
try{ speechSupported = typeof window!=='undefined' && !!window.speechSynthesis; }catch(e){}
if(speechSupported){ _loadVoices(); try{ window.speechSynthesis.onvoiceschanged=_loadVoices; }catch(e){} }
let _warmed=false;
function warmSpeech(){ if(_warmed||!speechSupported)return; _warmed=true; try{ const u=new SpeechSynthesisUtterance(' '); u.volume=0; window.speechSynthesis.speak(u); }catch(e){} }
async function speak(text, h) {
  if (!speechSupported || !text) return;

  try {
    await ensureVoicesLoaded();

    const synth = window.speechSynthesis;
    if (synth.speaking || synth.pending) synth.cancel();

    // Refresh the Japanese voice after loading
    const voices = synth.getVoices();
    const jaVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('ja'));
    JA_VOICE = jaVoice || null;

    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = 0.85;
    if (JA_VOICE) u.voice = JA_VOICE;

    if (h && h.boundary) u.onboundary = h.boundary;
    if (h && h.end) { u.onend = h.end; u.onerror = h.end; }

    try { synth.resume(); } catch (e) {}
    synth.speak(u);
  } catch (e) {
    console.error('[speak] Error:', e);
  }
}

function SpeakBtn({ text, label, lg }) {
  const [loading, setLoading] = useState(true);
  const [hasOfflineVoice, setHasOfflineVoice] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    let isMounted = true;

    async function initVoice() {
      await ensureVoicesLoaded();
      if (!isMounted) return;

      const voices = window.speechSynthesis.getVoices();
      const jaVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('ja'));
      const hasLocal = jaVoices.some(v => !v.name.toLowerCase().includes('google'));
      setHasOfflineVoice(hasLocal);
      setLoading(false);
    }

    initVoice();

    const update = () => {
      if (!isMounted) return;
      const voices = window.speechSynthesis.getVoices();
      const jaVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('ja'));
      const hasLocal = jaVoices.some(v => !v.name.toLowerCase().includes('google'));
      setHasOfflineVoice(hasLocal);
      setLoading(false);
    };
    window.speechSynthesis.onvoiceschanged = update;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      isMounted = false;
      window.speechSynthesis.onvoiceschanged = null;
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!speechSupported) return null;

  const isDisabled = loading || (!isOnline && !hasOfflineVoice);

  const title = loading
    ? 'Loading voice…'
    : isDisabled
    ? 'Voice unavailable offline'
    : `Play pronunciation${label ? ' for ' + label : ''}`;

  return (
    <button
      className={cx('spk', lg && 'lg', isDisabled && 'spk-disabled')}
      aria-label={title}
      title={title}
      disabled={isDisabled}
      style={{
        opacity: isDisabled ? 0.4 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        pointerEvents: isDisabled ? 'none' : 'auto',
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!isDisabled) speak(text);
      }}
    >
      {loading ? '⏳' : '🔊'}
    </button>
  );
}

/* ---------- active level (content is swapped in by setActiveLevel; same engine for every level) ---------- */
let KANA, KANJI, VOCAB, GRAMMAR, GRAMMARQ, READING, NUMBERS, LEVEL_META;
let KANA_HIRA=[], KANA_KATA=[], TOTAL_CARDS=0, VOCAB_CATS=['All'], DECKS=[], QUIZZES=[], TABS=[];
function setActiveLevel(id){
  const reg = (typeof LEVELS!=='undefined') ? LEVELS : null;
  const L = reg ? (reg[id] || reg[LEVEL_ORDER[0]]) : null;
  if(!L) return;
  LEVEL_META = L;
  KANA=L.kana; KANJI=L.kanji; VOCAB=L.vocab; GRAMMAR=L.grammar; GRAMMARQ=L.grammarq; READING=L.reading; NUMBERS=L.numbers;
  KANA_HIRA = KANA ? [...KANA.hiragana.base,...KANA.hiragana.dakuten,...KANA.hiragana.yoon] : [];
  KANA_KATA = KANA ? [...KANA.katakana.base,...KANA.katakana.dakuten,...KANA.katakana.yoon] : [];
  TOTAL_CARDS = (L.hasKana?(KANA_HIRA.length+KANA_KATA.length):0) + KANJI.length + VOCAB.length + GRAMMAR.length;
  VOCAB_CATS = ['All'].concat(Array.from(new Set(VOCAB.map(function(v){return v.cat;}))));
  DECKS = L.decks;
  QUIZZES = L.hasKana ? [['kana','Kana'],['vocab','Vocab'],['kanji','Kanji'],['listen','Listening'],['grammar','Grammar']]
                      : [['vocab','Vocab'],['kanji','Kanji'],['listen','Listening'],['grammar','Grammar']];
TABS = [['home','Task']].concat(L.hasKana?[['kana','Kana']]:[], [['kanji','Kanji'],['vocab','Vocabulary'],['grammar','Grammar'],['practice','Practice']]);}
function exWord(ex){ return (ex||'').split(' (')[0]; }

/* ---------- nav ---------- */
const NAVICON = {home:'家',kana:'あ',kanji:'漢',vocab:'語',grammar:'文',practice:'練'};
const NAVSHORT = {home:'Home',kana:'Kana',kanji:'Kanji',vocab:'Words',grammar:'Grammar',practice:'Practice'};
const LEVEL_MARK = {'5':'五','4':'四','3':'三','2':'二','1':'一'};
function Nav({ view, navigate, user, onSignIn, onSignOut, connectionStatus, level, setLevel, theme, setTheme }) {
  const [menu, setMenu] = useState(false);
  const signedIn = !!(user && user.uid);
  const mark = LEVEL_MARK[(LEVEL_META.label || '').slice(-1)] || '語';
  const avatar = signedIn ? (user.name || 'U').charAt(0).toUpperCase() : '☺';
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRefLevel = useRef(null);
  const profileDropDownRef = useRef(null);

  // ---- Connection status for UI ----
  const statusClass = signedIn
    ? (connectionStatus === 'syncing' ? 'syncing'
        : connectionStatus === 'synced' ? 'online'
        : 'offline')
    : '';

  const statusText = signedIn
    ? (connectionStatus === 'syncing' ? 'Syncing…'
        : connectionStatus === 'synced' ? 'Synced'
        : 'Offline')
    : 'Saved locally';

  // ---- Click outside to close dropdowns ----
  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && dropdownRefLevel.current && !dropdownRefLevel.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (menu && profileDropDownRef.current && !profileDropDownRef.current.contains(event.target)) {
        setMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, menu]);

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <div className="brand" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>
          <span className="mark">{mark}</span>
          <span>日本語<small>JLPT {LEVEL_META.label}</small></span>
        </div>

        <div className="tabs">
          {TABS.map(([id, label]) => (
            <span key={id} className={cx('tab', view === id && 'on')} onClick={() => navigate(id)}>
              {label}
            </span>
          ))}
        </div>

        <div className="levelsw" ref={dropdownRefLevel} role="combobox" aria-label="JLPT level">
          <button
            className={cx('lvbtn', level && 'on')}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            {LEVELS[level].label}
            <svg className="dropdown-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {isOpen && (
            <div className="lvdropdown-menu">
              {LEVEL_ORDER.map(id => (
                <button
                  key={id}
                  className={cx('lvbtn', 'lvdropdown-item', level === id && 'on')}
                  onClick={() => { setLevel(id); setIsOpen(false); }}
                >
                  {LEVELS[id].label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="prof">
          <button
            className={cx('prof-btn', !signedIn && 'guest')}
            onClick={() => setMenu(m => !m)}
            aria-label="Account menu"
          >
           <span className={cx('ava', signedIn && 'on', statusClass)}>
  {signedIn && user?.photoData ? (
  <img src={user.photoData} alt={user.name || 'User'} />
) : (
  avatar
)}
</span>
            <span className="prof-name">{signedIn ? user.name : 'Guest'}</span>
          </button>

          {menu && (
            <>
              <div className="menu-back" onClick={() => setMenu(false)} />
              <div className="prof-menu" ref={profileDropDownRef}>
                {signedIn ? (
                  <>
                    <div className="who">
                      {user.email}<br />
                      <span className={cx('synctag', statusClass === 'online' ? 'on' : 'off')}>
                        {statusText}
                      </span>
                    </div>
                    <button className="mi" onClick={() => { setTheme(t => t === 'dark' ? 'light' : 'dark'); setMenu(false); }}>
                      {theme === 'dark' ? '☀️' : '🌙'} {theme === 'dark' ? 'Light' : 'Dark'} mode
                    </button>
                    <div className="sep" />
                    <button className="mi" onClick={() => { setMenu(false); navigate('practice'); }}>
                      Continue practicing
                    </button>
                    <button className="mi danger" onClick={() => { setMenu(false); onSignOut(); }}>
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <div className="who">
                      Studying as a guest<br />
                      <span className="synctag">Progress saved on this device</span>
                    </div>
                    <button className="mi" onClick={() => { setTheme(t => t === 'dark' ? 'light' : 'dark'); setMenu(false); }}>
                      {theme === 'dark' ? '☀️' : '🌙'} {theme === 'dark' ? 'Light' : 'Dark'} mode
                    </button>
                    <div className="sep" />
                    <div style={{ padding: '4px 6px 8px' }}>
                      <GoogleBtn onSignIn={onSignIn} label="Sign in to sync" full />
                    </div>
                    <div className="muted" style={{ fontSize: '11.5px', padding: '0 8px 6px', lineHeight: 1.5 }}>
                      Sign in to save your progress and use it on your phone and computer.
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}


function BottomNav({view,navigate}){
  return (
    <nav className="botnav" aria-label="Sections">
      {TABS.map(([id])=>(
        <button key={id} className={cx('botitem',view===id&&'on')} aria-current={view===id?'page':undefined} aria-label={NAVSHORT[id]} onClick={()=>navigate(id)}>
          <span className="bi">{NAVICON[id]}</span>
          <span className="bl">{NAVSHORT[id]}</span>
        </button>
      ))}
    </nav>
  );
}

/* ---------- overview ---------- */
function StreakCard({prog,setGoal}){
  const stats = prog.stats||{};
  const today = dayStr();
  const streak = effectiveStreak(stats);
  const goal = stats.goal||20;
  const todayCount = (stats.todayDate===today) ? (stats.todayCount||0) : 0;
  const gpct = Math.min(100, Math.round(todayCount/goal*100));
  const met = todayCount>=goal;
  return (
    <div className="daily">
      <div className="streak">
        <div className="fire" aria-hidden="true">{streak>0?'🔥':'✦'}</div>
        <div className="sk"><b>{streak}</b><span>day{streak===1?'':'s'} streak</span></div>
        <div className="best">Best<br/><b>{stats.best||0}</b></div>
      </div>
      <div className="goalbox">
        <div className="lab"><span>Today’s reviews{met?' — goal reached 🎉':''}</span><span><b>{todayCount}</b> / {goal}</span></div>
        <div className="pbar"><i className={met?'met':''} style={{width:Math.max(gpct,3)+'%'}}/></div>
        <div className="goalchips"><span className="gl">Daily goal</span>{[10,20,30,50].map(n=>(<button key={n} className={cx('gchip',goal===n&&'on')} onClick={()=>setGoal(n)}>{n}</button>))}</div>
      </div>
    </div>
  );
}
const N4_URL = "https://jlptsensei.com/jlpt-n4-study-material-list/";
function MasteryPanel({pct, known, total, areas}){
  return (
    <section className="block wrap" style={{paddingBottom:0}}>
      <div className="mastery">
        <div className="mhead"><div><div className="ey">Your progress</div><h2>{LEVEL_META.label} mastery</h2></div><div className="mpct">{pct}<span>%</span></div></div>
        <div className="pbar big"><i style={{width:Math.max(pct,2)+'%'}}/></div>
        <div className="msub">{known} of {total} cards mastered · keep reviewing to grow this</div>
        <div className="mareas">
          {areas.map(([label,n,t])=>{ const p=t?Math.round(n/t*100):0; return (
            <div className="marea" key={label}>
              <div className="lab"><span>{label}</span><span>{n}/{t}</span></div>
              <div className="pbar"><i style={{width:Math.max(p,2)+'%'}}/></div>
            </div>
          ); })}
        </div>
      </div>
    </section>
  );
}
function WeakAreas({ prog, setView }) {
  const ss = prog.secStats || {};
  const rows = Object.keys(ss)
    .filter(function (k) { return (ss[k] || []).length > 0; })
    .map(function (k) {
      const arr = ss[k];
      const pct = Math.round(arr.reduce(function (a, b) { return a + b; }, 0) / arr.length * 100);
      return [k, pct, arr.length];
    })
    .sort(function (a, b) { return a[1] - b[1]; });

  if (!rows.length) return null;
  const weak = rows[0];

  // Map section name to [view, sub, sub2]
  const GO = {
    Kana: ['practice', 'quiz', 'kana'],
    Vocabulary: ['practice', 'quiz', 'vocab'],
    Kanji: ['practice', 'quiz', 'kanji'],
    Grammar: ['practice', 'quiz', 'grammar'],
    Listening: ['practice', 'quiz', 'listen'],
    Reading: ['practice', 'reading', ''],
  };

  const target = GO[weak[0]] || ['practice', 'quiz', ''];

  return (
    <section className="block wrap" style={{ paddingTop: 0 }}>
      <div className="mastery">
        <div className="mhead"><div><div className="ey">Recent accuracy</div><h2>Weak areas</h2></div></div>
        <div className="msub">From your most recent answers per section — live exam-readiness, not a lifetime average.</div>
        <div className="mareas">
          {rows.map(function (r) {
            return (
              <div className="marea" key={r[0]}>
                <div className="lab"><span>{r[0]}</span><span>{r[1]}% · {r[2]} ans</span></div>
                <div className="pbar">
                  <i style={{
                    width: Math.max(r[1], 2) + '%',
background: r[1] < 60 ? 'linear-gradient(90deg,var(--accent),var(--accent-2))' : undefined                  }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="examrow" style={{ marginTop: 14 }}>
          <span>📌 Study next: <b>{weak[0]}</b> ({weak[1]}%)</span>
          <button
            className="btn primary sm"
            onClick={function () {
              // target[0] = view, target[1] = sub, target[2] = sub2 (quiz mode)
              setView(target[0], target[1], target[2]);
            }}
          >
            Practice {weak[0]} →
          </button>
        </div>
      </div>
    </section>
  );
}
function readinessScore(prog){
  const known = prog.known||{};
  const knownCount = Object.keys(known).reduce(function(a,k){return a+Object.keys(known[k]||{}).length;},0);
  const mastery = Math.min(100, Math.round(knownCount/Math.max(TOTAL_CARDS,1)*100));
  const recent = (prog.mockHistory||[]).slice(-3);
  const mockAvg = recent.length ? Math.round(recent.reduce(function(a,d){return a+(d.pct||0);},0)/recent.length) : null;
  const ss = prog.secStats||{}; const secs = Object.keys(ss).filter(function(k){return (ss[k]||[]).length>=3;});
  const weakAvg = secs.length ? Math.round(secs.reduce(function(a,k){var arr=ss[k];return a+arr.reduce(function(x,y){return x+y;},0)/arr.length*100;},0)/secs.length) : null;
  var parts=[[mastery,0.5]]; if(mockAvg!=null)parts.push([mockAvg,0.3]); if(weakAvg!=null)parts.push([weakAvg,0.2]);
  var wsum=parts.reduce(function(a,p){return a+p[1];},0);
  return {score:Math.round(parts.reduce(function(a,p){return a+p[0]*p[1];},0)/wsum), mastery:mastery, mockAvg:mockAvg, weakAvg:weakAvg};
}
function ReadinessPanel({prog}){
  const rd=readinessScore(prog);
  const note = rd.score<50?'Early days — build the daily habit.':(rd.score<70?'Getting there — keep drilling weak areas.':(rd.score<85?'Solid — keep reviewing and do mocks.':'Looking exam-ready! 🎉'));
  return (
    <section className="block wrap" style={{paddingTop:0}}>
      <div className="mastery">
        <div className="mhead"><div><div className="ey">Estimated exam readiness</div><h2>Ready for {LEVEL_META.label}?</h2></div><div className="mpct">{rd.score}<span>%</span></div></div>
        <div className="pbar big"><i style={{width:Math.max(rd.score,2)+'%'}}/></div>
        <div className="msub">From mastery {rd.mastery}%{rd.mockAvg!=null?(' · recent mocks '+rd.mockAvg+'%'):''}{rd.weakAvg!=null?(' · recent accuracy '+rd.weakAvg+'%'):''}. {note}</div>
      </div>
    </section>
  );
}
function OtherLevels({levelDue, level, setLevel}){
  if(!levelDue || typeof LEVEL_ORDER==='undefined') return null;
  const others = LEVEL_ORDER.filter(function(id){ return id!==level && (levelDue[id]||0)>0; });
  if(!others.length) return null;
  return (
    <div className="prac-cta" style={{marginTop:18}}>
      <span>🔁 {others.map(function(id){ return LEVELS[id].label+': '+levelDue[id]+' review'+(levelDue[id]===1?'':'s')+' due'; }).join(' · ')}</span>
      <button className="btn primary sm" onClick={function(){ setLevel(others[0]); }}>Switch to {LEVELS[others[0]].label} →</button>
    </div>
  );
}
function NextLevel({pct, setLevel}){
  const ready = pct>=80;
  const cur = LEVEL_META;
  const nextId = cur.next;
  if(nextId && typeof LEVELS!=='undefined' && LEVELS[nextId]){
    const nl = LEVELS[nextId];
    return (
      <section className="block wrap">
        <a className="n4card" href="#" onClick={(e)=>{e.preventDefault(); if(setLevel)setLevel(nextId);}} style={{cursor:'pointer'}}>
          <div className="n4info">
            <div className="ey">{ready?"You're ready 🎉":'Next level'}</div>
            <h3>Continue to JLPT {nl.label} <span className="arr">→</span></h3>
            <p>You've mastered {pct}% of {cur.label}. JLPT {nl.label} builds on everything here — more kanji, vocabulary and grammar. Your {nl.label} progress is tracked separately.</p>
          </div>
          <div className="n4badge">{nl.label}</div>
        </a>
      </section>
    );
  }
  return (
    <section className="block wrap">
      <a className="n4card" href="https://jlptsensei.com/" target="_blank" rel="noopener noreferrer">
        <div className="n4info">
          <div className="ey">{ready?"You're ready 🎉":'Keep going'}</div>
          <h3>Beyond JLPT {cur.label} <span className="arr">→</span></h3>
          <p>You've mastered {pct}% of {cur.label}. When you're ready, explore the next JLPT level's material.</p>
        </div>
        <div className="n4badge">{cur.label}</div>
      </a>
    </section>
  );
}
function TodayPanel({ prog, name, setView, toggleDaily, setExamDate }) {
  const srs = prog.srs || {};
  const today = dayStr();
  const daily = (prog.daily || {})[today] || {};

  // --- 1. Compute core numbers ---
  const due = dueCount(srs);
  const totalRemNew = totalRemainingNew(srs);
  const newDone = newDoneTodayAll(srs, today);
  const baseRem = totalRemNew + newDone;
  const mDays = maxDeckDays(srs);
  const exam = prog.examDate || '';
  const dToExam = exam ? daysBetween(today, exam) : null;

  // --- 2. Compute adaptive targetNew ---
  let targetNew = 0, feasible = true, finishInDays = 0, learnByDate = '', slack = 0, minDate = '';
  if (baseRem > 0) {
    if (exam && dToExam !== null) {
      const introduceDays = Math.max((dToExam > 0 ? dToExam : 0) - REVIEW_BUFFER_DAYS, 1);
      targetNew = Math.min(baseRem, Math.max(MIN_NEW_PER_DAY, Math.ceil(baseRem / introduceDays)));
      feasible = dToExam > 0 && mDays <= introduceDays;
    } else {
      targetNew = Math.min(NEW_PER_DAY, baseRem);
    }
    finishInDays = targetNew > 0 ? Math.ceil(baseRem / targetNew) : 0;
    learnByDate = addDays(today, finishInDays);
    slack = (exam && dToExam !== null) ? (dToExam - finishInDays) : 0;
    minDate = exam ? addDays(today, mDays + REVIEW_BUFFER_DAYS) : '';
  }

  const newTaskDone = totalRemNew === 0 || newDone >= targetNew;

  // --- 3. Find best decks for review and new cards ---
  let maxDueDeck = null, maxDue = 0;
  let focusDeck = null;
  DECKS.forEach(([id]) => {
    const deckSrs = srs[id] || {};
    const due = dueCountInDeck(deckSrs);
    if (due > maxDue) { maxDue = due; maxDueDeck = id; }
    if (remainingNewInDeck(srs, id) > 0 && !focusDeck) focusDeck = id;
  });

  // --- 4. Weakest quiz mode ---
  const modeMap = { 'Kana': 'kana', 'Vocabulary': 'vocab', 'Kanji': 'kanji', 'Grammar': 'grammar', 'Listening': 'listen' };
  let weakestMode = 'vocab', lowestAccuracy = 101;
  const ss = prog.secStats || {};
  for (const [section, arr] of Object.entries(ss)) {
    if (arr.length === 0) continue;
    const accuracy = Math.round(arr.reduce((a, b) => a + b, 0) / arr.length * 100);
    if (accuracy < lowestAccuracy && modeMap[section]) {
      lowestAccuracy = accuracy;
      weakestMode = modeMap[section];
    }
  }

  // --- 5. Mistakes ---
  const mistakes = prog.mistakes || [];
  const hasMistakes = mistakes.length > 0;

  // --- 6. Reading progress (all passages completed?) ---
  const readingProgress = prog.reading || {};
  const allPassagesCompleted = READING.every(p => readingProgress[p.id]?.completed === true);
  const readingDone = allPassagesCompleted; // or check if at least one passage was read today? We'll keep simple.

  // --- 7. Mock test progress ---
  const mockDone = !!daily.mock;

  // --- 8. Build task list ---
  const tasks = [];

  // Priority 1: Review
  const reviewDone = due === 0;
  tasks.push({
    id: 'review',
    label: due > 0 ? `Clear ${due} due review${due === 1 ? '' : 's'}` : 'Reviews — all clear',
    done: reviewDone,
    progress: due > 0 ? { done: 0, total: due } : null, // we don't track progress in this task, just done/not
    action: () => setView('practice', 'review', maxDueDeck || ''),
    priority: 1,
    autoComplete: reviewDone,
    type: 'review'
  });

  // Priority 2: New cards (only if review is done or no due)
  const newCardsDone = totalRemNew === 0 || newDone >= targetNew;
  if (totalRemNew > 0 && (reviewDone || due === 0)) {
    tasks.push({
      id: 'new',
      label: `Learn ${Math.min(targetNew, totalRemNew)} new card${targetNew === 1 ? '' : 's'}${focusDeck ? ' · start with ' + DECKS.find(d => d[0] === focusDeck)?.[1] || '' : ''} · ${Math.min(newDone, targetNew)}/${targetNew}`,
      done: newCardsDone,
      progress: { done: Math.min(newDone, targetNew), total: Math.min(targetNew, totalRemNew) },
      action: () => setView('practice', 'review', focusDeck || ''),
      priority: 2,
      autoComplete: newCardsDone,
      type: 'new'
    });
  } else if (totalRemNew === 0) {
    // All cards introduced
    tasks.push({
      id: 'new',
      label: 'All cards introduced — review only',
      done: true,
      progress: null,
      action: null,
      priority: 2,
      autoComplete: true,
      type: 'new'
    });
  }

  // Priority 3: Quiz (only if new cards are done or no new cards left)
  if (newCardsDone || totalRemNew === 0) {
    const quizDone = !!daily.quiz;
    tasks.push({
      id: 'quiz',
      label: `Do one quiz${weakestMode ? ' (' + weakestMode + ')' : ''}`,
      done: quizDone,
      progress: null,
      action: () => setView('practice', 'quiz', weakestMode),
      priority: 3,
      autoComplete: false,
      toggle: true,
      type: 'quiz'
    });
  }

  // Priority 4: Reading
  const readDone = !!daily.read;
  tasks.push({
    id: 'read',
    label: 'Read one passage',
    done: readDone,
    progress: null,
    action: () => setView('practice', 'reading', ''),
    priority: 4,
    autoComplete: false,
    toggle: true,
    type: 'read'
  });

  // Priority 5: Mistakes (if any)
  if (hasMistakes) {
    const mistakesDone = mistakes.length === 0;
    tasks.push({
      id: 'mistakes',
      label: `Review ${mistakes.length} mistake${mistakes.length === 1 ? '' : 's'}`,
      done: mistakesDone,
      progress: { done: 0, total: mistakes.length }, // we can't track incremental clearing; just show total
      action: () => setView('practice', 'mistakes', ''),
      priority: 5,
      autoComplete: mistakesDone,
      type: 'mistakes'
    });
  }

  // Priority 6: Mock test (if exam is near, or if user has mock history)
  const showMock = (exam && dToExam !== null && dToExam <= 60) || (prog.mockHistory && prog.mockHistory.length > 0);
  if (showMock) {
    tasks.push({
      id: 'mock',
      label: mockDone ? 'Mock test completed' : 'Take a mock test',
      done: mockDone,
      progress: null,
      action: () => setView('practice', 'mock', ''),
      priority: 6,
      autoComplete: false,
      toggle: true,
      type: 'mock'
    });
  }

  // --- 9. Compute done count and allDone ---
  const doneN = tasks.filter(t => t.done).length;
  const allDone = doneN === tasks.length;

  // --- 10. Render ---
  return (
    <div className="today">
      <div className="today-h">
        <div>
          <div className="ey">{allDone ? 'Today · complete 🎉' : "Today's plan"}</div>
          <h3>{allDone ? ('Nice work, ' + name + '!') : ('Hi ' + name + ' — ' + doneN + ' of ' + tasks.length + ' done')}</h3>
        </div>
        <div className={cx('tring', allDone && 'full')}>{doneN}/{tasks.length}</div>
      </div>
      <div className="tasklist">
        {tasks.map(t => (
          <div className={cx('task', t.done && 'done')} key={t.id}>
            <button
              className="tck"
              disabled={!t.toggle && !t.autoComplete}
              onClick={() => {
                if (t.toggle) toggleDaily(t.id);
                else if (t.autoComplete) { /* do nothing, but maybe trigger re‑evaluation */ }
              }}
              aria-label={t.done ? 'done' : 'mark done'}
            >
              {t.done ? '✓' : ''}
            </button>
            <span
              className="tlb"
              onClick={() => {
                if (t.action) t.action();
              }}
              style={{ cursor: t.action ? 'pointer' : 'default' }}
            >
              {t.label}
              {t.progress && (
                <span style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--muted)' }}>
                  ({t.progress.done}/{t.progress.total})
                </span>
              )}
            </span>
            <button
              className="tgo"
              onClick={() => {
                if (t.action) t.action();
              }}
              aria-label="open"
              style={{ visibility: t.action ? 'visible' : 'hidden' }}
            >
              →
            </button>
          </div>
        ))}
      </div>
      <div className="pace">
        {allDone ? (
          <span className="pace-ok">✓ Today's plan done — you're on pace. Come back tomorrow! 🎉</span>
        ) : (
          <span>
            {totalRemNew === 0 ? (
              <span>🎉 You've learned all {TOTAL_CARDS} cards — keep clearing reviews to lock them in.</span>
            ) : exam && dToExam !== null ? (
              feasible ? (
                slack >= 30 ? (
                  <span>
                    <b className="ontrack">✓ On track — ahead of schedule.</b>{' '}
                    <b>Stay on your daily study plan to complete {LEVEL_META.label} by {fmtYmd(learnByDate)}.</b>
                  </span>
                ) : (
                  <span>
                    <b className="ontrack">✓ On track for {fmtYmd(exam)}.</b>{' '}
                    <b>Stick to your daily plan of <b>{targetNew} new/day</b> to finish {LEVEL_META.label} by <b>{fmtYmd(learnByDate)}</b>. This leaves <b>{slack}</b> day{slack === 1 ? '' : 's'} to review before the exam.</b>
                  </span>
                )
              ) : (
                <span>
                  <b className="behind">⚠ That date is too soon.</b> From today, {LEVEL_META.label} needs about <b>{mDays + REVIEW_BUFFER_DAYS} days</b> (you can learn at most {NEW_PER_DAY} new per deck a day). Pick an exam date on or after <b>{fmtYmd(minDate)}</b>.
                </span>
              )
            ) : (
              <span>
                At <b>{targetNew} new cards/day</b> you'll learn the remaining <b>{totalRemNew}</b> in about <b>{finishInDays} days</b>. Set a target exam date below for a plan built around it.
              </span>
            )}
          </span>
        )}
        <div className="examrow">
          <label>
            Target exam date{exam && dToExam !== null ? (dToExam > 0 ? ' · ' + dToExam + ' days to go' : ' · today') : ''}
          </label>
          <input
            type="date"
            className="dateinp"
            value={exam}
            onChange={e => setExamDate(e.target.value)}
          />
          {exam && <button className="swlink" onClick={() => setExamDate('')}>clear</button>}
        </div>
      </div>
    </div>
  );
}
function ProgressCard({ prog, setView }) {
  const known = prog.known || {};
  const knownCount = Object.keys(known).reduce((a, k) => a + Object.keys(known[k] || {}).length, 0);
  const mastery = Math.min(100, Math.round(knownCount / Math.max(TOTAL_CARDS, 1) * 100));

  const rd = readinessScore(prog);

  const ss = prog.secStats || {};
  const weakRows = Object.keys(ss)
    .filter(k => (ss[k] || []).length > 0)
    .map(k => {
      const arr = ss[k];
      const pct = Math.round(arr.reduce((a, b) => a + b, 0) / arr.length * 100);
      return [k, pct];
    })
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3);

  const modeMap = { 'Kana': 'kana', 'Vocabulary': 'vocab', 'Kanji': 'kanji', 'Grammar': 'grammar', 'Listening': 'listen' };

  return (
    <div className="mastery" style={{ padding: 'clamp(16px, 3vw, 24px)' }}>
      <div className="mhead" style={{ marginBottom: 12 }}>
        <div>
          <div className="ey">Your progress</div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>Mastery &amp; readiness</h2>
        </div>
        <div className="mpct" style={{ fontSize: 'clamp(32px, 6vw, 48px)' }}>
          {mastery}<span>%</span>
        </div>
      </div>
      <div className="pbar big" style={{ height: 8, marginBottom: 8 }}>
        <i style={{ width: Math.max(mastery, 2) + '%' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted)', marginBottom: 16 }}>
        <span>Exam readiness: <b style={{ color: 'var(--fg)' }}>{rd.score}%</b></span>
        <span>{knownCount} / {TOTAL_CARDS} cards</span>
      </div>

      {weakRows.length > 0 && (
        <div style={{ marginTop: 8, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)', marginBottom: 8 }}>Weak areas</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 20px' }}>
            {weakRows.map(([name, pct]) => {
              const mode = modeMap[name] || '';
              return (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 500 }}>{name}</span>
                  <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{pct}%</span>
                  <div className="pbar" style={{ width: 60, height: 4 }}>
                    <i style={{ width: Math.max(pct, 2) + '%', background: pct < 60 ? 'var(--bad)' : 'var(--good)' }} />
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="btn sm primary"
            style={{ marginTop: 12 }}
            onClick={() => {
              const weak = weakRows[0];
              const mode = modeMap[weak[0]] || 'vocab';
              setView('practice', 'quiz', mode);
            }}
          >
            Practice weakest →
          </button>
        </div>
      )}
    </div>
  );
}

const Home = React.memo(function Home({ setView, name, prog, setGoal, toggleDaily, setExamDate, setLevel, levelDue, user, onSignIn }) {
  const L = LEVEL_META;
  const dueN = dueCount(prog.srs);

  return (
    <div>
      {/* Guest banner – only shown when not signed in */}
      {!user && (
        <section className="wrap" style={{ paddingTop: '18px' }}>
          <GuestSyncBanner onSignIn={onSignIn} />
        </section>
      )}

      {/* Compact Hero */}
      {!user &&<section className="hero wrap" style={{ paddingBottom: 'clamp(20px, 4vw, 40px)' }}>
        <span className="kicker">● {L.tag}</span>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 52px)' }}>
          {L.id === 'n5' ? (
            <>Learn Japanese<br />from <span className="jp">ゼロ</span> to N5</>
          ) : (
            <>Level up to<br />JLPT <span className="jp">{L.label}</span></>
          )}
        </h1>
        <p style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', maxWidth: 480, marginTop: 12 }}>
          A calm, focused place to master {L.label} – read, listen, recall, and stay on track.
        </p>
        <div className="cta" style={{ marginTop: 20 }}>
          <button className="btn primary" onClick={() => setView('practice')}>
            {dueN > 0 ? `Review ${dueN} due →` : 'Start practicing →'}
          </button>
          <button className="btn ghost" onClick={() => setView(L.hasKana ? 'kana' : 'kanji')}>
            Browse {L.hasKana ? 'kana' : 'kanji'}
          </button>
        </div>
      </section>}

      {/* Today's plan – the core */}
      <section className="block wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <TodayPanel
          prog={prog}
          name={name}
          setView={setView}
          toggleDaily={toggleDaily}
          setExamDate={setExamDate}
        />
      </section>

      {/* Other levels (if any reviews due) */}
      {OtherLevels && (
        <section className="block wrap" style={{ paddingTop: 'clamp(12px, 2vw, 24px)', paddingBottom: 0 }}>
          <OtherLevels levelDue={levelDue} level={L.id} setLevel={setLevel} />
        </section>
      )}

      {/* Streak & Goal */}
      <section className="block wrap" style={{ paddingTop: 'clamp(12px, 2vw, 24px)', paddingBottom: 0 }}>
        <StreakCard prog={prog} setGoal={setGoal} />
      </section>

      {/* Progress + Weak areas */}
      <section className="block wrap" style={{ paddingTop: 'clamp(12px, 2vw, 24px)', paddingBottom: 0 }}>
        <ProgressCard prog={prog} setView={setView} />
      </section>

      {/* Quick actions */}
      <section className="block wrap" style={{ paddingTop: 'clamp(12px, 2vw, 24px)', paddingBottom: 0 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          <button className="btn sm" onClick={() => setView('practice', 'review')}>🧠 Review</button>
          <button className="btn sm" onClick={() => setView('practice', 'quiz')}>✦ Quiz</button>
          <button className="btn sm" onClick={() => setView('practice', 'reading')}>📖 Reading</button>
          <button className="btn sm" onClick={() => setView('practice', 'mock')}>📝 Mock</button>
          <button className="btn sm" onClick={() => setView('practice', 'mistakes')}>⚠ Mistakes</button>
        </div>
      </section>

      {/* Next level suggestion */}
      <section className="block wrap" style={{ paddingTop: 'clamp(12px, 2vw, 24px)' }}>
        <NextLevel
          pct={Math.round(
            Object.keys(prog.known || {}).reduce((a, k) => a + Object.keys(prog.known[k] || {}).length, 0) / TOTAL_CARDS * 100
          )}
          setLevel={setLevel}
        />
      </section>
    </div>
  );
});

/* ---------- kana ---------- */
const KanaGrid = React.memo(function KanaGrid({list}){
  return (
    <div className="kana-grid">
      {list.map((x,i)=>(
        <div className="kcell" key={x.k+i} onClick={()=>speak(x.k)} title="Tap to hear">
          <SpeakBtn text={x.k} label={x.r}/>
          <span className="ch">{x.k}</span><span className="ro">{x.r}</span>
        </div>
      ))}
    </div>
  );
})

const KanaView = React.memo(function KanaView({nav}){
  const [sys,setSys] = useState('hiragana');
  const set = KANA[sys];
  return (
    <section className="block wrap">
      <div className="shead">
        <div><div className="ey">Reading foundation</div><h2>Kana</h2><p>Master these before anything else. Tap any character to hear it; switch scripts below.</p></div>
        <div className="seg">
          <button className={cx(sys==='hiragana'&&'on')} onClick={()=>setSys('hiragana')}>ひらがな Hiragana</button>
          <button className={cx(sys==='katakana'&&'on')} onClick={()=>setSys('katakana')}>カタカナ Katakana</button>
        </div>
      </div>
      {nav && <div className="prac-cta"><span>Learned these? Lock them in.</span><button className="btn primary sm" onClick={()=>nav('practice','quiz','kana')}>Practice kana</button></div>}
      <div className="kana-sub">Basic — gojūon</div><KanaGrid list={set.base}/>
      <div className="kana-sub">Dakuten &amp; Handakuten — voiced sounds</div><KanaGrid list={set.dakuten}/>
      <div className="kana-sub">Yōon — combination sounds</div><KanaGrid list={set.yoon}/>
    </section>
  );
})

const KanjiView = React.memo( function KanjiView({ nav }) {
  const [q, setQ] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const gridRef = useRef(null);
  const PAGE_KEY = 'kanji_page';
  const restoredRef = useRef(false);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return KANJI;

    return KANJI.filter(k =>
      (k.c && k.c.includes(s)) ||
      (k.mean || '').toLowerCase().includes(s) ||
      (k.on || '').toLowerCase().includes(s) ||
      (k.kun || '').toLowerCase().includes(s) ||
      (k.kunSentence || '').toLowerCase().includes(s) ||
      (k.onSentence || '').toLowerCase().includes(s)
    );
  }, [q]);

  // Responsive items-per-page
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth <= 760 ? 7 : 21);
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Restore page logic
  useEffect(() => {
    if (restoredRef.current) return;
    const saved = parseInt(localStorage.getItem(PAGE_KEY), 10);
    const maxPage = Math.ceil(list.length / itemsPerPage) || 1;
    if (saved && saved >= 1 && saved <= maxPage) {
      setCurrentPage(saved);
    } else {
      setCurrentPage(1);
    }
    restoredRef.current = true;
  }, [list, itemsPerPage]);

  useEffect(() => {
    localStorage.setItem(PAGE_KEY, String(currentPage));
  }, [currentPage]);

  const totalPages = Math.ceil(list.length / itemsPerPage) || 1;
  const paginatedList = list.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, list.length);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getVisiblePages = (current, total) => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  return (
    <section className="block wrap">
      <div className="shead">
        <div>
          <div className="ey">{KANJI.length} characters</div>
          <h2>Kanji</h2>
          <p>Learn kanji through readings and real examples.</p>
        </div>

        <input
          className="btn"
          style={{ minWidth: '200px' }}
          placeholder="Search kanji or meaning…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      <details className="kanji-guide">
        <summary className="kanji-guide-summary">
          📖 Reading Guide
        </summary>
        <div className="kanji-guide-content">
          <p>Most kanji have two common readings.</p>
          <div className="guide-section">
            <div className="guide-label">訓 (Japanese Reading)</div>
            <div className="guide-text">Usually the reading you will hear in everyday Japanese words.</div>
          </div>
          <div className="guide-section">
            <div className="guide-label">音 (Chinese Reading)</div>
            <div className="guide-text">Usually the reading you will see in many kanji-based words.</div>
          </div>
          <div className="guide-note">
            ✓ Learn both readings<br/>
            ✓ Learn the examples and sentences<br/>
            ✓ Do not worry about memorizing rules
          </div>
        </div>
      </details>

      {nav && (
        <div className="prac-cta">
          <span>Test your kanji meanings.</span>
          <button
            className="btn primary sm"
            onClick={() => nav('practice', 'quiz', 'kanji')}
          >
            Practice kanji
          </button>
        </div>
      )}

      <div className="kanji-grid-container" ref={gridRef} style={{ scrollMarginTop: '84px' }}>
        <div className="kanji-grid">
          {paginatedList.map((k, i) => (
         <div className="kanji-card" key={k.c + i}>
  {/* Kanji (hero) */}
  <div className="kanji-card__char">{k.c}</div>

  {/* Meaning */}
  <div className="kanji-card__meaning">{k.mean}</div>

  {/* Readings side‑by‑side */}
  <div className="kanji-card__readings">
    {k.kun && k.kun !== '—' && k.kun !== '-' && (
      <button
        type="button"
        className="kanji-card__reading-btn"
        onClick={() => speak(displayReading(k.kun))}
        aria-label={`Kun reading: ${displayReading(k.kun)}`}
      >
        <span>
        {/* <span className="kanji-card__badge">kun</span> */}
        <span className="kanji-card__reading-text">{displayReading(k.kun)}</span></span>
        <span className="kanji-card__speaker-icon">🔊</span>
      </button>
    )}
    {k.on && k.on !== '—' && k.on !== '-' && (
      <button
        type="button"
        className="kanji-card__reading-btn"
        onClick={() => speak(k.on)}
        aria-label={`On reading: ${k.on}`}
      >
        <span>
        {/* <span className="kanji-card__badge">on</span> */}
        <span className="kanji-card__reading-text">{k.on}</span></span>
        <span className="kanji-card__speaker-icon">🔊</span>
      </button>
    )}
  </div>

  {/* Stroke order */}
  <a
    href={`https://jisho.org/search/${k.c}%20%23kanji`}
    target="_blank"
    rel="noopener noreferrer"
    className="kanji-card__stroke"
  >
   Stroke order
  </a>
</div>
          ))}
        </div>
      </div>

      {list.length === 0 && (
        <p className="muted center" style={{ marginTop: 30 }}>
          No kanji match "{q}".
        </p>
      )}

      {totalPages > 1 && (
        <div className="pagination" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
          <button 
            className="btn sm" 
            disabled={currentPage === 1} 
            onClick={() => goToPage(currentPage - 1)}
          >
            ‹ Prev
          </button>
          
          {getVisiblePages(currentPage, totalPages).map((item, idx) => (
            item === '...' ? (
              <span key={`dots-${idx}`} className="muted" style={{ fontSize: '13px', padding: '0 6px' }}>…</span>
            ) : (
              <button
                key={item}
                className={cx('btn sm', currentPage === item && 'primary')}
                onClick={() => goToPage(item)}
                style={currentPage === item ? { padding: '8px 14px' } : { padding: '8px 14px', background: 'transparent' }}
              >
                {item}
              </button>
            )
          ))}

          <button 
            className="btn sm" 
            disabled={currentPage === totalPages} 
            onClick={() => goToPage(currentPage + 1)}
          >
            Next ›
          </button>

          <div className="muted" style={{ width: '100%', textAlign: 'center', fontSize: '12px', marginTop: '8px' }}>
            Showing <strong style={{ color: 'var(--fg)' }}>{startIdx}–{endIdx}</strong> of {list.length} characters
          </div>
        </div>
      )}
    </section>
  );
})
function displayReading(reading){
  return reading.replace(/[()]/g,'');
}
const VocabView = React.memo(function VocabView({ nav }) {
  const cats = useMemo(() => ['All', ...Array.from(new Set(VOCAB.map(v => v.cat)))], []);
  const [cat, setCat] = useState('All');
  const [expandedRows, setExpandedRows] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;
  const PAGE_KEY = 'vocab_page';

  const tableRef = useRef(null);

  // ✅ Search + Category filter
  const list = useMemo(() => {
    let items = cat === 'All' ? VOCAB : VOCAB.filter(v => v.cat === cat);
    const s = searchQuery.trim().toLowerCase();
    if (s) {
      items = items.filter(v =>
        (v.jp || '').toLowerCase().includes(s) ||
        (v.kana || '').toLowerCase().includes(s) ||
        (v.en || '').toLowerCase().includes(s) ||
        (v.romaji || '').toLowerCase().includes(s)
      );
    }
    return items;
  }, [cat, searchQuery]);

  // ✅ 1. Remember last page (load on mount, save on change)
  useEffect(() => {
    const saved = parseInt(localStorage.getItem(PAGE_KEY), 10);
    const maxPage = Math.ceil(list.length / ITEMS_PER_PAGE) || 1;
    if (saved && saved >= 1 && saved <= maxPage) {
      setCurrentPage(saved);
    } else {
      setCurrentPage(1);
    }
  }, [list]);

  useEffect(() => {
    localStorage.setItem(PAGE_KEY, String(currentPage));
  }, [currentPage]);

  // ✅ Pagination math & Context
  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE) || 1;
  const paginatedList = list.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIdx = Math.min(currentPage * ITEMS_PER_PAGE, list.length);

  // ✅ 2. Scroll to top on every page change
  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    // 🔥 Clear expanded rows when switching pages to avoid stale visual state
    setExpandedRows({});
  
    if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

  };

  // ✅ 4. Helper for page number buttons (with ellipsis)
  const getVisiblePages = (current, total) => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  const toggleRow = (id) => {
  setExpandedRows(prev => {
    // If this row is already open, close it.
    // Otherwise, open this row and close any other open row.
    return prev[id] ? {} : { [id]: true };
  });
};

  return (
    <section className="block wrap">
      <div className="shead">
        <div>
          <div className="ey">{VOCAB.length} words</div>
          {/* <h2>Vocabulary</h2> */}
          {/* <p>Filter by theme. Click any row to view its usage example in context.</p> */}
        </div>
        <input
          className="btn"
          style={{ minWidth: '200px' }}
          placeholder="Search words or meanings…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {nav && (
        <div className="prac-cta" >
          <span>Turn reading into recall — quiz yourself on these words.</span>
          <button className="btn primary sm" onClick={() => nav('practice', 'quiz', 'vocab')}>
            Practice vocab
          </button>
        </div>
      )}

      <div className="chips" style={{ marginBottom: 18 }}>
        {cats.map(c => (
          <span key={c} className={cx('chip', cat === c && 'on')} onClick={() => setCat(c)}>
            {c}
          </span>
        ))}
      </div>

      <div ref={tableRef} style={{ scrollMarginTop: '84px' }}>
        <div className="vtable">
          <div className="vhead">
            <span className="vhead-control"></span>
            
            <span>Romaji</span>
            <span>Vocab</span>
            <span>Meaning</span>
          </div>

          {paginatedList.map((v, i) => {
            const rowId = v.jp + i;
            const isExpanded = !!expandedRows[rowId];

            return (
              <div 
                className={cx('vrow-group', isExpanded && 'is-expanded')} 
                key={rowId}
              >
                <div 
                  className="vrow" 
                  onClick={() => toggleRow(rowId)}
                  role="button"
                  aria-expanded={isExpanded}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleRow(rowId);
                    }
                  }}
                >
                  <div className="vcol-control">
                    <span className="v-chevron-icon" aria-hidden="true" />
                  </div>
                 
                  <div className="ro">{v.romaji}</div>
                   <div className="jp">
                    {v.jp}
                    <small>{v.kana}</small>
                  </div>
                  <div className="en">
                    <div className="en-wrap">
                      <span>{v.en}</span>
                      <div onClick={(e) => e.stopPropagation()}>
                        <SpeakBtn text={v.kana} label={v.en} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="vrow-drawer" aria-hidden={!isExpanded}>
                  <div className="vrow-drawer-inner">
                    {v.sentence && v.sentence !== '—' && v.sentence !== '-' ? (
                      <div className="v-sentence-block">
                        <div className="v-sentence-label">Sentence</div>
                        <div className="v-sentence-body">
                          <div className="v-sentence-text-group">
                            <div className="v-sentence-jp">{v.sentenceKana}</div>
                            <div className="v-sentence-kana">{v.sentence}</div>
                            <div className="v-sentence-en">{v.sentenceEn}<SpeakBtn text={v.sentence} label="Example Sentence" /></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="v-sentence-empty">
                        No phrase context available for this vocabulary item.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ 3 & 4: Pagination with Range + Number Buttons */}
      {totalPages > 1 && (
        <div className="pagination" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
          <button 
            className="btn sm" 
            disabled={currentPage === 1} 
            onClick={() => goToPage(currentPage - 1)}
          >
            ‹ Prev
          </button>
          
          {getVisiblePages(currentPage, totalPages).map((item, idx) => (
            item === '...' ? (
              <span key={`dots-${idx}`} className="muted" style={{ fontSize: '13px', padding: '0 6px' }}>…</span>
            ) : (
              <button
                key={item}
                className={cx('btn sm', currentPage === item && 'primary')}
                onClick={() => goToPage(item)}
                style={currentPage === item ? { padding: '8px 14px' } : { padding: '8px 14px', background: 'transparent' }}
              >
                {item}
              </button>
            )
          ))}

          <button 
            className="btn sm" 
            disabled={currentPage === totalPages} 
            onClick={() => goToPage(currentPage + 1)}
          >
            Next ›
          </button>

          <div className="muted" style={{ width: '100%', textAlign: 'center', fontSize: '12px', marginTop: '8px' }}>
            Showing <strong style={{ color: 'var(--fg)' }}>{startIdx}–{endIdx}</strong> of {list.length} words
          </div>
        </div>
      )}
    </section>
  );
})

/* ---------- grammar ---------- */
const GrammarView = React.memo(function GrammarView({nav}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const containerRef = useRef(null);
  const PAGE_KEY = 'grammar_page';

  // ✅ 1. Remember last page (load from localStorage on mount, save on change)
  useEffect(() => {
    const saved = parseInt(localStorage.getItem(PAGE_KEY), 10);
    const maxPage = Math.ceil(GRAMMAR.length / itemsPerPage) || 1;
    if (saved && saved >= 1 && saved <= maxPage) {
      setCurrentPage(saved);
    } else {
      setCurrentPage(1);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    localStorage.setItem(PAGE_KEY, String(currentPage));
  }, [currentPage]);

  // ✅ Responsive items-per-page
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth <= 760 ? 5 : 10);
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // ✅ Pagination math & Context
  const totalPages = Math.ceil(GRAMMAR.length / itemsPerPage) || 1;
  const paginatedList = GRAMMAR.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, GRAMMAR.length);

  // ✅ 2. Scroll to top on every page change
  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    // Use 100ms to ensure DOM paints completely before scrolling
     containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  };

  // ✅ 4. Helper for page number buttons (with ellipsis)
  const getVisiblePages = (current, total) => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  return (
    <section className="block wrap">
      <div ref={containerRef} style={{ scrollMarginTop: '84px' }}>
        <div className="shead"><div><div className="ey">{GRAMMAR.length} patterns</div><h2>Grammar</h2><p>The core building blocks of {LEVEL_META.label} sentences, each with a spoken example.</p></div></div>
        {nav && <div className="prac-cta"><span>Ready to drill grammar? Fill-in-the-blank questions test the exact particles &amp; patterns below.</span><button className="btn primary sm" onClick={()=>nav('practice','quiz','grammar')}>Practice grammar</button></div>}
        <div>
          {paginatedList.map((g,i)=>(
            <div className="gcard" key={i}>
              <div className="top"><span className="pt">{g.point}</span><span className="mn">{g.meaning}</span>{g.diff&&<span className={cx('gdiff', g.diff==='Foundation'?'easy':(g.diff==='Intermediate'?'med':'hard'))}>{g.diff}</span>}</div>
              <div className="exp">{g.explain}</div>
              {g.tip && <div className="gtip"><b>⚠ Watch out</b> {g.tip}</div>}
              {g.ex.map((e,j)=>(
                <div className="gex" key={j}><SpeakBtn text={e.jp} label="example sentence"/><div className="j">{e.jp}</div><div className="r">{e.romaji}</div><div className="e">{e.en}</div></div>
              ))}
              {(g.prereq||(g.related&&g.related.length))&&(
                <div className="grel">{g.prereq?<span className="gr-pre"><b>Builds on:</b> {g.prereq}</span>:null}{g.related&&g.related.length?<span className="gr-rel"><b>Related:</b> {g.related.join(' · ')}</span>:null}</div>
              )}
            </div>
          ))}
        </div>

        {/* ✅ 3 & 4: Pagination with Range + Number Buttons */}
        {totalPages > 1 && (
          <div className="pagination" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
            <button 
              className="btn sm" 
              disabled={currentPage === 1} 
              onClick={() => goToPage(currentPage - 1)}
            >
              ‹ Prev
            </button>
            
            {getVisiblePages(currentPage, totalPages).map((item, idx) => (
              item === '...' ? (
                <span key={`dots-${idx}`} className="muted" style={{ fontSize: '13px', padding: '0 6px' }}>…</span>
              ) : (
                <button
                  key={item}
                  className={cx('btn sm', currentPage === item && 'primary')}
                  onClick={() => goToPage(item)}
                  style={currentPage === item ? { padding: '8px 14px' } : { padding: '8px 14px', background: 'transparent' }}
                >
                  {item}
                </button>
              )
            ))}

            <button 
              className="btn sm" 
              disabled={currentPage === totalPages} 
              onClick={() => goToPage(currentPage + 1)}
            >
              Next ›
            </button>

            <div className="muted" style={{ width: '100%', textAlign: 'center', fontSize: '12px', marginTop: '8px' }}>
              Showing <strong style={{ color: 'var(--fg)' }}>{startIdx}–{endIdx}</strong> of {GRAMMAR.length} patterns
            </div>
          </div>
        )}
      </div>
    </section>
  );
})
/* ---------- numbers, time & counters ---------- */
const NumGrid = React.memo(function NumGrid({items}){
  return (
    <div className="kana-grid numgrid">
      {items.map(function(x,i){ return (
        <div className="kcell numcell" key={x.jp+i} onClick={()=>speak(x.k)} title="Tap to hear">
          <SpeakBtn text={x.k} label={x.e}/>
          <span className="njp">{x.jp}</span><span className="nk">{x.k}</span><span className="ne">{x.e}</span>
        </div>
      ); })}
    </div>
  );
})
const NumbersView = React.memo(function NumbersView(){
  return (
    <section className="block wrap">
      <div className="shead"><div><div className="ey">Numbers · 数字</div><h2>Numbers, Time &amp; Counters</h2><p>Telling time, counting things, and the tricky sound-changes N5 loves to test. Tap any item to hear it.</p></div></div>
      <div className="kana-sub">Telling time — 〜時 (o'clock)</div>
      <NumGrid items={NUMBERS.hours}/>
      <div className="kana-sub">Minutes — 〜分 &amp; 半 (half past)</div>
      <NumGrid items={NUMBERS.minutes}/>
      <div className="kana-sub">Big numbers &amp; sound changes</div>
      <NumGrid items={NUMBERS.big}/>
      <div className="kana-sub">Counters — how to count things</div>
      <div className="counters">
        {NUMBERS.counters.map(function(c,i){ return (
          <div className="ccard" key={i}>
            <div className="cc-top"><span className="cc-c">{c.c}</span><span className="cc-k">{c.k}</span><SpeakBtn text={c.say} label={c.use}/></div>
            <div className="cc-use">{c.use}</div>
            <div className="cc-ex">{c.ex}</div>
          </div>
        ); })}
      </div>
      <p className="muted center" style={{marginTop:24,fontSize:'13px'}}>午前 (ごぜん) = a.m. · 午後 (ごご) = p.m. · e.g. 午後三時半 = 3:30 p.m.</p>
    </section>
  );
})

function buildDeck(id) {
  if (id === 'hira') {
    return KANA_HIRA.map(x => ({
      front: x.k,
      back: x.r,
      tag: 'Hiragana',
      fc: 'jp',
      say: x.k,
      readings: null,
      sentenceJp: null,
      sentenceKana: null,
      sentenceEn: null
    }));
  }
  if (id === 'kata') {
    return KANA_KATA.map(x => ({
      front: x.k,
      back: x.r,
      tag: 'Katakana',
      fc: 'jp',
      say: x.k,
      readings: null,
      sentenceJp: null,
      sentenceKana: null,
      sentenceEn: null
    }));
  }

  if (id === 'kanji') {
    return KANJI.map(k => {
      const readings = [
        k.kun && k.kun !== '—' ? `訓 ${displayReading(k.kun)}` : null,
        k.on && k.on !== '—' ? `音 ${k.on}` : null
      ].filter(Boolean).join('　');

      // Prefer kun sentence if available, else on sentence
      const sentenceJp = k.kunSentence && k.kunSentence !== '—' ? k.kunSentence :
                         (k.onSentence && k.onSentence !== '—' ? k.onSentence : null);
      const sentenceKana = k.kunSentenceKana || k.onSentenceKana || null;
      const sentenceEn = k.kunSentenceEn || k.onSentenceEn || null;

      return {
        front: k.c,
        back: k.mean,
        readings,
        sentenceJp,
        sentenceKana,
        sentenceEn,
        tag: 'Kanji',
        fc: 'jp',
        say: kanjiReadingText(k),
        kun: k.kun && k.kun !== '—' ? displayReading(k.kun) : null,
        on: k.on && k.on !== '—' ? k.on : null,
      };
    });
  }

  if (id === 'grammar') {
    return GRAMMAR.map(g => {
      const ex = g.ex && g.ex[0];
      return {
        front: g.point,
        back: g.meaning,
        readings: null,
        sentenceJp: ex ? ex.jp : null,
        sentenceKana: ex ? ex.kana : null,
        sentenceEn: ex ? ex.en : null,
        tag: 'Grammar',
        fc: 'jpw',
        say: ex ? ex.jp : g.point
      };
    });
  }

  // Vocabulary
  return VOCAB.map(v => ({
    front: v.jp,
    back: v.en,
    readings: null,
    sentenceJp: v.sentence || null,
    sentenceKana: v.sentenceKana || null,
    sentenceEn: v.sentenceEn || null,
    tag: v.cat,
    fc: 'jpw',
    say: v.kana
  }));
}

function kanjiReadingText(k) {
 return k.kun && k.kun !== '—' ? displayReading(k.kun) : k.on;
}

function Flashcards({ cp, deckId }) {
  const [order, setOrder] = useState(() => buildDeck(deckId));
  const [idx, setIdx] = useState(0);
  const [flip, setFlip] = useState(false);
  const [showSentence, setShowSentence] = useState(false);

  useEffect(() => {
    setOrder(buildDeck(deckId));
    setIdx(0);
    setFlip(false);
    setShowSentence(false);
  }, [deckId]);

  const reshuffle = () => {
    setOrder(o => shuffle(o));
    setIdx(0);
    setFlip(false);
  };

  const go = useCallback((d) => {
    setFlip(false);
    setIdx(i => {
      const n = i + d;
      if (n < 0) return order.length - 1;
      if (n >= order.length) return 0;
      return n;
    });
  }, [order.length]);

  const card = order[idx];
  const knownDeck = (cp.prog.known || {})[deckId] || {};
  const knownCount = Object.keys(knownDeck).length;
  const isKnown = card && knownDeck[card.front];
  const hasSentence = card && card.sentenceJp;

  useEffect(() => {
    const h = (e) => {
      if (e.key === ' ') { e.preventDefault(); setFlip(f => !f); }
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [go]);

  useEffect(() => {
    setShowSentence(false);
  }, [idx, deckId]);

  return (
    <div className="study-wrap">
      {/* No chips – deck selection is in parent */}

      <div className="fc-bar">
        <span className="fc-count">Card <b>{idx + 1}</b> / {order.length}</span>
        <span className="fc-count">Known <b>{knownCount}</b> / {order.length}</span>
      </div>

      {flip && hasSentence && (
        <div className="sentence-toolbar">
          {/* <button
            className={cx('toolbar-btn', showSentence && 'on')}
            onClick={(e) => { e.stopPropagation(); setShowSentence(s => !s); }}
          >
            {showSentence ? '📖 Hide sentence' : '📖 Show sentence'}
          </button> */}
          {showSentence && (
            <button
              className="toolbar-btn speak-sentence"
              onClick={(e) => { e.stopPropagation(); speak(card.sentenceJp); }}
              aria-label="Speak sentence"
            >
              🔊 Speak sentence
            </button>
          )}
        </div>
      )}

      <div className={cx('flashcard', flip && 'flipped')} key={card.front} onClick={() => setFlip(f => !f)}>
        <div className="fc-inner">
          <div className="fc-face fc-front">
            <span className="tag">{card.tag}</span>
            <span className={card.fc === 'jp' ? 'q' : 'qs'}>{card.front}</span>
            {deckId === 'vocab' && <span className="kana">{card.say}</span>}
             {deckId === 'grammar' && <span className='kana'>Say a sentence using this.</span>}
            <span className="hint">tap to reveal</span>
          </div>
          <div className="fc-face fc-back">
            <span className="tag">{card.tag}</span>
            {deckId !== 'grammar' && <div className="back-medium">{card.back}</div>}
            {deckId !== 'grammar' &&card.readings && <div className="back-readings">{card.readings}</div>}

            {deckId !== 'grammar' && showSentence && card.sentenceJp && (
              <div className="back-sentence">
                <div className="sentence-jp">{card.sentenceJp}</div>
                {card.sentenceKana && <div className="sentence-kana">{card.sentenceKana}</div>}
                {card.sentenceEn && <div className="sentence-en">{card.sentenceEn}</div>}
              </div>
            )}

              {(deckId === 'grammar') && <>
                <div className="sentence-en">{card.back}</div>
                <div className="a">{card.sentenceJp}</div>
                <div className="sentence-en">{card.sentenceKana}</div>
                <div className="sentence-en">{card.sentenceEn}</div>
                </>}

            <span className="hint">tap to flip back</span>
          </div>
        </div>
      </div>

      <div className="fc-controls">
        <button className="icon-btn" onClick={() => go(-1)} title="Previous (←)">‹</button>
        {/* <button className="btn" onClick={() => setFlip(f => !f)}>Flip</button> */}
        {/* {speechSupported && <button className="icon-btn" onClick={() => speak(card.say)} title="Listen">🔊</button>} */}
          {speechSupported && <button className="icon-btn" onClick={() => speak(card.say)} aria-label="Listen">{deckId == 'kanji' ? 'Kun' : '🔊'}</button>}
          {speechSupported&& deckId === 'kanji' && <button className="icon-btn" onClick={() => speak(card.on)} aria-label="Listen">On</button>}
        <button className="icon-btn" onClick={reshuffle} title="Shuffle">⇄</button>
        <button className="icon-btn" onClick={() => go(1)} title="Next (→)">›</button>
      </div>
      <div className="known-row">
        <button className={cx('btn', 'sm', isKnown && 'primary')} onClick={() => cp.markKnown(deckId, card.front)}>
          {isKnown ? '✓ Known' : 'Mark as known'}
        </button>
      </div>
    </div>
  );
}
/* ---------- quiz ---------- */
function buildOptions(correct, all){
  const set=new Set([correct]);
  for(const a of shuffle(all)){ if(set.size>=4)break; set.add(a); }
  return shuffle([...set]);
}
const MODE_SECTION = {kana:'Kana', vocab:'Vocabulary', kanji:'Kanji', listen:'Listening', grammar:'Grammar'};
function makeQuestions(mode, cat){
  if(mode==='grammar'){
    return shuffle(GRAMMARQ).slice(0,10).map(function(it){ return {kind:'sentence', prompt:it.q, correct:it.a, options:shuffle(it.opts.slice()), explain:it.hint}; });
  }
  const useCat = cat && cat!=='All';
  if(mode==='listen'){
    // mix single words (kana audio) with short example sentences; a chosen category uses words only
    const vlist = useCat ? VOCAB.filter(function(v){return v.cat===cat;}) : VOCAB;
    var words = vlist.map(function(v){ return {say:v.kana, a:v.en, prompt:v.jp, sub:v.kana, t:'w'}; });
    var sents = []; if(!useCat){ GRAMMAR.forEach(function(g){ (g.ex||[]).forEach(function(e){ sents.push({say:e.jp, a:e.en, prompt:e.jp, sub:e.romaji, t:'s'}); }); }); }
    var wA = words.map(function(x){return x.a;}), sA = sents.map(function(x){return x.a;});
    return shuffle(words.concat(sents)).slice(0,10).map(function(it){
      return {kind:'audio', prompt:it.prompt, sub:it.sub, say:it.say, correct:it.a, options:buildOptions(it.a, it.t==='w'?wA:sA), long:it.t==='s'};
    });
  }
  var pool, kind;
  if(mode==='kana'){ const s=KANA.hiragana,k=KANA.katakana; pool=[...s.base,...s.dakuten,...k.base].map(x=>({p:x.k,a:x.r,say:x.k})); kind='jp-big'; }
  else if(mode==='kanji'){ pool=KANJI.map(k=>({p:k.c,a:k.mean,say:kanjiReadingText(k)})); kind='jp-big'; }
  else { const vl=useCat?VOCAB.filter(function(v){return v.cat===cat;}):VOCAB; pool=vl.map(v=>({p:v.jp,a:v.en,say:v.kana,sub:v.kana})); kind='jp-med'; }
  const allA=pool.map(x=>x.a);  
  return shuffle(pool).slice(0,10).map(function(it){ return {kind:kind, prompt:it.p, sub:it.sub, say:it.say, correct:it.a, options:buildOptions(it.a, allA)}; });
}
function Quiz({ cp, mode, setMode, cat, setCat, setDaily }) {
  const [seed, setSeed] = useState(0);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const best = cp.prog.best || {};

  const questions = useMemo(() => makeQuestions(mode, cat), [mode, cat, seed]);
  const N = questions.length;
  const q = questions[i];

  useEffect(() => {
    if (mode === 'listen' && !done && questions[i]) speak(questions[i].say);
  }, [mode, seed, i, done, questions]);

  // ---- Auto‑complete daily quiz task ----
  useEffect(() => {
    if (done) {
      setDaily('quiz', true);
    }
  }, [done, setDaily]);

  const restart = () => {
    setSeed(s => s + 1);
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const choose = (opt) => {
    if (picked !== null) return;
    setPicked(opt);
    const ok = opt === q.correct;
    if (ok) setScore(s => s + 1);
    try {
      const sec = MODE_SECTION[mode] || 'Vocabulary';
      cp.recordAttempt(sec, ok);
      if (!ok) cp.addMistake({ section: sec, prompt: q.prompt, sub: q.sub || '', say: q.say || '', correct: q.correct, options: q.options, kind: q.kind });
    } catch (e) {}
  };

  const next = () => {
    if (i < N - 1) {
      setI(i + 1);
      setPicked(null);
    } else {
      setDone(true);
      cp.setBest(mode, score);
    }
  };

  const pct = Math.round(score / N * 100);
  const msg = pct === 100 ? 'Perfect! 完璧です！' : pct >= 70 ? 'Great work — keep going!' : pct >= 40 ? 'Good start. Review and retry.' : 'Keep practicing — you\'ve got this.';
  const reveal = picked !== null;
  const promptLbl = mode === 'listen' ? 'Listen, then choose the meaning' : (mode === 'grammar' ? 'Choose the correct word' : (mode === 'kana' ? 'What is the reading?' : 'What does this mean?'));

  return (
    <div className="quiz-wrap">
      {!done ? (
        <div className="qcard">
          <div className="pbar" style={{ marginBottom: 24 }}><i style={{ width: (i / N * 100) + '%' }} /></div>
          <div className="q-prompt">
            <div className="lbl">{promptLbl}</div>
            {q.kind === 'audio' ? (
              <div>
                <button className="spk lg" style={{ margin: '10px auto 4px' }} aria-label="Play audio" onClick={() => speak(q.say)}>🔊</button>
                {reveal ? <div style={{ fontFamily: 'var(--jp)', fontSize: q.long ? 'clamp(17px,3.4vw,23px)' : 'clamp(26px,6vw,40px)', fontWeight: q.long ? 500 : 700, lineHeight: 1.5 }}>{q.prompt}<span style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', fontWeight: 400, marginTop: 5 }}>{q.sub}</span></div> : <div className="muted" style={{ fontSize: '13px' }}>tap 🔊 to replay</div>}
              </div>
            ) : (
              <div className={q.kind === 'jp-big' ? 'big' : 'med'}>{q.prompt}</div>
            )}
            {(q.kind === 'jp-big' || q.kind === 'jp-med') && speechSupported && <button className="spk lg" style={{ margin: '14px auto 0' }} aria-label="Listen" onClick={() => speak(q.say)}>🔊</button>}
          </div>
          <div className="opts">
            {q.options.map((opt, k) => {
              let st = '';
              if (reveal) {
                if (opt === q.correct) st = 'correct';
                else if (opt === picked) st = 'wrong';
              }
              return <button key={opt + k} className={cx('opt', st)} disabled={reveal} onClick={() => choose(opt)}><span className="k">{String.fromCharCode(65 + k)}</span>{opt}</button>;
            })}
          </div>
          <div className={cx('feedback', reveal && (picked === q.correct ? 'ok' : 'no'))}>{reveal ? ((picked === q.correct ? 'Correct!' : 'Answer: ' + q.correct) + (q.explain ? (' · ' + q.explain) : '')) : ''}</div>
          <div className="q-foot"><span className="score-pill">Score <b>{score}</b> / {N}　·　Question {i + 1}/{N}</span><button className="btn primary" disabled={!reveal} onClick={next}>{i < N - 1 ? 'Next →' : 'Finish'}</button></div>
        </div>
      ) : (
        <div className="qcard"><div className="result"><div className="pct">{pct}%</div><div className="msg">{msg}</div>
          <div className="score-pill" style={{ display: 'block', marginBottom: 18 }}>You scored <b>{score}</b> / {N}　·　Best: <b>{Math.max(best[mode] || 0, score)}</b> / {N}</div>
          <button className="btn primary" onClick={restart}>Try again</button></div></div>
      )}
    </div>
  );
}
/* ---------- spaced repetition review ---------- */
function CaughtUp({srsDeck, reviewed}){
  const now=Date.now(); let next=Infinity;
  for(const f in srsDeck){ if(srsDeck[f].due>now && srsDeck[f].due<next) next=srsDeck[f].due; }
  const total=Object.keys(srsDeck).length;
  return (
    <div className="qcard" style={{textAlign:'center'}}>
      <div className="result">
        <div style={{fontSize:'46px',lineHeight:1}}>🎉</div>
        <h3 style={{fontSize:'22px',margin:'10px 0 0'}}>All caught up!</h3>
        <div className="msg">{reviewed>0?('You reviewed '+reviewed+' card'+(reviewed===1?'':'s')+'. '):''}{next<Infinity?('Next review '+fmtUntil(next)+'.'):'Pick another deck to keep learning.'}</div>
        {total>0 && <div className="muted" style={{fontSize:'13px'}}>{total} cards scheduled in this deck.</div>}
        <div className="muted" style={{fontSize:'13px',marginTop:8}}>Want to keep going now? Switch decks above, or use <b>Browse</b> for unlimited practice.</div>
      </div>
    </div>
  );
}
function Review({ cp, deckId }) {
  // Pre-compute today for early use
  const today = dayStr();

  // Restore reviewed count from today's progress, instead of always 0
  const dailyReviewCount = (cp.prog.daily || {})[today]?.[deckId + '_reviewed'] || 0;
  const [reviewed, setReviewed] = useState(dailyReviewCount);

  const [queue, setQueue] = useState(() => buildQueue(buildDeck(deckId), (cp.prog.srs || {})[deckId] || {}));
  const [reveal, setReveal] = useState(false);
  const [showSentence, setShowSentence] = useState(false);

  useEffect(() => {
    setQueue(buildQueue(buildDeck(deckId), (cp.prog.srs || {})[deckId] || {}));
    setReveal(false);
    // Reset reviewed to daily count for the newly selected deck
    const newDaily = (cp.prog.daily || {})[dayStr()]?.[deckId + '_reviewed'] || 0;
    setReviewed(newDaily);
    setShowSentence(false);
  }, [deckId]);

  const card = queue[0];
  const srsDeck = (cp.prog.srs || {})[deckId] || {};
  const cur = card ? srsDeck[card.front] : null;
  const isNew = card && !srsDeck[card.front];

  // The rest of the component stays exactly the same
  const deckReviewedToday = dailyReviewCount;

  const dueCountInDeck = (deckSrs) => {
    const now = Date.now();
    let n = 0;
    for (const f in deckSrs) {
      if (deckSrs[f].due <= now) n++;
    }
    return n;
  };

  const reviewRemaining = dueCountInDeck(srsDeck);
  const remainingNew = remainingNewInDeck(cp.prog.srs, deckId);
  const maxNewToday = Math.min(NEW_PER_DAY, remainingNew);
  const newToday = newIntroducedToday(srsDeck, today);
  const newRemainingToday = Math.max(0, maxNewToday - newToday);

  const grade = (g) => {
    if (!card) return;
    cp.reviewCard(deckId, card.front, g);
    setReviewed(n => n + 1);
    setQueue(q => {
      const first = q[0], rest = q.slice(1);
      if (g === 'again') {
        const pos = Math.min(rest.length, 4);
        const nq = rest.slice();
        nq.splice(pos, 0, first);
        return nq;
      }
      return rest;
    });
    setReveal(false);
  };

  useEffect(() => {
    const h = (e) => {
      if (!card || e.repeat) return;
      if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setReveal(r => !r);
        return;
      }
      if (reveal) {
        if (e.key === '1') grade('again');
        else if (e.key === '2') grade('hard');
        else if (e.key === '3') grade('good');
        else if (e.key === '4') grade('easy');
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [card, reveal]);

  const hasSentence = card && card.sentenceJp;

  return (
    <div className="study-wrap">
      {card ? (
        <React.Fragment>
          <div className="fc-bar" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span className="fc-count">Review remaining <b>{reviewRemaining}</b></span>
            {remainingNew > 0 && (
              <span className="fc-count">New remaining today <b>{newRemainingToday}</b></span>
            )}
            <span className="fc-count">Reviewed today <b>{deckReviewedToday}</b></span>
          </div>

          <div className="pbar" style={{ marginBottom: 16 }}>
            <i style={{ width: ((reviewed + queue.length) ? Math.round(reviewed / (reviewed + queue.length) * 100) : 0) + '%' }} />
          </div>

          {/* ... (flashcard and controls unchanged) ... */}
          {reveal && hasSentence && (
            <div className="sentence-toolbar">
              {showSentence && (
                <button
                  className="toolbar-btn speak-sentence"
                  onClick={(e) => { e.stopPropagation(); speak(card.sentenceJp); }}
                  aria-label="Speak sentence"
                >
                  🔊 Speak sentence
                </button>
              )}
            </div>
          )}

          <div className={cx('flashcard', reveal && 'flipped')} key={card.front} onClick={() => setReveal(r => !r)}>
            <div className="fc-inner">
              <div className="fc-face fc-front">
                <span className="tag">{card.tag}{isNew ? ' · NEW' : ''}</span>
                <span className={card.fc === 'jp' ? 'q' : 'qs'}>{card.front}</span>
                {deckId === 'vocab' && <span className='kana'>{card.say}</span>}
                {deckId === 'grammar' && <span className='kana'>Say a sentence using this.</span>}
                <span className="hint">tap to reveal</span>
              </div>
              <div className="fc-face fc-back">
                <span className="tag">{card.tag}</span>
                {!(deckId === 'grammar') && <div className="back-medium">{card.back}</div>}
                {!(deckId === 'grammar') && card.readings && <div className="back-readings">{card.readings}</div>}
                {!(deckId === 'grammar') && showSentence && card.sentenceJp && (
                  <div className="back-sentence">
                    <div className="sentence-jp">{card.sentenceJp}</div>
                    {card.sentenceKana && <div className="sentence-kana">{card.sentenceKana}</div>}
                    {card.sentenceEn && <div className="sentence-en">{card.sentenceEn}</div>}
                  </div>
                )}
                {(deckId === 'grammar') && <>
                  <div className="sentence-en">{card.back}</div>
                  <div className="back-meaning">{card.sentenceJp}</div>
                  <div className="sentence-kana">{card.sentenceKana}</div>
                  <div className="sentence-en">{card.sentenceEn}</div>
                </>}
                <span className="hint">tap to flip back</span>
              </div>
            </div>
          </div>

          {!reveal ? (
            <div className="fc-controls" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
              {speechSupported && <button className="icon-btn" onClick={() => speak(card.say)} aria-label="Listen">{deckId == 'kanji' ? 'Kun' : '🔊'}</button>}
              {speechSupported && deckId === 'kanji' && <button className="icon-btn" onClick={() => speak(card.on)} aria-label="Listen">On</button>}
            </div>
          ) : (
            <div className="grades">
              <button className="grade again" onClick={() => grade('again')}><b>Again</b><span>{gradePreview(cur, 'again')}</span></button>
              <button className="grade hard" onClick={() => grade('hard')}><b>Hard</b><span>{gradePreview(cur, 'hard')}</span></button>
              <button className="grade good" onClick={() => grade('good')}><b>Good</b><span>{gradePreview(cur, 'good')}</span></button>
              <button className="grade easy" onClick={() => grade('easy')}><b>Easy</b><span>{gradePreview(cur, 'easy')}</span></button>
            </div>
          )}
        </React.Fragment>
      ) : (
        <CaughtUp srsDeck={srsDeck} reviewed={reviewed} />
      )}
    </div>
  );
}
/* ---------- reading ---------- */
function splitSentences(text){
  const out=[]; let buf='', start=0;
  for(let i=0;i<text.length;i++){ const ch=text[i]; buf+=ch; if(ch==='。'||ch==='！'||ch==='？'||ch==='\n'){ out.push({t:buf,start:start}); start=i+1; buf=''; } }
  if(buf) out.push({t:buf,start:start});
  return out;
}
/* ---------- reading (new interactive version – top: page number + controls, bottom: Prev/Next + counter) ---------- */
function Reading({ cp, setDaily }) {
  const passages = READING;

  const PARTICLE_WORDS = new Set([
    'は', 'が', 'の', 'に', 'を', 'と', 'も', 'で',
    'から', 'へ', 'まで', 'や', 'か', 'ね', 'よ', 'ぞ', 'ぜ', 'わ'
  ]);

  const [currentPassageIdx, setCurrentPassageIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [showEnglish, setShowEnglish] = useState(false);

  const [activeTokenKey, setActiveTokenKey] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tokenRefs = useRef({});
  const tooltipRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answered, setAnswered] = useState(false);

  const currentPassage = passages[currentPassageIdx];
  const totalPassages = passages.length;
  const questions = currentPassage?.questions || [];
  const currentQuestion = questions[currentQuestionIdx] || null;
  const totalQuestions = questions.length;

  const readingProgress = cp.prog.reading || {};
  const passageProgress = readingProgress[currentPassage?.id] || null;
  const isPassageCompleted = passageProgress?.completed || false;

  // ---- On mount: jump to first uncompleted ----
  useEffect(() => {
    const firstUncompleted = passages.findIndex(p => !(readingProgress[p.id]?.completed));
    if (firstUncompleted !== -1 && firstUncompleted !== currentPassageIdx) {
      setCurrentPassageIdx(firstUncompleted);
    }
  }, []);

  // ---- Load saved progress ----
  const prevPassageIdxRef = useRef(currentPassageIdx);
  useEffect(() => {
    const passageChanged = prevPassageIdxRef.current !== currentPassageIdx;
    prevPassageIdxRef.current = currentPassageIdx;

    if (currentPassage && passageProgress) {
      setSelectedOptions(passageProgress.answers || []);
      setAnswered(passageProgress.completed || false);
    } else {
      setSelectedOptions(new Array(totalQuestions).fill(null));
      setAnswered(false);
    }

    if (passageChanged) {
      setCurrentQuestionIdx(0);
      // ❌ Auto‑scroll removed – only happens on "Next passage" button click
    }

    setTooltipVisible(false);
    setActiveTokenKey(null);
  }, [currentPassageIdx, currentPassage, passageProgress, totalQuestions]);

  // ---- Tokenizer ----
  const tokenize = (text, dict) => {
    if (!text || !dict) return [{ type: 'plain', text }];
    const sortedWords = Object.keys(dict).sort((a, b) => b.length - a.length);
    const tokens = [];
    let i = 0;
    while (i < text.length) {
      let matched = false;
      for (const word of sortedWords) {
        if (text.startsWith(word, i)) {
          if (PARTICLE_WORDS.has(word)) {
            tokens.push({ type: 'plain', text: word });
          } else {
            tokens.push({ type: 'dict', text: word, entry: dict[word] });
          }
          i += word.length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        tokens.push({ type: 'plain', text: text[i] });
        i++;
      }
    }
    return tokens;
  };

  const passageTokens = useMemo(() => {
    if (!currentPassage) return [];
    return tokenize(currentPassage.jp, currentPassage.dictionary);
  }, [currentPassage]);

  const questionTokens = useMemo(() => {
    if (!currentQuestion) return { question: [], options: [] };
    const qTokens = tokenize(currentQuestion.question, currentQuestion.dictionary);
    const optTokens = currentQuestion.options.map(opt => tokenize(opt, currentQuestion.dictionary));
    return { question: qTokens, options: optTokens };
  }, [currentQuestion]);

  const speakPassage = useCallback(() => {
    if (!currentPassage) return;
    speak(currentPassage.jp);
  }, [currentPassage]);

  const speakQuestion = useCallback((questionText) => {
    if (!questionText) return;
    speak(questionText);
  }, []);

  // ---- Tooltip ----
  const showTooltip = (token, key, event) => {
    if (token.type !== 'dict') return;
    const rect = event.currentTarget.getBoundingClientRect();
    let x = rect.left + rect.width / 2;
    let y = rect.top - 10;
    const tooltipWidth = 200;
    if (y < 80) y = rect.bottom + 10;
    if (x + tooltipWidth / 2 > window.innerWidth - 20) x = window.innerWidth - 20 - tooltipWidth / 2;
    if (x - tooltipWidth / 2 < 20) x = 20 + tooltipWidth / 2;
    setTooltipPos({ x, y });
    setActiveTokenKey(key);
    setTooltipVisible(true);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const hideTooltipDelayed = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setTooltipVisible(false);
      setActiveTokenKey(null);
    }, 200);
  };

  const cancelHideTooltip = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleTokenClick = (token, key, event) => {
    event.stopPropagation();
    if (token.type !== 'dict') return;
    const textToSpeak = token.entry.kana || token.text;
    speak(textToSpeak);
    if (activeTokenKey === key && tooltipVisible) {
      setTooltipVisible(false);
      setActiveTokenKey(null);
    } else {
      showTooltip(token, key, event);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (!tooltipVisible) return;
      const tooltipEl = document.getElementById('reading-tooltip');
      if (tooltipEl && tooltipEl.contains(e.target)) return;
      const tokenEl = tokenRefs.current[activeTokenKey];
      if (tokenEl && tokenEl.contains(e.target)) return;
      setTooltipVisible(false);
      setActiveTokenKey(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [tooltipVisible, activeTokenKey]);

  // ---- Option selection ----
  const selectOption = (questionIdx, optionIdx) => {
    if (answered || isPassageCompleted) return;
    if (selectedOptions[questionIdx] !== null && selectedOptions[questionIdx] !== undefined) return;

    const newSelected = [...selectedOptions];
    newSelected[questionIdx] = optionIdx;
    setSelectedOptions(newSelected);

    const allAnswered = newSelected.every(idx => idx !== null && idx !== undefined);
    if (allAnswered) {
      setAnswered(true);
      const score = newSelected.reduce((acc, sel, idx) => {
        return acc + (sel === questions[idx]?.answer ? 1 : 0);
      }, 0);
      const total = questions.length;
      const progressEntry = {
        score,
        total,
        answers: newSelected,
        completed: true,
        timestamp: Date.now(),
      };
      const reading = { ...(cp.prog.reading || {}) };
      reading[currentPassage.id] = progressEntry;
      cp.updateProgress(prev => ({
        ...prev,
        reading,
      }));

      // ---- Auto‑complete daily reading task ----
      setDaily('read', true);
    }
  };

  // ---- Navigation ----
  const nextQuestion = () => {
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setTooltipVisible(false);
      setActiveTokenKey(null);
    }
  };
  const prevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
      setTooltipVisible(false);
      setActiveTokenKey(null);
    }
  };

  const goToPassage = (idx) => {
    setCurrentPassageIdx(idx);
    setTooltipVisible(false);
    setActiveTokenKey(null);
    // No scroll here – only on "Next passage" button click
  };

  const renderTokens = (tokens, baseKey) => {
    return tokens.map((token, idx) => {
      const key = `${baseKey}-${idx}`;
      const isActive = activeTokenKey === key && tooltipVisible;
      const isDict = token.type === 'dict';
      return (
        <span
          key={key}
          ref={el => { if (isDict) tokenRefs.current[key] = el; }}
          onClick={(e) => isDict && handleTokenClick(token, key, e)}
          onMouseEnter={(e) => isDict && showTooltip(token, key, e)}
          onMouseLeave={hideTooltipDelayed}
          onMouseMove={cancelHideTooltip}
          style={{
            cursor: isDict ? 'pointer' : 'default',
            background: isActive ? 'var(--accent-dim)' : 'transparent',
            borderRadius: '4px',
            padding: isActive ? '2px 0' : '0',
            transition: 'background 0.15s ease',
          }}
        >
          {token.text}
        </span>
      );
    });
  };

  if (!currentPassage) {
    return (
      <div className="quiz-wrap" style={{ maxWidth: '560px' }}>
        <div className="qcard" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '44px', lineHeight: 1 }}>📖</div>
          <h3 style={{ fontSize: '21px', margin: '10px 0 4px' }}>No reading passages</h3>
          <p className="muted" style={{ fontSize: '14px', maxWidth: '420px', margin: '0 auto' }}>
            This level doesn't have reading materials yet.
          </p>
        </div>
      </div>
    );
  }

  const allTokens = useMemo(() => {
    const q = questionTokens;
    return [
      ...passageTokens.map((t, i) => ({ ...t, key: `p-${i}` })),
      ...q.question.map((t, i) => ({ ...t, key: `q-${i}` })),
      ...q.options.flatMap((opt, oi) => opt.map((t, i) => ({ ...t, key: `o-${oi}-${i}` }))),
    ];
  }, [passageTokens, questionTokens]);

  const activeToken = activeTokenKey
    ? allTokens.find(t => t.key === activeTokenKey)
    : null;

  const isQuestionAnswered = selectedOptions[currentQuestionIdx] !== null && selectedOptions[currentQuestionIdx] !== undefined;
  const selectedIdx = selectedOptions[currentQuestionIdx];
  const correctIdx = currentQuestion?.answer;

  return (
    <div className="reading-wrap" ref={containerRef} style={{ maxWidth: '780px', margin: '0 auto', scrollMarginTop: '80px' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, overflowX: 'auto', flex: 1, padding: '4px 0', scrollbarWidth: 'thin' }}>
          {Array.from({ length: totalPassages }, (_, i) => {
            const p = passages[i];
            const isCompleted = (cp.prog.reading || {})[p.id]?.completed || false;
            return (
              <button
                key={i}
                className={cx('chip', i === currentPassageIdx && 'on')}
                onClick={() => goToPassage(i)}
                style={{
                  flex: '0 0 auto',
                  minWidth: '32px',
                  padding: '4px 8px',
                  fontSize: '13px',
                  fontWeight: i === currentPassageIdx ? '700' : '500',
                  border: i === currentPassageIdx ? '2px solid var(--accent)' : '1px solid var(--line)',
                  background: i === currentPassageIdx ? 'var(--accent-dim)' : 'transparent',
                  color: i === currentPassageIdx ? 'var(--fg)' : 'var(--muted)',
                  position: 'relative',
                }}
              >
                {i + 1}
                {isCompleted && (
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', fontSize: '10px', color: 'var(--good)' }}>✓</span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <button className="spk reading-speaker" onClick={speakPassage} aria-label="Read passage">🔊</button>
          <button className={cx('rtoggle', showEnglish && 'on')} onClick={() => setShowEnglish(s => !s)}>
            English <span className="rtoggle-underline" />
          </button>
        </div>
      </div>

      {/* Passage text */}
      <div className="reading-card">
        <p className="rjp" style={{ whiteSpace: 'pre-wrap', lineHeight: 2.2 }}>
          {renderTokens(passageTokens, 'p')}
        </p>
        {showEnglish && (
          <div className="ren" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
            {currentPassage.en}
          </div>
        )}
      </div>

      {/* Questions */}
      {totalQuestions > 0 && (
        <div style={{ marginTop: 24 }}>
          <div className="shead" style={{ marginBottom: 12 }}>
            <div>
              <div className="ey">Comprehension</div>
              <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>
                Question {currentQuestionIdx + 1} / {totalQuestions}
                {isPassageCompleted && (
                  <span style={{ fontSize: '14px', color: 'var(--good)', marginLeft: 12 }}>✓ Completed</span>
                )}
              </h2>
            </div>
          </div>
          <div className="qcard">
            <div className="q-prompt" style={{ textAlign: 'left' }}>
              <div className="med" style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 500 }}>
                {renderTokens(questionTokens.question, 'q')}
                <button
                  className="spk"
                  style={{ marginLeft: 10, display: 'inline-flex' }}
                  onClick={() => speakQuestion(currentQuestion?.question || '')}
                  aria-label="Read question"
                >
                  🔊
                </button>
              </div>
            </div>
            <div className="opts" style={{ marginTop: 12 }}>
              {questionTokens.options.map((optTokens, optIdx) => {
                const isSelected = selectedIdx === optIdx;
                const isCorrect = correctIdx === optIdx;
                let className = 'opt';
                if (isQuestionAnswered) {
                  if (isCorrect) className += ' correct';
                  if (isSelected && !isCorrect) className += ' wrong';
                }
                return (
                  <div
                    key={optIdx}
                    className={className}
                    style={{
                      cursor: isQuestionAnswered ? 'default' : 'pointer',
                      background: isSelected ? 'var(--accent-dim)' : 'var(--bg-1)',
                      borderColor: isQuestionAnswered && isCorrect ? 'var(--good)' : (isSelected && !isCorrect ? 'var(--bad)' : 'var(--line)'),
                    }}
                    onClick={() => !isQuestionAnswered && !isPassageCompleted && selectOption(currentQuestionIdx, optIdx)}
                  >
                    <span className="k">{String.fromCharCode(65 + optIdx)}</span>
                    <span>{renderTokens(optTokens, `o-${optIdx}`)}</span>
                  </div>
                );
              })}
            </div>
            <div className="q-foot" style={{ marginTop: 18 }}>
              <button className="btn" disabled={currentQuestionIdx === 0} onClick={prevQuestion}>‹ Prev</button>
              <span className="score-pill">{currentQuestionIdx + 1} / {totalQuestions}</span>
              <button className="btn primary" disabled={currentQuestionIdx === totalQuestions - 1 || !isQuestionAnswered} onClick={nextQuestion}>Next ›</button>
            </div>
          </div>
        </div>
      )}

      {/* Next passage button – SCROLLS TO TOP */}
      {answered && isPassageCompleted && (
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <button
            className="btn primary"
            onClick={() => {
              let nextUncompleted = -1;
              for (let i = currentPassageIdx + 1; i < totalPassages; i++) {
                const p = passages[i];
                const isCompleted = (cp.prog.reading || {})[p.id]?.completed || false;
                if (!isCompleted) {
                  nextUncompleted = i;
                  break;
                }
              }
              if (nextUncompleted !== -1) {
                goToPassage(nextUncompleted);
                // ✅ Scroll to top of reading section
                containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                alert('🎉 You’ve completed all passages!');
              }
            }}
          >
            {currentPassageIdx < totalPassages - 1 ? 'Next passage →' : 'All done! 🎉'}
          </button>
        </div>
      )}

      {/* Tooltip */}
      {tooltipVisible && activeTokenKey && activeToken && activeToken.entry && (
        <div
          id="reading-tooltip"
          ref={tooltipRef}
          style={{
            position: 'fixed',
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: 'translate(-50%, -100%)',
            background: 'var(--bg-2)',
            border: '1px solid var(--line-2)',
            borderRadius: '12px',
            padding: '8px 14px',
            boxShadow: 'var(--shadow)',
            zIndex: 1000,
            pointerEvents: 'auto',
            minWidth: '120px',
            maxWidth: '260px',
          }}
          onMouseEnter={cancelHideTooltip}
          onMouseLeave={hideTooltipDelayed}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ fontFamily: 'var(--jp)', fontSize: '18px', fontWeight: 600 }}>
            {activeToken.entry.kana || activeToken.text}
          </div>
          <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: 2 }}>
            {activeToken.entry.meaning}
          </div>
        </div>
      )}
    </div>
  );
}
/* ---------- mock test ---------- */
const MOCK_TIME = 12*60; // seconds (fallback if a level has no mock config)
function buildMock(){
  const mix = (LEVEL_META && LEVEL_META.mock && LEVEL_META.mock.mix) || {Vocabulary:6,Kanji:4,Grammar:4,Reading:3,Listening:3};
  const tag=(arr,section)=>arr.map(function(q){ q.section=section; return q; });
  const vocab=tag(makeQuestions('vocab').slice(0,mix.Vocabulary||0),'Vocabulary');
  const kanji=tag(makeQuestions('kanji').slice(0,mix.Kanji||0),'Kanji');
  const grammar=tag(makeQuestions('grammar').slice(0,mix.Grammar||0),'Grammar');
  const listen=tag(makeQuestions('listen').slice(0,mix.Listening||0),'Listening');
  const rq=[]; READING.forEach(function(p){ (p.q||[]).forEach(function(qq){ rq.push({section:'Reading',kind:'reading',passage:p.jp,prompt:qq.q,options:shuffle(qq.opts.slice()),correct:qq.a}); }); });
  const reading=shuffle(rq).slice(0,mix.Reading||0);
  return vocab.concat(kanji,grammar,reading,listen);
}
function fmtClock(s){ s=Math.max(0,s); const m=Math.floor(s/60), ss=s%60; return m+':'+(ss<10?'0':'')+ss; }
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(t){ const d=new Date(t); return MONTHS[d.getMonth()]+' '+d.getDate(); }
function TrendChart({hist}){
  const pts=hist.slice(-20);
  if(pts.length<2) return null;
  const w=320,h=92,pad=10,n=pts.length;
  const X=i=> pad + (i*(w-2*pad)/(n-1));
  const Y=p=> h-pad - (p/100)*(h-2*pad);
  let line=''; pts.forEach(function(d,i){ line+=(i?'L':'M')+X(i).toFixed(1)+' '+Y(d.pct).toFixed(1)+' '; });
  const area=line+'L '+X(n-1).toFixed(1)+' '+(h-pad)+' L '+X(0).toFixed(1)+' '+(h-pad)+' Z';
  return (
    <svg className="trend" viewBox={'0 0 '+w+' '+h} style={{width:'100%',height:'auto'}} preserveAspectRatio="none">
      <line x1={pad} y1={Y(60)} x2={w-pad} y2={Y(60)} className="trend-goal"/>
      <path d={area} className="trend-area"/>
      <path d={line} className="trend-line"/>
      {pts.map(function(d,i){ return <circle key={i} cx={X(i)} cy={Y(d.pct)} r="2.5" className="trend-dot"/>; })}
    </svg>
  );
}
function MockHistory({hist}){
  if(!hist || !hist.length) return null;
  const asc=hist.slice().sort(function(a,b){return a.t-b.t;});
  const avg=Math.round(asc.reduce(function(s,d){return s+d.pct;},0)/asc.length);
  const bestPct=asc.reduce(function(m,d){return Math.max(m,d.pct);},0);
  return (
    <div className="hist">
      <div className="hist-head"><span>Your progress</span><span className="muted">{asc.length} test{asc.length>1?'s':''} · avg {avg}% · best {bestPct}%</span></div>
      <TrendChart hist={asc}/>
      <div className="hist-list">
        {asc.slice(-8).reverse().map(function(d,i){ return <div className="hist-row" key={d.t+'_'+i}><span>{fmtDate(d.t)}</span><span className="muted">{d.score}/{d.total}</span><span className="hp">{d.pct}%</span></div>; })}
      </div>
    </div>
  );
}
function Mock({ cp, setDaily }) {
  const MOCK_SECS = (LEVEL_META.mock && LEVEL_META.mock.secs) || MOCK_TIME;
  const MOCK_COUNT = (LEVEL_META.mock && LEVEL_META.mock.mix) ? Object.keys(LEVEL_META.mock.mix).reduce(function(a,k){return a+LEVEL_META.mock.mix[k];},0) : 20;
  const [started,setStarted]=useState(false);
  const [exam,setExam]=useState([]);
  const [idx,setIdx]=useState(0);
  const [answers,setAnswers]=useState({});
  const [timeLeft,setTimeLeft]=useState(MOCK_SECS);
  const [finished,setFinished]=useState(false);
  const [result,setResult]=useState(null);
  const [review,setReview]=useState(false);
  const best=(cp.prog.best||{}).mock||0;
  const examRef=useRef([]), ansRef=useRef({}), doneRef=useRef(false);

  // ---- Auto‑complete daily mock task ----
  useEffect(() => {
    if (finished && result) {
      setDaily('mock', true);
    }
  }, [finished, result, setDaily]);

  useEffect(()=>{ examRef.current=exam; },[exam]);
  useEffect(()=>{ ansRef.current=answers; },[answers]);

  const start=()=>{ doneRef.current=false; setExam(buildMock()); setIdx(0); setAnswers({}); setTimeLeft(MOCK_SECS); setFinished(false); setResult(null); setReview(false); setStarted(true); };
  const finish=useCallback(()=>{
    if(doneRef.current) return; doneRef.current=true;
    const ex=examRef.current, ans=ansRef.current;
    let correct=0; const bySec={}; const attempts=[]; const misses=[];
    ex.forEach(function(q,k){ const ok=ans[k]===q.correct; if(ok)correct++; const s=q.section; bySec[s]=bySec[s]||{c:0,t:0}; bySec[s].t++; if(ok)bySec[s].c++;
      attempts.push({section:s, ok:ok});
      if(!ok && ans[k]!=null) misses.push({section:s, prompt:(q.prompt||q.say||''), sub:q.sub||'', say:q.say||'', correct:q.correct, options:q.options, kind:q.kind});
    });
    const N=ex.length||1; const pct=Math.round(correct/N*100);
    setResult({correct:correct,N:ex.length,pct:pct,pass:pct>=60,bySec:bySec});
    setFinished(true);
    try{ cp.addMockResult(correct, ex.length); cp.recordBatch(attempts, misses); }catch(e){}
  },[cp,MOCK_SECS]);

  useEffect(()=>{
    if(!started || finished) return;
    if(timeLeft<=0){ finish(); return; }
    const id=setTimeout(()=>setTimeLeft(t=>t-1),1000);
    return ()=>clearTimeout(id);
  },[started,finished,timeLeft,finish]);
  useEffect(()=>{
    if(started && !finished && exam[idx] && exam[idx].kind==='audio') speak(exam[idx].say);
  },[started,finished,idx]);

  if(!started){
    return (
      <div className="quiz-wrap" style={{maxWidth:'560px'}}>
        <div className="qcard" style={{textAlign:'center'}}>
          <div style={{fontSize:'42px',lineHeight:1}}>📝</div>
          <h3 style={{fontSize:'23px',margin:'12px 0 6px'}}>Mock {LEVEL_META.label} Test</h3>
          <p className="muted" style={{fontSize:'14px',maxWidth:'430px',margin:'0 auto 6px'}}>{MOCK_COUNT} mixed questions — vocabulary, kanji, grammar, reading and listening — in {Math.round(MOCK_SECS/60)} minutes. Like the real exam, you only see your score at the end.</p>
          {best>0 && <div className="score-pill" style={{display:'block',margin:'8px 0 16px'}}>Your best: <b>{best}</b> / {MOCK_COUNT}</div>}
          <button className="btn primary" onClick={start}>Start test →</button>
        </div>
        <MockHistory hist={cp.prog.mockHistory}/>
      </div>
    );
  }

  if(finished && result){
    return (
      <div className="quiz-wrap" style={{maxWidth:'560px'}}>
        <div className="qcard">
          <div className="result">
            <div className="pct">{result.pct}%</div>
            <div className="msg">{result.pass?'🎉 Pass! (estimated)':'Keep studying — almost there.'}</div>
            <div className="score-pill" style={{display:'block',marginBottom:16}}>Score <b>{result.correct}</b> / {result.N}　·　Best <b>{Math.max(best,result.correct)}</b> / {MOCK_COUNT}</div>
          </div>
          <div className="msec">
            {Object.keys(result.bySec).map(function(s){ const o=result.bySec[s]; return <div className="msec-row" key={s}><span>{s}</span><span><b>{o.c}</b> / {o.t}</span></div>; })}
          </div>
          <div className="q-foot" style={{justifyContent:'center',gap:'10px',marginTop:18}}>
            <button className="btn" onClick={()=>setReview(r=>!r)}>{review?'Hide answers':'Review answers'}</button>
            <button className="btn primary" onClick={start}>New test</button>
          </div>
          {review && (
            <div className="mreview">
              {exam.map(function(q,k){ const ya=answers[k]; const ok=ya===q.correct; return (
                <div className="mrev" key={k}>
                  <div className="mrev-q"><span className="sectag">{q.section}</span>　{q.kind==='audio'?('🔊 '+(q.prompt||'')):q.prompt}</div>
                  <div className={'mrev-a '+(ok?'ok':'no')}>{ok?'✓ ':'✗ '}{ya!=null?ya:'(no answer)'}</div>
                  {!ok && <div className="mrev-c">Answer: {q.correct}</div>}
                </div>
              ); })}
            </div>
          )}
        </div>
        <MockHistory hist={cp.prog.mockHistory}/>
      </div>
    );
  }

  const q=exam[idx]; const N=exam.length;
  const pick=(opt)=>setAnswers(prev=>Object.assign({},prev,{[idx]:opt}));
  const low=timeLeft<=60;
  return (
    <div className="quiz-wrap" style={{maxWidth:'620px'}}>
      <div className="mock-top">
        <span className="sectag">{q.section}</span>
        <span className={cx('mock-timer',low&&'low')}>⏱ {fmtClock(timeLeft)}</span>
      </div>
      <div className="pbar" style={{margin:'10px 0 18px'}}><i style={{width:(idx/N*100)+'%'}}/></div>
      <div className="qcard">
        {q.kind==='reading' && <div className="reading-card" style={{marginBottom:16}}><p className="rjp" style={{fontSize:'17px',lineHeight:1.9}}>{q.passage}</p></div>}
        <div className="q-prompt">
          {q.kind==='audio' ? (
            <div><button className="spk lg" onClick={()=>speak(q.say)} aria-label="Play audio">🔊</button><div className="muted" style={{fontSize:'13px'}}>listen and choose the meaning</div></div>
          ) : q.kind==='reading' ? (
            <div className="med" style={{fontSize:'clamp(16px,3vw,20px)'}}>{q.prompt}</div>
          ) : (
            <div className={q.kind==='jp-big'?'big':'med'}>{q.prompt}</div>
          )}
        </div>
        <div className="opts">
          {q.options.map(function(opt,k){ return <button key={k} className={cx('opt',answers[idx]===opt&&'sel')} onClick={()=>pick(opt)}><span className="k">{String.fromCharCode(65+k)}</span>{opt}</button>; })}
        </div>
        <div className="q-foot">
          <button className="btn" disabled={idx===0} onClick={()=>setIdx(i=>i-1)}>‹ Back</button>
          <span className="score-pill">Q {idx+1} / {N}</span>
          {idx<N-1 ? <button className="btn primary" onClick={()=>setIdx(i=>i+1)}>Next →</button> : <button className="btn primary" onClick={finish}>Submit ✓</button>}
        </div>
      </div>
      <div className="center" style={{marginTop:14}}><button className="swlink" onClick={finish}>Finish &amp; score now</button></div>
    </div>
  );
}
/* ---------- mistake review ---------- */
function MistakeReview({cp}){
  const all = cp.prog.mistakes || [];
  const [queue] = useState(()=>shuffle(all.slice()));   // snapshot for this session
  const [i,setI] = useState(0);
  const [picked,setPicked] = useState(null);
  const [cleared,setCleared] = useState(0);
  const item = queue[i];
  if(!queue.length) return (
    <div className="quiz-wrap" style={{maxWidth:'560px'}}><div className="qcard" style={{textAlign:'center'}}>
      <div style={{fontSize:'44px',lineHeight:1}}>✨</div>
      <h3 style={{fontSize:'21px',margin:'10px 0 4px'}}>No mistakes to review</h3>
      <p className="muted" style={{fontSize:'14px',maxWidth:'420px',margin:'0 auto'}}>Wrong answers from quizzes, reading and mock tests collect here so you can re-drill exactly what you missed. Go get a few "wrong" — then come back.</p>
    </div></div>
  );
  if(!item) return (
    <div className="quiz-wrap" style={{maxWidth:'560px'}}><div className="qcard"><div className="result">
      <div style={{fontSize:'46px',lineHeight:1}}>🎉</div>
      <h3 style={{fontSize:'22px',margin:'10px 0 0'}}>Mistakes session done!</h3>
      <div className="msg">You cleared <b>{cleared}</b> of {queue.length}. Cleared ones are gone for good; any you missed stay for next time.</div>
    </div></div></div>
  );
  const reveal = picked!==null;
  const opts = (item.options && item.options.length>1) ? item.options : buildOptions(item.correct,[item.correct]);
  const key = (item.section||'')+'|'+item.prompt+'|'+item.correct;
  const choose=(opt)=>{ if(reveal)return; setPicked(opt); if(opt===item.correct){ try{cp.clearMistake(key);}catch(e){} setCleared(c=>c+1); } };
  const next=()=>{ setPicked(null); setI(i+1); };
  return (
    <div className="quiz-wrap">
      <div className="fc-bar"><span className="fc-count">Mistake <b>{i+1}</b> / {queue.length}</span><span className="fc-count">{item.section}　·　Cleared <b>{cleared}</b></span></div>
      <div className="pbar" style={{marginBottom:18}}><i style={{width:(i/queue.length*100)+'%'}}/></div>
      <div className="qcard">
        <div className="q-prompt">
          <div className="lbl">{item.kind==='audio'?'Listen, then choose the meaning':(item.kind==='reading'?'Reading question':'Choose the correct answer')}</div>
          {item.kind==='audio'
            ? <button className="spk lg" style={{margin:'10px auto 4px'}} aria-label="Play audio" onClick={()=>speak(item.say)}>🔊</button>
            : <div className={item.kind==='reading'?'med':'big'} style={item.kind==='reading'?{fontSize:'clamp(16px,3vw,20px)'}:{}}>{item.prompt}</div>}
          {item.say && item.kind!=='audio' && speechSupported && <button className="spk lg" style={{margin:'12px auto 0'}} aria-label="Listen" onClick={()=>speak(item.say)}>🔊</button>}
        </div>
        <div className="opts">
          {opts.map(function(opt,k){ let st=''; if(reveal){ if(opt===item.correct)st='correct'; else if(opt===picked)st='wrong'; } return <button key={k} className={cx('opt',st)} disabled={reveal} onClick={()=>choose(opt)}><span className="k">{String.fromCharCode(65+k)}</span>{opt}</button>; })}
        </div>
        <div className={cx('feedback',reveal&&(picked===item.correct?'ok':'no'))}>{reveal?(picked===item.correct?'Correct — cleared from your mistakes ✓':'Answer: '+item.correct+' · kept for next time'):''}</div>
        <div className="q-foot"><span className="score-pill">{queue.length-cleared} left</span><button className="btn primary" disabled={!reveal} onClick={next}>{i<queue.length-1?'Next →':'Finish'}</button></div>
      </div>
    </div>
  );
}

const Practice = React.memo(function Practice({ cp, tool, sub, navigate }) {
  const [isPrimaryDropdownOpen, setIsPrimaryDropdownOpen] = useState(false);
  const [isSecondaryDropdownOpen, setIsSecondaryDropdownOpen] = useState(false);
  const [quizCat, setQuizCat] = useState('All');

  const mistakeCount = (cp.prog.mistakes || []).length;

  // Derive deckId from tool and sub
  const deckId = useMemo(() => {
    if (tool === 'review' || tool === 'cards') {
      const id = sub || DECKS[0]?.[0] || 'vocab';
      if (DECKS.some(([d]) => d === id)) return id;
      return DECKS[0]?.[0] || 'vocab';
    }
    return null;
  }, [tool, sub]);

  // Derive quizMode from tool and sub
  const quizMode = useMemo(() => {
    if (tool === 'quiz') {
      const mode = sub || QUIZZES[0]?.[0] || 'vocab';
      if (QUIZZES.some(([m]) => m === mode)) return mode;
      return QUIZZES[0]?.[0] || 'vocab';
    }
    return null;
  }, [tool, sub]);

  const secondaryOptions = useMemo(() => {
    if (tool === 'review' || tool === 'cards') {
      return { type: 'deck', items: DECKS, current: deckId };
    } else if (tool === 'quiz') {
      const items = QUIZZES.map(([id, label]) => ({ id, label }));
      return { type: 'quizMode', items, current: quizMode };
    }
    return null;
  }, [tool, deckId, quizMode]);

  const showCategoryChips = tool === 'quiz' && (quizMode === 'vocab' || quizMode === 'listen');

  // Handlers
  const handlePrimarySelect = (newTool) => {
    setIsPrimaryDropdownOpen(false);
    navigate('practice', newTool, '');
  };

  const handleSecondarySelect = (id) => {
    setIsSecondaryDropdownOpen(false);
    navigate('practice', tool, id);
  };

  // Click‑outside refs
  const primaryWrapperRef = useRef(null);
  const secondaryWrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (primaryWrapperRef.current && !primaryWrapperRef.current.contains(event.target)) {
        setIsPrimaryDropdownOpen(false);
      }
      if (secondaryWrapperRef.current && !secondaryWrapperRef.current.contains(event.target)) {
        setIsSecondaryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="block wrap">
      <div className={tool === 'reading' ? 'reading-wrap' : 'study-wrap'}>
        {/* Dropdowns */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: 30, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {/* Secondary dropdown */}
          {secondaryOptions && (
            <div className="dropdown-wrapper" ref={secondaryWrapperRef}>
              <button className="dropdown-toggle" onClick={() => setIsSecondaryDropdownOpen(prev => !prev)}>
                <span>
                  {secondaryOptions.type === 'deck'
                    ? DECKS.find(([id]) => id === secondaryOptions.current)?.[1] || 'Select Deck'
                    : QUIZZES.find(([id]) => id === secondaryOptions.current)?.[1] || 'Select Mode'}
                </span>
                <span className={cx('dropdown-arrow', isSecondaryDropdownOpen && 'open')}>▾</span>
              </button>
              {isSecondaryDropdownOpen && (
                <ul className="dropdown-menu">
                  {secondaryOptions.items.map((item) => {
                    const id = item[0] !== undefined ? item[0] : item.id;
                    const label = item[1] !== undefined ? item[1] : item.label;
                    const isActive = secondaryOptions.type === 'deck'
                      ? id === deckId
                      : id === quizMode;
                    return (
                      <li
                        key={id}
                        className={cx('chip', isActive && 'on')}
                        onClick={() => handleSecondarySelect(id)}
                      >
                        {label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}

          {/* Primary dropdown */}
          <div className="dropdown-wrapper" ref={primaryWrapperRef}>
            <button className="dropdown-toggle" onClick={() => setIsPrimaryDropdownOpen(prev => !prev)}>
              <span>
                {tool === 'review' && '🧠 Review'}
                {tool === 'cards' && '🃏 Browse'}
                {tool === 'quiz' && '✦ Quiz'}
                {tool === 'reading' && '📖 Reading'}
                {tool === 'mock' && '📝 Mock'}
                {tool === 'mistakes' && `⚠ Mistakes${mistakeCount > 0 ? ` ${mistakeCount}` : ''}`}
              </span>
              <span className={cx('dropdown-arrow', isPrimaryDropdownOpen && 'open')}>▾</span>
            </button>
            {isPrimaryDropdownOpen && (
              <ul className="dropdown-menu">
                <li className={cx('chip', tool === 'review' && 'on')} onClick={() => handlePrimarySelect('review')}>🧠 Review</li>
                <li className={cx('chip', tool === 'cards' && 'on')} onClick={() => handlePrimarySelect('cards')}>🃏 Browse</li>
                <li className={cx('chip', tool === 'quiz' && 'on')} onClick={() => handlePrimarySelect('quiz')}>✦ Quiz</li>
                <li className={cx('chip', tool === 'reading' && 'on')} onClick={() => handlePrimarySelect('reading')}>📖 Reading</li>
                <li className={cx('chip', tool === 'mock' && 'on')} onClick={() => handlePrimarySelect('mock')}>📝 Mock</li>
                <li className={cx('chip', tool === 'mistakes' && 'on')} onClick={() => handlePrimarySelect('mistakes')}>⚠ Mistakes{mistakeCount > 0 ? ` ${mistakeCount}` : ''}</li>
              </ul>
            )}
          </div>
        </div>

        {/* Category chips for vocab/listen quizzes */}
        {showCategoryChips && (
          <div className="chips" style={{ justifyContent: 'center', marginBottom: 22 }}>
            {VOCAB_CATS.map(c => (
              <span key={c} className={cx('chip', quizCat === c && 'on')} onClick={() => setQuizCat(c)}>
                {c}
              </span>
            ))}
          </div>
        )}

        {/* Render the selected tool */}
        {tool === 'quiz' ? (
          <Quiz
            key={'q-' + quizMode}
            cp={cp}
            mode={quizMode}
            cat={quizCat}
            setCat={setQuizCat}
            setDaily={cp.setDaily}
          />
        ) : tool === 'cards' ? (
          <Flashcards cp={cp} deckId={deckId} />
        ) : tool === 'reading' ? (
          <Reading cp={cp} setDaily={cp.setDaily} />
        ) : tool === 'mock' ? (
          <Mock cp={cp} setDaily={cp.setDaily} />
        ) : tool === 'mistakes' ? (
          <MistakeReview cp={cp} />
        ) : (
          <Review cp={cp} deckId={deckId} />
        )}
      </div>
    </section>
  );
});
/* ---------- sign-in (optional Google sync) ---------- */
function GoogleBtn({onSignIn, label, full}){
  const [busy,setBusy]=useState(false);
  const [err,setErr]=useState('');
  const go=()=>{ setErr(''); setBusy(true); try{ const op=onSignIn(); if(op&&op.then) op.then(function(){setBusy(false);}).catch(function(e){ setBusy(false); setErr((e&&e.code&&e.code.indexOf('popup')>=0)?'Sign-in was cancelled.':'Could not sign in — check your connection.'); }); else setBusy(false); }catch(e){ setBusy(false); setErr('Sign-in is unavailable right now.'); } };
  return (
    <React.Fragment>
    <button
  className={cx('gbtn', full && 'full')}
  disabled={busy}
  onClick={go}
>
  <span className="gico" aria-hidden="true">
    <img src="/google.png" alt="" />
  </span>

  {busy ? 'Opening Google…' : (label || 'Continue with Google')}
</button>
      {err && <div className="login-err" style={{marginTop:8}}>{err}</div>}
    </React.Fragment>
  );
}
function GuestSyncBanner({onSignIn}){
  const [hidden,setHidden]=useState(function(){ return !!lsGet('nihongo_sync_dismissed'); });
  if(hidden) return null;
  return (
    <div className="syncbanner">
      <div className="sb-text"><b>You're studying as a guest.</b> Your progress is saved on this device. Sign in to save it permanently and sync across your phone and computer.</div>
      <div className="sb-actions">
        <GoogleBtn onSignIn={onSignIn} label="Save my progress"/>
        <button className="swlink" onClick={()=>{ lsSet('nihongo_sync_dismissed',1); setHidden(true); }}>Maybe later</button>
      </div>
    </div>
  );
}

/* ---------- splash / cloud error ---------- */
function Splash(){
  return <div className="login"><div className="login-card" style={{textAlign:'center'}}><div className="mark" style={{margin:'0 auto 20px'}}>語</div><h2>日本語</h2><div className="sub">Loading…</div></div></div>;
}
function CloudError(){
  return (
    <div className="login"><div className="login-card" style={{textAlign:'center'}}>
      <div className="mark" style={{margin:'0 auto 20px'}}>五</div>
      <h2>Can’t reach sign-in</h2>
      <div className="sub">The app couldn’t connect to the account service. This happens when you’re offline, or when viewing the restricted in-app preview.</div>
      <div className="save-note" style={{marginTop:18,textAlign:'left'}}><span>💡</span><span>Open the app from a hosted URL (or the downloaded file) with an internet connection. An account and connection are required to sign in and save.</span></div>
    </div></div>
  );
}
// ----- photo cache helper -----
function fetchAndCachePhoto(photoURL, uid) {
  if (!photoURL) return Promise.resolve(null);
  const cacheKey = 'photo_' + uid;
  return fetch(photoURL)
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch photo');
      return res.blob();
    })
    .then(blob => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          // resize to 128x128 (or smaller) to save space
          const size = 128;
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, size, size);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          lsSet(cacheKey, dataUrl);
          resolve(dataUrl);
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = () => reject(new Error('Image load error'));
      img.src = URL.createObjectURL(blob);
    }))
    .catch(() => null);
}

/* ---------- app shell ---------- */
function App({user,onSignIn,onSignOut,theme,setTheme,isLoggingOut }){
  const [route,navigate] = useHashRoute();
  const view = route.view;
  const [level,setLevelState] = useState('n5');
  const switchedRef = useRef(false);
  const cp = useCloudProgress(user, level);
  const name = user ? user.name : 'there';
  const [sidebarOpen, setSidebarOpen] = useState(false);
const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);
const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  setActiveLevel(level); // swap the active level's content in before children read it

// Inside App component (around line 1800)
const [lastPractice, setLastPractice] = useState({ tool: 'review', sub: '' });

// Update lastPractice whenever the route changes to practice with a sub
useEffect(() => {
  if (route.view === 'practice' && route.sub) {
    setLastPractice({ tool: route.sub, sub: route.sub2 || '' });
  }
}, [route]);


  // resume the level the user was last on (works for local guest doc + cloud doc once it loads)
  useEffect(()=>{ if(cp.activeLevel && cp.activeLevel!==level && !switchedRef.current){ switchedRef.current=true; setLevelState(cp.activeLevel); } },[cp.activeLevel]);
const setLevel = (lv) => {
  if (lv === level) return;
  switchedRef.current = true;
  setLevelState(lv);
  cp.setLevelPref(lv);

  // 🔥 Reset pagination memory when switching JLPT levels
  localStorage.setItem('vocab_page', '1');
  localStorage.setItem('kanji_page', '1');
  localStorage.setItem('grammar_page', '1');

  try {
    if (view !== 'home') navigate('home');
  } catch (e) {}
  try {
    window.scrollTo({ top: 0 });
  } catch (e) {}
};  useEffect(()=>{ try{window.scrollTo({top:0,behavior:'smooth'});}catch(e){} },[view,level]);
  useEffect(()=>{ if(!speechSupported)return; const w=()=>warmSpeech(); window.addEventListener('pointerdown',w,{once:true}); return ()=>{ try{window.removeEventListener('pointerdown',w);}catch(e){} }; },[]);
  // some views don't exist for every level (no kana/numbers at N4) — fall back to home
  const allowed = view==='home'||view==='kanji'||view==='vocab'||view==='grammar'||view==='practice'||(view==='kana'&&LEVEL_META.hasKana)||(view==='numbers'&&LEVEL_META.hasNumbers);
  const v = allowed ? view : 'home';

  
  // ---- If data is still loading, show splash ----
  // if (cp.loading) {
  //   return <Splash />;
  // }

  // Inside App, after the useEffect above
const navigateWithPractice = useCallback((view, sub, sub2) => {
  if (view === 'practice' && !sub) {
    // Use the last known practice route if available
    const { tool, sub: lastSub } = lastPractice;
    if (tool) {
      navigate('practice', tool, lastSub);
      return;
    }
  }
  navigate(view, sub, sub2);
}, [navigate, lastPractice]);


return (
  <div className="app">
    {/* --- NEW HEADER --- */}
  <header className="app-header">
  <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
    <div className="header-brand" onClick={() => { navigate('home'); closeSidebar(); }}>
      <span className="mark">語</span>
      <span>
        日本語
        <small>JLPT {LEVEL_META.label}</small>
      </span>
    </div>
    <button className="hamburger" onClick={toggleSidebar} aria-label="Open menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</header>

    {/* --- OVERLAY --- */}
    <div className={cx('sidebar-overlay', sidebarOpen && 'open')} onClick={closeSidebar} />

    {/* --- SIDEBAR --- */}
    <aside className={cx('sidebar', sidebarOpen && 'open')}>
      <div className="sidebar-inner">
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="mark">語</span>
            <span>
              日本語
              <small>JLPT {LEVEL_META.label}</small>
            </span>
          </div>
          <button className="sidebar-close" onClick={closeSidebar} aria-label="Close menu">
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {TABS.map(([id, label]) => {
            const iconMap = {
              home: '🏠',
              kana: 'あ',
              kanji: '漢',
              vocab: '語',
              grammar: '文',
              practice: '練',
            };
            return (
              <span
                key={id}
                className={cx('sidebar-tab', v === id && 'on')}
                onClick={() => {
                  navigate(id);
                  closeSidebar();
                }}
              >
                <span className="tab-icon">{iconMap[id] || '•'}</span>
                {label}
              </span>
            );
          })}
        </nav>

        <div className="sidebar-divider" />

        {/* Bottom Section */}
      <div className="sidebar-bottom">
 {/* Level Switcher */}
  <div className="sidebar-levels">
    {LEVEL_ORDER.map(id => (
      <button
        key={id}
        className={cx('level-pill', level === id && 'on')}
        onClick={() => {
          setLevel(id);
          closeSidebar();
        }}
      >
        {LEVELS[id].label}
      </button>
    ))}
  </div>

 

  {/* Theme Toggle - NEW */}
  <button
    className="sidebar-action-btn"
    onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
    style={{ justifyContent: 'center' }}
  >
    {theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
  </button>

  {/* Profile */}
  <div className="sidebar-profile">
    <div className="sidebar-avatar">
      {user?.photoData ? (
        <img src={user.photoData} alt={user.name || 'User'} />
      ) : (
        (user ? user.name?.charAt(0).toUpperCase() : '☺')
      )}
    </div>
    <div className="sidebar-profile-info">
      <div className="name">{user ? user.name : 'Guest'}</div>
      <div className={cx('status', cp.connectionStatus === 'synced' ? 'online' : cp.connectionStatus === 'syncing' ? 'syncing' : 'offline')}>
        {user
          ? (cp.connectionStatus === 'synced' ? 'Synced'
              : cp.connectionStatus === 'syncing' ? 'Syncing…'
              : 'Offline')
          : 'Saved locally'}
      </div>
    </div>
  </div>

  {/* Logout / Sign-in */}
 {user ? (
  <button
  className="sidebar-action-btn danger"
  onClick={onSignOut}
  disabled={isLoggingOut}
  style={isLoggingOut ? { opacity: 0.7, cursor: 'default' } : {}}
>
  {isLoggingOut ? '⟳ Logging out…' : 'log out →'}
</button>
) : (
  // sign-in block — unchanged
  <>
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <GoogleBtn onSignIn={onSignIn} />
    </div>
    <div className="sidebar-guest-note">
      Sign in to save progress across devices.
    </div>
  </>
)}
</div>
      </div>
    </aside>

    {/* --- MAIN CONTENT --- */}
    <main className="main" key={level}>
      {v === 'home' && <Home setView={navigate} name={name} prog={cp.prog} setGoal={cp.setGoal} toggleDaily={cp.toggleDaily} setExamDate={cp.setExamDate} setLevel={setLevel} levelDue={cp.levelDue} user={user} onSignIn={onSignIn} />}
      {v === 'kana' && <KanaView nav={navigate} />}
      {v === 'kanji' && <KanjiView nav={navigate} />}
      {v === 'vocab' && <VocabView nav={navigate} />}
      {v === 'grammar' && <GrammarView nav={navigate} />}
      {v === 'numbers' && <NumbersView />}
      {v === 'practice' && <Practice cp={cp} tool={route.sub || 'review'} sub={route.sub2 || ''} navigate={navigate} />}
    </main>

    <footer className="foot">
      <div className="jp">頑張って！</div>
      <div style={{ marginTop: 6 }}>Built for JLPT {LEVEL_META.label} learners · Read, listen, then recall.</div>
    </footer>
  </div>
);
}

/* ---------- error boundary (a render crash shows a recovery screen, never a blank page) ---------- */
class ErrorBoundary extends React.Component{
  constructor(p){ super(p); this.state={err:false}; }
  static getDerivedStateFromError(){ return {err:true}; }
  componentDidCatch(e){ try{ console.error(e); }catch(x){} }
  render(){
    if(this.state.err){
      return (
        <div className="login"><div className="login-card" style={{textAlign:'center'}}>
          <div className="mark" style={{margin:'0 auto 20px'}}>⚠</div>
          <h2>Something went wrong</h2>
          <div className="sub">The app hit an unexpected error. Your saved progress is safe in your account — reloading usually fixes it.</div>
          <button className="btn primary" style={{marginTop:18}} onClick={function(){ try{window.location.reload();}catch(e){} }}>Reload app</button>
          <div className="login-foot"><button className="swlink" onClick={function(){ try{ if(cloud&&cloud.ok)cloud.signOut(); }catch(e){} try{window.location.reload();}catch(e){} }}>Sign out and reload</button></div>
        </div></div>
      );
    }
    return this.props.children;
  }
}

function RootApp() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  // Immediately load user profile from localStorage (no waiting for Firebase)
const [user, setUser] = useState(() => {
  const profile = lsGet('user_profile');
  if (profile) {
    // Attempt to load cached photo data
    const cachedPhoto = lsGet('photo_' + profile.uid);
    if (cachedPhoto) {
      profile.photoData = cachedPhoto;
    }
  }
  return profile || null;
});

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('app_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
    const firstLoad = !sessionStorage.getItem('app_loaded');
  if (firstLoad && window.location.hash && window.location.hash !== '#/') {
    window.location.hash = '#/';
    sessionStorage.setItem('app_loaded', 'true');
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  // Firebase auth listener – updates user with real info when available
  useEffect(() => {
    let alive = true;
    let unsub = null;

    cloud.init();

    if (!cloud.ok) return;

unsub = cloud.onAuth(function(fu) {
  if (!alive) return;
  if (fu) {
    const profile = {
      uid: fu.uid,
      email: fu.email || '',
      name: fu.displayName || fu.email || 'You',
      photoURL: fu.photoURL || '',
    };
    lsSet('user_profile', profile);
    setUser(profile);

    // Cache the photo offline
  if (fu.photoURL) {
  const cachedPhoto = getCachedPhoto(fu.uid);
  if (cachedPhoto) {
    // Use cached version immediately – no network request
    setUser(prev => ({ ...prev, photoData: cachedPhoto }));
  } else {
    // No cached version – fetch and cache
    fetchAndCachePhoto(fu.photoURL, fu.uid).then(photoData => {
      if (photoData) {
        setUser(prev => ({ ...prev, photoData }));
      }
    });
  }
}
  } else {
    lsDel('user_profile');
    setUser(null);
  }
});
    return () => {
      alive = false;
      if (unsub) try { unsub(); } catch (e) {}
    };
  }, []);

const signIn = () => {
  try {
    if (!cloud.ok) cloud.init();
    if (cloud.ok) {
      return cloud.signInGoogle().then(result => {
        const fu = result.user;
        const profile = {
          uid: fu.uid,
          email: fu.email || '',
          name: fu.displayName || fu.email || 'You',
          photoURL: fu.photoURL || '',
        };
        lsSet('user_profile', profile);
        setUser(profile);

if (fu.photoURL) {
  const cachedPhoto = getCachedPhoto(fu.uid);
  if (cachedPhoto) {
    // Use cached version immediately – no network request
    setUser(prev => ({ ...prev, photoData: cachedPhoto }));
  } else {
    // No cached version – fetch and cache
    fetchAndCachePhoto(fu.photoURL, fu.uid).then(photoData => {
      if (photoData) {
        setUser(prev => ({ ...prev, photoData }));
      }
    });
  }
}
      });
    }
  } catch (e) {
    return Promise.reject(e);
  }
  return Promise.reject(new Error('Sign-in unavailable'));
};

const signOut = () => {
  setIsLoggingOut(true);

  // Short delay so the user sees the loading state
  setTimeout(() => {
    try {
      cloud.signOut();
    } catch (e) {}

    if (user && user.uid) {
      lsDel(userKey(user.uid));
    }

    lsDel('user_profile');
    setUser(null);
    setIsLoggingOut(false);
    window.location.hash = '#/';
  }, 500);
};


useEffect(() => {
  // Pre-load voices as soon as the app mounts
  ensureVoicesLoaded().then(() => {
    // Warm up the speech engine with a silent utterance
    try {
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  });
}, []);

  // Render app immediately – no splash screen
  return (
    <App
      key={user ? user.uid : 'guest'}
      user={user}
      onSignIn={signIn}
      onSignOut={signOut}
      theme={theme}
      setTheme={setTheme}
      isLoggingOut={isLoggingOut}
    />
  );
}
function Root(){ return <ErrorBoundary><RootApp/></ErrorBoundary>; }

export { Root };
