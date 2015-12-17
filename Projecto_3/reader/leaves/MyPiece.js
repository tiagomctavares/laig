/**
 * MyPiece
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyPiece(scene) {
	CGFobject.call(this,scene);

	this.cubeQuad = new MyUnitCubeQuad(this.scene);
	this.cubeQuad.initBuffers();
	this.objectSelected = false;

};

MyPiece.prototype = Object.create(CGFobject.prototype);
MyPiece.prototype.constructor=MyPiece;

MyPiece.prototype.select = function() {
	this.objectSelected = true;
}

MyPiece.prototype.clear = function() {
	this.objectSelected = false;
}

MyPiece.prototype.isSelected = function() {
	return this.objectSelected;
}
MyPiece.prototype.display = function() {

	//Peça de pontuação
	this.scene.pushMatrix();
		this.scene.translate(0.20, 3.0, 3.7);
		this.scene.scale(0.3, 0.07, 0.3);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
}