const QS = DOM.querystring();
export let rgb = QS.rgb ? `#${QS.rgb}` : undefined;
export let fav = QS.fav ? `#${QS.fav}` : undefined;

const cRandom = (range = 0.5, total = 255) => Math.floor(total * range * (0.5 + Math.random()));
export let randRGB = [cRandom(), cRandom(), cRandom()];
export let rand = `#${randRGB.map(v => v.toString(16).padStart(2, "0")).join('')}`;

export default rgb;