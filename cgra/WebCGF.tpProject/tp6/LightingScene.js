var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

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
	this.Pause_Clock = false;
	this.Light1=true;
	this.Light2=true;
	this.Light3=true;
	this.Light4=true;
	this.speed=3;

	this.robotAcena = false;
	this.moveRobot = [false, false, false, false, false];


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
	this.leftWall = new MyLeftWall(this, -1, 2, -0.5, 1.5);
	this.clock = new MyClock(this);
	this.robot = new MyRobot(this);
	this.paisagem = new MyQuad(this);

	//Textures
	this.textures = 0;
	
	this.textura1C = new CGFappearance(this);
	this.textura1C.loadTexture('../resources/images/exp2.png');

	this.textura1H = new CGFappearance(this);
	this.textura1H.loadTexture('../resources/images/caraV.png');

	this.textura1B = new CGFappearance(this);
	this.textura1B.loadTexture('../resources/images/preto.png');

	this.textura2C = new CGFappearance(this);
	this.textura2C.loadTexture('../resources/images/invencao.png');

	this.textura2H = new CGFappearance(this);
	this.textura2H.loadTexture('../resources/images/eyes.png');

	this.textura2B = new CGFappearance(this);
	this.textura2B.loadTexture('../resources/images/ver1.png');

	this.textura3C = new CGFappearance(this);
	this.textura3C.loadTexture('../resources/images/exemplo.png');

	this.textura3H = new CGFappearance(this);
	this.textura3H.loadTexture('../resources/images/caraM.png');

	this.textura3B = new CGFappearance(this);
	this.textura3B.loadTexture('../resources/images/yellow.png');

	this.texturasCorpo = [this.textura1C, this.textura2C, this.textura3C];
	this.texturasCabeca = [this.textura1H, this.textura2H, this.textura3H];
	this.texturasBraco = [this.textura1B, this.textura2B, this.textura3B];

	
	// Materials
	this.materialDefault = new CGFappearance(this);

	this.cinza = new CGFappearance(this);
	this.cinza.setAmbient(0.66,0.66,0.66,1);
	this.cinza.setDiffuse(0.66,0.66,0.66,1);
	this.cinza.setSpecular(0.8,0.8,0.8,1);
	this.cinza.setShininess(120);


	this.pink = new CGFappearance(this);
	this.pink.setAmbient(1,0.18,0.59,1);
	this.pink.setDiffuse(1,0.18,0.59,1);
	this.pink.setSpecular(0.2,0.12,0,1);
	this.pink.setShininess(100);

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

	this.lampAppearance = new CGFappearance(this);
	this.lampAppearance.loadTexture('../resources/images/lamp.jpg');
	this.lampAppearance.setAmbient(1,1,1,1);
	this.lampAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.lampAppearance.setSpecular(0.3,0.3,0.3,1); //mais intenso
	this.lampAppearance.setShininess(150); //mais focado

	this.red = new CGFappearance(this);
	this.red.setAmbient(0.64,0.05,0.09,1);
	this.red.setDiffuse(0.64,0.05,0.09,1);
	this.red.setSpecular(0.2,0.12,0,1);
	this.red.setShininess(100);

	this.green = new CGFappearance(this);
	this.green.setAmbient(0.047,0.5,0,1);
	this.green.setDiffuse(0.047,0.5,0,1);
	this.green.setSpecular(0.2,0.12,0,1);
	this.green.setShininess(100);

	this.blue = new CGFappearance(this);
	this.blue.setAmbient(0, 0, 1, 1);
	this.blue.setDiffuse(0, 0, 1, 1);
	this.blue.setSpecular(0.2,0.12,0,1);
	this.blue.setShininess(100);

	this.paisagemAppearance = new CGFappearance(this);
	this.paisagemAppearance.loadTexture('../resources/images/tree.jpg');
	this.paisagemAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.paisagemAppearance.setAmbient(0.07,0.05,0.03,1);
	this.paisagemAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.paisagemAppearance.setSpecular(0.3,0.3,0.3,1); 
	this.paisagemAppearance.setShininess(200); 

	this.setUpdatePeriod(1000/60);
	
};

