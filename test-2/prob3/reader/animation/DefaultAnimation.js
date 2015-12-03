function DefaultAnimation(id, span) {

	this.id = id;
	this.span = span;
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
};