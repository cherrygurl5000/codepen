/*Use a variable to call the canvas and get the context*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
/*Set the radius to be half the canvas height, this makes it work for all canvas sizes*/
var radius = canvas.height / 2;
/*Set the origin of the clock to be the radius*/
ctx.translate(radius, radius);
/*Reduce the clock radius (to 90%) to draw the clock inside the canvas*/
radius = radius * 0.90
/*Call the function for drawing the clock*/
//drawClock();
setInterval(drawClock, 1000);

/*This function will draw the clock*/
function drawClock() {
  ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;

  /*Draw the white circle*/
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();

  /*Create a radial gradient (95% and 105% of original clock radius)*/
  grad = ctx.createRadialGradient(0, 0 ,radius * 0.95, 0, 0, radius * 1.05);
  /*Create 3 color stops, corresponding with the inner, middle, and outer edge of the arc. The color stops create a 3D effect*/
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  /*Define the line width of the drawing object (10% of radius)*/
  ctx.lineWidth = radius*0.1;
  /*Draw the circle*/
  ctx.stroke();

  /*Draw the clock center*/
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  /*Set the font size (of the drawing object) to 15% of the radius*/
  ctx.font = radius * 0.15 + "px arial";
  /*Set the text alignment to the middle and the center of the print position*/
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  /*Calculate the print position (for 12 numbers) to 85% of the radius, rotated (PI/6) for each number*/
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
  /*Use Date to get hour, minute, second*/
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  //hour
  /*Calculate the angle of the hour hand, and draw it a length (50% of radius), and a width (7% of radius)*/
  hour = hour%12;
  hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
  drawHand(ctx, hour, radius*0.5, radius*0.07);
  //minute
  minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(ctx, minute, radius*0.8, radius*0.07);
  // second
  second = (second*Math.PI/30);
  drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}