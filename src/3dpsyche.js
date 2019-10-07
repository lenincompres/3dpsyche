const CUBE = 'cube';
const NEAR = 'near';
const STATE = 'state';
const ENG = 'eng';
const ESP = 'esp';
const CENTERCODE = '111';
const WAIT = 4; //second beteen posts
const GRID = 36;
const RADIUS = 40;

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
  ref = null;
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
      if (ref) states.forEach(s => s.setRef(ref));
      nextPost = 1;
      currentPost = 0;
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
  isHover = !!parseInt(canvas.get(mouseX, mouseY).join(''));
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
      if (nextPost === 1) text('The 3D Pscyhe', 0, y);
      break;
    case 1:
      text('Objectives', -x, y);
      text('Empathy', 0, y);
      text('Values', x, y);
      break;
    case 2:
      text('Actions', -x, y);
      text('Senses', 0, y);
      text('Abstraction', x, y);
      break;
    case 3:
      text('Instincts', -x * 1.18, y);
      text('Notions', 0, y);
      text('Rules', x * 1.18, y);
      break;
    case 4:
      text('Core', -x * 1.28, y);
      text('Extreme\nNeutral', 0, y * 1.1);
      line(-x * 0.25, y * 1.1, x * 0.25, y * 1.1);
      text('Top', x * 1.28, y);
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