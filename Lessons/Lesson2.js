//this notation is one way to write a function, although the less typical one
Keyboard = function() {
	//this is object notation--it can be used to store name-value pairs
	var kboard = {};
	//this is an array, it stores a series of related values that can be added and removed
	keysPressed = [];
	
	//addEventListener tells the program to respond to a certain event (the first parameter)
	//the second parameter tells the program what to do when it encounters that event
	window.addEventListener('keydown', keyDown);
	//an event for when a key is first pushed
	function keyDown(e) {
		//array.push(obj) adds obj to the end of the array
		keysPressed.push(e.key);
		//this calls a function which changes txt according to its definition
		txt = editTextBox(txt, e.key);
	}
	window.addEventListener('keyup', keyUp);
	//an event for when a key is released
	///this is the more common way of declaring a function
	function keyUp(e) {
		//this code is kinda complicated, so I'll break it down
		///keyPressed.indexOf(e.key) searches keyPressed for the location (index) of e.key in the array
		///(we know that this will always exist because keyDown had to add it to the array first)
		///keysPressed.splice(index) removes the value at the index; in this case, the location of the removed key
		keysPressed.splice(keysPressed.indexOf(e.key));
	}
	//this return statement refers to the object
	return kboard;
}
var txt = "";	//a GLOBAL variable (we can call it anywhere in the code)
function editTextBox(t, k) {
	///make sure there are "==" (TWO equals). One = causes problems!
	if (k == "Backspace") {	//checks if Backspace was pressed
		return t.substr(0, t.length - 1);	//removes the last character in the string
	} else if (k.length != 1) { //checks if k is any other special character
		return t;	//leaves the string unchanged
	} else {	//anything else, which in this case is a single character long
		return t += k;	//add that character to the end of the text
	}
}
///the Mouse is incredibly similar to the Keyboard, so a lot won't need explaining
Mouse = function() {
	var mouse = {};
	//this two variables store the co-ordinate of the mouse pointer.
	mouse.x = 0;
	mouse.y = 0;
	
	window.addEventListener('mousemove', move);	
	function move(e) {
		//the mouse now stores the location it has moved to
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}
	window.addEventListener('click', click);
	//this refers to the left click only (the one most people navigate with)
	function click(e) {
		backgroundColor = "#d32031";
	}
	window.addEventListener('dblclick', doubleClick);
	//this also refers the left click only (it can be a little inconsistent)
	function doubleClick(e) {
		backgroundColor = "#42c02f";
	}
	window.addEventListener('contextmenu', rClick);
	//the refers to the menu that opens when you right click
	//I DON'T recommend using this one, but it may be useful to know that this exists
	//The key left of RCtrl also activates this function
	function rClick(e) {
		backgroundColor = "#0e516a";
	}
	///Some more possibilites with the mouse. It may be useful if you want an effect to
	///happen for as long as the left click is held down (such as for a shooting game)
	window.addEventListener('mousedown', mouseDown);
	function mouseDown(e) {
		///e (meaning "event") is a special object containing information about
		///what the EventListener picked up. This function currently does nothing
		///(but it could if you wanted to ;) )
	}
	window.addEventListener('mouseUp', mouseUp);
	function mouseUp(e) {	
	}
	//in this case, the mouse contains information about its location
	return mouse;
}
var backgroundColor = "#0e516a";

window.onload = function() {
	canvas = document.getElementById("canvas");	
	ctx = canvas.getContext("2d");
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	ctx.imageSmoothingEnabled = false;
	//we've made sure that the keyboard and mouse are created as soon as the window loads
	kboard = new Keyboard();
	mouse = new Mouse();
	setInterval(main, 100/6);
}

function main() {
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, innerWidth, innerHeight);
	
	ctx.fillStyle = "#FFFFFF";
	//I modified the text box to be the width of the whole screen
	ctx.fillRect(0, innerHeight/2 - 50, innerWidth, 100);
	
	ctx.fillStyle = "#000000";
	ctx.textAlign = 'center';
	ctx.font = "45px Courier";
	ctx.fillText(txt, innerWidth/2, innerHeight/2);

	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 5;
	ctx.strokeRect(0, innerHeight/2 - 50, innerWidth, 100);
	
	var picture = new Image();
	picture.src = "YourImageHere.png";
	ctx.drawImage(picture, innerWidth/2 - 100, innerHeight/2 + 100, 200, 200);
	
	ctx.beginPath();
	ctx.moveTo(innerWidth/2 + 100, innerHeight/2 + 50);
	ctx.lineTo(innerWidth/2 + 90, innerHeight/2 + 100);
	ctx.stroke();
}
