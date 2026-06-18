// JLPT N5 short reading passages with comprehension questions
var READING = [
  {
    title:'じこしょうかい — Self-introduction',
    jp:'はじめまして。わたしは リーです。ちゅうごくから きました。だいがくせいです。まいにち にほんごを べんきょうしています。どうぞ よろしく。',
    romaji:'Hajimemashite. Watashi wa Rī desu. Chūgoku kara kimashita. Daigakusei desu. Mainichi nihongo o benkyō shite imasu. Dōzo yoroshiku.',
    en:'Nice to meet you. I am Lee. I came from China. I am a university student. I study Japanese every day. Pleased to meet you.',
    q:[
      {q:'リーさんは どこから きましたか。',opts:['ちゅうごく','にほん','アメリカ','かんこく'],a:'ちゅうごく'},
      {q:'リーさんは まいにち なにを しますか。',opts:['にほんごの べんきょう','スポーツ','りょうり','しごと'],a:'にほんごの べんきょう'}
    ]
  },
  {
    title:'いちにち — My day',
    jp:'わたしは まいあさ ろくじに おきます。しちじに あさごはんを たべます。はちじに がっこうへ いきます。よる じゅういちじに ねます。',
    romaji:'Watashi wa maiasa roku-ji ni okimasu. Shichi-ji ni asagohan o tabemasu. Hachi-ji ni gakkō e ikimasu. Yoru jūichi-ji ni nemasu.',
    en:'I get up at 6 every morning. I eat breakfast at 7. I go to school at 8. I go to bed at 11 at night.',
    q:[
      {q:'なんじに おきますか。',opts:['ろくじ','しちじ','はちじ','じゅういちじ'],a:'ろくじ'},
      {q:'なんじに がっこうへ いきますか。',opts:['はちじ','しちじ','ろくじ','くじ'],a:'はちじ'}
    ]
  },
  {
    title:'メモ — A note',
    jp:'たなかさんへ\nあした、ごご さんじに えきで あいましょう。いっしょに えいがを みに いきます。\n— やまだ',
    romaji:'Tanaka-san e — Ashita, gogo san-ji ni eki de aimashō. Issho ni eiga o mi ni ikimasu. — Yamada',
    en:'To Tanaka: Let\'s meet at the station at 3 p.m. tomorrow. We\'ll go to see a movie together. — Yamada',
    q:[
      {q:'どこで あいますか。',opts:['えき','がっこう','レストラン','みせ'],a:'えき'},
      {q:'なにを しに いきますか。',opts:['えいがを みに','かいものに','たべに','およぎに'],a:'えいがを みに'}
    ]
  },
  {
    title:'しゅうまつ — The weekend',
    jp:'どようびは てんきが よかったので、こうえんへ いきました。ともだちと サッカーを しました。にちようびは あめでした。うちで ほんを よみました。',
    romaji:'Doyōbi wa tenki ga yokatta node, kōen e ikimashita. Tomodachi to sakkā o shimashita. Nichiyōbi wa ame deshita. Uchi de hon o yomimashita.',
    en:'Saturday\'s weather was good, so I went to the park. I played soccer with a friend. Sunday was rainy. I read a book at home.',
    q:[
      {q:'にちようびの てんきは どうでしたか。',opts:['あめ','はれ','ゆき','くもり'],a:'あめ'},
      {q:'どようび なにを しましたか。',opts:['サッカー','べんきょう','かいもの','りょうり'],a:'サッカー'}
    ]
  },
  {
    title:'かいもの — Shopping',
    jp:'きのう スーパーで かいものを しました。たまごと パンと ぎゅうにゅうを かいました。やさいは かいませんでした。',
    romaji:'Kinō sūpā de kaimono o shimashita. Tamago to pan to gyūnyū o kaimashita. Yasai wa kaimasen deshita.',
    en:'Yesterday I shopped at the supermarket. I bought eggs, bread, and milk. I did not buy vegetables.',
    q:[
      {q:'なにを かいませんでしたか。',opts:['やさい','たまご','パン','ぎゅうにゅう'],a:'やさい'}
    ]
  },
  {
    title:'かぞく — Family',
    jp:'わたしの かぞくは よにんです。ちちと ははと あにと わたしです。ちちは いしゃです。あには だいがくせいです。',
    romaji:'Watashi no kazoku wa yo-nin desu. Chichi to haha to ani to watashi desu. Chichi wa isha desu. Ani wa daigakusei desu.',
    en:'My family is four people: my father, mother, older brother, and me. My father is a doctor. My older brother is a university student.',
    q:[
      {q:'なんにん かぞくですか。',opts:['よにん','さんにん','ごにん','ふたり'],a:'よにん'},
      {q:'おとうさんの しごとは なんですか。',opts:['いしゃ','せんせい','がくせい','かいしゃいん'],a:'いしゃ'}
    ]
  },
  {
    title:'おしらせ — A notice',
    jp:'この へやで たばこを すわないで ください。たべものも だめです。',
    romaji:'Kono heya de tabako o suwanaide kudasai. Tabemono mo dame desu.',
    en:'Please do not smoke in this room. Food is also not allowed.',
    q:[
      {q:'この へやで たばこを すっても いいですか。',opts:['いいえ','はい','すこしなら','よる だけ'],a:'いいえ'}
    ]
  },
  {
    title:'レストラン — Restaurant',
    jp:'きのう、ともだちと レストランで ばんごはんを たべました。りょうりは とても おいしかったです。また いきたいです。',
    romaji:'Kinō, tomodachi to resutoran de bangohan o tabemashita. Ryōri wa totemo oishikatta desu. Mata ikitai desu.',
    en:'Yesterday I ate dinner at a restaurant with a friend. The food was very delicious. I want to go again.',
    q:[
      {q:'りょうりは どうでしたか。',opts:['おいしかった','まずかった','たかかった','からかった'],a:'おいしかった'},
      {q:'いつ いきましたか。',opts:['きのう','きょう','あした','せんしゅう'],a:'きのう'}
    ]
  }
];

export { READING };
