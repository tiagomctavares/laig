/**
 * MyScorePiece
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyScorePiece(scene) {
	CGFobject.call(this,scene);

	this.cubeQuad = new MyUnitCubeQuad(this.scene);
	this.cubeQuad.initBuffers();
	this.objectSelected = false;

};

MyScorePiece.prototype = Object.create(CGFobject.prototype);
MyScorePiece.prototype.constructor = MyScorePiece;

MyScorePiece.prototype.select = function() {
	this.objectSelected = true;
}

MyScorePiece.prototype.clear = function() {
	this.objectSelected = false;
}

MyScorePiece.prototype.isSelected = function() {
	return this.objectSelected;
}
MyScorePiece.prototype.display = function() {

	//Peça de pontuação
	this.scene.pushMatrix();
		this.scene.translate(0.20, 3.0, 3.7);
		this.scene.scale(0.3, 0.07, 0.3);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
}