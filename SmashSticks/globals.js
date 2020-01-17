/**	SmashSticks/globals.js		GDC 2019-2020
	This file is for miscellaneous functions and classes needed by other files.
	Included in this file are collision functions, the keyboard class, and
	various mathematical formulae.
*/

///////////////
// COLLISION //
///////////////
function collisionDirect(t1, t2) {
	///@return True if the t1 & t2 are overlapping, False otherwise
	//It uses the existence (or non-existence) of certain variables to determines
	//which collision to use, and returns that collision function's return value.
	///Note: we may need to add more collision functions over time.
	if (t1.x === undefined || t1.y === undefined ||
		t2.x === undefined || t2.y === undefined) {
		//If either of the objects does not have a coordinate, it cannot collide.
		return false;
	} else {
		if (t1.w !== undefined && t1.h !== undefined) { //t1 is a rectangle
			if (t2.w !== undefined && t2.h !== undefined) { //t2 is a rectangle
				return rectRectCollision(t1, t2);
			} else { //t2 is a point
				return pointRectCollision(t2, t1);
			}
		} else {
			if (t2.w !== undefined && t2.h !== undefined) { //t2 is a rectangle
				return pointRectCollision(t1, t2);
			} else { //t2 is a point
				//Two points are colliding iff they are on top of each other.
				return t1.x == t2.x && t1.y == t2.y;				
			}
		}
	}
}

function rectRectCollision(b1, b2) {
	///@return True if the two rectangles, b1 & b2, are overlapping, False otherwise.
	return 	mid2Edge(b1.x, b1.w) <= mid2Edge(b2.x, -b2.w) &&
			mid2Edge(b1.x, -b1.w) >= mid2Edge(b2.x, b2.w) &&
			mid2Edge(b1.y, b1.h) <= mid2Edge(b2.y, -b2.h) &&
			mid2Edge(b1.y, -b1.h) >= mid2Edge(b2.y, b2.h);
}
function pointRectCollision(p, b) {
	///@return True if the point p is inside of rectangle b, False otherwise.
	return 	p.x >= mid2Edge(b.x, b.w) && p.x <= mid2Edge(b.x, -b.w) &&
			p.y >= mid2Edge(b.y, b.h) && p.y <= mid2Edge(b.y, -b.h);
}
function pointSegmentCollision(p, l) {
	///@return True if a point p is on the line segment l, False otherwise
	m = (l[1].y - l[0].y) / (l[1].x - l[0].x);
	return p.y - l[0].y == m * (p.x - l[0].x);
}
function segmentSegmentCollision(l1, l2) {
	///@return True if two line segments, l1 & l2, both arrays (length==2) containing
	///objects with numeric x and y, intersect within the endpoints, False otherwise.
	//check for line segments that start and end at the same places, i.e. points
	if (l1[0].x == l1[1].x && l1[0].y == l1[1].y) {
		if (l2[0].x == l2[1].x && l2[0].y == l2[1].y) {
			return l1[0].x == l2[0].x && l1[0].y == l2[0].y;
		}
		else {
			return pointSegmentCollision(l1[0], l2);
		}
	} else if (l2[0].x == l2[1].x && l2[0].y == l2[1].y) {
		return pointSegmentCollision(l2[0], l1);
	}
	else {	//handles two "true" line segments
		m1 = (l1[1].y - l1[0].y) / (l1[1].x - l1[0].x);
		m2 = (l2[1].y - l2[0].y) / (l2[1].x - l2[0].x);
		if (m1 != Infinity && m2 != Infinity) {
			if (m1 == m2) {
				//the lines are parallel
				return l2[0].y - l1[0].y == m1 * (l2[0].x - l1[0].x) && 
					(Math.min(l1[0].x, l1[1].x) <= l2[0].x && l2[0].x <= Math.max(l1[0].x, l1[1].x) ||
					Math.min(l1[0].x, l1[1].x) <= l2[1].x && l2[1].x <= Math.max(l1[0].x, l1[1].x));
			} else {
				isectX = (l2[0].y - l1[0].y + m1 * l1[0].x + m2 * l2[0].x) / (m1 - m2);
				return Math.min(l1[0].x, l1[1].x) <= isectX && isectX <= Math.max(l1[0].x, l1[1].x) &&
						Math.min(l2[0].x, l2[1].x) <= isectX && isectX <= Math.max(l2[0].x, l2[1].x);
			} 
		} else if (m1 == m2) { //both lines are vertical
			return l1[0].x == l2[0].x &&
				Math.min(l1[0].y, l1[1].y) <= Math.max(l2[0].y, l2[1].y) && 
				Math.min(l2[0].y, l2[1].y) <= Math.max(l1[0].y, l1[1].y);
		} else if (m1 == Infinity) {
			return Math.min(l2[0].x, l2[1].x) <= l1[0].x && l1[0].x <= Math.max(l2[0].x, l2[1].x) &&
				Math.min(l1[0].y, l1[1].y) <= Math.max(l2[0].y, l2[1].y) && 
				Math.min(l2[0].y, l2[1].y) <= Math.max(l1[0].y, l1[1].y);
		} else if (m2 == Infinity) {
			return Math.min(l1[0].x, l1[1].x) <= l2[0].x && l2[0].x <= Math.max(l1[0].x, l1[1].x) &&
				Math.min(l2[0].y, l2[1].y) <= Math.max(l1[0].y, l1[1].y) && 
				Math.min(l1[0].y, l1[1].y) <= Math.max(l2[0].y, l2[1].y);
		}
	}
	return false;
}

