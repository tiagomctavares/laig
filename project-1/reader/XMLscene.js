
function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {

    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.enableTextures(true);
    
    this.rotationAxis = [];
    this.rotationAngle = [];

    this.sceneMatrix = mat4.create();
    mat4.identity(this.sceneMatrix);
    
	this.axis=new CGFaxis(this);
};

//////////////////////////////////////////////////

XMLscene.prototype.initLights = function(lights) {
	
	this.shader.bind();

	for (var index = 0; index < lights.length; index++) {
		this.lights[index] = lights[index].bindInit(this.lights[index]);
		this.interface.insertLight(index, lights[index].id, lights[index].enable);
		this.lights[index].setVisible(true);
		this.lights[index].update();
	};

	this.shader.unbind();
}

XMLscene.prototype.applyMaterial = function(material) {
	material.apply();
}

XMLscene.prototype.drawLeaf = function(leaf) {
	leaf.display();
}

XMLscene.prototype.updateLights = function() {
	for (var index = 0; index < this.lights.length; index++) {
		this.lights[index].update();
	};
}

XMLscene.prototype.setLight = function(id, enable) {
	if(enable)
		this.lights[id].enable();
	else
		this.lights[id].disable();
}

XMLscene.prototype.setInterface = function(myInterface){
	this.interface=myInterface;
}
/*
	Esta funcão recebe como parametros o id da rotacao = rotationId
	a letra correspondente ao eixo de rotacao = axis
	e ainda o valor angulo a aplicar ao eixo = angle

*/

XMLscene.prototype.setRotation = function(rotationId, axis, angle){

	if(axis == 'x')
		this.rotationAxis[rotationId] = [1,0,0];
	
	else if(axis == 'y')
		this.rotationAxis[rotationId] = [0,1,0];
	
	else if(axis == 'z')
		this.rotationAxis[rotationId] = [0,0,1];

	this.rotationAngle[rotationId] = angle*Math.PI/180;

}

XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setBackground = function(rgba) {
	this.background = rgba;
};

XMLscene.prototype.setAmbient = function(rgba) {
	this.ambient = rgba;
};

XMLscene.prototype.setFrustum = function(near, far) {
	this.frustumNear = near;
	this.frustumFar = far;
};

XMLscene.prototype.setSceneScale = function(vec) {
	this.sceneScale = vec;
};

XMLscene.prototype.setSceneTranslate = function(vec) {
	this.sceneTranslate = vec;
};

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function () 
{
	this.updateInitials();
	this.updateIllumination();
};

XMLscene.prototype.updateInitials = function() {
	this.camera.far = this.frustumFar;
	this.camera.near = this.frustumNear;

	mat4.scale(this.sceneMatrix, this.sceneMatrix, this.sceneScale);	
	mat4.rotate(this.sceneMatrix, this.sceneMatrix, this.rotationAngle[0], this.rotationAxis[0]);
	mat4.rotate(this.sceneMatrix, this.sceneMatrix, this.rotationAngle[1], this.rotationAxis[1]);
	mat4.rotate(this.sceneMatrix, this.sceneMatrix, this.rotationAngle[2], this.rotationAxis[2]);
	mat4.translate(this.sceneMatrix, this.sceneMatrix, this.sceneTranslate);
}

XMLscene.prototype.updateIllumination = function() {
	// SET BACKGROUND
	this.gl.clearColor(this.background[0], this.background[1], this.background[2], this.background[3]);
	
	// SET GLOBAL ILLUMINATION
	this.setGlobalAmbientLight(this.ambient[0], this.ambient[1], this.ambient[2], this.ambient[3]);
}

XMLscene.prototype.display = function () {
	// ---- BEGIN Background, camera and axis setup
    this.shader.bind();
	
	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();
	this.multMatrix(this.sceneMatrix);
		
	// Draw axis
	this.axis.display();
	
	// ---- END Background, camera and axis setup

	if (this.graph.loadedOk)
	{
		this.updateLights();

		this.graph.display();
	};

    this.shader.unbind();
};
