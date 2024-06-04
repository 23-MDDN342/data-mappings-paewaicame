/*
function draw_one_frame(cur_frac) {
  // note: to clear the screen draw a rectangle
  // that is width x height - like this
  noStroke();
  fill(10);
  rect(0, 0, width, height);

  // note: all shape sizes, line widths, etc. should be a
  // function of width and height
  let rect_width = height / 10.0;
  let half_width = rect_width / 2;

  // note: animation should progress depending on the 
  // value of cur_frac which goes from 0 to 1, and it
  // should loop seamlessly
  let cur_x = map(cur_frac, 0, 1, 0, width) - half_width;

  fill(200);
  // draw the rect moving across the screen
  rect(cur_x, 0, rect_width, height);
  // a second version (offscreen) for when it loops back around
  rect(cur_x+width, 0, rect_width, height);
  rect(cur_x-width, 0, rect_width, height);

  // note: you can draw optional things depending on "debugView"
  if (debugView) {
    // we'll draw our "keyframes"
    noFill();
    stroke(255, 0, 0);
    strokeWeight(height/100);
    // here we "plug in" the values when cur_frac is 0
    rect(-half_width, 0, rect_width, height);
    rect( width - half_width, 0, rect_width, height);
    rect(-width - half_width, 0, rect_width, height);
  }
}
*/





let shapeArray = []; // stores each shape in an array
let shapeTotal = 200 // total number of shapes to generate at a time
let shapeLcgIndex = 0; // current index along LCG array
let shapeLcgIndexOffset = 123; // offset for the LCG array

let gradientShift = 0; // variable to store progression of the shifting gradients

