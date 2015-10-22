 /**
 * MyPaper
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyPaper(scene) {
	CGFobject.call(this,scene);

	this.branco = new CGFappearance(this.scene);
	this.branco.setAmbient(1,1,1,1);
	this.branco.setDiffuse(1,1,1,1);
	this.branco.setSpecular(0.89,0.89,0.89,1);
	this.branco.setShininess(50);

	this.letrasAppearance = new CGFappearance(this.scene);
	this.letrasAppearance.setAmbient(0.07,0.05,0.03,1);
	this.letrasAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.letrasAppearance.setSpecular(0.3,0.3,0.3,1);
	this.letrasAppearance.setShininess(200);
	this.letrasAppearance.loadTexture('../resources/images/letra.png');

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
    this.scene.scale(0.8, 0.05, 1.2);
    this.letrasAppearance.apply();
	this.cubeQuad.display();
    this.scene.popMatrix();
    
}