LightingScene.prototype.doSomething = function ()
{
	 console.log("Doing something...");
 };

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);

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
	this.lights[3].setVisible(true);
	this.lights[3].enable();

	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.update = function(currTime) {
	
if(typeof this.temp == 'undefined'){
	this.temp = currTime;
}
else{
	var intervalo = currTime - this.temp;
	this.temp = currTime;
	if(!this.Pause_Clock) this.clock.update(intervalo);

	if(this.moveRobot[0]) this.robotAcena = true;
	if(this.moveRobot[1]) this.robot.movimenta(0, intervalo*this.speed/25);
	if(this.moveRobot[2]) this.robot.movimenta(0, -intervalo*this.speed/25);
	if(this.moveRobot[3]) this.robot.movimenta(intervalo*this.speed/600, 0);
	if(this.moveRobot[4]) this.robot.movimenta(-intervalo*this.speed/600, 0);

	if(this.robotAcena) this.robot.acena(intervalo);
}

if(this.Light1) this.lights[0].enable();
	else this.lights[0].disable();
if(this.Light2) this.lights[1].enable();
	else this.lights[1].disable();
if(this.Light3) this.lights[2].enable();
	else this.lights[2].disable();
if(this.Light4) this.lights[3].enable();
	else this.lights[3].disable();

};



//var curRobotAppearence = this.robotAppearences[0];
//this.textures(curRobotAppearence);

LightingScene.prototype.textures = function (curRobotAppearence)
{
	if(curRobotAppearence == this.robotAppearences[0])
	this.blue.apply();
	else if(curRobotAppearence == this.robotAppearences[1])
	this.pink.apply();
	else if(curRobotAppearence == this.robotAppearences[2])
	this.green.apply();

 };

//var robotAppearencesList =  { "Boy" : this.robotAppearences[0] , "Girl" : this.robotAppearences[1] } 

LightingScene.prototype.get = function ( k ) { 
  return robotAppearencesList [ k ]; 
};

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
	this.floorAppearance.apply()
	this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
	this.translate(0, 4, 7.5);
	this.rotate(90 * degToRad, 0, 1, 0);
	this.scale(15, 8, 0.2);
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

	//paisagem
	this.pushMatrix();
	this.translate(-10, 4, 7.5);
	this.rotate(90 * degToRad, 0, 1, 0);
	this.scale(30, 16, 0.2);
	this.paisagemAppearance.apply();
	this.paisagem.display();
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
	this.translate(4, 0, 8);
	this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
	this.translate(11, 0, 8);
	this.table.display();
	this.popMatrix();

	//First Chair
	this.pushMatrix();
	this.translate(3, 0, 6.5);
	this.chair.display();
	this.popMatrix();

	//Second Chair
	this.pushMatrix();
	this.translate(5, 0, 6.5);
	this.chair.display();
	this.popMatrix();

	//Third Chair
	this.pushMatrix();
	this.translate(10, 0, 6.5);
	this.chair.display();
	this.popMatrix();

	//Fourth Chair
	this.pushMatrix();
	this.translate(12, 0, 6.5);
	this.chair.display();
	this.popMatrix();

	//Fifthy Chair
	this.pushMatrix();
	this.translate(3, 0, 9.5);
	this.rotate(180 * degToRad, 0, 1, 0);
	this.chair.display();
	this.popMatrix();

	//Sixthy Chair
	this.pushMatrix();
	this.translate(5, 0, 9.5);
	this.rotate(180 * degToRad, 0, 1, 0);
	this.chair.display();
	this.popMatrix();

	//Seventhy Chair
	this.pushMatrix();
	this.translate(10, 0, 9.5);
	this.rotate(180 * degToRad, 0, 1, 0);
	this.chair.display();
	this.popMatrix();

	//Eighty Chair
	this.pushMatrix();
	this.translate(12, 0, 9.5);
	this.rotate(180 * degToRad, 0, 1, 0);
	this.chair.display();
	this.popMatrix();

	// Paper
	this.pushMatrix();
	this.translate(3.5, 3.8, 8);
	this.paper.display();
	this.popMatrix();

	// Paper2
	this.pushMatrix();
	this.translate(4.33, 3.8, 8);
	this.paper.display();
	this.popMatrix();

	// Paper3
	this.pushMatrix();
	this.translate(10.5, 3.8, 8);
	this.paper.display();
	this.popMatrix();

	// Paper4
	this.pushMatrix();
	this.translate(11.33, 3.8, 8);
	this.paper.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
	this.translate(4, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	this.slidesAppearance.apply()
	this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
	this.translate(10.5, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	this.boardAppearance.apply();
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
	this.lampAppearance.apply();
	this.lamp.display();
	this.popMatrix();

	//Clock

	this.pushMatrix();
	this.translate(7.25, 7.2, 0);
	this.scale(0.72, 0.72, 0.2);
	this.clock.display();
	this.popMatrix();

	//Robot
	this.pushMatrix();
	this.translate(7.5, 0, 5.5);
	this.rotate(210 * degToRad, 0, 1, 0);
	this.pushMatrix();
	this.robot.display(this.texturasCorpo[this.textures], this.texturasCabeca[this.textures], this.texturasBraco[this.textures]);
	this.popMatrix();
	this.popMatrix();

	// ---- END Primitive drawing section

	this.shader.unbind();
};