let presets = [
    { // preset 1
        gradient: { // stores the colors for the background shapes
            dark: "#7999C0",
            light: "#EBE7E0"
        },
        overlay: { // stores the colors for the overlay rings
            background: "#251E64",
            foreground1: "#C66FD0",
            foreground2: "#E4A953"
        },
        rings: [ // stores the positions of the overlay rings
            { // 1a
                x: 120,
                y: -110,
                r: 260,
                w: 120,
                f: true
            },
            { // 1b
                x: 120,
                y: -110,
                r: 40,
                w: 120,
                f: false
            },
            { // 2a
                x: -120,
                y: 140,
                r: 320,
                w: 120,
                f: true
            },
            { // 2b
                x: -120,
                y: 140,
                r: 100,
                w: 120,
                f: false
            },
            { // 3
                x: -180,
                y: -200,
                r: 220,
                w: 120,
                f: true
            },
            { // 4
                x: 200,
                y: 160,
                r: 140,
                w: 120,
                f: true
            },
        ]
    },
    { // preset 2
        gradient: {
            dark: "#6EC36D",
            light: "#EBE7E0"
        },
        overlay: {
            background: "#14321C",
            foreground1: "#D7BE69",
            foreground2: "#CD4D89"
        },
        rings: [
            { // 1a
                x: 120,
                y: 40,
                r: 260,
                w: 120,
                f: true
            },
            { // 1b
                x: 120,
                y: 40,
                r: 60,
                w: 120,
                f: false
            },
            { // 2a
                x: -120,
                y: -140,
                r: 320,
                w: 120,
                f: true
            },
            { // 2b
                x: -100,
                y: -140,
                r: 80,
                w: 120,
                f: false
            },
            { // 3
                x: -140,
                y: 160,
                r: 140,
                w: 120,
                f: false
            },
        ]
    },
    { // preset 3
        gradient: {
            dark: "#DD845C",
            light: "#EBE7E0"
        },
        overlay: {
            background: "#471737",
            foreground1: "#954DA2",
            foreground2: "#9DA1EA"
        },
        rings: [
            { // 1a
                x: 140,
                y: 0,
                r: 260,
                w: 120,
                f: true
            },
            { // 1b
                x: 140,
                y: 0,
                r: 60,
                w: 120,
                f: false
            },
            { // 2a
                x: -160,
                y: 0,
                r: 320,
                w: 120,
                f: true
            },
            { // 2b
                x: -160,
                y: 0,
                r: 120,
                w: 120,
                f: false
            },
        ]
    },
    { // preset 4
        gradient: {
            dark: "#44A07E",
            light: "#EBE7E0"
        },
        overlay: {
            background: "#471737",
            foreground1: "#DEA276",
            foreground2: "#C34B4B"
        },
        rings: [
            { // 1a
                x: -80,
                y: -140,
                r: 280,
                w: 120,
                f: true
            },
            { // 1b
                x: -80,
                y: -140,
                r: 80,
                w: 120,
                f: false
            },
            { // 2
                x: 120,
                y: 80,
                r: 200,
                w: 120,
                f: true
            },
            { // 3
                x: -120,
                y: 140,
                r: 120,
                w: 120,
                f: false
            },
            { // 3
                x: -280,
                y: 40,
                r: 80,
                w: 120,
                f: false
            },
            { // 4
                x: 280,
                y: -100,
                r: 120,
                w: 120,
                f: false
            },
        ]
    },
    { // preset 5
        gradient: {
            dark: "#D77289",
            light: "#EBE7E0"
        },
        overlay: {
            background: "#341640",
            foreground1: "#677CBD",
            foreground2: "#74B5BB"
        },
        rings: [
            { // 1a
                x: -100,
                y: -140,
                r: 360,
                w: 120,
                f: true
            },
            { // 1b
                x: -100,
                y: -140,
                r: 120,
                w: 120,
                f: false
            },
            { // 2a
                x: 120,
                y: 140,
                r: 260,
                w: 120,
                f: true
            },
            { // 2b
                x: 120,
                y: 140,
                r: 40,
                w: 120,
                f: false
            },
            { // 3
                x: -280,
                y: 120,
                r: 240,
                w: 120,
                f: true
            },
            { // 4
                x: 260,
                y: -120,
                r: 180,
                w: 120,
                f: true
            },
        ]
    },
    { // preset 6
        gradient: {
            dark: "#A07DCD",
            light: "#EBE7E0"
        },
        overlay: {
            background: "#1F1640",
            foreground1: "#469F58",
            foreground2: "#C3DA72"
        },
        rings: [
            { // 1a
                x: 140,
                y: -140,
                r: 320,
                w: 120,
                f: true
            },
            { // 1b
                x: 140,
                y: -140,
                r: 100,
                w: 120,
                f: false
            },
            { // 2a
                x: 20,
                y: 140,
                r: 220,
                w: 120,
                f: true
            },
            { // 2b
                x: 20,
                y: 140,
                r: 20,
                w: 120,
                f: false
            },
            { // 3a
                x: -180,
                y: 0,
                r: 220,
                w: 120,
                f: true
            },
            { // 3b
                x: -180,
                y: 0,
                r: 20,
                w: 120,
                f: false
            },
            { // 4
                x: 240,
                y: 120,
                r: 40,
                w: 120,
                f: false
            },
        ]
    },
    { // preset 7
        gradient: {
            dark: "#59AEC0",
            light: "#EBE7E0"
        },
        overlay: {
            background: "#2B1C3A",
            foreground1: "#DD8D3C",
            foreground2: "#ECCF79"
        },
        rings: [
            { // 1a
                x: -80,
                y: 140,
                r: 340,
                w: 120,
                f: true
            },
            { // 1B
                x: -80,
                y: 140,
                r: 140,
                w: 120,
                f: true
            },
            { // 2a
                x: 160,
                y: -120,
                r: 340,
                w: 120,
                f: true
            },
            { // 2b
                x: 220,
                y: -120,
                r: 180,
                w: 120,
                f: true
            },
            { // 3
                x: -220,
                y: -80,
                r: 180,
                w: 120,
                f: true
            },
            { // 4
                x: 220,
                y: 160,
                r: 80,
                w: 120,
                f: false
            },
        ]
    },
    { // preset 8
        gradient: {
            dark: "#615775",
            light: "#EBE7E0"
        },
        overlay: {
            background: "#1B161D",
            foreground1: "#B9466D",
            foreground2: "#DB7079"
        },
        rings: [
            { // 1a
                x: -40,
                y: -120,
                r: 260,
                w: 120,
                f: true
            },
            { // 1b
                x: -40,
                y: -120,
                r: 60,
                w: 120,
                f: false
            },
            { // 2a
                x: 120,
                y: 120,
                r: 300,
                w: 120,
                f: true
            },
            { // 2b
                x: 120,
                y: 120,
                r: 80,
                w: 120,
                f: false
            },
            { // 3a
                x: -240,
                y: 60,
                r: 240,
                w: 120,
                f: true
            },
            { // 3b
                x: -240,
                y: 60,
                r: 40,
                w: 120,
                f: false
            },
            { // 4
                x: 240,
                y: -160,
                r: 160,
                w: 120,
                f: true
            },
        ]
    },
];

let presetIndex = 0; // index for the selected color preset

