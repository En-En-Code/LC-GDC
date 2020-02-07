/**	SmashSticks/character.js	GDC 2019-2020
	This file contains code for the playable characters in the game, along
	with non-playable characters (NPCs), and classes and functions managing
	the characters and their interactions.
*/

class Character { //will probably just be a collection of animations that the hitboxes is tied to the hitboxes
	constructor(x, y, w, h){
		this.keyUp = 68;
	}
	update(){
		if(kboard[this.keyUp]) {
			this.x += 1;
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

//arrays and push
var boxArray = []
sM.scenes.get("ingame").objs.push(boxArray);
boxArray.push(testbox);
