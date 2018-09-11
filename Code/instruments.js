// SYNTHS //


//create a synth and connect it to the master output (your speakers)
var synth = new Tone.PolySynth(7, Tone.Synth).toMaster();

synth.set({
	"envelope" : {
	   "attack" : 0.1
	}
});

// settings copied from https://github.com/philippfromme/generative-music-with-tonejs/blob/master/index.js
var kickSynth = new Tone.PolySynth(7, Tone.MembraneSynth).toMaster();

kickSynth.set({
	"envelope" : {
	   "attack" : 0.001,
		 "decay" : 0.4,
		 "sustain" : 0.01,
		 "release" : 1.4,
		 "attackCurve" : 'exponential'
	},
	"oscillator" : {
				"type" : "sine"
			}
})

var anotherSynth = new Tone.PolySynth(7, Tone.FMSynth).toMaster();

anotherSynth.set({
    "harmonicity" : 8,
    "modulationIndex" : 2,
    "oscillator" : {
        "type": "sine"
    },
    "envelope": {
        "attack": 0.001,
        "decay": 2,
        "sustain": 0.1,
        "release": 2
    },
    "modulation" : {
        "type" : "square"
    },
    "modulationEnvelope" : {
        "attack": 0.002,
        "decay": 0.2,
        "sustain": 0,
        "release": 0.2
    }
});

anotherSynth.volume.value = -12;

// piano settings copied from https://github.com/Tonejs/Tone.js/blob/master/examples/events.html
var piano = new Tone.PolySynth(7, Tone.Synth, {
			"volume" : -8,
			"oscillator" : {
				"partials" : [1, 2, 1],
			},
			"portamento" : 0.05
		}).toMaster()

// these must be defined after synth definitions
var syn = anotherSynth; 			// connect synths to this for chosing current instrument
var man1Inst = synth;		// manipulation 1 default instrument
var man2Inst = synth;		// manipulation 2 default instrument
