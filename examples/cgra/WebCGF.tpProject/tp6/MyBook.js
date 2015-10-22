 /**
 * MyBook
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyBook(scene) {
	CGFobject.call(this,scene);

	this.azul = new CGFappearance(this.scene);
	this.azul.setAmbient(0,0,1,1);
	this.azul.setDiffuse(0,0,1,1);
	this.azul.setSpecular(0.89,0.89,0.89,1);
	this.azul.setShininess(50);

	this.verde = new CGFappearance(this.scene);
	this.verde.setAmbient(0,1,0,1);
	this.verde.setDiffuse(0,1,0,1);
	this.verde.setSpecular(0.89,0.89,0.89,1);
	this.verde.setShininess(50);

	this.vermelho = new CGFappearance(this.scene);
	this.vermelho.setAmbient(1,0,0,1);
	this.vermelho.setDiffuse(1,0,0,1);
	this.vermelho.setSpecular(0.89,0.89,0.89,1);
	this.vermelho.setShininess(50);

	this.cubeQuad = new MyUnitCubeQuad(this.scene);
	this.cubeQuad.initBuffers();



};

MyBook.prototype = Object.create(CGFobject.prototype);
MyBook.prototype.constructor=MyBook;


MyBook.prototype.display = function() {

    var deg2rad=Math.PI/180.0;
	var a_rad=90.0*deg2rad;

	
	//BOOK

	this.scene.pushMatrix();
	this.scene.translate(0.25, 4.4, 2);
    this.scene.scale(0.5, 0.7, 0.2);
    this.azul.apply();
	this.cubeQuad.display();
    this.scene.popMatrix();

    //BOOK2

    this.scene.pushMatrix();
	this.scene.translate(0.25, 4.35, 2.2);
    this.scene.scale(0.5, 0.6, 0.2);
    this.verde.apply();
	this.cubeQuad.display();
    this.scene.popMatrix();

     //BOOK3

    this.scene.pushMatrix();
	this.scene.translate(0.25, 4.3, 2.4);
    this.scene.scale(0.5, 0.5, 0.2);
    this.vermelho.apply();
	this.cubeQuad.display();
    this.scene.popMatrix();
}
