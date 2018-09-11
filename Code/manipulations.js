// Music and tone.js variables

// Scales
var cMajor = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
var cMajor2 = ["C2", "D2", "E2", "F2", "G2", "A2", "B2"];
var cMajor3 = ["C3", "D3", "E3", "F3", "G3", "A3", "B3"];

var col;	// current column being played
var storageIter = 0;  // iterator for storing sequences

// MANIPULATIONS LIBRARY //

// passing a string to the Tone.Pattern construnctor stops it from working (values must be hardcoded),
// this means that a lot code has to be repeated just to change one variable... :(

var patternUp = new Tone.Pattern(function(time, col) {
  var column = noteGrid[col];	// seperate the notes out
	// loop through notes

	for (var i = 0; i < 7; i++) {
    if (column[i] === 1) {    // if there is a note selected
			syn.triggerAttackRelease(guiControls.scale[i], '8n');
    }
  }

}, [0, 1, 2, 3, 4, 5, 6, 7], 'up');

patternUp.interval = '16n';	// equalise the timing to the step sequencer itself

var patternDown = new Tone.Pattern(function(time, col) {
  var column = noteGrid[col];	// seperate the notes out

	// loop through notes
  for (var i = 0; i < 7; i++) {
    if (column[i] === 1) {    // if there is a note selected
			syn.triggerAttackRelease(guiControls.scale[i], '8n');
    }
  }

}, [0, 1, 2, 3, 4, 5, 6, 7], 'down');

patternDown.interval = '16n';

var patternUpDown = new Tone.Pattern(function(time, col) {
  var column = noteGrid[col];	// seperate the notes out

	// loop through notes
  for (var i = 0; i < 7; i++) {
    if (column[i] === 1) {    // if there is a note selected
			syn.triggerAttackRelease(guiControls.scale[i], '8n');
    }
  }

}, [0, 1, 2, 3, 4, 5, 6, 7], 'upDown');

patternUpDown.interval = '16n';

var patternDownUp = new Tone.Pattern(function(time, col) {
  var column = noteGrid[col];	// seperate the notes out

	// loop through notes
  for (var i = 0; i < 7; i++) {
    if (column[i] === 1) {    // if there is a note selected
			syn.triggerAttackRelease(guiControls.scale[i], '8n');
    }
  }

}, [0, 1, 2, 3, 4, 5, 6, 7], 'downUp');

patternDownUp.interval = '16n';

var patternAltUp = new Tone.Pattern(function(time, col) {
  var column = noteGrid[col];	// seperate the notes out

	// loop through notes
  for (var i = 0; i < 7; i++) {
    if (column[i] === 1) {    // if there is a note selected
			syn.triggerAttackRelease(guiControls.scale[i], '8n');
    }
  }

}, [0, 1, 2, 3, 4, 5, 6, 7], 'alternateUp');

patternAltUp.interval = '16n';

var patternAltDown = new Tone.Pattern(function(time, col) {
  var column = noteGrid[col];	// seperate the notes out

	// loop through notes
  for (var i = 0; i < 7; i++) {
    if (column[i] === 1) {    // if there is a note selected
			syn.triggerAttackRelease(guiControls.scale[i], '8n');
    }
  }

}, [0, 1, 2, 3, 4, 5, 6, 7], 'alternateDown');

patternAltDown.interval = '16n';

var patternRan = new Tone.Pattern(function(time, col) {
  var column = noteGrid[col];	// seperate the notes out

	// loop through notes
  for (var i = 0; i < 7; i++) {
    if (column[i] === 1) {    // if there is a note selected
			syn.triggerAttackRelease(guiControls.scale[i], '8n');
    }
  }

}, [0, 1, 2, 3, 4, 5, 6, 7], 'random', '16n');

patternRan.interval = '16n';

