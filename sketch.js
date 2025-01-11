// store min
let lastMin = -1;

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES); 
}

function draw() {
  let hr = hour();
  let mn = minute();
  let sc = second();

  // Log
  if (mn !== lastMin) {
    console.log("Minute changed to:", mn);
    lastMin = mn;
  }

 
  let hr12 = hr % 12;
  let hourFrac = (hr12 + mn / 60 + sc / 3600) / 12; 
  let minFrac = (mn + sc / 60) / 60;               
  let secFrac = sc / 60;                           

  // change bckg brightness 
  let bgVal = lerp(30, 230, hourFrac);
  background(bgVal);

  // use star for mins
  let outerRadius = lerp(50, 150, minFrac);
  let innerRadius = outerRadius * 0.5;
  let numPoints   = int(lerp(5, 10, minFrac));

  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.2);
  fill(255, 150); 
  stroke(0);
  strokeWeight(2);
  drawStar(0, 0, innerRadius, outerRadius, numPoints);
  pop();

  // circle for secs 
  let orbitRadius = 200;
  let orbitAngle = 360 * secFrac; 
  let orbX = width / 2 + orbitRadius * cos(orbitAngle);
  let orbY = height / 2 + orbitRadius * sin(orbitAngle);

  noStroke();
  fill(255, 0, 0);
  circle(orbX, orbY, 20);

  /*
  // text for debugging
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Hour fraction: ${nf(hourFrac, 1, 2)}`, 10, 10);
  text(`Minute fraction: ${nf(minFrac, 1, 2)}`, 10, 30);
  text(`Second fraction: ${nf(secFrac, 1, 2)}`, 10, 50);
  */
}

// helper for star 
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = 360 / npoints;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    // outer vertex
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    // inner vertex
    sx = x + cos(a + angle / 2) * radius1;
    sy = y + sin(a + angle / 2) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
