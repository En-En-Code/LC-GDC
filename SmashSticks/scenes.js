/**	SmashSticks/scenes.js		GDC 2019-2020
	This file is for the classes Scene, Scene's subclasses, and SceneManager.
	Scene is a skeleton class with the functions needed by instances of Scene.
	Each subclass contains the data needed to load and run a particular menu or
	the game itself. SceneManager handles loading, unloading, and updating Scenes.
*/

class SceneManager {
	/** Class which adds, loads, unloads, and updates Scenes. **/
	constructor() {
		this.scenes = new Map();
		this.currScene;
	}
	addScene(sceneObj) {
		this.scenes.set(sceneObj, sceneObj.name);
	}
	changeScene(scene) {
		this.scenes.get(this.currScene).unload();
		this.scenes.get(scene).load();
		this.currScene = scene.name;
	}
	update() {
		this.scenes.get(this.currScene).update();
	}
}

class Scene {
	/** Class that gives the functions needed to define a scene. **/
	constructor() {}
	
	load() {}
	unload() {}
	update() {}
	render() {}
}