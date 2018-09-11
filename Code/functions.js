
// Graphics variables
var grid;
var cols;                 // number of columns
var rows;                 // number of rows
var startStop = true;     // flag for starting and stopping the sequencer
var startStopPat = true;  // flag for starting and stopping the pattern
var w = 50;               // width of dots
var fire = false;         // flag to control the firing of the clear animation
var noteQuantityArr = []; // array for looping through the sequencer and patterns
var first = true;         // only want transport to start once

function make2Darray(cols, rows) {

  // Creates a 2 dimensional array

  var arr = new Array(cols);

  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }

  return arr;
}



var guiControls = new function() {

  // Initialise and attach GUI controls

  this.bpm = 100;           // initial BPM
  this.timeSig = 8;         // initial amount of columns
  this.scale = cMajor;      // initial scale
  this.load = function() {	// load up a saved pattern
  pat = localStorage.getObj(0);

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].highlighted = pat[i][j];
      }
    }

  }

  // scales
  this.cMajor = function() {
    this.scale = cMajor;
  }
  this.cMajor2 = function() {
    this.scale = cMajor2;
  }
  this.cMajor3 = function() {
    this.scale = cMajor3;
  }

	// instruments
	this.synth = function() {
		syn = synth;
	}
	this.kickSynth = function() {
		syn = kickSynth;
	}
	this.anotherSynth = function() {
		syn = anotherSynth;
	}
  this.piano = function() {
    syn = piano;
  }

	// self built manipulations, manipulation 1 folder
	this.rotate1 = function() {
		pattern1 = patternRotate;
	}
	this.rotateAnti1 = function() {
		pattern1 = patternRotateAnti;
	}
  this.interpolate1 = function() {
    pattern1 = patternInterpolate;
  }
  this.reverse1 = function() {
    pattern1 = patternReverse;
  }

  // manipulation 1 instrument folder
  this.synth1 = function() {
    man1Inst = synth;
  }
	this.kickSynth1 = function() {
		man1Inst = kickSynth;
	}
	this.anotherSynth1 = function() {
		man1Inst = anotherSynth;
	}
  this.piano1 = function() {
    man1Inst = piano;
  }

  // self built manipulations, manipulation 2 folder
  this.rotate2 = function() {
    pattern2 = patternRotate;
  }
  this.rotateAnti2 = function() {
    pattern2 = patternRotateAnti;
  }
  this.interpolate2 = function() {
    pattern2 = patternInterpolate;
  }
  this.reverse2 = function() {
    pattern2 = patternReverse;
  }

  // manipulation 2 instrument folder
  this.synth2 = function() {
    man2Inst = synth;
  }
	this.kickSynth2 = function() {
		man2Inst = kickSynth;
	}
	this.anotherSynth2 = function() {
		man2Inst = anotherSynth;
	}
  this.piano2 = function() {
    man2Inst = piano;
  }

  // built in tone.js manipulations
  this.up = function() {
    pattern = patternUp;
  }
  this.down = function() {
    pattern = patternDown;
  }
  this.upDown = function() {
    pattern = patternUpDown;
  }
  this.downUp = function() {
    pattern = patternDownUp;
  }
  this.alternateUp = function() {
    pattern = patternAltUp;
  }
  this.alternateDown = function() {
    pattern = patternAltDown;
  }
  this.patternRan = function() {
		pattern = patternRan;
	}
  this.randomWalk = function() {
    pattern = patternRanWalk;
  }
  this.randomOnce = function() {
    pattern = patternRanOnce;
  }
}


function clone(obj) {		// function found here: https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object?page=1&tab=votes#tab-top
												// allows a deep copy to be made (in javascript, = creates a reference, not a copy, and the inbuilt object.assign() creates a shallow copy)
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function mousePressed() {

  // Highlight dot, play respective note
  // and load patterns if clicked on

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {

      if (grid[i][j].contains(mouseX, mouseY)) { // Mouse coordinates
        grid[i][j].highlight();                  // show click

        if (grid[i][j].highlighted) {                      // if dot is highlighted
					syn.triggerAttackRelease(guiControls.scale[j], '8n'); // play respective note
        }

      }

    }
  }

  if (loadPat1Contains(mouseX, mouseY)) {
    loadPat_1();
  } else if (loadPat2Contains(mouseX, mouseY)) {
    loadPat_2();
  } else if (loadPat3Contains(mouseX, mouseY)) {
    loadPat_3();
  } else if (loadPat4Contains(mouseX, mouseY)) {
    loadPat_4();
  }

}



