import Copy from "../../lib/Copy.js";
import State from "../classes/State.js";
import p5Element from "./p5Element.js";

const WAIT = 4; //seconds between posts
const POSTS = 5;
const RADIUS = 40;

let cubeCopy = new Copy({
  actioning: {
    en: 'Physical Execution\n(Action)',
    es: 'Ejecución Física\n(Acción)',
  },
  sensing: {
    en: 'Physical Observation\n(Sensation)',
    es: 'Observación Física\n(Sensación)',
  },
  abstracting: {
    en: 'Physical Detachment\n(Abstraction)',
    es: 'Desapego Físico\n(Abstracción)',
  },
  instincting: {
    en: 'Rational Detachment\n(Instinction)',
    es: 'Desapego Racional\n(Instinción)',
  },
  conceiving: {
    en: 'Rational Observation\n(Conception)',
    es: 'Observación Racional\n(Concepción)',
  },
  regulating: {
    en: 'Rational Execution\n(Regulation)',
    es: 'Ejecución Racional\n(Regulación)',
  },
  detaching: {
    en: 'Emotional Detachment\n(Objectivation)',
    es: 'Desapego Emotional\n(Objetivación)',
  },
  empathizing: {
    en: 'Emotional Observation\n(Inspiration)',
    es: 'Observación Emotional\n(Inspiración)',
  },
  valuing: {
    en: 'Emotional Execution\n(Valuation)',
    es: 'Ejecución Emotional\n(Valoración)',
  },
  relaxing: {
    en: 'Detachment',
    es: 'Desapego',
  },
  demanding: {
    en: 'Execution',
    es: 'Ejecución',
  },
  periphery: {
    en: 'Specialization & Observation',
    es: 'Especialización & Obsevación',
  },
  animatedView: {
    en: "Animated view",
    es: 'Cubo Animado',
  },
  physicalPlains: {
    en: "Physical Plains",
    es: 'Planos Físicos',
  },
  rationalPlains: {
    en: "Rational Plains",
    es: 'Planos Rationales',
  },
  emotionalPlains: {
    en: "Emotional Plains",
    es: 'Planos Emotionales',
  },
  baseTopView: {
    en: "Base vs. Top",
    es: 'Base y Tope',
  },
  topView: {
    en: "Top View",
    es: 'Vista de Tope',
  },
  centerView: {
    en: "Center View",
    es: 'Vista de Centro',
  },
  baseView: {
    en: "Base View",
    es: 'Vista de Base',
  }
});

class Cube extends p5Element {
  constructor({
    ref = undefined,
    noLabels = false,
    onready = () => null,
    onclick = () => null,
    vicinity = false,
    width = 740,
    height = 400,
    center = '111',
    animated = true,
    view,
    textSize = 10,
  } = {}) {
    super({
      width: width,
      height: height,
      description: Copy.text({
        en: 'The 3Dpscyhe Cube',
        es: 'El cubo de la psyche 3D',
      }),
    });
    this.ref = ref;
    this.noLabels = noLabels;
    this.onready = onready;
    this.onclick = onclick;
    this.vicinity = vicinity;
    this.width = width;
    this.height = height;
    this._center = center;
    this.animated = this.vicinity ? false : animated;
    this.textSize = textSize;
    this.isHover = false;
    this.nextPost = Math.floor(Math.random() * POSTS);
    this.currentPost = 0;
    this.changePost = false;
    this.overState;
    this.states = [];
    if (view !== undefined) this.view(view);
    this.set({
      display: "flex",
      flexDirection: "column",
      alignItems: "anchor-center",
      placeContent: "center",
      position: "relative",
      maxWidth: "100%",
    });
    if (this.animated) this.set({
      select: {
        name: "Cube",
        top: '0.6em',
        width: '12em',
        left: 'calc(50% - 6em)',
        position: "absolute",
        backgroundColor: "transparent",
        zIndex: 10,
        textAlignLast: "center",
        option: [{
          value: "none",
          text: cubeCopy.at.animatedView,
        }, {
          value: 1,
          text: cubeCopy.at.physicalPlains,
        }, {
          value: 2,
          text: cubeCopy.at.rationalPlains,
        }, {
          value: 3,
          text: cubeCopy.at.emotionalPlains,
        }, {
          value: 4,
          text: cubeCopy.at.baseTopView,
        }, {
          value: 0,
          text: cubeCopy.at.topView,
        }, {
          value: -1,
          text: cubeCopy.at.centerView,
        }, {
          value: -2,
          text: cubeCopy.at.baseView,
        }],
        onchange: e => this.view(e.target.value),
      },
      canvas: this.canvas,
    });
  };

  set center(val) {
    this._center = val;
    this.reset();
  }

  get center() {
    return this._center;
  }

