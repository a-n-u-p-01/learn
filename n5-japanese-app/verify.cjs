const fs = require('fs');
const vm = require('vm');
const read = p => fs.readFileSync(p, 'utf8');

// Shared sandbox where UMD libs attach to the global (they use `self`/`globalThis`)
const ctx = {
  console,
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  window: { scrollTo: () => {}, addEventListener: () => {}, removeEventListener: () => {} },
  TextEncoder, TextDecoder, setTimeout, clearTimeout, queueMicrotask, Uint8Array,
};
ctx.self = ctx;
vm.createContext(ctx);

vm.runInContext(read('vendor/react.production.min.js'), ctx);                       // -> React
vm.runInContext(read('vendor/react-dom-server-legacy.browser.production.min.js'), ctx); // -> ReactDOMServer (sync)
vm.runInContext(read('vendor/babel.min.js'), ctx);                                  // -> Babel

let appJs = ctx.Babel.transform(read('src/app.jsx'), { presets: ['react'], compact: false }).code;
appJs = appJs.replace(/ReactDOM\.createRoot[\s\S]*$/, '// mount stripped');

const data = ['kana','kanji','vocab','grammar','grammarq','reading'].map(n => read('src/data/'+n+'.js')).join('\n');

const harness = `
var __out=[]; var __ok=true;
function __t(name, el){ try{ var s=ReactDOMServer.renderToStaticMarkup(el); __out.push(name+': OK ('+s.length+' chars)'); }catch(e){ __out.push(name+': FAIL -> '+(e&&e.message)); __ok=false; } }
var __user={uid:'u1',email:'kenji@example.com',name:'kenji'};
var __cp={prog:{known:{},best:{},srs:{},mockHistory:[],daily:{},examDate:''},markKnown:function(){},setBest:function(){},reviewCard:function(){},setGoal:function(){},addMockResult:function(){},setExamDate:function(){},toggleDaily:function(){}};
__t('Root (no auth -> Splash)', React.createElement(Root));
__t('Splash', React.createElement(Splash));
__t('AuthScreen', React.createElement(AuthScreen));
__t('CloudError', React.createElement(CloudError));
__t('App', React.createElement(App,{user:__user,onSignOut:function(){}}));
var __hprog={known:{},best:{},srs:{},mockHistory:[],daily:{},examDate:'2026-12-07',stats:{streak:3,best:5,goal:20,todayDate:'2026-06-17',todayCount:8,lastActive:'2026-06-17'}};
__t('Home', React.createElement(Home,{setView:function(){},name:'kenji',prog:__hprog,setGoal:function(){},toggleDaily:function(){},setExamDate:function(){}}));
__t('StreakCard', React.createElement(StreakCard,{prog:{stats:{streak:3,best:5,goal:20}},setGoal:function(){}}));
__t('TodayPanel', React.createElement(TodayPanel,{prog:__hprog,name:'kenji',setView:function(){},toggleDaily:function(){},setExamDate:function(){}}));
__t('MasteryPanel', React.createElement(MasteryPanel,{pct:42,known:55,total:TOTAL_CARDS,areas:[['Kana',20,200],['Kanji',10,86],['Vocabulary',25,140]]}));
__t('NextLevel', React.createElement(NextLevel,{pct:85}));
__t('KanaView', React.createElement(KanaView));
__t('KanjiView', React.createElement(KanjiView));
__t('VocabView', React.createElement(VocabView));
__t('GrammarView', React.createElement(GrammarView));
__t('Practice/Flashcards', React.createElement(Practice,{cp:__cp,tool:'cards',setTool:function(){}}));
__t('Practice/Quiz route', React.createElement(Practice,{cp:__cp,tool:'quiz',setTool:function(){}}));
__t('Quiz', React.createElement(Quiz,{cp:__cp}));
__t('BottomNav', React.createElement(BottomNav,{view:'kana',navigate:function(){}}));
__t('Practice/Review (default)', React.createElement(Practice,{cp:__cp,tool:'review',setTool:function(){}}));
__t('Practice/Reading', React.createElement(Practice,{cp:__cp,tool:'reading',setTool:function(){}}));
__t('Review', React.createElement(Review,{cp:__cp}));
__t('Reading', React.createElement(Reading));
['kana','vocab','kanji','listen','grammar'].forEach(function(m){ var qs=makeQuestions(m); var ok=qs.length>0 && qs.every(function(x){return x.prompt!=null && x.options && x.options.length>=2 && x.options.indexOf(x.correct)>=0;}); if(!ok){__ok=false;} __out.push('quiz mode '+m+': '+(ok?'OK':'FAIL')+' ('+qs.length+' Qs)'); });
__out.push('cat filter vocab/Directions: '+makeQuestions('vocab','Directions').length+' Qs (expect 4)');
__out.push('cat filter listen/Animals (words only): '+makeQuestions('listen','Animals').length+' Qs (expect 4)');
(function(){ var qs=makeQuestions('vocab','Verbs'); var allVerbEn=VOCAB.filter(function(v){return v.cat==='Verbs';}).map(function(v){return v.en;}); var ok=qs.length>0 && qs.every(function(q){return allVerbEn.indexOf(q.correct)>=0;}); if(!ok)__ok=false; __out.push('cat filter vocab/Verbs all-correct-in-category: '+(ok?'OK':'FAIL')); })();
__t('Mock (start)', React.createElement(Mock,{cp:__cp}));
(function(){ var mex=buildMock(); var ok=mex.length===20 && mex.every(function(q){return q.options&&q.options.length>=2&&q.options.indexOf(q.correct)>=0&&q.section;}); if(!ok)__ok=false; var sd={}; mex.forEach(function(q){sd[q.section]=(sd[q.section]||0)+1;}); __out.push('MOCK exam: '+mex.length+' Qs, valid='+ok+', sections='+Object.keys(sd).map(function(k){return k+':'+sd[k];}).join(' ')); })();
__t('MockHistory', React.createElement(MockHistory,{hist:[{t:Date.now()-172800000,score:11,total:20,pct:55},{t:Date.now()-86400000,score:14,total:20,pct:70},{t:Date.now(),score:17,total:20,pct:85}]}));
(function(){ var m=mergeProg({mockHistory:[{t:1,score:5,total:20,pct:25}]},{mockHistory:[{t:1,score:5,total:20,pct:25},{t:2,score:18,total:20,pct:90}]}); var ok=m.mockHistory.length===2; if(!ok)__ok=false; __out.push('mockHistory merge dedupe-by-t: '+(ok?'OK (2)':'FAIL ('+m.mockHistory.length+')')); })();
(function(){ var m=mergeProg({examDate:'2026-12-07',daily:{'2026-06-17':{quiz:true}}},{daily:{'2026-06-17':{read:true},'2026-06-18':{quiz:true}}}); var ok=m.examDate==='2026-12-07' && m.daily['2026-06-17'].quiz && m.daily['2026-06-17'].read && m.daily['2026-06-18'].quiz; if(!ok)__ok=false; __out.push('examDate+daily merge: '+(ok?'OK':'FAIL')); })();
(function(){ var freshNew=remainingNewInDeck({},'vocab'); var days=daysBetween('2026-06-17','2026-06-27'); __out.push('remainingNewInDeck(vocab, empty)='+freshNew+' (expect 640) · daysBetween 10d='+days+(freshNew===640&&days===10?' OK':' FAIL')); if(freshNew!==640||days!==10)__ok=false; })();
__out.push('cloud.ok (should be false in SSR): '+ (typeof cloud!=='undefined' ? cloud.ok : 'undefined'));
__out.push('parseHash default: '+ JSON.stringify(parseHash()));
__out.push('srs new+good: '+ JSON.stringify((function(){var r=srsUpdate(null,'good');return {interval:r.interval,reps:r.reps};})()));
__out.push('srs again resets: '+ JSON.stringify((function(){var r=srsUpdate({ease:2.5,interval:20,reps:4,lapses:0},'again');return {interval:r.interval,reps:r.reps,lapses:r.lapses};})()));
__out.push('srs easy>good interval: '+ (srsUpdate({ease:2.5,interval:10,reps:3,lapses:0},'easy').interval > srsUpdate({ease:2.5,interval:10,reps:3,lapses:0},'good').interval));
__out.push('buildQueue new cap: '+ buildQueue(buildDeck('vocab'), {}).length);
(function(){
  var t='2026-06-17';
  var s1=bumpStats(null,t); // first ever
  var s2=bumpStats({streak:3,best:3,lastActive:addDays(t,-1),todayDate:addDays(t,-1),todayCount:5,goal:20}, t); // continue
  var s3=bumpStats({streak:9,best:9,lastActive:addDays(t,-3),todayDate:addDays(t,-3),todayCount:5,goal:20}, t); // broken
  __out.push('streak first='+s1.streak+' continue='+s2.streak+' brokenReset='+s3.streak);
})();
(function(){
  var today=dayStr(); var deck=buildDeck('vocab');
  // 5 new introduced today, scheduled tomorrow
  var s1={}; for(var i=0;i<5;i++){ s1[deck[i].front]={ease:2.5,interval:1,reps:1,lapses:0,due:Date.now()+DAY_MS,first:today}; }
  __out.push('BUGFIX after 5 new today -> remaining='+buildQueue(deck,s1,today).length+' (expect 15, was 20)');
  // 20 introduced today -> no more new
  var s2={}; for(var j=0;j<20;j++){ s2[deck[j].front]={ease:2.5,interval:1,reps:1,lapses:0,due:Date.now()+DAY_MS,first:today}; }
  __out.push('after 20 new today -> remaining='+buildQueue(deck,s2,today).length+' (expect 0)');
  // a due card still appears even when new-allowance is 0
  s2[deck[0].front].due=Date.now()-1000;
  __out.push('1 due + allowance 0 -> remaining='+buildQueue(deck,s2,today).length+' (expect 1)');
  // next local day: new allowance refreshes
  __out.push('next day -> remaining='+buildQueue(deck,s2,addDays(today,1)).length+' (expect 21 = 1 due + 20 new)');
})();
(function(){
  // ---- full Review session simulation (mirrors reviewCard's srs logic) ----
  function applyReview(srsDeck, front, grade, today){ var prev=srsDeck[front]; var ns=srsUpdate(prev,grade); ns.first=(prev&&prev.first)?prev.first:today; srsDeck[front]=ns; }
  var deck=buildDeck('hira'); var srs={}; var today=dayStr(); var checks=[];
  var q=buildQueue(deck,srs,today); checks.push(['day1 initial new queue', q.length, 20]);
  q.slice(0,20).forEach(function(c){ applyReview(srs,c.front,'good',today); });
  checks.push(['same-day after 20 good -> 0', buildQueue(deck,srs,today).length, 0]);
  checks.push(['none due now after good', deck.filter(function(c){return srs[c.front]&&srs[c.front].due<=Date.now();}).length, 0]);
  // simulate the day-1 cards becoming due (time passes)
  Object.keys(srs).forEach(function(f){ srs[f].due=Date.now()-1000; });
  checks.push(['when due: 20 review + 20 new = 40', buildQueue(deck,srs,addDays(today,1)).length, 40]);
  // Again behavior on an existing card
  var f0=deck[0].front; var keepFirst=srs[f0].first;
  applyReview(srs,f0,'again',addDays(today,1));
  checks.push(['again keeps original first-day', srs[f0].first, keepFirst]);
  checks.push(['again resets reps to 0', srs[f0].reps, 0]);
  checks.push(['again due within ~1min', (srs[f0].due-Date.now()>0 && srs[f0].due-Date.now()<=120000), true]);
  // monotonic non-decreasing good intervals over a streak
  var s=null, prevI=0, mono=true; for(var i=0;i<6;i++){ s=srsUpdate(s,'good'); if(s.interval<prevI)mono=false; prevI=s.interval; }
  checks.push(['good intervals grow', mono, true]);
  // easy >= good >= hard at the same state
  var base={ease:2.5,interval:10,reps:3,lapses:0};
  checks.push(['easy>=good>=hard intervals', (srsUpdate(base,'easy').interval>=srsUpdate(base,'good').interval && srsUpdate(base,'good').interval>=srsUpdate(base,'hard').interval), true]);
  var lines=checks.map(function(c){ var ok=(c[1]===c[2]); if(!ok)__ok=false; return '  '+(ok?'PASS':'FAIL')+'  '+c[0]+'  ['+c[1]+(ok?'':' exp '+c[2])+']'; });
  __out.push('REVIEW SESSION SIM:\\n'+lines.join('\\n'));
})();
(function(){
  var seen={}, dups=[]; VOCAB.forEach(function(v){ if(seen[v.jp])dups.push(v.jp); seen[v.jp]=1; });
  var bad=VOCAB.filter(function(v){return !v.jp||!v.kana||!v.romaji||!v.en||!v.cat;}).length;
  var gbad=GRAMMAR.filter(function(g){return !g.point||!g.meaning||!g.explain||!g.ex||!g.ex.length;}).length;
  var cats={}; VOCAB.forEach(function(v){cats[v.cat]=(cats[v.cat]||0)+1;});
  __out.push('CONTENT COUNTS: kana='+(KANA_HIRA.length+KANA_KATA.length)+' kanji='+KANJI.length+' vocab='+VOCAB.length+' grammar='+GRAMMAR.length);
  __out.push('vocab categories: '+Object.keys(cats).map(function(k){return k+':'+cats[k];}).join(', '));
  __out.push('vocab dup jp: '+dups.length+(dups.length?(' ['+dups.join(',')+']'):'')+' | incomplete vocab: '+bad+' | incomplete grammar: '+gbad);
  var gqBad=GRAMMARQ.filter(function(x){return !x.q||!x.opts||x.opts.indexOf(x.a)<0;}).length;
  var rdBad=0, rdQ=0; READING.forEach(function(p){ if(!p.jp||!p.romaji||!p.en||!p.q||!p.q.length)rdBad++; p.q.forEach(function(qq){ rdQ++; if(!qq.opts||qq.opts.indexOf(qq.a)<0)rdBad++; }); });
  __out.push('grammarQ='+GRAMMARQ.length+' (answer-in-options bad: '+gqBad+') | reading passages='+READING.length+' questions='+rdQ+' (bad: '+rdBad+')');
  var exCounts=GRAMMAR.map(function(g){return g.ex.length;});
  var gEx2=GRAMMAR.every(function(g){return g.ex.length>=2 && g.ex.every(function(e){return e.jp&&e.romaji&&e.en;});});
  __out.push('grammar examples/point: min '+Math.min.apply(null,exCounts)+' max '+Math.max.apply(null,exCounts)+' · every point >=2 full examples: '+(gEx2?'OK':'FAIL'));
  if(!gEx2)__ok=false;
  if(dups.length||bad||gbad||gqBad||rdBad)__ok=false;
})();
__out.push('mergeProg sanity: '+ JSON.stringify(mergeProg({known:{a:{x:1}},best:{kana:3}},{known:{a:{y:1}},best:{kana:5}})));
`;

vm.runInContext(data + '\n' + appJs + '\n' + harness, ctx);
console.log(ctx.__out.join('\n'));
process.exit(ctx.__ok ? 0 : 1);