function start() {

  // play all button callback function

  // set index values back to the start
  colIndex = 0;
  colIndexRot = 0;
  colIndexAnt = 0;
  colIndexInt = 0;
  colIndexRev = 0;

  if (startStop == true) {

    // if the check boxes are checked, when the start button is pressed all the music will be scheduled
    if (seqBox.checked()) {
      seq.start();
    }

    if (manipBox.checked()) {
      pattern1.start();
    }

    if (manip2Box.checked()) {
      pattern2.start();
    }

    if (first) {
      Tone.Transport.start(); // For timing musical events
      first = false;
    }

    startStop = false;

  } else {

    seq.stop();

    if (manipBox.checked()) {
      pattern1.stop();
    }

    if (manip2Box.checked()) {
      pattern2.stop();
    }

    fill(242, 242, 242);  // draw over last indicator
    rect(0, 0, 500, 20);
    startStop = true;
    once = true; // restart flag for initialising array copy in rotate functions

  }
}


function loadPat1Contains(x, y) {

  // Used to find if the mouse is contained within a saved pattern

  return (x > 0 && x < (colNum[0] * 20) - 2 && y > 388 && y < 388 + 150);

}

function loadPat2Contains(x, y) {

  // Used to find if the mouse is contained within a saved pattern

  return (x > (colNum[0] * 20) && x < (colNum[0] * 20) + (colNum[1] * 20) - 2 && y > 388 && y < 388 + 150);

}

function loadPat3Contains(x, y) {

  // Used to find if the mouse is contained within a saved pattern

  return (x > (colNum[0] * 20) + (colNum[1] * 20) && x < (colNum[0] * 20)
          + (colNum[1] * 20) + (colNum[2] * 20) - 2 && y > 388 && y < 388 + 150);

}

function loadPat4Contains(x, y) {

  // Used to find if the mouse is contained within a saved pattern

  return (x > (colNum[0] * 20) + (colNum[1] * 20) + (colNum[2] * 20)
         && x < (colNum[0] * 20) + (colNum[1] * 20) + (colNum[2] * 20) + (colNum[3] * 20) - 2
         && y > 388 && y < 388 + 150);

}


// Load the saved patterns
function loadPat_1() {
  pat = localStorage.getObj(0);
  guiControls.timeSig = pat.length;
  gridRedifine();

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].highlighted = pat[i][j];
    }
  }

}

function loadPat_2() {
  pat = localStorage.getObj(1);
  guiControls.timeSig = pat.length;
  gridRedifine();

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].highlighted = pat[i][j];
    }
  }

}

function loadPat_3() {
  pat = localStorage.getObj(2);
  guiControls.timeSig = pat.length;
  gridRedifine();

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].highlighted = pat[i][j];
    }
  }

}

function loadPat_4() {
  pat = localStorage.getObj(3);
  guiControls.timeSig = pat.length;
  gridRedifine();

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].highlighted = pat[i][j];
    }
  }

}


Storage.prototype.setObj = function(key, savedNotes) {

  // saving the note array

    return this.setItem(key, JSON.stringify(savedNotes))
}

Storage.prototype.getObj = function(key) {

  // retrieving the note array

    return JSON.parse(this.getItem(key))
}



function savePat() {

  // Behaviour of the save current pattern button

  savedState = true;
  localStorage.setObj(storageIter, noteGrid); // save the pattern to memory
  pat = localStorage.getObj(storageIter);     // retrieve pattern
  storageIter += 1;

}

