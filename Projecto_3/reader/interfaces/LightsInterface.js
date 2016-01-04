/**
 * LightsInterface
 * @constructor
 */
 
 
function LightsInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

LightsInterface.prototype = Object.create(CGFinterface.prototype);
LightsInterface.prototype.constructor = LightsInterface;

/**
 * init
 * @param {CGFapplication} application
 */
LightsInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	this.scene = application.scene;
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.Pause_Clock = false;
	this.clock = MyClock(this.scene);
	
	this.gui = new dat.GUI();

    this.lights={};

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 
	
	this.group=this.gui.addFolder("Lights");
	this.group.close();
	
	this.group2=this.gui.addFolder("Camera");
	this.group2.open();
	
	this.posicaoCamera = 0;
	
	this.gui.add(this.scene, "posicaoCamera", {'Player 1' : 0, 'Player 2' : 1}).name("Position").onChange(function(posicaoCamera) {
		self.scene.load(posicaoCamera);
	}).listen();
	
	self.scene.load(this.posicaoCamera);
	
	
	this.group3=this.gui.addFolder("GameLogic");
	this.group3.open();
	
	this.gui.add(this.scene, "resetTime").name("Reset Time").onChange(function()
	{
		self.scene.resetTime();
	}).listen();
	self.scene.resetTime();

	/** REMOVED WAS CALLING UNDO ON PAGE LOAD AND 2 TIMES ON CLICK
	this.gui.add(this.scene, "undo").name("Undo").onChange(function()
	{
		self.scene.undo();
	}).listen();
	self.scene.undo();
	*/
	this.gui.add(this.scene, "undo").name("Undo").listen();
	this.gui.add(this.scene, "forceInterfaceRefresh").name("Refresh Pieces").listen();
	
	//this.gui.add(this.scene, "resetTime").name("Reset Time");
	
	this.gui.add(this.scene, "resetGame").name("Reset Game");
	
	
	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	this.AmbienteJogo = 'salaoJogos.lsx';
	
	this.gui.add(this.scene, "AmbienteJogo", {'Salao de Jogos' : 'salaoJogos.lsx', 'Parque' : 'parque.lsx'}).name("Ambientes").onChange(function(AmbienteJogo) {
		self.scene.loadGraph(AmbienteJogo);
	}).listen();
	
	self.scene.loadGraph(this.AmbienteJogo);
	
	
	this.modoJogo = 0;
	
	this.gui.add(this.scene, "modoJogo", {'Player vs Player' : 0, 'Player vs CPU' : 1}).name("Modos de Jogo").onChange(function(modoJogo) {
		self.scene.loadModes(modoJogo);
	}).listen();
	
	self.scene.loadModes(this.modoJogo);
	
	return true;
};


LightsInterface.prototype.insertLight = function(id, nome, estado){

    var self = this;
    this.lights[nome] = !!estado;
    
    this.group.add(this.lights, nome).onChange(function(value){
       self.scene.setLight(id, value);
    });

};

LightsInterface.prototype.update = function(currTime)
{
	if(typeof this.temp == 'undefined'){
		this.temp = currTime;
	}
	else
	{
		var intervalo = currTime - this.temp;
		this.temp = currTime;
		
		if(!this.Pause_Clock)
			this.clock.update(intervalo);
	}
};
