/* global React, ReactDOM, firebase, KANA, KANJI, VOCAB, GRAMMAR */
const { useState, useEffect, useMemo, useRef, useCallback } = React;

/* ---------- helpers ---------- */
function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
const cx = (...a)=>a.filter(Boolean).join(' ');

/* ---------- hash routing ---------- */
const VIEWS = ['home','kana','kanji','vocab','grammar','practice'];
function parseHash(){
  let h=''; try{ h = window.location.hash || ''; }catch(e){}
  h = h.replace(/^#\/?/,'');
  const parts = h.split('/').filter(Boolean);
  const view = VIEWS.indexOf(parts[0])>=0 ? parts[0] : 'home';
  return { view, sub: parts[1]||'' };
}
function useHashRoute(){
  const [route,setRoute] = useState(parseHash);
  useEffect(()=>{
    const on=()=>setRoute(parseHash());
    try{ window.addEventListener('hashchange',on); }catch(e){}
    return ()=>{ try{ window.removeEventListener('hashchange',on); }catch(e){} };
  },[]);
  const navigate = useCallback((view,sub)=>{
    const target = '#/'+view+(sub?('/'+sub):'');
    try{ if(window.location.hash!==target) window.location.hash=target; else setRoute(parseHash()); }
    catch(e){ setRoute({view, sub:sub||''}); }
  },[]);
  return [route, navigate];
}

/* ---------- cloud (Firebase compat) ---------- */
const cloud = { ok:false, auth:null, db:null };
function cloudInit(){
  try{
    const cfg = (typeof window!=='undefined' && window.FIREBASE_CONFIG) ? window.FIREBASE_CONFIG : null;
    if(typeof firebase==='undefined' || !cfg || !cfg.apiKey) return;
    if(!firebase.apps || !firebase.apps.length) firebase.initializeApp(cfg);
    cloud.auth = firebase.auth();
    cloud.db = firebase.firestore();
    cloud.ok = true;
  }catch(e){ cloud.ok=false; }
}
cloudInit();
function cloudLoad(uid){ return cloud.db.collection('progress').doc(uid).get().then(s=> s.exists ? (s.data().data||null) : null ); }
function cloudSave(uid, data){
  try{ return cloud.db.collection('progress').doc(uid).set({ data, updatedAt: new Date().toISOString() }, { merge:true }).catch(function(){}); }
  catch(e){ return Promise.resolve(); }
}

/* ---------- progress (cloud only — Firestore is the single source of truth) ---------- */
function mergeProg(a,b){
  a=a||{known:{},best:{},srs:{}}; b=b||{known:{},best:{},srs:{}};
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
  return {known, best, srs, stats, mockHistory};
}

/* ---------- spaced repetition (SM-2 lite) ---------- */
const DAY_MS = 86400000;
const NEW_PER_DAY = 20;
function srsUpdate(s, grade){
  let ease=s?s.ease:2.5, interval=s?s.interval:0, reps=s?s.reps:0, lapses=s?s.lapses:0;
  if(grade==='again'){ return {ease:Math.max(1.3,ease-0.2), interval:0, reps:0, lapses:lapses+1, due:Date.now()+60000}; }
  if(grade==='hard'){ reps=reps+1; ease=Math.max(1.3,ease-0.15); interval=interval>0?Math.max(1,Math.round(interval*1.2)):1; }
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

/* ---------- daily streak & goal ---------- */
function dayStr(d){ d=d||new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function addDays(str,n){ const p=str.split('-').map(Number); const dt=new Date(p[0],p[1]-1,p[2]); dt.setDate(dt.getDate()+n); return dayStr(dt); }
function bumpStats(stats, today){
  const s=Object.assign({streak:0,best:0,lastActive:'',goal:20,todayDate:'',todayCount:0}, stats||{});
  if(s.todayDate!==today){ s.streak = (s.lastActive===addDays(today,-1)) ? (s.streak||0)+1 : 1; s.todayDate=today; s.todayCount=0; }
  s.todayCount=(s.todayCount||0)+1; s.lastActive=today; s.best=Math.max(s.best||0,s.streak||0);
  return s;
}
function effectiveStreak(stats){ if(!stats||!stats.lastActive)return 0; const t=dayStr(); return (stats.lastActive===t||stats.lastActive===addDays(t,-1))?(stats.streak||0):0; }
function mergeStats(a,b){ if(!a)return b||null; if(!b)return a; const base=(a.lastActive>=b.lastActive)?a:b; const out=Object.assign({},base); out.best=Math.max(a.best||0,b.best||0); out.goal=base.goal||a.goal||b.goal||20; if(a.todayDate&&a.todayDate===b.todayDate)out.todayCount=Math.max(a.todayCount||0,b.todayCount||0); return out; }
function useCloudProgress(uid){
  const [prog,setProg] = useState({known:{},best:{},srs:{}});
  const [loaded,setLoaded] = useState(false);
  const [syncState,setSyncState] = useState('idle'); // idle | saving | saved
  const timer = useRef(null);
  const progRef = useRef(prog);
  const loadedRef = useRef(false);
  useEffect(()=>{ progRef.current = prog; },[prog]);
  useEffect(()=>{ loadedRef.current = loaded; },[loaded]);
  const queueSave = (next)=>{ if(!cloud.ok) return; setSyncState('saving'); clearTimeout(timer.current); timer.current=setTimeout(()=>{ cloudSave(uid,next).then(()=>setSyncState('saved')); },500); };
  const commit = useCallback((updater)=>{
    setProg(prev=>{ const next = typeof updater==='function'?updater(prev):updater; queueSave(next); return next; });
  },[uid]);
  // load from Firestore + live cross-device subscription (DB is the only store)
  useEffect(()=>{
    if(!cloud.ok){ setLoaded(true); return; }
    let alive=true, unsub=null;
    cloudLoad(uid).then(d=>{ if(!alive)return; if(d) setProg(prev=>mergeProg(prev,d)); setLoaded(true); }).catch(()=>{ if(alive) setLoaded(true); });
    try{
      unsub = cloud.db.collection('progress').doc(uid).onSnapshot(snap=>{
        if(snap.metadata && snap.metadata.hasPendingWrites) return; // ignore our own in-flight writes
        const d = snap.exists ? (snap.data().data||null) : null;
        if(alive && d) setProg(prev=>mergeProg(prev,d));
      }, ()=>{});
    }catch(e){}
    return ()=>{ alive=false; if(unsub){ try{unsub();}catch(e){} } };
  },[uid]);
  // flush latest to the cloud when the tab is hidden/closed (never before first load)
  useEffect(()=>{
    if(!cloud.ok) return;
    const flush=()=>{ if(!loadedRef.current) return; clearTimeout(timer.current); try{ cloudSave(uid, progRef.current); }catch(e){} };
    const onVis=()=>{ try{ if(document.visibilityState==='hidden') flush(); }catch(e){} };
    try{ document.addEventListener('visibilitychange',onVis); window.addEventListener('pagehide',flush); }catch(e){}
    return ()=>{ try{ document.removeEventListener('visibilitychange',onVis); window.removeEventListener('pagehide',flush); }catch(e){} };
  },[uid]);
  const markKnown=(deck,front)=>commit(prev=>{ const d=Object.assign({},prev.known[deck]||{}); if(d[front])delete d[front]; else d[front]=1; const known=Object.assign({},prev.known); known[deck]=d; return {known,best:prev.best,srs:prev.srs||{},stats:prev.stats,mockHistory:prev.mockHistory}; });
  const setBest=(mode,score)=>commit(prev=>{ const best=Object.assign({},prev.best); best[mode]=Math.max(best[mode]||0,score); return {known:prev.known,best,srs:prev.srs||{},stats:prev.stats,mockHistory:prev.mockHistory}; });
  const reviewCard=(deck,front,grade)=>commit(prev=>{
    const srs=Object.assign({}, prev.srs||{}); const dd=Object.assign({}, srs[deck]||{});
    const prevCard=dd[front];
    const ns=srsUpdate(prevCard, grade);
    ns.first = (prevCard && prevCard.first) ? prevCard.first : dayStr(); // creation day → drives per-day new limit
    dd[front]=ns; srs[deck]=dd;
    const known=Object.assign({}, prev.known); const kd=Object.assign({}, known[deck]||{});
    if(grade!=='again' && ns.reps>=2) kd[front]=1; if(grade==='again') delete kd[front];
    known[deck]=kd;
    const stats=bumpStats(prev.stats, dayStr());
    return {known, best:prev.best, srs, stats, mockHistory:prev.mockHistory};
  });
  const setGoal=(n)=>commit(prev=>{ const stats=Object.assign({streak:0,best:0,lastActive:'',goal:20,todayDate:'',todayCount:0}, prev.stats||{}); stats.goal=Math.max(5,Math.min(200,n)); return {known:prev.known,best:prev.best,srs:prev.srs||{},stats,mockHistory:prev.mockHistory}; });
  const addMockResult=(score,total)=>commit(prev=>{
    const pct=Math.round(score/(total||1)*100);
    const mockHistory=(prev.mockHistory||[]).concat([{t:Date.now(),score:score,total:total,pct:pct}]).slice(-50);
    const best=Object.assign({},prev.best); best.mock=Math.max(best.mock||0,score);
    return {known:prev.known,best:best,srs:prev.srs||{},stats:prev.stats,mockHistory:mockHistory};
  });
  return { prog, loaded, markKnown, setBest, reviewCard, setGoal, addMockResult, syncState };
}

/* ---------- voice (Web Speech API) ---------- */
let JA_VOICE = null;
function _loadVoices(){ try{ const vs=window.speechSynthesis.getVoices()||[]; JA_VOICE=vs.filter(v=>v.lang&&v.lang.toLowerCase().indexOf('ja')===0)[0]||null; }catch(e){} }
let speechSupported = false;
try{ speechSupported = typeof window!=='undefined' && !!window.speechSynthesis; }catch(e){}
if(speechSupported){ _loadVoices(); try{ window.speechSynthesis.onvoiceschanged=_loadVoices; }catch(e){} }
function speak(text){
  if(!speechSupported||!text) return;
  try{ const u=new SpeechSynthesisUtterance(text); u.lang='ja-JP'; if(JA_VOICE)u.voice=JA_VOICE; u.rate=0.85; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); }catch(e){}
}
function SpeakBtn({text,label,lg}){
  if(!speechSupported) return null;
  return <button className={cx('spk',lg&&'lg')} aria-label={'Play pronunciation'+(label?' for '+label:'')} onClick={(e)=>{e.stopPropagation();speak(text);}}>🔊</button>;
}

/* ---------- counts ---------- */
const KANA_HIRA = [...KANA.hiragana.base,...KANA.hiragana.dakuten,...KANA.hiragana.yoon];
const KANA_KATA = [...KANA.katakana.base,...KANA.katakana.dakuten,...KANA.katakana.yoon];
const TOTAL_CARDS = KANA_HIRA.length + KANA_KATA.length + KANJI.length + VOCAB.length;
function exWord(ex){ return (ex||'').split(' (')[0]; }

/* ---------- nav ---------- */
const TABS = [['home','Overview'],['kana','Kana'],['kanji','Kanji'],['vocab','Vocabulary'],['grammar','Grammar'],['practice','Practice']];
const NAVICON = {home:'家',kana:'あ',kanji:'漢',vocab:'語',grammar:'文',practice:'練'};
const NAVSHORT = {home:'Home',kana:'Kana',kanji:'Kanji',vocab:'Words',grammar:'Grammar',practice:'Practice'};
function Nav({view,navigate,user,onSignOut,syncState}){
  const [menu,setMenu] = useState(false);
  const syncTxt = syncState==='saving' ? '☁ Saving…' : '☁ Cloud sync on';
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <div className="brand" onClick={()=>navigate('home')} style={{cursor:'pointer'}}>
          <span className="mark">五</span>
          <span>N5 日本語<small>Japanese from zero</small></span>
        </div>
        <div className="tabs">
          {TABS.map(([id,label])=>(<span key={id} className={cx('tab',view===id&&'on')} aria-current={view===id?'page':undefined} onClick={()=>navigate(id)}>{label}</span>))}
        </div>
        <div className="prof">
          <button className="prof-btn" onClick={()=>setMenu(m=>!m)} aria-label="Account menu">
            <span className="ava on">{(user.name||'U').charAt(0).toUpperCase()}</span>
            <span className="prof-name">{user.name}</span>
          </button>
          {menu && (
            <React.Fragment>
              <div className="menu-back" onClick={()=>setMenu(false)}/>
              <div className="prof-menu">
                <div className="who">{user.email}<br/><span className="synctag on">{syncTxt}</span></div>
                <div className="sep"/>
                <button className="mi" onClick={()=>{setMenu(false);navigate('practice');}}>Continue practicing</button>
                <button className="mi danger" onClick={()=>{setMenu(false);onSignOut();}}>Sign out</button>
              </div>
            </React.Fragment>
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
          <span className="bi">{NAVICON[id]}</span><span className="bl">{NAVSHORT[id]}</span>
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
        <div className="mhead"><div><div className="ey">Your progress</div><h2>N5 mastery</h2></div><div className="mpct">{pct}<span>%</span></div></div>
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
function NextLevel({pct}){
  const ready = pct>=80;
  return (
    <section className="block wrap">
      <a className="n4card" href={N4_URL} target="_blank" rel="noopener noreferrer">
        <div className="n4info">
          <div className="ey">{ready?"You're ready 🎉":'Next level'}</div>
          <h3>Continue to JLPT N4 <span className="arr">→</span></h3>
          <p>You've mastered {pct}% of N5. When you're ready, N4 builds on everything here — more kanji, vocabulary and grammar.</p>
        </div>
        <div className="n4badge">N4</div>
      </a>
    </section>
  );
}
function Home({setView,name,prog,setGoal}){
  const known = prog.known||{};
  const knownCount = Object.keys(known).reduce((a,k)=>a+Object.keys(known[k]||{}).length,0);
  const pct = Math.round(knownCount/TOTAL_CARDS*100);
  const dueN = dueCount(prog.srs);
  const areas = [
    ['Kana', (Object.keys(known.hira||{}).length+Object.keys(known.kata||{}).length), KANA_HIRA.length+KANA_KATA.length],
    ['Kanji', Object.keys(known.kanji||{}).length, KANJI.length],
    ['Vocabulary', Object.keys(known.vocab||{}).length, VOCAB.length],
  ];
  const stats = [
    [String(KANA_HIRA.length+KANA_KATA.length),'kana characters'],
    [String(KANJI.length),'core kanji'],
    [String(VOCAB.length),'vocabulary words'],
    [String(GRAMMAR.length),'grammar points'],
  ];
  return (
    <div>
      <section className="hero wrap">
        <span className="kicker">● JLPT N5 · Beginner</span>
        <h1>Learn Japanese<br/>from <span className="jp">ゼロ</span> to N5.</h1>
        <p>A calm, focused place to master the JLPT N5: read the reference once, then lock it in with flashcards and quizzes — with audio, and your progress synced to every device.</p>
        <div className="greet">
          <span className="ava">{(name||'U').charAt(0).toUpperCase()}</span>
          <div className="gt"><b>Welcome back, {name}!</b><span>{knownCount>0?'Pick up where you left off.':'Mark cards as known to track your progress.'}</span></div>
          <div className="gp">
            <div className="lab"><span>Cards known</span><span>{knownCount} / {TOTAL_CARDS}</span></div>
            <div className="pbar"><i style={{width:Math.max(pct,2)+'%'}}/></div>
          </div>
        </div>
        <StreakCard prog={prog} setGoal={setGoal}/>
        <div className="cta">
          {dueN>0
            ? <button className="btn primary" onClick={()=>setView('practice')}>🧠 Review {dueN} due →</button>
            : <button className="btn primary" onClick={()=>setView('practice')}>Start practicing →</button>}
          <button className="btn ghost" onClick={()=>setView('kana')}>Browse kana</button>
        </div>
        <div className="stat-row">{stats.map(([n,l])=>(<div className="stat" key={l}><b>{n}</b><span>{l}</span></div>))}</div>
      </section>

      <MasteryPanel pct={pct} known={knownCount} total={TOTAL_CARDS} areas={areas}/>

      <section className="block wrap">
        <div className="shead"><div><div className="ey">How to use this</div><h2>The fastest path to N5</h2>
          <p>Reading alone is slow. The proven route is read once, then test yourself — active recall is what makes it stick.</p></div></div>
        <div className="steps">
          <div className="step"><span className="num">1</span><div><h4>Learn the kana first</h4><p>Hiragana and katakana are the foundation. Tap any character to hear it, and drill until you can read instantly.</p></div></div>
          <div className="step"><span className="num">2</span><div><h4>Build vocabulary &amp; kanji daily</h4><p>Use the flashcards and quizzes every day. A little, often, beats cramming — and your progress follows you across devices.</p></div></div>
          <div className="step"><span className="num">3</span><div><h4>Glue it together with grammar</h4><p>Grammar turns words into sentences. Learn the particles and core patterns, then hear them in the example sentences.</p></div></div>
        </div>
      </section>

      <section className="block wrap" style={{paddingTop:0}}>
        <div className="grid-3">
          <div className="ocard" onClick={()=>setView('kana')} style={{cursor:'pointer'}}><div className="n">あ ア</div><h3>Kana</h3><p>Complete hiragana &amp; katakana charts with romaji and audio.</p></div>
          <div className="ocard" onClick={()=>setView('kanji')} style={{cursor:'pointer'}}><div className="n">漢字</div><h3>Kanji</h3><p>Core N5 kanji with on/kun readings, meanings, and a spoken example.</p></div>
          <div className="ocard" onClick={()=>setView('vocab')} style={{cursor:'pointer'}}><div className="n">言葉</div><h3>Vocabulary</h3><p>Essential N5 words by theme — tap to hear each one.</p></div>
          <div className="ocard" onClick={()=>setView('grammar')} style={{cursor:'pointer'}}><div className="n">文法</div><h3>Grammar</h3><p>Every core N5 pattern with a spoken example sentence.</p></div>
          <div className="ocard" onClick={()=>setView('practice')} style={{cursor:'pointer'}}><div className="n">練習</div><h3>Flashcards</h3><p>Flip-card drills. Shuffle, listen, and mark what you know.</p></div>
          <div className="ocard" onClick={()=>setView('practice')} style={{cursor:'pointer'}}><div className="n">試験</div><h3>Quizzes</h3><p>Multiple-choice quizzes that score you and save your best.</p></div>
          <div className="ocard" onClick={()=>setView('practice','mock')} style={{cursor:'pointer'}}><div className="n">模擬</div><h3>Mock Test</h3><p>A timed, scored mix of all five sections — see if you're ready.</p></div>
        </div>
      </section>

      <NextLevel pct={pct}/>
    </div>
  );
}

/* ---------- kana ---------- */
function KanaGrid({list}){
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
}
function KanaView(){
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
      <div className="kana-sub">Basic — gojūon</div><KanaGrid list={set.base}/>
      <div className="kana-sub">Dakuten &amp; Handakuten — voiced sounds</div><KanaGrid list={set.dakuten}/>
      <div className="kana-sub">Yōon — combination sounds</div><KanaGrid list={set.yoon}/>
    </section>
  );
}

/* ---------- kanji ---------- */
function KanjiView(){
  const [q,setQ] = useState('');
  const list = useMemo(()=>{ const s=q.trim().toLowerCase(); if(!s)return KANJI;
    return KANJI.filter(k=> k.c.includes(s)||k.mean.toLowerCase().includes(s)||k.on.toLowerCase().includes(s)||k.kun.toLowerCase().includes(s)||k.ex.toLowerCase().includes(s)); },[q]);
  return (
    <section className="block wrap">
      <div className="shead">
        <div><div className="ey">{KANJI.length} characters</div><h2>Kanji</h2><p>On'yomi in katakana, kun'yomi in hiragana, with a spoken example word.</p></div>
        <input className="btn" style={{minWidth:'200px'}} placeholder="Search kanji or meaning…" value={q} onChange={e=>setQ(e.target.value)}/>
      </div>
      <div className="kanji-grid">
        {list.map((k,i)=>(
          <div className="kj" key={k.c+i}>
            <div className="big">{k.c}</div>
            <div className="meta">
              <div className="mean-row"><span className="mean">{k.mean}</span><SpeakBtn text={exWord(k.ex)} label={k.mean}/></div>
              <div className="rd">音 {k.on}　訓 {k.kun}</div>
              <div className="ex">{k.ex}</div>
            </div>
          </div>
        ))}
      </div>
      {list.length===0 && <p className="muted center" style={{marginTop:30}}>No kanji match “{q}”.</p>}
    </section>
  );
}

/* ---------- vocab ---------- */
function VocabView(){
  const cats = useMemo(()=>['All',...Array.from(new Set(VOCAB.map(v=>v.cat)))],[]);
  const [cat,setCat] = useState('All');
  const list = cat==='All'?VOCAB:VOCAB.filter(v=>v.cat===cat);
  return (
    <section className="block wrap">
      <div className="shead"><div><div className="ey">{VOCAB.length} words</div><h2>Vocabulary</h2><p>Filter by theme. Each word shows kanji/kana, romaji, and meaning — tap 🔊 to hear it.</p></div></div>
      <div className="chips" style={{marginBottom:18}}>{cats.map(c=>(<span key={c} className={cx('chip',cat===c&&'on')} onClick={()=>setCat(c)}>{c}</span>))}</div>
      <div className="vtable">
        <div className="vhead"><span>Japanese</span><span>Romaji</span><span>Meaning</span></div>
        {list.map((v,i)=>(
          <div className="vrow" key={v.jp+i}>
            <div className="jp">{v.jp}<small>{v.kana}</small></div>
            <div className="ro">{v.romaji}</div>
            <div className="en"><div className="en-wrap"><span>{v.en}</span><SpeakBtn text={v.kana} label={v.en}/></div></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- grammar ---------- */
function GrammarView(){
  return (
    <section className="block wrap">
      <div className="shead"><div><div className="ey">{GRAMMAR.length} patterns</div><h2>Grammar</h2><p>The core building blocks of N5 sentences, each with a spoken example.</p></div></div>
      <div>
        {GRAMMAR.map((g,i)=>(
          <div className="gcard" key={i}>
            <div className="top"><span className="pt">{g.point}</span><span className="mn">{g.meaning}</span></div>
            <div className="exp">{g.explain}</div>
            {g.ex.map((e,j)=>(
              <div className="gex" key={j}><SpeakBtn text={e.jp} label="example sentence"/><div className="j">{e.jp}</div><div className="r">{e.romaji}</div><div className="e">{e.en}</div></div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- flashcards ---------- */
function buildDeck(id){
  if(id==='hira') return KANA_HIRA.map(x=>({front:x.k,back:x.r,tag:'Hiragana',fc:'jp',say:x.k}));
  if(id==='kata') return KANA_KATA.map(x=>({front:x.k,back:x.r,tag:'Katakana',fc:'jp',say:x.k}));
  if(id==='kanji') return KANJI.map(k=>({front:k.c,back:k.mean,sub:'音 '+k.on+'　訓 '+k.kun,sub2:k.ex,tag:'Kanji',fc:'jp',say:exWord(k.ex)}));
  return VOCAB.map(v=>({front:v.jp,back:v.en,sub:v.kana+' · '+v.romaji,tag:v.cat,fc:'jpw',say:v.kana}));
}
const DECKS = [['hira','Hiragana'],['kata','Katakana'],['kanji','Kanji'],['vocab','Vocabulary']];
function Flashcards({cp}){
  const [deckId,setDeckId] = useState('hira');
  const [order,setOrder] = useState(()=>buildDeck('hira'));
  const [idx,setIdx] = useState(0);
  const [flip,setFlip] = useState(false);
  const pickDeck = useCallback((id)=>{ setDeckId(id); setOrder(buildDeck(id)); setIdx(0); setFlip(false); },[]);
  const reshuffle = ()=>{ setOrder(o=>shuffle(o)); setIdx(0); setFlip(false); };
  const go = useCallback((d)=>{ setFlip(false); setIdx(i=>{ const n=i+d; if(n<0)return order.length-1; if(n>=order.length)return 0; return n; }); },[order.length]);
  const card = order[idx];
  const knownDeck = (cp.prog.known||{})[deckId]||{};
  const knownCount = Object.keys(knownDeck).length;
  const isKnown = card && knownDeck[card.front];
  useEffect(()=>{
    const h=(e)=>{ if(e.key===' '){e.preventDefault();setFlip(f=>!f);} else if(e.key==='ArrowRight')go(1); else if(e.key==='ArrowLeft')go(-1); };
    window.addEventListener('keydown',h); return ()=>window.removeEventListener('keydown',h);
  },[go]);
  return (
    <div className="study-wrap">
      <div className="chips" style={{justifyContent:'center',marginBottom:22}}>{DECKS.map(([id,l])=>(<span key={id} className={cx('chip',deckId===id&&'on')} onClick={()=>pickDeck(id)}>{l}</span>))}</div>
      <div className="fc-bar"><span className="fc-count">Card <b>{idx+1}</b> / {order.length}</span><span className="fc-count">Known <b>{knownCount}</b> / {order.length}</span></div>
      <div className={cx('flashcard',flip&&'flipped')} onClick={()=>setFlip(f=>!f)}>
        <div className="fc-inner">
          <div className="fc-face fc-front"><span className="tag">{card.tag}</span><span className={card.fc==='jp'?'q':'qs'}>{card.front}</span><span className="hint">tap to reveal</span></div>
          <div className="fc-face fc-back"><span className="tag">{card.tag}</span><span className="a">{card.back}</span>{card.sub&&<span className="sub">{card.sub}</span>}{card.sub2&&<span className="sub2">{card.sub2}</span>}<span className="hint">tap to flip back</span></div>
        </div>
      </div>
      <div className="fc-controls">
        <button className="icon-btn" onClick={()=>go(-1)} title="Previous (←)">‹</button>
        <button className="btn" onClick={()=>setFlip(f=>!f)}>Flip</button>
        {speechSupported && <button className="icon-btn" onClick={()=>speak(card.say)} title="Listen">🔊</button>}
        <button className="icon-btn" onClick={reshuffle} title="Shuffle">⇄</button>
        <button className="icon-btn" onClick={()=>go(1)} title="Next (→)">›</button>
      </div>
      <div className="known-row"><button className={cx('btn','sm',isKnown&&'primary')} onClick={()=>cp.markKnown(deckId,card.front)}>{isKnown?'✓ Known':'Mark as known'}</button></div>
    </div>
  );
}

/* ---------- quiz ---------- */
function buildOptions(correct, all){
  const set=new Set([correct]);
  for(const a of shuffle(all)){ if(set.size>=4)break; set.add(a); }
  return shuffle([...set]);
}
const QUIZZES = [['kana','Kana'],['vocab','Vocab'],['kanji','Kanji'],['listen','Listening'],['grammar','Grammar']];
const VOCAB_CATS = ['All'].concat(Array.from(new Set(VOCAB.map(function(v){return v.cat;}))));
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
  else if(mode==='kanji'){ pool=KANJI.map(k=>({p:k.c,a:k.mean,say:exWord(k.ex)})); kind='jp-big'; }
  else { const vl=useCat?VOCAB.filter(function(v){return v.cat===cat;}):VOCAB; pool=vl.map(v=>({p:v.jp,a:v.en,say:v.kana,sub:v.kana})); kind='jp-med'; }
  const allA=pool.map(x=>x.a);
  return shuffle(pool).slice(0,10).map(function(it){ return {kind:kind, prompt:it.p, sub:it.sub, say:it.say, correct:it.a, options:buildOptions(it.a, allA)}; });
}
function Quiz({cp}){
  const [mode,setMode]=useState('kana');
  const [seed,setSeed]=useState(0);
  const [i,setI]=useState(0);
  const [picked,setPicked]=useState(null);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const [cat,setCat]=useState('All');
  const best=cp.prog.best||{};
  const questions=useMemo(()=>makeQuestions(mode,cat),[mode,cat,seed]);
  const N=questions.length;
  const q=questions[i];
  useEffect(()=>{ if(mode==='listen' && !done && questions[i]) speak(questions[i].say); },[mode,seed,i,done]);
  const restart=()=>{ setSeed(s=>s+1); setI(0); setPicked(null); setScore(0); setDone(false); };
  const changeMode=(m)=>{ setMode(m); setCat('All'); setSeed(s=>s+1); setI(0); setPicked(null); setScore(0); setDone(false); };
  const changeCat=(c)=>{ setCat(c); setSeed(s=>s+1); setI(0); setPicked(null); setScore(0); setDone(false); };
  const choose=(opt)=>{ if(picked!==null)return; setPicked(opt); if(opt===q.correct)setScore(s=>s+1); };
  const next=()=>{ if(i<N-1){ setI(i+1); setPicked(null); } else { setDone(true); cp.setBest(mode,score); } };
  const pct=Math.round(score/N*100);
  const msg=pct===100?'Perfect! 完璧です！':pct>=70?'Great work — keep going!':pct>=40?'Good start. Review and retry.':'Keep practicing — you\'ve got this.';
  const reveal = picked!==null;
  const promptLbl = mode==='listen'?'Listen, then choose the meaning':(mode==='grammar'?'Choose the correct word':'What does this mean?');
  return (
    <div className="quiz-wrap">
      <div className="chips" style={{justifyContent:'center',marginBottom:(mode==='vocab'||mode==='listen')?12:22}}>{QUIZZES.map(([id,l])=>(<span key={id} className={cx('chip',mode===id&&'on')} onClick={()=>changeMode(id)}>{l}</span>))}</div>
      {(mode==='vocab'||mode==='listen') && (
        <div className="chips catchips" style={{justifyContent:'center',marginBottom:22}}>
          {VOCAB_CATS.map(function(c){ return <span key={c} className={cx('chip',cat===c&&'on')} onClick={()=>changeCat(c)}>{c}</span>; })}
        </div>
      )}
      {!done ? (
        <div className="qcard">
          <div className="pbar" style={{marginBottom:24}}><i style={{width:(i/N*100)+'%'}}/></div>
          <div className="q-prompt">
            <div className="lbl">{promptLbl}</div>
            {q.kind==='audio' ? (
              <div>
                <button className="spk lg" style={{margin:'10px auto 4px'}} aria-label="Play audio" onClick={()=>speak(q.say)}>🔊</button>
                {reveal ? <div style={{fontFamily:'var(--jp)',fontSize:q.long?'clamp(17px,3.4vw,23px)':'clamp(26px,6vw,40px)',fontWeight:q.long?500:700,lineHeight:1.5}}>{q.prompt}<span style={{display:'block',fontSize:'13px',color:'var(--muted)',fontWeight:400,marginTop:5}}>{q.sub}</span></div> : <div className="muted" style={{fontSize:'13px'}}>tap 🔊 to replay</div>}
              </div>
            ) : (
              <div className={q.kind==='jp-big'?'big':'med'}>{q.prompt}</div>
            )}
            {(q.kind==='jp-big'||q.kind==='jp-med') && speechSupported && <button className="spk lg" style={{margin:'14px auto 0'}} aria-label="Listen" onClick={()=>speak(q.say)}>🔊</button>}
          </div>
          <div className="opts">
            {q.options.map((opt,k)=>{ let st=''; if(reveal){ if(opt===q.correct)st='correct'; else if(opt===picked)st='wrong'; }
              return <button key={opt+k} className={cx('opt',st)} disabled={reveal} onClick={()=>choose(opt)}><span className="k">{String.fromCharCode(65+k)}</span>{opt}</button>; })}
          </div>
          <div className={cx('feedback',reveal&&(picked===q.correct?'ok':'no'))}>{reveal?((picked===q.correct?'Correct!':'Answer: '+q.correct)+(q.explain?(' · '+q.explain):'')):''}</div>
          <div className="q-foot"><span className="score-pill">Score <b>{score}</b> / {N}　·　Question {i+1}/{N}</span><button className="btn primary" disabled={!reveal} onClick={next}>{i<N-1?'Next →':'Finish'}</button></div>
        </div>
      ):(
        <div className="qcard"><div className="result"><div className="pct">{pct}%</div><div className="msg">{msg}</div>
          <div className="score-pill" style={{display:'block',marginBottom:18}}>You scored <b>{score}</b> / {N}　·　Best: <b>{Math.max(best[mode]||0,score)}</b> / {N}</div>
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
function Review({cp}){
  const [deckId,setDeckId] = useState('hira');
  const [queue,setQueue] = useState(()=>buildQueue(buildDeck('hira'), (cp.prog.srs||{}).hira||{}));
  const [reveal,setReveal] = useState(false);
  const [reviewed,setReviewed] = useState(0);
  const pickDeck=(id)=>{ setDeckId(id); setQueue(buildQueue(buildDeck(id), (cp.prog.srs||{})[id]||{})); setReveal(false); setReviewed(0); };
  const card = queue[0];
  const srsDeck = (cp.prog.srs||{})[deckId]||{};
  const cur = card ? srsDeck[card.front] : null;
  const isNew = card && !srsDeck[card.front];
  const today = dayStr();
  const newToday = newIntroducedToday(srsDeck, today);
  const stats = cp.prog.stats||{};
  const reviewedToday = (stats.todayDate===today) ? (stats.todayCount||0) : 0;
  const grade=(g)=>{
    if(!card) return;
    cp.reviewCard(deckId, card.front, g);
    setReviewed(n=>n+1);
    setQueue(q=>{ const first=q[0], rest=q.slice(1); if(g==='again'){ const pos=Math.min(rest.length,4); const nq=rest.slice(); nq.splice(pos,0,first); return nq; } return rest; });
    setReveal(false);
  };
  useEffect(()=>{
    const h=(e)=>{
      if(!card || e.repeat) return;
      if(e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
      if(e.key===' '||e.key==='Enter'){ e.preventDefault(); setReveal(r=>!r); return; }
      if(reveal){ if(e.key==='1')grade('again'); else if(e.key==='2')grade('hard'); else if(e.key==='3')grade('good'); else if(e.key==='4')grade('easy'); }
    };
    window.addEventListener('keydown',h); return ()=>window.removeEventListener('keydown',h);
  },[card,reveal]);
  return (
    <div className="study-wrap">
      <div className="chips" style={{justifyContent:'center',marginBottom:10}}>{DECKS.map(([id,l])=>(<span key={id} className={cx('chip',deckId===id&&'on')} onClick={()=>pickDeck(id)}>{l}</span>))}</div>
      <div className="muted center" style={{fontSize:'12px',marginBottom:18}}>Each deck has its own daily schedule (up to {NEW_PER_DAY} new/day).</div>
      {card ? (
        <React.Fragment>
          <div className="fc-bar"><span className="fc-count">Remaining <b>{queue.length}</b></span><span className="fc-count">New today <b>{newToday}</b>/{NEW_PER_DAY}　·　Reviewed today <b>{reviewedToday}</b></span></div>
          <div className="pbar" style={{marginBottom:16}}><i style={{width:((reviewed+queue.length)?Math.round(reviewed/(reviewed+queue.length)*100):0)+'%'}}/></div>
          <div className={cx('flashcard',reveal&&'flipped')} onClick={()=>setReveal(r=>!r)}>
            <div className="fc-inner">
              <div className="fc-face fc-front"><span className="tag">{card.tag}{isNew?' · NEW':''}</span><span className={card.fc==='jp'?'q':'qs'}>{card.front}</span><span className="hint">tap to reveal</span></div>
              <div className="fc-face fc-back"><span className="tag">{card.tag}</span><span className="a">{card.back}</span>{card.sub&&<span className="sub">{card.sub}</span>}{card.sub2&&<span className="sub2">{card.sub2}</span>}{speechSupported&&<button className="spk lg" style={{marginTop:10}} aria-label="Listen" onClick={(e)=>{e.stopPropagation();speak(card.say);}}>🔊</button>}</div>
            </div>
          </div>
          {!reveal ? (
            <div className="fc-controls"><button className="btn primary" style={{minWidth:'220px',justifyContent:'center'}} onClick={()=>setReveal(true)}>Show answer</button></div>
          ) : (
            <div className="grades">
              <button className="grade again" onClick={()=>grade('again')}><b>Again</b><span>{gradePreview(cur,'again')}</span></button>
              <button className="grade hard" onClick={()=>grade('hard')}><b>Hard</b><span>{gradePreview(cur,'hard')}</span></button>
              <button className="grade good" onClick={()=>grade('good')}><b>Good</b><span>{gradePreview(cur,'good')}</span></button>
              <button className="grade easy" onClick={()=>grade('easy')}><b>Easy</b><span>{gradePreview(cur,'easy')}</span></button>
            </div>
          )}
        </React.Fragment>
      ) : <CaughtUp srsDeck={srsDeck} reviewed={reviewed}/>}
    </div>
  );
}

/* ---------- reading ---------- */
function Reading(){
  const [idx,setIdx] = useState(0);
  const [picked,setPicked] = useState({});
  const [showEn,setShowEn] = useState(false);
  const [showRo,setShowRo] = useState(false);
  const p = READING[idx];
  const go=(d)=>{ setIdx(i=>{ const n=i+d; if(n<0)return READING.length-1; if(n>=READING.length)return 0; return n; }); setPicked({}); setShowEn(false); setShowRo(false); try{window.scrollTo({top:0,behavior:'smooth'});}catch(e){} };
  const pick=(qi,opt)=>{ setPicked(prev=> prev[qi]!=null ? prev : Object.assign({},prev,{[qi]:opt})); };
  return (
    <div className="quiz-wrap" style={{maxWidth:'640px'}}>
      <div className="fc-bar">
        <span className="fc-count">Passage <b>{idx+1}</b> / {READING.length}</span>
        <span className="r-tools">
          {speechSupported && <button className="spk" aria-label="Listen to the passage" onClick={()=>speak(p.jp)}>🔊</button>}
          <button className={cx('swlink',showRo&&'on')} onClick={()=>setShowRo(s=>!s)}>Romaji</button>
          <button className={cx('swlink',showEn&&'on')} onClick={()=>setShowEn(s=>!s)}>English</button>
        </span>
      </div>
      <div className="muted" style={{fontSize:'12px',margin:'0 0 12px'}}>Tap 🔊 to hear it · <b>Romaji</b> shows the pronunciation · <b>English</b> shows the meaning.</div>
      <div className="reading-card">
        <div className="rtitle">{p.title}</div>
        <p className="rjp">{p.jp}</p>
        {showRo && <p className="rro">{p.romaji}</p>}
        {showEn && <p className="ren">{p.en}</p>}
      </div>
      {p.q.map((qq,qi)=>(
        <div className="rq" key={qi}>
          <div className="rq-q">{qq.q}</div>
          <div className="opts">
            {qq.opts.map((opt,k)=>{ const pk=picked[qi]; let st=''; if(pk!=null){ if(opt===qq.a)st='correct'; else if(opt===pk)st='wrong'; }
              return <button key={k} className={cx('opt',st)} disabled={pk!=null} onClick={()=>pick(qi,opt)}><span className="k">{String.fromCharCode(65+k)}</span>{opt}</button>; })}
          </div>
        </div>
      ))}
      <div className="fc-controls"><button className="icon-btn" onClick={()=>go(-1)} title="Previous">‹</button><button className="btn" onClick={()=>go(1)}>Next passage ›</button></div>
    </div>
  );
}

/* ---------- mock test ---------- */
const MOCK_TIME = 12*60; // seconds
function buildMock(){
  const tag=(arr,section)=>arr.map(function(q){ q.section=section; return q; });
  const vocab=tag(makeQuestions('vocab').slice(0,6),'Vocabulary');
  const kanji=tag(makeQuestions('kanji').slice(0,4),'Kanji');
  const grammar=tag(makeQuestions('grammar').slice(0,4),'Grammar');
  const listen=tag(makeQuestions('listen').slice(0,3),'Listening');
  const rq=[]; READING.forEach(function(p){ (p.q||[]).forEach(function(qq){ rq.push({section:'Reading',kind:'reading',passage:p.jp,prompt:qq.q,options:shuffle(qq.opts.slice()),correct:qq.a}); }); });
  const reading=shuffle(rq).slice(0,3);
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
function Mock({cp}){
  const [started,setStarted]=useState(false);
  const [exam,setExam]=useState([]);
  const [idx,setIdx]=useState(0);
  const [answers,setAnswers]=useState({});
  const [timeLeft,setTimeLeft]=useState(MOCK_TIME);
  const [finished,setFinished]=useState(false);
  const [result,setResult]=useState(null);
  const [review,setReview]=useState(false);
  const best=(cp.prog.best||{}).mock||0;
  const examRef=useRef([]), ansRef=useRef({}), doneRef=useRef(false);
  useEffect(()=>{ examRef.current=exam; },[exam]);
  useEffect(()=>{ ansRef.current=answers; },[answers]);

  const start=()=>{ doneRef.current=false; setExam(buildMock()); setIdx(0); setAnswers({}); setTimeLeft(MOCK_TIME); setFinished(false); setResult(null); setReview(false); setStarted(true); };
  const finish=useCallback(()=>{
    if(doneRef.current) return; doneRef.current=true;
    const ex=examRef.current, ans=ansRef.current;
    let correct=0; const bySec={};
    ex.forEach(function(q,k){ const ok=ans[k]===q.correct; if(ok)correct++; const s=q.section; bySec[s]=bySec[s]||{c:0,t:0}; bySec[s].t++; if(ok)bySec[s].c++; });
    const N=ex.length||1; const pct=Math.round(correct/N*100);
    setResult({correct:correct,N:ex.length,pct:pct,pass:pct>=60,bySec:bySec});
    setFinished(true);
    try{ cp.addMockResult(correct, ex.length); }catch(e){}
  },[cp]);

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
          <h3 style={{fontSize:'23px',margin:'12px 0 6px'}}>Mock N5 Test</h3>
          <p className="muted" style={{fontSize:'14px',maxWidth:'430px',margin:'0 auto 6px'}}>20 mixed questions — vocabulary, kanji, grammar, reading and listening — in {Math.round(MOCK_TIME/60)} minutes. Like the real exam, you only see your score at the end.</p>
          {best>0 && <div className="score-pill" style={{display:'block',margin:'8px 0 16px'}}>Your best: <b>{best}</b> / 20</div>}
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
            <div className="score-pill" style={{display:'block',marginBottom:16}}>Score <b>{result.correct}</b> / {result.N}　·　Best <b>{Math.max(best,result.correct)}</b> / 20</div>
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

/* ---------- practice ---------- */
function Practice({cp, tool, setTool}){
  const t = tool||'review';
  const blurb = t==='mock' ? 'A timed, scored exam that mixes all five sections — see if you\'re ready for the real N5.'
    : t==='reading' ? 'Read short N5 texts and answer the questions — just like the exam\'s reading section.'
    : t==='quiz' ? 'Quiz yourself on kana, vocab, kanji, listening, and grammar — all scored and synced.'
    : t==='cards' ? 'Free, unlimited flip-through of any deck — browse at your own pace.'
    : 'Smart review schedules every card for you — hard ones return sooner, easy ones later. Synced to your account.';
  return (
    <section className="block wrap">
      <div className="shead" style={{justifyContent:'center',textAlign:'center'}}><div><div className="ey">Active recall</div><h2>Practice</h2><p style={{margin:'8px auto 0'}}>{blurb}</p></div></div>
      <div className="center" style={{marginBottom:30}}><div className="seg">
        <button className={cx(t==='review'&&'on')} onClick={()=>setTool('review')}>🧠 Review</button>
        <button className={cx(t==='cards'&&'on')} onClick={()=>setTool('cards')}>🃏 Browse</button>
        <button className={cx(t==='quiz'&&'on')} onClick={()=>setTool('quiz')}>✦ Quiz</button>
        <button className={cx(t==='reading'&&'on')} onClick={()=>setTool('reading')}>📖 Reading</button>
        <button className={cx(t==='mock'&&'on')} onClick={()=>setTool('mock')}>📝 Mock</button>
      </div></div>
      {t==='quiz'?<Quiz cp={cp}/>:t==='cards'?<Flashcards cp={cp}/>:t==='reading'?<Reading/>:t==='mock'?<Mock cp={cp}/>:<Review cp={cp}/>}
    </section>
  );
}

/* ---------- auth screen ---------- */
function authErr(e){
  const c=(e&&e.code)||'';
  if(c.indexOf('email-already-in-use')>=0) return 'That email already has an account — try signing in.';
  if(c.indexOf('invalid-credential')>=0||c.indexOf('wrong-password')>=0||c.indexOf('user-not-found')>=0) return 'Email or password is incorrect.';
  if(c.indexOf('invalid-email')>=0) return 'That email address looks invalid.';
  if(c.indexOf('weak-password')>=0) return 'Password must be at least 6 characters.';
  if(c.indexOf('too-many-requests')>=0) return 'Too many attempts — wait a moment and try again.';
  if(c.indexOf('network')>=0) return 'Network error — check your connection.';
  return (e&&e.message)||'Something went wrong. Please try again.';
}
function AuthScreen(){
  const [mode,setMode] = useState('signin');
  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');
  const [err,setErr] = useState('');
  const [busy,setBusy] = useState(false);
  const submit = ()=>{
    setErr('');
    if(!cloud.ok){ setErr('Sign-in is unavailable — check your internet connection.'); return; }
    if(!email||!pass){ setErr('Enter your email and password.'); return; }
    if(mode==='signup'&&pass.length<6){ setErr('Password must be at least 6 characters.'); return; }
    setBusy(true);
    const op = mode==='signup' ? cloud.auth.createUserWithEmailAndPassword(email.trim(),pass) : cloud.auth.signInWithEmailAndPassword(email.trim(),pass);
    op.catch(e=>{ setErr(authErr(e)); setBusy(false); });
  };
  return (
    <div className="login">
      <div className="login-card">
        <div className="mark">五</div>
        <h2>{mode==='signup'?'Create your account':'Sign in'}</h2>
        <div className="sub">{mode==='signup'?'Sign up to sync your N5 progress across every device.':'Welcome back — your progress is waiting.'}</div>
        <div className="field"><label>Email</label><input className="inp" type="email" autoComplete="email" value={email} placeholder="you@example.com" onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}/></div>
        <div className="field"><label>Password{mode==='signup'?' — at least 6 characters':''}</label><input className="inp" type="password" autoComplete={mode==='signup'?'new-password':'current-password'} value={pass} placeholder="••••••••" onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}/></div>
        <button className="btn primary" disabled={busy} onClick={submit}>{busy?'Please wait…':(mode==='signup'?'Create account →':'Sign in →')}</button>
        <div className="login-err">{err}</div>
        <div className="login-foot">
          {mode==='signup'
            ? <span className="muted" style={{fontSize:'13.5px'}}>Already have an account? <button className="swlink" onClick={()=>{setMode('signin');setErr('');}}>Sign in</button></span>
            : <span className="muted" style={{fontSize:'13.5px'}}>New here? <button className="swlink" onClick={()=>{setMode('signup');setErr('');}}>Create an account</button></span>}
        </div>
        <div className="save-note"><span>☁</span><span>Your progress is saved to your account and synced across every device. An account and an internet connection are required.</span></div>
      </div>
    </div>
  );
}

/* ---------- splash / cloud error ---------- */
function Splash(){
  return <div className="login"><div className="login-card" style={{textAlign:'center'}}><div className="mark" style={{margin:'0 auto 20px'}}>五</div><h2>N5 日本語</h2><div className="sub">Loading…</div></div></div>;
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

/* ---------- app shell ---------- */
function App({user,onSignOut}){
  const [route,navigate] = useHashRoute();
  const view = route.view;
  const cp = useCloudProgress(user.uid);
  useEffect(()=>{ try{window.scrollTo({top:0,behavior:'smooth'});}catch(e){} },[view]);
  if(!cp.loaded) return <Splash/>;
  return (
    <div className="app">
      <Nav view={view} navigate={navigate} user={user} onSignOut={onSignOut} syncState={cp.syncState}/>
      <main className="main">
        {view==='home' && <Home setView={navigate} name={user.name} prog={cp.prog} setGoal={cp.setGoal}/>}
        {view==='kana' && <KanaView/>}
        {view==='kanji' && <KanjiView/>}
        {view==='vocab' && <VocabView/>}
        {view==='grammar' && <GrammarView/>}
        {view==='practice' && <Practice cp={cp} tool={route.sub||'review'} setTool={(x)=>navigate('practice', x==='review'?'':x)}/>}
      </main>
      <footer className="foot"><div className="jp">頑張って！</div><div style={{marginTop:6}}>Built for JLPT N5 learners · Read, listen, then recall.</div></footer>
      <BottomNav view={view} navigate={navigate}/>
    </div>
  );
}

/* ---------- root (auth gate) ---------- */
function Root(){
  const [user,setUser] = useState(null);
  const [ready,setReady] = useState(false);
  useEffect(()=>{
    if(cloud.ok){
      const unsub = cloud.auth.onAuthStateChanged(fu=>{
        setUser(fu ? {uid:fu.uid, email:fu.email, name:(fu.email||'You').split('@')[0]} : null);
        setReady(true);
      });
      return unsub;
    } else { setReady(true); }
  },[]);
  if(!ready) return <Splash/>;
  if(!cloud.ok) return <CloudError/>;     // sign-in unavailable → cannot enter
  if(!user) return <AuthScreen/>;          // login required
  const signOut = ()=>{ try{ cloud.auth.signOut(); }catch(e){} setUser(null); };
  return <App key={user.uid} user={user} onSignOut={signOut}/>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root/>);
