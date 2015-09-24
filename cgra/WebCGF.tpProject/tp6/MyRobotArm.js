/**
 * MyRobotArm
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobotArm(scene) {
	CGFobject.call(this,scene);

	var degToRad = Math.PI / 180.0;

	this.tX = 0;
	this.tZ = 0;
	this.angX = 0;
	this.angZ = 0;
	this.estadoAcenar = 0;

	this.red = new CGFappearance(this.scene);
	this.red.setAmbient(0.64,0.05,0.09,1);
	this.red.setDiffuse(0.64,0.05,0.09,1);
	this.red.setSpecular(0.2,0.12,0,1);
	this.red.setShininess(100);

	this.pink = new CGFappearance(this.scene);
	this.pink.setAmbient(1,0.18,0.59,1);
	this.pink.setDiffuse(1,0.18,0.59,1);
	this.pink.setSpecular(0.2,0.12,0,1);
	this.pink.setShininess(100);

	this.green = new CGFappearance(this.scene);
	this.green.setAmbient(0.047,0.5,0,1);
	this.green.setDiffuse(0.047,0.5,0,1);
	this.green.setSpecular(0.2,0.12,0,1);
	this.green.setShininess(100);

	this.topArm = new myLamp(this.scene, 100, 100);
	this.arm = new MyCylinder(this.scene, 100, 100);
	
	

};

MyRobotArm.prototype = Object.create(CGFobject.prototype);
MyRobotArm.prototype.constructor=MyRobotArm;


MyRobotArm.prototype.mexe = function(ang) {
	this.angX = Math.sin(ang);
}

MyRobotArm.prototype.acena = function(intervalo, outroAngX) {
	if (this.estadoAcenar == 0){
		this.angX += intervalo / 250;
		if (this.angX > 180*degToRad)
		{
			this.angX = 180*degToRad;
			this.estadoAcenar = 1;
		}
	}
	else if (this.estadoAcenar == 1){
		this.tZ += intervalo / 200;
		this.angZ = Math.sin(this.tZ)/3;
		if (this.tZ >= 3*Math.PI)
		{
			this.angZ = 0;
			this.tZ = 0;
			this.estadoAcenar = 2;
		}
	}
	else if (this.estadoAcenar == 2){
		var delta = outroAngX-this.angX;
		if (delta < -intervalo/250) delta = -intervalo/250;
		else if (delta > intervalo/250) delta = intervalo/250;
		this.angX += delta;
		if (delta == 0) this.estadoAcenar = 3;
	}
	if (this.estadoAcenar == 3)
	{
		this.tZ = 0;
		this.angZ = 0;
		this.estadoAcenar = 0;
		this.scene.robotAcena = false;
	}

}


MyRobotArm.prototype.display = function() {
	
	this.scene.rotate(this.angX, 1, 0, 0); 
	this.scene.rotate(this.angZ, 0, 0, 1); 
	this.scene.translate(0, -1.1, 0);

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
    this.scene.rotate(90 * degToRad, 0, 1, 0);
    this.scene.rotate(90 * degToRad, 1, 0, 0);
	this.topArm.display();
    this.scene.popMatrix();

};