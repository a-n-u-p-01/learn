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
import { N3_KANJI } from './n3/kanji.js';
import { N3_VOCAB } from './n3/vocab.js';
import { N3_GRAMMAR } from './n3/grammar.js';
import { N3_GRAMMARQ } from './n3/grammarq.js';
import { N3_READING } from './n3/reading.js';
import { N2_KANJI } from './n2/kanji.js';
import { N2_VOCAB } from './n2/vocab.js';
import { N2_GRAMMAR } from './n2/grammar.js';
import { N2_GRAMMARQ } from './n2/grammarq.js';
import { N2_READING } from './n2/reading.js';
import { N1_KANJI } from './n1/kanji.js';
import { N1_VOCAB } from './n1/vocab.js';
import { N1_GRAMMAR } from './n1/grammar.js';
import { N1_GRAMMARQ } from './n1/grammarq.js';
import { N1_READING } from './n1/reading.js';

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
    hasKana:false, hasNumbers:false, next:'n3',
    mock:{ secs:25*60, mix:{Vocabulary:7,Kanji:5,Grammar:6,Reading:4,Listening:3} }
  },
    n3: {
    id:'n3', label:'N3', tag:'JLPT N3 · Intermediate', blurb:'Bridge the gap to advanced Japanese.',
    kana:null, kanji:N3_KANJI, vocab:N3_VOCAB, grammar:N3_GRAMMAR, grammarq:N3_GRAMMARQ, reading:N3_READING, numbers:{hours:[],minutes:[],big:[],counters:[]},
    decks:[['kanji','Kanji'],['vocab','Vocabulary'],['grammar','Grammar']],
    hasKana:false, hasNumbers:false, next:'n2',
    mock:{ secs:30*60, mix:{Vocabulary:8,Kanji:6,Grammar:7,Reading:5,Listening:4} }
  },

    n2: {
    id:'n2', label:'N2', tag:'JLPT N2 · Advanced', blurb:'Master Japanese for academic and professional settings.',
    kana:null, kanji:N2_KANJI, vocab:N2_VOCAB, grammar:N2_GRAMMAR, grammarq:N2_GRAMMARQ, reading:N2_READING, numbers:{hours:[],minutes:[],big:[],counters:[]},
    decks:[['kanji','Kanji'],['vocab','Vocabulary'],['grammar','Grammar']],
    hasKana:false, hasNumbers:false, next:'n1',
    mock:{ secs:35*60, mix:{Vocabulary:9,Kanji:6,Grammar:8,Reading:6,Listening:5} }
  },  
  n1: {
    id:'n1', label:'N1', tag:'JLPT N1 · Mastery', blurb:'The highest level of Japanese proficiency.',
    kana:null, kanji:N1_KANJI, vocab:N1_VOCAB, grammar:N1_GRAMMAR, grammarq:N1_GRAMMARQ, reading:N1_READING, numbers:{hours:[],minutes:[],big:[],counters:[]},
    decks:[['kanji','Kanji'],['vocab','Vocabulary'],['grammar','Grammar']],
    hasKana:false, hasNumbers:false, next:null,
    mock:{ secs:40*60, mix:{Vocabulary:10,Kanji:6,Grammar:8,Reading:6,Listening:5} }
  },
  
};
var LEVEL_ORDER = ['n5','n4','n3','n2','n1'];

export { LEVELS, LEVEL_ORDER };
