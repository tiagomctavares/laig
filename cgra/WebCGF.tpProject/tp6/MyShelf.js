/**
 * MyShelf
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyShelf(scene) {
	CGFobject.call(this,scene);

	this.tableAppearance = new CGFappearance(this.scene);
	this.tableAppearance.setAmbient(0.07,0.05,0.03,1);
	this.tableAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.tableAppearance.setSpecular(0.2,0.12,0,1);
	this.tableAppearance.setShininess(100);
	//this.tableAppearance.loadTexture('http://localhost:8080/Pratica4/resources/images/table.png');
	this.tableAppearance.loadTexture('../resources/images/table.png');


	this.cubeQuad = new MyUnitCubeQuad(this.scene);
	this.cubeQuad.initBuffers();



};

MyShelf.prototype = Object.create(CGFobject.prototype);
MyShelf.prototype.constructor=MyShelf;


MyShelf.prototype.display = function() {

	
	//PRATELEIRAS
	
	this.scene.pushMatrix();
    this.scene.translate(0.3, 4, 3);
    this.scene.scale(0.6, 0.1, 3);
    this.tableAppearance.apply();
	this.cubeQuad.display();
    this.scene.popMatrix();
    
}