/**
 * MyRobot
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobot(scene) {
	CGFobject.call(this,scene);

	this.x = 0;
	this.z = 0;
	this.ang = 0;
	this.tBracos = 0;
	
	var degToRad = Math.PI / 180.0;

	this.robot = new MyRobotGeometry(this.scene);

};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor=MyRobot;



MyRobot.prototype.movimenta = function(avanca, roda) {
    this.ang += degToRad*roda;
    this.x += avanca*Math.sin(this.ang);
    this.z += avanca*Math.cos(this.ang);
    this.tBracos += avanca/2;
    if (avanca != 0)
    {
    	this.robot.wheel1.roda(avanca*80);
    	this.robot.wheel2.roda(avanca*80);
    	var angBracos = Math.sin(this.tBracos);
    	if (!this.scene.robotAcena) this.robot.arm2.mexe(angBracos);
    	this.robot.arm1.mexe(angBracos);
    }
    else
    {
    	this.robot.wheel1.roda(-roda*2);
    	this.robot.wheel2.roda(roda*2);
    }
   
}

MyRobot.prototype.acena = function(intervalo){

	this.robot.arm2.acena(intervalo,Math.sin(this.tBracos));

}

MyRobot.prototype.display = function(textBody, textHead, textArm) {		
		this.scene.translate(this.x,0, this.z);
		this.scene.rotate(this.ang, 0, 1, 0);
		this.robot.display(textBody, textHead, textArm);
};

