/**
 * LinearAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function LinearAnimation(id, span, rotation, controlpoints) {
	
	//LAIGPROB2_inicio
	DefaultAnimation.call(this, id, span, rotation);
	//LAIGPROB2_fim
	
	this.controlpoints = controlpoints;
	this.distance = [];
	this.totalDistance = 0.0;
	this.distance[0] = 0;
	
	//calcular distancia total do percurso
	for (var i = 1; i < this.controlpoints.length; i++) {
		var dist = vec3.dist(this.controlpoints[i-1], this.controlpoints[i]);
		this.distance[i] = dist;
		this.totalDistance += dist;
	}

	//calcular vetor de deslocamento
	this.velocidade = [];
	this.duracoes = [];
	
	//calcular velocidade
	this.velocidade[0] = vec3.create();
	this.duracoes[0] = 0.0;

	for (var i = 1; i < this.controlpoints.length; i++) {
		var deslocamento = vec3.create();
		var duracao = (this.distance[i] * this.span) / this.totalDistance;
		this.duracoes[i] = this.duracoes[i - 1] + duracao;
		this.velocidade[i] = vec3.create();

		if (duracao > 0) {
			vec3.subtract(deslocamento, this.controlpoints[i], this.controlpoints[i-1]);
			vec3.scale(this.velocidade[i], deslocamento, 1.0 / duracao);
		}
	}
};

LinearAnimation.prototype = Object.create(DefaultAnimation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.start = function() {
	// regressa aos valores iniciais da animação
	this.tempoDecorrido = 0.0;
	this.deltaVelocidade = vec3.create();
	this.posicaoAtual = this.controlpoints[0];
	this.seccaoAtual = 1;
	//LAIGPROB2_inicio
	this.rot_atual = 0.0;
	//LAIGPROB2_fim
	this.playing = true;
}

LinearAnimation.prototype.step = function(deltaTempo){

	if (!this.playing) {
		return;
	}	
	// atualiza posição e orientação do objeto
	vec3.scale(this.deltaVelocidade, this.velocidade[this.seccaoAtual], deltaTempo);
	vec3.add(this.posicaoAtual, this.posicaoAtual, this.deltaVelocidade);

	// atualiza ângulo de rotação sobre o próprio
	
	//LAIGPROB2_inicio
	this.rot_atual += this.rot_velocidade * deltaTempo;
	//LAIGPROB2_fim
	
	// atualiza tempo decorrido
	this.tempoDecorrido += deltaTempo;

	// se tempo decorrido > duração até secção atual, avançar para secção seguinte
	// quando chega ao fim, interrompe a animação na última posição válida
	if (this.tempoDecorrido > this.duracoes[this.seccaoAtual]){
		if (++this.seccaoAtual == this.controlpoints.length) {
			this.seccaoAtual--;
			this.stop();
		}
	}
};

LinearAnimation.prototype.update = function(){

    //construir a matriz do display
    mat4.identity(this.matrix);
    mat4.translate(this.matrix, this.matrix, this.posicaoAtual);
   // substituir o ângulo de orientação pelo ângulo de rotação
   mat4.rotateY(this.matrix, this.matrix, this.rot_atual);
};