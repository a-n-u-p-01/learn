// JLPT N5 numbers, time & counters reference
var N5_NUMBERS = {
  hours: [
    {jp:'一時',k:'いちじ',e:'1:00'},
    {jp:'二時',k:'にじ',e:'2:00'},
    {jp:'三時',k:'さんじ',e:'3:00'},
    {jp:'四時',k:'よじ',e:'4:00 ·irregular'},
    {jp:'五時',k:'ごじ',e:'5:00'},
    {jp:'六時',k:'ろくじ',e:'6:00'},
    {jp:'七時',k:'しちじ',e:'7:00 ·irregular'},
    {jp:'八時',k:'はちじ',e:'8:00'},
    {jp:'九時',k:'くじ',e:'9:00 ·irregular'},
    {jp:'十時',k:'じゅうじ',e:'10:00'},
    {jp:'十一時',k:'じゅういちじ',e:'11:00'},
    {jp:'十二時',k:'じゅうにじ',e:'12:00'}
  ],
  minutes: [
    {jp:'一分',k:'いっぷん',e:'1 min'},
    {jp:'二分',k:'にふん',e:'2 min'},
    {jp:'三分',k:'さんぷん',e:'3 min'},
    {jp:'四分',k:'よんぷん',e:'4 min'},
    {jp:'五分',k:'ごふん',e:'5 min'},
    {jp:'六分',k:'ろっぷん',e:'6 min'},
    {jp:'七分',k:'ななふん',e:'7 min'},
    {jp:'八分',k:'はっぷん',e:'8 min'},
    {jp:'九分',k:'きゅうふん',e:'9 min'},
    {jp:'十分',k:'じゅっぷん',e:'10 min'},
    {jp:'三十分',k:'さんじゅっぷん',e:'30 min'},
    {jp:'半',k:'はん',e:'half past'}
  ],
  big: [
    {jp:'百',k:'ひゃく',e:'100'},
    {jp:'三百',k:'さんびゃく',e:'300 ·sound change'},
    {jp:'六百',k:'ろっぴゃく',e:'600 ·sound change'},
    {jp:'八百',k:'はっぴゃく',e:'800 ·sound change'},
    {jp:'千',k:'せん',e:'1,000'},
    {jp:'三千',k:'さんぜん',e:'3,000 ·sound change'},
    {jp:'八千',k:'はっせん',e:'8,000 ·sound change'},
    {jp:'一万',k:'いちまん',e:'10,000'}
  ],
  counters: [
    {c:'〜つ',k:'-tsu',use:'general things (1–10)',ex:'ひとつ・ふたつ・みっつ … とお',say:'ひとつ、ふたつ、みっつ'},
    {c:'〜人',k:'-nin',use:'people',ex:'ひとり・ふたり・さんにん・よにん',say:'ひとり、ふたり、さんにん'},
    {c:'〜本',k:'-hon',use:'long thin things',ex:'いっぽん・にほん・さんぼん・ろっぽん',say:'いっぽん、にほん、さんぼん'},
    {c:'〜枚',k:'-mai',use:'flat thin things',ex:'いちまい・にまい・さんまい',say:'いちまい、にまい、さんまい'},
    {c:'〜冊',k:'-satsu',use:'books, magazines',ex:'いっさつ・にさつ・さんさつ',say:'いっさつ、にさつ、さんさつ'},
    {c:'〜匹',k:'-hiki',use:'small animals',ex:'いっぴき・にひき・さんびき',say:'いっぴき、にひき、さんびき'},
    {c:'〜台',k:'-dai',use:'machines, vehicles',ex:'いちだい・にだい・さんだい',say:'いちだい、にだい、さんだい'},
    {c:'〜回',k:'-kai',use:'times (frequency)',ex:'いっかい・にかい・さんかい',say:'いっかい、にかい、さんかい'},
    {c:'〜歳 / 才',k:'-sai',use:'age',ex:'いっさい・にさい …（20＝はたち）',say:'いっさい、にさい、はたち'},
    {c:'〜円',k:'-en',use:'yen (money)',ex:'ひゃくえん・せんえん',say:'ひゃくえん、せんえん'},
    {c:'〜時間',k:'-jikan',use:'hours (duration)',ex:'いちじかん・にじかん・さんじかん',say:'いちじかん、にじかん'},
    {c:'〜番',k:'-ban',use:'order / number',ex:'いちばん・にばん・さんばん',say:'いちばん、にばん、さんばん'}
  ]
};

export { N5_NUMBERS };
