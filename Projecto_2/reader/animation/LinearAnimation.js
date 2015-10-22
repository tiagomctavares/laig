/**
 * LinearAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function LinearAnimation(scene, id, span, controlpoints) {
	Animation.call(this, id, span);

	this.controlpoints = controlpoints;

};

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor=LinearAnimation;

LinearAnimation.prototype.step = function(delta){

    //calculos

};

LinearAnimation.prototype.update = function(){

    //construir a matriz do display

};