function Animation(id, span) {

    this.id = id;
    this.span = span;

    this.matrix = mat4.create();
	mat4.identify(this.matrix);

};
 
Animation.prototype = Object.create(Object.prototype);
Animation.prototype.constructor = Animation;

Animation.prototype.step = function(delta){

}

Animation.prototype.update = function(){
    
}