import Bar from "../components/Bar.js";
import STATES from "../states.js";
import * as style from "../style.js";
import * as AUX from "../../lib/auxiliary.js";
import Stats from "../components/Stats.js";
import Copy from "../../lib/Copy.js";
import {
  colorBullet
} from "../../lib/auxiliary.js";
import StateElement from "../components/StateElement.js";
import * as global from "../global.js";
import * as questionnaire from "./questionnaire.js";
import siteMenu from "./menu.js";

export const _mbti = new Binder("- - - -");
export const _feature = new Binder("#808080");
export const _copy = new Binder();


Copy.add({
  physical: {
    en: "Physical",
    es: "Físico",
  },
  rational: {
    en: "Rational",
    es: "Racional",
  },
  emotional: {
    en: "Emotional",
    es: "Emocional",
  },
  physically: {
    en: "Physically",
    es: "Físicamente",
  },
  rationally: {
    en: "Rationally",
    es: "Racionalmente",
  },
  emotionally: {
    en: "Emotionally",
    es: "Emocionalmente",
  },
  relaxed: {
    en: "detached",
    es: "desapegado",
  },
  flexible: {
    en: "observant",
    es: "observante",
  },
  intense: {
    en: "executive",
    es: "ejecutor",
  },
  disconnected: {
    en: "disconnected",
    es: "desapegado",
  },
  perceptible: {
    en: "perceptible",
    es: "perceptible",
  },
  determined: {
    en: "determined",
    es: "determinado",
  },
  only: {
    en: "only",
    es: "solo",
  },
  and: {
    en: "and",
    es: "y",
  },
});

const bars = {
  e: new Bar("Extro/Intro", "6em", "gray", true),
  s: new Bar("Sense/iNtuit", "6em", "red", "cyan"),
  t: new Bar("Think/Feel", "6em", "lime", "blue"),
  j: new Bar("Judge/Perceive", "6em", "white", "black"),
  id: new Bar("Id", "6em", "magenta"),
  ego: new Bar("Ego", "6em", "yellow"),
  sup: new Bar("Superego", "6em", "cyan"),
  r: new Bar(Copy.at.physical, "6em", "red"),
  g: new Bar(Copy.at.rational, "6em", "lime"),
  b: new Bar(Copy.at.emotional, "6em", "blue")
};

const INTROS = [
  [
    Copy.text({
      en: "Physical detachment (abstraction) may lead to withdrawal or aloofness",
      es: "el desapego físico (abstracción) puede conducir a alejamiento o ensimismamiento",
    }),
    undefined,
    Copy.text({
      en: "Physical execution (action) may lead to impatience or competitiveness",
      es: "La ejecución física (acción) puede llevar a impaciencia o competitividad",
    }),
  ],
  [
    Copy.text({
      en: "Rational detachment (instinction) may lead to impulsiveness or pattern projection",
      es: "el desapego racional (instinción) puede llevar a impulsividad o proyección de patrones",
    }),
    undefined,
    Copy.text({
      en: "Rational execution (regulation) may lead to rigidity or righteousnes",
      es: "la ejecución racional (regulación) puede llevar a rigidez o rectitud excesiva",
    }),
  ],
  [
    Copy.text({
      en: "Emotional detachment (objectivation) may lead to apathy or emotional distancing",
      es: "el desapego emocional (objetivación) puede llevar a apatía o distanciamiento emocional",
    }),
    undefined,
    Copy.text({
      en: "Emotional execution (valuation) may lead to bias or emotional reactivity",
      es: "la ejecución emocional (valoración) puede conducir a sesgo o reactividad emocional",
    }),
  ],
];

const TENDECIES = [
  Copy.text({
    es: "introvertida",
    en: "introverted",
  }),
  Copy.text({
    es: "ligeramente introvertida",
    en: "slightly introverted",
  }),
  Copy.text({
    es: "extrovertida",
    en: "extroverted",
  }),
  Copy.text({
    es: "altamente extrovertida",
    en: "highly extroverted",
  }),
];

