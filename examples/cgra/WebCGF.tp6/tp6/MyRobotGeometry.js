/**
 * MyRobotGeometry
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobotGeometry(scene) {
	CGFobject.call(this,scene);

	var degToRad = Math.PI / 180.0;

	this.head = new MyRobotHead(this.scene);
	this.body = new MyRobotBody(this.scene);
	this.arm1 = new MyRobotArm(this.scene);
	this.arm2 = new MyRobotArm(this.scene);
	this.wheel1 = new MyRobotWhell(this.scene);
	this.wheel2 = new MyRobotWhell(this.scene);

};

MyRobotGeometry.prototype = Object.create(CGFobject.prototype);
MyRobotGeometry.prototype.constructor=MyRobotGeometry;


MyRobotGeometry.prototype.display = function(textBody, textHead, textArm) {

	
    //body
    this.scene.pushMatrix();
	this.scene.translate(0, 0.6, 0);
	textBody.apply();
	this.body.display();
    this.scene.popMatrix();

	//head
	this.scene.pushMatrix();
    this.scene.translate(0, 2.55, 0);
    textHead.apply();
	this.head.display();
    this.scene.popMatrix();    


	//Arms
	this.scene.pushMatrix();
	this.scene.translate(1.01, 1.45, 0);
	textArm.apply();
	this.arm1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
	this.scene.translate(-1.01, 1.45, 0);
	this.scene.rotate(180*degToRad, 0, 1, 0);
	textArm.apply();
	this.arm2.display();
    this.scene.popMatrix();

    //Wheels
	this.scene.pushMatrix();
	this.scene.translate(1.01, 0.6, 0);
	this.wheel1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
	this.scene.translate(-1.01, 0.6, 0);
	this.wheel2.display();
    this.scene.popMatrix();


};