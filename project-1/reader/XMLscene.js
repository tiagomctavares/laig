
function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.axis=new CGFaxis(this);

	//this.quad = new MyQuad(this);
	
	//this.semiEsfera = new mySemiSphere(this, 2, 100, 100);
	//this.cylinder = new MyCylinder(this, 100, 100);

	this.numeroLuzes = 1;
};

XMLscene.prototype.initLights = function () {

    this.shader.bind();

	this.lights[0].setPosition(2, 3, 3, 1);
    this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
    this.lights[0].update();
 
    this.shader.unbind();
};

//////////////////////////////////////////////////

XMLscene.prototype.arrayLights = function (enabled, position, ambient, diffuse, specular) {

	this.shader.bind();

	var luz = this.lights[this.numeroLuzes];

	luz.setPosition(position[0],position[1], position[2], position[3]);
	luz.setAmbient(ambient[0],ambient[1], ambient[2], ambient[3]);
	luz.setDiffuse(diffuse[0],diffuse[1], diffuse[2], diffuse[3]);
	luz.setSpecular(specular[0],specular[1], specular[2], specular[3]);


	if(enabled == true)
		luz.enable();
	else 
		luz.disable();

	luz.setVisible(true);
	luz.update();
	this.shader.unbind();

	return this.lights[this.numeroLuzes++];
 
};



//////////////////////////////////////////////////

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

XMLscene.prototype.setEmission = function(rgba) {
	this.emission = rgba;
};

XMLscene.prototype.setShininess = function(s) {
	this.ambient = s;
};

XMLscene.prototype.setSpecular = function(rgba) {
	this.specular = rgba;
};

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function () 
{
	//this.gl.clearColor(this.graph.background[0],this.graph.background[1],this.graph.background[2],this.graph.background[3]);

	//this.camera.near = this.frustumNear;
	//this.camera.far = this.frustumFar;

	// SET BACKGROUND
	this.gl.clearColor(this.background[0], this.background[1], this.background[2], this.background[3]);
	
	// SET GLOBAL ILLUMINATION
	this.setGlobalAmbientLight.apply(this, this.ambient);

	this.lights[0].setVisible(true);
    this.lights[0].enable();
};

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

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
	if (this.graph.loadedOk)
	{
		//this.lights[0].update();

		for(var i = 0; i < this.numeroLuzes; i++){
			this.lights[i].update();
		}

		this.graph.display();
	};

	//chamar funçao do graph que faz o display

    this.shader.unbind();
};