class Rectangle { //the base rectangle
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.color = "#FFFFFF";

		this.left = false;
		this.right = false;
		this.up = false;
		this.down = false;
	}
	update(){

	}
	render() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

//////////////////////
// AUDIO MANAGEMENT //
//////////////////////
class SFXManager {
	/** A class to load, play, and stop audio files. **/
	constructor() {
		this.sfxs = new Map();
	}
	loadSound(path, name, loop, vol) {
		var audio = new Howl( {
			src: [path],
			loop: loop||false,
			volume: vol||1.0
		} );
		this.sfxs.set(name, audio);
	}
	playSound(name) {
		this.sfxs.get(name).play();
	}
	stopSound(name) {
		this.sfxs.get(name).stop();
	}
}

////////////
// INPUTS //
////////////
Mouse = function() {
	var mouse = {};
	mouse.x = 0;
	mouse.y = 0;
	mouse.cursor = new Cursor();
	mouse.down = false;
	
	mouse.update = function() {
		mouse.cursor.constUpdate(mouse.x, mouse.y);
		mouse.cursor.checkStatus(mouse.down);
	}
	
	window.addEventListener('mousemove', move);	
	function move(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}
	
	window.addEventListener('click', click);
	function click(e) {
	}
	window.addEventListener('mousedown', down);
	function down(e) {
		mouse.down = true;
	}
	window.addEventListener('mouseup', up);
	function up(e) {
		mouse.down = false;
	}
	
	canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;
	window.exitPointerLock = window.exitPointerLock ||
                           window.mozExitPointerLock;
	if ("onpointerlockchange" in window) {
		window.addEventListener('pointerlockchange', lockChangeAlert);
	} else if ("onmozpointerlockchange" in window) {
		window.addEventListener('mozpointerlockchange', lockChangeAlert);
	}
	function lockChangeAlert() {
		if (window.pointerLockElement === canvas ||
			window.mozPointerLockElement === canvas) {
			
		} else {
			
		}
	}
	
	return mouse;
}

GamepadManager = function() {
	/** A function designed to handle gamepads (cause Chrome sucks at it). **/
	var gM = {};
	gM.gamepads = [];
	
	if ("GamepadEvent" in window) {
		window.addEventListener('gamepadconnected', addGamepad);
		window.addEventListener('gamepaddisconnected', removeGamepad);
	} else if ("WebkitGamepadEvent" in window) {
		window.addEventListener('webkitgamepadconnected', addGamepad);
		window.addEventListener('webkitgamepaddisconnected', removeGamepad);
	}
	function addGamepad(e) {
		var i = e.gamepad.index;
		if (i < gM.gamepads.length) {
			gM.gamepads[i] = e.gamepad;
		} else {
			gM.gamepads.push(e.gamepad);
		}
		gM.gamepads[i].cursor = new Cursor();
	}
	function removeGamepad(e) {
		for (var c = 0; c < cursorArray.length; c++) {
			if (isEqual(cursorArray[c], e.gamepad.cursor)) {			
				delete cursorArray[c];
			}
		}
	}
	
	gM.update = function() {
		var cursors = [];
		for (g of gM.gamepads) {
			if (g) {
				cursors.push(g.cursor);
			} else {
				cursors.push(undefined);
			}
		}
		var temppads = navigator.getGamepads?navigator.getGamepads(): 
			(navigator.webkitGetGamepads?navigator.webkitGetGamepads():[]);
		for (var i = 0; i < temppads.length; i++) {
			gM.gamepads[i] = temppads[i];
		}
		
		for (g of gM.gamepads) {
			if (g) {
				if (cursors[g.index] != undefined) {
					g.cursor = cursors[g.index];
				} else {
					g.cursor = new Cursor();
				}
				g.update = function() {
					//remove dead zones and standardized distances
					this.newAxes = [];
					for (var a = 0; a < this.axes.length; a++) {
						this.newAxes.push(this.axes[a]);
						if (Math.abs(this.newAxes[a]) <= 0.1) {
							this.newAxes[a] = 0;
						}
					}
					for (var a = 0; a < this.newAxes.length; a += 2) {
						var v = distance(this.newAxes[a], this.newAxes[a+1]);
						if (v > 1) {
							this.newAxes[a] /= v;
							this.newAxes[a+1] /= v;
						}
					}
					//cursor movement
					this.cursor.delUpdate(this.newAxes[0] * 10, this.newAxes[1] * 10);
					//if (A) button (or equivalent) is pressed, selection works
					this.cursor.checkStatus(this.buttons[0].pressed);
				}
				g.update();
			}
		}
	}
	
	return gM;
}

