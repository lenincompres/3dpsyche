const QS = DOM.querystring();
export let rgb = QS.rgb ? `#${QS.rgb}` : undefined;
export let fav = QS.fav ? `#${QS.fav}` : undefined;

export default rgb;