/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene, angle, comprimento, largura, cauda) {
	CGFobject.call(this,scene);

	
	this.angle = angle;
	this.comprimento = comprimento;
	this.largura = largura;
	
	this.cauda = typeof cauda !== 'undefined' ? cauda : 0;

	this.quad = new MyQuad(this.scene);

	this.initBuffers();
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.setAngle=function(angle){
	this.angle = angle;
};


MyClockHand.prototype.display = function() {
		var degToRad = Math.PI / 180.0;

		this.scene.rotate(-this.angle*degToRad, 0, 0, 1);
		this.scene.translate(0,(this.comprimento-this.cauda)/2, 0);
		this.scene.scale(this.largura, this.comprimento+this.cauda, this.largura);
		this.quad.display();
	
};