// variables for storing colors from the color palette
let gradientLight;
let gradientDark;
let bufferForeground1;
let bufferForeground2;
let bufferBackground;
let colorStopList;
let ringArray;

// sets variables for the selected preset for the draw function to use
function setPreset() {
    let presetSelected = presetIndex % presets.length;
    gradientLight = presets[presetSelected].gradient.light;
    gradientDark = presets[presetSelected].gradient.dark;
    bufferForeground1 = presets[presetSelected].overlay.foreground1;
    bufferForeground2 = presets[presetSelected].overlay.foreground2;
    bufferBackground = presets[presetSelected].overlay.background;
    // defines a list of color stops for the shape gradients to use, based on the selected color palette
    colorStopList = [
        {
            position: 0,
            color: gradientDark
        },
        {
            position: 0.2,
            color: gradientLight
        },
        {
            position: 0.4,
            color: gradientDark
        },
        {
            position: 0.6,
            color: gradientLight
        },
        {
            position: 0.8,
            color: gradientDark
        },
        {
            position: 1,
            color: gradientLight
        },
    ];
    ringArray = presets[presetSelected].rings;
}
setPreset();

let firstFrame = true; // for code that only needs to run once

function draw_one_frame() {
    // generates shapes on startup
    if (firstFrame) {
        for (let i = 0; i < shapeTotal; i++) {
            addShape();
        }
    }
    firstFrame = false;

    // draw background shapes
    background(gradientDark);
    shapeArray.forEach(element => {
        drawShape(element);
    });

    // draw buffer rings
    buffer.background(bufferBackground);
    ringArray.forEach(element => {
        drawRing(element.x, element.y, element.r, element.w, element.f);
    });

    // draws a noise texture and the rings with an overlay blend mode
    blendMode(OVERLAY);
    image(imageNoise, 0, 0, width, height, 0, 0, imageNoise.width, imageNoise.height, COVER);
    drawingContext.drawImage(buffer.canvas, -canvasWidth / 2, -canvasHeight / 2);
    
    // shifts the gradient along, 24 frames per cycle
    gradientShift += 1 / 12;
}

// creates a linear gradient for shape fills
function linearGradient(x1, y1, x2, y2, colorStops) {
    let gradient = drawingContext.createLinearGradient(x1, y1, x2, y2);
    colorStops.forEach(element => {
        gradient.addColorStop(element.position, color(element.color));
    });
    return gradient;
}

// returns a value from the LCG array. based on a fractional percentage across the array so each time the LCG is used, a different number is picked for each purpose
function returnLcg(fraction, total) {
    return lcgArray[(shapeLcgIndex + shapeLcgIndexOffset + (Math.floor(lcgArrayLength * fraction / total))) % lcgArrayLength];
}

// changes the color preset and generates a new set of shapes
function changePreset() {
    presetIndex++;
    setPreset();
    shapeArray = [];
    for (let i = 0; i < shapeTotal; i++) {
        addShape();
    }
}

// draws a ring to the offscreen buffer, based on the selected preset
function drawRing(x, y, r, w, f) {
    let displayScaleFactor = width / 960;
    // sets the appropriate fill style for the ring's own gradients
    buffer.drawingContext.fillStyle = linearGradient(
        0, height / 2, 0, 0,
        [
            {
                position: 0,
                color: bufferForeground1,
            },
            {
                position: 1,
                color: bufferForeground2,
            }
        ]
    );

    // draws the main circle
    buffer.circle((width / 2) + (x * displayScaleFactor), (height / 2) + (y * displayScaleFactor), (r + w / 2) * displayScaleFactor);
    console.log(width + " " + height)

    // fills in the center to turn the circle into a ring (if set via the preset)
    if (f) {
        buffer.drawingContext.fillStyle = bufferBackground;
        buffer.circle((width / 2) + (x * displayScaleFactor), (height / 2) + (y * displayScaleFactor), (r - w / 2) * displayScaleFactor);
    }
}

