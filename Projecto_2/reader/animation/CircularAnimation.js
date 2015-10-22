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
};

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor=CircularAnimation;

CircularAnimation.prototype.step = function(delta){

    //calculos

};

CircularAnimation.prototype.update = function(){
    
    //construir a matriz do display
};