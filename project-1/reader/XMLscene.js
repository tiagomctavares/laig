
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
    
	this.axis=new CGFaxis(this);
};

//////////////////////////////////////////////////

XMLscene.prototype.initLights = function(lights) {
	this.shader.bind();

	for (var index = 0; index < lights.length; index++) {
		this.lights[index] = lights[index].bindInit(this.lights[index]);

		this.lights[index].setVisible(true);
		this.lights[index].update();
	};

	this.shader.unbind();
}


XMLscene.prototype.updateLights = function() {
	for (var index = 0; index < this.lights.length; index++) {
		this.lights[index].update();
	};
}

XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setBackground = function(rgba) {
	this.background = rgba;
};

XMLscene.prototype.setDoubleside = function(doubleside) {
	this.doubleside = doubleside;
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

XMLscene.prototype.setSceneRotation = function(vec) {
	this.sceneRotateX = vec[0];
	this.sceneRotateY = vec[1];
	this.sceneRotateZ = vec[2];
};

XMLscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	
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
}

XMLscene.prototype.updateIllumination = function() {
	// SET BACKGROUND
	this.gl.clearColor(this.background[0], this.background[1], this.background[2], this.background[3]);
	
	// SET GLOBAL ILLUMINATION
	// this.setGlobalAmbientLight(this.ambient[0], this.ambient[1], this.ambient[2], this.ambient[3]);
	this.setGlobalAmbientLight.apply(this, this.ambient);
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
	this.scale.apply(this, this.sceneScale);
	this.rotate(this.sceneRotateX, 1.0, 0.0, 0.0);
	this.rotate(this.sceneRotateY, 0.0, 1.0, 0.0);
	this.rotate(this.sceneRotateZ, 0.0, 0.0, 1.0);
	this.translate.apply(this, this.sceneTranslate);

	// Draw axis
	this.axis.display();

	this.setDefaultAppearance();

	//this.quad.display();
	//this.semiEsfera.display();
	
	// ---- END Background, camera and axis setup

	if (this.graph.loadedOk)
	{
		this.updateLights();

		this.graph.display();
	};

    this.shader.unbind();
};

XMLscene.prototype.applyAppearance = function(material) {
	this.actualMaterial = material;
	this.actualMaterial.apply();
};

XMLscene.prototype.applyTexture = function(texture) {
	this.actualMaterial.setTexture(texture);
	this.actualMaterial.apply();
};
