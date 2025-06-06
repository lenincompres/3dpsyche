import Copy from "../../lib/Copy.js";
import State from "../classes/State.js";
import p5Element from "./p5Element.js";

class StateElement extends p5Element {
  constructor(code = '111', width = 140, height = 120) {
    super({
      width: width,
      height: height,
    });
    this.state = new State({
      center: code,
      radius: height / 2,
    });
    this.updated = true;
  }

  draw() {
    if (!this.updated) return;
    this.sketch.clear();
    this.sketch.push();
    this.sketch.translate(this.width / 2, this.height / 2);
    this.state.draw(this.sketch);
    this.sketch.pop();
    if (!this.state.image) return;
  }

  set code(code) {
    this.state.center = code;
    this.set({
      attribute: {
        ariaLabel: Copy.text({
          en: `The ${this.state.copy.at.archetype} state of the 3Dpscyhe State`,
          es: `El esta ${this.state.copy.at.archetype} de la psyche 3D`,
        }),
      }
    });
  }

}

customElements.define('state-element', StateElement);
export default StateElement;