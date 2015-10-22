/**
 * MyRobotWhell
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobotWhell(scene) {
	CGFobject.call(this,scene);

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

	this.disk = new MyDisk(this.scene, 100);
	this.wheel = new MyCylinder(this.scene, 100, 100);

};

MyRobotWhell.prototype = Object.create(CGFobject.prototype);
MyRobotWhell.prototype.constructor=MyRobotWhell;



MyRobotWhell.prototype.roda = function(delta) {
    var degToRad = Math.PI / 180.0;
    this.ang += degToRad*delta;
}

MyRobotWhell.prototype.display = function() {
		
		this.scene.pushMatrix();
		this.scene.rotate(this.ang, 1, 0, 0);
			
		//wheel
		this.scene.pushMatrix();
		this.scene.translate(-0.175, 0, 0);
		this.scene.scale(0.35, 0.6, 0.6);
		this.scene.rotate(90*degToRad, 0, 1, 0);
		this.black.apply();
		this.wheel.display();
    	this.scene.popMatrix();

    	 //disks
		this.scene.pushMatrix();
		this.scene.translate(-0.175, 0, 0);
		this.scene.scale(0.6, 0.6, 0.6);
    	this.scene.rotate(-90*degToRad, 0, 1, 0);
    	this.wheelAppearance.apply();
		this.disk.display();
    	this.scene.popMatrix();

    	this.scene.pushMatrix();
    	this.scene.translate(0.175, 0, 0);
    	this.scene.scale(0.6, 0.6, 0.6);
    	this.scene.rotate(90*degToRad, 0, 1, 0);
		this.disk.display();
   	 	this.scene.popMatrix();
		
		this.scene.popMatrix();
		


};