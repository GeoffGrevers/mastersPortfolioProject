// Step Sequencer grid

var back = false; // flag for animating back out during clearing the grid

function Cell(x, y, w, n) {

  // Properties of a cell/square constructor
  
  this.x = x; // x coordinate
  this.y = y; // y coordinate
  this.w = w; // width
  this.highlighted = false;     // has it been clicked?
  this.patHighlighted = false;  // first pattern illustration
  this.pat2Highlighted = false; // second pattern illustration
  this.note = n;                // the note assigned to the dot
  this.animateExp = false;      // animation flag
  this.animateShr = false;      // animation flag
}

Cell.prototype.show = function() {

  // Displays a square and timeing indicator

  noStroke();           // no border of notes
  fill(237, 201, 101);  // colour of notes, split complementary colours
  rect(this.x + this.w / 2, this.y + this.w / 2, this.w / 1.5, this.w / 1.5);     // default grid colour

  if (this.highlighted && !this.patHighlighted && !this.pat2Highlighted) {        //display only the highlighted square
    fill(200);          // clicked
    rect(this.x + this.w / 2, this.y + this.w / 2, this.w / 1.5, this.w / 1.5);

  } else if (!this.highlighted && this.patHighlighted && !this.pat2Highlighted) { // display only the first manipulation
    fill(85, 104, 224);  // manip1
    rect(this.x + this.w / 2, this.y + this.w / 2, this.w / 1.5, this.w / 1.5);

  } else if (!this.highlighted && !this.patHighlighted && this.pat2Highlighted) { // display only the second manipulation
    fill(102, 201, 219); // manip2
    rect(this.x + this.w / 2, this.y + this.w / 2, this.w / 1.5, this.w / 1.5);

  } else if (this.highlighted && this.patHighlighted && !this.pat2Highlighted) {  // display half chosen and half first manipulation
    fill(85, 104, 224);  // manip1
    rect(this.x + this.w / 2, this.y + this.w / 2, this.w / 1.5, this.w / 3);
    fill(200);           // clicked
    rect(this.x + this.w / 2, this.y + this.w / 1.2, this.w / 1.5, this.w / 3);

  } else if (!this.highlighted && this.patHighlighted && this.pat2Highlighted) {  // display half of each manipulation
    fill(85, 104, 224);  // manip1
    rect(this.x + this.w / 2, this.y + this.w / 2, this.w / 1.5, this.w / 3);
    fill(102, 201, 219); // manip2
    rect(this.x + this.w / 2, this.y + this.w / 1.2, this.w / 1.5, this.w / 3);

  } else if (this.highlighted && !this.patHighlighted && this.pat2Highlighted) {  // display half chosen and half second manipulation
    fill(102, 201, 219); // manip2
    rect(this.x + this.w / 2, this.y + this.w / 2, this.w / 1.5, this.w / 3);
    fill(200);           // clicked
    rect(this.x + this.w / 2, this.y + this.w / 1.2, this.w / 1.5, this.w / 3);

  } else if (this.highlighted && this.patHighlighted && this.pat2Highlighted) {   // display all three
    fill(85, 104, 224);  // manip1
    rect(this.x + this.w / 2, this.y + this.w / 2, this.w / 1.5, this.w / 4.5);
    fill(102, 201, 219); // manip2
    rect(this.x + this.w / 2, this.y + this.w / 1.3846, this.w / 1.5, this.w / 4.5);
    fill(200);           // clicked
    rect(this.x + this.w / 2, this.y + this.w / 1.0588, this.w / 1.5, this.w / 4.5);

  } else {  // draw over with the original colour
    fill(237, 201, 101);
    rect(this.x + this.w / 2 , this.y + this.w / 2, this.w / 1.5, this.w / 1.5);
  }

  // showing the indicator
	fill(100, 100, 100);
	rect((col + 0.6125) * 50, 0, 20, 10);

	// draw over previously drawn indicator
	fill(242, 242, 242);
	rect((col - 0.3875) * 49, 0, 30, 10);

  // draw over the last indicator when at the start
	if (col == 0) {
		rect((col - 1 + 0.6125) * 49, 0, 30, 10);
  }

}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
function animationSpeed() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 150); // delay time in ms
  });
}

Cell.prototype.animateExpand = async function() {  // await requires an async function

  // expand animation function

  while(this.w < w) {       // when w is not equal to the desired/original width
    this.w = this.w + 0.35; // increase width size steadily
    await animationSpeed(); // with a time delay each loop to control the speed of the animation
  }

}

Cell.prototype.animateShrink = async function() {

  // shrink animation function

  while(this.w > 0) {          // animation loop to shink the grid
      this.w = this.w - 0.35;  // decrease width gradually
      await animationSpeed();  // time delay
  }

}




Cell.prototype.animateClear = async function() {

  // animation when clear is pressed

  while(this.w > 0 && !back) { // animation loop to shink the grid

      this.w = this.w - 0.35;  // decrease width gradually
      await animationSpeed();  // time delay (150ms)

      if (this.w < 10) {       // clear the grid when its small so that the colour change isn't seen

        this.highlighted = false;     // set the notes and colours to off/default
        this.patHighlighted = false;
        this.pat2Highlighted = false;

        if (this.x == ((cols - 1) * w) && this.y == ((rows - 1) * w)) { // makes sure that they are all cleared before they start animating back out
          back = true;  // flag to state when the shrink animation is finished
        }

      }

  }

  // animate back out and reset the flags

  if (back) {

    while(this.w < w) {       // when w is less than the desired/original width
      this.w = this.w + 0.35; // increase width size steadily
      await animationSpeed(); // with a time delay each step to control the speed of the animation
    }

    // once the animation is completed reset the flags

    if (back && fire && this.w == 50) {
      back = false;
      fire = false;
    }
  }

}


Cell.prototype.contains = function(x, y) {

  // Used to find if the mouse is contained within a grid square

  return (x > this.x + this.w / 2 && x < this.x + ((7 * this.w) / 6) && y > this.y + this.w / 2 && y < this.y + ((7 * this.w) / 6));

}


Cell.prototype.highlight = function() {

  // toggles highlighted property

  if (this.highlighted == false) {
    this.highlighted = true;
  } else {
    this.highlighted = false;
  }

}
