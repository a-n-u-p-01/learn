// N2_GRAMMAR — 25 advanced grammar points
var N2_GRAMMAR = [
  {
    point: '〜に際して',
    meaning: 'upon, in the event of',
    explain: 'Used to indicate a special occasion or time. 出発に際して、挨拶をしました = "Upon departure, we gave a greeting."',
    ex: [
      {jp:'面接に際して、準備をしっかりした。',romaji:'Mensetsu ni saishite, junbi wo shikkari shita.',en:'I prepared thoroughly for the interview.'},
      {jp:'結婚に際して、両親に感謝の手紙を書いた。',romaji:'Kekkon ni saishite, ryoushin ni kansha no tegami wo kaita.',en:'I wrote a letter of thanks to my parents upon marriage.'}
    ],
    tip: 'Often used in formal writing and speeches.',
    diff: 'Advanced',
    related: ['〜に当たって']
  },
  {
    point: '〜を問わず',
    meaning: 'regardless of',
    explain: 'Indicates that something applies without regard to the preceding condition. 経験を問わず、誰でも応募できる = "Anyone can apply, regardless of experience."',
    ex: [
      {jp:'年齢を問わず、誰でも参加できる。',romaji:'Nenrei wo towazu, dare demo sanka dekiru.',en:'Anyone can participate, regardless of age.'},
      {jp:'国籍を問わず、この制度は利用できる。',romaji:'Kokuseki wo towazu, kono seido wa riyō dekiru.',en:'This system is available regardless of nationality.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Advanced',
    related: ['〜に関係なく']
  },
  {
    point: '〜に加えて',
    meaning: 'in addition to',
    explain: 'Adds an additional point. 英語に加えて、フランス語も話せる = "In addition to English, I can also speak French."',
    ex: [
      {jp:'学費に加えて、生活費もかかる。',romaji:'Gakuhi ni kuwaete, seikatsuhi mo kakaru.',en:'In addition to tuition, living expenses are also required.'},
      {jp:'仕事に加えて、趣味の時間も大切だ。',romaji:'Shigoto ni kuwaete, shumi no jikan mo taisetsu da.',en:'In addition to work, hobby time is also important.'}
    ],
    tip: 'Formal.',
    diff: 'Advanced',
    related: ['〜に加え']
  },
  {
    point: '〜にもかかわらず',
    meaning: 'despite, in spite of',
    explain: 'Shows contrast; despite the preceding situation. 雨にもかかわらず、試合は行われた = "Despite the rain, the match was held."',
    ex: [
      {jp:'彼の努力にもかかわらず、成功しなかった。',romaji:'Kare no doryoku ni mo kakawarazu, seikō shinakatta.',en:'Despite his efforts, he did not succeed.'},
      {jp:'熱があったにもかかわらず、彼は出勤した。',romaji:'Netsu ga atta ni mo kakawarazu, kare wa shukkin shita.',en:'He went to work despite having a fever.'}
    ],
    tip: 'Formal; more emphatic than 〜のに.',
    diff: 'Advanced',
    related: ['〜のに', '〜けど']
  },
  {
    point: '〜ものの',
    meaning: 'although, but',
    explain: 'Concession; similar to 〜が but with a sense of contrast. 雨が降ったものの、楽しかった = "Although it rained, it was enjoyable."',
    ex: [
      {jp:'彼は学生だものの、非常にお金持ちだ。',romaji:'Kare wa gakusei da mono no, hijō ni okane mochi da.',en:'Although he is a student, he is very rich.'},
      {jp:'難しいものの、面白い仕事だ。',romaji:'Muzukashii mono no, omoshiroi shigoto da.',en:'It\'s difficult, but it\'s an interesting job.'}
    ],
    tip: 'Used with plain forms.',
    diff: 'Advanced',
    related: ['〜が', '〜けれども']
  },
  {
    point: '〜からといって',
    meaning: 'just because',
    explain: 'Just because A, it does not mean B. お金があるからといって、幸せとは限らない = "Just because you have money, it doesn\'t mean you are happy."',
    ex: [
      {jp:'日本語ができるからといって、日本で就職できるとは限らない。',romaji:'Nihongo ga dekiru kara to itte, Nihon de shūshoku dekiru to wa kagiranai.',en:'Just because you can speak Japanese, it doesn\'t mean you can get a job in Japan.'},
      {jp:'彼が遅れたからといって、怒る必要はない。',romaji:'Kare ga okureta kara to itte, okoru hitsuyō wa nai.',en:'Just because he was late, there\'s no need to get angry.'}
    ],
    tip: 'Often used with 〜とは限らない.',
    diff: 'Advanced',
    related: ['〜からと言って', '〜からといって〜とは限らない']
  },
  {
    point: '〜わけにはいかない',
    meaning: 'cannot, must not (due to responsibility)',
    explain: 'Expresses that a certain action is impossible due to moral or social reasons. 今ここで止めるわけにはいかない = "I cannot stop here."',
    ex: [
      {jp:'約束したから、行かないわけにはいかない。',romaji:'Yakusoku shita kara, ikanai wake ni wa ikanai.',en:'Since I promised, I cannot not go.'},
      {jp:'彼に頼まれたので、断るわけにはいかない。',romaji:'Kare ni tanomareta node, kotowaru wake ni wa ikanai.',en:'Since he asked me, I cannot refuse.'}
    ],
    tip: 'Often used with negative forms.',
    diff: 'Advanced',
    related: ['〜ざるを得ない']
  },
  {
    point: '〜ざるを得ない',
    meaning: 'cannot help but; have to',
    explain: 'Expresses that something is unavoidable. 彼の言い分を認めざるを得ない = "I cannot help but accept his argument."',
    ex: [
      {jp:'時間がないので、キャンセルせざるを得ない。',romaji:'Jikan ga nai node, kyanseru sezaru wo enai.',en:'I have no choice but to cancel because of time.'},
      {jp:'これだけ証拠があれば、彼が犯人だと認めざるを得ない。',romaji:'Kore dake shōko ga areba, kare ga hannin da to mitomezaru wo enai.',en:'With so much evidence, I cannot but admit he is the culprit.'}
    ],
    tip: 'Verb in negative stem + ざるを得ない.',
    diff: 'Advanced',
    related: ['〜なければならない']
  },
  {
    point: '〜に限らず',
    meaning: 'not only, as well as',
    explain: 'Indicates that something applies not only to X but also to related things. この地域に限らず、全国的に問題だ = "Not only in this region, but nationwide, it\'s a problem."',
    ex: [
      {jp:'日本に限らず、多くの国で高齢化が進んでいる。',romaji:'Nihon ni kagirazu, ōku no kuni de kōreika ga susundeiru.',en:'Not only in Japan, but many countries are experiencing aging populations.'},
      {jp:'学生に限らず、社会人も参加できる。',romaji:'Gakusei ni kagirazu, shakaijin mo sanka dekiru.',en:'Not only students, but working adults can also participate.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Advanced',
    related: ['〜だけでなく']
  },
  {
    point: '〜から見ると',
    meaning: 'from the perspective of',
    explain: 'Indicates a viewpoint. 私から見ると、この計画には問題がある = "From my perspective, this plan has problems."',
    ex: [
      {jp:'親から見ると、子供はいつも子供だ。',romaji:'Oya kara miru to, kodomo wa itsumo kodomo da.',en:'From a parent\'s perspective, children are always children.'},
      {jp:'彼の成績から見ると、彼はよく勉強している。',romaji:'Kare no seiseki kara miru to, kare wa yoku benkyō shiteiru.',en:'From his grades, it seems he studies hard.'}
    ],
    tip: 'Used for subjective evaluation.',
    diff: 'Advanced',
    related: ['〜からすると']
  },
  {
    point: '〜に基づいて',
    meaning: 'based on',
    explain: 'Indicates the basis of something. この計画は調査に基づいて作成された = "This plan was made based on the survey."',
    ex: [
      {jp:'事実に基づいて判断する。',romaji:'Jijitsu ni motozuite handan suru.',en:'Make a judgment based on facts.'},
      {jp:'経験に基づいたアドバイスをくれる。',romaji:'Keiken ni motozuita adobaisu wo kureru.',en:'Give advice based on experience.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Advanced',
    related: ['〜をもとに']
  },
  {
    point: '〜をもとに',
    meaning: 'based on, using',
    explain: 'Similar to 〜に基づいて, but often implies using something as a source. この映画は実際の事件をもとに作られた = "This movie was made based on a real incident."',
    ex: [
      {jp:'アンケートの結果をもとに商品を改良した。',romaji:'Ankēto no kekka wo moto ni shōhin wo kairyō shita.',en:'We improved the product based on the survey results.'},
      {jp:'彼の話をもとに小説を書いた。',romaji:'Kare no hanashi wo moto ni shōsetsu wo kaita.',en:'I wrote a novel based on his story.'}
    ],
    tip: 'Often used in writing.',
    diff: 'Advanced',
    related: ['〜に基づいて']
  },
  {
    point: '〜に比べて',
    meaning: 'compared to',
    explain: 'Indicates comparison. 去年に比べて、今年は暑い = "Compared to last year, this year is hot."',
    ex: [
      {jp:'都市に比べて、田舎は静かだ。',romaji:'Toshi ni kurabete, inaka wa shizuka da.',en:'Compared to cities, the countryside is quiet.'},
      {jp:'以前に比べて、彼は日本語が上手になった。',romaji:'Izen ni kurabete, kare wa Nihongo ga jōzu ni natta.',en:'Compared to before, he has become better at Japanese.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Advanced',
    related: ['〜よりも']
  },
  {
    point: '〜に従って',
    meaning: 'according to, as',
    explain: 'Shows that an action is done in accordance with something. 指示に従って行動する = "Act according to instructions."',
    ex: [
      {jp:'このマニュアルに従って作業してください。',romaji:'Kono manyuaru ni shitagatte sagyō shite kudasai.',en:'Please work according to this manual.'},
      {jp:'年を取るに従って、体力が衰える。',romaji:'Toshi wo toru ni shitagatte, tairyoku ga otoroeru.',en:'As one gets older, physical strength declines.'}
    ],
    tip: 'Both static and dynamic uses.',
    diff: 'Advanced',
    related: ['〜につれて']
  },
  {
    point: '〜につれて',
    meaning: 'as (gradually)',
    explain: 'Indicates that as one thing changes, another changes in parallel. 時間が経つにつれて、彼の緊張は解けた = "As time passed, his tension eased."',
    ex: [
      {jp:'練習を重ねるにつれて、上達した。',romaji:'Renshū wo kasaneru ni tsurete, jōtatsu shita.',en:'As I practiced more, I improved.'},
      {jp:'日本に慣れるにつれて、生活が楽しくなった。',romaji:'Nihon ni nareru ni tsurete, seikatsu ga tanoshiku natta.',en:'As I got used to Japan, life became more enjoyable.'}
    ],
    tip: 'Used with verbs that express change.',
    diff: 'Advanced',
    related: ['〜に従って']
  },
  {
    point: '〜を中心に',
    meaning: 'centering around',
    explain: 'Indicates the focus or central point. この街は観光地を中心に発展している = "This city develops around tourist spots."',
    ex: [
      {jp:'リーダーを中心にプロジェクトを進める。',romaji:'Rīdā wo chūshin ni purojekuto wo susumeru.',en:'Advance the project centered around the leader.'},
      {jp:'彼女を中心にグループができている。',romaji:'Kanojo wo chūshin ni gurūpu ga dekiteiru.',en:'A group has formed around her.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Advanced',
    related: ['〜を軸に']
  },
  {
    point: '〜に反して',
    meaning: 'contrary to',
    explain: 'Indicates contrast. 予想に反して、彼は成功した = "Contrary to expectations, he succeeded."',
    ex: [
      {jp:'天気予報に反して、雨が降らなかった。',romaji:'Tenki yohō ni hanshite, ame ga fura nakatta.',en:'Contrary to the weather forecast, it didn\'t rain.'},
      {jp:'彼の期待に反して、結果は悪かった。',romaji:'Kare no kitai ni hanshite, kekka wa warukatta.',en:'Contrary to his expectations, the result was bad.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Advanced',
    related: ['〜とは逆に']
  },
  {
    point: '〜に対して',
    meaning: 'toward, with regard to',
    explain: 'Indicates the target of an action or attitude. 先生に対して敬意を払う = "Show respect toward the teacher."',
    ex: [
      {jp:'お客様に対して丁寧に接する。',romaji:'Okyaku-sama ni taishite teinei ni sessuru.',en:'Treat customers politely.'},
      {jp:'この問題に対してどう思いますか。',romaji:'Kono mondai ni taishite dō omoimasu ka.',en:'What do you think about this problem?'}
    ],
    tip: 'Used with nouns.',
    diff: 'Advanced',
    related: ['〜に対する']
  },
  {
    point: '〜に沿って',
    meaning: 'along, in accordance with',
    explain: 'Indicates following a line or plan. 川に沿って歩く = "Walk along the river."',
    ex: [
      {jp:'計画に沿って進める。',romaji:'Keikaku ni sotte susumeru.',en:'Proceed according to the plan.'},
      {jp:'この方針に沿って行動してください。',romaji:'Kono hōshin ni sotte kōdō shite kudasai.',en:'Please act in accordance with this policy.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Advanced',
    related: ['〜に従って']
  },
  {
    point: '〜をはじめ',
    meaning: 'representing, including',
    explain: 'Indicates that something is representative of a group. 社長をはじめ、社員全員が参加した = "The president, and all employees, participated."',
    ex: [
      {jp:'日本をはじめ、多くの国でこの祭りが行われる。',romaji:'Nihon wo hajime, ōku no kuni de kono matsuri ga okonawareru.',en:'This festival is held in many countries, including Japan.'},
      {jp:'この地域には、東京をはじめ、多くの都市がある。',romaji:'Kono chiiki ni wa, Tōkyō wo hajime, ōku no toshi ga aru.',en:'In this region, there are many cities, including Tokyo.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Advanced',
    related: ['〜を代表して']
  },
  {
    point: '〜から言えば',
    meaning: 'from the viewpoint of',
    explain: 'Gives a perspective. 私から言えば、この提案は妥当だ = "From my viewpoint, this proposal is reasonable."',
    ex: [
      {jp:'専門家から言えば、この方法は間違っている。',romaji:'Senmonka kara ieba, kono hōhō wa machigatte iru.',en:'From an expert\'s viewpoint, this method is wrong.'},
      {jp:'学生から言えば、授業料が高すぎる。',romaji:'Gakusei kara ieba, jugyōryō ga takasugiru.',en:'From a student\'s perspective, tuition is too high.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Advanced',
    related: ['〜からすると']
  },
  {
    point: '〜次第で',
    meaning: 'depending on',
    explain: 'Indicates that the result depends on something. 彼の決断次第で結果が変わります = "The result will change depending on his decision."',
    ex: [
      {jp:'参加するかどうかは、天気次第だ。',romaji:'Sanka suru ka dō ka wa, tenki shidai da.',en:'Whether I participate depends on the weather.'},
      {jp:'これからの努力次第で成功するか決まる。',romaji:'Kore kara no doryoku shidai de seikō suru ka kimareru.',en:'Whether I succeed depends on my future efforts.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Advanced',
    related: ['〜によって']
  },
  {
    point: '〜に違いない',
    meaning: 'must be, definitely',
    explain: 'Expresses strong certainty. 彼は来るに違いない = "He will definitely come."',
    ex: [
      {jp:'彼は成功するに違いない。',romaji:'Kare wa seikō suru ni chigai nai.',en:'He must succeed.'},
      {jp:'このケーキは美味しいに違いない。',romaji:'Kono kēki wa oishii ni chigai nai.',en:'This cake must be delicious.'}
    ],
    tip: 'Used with plain forms.',
    diff: 'Advanced',
    related: ['〜に相違ない']
  },
  {
    point: '〜に限って',
    meaning: 'especially, precisely (limited to)',
    explain: 'Indicates that something is particularly true or applicable to a specific case. 彼に限ってそんなことはしない = "He, in particular, would never do such a thing."',
    ex: [
      {jp:'休みの日に限って雨が降る。',romaji:'Yasumi no hi ni kagitte ame ga furu.',en:'It always rains especially on my days off.'},
      {jp:'彼女に限って約束を忘れない。',romaji:'Kanojo ni kagitte yakusoku wo wasurenai.',en:'She would never forget a promise.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Advanced',
    related: ['〜に限り']
  },
  {
    point: '〜せめて',
    meaning: 'at least',
    explain: 'Expresses a minimum condition. せめて一週間は休みが欲しい = "I want at least a week off."',
    ex: [
      {jp:'せめて連絡してほしかった。',romaji:'Semete renraku shite hoshikatta.',en:'I wish you had at least contacted me.'},
      {jp:'せめて週末だけは自由にしたい。',romaji:'Semete shūmatsu dake wa jiyū ni shitai.',en:'I want to be free at least on the weekend.'}
    ],
    tip: 'Used with adverbs.',
    diff: 'Advanced',
    related: ['少なくとも']
  },
];

export { N2_GRAMMAR };