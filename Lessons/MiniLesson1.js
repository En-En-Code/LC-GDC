//*** An image with a TextBox associated with it. ***//
class Character {	
	constructor(x, y, w, h, pic, txt) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.picture = new Image();
		this.picture.src = pic;
		this.txtBox = new Textbox(this.x + this.w, this.y - this.h,
								this.w, this.h/2, txt);
	}
	render() {	
		ctx.drawImage(this.picture, mid2Edge(this.x, this.w), mid2Edge(this.y, this.h), this.w, this.h);
		this.txtBox.render();
	}
}
//*** A bordered box that contains words inside of it. ***//
class Textbox {
	constructor(x, y, w, h, txt) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.txt = txt;
	}
	render() {
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(mid2Edge(this.x, this.w), mid2Edge(this.y, this.h), this.w, this.h);
		
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 5;
		ctx.strokeRect(mid2Edge(this.x, this.w), mid2Edge(this.y, this.h), this.w, this.h);
		
		ctx.fillStyle = "#000000";
		ctx.textAlign = 'center';
		ctx.font = "45px Courier";
		ctx.fillText(this.txt, this.x, this.y, this.w);

		ctx.beginPath();
		ctx.moveTo(mid2Edge(this.x, -this.w), mid2Edge(this.y, -this.h));
		ctx.lineTo(mid2Edge(this.x, -this.w) - this.w, mid2Edge(this.y, -this.h) + this.h);
		ctx.stroke();
	}
}
function mid2Edge(m, w) {
	return m - w/2;
}

///It turns out the version I am using is slightly outdated, but the version in
///https://github.com/goldfire/howler.js/blob/master/dist/howler.js should still work.
//Make sure it is in the same location as your other files
//This important line of code edits the HTML code so that JS can handle sounds
document.writeln("<script src=\"howler.js\"></script>");

//*** A class to load, play, and stop audio files. ***//
class SFXManager {
	constructor() {
		//Because we will only need once of these, and we will add information to it,
		//it is more reasonable to start without any parameters
		///Map is a type of storage for multiple objects at the same time, like arrays and lists
		this.sfxs = new Map();
	}
	loadSound(path, name, loop, vol) {
		var audio = new Howl( { //Howl is the name of the special manager/player in howler.js
			///The special use of { } and : is because Howl needs a general object in its constructor
			src: [path],	//A string that it the name of the audio file
			loop: loop||false,	//A Boolean for whether the sound should be looped
			volume: vol||1.0	//A number for the relative volume of the sound
		} );
		//The object created now moves into our map under the name
		//"name", so it can be called at any time
		this.sfxs.set(name, audio);
	}
	playSound(name) {
		//The sound with our name is found in the map and told to play
		this.sfxs.get(name).play();
	}
	stopSound(name) {
		//Similarly, here we stop the sound after finding it in the map
		this.sfxs.get(name).stop();
	}
}

Keyboard = function() {
	var kboard = {};
	keysPressed = [];
	
	window.addEventListener('keydown', keyDown);
	function keyDown(e) {
		keysPressed.push(e.key);
		buddy.txtBox.txt = editTextBox(buddy.txtBox.txt, e.key);
		//Appropriately for a typing sound, it plays in the keyDown event
		sounds.playSound("click");
	}
	window.addEventListener('keyup', keyUp);
	function keyUp(e) {
		keysPressed.splice(keysPressed.indexOf(e.key));
	}
	return kboard;
}
function editTextBox(t, k) {
	if (k == "Backspace") {
		return t.substr(0, t.length - 1);
	} else if (k.length != 1) {
		return t;
	} else {
		return t += k;
	}
}

Mouse = function() {
	var mouse = {};
	mouse.x = 0;
	mouse.y = 0;
	
	window.addEventListener('mousemove', move);	
	function move(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}
	window.addEventListener('click', click);
	function click(e) {
		backgroundColor = "#d32031";
		//Left-clicking now starts a music loop
		sounds.playSound("music");
	}
	window.addEventListener('dblclick', doubleClick);
	function doubleClick(e) {
		backgroundColor = "#42c02f";
	}
	window.addEventListener('contextmenu', rClick);
	function rClick(e) {
		backgroundColor = "#0e516a";
		//Right-clicking ends it
		sounds.stopSound("music");
	}
	window.addEventListener('mousedown', mouseDown);
	function mouseDown(e) {
	}
	window.addEventListener('mouseUp', mouseUp);
	function mouseUp(e) {	
	}
	return mouse;
}
var backgroundColor = "#0e516a";

window.onload = function() {
	canvas = document.getElementById("canvas");	
	ctx = canvas.getContext("2d");
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	ctx.imageSmoothingEnabled = false;
	kboard = new Keyboard();
	mouse = new Mouse();
	///You might be wondering, "Why does this need to be in here?" The answer:
	///technically, it doesn't, but we would have to change the HTML file manually
	///so that it loads howler.js before this file. Our SFXManager cannot use howler
	///because it needs to finish processes here before loading it. It is not until
	///after both files are loaded that window.onload takes place, so we safely put it
	///here.
	sounds.loadSound("YourMusicHere.mp3", "music", true, 0.5); //my music plays at half-volume and loops
	//I used a typewriter clack from https://freesound.org/people/ddohler/sounds/9098/
	//Use whatever you'd like, just be creative with it
	sounds.loadSound("YourSFXHere.wav", "click", false, 1.0);
	setInterval(main, 100/6);
}
var buddy = new Character(innerWidth/2, innerHeight/2 + 200, 200, 200, "YourImageHere.png", "Hello!");
//As a class, it must be declared (of course) before we can do anything else with it
var sounds = new SFXManager();

function main() {
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, innerWidth, innerHeight);
	buddy.render();
}
