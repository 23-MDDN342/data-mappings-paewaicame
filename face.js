/*
* FaceMap class - holds all informaiton about one mapped
* face and is able to draw itself.
*/

let randomSeedMultiplier = Math.random(10,1000);

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 3;

// other variables can be in here too
// here's some examples for colors used
const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
    let sum_x = 0;
    let sum_y = 0;
    let s_len = segment.length;
    for (let i = 0; i < s_len; i++) {
        sum_x = sum_x + segment[i][0];
        sum_y = sum_y + segment[i][1];
    }
    return [sum_x / s_len, sum_y / s_len];
}


// global variables for colors
const paletteBackground = [0, 0, 0];
const paletteStroke = [22, 20, 31, 255];
const paletteStrokeShadow = [42, 34, 37, 64];
const paletteStrokeShadowOffset = 0.5;

// grid parameters
const totalColumns = 7;
const totalRows = 5;
const faceScale = 10;
// minimum and maximum face sizes for squishing 
const faceWidthMinimum = 13.75;
const faceWidthMaximum = 27.5;
const faceHeightMinimum = 15;
const faceHeightMaximum = 30;
let faceWidth = (faceWidthMinimum + faceWidthMaximum) / 2;
let faceHeight = (faceHeightMinimum + faceHeightMaximum) / 2;
let squishFactor = 0;
let defaultStrokeWeight = 1;

