const CUBE = 'cube';
const NEAR = 'near';
const STATE = 'state';
const ENG = 'eng';
const ESP = 'esp';
const CENTERCODE = '111';
const SHADES = ['2a', '80', 'd5'];
const WAIT = 4; //second beteen posts
const GRID = 36;
const RADIUS = 40;
const [COS30, SIN30] = [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)];

// Auxiliary particular

let drawBox = (radius = 40, colour = [128, 128, 128], alpha = 1, inside = true) => {
  let [x, y] = [radius * COS30, radius * SIN30];
  alpha *= 255;
  if (inside) rotate(PI);
  fill(...colour.plus(32), alpha);
  quad(0, 0, x, -y, 0, -radius, -x, -y);
  fill(...colour, alpha);
  quad(0, 0, 0, radius, -x, y, -x, -y);
  fill(...colour.plus(-32), alpha);
  quad(0, 0, x, -y, x, y, 0, radius);
  if (inside) rotate(PI);
}
Number.prototype.toCode = function (base) {
  let code = '' + floor(this / 9) % 3 + floor(this / 3) % 3 + this % 3;
  if (base) code = code.toCoords().plus(base.toCoords()).map(o => o % 3).join('');
  return code;
}
Number.prototype.toCoords = function () {
  return this.toCode().toCoords();
}
String.prototype.toCoords = function () {
  return this.split('').toCoords();
}
String.prototype.toOrdinal = function () {
  return this.toCoords().toOrdinal();
}
String.prototype.toHexShade = function () {
  return this.toCoords().toHexShade();
}
Array.prototype.toCoords = function () {
  return this.map(n => int(n) % 3);
}
Array.prototype.toOrdinal = function () {
  return this.reverse().reduce((o, v, i) => o + (v % 28) * pow(3, i), 0);
}
Array.prototype.toHexShade = function () {
  return this.map(v => SHADES[v]).join('');
}

// Auxiliary general

Array.prototype.populate = function (generator) {
  return this.fill().map((n, i) => generator(i));
}
Array.prototype.plus = function (arr) {
  return this.map((v, i) => v + (typeof arr === 'number' ? arr : arr[i % arr.length]))
};
Array.prototype.minus = function (arr) {
  return this.plus(typeof arr === 'number' ? -arr : arr.map(v => -v))
};

// p5 core

function preload() {
  symbolSprite = loadImage('symbolsprite18.png');
  symbolInfo = loadJSON('states.json');
}

function setup() {
  // settings
  stateCode = CENTERCODE;
  display = CUBE;
  lang = ENG;
  // querystring
  var args = location.search.substring(1);
  if (args) {
    args = JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    if (args.lang) lang = args.lang;
    if (args.state) {
      stateCode = args.state;
      display = STATE; // if state is passed but display is not, it assumes display is STATE
    }
    if (args.display) display = args.display;
  }
  // css
  let style = document.body.style;
  style.margin = style.padding = 0;
  style.overflow = 'hidden';
  isHover = false;
  // canvas
  canvas = createCanvas(windowWidth, windowHeight);
  center = [width * 0.5, height * 0.5];
  // creating states
  translate(...center);
  switch (display) {
    case STATE:
      states = [State(stateCode)];
      states[0].draw();
      break;
    case NEAR:
      states = Array(27).populate(i => State(stateCode, i)).filter(s => s.isNear());
      states.forEach(s => s.draw());
      break;
    case CUBE:
      states = Array(27).populate(i => State(stateCode, i, true)).sort(s => s.tier);
      nextPost = 1;
      changePost = false;
      setTimeout(() => changePost = true, 1000 * WAIT);
      break;
  }
}

function draw() {
  if (display === CUBE) {
    clear();
    translate(...center);
    states.forEach(s => s.draw());
    if (changePost) {
      states.forEach(s => s.post = s.post = s.post === 0 ? nextPost : 0);
      let isIni = states[0].post !== 0 || nextPost === 0;
      setTimeout(() => changePost = true, 1000 * (isIni ? WAIT : 0.5));
      if (isIni) nextPost = (nextPost + 1) % 5;
      changePost = false;
    }
  }
}

function mouseMoved() {
  if (!canvas) return;
  isHover = !!parseInt(canvas.get(mouseX, mouseY).join(''));
  cursor(isHover ? HAND : ARROW);
}

function mousePressed() {
  if (!isHover) return;
  let hit = states.reduce((o, s) => dist(...[mouseX, mouseY].minus(center), ...s.coords) < s.radius ? s : o, null);
  if (hit) console.log(hit.text, hit.code.toHexShade());
}

// objects

function State(centerCode = CENTERCODE, index = null, animate = false, wording, radius = RADIUS) {
  if (index === null) index = CENTERCODE.toOrdinal();
  let inCoords = index.toCoords();
  let baseCode = centerCode.toCoords().plus(2).toCoords();
  let code = index.toCode(baseCode);
  let ordinal = code.toOrdinal();
  let colour = code.toCoords().map(v => parseInt('0x' + SHADES[v]));
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
    drawBox(radius, colour, 0.86);
    // icon
    tint(...colour);
    image(...state.icon);
    // top
    drawBox(radius, colour, 0.34, false);
    // desc
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(radius * 0.25);
    text(state.text, 0, radius * 0.5);
    pop();
  }

  state.isNear = () => inCoords.filter(v => v === 1).length >= 2;

  return state;

}