var patternRanWalk = new Tone.Pattern(function(time, col) {
  var column = noteGrid[col];	// seperate the notes out

	// loop through notes
  for (var i = 0; i < 7; i++) {
    if (column[i] === 1) {    // if there is a note selected
			syn.triggerAttackRelease(guiControls.scale[i], '8n');
    }
  }

}, [0, 1, 2, 3, 4, 5, 6, 7], 'randomWalk');

patternRanWalk.interval = '16n';

var patternRanOnce = new Tone.Pattern(function(time, col) {
  var column = noteGrid[col];	// seperate the notes out

	// loop through notes
  for (var i = 0; i < 7; i++) {
    if (column[i] === 1) {    // if there is a note selected
			syn.triggerAttackRelease(guiControls.scale[i], '8n');
    }
  }

}, [0, 1, 2, 3, 4, 5, 6, 7], 'randomOnce');

patternRanOnce.interval = '16n';

var colIndex = 0;
var colIndexRot = 0;
var colIndexAnt = 0;
var colIndexInt = 0;
var colIndexRev = 0;

function indicator(col) {
	fill(100, 100, 100);
	rect((col + 0.6125) * 50, 0, 20, 10);

	// draw over previously drawn indicator
	fill(242, 242, 242);
	rect((col - 0.3875) * 49, 0, 30, 10);

	if (col == 0) {
		rect((col - 1 + 0.6125) * 49, 0, 30, 10);
	}

}

var seq = new Tone.Sequence(function(time, value) {

	if (colIndex >= noteGrid.length) {
		colIndex = 0;
	}

	col = noteQuantityArr[colIndex];
	var column = noteGrid[col];	// make global then move anim to main
	colIndex++;

	  // Draw.schedule takes a callback and a time to invoke the callback
	  // uses requestAnimationFrame, used to sync the timing of the step sequencer with the notes being played
		Tone.Draw.schedule(function() {
			  //the callback synced to the animation frame at the given time

				indicator(col);

		}, time);

	  // loop through notes
	  for (var i = 0; i < noteGrid.length; i++) {

	    if (column[i] === 1) {    // if there is a note selected
	      //slightly randomized velocities
	      var vel = Math.random() * 0.5 + 0.5;

					syn.triggerAttackRelease(guiControls.scale[i], '8n');

	    }

	}

}, [0], "16n");


var patternRotate = new Tone.Sequence(function(time, value) {

	if (colIndexRot >= noteGrid.length) {
		colIndexRot = 0;
	}

	var col = noteQuantityArr[colIndexRot];	// col becomes iterator

	if (pattern1 == patternRotate) {
		var column = noteGridManip[col];
	}

	if (pattern2 == patternRotate) {
		var column = noteGridManip2[col];
	}

	colIndexRot++;

	notesPrevious = clone(grid);	// make a deep copy of grid once every cycle to avoid problem of grid referencing itself

		for (var i = 0; i < noteGrid.length; i++) {
			if (column[i] === 1) {    // if there is a note selected
				//slightly randomized velocities
				var vel = Math.random() * 0.5 + 0.5;
				// syn.triggerAttackRelease(guiControls.scale[i], '8n');
					if (pattern1 == patternRotate) {
						man1Inst.triggerAttackRelease(guiControls.scale[i], '8n');
					} else if (pattern2 == patternRotate) {
						man2Inst.triggerAttackRelease(guiControls.scale[i], '8n');
					}
			}
		}

		// Draw.schedule takes a callback and a time to invoke the callback
		// uses requestAnimationFrame, used to sync the timing of the step sequencer with the notes being played
		Tone.Draw.schedule(function() {

			  //the callback synced to the animation frame at the given time

        // set the initial position of the pattern that will be moved
				if (col == noteGrid.length - 1) {	// shift array 1 position

          if (once == true) {

            for (var i = 0; i < cols; i++) {
  						for (var j = 0; j < rows; j++) {
								if (pattern1 == patternRotate) {
									notesPrevious[i][j].patHighlighted = grid[i][j].highlighted;
								}
								if (pattern2 == patternRotate) {
									notesPrevious[i][j].pat2Highlighted = grid[i][j].highlighted;
								}

              }
            }

            once = false;

          }

					for (var i = 0; i < cols; i++) {
						for (var j = 0; j < rows; j++) {

							if (pattern1 == patternRotate) {
								if (i == 0) {	// last column
									grid[i][j].patHighlighted = notesPrevious[cols - 1][j].patHighlighted;

								} else {
									grid[i][j].patHighlighted = notesPrevious[i - 1][j].patHighlighted;
								}
							}

							if (pattern2 == patternRotate) {
								if (i == 0) {	// last column
									grid[i][j].pat2Highlighted = notesPrevious[cols - 1][j].pat2Highlighted;

								} else {
									grid[i][j].pat2Highlighted = notesPrevious[i - 1][j].pat2Highlighted;
								}
							}

							}
						}
					}

		}, time);
	  // loop through notes
}, [0], "16n");


