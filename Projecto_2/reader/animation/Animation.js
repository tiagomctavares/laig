function Animation(id, span) {

    this.id = id;
    this.span = span;

};
 
Animation.prototype = Object.create(Object.prototype);
Animation.prototype.constructor = Animation;

Animation.prototype.step = function(delta){

};

Animation.prototype.update = function(){
    
};