// adds a new shape to the array
function addShape() {
    let cornerRadii = 120; // maximum corner radii
    let sizeFactor = 120 * (width / 960); // size of each grid cell
    let minSizeFactor = 1; // minimum cells each shape can expand into
    let maxSizeFactor = 3; // maximum cells each shape can expand into

    // total number of shapes that would fit on the canvas
    let maxHorizontalShapes = Math.floor(width / sizeFactor);
    let maxVerticalShapes = Math.floor(height / sizeFactor);

    // assigns a random width to the shape
    let widthMultiplier = Math.floor(map(returnLcg(0, 12), 0, 1, minSizeFactor, maxSizeFactor + 1));
    let heightMultiplier = Math.floor(map(returnLcg(1, 12), 0, 1, minSizeFactor, maxSizeFactor + 1));

    // defines the absolute width and height of the shape
    let shapeWidth = sizeFactor * widthMultiplier;
    let shapeHeight = sizeFactor * heightMultiplier;
    
    // defines the center of the canvas
    let xOffsetCanvasCenter = width / 2;
    let yOffsetCanvasCenter = height / 2;
    
    // selects a random place on the grid to draw each shape
    let xOffsetRandomGridPlacement = (Math.round(returnLcg(4, 12) * (maxHorizontalShapes + 1) - ((maxHorizontalShapes + 1) / 2))) * sizeFactor;
    let yOffsetRandomGridPlacement = (Math.round(returnLcg(5, 12) * (maxVerticalShapes + 1) - ((maxVerticalShapes + 1) / 2))) * sizeFactor;
    
    // defines a random direction for the shape to extendin if wider than normal
    let widthExtensionDirection = Math.round(returnLcg(2, 12)) * 2 - 1;
    let heightExtensionDirection = Math.round(returnLcg(3, 12)) * 2 - 1;

    // shifts the shape to the left or right if the width is evenly multiplied, to keep it aligned on the grid
    let xOffsetExtension = widthExtensionDirection * 0.5 * (widthMultiplier % 2 == 0 ? 1 : 0) * sizeFactor;
    let yOffsetExtension = heightExtensionDirection * 0.5 * (heightMultiplier % 2 == 0 ? 1 : 0) * sizeFactor;

    // calculates the absolute offset from the screen center to draw each shape
    let xOffset = xOffsetCanvasCenter + xOffsetRandomGridPlacement + xOffsetExtension;
    let yOffset = yOffsetCanvasCenter + yOffsetRandomGridPlacement + yOffsetExtension;

    // selects a gradient orientation
    let gradientChoice = Math.floor(returnLcg(6, 12) * 4);
    
    // selects a random direction for the gradient to shift in
    let gradientShiftDirection = Math.round(returnLcg(11, 12)) * 2 - 1;
    
    // selects random corners to round off
    let cornerRadiiChance = 0.667;
    let cornerRadiiList = [
        returnLcg(7, 12) > cornerRadiiChance ? 0 : cornerRadii,
        returnLcg(8, 12) > cornerRadiiChance ? 0 : cornerRadii,
        returnLcg(9, 12) > cornerRadiiChance ? 0 : cornerRadii,
        returnLcg(10, 12) > cornerRadiiChance ? 0 : cornerRadii
    ];

    // adds the newly created shape to the array
    shapeArray.push(
        {
            x: xOffset,
            y: yOffset,
            w: shapeWidth,
            h: shapeHeight,
            cr: cornerRadiiList,
            g: gradientChoice,
            gs: gradientShiftDirection
        }
    );

    // increments the LCG index for the next shape
    shapeLcgIndex++;
}

// draws a shape from the array to the canvas
function drawShape(element) {
    push();
    // stores the orientation of each possible gradient direction
    let gradients = [
        [-0.5, 0, 0.5, 0],
        [0, -0.5, 0, 0.5],
        [0.5, 0, -0.5, 0],
        [0, 0.5, 0, -0.5]
    ];
    
    // selects a random gradient orientation
    let gradientsRandomChoice = gradients[element.g];

    // scales the gradient up to fill entire shape
    let gradientScaleFactor = 5;

    // calculates the total distance to shift the gradient for each specific shape to create a perfect loop
    let gradientShiftHorizontal = (element.w * (gradientShift % 2 * element.gs));
    let gradientShiftVertical = (element.h * (gradientShift % 2 * element.gs));

    // sets the fills style to the appropriate gradient
    drawingContext.fillStyle = linearGradient(
        element.x + (element.w * gradientsRandomChoice[0] * gradientScaleFactor + gradientShiftHorizontal),
        element.y + (element.h * gradientsRandomChoice[1] * gradientScaleFactor + gradientShiftVertical),
        element.x + (element.w * gradientsRandomChoice[2] * gradientScaleFactor + gradientShiftHorizontal),
        element.y + (element.h * gradientsRandomChoice[3] * gradientScaleFactor + gradientShiftVertical),
        colorStopList
    );

    // draws the actual shape (finally :D)
    rect(
        element.x,
        element.y,
        element.w,
        element.h,
        element.cr[0],
        element.cr[1],
        element.cr[2],
        element.cr[3]
    );
    pop();
}