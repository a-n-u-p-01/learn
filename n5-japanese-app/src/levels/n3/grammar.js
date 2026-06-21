// N3_GRAMMAR — 25 intermediate grammar points
var N3_GRAMMAR = [
  {
    point: '〜てしまう',
    meaning: 'finish doing; (regrettably) do',
    explain: 'Expresses completion of an action (often accidentally or with regret). 宿題を忘れてしまった = "I forgot my homework (oops)."',
    ex: [
      {jp:'全部食べてしまいました。',romaji:'Zenbu tabete shimaimashita.',en:'I ate everything (all).'},
      {jp:'財布をなくしてしまった。',romaji:'Saifu wo nakushite shimatta.',en:'I lost my wallet.'}
    ],
    tip: 'Often used with 〜てしまう in casual speech sounds like 〜ちゃう.',
    diff: 'Intermediate',
    related: ['〜ちゃう', '〜ておく']
  },
  {
    point: '〜ておく',
    meaning: 'do in advance',
    explain: 'Do an action now so it is ready for the future. 本を読んでおく = "read the book in advance (so it\'s done later)."',
    ex: [
      {jp:'明日までに宿題をやっておく。',romaji:'Ashita made ni shukudai wo yatteoku.',en:'I will do the homework in advance by tomorrow.'},
      {jp:'窓を開けておく。',romaji:'Mado wo aketeoku.',en:'I\'ll leave the window open (in advance).'}
    ],
    tip: 'Only used for actions done in preparation. Not used for natural events.',
    diff: 'Intermediate',
    related: ['〜てしまう', '〜てある']
  },
  {
    point: '〜てある',
    meaning: 'has been done (state)',
    explain: 'Shows that an action has been done and the result remains. 本が開けてある = "the book is open (someone opened it)."',
    ex: [
      {jp:'机の上に本が置いてある。',romaji:'Tsukue no ue ni hon ga oite aru.',en:'A book is placed on the desk (by someone).'},
      {jp:'窓が閉めてある。',romaji:'Mado ga shimete aru.',en:'The window is closed (by someone).'}
    ],
    tip: 'Emphasises the resulting state, not the action itself.',
    diff: 'Intermediate',
    related: ['〜てある', '〜ている']
  },
  {
    point: '〜ことにする',
    meaning: 'decide to do',
    explain: 'Express a personal decision. 毎日運動することにする = "I\'ve decided to exercise every day."',
    ex: [
      {jp:'今年は日本語を勉強することにする。',romaji:'Kotoshi wa nihongo wo benkyou suru koto ni suru.',en:'I\'ve decided to study Japanese this year.'},
      {jp:'早く寝ることにします。',romaji:'Hayaku neru koto ni shimasu.',en:'I\'ve decided to go to bed early.'}
    ],
    tip: 'Used for decisions you make yourself.',
    diff: 'Intermediate',
    related: ['〜ことになる', '〜つもり']
  },
  {
    point: '〜ことになる',
    meaning: 'it has been decided (by circumstances)',
    explain: 'Shows a decision made by an external force or situation. 来月、転勤することになる = "I will be transferred next month (not my decision)."',
    ex: [
      {jp:'来月、会社を辞めることになった。',romaji:'Raigetsu, kaisha wo yameru koto ni natta.',en:'It was decided that I would leave the company next month.'},
      {jp:'彼がリーダーになることになった。',romaji:'Kare ga riidaa ni naru koto ni natta.',en:'It was decided that he would become the leader.'}
    ],
    tip: 'Often used for decisions made by others or circumstances.',
    diff: 'Intermediate',
    related: ['〜ことにする', '〜ようになる']
  },
  {
    point: '〜てもいい',
    meaning: 'you may',
    explain: 'Gives permission. 写真を撮ってもいいです = "you may take photos."',
    ex: [
      {jp:'ここで食べてもいいですか。',romaji:'Koko de tabete mo ii desu ka.',en:'May I eat here?'},
      {jp:'座ってもいいですよ。',romaji:'Suwatte mo ii desu yo.',en:'You may sit.'}
    ],
    tip: 'The question form asks for permission.',
    diff: 'Foundation',
    related: ['〜てはいけない', '〜てもかまわない']
  },
  {
    point: '〜てはいけない',
    meaning: 'must not',
    explain: 'Prohibition. ここでタバコを吸ってはいけない = "you must not smoke here."',
    ex: [
      {jp:'明日までに提出しなくてはいけない。',romaji:'Ashita made ni teishutsu shinakute wa ikenai.',en:'I must submit it by tomorrow.'},
      {jp:'この部屋に入ってはいけません。',romaji:'Kono heya ni haitte wa ikemasen.',en:'You must not enter this room.'}
    ],
    tip: 'Often used with 〜なくては (must) or 〜ちゃいけない in casual speech.',
    diff: 'Intermediate',
    related: ['〜てもいい', '〜なくてはいけない']
  },
  {
    point: '〜なくてはいけない',
    meaning: 'must (obligation)',
    explain: 'Expresses obligation. 毎日宿題をしなくてはいけない = "I must do homework every day."',
    ex: [
      {jp:'朝早く起きなくてはいけない。',romaji:'Asa hayaku okinakute wa ikenai.',en:'I must wake up early in the morning.'},
      {jp:'彼に謝らなくてはいけない。',romaji:'Kare ni ayamaranakute wa ikenai.',en:'I must apologize to him.'}
    ],
    tip: 'In casual speech, 〜なくちゃ or 〜なきゃ are used.',
    diff: 'Intermediate',
    related: ['〜てはいけない', '〜なければならない']
  },
  {
    point: '〜かもしれない',
    meaning: 'maybe, might',
    explain: 'Expresses possibility or uncertainty. 明日は雨が降るかもしれない = "it might rain tomorrow."',
    ex: [
      {jp:'彼は来るかもしれない。',romaji:'Kare wa kuru kamo shirenai.',en:'He might come.'},
      {jp:'この本は難しいかもしれない。',romaji:'Kono hon wa muzukashii kamo shirenai.',en:'This book might be difficult.'}
    ],
    tip: 'Used with plain forms (dictionary, past, negative).',
    diff: 'Intermediate',
    related: ['〜はず', '〜らしい']
  },
  {
    point: '〜はず',
    meaning: 'should, be supposed to',
    explain: 'Shows expectation based on reason. 彼はもう着いているはずだ = "he should have arrived already."',
    ex: [
      {jp:'彼は知っているはずだ。',romaji:'Kare wa shitteiru hazu da.',en:'He should know.'},
      {jp:'明日はいい天気のはずです。',romaji:'Ashita wa ii tenki no hazu desu.',en:'It is supposed to be good weather tomorrow.'}
    ],
    tip: 'Often used with はずが (negative) meaning "should not".',
    diff: 'Intermediate',
    related: ['〜かもしれない', '〜に違いない']
  },
  {
    point: '〜ようにする',
    meaning: 'try to, make sure to',
    explain: 'Express effort to do something. 毎日運動するようにする = "I try to exercise every day."',
    ex: [
      {jp:'約束を守るようにする。',romaji:'Yakusoku wo mamoru you ni suru.',en:'I make sure to keep promises.'},
      {jp:'早く寝るようにしましょう。',romaji:'Hayaku neru you ni shimashou.',en:'Let\'s try to go to bed early.'}
    ],
    tip: 'Often used when you have a goal or plan.',
    diff: 'Intermediate',
    related: ['〜ようになる', '〜つもり']
  },
  {
    point: '〜ようになる',
    meaning: 'become able to, come to be',
    explain: 'Shows a change in state or ability. 日本語が話せるようになった = "I became able to speak Japanese."',
    ex: [
      {jp:'毎日走るようになった。',romaji:'Mainichi hashiru you ni natta.',en:'I came to run every day.'},
      {jp:'あの店は人気があるようになった。',romaji:'Ano mise wa ninki ga aru you ni natta.',en:'That shop has become popular.'}
    ],
    tip: 'Used with potential verbs to show gaining ability.',
    diff: 'Intermediate',
    related: ['〜ようにする', '〜ことになる']
  },
  {
    point: '〜らしい',
    meaning: 'seems like, typical of',
    explain: 'Shows hearsay or strong characteristic. 彼女はピアノが上手らしい = "I heard she is good at piano."',
    ex: [
      {jp:'彼は新しい車を買ったらしい。',romaji:'Kare wa atarashii kuruma wo katta rashii.',en:'I heard he bought a new car.'},
      {jp:'これは日本らしい料理だ。',romaji:'Kore wa Nihon rashii ryouri da.',en:'This is a typical Japanese dish.'}
    ],
    tip: 'Can also mean "typical of" when attached to a noun.',
    diff: 'Intermediate',
    related: ['〜そう', '〜みたい']
  },
  {
    point: '〜そうだ (hearsay)',
    meaning: 'I hear that',
    explain: 'Reports information you heard. 天気予報によると明日は雨だそうだ = "according to the weather forecast, it will rain tomorrow."',
    ex: [
      {jp:'彼は結婚するそうだ。',romaji:'Kare wa kekkon suru sou da.',en:'I heard he is getting married.'},
      {jp:'あのレストランはおいしいそうだ。',romaji:'Ano resutoran wa oishii sou da.',en:'I heard that restaurant is delicious.'}
    ],
    tip: 'Use with plain forms. Do not confuse with 〜そう (appearance).',
    diff: 'Intermediate',
    related: ['〜らしい', '〜みたい']
  },
  {
    point: '〜そうだ (appearance)',
    meaning: 'looks like',
    explain: 'Shows appearance or guess based on visual cues. 雨が降りそうだ = "it looks like rain."',
    ex: [
      {jp:'美味しそうなケーキですね。',romaji:'Oishisou na keeki desu ne.',en:'That cake looks delicious.'},
      {jp:'彼は疲れているようだ。',romaji:'Kare wa tsukareteiru you da.',en:'He looks tired.'}
    ],
    tip: 'For i-adjectives, drop い and add そう; for na-adjectives, add そう.',
    diff: 'Intermediate',
    related: ['〜ようだ', '〜みたい']
  },
  {
    point: '〜ようだ',
    meaning: 'seems like, resembles',
    explain: 'Expresses subjective resemblance or analogy. それはまるで雪のようだ = "that looks just like snow."',
    ex: [
      {jp:'彼は怒っているようだ。',romaji:'Kare wa okotteiru you da.',en:'He seems angry.'},
      {jp:'あの雲は羊のようだ。',romaji:'Ano kumo wa hitsuji no you da.',en:'That cloud looks like a sheep.'}
    ],
    tip: 'Often used with まるで (just like).',
    diff: 'Intermediate',
    related: ['〜そう', '〜みたい']
  },
  {
    point: '〜みたいだ',
    meaning: 'seems like, resembles (casual)',
    explain: 'Casual version of 〜ようだ. あれは雨みたいだ = "that looks like rain."',
    ex: [
      {jp:'彼は映画みたいにカッコいい。',romaji:'Kare wa eiga mitai ni kakkoii.',en:'He is cool like in a movie.'},
      {jp:'この問題は難しみたいだ。',romaji:'Kono mondai wa muzukashi mitai da.',en:'This problem seems difficult.'}
    ],
    tip: 'More colloquial and common in daily speech.',
    diff: 'Intermediate',
    related: ['〜ようだ']
  },
  {
    point: '〜ばかり',
    meaning: 'just; only, always',
    explain: 'Indicates a narrow focus or continuous action. 食べてばかりいる = "I\'m always eating."',
    ex: [
      {jp:'彼は旅行してばかりいる。',romaji:'Kare wa ryokou shite bakari iru.',en:'He is always traveling.'},
      {jp:'今、来たばかりです。',romaji:'Ima, kita bakari desu.',en:'I just arrived now.'}
    ],
    tip: 'With た-form, it means "just did"; with て-form it means "always doing".',
    diff: 'Advanced',
    related: ['〜ところ']
  },
  {
    point: '〜ところ',
    meaning: 'about to; just; currently',
    explain: 'Indicates timing of an action. 出かけようとしているところ = "I\'m about to leave."',
    ex: [
      {jp:'今、食べているところです。',romaji:'Ima, tabeteiru tokoro desu.',en:'I am just eating now.'},
      {jp:'帰ったところです。',romaji:'Kaetta tokoro desu.',en:'I just got home.'}
    ],
    tip: 'Used with different verb forms to show timing.',
    diff: 'Advanced',
    related: ['〜ばかり']
  },
  {
    point: '〜からには',
    meaning: 'since, now that',
    explain: 'Expresses that since a situation exists, you should do something. 約束したからには守らなければならない = "now that I promised, I must keep it."',
    ex: [
      {jp:'日本に来たからには日本語を話したい。',romaji:'Nihon ni kita kara ni wa nihongo wo hanashitai.',en:'Now that I came to Japan, I want to speak Japanese.'},
      {jp:'決めたからには最後までやる。',romaji:'Kimeta kara ni wa saigo made yaru.',en:'Since I have decided, I will do it until the end.'}
    ],
    tip: 'Often used with verbs of decision.',
    diff: 'Advanced',
    related: ['〜以上']
  },
  {
    point: '〜以上',
    meaning: 'since, because',
    explain: 'Since the preceding condition holds. 学生である以上、勉強する必要がある = "since I am a student, I need to study."',
    ex: [
      {jp:'社会人である以上、責任を持つ。',romaji:'Shakaijin de aru ijou, sekinin wo motsu.',en:'Since I am a working adult, I have responsibility.'},
      {jp:'生きている以上、楽しもう。',romaji:'Ikiteiru ijou, tanoshimou.',en:'Since we are alive, let\'s enjoy.'}
    ],
    tip: 'More formal than 〜からには.',
    diff: 'Advanced',
    related: ['〜からには']
  },
  {
    point: '〜わけだ',
    meaning: 'no wonder, therefore',
    explain: 'Expresses logical conclusion. 彼は料理が上手だ、そういうわけだ = "he is good at cooking, no wonder."',
    ex: [
      {jp:'５年間も日本に住んでいたわけだ。',romaji:'Go-nen kan mo Nihon ni sundeita wake da.',en:'No wonder he lived in Japan for 5 years.'},
      {jp:'彼が遅れたわけが分からない。',romaji:'Kare ga okureta wake ga wakaranai.',en:'I don\'t understand why he was late.'}
    ],
    tip: 'Used when explaining a reason or cause.',
    diff: 'Advanced',
    related: ['〜というわけだ']
  },
  {
    point: '〜つもりだ',
    meaning: 'intend to',
    explain: 'Expresses intention to do something. 来年留学するつもりだ = "I intend to study abroad next year."',
    ex: [
      {jp:'今年は節約するつもりだ。',romaji:'Kotoshi wa setsuyaku suru tsumori da.',en:'I intend to save money this year.'},
      {jp:'彼は来るつもりらしい。',romaji:'Kare wa kuru tsumori rashii.',en:'I heard he intends to come.'}
    ],
    tip: 'Often used with 〜ない for negative intention.',
    diff: 'Intermediate',
    related: ['〜ことにする']
  },
  {
    point: '〜に違いない',
    meaning: 'must be, definitely',
    explain: 'Strong certainty. 彼は成功するに違いない = "he will definitely succeed."',
    ex: [
      {jp:'彼は犯人に違いない。',romaji:'Kare wa hannin ni chigai nai.',en:'He must be the culprit.'},
      {jp:'この計画はうまくいくに違いない。',romaji:'Kono keikaku wa umaku iku ni chigai nai.',en:'This plan must go well.'}
    ],
    tip: 'Similar to 〜はず but stronger.',
    diff: 'Intermediate',
    related: ['〜はず', '〜に相違ない']
  },
  {
    point: '〜にしたがって',
    meaning: 'according to, as',
    explain: 'Indicates following something or progression. 指示にしたがって行動する = "act according to instructions."',
    ex: [
      {jp:'年を取るにしたがって、体が弱くなる。',romaji:'Toshi wo toru ni shitagatte, karada ga yowaku naru.',en:'As we grow older, our bodies become weaker.'},
      {jp:'地図にしたがって進む。',romaji:'Chizu ni shitagatte susumu.',en:'Proceed according to the map.'}
    ],
    tip: 'Also means "as (something changes)".',
    diff: 'Advanced',
    related: ['〜に従って']
  },
  {
    point: '〜につれて',
    meaning: 'as, with',
    explain: 'Shows change with time or progression. 彼は年を取るにつれて丸くなった = "he mellowed as he aged."',
    ex: [
      {jp:'長くなるにつれて話が面白くなった。',romaji:'Nagaku naru ni tsurete hanashi ga omoshiroku natta.',en:'As time went on, the story became more interesting.'},
      {jp:'練習するにつれて上達した。',romaji:'Renshuu suru ni tsurete joutatsu shita.',en:'I improved as I practiced.'}
    ],
    tip: 'Used for natural progression, not sudden change.',
    diff: 'Advanced',
    related: ['〜にしたがって']
  }
];

export { N3_GRAMMAR };