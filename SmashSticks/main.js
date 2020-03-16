/**	SmashSticks/main.js		GDC 2019-2020
	This file is for the main() function call, and also contains the
	window.onload() function and the initialization of global variables.
*/

var showFPS = {value:false, aveArr:[], point:0, prevTime:Date.now(), currTime:0, fps:0};
showFPS.aveArr[59] = 0;

var sM = new SceneManager();
sM.addScene(new StartScene());
sM.addScene(new OptionsScene());
sM.addScene(new ControlChangeScene());
sM.addScene(new FightScene());
sM.addScene(new AfterFightScene());
sM.changeScene("start");

var gM = new GamepadManager();
var aM = new SFXManager();

window.onload = function() {
	canvas = document.getElementById("canvas");	
	ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	mouse = new Mouse();
	kboard = new Keyboard();
	document.body.style.cursor = 'none';
	main();
}
window.onresize = function() {
	sM.updateXScaling(canvas.width, innerWidth);
	sM.updateYScaling(canvas.height, innerHeight);
	canvas.width = innerWidth;
	canvas.height = innerHeight;
}

function main() {
	sM.update();

	if (showFPS.value) {
		//determines the running time in between frames to obtain a frame rate
		///could be better by not checking every frame (e.g. check 1 in 4 frames)
		showFPS.currTime = Date.now();
		showFPS.aveArr[showFPS.point] = 1000 / (showFPS.currTime - showFPS.prevTime);
		showFPS.prevTime = showFPS.currTime;
		showFPS.point += 1;
		if (showFPS.point > 59) {
			showFPS.point = 0;
			showFPS.fps = 0;
			for (num of showFPS.aveArr) {
				showFPS.fps += num;
			}
			showFPS.fps /= 60;
		}
		formatText(15, "Courier", "#000000", "center", "middle");
		ctx.fillText(Math.round(showFPS.fps) + " fps", innerWidth/24*devicePixelRatio, innerHeight/24*devicePixelRatio);
	}
	
	mouse.update();
	gM.update();
	requestAnimationFrame(main);
}
