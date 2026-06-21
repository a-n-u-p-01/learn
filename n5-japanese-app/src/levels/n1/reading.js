// N1_READING — 3 master-level reading passages
var N1_READING = [
  {
    title: '情報社会と倫理 — Information society and ethics',
    jp: '現代は情報社会と呼ばれ、膨大なデータが日々生成されている。しかし、情報の真偽を見極める能力がこれまで以上に求められている。私たちは、倫理的な判断を下す責任がある。',
    romaji: 'Gendai wa jōhō shakai to yobare, bōdai na dēta ga hibi seisei sarete iru. Shikashi, jōhō no shingi wo miwakeru nōryoku ga kore made ijō ni motomerarete iru. Watashitachi wa, rinriteki na handan wo kudasu sekinin ga aru.',
    en: 'Today is called the information society, and vast amounts of data are generated every day. However, the ability to discern the truth or falsehood of information is demanded more than ever. We have the responsibility to make ethical judgments.',
    q: [
      {q:'現代は何と呼ばれていますか。',opts:['情報社会','グローバル社会','格差社会','高齢化社会'],a:'情報社会',why:'The text says "現代は情報社会と呼ばれ".'},
      {q:'私たちに求められている責任は何ですか。',opts:['倫理的な判断を下すこと','大量のデータを生成すること','情報を無視すること','技術を進歩させること'],a:'倫理的な判断を下すこと',why:'The text says "倫理的な判断を下す責任がある".'}
    ],
    vocab: [
      {w:'情報',r:'じょうほう',m:'information'},
      {w:'倫理',r:'りんり',m:'ethics'},
      {w:'真偽',r:'しんぎ',m:'truth or falsehood'},
      {w:'見極める',r:'みわける',m:'discern, distinguish'}
    ]
  },
  {
    title: 'グローバル化と文化の多様性 — Globalization and cultural diversity',
    jp: 'グローバル化が進む中で、文化の多様性が注目されている。異なる文化を尊重しつつも、自らのアイデンティティを保つことが重要だ。文化は互いに影響を与え合いながら発展する。',
    romaji: 'Gurōbaruka ga susumu naka de, bunka no tayōsei ga chūmoku sareteiru. Kotonaru bunka wo sonchō shi tsutsu mo, mizukara no aidentiti wo tamotsu koto ga jūyō da. Bunka wa tagai ni eikyō wo ataeai nagara hatten suru.',
    en: 'As globalization progresses, cultural diversity is drawing attention. While respecting different cultures, it is important to maintain one\'s own identity. Cultures develop while influencing each other.',
    q: [
      {q:'何が注目されていますか。',opts:['文化の多様性','経済成長','環境問題','人口減少'],a:'文化の多様性',why:'The text says "文化の多様性が注目されている".'},
      {q:'文化はどのように発展すると書いてありますか。',opts:['互いに影響を与え合いながら','独立して','競争しながら','進化しない'],a:'互いに影響を与え合いながら',why:'The text says "文化は互いに影響を与え合いながら発展する".'}
    ],
    vocab: [
      {w:'グローバル化',r:'ぐろーばるか',m:'globalization'},
      {w:'多様性',r:'たようせい',m:'diversity'},
      {w:'尊重',r:'そんちょう',m:'respect'},
      {w:'アイデンティティ',r:'あいでんてぃてぃ',m:'identity'}
    ]
  },
  {
    title: '人工知能と人間の未来 — Artificial intelligence and the future of humanity',
    jp: '人工知能（AI）の発展は、人間の仕事や生活様式を大きく変えている。単純作業はAIに取って代わられる一方で、人間にしかできない創造的な仕事がこれから重視されるだろう。私たちはAIと共存する方法を考える必要がある。',
    romaji: 'Jinkō chinō (AI) no hatten wa, ningen no shigoto ya seikatsu yōshiki wo ōkiku kaeteiru. Tanjun sagyō wa AI ni totte kawarareru ippō de, ningen ni shika dekinai sōzōteki na shigoto ga kore kara jūshi sareru darō. Watashitachi wa AI to kyōzon suru hōhō wo kangaeru hitsuyō ga aru.',
    en: 'The development of artificial intelligence (AI) is greatly changing human work and lifestyles. While routine tasks are being replaced by AI, creative work that only humans can do will likely become more valued from now on. We need to consider ways to coexist with AI.',
    q: [
      {q:'AIの発展は何を変えていますか。',opts:['人間の仕事や生活様式','環境','教育','政治'],a:'人間の仕事や生活様式',why:'The text says "人間の仕事や生活様式を大きく変えている".'},
      {q:'これから重視される仕事は何ですか。',opts:['人間にしかできない創造的な仕事','単純作業','AIの開発','管理業務'],a:'人間にしかできない創造的な仕事',why:'The text says "人間にしかできない創造的な仕事がこれから重視されるだろう".'}
    ],
    vocab: [
      {w:'人工知能',r:'じんこうちのう',m:'artificial intelligence'},
      {w:'生活様式',r:'せいかつようしき',m:'lifestyle'},
      {w:'取って代わる',r:'とってかわる',m:'replace'},
      {w:'創造的',r:'そうぞうてき',m:'creative'},
      {w:'共存',r:'きょうぞん',m:'coexistence'}
    ]
  }
];

export { N1_READING };