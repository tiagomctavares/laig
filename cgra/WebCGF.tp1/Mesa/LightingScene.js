var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

//var BOARD_A_DIVISIONS = 1;
var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.shelf = new MyShelf(this);
	this.chair = new MyChair(this);
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.madeiraEscura = new CGFappearance(this);
	this.madeiraEscura.setAmbient(0.07,0.05,0.03,1);
	this.madeiraEscura.setDiffuse(0.07,0.05,0.03,1);
	this.madeiraEscura.setSpecular(0.2,0.12,0,1);
	this.madeiraEscura.setShininess(120);

	/*this.madeira = new CGFappearance(this.scene);
	//this.madeira.setAmbient(0.67,0.45,0.03,1);
	//this.madeira.setDiffuse(0.67,0.45,0.03,1);
	this.madeira.setAmbient(0.29,0.16,0,1);
	this.madeira.setDiffuse(0.29,0.16,0,1);
	//this.madeira.setSpecular(0.2,0.2,0,1);
	this.madeira.setSpecular(0.2,0.12,0,1);
	this.madeira.setShininess(120);*/

	this.perola = new CGFappearance(this);
	this.perola.setAmbient(1,1,0.64,1);
	this.perola.setDiffuse(1,1,0.64,1);
	this.perola.setSpecular(0.2,0.2,0,1);
	this.perola.setShininess(120);

	
	
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0, 0, 0, 1.0);

	this.shader.bind();
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1, 1, 0, 1);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1.0);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1);
	this.lights[3].enable();

	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.madeiraEscura.apply();
		this.wall.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.perola.apply();
		this.wall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.perola.apply();
		this.wall.display();
	this.popMatrix();

	//Shelf1
	this.pushMatrix();
	this.shelf.display();
	this.popMatrix();

	//Shelf2
	this.pushMatrix();
	this.translate(0, 1, 0);
	this.shelf.display();
	this.popMatrix();

	//Shelf3
	this.pushMatrix();
	this.translate(0, 2, 0);
	this.shelf.display();
	this.popMatrix();
;

	//First Chair
	this.pushMatrix();
	this.translate(4, 0, 6.5);
	this.chair.display();
	this.popMatrix();

	//Second Chair
	this.pushMatrix();
	this.translate(6, 0, 6.5);
	this.chair.display();
	this.popMatrix();

	//Third Chair
	this.pushMatrix();
	this.translate(11, 0, 6.5);
	this.chair.display();
	this.popMatrix();

	//Fourth Chair
	this.pushMatrix();
	this.translate(13, 0, 6.5);
	this.chair.display();
	this.popMatrix();

	//Fifty Chair
	this.pushMatrix();
	this.translate(4, 0, 9.5);
	this.rotate(180 * degToRad, 0, 1, 0);
	this.chair.display();
	this.popMatrix();

	//Sixty Chair
	this.pushMatrix();
	this.translate(6, 0, 9.5);
	this.rotate(180 * degToRad, 0, 1, 0);
	this.chair.display();
	this.popMatrix();

	//Seventy Chair
	this.pushMatrix();
	this.translate(11, 0, 9.5);
	this.rotate(180 * degToRad, 0, 1, 0);
	this.chair.display();
	this.popMatrix();

	//Eigthy Chair
	this.pushMatrix();
	this.translate(13, 0, 9.5);
	this.rotate(180 * degToRad, 0, 1, 0);
	this.chair.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
	this.translate(5, 0, 8);
	this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.materialA.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.materialB.apply();
		this.boardB.display();
	this.popMatrix();

	// ---- END Primitive drawing section

	this.shader.unbind();
};