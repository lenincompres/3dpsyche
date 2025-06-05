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
import Cube from "../components/Cube.js";

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
  detached: {
    en: "detached",
    es: "desapegado",
  },
  observant: {
    en: "observant",
    es: "observante",
  },
  executive: {
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
  sensation: {
    en: "sensation",
    es: "sensación",
  },
  sensationDefinition: {
    en: "physical observation",
    es: "observación física",
  },
  sensationTendency: {
    en: "alertness, distraction, and also overstimulation",
    es: "la vigilancia, la distracción y también la sobrestimulación",
  },
  conception: {
    en: "conception",
    es: "concepción",
  },
  conceptionDefinition: {
    en: "rational observation",
    es: "observación racional",
  },
  conceptionTendency: {
    en: "curiosity, second-guessing, and also indecision",
    es: "la curiosidad, la duda y también la indecisión",
  },
  inspiration: {
    en: "inspiration",
    es: "inspiración",
  },
  inspirationDefinition: {
    en: "emotional observation",
    es: "observación emocional",
  },
  inspirationTendency: {
    en: "empathy, emotional contagion, and also people-pleasing",
    es: "la empatía, el contagio emocional y también la complacencia",
  },
  abstraction: {
    en: "abstraction",
    es: "abstracción",
  },
  abstractionTendency: {
    en: "withdrawal or aloofness",
    es: "el alejamiento o ensimismamiento",
  },
  abstractionDefinition: {
    en: "Physical detachment",
    es: "el desapego físico",
  },
  action: {
    en: "action",
    es: "acción",
  },
  actionTendency: {
    en: "impatience or competitiveness",
    es: "la impaciencia o competitividad",
  },
  actionDefinition: {
    en: "Physical execution",
    es: "la ejecución física",
  },
  instinction: {
    en: "instinction",
    es: "instinción",
  },
  instinctionTendency: {
    en: "impulsiveness or projection of patterns",
    es: "la impulsividad o proyección de patrones",
  },
  instinctionDefinition: {
    en: "Rational detachment",
    es: "el desapego racional",
  },
  regulation: {
    en: "regulation",
    es: "regulación",
  },
  regulationDefinition: {
    en: "Rational execution",
    es: "la ejecución racional",
  },
  regulationTendency: {
    en: "rigidity or righteousnes",
    es: "la rigidez o rectitud excesiva",
  },
  objectivation: {
    en: "objectivation",
    es: "objetivación",
  },
  objectivationTendency: {
    en: "apathy or emotional distancing",
    es: "la apatía o distanciamiento emocional",
  },
  objectivationDefinition: {
    en: "Emotional detachment",
    es: "el desapego emocional",
  },
  valuation: {
    en: "valuation",
    es: "valoración",
  },
  valuationTendency: {
    en: "bias or emotional reactivity",
    es: "el sesgo o reactividad emocional",
  },
  valuationDefinition: {
    en: "Emotional execution",
    es: "la ejecución emocional",
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

const FOCI = [
  ['abstraction', 'sensation', 'action'],
  ['instinction', 'conception', 'regulation'],
  ['objectivation', 'inspiration', 'valuation'],
];
const introText = (a) => {
  if (FOCI.map(f => f[1]).includes(a)) return;
  let [definition, focus, tendency] = [Copy.at[a + 'Definition'], Copy.at[a], Copy.at[a + 'Tendency']];
  return Copy.text({
    en: `${definition}—which enables ${focus}—may lead to ${tendency}`,
    es: `${definition}, que le proporciona la ${focus}, también promueve ${tendency}`,
  });
};
const extroText = (a) => {
  const extros = FOCI.map(f => f[1]);
  if (!extros.includes(a)) return;
  let [dimenssion, focus, tendency] = [Copy.at[a + 'Definition'], Copy.at[a], Copy.at[a + 'Tendency']];
  return  Copy.text({
    en: `${dimenssion} (${focus}), which implies ${tendency}`,
    es: `la ${dimenssion} (${focus}), que implica ${tendency}`,
  });;
};

const TENDECIES = [
  Copy.text({
    es: "altamente introvertida",
    en: "highly introverted",
  }),
  Copy.text({
    es: "ligeramente introvertida",
    en: "slightly introverted",
  }),
  Copy.text({
    es: "raramente introvertida",
    en: "rarely introverted",
  }),
  Copy.text({
    es: "para nada introvertida",
    en: "never introverted",
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
  const level = [Copy.at.detached, Copy.at.observant, Copy.at.executive][i];
  return {
    margin: "0.25em",
    html: `${bullet} ${dimension} ${level}`,
  };
};

var stateElt = new StateElement();
var vicinityElt = new Cube({
  vicinity: true,
  width: 250,
  height: 200,
  onclick: state => state && state.code && (window.location.href = "./?rgb=" + state.code.codeToHex()),
});

_feature.onChange(hex => {
  if (!hex) return;
  let code = hex.hexToCode();
  stateElt.code = code;
  vicinityElt.center = code;
  _copy.value = new Copy(STATES[code]);
  let [r, g, b] = AUX.rgb(hex).map(v => v * 100 / 255);
  //let getI = n => 100 * Math.pow(Math.abs(n - 50) / 50, 0.68);
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
    section: [
      _copy.with(_feature).as((copy, hex) => {
        let code = [...STATES[hex.hexToCode()].code].map(n => parseInt(n));
        let ext = code.reduce((o, n) => n === 1 ? (o + 1) : o, 0);
        let s = ext === 1 ? "" : "s";
        let only = ext === 1 ? Copy.at.only : "";
        let intros = code.map((n, i) => introText(FOCI[i][n])).filter(n => n);
        if (intros.length > 1) intros[intros.length - 1] = Copy.at.and + " " + intros[intros.length - 1];
        else if (!intros.length) intros = [Copy.text({
          es: "no hay tendecias ejecutivas o de desapego; es una psyque completamente abierta, lo que también la hace condicionada o sensible al ambiente social o entorno",
          en: "there are no executive or detached tendencies—this psyche is fully open, which also makes it conditioned o sensitive to the social or immediate environment",
        })];

        let extros = code.map((n, i) => extroText(FOCI[i][n])).filter(n => n);
        if (extros.length > 1) extros[extros.length - 1] = Copy.at.and + " " + extros[extros.length - 1];
        if(extros.length) extros = Copy.text({
          en: `In terms of extroversion, its openness comes through ${extros.join("; ")}.`,
          es: `En cuanto a la extrovesión, su apertura proviene de ${extros.join("; ")}.`,
        }); 
        return {
          p: [
            Copy.text({
              en: [
                `The state with the ${copy.at.tone} (${copy.at.color}) color is ${copy.at.philosophy}—the state of ${copy.at.concept}. It represents a psyche focused on ${copy.at.focus.toLocaleLowerCase()}—the archetypical ${copy.at.archetype}, fostered by environments such as ${copy.at.location}.`,
                `This state ${s?"have":"has"} ${only} ${['zero', 'one', 'two', 'three'][ext]} out of three ${Copy.at.observant} dimenssions, which suggests a personality that is ${TENDECIES[ext]}. In this case: ${intros.join("; ").toLocaleLowerCase()}.`,
                `${extros}`,
                `If you received this state in your test results and it feels somewhat accurate, consider which of the adjacent states is your second closest. You may find yourself split between the two. Sometimes, identity lies not in one state, but in the habitual movement between many.`,
              ],
              es: [
                `El estado de color ${copy.at.tone} (${copy.at.color}) es ${copy.at.philosophy}, el estado de ${copy.at.concept}. Representa una psique enfocada en ${copy.at.focus.toLocaleLowerCase()}. Como su arquetipo de ${copy.at.archetype}, se fomenta en entornos de ${copy.at.location}.`,
                `Este estado presenta ${only} ${['cero', 'una', 'dos', 'tres'][ext]} de las tres dimensiones de la psyche como ${Copy.at.observant}${s}, lo que indica una personalidad ${TENDECIES[ext]}. En este caso: ${intros.join("; ").toLowerCase()}.`,
                `${extros}`,
                `Si obtuviste este estado en tus resultados y te parece un poco acertado, considera cuál de los estados adyacentes podría ser el segundo más cercano a ti. Puede que te encuentres en medio de ambos. A veces, la identidad no reside en un solo estado, sino en el movimiento habitual entre varios.`,
              ],
            }), {
              tag: 'h3',
              text: Copy.text({
                en: 'Adjacent States',
                es: 'Estados adyacentes',
              }),
            }, {
              tag: 'figure',
              display: 'flex',
              justifyContent: 'center',
              canvas: vicinityElt,
            },
            Copy.text({
              en: [
                !ext ? undefined : `You may also find yourself split between two opposite states on the adjacent spectrum, and the test may have mistakenly averaged your result into this one. Sometimes, this suggests that you may be more introverted than this state implies.`,
                ext > 2 ? undefined : `Alternatively, consider whether your second closest state is an adjacent that seems far away in the color spectrum—indicating an internal (introverted) link.`,
                `To learn to navigate this and other states of the 3D Psyche, please contact us (below) or consult our manifest and educational dossier.`,
              ],
              es: [
                !ext ? undefined : `También puede que te muevas entre dos estados opuestos dentro de este espectro adyacente, y que el test haya promediado erróneamente tu resultado en este. A veces, esto sugiere que podrías ser más introvertido de lo que este estado indica.`,
                ext > 2 ? undefined : `Alternativamente, considera si tu segundo estado más cercano es un adyacente que parece lejano en el espectro de color—lo que indica un vínculo interno (introvertido).`,
                `Para aprender a explorar este y los demás estados de la Psique Tridimensional, contáctanos (más abajo) o refiérete a nuestro manifiesto y dossier educativo.`,
              ],
            }),
          ]
        };
      }),
    ],
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
            fontWeight: 'bold',
            display: "block",
            margin: "1em 0",
            fontSize: "2em",
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