// these can be customized
const debugViewText = "#ff0000";
const debugZoomBackground = "#555588"
const debugZoomScale = 0.5;

// this can be modified after we discuss in lecture
const buffersPerFrame = 1;

// probably best not to modify anything below this line
const frameMax = 24;
let recording = false;
let gifRecorder = null;
let debugZoom = false;
let debugView = false;
let stickFrame = 0;

// *note: canvasWidth and canvasHeight will be defined before this script runs)

/* extra functions for me */
let imageNoise;
function preload() {
    imageNoise = loadImage('resources/noise.webp');
}

// linear congruential generator because i'm not allowed to use Math.random >:D
// modified code courtesy of https://www.freecodecamp.org/news/random-number-generator/
function lcg(seed, multiplier, increment, modulus, length) {
    const results = [];
    for (let i = 0; i < length; i++) {
        seed = (seed * multiplier + increment) % modulus;
        results.push(seed / modulus); // divides by modulus for a value between 0 and 1
    }
    return results;
};
let lcgArrayLength = 1000;
let lcgArray = lcg(58008, 16807, 0, 2147483647, lcgArrayLength);

// defining the canvas outside of the function so i can mess with it a bit more
// let main_canvas;

// defining an offscreen buffer to use as a mask
let buffer;

function setup () {
  let main_canvas = createCanvas(canvasWidth,canvasHeight);
  let r = random(100);
  main_canvas.parent('canvasContainer');
  main_canvas.mouseClicked(changePreset); // click on the canvas to change colors
  frameRate(24 * buffersPerFrame);


    // just setting some stuff up for draw_one_frame.js shouldn't break anything dont yell at me k thx    
    // colorMode(HSB, 360, 100, 100, 100);
    colorMode(RGB);
    rectMode(CENTER);
    noStroke();
    noSmooth(); // Disables antialising

    buffer = createGraphics(canvasWidth, canvasHeight); // defining the offscreen buffer
    buffer.colorMode(RGB);
    buffer.rectMode(CENTER);
    buffer.noStroke();
    buffer.noSmooth();

}

function mousePressed(){
}

function draw () {
  let animation_max_frames = frameMax * buffersPerFrame;
  let sticky_max_frames = animation_max_frames + stickFrame;
  let cur_frame = frameCount % sticky_max_frames;
  if (cur_frame >= animation_max_frames) {
    cur_frame = 0;
  }
  let cur_frac = map(cur_frame, 0, animation_max_frames, 0, 1);

  background(debugZoomBackground);

  push();

  if(debugZoom) {
    translate(0.5 * width, 0.5 * height);
    scale(debugZoomScale);
    translate(0.5 * -width, 0.5 * -height);    
  }

  draw_one_frame(cur_frac);

  pop();

  if(debugView) {
    textSize(28);
    fill(debugViewText);
    text("" + (cur_frame/buffersPerFrame).toFixed(2) + " / " + 
      (animation_max_frames/buffersPerFrame).toFixed(2) + " = " + 
      cur_frac.toFixed(2), 50, 50);
  }

  if(recording) {
    textSize(24);
    gifRecorder.addBuffer();
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  if (key == ' ') {
    debugZoom = !debugZoom;
  }
  if (key == 'd') {
    debugView = !debugView;
  }
  if (key == '1') {
    frameRate(1);
    stickFrame = 0;
  }
  if (key == '2') {
    frameRate(5);
    stickFrame = 5;
  }
  if (key == '3') {
    frameRate(30);
    stickFrame = 0;
  }
  if (key == 'r') {
    if (recording==false){
      recording = true;
      gifRecorder = new p5recorder (frameMax, 'wallpaper.gif', buffersPerFrame);
    }    
  }
}
