// N1_GRAMMAR — 25 master-level grammar points
var N1_GRAMMAR = [
  {
    point: '〜あっての',
    meaning: 'thanks to; without ~, not possible',
    explain: 'Indicates that something exists or is possible because of something else. 家族あっての私です = "I am who I am thanks to my family."',
    ex: [
      {jp:'皆さんの協力あっての成功です。',romaji:'Minasan no kyōryoku atte no seikō desu.',en:'This success is thanks to everyone\'s cooperation.'},
      {jp:'経験あっての判断だ。',romaji:'Keiken atte no handan da.',en:'A judgment made possible by experience.'}
    ],
    tip: 'Formal, used in speeches and writing.',
    diff: 'Mastery',
    related: ['〜があってこそ']
  },
  {
    point: '〜があってこそ',
    meaning: 'only because of',
    explain: 'Emphasizes that something is only possible because of a specific condition. 努力があってこそ成功する = "Success is only possible because of effort."',
    ex: [
      {jp:'健康があってこそ仕事ができる。',romaji:'Kenkō ga atte koso shigoto ga dekiru.',en:'I can work only because I have health.'},
      {jp:'君の支援があってこそ今がある。',romaji:'Kimi no shien ga atte koso ima ga aru.',en:'I am where I am today only because of your support.'}
    ],
    tip: 'Emphatic version of 〜あっての.',
    diff: 'Mastery',
    related: ['〜あっての']
  },
  {
    point: '〜をもって',
    meaning: 'with, by means of',
    explain: 'Indicates the means or instrument used. 本日をもって退職します = "I will retire as of today."',
    ex: [
      {jp:'この場をもって、お別れします。',romaji:'Kono ba wo motte, o-wakare shimasu.',en:'I will take my leave here.'},
      {jp:'書面をもってお知らせいたします。',romaji:'Shomen wo motte o-shirase itashimasu.',en:'We will inform you in writing.'}
    ],
    tip: 'Formal.',
    diff: 'Mastery',
    related: ['〜を以て']
  },
  {
    point: '〜にかかわる',
    meaning: 'pertaining to, affecting',
    explain: 'Indicates that something is related to or affects something important. 命にかかわる問題だ = "A matter of life and death."',
    ex: [
      {jp:'国家（こっか）の安全にかかわる情報だ。',romaji:'Kokka no anzen ni kakawaru jōhō da.',en:'Information concerning national security.'},
      {jp:'彼の将来にかかわる決断だ。',romaji:'Kare no shōrai ni kakawaru ketsudan da.',en:'A decision that affects his future.'}
    ],
    tip: 'Used with important matters.',
    diff: 'Mastery',
    related: ['〜に関わる']
  },
  {
    point: '〜のきわみ',
    meaning: 'the height of, extreme',
    explain: 'Expresses the utmost degree. 感謝のきわみです = "I am deeply grateful."',
    ex: [
      {jp:'心配のきわみです。',romaji:'Shinpai no kiwami desu.',en:'I am extremely worried.'},
      {jp:'感謝のきわみを捧げます。',romaji:'Kansha no kiwami wo sasagemasu.',en:'I offer my deepest gratitude.'}
    ],
    tip: 'Formal, used in letters and speeches.',
    diff: 'Mastery',
    related: ['〜の極み']
  },
  {
    point: '〜を余儀なくされる',
    meaning: 'be forced to, be compelled to',
    explain: 'Indicates being forced to do something against one\'s will. 悪天候のため、延期を余儀なくされた = "We were forced to postpone due to bad weather."',
    ex: [
      {jp:'資金不足で、計画の変更を余儀なくされた。',romaji:'Shikin fusoku de, keikaku no henkō wo yogi naku sareta.',en:'We were forced to change the plan due to lack of funds.'},
      {jp:'事故により、中止を余儀なくされた。',romaji:'Jiko ni yori, chūshi wo yogi naku sareta.',en:'We were forced to cancel due to the accident.'}
    ],
    tip: 'Formal.',
    diff: 'Mastery',
    related: ['〜せざるを得ない']
  },
  {
    point: '〜なしでは',
    meaning: 'without, lacking',
    explain: 'Indicates that without something, the rest cannot happen. お金なしでは何もできない = "Without money, we can do nothing."',
    ex: [
      {jp:'先生の助言なしでは、成功しなかった。',romaji:'Sensei no jogen nashi de wa, seikō shinakatta.',en:'Without the teacher\'s advice, I wouldn\'t have succeeded.'},
      {jp:'努力なしでは、何も得られない。',romaji:'Doryoku nashi de wa, nani mo erarenai.',en:'Without effort, you cannot gain anything.'}
    ],
    tip: 'Followed by negative or impossibility.',
    diff: 'Mastery',
    related: ['〜なくしては']
  },
  {
    point: '〜なくしては',
    meaning: 'without, except',
    explain: 'Similar to 〜なしでは. 彼の指導なくしては、ここまで来られなかった = "Without his guidance, we couldn\'t have come this far."',
    ex: [
      {jp:'あなたの支援なくしては成し遂げられなかった。',romaji:'Anata no shien nakushite wa nashitogerarenakatta.',en:'I couldn\'t have achieved it without your support.'},
      {jp:'覚悟なくしてはできない挑戦だ。',romaji:'Kakugo nakushite wa dekinai chōsen da.',en:'A challenge that cannot be done without resolve.'}
    ],
    tip: 'Used in writing.',
    diff: 'Mastery',
    related: ['〜なしでは']
  },
  {
    point: '〜とともに',
    meaning: 'together with, along with',
    explain: 'Indicates accompaniment or simultaneous change. 時代とともに進化する = "Evolve with the times."',
    ex: [
      {jp:'彼とともに、チームを築いてきた。',romaji:'Kare to tomo ni, chīmu wo kizuite kita.',en:'I have built a team together with him.'},
      {jp:'年を取るとともに、体力が衰える。',romaji:'Toshi wo toru to tomo ni, tairyoku ga otoroeru.',en:'As one ages, physical strength declines.'}
    ],
    tip: 'Used for changes over time.',
    diff: 'Mastery',
    related: ['〜に伴って']
  },
  {
    point: '〜に伴って',
    meaning: 'as, along with (change)',
    explain: 'Indicates a change in parallel with another change. 経済の発展に伴って、生活水準が上がった = "With economic development, living standards rose."',
    ex: [
      {jp:'人口増加に伴って、問題が増えた。',romaji:'Jinkō zōka ni tomonatte, mondai ga fueta.',en:'Problems increased along with population growth.'},
      {jp:'技術進歩に伴って、社会が変わった。',romaji:'Gijutsu shinpo ni tomonatte, shakai ga kawatta.',en:'Society changed along with technological progress.'}
    ],
    tip: 'Often used with nouns.',
    diff: 'Mastery',
    related: ['〜とともに']
  },
  {
    point: '〜たるもの',
    meaning: 'as a (someone of status), one who is',
    explain: 'Expresses the responsibility or nature of someone in a position. 教師たるもの、模範を示すべきだ = "As a teacher, one should set an example."',
    ex: [
      {jp:'リーダーたるもの、決断力が必要だ。',romaji:'Rīdā taru mono, ketsudanryoku ga hitsuyō da.',en:'As a leader, decisiveness is necessary.'},
      {jp:'国民（こくみん）たるもの、納税の義務がある。',romaji:'Kokumin taru mono, nōzei no gimu ga aru.',en:'As citizens, we have the duty to pay taxes.'}
    ],
    tip: 'Formal, used with nouns.',
    diff: 'Mastery',
    related: ['〜である以上']
  },
  {
    point: '〜に堪えない',
    meaning: 'cannot bear, cannot stand',
    explain: 'Expresses that something is unbearable. 悲しみに堪えない = "I cannot bear the sadness."',
    ex: [
      {jp:'彼の言葉は聞くに堪えないものだった。',romaji:'Kare no kotoba wa kiku ni taenai mono datta.',en:'His words were unbearable to hear.'},
      {jp:'読むに堪えない文章だ。',romaji:'Yomu ni taenai bunshō da.',en:'An unbearable article to read.'}
    ],
    tip: 'Often used with 見るに堪えない, 聞くに堪えない.',
    diff: 'Mastery',
    related: ['〜に耐えられない']
  },
  {
    point: '〜に足る',
    meaning: 'worthy of, deserving',
    explain: 'Indicates that something is worth doing or is sufficient. 信頼に足る人物だ = "A person worthy of trust."',
    ex: [
      {jp:'彼は賞賛に足る成果を上げた。',romaji:'Kare wa shōsan ni taru seika wo ageta.',en:'He achieved results worthy of praise.'},
      {jp:'この本は読むに足る価値がある。',romaji:'Kono hon wa yomu ni taru kachi ga aru.',en:'This book is worth reading.'}
    ],
    tip: 'Used with verbs.',
    diff: 'Mastery',
    related: ['〜に値する']
  },
  {
    point: '〜に値する',
    meaning: 'worthy of, deserve',
    explain: 'Indicates that something deserves a certain evaluation. 彼は尊敬に値する人物だ = "He is a person worthy of respect."',
    ex: [
      {jp:'この作品は賞に値する。',romaji:'Kono sakuhin wa shō ni atai suru.',en:'This work deserves a prize.'},
      {jp:'彼は称賛に値する努力をした。',romaji:'Kare wa shōsan ni atai suru doryoku wo shita.',en:'He made efforts worthy of praise.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Mastery',
    related: ['〜に足る']
  },
  {
    point: '〜と思いきや',
    meaning: 'just when I thought',
    explain: 'Indicates an unexpected result contrary to one\'s expectations. 終わったと思いきや、また始まった = "Just when I thought it was over, it started again."',
    ex: [
      {jp:'彼は来ると思いきや、来なかった。',romaji:'Kare wa kuru to omoiki ya, konakatta.',en:'Just when I thought he would come, he didn\'t.'},
      {jp:'成功したと思いきや、失敗だった。',romaji:'Seikō shita to omoiki ya, shippai datta.',en:'Just when I thought I had succeeded, it was a failure.'}
    ],
    tip: 'Used with verbs in past tense.',
    diff: 'Mastery',
    related: ['〜と思ったら']
  },
  {
    point: '〜と思ったら',
    meaning: 'as soon as, just when',
    explain: 'Indicates that something happened immediately after something else. 家を出たと思ったら、雨が降り出した = "Just as I left the house, it started to rain."',
    ex: [
      {jp:'彼が来たと思ったら、すぐに帰った。',romaji:'Kare ga kita to omottara, sugu ni kaetta.',en:'Just as he came, he left immediately.'},
      {jp:'寝たと思ったら、電話がかかってきた。',romaji:'Neta to omottara, denwa ga kakatte kita.',en:'Just as I went to sleep, the phone rang.'}
    ],
    tip: 'Used with verbs in past tense.',
    diff: 'Mastery',
    related: ['〜と思いきや']
  },
  {
    point: '〜ならでは',
    meaning: 'unique to, typical of',
    explain: 'Indicates something that is characteristic of a particular entity. 日本ならではの文化 = "Culture unique to Japan."',
    ex: [
      {jp:'プロならではの技術だ。',romaji:'Puro nara de no gijutsu da.',en:'Technique typical of a professional.'},
      {jp:'その土地ならではの味わいを楽しむ。',romaji:'Sono tochi nara de no ajiwai wo tanoshimu.',en:'Enjoy the taste unique to that region.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Mastery',
    related: ['〜に特有の']
  },
  {
    point: '〜に至って',
    meaning: 'to the extent that, to the point of',
    explain: 'Indicates a situation has reached a certain extent. ついにその域に至ってしまった = "It has finally reached that level."',
    ex: [
      {jp:'事態はここに至っている。',romaji:'Jitai wa koko ni itatte iru.',en:'The situation has reached this point.'},
      {jp:'彼の能力はプロの域に至っている。',romaji:'Kare no nōryoku wa puro no iki ni itatte iru.',en:'His ability has reached the level of a professional.'}
    ],
    tip: 'Used in formal writing.',
    diff: 'Mastery',
    related: ['〜に至る']
  },
  {
    point: '〜に至る',
    meaning: 'leads to, results in',
    explain: 'Indicates the result of a long process. この結果に至った過程が重要だ = "The process leading to this result is important."',
    ex: [
      {jp:'努力が成功に至った。',romaji:'Doryoku ga seikō ni itatta.',en:'Effort led to success.'},
      {jp:'長年の研究が発見に至った。',romaji:'Nagai nen no kenkyū ga hakken ni itatta.',en:'Years of research led to the discovery.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Mastery',
    related: ['〜に至って']
  },
  {
    point: '〜とはいえ',
    meaning: 'although, however',
    explain: 'Concession; indicates that the following clause contrasts with the previous one. 安いとはいえ、品質は良い = "Although it is cheap, the quality is good."',
    ex: [
      {jp:'学生とはいえ、彼は一流の知識を持っている。',romaji:'Gakusei to wa ie, kare wa ichiryū no chishiki wo motte iru.',en:'Although he is a student, he has top-level knowledge.'},
      {jp:'雨とはいえ、外出するのはやめよう。',romaji:'Ame to wa ie, gaishutsu suru no wa yameyou.',en:'Although it\'s raining, let\'s not go out.'}
    ],
    tip: 'Used with nouns and plain forms.',
    diff: 'Mastery',
    related: ['〜とは言え']
  },
  {
    point: '〜とは言え',
    meaning: 'although, even though',
    explain: 'Similar to 〜とはいえ. 彼は忙しいとは言え、時間を割いてくれた = "Although he is busy, he made time for me."',
    ex: [
      {jp:'才能があるとは言え、努力しなければならない。',romaji:'Sainō ga aru to wa ie, doryoku shinakereba naranai.',en:'Although he has talent, he must still work hard.'},
      {jp:'お金があるとは言え、無駄遣いは良くない。',romaji:'Okane ga aru to wa ie, mudazukai wa yokunai.',en:'Although I have money, spending wastefully is not good.'}
    ],
    tip: 'Often used with verbs.',
    diff: 'Mastery',
    related: ['〜とはいえ']
  },
  {
    point: '〜をものともせずに',
    meaning: 'in spite of, undeterred by',
    explain: 'Indicates doing something despite difficulties. 困難をものともせずに、彼は挑戦を続けた = "In spite of difficulties, he continued to challenge."',
    ex: [
      {jp:'雨をものともせずに、彼は走り続けた。',romaji:'Ame wo mono tomo sezu ni, kare wa hashiri tsuzuketa.',en:'Undeterred by the rain, he continued running.'},
      {jp:'危険をものともせずに、彼らは登頂した。',romaji:'Kiken wo mono tomo sezu ni, karera wa tochō shita.',en:'In spite of the danger, they reached the summit.'}
    ],
    tip: 'Formal, used in writing.',
    diff: 'Mastery',
    related: ['〜にもかかわらず']
  },
  {
    point: '〜をよそに',
    meaning: 'despite, contrary to (others\' concerns)',
    explain: 'Indicates that someone does something despite others\' expectations or concerns. 親の心配をよそに、彼は旅に出た = "Despite his parents\' worries, he went on a journey."',
    ex: [
      {jp:'周囲の反対をよそに、彼は決断を下した。',romaji:'Shūi no hantai wo yoso ni, kare wa ketsudan wo kudashita.',en:'Despite opposition, he made a decision.'},
      {jp:'不安をよそに、彼女は笑顔だった。',romaji:'Fuan wo yoso ni, kanojo wa egao datta.',en:'Despite anxiety, she was smiling.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Mastery',
    related: ['〜にもかかわらず']
  },
  {
    point: '〜なしには',
    meaning: 'without, cannot',
    explain: 'Similar to 〜なしでは. 君なしには生きられない = "I cannot live without you."',
    ex: [
      {jp:'あなたの助けなしにはできない。',romaji:'Anata no tasuke nashi ni wa dekinai.',en:'I cannot do it without your help.'},
      {jp:'忍耐なしには成功しない。',romaji:'Nintai nashi ni wa seikō shinai.',en:'Without patience, success is impossible.'}
    ],
    tip: 'Used with verbs.',
    diff: 'Mastery',
    related: ['〜なしでは']
  },
  {
    point: '〜に越したことはない',
    meaning: 'there is nothing better than, it\'s best to',
    explain: 'Expresses that it would be ideal. 早いに越したことはない = "There\'s nothing better than being early."',
    ex: [
      {jp:'健康に越したことはない。',romaji:'Kenkō ni koshita koto wa nai.',en:'There\'s nothing better than being healthy.'},
      {jp:'準備は十分に越したことはない。',romaji:'Junbi wa jūbun ni koshita koto wa nai.',en:'You can\'t have too much preparation.'}
    ],
    tip: 'Used with adjectives and nouns.',
    diff: 'Mastery',
    related: ['〜に限る']
  },
  {
    point: '〜の極み',
    meaning: 'the ultimate, the peak of',
    explain: 'Expresses the extreme of something. 贅沢の極み = "The ultimate luxury."',
    ex: [
      {jp:'彼の演奏は芸術の極みだ。',romaji:'Kare no ensō wa geijutsu no kiwami da.',en:'His performance is the pinnacle of art.'},
      {jp:'自然の美しさは感動の極みだ。',romaji:'Shizen no utsukushisa wa kandō no kiwami da.',en:'The beauty of nature is the ultimate in emotion.'}
    ],
    tip: 'Formal.',
    diff: 'Mastery',
    related: ['〜のきわみ']
  },
  {
    point: '〜に終わる',
    meaning: 'result in, end in',
    explain: 'Indicates the final result. 失敗に終わる = "End in failure."',
    ex: [
      {jp:'交渉は決裂に終わった。',romaji:'Kōshō wa ketsuretsu ni owatta.',en:'The negotiations ended in a breakdown.'},
      {jp:'努力が実を結び、成功に終わった。',romaji:'Doryoku ga mi wo musubi, seikō ni owatta.',en:'Effort bore fruit and ended in success.'}
    ],
    tip: 'Used with nouns.',
    diff: 'Mastery',
    related: ['〜に帰する']
  },
];

export { N1_GRAMMAR };