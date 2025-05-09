import * as questionnaire from "./questionnaire.js";
import * as results from "./results.js";
import * as STYLE from "../style.js";
import Copy from '../../lib/Copy.js';
import QUESTIONS from "../questions.js";
import * as global from "../global.js";

const qTotal = QUESTIONS.length - 1;

questionnaire._results.bind(results._feature);

if (global.rgb) results._feature.value = global.rgb;

export const siteTest = {
  section: {
    display: questionnaire._qCounter.as(n => n >= -2 ? 'block' : 'none'),
    content: global.rgb ? undefined : questionnaire.questionnaire,
  },
  button: {
    text: questionnaire._qCounter.as({
      [-3]: Copy.text({
        en: 'Take the test',
        es: 'Toma el test',
      }),
      [-1]: Copy.text({
        en: 'Start',
        es: 'Comenzar',
      }),
      [qTotal]: Copy.text({
        en: 'Results',
        es: 'Resultados',
      }),
      default: Copy.text({
        en: 'Next',
        es: 'Siguiente',
      }),
    }),
    background: `linear-gradient(to bottom, #0000 0%, #0000 85%, #000c 100%)`,
    backgroundColor: questionnaire._qCounter.as({
      [-3]: '#000a',
      [-1]: '#000a',
      [qTotal]: '#000a',
      default: '#fffa',
    }),
    color: questionnaire._qCounter.as({
      [-3]: '#fff',
      [-1]: '#fff',
      [qTotal]: '#fff',
      default: '#000',
    }),
    boxShadow: '1px 1px 3px black',
    fontSize: '1.2em',
    margin: '-1em auto 3em',
    borderRadius: '2em',
    padding: '0.6em 3em',
    display: global.rgb ? 'none' : questionnaire._qCounter.as(n => n > qTotal ? 'none' : 'block'),
    click: () => {
      questionnaire._qCounter.value = questionnaire._qCounter.value + 1;
      location.href = "#q" + questionnaire._qCounter.value;
    },
  },
  div: global.rgb ? undefined : {
    display: questionnaire._qCounter.as(n => n > qTotal ? 'block' : 'none'),
    height: `60rem`,
    background: global.rgb ? global.rgb : results._feature.as(v => `linear-gradient(to bottom, ${questionnaire._favorite.value} 0%, ${v} 100%)`),
  },
  footer: {
    display: global.rgb ? undefined : questionnaire._qCounter.as(n => n > qTotal ? 'block' : 'none'),
    backgroundColor: global.rgb ? global.rgb : results._feature,
    background: 'linear-gradient(#8880 0%, #8880 70%, #000a 100%)',
    a: {
      name: 'q14',
    },
    section: {
      style: STYLE.section,
      display: `flex`,
      flexDirection: `column`,
      h2: global.rgb && !global.fav ? undefined : Copy.text({
        en: `Results`,
        es: `Resultados`,
      }),
      small: global.rgb && !global.fav ? undefined : {
        margin: `1em 0 -2.25em -11em`,
        zIndex: 1,
        text: Copy.text({
          en: `Closest state:`,
          es: `Estado más cercano:`,
        }),
      },

      main: results.model,
    }
  },
};

export default siteTest;