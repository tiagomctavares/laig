/**
 * MyWheel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyWheel(scene) {
	CGFobject.call(this,scene);

	this.x = 0;
	this.z = 0;
	this.ang = 0;

	this.wheelAppearance = new CGFappearance(this.scene);
	this.wheelAppearance.loadTexture('../resources/images/wheel.jpg');
	this.wheelAppearance.setAmbient(0.07,0.05,0.03,1);
	this.wheelAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.wheelAppearance.setSpecular(0.3,0.3,0.3,1); 
	this.wheelAppearance.setShininess(200); 

	this.black = new CGFappearance(this.scene);
	this.black.setAmbient(0,0,0,1);
	this.black.setDiffuse(0,0,0,1);
	this.black.setSpecular(0.2,0.12,0,1);
	this.black.setShininess(100); 

	this.disk = new MyDisk(this.scene, 20);

	//this.robot = new MyRobotGeometry(this.scene);
	this.robotBody = new MyRobotBody(this.scene, 20, 10);
	//this.robotWheel = new MyRobotBody(this.scene, 20, 10);

};

MyWheel.prototype = Object.create(CGFobject.prototype);
MyWheel.prototype.constructor=MyRobot;



MyWheel.prototype.movimenta = function(avanca, roda) {
    var degToRad = Math.PI / 180.0;
    this.ang += degToRad*roda;
    this.x += avanca*Math.sin(this.ang);
    this.z += avanca*Math.cos(this.ang);
}

MyWheel.prototype.display = function() {

			
		this.scene.translate(this.x, 0, this.z);
		this.scene.rotate(this.ang, 0, 1, 0);
		//CGFobject.prototype.display.call(this.robotWheel);

		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0);
		this.scene.rotate(180*degToRad, 1, 0, 0);
		this.wheelAppearance.apply();
		this.disk.display();
    	this.scene.popMatrix();

    	this.scene.pushMatrix();
    	this.scene.translate(0, 0, 1);
    	//this.scene.rotate(-180*degToRad, 1, 0, 0);
    	this.wheelAppearance.apply();
    	this.disk.display();
    	this.scene.popMatrix();

		//this.scene.translate(this.x, 0, this.z);
		//this.scene.rotate(this.ang, 0, 1, 0);
		
		//this.scene.translate(this.x, 0, this.z);
		//this.scene.rotate(-210 * degToRad, 0, 1, 0);
		

		this.black.apply();
		//CGFobject.prototype.display.call(this.robot);
		CGFobject.prototype.display.call(this.robotBody);





};