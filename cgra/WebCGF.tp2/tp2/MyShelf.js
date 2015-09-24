/**
 * MyShelf
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyShelf(scene) {
	CGFobject.call(this,scene);

	this.madeiraEscura = new CGFappearance(this.scene);
	this.madeiraEscura.setAmbient(0.07,0.05,0.03,1);
	this.madeiraEscura.setDiffuse(0.07,0.05,0.03,1);
	this.madeiraEscura.setSpecular(0.2,0.12,0,1);
	this.madeiraEscura.setShininess(120);

	this.cubeQuad = new MyUnitCubeQuad(this.scene);
	this.cubeQuad.initBuffers();



};

MyShelf.prototype = Object.create(CGFobject.prototype);
MyShelf.prototype.constructor=MyShelf;


MyShelf.prototype.display = function() {

	
	//SHELF

	this.madeiraEscura.apply();
	
	this.scene.pushMatrix();
    this.scene.translate(0.3, 4, 3);
    this.scene.scale(0.6, 0.1, 3);
	this.cubeQuad.display();
    this.scene.popMatrix();
    
}