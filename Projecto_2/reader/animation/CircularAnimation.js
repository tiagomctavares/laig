/**
 * CircularAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function CircularAnimation(id, span, center, radius, startang, rotang) {
	Animation.call(this, id, span);

	this.center = center;
	this.radius = radius;
	this.startang = startang;
	this.rotang = rotang;

	this.vel_angular = this.rotang / this.span;
    var atual_ang = this.startang;
};

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor=CircularAnimation;

CircularAnimation.prototype.step = function(delta){
	//calculos
	
	if(atual_ang >= (this.startang + this.rotang))
		console.log("animacao pára");

	else
		this.atual_ang += this.vel_angular * delta;

};

CircularAnimation.prototype.update = function(){
    
    //construir a matriz do display
    mat4.identity(this.matrix);
    mat4.translate(this.matrix, this.matrix, this.center);
    mat4.rotateY(this.matrix, this.matrix, this.atual_ang);
	mat4.translate(this.matrix, this.matrix, [this.radius, 0, 0]);
	
};