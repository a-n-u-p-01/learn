// N5_GRAMMAR — content + enrichment (auto-merged from enrich/)
var N5_GRAMMAR = [
  {
    "id": 1,    
    "point": "は (wa)",
    "meaning": "what the sentence is about",
    "explain": "Put は (say it \"wa\") right after the thing you want to talk about. 私は学生です = \"I'm a student\" (sort of like \"as for me, student\"). Use it to say what your whole sentence is about.",
    "ex": [
      {
        "jp": "私は学生です。",
        "kana": "わたしはがくせいです。",
        "romaji": "Watashi wa gakusei desu.",
        "en": "I am a student."
      },
      {
        "jp": "田中さんは先生です。",
        "kana": "たなかさんはせんせいです。",
        "romaji": "Tanaka-san wa sensei desu.",
        "en": "Mr. Tanaka is a teacher."
      },
      {
        "jp": "これは本です。",
        "kana": "これはほんです。",
        "romaji": "Kore wa hon desu.",
        "en": "This is a book."
      }
    ],
    "tip": "Heads up: even though you say \"wa\", you write it with the hiragana は, not わ. Only the sound changes.",
    "diff": "Foundation",
    "related": [
      "が (ga)",
      "も (mo)",
      "です / だ"
    ]
  },
  {
    "id": 2,
    "point": "です / だ",
    "meaning": "is / am / are",
    "explain": "です is the friendly way to say \"is / am / are\" and it sits at the end. これはペンです = \"this is a pen.\" Use です with most people; だ is the relaxed version you'd use with close friends.",
    "ex": [
      {
        "jp": "これはペンです。",
        "kana": "これはぺんです。",
        "romaji": "Kore wa pen desu.",
        "en": "This is a pen."
      },
      {
        "jp": "私は元気です。",
        "kana": "わたしはげんきです。",
        "romaji": "Watashi wa genki desu.",
        "en": "I am fine."
      },
      {
        "jp": "学生だ。",
        "kana": "がくせいだ。",
        "romaji": "Gakusei da.",
        "en": "(I) am a student. (plain)"
      }
    ],
    "tip": "Don't tack です onto a verb that already ends in ます. \"tabemasu desu\" is wrong, because ます is already polite by itself.",
    "diff": "Foundation",
    "related": [
      "は (wa)",
      "～じゃありません",
      "～でした"
    ]
  },
  {
    "id": 3,
    "point": "が (ga)",
    "meaning": "who or what does something",
    "explain": "が points at who or what does the action, or what exists. 猫がいます = \"there is a cat.\" You often reach for it when the info is brand new or it answers a \"who?\" / \"what?\" question.",
    "ex": [
      {
        "jp": "猫がいます。",
        "kana": "ねこがいます。",
        "romaji": "Neko ga imasu.",
        "en": "There is a cat."
      },
      {
        "jp": "雨が降っています。",
        "kana": "あめがふっています。",
        "romaji": "Ame ga futte imasu.",
        "en": "It is raining."
      },
      {
        "jp": "だれが来ますか。",
        "kana": "だれがきますか。",
        "romaji": "Dare ga kimasu ka.",
        "en": "Who is coming?"
      }
    ],
    "tip": "Use が (not は) the first time you bring something up or when you answer \"who/what?\" Once everyone knows it, you usually switch to は.",
    "diff": "Foundation",
    "related": [
      "は (wa)",
      "ある / いる",
      "を (o)"
    ]
  },
  {
    "id": 4,
    "point": "を (o)",
    "meaning": "the thing an action happens to",
    "explain": "を (say \"o\") goes right after the thing the action happens to. パンを食べる = \"eat bread\" — the bread is what gets eaten. It always comes just before the verb.",
    "ex": [
      {
        "jp": "パンを食べます。",
        "kana": "ぱんをたべます。",
        "romaji": "Pan o tabemasu.",
        "en": "I eat bread."
      },
      {
        "jp": "水を飲みます。",
        "kana": "みずをのみます。",
        "romaji": "Mizu o nomimasu.",
        "en": "I drink water."
      },
      {
        "jp": "本を読みます。",
        "kana": "ほんをよみます。",
        "romaji": "Hon o yomimasu.",
        "en": "I read a book."
      }
    ],
    "tip": "This を has its own special hiragana and is only used for the thing an action lands on. Never use it to spell a plain \"o\" sound inside other words.",
    "diff": "Foundation",
    "related": [
      "が (ga)",
      "～ます / ～ません",
      "に (ni)"
    ]
  },
  {
    "id": 5,
    "point": "に (ni)",
    "meaning": "time / destination / location",
    "explain": "に points to a time or a place you go to, or where something sits. 七時に起きます = \"I get up at seven\"; 学校に行きます = \"I go to school.\" Think of it as pinning to one exact spot.",
    "ex": [
      {
        "jp": "七時に起きます。",
        "kana": "しちじにおきます。",
        "romaji": "Shichi-ji ni okimasu.",
        "en": "I get up at seven."
      },
      {
        "jp": "学校に行きます。",
        "kana": "がっこうにいきます。",
        "romaji": "Gakkō ni ikimasu.",
        "en": "I go to school."
      },
      {
        "jp": "部屋に犬がいます。",
        "kana": "へやにいぬがいます。",
        "romaji": "Heya ni inu ga imasu.",
        "en": "There is a dog in the room."
      }
    ],
    "tip": "Use に for where something IS or where you arrive, but で for where you DO an action. \"Study at school\" needs で, not に.",
    "diff": "Foundation",
    "related": [
      "で (de)",
      "へ (e)",
      "ある / いる"
    ]
  },
  {
    "id": 6,
    "point": "で (de)",
    "meaning": "place of action / means",
    "explain": "で (say \"de\") shows where an action happens or what tool you use. 学校で勉強します = \"I study at school\"; バスで行きます = \"I go by bus.\" It answers \"where is it done?\" or \"how?\"",
    "ex": [
      {
        "jp": "学校で勉強します。",
        "kana": "がっこうでべんきょうします。",
        "romaji": "Gakkō de benkyō shimasu.",
        "en": "I study at school."
      },
      {
        "jp": "バスで行きます。",
        "kana": "ばすでいきます。",
        "romaji": "Basu de ikimasu.",
        "en": "I go by bus."
      },
      {
        "jp": "日本語で話します。",
        "kana": "にほんごではなします。",
        "romaji": "Nihongo de hanashimasu.",
        "en": "I speak in Japanese."
      }
    ],
    "tip": "で is for the spot where you DO something; に is for where something just exists. \"There's a dog in the room\" uses に, but \"I study in the room\" uses で.",
    "diff": "Foundation",
    "related": [
      "に (ni)",
      "を (o)",
      "へ (e)"
    ]
  },
  {
    "id": 7,
    "point": "へ (e)",
    "meaning": "direction",
    "explain": "へ (say \"e\" here) shows the direction you're heading. 日本へ行きます = \"I'm going to Japan.\" It gives a \"toward that place\" feeling, much like に does for where you're going.",
    "ex": [
      {
        "jp": "日本へ行きます。",
        "kana": "にほんへいきます。",
        "romaji": "Nihon e ikimasu.",
        "en": "I am going to Japan."
      },
      {
        "jp": "家へ帰ります。",
        "kana": "いえへかえります。",
        "romaji": "Uchi e kaerimasu.",
        "en": "I return home."
      },
      {
        "jp": "どこへ行きますか。",
        "kana": "どこへいきますか。",
        "romaji": "Doko e ikimasu ka.",
        "en": "Where are you going?"
      }
    ],
    "tip": "Like は, you write へ but say \"e.\" For going places, へ and に mostly overlap; へ just leans a bit more on the direction you're moving.",
    "diff": "Foundation",
    "related": [
      "に (ni)",
      "で (de)",
      "から / まで"
    ]
  },
  {
    "id": 8,
    "point": "と (to)",
    "meaning": "and / with",
    "explain": "と does two jobs: it ties nouns into a full list, and it shows who you do something with. パンとたまごを買います = \"I buy bread and eggs\"; 友だちと話します = \"I talk with a friend.\"",
    "ex": [
      {
        "jp": "パンとたまごを買います。",
        "kana": "ぱんとたまごをかいます。",
        "romaji": "Pan to tamago o kaimasu.",
        "en": "I buy bread and eggs."
      },
      {
        "jp": "友だちと話します。",
        "kana": "ともだちとはなします。",
        "romaji": "Tomodachi to hanashimasu.",
        "en": "I talk with a friend."
      },
      {
        "jp": "母と買い物に行きます。",
        "kana": "ははとかいものにいきます。",
        "romaji": "Haha to kaimono ni ikimasu.",
        "en": "I go shopping with my mother."
      }
    ],
    "tip": "Use と for \"and\" when you mean ALL the items on the list. If you're only naming a few examples out of more, switch to や instead.",
    "diff": "Foundation",
    "related": [
      "～や～",
      "も (mo)",
      "の (no)"
    ]
  },
  {
    "id": 9,
    "point": "も (mo)",
    "meaning": "also, too",
    "explain": "も means \"also\" or \"too.\" 私も学生です = \"I'm a student too.\" You stick it on a word to say this is one more of the same kind.",
    "ex": [
      {
        "jp": "私も学生です。",
        "kana": "わたしもがくせいです。",
        "romaji": "Watashi mo gakusei desu.",
        "en": "I am a student too."
      },
      {
        "jp": "これもください。",
        "kana": "これもください。",
        "romaji": "Kore mo kudasai.",
        "en": "This one too, please."
      },
      {
        "jp": "田中さんも来ます。",
        "kana": "たなかさんもきます。",
        "romaji": "Tanaka-san mo kimasu.",
        "en": "Mr. Tanaka is coming too."
      }
    ],
    "tip": "も takes the place of は, が, or を — it doesn't pile on top of them. Say \"watashi mo,\" never \"watashi wa mo.\"",
    "diff": "Foundation",
    "related": [
      "は (wa)",
      "が (ga)",
      "を (o)"
    ]
  },
  {
    "id": 10,
    "point": "の (no)",
    "meaning": "possessive / linking",
    "explain": "の links two words to show ownership or connection. 私の本 = \"my book\"; 日本語の先生 = \"a Japanese teacher.\" The owner or describer comes first, then の, then the thing.",
    "ex": [
      {
        "jp": "私の本です。",
        "kana": "わたしのほんです。",
        "romaji": "Watashi no hon desu.",
        "en": "It is my book."
      },
      {
        "jp": "日本語の先生。",
        "kana": "にほんごのせんせい。",
        "romaji": "Nihongo no sensei.",
        "en": "A Japanese teacher."
      },
      {
        "jp": "これはだれの傘ですか。",
        "kana": "これはだれのかさですか。",
        "romaji": "Kore wa dare no kasa desu ka.",
        "en": "Whose umbrella is this?"
      }
    ],
    "tip": "The order is owner + の + thing, backwards from English \"book of mine.\" 私の本 literally runs \"me's book.\"",
    "diff": "Foundation",
    "related": [
      "は (wa)",
      "と (to)",
      "これ / それ / あれ"
    ]
  },
  {
    "id": 11,
    "point": "か (ka)",
    "meaning": "makes a question",
    "explain": "か goes at the very end of a sentence to turn it into a question, like a spoken question mark. 学生です = \"you're a student\" becomes 学生ですか = \"are you a student?\"",
    "ex": [
      {
        "jp": "学生ですか。",
        "kana": "がくせいですか。",
        "romaji": "Gakusei desu ka.",
        "en": "Are you a student?"
      },
      {
        "jp": "行きますか。",
        "kana": "いきますか。",
        "romaji": "Ikimasu ka.",
        "en": "Are you going?"
      },
      {
        "jp": "これは何ですか。",
        "kana": "これはなんですか。",
        "romaji": "Kore wa nan desu ka.",
        "en": "What is this?"
      }
    ],
    "tip": "Just adding か makes it a question, so you usually don't even need a written \"?\" and the words stay in the same order as the plain sentence.",
    "diff": "Foundation",
    "related": [
      "です / だ",
      "～ます / ～ません",
      "何か・誰か・どこか"
    ]
  },
  {
    "id": 12,
    "point": "～ます / ～ません",
    "meaning": "polite verb / negative",
    "explain": "～ます is the polite ending on a verb for things you do now or will do. 肉を食べます = \"I eat meat.\" Swap it to ～ません for \"don't\": お酒を飲みません = \"I don't drink alcohol.\"",
    "ex": [
      {
        "jp": "肉を食べます。",
        "kana": "にくをたべます。",
        "romaji": "Niku o tabemasu.",
        "en": "I eat meat."
      },
      {
        "jp": "お酒を飲みません。",
        "kana": "おさけをのみません。",
        "romaji": "Osake o nomimasen.",
        "en": "I do not drink alcohol."
      },
      {
        "jp": "毎日勉強します。",
        "kana": "まいにちべんきょうします。",
        "romaji": "Mainichi benkyō shimasu.",
        "en": "I study every day."
      }
    ],
    "tip": "ます covers both \"do now\" and \"will do later\" — there's no separate future ending, so the rest of the sentence tells you which is meant.",
    "diff": "Foundation",
    "related": [
      "～ました / ～ませんでした",
      "です / だ",
      "を (o)"
    ]
  },
  {
    "id": 13,
    "point": "～ました / ～ませんでした",
    "meaning": "polite past / past negative",
    "explain": "These are the past versions of polite verbs: ～ました = \"did\" and ～ませんでした = \"didn't.\" 映画を見ました = \"I watched a movie\"; 行きませんでした = \"I didn't go.\"",
    "ex": [
      {
        "jp": "映画を見ました。",
        "kana": "えいがをみました。",
        "romaji": "Eiga o mimashita.",
        "en": "I watched a movie."
      },
      {
        "jp": "昨日は行きませんでした。",
        "kana": "きのうはいきませんでした。",
        "romaji": "Kinō wa ikimasen deshita.",
        "en": "I did not go yesterday."
      },
      {
        "jp": "朝ご飯を食べましたか。",
        "kana": "あさごはんをたべましたか。",
        "romaji": "Asagohan o tabemashita ka.",
        "en": "Did you eat breakfast?"
      }
    ],
    "tip": "The \"didn't\" form is the long ～ませんでした. Don't try to shorten it or add an extra です on the end — it already finishes correctly.",
    "diff": "Foundation",
    "related": [
      "～ます / ～ません",
      "～でした",
      "もう / まだ"
    ]
  },
  {
    "id": 14,
    "point": "～ませんか",
    "meaning": "invitation (won't you?)",
    "explain": "～ませんか is a warm way to invite someone to do something together — it comes out like \"won't you...?\" お茶を飲みませんか = \"won't you have some tea?\" It feels gentler than just telling someone to do it.",
    "ex": [
      {
        "jp": "お茶を飲みませんか。",
        "kana": "おちゃをのみませんか。",
        "romaji": "Ocha o nomimasen ka.",
        "en": "Won't you have some tea?"
      },
      {
        "jp": "一緒に行きませんか。",
        "kana": "いっしょにいきませんか。",
        "romaji": "Issho ni ikimasen ka.",
        "en": "Won't you go together?"
      },
      {
        "jp": "映画を見ませんか。",
        "kana": "えいがをみませんか。",
        "romaji": "Eiga o mimasen ka.",
        "en": "Shall we watch a movie?"
      }
    ],
    "tip": "It looks negative, but it's a friendly invite, not a real \"no\" question. \"Won't you have tea?\" really means \"would you like some tea?\"",
    "diff": "Intermediate",
    "related": [
      "～ましょう",
      "～ましょうか",
      "～ます / ～ません"
    ]
  },
  {
    "id": 15,
    "point": "～ましょう",
    "meaning": "let's ～",
    "explain": "～ましょう means \"let's...\" and suggests doing something together. 一緒に行きましょう = \"let's go together.\" You make it by changing the ～ます ending to ～ましょう.",
    "ex": [
      {
        "jp": "一緒に行きましょう。",
        "kana": "いっしょにいきましょう。",
        "romaji": "Issho ni ikimashō.",
        "en": "Let's go together."
      },
      {
        "jp": "始めましょう。",
        "kana": "はじめましょう。",
        "romaji": "Hajimemashō.",
        "en": "Let's begin."
      },
      {
        "jp": "ご飯を食べましょう。",
        "kana": "ごはんをたべましょう。",
        "romaji": "Gohan o tabemashō.",
        "en": "Let's eat."
      }
    ],
    "tip": "Use ～ましょう when you both already lean toward doing it. If you first want to check whether you should, add か → ～ましょうか (\"shall we?\").",
    "diff": "Intermediate",
    "related": [
      "～ましょうか",
      "～ませんか",
      "～ます / ～ません"
    ]
  },
  {
    "id": 16,
    "point": "い-adjectives",
    "meaning": "adjective type 1",
    "explain": "These describing words end in い, like 高い (expensive). この本は高いです = \"this book is expensive.\" To say \"not,\" drop the last い and add くない: 高い → 高くない.",
    "ex": [
      {
        "jp": "この本は高いです。",
        "kana": "このほんはたかいです。",
        "romaji": "Kono hon wa takai desu.",
        "en": "This book is expensive."
      },
      {
        "jp": "高くないです。",
        "kana": "たかくないです。",
        "romaji": "Takakunai desu.",
        "en": "It is not expensive."
      },
      {
        "jp": "寒い日ですね。",
        "kana": "さむいひですね。",
        "romaji": "Samui hi desu ne.",
        "en": "It is a cold day, isn't it?"
      }
    ],
    "tip": "Never slip a な between this kind of word and its noun. Say 高い本 (\"takai hon\"), not \"takai na hon\" — that な belongs to the other describing-word type.",
    "diff": "Foundation",
    "related": [
      "な-adjectives",
      "い-adjective past (～かった)",
      "～くなる / ～になる"
    ]
  },
  {
    "id": 17,
    "point": "な-adjectives",
    "meaning": "adjective type 2",
    "explain": "These describing words need な when they sit in front of a noun, like 元気な人 (an energetic person). To finish a sentence with one, just add です: この町は静かです = \"this town is quiet.\"",
    "ex": [
      {
        "jp": "元気な人ですね。",
        "kana": "げんきなひとですね。",
        "romaji": "Genki na hito desu ne.",
        "en": "You are an energetic person."
      },
      {
        "jp": "この町は静かです。",
        "kana": "このまちはしずかです。",
        "romaji": "Kono machi wa shizuka desu.",
        "en": "This town is quiet."
      },
      {
        "jp": "有名なレストランです。",
        "kana": "ゆうめいなれすとらんです。",
        "romaji": "Yūmei na resutoran desu.",
        "en": "It is a famous restaurant."
      }
    ],
    "tip": "Use な only when the word sits right before a noun (静かな町). Drop the な and use です at the end of the sentence (町は静かです).",
    "diff": "Foundation",
    "related": [
      "い-adjectives",
      "です / だ",
      "～くなる / ～になる"
    ]
  },
  {
    "id": 18,
    "point": "これ / それ / あれ",
    "meaning": "this / that / that over there",
    "explain": "これ (this), それ (that), and あれ (that over there) stand on their own in place of naming a thing. これは何ですか = \"what is this?\" Pick by distance: これ is near you, それ near the other person, あれ far from you both.",
    "ex": [
      {
        "jp": "これは何ですか。",
        "kana": "これはなんですか。",
        "romaji": "Kore wa nan desu ka.",
        "en": "What is this?"
      },
      {
        "jp": "それは私のです。",
        "kana": "それはわたしのです。",
        "romaji": "Sore wa watashi no desu.",
        "en": "That is mine."
      },
      {
        "jp": "あれは何ですか。",
        "kana": "あれはなんですか。",
        "romaji": "Are wa nan desu ka.",
        "en": "What is that over there?"
      }
    ],
    "tip": "These three stand alone — you can't put them right before a noun. For \"this book\" you need この本, not これ本.",
    "diff": "Foundation",
    "related": [
      "この / その / あの + noun",
      "の (no)",
      "は (wa)"
    ]
  },
  {
    "id": 19,
    "point": "この / その / あの + noun",
    "meaning": "this/that ～",
    "explain": "この, その, and あの go straight in front of a noun to mean \"this/that ___.\" この本を読みます = \"I'll read this book.\" They follow the same near / middle / far idea as これ/それ/あれ.",
    "ex": [
      {
        "jp": "この本を読みます。",
        "kana": "このほんをよみます。",
        "romaji": "Kono hon o yomimasu.",
        "en": "I will read this book."
      },
      {
        "jp": "そのかばんは私のです。",
        "kana": "そのかばんはわたしのです。",
        "romaji": "Sono kaban wa watashi no desu.",
        "en": "That bag is mine."
      },
      {
        "jp": "あの人は先生です。",
        "kana": "あのひとはせんせいです。",
        "romaji": "Ano hito wa sensei desu.",
        "en": "That person is a teacher."
      }
    ],
    "tip": "This group always needs a noun right after it, while これ/それ/あれ stand alone. \"Kono\" on its own is unfinished.",
    "diff": "Foundation",
    "related": [
      "これ / それ / あれ",
      "の (no)",
      "は (wa)"
    ]
  },
  {
    "id": 20,
    "point": "～たい",
    "meaning": "want to ～",
    "explain": "～たい sticks onto a verb to say what YOU want to do. 寿司が食べたいです = \"I want to eat sushi.\" You drop ます from the polite verb and add たい instead.",
    "ex": [
      {
        "jp": "寿司が食べたいです。",
        "kana": "すしがたべたいです。",
        "romaji": "Sushi ga tabetai desu.",
        "en": "I want to eat sushi."
      },
      {
        "jp": "日本へ行きたいです。",
        "kana": "にほんへいきたいです。",
        "romaji": "Nihon e ikitai desu.",
        "en": "I want to go to Japan."
      },
      {
        "jp": "何が買いたいですか。",
        "kana": "なにがかいたいですか。",
        "romaji": "Nani ga kaitai desu ka.",
        "en": "What do you want to buy?"
      }
    ],
    "tip": "～たい is only for your own wishes (or, in a question, the listener's). To say you want a thing, use がほしい — and notice the thing you want often takes が.",
    "diff": "Intermediate",
    "related": [
      "～がほしい",
      "～ます / ～ません",
      "が (ga)"
    ]
  },
  {
    "id": 21,
    "point": "～てください",
    "meaning": "please do ～",
    "explain": "～てください means \"please do ___.\" ちょっと待ってください = \"please wait a moment.\" It's the everyday polite way to ask someone to do something for you.",
    "ex": [
      {
        "jp": "ここを見てください。",
        "kana": "ここをみてください。",
        "romaji": "Koko o mite kudasai.",
        "en": "Please look here."
      },
      {
        "jp": "ちょっと待ってください。",
        "kana": "ちょっとまってください。",
        "romaji": "Chotto matte kudasai.",
        "en": "Please wait a moment."
      },
      {
        "jp": "名前を書いてください。",
        "kana": "なまえをかいてください。",
        "romaji": "Namae o kaite kudasai.",
        "en": "Please write your name."
      }
    ],
    "tip": "You first have to bend the verb into its て-form, which changes shape by verb (待つ → 待って, 書く → 書いて). Getting that shape right is the tricky part.",
    "diff": "Intermediate",
    "related": [
      "～て (te-form)",
      "～ないでください",
      "～ています"
    ]
  },
  {
    "id": 22,
    "point": "～ています",
    "meaning": "ongoing action / state",
    "explain": "～ています shows either an action happening right now or an ongoing situation. 今、ご飯を食べています = \"I'm eating now\"; 東京に住んでいます = \"I live in Tokyo.\" It's like English \"-ing,\" but it also covers settled states.",
    "ex": [
      {
        "jp": "今、ご飯を食べています。",
        "kana": "いま、ごはんをたべています。",
        "romaji": "Ima, gohan o tabete imasu.",
        "en": "I am eating now."
      },
      {
        "jp": "雨が降っています。",
        "kana": "あめがふっています。",
        "romaji": "Ame ga futte imasu.",
        "en": "It is raining."
      },
      {
        "jp": "東京に住んでいます。",
        "kana": "とうきょうにすんでいます。",
        "romaji": "Tōkyō ni sunde imasu.",
        "en": "I live in Tokyo."
      }
    ],
    "tip": "With verbs like 住む (live) or 知る (know), this form means a current state, not something happening this second. 住んでいます is \"I live (there),\" not \"I'm living right now.\"",
    "diff": "Intermediate",
    "related": [
      "～て (te-form)",
      "ある / いる",
      "～てください"
    ]
  },
  {
    "id": 23,
    "point": "ある / いる",
    "meaning": "there is / exists",
    "explain": "Both ある and いる mean \"there is / exists,\" but you choose by what you're talking about: いる for living things (people, animals), ある for non-living things. Their polite forms are います and あります.",
    "ex": [
      {
        "jp": "部屋に犬がいます。",
        "kana": "へやにいぬがいます。",
        "romaji": "Heya ni inu ga imasu.",
        "en": "There is a dog in the room."
      },
      {
        "jp": "机の上に本があります。",
        "kana": "つくえのうえにほんがあります。",
        "romaji": "Tsukue no ue ni hon ga arimasu.",
        "en": "There is a book on the desk."
      },
      {
        "jp": "お金がありません。",
        "kana": "おかねがありません。",
        "romaji": "Okane ga arimasen.",
        "en": "I have no money."
      }
    ],
    "tip": "The split is alive vs. not alive — use います for a dog or person, あります for a book or money. Swapping these is the classic beginner mix-up.",
    "diff": "Foundation",
    "related": [
      "が (ga)",
      "に (ni)",
      "～ています"
    ]
  },
  {
    "id": 24,
    "point": "から / まで",
    "meaning": "from / until",
    "explain": "から marks where something starts and まで where it ends, for both time and place. 九時から五時まで働きます = \"I work from nine to five\"; 駅から家まで = \"from the station to home.\" They often come as a pair.",
    "ex": [
      {
        "jp": "九時から五時まで働きます。",
        "kana": "くじからごじまではたらきます。",
        "romaji": "Ku-ji kara go-ji made hatarakimasu.",
        "en": "I work from nine to five."
      },
      {
        "jp": "駅から家まで歩きます。",
        "kana": "えきからいえまであるきます。",
        "romaji": "Eki kara uchi made arukimasu.",
        "en": "I walk from the station to home."
      },
      {
        "jp": "月曜日から金曜日まで。",
        "kana": "げつようびからきんようびまで。",
        "romaji": "Getsuyōbi kara kinyōbi made.",
        "en": "From Monday to Friday."
      }
    ],
    "tip": "This から means \"from\" (a starting point). A different から placed after a reason means \"because,\" so notice where in the sentence it sits.",
    "diff": "Foundation",
    "related": [
      "～から (because)",
      "に (ni)",
      "へ (e)"
    ]
  },
  {
    "id": 25,
    "point": "～が、～",
    "meaning": "but, however",
    "explain": "This ～が joins two halves of a sentence to show a contrast, like English \"but.\" 高いですが、おいしいです = \"it's expensive, but it's delicious.\" The が comes after the first half, leading into the opposite idea.",
    "ex": [
      {
        "jp": "高いですが、おいしいです。",
        "kana": "たかいですが、おいしいです。",
        "romaji": "Takai desu ga, oishii desu.",
        "en": "It is expensive, but delicious."
      },
      {
        "jp": "日本語は難しいですが、面白いです。",
        "kana": "にほんごはむずかしいですが、おもしろいです。",
        "romaji": "Nihongo wa muzukashii desu ga, omoshiroi desu.",
        "en": "Japanese is hard, but interesting."
      },
      {
        "jp": "行きたいですが、時間がありません。",
        "kana": "いきたいですが、じかんがありません。",
        "romaji": "Ikitai desu ga, jikan ga arimasen.",
        "en": "I want to go, but I have no time."
      }
    ],
    "tip": "This \"but\" が sits in the middle of a sentence. Don't mix it up with the が that points at who does the action.",
    "diff": "Intermediate",
    "related": [
      "でも",
      "から / まで",
      "そして / それから"
    ]
  },
  {
    "id": 26,
    "point": "～じゃありません",
    "meaning": "is not (noun)",
    "explain": "～じゃありません is the polite way to say \"is not\" for nouns and な-type words. これは本じゃありません = \"this is not a book.\" The casual version is じゃない.",
    "ex": [
      {
        "jp": "これは本じゃありません。",
        "kana": "これはほんじゃありません。",
        "romaji": "Kore wa hon ja arimasen.",
        "en": "This is not a book."
      },
      {
        "jp": "学生じゃありません。",
        "kana": "がくせいじゃありません。",
        "romaji": "Gakusei ja arimasen.",
        "en": "I am not a student."
      },
      {
        "jp": "暇じゃありません。",
        "kana": "ひまじゃありません。",
        "romaji": "Hima ja arimasen.",
        "en": "I am not free."
      }
    ],
    "tip": "じゃありません is only for nouns and な-type words. The い-type describing words make their own \"not\" with くない (高くない), so don't use じゃありません with those.",
    "diff": "Foundation",
    "related": [
      "です / だ",
      "～でした",
      "な-adjectives"
    ]
  },
  {
    "id": 27,
    "point": "～でした",
    "meaning": "was (noun, past)",
    "explain": "～でした is the past of です, meaning \"was,\" for nouns and な-type words. 昨日は休みでした = \"yesterday was a day off.\" To say \"wasn't,\" use じゃありませんでした.",
    "ex": [
      {
        "jp": "昨日は休みでした。",
        "kana": "きのうはやすみでした。",
        "romaji": "Kinō wa yasumi deshita.",
        "en": "Yesterday was a day off."
      },
      {
        "jp": "いい天気でした。",
        "kana": "いいてんきでした。",
        "romaji": "Ii tenki deshita.",
        "en": "It was nice weather."
      },
      {
        "jp": "テストは簡単でした。",
        "kana": "てすとはかんたんでした。",
        "romaji": "Tesuto wa kantan deshita.",
        "en": "The test was easy."
      }
    ],
    "tip": "でした works for nouns and な-type words, but the い-type words use their own past ～かった (楽しかった). Never say \"tanoshii deshita.\"",
    "diff": "Foundation",
    "related": [
      "です / だ",
      "～じゃありません",
      "い-adjective past (～かった)"
    ]
  },
  {
    "id": 28,
    "point": "い-adjective past (～かった)",
    "meaning": "was ～",
    "explain": "To put an い-type describing word into the past, drop the last い and add かった. 楽しい (fun) becomes 楽しかった (was fun): 旅行は楽しかったです = \"the trip was fun.\" The odd one to memorize is いい → よかった.",
    "ex": [
      {
        "jp": "旅行は楽しかったです。",
        "kana": "りょこうはたのしかったです。",
        "romaji": "Ryokō wa tanoshikatta desu.",
        "en": "The trip was fun."
      },
      {
        "jp": "映画は面白かったです。",
        "kana": "えいがはおもしろかったです。",
        "romaji": "Eiga wa omoshirokatta desu.",
        "en": "The movie was interesting."
      },
      {
        "jp": "おいしくなかったです。",
        "kana": "おいしくなかったです。",
        "romaji": "Oishikunakatta desu.",
        "en": "It was not delicious."
      }
    ],
    "tip": "These い-words never use でした for the past — say 高かったです, not \"takai deshita.\" And remember いい turns into よかった, not \"iikatta.\"",
    "diff": "Intermediate",
    "related": [
      "い-adjectives",
      "～でした",
      "～くなる / ～になる"
    ]
  },
  {
    "id": 29,
    "point": "～て (te-form)",
    "meaning": "and (joining)",
    "explain": "The て-form is a connecting shape that strings actions together, like \"I get up AND wash my face.\" 朝起きて、顔を洗います shows that flow. For the い-type describing words, the matching connector is くて: 安くて、おいしい (cheap and tasty).",
    "ex": [
      {
        "jp": "朝起きて、顔を洗います。",
        "kana": "あさおきて、かおをあらいます。",
        "romaji": "Asa okite, kao o araimasu.",
        "en": "I get up and wash my face."
      },
      {
        "jp": "本を読んで、寝ます。",
        "kana": "ほんをよんで、ねます。",
        "romaji": "Hon o yonde, nemasu.",
        "en": "I read a book and go to sleep."
      },
      {
        "jp": "安くて、おいしいです。",
        "kana": "やすくて、おいしいです。",
        "romaji": "Yasukute, oishii desu.",
        "en": "It is cheap and delicious."
      }
    ],
    "tip": "The て-form by itself doesn't show past or present — only the very last verb in the sentence decides the time. So just the final verb carries the tense.",
    "diff": "Intermediate",
    "related": [
      "～てください",
      "～ています",
      "そして / それから"
    ]
  },
  {
    "id": 30,
    "point": "～から (because)",
    "meaning": "because, so",
    "explain": "This ～から comes after a reason and means \"because\" or \"so.\" 忙しいから、行きません = \"because I'm busy, I won't go.\" The reason goes first, then から, then the result.",
    "ex": [
      {
        "jp": "忙しいから、行きません。",
        "kana": "いそがしいから、いきません。",
        "romaji": "Isogashii kara, ikimasen.",
        "en": "I will not go because I am busy."
      },
      {
        "jp": "寒いから、窓を閉めます。",
        "kana": "さむいから、まどをしめます。",
        "romaji": "Samui kara, mado o shimemasu.",
        "en": "Because it is cold, I will close the window."
      },
      {
        "jp": "高いから、買いません。",
        "kana": "たかいから、かいません。",
        "romaji": "Takai kara, kaimasen.",
        "en": "I will not buy it because it is expensive."
      }
    ],
    "tip": "This \"because\" から goes at the END of the reason, the opposite of English where \"because\" comes first. It reads like \"busy because, won't go.\"",
    "diff": "Intermediate",
    "related": [
      "から / まで",
      "～が、～",
      "でも"
    ]
  },
  {
    "id": 31,
    "point": "～ないでください",
    "meaning": "please don't ～",
    "explain": "～ないでください means \"please don't do ___.\" 心配しないでください = \"please don't worry.\" It's the polite way to ask someone to hold off on something.",
    "ex": [
      {
        "jp": "ここで写真を撮らないでください。",
        "kana": "ここでしゃしんをとらないでください。",
        "romaji": "Koko de shashin o toranaide kudasai.",
        "en": "Please do not take photos here."
      },
      {
        "jp": "心配しないでください。",
        "kana": "しんぱいしないでください。",
        "romaji": "Shinpai shinaide kudasai.",
        "en": "Please do not worry."
      },
      {
        "jp": "ここに入らないでください。",
        "kana": "ここにはいらないでください。",
        "romaji": "Koko ni hairanaide kudasai.",
        "en": "Please do not enter here."
      }
    ],
    "tip": "You first have to make the verb's \"not\" form correctly (撮る → 撮らない), then add でください. It's the negative partner of ～てください.",
    "diff": "Intermediate",
    "related": [
      "～てください",
      "～て (te-form)",
      "～ます / ～ません"
    ]
  },
  {
    "id": 32,
    "point": "～ましょうか",
    "meaning": "shall I / shall we?",
    "explain": "～ましょうか offers to do something for someone (\"shall I open the window?\") or proposes doing it together (\"shall we?\"). 窓を開けましょうか = \"shall I open the window?\" It's ～ましょう with a questioning か added.",
    "ex": [
      {
        "jp": "窓を開けましょうか。",
        "kana": "まどをあけましょうか。",
        "romaji": "Mado o akemashō ka.",
        "en": "Shall I open the window?"
      },
      {
        "jp": "手伝いましょうか。",
        "kana": "てつだいましょうか。",
        "romaji": "Tetsudaimashō ka.",
        "en": "Shall I help?"
      },
      {
        "jp": "何を作りましょうか。",
        "kana": "なにをつくりましょうか。",
        "romaji": "Nani o tsukurimashō ka.",
        "en": "What shall we make?"
      }
    ],
    "tip": "～ましょうか asks whether to do it, while plain ～ましょう already decides \"let's do it.\" Add か when you want to check with the other person first.",
    "diff": "Intermediate",
    "related": [
      "～ましょう",
      "～ませんか",
      "か (ka)"
    ]
  },
  {
    "id": 33,
    "point": "～がほしい",
    "meaning": "want (something)",
    "explain": "～がほしい says you want a thing (a noun, not an action). 新しいかばんがほしいです = \"I want a new bag.\" The thing you want gets が in front of ほしい.",
    "ex": [
      {
        "jp": "新しいかばんがほしいです。",
        "kana": "あたらしいかばんがほしいです。",
        "romaji": "Atarashii kaban ga hoshii desu.",
        "en": "I want a new bag."
      },
      {
        "jp": "水がほしいです。",
        "kana": "みずがほしいです。",
        "romaji": "Mizu ga hoshii desu.",
        "en": "I want some water."
      },
      {
        "jp": "何がほしいですか。",
        "kana": "なにがほしいですか。",
        "romaji": "Nani ga hoshii desu ka.",
        "en": "What do you want?"
      }
    ],
    "tip": "Use がほしい for wanting a thing, but ～たい for wanting to DO something. \"Want water\" is 水がほしい; \"want to drink\" is 飲みたい.",
    "diff": "Intermediate",
    "related": [
      "～たい",
      "が (ga)",
      "～が上手 / 下手"
    ]
  },
  {
    "id": 34,
    "point": "～が上手 / 下手",
    "meaning": "good / bad at",
    "explain": "To say you're good or bad at something, put が on the skill and add 上手 (good at) or 下手 (bad at). 歌が上手 = \"good at singing\"; 料理が下手 = \"bad at cooking.\"",
    "ex": [
      {
        "jp": "妹は歌が上手です。",
        "kana": "いもうとはうたがじょうずです。",
        "romaji": "Imōto wa uta ga jōzu desu.",
        "en": "My sister is good at singing."
      },
      {
        "jp": "私は料理が下手です。",
        "kana": "わたしはりょうりがへたです。",
        "romaji": "Watashi wa ryōri ga heta desu.",
        "en": "I am bad at cooking."
      },
      {
        "jp": "田中さんは日本語が上手です。",
        "kana": "たなかさんはにほんごがじょうずです。",
        "romaji": "Tanaka-san wa nihongo ga jōzu desu.",
        "en": "Mr. Tanaka is good at Japanese."
      }
    ],
    "tip": "The skill takes が, not を — say 日本語が上手, not \"nihongo o jouzu.\" Also, 上手 is mostly used to praise other people, not to brag about yourself.",
    "diff": "Intermediate",
    "related": [
      "が (ga)",
      "～がほしい",
      "一番"
    ]
  },
  {
    "id": 35,
    "point": "もう / まだ",
    "meaning": "already / not yet",
    "explain": "もう means \"already\" and teams up with a past verb: もう昼ご飯を食べました = \"I already ate lunch.\" まだ means \"still\" or \"not yet\": まだ食べていません = \"I haven't eaten yet.\"",
    "ex": [
      {
        "jp": "もう昼ご飯を食べました。",
        "kana": "もうひるごはんをたべました。",
        "romaji": "Mō hirugohan o tabemashita.",
        "en": "I already ate lunch."
      },
      {
        "jp": "まだ食べていません。",
        "kana": "まだたべていません。",
        "romaji": "Mada tabete imasen.",
        "en": "I have not eaten yet."
      },
      {
        "jp": "もう帰りますか。",
        "kana": "もうかえりますか。",
        "romaji": "Mō kaerimasu ka.",
        "en": "Are you leaving already?"
      }
    ],
    "tip": "For \"not yet,\" use まだ with the ～ていません form (まだ食べていません), not まだ with a plain past. That combination trips up a lot of beginners.",
    "diff": "Intermediate",
    "related": [
      "～ています",
      "～ました / ～ませんでした",
      "～ます / ～ません"
    ]
  },
  {
    "id": 36,
    "point": "～や～",
    "meaning": "and (examples)",
    "explain": "～や～ lists a couple of nouns as examples, hinting there's more (\"books, pens, and so on\"). 机の上に本やペンがあります = \"there are books, pens, and such on the desk.\" It's the \"like, for example\" version of \"and.\"",
    "ex": [
      {
        "jp": "机の上に本やペンがあります。",
        "kana": "つくえのうえにほんやぺんがあります。",
        "romaji": "Tsukue no ue ni hon ya pen ga arimasu.",
        "en": "There are books, pens, and so on, on the desk."
      },
      {
        "jp": "りんごやみかんを買いました。",
        "kana": "りんごやみかんをかいました。",
        "romaji": "Ringo ya mikan o kaimashita.",
        "en": "I bought apples, oranges, and the like."
      },
      {
        "jp": "日曜日や月曜日は暇です。",
        "kana": "にちようびやげつようびはひまです。",
        "romaji": "Nichiyōbi ya getsuyōbi wa hima desu.",
        "en": "I am free on Sundays, Mondays, and so on."
      }
    ],
    "tip": "や means the list is just a few examples (there's more); と means that's the whole list. Pick や when you don't want to name everything.",
    "diff": "Intermediate",
    "related": [
      "と (to)",
      "も (mo)",
      "の (no)"
    ]
  },
  {
    "id": 37,
    "point": "～ね / ～よ",
    "meaning": "sentence-end particles",
    "explain": "ね and よ are little add-ons at the end of a sentence. ね fishes for agreement (いい天気ですね = \"nice weather, isn't it?\"), and よ adds emphasis or tells someone new info (これは便利ですよ = \"this is handy, you know\").",
    "ex": [
      {
        "jp": "いい天気ですね。",
        "kana": "いいてんきですね。",
        "romaji": "Ii tenki desu ne.",
        "en": "Nice weather, isn't it?"
      },
      {
        "jp": "これは便利ですよ。",
        "kana": "これはべんりですよ。",
        "romaji": "Kore wa benri desu yo.",
        "en": "This is convenient, you know."
      },
      {
        "jp": "おいしいですね。",
        "kana": "おいしいですね。",
        "romaji": "Oishii desu ne.",
        "en": "It is delicious, isn't it?"
      }
    ],
    "tip": "Use ね when you expect the other person to agree, and よ when you're telling them something they might not know. Swapping them can sound pushy or strangely unsure.",
    "diff": "Foundation",
    "related": [
      "か (ka)",
      "です / だ",
      "でも"
    ]
  },
  {
    "id": 38,
    "point": "～くなる / ～になる",
    "meaning": "become ～",
    "explain": "These show that something \"becomes\" a new state. For the い-type words, drop い and add くなる: 寒くなる (get cold). For な-type words and nouns, add になる: 元気になる (get well).",
    "ex": [
      {
        "jp": "寒くなりました。",
        "kana": "さむくなりました。",
        "romaji": "Samuku narimashita.",
        "en": "It has gotten cold."
      },
      {
        "jp": "日本語が上手になりました。",
        "kana": "にほんごがじょうずになりました。",
        "romaji": "Nihongo ga jōzu ni narimashita.",
        "en": "My Japanese has gotten better."
      },
      {
        "jp": "元気になりました。",
        "kana": "げんきになりました。",
        "romaji": "Genki ni narimashita.",
        "en": "I have gotten well."
      }
    ],
    "tip": "Pick くなる for the い-type words and になる for な-type words and nouns. \"Genki ni naru\" is right, but \"samui ni naru\" is wrong — it's 寒くなる.",
    "diff": "Intermediate",
    "related": [
      "い-adjectives",
      "な-adjectives",
      "～が上手 / 下手"
    ]
  },
  {
    "id": 39,
    "point": "一番",
    "meaning": "the most (superlative)",
    "explain": "一番 means \"number one,\" and placed before a describing word it makes \"the most.\" 一番高い = \"the tallest\": 富士山は日本で一番高い山です = \"Mt. Fuji is the tallest mountain in Japan.\" Use it to pick out the top one in a group.",
    "ex": [
      {
        "jp": "富士山は日本で一番高い山です。",
        "kana": "ふじさんはにほんでいちばんたかいやまです。",
        "romaji": "Fujisan wa nihon de ichiban takai yama desu.",
        "en": "Mt. Fuji is the tallest mountain in Japan."
      },
      {
        "jp": "これが一番好きです。",
        "kana": "これがいちばんすきです。",
        "romaji": "Kore ga ichiban suki desu.",
        "en": "I like this one the most."
      },
      {
        "jp": "だれが一番背が高いですか。",
        "kana": "だれがいちばんせがたかいですか。",
        "romaji": "Dare ga ichiban se ga takai desu ka.",
        "en": "Who is the tallest?"
      }
    ],
    "tip": "一番 goes right before the describing word (一番高い山), and the group you're comparing within usually takes で, as in 日本で一番 (\"the most in Japan\").",
    "diff": "Intermediate",
    "related": [
      "～より",
      "～のほうが",
      "が (ga)"
    ]
  },
  {
    "id": 40,
    "point": "～より",
    "meaning": "than (comparison)",
    "explain": "～より marks what you're comparing against, meaning \"than.\" The shape A は B より ～ says \"A is more ~ than B\": 電車はバスより速いです = \"trains are faster than buses.\"",
    "ex": [
      {
        "jp": "電車はバスより速いです。",
        "kana": "でんしゃはばすよりはやいです。",
        "romaji": "Densha wa basu yori hayai desu.",
        "en": "Trains are faster than buses."
      },
      {
        "jp": "今日は昨日より暑いです。",
        "kana": "きょうはきのうよりあついです。",
        "romaji": "Kyō wa kinō yori atsui desu.",
        "en": "Today is hotter than yesterday."
      },
      {
        "jp": "私は兄より背が高いです。",
        "kana": "わたしはあによりせがたかいです。",
        "romaji": "Watashi wa ani yori se ga takai desu.",
        "en": "I am taller than my older brother."
      }
    ],
    "tip": "より attaches to the side that loses (the lesser one). バスより速い means \"faster THAN the bus\" — the bus is the slower one here.",
    "diff": "Intermediate",
    "related": [
      "～のほうが",
      "一番",
      "は (wa)"
    ]
  },
  {
    "id": 41,
    "point": "～前に / ～後で",
    "meaning": "before / after",
    "explain": "These tell when something happens compared to another action. Plain verb + 前に means \"before doing\" (寝る前に = before sleeping); past verb + 後で means \"after doing\" (食べた後で = after eating).",
    "ex": [
      {
        "jp": "寝る前に歯を磨きます。",
        "kana": "ねるまえにはをみがきます。",
        "romaji": "Neru mae ni ha o migakimasu.",
        "en": "I brush my teeth before sleeping."
      },
      {
        "jp": "食べた後で、散歩します。",
        "kana": "たべたあとで、さんぽします。",
        "romaji": "Tabeta ato de, sanpo shimasu.",
        "en": "After eating, I take a walk."
      },
      {
        "jp": "仕事の後で、映画を見ます。",
        "kana": "しごとのあとで、えいがをみます。",
        "romaji": "Shigoto no ato de, eiga o mimasu.",
        "en": "After work, I watch a movie."
      }
    ],
    "tip": "Mind the verb shape: 前に follows the plain dictionary form, but 後で follows the past た-form. So it's 食べる前に but 食べた後で.",
    "diff": "Advanced",
    "related": [
      "～て (te-form)",
      "そして / それから",
      "から / まで"
    ]
  },
  {
    "id": 42,
    "point": "～のほうが",
    "meaning": "A is more ~ (comparison)",
    "explain": "～のほうが points out which of two choices is \"more.\" 電車のほうが速いです = \"the train is faster.\" The full shape A より B のほうが ～ means \"B is more ~ than A.\"",
    "ex": [
      {
        "jp": "電車のほうが速いです。",
        "kana": "でんしゃのほうがはやいです。",
        "romaji": "Densha no hou ga hayai desu.",
        "en": "The train is faster."
      },
      {
        "jp": "夏より冬のほうが好きです。",
        "kana": "なつよりふゆのほうがすきです。",
        "romaji": "Natsu yori fuyu no hou ga suki desu.",
        "en": "I like winter more than summer."
      },
      {
        "jp": "こっちのほうが安いです。",
        "kana": "こっちのほうがやすいです。",
        "romaji": "Kotchi no hou ga yasui desu.",
        "en": "This one is cheaper."
      }
    ],
    "tip": "ほう naturally pairs with より: the chosen / better side takes のほうが and the other side takes より, as in 夏より冬のほうが好き (\"I like winter more than summer\").",
    "diff": "Advanced",
    "related": [
      "～より",
      "一番",
      "が (ga)"
    ]
  },
  {
    "id": 43, 
    "point": "～でしょう",
    "meaning": "probably; …right?",
    "explain": "～でしょう shows something is likely (\"it'll probably rain\") or gently asks for agreement (\"it's tasty, right?\"). あした雨でしょう = \"it'll probably rain tomorrow.\" You attach it to the plain form of a word.",
    "ex": [
      {
        "jp": "あした雨でしょう。",
        "kana": "あしたあめでしょう。",
        "romaji": "Ashita ame deshou.",
        "en": "It will probably rain tomorrow."
      },
      {
        "jp": "たぶん来るでしょう。",
        "kana": "たぶんくるでしょう。",
        "romaji": "Tabun kuru deshou.",
        "en": "He will probably come."
      },
      {
        "jp": "おいしいでしょう？",
        "kana": "おいしいでしょう？",
        "romaji": "Oishii deshou?",
        "en": "It is delicious, right?"
      }
    ],
    "tip": "でしょう follows the plain form with no です in front — say 雨でしょう or 来るでしょう, not \"desu deshou.\" Your tone of voice shows whether you mean \"probably\" or \"right?\"",
    "diff": "Advanced",
    "related": [
      "です / だ",
      "～ね / ～よ",
      "もう / まだ"
    ]
  },
  {
    "id": 44,
    "point": "そして / それから",
    "meaning": "and; and then",
    "explain": "そして and それから join two sentences. そして means \"and (also),\" while それから means \"after that / and then,\" adding a sense of order. Both kick off the second sentence: 宿題をします。それから、寝ます = \"I'll do homework. After that, I'll sleep.\"",
    "ex": [
      {
        "jp": "朝ごはんを食べました。そして、学校へ行きました。",
        "kana": "あさごはんをたべました。そして、がっこうへいきました。",
        "romaji": "Asagohan o tabemashita. Soshite, gakkou e ikimashita.",
        "en": "I ate breakfast. And then I went to school."
      },
      {
        "jp": "宿題をします。それから、寝ます。",
        "kana": "しゅくだいをします。それから、ねます。",
        "romaji": "Shukudai o shimasu. Sorekara, nemasu.",
        "en": "I will do homework. After that, I will sleep."
      },
      {
        "jp": "安くて、そしておいしいです。",
        "kana": "やすくて、そしておいしいです。",
        "romaji": "Yasukute, soshite oishii desu.",
        "en": "It is cheap, and also delicious."
      }
    ],
    "tip": "Use それから when there's a clear \"and then\" time order, and そして for simply adding another point. They overlap, but それから stresses the sequence.",
    "diff": "Intermediate",
    "related": [
      "～て (te-form)",
      "でも",
      "～が、～"
    ]
  },
  {
    "id": 45,
    "point": "でも",
    "meaning": "but, however",
    "explain": "でも starts a fresh sentence to push back against what was just said, like \"but\" or \"however.\" 高いです。でも、買います = \"it's expensive. But I'll buy it.\" It's the casual everyday pick; しかし is more formal.",
    "ex": [
      {
        "jp": "高いです。でも、買います。",
        "kana": "たかいです。でも、かいます。",
        "romaji": "Takai desu. Demo, kaimasu.",
        "en": "It is expensive. But I will buy it."
      },
      {
        "jp": "行きたいです。でも、時間がありません。",
        "kana": "いきたいです。でも、じかんがありません。",
        "romaji": "Ikitai desu. Demo, jikan ga arimasen.",
        "en": "I want to go. But I have no time."
      },
      {
        "jp": "寒いです。でも、元気です。",
        "kana": "さむいです。でも、げんきです。",
        "romaji": "Samui desu. Demo, genki desu.",
        "en": "It is cold. But I am fine."
      }
    ],
    "tip": "でも begins a brand-new sentence, while the connecting が joins two halves inside one sentence. Don't drop でも into the middle the way you would with が.",
    "diff": "Intermediate",
    "related": [
      "～が、～",
      "そして / それから",
      "から / まで"
    ]
  },
  {
    "id": 46,
    "point": "～ことができる",
    "meaning": "can, be able to",
    "explain": "～ことができる is a polite way to say \"can\" or \"be able to.\" Plain verb + ことができます means \"can do ~\": 日本語を話すことができます = \"I can speak Japanese.\" It states an ability.",
    "ex": [
      {
        "jp": "日本語を話すことができます。",
        "kana": "にほんごをはなすことができます。",
        "romaji": "Nihongo o hanasu koto ga dekimasu.",
        "en": "I can speak Japanese."
      },
      {
        "jp": "ここで写真を撮ることができます。",
        "kana": "ここでしゃしんをとることができます。",
        "romaji": "Koko de shashin o toru koto ga dekimasu.",
        "en": "You can take photos here."
      },
      {
        "jp": "泳ぐことができますか。",
        "kana": "およぐことができますか。",
        "romaji": "Oyogu koto ga dekimasu ka.",
        "en": "Can you swim?"
      }
    ],
    "tip": "Use the plain dictionary form before ことができる (話すことができる), never the ます-form. \"hanashimasu koto ga dekiru\" is wrong.",
    "diff": "Advanced",
    "related": [
      "～ます / ～ません",
      "～が上手 / 下手",
      "が (ga)"
    ]
  },
  {
    "id": 47,
    "point": "何か・誰か・どこか",
    "meaning": "something / someone / somewhere",
    "explain": "Adding か to a question word makes it fuzzy: 何か (something), 誰か (someone), どこか (somewhere). 何か食べますか = \"will you eat something?\" Use them when you don't know or don't need to say exactly which.",
    "ex": [
      {
        "jp": "何か食べますか。",
        "kana": "なにかたべますか。",
        "romaji": "Nanika tabemasu ka.",
        "en": "Will you eat something?"
      },
      {
        "jp": "誰か来ました。",
        "kana": "だれかきました。",
        "romaji": "Dareka kimashita.",
        "en": "Someone came."
      },
      {
        "jp": "どこか行きたいです。",
        "kana": "どこかいきたいです。",
        "romaji": "Dokoka ikitai desu.",
        "en": "I want to go somewhere."
      }
    ],
    "tip": "This か turns a question word into \"some-\" (何か = \"something\"). Don't mix it up with the か at the end that turns a whole sentence into a question.",
    "diff": "Intermediate",
    "related": [
      "か (ka)",
      "が (ga)",
      "を (o)"
    ]
  }
];

export { N5_GRAMMAR };