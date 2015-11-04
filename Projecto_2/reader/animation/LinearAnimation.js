/**
 * LinearAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function LinearAnimation(scene, id, span, controlpoints) {
	Animation.call(this, id, span);

	this.controlpoints = controlpoints;

	//calcular distancia entre dois pontos
	this.distance = [];
	
	//calcular distancia total do percurso
	this.totalDistance = 0.0;

	this.distance[0] = 0;

	for(var i = 1; i < this.controlpoints.length; i++)
	{
		var dist = vec3.dist(this.controlpoints[i-1], this.controlpoints[i]);

		this.distance[i] = dist;

		totalDistance += dist;
	}

	//calcular vetor de deslocamento
	this.velocidade = [];
	this.orientacao = [];
	this.duracoes = [];
	//calcular velocidade

	this.velocidade[0] = vec3.create();
	this.duracao[0] = 0.0;
	this.orientacao[0] = 0.0;

	for(var i = 1; i < this.controlpoints.length; i++)
	{
		var orientacao = 0.0;
		var deslocamento = vec3.create();
		var duracao = (this.distance[i] * this.span) / this.totalDistance;

		this.duracoes[i] = this.duracoes[i - 1] + duracao;

		this.velocidade[i] = vec3.create();

		if(duracao > 0)
		{
			vec3.subtract(deslocamento, this.controlpoints[i], this.controlpoints[i-1]);
			vec3.scale(this.velocidade[i], deslocamento, 1.0 / duracao);

		}
	}

};

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor=LinearAnimation;

LinearAnimation.prototype.step = function(deltaTempo){

	vec3.scale(this.delta, this.velocidade[this.seccao], deltaTempo);
	vec3.add(this.deltaPosicao, this.deltaPosicao, this.delta);

	this.tempoDecorrido += deltaTempo;

	if (this.tempoDecorrido > this.duracao[this.seccao]){
		if (++seccao == this.controlpoints.length) {
			this.seccao = 0;
		}
	}
};

LinearAnimation.prototype.update = function(){

    //construir a matriz do display
    mat4.identity(this.matrix);
    mat4.translate(this.matrix, this.matrix, this.deltaPosicao);
    mat4.rotateY(this.matrix, this.matrix, this.orientacao[this.seccao]);
};