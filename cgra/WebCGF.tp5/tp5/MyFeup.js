/**
 * MyFeup
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyFeup(scene) {
	CGFobject.call(this,scene);

	this.engenharia = new CGFappearance(this.scene);
	this.engenharia.setAmbient(0.55,0.18,0.01,1);
	this.engenharia.setDiffuse(0.55,0.18,0.01,1);
	this.engenharia.setSpecular(0.2,0.2,0,1);
	this.engenharia.setShininess(120);

	this.cubeQuad = new MyUnitCubeQuad(this.scene);
	this.cubeQuad.initBuffers();



};

MyFeup.prototype = Object.create(CGFobject.prototype);
MyFeup.prototype.constructor=MyFeup;


MyFeup.prototype.display = function() {

	//F

	this.engenharia.apply();

	this.scene.pushMatrix();
    this.scene.translate(0.1, 5, 11.2);
    this.scene.scale(0.2, 1.5, 0.2);
	this.cubeQuad.display();
    this.scene.popMatrix();

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


    
}