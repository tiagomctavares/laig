/**
 * MyChair
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyChair(scene) {
	CGFobject.call(this,scene);

	this.tableAppearance = new CGFappearance(this.scene);
	this.tableAppearance.setAmbient(0.07,0.05,0.03,1);
	this.tableAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.tableAppearance.setSpecular(0.2,0.12,0,1);
	this.tableAppearance.setShininess(100);
	//this.tableAppearance.loadTexture('http://localhost:8080/Pratica4/resources/images/table.png');
	this.tableAppearance.loadTexture('../resources/images/table.png');
	
	this.metal = new CGFappearance(this.scene);
	this.metal.setAmbient(0.8,0.8,0.8,1);
	this.metal.setDiffuse(0.8,0.8,0.8,1);
	this.metal.setSpecular(0.89,0.89,0.89,1);
	this.metal.setShininess(50);

	this.cubeQuad = new MyUnitCubeQuad(this.scene);
	this.cubeQuad.initBuffers();

};

MyChair.prototype = Object.create(CGFobject.prototype);
MyChair.prototype.constructor=MyChair;


MyChair.prototype.display = function() {

    var deg2rad=Math.PI/180.0;
	var a_rad=90.0*deg2rad;


	this.metal.apply();
	
	//4 PERNAS
	this.scene.pushMatrix();
	this.scene.translate(0.65,0,0.8);
	this.scene.translate(0,1.25,0);
	this.scene.scale(0.2, 2.5,0.2);
	this.cubeQuad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-0.65,0,0.8);
	this.scene.translate(0,1.25,0);
	this.scene.scale(0.2, 2.5,0.2);
	this.cubeQuad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0.65,0,-0.8);
	this.scene.translate(0,1.25,0);
	this.scene.scale(0.2, 2.5,0.2);
	this.cubeQuad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-0.65,0,-0.8);
	this.scene.translate(0,1.25,0);
	this.scene.scale(0.2, 2.5,0.2);
	this.cubeQuad.display();
	this.scene.popMatrix();


	this.tableAppearance.apply();

	//ACENTO
	this.scene.pushMatrix();
	//this.scene.translate(0,2.6,0);
	this.scene.translate(0,2.6,0);
	this.scene.scale(1.5, 0.2,1.8);
	this.cubeQuad.display();
	this.scene.popMatrix();

		//ENCOSTO
	this.scene.pushMatrix();
	//this.scene.translate(0,3.75,-0.8);
	this.scene.translate(0,3.95,-0.8);
	this.scene.scale(1.5, 2.5,0.2);
	this.cubeQuad.display();
	this.scene.popMatrix();

	
}