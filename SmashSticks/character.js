/**	SmashSticks/character.js	GDC 2019-2020
	This file contains code for the playable characters in the game, along
	with non-playable characters (NPCs), and classes and functions managing
	the characters and their interactions.
*/

class Character extends Rectangle { //will probably just be a collection of animations that the hitboxes is tied to the hitboxes
	constructor(x, y, w, h, c){
		super(x, y, w, h, c);
		this.keyRight = 68;
		this.keyLeft = 65;
		this.keyJump = 87;
	}
	update(){
		if(kboard[this.keyRight]) {
			this.x += 3;
		}
		if(kboard[this.keyLeft]) {
			this.x -= 3;
		}
		if(kboard[this.keyJump]) {
			this.y -= 3;
		}
	}
}

class Hitbox extends Rectangle { //box that determines character's collisions, if it is hit by hurtbox then character takes damage
	constructor(x, y, w, h, c) {
		super(x, y, w, h, c)
	}
	update() {
		
	}
}

class Hurtbox extends Rectangle { //this is the hitboxes of attacks, if it collides with a hitbox then character takes damage
	constructor(x, y, w, h) {
		super(x, y, w, h)
	}
}
