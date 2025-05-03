import Copy from "../../lib/Copy.js";
import Collabsable from "../components/Collapsable.js";
import * as STYLE from "../style.js";
import {
  colorBullet
} from "../../lib/auxiliary.js";
import Cube from "../components/Cube.js";
import * as global from "../global.js";

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
      maxWidth: "40em",
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
      maxWidth: "40em",
      width: "calc(100% - 2rem)",
      lineHeight: "2.5em",
      margin: "0 auto",
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
      p: Copy.text({
        en: `This psychometric tool maps your states of focus across three internal dimensions: <b style="color:darkred">physical</b> (${STYLE.getIcon('arrowDL')}), <b style="color:darkgreen">rational</b> (${STYLE.getIcon('arrowU')}) & <b style="color:darkblue">emotional</b> (${STYLE.getIcon('arrowDR')}). In each, we interact with the world through <b>observation</b>, <b>execution</b>, and <b>detachment</b>.`,
        es: `Esta herramienta psicométrica asigna estados de enfoque a tres dimensiones en nuestro panorama interno: <b style="color:darkred">física</b> (↙), <b style="color:darkgreen">racional</b> ( ↑) y <b style="color:darkblue">emocional</b> (↘). Con estas interactuamos a través de la <b>obsercación</b>, <b>ejecución</b> y <b>desapego</b>.`,
      }),
      section: new Collabsable({
          div: [{
            h3: Copy.text({
              en: 'Observation: How we take in information and stimuli.',
              es: 'Observación: Cómo asimilamos información y estímulos.',
            }),
            ul: {
              li: Copy.text({
                en: [
                  `${colorBullet('#800', 'o')} Physical observation (sensation): Sensory awareness of surroundings`,
                  `${colorBullet('#080', 'o')} Rational observation (conception): Grasping ideas, meanings, and patterns`,
                  `${colorBullet('#008', 'o')} Emotional observation (inspiration): Sensing moods, vibes, and empathy`,
                ],
                es: [
                  `${colorBullet('#800', 'o')} Observación física (sensación): Observar el entorno sensorial inmediato.`,
                  `${colorBullet('#080', 'o')} Observación racional (concepción): Concebir ideas, significados y datos.`,
                  `${colorBullet('#008', 'o')} Observación emocional (inspiración): Empatizar o percibir ánimos y vibras.`,
                ]
              }),
            },
          }, {
            h3: Copy.text({
              en: 'Execution: How we reach conclusive judgments or behaviors.',
              es: 'Ejecución: Cómo creamos juicios concluyentes o comportamientos.',
            }),
            ul: {
              li: Copy.text({
                en: [
                  `${colorBullet('#d00', 'x')} Physical execution (action): Exerting change on the environment`,
                  `${colorBullet('#0d0', 'x')} Rational execution (regulation): Arriving at thinking-based conclusions`,
                  `${colorBullet('#00d', 'x')} Emotional execution (valuation): Judging based on emotional affect`,
                ],
                es: [
                  `${colorBullet('#d00', 'x')} Ejecución física (acción): Ejercer cambios en el medio ambiente.`,
                  `${colorBullet('#0d0', 'x')} Ejecución racional (regulación): Concluir en base al pensamiento.`,
                  `${colorBullet('#00d', 'x')} Ejecución emocional (valoración): Apreciar basándonos en el afecto.`,
                ],
              }),
            },
          }, {
            h3: Copy.text({
              en: `Detachment: How we neglect one dimension to focus on others.`,
              es: `desapego: cómo ignoramos una dimensión para centrarnos en otras.`,
            }),
            ul: {
              li: Copy.text({
                en: [
                  `${colorBullet('#300', '-')} Physical detachment (abstraction): Halting action to reflect or imagine`,
                  `${colorBullet('#030', '-')} Rational detachment (instinction): Letting go of logic to trust intuition`,
                  `${colorBullet('#003', '-')} Emotional detachment (objectivation): Gaining clarity by pausing feelings`
                ],
                es: [
                  `${colorBullet('#300', '-')} desapego físico (abstracción): Ayuda al análisis y a la creatividad.`,
                  `${colorBullet('#030', '-')} desapego racional (instinción): Permite respuestas rápidas e intuitivas.`,
                  `${colorBullet('#003', '-')} desapego emocional (objetivación): Proporciona claridad pragmática.`
                ],
              })
            }
          }],
          menu: {
            p: "Further Reading:",
            ul: {
              marginTop: "-1em",
              display: "flex",
              justifyContent: "space-around",
              li: {
                margin: "0 0.7em",
                textAlign: "center",
                content: [{
                    a: {
                      html: Copy.text({
                        en: `3D Psyche Manifesto`,
                        es: `Manifiesto de la Psique 3D`,
                      }),
                      href: Copy.text({
                        en: `manifesto.html`,
                        es: `manifiesto.html`,
                      }),
                    }
                  },
                  {
                    a: {
                      html: Copy.text({
                        en: `Educational Dossier`,
                        es: `Dossier Educacional`,
                      }),
                      href: Copy.text({
                        en: `dossier3DPsyche.pdf`,
                        es: `dossierPsique3D.pdf`,
                      }),
                    }
                  }
                ]
              }
            }
          }
        },
        Copy.text({
          en: 'Learn more',
          es: 'Aprender más',
        }),
        Copy.text({
          en: 'Close',
          es: 'Cerrar',
        })),
      p_: Copy.text({
        en: [`We constantly shift among these functions to think, create, interact, and rest: solving a math problem requires physical abstraction and rational execution; making a difficult decision may benefit from emotional detachment; quick reflexes or instinctive actions emerge from rational detachment`, `Some tasks are multidimensional: a dance performance calls for physical and emotional focus; car repair demands physical execution and rational clarity; creative writing lives between rational ideas and emotional resonance.`, `Each position in the cube represents a distinct state of being—an archetype of how we align our focus. While we are all dynamic, we tend to gravitate toward certain states more easily than others.`],
        es: [`Cambiamos constantemente entre estas funciones para pensar, crear, interactuar y descansar: resolver un problema de matemáticas requiere abstracción física y ejecución racional; tomar una decisión difícil puede beneficiarse del desapego emocional; los reflejos rápidos o las acciones instintivas surgen del desapego racional.`, `Algunas tareas son multidimensionales: una presentación de danza exige enfoque físico y emocional; reparar un auto requiere ejecución física y claridad racional; la escritura creativa habita entre ideas racionales y resonancia emocional.`, `Cada posición en el cubo representa un estado distinto del ser—un arquetipo de cómo alineamos nuestro enfoque. Aunque todos somos dinámicos, tendemos a gravitar más fácilmente hacia ciertos estados que hacia otros.`],
      }),
    },
  },
  div: global.rgb ? undefined : {
    height: `6rem`,
    background: `linear-gradient(to bottom, ${STYLE.lightScreen} 0%, #fff0 100%)`,
  },
};