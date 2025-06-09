import Copy from "../../lib/Copy.js";
import Collapsable from "../components/Collapsable.js";
import * as STYLE from "../style.js";
import {
  colorBullet
} from "../../lib/auxiliary.js";
import Cube from "../components/Cube.js";
import * as global from "../global.js";
import siteMenu from "./menu.js";

export default {
  main: {
    css: {
      h2: {
        color: 'black',
        textShadow: `none`,
      },
    },
    backgroundColor: STYLE.lightScreen,

    header: {
      maxWidth: "740px",
      width: "calc(100% - 2rem)",
      margin: "0 auto 1rem",
      label: {
        for: "Cube",
        h2: Copy.text({
          en: "Explore the dimensions of your mind.",
          es: "Explora las dimensiones de tu mente.",
        })
      },
    },

    figure: {
      margin: "-1em auto 0",
      content: new Cube({
        onclick: state => state && state.code && (window.location.href = "./?rgb=" + state.code.codeToHex()),
      }),
    },

    main: {
      maxWidth: "740px",
      width: "calc(100% - 4rem)",
      lineHeight: "2.5em",
      margin: "1em auto 0",
      textAlign: "left",
      lineHeight: "1.5em",
      css: {
        "collabsable-section>a": {
          borderTop: `solid 1px black`,
        },
        a: {
          color: "black",
        }
      },
      section: [{
          p: Copy.text({
            en: `This psychometric tool maps your states of focus across three internal dimensions: <b style="color:darkred">physical</b> (${STYLE.getIcon('arrowDL')}), <b style="color:darkgreen">rational</b> (${STYLE.getIcon('arrowU')}) & <b style="color:darkblue">emotional</b> (${STYLE.getIcon('arrowDR')}). In each, we interact with the world through <b>observation</b>, <b>execution</b>, and <b>detachment</b>.`,
            es: `Esta herramienta psicométrica asigna estados de enfoque a tres dimensiones en nuestro panorama interno: <b style="color:darkred">física</b> (${STYLE.getIcon('arrowDL')}), <b style="color:darkgreen">racional</b> (${STYLE.getIcon('arrowU')}) y <b style="color:darkblue">emocional</b> (${STYLE.getIcon('arrowDR')}). En cada una interactuamos con <b>observación</b>, <b>ejecución</b> y <b>desapego</b>.`,
          }),
        }, new Collapsable({
            div: [{
              h3: Copy.text({
                en: 'Observation: how we take in information and stimuli.',
                es: 'Observación: cómo asimilamos información y estímulos.',
              }),
              ul: {
                li: Copy.text({
                  en: [
                    `${colorBullet('#800', 'o')} Physical observation (sensation): sensory awareness of surroundings`,
                    `${colorBullet('#080', 'o')} Rational observation (conception): grasping ideas, meanings, and patterns`,
                    `${colorBullet('#008', 'o')} Emotional observation (inspiration): feeling moods, vibes, and empathy`,
                  ],
                  es: [
                    `${colorBullet('#800', 'o')} Observación física (sensación): percibir el entorno sensorial inmediato.`,
                    `${colorBullet('#080', 'o')} Observación racional (concepción): contemplar ideas, significados y datos.`,
                    `${colorBullet('#008', 'o')} Observación emocional (inspiración): empatizar o percibir ánimos y vibras.`,
                  ]
                }),
              },
            }, {
              h3: Copy.text({
                en: 'Execution: how we reach conclusive judgments or behaviors.',
                es: 'Ejecución: cómo creamos juicios concluyentes o comportamientos.',
              }),
              ul: {
                li: Copy.text({
                  en: [
                    `${colorBullet('#d00', 'x')} Physical execution (action): exerting change on the environment`,
                    `${colorBullet('#0d0', 'x')} Rational execution (regulation): arriving at thinking-based conclusions`,
                    `${colorBullet('#00d', 'x')} Emotional execution (valuation): judging based on emotional affect`,
                  ],
                  es: [
                    `${colorBullet('#d00', 'x')} Ejecución física (acción): ejercer cambios en el medio ambiente.`,
                    `${colorBullet('#0d0', 'x')} Ejecución racional (regulación): concluir en base al pensamiento.`,
                    `${colorBullet('#00d', 'x')} Ejecución emocional (valoración): apreciar basándonos en el afecto.`,
                  ],
                }),
              },
            }, {
              h3: Copy.text({
                en: `Detachment: how we neglect one dimension to focus on others.`,
                es: `Desapego: cómo ignoramos una dimensión para centrarnos en otras.`,
              }),
              ul: {
                li: Copy.text({
                  en: [
                    `${colorBullet('#300', '-')} Physical detachment (abstraction): halting action to reflect or imagine`,
                    `${colorBullet('#030', '-')} Rational detachment (instinction): letting go of logic to trust intuition`,
                    `${colorBullet('#003', '-')} Emotional detachment (objectivation): gaining clarity by pausing feelings`
                  ],
                  es: [
                    `${colorBullet('#300', '-')} Desapego físico (abstracción): ayuda al análisis y a la creatividad.`,
                    `${colorBullet('#030', '-')} Desapego racional (instinción): permite respuestas rápidas e intuitivas.`,
                    `${colorBullet('#003', '-')} Desapego emocional (objetivación): proporciona claridad pragmática.`
                  ],
                })
              }
            }],
            menu: siteMenu,
          },
          Copy.text({
            en: '📄 Learn more',
            es: '📄 Aprende más',
          }),
          Copy.text({
            en: '📄 Close',
            es: '📄 Cerrar',
          }), {
            fontSize: 'small',
          }),
        {
          markdown: Copy.text({
            en: `We shift among these functions to think, create, interact, and rest. Some tasks require setting one dimension aside to focus on another: solving math problems calls for physical abstraction and rational execution; tough decisions may benefit from emotional detachment; quick reflexes stem from rational disengagement. Other tasks are multidimensional: a dance performance draws on both physical and emotional focus; repairing a car demands physical execution and rational clarity; creative writing thrives between rational structure and emotional resonance.
            Each position in the cube represents a distinct archetype—a focused state of the psyche. Though we are dynamic, we naturally gravitate toward certain states over others.`,
            es: `Transitamos entre estas funciones para pensar, crear, interactuar y descansar. Algunas tareas requieren dejar de lado una dimensión para enfocarse en otra: resolver problemas matemáticos exige abstracción física y ejecución racional; tomar decisiones difíciles puede beneficiarse del desapego emocional; los reflejos rápidos provienen del desapego racional. Otras tareas son multidimensionales: una presentación de danza requiere tanto enfoque físico como emocional; reparar un coche demanda ejecución física y claridad racional; la escritura creativa se nutre de la estructura racional y la resonancia emocional.
            Cada posición en el cubo representa un arquetipo distinto: un estado enfocado de la psique. Aunque somos seres dinámicos, tendemos naturalmente a gravitar hacia ciertos estados más que otros.`,
          }),
        }
      ]
    },
  },
  div: global.rgb ? undefined : {
    height: `6rem`,
    background: `linear-gradient(to bottom, ${STYLE.lightScreen} 0%, #fff0 100%)`,
  },
};