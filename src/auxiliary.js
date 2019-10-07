// Auxiliary general

String.prototype.toRGB = function () {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this)
    .filter((v, i) => i > 0 && 1 < 4).map(v => parseInt(v, 16));
}
Array.prototype.populate = function (generator) {
  return this.fill().map((n, i) => generator(i));
}
Array.prototype.plus = function (arr) {
  return this.map((v, i) => v + (typeof arr === 'number' ? arr : arr[i % arr.length]))
};
Array.prototype.minus = function (arr) {
  return this.plus(typeof arr === 'number' ? -arr : arr.map(v => -v))
};

// Auxiliary particular

const SHADES = ['2a', '80', 'd5'];

Number.prototype.toCode = function (base) {
  let code = '' + floor(this / 9) % 3 + floor(this / 3) % 3 + this % 3;
  if (base) code = code.toCoords().plus(base.toCoords()).map(o => o % 3).join('');
  return code;
}
Number.prototype.toCoords = function () {
  return this.toCode().toCoords();
}
Number.prototype.toColor = function () {
  return this.toCode().toColor();
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
String.prototype.toColor = function () {
  return this.toCoords().toColor();
}
Array.prototype.toCoords = function () {
  return this.map(n => parseInt(n) % 3);
}
Array.prototype.toOrdinal = function () {
  return this.reverse().reduce((o, v, i) => o + (v % 28) * pow(3, i), 0);
}
Array.prototype.toHexShade = function (shades) {
  return this.map(v => SHADES[v]).join('');
}
Array.prototype.toColor = function () {
  return this.map(v => parseInt('0x' + SHADES[v]));
}

// other functions

const [COS30, SIN30] = [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)];

function drawBox(radius = 40, colour = [128, 128, 128], alpha = 1, inside = true) {
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