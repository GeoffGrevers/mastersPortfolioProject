// GEOFF GREVRES    TONES

// SETUP //
var timeSig;
var indicatorArray;
var resetGridFlag = false;
var savedState = false;

function setup() {

  // Runs once at the start. Defines initial environment properties

  // GUI controls
  var datGUI = new dat.GUI();
  datGUI.add(guiControls, 'bpm', 50, 200);
  timeSig = datGUI.add(guiControls, 'timeSig', 2, 16).step(1);  // cols
  // datGUI.add(guiControls, 'scale', { cMajor: cMajor,
  //                                    cMajor2: cMajor2,
  //                                    cMajor3: cMajor3 } );

  var scaleFolder = datGUI.addFolder('Scales');
  scaleFolder.add(guiControls, 'cMajor');
  scaleFolder.add(guiControls, 'cMajor2');
  scaleFolder.add(guiControls, 'cMajor3');

	var instrumentFolder = datGUI.addFolder('Instruments');
	instrumentFolder.add(guiControls, 'synth');
	instrumentFolder.add(guiControls, 'kickSynth');
	instrumentFolder.add(guiControls, 'anotherSynth');
	instrumentFolder.add(guiControls, 'piano');

	// pattern 1 manipulation folder
	var f1 = datGUI.addFolder('Manipulation 1');
  f1.add(guiControls, 'rotate1');
	f1.add(guiControls, 'rotateAnti1');
	f1.add(guiControls, 'interpolate1');
  f1.add(guiControls, 'reverse1');

  var man1Instrument = datGUI.addFolder('Manipulation 1 Instrument');
  man1Instrument.add(guiControls, 'synth1');
  man1Instrument.add(guiControls, 'kickSynth1');
  man1Instrument.add(guiControls, 'anotherSynth1');
	man1Instrument.add(guiControls, 'piano1');

	// pattern 2 manipulation folder
  var f2 = datGUI.addFolder('Manipulation 2');
	f2.add(guiControls, 'rotate2');
	f2.add(guiControls, 'rotateAnti2');
	f2.add(guiControls, 'interpolate2');
  f2.add(guiControls, 'reverse2');

  var man2Instrument = datGUI.addFolder('Manipulation 2 Instrument');
  man2Instrument.add(guiControls, 'synth2');
  man2Instrument.add(guiControls, 'kickSynth2');
  man2Instrument.add(guiControls, 'anotherSynth2');
	man2Instrument.add(guiControls, 'piano2');

	// built in tone.js maniplations
	var f3 = datGUI.addFolder('Tone.js Manipulations');
	f3.add(guiControls, 'up');
	f3.add(guiControls, 'down');
	f3.add(guiControls, 'upDown');
	f3.add(guiControls, 'downUp');
	f3.add(guiControls, 'alternateUp');
	f3.add(guiControls, 'alternateDown');
	f3.add(guiControls, 'patternRan');
	f3.add(guiControls, 'randomWalk');
	f3.add(guiControls, 'randomOnce');

  // Layout config
  cnv = createCanvas(1001, 581);   // size of canvas attached to variable
  cnv.position(100,100);           // canvas position
  cnv.style('z-index', '-1'); // place behind other content (in the event of a small screen size datGUI will be above the canvas)
  cols = 8  //number of columns for sequencer
  rows = 7  //number of rows for sequencer

  // Initialise the array for the sequencer graphics
  grid = make2Darray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i * w, j * w, w, cMajor[j]);
    }
  }

  noteGrid = make2Darray(cols, rows);       // initialise array for notes
	noteGridManip = make2Darray(cols, rows);  // initialise array for notes of manipulation
	noteGridManip2 = make2Darray(cols, rows); // initialise array for notes of manipulation

  noteQuantity();

  // Buttons and checkboxes //

  playAll = createButton('Start/Stop');     // create button DOM element for starting the sequencer
	playAll.position(20, 650);
  save = createButton('Save Pattern');      // create button DOM element for saving current state
	save.position(100, 650);
  clear = createButton('Clear');           	// create button DOM element for clearing the sequencer
  clear.position(195, 650);

	// playManPat = createButton('Play Manipulation Only');
	// playManPat.position(300, 650);
  seqBox = createCheckbox('Play pattern');
	seqBox.position(250, 650);
  seqBox.checked(true);

	manipBox = createCheckbox('Play Manipulation 1');
	manipBox.position(370, 650);
  manipBox.checked(true);

  manip2Box = createCheckbox('Play Manipulation 2');
	manip2Box.position(550, 650);
  manip2Box.checked(true);

  localStorage.setObj(0, noteGrid); // reset save
}


