/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClock(scene) {
	CGFobject.call(this,scene);

	this.time = (45 + 30*60 + 3*60*60)*1000;

	/*this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.loadTexture('../resources/images/clock.png');
	this.clockAppearance.setAmbient(0.07,0.05,0.03,1);
	this.clockAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.clockAppearance.setSpecular(0.2,0.12,0,1);
	this.clockAppearance.setShininess(100);
/*/
	this.red = new CGFappearance(this.scene);
	this.red.setAmbient(0.64,0.05,0.09,1);
	this.red.setDiffuse(0.64,0.05,0.09,1);
	this.red.setSpecular(0.2,0.12,0,1);
	this.red.setShininess(100);

	this.green = new CGFappearance(this.scene);
	this.green.setAmbient(0.047,0.5,0,1);
	this.green.setDiffuse(0.047,0.5,0,1);
	this.green.setSpecular(0.2,0.12,0,1);
	this.green.setShininess(100);

	this.black = new CGFappearance(this.scene);
	this.black.setAmbient(0,0,0,1);
	this.black.setDiffuse(0,0,0,1);
	this.black.setSpecular(0.2,0.12,0,1);
	this.black.setShininess(100);

	this.yellow = new CGFappearance(this.scene);
	this.yellow.setAmbient(0.96,0.91,0,1);
	this.yellow.setDiffuse(0.96,0.91,0,1);
	this.yellow.setSpecular(0.2,0.12,0,1);
	this.yellow.setShininess(100);

    this.cylinder = new MyCylinder(this.scene, 4, 1, 1, 20, 20);

	/*this.disk = new MyDisk(this.scene, 12);
	this.clockHandHours = new MyClockHand(this.scene, 90, 0.45, 0.05);
	this.clockHandMinutes =new MyClockHand(this.scene, 180, 0.65, 0.034);
	this.clockHandSeconds = new MyClockHand(this.scene,270, 0.8, 0.02, 0.2);
 */
	this.cylinder.initBuffers();


};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;

MyClock.prototype.update = function(currTime) {
	this.time +=currTime;

	this.clockHandHours.setAngle(this.time/1000/60/60*360/12);
	this.clockHandMinutes.setAngle(this.time/1000/60*360/60);
	this.clockHandSeconds.setAngle( this.time/1000*360/60);

};

MyClock.prototype.display = function() {

	this.scene.pushMatrix();
	this.red.apply();
	this.cylinder.display();
	this.scene.popMatrix();
	/*
	this.scene.pushMatrix();
	this.scene.translate(0, 0, 1);
	this.clockAppearance.apply();
	this.disk.display();
    this.scene.popMatrix();


	this.scene.pushMatrix();
	this.scene.translate(0, 0, 1.01);
	this.yellow.apply();
    this.clockHandSeconds.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0, 0, 1.02);
    this.green.apply();
    this.clockHandMinutes.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1.03);
    this.black.apply();
    this.clockHandHours.display();
    this.scene.popMatrix();

*/
    
};