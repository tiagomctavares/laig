/**
 * MyShelf
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyShelf(scene) {
	CGFobject.call(this,scene);

	this.cubeQuad = new MyUnitCubeQuad(this.scene);
	this.cubeQuad.initBuffers();



};

MyShelf.prototype = Object.create(CGFobject.prototype);
MyShelf.prototype.constructor=MyShelf;


MyShelf.prototype.display = function() {

    var deg2rad=Math.PI/180.0;
	var a_rad=90.0*deg2rad;

	
	//PRATELEIRA

	this.scene.pushMatrix();
    this.scene.translate(0, 4, 2.5);
    this.scene.scale(1, 0.2, 4);
	this.cubeQuad.display();
    this.scene.popMatrix();
    
}