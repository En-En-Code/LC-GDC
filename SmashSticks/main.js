/**	SmashSticks/main.js		GDC 2019-2020
	This file is for the main() function call, and also contains the
	window.onload() function and the initialization of global variables.
*/

var sM = new SceneManager();
sM.addScene(new StartScene());
sM.addScene(new OptionsScene());
sM.addScene(new ControlChangeScene());
sM.changeScene("start");

window.onload = function() {
	canvas = document.getElementById("canvas");	
	ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	setInterval(main, 100/6);
}

function main() {
	//These values are now updated every frame, which accommodates changing
	//the screen size.
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	sM.update();
}
