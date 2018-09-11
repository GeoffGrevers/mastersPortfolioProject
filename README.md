# mastersPortfolioProject

This is a website designed to explore pattern manipulations by visualisation, using a step sequencer.

The site uses p5.js, Tone.js and dat.GUI.


How to Run:

Drag the HTML file to a Chrome window. (index.html)
(Internet access is required, as it relies on fonts which are referenced from a URL from within the HTML.)

Testing local files in this way does not support full functionality, for example if a site contains asynchronous requests it won't run. BUT I am 99% sure that my website works fully by just running the local HTML file, meaning you don't need to set up a local server. Although I developed the site with a local server, when I ran the file locally I didn't find any issues. However, to be on the safe side, if something isn't working or you would like to run it off a local server anyway:

How to host site locally:

Mac:
1. Go to terminal and navigate to the project folder.

2. Type in the terminal:
	"python -m http.server" (without quotation marks)
	This creates a local server.

3. Go to a browser (was tested on chrome so please use that!) and in the address bar type:
	"http://localhost:8000/"
	(8000 is the default port address)

4. Click on the empty-example folder and the site should run.

Windows:
Same as Mac, but Python needs to be installed (it comes preinstalled on a Mac).


N.B. For running the site use Chrome (Web Audio API has better support), but I used Firefox developer edition for live debugging due to a compatibility issue with Macs (or I read it may be high resolution displays) and Chrome Developer tools.


Geoff Grevers
el14gg@leeds.ac.uk
University of Leeds
Electronic and Computer Music Portfolio 2017/8
