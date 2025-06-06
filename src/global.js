const QS = DOM.querystring();
export let rgb = QS.rgb ? `#${QS.rgb}` : undefined;
export let fav = QS.fav ? `#${QS.fav}` : undefined;
export let randRGB = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
export let rand = `#${randRGB.map(v => v.toString(16).padStart(2, "0")).join('')}`;

export default rgb;