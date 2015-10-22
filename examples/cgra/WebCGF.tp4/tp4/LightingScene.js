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
	this.enableTextures(true);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.feup = new MyFeup(this);
	this.book = new MyBook(this);
	this.paper = new MyPaper(this);
	this.shelf = new MyShelf(this);
	this.chair = new MyChair(this);
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.floor = new MyQuad(this,0,10,0,12);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, BOARD_WIDTH, BOARD_HEIGHT);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, BOARD_WIDTH, BOARD_HEIGHT);
	this.cylinder = new MyCylinder(this, 20, 20);
	this.lamp = new myLamp(this, 100, 100);
	this.leftWall = new MyQuad(this, -1, 2, -0.5, 1.5);

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

	this.perola = new CGFappearance(this);
	this.perola.setAmbient(1,1,0.64,1);
	this.perola.setDiffuse(1,1,0.64,1);
	this.perola.setSpecular(0.2,0.2,0,1);
	this.perola.setShininess(120);

	this.cinza = new CGFappearance(this);
	this.cinza.setAmbient(0.66,0.66,0.66,1);
	this.cinza.setDiffuse(0.66,0.66,0.66,1);
	this.cinza.setSpecular(0.8,0.8,0.8,1);
	this.cinza.setShininess(120);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.loadTexture('../resources/images/floor.png');
	this.floorAppearance.setAmbient(0.07,0.05,0.03,1);
	this.floorAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.floorAppearance.setSpecular(0.2,0.12,0,1);
	this.floorAppearance.setShininess(30);
	

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.loadTexture('../resources/images/window.png');
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.windowAppearance.setAmbient(0.07,0.05,0.03,1);
	this.windowAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.windowAppearance.setSpecular(0.2,0.12,0,1);
	this.windowAppearance.setShininess(100);

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.loadTexture('../resources/images/slides.png');
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.slidesAppearance.setAmbient(0.07,0.05,0.03,1);
	this.slidesAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.slidesAppearance.setSpecular(0.2,0.12,0,1);
	this.slidesAppearance.setShininess(30);

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.loadTexture('../resources/images/board.png');
	this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.boardAppearance.setAmbient(0.07,0.05,0.03,1);
	this.boardAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.boardAppearance.setSpecular(0.3,0.3,0.3,1); //mais intenso
	this.boardAppearance.setShininess(150); //mais focado

	this.columnAppearance = new CGFappearance(this);
	this.columnAppearance.loadTexture('../resources/images/column.jpg');
	this.columnAppearance.setAmbient(0.07,0.05,0.03,1);
	this.columnAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.columnAppearance.setSpecular(0.3,0.3,0.3,1); //mais intenso
	this.columnAppearance.setShininess(150); //mais focado


	
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
	this.lights[3].setPosition(0, 4, 7.5, 1.0);

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
	this.lights[3].setVisible(true);
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
		//this.perola.apply();
		this.floorAppearance.apply()
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.cinza.apply();
		this.windowAppearance.apply();
		this.leftWall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.cinza.apply();
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

	//Book 

	this.pushMatrix();
		this.book.display();
	this.popMatrix();

	//FEUP

	/*this.pushMatrix();
	this.feup.display();
	this.popMatrix();*/

	
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

	//Fifthy Chair
	this.pushMatrix();
	this.translate(4, 0, 9.5);
	this.rotate(180 * degToRad, 0, 1, 0);
	this.chair.display();
	this.popMatrix();

	//Sixthy Chair
	this.pushMatrix();
	this.translate(6, 0, 9.5);
	this.rotate(180 * degToRad, 0, 1, 0);
	this.chair.display();
	this.popMatrix();

	//Seventhy Chair
	this.pushMatrix();
	this.translate(11, 0, 9.5);
	this.rotate(180 * degToRad, 0, 1, 0);
	this.chair.display();
	this.popMatrix();

	//Eighty Chair
	this.pushMatrix();
	this.translate(13, 0, 9.5);
	this.rotate(180 * degToRad, 0, 1, 0);
	this.chair.display();
	this.popMatrix();

	// Paper
	this.pushMatrix();
		this.translate(4.5, 3.8, 8);
		this.paper.display();
	this.popMatrix();

	// Paper2
	this.pushMatrix();
		this.translate(5.33, 3.8, 8);
		this.paper.display();
	this.popMatrix();

	// Paper3
	this.pushMatrix();
		this.translate(11.5, 3.8, 8);
		this.paper.display();
	this.popMatrix();

	// Paper4
	this.pushMatrix();
		this.translate(12.33, 3.8, 8);
		this.paper.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		//this.materialA.apply();
		this.slidesAppearance.apply()
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		//this.materialB.apply();
		this.boardB.display();
	this.popMatrix();

	
	//Cylinder
	this.pushMatrix();
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(0.5, 0.5, 8);
	this.translate(3,-27, 0);
	this.columnAppearance.apply();
	this.cylinder.display();
	this.popMatrix();

	//Lamp
	this.pushMatrix();
	this.translate(7.5, 8, 7.5);
	this.rotate(90 * degToRad, 1, 0, 0);
	//this.granitoAppearance.apply();
	this.lamp.display();
	this.popMatrix();


	// ---- END Primitive drawing section

	this.shader.unbind();
};