// This where you define your own face object
function Face() {
    // these are state variables for a face
    // (your variables should be different!)
    this.detailColour = [204, 136, 17];
    this.mainColour = [51, 119, 153];
    this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
    this.eye_shift = -1;   // range is -10 to 10
    this.mouth_size = 1;  // range is 0.5 to 8
    
    this.chinColour = [153, 153, 51];
    this.lipColour = [136, 68, 68];
    this.eyebrowColour = [119, 85, 17];

    this.skintoneLevel = 0.5
    this.genderIdentity = 0
    this.age = 30

    this.skintoneChoiceX = 0.5;
    this.hairtoneChoiceX = 0.5;
    this.hairtoneChoiceY = 0.5;
    this.eyesChoice = 0.5;
    this.noseChoice = 0.5;
    this.mouthChoice = 0.5;
    this.hairChoice = 0.5;

    this.skintone = hairtonesImage.get(0.5 * (hairtonesImage.width-1), 0.5 * (hairtonesImage.height-1)); // select a random colour from hair colour palette image
    this.hairtone = hairtonesImage.get(0,5 * (hairtonesImage.width-1), 0.5 * (hairtonesImage.height-1)); // select a random colour from hair colour palette image
    this.eyes = Math.floor(this.eyesChoice * Object.keys(eyesIndex).length); // randomly select eyes
    this.nose = Math.floor(this.noseChoice * Object.keys(noseIndex).length); // randomly select nose
    this.mouth = Math.floor(this.mouthChoice * Object.keys(mouthIndex).length); // randomly select mouth
    this.hair = Math.floor(this.hairChoice * Object.keys(hairIndex).length); // randomly select hair
    
    this.eyesScale = 1; // Averaged random for eye size
    this.eyesRandomSquishedChoice = 0.5; // Simple random for eye variant (if applicable)
    this.noseScale = 1; // Averaged random for nose size
    this.mouthScale = 1; // Averaged random for mouth size
    this.hairScale = faceWidth/15; // calculate hair size, as wide as the face width

    /*
    * Draw the face with position lists that include:
    *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
    *    bottom_lip, top_lip, nose_tip, nose_bridge, 
    */
    this.draw = function (positions) {
        push();
        translate(0,-0.5)
        scale(0.2);

            push();
            this.drawFace(positions,true,false);
            pop();
        
            push();
            this.drawFace(positions,false,true);
            pop();

            push();
            this.drawFace(positions,false,false);
            pop();

        pop();

        // // head
        // ellipseMode(CENTER);
        // stroke(stroke_color);
        // fill(this.mainColour);
        // ellipse(segment_average(positions.chin)[0], 0, 3, 4);
        // noStroke();
        
        // mouth
        // fill(this.detailColour);
        // ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);

        // eyebrows
        // fill(this.eyebrowColour);
        // stroke(this.eyebrowColour);
        // strokeWeight(0.08);
        // this.draw_segment(positions.left_eyebrow);
        // this.draw_segment(positions.right_eyebrow);
        
        // // draw the chin segment using points
        // fill(this.chinColour);
        // stroke(this.chinColour);
        // this.draw_segment(positions.chin);
        
        // // nose
        // fill(100, 0, 100);
        // stroke(100, 0, 100);
        // this.draw_segment(positions.nose_bridge);
        // this.draw_segment(positions.nose_tip);
        
        // strokeWeight(0.03);
        
        // fill(this.lipColour);
        // stroke(this.lipColour);
        // this.draw_segment(positions.top_lip);
        // this.draw_segment(positions.bottom_lip);
        
        // let left_eye_pos = segment_average(positions.left_eye);
        // let right_eye_pos = segment_average(positions.right_eye);

        // eyes
        // noStroke();
        // let curEyeShift = 0.04 * this.eye_shift;
        // if (this.num_eyes == 2) {
        //     fill(this.detailColour);
        //     ellipse(left_eye_pos[0], left_eye_pos[1], 0.5, 0.33);
        //     ellipse(right_eye_pos[0], right_eye_pos[1], 0.5, 0.33);
        // }
        // else {
        //     let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
        //     let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;
        
        //     fill(this.detailColour);
        //     ellipse(eyePosX, eyePosY, 0.45, 0.27);
        
        //     fill(this.mainColour);
        //     ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
        // }
    };
    
    // example of a function *inside* the face object.
    // this draws a segment, and do_loop will connect the ends if true
    this.draw_segment = function (segment, do_loop) {
        for (let i = 0; i < segment.length; i++) {
            let px = segment[i][0];
            let py = segment[i][1];
            ellipse(px, py, 0.1);
            if (i < segment.length - 1) {
                let nx = segment[i + 1][0];
                let ny = segment[i + 1][1];
                line(px, py, nx, ny);
            }
            else if (do_loop) {
                let nx = segment[0][0];
                let ny = segment[0][1];
                line(px, py, nx, ny);
            }
        }
    };
    
    /* set internal properties based on list numbers 0-100 */
    this.setProperties = function (settings) {
        this.skintoneLevel = map(settings[0], 0, 100, 0, 1);
        this.genderIdentity = map(settings[1], 0, 100, 0, 1);
        this.age = map(settings[2], 0, 100, 0, 1);
    };
    
    /* get internal properties as list of numbers 0-100 */
    this.getProperties = function () {
        let settings = new Array(3);
        settings[0] = map(this.skintoneLevel, 0, 1, 0, 100);
        settings[1] = map(this.genderIdentity, 0, 1, 0, 100);
        settings[2] = map(this.age, 0, 1, 0, 100);
        return settings;
    };

    this.drawFace = function (positions,background,shadow) {
        rectMode(CENTER); // center drawing coordinates

        this.skintonesImageSelected = this.genderIdentity < 0.5 ? skintonesFeminineImage : skintonesMasculineImage;

        let chinPosition0 = positions.chin[0][0] * randomSeedMultiplier;
        let chinPosition1 = positions.chin[1][0] * randomSeedMultiplier;
        let chinPosition2 = positions.chin[2][0] * randomSeedMultiplier;
        let chinPosition3 = positions.chin[3][0] * randomSeedMultiplier;
        let chinPosition4 = positions.chin[4][0] * randomSeedMultiplier;
        let chinPosition5 = positions.chin[5][0] * randomSeedMultiplier;
        let chinPosition6 = positions.chin[6][0] * randomSeedMultiplier;

        this.skintoneChoiceX = Math.abs(chinPosition0 - Math.trunc(chinPosition0));
        this.hairtoneChoiceX = Math.abs(chinPosition1 - Math.trunc(chinPosition1));
        this.hairtoneChoiceY = Math.abs(chinPosition2 - Math.trunc(chinPosition2));
        this.eyesChoice = Math.abs(chinPosition3 - Math.trunc(chinPosition3));
        this.noseChoice = Math.abs(chinPosition4 - Math.trunc(chinPosition4));
        this.mouthChoice = Math.abs(chinPosition5 - Math.trunc(chinPosition5));
        this.hairChoice = Math.abs(chinPosition6 - Math.trunc(chinPosition6));

        this.skintone = this.skintonesImageSelected.get(this.skintoneChoiceX * (this.skintonesImageSelected.width - 1), this.skintoneLevel * (this.skintonesImageSelected.height - 1)); // select a random colour from skin tone palette image
        this.hairtone = hairtonesImage.get(this.hairtoneChoiceX * (hairtonesImage.width-1), this.hairtoneChoiceY * (hairtonesImage.height-1)); // select a random colour from hair colour palette image

        this.eyes = Math.floor(this.eyesChoice * Object.keys(eyesIndex).length); // randomly select eyes
        this.nose = Math.floor(this.noseChoice * Object.keys(noseIndex).length); // randomly select nose
        this.mouth = Math.floor(this.mouthChoice * Object.keys(mouthIndex).length); // randomly select mouth
        this.hair = Math.floor(this.hairChoice * Object.keys(hairIndex).length); // randomly select hair    

        if (background) { // no features, just draw colour background and return
            noStroke();
            fill(this.skintone);
            rect(0, 0, faceWidth, faceHeight);
            arc(-faceWidth / 2, 0, 5, 5, 90, 270);
            arc(faceWidth / 2, 0, 5, 5, 270, 90);
            return;
        }
        fill(0,0,0,0);
        strokeWeight(defaultStrokeWeight);
        if (shadow) { // draw translucent strokes for shadows
            translate(0, paletteStrokeShadowOffset);
            stroke(paletteStrokeShadow);
        } else { // draw opaque strokes normally
            stroke(paletteStroke);
        }
        
        let faceDistance = Math.sqrt((positions.bottom_lip[3][0] - positions.top_lip[3][0]) ** 2 + (positions.bottom_lip[3][1] - positions.top_lip[3][1]) ** 2);
        let faceState = faceDistance > 0.6 ? false : true;

        let eyesSelected = this.eyes; // selected eyes index
        let eyesNeutral = eyesIndex[eyesSelected].neutral; // selected eyes, neutral variant
        let eyesSquishedSelected = Math.floor(map(this.eyesRandomSquishedChoice,0,1,0,eyesIndex[eyesSelected].squished.length)); // pick from possible squished variants
        let eyesSquished = eyesIndex[eyesSelected].squished[eyesSquishedSelected]; // select eyes, squished variant
        
        let positionLeftEye = segment_average(positions.left_eye);
        let positionRightEye = segment_average(positions.right_eye);
        
        // let eyesInterpupillaryDistance = map(squishFactor,-1,1,this.eyesInterpupillaryDistance*0.65,this.eyesInterpupillaryDistance); // calculate interpupillary distance based on squish factor
        let eyesInterpupillaryDistance = (positionRightEye[0] - positionLeftEye[0] * 10) ; // calculate interpupillary distance based on squish factor
        let eyesHeightOffset = map(squishFactor,-1,1,-3,-4); // calculate height offset based on squish factor
        
        let noseSelected = this.nose; // selected nose index
        let nose = noseIndex[noseSelected]; // selected nose
        let noseHeightOffset = 0; // define height offset
        
        let mouthSelected = this.mouth; // selected mouth index
        let mouthNeutral = mouthIndex[mouthSelected].neutral; // selected neutral mouth
        let mouthSquished = mouthIndex[mouthSelected].squished; // selected squished mouth
        let mouthHeightOffset = map(squishFactor,-1,1,4,5); // calculate height offset based on squish factor
        
        let hairSelected = this.hair; // selected hair index
        let hairHeightOffset = -faceHeight/2; // calculate top of head to draw hair in correct position
        
        push(); // draw central features, push and pop needed for head orientation
        let noseDirectionHorizontal = positions.nose_tip[1][0];
        let noseDirectionVertical = positions.nose_tip[1][1];
        translate(noseDirectionHorizontal*5, noseDirectionVertical*5);

        push(); // draw left eye
        translate(eyesInterpupillaryDistance / 2, 0);
        scale(this.eyesScale);
        strokeWeight(defaultStrokeWeight/this.eyesScale);
        pop();


        push(); // draw eyes
        translate(0, eyesHeightOffset);
        translate(noseDirectionHorizontal * 2, noseDirectionVertical * 2);
        
            push(); // draw left eye
            translate(eyesInterpupillaryDistance / 2, 0);
            scale(this.eyesScale);
            strokeWeight(defaultStrokeWeight/this.eyesScale);
            faceState ? eyesNeutral() : eyesSquished();
            pop();
            
            push(); // draw right eye
            translate(eyesInterpupillaryDistance / -2, 0);
            scale(this.eyesScale);
            strokeWeight(defaultStrokeWeight/this.eyesScale);
            faceState ? eyesNeutral() : eyesSquished();
            pop();
        
        pop();
        
        push(); // draw nose
        translate(0, noseHeightOffset);
        if (noseDirectionHorizontal > 0) { // flips the nose based on face orientation
            scale(-1,1);
        }

        scale(this.noseScale);
        strokeWeight(defaultStrokeWeight/this.noseScale);
        nose();
        pop();
        
        push(); // draw mouth
        translate(0, mouthHeightOffset);
        scale(this.mouthScale);
        strokeWeight(defaultStrokeWeight/this.mouthScale);
        faceState ? mouthNeutral() : mouthSquished();
        pop();

        pop();
        
        push(); // draw face outline
        arc(-faceWidth / 2, 0, 5, 5, 90, 270);
        arc(faceWidth / 2, 0, 5, 5, 270, 90);
        line(-faceWidth / 2, -faceHeight / 2, -faceWidth / 2, -2.5);
        line(-faceWidth / 2, faceHeight / 2, -faceWidth / 2, 2.5);
        line(faceWidth / 2, -faceHeight / 2, faceWidth / 2, -2.5);
        line(faceWidth / 2, faceHeight / 2, faceWidth / 2, 2.5);
        line(faceWidth / 2, faceHeight / 2, -faceWidth / 2, faceHeight / 2);
        line(faceWidth / 2, -faceHeight / 2, -faceWidth / 2, -faceHeight / 2);
        pop();

        push(); // draw hair
        fill(this.hairtone);
        translate(0, hairHeightOffset);
        scale(faceWidth/15);
        strokeWeight(defaultStrokeWeight/(faceWidth/15));
        
        if (this.age >= 0.7) { // draw white hair if age exceeds 0.7
            fill(205,209,218);
        } 
        if (this.age < 0.85) { // draw hair, unless age exceeds 0.85
            hairIndex[hairSelected]();
        }
        pop();
    }
}

