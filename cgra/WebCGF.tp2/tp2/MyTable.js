/**
 * myTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.madeira = new CGFappearance(this.scene);
	this.madeira.setAmbient(0.07,0.05,0.03,1);
	this.madeira.setDiffuse(0.07,0.05,0.03,1);
	this.madeira.setSpecular(0.2,0.2,0,1);
	this.madeira.setShininess(120);

	this.metal = new CGFappearance(this.scene);
	this.metal.setAmbient(0.8,0.8,0.8,1);
	this.metal.setDiffuse(0.8,0.8,0.8,1);
	this.metal.setSpecular(0.89,0.89,0.89,1);
	this.metal.setShininess(50);

	this.cubeQuad = new MyUnitCubeQuad(this.scene);
	this.cubeQuad.initBuffers();



};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;


MyTable.prototype.display = function() {

    var deg2rad=Math.PI/180.0;
	var a_rad=90.0*deg2rad;

	
	//4 PERNAS

	this.metal.apply();

	this.scene.pushMatrix();
	this.scene.translate(-2.2,0,1.2);
    this.scene.translate(0,1.75,0);
    this.scene.scale(0.3, 3.5, 0.3);
	this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
	this.scene.translate(2.2,0,1.2);
    this.scene.translate(0,1.75,0);
    this.scene.scale(0.3, 3.5, 0.3);
	this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
	this.scene.translate(2.2,0,-1.2);
    this.scene.translate(0,1.75,0);
    this.scene.scale(0.3, 3.5, 0.3);
	this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
	this.scene.translate(-2.2,0,-1.2);
    this.scene.translate(0,1.75,0);
    this.scene.scale(0.3, 3.5, 0.3);
	this.cubeQuad.display();
    this.scene.popMatrix();

    //TAMPO

	this.madeira.apply();

	this.scene.pushMatrix();
    this.scene.translate(0,3.65,0);
    this.scene.scale(5, 0.3, 3);
	this.cubeQuad.display();
    this.scene.popMatrix();
 
}


