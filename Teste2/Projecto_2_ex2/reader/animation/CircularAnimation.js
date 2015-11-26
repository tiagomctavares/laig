/**
 * CircularAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function CircularAnimation(id, span, rotation, center, radius, startang, rotang) {
	
	//LAIGPROB2_inicio
	DefaultAnimation.call(this, id, span, rotation);
	//LAIGPROB2_fim
	
	this.center = center;
	this.radius = radius;
	this.startang = startang * Math.PI / 180;
	this.rotang = rotang * Math.PI / 180;
	this.velocidade = this.rotang / this.span;
};

CircularAnimation.prototype = Object.create(DefaultAnimation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.start = function() {
	// regressa aos valores iniciais da animação
	this.atual_angulo = this.startang;
	this.atual_tempo = 0.0;
	//LAIGPROB2_inicio
	this.rot_atual = 0.0;
	//LAIGPROB2_fim
	this.playing = true;
}

CircularAnimation.prototype.step = function(deltaTempo){

	// não fazer nada se a animação tiver terminado
	if (!this.playing) {
		return;
	}
	
	// atualizar tempo decorrido
	this.atual_tempo += deltaTempo;
	 // enquanto tempo decorrido < duração animação, avança animação
	if(this.atual_tempo < this.span)
	{	this.atual_angulo += this.velocidade * deltaTempo;
		this.rot_atual += this.rot_velocidade * deltaTempo;
	}
	// caso contrário, interrompe a animação
	else
		this.stop()
};

CircularAnimation.prototype.update = function(){
    
    //construir a matriz do display
    mat4.identity(this.matrix);
    mat4.translate(this.matrix, this.matrix, this.center);
    mat4.rotateY(this.matrix, this.matrix, this.atual_angulo);
	mat4.translate(this.matrix, this.matrix, [this.radius, 0.0, 0.0]);
	mat4.rotateY(this.matrix, this.matrix, this.rot_atual);
	
};