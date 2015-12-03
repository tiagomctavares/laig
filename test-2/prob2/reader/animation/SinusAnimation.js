//LAIGPROB2_inicio
function SinusAnimation(id, span, amplitude, cycles, zFinal) {

    DefaultAnimation.call(this, id, span);

    this.amplitude = amplitude;
    this.cycles = cycles;
    this.zFinal = zFinal;

    this.velocidade = this.zFinal / this.span;

    this.sinus = [0, 1, 0, -1];
    this.sinusIncrement = [true, false, false, true];
    this.sinusTime = (this.span / this.cycles) * 0.25;
};

SinusAnimation.prototype = Object.create(DefaultAnimation.prototype);
SinusAnimation.prototype.constructor = CircularAnimation;

SinusAnimation.prototype.start = function () {
    // regressa aos valores iniciais da animação
    this.z = 0;
    this.y = 0;
    this.sinusCounter = 0;
    this.atual_tempo = 0.0;
    this.playing = true;
};

SinusAnimation.prototype.sinusStep = function () {

    // Sets the proper index to access array
    var counter = parseInt(this.atual_tempo / this.sinusTime);
    if (counter >= this.sinus.length) {
        this.sinusCounter = (counter % this.sinus.length);
    } else {
        this.sinusCounter = counter;
    }

    // Increments the angle
    var increment = (this.atual_tempo - (counter * this.sinusTime))/this.sinusTime;
    if (this.sinusIncrement[this.sinusCounter]) {
        return this.sinus[this.sinusCounter] + increment;
    } else {
        return this.sinus[this.sinusCounter] - increment;
    }

};

SinusAnimation.prototype.step = function (deltaTempo) {

    // não fazer nada se a animação tiver terminado
    if (!this.playing) {
        return;
    }

    // atualizar tempo decorrido
    this.atual_tempo += deltaTempo;

    // enquanto tempo decorrido < duração animação, avança animação
    if (this.atual_tempo < this.span) {
        this.z += this.velocidade * deltaTempo;
        this.y = this.amplitude * Math.sin(this.sinusStep());
    } else
        this.stop()
};

SinusAnimation.prototype.update = function () {

    //construir a matriz do display
    mat4.identity(this.matrix);
    mat4.translate(this.matrix, this.matrix, [0, this.y, this.z]);

};
//LAIGPROB2_fim