var colNum = [];
function showSaved(x, i, j) {

  // displays the saved patterns

  // when a pattern is saved, save the number of columns locally
  // so when a new save occurs with a different number of columns
  // the previous save display won't be changed
  if (x == storageIter - 1) {
    colNum[x] = localStorage.getObj(x).length;
  }

  noFill();
  stroke(0);

  // borders around saved patterns
  if (x == 0) {
    rect(0 , 388, (colNum[x] * 20) - 2, 150);
  } else if (x == 1) {
    rect((colNum[x - 1] * 20), 388, (colNum[x] * 20) - 2, 150);
  } else if (x == 2) {
    rect((colNum[x - 1] * 20) + (colNum[x - 2] * 20), 388, (colNum[x] * 20) - 2, 150);
  } else if (x == 3) {
    rect((colNum[x - 1] * 20) + (colNum[x - 2] * 20) + (colNum[x - 3] * 20), 388, (colNum[x] * 20) - 2, 150);
  }

  // display the notes

  for (var l = 0; l < colNum[x]; l++) {
    fill('red');

    if (x == 0) {
      rect((x * colNum[x] * 20) + l * 20 + 5, 400 + j * 20, 5, 5);
      if (localStorage.getObj(x)[l][j] === 1) {
        fill(0);
        rect((x * colNum[x] * 20) + l * 20 + 5, 400 + j * 20, 5, 5);  // selected notes
      }

    } else if (x == 1) {
      fill('red');
      rect((colNum[x - 1] * 20) + l * 20 + 5, 400 + j * 20, 5, 5);
      if (localStorage.getObj(x)[l][j] === 1) {
        fill(0);
        rect((colNum[x - 1] * 20) + l * 20 + 5, 400 + j * 20, 5, 5);  // selected notes
      }

    } else if (x == 2) {
      fill('red');
      rect((colNum[x - 1] * 20) + (colNum[x - 2] * 20) + l * 20 + 5, 400 + j * 20, 5, 5);
      if (localStorage.getObj(x)[l][j] === 1) {
        fill(0);
        rect((colNum[x - 1] * 20) + (colNum[x - 2] * 20) + l * 20 + 5, 400 + j * 20, 5, 5);  // selected notes
      }

    } else if (x == 3) {
      fill('red');
      rect((colNum[x - 1] * 20) + (colNum[x - 2] * 20) + (colNum[x - 3] * 20) + l * 20 + 5, 400 + j * 20, 5, 5);
      if (localStorage.getObj(x)[l][j] === 1) {
        fill(0);
        rect((colNum[x - 1] * 20) + (colNum[x - 2] * 20) + (colNum[x - 3] * 20) + l * 20 + 5, 400 + j * 20, 5, 5);  // selected notes
      }
    }

  }

}

function clrAll() {

  // clear all callback function for the clear button

  fire = true;
}

function noteQuantity() {
  noteQuantityArr = [];   // set the array back to empty
  for (var i = 0; i < noteGrid.length; i++) {
    noteQuantityArr.push(i);
  }
}


function gridRedifine() {

  // redefine the grid array after changes to the timeSig

  cols = guiControls.timeSig;
  grid = make2Darray(cols, rows);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i * w, j * w, w, cMajor[j]);
    }
  }

  noteGrid = make2Darray(cols, rows);       // initialise array for notes
  noteGridManip = make2Darray(cols, rows);  // initialise array for notes of manipulation
  noteGridManip2 = make2Darray(cols, rows); // initialise array for notes of manipulation
}

function gridExpansion() {

    // animate expand after redefinition of grid

    if (guiControls.timeSig > cols) {           // if the amount of columns has increased
      timeSig.onFinishChange(function(value) {  // when the mouse is released, this function is called

        var previousGrid = clone(grid);

        gridRedifine(); // redefine the grid
        noteQuantity(); // redefine array holding the number of beats

          for (var i = previousGrid.length; i < grid.length; i++) {
            for (var j = 0; j < rows; j++) {
              grid[i][j].w = 0;             // set the width to zero for the amount of expanded columns
              grid[i][j].animateExp = true; // set the individual expansion animation flag
            }
          }
        });

  }
}

function gridShrink() {

  // animate shrink before redefinition of grid

  if (guiControls.timeSig < cols) {           // if the gird columns have decreased
    timeSig.onFinishChange(function(value) {  // when the mouse is released, this function is called

      for (var i = guiControls.timeSig; i < grid.length; i++) {
        for (var j = 0; j < rows; j++) {
          grid[i][j].animateShr = true;       // set the individual shrinking animation flag
        }
      }

    });
  }
}
