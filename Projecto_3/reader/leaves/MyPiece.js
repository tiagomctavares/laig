/**
 * MyPiece
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
 
 var degToRad = Math.PI / 180.0;
 
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

	//Peça de jogo X
	this.scene.pushMatrix();
		this.scene.translate(0.20, 3.0, 3.7);
		this.scene.rotate(45 * degToRad, 0, 1, 0);
		this.scene.scale(0.05, 0.07, 0.35);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0.20, 3.0, 3.7);
		this.scene.rotate(-45 * degToRad, 0, 1, 0);
		this.scene.scale(0.05, 0.07, 0.35);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
}