  setup() {
    this.sketch.strokeWeight(3);
    this.sketch.textFont('Verdana');
    this.sketch.textSize(this.textSize);
    this.sketch.center = [this.sketch.width * 0.5, this.sketch.height * 0.5];
    this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
    this.reset();
  }

  reset() {
    if (this.animated) this.animate();
    this.states = new Array(27).fill().map((_, i) => new State({
      sketch: this.sketch,
      center: this.center,
      index: i,
    })).filter(state => !this.vicinity || state.isNear()).sort(state => state.tier);
    if (this.ref) this.states.forEach(state => state.setRef(this.ref));
  }

  draw() {
    this.sketch.clear();
    this.sketch.translate(...this.sketch.center);
    this.states.forEach(state => {
      state.setRef(this.overState);
      state.interact = !!this.overState;
      state.draw(this.sketch);
    });
    if (this.overState) {
      let c = this.sketch.color('#' + this.overState.code.codeToHex())
      let l = this.sketch.lightness(c) < 45 || this.sketch.green(c) < 45;
      this.sketch.stroke(c);
      this.sketch.fill(l ? 255 : 0);
      this.sketch.text(this.overState.copy.at.archetype.toUpperCase(), this.sketch.mouseX - this.sketch.center[0], this.sketch.mouseY - this.sketch.center[1] - this.textSize);
    }
    if (this.changePost) {
      this.states.forEach(state => state.post = state.post === 0 ? this.nextPost : 0);
      this.currentPost = this.states[0].post;
      this.animate();
      this.changePost = false;
    }
    if (!this.currentPost || this.noLabels) return;
    let y = RADIUS * 4.5;
    let x = RADIUS * 4.8;
    let texts = [
      [cubeCopy.at.actioning, -x, y],
      [cubeCopy.at.sensing, 0, y],
      [cubeCopy.at.abstracting, x, y],
    ];
    if (this.currentPost === 2) texts = [
      [cubeCopy.at.instincting, -x * 1.12, y],
      [cubeCopy.at.conceiving, 0, y],
      [cubeCopy.at.regulating, x * 1.12, y],
    ];
    else if (this.currentPost === 3) texts = [
      [cubeCopy.at.detaching, -x, y],
      [cubeCopy.at.empathizing, 0, y],
      [cubeCopy.at.valuing, x, y],
    ];
    else if (this.currentPost === 4) texts = [
      [cubeCopy.at.relaxing, -x * 1.28, y],
      [cubeCopy.at.periphery, 0, y],
      [cubeCopy.at.demanding, x * 1.28, y],
    ];
    this.sketch.fill(0);
    this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
    this.sketch.textSize(RADIUS * 0.34);
    this.sketch.noStroke();
    texts.forEach(t => this.sketch.text(...t));
  }

  animate(wait = 1000) {
    if (this.timeOut) clearTimeout(this.timeOut);
    if (this.freeze && this.currentPost === this.nextPost) return;
    let isIni = this.currentPost !== 0 || this.nextPost === 0;
    this.timeOut = setTimeout(() => this.changePost = !this.isHover, wait * (isIni ? WAIT : 0.5));
    if (isIni) this.nextPost = (this.nextPost + 1) % POSTS;
  }

  mouseMoved() {
    //if (this.canvas && !this.animated) return;
    this.isHover = !!parseInt(this.sketch.get(this.sketch.mouseX, this.sketch.mouseY).join('')); // any pixel color under the mouse
    this.sketch.cursor(this.isHover ? this.sketch.HAND : this.sketch.ARROW);
    if (this.isHover) {
      let newOver = this.states.filter(s => !s.hidden && this.sketch.dist(this.sketch.mouseX - this.sketch.center[0], this.sketch.mouseY - this.sketch.center[1], ...s.coords) < s.radius).pop();
      if (newOver === this.overState) return;
      if (this.overState) this.overState.selected = false;
      this.overState = newOver;
      if (this.overState) this.overState.selected = true;
      if (this.sketch.onmouseover) this.sketch.onmouseover(this.overState);
    } else {
      if (this.overState) {
        this.overState.selected = false;
        if (this.sketch.onmouseout) this.sketch.onmouseout(this.overState);
        if (this.animated) this.animate();
      }
      this.overState = false;
    }
  }

  mouseReleased() {
    if (!this.isHover) return;
    this.onclick(this.overState);
    this.stateClick(this.overState);
  }

  view(view) {
    this.changePost = true;
    if (isNaN(view) && this.animated) {
      states.forEach(s => s.hidden = false);
      this.freeze = false;
      this.nextPost = (this.nextPost + 1) % POSTS;
      this.sketch.animate();
      return;
    }
    this.freeze = true;
    this.states.forEach(s => s.hidden = view < 0 && !s.isRim && s.level - 3 > 2 * view);
    this.nextPost = view < 0 ? 0 : parseInt(view);
  }
};

customElements.define('p5-cube', Cube);
export default Cube;