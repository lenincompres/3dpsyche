var test;
var canvas;
var favColor;
var actColor;
var medColor;
var sqcount = 1;
var updated;
var values = [];

function preload() {
  test = loadJSON('test.json');
}

function setup() {
  MAX_DISTANCE = dist(0, 0, 0, 100, 100, 100);

  //header
  domify(test.header, 'header');

  //main
  main = createElement('main');
  test.questions.forEach((q, j) => {
    test.headings.forEach(h => {
      if (h.index === j) {
        main.child(createElement('h2', h.heading));
        main.child(createP(h.description));
      }
    });
    main.child(createElement('h1', j + '. ' + q.question));
    values[j] = [];
    q.answers.forEach((a, i) => {
      var v = values[j][i] = 1;
      var div = createDiv();
      var p = createP(a);
      var hint = createDiv(v);
      hint.addClass('hint');
      var slider = createSlider(1, 99, v);
      slider.elt.oninput = e => {
        hint.elt.innerText = values[j][i] = slider.value();
        updated = false;
      }
      div.addClass('answer');
      div.child(p);
      div.child(hint);
      div.child(slider);
      main.child(div);
    });
  });

  //footer
  canvas = createCanvas(200, 120);
  var footer = domify(test.footer, 'footer');
  footer.child(canvas);
}

function draw() {
  if (updated) return;
  updated = true;

  clear();
  strokeWeight(1);
  stroke(255);

  sqcount = 1;
  //favorite
  colorMode(RGB);
  var fav = color(values[0][0] * 2.55, values[0][1] * 2.55, values[0][2] * 2.55);
  var favH = hue(fav);
  var favS = (values[0][5] + 100 - values[0][6]) / 2;
  var favB = (values[0][3] + 100 - values[0][4]) / 2;
  showColor(favH, favS, favB, 'Favorite color');

  //hue
  var rgb = color(...average(1, 6).times(2.55));

  //brightness
  var i = 7;
  var bright = [values[i][0], values[i][1], values[i][2]];
  i += 1;
  bright = bright.plus([values[i][0], values[i][1], values[i][2]].times(-1).plus(100));
  i += 1;
  bright = bright.plus([values[i][0], values[i][1], values[i][2]]);
  bright = bright.plus([values[i][3], values[i][4], values[i][5]].times(-1).plus(100));
  bright = bright.times(0.25).reduce((o,v) => v + o, 0)/3;

  //saturation
  var bs = average(10, 11);
  var sat = [bs[0], bs[1], bs[2]].plus([bs[3], bs[4], bs[5]].times(-1).plus(100));
  sat = sat.times(0.5).reduce((o,v) => v + o, 0)/3;

  showColor(hue(rgb), sat, bright, 'Test Results');

  //daily
  i = 12;
  var daily = color(values[i][0], values[i][1], values[i][2]);
  var dailyH = hue(daily);
  var dailyS = (values[i][5] + 100 - values[i][6]) / 2;
  var dailyB = (values[i][3] + 100 - values[i][4]) / 2;
  showColor(dailyH, dailyS, dailyB, 'Daily Life');
}

// methods

function average(first, last) {
  var output = Array(test.questions[first].answers.length).fill(0);
  values.filter((q, i) => i >= first && i <= last).forEach(q => output = output.plus(q));
  return output.times(1 / (last - first + 1));
}

function showColor(h, s, b, name) {
  var sqw = 20;
  var z = sqw * 0.68;
  var y = sqcount * (sqw + sqw * 0.5);
  colorMode(HSB);
  var colour = color(h,s,b);
  stroke(255);
  fill(colour);
  square(sqw * 0.5, y, sqw);
  colorMode(RGB);
  fill(255);
  noStroke();
  textAlign(LEFT, CENTER);
  var colorName = ' (#' +  hexColor(colour) + ')';
  textSize(z);
  text(name + colorName, sqw * 2, y + z * 0.68);
  sqcount += 1;
}