// play the notes that are highlighted
// invokes a callback every 16th note
// rotation
// after every play through the sequencer is rotated by 1 position
var once = true;
var notesPrevious;

var patternRotateAnti = new Tone.Sequence(function(time, value) {			//col is interator

	if (colIndexAnt >= noteGrid.length) {
		colIndexAnt = 0;
	}

	var col = noteQuantityArr[colIndexAnt];

	if (pattern1 == patternRotateAnti) { // needs to be if pattern 1 == patternrotateanti
		var column = noteGridManip[col];
	}

	if (pattern2 == patternRotateAnti) {
		var column = noteGridManip2[col];
	}

	colIndexAnt++;

	notesPrevious = clone(grid);	// make a deep copy of grid once every cycle to avoid problem of grid referencing itself

		for (var i = 0; i < noteGrid.length; i++) {
			if (column[i] === 1) {    // if there is a note selected
				//slightly randomized velocities
				var vel = Math.random() * 0.5 + 0.5;
				if (pattern1 == patternRotateAnti) {
					man1Inst.triggerAttackRelease(guiControls.scale[i], '8n');
				} else if (pattern2 == patternRotateAnti) {
					man2Inst.triggerAttackRelease(guiControls.scale[i], '8n');
				}
			}
		}
		// Draw.schedule takes a callback and a time to invoke the callback
		// uses requestAnimationFrame, used to sync the timing of the step sequencer with the notes being played
		Tone.Draw.schedule(function() {

			  //the callback synced to the animation frame at the given time

        // set the initial position of the pattern that will be moved
				if (col == noteGrid.length - 1) {	// shift array 1 position

				  if (once == true) {

            for (var i = 0; i < cols; i++) {
  						for (var j = 0; j < rows; j++) {
								if (pattern1 == patternRotateAnti) {
                	notesPrevious[i][j].patHighlighted = grid[i][j].highlighted;
								}
								if (pattern2 == patternRotateAnti) {
									notesPrevious[i][j].pat2Highlighted = grid[i][j].highlighted;
								}
              }
            }

            once = false;

          }

					for (var i = 0; i < cols; i++) {
						for (var j = 0; j < rows; j++) {

								if (pattern1 == patternRotateAnti) {
                  if (i == cols - 1) {	// last column
  									grid[cols - 1][j].patHighlighted = notesPrevious[0][j].patHighlighted;

  								} else {
  									grid[i][j].patHighlighted = notesPrevious[i + 1][j].patHighlighted;
  								}
								}

								if (pattern2 == patternRotateAnti) {
									if (i == cols - 1) {	// last column
										grid[cols - 1][j].pat2Highlighted = notesPrevious[0][j].pat2Highlighted;

									} else {
										grid[i][j].pat2Highlighted = notesPrevious[i + 1][j].pat2Highlighted;
									}
								}

							}
						}
					}

		}, time);

	  // loop through notes
}, [0], "16n");

