/**
 * MyRobotBody
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobotBody(scene) {
	CGFobject.call(this,scene);

	var degToRad = Math.PI / 180.0;

	this.body = new MyCylinder(this.scene, 100, 100);
	this.disk = new MyDisk(this.scene, 100);

};

MyRobotBody.prototype = Object.create(CGFobject.prototype);
MyRobotBody.prototype.constructor=MyRobotBody;

MyRobotBody.prototype.display = function() {

//body
    this.scene.pushMatrix();
	this.scene.scale(0.8, 1.95, 0.8);
	this.scene.rotate(90 * degToRad, 0, 1, 0);
	this.scene.rotate(-90 * degToRad, 1, 0, 0);
	this.body.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(0.8, 1, 0.8);
    this.scene.rotate(90*degToRad, 1, 0, 0);
	this.disk.display();
    this.scene.popMatrix();

};