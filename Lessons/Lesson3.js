/**
*	A class is function that can create instances of objects. These objects, and their
*	interactions, are the most important part of Object-Oriented Programming, which
*	is the standard for any complex program.
*/
//*** An image with a TextBox associated with it. ***//
class Character {	
	//a constructor is the function run when the object is declared
	//its main use is to set default values to variables the object needs
	constructor(x, y, w, h, pic, txt) {
		this.x = x;	//this.x and this.y represent the CENTER of the picture
		this.y = y;
		this.w = w;	//the keyword "this" represents the class owning these properties
		this.h = h;	//it is a common error to exclude them from variables used in classes
		this.picture = new Image();
		this.picture.src = pic;
		//classes can own other classes, such as here
		//notice that I added a way to initialize the text box with txt
		///I DON'T use this.txt because the character doesn't need to know the text, it just
		///needs to be able to pass the value onto the TextBox
		this.txtBox = new Textbox(this.x + this.w, this.y - this.h,
								this.w, this.h/2, txt);
	}
	render() {	
		//notice how instead of using predefined positions, we can use the class variables
		//this allows our code to be a lot more versatile
		ctx.drawImage(this.picture, mid2Edge(this.x, this.w), mid2Edge(this.y, this.h), this.w, this.h);
		this.txtBox.render();	//runs the render function of its TextBox
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
		//\In theory, you could specify more things, such as backgroundColor, borderColor,
		//and borderWidth in the constructor, but that might be overkill
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(mid2Edge(this.x, this.w), mid2Edge(this.y, this.h), this.w, this.h);
		
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 5;
		ctx.strokeRect(mid2Edge(this.x, this.w), mid2Edge(this.y, this.h), this.w, this.h);
		
		ctx.fillStyle = "#000000";
		ctx.textAlign = 'center';
		ctx.font = "45px Courier";
		//In fillText, we added the optional third parameter, which sets the max text width
		//That way, the text doesn't go outside of our box when it gets longer
		ctx.fillText(this.txt, this.x, this.y, this.w);
		///This stuff is for the line linking the TextBox to its character
		///Don't worry about it, since it will need additional modifications in future lessons.
		ctx.beginPath();
		ctx.moveTo(mid2Edge(this.x, -this.w), mid2Edge(this.y, -this.h));
		ctx.lineTo(mid2Edge(this.x, -this.w) - this.w, mid2Edge(this.y, -this.h) + this.h);
		ctx.stroke();
	}
}
function mid2Edge(m, w) {
	//Given the middle of a horizontal or vertical line and its length, find the top or leftmost point
	///Note: if you want to find a bottom or rightmost point, use mid2Edge(m, -w);
	return m - w/2;
}

Keyboard = function() {
	var kboard = {};
	keysPressed = [];
	
	window.addEventListener('keydown', keyDown);
	function keyDown(e) {
		keysPressed.push(e.key);
		//Here, we refer to the object rather than a random variable
		buddy.txtBox.txt = editTextBox(buddy.txtBox.txt, e.key);
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
//This is a class declaration, which requires the class name and all of the constructor's parameters
//When we begin to declare a lot of classes, it will be obvious how much coding is saved.
var buddy = new Character(innerWidth/2, innerHeight/2 + 200, 200, 200, "YourImageHere.png", "Hello!");

function main() {
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, innerWidth, innerHeight);
	//Look how much simpler the main function became because we moved everything to classes!
	buddy.render();
}
