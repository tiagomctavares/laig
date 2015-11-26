function DefaultAnimation(id, span, rotation) {

	this.id = id;
	this.span = span;
	// ângulo de rotação
	
	//LAIGPROB2_inicio
	this.rotation = rotation * Math.PI / 180;
	//LAIGPROB2_fim
	
	// velocidade da rotação
	this.rot_velocidade = this.rotation / this.span;
	// ângulo atual da rotação
	this.rot_atual = 0.0;
	this.playing = false;
	this.matrix = mat4.create();

	mat4.identity(this.matrix);
};

DefaultAnimation.prototype = Object.create(Object.prototype);
DefaultAnimation.prototype.constructor = DefaultAnimation;

DefaultAnimation.prototype.step = function(deltaTempo){
	return null;
};

DefaultAnimation.prototype.update = function() {
	return null;
};

DefaultAnimation.prototype.start = function() {
	this.playing = true;
};

DefaultAnimation.prototype.stop = function() {
	this.playing = false;
	//
	//LAIGPROB2_inicio
	this.rot_atual = 0.0;
	//LAIGPROB2_fim
};