/**	SmashSticks/character.js	GDC 2019-2020
	This file contains code for the playable characters in the game, along
	with non-playable characters (NPCs), and classes and functions managing
	the characters and their interactions.
*/

class Character extends Rectangle {
	constructor(x, y, w, h, c, kl, kr, kj) {  
		super(x, y, w, h, c);
		this.keyLeft = kl;
		this.keyRight = kr;
		this.keyJump = kj;
		this.canMove = false;
		this.aState = "WAIT";
		this.gVel = 0;
		this.G_ACCEL = 1;
		this.nodes = [new Node(this.x, mid2Edge(this.y, this.h) + this.h/32), //head
					new Node(this.x, this.y), //pelvis
					new Node(this.x - this.w/4, mid2Edge(this.y, -this.h)), //left foot
					new Node(this.x + this.w/4, mid2Edge(this.y, -this.h)), //right foot
					new Node(this.x, this.y - this.h*11/32), //shoulder area
					new Node(this.x - this.w/4, this.y), //left hand
					new Node(this.x + this.w/4, this.y)]; //right hand
		this.connectors = [new Connector(this.nodes[0], this.nodes[4]), //neck
							new Connector(this.nodes[4], this.nodes[5]), //left arm
							new Connector(this.nodes[4], this.nodes[6]), //right arm
							new Connector(this.nodes[4], this.nodes[1]), //torso
							new Connector(this.nodes[1], this.nodes[2]), //left leg
							new Connector(this.nodes[1], this.nodes[3])]; //right leg
	}
	update() {
		if (this.canMove) {
			if(kboard[this.keyRight]) {
				this.x += innerWidth/455;
			}
			if(kboard[this.keyLeft]) {
				this.x -= innerWidth/455;
			}
			if(kboard[this.keyJump] && this.aState != "AIR") {
				this.y -= innerHeight/30;
				this.aState = "AIR-H"; //AIR - HOLDING state - when the player is holding the button, they will continue to rise
			}
			if(!kboard[this.keyJump] && this.aState == "AIR-H")
				this.aState = "AIR";
		}
		//Handles gravity
		this.y += this.gVel;
		this.gVel += this.G_ACCEL;
		if (this.gVel <= this.G_ACCEL) { //the player has hit the ground
			this.aState = "WAIT"
		}

	}
	/// These functions are known as "getters" and "setters." You call them without the
	/// parenthesis (so that it is exactly like requesting the variables.
	/// Don't worry about this._x & this._y; that is to separate them from this.x & this.y
	get x() { return this._x; }
	set x(nX) {
		if (this.nodes) {
			for (var n of this.nodes) {
				n.x += nX - this._x;
			}
		}
		this._x = nX;
	}
	get y() { return this._y; }
	set y(nY) {
		if (this.nodes) {
			for (var n of this.nodes) {
				n.y += nY - this._y;
			}
		}
		this._y = nY;
	}
	updateXScaling(o, n) {
		for (var v of this.nodes) {
			v.x *= n/o;
		}
		//I use this to bypass the setter because that will change the nodes again
		//This probably isn't in line with good programming practice, but whatevs
		this._x *= n/o;
		this.w *= n/o;
	}
	updateYScaling(o, n) {
		for (var v of this.nodes) {
			v.y *= n/o;
		}
		this._y *= n/o;
		this.h *= n/o;
		this.gVel *= n/o;
		this.G_ACCEL *= n/o;
	}
	render() {
		super.render();
		for (var n of this.nodes) {
			n.render();
		}
		for (var c of this.connectors) {
			c.render();
		}
	}
}

/** CLASSES FOR BUILDING THE CHARACTER **/
class Node extends Positional {
	/** A location of interest for stick figure movement, e.g. a foot. **/
	constructor(x, y) {
		super(x, y);
	}
	update() {
	}
	render() {
		//for testing; will probably be removed
		ctx.strokeStyle = "#dddd00";
		ctx.lineWidth = 10/devicePixelRatio;
		ctx.beginPath();
		ctx.lineCap = 'round';
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();
	}
}
class Connector {
	/** A tool for drawing lines between nodes. **/
	constructor(n1, n2) {
		this.n1 = n1; this.n2 = n2;
	}
	render() {
		ctx.strokeStyle = "#00dddd";
		ctx.lineWidth = 8/devicePixelRatio;
		ctx.beginPath();
		ctx.lineCap = 'round';
		ctx.moveTo(this.n1.x, this.n1.y);
		ctx.lineTo(this.n2.x, this.n2.y);
		ctx.stroke();
	}
}
