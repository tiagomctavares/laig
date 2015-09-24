/**
 * myTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function myTable(scene) {
	CGFobject.call(this,scene);

	this.cubeQuad = new MyUnitCubeQuad(this.scene);
	this.cubeQuad.initBuffers();



};

myTable.prototype = Object.create(CGFobject.prototype);
myTable.prototype.constructor=myTable;


myTable.prototype.display = function() {

    var deg2rad=Math.PI/180.0;
	var a_rad=90.0*deg2rad;

	
	//4 PERNAS

	this.scene.pushMatrix();
	this.scene.translate(-2.2,0,1.2);
    this.scene.translate(0,1.75,0);
    this.scene.scale(0.3, 3.5, 0.3);
	this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
	this.scene.translate(2.2,0,1.2);
    this.scene.translate(0,1.75,0);
    this.scene.scale(0.3, 3.5, 0.3);
	this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
	this.scene.translate(2.2,0,-1.2);
    this.scene.translate(0,1.75,0);
    this.scene.scale(0.3, 3.5, 0.3);
	this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
	this.scene.translate(-2.2,0,-1.2);
    this.scene.translate(0,1.75,0);
    this.scene.scale(0.3, 3.5, 0.3);
	this.cubeQuad.display();
    this.scene.popMatrix();

    //TAMPO

	this.scene.pushMatrix();
    this.scene.translate(0,3.65,0);
    this.scene.scale(5, 0.3, 3);
	this.cubeQuad.display();
    this.scene.popMatrix();
 
}