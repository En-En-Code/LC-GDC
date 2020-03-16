/**	SmashSticks/character.js	GDC 2019-2020
	This file contains code for the playable characters in the game, along
	with non-playable characters (NPCs), and classes and functions managing
	the characters and their interactions.
*/

class Character extends Rectangle { //will probably just be a collection of animations that the hitboxes is tied to the hitboxes
	constructor(x, y, w, h, c, kl, kr, kj, as = "WAIT") {  
		super(x, y, w, h, c);
		this.keyLeft = kl;
		this.keyRight = kr;
		this.keyJump = kj;
		this.canMove = false;
		this.aState = as;
		this.gVel = 0;
		this.G_ACCEL = 1;
	}
	update() {
		if (this.canMove) {
			if(kboard[this.keyRight]) {
				this.x += 3;
			}
			if(kboard[this.keyLeft]) {
				this.x -= 3;
			}
			if(kboard[this.keyJump] && this.aState != "AIR") {
				this.y -= innerHeight/25;
				this.aState = "AIR-H"; //AIR - HOLDING state - when the player is holding the button, they will continue to rise
			}
			if(!kboard[this.keyJump] && this.aState == "AIR-H")
				this.aState = "AIR";
		}
		if (this.gVel == 0) { //the player has hit the ground
			this.aState = "WAIT"
		}
	}
}
