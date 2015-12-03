/**
 * MyPiece
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyPiece(scene) {
	CGFobject.call(this,scene);
	
	// Materials	
	this.red = new CGFappearance(this.scene);
	this.red.setAmbient(0.66, 0.0, 0.02, 0.2);
	this.red.setDiffuse(0.66, 0.0, 0.05, 0.6);
	this.red.setSpecular(1.0, 1.0, 1.0, 1);
	this.red.setShininess(30);

	this.cubeQuad = new MyUnitCubeQuad(this.scene);
	this.cubeQuad.initBuffers();

};

MyPiece.prototype = Object.create(CGFobject.prototype);
MyPiece.prototype.constructor=MyPiece;


MyPiece.prototype.display = function() {

	//F
	
	this.red.apply();
	
	this.scene.pushMatrix();
		this.scene.translate(8.10, 3.0, 3.6);
		this.scene.scale(10.0, 10.0, 10.0);
		this.cubeQuad.display();
    this.scene.popMatrix();

	/*
   	this.scene.pushMatrix();
    this.scene.translate(0.1, 5.65, 10.75);
    this.scene.scale(0.2, 0.2, 0.7);
	this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.1, 5, 10.825);
    this.scene.scale(0.2, 0.2, 0.55);
	this.cubeQuad.display();
    this.scene.popMatrix();

	//E

    this.scene.pushMatrix();
    this.scene.translate(0.1, 5, 10);
    this.scene.scale(0.2, 1.5, 0.2);
	this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.1, 5.65, 9.55);
    this.scene.scale(0.2, 0.2, 0.7);
	this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.1, 5, 9.625);
    this.scene.scale(0.2, 0.2, 0.55);
	this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.1, 4.35, 9.55);
    this.scene.scale(0.2, 0.2, 0.7);
	this.cubeQuad.display();
    this.scene.popMatrix();

    //U

    this.scene.pushMatrix();
    this.scene.translate(0.1, 5, 8.8);
    this.scene.scale(0.2, 1.5, 0.2);
	this.cubeQuad.display();
    this.scene.popMatrix();

	this.scene.pushMatrix();
    this.scene.translate(0.1, 4.35, 8.4);
    this.scene.scale(0.2, 0.2, 0.6);
	this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.1, 5, 8);
    this.scene.scale(0.2, 1.5, 0.2);
	this.cubeQuad.display();
    this.scene.popMatrix();

    //P

    this.scene.pushMatrix();
    this.scene.translate(0.1, 5, 7.5);
    this.scene.scale(0.2, 1.5, 0.2);
	this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.1, 5.65, 7.05);
    this.scene.scale(0.2, 0.2, 0.7);
	this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.1, 5, 7.05);
    this.scene.scale(0.2, 0.2, 0.7);
	this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.1, 5.325, 6.8);
    this.scene.scale(0.2, 0.45, 0.2);
	this.cubeQuad.display();
    this.scene.popMatrix();
	*/
	
}