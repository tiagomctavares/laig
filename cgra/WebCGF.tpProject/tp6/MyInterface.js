/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	this.scene = application.scene;
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'doSomething');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Options");
	group.open();
	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'Pause_Clock');
	group.add(this.scene, 'Light1');
	group.add(this.scene, 'Light2');
	group.add(this.scene, 'Light3');
	group.add(this.scene, 'Light4');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', 0, 10);

	this.gui.add(this.scene, 'textures', { 'Riscas' : 0, 'Bad-Boy' : 1, 'Minion' : 2 } );

	return true;
};


/**
 * processKeyDown
 * @param event {Event}
 */
MyInterface.prototype.processKeyDown = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyDown.call(this,event);
	
	// Check key codes e.g. here: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp

	//bye bye
	if(event.keyCode == 79) this.scene.moveRobot[0] = true;//this.scene.robotAcena = true;
	// only works for capital 'A', as it is
	if(event.keyCode == 65) this.scene.moveRobot[1] = true; //this.scene.robot.movimenta(0, this.scene.speed);
	// only works for capital 'D', as it is
	if(event.keyCode == 68) this.scene.moveRobot[2] = true; //this.scene.robot.movimenta(0, -this.scene.speed);
	// only works for capital 'W', as it is
	if(event.keyCode == 87) this.scene.moveRobot[3] = true; //this.scene.robot.movimenta(this.scene.speed/10, 0);
	// only works for capital 'S', as it is
	if(event.keyCode == 83) this.scene.moveRobot[4] = true; //this.scene.robot.movimenta(-this.scene.speed/10, 0);

};


/**
 * processKeyUp
 * @param event {Event}
 */
MyInterface.prototype.processKeyUp = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyUp.call(this,event);
	
	// Check key codes e.g. here: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp

	//bye bye
	if(event.keyCode == 79) this.scene.moveRobot[0] = false;//this.scene.robotAcena = true;
	// only works for capital 'A', as it is
	if(event.keyCode == 65) this.scene.moveRobot[1] = false; //this.scene.robot.movimenta(0, this.scene.speed);
	// only works for capital 'D', as it is
	if(event.keyCode == 68) this.scene.moveRobot[2] = false; //this.scene.robot.movimenta(0, -this.scene.speed);
	// only works for capital 'W', as it is
	if(event.keyCode == 87) this.scene.moveRobot[3] = false; //this.scene.robot.movimenta(this.scene.speed/10, 0);
	// only works for capital 'S', as it is
	if(event.keyCode == 83) this.scene.moveRobot[4] = false; //this.scene.robot.movimenta(-this.scene.speed/10, 0);

};





