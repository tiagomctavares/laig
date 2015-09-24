/**
 * MyRobotArm
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobotArm(scene) {
	CGFobject.call(this,scene);


	this.topArm = new myLamp(this.scene, 100, 100);
	this.arm = new MyCylinder(this.scene, 100, 100);
	
	

};

MyRobotArm.prototype = Object.create(CGFobject.prototype);
MyRobotArm.prototype.constructor=MyRobotArm;


MyRobotArm.prototype.display = function() {

	//arm
	this.scene.pushMatrix();
	this.scene.scale(0.2, 1.1, 0.2);
	this.scene.rotate(90 * degToRad, 0, 1, 0);
	this.scene.rotate(-90 * degToRad, 1, 0, 0);
	this.arm.display();
	this.scene.popMatrix();

	//topArm
	this.scene.pushMatrix();
    this.scene.translate(0, 1.1, 0);
    this.scene.scale(0.2, 0.2, 0.2);
    this.scene.rotate(90 * degToRad, 0, 1, 0);
    this.scene.rotate(-90 * degToRad, 1, 0, 0);
	this.topArm.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(0.2, 0.2, 0.2);
    this.scene.rotate(285 * degToRad, 0, 1, 0);
    this.scene.rotate(90 * degToRad, 1, 0, 0);
	this.topArm.display();
    this.scene.popMatrix();

};