import * as style from "../style.js";
import * as AUX from "../../lib/auxiliary.js";
import QUESTIONS from "../questions.js";
import Copy from "../../lib/Copy.js";

/* Methods to calculate the results */

export const _favorite = new Binder('#808080');
export const _results = new Binder('#808080');
export const _qCounter = new Binder(-3);

const sampleQuestions = [{
  question: Copy.text({
    en: "How much do you like these colors?",
    es: "Qué tanto te gustan estos colores?",
  }),
  options: [{
      choice: Copy.text({
        en: "Reds",
        es: "Rojos",
      }),
      hint: Copy.text({
        en: "scarlet, maroon, brick",
        es: "escarlata, vino, labrillo",
      }),
    },
    {
      choice: Copy.text({
        en: "Greens",
        es: "Verdes",
      }),
      hint: Copy.text({
        en: "lime, army, mint",
        es: "lima, olivo, menta",
      }),
    },
    {
      choice: Copy.text({
        en: "Blues",
        es: "Azules",
      }),
      hint: Copy.text({
        en: "sky, sapphire, navy",
        es: "cielo, safiro, marino",
      }),
    }
  ]
}, {
  question: Copy.text({
    en: "Adjust your color preference given these tendencies.",
    es: "Ajusta tu preferencia de color de acuerdo a estas tendencias.",
  }),
  options: [
    [{
      choice: Copy.text({
        en: "Neutral",
        es: "Opaco",
      }),
    }, {
      choice: Copy.text({
        en: "Bright",
        es: "Brillante",
      }),
    }],
    [{
      choice: Copy.text({
        en: "Dark",
        es: "Oscuro",
      }),
    }, {
      choice: Copy.text({
        en: "Light",
        es: "Claro",
      }),
    }]
  ]
}];


const frequencies = [Copy.text({
  en: 'Rarely',
  es: "Raramente",
}), Copy.text({
  en: 'Seldom',
  es: "Escasamente",
}), Copy.text({
  en: 'Occasionally',
  es: "Ocasionalmente",
}), Copy.text({
  en: 'Probably',
  es: "Probablemente",
}), Copy.text({
  en: 'Normally',
  es: "Normalmente",
}), Copy.text({
  en: 'Frequently',
  es: "Fequentemente",
}), Copy.text({
  en: 'Generally',
  es: "Generalmente",
}), Copy.text({
  en: 'Usually',
  es: "Usualmente",
}), Copy.text({
  en: 'Extremely',
  es: "Extremadamente",
})];

let mqCounter = 1;

const modelQuestion = q => {
  q.answers = [];
  q.name = _qCounter.value + mqCounter++;
  q.model = {
    a: {
      name: 'q' + q.name,
    },
    section: {
      display: _qCounter.as(n => n >= q.name ? 'block' : 'none'),
      marginTop: q.question ? '2em' : undefined,
      borderRadius: '1em',
      overflow: 'hidden',
      h3: !q.question ? undefined : {
        color: '#fff',
        backgroundColor: style.darkScreen,
        padding: '0.6em 1em',
        text: q.question,
      },
      ul: {
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        li: q.options.map(o => {
          var isVS = Array.isArray(o);
          if (!isVS) o = [o];
          var answer = new Binder(50);
          q.answers.push(answer);
          return {
            backgroundColor: style.whiteScreen,
            margin: '1px 0',
            padding: '0.68em',
            position: 'relative',
            order: Math.floor(100 * Math.random()),
            label: {
              margin: `0 1em`,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              div: o.map((option, i) => new Object({
                div: {
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  fontFamily: 'title',
                  marginTop: '0.5em',
                  textShadow: 'none',
                  span: [
                    isVS && !i ? '← ' : undefined,
                    option.choice,
                    isVS && i ? ' →' : undefined,
                  ],
                },
                p: {
                  display: isVS && '!i' ? '← ' : undefined,
                  textAlign: 'center',
                  fontSize: 'small',
                  text: option.hint,
                }
              }))
            },
            section: {
              display: 'flex',
              justifyContent: 'space-between',
              span: [{
                width: '21%',
                maxWidth: '8em',
                overflowX: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '0.7em',
                color: '#0175ff',
                text: answer.as(v => frequencies[Math.floor(v * frequencies.length / 100)]),
              }, {
                position: 'relative',
                width: '-webkit-fill-available',
                input: {
                  height: '0.7em',
                  width: '100%',
                  type: 'range',
                  appearance: isVS ? 'none' : undefined,
                  min: 0,
                  max: 100,
                  value: answer.value,
                  oninput: e => {
                    answer.value = parseInt(e.target.value);
                    updateResults();
                  }
                },
                div: {
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  pointerEvents: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: '#0175ff',
                  width: '100%',
                  fontSize: '0.7em',
                  pointerEvents: 'none',
                  b:' ··· '.split(''),
                },
              }, {
                width: '4em',
                fontSize: '0.7em',
                color: '#0175ff',
                text: answer.as(v => v + '%'),
              }],
            },
          }
        })
      }
    },
  }
  return q;
};

