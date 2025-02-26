const CUBE = 'cube';
const NEAR = 'near';
const STATE = 'state';
const ENG = 'eng';
const ESP = 'esp';
const CENTERCODE = '111';
const WAIT = 4; //second beteen posts
const GRID = 36;
const RADIUS = 40;


var stateCode;
var displayMode ;
var lang;
var ref; // this is where the test result values should be

// p5 core

function preload() {
  symbolSprite = loadImage('assets/symbolsprite18.png');
  symbolInfo = loadJSON('states.json');
}

function setup() {
  // settings
  stateCode = CENTERCODE;
  displayMode = CUBE;
  lang = ENG;
  ref = null;
  // querystring
  var args = location.search.substring(1);
  if (args) {
    args = JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    if (args.lang) lang = args.lang;
    if (args.state) {
      stateCode = args.state;
      displayMode = STATE; // if state is passed but display is not, it assumes display is STATE
    }
    if (args.display) displayMode = args.display;
    if (args.ref) ref = args.ref;
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
  switch (displayMode) {
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
      if (ref) states.forEach(s => s.setRef(ref));
      nextPost = 1;
      currentPost = 0;
      changePost = false;
      setTimeout(() => changePost = true, 1000 * WAIT);
      break;
  }
}

function draw() {
  if (displayMode === CUBE) {
    clear();
    translate(...center);
    states.forEach(s => s.draw());
    if (changePost) {
      states.forEach(s => s.post = s.post = s.post === 0 ? nextPost : 0);
      currentPost = states[0].post;
      let isIni = currentPost !== 0 || nextPost === 0;
      setTimeout(() => changePost = true, 1000 * (isIni ? WAIT : 0.5));
      if (isIni) nextPost = (nextPost + 1) % 4; //only show 4 posts
      changePost = false;
    }
    drawSign();
  }
}

function mouseMoved() {
  if (!canvas) return;
  isHover = !!parseInt(canvas.get(mouseX, mouseY).join(''));  // any pixel color under the mouse
  cursor(isHover ? HAND : ARROW);
}

function mousePressed() {
  if (!isHover) return;
  let hit = states.reduce((o, s) => dist(...[mouseX, mouseY].minus(center), ...s.coords) < s.radius ? s : o, null);
  if (hit) console.log(hit.text, hit.code.toHexShade());
}

// drawing other components

function drawSign() {
  //add text describing each post on the shifting cube
  let y = RADIUS * 4.5;
  let x = RADIUS * 4.86;
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(RADIUS * 0.5);
  switch (currentPost) {
    case 0:
      if (nextPost === 1) text(lang === ESP ? 'La Psiquis en 3D' : 'The 3D Pscyhe', 0, y);
      break;
    case 1:
      text(lang === ESP ? 'Objetivos' : 'Objectives', -x, y);
      text(lang === ESP ? 'Expresiones' : 'Expresions', 0, y);
      text(lang === ESP ? 'Valores' : 'Values', x, y);
      break;
    case 2:
      text(lang === ESP ? 'Acciones' : 'Actions', -x, y);
      text(lang === ESP ? 'Sentidos' : 'Senses', 0, y);
      text(lang === ESP ? 'Abstracciones' : 'Abstractions', x, y);
      break;
    case 3:
      text(lang === ESP ? 'Instintos' : 'Instincts', -x * 1.18, y);
      text(lang === ESP ? 'Nociones' : 'Notions', 0, y);
      text(lang === ESP ? 'Reglas' : 'Rules', x * 1.18, y);
      break;
    case 4:
      text(lang === ESP ? 'Base' : 'Core', -x * 1.28, y);
      text(lang === ESP ? 'Extremo\nNeutro' : 'Extreme\nNeutral', 0, y * 1.1);
      line(-x * 0.25, y * 1.1, x * 0.25, y * 1.1);
      text(lang === ESP ? 'Tope' : 'Top', x * 1.28, y);
      break;
  }
}

function drawMenu(){
  push();
  noFill();
  stroke(200);
  let radius = RADIUS * 0.5;
  //post 0 : cube
  let [x, y] = [radius * COS30, radius * SIN30];
  translate(RADIUS * 6, -RADIUS * 5);
  quad(0, 0, x, -y, 0, -radius, -x, -y);
  quad(0, 0, 0, radius, -x, y, -x, -y);
  quad(0, 0, x, -y, x, y, 0, radius);
  // Post 1: blues
  quad(0, 0, 0, radius, -x, y, -x, -y);
  quad(x, y, 0, radius, -x, y, -x, -y);
  quad(-x, 0, 0, radius, -x, y, -x, -y);
  // Post 1: reds
  quad(0, 0, 0, radius, -x, y, -x, -y);
  quad(x, y, 0, radius, -x, y, -x, -y);
  quad(-x, 0, 0, radius, -x, y, -x, -y);
  // Post 1: geens
  quad(0, 0, 0, radius, -x, y, -x, -y);
  quad(x, y, 0, radius, -x, y, -x, -y);
  quad(-x, 0, 0, radius, -x, y, -x, -y);
  pop();
}