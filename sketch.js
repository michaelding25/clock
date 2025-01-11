let lastMin = -1;

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
}

function draw() {
  // curr time
  let hr = hour();
  let mn = minute();
  let sc = second();

  if (mn !== lastMin) {
    console.log("minute changed to:", mn);
    lastMin = mn;
  }

  let hr12 = hr % 12;
  let hourFrac = (hr12 + mn / 60 + sc / 3600) / 12;
  let minFrac = (mn + sc / 60) / 60;
  let secFrac = sc / 60;

  // background
  let bgVal = lerp(30, 230, hourFrac);
  background(bgVal);

  // swirl for hour 
  push();
  translate(width / 2, height / 2);
  stroke(200, 100, 200);
  strokeWeight(2);
  noFill();
  beginShape();
  let maxAngle = 360 * 12 * hourFrac;
  for (let a = 0; a <= maxAngle; a += 5) {
    let r = a * 0.2;
    let x = r * cos(a - 90);
    let y = r * sin(a - 90);
    vertex(x, y);
  }
  endShape();
  pop();

  // star for minutes
  let outerRadius = lerp(50, 150, minFrac);
  let innerRadius = outerRadius * 0.5;
  let numPoints = int(lerp(5, 10, minFrac));
  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.2);
  fill(255, 150);
  stroke(0);
  strokeWeight(2);
  drawStar(0, 0, innerRadius, outerRadius, numPoints);
  pop();

  // orbiting circle for seconds
  let orbitRadius = 120;
  let orbitAngle = 360 * secFrac;
  let orbX = width / 2 + orbitRadius * cos(orbitAngle - 90);
  let orbY = height / 2 + orbitRadius * sin(orbitAngle - 90);
  noStroke();
  fill(255, 0, 0);
  circle(orbX, orbY, 15);
}

// helper for star 
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = 360 / npoints;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + angle / 2) * radius1;
    sy = y + sin(a + angle / 2) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