const level = (d, i) => {
  const vals = ["2a", "80", "d5"];
  const icons = ["-", "o", "x"];
  const blank = colorBullet(`transparent`, " ");
  let bullet = [
    colorBullet(`#${vals[i]}0000`, icons[i]),
    colorBullet(`#00${vals[i]}00`, icons[i]),
    colorBullet(`#0000${vals[i]}`, icons[i]),
  ][d];
  bullet = [bullet, bullet, bullet][i];
  const dimension = [Copy.at.physically, Copy.at.rationally, Copy.at.emotionally][d];
  const level = [Copy.at.relaxed, Copy.at.flexible, Copy.at.intense][i];
  return {
    margin: "0.25em",
    html: `${bullet} ${dimension} ${level}`,
  };
};

var stateElt = new StateElement();

_feature.onChange(hex => {
  if (!hex) return;
  let code = hex.hexToCode();
  stateElt.code = code;
  _copy.value = new Copy(STATES[code]);
  let [r, g, b] = AUX.rgb(hex).map(v => v * 100 / 255);
  let getI = n => 100 * Math.pow(Math.abs(n - 50) / 50, 0.68);
  let j = (r + g + b) / 3;
  let t = 100 * g / (g + b);
  let s = 100 * r / (0.5 * (g + b) + r);
  let e = 100 - 100 * AUX.dist(r, g, b, 50, 50, 50) / AUX.dist(0, 0, 0, 50, 50, 50);
  //let e = 100 - (getI(r) + getI(g) + getI(b)) / 3;

  const binar = (v, A, B, N = "-", T = 100, D = 1) => v > T / 2 + D ? A : v < T / 2 - D ? B : N;
  _mbti.value = [binar(e, "E", "I"), binar(s, "S", "N"), binar(t, "T", "F"), binar(j, "J", "P")].join(" ");

  bars.r.value = r;
  bars.g.value = g;
  bars.b.value = b;
  bars.e.value = e;
  bars.s.value = s;
  bars.t.value = t;
  bars.j.value = j;
  bars.id.value = 0.5 * (r + b);
  bars.ego.value = 0.5 * (g + r);
  bars.sup.value = 0.5 * (g + b);

});

const _fixed = new Binder(false);

