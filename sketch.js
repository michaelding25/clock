// to store last known min
let lastMin = -1;

function setup() {
  createCanvas(800, 600); 
  angleMode(DEGREES);   
}

function draw() {
  background(240);

  // get time 
  let hr = hour();    
  let min = minute(); 
  let sec = second(); 

  // req: print value of min to JS console 
  if (min !== lastMin) {
    console.log("Minute changed to:", min);
    lastMin = min;
  }

  // Keep arcs consistent from 1–12:
  let hr12 = hr % 12;
  if (hr12 === 0) hr12 = 12; 

  translate(width / 2, height / 2);
  rotate(-90); 

  // 2nd arc 
  let secAngle = map(sec, 0, 60, 0, 360);

  strokeWeight(10);
  stroke(200, 50, 50);  // red
  noFill();
  arc(0, 0, 300, 300, 0, secAngle);

  // min arc
  let minAngle = map(min, 0, 60, 0, 360);
  stroke(50, 100, 200); // blue
  strokeWeight(16);
  arc(0, 0, 270, 270, 0, minAngle);

  //hour 
  let hourAngle = map(hr12 + min / 60, 0, 12, 0, 360);
  stroke(50, 200, 120); // green
  strokeWeight(20);
  arc(0, 0, 240, 240, 0, hourAngle);

  // small indicators 
  rotate(90); // rotate back to normal orientation for text
  noStroke();
  fill(80);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(hr + ":" + nf(min, 2) + ":" + nf(sec, 2), 0, 0);
}