var patternInterpolate = new Tone.Sequence(function(time, value) {			//col is interator

	if (colIndexInt >= noteGrid.length) {
		colIndexInt = 0;
	}

	var col = noteQuantityArr[colIndexInt];

	if (pattern1 == patternInterpolate) {
		var column = noteGridManip[col];
	}

	if (pattern2 == patternInterpolate) {
		var column = noteGridManip2[col];
	}

	colIndexInt++;

		for (var i = 0; i < noteGrid.length; i++) {
			if (column[i] === 1) {    // if there is a note selected
				//slightly randomized velocities
				var vel = Math.random() * 0.5 + 0.5;
				if (pattern1 == patternInterpolate) {
					man1Inst.triggerAttackRelease(guiControls.scale[i], '8n');
				} else if (pattern2 == patternInterpolate) {
					man2Inst.triggerAttackRelease(guiControls.scale[i], '8n');
				}
			}
		}

		// Draw.schedule takes a callback and a time to invoke the callback
		// uses requestAnimationFrame, used to sync the timing of the step sequencer with the notes being played
		Tone.Draw.schedule(function() {

			  //the callback synced to the animation frame at the given time

        // interpolate
        for (var i = 0; i < cols; i++) {
          for (var j = 0; j < rows; j++) {

						if (col == 0) {

							let total = noteGrid[i].reduce((a, b) => a + b, 0); // sum array
							var ran = Math.random();

								if (!total && ran < 0.2) { // if the total is zero then there is a gap, with a 20% chance it turning a note on

									if (pattern1 == patternInterpolate) {
										grid[i][j].patHighlighted = true;
									}

									if (pattern2 == patternInterpolate) {
										grid[i][j].pat2Highlighted = true;
									}

	            	}

							}

							if (col == noteGrid.length - 1) {	// reset the grid each time
								if (pattern1 == patternInterpolate) {
									grid[i][j].patHighlighted = false;
								}
								if (pattern2 == patternInterpolate) {
									grid[i][j].pat2Highlighted = false;
								}
							}

          }
        }

		}, time);

	  // loop through notes
}, [0], "16n");

var patternReverse = new Tone.Sequence(function(time, value) {			//col is interator

	if (colIndexRev >= noteGrid.length) {
		colIndexRev = 0;
	}

	var col = noteQuantityArr[colIndexRev];

	if (pattern1 == patternReverse) {
		var column = noteGridManip[col];
	}

	if (pattern2 == patternReverse) {
		var column = noteGridManip2[col];
	}

	colIndexRev++;

	notesPrevious = clone(grid);	// make a deep copy of grid once every cycle to avoid problem of grid referencing itself

		for (var i = 0; i < noteGrid.length; i++) {
			if (column[i] === 1) {    // if there is a note selected
				//slightly randomized velocities
				var vel = Math.random() * 0.5 + 0.5;
				if (pattern1 == patternReverse) {
					man1Inst.triggerAttackRelease(guiControls.scale[i], '8n');
				} else if (pattern2 == patternReverse) {
					man2Inst.triggerAttackRelease(guiControls.scale[i], '8n');
				}
			}
		}

		// Draw.schedule takes a callback and a time to invoke the callback
		// uses requestAnimationFrame, used to sync the timing of the step sequencer with the notes being played
		Tone.Draw.schedule(function() {

			  //the callback synced to the animation frame at the given time

	      if (col == 0) {
					var revNotes = notesPrevious.reverse()

					for (var i = 0; i < cols; i++) {
						for (var j = 0; j < rows; j++) {

							if (pattern1 == patternReverse) {
								grid[i][j].patHighlighted = revNotes[i][j].highlighted;
							}

							if (pattern2 == patternReverse) {
								grid[i][j].pat2Highlighted = revNotes[i][j].highlighted;
							}

						}
					}

	      }

		}, time);

	  // loop through notes
}, [0], "16n");

// must be defined after manipulations
var pattern1 = patternRotateAnti;					// connect patterns to this for chosing current maniplation
var pattern2 = patternInterpolate;				// connect patterns to this for chosing second current maniplation
