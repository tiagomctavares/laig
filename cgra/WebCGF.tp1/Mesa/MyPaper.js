/**
 * MyPaper
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyPaper(scene) {
	CGFobject.call(this,scene);

	this.cubeQuad = new MyUnitCubeQuad(this.scene);
	this.cubeQuad.initBuffers();



};

MyPaper.prototype = Object.create(CGFobject.prototype);
MyPaper.prototype.constructor=MyPaper;


MyPaper.prototype.display = function() {

    var deg2rad=Math.PI/180.0;
	var a_rad=90.0*deg2rad;

	
	//FOLHA DE PAPEL

	this.scene.pushMatrix();
    this.scene.translate(3, 4, 3);
    this.scene.scale(0.6, 0.09, 1);
	this.cubeQuad.display();
    this.scene.popMatrix();
    
}