import { N5_KANA } from './n5/kana.js';
import { N5_KANJI } from './n5/kanji.js';
import { N5_VOCAB } from './n5/vocab.js';
import { N5_GRAMMAR } from './n5/grammar.js';
import { N5_GRAMMARQ } from './n5/grammarq.js';
import { N5_READING } from './n5/reading.js';
import { N5_NUMBERS } from './n5/numbers.js';
import { N4_KANJI } from './n4/kanji.js';
import { N4_VOCAB } from './n4/vocab.js';
import { N4_GRAMMAR } from './n4/grammar.js';
import { N4_GRAMMARQ } from './n4/grammarq.js';
import { N4_READING } from './n4/reading.js';

/* Level registry — the single source of truth for all JLPT levels.
   To add a level later (N3 / N2 / N1): drop a src/levels/<id>/ folder with the
   same data files and add one entry here. No engine changes are needed. */
var LEVELS = {
  n5: {
    id:'n5', label:'N5', tag:'JLPT N5 · Beginner', blurb:'Learn Japanese from zero.',
    kana:N5_KANA, kanji:N5_KANJI, vocab:N5_VOCAB, grammar:N5_GRAMMAR, grammarq:N5_GRAMMARQ, reading:N5_READING, numbers:N5_NUMBERS,
    decks:[['hira','Hiragana'],['kata','Katakana'],['kanji','Kanji'],['vocab','Vocabulary'],['grammar','Grammar']],
    hasKana:true, hasNumbers:true, next:'n4',
    mock:{ secs:20*60, mix:{Vocabulary:6,Kanji:4,Grammar:4,Reading:3,Listening:3} }
  },
  n4: {
    id:'n4', label:'N4', tag:'JLPT N4 · Elementary', blurb:'Build on your N5 foundation.',
    kana:N5_KANA, kanji:N4_KANJI, vocab:N4_VOCAB, grammar:N4_GRAMMAR, grammarq:N4_GRAMMARQ, reading:N4_READING, numbers:{hours:[],minutes:[],big:[],counters:[]},
    decks:[['kanji','Kanji'],['vocab','Vocabulary'],['grammar','Grammar']],
    hasKana:false, hasNumbers:false, next:null,
    mock:{ secs:25*60, mix:{Vocabulary:7,Kanji:5,Grammar:6,Reading:4,Listening:3} }
  }
  
};
var LEVEL_ORDER = ['n5','n4',];

export { LEVELS, LEVEL_ORDER };