function draw() {

  // Runs continuously, i.e. the main loop

  background(242, 242, 242); // canvas background, same colour as HTML background

  pat = localStorage.getObj(storageIter - 1);  // for loading a saved pattern

  for (var i = 0; i < cols; i++) {             // for every square in the step sequencer/grid...
    for (var j = 0; j < rows; j++) {

      if (savedState) {   // drawing saved patterns

        if (storageIter == 1) { // after first pattern is saved
          showSaved(0, i, j);   // display save 1
        }

        else if (storageIter == 2) {  // after second pattern is saved
          showSaved(0, i, j);         // display save 1
          showSaved(1, i, j);         // display save 2
        }

        else if (storageIter == 3) {  // after third pattern is saved
          showSaved(0, i, j);         // display save 1
          showSaved(1, i, j);         // display save 2
          showSaved(2, i, j);         // display save 3
        }

        else if (storageIter <= 4) { // after fourth pattern is saved
          showSaved(0, i, j);        // display save 1
          showSaved(1, i, j);        // display save 2
          showSaved(2, i, j);        // display save 3
          showSaved(3, i, j);        // display save 4
        }

      }

      grid[i][j].show();                      // display the squares for the step sequencer and the timing indicator

      if (fire) {                             // if the clear flag is on
        grid[i][j].animateClear();            // clear the grid with the clear animation
      }

      if (grid[i][j].animateExp == true) {    // only apply to newly created columns
        grid[i][j].animateExpand();           // new column animation

        if (grid[i][j].w > 49) {              // once the animation is complete
          grid[i][j].w = w;                   // reset the width
          grid[i][j].animateExp = false;      // reset the expand animation flag
        }

      }

      if (grid[i][j].animateShr == true) {    // when the animation shrink flag is true
        grid[i][j].animateShrink();           // shrink animation

        if (grid[cols - 1][rows - 1].w < 2) { // when the last member of the grid has shrunk
          resetGridFlag = true;               // dont want grid to be redefined during the loops
        }

      }

      if (grid[i][j].highlighted) {
        noteGrid[i][j] = 1;                   // 1s for notes to be played
      }	else {
        noteGrid[i][j] = 0;                   // 0s for notes not being played
      }

			if (grid[i][j].patHighlighted) {
				noteGridManip[i][j] = 1;              // 1s for notes to be played
			} else {
				noteGridManip[i][j] = 0;              // 0s for notes not being played
			}

      if (grid[i][j].pat2Highlighted) {
        noteGridManip2[i][j] = 1;             // 1s for notes to be played
      } else {
        noteGridManip2[i][j] = 0;             // 0s for notes not being played
      }

    }
  }


  Tone.Transport.bpm.value = guiControls.bpm; // update BPM if changed in GUI

  // everytime the time signature (number of columns) is changed,
  // the grid has to be redefined
  if (resetGridFlag) {
    gridRedifine();
    noteQuantity();
    resetGridFlag = false;
  }

  gridExpansion();  // the animation when the grid expands
  gridShrink();     // the animation when the grid shrinks

  playAll.mousePressed(start);  	// Button to trigger sequencer
  save.mousePressed(savePat);     // Button for saving current pattern
  clear.mousePressed(clrAll); 		// clear the sequencer

}