var cursorArray = [];
var pointerColorArray = ["red", "blue", "lime", "yellow"];
class Cursor {
	/** A pointer for selection (either for mouse or gamepad). **/
	constructor() {
		this.x = null;
		this.y = null;
		this.w = 10;
		this.h = 10;
		this.visible = true;
		this.selecting = false;
		this.buffer = false; //prevents this.selecting from activating when true
		for (var x = 0; x < cursorArray.length; x++) {
			if (cursorArray[x] === undefined) {
				this.index = x;
				cursorArray[x] = this;
				break;
			}
		}
		if (this.index == undefined) {
			this.index = cursorArray.push(this) - 1;
		}
		if (this.index <= 3) {
			this.color = pointerColorArray[this.index];
		} else {
			this.color = "black";
		}
	}
	constUpdate(x, y) {
		this.x = x;
		this.y = y;
		this.update();
	}
	delUpdate(x, y) {
		if (this.x == null) {this.x = innerWidth/2;}
		if (this.y == null) {this.y = innerHeight/2;}
		this.x += x;
		this.y += y;
		if (this.x < 0) { this.x = 0; }
		else if (this.x > innerWidth) { this.x = innerWidth; }
		if (this.y < 0) { this.y = 0; }
		else if (this.y > innerHeight) { this.y = innerHeight; }
		this.update();
	}
	checkStatus(b) {
		//checks b and this.buffer to determine how to behave
		if (b) {
			if (this.buffer) {
				this.selecting = false;
			} else {
				this.selecting = true;
				this.buffer = true;
			}
		} else {
			this.buffer = false;
		}
	}
	update() {
		if (this.visible) {
			this.render();
		}
	}
	render() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + this.w, this.y + this.h);
		ctx.lineTo(this.x, this.y + 1.5 * this.h);
		ctx.fill();
	}
}

Keyboard = function() {
	var keys = [];
	window.addEventListener("keyup", keyUp);
	function keyUp(e) {
		keys[e.keyCode] = true;
	}
	window.addEventListener("keydown", keyDown);
	function keyDown(e) {
		keys[e.keyCode] = false;
	}
	return keys;
}

/////////////////
// RANDOMIZERS //
/////////////////
function randIntInRange(min, max) {
	///@return a random integer value between min and max inclusively.
	if (min > max) {
		var temp = min;
		min = max;
		max = temp;
	}
	return Math.round(Math.random() * (max - min)) + min;
}
function randDoubleInRange(min, max) {
	///@return a random double values between min and max inclusively.
	if (min > max) {
		var temp = min;
		min = max;
		max = temp;
	}
	return Math.random() * (max - min) + min;
}
function randFromList(a) { 
	///@return a random item in a list by picking one of its valid indexes randomly
	return a[randIntInRange(0, a.length - 1)];
}

////////////////////
// MATH EQUATIONS //
////////////////////
function distance(a, b) {
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
function degToRad(a) {
	return a * Math.PI / 180;
}

///////////////////
// MISCELLANEOUS //
///////////////////
function mid2Edge(c, l) {
	///@return Assume a vertical or horizontal line with a center at c and
	///length l, return the top-leftmost point
	///Note: If l < 0 it returns the bottom-rightmost point
	return c - l/2;
}
function isEqual(a, b) {
	///@return True if a and b have equal values for all properties, False otherwise
	if (a == undefined || b == undefined) {
		return a === b;
	}
	var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
	if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}
