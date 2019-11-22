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
	update(k) {
		//Of course, moving the player should check that the keyboard targets the player
		//additionally, checking for k == undefined looks to see whether the update comes
		//from main() or from keyDown. Doing it this way reduces jerkiness.
		if (kboard.selection == this && k == undefined) {
			this.up = false; this.down = false; this.left = false; this.right = false;
			//looks to see if the movement keys (wasd) are down, and triggering their
			//corresponding variable
			if (kboard.keysPressed.indexOf("w") != -1 || kboard.keysPressed.indexOf("W") != -1)
				this.up = true;
			if (kboard.keysPressed.indexOf("s") != -1 || kboard.keysPressed.indexOf("S") != -1)
				this.down = true;
			if (kboard.keysPressed.indexOf("a") != -1 || kboard.keysPressed.indexOf("A") != -1)
				this.left = true;
			if (kboard.keysPressed.indexOf("d") != -1 || kboard.keysPressed.indexOf("D") != -1)
				this.right = true;
			
			//some storage variables for later
			var prevY = this.y;
			var prevX = this.x;
			//moving is as simple as changing its location by a small amount
			if (this.up) {
				this.y -= 5;
				this.txtBox.y -= 5;
			}
			if (this.down) {
				this.y += 5;
				this.txtBox.y += 5;
			}
			//collision detection: checks to see whether any image is touching another, and
			//moves it back to its starting position if it is
			for (var x = 0; x < friendArray.length; x++) {
				if (friendArray[x] != this && boxBoxCollision(this, friendArray[x])) {
					this.txtBox.y += prevY - this.y;
					this.y = prevY;
					break;
				}
			}
			//checks to see whether the image goes off the top or the bottom of the screen
			if (this.y < this.h/2 || this.y > innerHeight - this.h/2) {
				this.txtBox.y += prevY - this.y;
				this.y = prevY;
			}
			///going the x-direction is pretty much the same as going in the y-direction
			//we do them separately because of the collision functions: by doing it this
			//way, the player can "hug" a wall without being stopped from going perpendicular
			//to the wall
			if (this.left) {
				this.x -= 5;
				this.txtBox.x -= 5;
			}
			if (this.right) {
				this.x += 5;
				this.txtBox.x += 5;
			}
			for (var x = 0; x < friendArray.length; x++) {
				if (friendArray[x] != this && boxBoxCollision(this, friendArray[x])) {
					this.txtBox.x += prevX - this.x;
					this.x = prevX;
					break;
				}
			}
			if (this.x < this.w/2 || this.x > innerWidth - this.w/2) {
				this.txtBox.x += prevX - this.x;
				this.x = prevX;
			}
		}
		this.render();
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
	kboard.keysPressed = [];
	kboard.selection = null;
	
	window.addEventListener('keydown', keyDown);
	function keyDown(e) {
		kboard.keysPressed.push(e.key);
		kboard.selection.update(e.key);
	}
	window.addEventListener('keyup', keyUp);
	function keyUp(e) {
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
		for (var x = 0; x < friendArray.length; x++) {
			if (mouseBoxCollision(mouse, friendArray[x])) {
				kboard.selection = friendArray[x];
			} else if (mouseBoxCollision(mouse, friendArray[x].txtBox)) {
				kboard.selection = friendArray[x].txtBox;
			}
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
function boxBoxCollision(b1, b2) {
	//this function determines whether two boxes are intersecting each other
	/** the first part asks if b1's left wall is to the right of b2's right wall
	/*	the second part asks if b1's right wall is to the left of b2's left wall
	/*	Visual: if [] is b1 and || is b2, for this half to be true, then |[|] is true
	/*	the third part asks if b1's upper wall is higher than b2's lower wall
	/*	the last part asks if b1's lower wall is lower than b2's upper wall
	*/
	return 	mid2Edge(b1.x, b1.w) <= mid2Edge(b2.x, -b2.w) &&
			mid2Edge(b1.x, -b1.w) >= mid2Edge(b2.x, b2.w) &&
			mid2Edge(b1.y, b1.h) <= mid2Edge(b2.y, -b2.h) &&
			mid2Edge(b1.y, -b1.h) >= mid2Edge(b2.y, b2.h);
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
friendArray = [];
var buddy = new Character(innerWidth/2, innerHeight/2 + 200, 200, 200, "YourImageHere.png", "Hello!");
var buddy2 = new Character(innerWidth/2 + 400, innerHeight/2 + 200, 200, 200, "YourImageHere.png", "Yes!");
friendArray.push(buddy); friendArray.push(buddy2);

function main() {
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, innerWidth, innerHeight);
	for (var w = 0; w < friendArray.length; w++)
		friendArray[w].update();
}
