// N3_READING — 3 intermediate reading passages
var N3_READING = [
  {
    title: '環境問題について — About environmental issues',
    jp: '最近、環境問題に関心を持つ人が増えています。特にプラスチックごみの問題は深刻です。私たちは、買い物のときにエコバッグを使うなど、簡単にできることから始めるべきです。',
    romaji: 'Saikin, kankyō mondai ni kanshin wo motsu hito ga fuete imasu. Toku ni purasuchikku gomi no mondai wa shinkoku desu. Watashitachi wa, kaimono no toki ni ekobaggu wo tsukau nado, kantan ni dekiru koto kara hajimeru beki desu.',
    en: 'Recently, more people are becoming interested in environmental issues. The problem of plastic waste is especially serious. We should start with things we can easily do, such as using eco-bags when shopping.',
    q: [
      {q:'最近、何に関心を持つ人が増えていますか。',opts:['環境問題','経済','健康','教育'],a:'環境問題',why:'The text says "環境問題に関心を持つ人が増えています".'},
      {q:'私たちは何から始めるべきですか。',opts:['簡単にできること','難しいこと','お金をかけること','環境問題を無視すること'],a:'簡単にできること',why:'The text says "簡単にできることから始めるべきです".'}
    ],
    vocab: [
      {w:'環境問題',r:'かんきょうもんだい',m:'environmental issues'},
      {w:'関心',r:'かんしん',m:'interest, concern'},
      {w:'プラスチックごみ',r:'ぷらすちっくごみ',m:'plastic waste'},
      {w:'エコバッグ',r:'えこばっぐ',m:'eco-bag'}
    ]
  },
  {
    title: '仕事と生活のバランス — Work-life balance',
    jp: '現代社会では、仕事と生活のバランスが大切だと言われています。休日をしっかり取ることや、趣味の時間を持つことが、ストレスを減らすために効果的です。',
    romaji: 'Gendai shakai de wa, shigoto to seikatsu no baransu ga taisetsu da to iwarete imasu. Kyūjitsu wo shikkari toru koto ya, shumi no jikan wo motsu koto ga, sutoresu wo herasu tame ni kōkateki desu.',
    en: 'In modern society, it is said that work-life balance is important. Taking holidays properly and having time for hobbies is effective for reducing stress.',
    q: [
      {q:'何がストレスを減らすために効果的ですか。',opts:['休日と趣味','残業','仕事を増やす','睡眠不足'],a:'休日と趣味',why:'The text says "休日をしっかり取ることや、趣味の時間を持つことが、ストレスを減らすために効果的です".'},
      {q:'現代社会で何が大切だと言われていますか。',opts:['仕事と生活のバランス','お金','人間関係','健康'],a:'仕事と生活のバランス',why:'The text says "仕事と生活のバランスが大切だと言われています".'}
    ],
    vocab: [
      {w:'現代社会',r:'げんだいしゃかい',m:'modern society'},
      {w:'バランス',r:'ばらんす',m:'balance'},
      {w:'休日',r:'きゅうじつ',m:'holiday, day off'},
      {w:'ストレス',r:'すとれす',m:'stress'}
    ]
  },
  {
    title: 'インターネットの使い方 — How to use the internet',
    jp: 'インターネットは便利なツールですが、使い方を間違えると危険です。個人情報を守るために、パスワードは複雑なものに設定しましょう。また、知らない人からのメールには注意が必要です。',
    romaji: 'Intānetto wa benri na tsūru desu ga, tsukaikata wo machigaeru to kiken desu. Kojin jōhō wo mamoru tame ni, pasuwādo wa fukuzatsu na mono ni settei shimashou. Mata, shiranai hito kara no mēru ni wa chūi ga hitsuyō desu.',
    en: 'The internet is a convenient tool, but it is dangerous to use it incorrectly. To protect personal information, set complex passwords. Also, you need to be careful with emails from unknown people.',
    q: [
      {q:'個人情報を守るために何をすべきですか。',opts:['複雑なパスワードを設定する','知らない人と話す','簡単なパスワードを使う','メールを全て開ける'],a:'複雑なパスワードを設定する',why:'The text says "パスワードは複雑なものに設定しましょう".'},
      {q:'インターネットの使い方を間違えるとどうなりますか。',opts:['危険です','便利です','問題ない','楽しいです'],a:'危険です',why:'The text says "使い方を間違えると危険です".'}
    ],
    vocab: [
      {w:'インターネット',r:'いんたーねっと',m:'internet'},
      {w:'個人情報',r:'こじんじょうほう',m:'personal information'},
      {w:'パスワード',r:'ぱすわーど',m:'password'},
      {w:'メール',r:'めーる',m:'email'}
    ]
  }
];

export { N3_READING };