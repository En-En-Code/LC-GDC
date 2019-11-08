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
	update(k) {
		//we have replaced the modification code (previously in the keyboard), with a more general
		//statement, that can be used on any TextBox
		this.txt = editTextBox(this.txt, k);
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
	//Given the middle of a horizontal or vertical line and its length, find the top or leftmost point
	return m - w/2;
}

Keyboard = function() {
	var kboard = {};
	//we've made this important edit so that var kboard stores data
	kboard.keysPressed = [];
	//kboard.selection stores the last object to have been clicked
	kboard.selection = null;
	
	window.addEventListener('keydown', keyDown);
	function keyDown(e) {
		kboard.keysPressed.push(e.key);
		//this line calls the TextBox update (or whatever responds to a keyDown)
		kboard.selection.update(e.key);
	}
	window.addEventListener('keyup', keyUp);
	function keyUp(e) {
		//this large modification of code was due to the fact that I am an idiot who forgot how the splice
		//function worked. sorry...
		var k = kboard.keysPressed.indexOf(e.key);
		if (k != -1) {
			kboard.keysPressed.splice(k, kboard.keysPressed.lastIndexOf(e.key) - k + 1);
		}
		k = kboard.keysPressed.indexOf(e.key.toUpperCase());
		if (k != -1) {
			kboard.keysPressed.splice(k, kboard.keysPressed.lastIndexOf(e.key.toUpperCase()) - k + 1);
		}
		k = kboard.keysPressed.indexOf(e.key.toLowerCase());
		if (k != -1) {
			kboard.keysPressed.splice(k, kboard.keysPressed.lastIndexOf(e.key.toLowerCase()) - k + 1);
		}
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
		//we check everything to see if the mouse is over (and therefore, clicking) it
		if (mouseBoxCollision(mouse, buddy)) {
			//then we communicate that this is to be the object that the keyboard manipulates
			kboard.selection = buddy;
		} else if (mouseBoxCollision(mouse, buddy.txtBox)) {
			kboard.selection = buddy.txtBox;
		}
		backgroundColor = "#d32031";
	}
	window.addEventListener('dblclick', doubleClick);
	function doubleClick(e) {
		backgroundColor = "#42c02f";
	}
	window.addEventListener('contextmenu', rClick);
	function rClick(e) {
		backgroundColor = "#0e516a";
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
function mouseBoxCollision(m, b) {
	//this function determines whether a point is inside a box in four parts
	/** the first part asks if the point is to the right of the left barrier
	/*	the second part asks if the point is to the left of the right barrier
	/*	the third part asks if the point is below the top barrier
	/*	the last part asks if the point is above the bottom barrier
	*/
	return 	m.x >= mid2Edge(b.x, b.w) && m.x <= mid2Edge(b.x, -b.w) &&
			m.y >= mid2Edge(b.y, b.h) && m.y <= mid2Edge(b.y, -b.h);
}

window.onload = function() {
	canvas = document.getElementById("canvas");	
	ctx = canvas.getContext("2d");
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	ctx.imageSmoothingEnabled = false;
	kboard = new Keyboard();
	mouse = new Mouse();
	setInterval(main, 100/6);
}
var buddy = new Character(innerWidth/2, innerHeight/2 + 200, 200, 200, "YourImageHere.png", "Hello!");

function main() {
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, innerWidth, innerHeight);
	buddy.render();
}
