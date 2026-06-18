// JLPT N5 core grammar — each point with 2-3 example sentences
var GRAMMAR = [
  {point:'は (wa)',meaning:'topic marker',explain:'Marks the topic — "as for ___". Written は, pronounced "wa".',ex:[
    {jp:'私は学生です。',romaji:'Watashi wa gakusei desu.',en:'I am a student.'},
    {jp:'田中さんは先生です。',romaji:'Tanaka-san wa sensei desu.',en:'Mr. Tanaka is a teacher.'},
    {jp:'これは本です。',romaji:'Kore wa hon desu.',en:'This is a book.'}]},
  {point:'です / だ',meaning:'to be (copula)',explain:'Links a noun/adjective to the subject. です is polite; だ is plain.',ex:[
    {jp:'これはペンです。',romaji:'Kore wa pen desu.',en:'This is a pen.'},
    {jp:'私は元気です。',romaji:'Watashi wa genki desu.',en:'I am fine.'},
    {jp:'学生だ。',romaji:'Gakusei da.',en:'(I) am a student. (plain)'}]},
  {point:'が (ga)',meaning:'subject marker',explain:'Marks the grammatical subject — often new info or with existence verbs.',ex:[
    {jp:'猫がいます。',romaji:'Neko ga imasu.',en:'There is a cat.'},
    {jp:'雨が降っています。',romaji:'Ame ga futte imasu.',en:'It is raining.'},
    {jp:'だれが来ますか。',romaji:'Dare ga kimasu ka.',en:'Who is coming?'}]},
  {point:'を (o)',meaning:'direct object marker',explain:'Marks the object that receives the action of a verb.',ex:[
    {jp:'パンを食べます。',romaji:'Pan o tabemasu.',en:'I eat bread.'},
    {jp:'水を飲みます。',romaji:'Mizu o nomimasu.',en:'I drink water.'},
    {jp:'本を読みます。',romaji:'Hon o yomimasu.',en:'I read a book.'}]},
  {point:'に (ni)',meaning:'time / destination / location',explain:'Points to a time, a destination, or where something exists.',ex:[
    {jp:'七時に起きます。',romaji:'Shichi-ji ni okimasu.',en:'I get up at seven.'},
    {jp:'学校に行きます。',romaji:'Gakkō ni ikimasu.',en:'I go to school.'},
    {jp:'部屋に犬がいます。',romaji:'Heya ni inu ga imasu.',en:'There is a dog in the room.'}]},
  {point:'で (de)',meaning:'place of action / means',explain:'Where an action happens, or the means by which it is done.',ex:[
    {jp:'学校で勉強します。',romaji:'Gakkō de benkyō shimasu.',en:'I study at school.'},
    {jp:'バスで行きます。',romaji:'Basu de ikimasu.',en:'I go by bus.'},
    {jp:'日本語で話します。',romaji:'Nihongo de hanashimasu.',en:'I speak in Japanese.'}]},
  {point:'へ (e)',meaning:'direction',explain:'Marks direction of movement. Written へ, pronounced "e".',ex:[
    {jp:'日本へ行きます。',romaji:'Nihon e ikimasu.',en:'I am going to Japan.'},
    {jp:'家へ帰ります。',romaji:'Uchi e kaerimasu.',en:'I return home.'},
    {jp:'どこへ行きますか。',romaji:'Doko e ikimasu ka.',en:'Where are you going?'}]},
  {point:'と (to)',meaning:'and / with',explain:'Joins nouns ("and") or marks who you do something with ("with").',ex:[
    {jp:'パンとたまごを買います。',romaji:'Pan to tamago o kaimasu.',en:'I buy bread and eggs.'},
    {jp:'友だちと話します。',romaji:'Tomodachi to hanashimasu.',en:'I talk with a friend.'},
    {jp:'母と買い物に行きます。',romaji:'Haha to kaimono ni ikimasu.',en:'I go shopping with my mother.'}]},
  {point:'も (mo)',meaning:'also, too',explain:'Replaces は/が/を to mean "also" or "too".',ex:[
    {jp:'私も学生です。',romaji:'Watashi mo gakusei desu.',en:'I am a student too.'},
    {jp:'これもください。',romaji:'Kore mo kudasai.',en:'This one too, please.'},
    {jp:'田中さんも来ます。',romaji:'Tanaka-san mo kimasu.',en:'Mr. Tanaka is coming too.'}]},
  {point:'の (no)',meaning:'possessive / linking',explain:'Connects two nouns, showing possession or relationship.',ex:[
    {jp:'私の本です。',romaji:'Watashi no hon desu.',en:'It is my book.'},
    {jp:'日本語の先生。',romaji:'Nihongo no sensei.',en:'A Japanese teacher.'},
    {jp:'これはだれの傘ですか。',romaji:'Kore wa dare no kasa desu ka.',en:'Whose umbrella is this?'}]},
  {point:'か (ka)',meaning:'question marker',explain:'Added to the end of a sentence to make it a question.',ex:[
    {jp:'学生ですか。',romaji:'Gakusei desu ka.',en:'Are you a student?'},
    {jp:'行きますか。',romaji:'Ikimasu ka.',en:'Are you going?'},
    {jp:'これは何ですか。',romaji:'Kore wa nan desu ka.',en:'What is this?'}]},
  {point:'～ます / ～ません',meaning:'polite verb / negative',explain:'～ます is the polite non-past; ～ません makes it negative.',ex:[
    {jp:'肉を食べます。',romaji:'Niku o tabemasu.',en:'I eat meat.'},
    {jp:'お酒を飲みません。',romaji:'Osake o nomimasen.',en:'I do not drink alcohol.'},
    {jp:'毎日勉強します。',romaji:'Mainichi benkyō shimasu.',en:'I study every day.'}]},
  {point:'～ました / ～ませんでした',meaning:'polite past / past negative',explain:'Past tense of polite verbs, affirmative and negative.',ex:[
    {jp:'映画を見ました。',romaji:'Eiga o mimashita.',en:'I watched a movie.'},
    {jp:'昨日は行きませんでした。',romaji:'Kinō wa ikimasen deshita.',en:'I did not go yesterday.'},
    {jp:'朝ご飯を食べましたか。',romaji:'Asagohan o tabemashita ka.',en:'Did you eat breakfast?'}]},
  {point:'～ませんか',meaning:'invitation (won\'t you?)',explain:'A polite way to invite someone to do something together.',ex:[
    {jp:'お茶を飲みませんか。',romaji:'Ocha o nomimasen ka.',en:'Won\'t you have some tea?'},
    {jp:'一緒に行きませんか。',romaji:'Issho ni ikimasen ka.',en:'Won\'t you go together?'},
    {jp:'映画を見ませんか。',romaji:'Eiga o mimasen ka.',en:'Shall we watch a movie?'}]},
  {point:'～ましょう',meaning:'let\'s ～',explain:'Suggests doing something together.',ex:[
    {jp:'一緒に行きましょう。',romaji:'Issho ni ikimashō.',en:'Let\'s go together.'},
    {jp:'始めましょう。',romaji:'Hajimemashō.',en:'Let\'s begin.'},
    {jp:'ご飯を食べましょう。',romaji:'Gohan o tabemashō.',en:'Let\'s eat.'}]},
  {point:'い-adjectives',meaning:'adjective type 1',explain:'End in い. Negative: drop い, add くない.',ex:[
    {jp:'この本は高いです。',romaji:'Kono hon wa takai desu.',en:'This book is expensive.'},
    {jp:'高くないです。',romaji:'Takakunai desu.',en:'It is not expensive.'},
    {jp:'寒い日ですね。',romaji:'Samui hi desu ne.',en:'It is a cold day, isn\'t it?'}]},
  {point:'な-adjectives',meaning:'adjective type 2',explain:'Take な before a noun; use です to end a sentence.',ex:[
    {jp:'元気な人ですね。',romaji:'Genki na hito desu ne.',en:'You are an energetic person.'},
    {jp:'この町は静かです。',romaji:'Kono machi wa shizuka desu.',en:'This town is quiet.'},
    {jp:'有名なレストランです。',romaji:'Yūmei na resutoran desu.',en:'It is a famous restaurant.'}]},
  {point:'これ / それ / あれ',meaning:'this / that / that over there',explain:'Stand-alone pronouns based on distance from speaker and listener.',ex:[
    {jp:'これは何ですか。',romaji:'Kore wa nan desu ka.',en:'What is this?'},
    {jp:'それは私のです。',romaji:'Sore wa watashi no desu.',en:'That is mine.'},
    {jp:'あれは何ですか。',romaji:'Are wa nan desu ka.',en:'What is that over there?'}]},
  {point:'この / その / あの + noun',meaning:'this/that ～',explain:'Used directly before a noun (unlike これ/それ/あれ).',ex:[
    {jp:'この本を読みます。',romaji:'Kono hon o yomimasu.',en:'I will read this book.'},
    {jp:'そのかばんは私のです。',romaji:'Sono kaban wa watashi no desu.',en:'That bag is mine.'},
    {jp:'あの人は先生です。',romaji:'Ano hito wa sensei desu.',en:'That person is a teacher.'}]},
  {point:'～たい',meaning:'want to ～',explain:'Attach to a verb stem to express your own desire to do something.',ex:[
    {jp:'寿司が食べたいです。',romaji:'Sushi ga tabetai desu.',en:'I want to eat sushi.'},
    {jp:'日本へ行きたいです。',romaji:'Nihon e ikitai desu.',en:'I want to go to Japan.'},
    {jp:'何が買いたいですか。',romaji:'Nani ga kaitai desu ka.',en:'What do you want to buy?'}]},
  {point:'～てください',meaning:'please do ～',explain:'Made from the て-form of a verb to make a polite request.',ex:[
    {jp:'ここを見てください。',romaji:'Koko o mite kudasai.',en:'Please look here.'},
    {jp:'ちょっと待ってください。',romaji:'Chotto matte kudasai.',en:'Please wait a moment.'},
    {jp:'名前を書いてください。',romaji:'Namae o kaite kudasai.',en:'Please write your name.'}]},
  {point:'～ています',meaning:'ongoing action / state',explain:'て-form + います shows an action in progress or a state.',ex:[
    {jp:'今、ご飯を食べています。',romaji:'Ima, gohan o tabete imasu.',en:'I am eating now.'},
    {jp:'雨が降っています。',romaji:'Ame ga futte imasu.',en:'It is raining.'},
    {jp:'東京に住んでいます。',romaji:'Tōkyō ni sunde imasu.',en:'I live in Tokyo.'}]},
  {point:'ある / いる',meaning:'there is / exists',explain:'ある for non-living things; いる for living things.',ex:[
    {jp:'部屋に犬がいます。',romaji:'Heya ni inu ga imasu.',en:'There is a dog in the room.'},
    {jp:'机の上に本があります。',romaji:'Tsukue no ue ni hon ga arimasu.',en:'There is a book on the desk.'},
    {jp:'お金がありません。',romaji:'Okane ga arimasen.',en:'I have no money.'}]},
  {point:'から / まで',meaning:'from / until',explain:'から marks a start point; まで marks an end point (time or place).',ex:[
    {jp:'九時から五時まで働きます。',romaji:'Ku-ji kara go-ji made hatarakimasu.',en:'I work from nine to five.'},
    {jp:'駅から家まで歩きます。',romaji:'Eki kara uchi made arukimasu.',en:'I walk from the station to home.'},
    {jp:'月曜日から金曜日まで。',romaji:'Getsuyōbi kara kinyōbi made.',en:'From Monday to Friday.'}]},
  {point:'～が、～',meaning:'but, however',explain:'Connects two clauses with a contrast.',ex:[
    {jp:'高いですが、おいしいです。',romaji:'Takai desu ga, oishii desu.',en:'It is expensive, but delicious.'},
    {jp:'日本語は難しいですが、面白いです。',romaji:'Nihongo wa muzukashii desu ga, omoshiroi desu.',en:'Japanese is hard, but interesting.'},
    {jp:'行きたいですが、時間がありません。',romaji:'Ikitai desu ga, jikan ga arimasen.',en:'I want to go, but I have no time.'}]},
  {point:'～じゃありません',meaning:'is not (noun)',explain:'The negative of です for nouns and な-adjectives. じゃない is casual.',ex:[
    {jp:'これは本じゃありません。',romaji:'Kore wa hon ja arimasen.',en:'This is not a book.'},
    {jp:'学生じゃありません。',romaji:'Gakusei ja arimasen.',en:'I am not a student.'},
    {jp:'暇じゃありません。',romaji:'Hima ja arimasen.',en:'I am not free.'}]},
  {point:'～でした',meaning:'was (noun, past)',explain:'Past tense of です. Negative past: ～じゃありませんでした.',ex:[
    {jp:'昨日は休みでした。',romaji:'Kinō wa yasumi deshita.',en:'Yesterday was a day off.'},
    {jp:'いい天気でした。',romaji:'Ii tenki deshita.',en:'It was nice weather.'},
    {jp:'テストは簡単でした。',romaji:'Tesuto wa kantan deshita.',en:'The test was easy.'}]},
  {point:'い-adjective past (～かった)',meaning:'was ～',explain:'Drop い and add かった for the past (いい→よかった).',ex:[
    {jp:'旅行は楽しかったです。',romaji:'Ryokō wa tanoshikatta desu.',en:'The trip was fun.'},
    {jp:'映画は面白かったです。',romaji:'Eiga wa omoshirokatta desu.',en:'The movie was interesting.'},
    {jp:'おいしくなかったです。',romaji:'Oishikunakatta desu.',en:'It was not delicious.'}]},
  {point:'～て (te-form)',meaning:'and (joining)',explain:'The て-form links verbs/clauses in sequence; い-adj use ～くて.',ex:[
    {jp:'朝起きて、顔を洗います。',romaji:'Asa okite, kao o araimasu.',en:'I get up and wash my face.'},
    {jp:'本を読んで、寝ます。',romaji:'Hon o yonde, nemasu.',en:'I read a book and go to sleep.'},
    {jp:'安くて、おいしいです。',romaji:'Yasukute, oishii desu.',en:'It is cheap and delicious.'}]},
  {point:'～から (because)',meaning:'because, so',explain:'Placed after a reason clause to mean "because".',ex:[
    {jp:'忙しいから、行きません。',romaji:'Isogashii kara, ikimasen.',en:'I will not go because I am busy.'},
    {jp:'寒いから、窓を閉めます。',romaji:'Samui kara, mado o shimemasu.',en:'Because it is cold, I will close the window.'},
    {jp:'高いから、買いません。',romaji:'Takai kara, kaimasen.',en:'I will not buy it because it is expensive.'}]},
  {point:'～ないでください',meaning:'please don\'t ～',explain:'From the ない-form of a verb — a polite request not to do something.',ex:[
    {jp:'ここで写真を撮らないでください。',romaji:'Koko de shashin o toranaide kudasai.',en:'Please do not take photos here.'},
    {jp:'心配しないでください。',romaji:'Shinpai shinaide kudasai.',en:'Please do not worry.'},
    {jp:'ここに入らないでください。',romaji:'Koko ni hairanaide kudasai.',en:'Please do not enter here.'}]},
  {point:'～ましょうか',meaning:'shall I / shall we?',explain:'Offers to do something or proposes doing it together.',ex:[
    {jp:'窓を開けましょうか。',romaji:'Mado o akemashō ka.',en:'Shall I open the window?'},
    {jp:'手伝いましょうか。',romaji:'Tetsudaimashō ka.',en:'Shall I help?'},
    {jp:'何を作りましょうか。',romaji:'Nani o tsukurimashō ka.',en:'What shall we make?'}]},
  {point:'～がほしい',meaning:'want (something)',explain:'Expresses desire for a thing (a noun). Marked with が.',ex:[
    {jp:'新しいかばんがほしいです。',romaji:'Atarashii kaban ga hoshii desu.',en:'I want a new bag.'},
    {jp:'水がほしいです。',romaji:'Mizu ga hoshii desu.',en:'I want some water.'},
    {jp:'何がほしいですか。',romaji:'Nani ga hoshii desu ka.',en:'What do you want?'}]},
  {point:'～が上手 / 下手',meaning:'good / bad at',explain:'Skill at something is marked with が + 上手 (good) or 下手 (bad).',ex:[
    {jp:'妹は歌が上手です。',romaji:'Imōto wa uta ga jōzu desu.',en:'My sister is good at singing.'},
    {jp:'私は料理が下手です。',romaji:'Watashi wa ryōri ga heta desu.',en:'I am bad at cooking.'},
    {jp:'田中さんは日本語が上手です。',romaji:'Tanaka-san wa nihongo ga jōzu desu.',en:'Mr. Tanaka is good at Japanese.'}]},
  {point:'もう / まだ',meaning:'already / not yet',explain:'もう = already (with past); まだ = still / not yet.',ex:[
    {jp:'もう昼ご飯を食べました。',romaji:'Mō hirugohan o tabemashita.',en:'I already ate lunch.'},
    {jp:'まだ食べていません。',romaji:'Mada tabete imasen.',en:'I have not eaten yet.'},
    {jp:'もう帰りますか。',romaji:'Mō kaerimasu ka.',en:'Are you leaving already?'}]},
  {point:'～や～',meaning:'and (examples)',explain:'Lists nouns as examples (non-exhaustive), unlike と (a full list).',ex:[
    {jp:'机の上に本やペンがあります。',romaji:'Tsukue no ue ni hon ya pen ga arimasu.',en:'There are books, pens, and so on, on the desk.'},
    {jp:'りんごやみかんを買いました。',romaji:'Ringo ya mikan o kaimashita.',en:'I bought apples, oranges, and the like.'},
    {jp:'日曜日や月曜日は暇です。',romaji:'Nichiyōbi ya getsuyōbi wa hima desu.',en:'I am free on Sundays, Mondays, and so on.'}]},
  {point:'～ね / ～よ',meaning:'sentence-end particles',explain:'ね seeks agreement ("right?"); よ adds emphasis / new info.',ex:[
    {jp:'いい天気ですね。',romaji:'Ii tenki desu ne.',en:'Nice weather, isn\'t it?'},
    {jp:'これは便利ですよ。',romaji:'Kore wa benri desu yo.',en:'This is convenient, you know.'},
    {jp:'おいしいですね。',romaji:'Oishii desu ne.',en:'It is delicious, isn\'t it?'}]},
  {point:'～くなる / ～になる',meaning:'become ～',explain:'い-adj: drop い + くなる. な-adj/noun: + になる.',ex:[
    {jp:'寒くなりました。',romaji:'Samuku narimashita.',en:'It has gotten cold.'},
    {jp:'日本語が上手になりました。',romaji:'Nihongo ga jōzu ni narimashita.',en:'My Japanese has gotten better.'},
    {jp:'元気になりました。',romaji:'Genki ni narimashita.',en:'I have gotten well.'}]},
  {point:'一番',meaning:'the most (superlative)',explain:'一番 + adjective marks the highest degree among a group.',ex:[
    {jp:'富士山は日本で一番高い山です。',romaji:'Fujisan wa nihon de ichiban takai yama desu.',en:'Mt. Fuji is the tallest mountain in Japan.'},
    {jp:'これが一番好きです。',romaji:'Kore ga ichiban suki desu.',en:'I like this one the most.'},
    {jp:'だれが一番背が高いですか。',romaji:'Dare ga ichiban se ga takai desu ka.',en:'Who is the tallest?'}]},
  {point:'～より',meaning:'than (comparison)',explain:'A は B より ～ = "A is more ~ than B".',ex:[
    {jp:'電車はバスより速いです。',romaji:'Densha wa basu yori hayai desu.',en:'Trains are faster than buses.'},
    {jp:'今日は昨日より暑いです。',romaji:'Kyō wa kinō yori atsui desu.',en:'Today is hotter than yesterday.'},
    {jp:'私は兄より背が高いです。',romaji:'Watashi wa ani yori se ga takai desu.',en:'I am taller than my older brother.'}]},
  {point:'～前に / ～後で',meaning:'before / after',explain:'Verb(dictionary)+前に = before doing; Verb(past た)+後で = after doing.',ex:[
    {jp:'寝る前に歯を磨きます。',romaji:'Neru mae ni ha o migakimasu.',en:'I brush my teeth before sleeping.'},
    {jp:'食べた後で、散歩します。',romaji:'Tabeta ato de, sanpo shimasu.',en:'After eating, I take a walk.'},
    {jp:'仕事の後で、映画を見ます。',romaji:'Shigoto no ato de, eiga o mimasu.',en:'After work, I watch a movie.'}]},
  {point:'～のほうが',meaning:'A is more ~ (comparison)',explain:'Says which of two is more: AよりBのほうが～ = "B is more ~ than A".',ex:[
    {jp:'電車のほうが速いです。',romaji:'Densha no hou ga hayai desu.',en:'The train is faster.'},
    {jp:'夏より冬のほうが好きです。',romaji:'Natsu yori fuyu no hou ga suki desu.',en:'I like winter more than summer.'},
    {jp:'こっちのほうが安いです。',romaji:'Kotchi no hou ga yasui desu.',en:'This one is cheaper.'}]},
  {point:'～でしょう',meaning:'probably; …right?',explain:'Shows likelihood ("probably"), or seeks agreement ("…right?"). Plain form + でしょう.',ex:[
    {jp:'あした雨でしょう。',romaji:'Ashita ame deshou.',en:'It will probably rain tomorrow.'},
    {jp:'たぶん来るでしょう。',romaji:'Tabun kuru deshou.',en:'He will probably come.'},
    {jp:'おいしいでしょう？',romaji:'Oishii deshou?',en:'It is delicious, right?'}]},
  {point:'そして / それから',meaning:'and; and then',explain:'Joins sentences: そして = "and (also)"; それから = "after that / and then".',ex:[
    {jp:'朝ごはんを食べました。そして、学校へ行きました。',romaji:'Asagohan o tabemashita. Soshite, gakkou e ikimashita.',en:'I ate breakfast. And then I went to school.'},
    {jp:'宿題をします。それから、寝ます。',romaji:'Shukudai o shimasu. Sorekara, nemasu.',en:'I will do homework. After that, I will sleep.'},
    {jp:'安くて、そしておいしいです。',romaji:'Yasukute, soshite oishii desu.',en:'It is cheap, and also delicious.'}]},
  {point:'でも',meaning:'but, however',explain:'Begins a sentence to contrast with the one before. でも is casual; しかし is more formal.',ex:[
    {jp:'高いです。でも、買います。',romaji:'Takai desu. Demo, kaimasu.',en:'It is expensive. But I will buy it.'},
    {jp:'行きたいです。でも、時間がありません。',romaji:'Ikitai desu. Demo, jikan ga arimasen.',en:'I want to go. But I have no time.'},
    {jp:'寒いです。でも、元気です。',romaji:'Samui desu. Demo, genki desu.',en:'It is cold. But I am fine.'}]},
  {point:'～ことができる',meaning:'can, be able to',explain:'Dictionary-form verb + ことができます = "can do ~" — a polite way to state ability.',ex:[
    {jp:'日本語を話すことができます。',romaji:'Nihongo o hanasu koto ga dekimasu.',en:'I can speak Japanese.'},
    {jp:'ここで写真を撮ることができます。',romaji:'Koko de shashin o toru koto ga dekimasu.',en:'You can take photos here.'},
    {jp:'泳ぐことができますか。',romaji:'Oyogu koto ga dekimasu ka.',en:'Can you swim?'}]},
  {point:'何か・誰か・どこか',meaning:'something / someone / somewhere',explain:'Question word + か makes an indefinite: 何か (something), 誰か (someone), どこか (somewhere).',ex:[
    {jp:'何か食べますか。',romaji:'Nanika tabemasu ka.',en:'Will you eat something?'},
    {jp:'誰か来ました。',romaji:'Dareka kimashita.',en:'Someone came.'},
    {jp:'どこか行きたいです。',romaji:'Dokoka ikitai desu.',en:'I want to go somewhere.'}]}
];

export { GRAMMAR };
