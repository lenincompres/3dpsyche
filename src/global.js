const QS = DOM.querystring();
export let rgb = QS.rgb ? `#${QS.rgb}` : undefined;
export let fav = QS.fav ? `#${QS.fav}` : undefined;

function randomColor(h, s = 50, l = 50) {
  // Normalize values to [0,1]
  [h, s, l] = [h / 360, s / 100, l / 100];
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // gray
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    [r, g, b] = [hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3)];
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export let randRGB = randomColor(Math.random() * 360);
export let rand = `#${randRGB.map(v => v.toString(16).padStart(2, "0")).join('')}`;

export default rgb;