/**
 * MyBoard
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyBoard(scene) {
	CGFobject.call(this,scene);

	this.cubeQuad = new MyUnitCubeQuad(this.scene);
	this.cubeQuad.initBuffers();

};

MyBoard.prototype = Object.create(CGFobject.prototype);
MyBoard.prototype.constructor=MyBoard;



MyBoard.prototype.display = function() {

	//TABULEIRO LINHA
	
	this.scene.pushMatrix();
		this.scene.translate(0.0, 0.0, 0.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0.6, 0.0, 0.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.2, 0.0, 0.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.8, 0.0, 0.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(2.4, 0.0, 0.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.0, 0.0, 0.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.6, 0.0, 0.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(4.2, 0.0, 0.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	
	//TABULEIRO COLUNA
	
	this.scene.pushMatrix();
		this.scene.translate(0.0, 0.0, 0.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0.0, 0.0, 1.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0.0, 0.0, 1.8);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0.0, 0.0, 2.4);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0.0, 0.0, 3.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0.0, 0.0, 3.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0.0, 0.0, 4.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	//TABULEIRO DIAGONAL
	
	this.scene.pushMatrix();
		this.scene.translate(0.6, 0.0, 4.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.2, 0.0, 4.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.8, 0.0, 4.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(2.4, 0.0, 4.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.0, 0.0, 4.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.6, 0.0, 4.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(4.2, 0.0, 4.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	//TABULEIRO ULTIMA LINHA
	
	this.scene.pushMatrix();
		this.scene.translate(0.6, 0.0, 0.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.2, 0.0, 1.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.8, 0.0, 1.8);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(2.4, 0.0, 2.4);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.0, 0.0, 3.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.6, 0.0, 3.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	//TABULEIRO ULTIMA COLUNA
	
	this.scene.pushMatrix();
		this.scene.translate(4.2, 0.0, 0.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(4.2, 0.0, 1.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(4.2, 0.0, 1.8);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(4.2, 0.0, 2.4);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(4.2, 0.0, 3.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(4.2, 0.0, 3.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	
	///////////////////////
	
	
	this.scene.pushMatrix();
		this.scene.translate(0.6, 0.0, 3.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.2, 0.0, 3.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.8, 0.0, 3.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(2.4, 0.0, 3.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.0, 0.0, 3.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	
	///////////////////////
	
	
	this.scene.pushMatrix();
		this.scene.translate(1.2, 0.0, 0.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.8, 0.0, 0.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(2.4, 0.0, 0.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.0, 0.0, 0.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.6, 0.0, 0.6);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();


	///////////////////////
	
	
	this.scene.pushMatrix();
		this.scene.translate(0.6, 0.0, 1.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.8, 0.0, 1.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(2.4, 0.0, 1.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.0, 0.0, 1.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.6, 0.0, 1.2);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	
	///////////////////////
	
	
	this.scene.pushMatrix();
		this.scene.translate(0.6, 0.0, 1.8);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.2, 0.0, 1.8);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(2.4, 0.0, 1.8);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.0, 0.0, 1.8);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.6, 0.0, 1.8);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	
	///////////////////////
	
	
	this.scene.pushMatrix();
		this.scene.translate(0.6, 0.0, 2.4);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.2, 0.0, 2.4);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.8, 0.0, 2.4);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.0, 0.0, 2.4);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.6, 0.0, 2.4);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	

	///////////////////////
	
	
	this.scene.pushMatrix();
		this.scene.translate(0.6, 0.0, 3.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.2, 0.0, 3.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(1.8, 0.0, 3.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(2.4, 0.0, 3.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(3.6, 0.0, 3.0);
		this.scene.scale(0.5, 0.07, 0.5);
		this.cubeQuad.display();
    this.scene.popMatrix();
}