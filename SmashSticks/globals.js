/**	SmashSticks/globals.js		GDC 2019-2020
	This file is for miscellaneous functions and classes needed by other files.
	Included in this file are collision functions, the keyboard class, and
	various mathematical formulae.
*/

///////////////
// COLLISION //
///////////////
function collisionDirect(t1, t2) {
	///@return: True if the t1 & t2 are overlapping, False otherwise
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
	///@return: True if the two rectangles, b1 & b2, are overlapping, False otherwise.
	return 	mid2Edge(b1.x, b1.w) <= mid2Edge(b2.x, -b2.w) &&
			mid2Edge(b1.x, -b1.w) >= mid2Edge(b2.x, b2.w) &&
			mid2Edge(b1.y, b1.h) <= mid2Edge(b2.y, -b2.h) &&
			mid2Edge(b1.y, -b1.h) >= mid2Edge(b2.y, b2.h);
}
function pointRectCollision(p, b) {
	///@return: True if the point p is inside of rectangle b, False otherwise.
	return 	p.x >= mid2Edge(b.x, b.w) && p.x <= mid2Edge(b.x, -b.w) &&
			p.y >= mid2Edge(b.y, b.h) && p.y <= mid2Edge(b.y, -b.h);
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
	
	window.addEventListener('mousemove', move);	
	function move(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}
	window.addEventListener('click', click);
	function click(e) {

	}
	return mouse;
}

/////////////////
// RANDOMIZERS //
/////////////////
function randIntInRange(min, max) {
	///returns a random integer value between min and max inclusively.
	if (min > max) {
		var temp = min;
		min = max;
		max = temp;
	}
	return Math.round(Math.random() * (max - min)) + min;
}
function randDoubleInRange(min, max) {
	///returns a random double values between min and max inclusively.
	if (min > max) {
		var temp = min;
		min = max;
		max = temp;
	}
	return Math.random() * (max - min) + min;
}
function randFromList(a) { 
	///picks a random item in a list by picking one of its valid indexes randomly
	return a[randIntInRange(0, a.length - 1)];
}

///////////////////
// MISCELLANEOUS //
///////////////////
function mid2Edge(c, l) {
	///@return: Assume a vertical or horizontal line with a center at c and
	///length l, return the top-leftmost point
	///Note: If l < 0 it returns the bottom-rightmost point
	return c - l/2;
}
