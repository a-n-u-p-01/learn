// N3_KANJI — intermediate kanji (35 entries)
var N3_KANJI = [
  // Family & relationships
  {c:'親',on:'シン',kun:'おや・した(しい)',mean:'parent, intimate',
   kunSentence:'親に相談しました。',
   kunSentenceKana:'おやにそうだんしました。',
   kunSentenceEn:'I consulted my parents.',
   onSentence:'親切（しんせつ）な人ですね。',
   onSentenceKana:'しんせつなひとですね。',
   onSentenceEn:'He is a kind person.'},

  {c:'兄弟',on:'ケイ・ダイ',kun:'きょうだい',mean:'siblings',
   kunSentence:'兄弟が三人います。',
   kunSentenceKana:'きょうだいがさんにんいます。',
   kunSentenceEn:'I have three siblings.',
   onSentence:'兄弟（きょうだい）は仲がいいです。',
   onSentenceKana:'きょうだいはなかがいいです。',
   onSentenceEn:'My siblings get along well.'},

  // Social & work
  {c:'社',on:'シャ',kun:'やしろ',mean:'company, shrine',
   kunSentence:'神社（じんじゃ）に行きました。',
   kunSentenceKana:'じんじゃにいきました。',
   kunSentenceEn:'I went to the shrine.',
   onSentence:'会社（かいしゃ）で働きます。',
   onSentenceKana:'かいしゃではたらきます。',
   onSentenceEn:'I work at a company.'},

  {c:'員',on:'イン',kun:'—',mean:'member, employee',
   onSentence:'会社員（かいしゃいん）です。',
   onSentenceKana:'かいしゃいんです。',
   onSentenceEn:'I am an office worker.'},

  // Education
  {c:'卒',on:'ソツ',kun:'—',mean:'graduation',
   onSentence:'大学を卒業（そつぎょう）しました。',
   onSentenceKana:'だいがくをそつぎょうしました。',
   onSentenceEn:'I graduated from university.'},

  {c:'業',on:'ギョウ・ゴウ',kun:'わざ',mean:'business, industry',
   kunSentence:'彼は業（わざ）がいいです。',
   kunSentenceKana:'かれはわざがいいです。',
   kunSentenceEn:'He is skilled.',
   onSentence:'卒業（そつぎょう）まであと一年です。',
   onSentenceKana:'そつぎょうまであといちねんです。',
   onSentenceEn:'One more year until graduation.'},

  // Time & frequency
  {c:'次',on:'ジ',kun:'つぎ',mean:'next, order',
   kunSentence:'次の駅（つぎのえき）で降ります。',
   kunSentenceKana:'つぎのえきでおります。',
   kunSentenceEn:'I get off at the next station.',
   onSentence:'今回（こんかい）はうまくいきませんでした。',
   onSentenceKana:'こんかいはうまくいきませんでした。',
   onSentenceEn:'This time it didn\'t go well.'},

  {c:'回',on:'カイ',kun:'まわ(る)',mean:'times, around',
   kunSentence:'地球が回る（まわる）と昼になります。',
   kunSentenceKana:'ちきゅうがまわるとひるになります。',
   kunSentenceEn:'When the earth rotates, it becomes daytime.',
   onSentence:'三回（さんかい）挑戦（ちょうせん）しました。',
   onSentenceKana:'さんかいちょうせんしました。',
   onSentenceEn:'I tried three times.'},

  // Communication
  {c:'伝',on:'デン',kun:'つた(わる)',mean:'transmit, tell',
   kunSentence:'伝言（でんごん）を伝えました。',
   kunSentenceKana:'でんごんをつたえました。',
   kunSentenceEn:'I delivered the message.',
   onSentence:'伝統（でんとう）を守（まも）る。',
   onSentenceKana:'でんとうをまもる。',
   onSentenceEn:'Preserve the tradition.'},

  {c:'相',on:'ソウ・ショウ',kun:'あい',mean:'mutual, appearance',
   kunSentence:'お互い（おたがい）に助け合う（たすけあう）。',
   kunSentenceKana:'おたがいにたすけあう。',
   kunSentenceEn:'We help each other.',
   onSentence:'相談（そうだん）に乗ってください。',
   onSentenceKana:'そうだんにのってください。',
   onSentenceEn:'Please give me advice.'},

  // Action & movement
  {c:'動',on:'ドウ',kun:'うご(く)',mean:'move, motion',
   kunSentence:'電車が動き始めました。',
   kunSentenceKana:'でんしゃがうごきはじめました。',
   kunSentenceEn:'The train started to move.',
   onSentence:'動物（どうぶつ）が好きです。',
   onSentenceKana:'どうぶつがすきです。',
   onSentenceEn:'I like animals.'},

  {c:'止',on:'シ',kun:'と(まる)・と(める)',mean:'stop',
   kunSentence:'ここで止まってください。',
   kunSentenceKana:'ここでとまってください。',
   kunSentenceEn:'Please stop here.',
   onSentence:'停止（ていし）ボタンを押しました。',
   onSentenceKana:'ていしぼたんをおしました。',
   onSentenceEn:'I pressed the stop button.'},

  // Emotions
  {c:'悲',on:'ヒ',kun:'かな(しい)',mean:'sad',
   kunSentence:'悲しいニュースを聞きました。',
   kunSentenceKana:'かなしいにゅーすをききました。',
   kunSentenceEn:'I heard sad news.',
   onSentence:'悲劇（ひげき）は避（さ）けたいです。',
   onSentenceKana:'ひげきはさけたいです。',
   onSentenceEn:'I want to avoid tragedy.'},

  {c:'笑',on:'ショウ',kun:'わら(う)・え(む)',mean:'laugh, smile',
   kunSentence:'彼はいつも笑っています。',
   kunSentenceKana:'かれはいつもわらっています。',
   kunSentenceEn:'He is always laughing.',
   onSentence:'笑顔（えがお）が素敵（すてき）です。',
   onSentenceKana:'えがおがすてきです。',
   onSentenceEn:'Her smile is wonderful.'},

  // Nature & environment
  {c:'森',on:'シン',kun:'もり',mean:'forest',
   kunSentence:'森の中を散歩しました。',
   kunSentenceKana:'もりのなかをさんぽしました。',
   kunSentenceEn:'I walked through the forest.',
   onSentence:'森林（しんりん）を保護（ほご）する。',
   onSentenceKana:'しんりんをほごする。',
   onSentenceEn:'Protect the forests.'},

  {c:'島',on:'トウ',kun:'しま',mean:'island',
   kunSentence:'沖縄（おきなわ）は島です。',
   kunSentenceKana:'おきなわはしまです。',
   kunSentenceEn:'Okinawa is an island.',
   onSentence:'島嶼（とうしょ）地域（ちいき）を守る。',
   onSentenceKana:'とうしょちいきをまもる。',
   onSentenceEn:'Protect the island regions.'},

  // Society
  {c:'政治',on:'セイ・ジ',kun:'—',mean:'politics',
   onSentence:'政治（せいじ）に関心（かんしん）があります。',
   onSentenceKana:'せいじにかんしんがあります。',
   onSentenceEn:'I am interested in politics.'},

  {c:'経済',on:'ケイ・ザイ',kun:'—',mean:'economy',
   onSentence:'日本経済（にほんけいざい）は安定（あんてい）している。',
   onSentenceKana:'にほんけいざいはあんていしている。',
   onSentenceEn:'The Japanese economy is stable.'},

  // Technology
  {c:'機',on:'キ',kun:'はた',mean:'machine, chance',
   kunSentence:'機（はた）を織（お）る。',
   kunSentenceKana:'はたをおる。',
   kunSentenceEn:'Weave cloth.',
   onSentence:'機械（きかい）の修理（しゅうり）をお願いします。',
   onSentenceKana:'きかいのしゅうりをおねがいします。',
   onSentenceEn:'Please repair the machine.'},

  {c:'器',on:'キ',kun:'うつわ',mean:'container, vessel',
   kunSentence:'この器（うつわ）は古いです。',
   kunSentenceKana:'このうつわはふるいです。',
   kunSentenceEn:'This vessel is old.',
   onSentence:'器具（きぐ）を整（ととの）える。',
   onSentenceKana:'きぐをととのえる。',
   onSentenceEn:'Arrange the tools.'},

  // Life & health
  {c:'病',on:'ビョウ・ヘイ',kun:'やまい',mean:'illness, disease',
   kunSentence:'病（やまい）に倒（たお）れました。',
   kunSentenceKana:'やまいにたおれました。',
   kunSentenceEn:'He was struck by illness.',
   onSentence:'病院（びょういん）に行きます。',
   onSentenceKana:'びょういんにいきます。',
   onSentenceEn:'I go to the hospital.'},

  {c:'薬',on:'ヤク',kun:'くすり',mean:'medicine',
   kunSentence:'この薬（くすり）を飲みます。',
   kunSentenceKana:'このくすりをのみます。',
   kunSentenceEn:'I take this medicine.',
   onSentence:'薬局（やっきょく）で買いました。',
   onSentenceKana:'やっきょくでかいました。',
   onSentenceEn:'I bought it at the pharmacy.'},

  // Housing & living
  {c:'建',on:'ケン・コン',kun:'た(てる)',mean:'build',
   kunSentence:'建物（たてもの）が建ち並ぶ（たちならぶ）。',
   kunSentenceKana:'たてものがたちならぶ。',
   kunSentenceEn:'Buildings stand in a row.',
   onSentence:'建築（けんちく）の勉強をしています。',
   onSentenceKana:'けんちくのべんきょうをしています。',
   onSentenceEn:'I study architecture.'},

  {c:'設',on:'セツ',kun:'もう(ける)',mean:'establish, set up',
   kunSentence:'予定（よてい）を設定（せってい）する。',
   kunSentenceKana:'よていをせっていする。',
   kunSentenceEn:'Set a schedule.',
   onSentence:'施設（しせつ）を利用（りよう）する。',
   onSentenceKana:'しせつをりようする。',
   onSentenceEn:'Use the facility.'},

  // Work
  {c:'作業',on:'サ・ギョウ',kun:'—',mean:'work, operation',
   onSentence:'作業（さぎょう）に取り掛かる（とりかかる）。',
   onSentenceKana:'さぎょうにとりかかる。',
   onSentenceEn:'Start the work.'},

  {c:'努力',on:'ド・リョク',kun:'—',mean:'effort',
   onSentence:'努力（どりょく）を続ける（つづける）。',
   onSentenceKana:'どりょくをつづける。',
   onSentenceEn:'Continue making efforts.'},

  // Transport
  {c:'運',on:'ウン',kun:'はこ(ぶ)',mean:'carry, transport',
   kunSentence:'荷物（にもつ）を運びます。',
   kunSentenceKana:'にもつをはこびます。',
   kunSentenceEn:'I carry luggage.',
   onSentence:'運転（うんてん）が上手です。',
   onSentenceKana:'うんてんがじょうずです。',
   onSentenceEn:'He drives well.'},

  {c:'輸',on:'ユ',kun:'—',mean:'transport, import/export',
   onSentence:'輸出（ゆしゅつ）と輸入（ゆにゅう）をします。',
   onSentenceKana:'ゆしゅつとゆにゅうをします。',
   onSentenceEn:'We do export and import.'},

  // Culture
  {c:'祭',on:'サイ',kun:'まつ(り)',mean:'festival',
   kunSentence:'夏祭り（なつまつり）に行きました。',
   kunSentenceKana:'なつまつりにいきました。',
   kunSentenceEn:'I went to the summer festival.',
   onSentence:'祭典（さいてん）を開催（かいさい）する。',
   onSentenceKana:'さいてんをかいさいする。',
   onSentenceEn:'Host a festival.'},

  {c:'芸',on:'ゲイ',kun:'—',mean:'art, performance',
   onSentence:'芸術（げいじゅつ）を鑑賞（かんしょう）する。',
   onSentenceKana:'げいじゅつをかんしょうする。',
   onSentenceEn:'Appreciate art.'},

  // Science
  {c:'科',on:'カ',kun:'—',mean:'science, subject',
   onSentence:'科学（かがく）の進歩（しんぽ）。',
   onSentenceKana:'かがくのしんぽ。',
   onSentenceEn:'Progress of science.'},

  {c:'学',on:'ガク',kun:'まな(ぶ)',mean:'study, learning',
   kunSentence:'大学（だいがく）で学びます。',
   kunSentenceKana:'だいがくでまなびます。',
   kunSentenceEn:'I study at university.',
   onSentence:'学術（がくじゅつ）会議（かいぎ）。',
   onSentenceKana:'がくじゅつかいぎ。',
   onSentenceEn:'Academic conference.'},

  // Law & rules
  {c:'法',on:'ホウ・ハッ',kun:'—',mean:'law, method',
   onSentence:'法律（ほうりつ）に従う（したがう）。',
   onSentenceKana:'ほうりつにしたがう。',
   onSentenceEn:'Follow the law.'},

  {c:'規則',on:'キ・ソク',kun:'—',mean:'rule, regulation',
   onSentence:'規則（きそく）を守る（まもる）。',
   onSentenceKana:'きそくをまもる。',
   onSentenceEn:'Obey the rules.'},

  // Communication
  {c:'連',on:'レン',kun:'つら(なる)',mean:'connect, link',
   kunSentence:'連絡（れんらく）します。',
   kunSentenceKana:'れんらくします。',
   kunSentenceEn:'I will contact you.',
   onSentence:'連続（れんぞく）テレビドラマ。',
   onSentenceKana:'れんぞくてれびどらま。',
   onSentenceEn:'A TV series.'},

  {c:'絡',on:'ラク',kun:'から(む)',mean:'entangle, involve',
   kunSentence:'問題（もんだい）が絡む（からむ）。',
   kunSentenceKana:'もんだいがからむ。',
   kunSentenceEn:'Problems are involved.',
   onSentence:'絡み（からみ）合う（あう）。',
   onSentenceKana:'からみあう。',
   onSentenceEn:'Get entangled.'},
];

export { N3_KANJI };