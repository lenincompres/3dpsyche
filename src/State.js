function State(centerCode = CENTERCODE, index = null, animate = false, wording, radius = RADIUS) {
  if (index === null) index = CENTERCODE.toOrdinal();
  let inCoords = index.toCoords();
  let baseCode = centerCode.toCoords().plus(2).toCoords();
  let code = index.toCode(baseCode);
  let ordinal = code.toOrdinal();
  let colour = code.toColor();
  let diff = index.toCode().toCoords().plus(-1);
  let [grid, spacing, spread, iconSize] = [GRID, radius * 1.5, 3.68, radius * 0.86];
  let isRim = inCoords.includes(2) && inCoords.includes(0);
  let level = diff.reduce((o, v) => o + v, 0);
  let tier = isRim || !level ? 1 : level < 0 ? 0 : 2;
  let posts = [
    [
      -diff[0] * spacing * COS30 + diff[2] * spacing * COS30,
      -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
    ],
    [
      -diff[0] * spacing * COS30 + spread * diff[2] * spacing * COS30,
      -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
    ],
    [
      -spread * diff[0] * spacing * COS30 + diff[2] * spacing * COS30,
      -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
    ],
    [
      -diff[0] * spacing * COS30 + diff[2] * spacing * COS30 + spread * diff[1] * spacing,
      -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
    ],
    [
      -diff[0] * spacing * COS30 + diff[2] * spacing * COS30 + 1.14 * spread * (tier - 1) * spacing,
      -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
    ]
  ];

  var state = {
    code: code,
    index: index,
    radius: radius,
    post: 0,
    coords: animate ? [0, 0] : posts[0],
    color: colour,
    text: wording ? wording : lang === ESP ? symbolInfo[code].articulo : symbolInfo[code].article,
    tier: tier,
    hex: code.toHexShade(),
    info: symbolInfo[code],
    value: 1,
    icon: [symbolSprite, -iconSize * 0.5, -iconSize * 0.5, iconSize, iconSize, (ordinal % 3) * grid, floor(ordinal / 3) * grid, grid, grid]
  }

  state.draw = () => {
    let end = posts[state.post];
    let ended = dist(...end, ...state.coords) < 0.25;
    if (!ended) state.coords = state.coords.map((v, i) => v += (end[i] - v) * 0.25);
    push();
    noStroke();
    translate(...state.coords);
    // base
    drawBox(radius, colour, 0.86 * state.value);
    // icon
    tint(...colour, pow(state.value, 2) * 255);
    image(...state.icon);
    // top
    drawBox(radius, colour, 0.34 * pow(state.value, 4), false);
    // desc
    fill(0, state.value * 255);
    textAlign(CENTER, CENTER);
    textSize(radius * 0.25);
    text(state.text, 0, radius * 0.5);
    pop();
  }

  state.isNear = () => inCoords.filter(v => v === 1).length >= 2;

  state.setRef = hexRef => {
    var distFactor = 1.05444; // normalize the center 0.5 / getDistance('2a80d5','808080');
    state.value = 1 - distFactor * getDistance(hexRef, code.toHexShade(), true);
    var eValue = 1 - distFactor * getDistance(hexRef, code.toHexShade());
    state.text = round(100 * state.value) + "%" + (eValue < state.value ? "*" : "");
  }

  let getDistance = (hex1, hex2, closerCycle = false) => {
    var [p1, p2] = [hex1.toRGB().map(v => v / 255), hex2.toRGB().map(v => v / 255)];
    if (closerCycle) p1 = p1.map((v, i) => {
      let d = v - p2[i];
      return abs(d) <= 0.5 ? v : abs(d + 1) < abs(d - 1) ? v + 1 : v - 1;
    });
    return dist(...p2, ...p1);
  };

  return state;

}