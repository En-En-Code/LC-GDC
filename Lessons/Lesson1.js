window.onload = function() {
	//None of this is important to you, just understand that you need it
	canvas = document.getElementById("canvas");	
	ctx = canvas.getContext("2d");
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	ctx.imageSmoothingEnabled = false;
	setInterval(main, 100/6);
}

/**	Notice the capitalization! It is VERY important that everything is capitalized properly.
*	For most functions, the first word isn't capitalized and every word after that has its
*	first letter capitalized. Also, if you can't figure out why the code isn't working, you
*	can hit F12 on the web page to open the DevTools box.
*/
function main() {
	///More canvas drawing functions can be found @ https://www.w3schools.com/tags/ref_canvas.asp
	//the format for a basic box
	ctx.fillStyle = "#0e516a";	//https://www.google.com/search?q=color+picker
								//will allow you to pick a color you like easily
	///ctx.fillRect(top left corner, top right corner, width, height)
	ctx.fillRect(0, 0, innerWidth, innerHeight);
	
	//a new box, which will hold text
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(innerWidth/2 - 100, innerHeight/2 - 50, 200, 100);
	
	//the text for the text box
	ctx.fillStyle = "#000000";
	//these are text styling options
	ctx.textAlign = 'center';
	ctx.font = "25px Courier";
	///ctx.fillText(text, x, y)
	ctx.fillText("Hello World!", innerWidth/2, innerHeight/2);
	
	//stroke can in many places replace the word "fill" and it pertains only to outlines,
	//but otherwise stroke functions do the same thing
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 5;	//this makes the outline more noticeable (it will be 5 pixels wide)
	//this draws an outline of the box (notice how it uses the same parameters as the box)
	ctx.strokeRect(innerWidth/2 - 100, innerHeight/2 - 50, 200, 100);
	
	//a picture of someone to say "Hello World!"
	var picture = new Image();
	picture.src = "YourImageHere.png";	//use an image saved in the same place as the project
	///ctx.drawImage(Image, top left corner, top right corner) 
	ctx.drawImage(picture, innerWidth/2 - 100, innerHeight/2 + 100, 200, 200);
	
	//a line to link the text box and the picture
	ctx.beginPath();	//think of this as telling the code "You're gonna write soon"
	///ctx.moveTo(x, y)  &  ctx.lineTo(x, y)
	ctx.moveTo(innerWidth/2 + 100, innerHeight/2 + 50);
	//you can also draw curves with ctx.quadraticCurveTo(), ctx.arcTo() and ctx.bezierCurveTo()
	ctx.lineTo(innerWidth/2 + 90, innerHeight/2 + 100);
	ctx.stroke();	//writes everything between beginPath() and stroke()
}