function getAveragedRandom(min, max, n) { // from nuku
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum = sum + random(min, max);
    }
    return sum / n;
}

let eyesIndex = {
    0: {
        neutral: function () { // single dots
            fill(paletteStroke);
            circle(0, 0, 1);
        },
        squished: [
            function () { // circle with dot
                circle(0, 0, 4);
                fill(paletteStroke);
                circle(0, 0, 0.25);
            },
            function () { // horizontal oval with dot
                angleMode(DEGREES);
                rotate(-90);
                arc(-3.25, 0, 7, 7, -25, 25);
            },
        ]
    },
    1: {
        neutral: function () { // vertical line
            line(0, -1, 0, 1);
        },
        squished: [
            function () { // vertical oval with dot
                rect(0, 0, 3, 5, 2);
                fill(paletteStroke);
                circle(0, 0, 0.25);
            }
        ]
    },
    2: {
        neutral: function () { // horizontal line
            line(-1, 0, 1, 0);
        },
        squished: [
            function () { // horizontal oval with dot
                rect(0, 0, 5, 3, 2);
                fill(paletteStroke);
                circle(0, 0, 0.25);
            }
        ]
    }
}
let noseIndex = {
    0: function () { // downward-pointing
        beginShape();
        vertex(1,-1.5)
        vertex(-2,1.5)
        vertex(1,1.5)
        endShape();
    },
    1: function () { // forward-pointing
        beginShape();
        vertex(1,-1.5)
        vertex(-2,0)
        vertex(1,1.5)
        endShape();
    },
    2: function () { // upward-pointing
        beginShape();
        vertex(1,-1)
        vertex(-2,-1)
        vertex(1,2)
        endShape();
    },
    3: function () { // forward-facing button
        arc(0,0,3,3,45,315);
    },
    4: function () { // downard-facing button
        rotate(-90);
        arc(0,0,3,3,45,315);
    },
    5: function () { // trapezoid
        beginShape();
        vertex(-1,-1.5)
        vertex(-2,1.5)
        vertex(2,1.5)
        vertex(1,-1.5)
        endShape();
    },
    6: function () { // funky
        line(0,-2,0,0);
        line(0,0,-1,0);
        arc(-1,1,2,2,90,270);
        line(-1,2,2,2);
    },
    7: function () { // U-shaped
        line(-1,-1,-1,0);
        line(1,-1,1,0);
        arc(0,0,2,2,0,180);
    },
    8: function () { // N-shaped
        line(-1,0,-1,1);
        line(1,0,1,1);
        arc(0,0,2,2,180,360);
    },
    9: function () { // butt-shaped
        arc(-1,0,2,2,0,225);
        arc(1,0,2,2,315,180);
    },
    10: function () { // stubby
        line(-2,-0.5,-2,0);
        line(2,-0.5,2,0);
        line(-1,1,1,1);
        arc(-1,0,2,2,90,180)
        arc(1,0,2,2,0,90)
    },
}
let mouthIndex = {
    0: {
        neutral: function () { // line
            line(-3, 0, 3, 0);
        },
        squished: function () { // circle
            circle(0, 0, 3);
        }
    },
    1: {
        neutral: function () { // smile
            angleMode(DEGREES);
            rotate(90);
            arc(-10, 0, 20, 20, -20, 20);
        },
        squished: function () { // grin
            angleMode(DEGREES);
            rotate(90);
            arc(-1.5, 0, 6, 6, -90, 90);
            line(-1.5, -3, -1.5, 3);
        }
    },
    2: {
        neutral: function () { // sad
            angleMode(DEGREES);
            rotate(-90);
            arc(-10, 0, 20, 20, -20, 20);
        },
        squished: function () { // unhappy
            angleMode(DEGREES);
            rotate(-90);
            arc(-1.5, 0, 6, 6, -90, 90);
            line(-1.5, -3, -1.5, 3);
        }
    },
    3: {
        neutral: function () { // meek
            line(-3, 0, 3, 0);
            line(-3, -1, -3, 1);
            line(3, -1, 3, 1);
        },
        squished: function () { // horizontal mouth open
            rect(0, 0, 6, 2, 1);
        }
    },
    4: {
        neutral: function () { // tongue out
            line(-3, 0, 3, 0);
            rect(1, 1.5, 2, 3, 0, 0, 1, 1);
        },
        squished: function () { // vertical mouth open
            rect(0, 0, 2, 4, 1);
        }
    },
    5: {
        neutral: function () { // uneasy
            beginShape();
            vertex(-3, 0.5);
            vertex(-1.5, -0.5);
            vertex(-0, 0.5);
            vertex(1.5, -0.5);
            vertex(3, 0.5);
            endShape();
        },
        squished: function () { // grimacing
            rect(0, 0, 6, 2, 1);
            line(-1, -1, -1, 1);
            line(1, -1, 1, 1);
        }
    },
}
let hairIndex = {
    0: function () { // block
        rect(0,0,15,5);
    },
    1: function () { // diagonal rounded
        rect(0,0,15,5,0,5,0,5);
    },
    2: function () { // top rounded
        rect(0,0,15,5,5,5,0,0);
    },
    3: function () { // spiky
        beginShape();
        vertex(-7.5,2.5);
        vertex(-7.5,0);
        vertex(-6,-2.5);
        vertex(-4.5,0);
        vertex(-3,-2.5);
        vertex(-1.5,0);
        vertex(0,-2.5);
        vertex(1.5,0);
        vertex(3,-2.5);
        vertex(4.5,0);
        vertex(6,-2.5);
        vertex(7.5,0);
        vertex(7.5,2.5);
        endShape(CLOSE);
    },
    4: function () { // left rounded
        beginShape();
        vertex(-5,2.5);
        vertex(7.5,2.5);
        vertex(7.5,-2.5);
        vertex(-5,-2.5);
        endShape();
        arc(-5,0,5,5,90,270)
    },
    5: function () { // bumpy
        beginShape();
        vertex(-7.5,0);
        vertex(-7.5,2.5);
        vertex(7.5,2.5);
        vertex(7.5,0);
        endShape();
        arc(-5.625,0,3.75,5,180,360);
        arc(-1.875,0,3.75,5,180,360);
        arc(1.875,0,3.75,5,180,360);
        arc(5.625,0,3.75,5,180,360);
    },
    6: function () { // side part
        push();
        noStroke();
        rect(1.25,0,12.5,2.5)
        rect(5,2.5,5,2.5)
        pop();
        
        arc(-5,-1.25,5,5,90,180);
        arc(2.5,1.25,5,5,90,180);
        line(-5,1.25,0,1.25);
        line(2.5,3.75,7.5,3.75);
        line(7.5,-2.5,7.5,3.75);
        
        beginShape();
        vertex(-7.5,-1.25);
        vertex(-7.5,-2.5);
        vertex(7.5,-2.5);
        vertex(7.5,-1.25);
        endShape();
    },
    7: function () { // buzzcut
        let totalLines = 11;
        for (let i = 0; i < totalLines; i++) {
            let lineX = map(i,0,totalLines-1,-7.5,7.5);
            line(lineX,-1.25,lineX,1.25);
        }
        line(-7.5,0,7.5,0);
    },
    8: function () { // middle part
        beginShape();
        vertex(-7.5,-2.5);
        vertex(7.5,-2.5);
        vertex(7.5,3.75);
        vertex(5,1.25);
        vertex(-5,1.25);
        vertex(-7.5,3.75);
        endShape(CLOSE);
    }
}