const samples = sampleQuestions.map(q => modelQuestion(q).model);
const questions = new Binder(QUESTIONS.map(modelQuestion));

export const questionnaire = {
  style: style.section,
  a: {
    name: 'q-2',
  },
  header: {
    p: {
      style: style.floatingSign,
      backgroundColor: style.darkScreen,
      color: 'white',
      html: Copy.text({
        en: 'The following questionaire averages your answers and map them to a state—a color archetype in the cube. To answer it, you must rate each option individually, but compare them to others in the same group.',
        es: 'El siguiente cuestionario promedia tus respuestas y las asigna a un estado, a un arquetipo de color en el cubo. Para responder, debes calificar cada opción individualmente, pero compararlas con las demás del mismo grupo.'
      })
    },
    h2: Copy.text({
      en: "Example<br/><small>(This won't influence the results)</small>",
      es: "Ejemplo<br/><small>(Esto no influenciará el resultado)</small>",
    }),
    section: samples,
    a: {
      marginTop: '1em',
      target: '_blank',
      display: _qCounter.as(v => v < 0 ? 'none' : 'block'),
      text: _favorite.as(v => Copy.text({
        en: 'The RGB code for the resulting color is: ',
        es: "El código RGB para el color resultante es:",
      }) + v),
      href: _favorite.as(v => './?rgb=' + v.substr(1)),
    },
  },
  main: {
    marginTop: '4em',
    display: _qCounter.as(n => n >= 0 ? 'block' : 'none'),
    a: {
      name: 'q0',
    },
    h2: Copy.text({
      en: 'Questionaire',
      es: "Cuestionario",
    }),
    section: questions.as(qs => qs.map(q => q.model)),
  }
};


const getAverage = (first, last) => {
  var output = Array(questions.value[first].answers.length).fill(0);
  questions.value.filter((q, i) => i >= first && i <= last).forEach(q => output = output.plus(q.answers.map(a => !q.reverse ? a.value : 100 - a.value)));
  return output.map(v => v / (last - first + 1));
}

const updateResults = _ => {
  // Sample question favorite color
  _favorite.value = AUX.hex(
    ...sampleQuestions[0].answers.map(v => v.value * 255 / 100),
    ...sampleQuestions[1].answers.map(v => v.value)
  );
  //PRE results
  let rgb = getAverage(0, 5).map(v => v * 255 / 100);
  let light = getAverage(0, 9);
  let sat = getAverage(10, 13);
  //console.log(rgb, sats, lights, );
  let R = AUX.rgb(AUX.hex(...rgb, sat[0], light[0]))[0];
  let G = AUX.rgb(AUX.hex(...rgb, sat[1], light[1]))[1];
  let B = AUX.rgb(AUX.hex(...rgb, sat[2], light[2]))[2];
  //_results.value = AUX.hex(R, G, B);
  let [r, g, b] = AUX.rgb(AUX.hex(...rgb,
    sat.reduce((o, v) => v + o, 0) / 3,
    light.reduce((o, v) => v + o, 0) / 3,
  ));
  //_results.value = AUX.hex(r, g, b);
  _results.value = AUX.hex((R + r) / 2, (G + g) / 2, (B + b) / 2);
};

export default questionnaire;