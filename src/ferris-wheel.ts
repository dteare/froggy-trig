// @ts-nocheck
var Point2D = function (x, y) {
  return { x: x, y: y };
};

var target = new Point2D(0, 0);
var points = [];
var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

var W = (cvs.width = window.innerWidth);
var H = (cvs.height = window.innerHeight);

target.x = W / 2;
target.y = H / 2;

var num = 36;
var dangle = 360 / num;
var rotateSpeed = 0.005;
var rotateAngle = 0;

var smallNum = H > W ? W : H;

var R = smallNum / 6;
var r = R / 100;

var cellDis = R / 5;
var lineWidth = 1 + R / 30;

var fillStyle = 'rgba(33,150,243,1)';
var strokeStyle = 'rgba(33,150,243,0.4)';

function updata() {
  points = [];
  if (rotateAngle < -360) {
    rotateAngle += 360;
  }
  rotateAngle -= rotateSpeed;

  for (var i = 0; i < num; i++) {
    var x = target.x + R * Math.sin(rotateAngle + (dangle * i * Math.PI) / 180);
    var y = target.y + R * Math.cos(rotateAngle + (dangle * i * Math.PI) / 180);

    points.push(new Point2D(x, y));
    var x =
      target.x + 2 * R * Math.sin(rotateAngle + (dangle * i * Math.PI) / 180);
    var y =
      target.y + 2 * R * Math.cos(rotateAngle + (dangle * i * Math.PI) / 180);
    points.push(new Point2D(x, y));
  }
}

function drawPoints(points) {
  ctx.beginPath();
  ctx.fillStyle = fillStyle;
  ctx.moveTo(target.x, target.y);
  ctx.arc(target.x, target.y, 6 * r, 0, 2 * Math.PI);
  for (var i = 0; i < points.length; i++) {
    ctx.moveTo(points[i].x, points[i].y);
    ctx.arc(points[i].x, points[i].y, 2 * r, 0, 2 * Math.PI);
    if (i % 2 != 0) {
      ctx.moveTo(points[i].x, points[i].y + cellDis);
      ctx.arc(points[i].x, points[i].y + cellDis, 6 * r, 0, 2 * Math.PI);
    }
  }
  ctx.fill();
  ctx.closePath();
}

function drawLines(points) {
  var ii = 0;
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = strokeStyle;
  for (var i = 1; i < points.length; i += 2) {
    ctx.moveTo(target.x, target.y);
    ctx.lineTo(points[i].x, points[i].y);
    ii = i == 1 ? points.length + 1 : i;
    ctx.lineTo(points[ii - 2].x, points[ii - 2].y);
    ctx.lineTo(points[ii - 2].x, points[ii - 2].y + cellDis);

    ctx.moveTo(points[i - 1].x, points[i - 1].y);
    i - 1 == points.length - 2
      ? ctx.lineTo(points[0].x, points[0].y)
      : ctx.lineTo(points[i + 1].x, points[i + 1].y);
  }
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.moveTo(target.x - R * 1.1, target.y + 2.8 * R);
  ctx.lineTo(target.x - R, target.y + 2.8 * R);
  ctx.lineTo(target.x, target.y);
  ctx.lineTo(target.x + R, target.y + 2.8 * R);
  ctx.lineTo(target.x + R * 1.1, target.y + 2.8 * R);
  ctx.stroke();
  ctx.closePath();
}

function cleanUp() {
  ctx.clearRect(0, 0, W, H);
}

export default function draw() {
  cleanUp();
  drawPoints(points);
  drawLines(points);
  updata();
  //  setTimeout(draw, 1000 / 60);
}

function reset() {
  W = cvs.width = window.innerWidth;
  H = cvs.height = window.innerHeight;

  target.x = W / 2;
  target.y = H / 2;

  R = H / 6;
  r = R / 100;

  cellDis = R / 5;

  lineWidth = 1 + R / 30;
}

updata();
draw();

window.addEventListener('resize', function () {
  reset();
});