export const model = {
  main: {
    style: style.floatingSign,
    position: "relative",
    padding: "1.5em",
    h2: {
      textTransform: "capitalize",
      margin: 0,
      color: "black",
      textShadow: "none",
      text: _copy.as(copy => Copy.text({
        en: `The ${copy.at.archetype} state`,
        es: `El estado ${copy.at.archetype}`,
      })),
    },
    figure: stateElt,
    ul: _feature.as(v => ({
      textAlign: "left",
      margin: "0 auto",
      width: "fit-content",
      li: [...STATES[v.hexToCode()].code].map((n, i) => level(i, parseInt(n) || 0)),
    })),
    section: _copy.with(_feature).as((copy, hex) => {
      let code = [...STATES[hex.hexToCode()].code].map(n => parseInt(n));
      let ext = code.reduce((o, n) => n === 1 ? (o + 1) : o, 0);
      let s = ext === 1 ? "" : "s";
      let only = ext === 1 ? Copy.at.only : "";
      let intros = code.map((n, i) => INTROS[i][n]).filter(n => n);
      if (intros.length > 1) intros[intros.length - 1] = Copy.at.and + " " + intros[intros.length - 1];
      else if (!intros.length) intros = [Copy.text({
        es: "no hay tendecias ejecutivas o de desapego; es una psyque completamente abierta",
        en: "there are no executive or detached tendencies—this psyche is fully open",
      })];
      return {
        p: Copy.text({
          en: [
            `The state with the ${copy.at.tone} (${copy.at.color}) color is ${copy.at.philosophy}—the state of ${copy.at.concept}. It represents a psyche focused on ${copy.at.focus.toLocaleLowerCase()}—the archetypical ${copy.at.archetype}. It fits comfortably in spaces of ${copy.at.location}.`,
            `In this state there ${s?"are":"is"} ${only} ${ext} ${Copy.at.flexible} tendency${s}, which indicates a personality that is ${TENDECIES[ext]}. In this case: ${intros.join("; ").toLocaleLowerCase()}.`,
            `To learn to navigate this and other states of the 3D Psyche, please contact us (below) or consult our educational dossier.`,
          ],
          es: [
            `El estado de color ${copy.at.tone} (${copy.at.color}) es ${copy.at.philosophy}, el estado de ${copy.at.concept}. Representa una psique enfocada en ${copy.at.focus.toLocaleLowerCase()}. Como su arquetipo de ${copy.at.archetype}, se manifiesta a gusto en cualquier tipo de ${copy.at.location}.`,
            `En este estado tenemos ${only} ${ext} tendencia${s} ${Copy.at.flexible}${s}, lo que indica una personalidad ${TENDECIES[ext]}. En este caso: ${intros.join("; ").toLowerCase()}.`,
            `Para aprender a explorar este y los demás estados de la Psique Tridimensional, contáctanos (más abajo) o refiérete a nuestro dossier educativo.`,
          ],
        })
      };
    }),
  },
  section: {
    css: style.floatingSign,
    margin: "1em 0",
    padding: "1.5em",
    header: {
      marginBottom: "1em",
      h4: Copy.text({
        en: "Break down and extrapolation to other frameworks",
        es: "Desglose y extrapolación a otros sistemas.",
      }),
      small: _feature.as(v => Copy.text({
        en: `RGB color code: ${v}`,
        es: `Código de color RGB: ${v}`,
      })),
    },
    ul: {
      css: {
        fontSize: "small",
        display: "flex",
        flexWrap: "wrap",
        placeContent: "space-evenly",
        li_: {
          display: "inline-block ",
          margin: "0.5em 0",
          width: "9em",
          p: {
            margin: ".75em 0 0.25em"
          },
        },
      },
      position: _fixed.as("relative", "fixed"),
      backgroundColor: _fixed.as("none", style.lightScreen),
      padding: _fixed.as(0, "1rem"),
      flexDirection: _fixed.as("row", "column"),
      top: 0,
      left: 0,
      margin: 0,
      li: [
        new Stats("3D Psyche", [bars.r, bars.g, bars.b], true),
        new Stats("Freud", [bars.id, bars.ego, bars.sup], true),
        new Stats("Jung", [bars.e, bars.s, bars.t], true),
        new Stats("MBTI", [{
            display: "block",
            margin: "2em 0 0.5em",
            fontSize: "1.5em",
            fontFamily: "monospace",
            text: _mbti,
          },
          bars.j,
        ], true)
      ].map(s => ({
        stat: s,
      })),
    },
    menu: siteMenu,
    dragstart: () => _fixed.value = !_fixed.value,
  },
  a: {
    display: `block`,
    marginTop: `1em`,
    content: [{
      display: global.rgb ? `none` : `block`,
      href: DOM.bind([_feature, questionnaire._favorite], (r, f) => `./?global.rgb=${r.substr(1)}&color=${f.substr(1)}`),
      text: Copy.text({
        en: `Link to these results for you to save or share.`,
        es: `Enlace a estos resultados para guardarlos o compartirlos.`,
      }),
    }, !global.fav ? undefined : {
      margin: `0 auto`,
      padding: `0.5em 1em`,
      width: `fit-content`,
      borderRadius: `0.5em`,
      boxShadow: `1px 1px 2px #000c`,
      backgroundColor: global.fav,
      href: `./?global.rgb=${global.fav.substr(1)}`,
      target: `_blank`,
      text: Copy.text({
        en: `This is the result of your favorite color: ${global.fav}`,
        es: `Este es el resultado para tu color favorito: ${global.fav}`,
      }),
    }, {
      fontSize: `1.25em`,
      href: `./`,
      text: Copy.text({
        en: `${global.rgb ? `Take` : `Restart`} the test.`,
        es: `${global.rgb ? `Toma` : `Reinicia`} el test.`,
      }),
    }]
  },
};

export default model;