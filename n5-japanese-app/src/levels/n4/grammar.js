// N4_GRAMMAR — content + enrichment (auto-merged from enrich/)
var N4_GRAMMAR = [
 {
  "point": "～たことがある",
  "meaning": "have done before (experience)",
  "explain": "Use this to say you've done something at least once in your life. Take the casual past form and add ことがある: 食べる → 食べたことがある = \"I have eaten (it) before.\"",
  "ex": [
   {
    "jp": "日本に行ったことがあります。",
    "romaji": "Nihon ni itta koto ga arimasu.",
    "en": "I have been to Japan."
   },
   {
    "jp": "すしを食べたことがありますか。",
    "romaji": "Sushi o tabeta koto ga arimasu ka.",
    "en": "Have you ever eaten sushi?"
   },
   {
    "jp": "富士山を見たことがありません。",
    "romaji": "Fujisan o mita koto ga arimasen.",
    "en": "I have never seen Mt. Fuji."
   }
  ],
  "tip": "Be sure the verb is in past form (食べた, not 食べる). 食べることがある means \"sometimes I eat,\" which is a totally different idea.",
  "diff": "Foundation",
  "related": [
   "～たことがある(occasionally)",
   "～たら",
   "～た後で"
  ],
  "prereq": "plain past た-form"
 },
 {
  "point": "～ながら",
  "meaning": "while doing (two actions at once)",
  "explain": "Use this when one person does two things at the same time. Drop ます and add ながら: 聞きます → 聞きながら, so 音楽を聞きながら勉強する = \"study while listening to music.\"",
  "ex": [
   {
    "jp": "音楽を聞きながら勉強します。",
    "romaji": "Ongaku o kikinagara benkyou shimasu.",
    "en": "I study while listening to music."
   },
   {
    "jp": "歩きながら話しましょう。",
    "romaji": "Arukinagara hanashimashou.",
    "en": "Let us talk while walking."
   },
   {
    "jp": "テレビを見ながらご飯を食べた。",
    "romaji": "Terebi o minagara gohan o tabeta.",
    "en": "I ate while watching TV."
   }
  ],
  "tip": "The thing you're really doing goes last. And both actions must be done by the same person, never two different people.",
  "diff": "Foundation",
  "related": [
   "～あいだに",
   "ます-form"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～たり～たり",
  "meaning": "do things like A and B",
  "explain": "Use this to list a few example things you do, not a full list. Add り to past forms and finish with する: 読んだり見たりする = \"do things like reading and watching.\"",
  "ex": [
   {
    "jp": "週末は本を読んだり映画を見たりします。",
    "romaji": "Shuumatsu wa hon o yondari eiga o mitari shimasu.",
    "en": "On weekends I read books, watch movies, and so on."
   },
   {
    "jp": "部屋を掃除したり洗濯したりした。",
    "romaji": "Heya o souji shitari sentaku shitari shita.",
    "en": "I cleaned the room, did laundry, and so on."
   },
   {
    "jp": "飲んだり食べたりして楽しかった。",
    "romaji": "Nondari tabetari shite tanoshikatta.",
    "en": "We drank and ate and it was fun."
   }
  ],
  "tip": "Don't forget the する at the very end. Just saying 読んだり見たり on its own sounds unfinished.",
  "diff": "Foundation",
  "related": [
   "～たり(suru)",
   "～し",
   "～たことがある"
  ],
  "prereq": "plain past た-form"
 },
 {
  "point": "～ば(conditional)",
  "meaning": "if (conditional)",
  "explain": "This is one way to say \"if.\" Change the last sound to え + ば: 行く → 行けば, 安い → 安ければ. So 時間があれば行く = \"if I have time, I'll go.\"",
  "ex": [
   {
    "jp": "時間があれば行きます。",
    "romaji": "Jikan ga areba ikimasu.",
    "en": "If I have time, I will go."
   },
   {
    "jp": "安ければ買います。",
    "romaji": "Yasukereba kaimasu.",
    "en": "If it is cheap, I will buy it."
   },
   {
    "jp": "練習すれば上手になります。",
    "romaji": "Renshuu sureba jouzu ni narimasu.",
    "en": "If you practice, you will get better."
   }
  ],
  "tip": "This \"if\" focuses on the condition itself. If you want to give a request or order after it (like \"please do X\"), use たら instead.",
  "diff": "Intermediate",
  "related": [
   "～たら",
   "～と(conditional)",
   "～ば～ほど"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～たら",
  "meaning": "if/when (then)",
  "explain": "Add ら to the past form to say \"if\" or \"when\": 帰る → 帰ったら. 家に帰ったら電話する = \"when I get home, I'll call.\" It's the easiest, most flexible \"if/when.\"",
  "ex": [
   {
    "jp": "家に帰ったら電話します。",
    "romaji": "Ie ni kaettara denwa shimasu.",
    "en": "When I get home, I will call you."
   },
   {
    "jp": "雨が降ったら行きません。",
    "romaji": "Ame ga futtara ikimasen.",
    "en": "If it rains, I will not go."
   },
   {
    "jp": "お金があったら旅行したい。",
    "romaji": "Okane ga attara ryokou shitai.",
    "en": "If I had money, I would want to travel."
   }
  ],
  "tip": "This is the only \"if\" you can follow with a request, suggestion, or order. So for \"if it rains, please call me,\" use たら.",
  "diff": "Foundation",
  "related": [
   "～ば(conditional)",
   "～と(conditional)",
   "～たらどうですか"
  ],
  "prereq": "plain past た-form"
 },
 {
  "point": "～と(conditional)",
  "meaning": "whenever/if (natural result)",
  "explain": "Add と after the plain form when B always happens as a natural result of A, like a rule or a machine: このボタンを押すとドアが開く = \"press this button and the door opens.\"",
  "ex": [
   {
    "jp": "春になると桜が咲きます。",
    "romaji": "Haru ni naru to sakura ga sakimasu.",
    "en": "When spring comes, the cherry blossoms bloom."
   },
   {
    "jp": "このボタンを押すとドアが開きます。",
    "romaji": "Kono botan o osu to doa ga akimasu.",
    "en": "If you press this button, the door opens."
   },
   {
    "jp": "右に曲がると駅があります。",
    "romaji": "Migi ni magaru to eki ga arimasu.",
    "en": "If you turn right, there is a station."
   }
  ],
  "tip": "You can't put a request, suggestion, or order after と (no \"please do X\"). For those, switch to たら.",
  "diff": "Intermediate",
  "related": [
   "～たら",
   "～ば(conditional)",
   "～ば～ほど"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～ても",
  "meaning": "even if/even though",
  "explain": "Make the て-form and add も to say \"even if\" or \"even though\": 食べる → 食べても. 雨が降っても行く = \"even if it rains, I'll go.\" The result doesn't change.",
  "ex": [
   {
    "jp": "雨が降っても行きます。",
    "romaji": "Ame ga futte mo ikimasu.",
    "en": "Even if it rains, I will go."
   },
   {
    "jp": "高くても買います。",
    "romaji": "Takakute mo kaimasu.",
    "en": "Even if it is expensive, I will buy it."
   },
   {
    "jp": "いくら食べても太りません。",
    "romaji": "Ikura tabete mo futorimasen.",
    "en": "No matter how much I eat, I do not gain weight."
   }
  ],
  "tip": "Don't mix this up with ～てもいい (\"you may\"). ても by itself means \"even if\"; adding いい turns it into permission.",
  "diff": "Intermediate",
  "related": [
   "～のに",
   "～ても いい",
   "～ても かまわない"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～なければならない",
  "meaning": "must/have to",
  "explain": "Use this for \"I have to.\" Take the ない form, drop ない, add ければならない: 起きない → 起きなければならない = \"I have to get up.\"",
  "ex": [
   {
    "jp": "明日早く起きなければなりません。",
    "romaji": "Ashita hayaku okinakereba narimasen.",
    "en": "I must get up early tomorrow."
   },
   {
    "jp": "宿題をしなければならない。",
    "romaji": "Shukudai o shinakereba naranai.",
    "en": "I have to do my homework."
   },
   {
    "jp": "薬を飲まなければなりません。",
    "romaji": "Kusuri o nomanakereba narimasen.",
    "en": "I must take my medicine."
   }
  ],
  "tip": "It literally stacks two negatives (\"if I don't, it won't do\"), but the meaning is positive: you MUST do it.",
  "diff": "Intermediate",
  "related": [
   "～なきゃ",
   "～なくてもいい",
   "～てはいけない"
  ],
  "prereq": "plain negative ない-form"
 },
 {
  "point": "～なきゃ",
  "meaning": "gotta (casual must)",
  "explain": "A casual, spoken \"gotta.\" It's a short version of なければ: 行かなきゃ = \"I gotta go.\" The rest of the phrase is usually just dropped.",
  "ex": [
   {
    "jp": "もう行かなきゃ。",
    "romaji": "Mou ikanakya.",
    "en": "I gotta go now."
   },
   {
    "jp": "宿題をやらなきゃいけない。",
    "romaji": "Shukudai o yaranakya ikenai.",
    "en": "I gotta do my homework."
   },
   {
    "jp": "早く寝なきゃ。",
    "romaji": "Hayaku nenakya.",
    "en": "I gotta go to sleep early."
   }
  ],
  "tip": "This is casual talk only. In polite speech or writing, use the full なければなりません.",
  "diff": "Foundation",
  "related": [
   "～なければならない",
   "～てはいけない",
   "～なさい"
  ],
  "prereq": "plain negative ない-form"
 },
 {
  "point": "～なくてもいい",
  "meaning": "do not have to",
  "explain": "Use this for \"you don't have to.\" Take the ない form, drop ない, add くてもいい: 来ない → 来なくてもいい = \"you don't have to come.\"",
  "ex": [
   {
    "jp": "明日来なくてもいいです。",
    "romaji": "Ashita konakute mo ii desu.",
    "en": "You do not have to come tomorrow."
   },
   {
    "jp": "急がなくてもいいよ。",
    "romaji": "Isoganakute mo ii yo.",
    "en": "You do not have to hurry."
   },
   {
    "jp": "全部食べなくてもいいです。",
    "romaji": "Zenbu tabenakute mo ii desu.",
    "en": "You do not have to eat all of it."
   }
  ],
  "tip": "This gives permission to skip something. It does NOT mean \"you must not do it\" — it just means it's okay either way.",
  "diff": "Intermediate",
  "related": [
   "～なければならない",
   "～ても いい",
   "～ても かまわない"
  ],
  "prereq": "plain negative ない-form"
 },
 {
  "point": "～ことにする",
  "meaning": "decide to do",
  "explain": "Use this when YOU decide to do something. Add ことにする to the plain form: 毎日運動することにした = \"I've decided to exercise every day.\"",
  "ex": [
   {
    "jp": "毎日運動することにしました。",
    "romaji": "Mainichi undou suru koto ni shimashita.",
    "en": "I have decided to exercise every day."
   },
   {
    "jp": "たばこをやめることにした。",
    "romaji": "Tabako o yameru koto ni shita.",
    "en": "I decided to quit smoking."
   },
   {
    "jp": "今日は行かないことにします。",
    "romaji": "Kyou wa ikanai koto ni shimasu.",
    "en": "I have decided not to go today."
   }
  ],
  "tip": "This is your own choice. If the decision is made by others or by circumstances, use ことになる instead.",
  "diff": "Intermediate",
  "related": [
   "～ことになる",
   "～ようにする",
   "～つもりだ"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～ことになる",
  "meaning": "it has been decided that",
  "explain": "Use this when something \"has been decided\" by others or by the situation, not by you: 東京へ転勤することになった = \"it's been decided I'll transfer to Tokyo.\"",
  "ex": [
   {
    "jp": "来月東京へ転勤することになりました。",
    "romaji": "Raigetsu Toukyou e tenkin suru koto ni narimashita.",
    "en": "It has been decided I will transfer to Tokyo next month."
   },
   {
    "jp": "会議は来週することになった。",
    "romaji": "Kaigi wa raishuu suru koto ni natta.",
    "en": "It was decided the meeting will be next week."
   },
   {
    "jp": "結婚することになりました。",
    "romaji": "Kekkon suru koto ni narimashita.",
    "en": "It has been decided that we will get married."
   }
  ],
  "tip": "It sounds like the decision happened to you. Compare with ことにする, which is a choice you made yourself.",
  "diff": "Intermediate",
  "related": [
   "～ことにする",
   "～ようになる",
   "～はずだ"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～ようにする",
  "meaning": "make an effort to / try to",
  "explain": "Use this when you make an effort or build a habit of doing something. Add ようにする to the plain form: 毎日野菜を食べるようにしている = \"I try to eat vegetables every day.\"",
  "ex": [
   {
    "jp": "毎日野菜を食べるようにしています。",
    "romaji": "Mainichi yasai o taberu you ni shite imasu.",
    "en": "I make an effort to eat vegetables every day."
   },
   {
    "jp": "遅れないようにしてください。",
    "romaji": "Okurenai you ni shite kudasai.",
    "en": "Please try not to be late."
   },
   {
    "jp": "早く寝るようにします。",
    "romaji": "Hayaku neru you ni shimasu.",
    "en": "I will try to go to bed early."
   }
  ],
  "tip": "This is about ongoing effort. ことにする is a single firm decision made at one moment — don't confuse the two.",
  "diff": "Intermediate",
  "related": [
   "～ようになる",
   "～ことにする",
   "～ように(言う/する)"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～ようになる",
  "meaning": "come to / reach the point where",
  "explain": "Use this for a gradual change into a new ability or habit. Add ようになる: 話せる → 話せるようになった = \"I became able to speak.\"",
  "ex": [
   {
    "jp": "日本語が話せるようになりました。",
    "romaji": "Nihongo ga hanaseru you ni narimashita.",
    "en": "I have become able to speak Japanese."
   },
   {
    "jp": "最近運動するようになった。",
    "romaji": "Saikin undou suru you ni natta.",
    "en": "Lately I have started to exercise."
   },
   {
    "jp": "漢字が読めるようになりたい。",
    "romaji": "Kanji ga yomeru you ni naritai.",
    "en": "I want to become able to read kanji."
   }
  ],
  "tip": "Often pairs with the \"can\" form to mean \"became able to.\" Remember: ようになる is a change that happens; ようにする is effort you make.",
  "diff": "Intermediate",
  "related": [
   "～ようにする",
   "～ことになる",
   "～られる(potential)"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～そうだ(appearance)",
  "meaning": "looks like / seems",
  "explain": "Use this when something LOOKS a certain way from what you see right now. Drop ます or the final い and add そう: おいしい → おいしそう = \"looks delicious,\" 雨が降りそう = \"looks like rain.\"",
  "ex": [
   {
    "jp": "このケーキはおいしそうです。",
    "romaji": "Kono keeki wa oishisou desu.",
    "en": "This cake looks delicious."
   },
   {
    "jp": "雨が降りそうです。",
    "romaji": "Ame ga furisou desu.",
    "en": "It looks like it is going to rain."
   },
   {
    "jp": "彼は元気そうですね。",
    "romaji": "Kare wa genkisou desu ne.",
    "en": "He looks healthy, doesn't he?"
   }
  ],
  "tip": "いい and ない turn into よさそう and なさそう. Also, this \"looks like\" そう attaches to a stem; the \"I heard\" そう attaches to full plain forms.",
  "diff": "Intermediate",
  "related": [
   "～そうだ(hearsay)",
   "～みたい(だ)",
   "～らしい"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～そうだ(hearsay)",
  "meaning": "I heard that",
  "explain": "Use this to pass on something you heard from someone or somewhere. Add そうだ to a full plain form: 雨だそうだ = \"I heard it'll rain,\" 結婚するそうだ = \"I heard they're getting married.\"",
  "ex": [
   {
    "jp": "明日は雨だそうです。",
    "romaji": "Ashita wa ame da sou desu.",
    "en": "I heard it will rain tomorrow."
   },
   {
    "jp": "田中さんは結婚するそうです。",
    "romaji": "Tanaka-san wa kekkon suru sou desu.",
    "en": "I heard Mr. Tanaka is getting married."
   },
   {
    "jp": "あの店は安いそうだ。",
    "romaji": "Ano mise wa yasui sou da.",
    "en": "I heard that shop is cheap."
   }
  ],
  "tip": "Notice where it attaches: 雨だそうだ (heard) vs 雨が降りそう (looks like). The attachment point tells the two そう apart.",
  "diff": "Intermediate",
  "related": [
   "～そうだ(appearance)",
   "～らしい",
   "～によると"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～らしい",
  "meaning": "seems/apparently (based on info)",
  "explain": "Use this for \"apparently\" or \"it seems,\" based on info you trust from outside, not your own eyes. Add らしい: あの映画はおもしろいらしい = \"apparently that movie is good.\"",
  "ex": [
   {
    "jp": "彼はもう帰ったらしいです。",
    "romaji": "Kare wa mou kaetta rashii desu.",
    "en": "It seems he has already gone home."
   },
   {
    "jp": "あの映画はおもしろいらしい。",
    "romaji": "Ano eiga wa omoshiroi rashii.",
    "en": "Apparently that movie is interesting."
   },
   {
    "jp": "来週は寒くなるらしいです。",
    "romaji": "Raishuu wa samuku naru rashii desu.",
    "en": "It seems it will get cold next week."
   }
  ],
  "tip": "らしい leans on outside info you heard. みたい leans more on your own observation, so they aren't always swappable.",
  "diff": "Intermediate",
  "related": [
   "～そうだ(hearsay)",
   "～みたい(だ)",
   "～によると"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～みたい(だ)",
  "meaning": "looks like / seems like",
  "explain": "Use this for \"seems like\" based on what you yourself notice, or \"is like\" something. Add みたい: 風邪をひいたみたい = \"seems he caught a cold,\" レモンみたい = \"like lemon.\"",
  "ex": [
   {
    "jp": "彼は風邪をひいたみたいです。",
    "romaji": "Kare wa kaze o hiita mitai desu.",
    "en": "It seems he caught a cold."
   },
   {
    "jp": "この味はレモンみたいだ。",
    "romaji": "Kono aji wa remon mitai da.",
    "en": "This taste is like lemon."
   },
   {
    "jp": "外は寒いみたいです。",
    "romaji": "Soto wa samui mitai desu.",
    "en": "It seems cold outside."
   }
  ],
  "tip": "After a noun, attach みたい directly — no extra word in between. Say レモンみたい, not レモンのみたい.",
  "diff": "Intermediate",
  "related": [
   "～らしい",
   "～そうだ(appearance)",
   "～はずだ"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～はずだ",
  "meaning": "should be / supposed to",
  "explain": "Use this for \"should be\" when logic tells you so. Add はずだ: 彼は今日来るはずだ = \"he's supposed to come today.\" You expect it based on a reason.",
  "ex": [
   {
    "jp": "彼は今日来るはずです。",
    "romaji": "Kare wa kyou kuru hazu desu.",
    "en": "He is supposed to come today."
   },
   {
    "jp": "もう着いているはずだ。",
    "romaji": "Mou tsuite iru hazu da.",
    "en": "He should have already arrived."
   },
   {
    "jp": "この答えは正しいはずです。",
    "romaji": "Kono kotae wa tadashii hazu desu.",
    "en": "This answer should be correct."
   }
  ],
  "tip": "This is a logical expectation, not just a hope. If you're only guessing, use でしょう or かもしれない instead.",
  "diff": "Intermediate",
  "related": [
   "～だろう/でしょう",
   "～つもりだ",
   "～みたい(だ)"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～つもりだ",
  "meaning": "intend to",
  "explain": "Use this to state a firm plan you already hold. Add つもりだ: 来年留学するつもりだ = \"I intend to study abroad next year.\"",
  "ex": [
   {
    "jp": "来年留学するつもりです。",
    "romaji": "Rainen ryuugaku suru tsumori desu.",
    "en": "I intend to study abroad next year."
   },
   {
    "jp": "今日は早く帰るつもりだ。",
    "romaji": "Kyou wa hayaku kaeru tsumori da.",
    "en": "I intend to go home early today."
   },
   {
    "jp": "もう会わないつもりです。",
    "romaji": "Mou awanai tsumori desu.",
    "en": "I intend not to meet them anymore."
   }
  ],
  "tip": "つもり is a plan you've already settled on. ～(よ)うと思う is something you're only just now thinking about doing.",
  "diff": "Foundation",
  "related": [
   "～(よ)うと思う",
   "～ことにする",
   "～はずだ"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～だろう/でしょう",
  "meaning": "probably / I guess",
  "explain": "Use this for a guess, like \"probably.\" Add だろう (casual) or でしょう (polite): 明日は晴れるでしょう = \"it'll probably be sunny.\"",
  "ex": [
   {
    "jp": "明日は晴れるでしょう。",
    "romaji": "Ashita wa hareru deshou.",
    "en": "It will probably be sunny tomorrow."
   },
   {
    "jp": "彼は来ないだろう。",
    "romaji": "Kare wa konai darou.",
    "en": "He probably will not come."
   },
   {
    "jp": "この問題は難しいでしょう。",
    "romaji": "Kono mondai wa muzukashii deshou.",
    "en": "This problem is probably difficult."
   }
  ],
  "tip": "Said going down in tone, it means \"probably.\" Said going up (でしょう?), it instead asks \"right?\" — listen for the tone.",
  "diff": "Foundation",
  "related": [
   "～かもしれない",
   "～でしょう(confirmation)",
   "～はずだ"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～かもしれない",
  "meaning": "might / maybe",
  "explain": "Use this for \"might\" or \"maybe,\" when you're not very sure. Add かもしれない: 明日雨が降るかもしれない = \"it might rain tomorrow.\"",
  "ex": [
   {
    "jp": "明日雨が降るかもしれません。",
    "romaji": "Ashita ame ga furu kamoshiremasen.",
    "en": "It might rain tomorrow."
   },
   {
    "jp": "彼は知らないかもしれない。",
    "romaji": "Kare wa shiranai kamoshirenai.",
    "en": "He might not know."
   },
   {
    "jp": "この店は高いかもしれません。",
    "romaji": "Kono mise wa takai kamoshiremasen.",
    "en": "This shop might be expensive."
   }
  ],
  "tip": "This (\"maybe,\" around half-sure) is weaker than でしょう (\"probably\"). Don't sprinkle it everywhere — sometimes a plain statement is better.",
  "diff": "Foundation",
  "related": [
   "～かもしれない(casual)",
   "～だろう/でしょう",
   "～はずだ"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～てしまう",
  "meaning": "do completely / unfortunately do",
  "explain": "Add しまう to the て-form to show something is fully done, or that you regret it: 全部やってしまった = \"I finished it all,\" 忘れてしまった = \"I went and forgot it.\"",
  "ex": [
   {
    "jp": "宿題を全部やってしまいました。",
    "romaji": "Shukudai o zenbu yatte shimaimashita.",
    "en": "I finished all my homework."
   },
   {
    "jp": "財布を忘れてしまった。",
    "romaji": "Saifu o wasurete shimatta.",
    "en": "I unfortunately forgot my wallet."
   },
   {
    "jp": "ケーキを食べてしまいました。",
    "romaji": "Keeki o tabete shimaimashita.",
    "en": "I ended up eating the cake."
   }
  ],
  "tip": "In casual speech it shrinks: てしまう → ちゃう, でしまう → じゃう (食べちゃった). Whether it means \"done\" or \"oops\" depends on the situation.",
  "diff": "Intermediate",
  "related": [
   "～ておく",
   "～おわる",
   "～ところだ"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～ておく",
  "meaning": "do in advance / leave as is",
  "explain": "Add おく to the て-form to do something ahead of time as preparation, or leave it that way on purpose: 切符を買っておく = \"buy the ticket in advance.\"",
  "ex": [
   {
    "jp": "旅行の前に切符を買っておきます。",
    "romaji": "Ryokou no mae ni kippu o katte okimasu.",
    "en": "I will buy the ticket before the trip in advance."
   },
   {
    "jp": "会議の資料を準備しておいた。",
    "romaji": "Kaigi no shiryou o junbi shite oita.",
    "en": "I prepared the meeting materials in advance."
   },
   {
    "jp": "窓を開けておいてください。",
    "romaji": "Mado o akete oite kudasai.",
    "en": "Please leave the window open."
   }
  ],
  "tip": "In casual speech ておく often becomes とく (買っとく). And don't confuse this \"in advance\" おく with the plain verb 置く (\"to put\").",
  "diff": "Intermediate",
  "related": [
   "～てある",
   "～てしまう",
   "～前に"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～てみる",
  "meaning": "try doing",
  "explain": "Add みる to the て-form to \"try doing\" something to see how it goes: 食べてみる = \"try eating it,\" 話してみる = \"give talking a shot.\"",
  "ex": [
   {
    "jp": "この料理を食べてみます。",
    "romaji": "Kono ryouri o tabete mimasu.",
    "en": "I will try eating this dish."
   },
   {
    "jp": "新しい靴をはいてみた。",
    "romaji": "Atarashii kutsu o haite mita.",
    "en": "I tried on the new shoes."
   },
   {
    "jp": "日本語で話してみてください。",
    "romaji": "Nihongo de hanashite mite kudasai.",
    "en": "Please try speaking in Japanese."
   }
  ],
  "tip": "Write this みる in kana, not the kanji 見る. Here it means \"try,\" not literally \"look.\"",
  "diff": "Foundation",
  "related": [
   "～てしまう",
   "～ておく",
   "～たらどうですか"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～てあげる",
  "meaning": "do for someone (giving)",
  "explain": "Add あげる to the て-form when you do a kind action FOR someone else: 友だちに本を貸してあげる = \"lend a book to my friend (as a favor).\"",
  "ex": [
   {
    "jp": "友だちに本を貸してあげました。",
    "romaji": "Tomodachi ni hon o kashite agemashita.",
    "en": "I lent a book to my friend."
   },
   {
    "jp": "弟に宿題を教えてあげた。",
    "romaji": "Otouto ni shukudai o oshiete ageta.",
    "en": "I taught my little brother his homework."
   },
   {
    "jp": "おばあさんに道を教えてあげます。",
    "romaji": "Obaasan ni michi o oshiete agemasu.",
    "en": "I will tell the old lady the way."
   }
  ],
  "tip": "Be careful using this toward people above you — it can sound like you're showing off the favor. With a boss or elder, soften it or rephrase.",
  "diff": "Intermediate",
  "related": [
   "～てくれる",
   "～てもらう",
   "～ていただく"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～てくれる",
  "meaning": "someone does for me",
  "explain": "Add くれる to the て-form when someone does a kind action FOR you (or your side): 母がケーキを作ってくれた = \"my mom made a cake for me.\"",
  "ex": [
   {
    "jp": "母がケーキを作ってくれました。",
    "romaji": "Haha ga keeki o tsukutte kuremashita.",
    "en": "My mother made a cake for me."
   },
   {
    "jp": "友だちが手伝ってくれた。",
    "romaji": "Tomodachi ga tetsudatte kureta.",
    "en": "My friend helped me."
   },
   {
    "jp": "先生が説明してくれました。",
    "romaji": "Sensei ga setsumei shite kuremashita.",
    "en": "The teacher explained it for me."
   }
  ],
  "tip": "くれる always points the favor toward you. If instead you're doing the favor for someone else, switch to あげる.",
  "diff": "Intermediate",
  "related": [
   "～てあげる",
   "～てもらう",
   "～ていただく"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～てもらう",
  "meaning": "have someone do for me",
  "explain": "Add もらう to the て-form when you get someone to do something for you: 友だちに写真を撮ってもらった = \"I had my friend take a photo.\"",
  "ex": [
   {
    "jp": "友だちに写真を撮ってもらいました。",
    "romaji": "Tomodachi ni shashin o totte moraimashita.",
    "en": "I had my friend take a photo."
   },
   {
    "jp": "先生に手紙を直してもらった。",
    "romaji": "Sensei ni tegami o naoshite moratta.",
    "en": "I had the teacher correct my letter."
   },
   {
    "jp": "医者に見てもらいます。",
    "romaji": "Isha ni mite moraimasu.",
    "en": "I will have a doctor examine me."
   }
  ],
  "tip": "Mark the helper with に (友だちに). Compare くれる, where the helper is the doer marked with が — the wording shifts.",
  "diff": "Intermediate",
  "related": [
   "～てくれる",
   "～てあげる",
   "～ていただく"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～られる(passive)",
  "meaning": "passive voice",
  "explain": "This form shows something was done TO you by someone else, often when it's unwelcome: 弟にケーキを食べられた = \"my little brother ate my cake (on me).\"",
  "ex": [
   {
    "jp": "弟にケーキを食べられました。",
    "romaji": "Otouto ni keeki o taberaremashita.",
    "en": "My cake was eaten by my little brother."
   },
   {
    "jp": "先生にほめられた。",
    "romaji": "Sensei ni homerareta.",
    "en": "I was praised by the teacher."
   },
   {
    "jp": "雨に降られて困りました。",
    "romaji": "Ame ni furarete komarimashita.",
    "en": "I was troubled by being rained on."
   }
  ],
  "tip": "Even with no clear thing acted on, it can show something bad happening to you (雨に降られた = \"got rained on\"). The doer is marked with に.",
  "diff": "Advanced",
  "related": [
   "～させる(causative)",
   "～させられる(causative-passive)",
   "～られる(potential)"
  ],
  "prereq": "plain negative ない-form"
 },
 {
  "point": "～させる(causative)",
  "meaning": "make/let someone do",
  "explain": "This form means \"make\" or \"let\" someone do something: 子どもに野菜を食べさせる = \"make my child eat vegetables,\" 子どもを遊ばせる = \"let the kids play.\"",
  "ex": [
   {
    "jp": "子どもに野菜を食べさせます。",
    "romaji": "Kodomo ni yasai o tabesasemasu.",
    "en": "I make my child eat vegetables."
   },
   {
    "jp": "先生は学生に本を読ませた。",
    "romaji": "Sensei wa gakusei ni hon o yomaseta.",
    "en": "The teacher made the students read books."
   },
   {
    "jp": "子どもを遊ばせます。",
    "romaji": "Kodomo o asobasemasu.",
    "en": "I let the children play."
   }
  ],
  "tip": "に for the person often feels like \"let,\" while を can feel like \"make/force.\" The same form covers both, so the situation decides which.",
  "diff": "Advanced",
  "related": [
   "～られる(passive)",
   "～させられる(causative-passive)",
   "～させてください"
  ],
  "prereq": "plain negative ない-form"
 },
 {
  "point": "～させられる(causative-passive)",
  "meaning": "be made to do",
  "explain": "This combined form means you were \"made to do\" something you didn't want: 部屋を掃除させられた = \"I was made to clean the room.\"",
  "ex": [
   {
    "jp": "母に部屋を掃除させられました。",
    "romaji": "Haha ni heya o souji saseraremashita.",
    "en": "I was made to clean the room by my mother."
   },
   {
    "jp": "先生に立たされた。",
    "romaji": "Sensei ni tatasareta.",
    "en": "I was made to stand by the teacher."
   },
   {
    "jp": "毎日漢字を覚えさせられます。",
    "romaji": "Mainichi kanji o oboesaseraremasu.",
    "en": "I am made to memorize kanji every day."
   }
  ],
  "tip": "For many verbs this shortens (待たせられる → 待たされる). It always carries a reluctant, \"I had no choice\" feeling.",
  "diff": "Advanced",
  "related": [
   "～させる(causative)",
   "～られる(passive)",
   "～させてください"
  ],
  "prereq": "plain negative ない-form"
 },
 {
  "point": "～させてください",
  "meaning": "please let me do",
  "explain": "Use this to politely ask \"please let me\" do something. Take the \"make/let\" て-form and add ください: 休ませてください = \"please let me rest.\"",
  "ex": [
   {
    "jp": "ちょっと休ませてください。",
    "romaji": "Chotto yasumasete kudasai.",
    "en": "Please let me rest a bit."
   },
   {
    "jp": "私にやらせてください。",
    "romaji": "Watashi ni yarasete kudasai.",
    "en": "Please let me do it."
   },
   {
    "jp": "明日早く帰らせてください。",
    "romaji": "Ashita hayaku kaerasete kudasai.",
    "en": "Please let me leave early tomorrow."
   }
  ],
  "tip": "This asks permission for YOU to act. Don't mix it up with plain ～てください, which asks someone ELSE to do something.",
  "diff": "Advanced",
  "related": [
   "～させる(causative)",
   "～ても いい",
   "～ていただく"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～られる(potential)",
  "meaning": "can / be able to",
  "explain": "This form means \"can\" or \"be able to\": 食べる → 食べられる, 読む → 読める. 漢字が読める = \"I can read kanji.\"",
  "ex": [
   {
    "jp": "私は刺身が食べられます。",
    "romaji": "Watashi wa sashimi ga taberaremasu.",
    "en": "I can eat sashimi."
   },
   {
    "jp": "漢字が読めますか。",
    "romaji": "Kanji ga yomemasu ka.",
    "en": "Can you read kanji?"
   },
   {
    "jp": "明日は来られません。",
    "romaji": "Ashita wa koraremasen.",
    "en": "I cannot come tomorrow."
   }
  ],
  "tip": "What you can do takes が, not を (刺身が食べられる). In casual speech people often drop the ら (食べれる).",
  "diff": "Intermediate",
  "related": [
   "～ことができる",
   "～ようになる",
   "～られる(passive)"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～(よ)う(volitional)",
  "meaning": "let us / shall (plain)",
  "explain": "This casual form means \"let's\" or \"I'll\": 行く → 行こう, 食べる → 食べよう. 一緒に行こう = \"let's go together.\"",
  "ex": [
   {
    "jp": "一緒に行こう。",
    "romaji": "Issho ni ikou.",
    "en": "Let us go together."
   },
   {
    "jp": "もう少し待とう。",
    "romaji": "Mou sukoshi matou.",
    "en": "Let us wait a little longer."
   },
   {
    "jp": "今日は早く寝よう。",
    "romaji": "Kyou wa hayaku neyou.",
    "en": "Let us sleep early today."
   }
  ],
  "tip": "This is the casual version of ましょう. It shows your will or an invitation, not a guess — a guess would be だろう.",
  "diff": "Foundation",
  "related": [
   "～(よ)うと思う",
   "～つもりだ",
   "～なさい"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～(よ)うと思う",
  "meaning": "I am thinking of doing",
  "explain": "Add と思う after the \"let's\" form to say \"I'm thinking of doing it\": 行こうと思う = \"I think I'll go,\" 買おうと思っている = \"I'm thinking of buying it.\"",
  "ex": [
   {
    "jp": "来年日本へ行こうと思います。",
    "romaji": "Rainen Nihon e ikou to omoimasu.",
    "en": "I am thinking of going to Japan next year."
   },
   {
    "jp": "新しい車を買おうと思っています。",
    "romaji": "Atarashii kuruma o kaou to omotte imasu.",
    "en": "I am thinking of buying a new car."
   },
   {
    "jp": "今日は勉強しようと思う。",
    "romaji": "Kyou wa benkyou shiyou to omou.",
    "en": "I think I will study today."
   }
  ],
  "tip": "Using と思っている (the -ing version) sounds like a longer-held plan; plain と思う sounds like a decision you just made on the spot.",
  "diff": "Intermediate",
  "related": [
   "～(よ)う(volitional)",
   "～と思う",
   "～つもりだ"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～と思う",
  "meaning": "I think that",
  "explain": "Add と思う after a plain form to share your own opinion: 彼は来ると思う = \"I think he'll come,\" おもしろいと思う = \"I think it's interesting.\"",
  "ex": [
   {
    "jp": "彼は来ると思います。",
    "romaji": "Kare wa kuru to omoimasu.",
    "en": "I think he will come."
   },
   {
    "jp": "この映画はおもしろいと思う。",
    "romaji": "Kono eiga wa omoshiroi to omou.",
    "en": "I think this movie is interesting."
   },
   {
    "jp": "明日は晴れると思います。",
    "romaji": "Ashita wa hareru to omoimasu.",
    "en": "I think it will be sunny tomorrow."
   }
  ],
  "tip": "Keep the part before と思う in casual plain form, even when the sentence is polite: say 来ると思います, never 来ますと思います.",
  "diff": "Foundation",
  "related": [
   "～(よ)うと思う",
   "～と言う",
   "～と言っていた"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～と言っていた",
  "meaning": "said that (quoting)",
  "explain": "Add と言っていた to report what someone else said: 田中さんは来ると言っていた = \"Mr. Tanaka said he'd come.\"",
  "ex": [
   {
    "jp": "田中さんは来ると言っていました。",
    "romaji": "Tanaka-san wa kuru to itte imashita.",
    "en": "Mr. Tanaka said he would come."
   },
   {
    "jp": "母は買い物に行くと言っていた。",
    "romaji": "Haha wa kaimono ni iku to itte ita.",
    "en": "My mother said she was going shopping."
   },
   {
    "jp": "先生は明日休みだと言っていました。",
    "romaji": "Sensei wa ashita yasumi da to itte imashita.",
    "en": "The teacher said tomorrow is a day off."
   }
  ],
  "tip": "と言っていた (\"was saying\") reports someone else's words generally. For a single direct quote, you can use と言った instead.",
  "diff": "Intermediate",
  "related": [
   "～と言う",
   "～と思う",
   "～によると"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～場合(は)",
  "meaning": "in the case of",
  "explain": "Add 場合(は) to set up a \"what if\" situation: 火事の場合は階段を使う = \"in case of fire, use the stairs,\" 遅れる場合は連絡する = \"if you'll be late, get in touch.\"",
  "ex": [
   {
    "jp": "火事の場合は階段を使ってください。",
    "romaji": "Kaji no baai wa kaidan o tsukatte kudasai.",
    "en": "In case of fire, please use the stairs."
   },
   {
    "jp": "遅れる場合は連絡してください。",
    "romaji": "Okureru baai wa renraku shite kudasai.",
    "en": "In case you are late, please contact me."
   },
   {
    "jp": "雨の場合は中止です。",
    "romaji": "Ame no baai wa chuushi desu.",
    "en": "In the case of rain, it is cancelled."
   }
  ],
  "tip": "It's more formal than たら and shows up a lot in rules and notices. After a noun, link it with の (雨の場合).",
  "diff": "Intermediate",
  "related": [
   "～たら",
   "～と(conditional)",
   "～時(とき)"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～のに",
  "meaning": "even though / despite",
  "explain": "Add のに for \"even though,\" when the result is surprising or disappointing: 勉強したのにできなかった = \"even though I studied, I did badly.\"",
  "ex": [
   {
    "jp": "勉強したのにテストができなかった。",
    "romaji": "Benkyou shita noni tesuto ga dekinakatta.",
    "en": "Even though I studied, I did poorly on the test."
   },
   {
    "jp": "寒いのに彼は上着を着ない。",
    "romaji": "Samui noni kare wa uwagi o kinai.",
    "en": "Even though it is cold, he does not wear a jacket."
   },
   {
    "jp": "約束したのに来なかった。",
    "romaji": "Yakusoku shita noni konakatta.",
    "en": "Even though he promised, he did not come."
   }
  ],
  "tip": "のに carries a feeling of surprise or complaint. Plain けど/が is neutral, so don't swap them in when you mean \"unexpectedly.\"",
  "diff": "Intermediate",
  "related": [
   "～ても",
   "～ので",
   "～し"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～ので",
  "meaning": "because / since",
  "explain": "Add ので to give a reason in a soft, polite way, like \"because\" or \"since\": 頭が痛いので帰ります = \"I'll head home because I have a headache.\"",
  "ex": [
   {
    "jp": "頭が痛いので帰ります。",
    "romaji": "Atama ga itai node kaerimasu.",
    "en": "I will go home because I have a headache."
   },
   {
    "jp": "雨が降っているので行きません。",
    "romaji": "Ame ga futte iru node ikimasen.",
    "en": "Since it is raining, I will not go."
   },
   {
    "jp": "時間がないので急ぎましょう。",
    "romaji": "Jikan ga nai node isogimashou.",
    "en": "Since there is no time, let us hurry."
   }
  ],
  "tip": "After a noun or a な-word, put な before ので (静かなので). ので feels gentler and more matter-of-fact than から.",
  "diff": "Foundation",
  "related": [
   "～のに",
   "～し",
   "～場合(は)"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～し",
  "meaning": "and (listing reasons)",
  "explain": "Add し to pile up two or more reasons or good points: この店は安いしおいしい = \"this place is cheap and (on top of that) tasty.\"",
  "ex": [
   {
    "jp": "この店は安いしおいしいです。",
    "romaji": "Kono mise wa yasui shi oishii desu.",
    "en": "This shop is cheap and delicious."
   },
   {
    "jp": "雨だし寒いし、家にいよう。",
    "romaji": "Ame da shi samui shi, ie ni iyou.",
    "en": "It is raining and cold, so let us stay home."
   },
   {
    "jp": "彼は親切だし頭もいい。",
    "romaji": "Kare wa shinsetsu da shi atama mo ii.",
    "en": "He is kind and also smart."
   }
  ],
  "tip": "After a noun or な-word, add だ before し (雨だし). し hints there are even more reasons beyond the ones you actually said.",
  "diff": "Foundation",
  "related": [
   "～ので",
   "～たり～たり",
   "～のに"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～たほうがいい",
  "meaning": "had better do",
  "explain": "Use this to give advice: \"you'd better do X.\" Add ほうがいい to the PAST form: 早く寝たほうがいい = \"you'd better sleep early.\"",
  "ex": [
   {
    "jp": "早く寝たほうがいいです。",
    "romaji": "Hayaku neta hou ga ii desu.",
    "en": "You had better go to bed early."
   },
   {
    "jp": "病院に行ったほうがいいよ。",
    "romaji": "Byouin ni itta hou ga ii yo.",
    "en": "You had better go to the hospital."
   },
   {
    "jp": "もっと野菜を食べたほうがいい。",
    "romaji": "Motto yasai o tabeta hou ga ii.",
    "en": "You had better eat more vegetables."
   }
  ],
  "tip": "Use the past form (寝た) even for future advice. Using the present form instead softens it into a milder suggestion.",
  "diff": "Foundation",
  "related": [
   "～ないほうがいい",
   "～たらどうですか",
   "～なさい"
  ],
  "prereq": "plain past た-form"
 },
 {
  "point": "～ないほうがいい",
  "meaning": "had better not do",
  "explain": "Use this to advise AGAINST something: \"you'd better not.\" Add ほうがいい to the ない form: たばこを吸わないほうがいい = \"you'd better not smoke.\"",
  "ex": [
   {
    "jp": "たばこを吸わないほうがいいです。",
    "romaji": "Tabako o suwanai hou ga ii desu.",
    "en": "You had better not smoke."
   },
   {
    "jp": "夜遅く食べないほうがいい。",
    "romaji": "Yoru osoku tabenai hou ga ii.",
    "en": "You had better not eat late at night."
   },
   {
    "jp": "無理をしないほうがいいですよ。",
    "romaji": "Muri o shinai hou ga ii desu yo.",
    "en": "You had better not overdo it."
   }
  ],
  "tip": "Here you keep the ない form, NOT the past — unlike the positive advice (たほうがいい), which uses the past form.",
  "diff": "Foundation",
  "related": [
   "～たほうがいい",
   "～てはいけない",
   "～なさい"
  ],
  "prereq": "plain negative ない-form"
 },
 {
  "point": "～すぎる",
  "meaning": "too much / excessively",
  "explain": "Use this for \"too much.\" Drop ます or the final い/な and add すぎる: 食べすぎる = \"eat too much,\" 難しすぎる = \"too difficult.\"",
  "ex": [
   {
    "jp": "食べすぎてお腹が痛い。",
    "romaji": "Tabesugite onaka ga itai.",
    "en": "I ate too much and my stomach hurts."
   },
   {
    "jp": "この問題は難しすぎます。",
    "romaji": "Kono mondai wa muzukashisugimasu.",
    "en": "This problem is too difficult."
   },
   {
    "jp": "昨日は飲みすぎました。",
    "romaji": "Kinou wa nomisugimashita.",
    "en": "I drank too much yesterday."
   }
  ],
  "tip": "いい and ない become よすぎる and なさすぎる. It almost always means the excess is a problem, not a good thing.",
  "diff": "Foundation",
  "related": [
   "～やすい",
   "～にくい",
   "～方(かた)"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～やすい",
  "meaning": "easy to do",
  "explain": "Add やすい to the ます-stem to say something is \"easy to do\": 読む → 読みやすい = \"easy to read,\" 飲みやすい = \"easy to take/drink.\"",
  "ex": [
   {
    "jp": "この本は読みやすいです。",
    "romaji": "Kono hon wa yomiyasui desu.",
    "en": "This book is easy to read."
   },
   {
    "jp": "この薬は飲みやすい。",
    "romaji": "Kono kusuri wa nomiyasui.",
    "en": "This medicine is easy to take."
   },
   {
    "jp": "先生の説明は分かりやすいです。",
    "romaji": "Sensei no setsumei wa wakariyasui desu.",
    "en": "The teacher's explanation is easy to understand."
   }
  ],
  "tip": "It changes its ending just like an い-adjective (読みやすかった = \"was easy to read\"), so treat the whole thing as a describing word.",
  "diff": "Foundation",
  "related": [
   "～にくい",
   "～すぎる",
   "～方(かた)"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～にくい",
  "meaning": "hard to do",
  "explain": "Add にくい to the ます-stem to say something is \"hard to do\": 読む → 読みにくい = \"hard to read,\" 食べにくい = \"hard to eat.\" It's the opposite of やすい.",
  "ex": [
   {
    "jp": "この字は読みにくいです。",
    "romaji": "Kono ji wa yominikui desu.",
    "en": "This character is hard to read."
   },
   {
    "jp": "この肉はかたくて食べにくい。",
    "romaji": "Kono niku wa katakute tabenikui.",
    "en": "This meat is tough and hard to eat."
   },
   {
    "jp": "この道は歩きにくいです。",
    "romaji": "Kono michi wa arukinikui desu.",
    "en": "This road is hard to walk on."
   }
  ],
  "tip": "Like やすい, it bends like an い-adjective (食べにくかった = \"was hard to eat\").",
  "diff": "Foundation",
  "related": [
   "～やすい",
   "～すぎる",
   "～方(かた)"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～はじめる",
  "meaning": "begin to do",
  "explain": "Add はじめる to the ます-stem to show an action starts up: 降りはじめる = \"start to rain,\" 勉強しはじめる = \"begin studying.\"",
  "ex": [
   {
    "jp": "雨が降りはじめました。",
    "romaji": "Ame ga furihajimemashita.",
    "en": "It started to rain."
   },
   {
    "jp": "日本語を勉強しはじめた。",
    "romaji": "Nihongo o benkyou shihajimeta.",
    "en": "I began studying Japanese."
   },
   {
    "jp": "桜が咲きはじめました。",
    "romaji": "Sakura ga sakihajimemashita.",
    "en": "The cherry blossoms began to bloom."
   }
  ],
  "tip": "はじめる is a smooth, natural beginning. For a sudden, out-of-nowhere start, use だす instead.",
  "diff": "Foundation",
  "related": [
   "～だす",
   "～つづける",
   "～おわる"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～だす",
  "meaning": "suddenly start to",
  "explain": "Add だす to the ます-stem for a SUDDEN start: 泣きだす = \"burst into tears,\" 急に降りだす = \"suddenly start raining.\"",
  "ex": [
   {
    "jp": "急に雨が降りだした。",
    "romaji": "Kyuu ni ame ga furidashita.",
    "en": "It suddenly started to rain."
   },
   {
    "jp": "赤ちゃんが泣きだしました。",
    "romaji": "Akachan ga nakidashimashita.",
    "en": "The baby suddenly started crying."
   },
   {
    "jp": "彼は急に笑いだした。",
    "romaji": "Kare wa kyuu ni waraidashita.",
    "en": "He suddenly burst out laughing."
   }
  ],
  "tip": "だす stresses that the start was abrupt or unexpected, while はじめる is just a calm, ordinary beginning.",
  "diff": "Intermediate",
  "related": [
   "～はじめる",
   "～つづける",
   "～おわる"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～つづける",
  "meaning": "continue to do",
  "explain": "Add つづける to the ます-stem to show an action keeps going: 歩きつづける = \"keep walking,\" 話しつづける = \"keep talking.\"",
  "ex": [
   {
    "jp": "三時間歩きつづけました。",
    "romaji": "San-jikan arukitsuzukemashita.",
    "en": "I kept walking for three hours."
   },
   {
    "jp": "彼は話しつづけた。",
    "romaji": "Kare wa hanashitsuzuketa.",
    "en": "He kept on talking."
   },
   {
    "jp": "雨が降りつづけています。",
    "romaji": "Ame ga furitsuzukete imasu.",
    "en": "It keeps raining."
   }
  ],
  "tip": "つづける means actively doing the action without stopping. That's different from ～ている, which just describes an ongoing state.",
  "diff": "Foundation",
  "related": [
   "～はじめる",
   "～だす",
   "～おわる"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～おわる",
  "meaning": "finish doing",
  "explain": "Add おわる to the ます-stem to show you finish an action: 読みおわる = \"finish reading,\" 食べおわる = \"finish eating.\"",
  "ex": [
   {
    "jp": "本を読みおわりました。",
    "romaji": "Hon o yomiowarimashita.",
    "en": "I finished reading the book."
   },
   {
    "jp": "食べおわったら出かけよう。",
    "romaji": "Tabeowattara dekakeyou.",
    "en": "Once we finish eating, let us go out."
   },
   {
    "jp": "宿題をやりおわった。",
    "romaji": "Shukudai o yariowatta.",
    "en": "I finished doing my homework."
   }
  ],
  "tip": "おわる is simply about finishing the activity. てしまう can also mean \"finish,\" but it adds a sense of completion or regret.",
  "diff": "Foundation",
  "related": [
   "～はじめる",
   "～つづける",
   "～てしまう"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～方(かた)",
  "meaning": "way/method of doing",
  "explain": "Add 方(かた) to the ます-stem to mean \"the way to do\" something: 読む → 読み方 = \"how to read,\" 使い方 = \"how to use.\"",
  "ex": [
   {
    "jp": "この漢字の読み方を教えてください。",
    "romaji": "Kono kanji no yomikata o oshiete kudasai.",
    "en": "Please teach me how to read this kanji."
   },
   {
    "jp": "箸の使い方が分かりません。",
    "romaji": "Hashi no tsukaikata ga wakarimasen.",
    "en": "I do not know how to use chopsticks."
   },
   {
    "jp": "料理の作り方を習いました。",
    "romaji": "Ryouri no tsukurikata o naraimashita.",
    "en": "I learned how to make the dish."
   }
  ],
  "tip": "The whole phrase becomes a noun, so what you act on usually takes の (漢字の読み方). The kanji 方 is read かた here.",
  "diff": "Foundation",
  "related": [
   "～やすい",
   "～にくい",
   "～のが上手だ/下手だ"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～あいだに",
  "meaning": "while / during",
  "explain": "Add あいだに to say something happens DURING a stretch of time: 母が寝ているあいだに掃除した = \"I cleaned while my mom was asleep.\"",
  "ex": [
   {
    "jp": "母が寝ているあいだに掃除した。",
    "romaji": "Haha ga nete iru aida ni souji shita.",
    "en": "I cleaned while my mother was sleeping."
   },
   {
    "jp": "夏休みのあいだに旅行します。",
    "romaji": "Natsuyasumi no aida ni ryokou shimasu.",
    "en": "I will travel during summer vacation."
   },
   {
    "jp": "留守のあいだに荷物が届いた。",
    "romaji": "Rusu no aida ni nimotsu ga todoita.",
    "en": "A package arrived while I was out."
   }
  ],
  "tip": "あいだに (with に) means it happens at some point inside that span. あいだ alone means it lasts the whole time.",
  "diff": "Intermediate",
  "related": [
   "～ながら",
   "～までに",
   "～時(とき)"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～までに",
  "meaning": "by (a deadline)",
  "explain": "Add までに for a deadline, \"by (a time)\": 五時までに帰る = \"come back by five,\" 金曜日までに出す = \"submit it by Friday.\"",
  "ex": [
   {
    "jp": "五時までに帰ってください。",
    "romaji": "Go-ji made ni kaette kudasai.",
    "en": "Please come back by five o'clock."
   },
   {
    "jp": "金曜日までに出してください。",
    "romaji": "Kin'youbi made ni dashite kudasai.",
    "en": "Please submit it by Friday."
   },
   {
    "jp": "出発するまでに準備します。",
    "romaji": "Shuppatsu suru made ni junbi shimasu.",
    "en": "I will prepare before we depart."
   }
  ],
  "tip": "までに is a deadline (finish by then). まで without に means \"until\" — something continuing right up to that point.",
  "diff": "Intermediate",
  "related": [
   "～前に",
   "～た後で",
   "～あいだに"
  ],
  "prereq": "particle に"
 },
 {
  "point": "～しか～ない",
  "meaning": "only / nothing but",
  "explain": "Put しか after a thing and end with a negative verb to mean \"only that, nothing else\": 百円しかない = \"I have only 100 yen.\"",
  "ex": [
   {
    "jp": "百円しかありません。",
    "romaji": "Hyaku-en shika arimasen.",
    "en": "I only have one hundred yen."
   },
   {
    "jp": "日本語しか話せません。",
    "romaji": "Nihongo shika hanasemasen.",
    "en": "I can only speak Japanese."
   },
   {
    "jp": "一人しか来なかった。",
    "romaji": "Hitori shika konakatta.",
    "en": "Only one person came."
   }
  ],
  "tip": "Even though it means \"only,\" it ALWAYS needs a negative ending, and it pushes out words like が or を.",
  "diff": "Intermediate",
  "related": [
   "～だけ",
   "～ばかり",
   "～でも"
  ],
  "prereq": "plain negative ない-form"
 },
 {
  "point": "～だけ",
  "meaning": "only / just",
  "explain": "Add だけ to mean \"only\" or \"just,\" with a normal positive verb: 水だけください = \"just water, please,\" 一人だけ来た = \"only one person came.\"",
  "ex": [
   {
    "jp": "水だけください。",
    "romaji": "Mizu dake kudasai.",
    "en": "Just water, please."
   },
   {
    "jp": "見るだけです。",
    "romaji": "Miru dake desu.",
    "en": "I am just looking."
   },
   {
    "jp": "一人だけ来ました。",
    "romaji": "Hitori dake kimashita.",
    "en": "Only one person came."
   }
  ],
  "tip": "だけ takes a positive verb and simply states a limit. しか needs a negative verb and hints \"that's not enough.\"",
  "diff": "Foundation",
  "related": [
   "～しか～ない",
   "～ばかり",
   "～でも"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～について",
  "meaning": "about / concerning",
  "explain": "Add について after a topic to mean \"about\" it: 日本の文化について話す = \"talk about Japanese culture,\" この問題について考える = \"think about this problem.\"",
  "ex": [
   {
    "jp": "日本の文化について話します。",
    "romaji": "Nihon no bunka ni tsuite hanashimasu.",
    "en": "I will talk about Japanese culture."
   },
   {
    "jp": "この問題について考えてください。",
    "romaji": "Kono mondai ni tsuite kangaete kudasai.",
    "en": "Please think about this problem."
   },
   {
    "jp": "環境について勉強しています。",
    "romaji": "Kankyou ni tsuite benkyou shite imasu.",
    "en": "I am studying about the environment."
   }
  ],
  "tip": "Use it for the topic you're discussing or studying. Don't read it as physically \"attaching to\" something — here it just means \"regarding.\"",
  "diff": "Intermediate",
  "related": [
   "～という",
   "～によると",
   "～でも"
  ],
  "prereq": "particle に"
 },
 {
  "point": "～でも",
  "meaning": "or something / even",
  "explain": "Add でも after a noun to gently suggest an example (\"...or something\") or include even an extreme case: お茶でも飲む = \"have some tea or something,\" 子どもでもできる = \"even a kid can do it.\"",
  "ex": [
   {
    "jp": "お茶でも飲みませんか。",
    "romaji": "Ocha demo nomimasen ka.",
    "en": "Would you like to drink some tea or something?"
   },
   {
    "jp": "子どもでもできます。",
    "romaji": "Kodomo demo dekimasu.",
    "en": "Even a child can do it."
   },
   {
    "jp": "映画でも見に行こう。",
    "romaji": "Eiga demo mi ni ikou.",
    "en": "Let us go see a movie or something."
   }
  ],
  "tip": "This \"or something / even\" でも sits after a noun. It's different from the \"even if\" でも you build from a て-form (降っても).",
  "diff": "Intermediate",
  "related": [
   "～だけ",
   "～しか～ない",
   "～でしょう(confirmation)"
  ],
  "prereq": "particle は・も"
 },
 {
  "point": "～という",
  "meaning": "called / named",
  "explain": "Put という between a name and a thing to introduce something \"called\" that: 田中という人 = \"a person called Tanaka,\" すずらんというレストラン = \"a restaurant called Suzuran.\"",
  "ex": [
   {
    "jp": "田中という人が来ました。",
    "romaji": "Tanaka to iu hito ga kimashita.",
    "en": "A person called Tanaka came."
   },
   {
    "jp": "これは何という花ですか。",
    "romaji": "Kore wa nan to iu hana desu ka.",
    "en": "What is this flower called?"
   },
   {
    "jp": "「すずらん」というレストランです。",
    "romaji": "“Suzuran” to iu resutoran desu.",
    "en": "It is a restaurant called Suzuran."
   }
  ],
  "tip": "Use it to introduce a name your listener may not know yet. For someone they already know, you can leave it out.",
  "diff": "Intermediate",
  "related": [
   "～について",
   "～と言う",
   "～と思う"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～かどうか",
  "meaning": "whether or not",
  "explain": "Add かどうか inside a sentence for \"whether or not\": 来るかどうか分からない = \"I don't know whether he'll come,\" 正しいかどうか確認する = \"check whether it's right.\"",
  "ex": [
   {
    "jp": "彼が来るかどうか分かりません。",
    "romaji": "Kare ga kuru ka dou ka wakarimasen.",
    "en": "I do not know whether he will come."
   },
   {
    "jp": "正しいかどうか確認してください。",
    "romaji": "Tadashii ka dou ka kakunin shite kudasai.",
    "en": "Please check whether it is correct."
   },
   {
    "jp": "行けるかどうかまだ決めていません。",
    "romaji": "Ikeru ka dou ka mada kimete imasen.",
    "en": "I have not yet decided whether I can go."
   }
  ],
  "tip": "Use かどうか for yes/no uncertainty. When there's a question word like 誰 or 何, use just か instead (誰が来るか分からない).",
  "diff": "Intermediate",
  "related": [
   "～と思う",
   "～と言う",
   "～のだ/んだ"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "お～になる",
  "meaning": "honorific (respectful) form",
  "explain": "This is a respectful way to talk about what someone important does. Put お before the ます-stem and add になる: 先生はもうお帰りになった = \"the teacher has already gone home.\"",
  "ex": [
   {
    "jp": "先生はもうお帰りになりました。",
    "romaji": "Sensei wa mou okaeri ni narimashita.",
    "en": "The teacher has already gone home."
   },
   {
    "jp": "社長は新聞をお読みになります。",
    "romaji": "Shachou wa shinbun o oyomi ni narimasu.",
    "en": "The president reads the newspaper."
   },
   {
    "jp": "何時にお出かけになりますか。",
    "romaji": "Nan-ji ni odekake ni narimasu ka.",
    "en": "What time will you go out?"
   }
  ],
  "tip": "Use it only for OTHER people's actions, never your own. Some verbs have special respectful versions (見る → ご覧になる).",
  "diff": "Advanced",
  "related": [
   "～ていただく",
   "～でしょう(confirmation)",
   "～なさい"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～ていただく",
  "meaning": "humbly receive an action",
  "explain": "Add いただく to the て-form as a very polite way to receive a favor from someone above you: 先生に直していただいた = \"I had the teacher kindly correct it.\"",
  "ex": [
   {
    "jp": "先生に手紙を直していただきました。",
    "romaji": "Sensei ni tegami o naoshite itadakimashita.",
    "en": "I humbly had the teacher correct my letter."
   },
   {
    "jp": "説明していただけますか。",
    "romaji": "Setsumei shite itadakemasu ka.",
    "en": "Could you please explain it?"
   },
   {
    "jp": "写真を撮っていただきたいです。",
    "romaji": "Shashin o totte itadakitai desu.",
    "en": "I would like you to take a photo."
   }
  ],
  "tip": "ていただけますか makes an extra-polite request. Because it humbly lowers yourself, save it for favors from higher-ups, not friends.",
  "diff": "Advanced",
  "related": [
   "～てもらう",
   "お～になる",
   "～てくれる"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～ていく",
  "meaning": "go on doing / away from",
  "explain": "Add いく to the て-form for movement away from you, or a change heading into the future: これから寒くなっていく = \"it'll keep getting colder,\" 鳥が飛んでいった = \"the bird flew off.\"",
  "ex": [
   {
    "jp": "これから寒くなっていきます。",
    "romaji": "Kore kara samuku natte ikimasu.",
    "en": "It will keep getting colder from now on."
   },
   {
    "jp": "鳥が飛んでいった。",
    "romaji": "Tori ga tonde itta.",
    "en": "The bird flew away."
   },
   {
    "jp": "これからも続けていきます。",
    "romaji": "Kore kara mo tsuzukete ikimasu.",
    "en": "I will continue going forward."
   }
  ],
  "tip": "ていく points to the future or away from you; てくる points toward you or up to now. They're a matched pair of opposites.",
  "diff": "Intermediate",
  "related": [
   "～てくる",
   "～つづける",
   "～ようになる"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～てくる",
  "meaning": "come to / since the past",
  "explain": "Add くる to the て-form for movement toward you, or a change up until now: 暖かくなってきた = \"it's gotten warmer,\" 買ってくる = \"go buy it and come back.\"",
  "ex": [
   {
    "jp": "だんだん暖かくなってきました。",
    "romaji": "Dandan atatakaku natte kimashita.",
    "en": "It has gradually become warmer."
   },
   {
    "jp": "ちょっと買ってきます。",
    "romaji": "Chotto katte kimasu.",
    "en": "I will go buy something and come back."
   },
   {
    "jp": "雨が降ってきた。",
    "romaji": "Ame ga futte kita.",
    "en": "It has started to rain."
   }
  ],
  "tip": "てくる can mean \"go do it and return\" or \"a change up to now.\" It's the mirror image of ていく.",
  "diff": "Intermediate",
  "related": [
   "～ていく",
   "～はじめる",
   "～ようになる"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～ところだ",
  "meaning": "about to / in the middle of / just did",
  "explain": "Add ところだ to pinpoint exactly when: dictionary form = about to, ている form = right in the middle, past form = just did. 出かけるところ = \"about to go out,\" 着いたところ = \"just arrived.\"",
  "ex": [
   {
    "jp": "今から出かけるところです。",
    "romaji": "Ima kara dekakeru tokoro desu.",
    "en": "I am just about to go out."
   },
   {
    "jp": "今ご飯を食べているところです。",
    "romaji": "Ima gohan o tabete iru tokoro desu.",
    "en": "I am in the middle of eating."
   },
   {
    "jp": "たった今着いたところです。",
    "romaji": "Tatta ima tsuita tokoro desu.",
    "en": "I have just arrived."
   }
  ],
  "tip": "The verb form before ところ flips the whole meaning (する = about to, している = doing now, した = just did), so watch the form closely.",
  "diff": "Intermediate",
  "related": [
   "～ばかり",
   "～てしまう",
   "～ているところ"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～ばかり",
  "meaning": "just did / only",
  "explain": "Add ばかり to the PAST form to say you \"just did\" something a moment ago: 食べたばかり = \"just ate,\" 日本に来たばかり = \"just arrived in Japan.\"",
  "ex": [
   {
    "jp": "さっき食べたばかりです。",
    "romaji": "Sakki tabeta bakari desu.",
    "en": "I just ate a little while ago."
   },
   {
    "jp": "日本に来たばかりです。",
    "romaji": "Nihon ni kita bakari desu.",
    "en": "I have just come to Japan."
   },
   {
    "jp": "彼は遊んでばかりいる。",
    "romaji": "Kare wa asonde bakari iru.",
    "en": "He does nothing but play."
   }
  ],
  "tip": "たばかり is a feeling of \"just now\" even if some real time has passed. たところ is for literally the very instant it finished.",
  "diff": "Intermediate",
  "related": [
   "～ところだ",
   "～たことがある",
   "～だけ"
  ],
  "prereq": "plain past た-form"
 },
 {
  "point": "～ずに",
  "meaning": "without doing",
  "explain": "Use this for \"without doing.\" Take the ない form, drop ない, add ずに: 食べずに学校へ行く = \"go to school without eating.\" It's formal and written.",
  "ex": [
   {
    "jp": "朝ご飯を食べずに学校へ行った。",
    "romaji": "Asagohan o tabezu ni gakkou e itta.",
    "en": "I went to school without eating breakfast."
   },
   {
    "jp": "何も言わずに帰りました。",
    "romaji": "Nani mo iwazu ni kaerimashita.",
    "en": "He went home without saying anything."
   },
   {
    "jp": "辞書を使わずに読んでください。",
    "romaji": "Jisho o tsukawazu ni yonde kudasai.",
    "en": "Please read without using a dictionary."
   }
  ],
  "tip": "する becomes せずに (not しずに). ずに is the stiff, written version of the more casual ～ないで.",
  "diff": "Advanced",
  "related": [
   "～ながら",
   "～たまま",
   "～なくてもいい"
  ],
  "prereq": "plain negative ない-form"
 },
 {
  "point": "～ように(言う/する)",
  "meaning": "so that / in order to",
  "explain": "Add ように to show a purpose or hoped-for outcome, \"so that\": 忘れないようにメモする = \"take notes so I don't forget,\" 聞こえるように大きい声で話す = \"speak loudly so it can be heard.\"",
  "ex": [
   {
    "jp": "忘れないようにメモします。",
    "romaji": "Wasurenai you ni memo shimasu.",
    "en": "I take notes so that I do not forget."
   },
   {
    "jp": "よく聞こえるように大きい声で話す。",
    "romaji": "Yoku kikoeru you ni ookii koe de hanasu.",
    "en": "I speak loudly so it can be heard well."
   },
   {
    "jp": "間に合うように早く出ました。",
    "romaji": "Ma ni au you ni hayaku demashita.",
    "en": "I left early so I would be on time."
   }
  ],
  "tip": "ように usually goes with \"can\" forms, negatives, or things you can't fully control. For a direct goal you choose to pursue, use ために.",
  "diff": "Intermediate",
  "related": [
   "～ようにする",
   "～ようになる",
   "～ために"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～たがる",
  "meaning": "(third person) wants to",
  "explain": "Add たがる to the ます-stem to describe what ANOTHER person openly wants to do, judging from how they act: 子どもは遊びたがっている = \"the child wants to play.\"",
  "ex": [
   {
    "jp": "子どもは外で遊びたがっています。",
    "romaji": "Kodomo wa soto de asobitagatte imasu.",
    "en": "The child wants to play outside."
   },
   {
    "jp": "弟は新しいゲームを買いたがる。",
    "romaji": "Otouto wa atarashii geemu o kaitagaru.",
    "en": "My little brother wants to buy a new game."
   },
   {
    "jp": "彼は行きたがらない。",
    "romaji": "Kare wa ikitagaranai.",
    "en": "He does not want to go."
   }
  ],
  "tip": "Use たい for yourself and たがる for others, since you can't see inside someone else's heart. たがっている is common for a wish happening right now.",
  "diff": "Intermediate",
  "related": [
   "～がほしい",
   "～てほしい",
   "～と言っていた"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～ても いい",
  "meaning": "may / it is okay to",
  "explain": "Add もいい to the て-form to give permission, \"you may\": ここに座ってもいい = \"you may sit here,\" 写真を撮ってもいい = \"you may take photos.\"",
  "ex": [
   {
    "jp": "ここに座ってもいいですか。",
    "romaji": "Koko ni suwatte mo ii desu ka.",
    "en": "May I sit here?"
   },
   {
    "jp": "写真を撮ってもいいです。",
    "romaji": "Shashin o totte mo ii desu.",
    "en": "You may take photos."
   },
   {
    "jp": "帰ってもいいですよ。",
    "romaji": "Kaette mo ii desu yo.",
    "en": "You may go home."
   }
  ],
  "tip": "As a question (てもいいですか?) it ASKS for permission. ても by itself (no いい) means \"even if\" — a completely different idea.",
  "diff": "Foundation",
  "related": [
   "～ても かまわない",
   "～てはいけない",
   "～なくてもいい"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～てはいけない",
  "meaning": "must not / may not",
  "explain": "Add はいけない to the て-form to forbid something, \"you must not\": ここでたばこを吸ってはいけない = \"you must not smoke here.\"",
  "ex": [
   {
    "jp": "ここでたばこを吸ってはいけません。",
    "romaji": "Koko de tabako o sutte wa ikemasen.",
    "en": "You must not smoke here."
   },
   {
    "jp": "授業中に話してはいけない。",
    "romaji": "Jugyouchuu ni hanashite wa ikenai.",
    "en": "You must not talk during class."
   },
   {
    "jp": "芝生に入ってはいけません。",
    "romaji": "Shibafu ni haitte wa ikemasen.",
    "en": "You must not enter the lawn."
   }
  ],
  "tip": "In casual speech it becomes ちゃいけない or ちゃだめ. It's the flat opposite of the permission てもいい.",
  "diff": "Intermediate",
  "related": [
   "～ても いい",
   "～なければならない",
   "～ないほうがいい"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～たり(suru)",
  "meaning": "sometimes do / among other things",
  "explain": "Add り to a past form and finish with する to give a few sample activities, hinting there are more: 寝たり休んだりする = \"do things like sleeping and resting.\"",
  "ex": [
   {
    "jp": "日曜日は寝たり休んだりします。",
    "romaji": "Nichiyoubi wa netari yasundari shimasu.",
    "en": "On Sundays I sleep, rest, and so on."
   },
   {
    "jp": "公園で走ったり歩いたりした。",
    "romaji": "Kouen de hashittari aruitari shita.",
    "en": "I ran and walked in the park, among other things."
   },
   {
    "jp": "歌ったり踊ったりして遊んだ。",
    "romaji": "Utattari odottari shite asonda.",
    "en": "We sang, danced, and had fun."
   }
  ],
  "tip": "Even with just one verb, たりする suggests \"and other things too.\" Remember to keep the closing する.",
  "diff": "Foundation",
  "related": [
   "～たり～たり",
   "～し",
   "～ことがある(occasionally)"
  ],
  "prereq": "plain past た-form"
 },
 {
  "point": "～ば～ほど",
  "meaning": "the more ... the more",
  "explain": "Use the ば-form, then repeat the word with ほど, for \"the more X, the more Y\": 練習すればするほど上手になる = \"the more you practice, the better you get.\"",
  "ex": [
   {
    "jp": "練習すればするほど上手になります。",
    "romaji": "Renshuu sureba suru hodo jouzu ni narimasu.",
    "en": "The more you practice, the better you get."
   },
   {
    "jp": "考えれば考えるほど分からなくなる。",
    "romaji": "Kangaereba kangaeru hodo wakaranaku naru.",
    "en": "The more I think, the less I understand."
   },
   {
    "jp": "安ければ安いほどいい。",
    "romaji": "Yasukereba yasui hodo ii.",
    "en": "The cheaper, the better."
   }
  ],
  "tip": "い-words follow the pattern 安ければ安いほど. You say the same word twice: first the ば-form, then the plain form + ほど.",
  "diff": "Advanced",
  "related": [
   "～ば(conditional)",
   "～と(conditional)",
   "～すぎる"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～がする",
  "meaning": "sense (smell/sound/taste)",
  "explain": "Use a sense word (におい smell, 音 sound, 味 taste) + がする to say you sense it: いいにおいがする = \"smells good,\" 変な音がした = \"there was a strange sound.\"",
  "ex": [
   {
    "jp": "いいにおいがします。",
    "romaji": "Ii nioi ga shimasu.",
    "en": "It smells good."
   },
   {
    "jp": "変な音がした。",
    "romaji": "Hen na oto ga shita.",
    "en": "There was a strange sound."
   },
   {
    "jp": "この料理は辛い味がします。",
    "romaji": "Kono ryouri wa karai aji ga shimasu.",
    "en": "This dish tastes spicy."
   }
  ],
  "tip": "This がする is only for smell, sound, and taste. For something you see, use 見える instead.",
  "diff": "Intermediate",
  "related": [
   "～そうだ(appearance)",
   "～みたい(だ)",
   "～ようになる"
  ],
  "prereq": "particle が"
 },
 {
  "point": "～のだ/んだ",
  "meaning": "explanatory (the fact is)",
  "explain": "Add のだ (written) or んだ (spoken) to explain a reason or the background behind something: 頭が痛いんです = \"the thing is, I have a headache.\"",
  "ex": [
   {
    "jp": "どうして来なかったんですか。",
    "romaji": "Doushite konakatta n desu ka.",
    "en": "Why didn't you come?"
   },
   {
    "jp": "頭が痛いんです。",
    "romaji": "Atama ga itai n desu.",
    "en": "It is that I have a headache."
   },
   {
    "jp": "明日試験があるんです。",
    "romaji": "Ashita shiken ga aru n desu.",
    "en": "The thing is, I have an exam tomorrow."
   }
  ],
  "tip": "After a noun or な-word, add な first (静かなんです). It explains things, so leaning on it too much can sound like you're always making excuses.",
  "diff": "Intermediate",
  "related": [
   "～ので",
   "～かどうか",
   "～でしょう(confirmation)"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～ても かまわない",
  "meaning": "do not mind if",
  "explain": "Add もかまわない to the て-form to say something is fine with you, \"I don't mind if\": ここに座ってもかまわない = \"I don't mind if you sit here.\"",
  "ex": [
   {
    "jp": "ここに座ってもかまいません。",
    "romaji": "Koko ni suwatte mo kamaimasen.",
    "en": "I do not mind if you sit here."
   },
   {
    "jp": "写真を撮ってもかまいませんか。",
    "romaji": "Shashin o totte mo kamaimasen ka.",
    "en": "Do you mind if I take a photo?"
   },
   {
    "jp": "遅く来てもかまわない。",
    "romaji": "Osoku kite mo kamawanai.",
    "en": "I do not mind if you come late."
   }
  ],
  "tip": "かまわない is a touch more formal and easygoing than いい. Both follow the て-form to allow something.",
  "diff": "Intermediate",
  "related": [
   "～ても いい",
   "～なくてもいい",
   "～てはいけない"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～なさい",
  "meaning": "do (gentle command)",
  "explain": "Add なさい to the ます-stem for a firm but kind order, the kind a parent or teacher gives: 早く寝なさい = \"go to bed early,\" 宿題をしなさい = \"do your homework.\"",
  "ex": [
   {
    "jp": "早く寝なさい。",
    "romaji": "Hayaku nenasai.",
    "en": "Go to bed early."
   },
   {
    "jp": "よく考えなさい。",
    "romaji": "Yoku kangaenasai.",
    "en": "Think carefully."
   },
   {
    "jp": "宿題をしなさい。",
    "romaji": "Shukudai o shinasai.",
    "en": "Do your homework."
   }
  ],
  "tip": "It's gentler than a blunt command, but it still sounds like an order from above. Don't aim it at people senior to you.",
  "diff": "Foundation",
  "related": [
   "～たほうがいい",
   "～てはいけない",
   "～なきゃ"
  ],
  "prereq": "ます-form"
 },
 {
  "point": "～てある",
  "meaning": "has been done (state)",
  "explain": "Add ある to the て-form of an action-on-something verb to show a state someone set up on purpose: 名前が書いてある = \"a name is written (there),\" 窓が開けてある = \"the window's been left open.\"",
  "ex": [
   {
    "jp": "ドアに名前が書いてあります。",
    "romaji": "Doa ni namae ga kaite arimasu.",
    "en": "A name is written on the door."
   },
   {
    "jp": "窓が開けてあります。",
    "romaji": "Mado ga akete arimasu.",
    "en": "The window has been left open."
   },
   {
    "jp": "もう切符が買ってある。",
    "romaji": "Mou kippu ga katte aru.",
    "en": "The tickets have already been bought."
   }
  ],
  "tip": "てある hints someone did it intentionally and left it that way. Plain ている with a \"happens by itself\" verb just states a state, with no such hint.",
  "diff": "Advanced",
  "related": [
   "～ておく",
   "～たまま",
   "～ている"
  ],
  "prereq": "て-form"
 },
 {
  "point": "～たまま",
  "meaning": "leaving as is / while still",
  "explain": "Add まま to a past form (or noun + の) to show a state left unchanged while you do something else: 窓を開けたまま寝た = \"slept with the window left open.\"",
  "ex": [
   {
    "jp": "窓を開けたまま寝ました。",
    "romaji": "Mado o aketa mama nemashita.",
    "en": "I slept with the window left open."
   },
   {
    "jp": "靴をはいたまま入らないでください。",
    "romaji": "Kutsu o haita mama hairanaide kudasai.",
    "en": "Please do not enter with your shoes on."
   },
   {
    "jp": "立ったまま話した。",
    "romaji": "Tatta mama hanashita.",
    "en": "I talked while standing."
   }
  ],
  "tip": "Use the PAST form before まま (つけたまま). It means the state stays as-is, often without you meaning to leave it that way.",
  "diff": "Advanced",
  "related": [
   "～てある",
   "～ずに",
   "～ながら"
  ],
  "prereq": "plain past た-form"
 },
 {
  "point": "～ことができる",
  "meaning": "be able to / can",
  "explain": "Add ことができる to the plain form for \"can\" or \"be able to\": ピアノをひくことができる = \"I can play the piano,\" 写真を撮ることができる = \"I can take photos.\"",
  "ex": [
   {
    "jp": "私はピアノをひくことができます。",
    "romaji": "Watashi wa piano o hiku koto ga dekimasu.",
    "en": "I can play the piano."
   },
   {
    "jp": "ここで写真を撮ることができますか。",
    "romaji": "Koko de shashin o toru koto ga dekimasu ka.",
    "en": "Can I take photos here?"
   },
   {
    "jp": "漢字を書くことができません。",
    "romaji": "Kanji o kaku koto ga dekimasen.",
    "en": "I cannot write kanji."
   }
  ],
  "tip": "This is a more formal way to say \"can\" than the short form (ひける). They mean the same thing, so don't use both at once.",
  "diff": "Foundation",
  "related": [
   "～られる(potential)",
   "～ようになる",
   "～のが上手だ/下手だ"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～前に",
  "meaning": "before doing",
  "explain": "Add 前に to mean \"before\" doing something. Always use the present form: 寝る前に歯をみがく = \"brush teeth before sleeping,\" 食事の前に手を洗う = \"wash hands before meals.\"",
  "ex": [
   {
    "jp": "寝る前に歯をみがきます。",
    "romaji": "Neru mae ni ha o migakimasu.",
    "en": "I brush my teeth before sleeping."
   },
   {
    "jp": "食事の前に手を洗います。",
    "romaji": "Shokuji no mae ni te o araimasu.",
    "en": "I wash my hands before meals."
   },
   {
    "jp": "出かける前に電話してください。",
    "romaji": "Dekakeru mae ni denwa shite kudasai.",
    "en": "Please call before you go out."
   }
  ],
  "tip": "Use the present/dictionary form before 前に even when talking about the past — say 食べる前に, never 食べた前に.",
  "diff": "Foundation",
  "related": [
   "～た後で",
   "～までに",
   "～時(とき)"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～た後で",
  "meaning": "after doing",
  "explain": "Add 後で to mean \"after\" doing something. Use the PAST form: ご飯を食べた後で散歩する = \"take a walk after eating,\" 授業の後で図書館へ行く = \"go to the library after class.\"",
  "ex": [
   {
    "jp": "ご飯を食べた後で散歩します。",
    "romaji": "Gohan o tabeta ato de sanpo shimasu.",
    "en": "I take a walk after eating."
   },
   {
    "jp": "授業の後で図書館へ行く。",
    "romaji": "Jugyou no ato de toshokan e iku.",
    "en": "I go to the library after class."
   },
   {
    "jp": "掃除をした後で休みました。",
    "romaji": "Souji o shita ato de yasumimashita.",
    "en": "I rested after cleaning."
   }
  ],
  "tip": "Use the past form before 後で (食べた後で). This is the mirror of 前に, which instead uses the present form.",
  "diff": "Foundation",
  "related": [
   "～前に",
   "～までに",
   "～時(とき)"
  ],
  "prereq": "plain past た-form"
 },
 {
  "point": "～時(とき)",
  "meaning": "when",
  "explain": "Add 時(とき) to mean \"when\": 日本へ行く時、写真を撮る = \"when I go to Japan, I take photos.\" The verb form before 時 tells you the timing.",
  "ex": [
   {
    "jp": "日本へ行く時、写真をたくさん撮ります。",
    "romaji": "Nihon e iku toki, shashin o takusan torimasu.",
    "en": "When I go to Japan, I take many photos."
   },
   {
    "jp": "子どもの時、よく泳ぎました。",
    "romaji": "Kodomo no toki, yoku oyogimashita.",
    "en": "When I was a child, I often swam."
   },
   {
    "jp": "暇な時、本を読みます。",
    "romaji": "Hima na toki, hon o yomimasu.",
    "en": "When I am free, I read books."
   }
  ],
  "tip": "Present + 時 = before or at that moment; past + 時 = after it's done. Compare 行く時 (as I go) with 行った時 (once I've gone).",
  "diff": "Intermediate",
  "related": [
   "～前に",
   "～た後で",
   "～場合(は)"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～と言う",
  "meaning": "say that (quotation)",
  "explain": "Add と言う to report what was said, either a plain statement or words inside 「」: 彼は「行きます」と言った = \"he said, 'I'll go,'\" 元気だと言った = \"said she's well.\"",
  "ex": [
   {
    "jp": "彼は「行きます」と言いました。",
    "romaji": "Kare wa “ikimasu” to iimashita.",
    "en": "He said, “I will go.”"
   },
   {
    "jp": "母は元気だと言いました。",
    "romaji": "Haha wa genki da to iimashita.",
    "en": "My mother said she is well."
   },
   {
    "jp": "日本語でありがとうと言います。",
    "romaji": "Nihongo de arigatou to iimasu.",
    "en": "In Japanese you say arigatou."
   }
  ],
  "tip": "と言った reports one past statement. と言っていた (\"was saying\") highlights the report itself or something said repeatedly.",
  "diff": "Foundation",
  "related": [
   "～と言っていた",
   "～と思う",
   "～という"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～たらどうですか",
  "meaning": "why don't you / how about",
  "explain": "Add らどうですか to the PAST form to gently suggest, \"why don't you...\": 少し休んだらどうですか = \"how about resting a bit?\" 相談したらどうですか = \"why don't you ask for advice?\"",
  "ex": [
   {
    "jp": "医者に相談したらどうですか。",
    "romaji": "Isha ni soudan shitara dou desu ka.",
    "en": "Why don't you consult a doctor?"
   },
   {
    "jp": "少し休んだらどうですか。",
    "romaji": "Sukoshi yasundara dou desu ka.",
    "en": "How about resting a little?"
   },
   {
    "jp": "彼に聞いてみたらどうですか。",
    "romaji": "Kare ni kiite mitara dou desu ka.",
    "en": "Why don't you try asking him?"
   }
  ],
  "tip": "It's polite, but it can sound a little pushy to higher-ups. It's built on the たら \"if/when\" form, so use the past form.",
  "diff": "Intermediate",
  "related": [
   "～たら",
   "～たほうがいい",
   "～てみる"
  ],
  "prereq": "plain past た-form"
 },
 {
  "point": "～にする",
  "meaning": "decide on (choosing)",
  "explain": "Add にする after a noun when you choose or pick something: コーヒーにする = \"I'll have coffee,\" この赤いかばんにする = \"I'll go with this red bag.\"",
  "ex": [
   {
    "jp": "私はコーヒーにします。",
    "romaji": "Watashi wa koohii ni shimasu.",
    "en": "I will have coffee."
   },
   {
    "jp": "この赤いかばんにします。",
    "romaji": "Kono akai kaban ni shimasu.",
    "en": "I will go with this red bag."
   },
   {
    "jp": "昼ご飯はそばにしよう。",
    "romaji": "Hirugohan wa soba ni shiyou.",
    "en": "Let us have soba for lunch."
   }
  ],
  "tip": "にする (after a thing) is for choosing from options, like ordering food. ことにする (after a verb) is for deciding to DO an action.",
  "diff": "Foundation",
  "related": [
   "～ことにする",
   "～ことになる",
   "～と思う"
  ],
  "prereq": "particle に"
 },
 {
  "point": "～によると",
  "meaning": "according to",
  "explain": "Add によると to name where your info came from, \"according to\": 天気予報によると明日は雨だそうだ = \"according to the forecast, it'll rain tomorrow.\"",
  "ex": [
   {
    "jp": "天気予報によると明日は雨だそうです。",
    "romaji": "Tenki yohou ni yoru to ashita wa ame da sou desu.",
    "en": "According to the forecast, it will rain tomorrow."
   },
   {
    "jp": "ニュースによると地震があったそうだ。",
    "romaji": "Nyuusu ni yoru to jishin ga atta sou da.",
    "en": "According to the news, there was an earthquake."
   },
   {
    "jp": "彼の話によると会議は中止だ。",
    "romaji": "Kare no hanashi ni yoru to kaigi wa chuushi da.",
    "en": "According to him, the meeting is cancelled."
   }
  ],
  "tip": "It names the source, and you usually finish the sentence with そうだ or らしい (\"I heard / apparently\").",
  "diff": "Intermediate",
  "related": [
   "～そうだ(hearsay)",
   "～らしい",
   "～について"
  ],
  "prereq": "particle に"
 },
 {
  "point": "～のが好きだ",
  "meaning": "like doing",
  "explain": "Add のが好きだ to the plain form to say you like doing an activity: 本を読むのが好き = \"I like reading,\" 歌を歌うのが好き = \"I like singing.\"",
  "ex": [
   {
    "jp": "本を読むのが好きです。",
    "romaji": "Hon o yomu no ga suki desu.",
    "en": "I like reading books."
   },
   {
    "jp": "歌を歌うのが好きだ。",
    "romaji": "Uta o utau no ga suki da.",
    "en": "I like singing songs."
   },
   {
    "jp": "料理をするのが好きじゃない。",
    "romaji": "Ryouri o suru no ga suki ja nai.",
    "en": "I do not like cooking."
   }
  ],
  "tip": "You need that の to turn the action into something 好き can describe. Don't drop it — 読む好き is wrong; say 読むのが好き.",
  "diff": "Foundation",
  "related": [
   "～のが上手だ/下手だ",
   "～のを忘れる",
   "～のだ/んだ"
  ],
  "prereq": "particle が"
 },
 {
  "point": "～のが上手だ/下手だ",
  "meaning": "be good/bad at doing",
  "explain": "Add のが上手だ (good at) or のが下手だ (bad at) to the plain form to talk about skill: 絵をかくのが上手 = \"good at drawing,\" 泳ぐのが下手 = \"bad at swimming.\"",
  "ex": [
   {
    "jp": "彼は絵をかくのが上手です。",
    "romaji": "Kare wa e o kaku no ga jouzu desu.",
    "en": "He is good at drawing."
   },
   {
    "jp": "私は泳ぐのが下手です。",
    "romaji": "Watashi wa oyogu no ga heta desu.",
    "en": "I am bad at swimming."
   },
   {
    "jp": "妹は歌うのが上手だ。",
    "romaji": "Imouto wa utau no ga jouzu da.",
    "en": "My little sister is good at singing."
   }
  ],
  "tip": "上手 and 下手 are な-words and take が for the skill. Calling yourself 上手 sounds boastful — for your own skills, use できる or 得意 instead.",
  "diff": "Foundation",
  "related": [
   "～のが好きだ",
   "～ことができる",
   "～方(かた)"
  ],
  "prereq": "particle が"
 },
 {
  "point": "～のを忘れる",
  "meaning": "forget to do",
  "explain": "Add のを忘れる to the plain form to say you \"forget to do\" something: 宿題を出すのを忘れた = \"I forgot to turn in my homework,\" 電気を消すのを忘れた = \"I forgot to turn off the light.\"",
  "ex": [
   {
    "jp": "宿題を出すのを忘れました。",
    "romaji": "Shukudai o dasu no o wasuremashita.",
    "en": "I forgot to turn in my homework."
   },
   {
    "jp": "電気を消すのを忘れた。",
    "romaji": "Denki o kesu no o wasureta.",
    "en": "I forgot to turn off the lights."
   },
   {
    "jp": "薬を飲むのを忘れないでください。",
    "romaji": "Kusuri o nomu no o wasurenaide kudasai.",
    "en": "Please do not forget to take your medicine."
   }
  ],
  "tip": "Vのを忘れる means you forgot TO DO something. That's different from ～たことを忘れる (\"forget that you did it\"), so mind the tense.",
  "diff": "Intermediate",
  "related": [
   "～のが好きだ",
   "～ておく",
   "～前に"
  ],
  "prereq": "particle を"
 },
 {
  "point": "～かもしれない(casual)",
  "meaning": "might (casual)",
  "explain": "Just say かも (dropping しれない) for a casual \"might\": 明日は休みかも = \"tomorrow might be a day off,\" 彼は来ないかも = \"he might not come.\"",
  "ex": [
   {
    "jp": "明日は休みかも。",
    "romaji": "Ashita wa yasumi kamo.",
    "en": "Tomorrow might be a day off."
   },
   {
    "jp": "もう遅いかもね。",
    "romaji": "Mou osoi kamo ne.",
    "en": "It might already be too late."
   },
   {
    "jp": "彼は来ないかも。",
    "romaji": "Kare wa konai kamo.",
    "en": "He might not come."
   }
  ],
  "tip": "かも is casual talk only. In polite situations, use the full かもしれません.",
  "diff": "Foundation",
  "related": [
   "～かもしれない",
   "～だろう/でしょう",
   "～でしょう(confirmation)"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～でしょう(confirmation)",
  "meaning": "right? / isn't it?",
  "explain": "Say でしょう with a rising tone to ask for agreement, \"right?\": おいしいでしょう = \"it's tasty, right?\" これはあなたの本でしょう = \"this is your book, isn't it?\"",
  "ex": [
   {
    "jp": "これはあなたの本でしょう。",
    "romaji": "Kore wa anata no hon deshou.",
    "en": "This is your book, right?"
   },
   {
    "jp": "明日来るでしょう。",
    "romaji": "Ashita kuru deshou.",
    "en": "You will come tomorrow, right?"
   },
   {
    "jp": "おいしいでしょう。",
    "romaji": "Oishii deshou.",
    "en": "It is delicious, isn't it?"
   }
  ],
  "tip": "Rising tone = seeking agreement (\"right?\"). Falling tone でしょう means \"probably\" — the same word, but the tone flips the meaning.",
  "diff": "Foundation",
  "related": [
   "～だろう/でしょう",
   "～かもしれない",
   "～でも"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～ことがある(occasionally)",
  "meaning": "there are times when",
  "explain": "Add ことがある to the PRESENT form to say something happens once in a while: 電車が遅れることがある = \"sometimes the train is late,\" 朝ご飯を食べないことがある = \"there are times I skip breakfast.\"",
  "ex": [
   {
    "jp": "たまに朝ご飯を食べないことがあります。",
    "romaji": "Tama ni asagohan o tabenai koto ga arimasu.",
    "en": "There are times when I skip breakfast."
   },
   {
    "jp": "電車が遅れることがある。",
    "romaji": "Densha ga okureru koto ga aru.",
    "en": "There are times when the train is late."
   },
   {
    "jp": "夜遅くまで働くことがあります。",
    "romaji": "Yoru osoku made hataraku koto ga arimasu.",
    "en": "There are times I work late at night."
   }
  ],
  "tip": "Present form + ことがある = \"sometimes happens.\" Past form + ことがある = \"have done before\" — a different meaning, so check the verb's form.",
  "diff": "Intermediate",
  "related": [
   "～たことがある",
   "～たり(suru)",
   "～時(とき)"
  ],
  "prereq": "plain dictionary form"
 },
 {
  "point": "～がほしい",
  "meaning": "want (a thing)",
  "explain": "Add がほしい after a noun to say you want that thing: 新しいパソコンがほしい = \"I want a new computer,\" 時間がほしい = \"I want more time.\" ほしい works like an い-adjective.",
  "ex": [
   {
    "jp": "新しいパソコンがほしいです。",
    "romaji": "Atarashii pasokon ga hoshii desu.",
    "en": "I want a new computer."
   },
   {
    "jp": "もっと時間がほしい。",
    "romaji": "Motto jikan ga hoshii.",
    "en": "I want more time."
   },
   {
    "jp": "子どもの時、犬がほしかった。",
    "romaji": "Kodomo no toki, inu ga hoshikatta.",
    "en": "When I was a child, I wanted a dog."
   }
  ],
  "tip": "がほしい is for wanting a THING; ～たい is for wanting to DO something. Use ほしい only for your own wish, not someone else's.",
  "diff": "Foundation",
  "related": [
   "～てほしい",
   "～たがる",
   "～にする"
  ],
  "prereq": "particle が"
 },
 {
  "point": "～てほしい",
  "meaning": "want someone to do",
  "explain": "Add ほしい to the て-form to say you want SOMEONE ELSE to do something: 手伝ってほしい = \"I want you to help,\" 静かにしてほしい = \"I want you to be quiet.\"",
  "ex": [
   {
    "jp": "手伝ってほしいです。",
    "romaji": "Tetsudatte hoshii desu.",
    "en": "I want you to help me."
   },
   {
    "jp": "もっと早く来てほしかった。",
    "romaji": "Motto hayaku kite hoshikatta.",
    "en": "I wanted you to come earlier."
   },
   {
    "jp": "静かにしてほしい。",
    "romaji": "Shizuka ni shite hoshii.",
    "en": "I want you to be quiet."
   }
  ],
  "tip": "Keep three apart: てほしい (want another person to act), がほしい (want a thing), and ～たい (want to do it yourself).",
  "diff": "Intermediate",
  "related": [
   "～がほしい",
   "～てもらう",
   "～たがる"
  ],
  "prereq": "て-form"
 }
];

export { N4_GRAMMAR };
