/**
 * MyRobotHead
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobotHead(scene) {
	CGFobject.call(this,scene);

	var degToRad = Math.PI / 180.0;

	this.head = new myLamp(this.scene, 100, 100);

};

MyRobotHead.prototype = Object.create(CGFobject.prototype);
MyRobotHead.prototype.constructor=MyRobotHead;

MyRobotHead.prototype.display = function() {

    //Head
    this.scene.pushMatrix();
    this.scene.scale(0.8, 0.8, 0.8);
    this.scene.rotate(90 * degToRad, 0, 1, 0);
    this.scene.rotate(-90 * degToRad, 1, 0, 0);
	this.head.display();
    this.scene.popMatrix();

     
};