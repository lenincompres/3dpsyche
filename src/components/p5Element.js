class p5Element extends HTMLElement {
  constructor({
    width,
    height,
    display = 'inline-block',
    description = 'A sketch built with P5.js',
    loading = 'Loading sketch…',
  } = {}) {
    super();
    this.width = width;
    this.height = height;
    this.set({
      display: display,
      attribute: {
        role: 'img',
        ariaLabel: description,
      },
      width: `${this.width}px`,
      height: `${this.height}px`,
      display: "flex",
      flexDirection: "column",
      alignItems: "anchor-center",
      placeContent: "center",
      position: "relative",
      div: this.loading = DOM.let('div', loading),
    });
    const t = this;
    new p5(p => {
      t.p5 = t.sketch = p;
      p.setup = () => {
        t.removeChild(t.loading),
        t.canvas = p.createCanvas(t.width ? t.width : p.windowWidth, t.height, p.P2D).elt;
        t.canvas.getContext("2d", { willReadFrequently: true });
        t.append(t.canvas);
        if (t.setup) t.setup(p);
      }
      if (t.draw) p.draw = () => t.draw(p);
      if (t.mouseReleased) p.mouseReleased = () => t.mouseReleased(p);
      if (t.mouseMoved) p.mouseMoved = () => t.mouseMoved(p);
    });
  }
};
customElements.define('p5-element', p5Element);
export default p5Element;