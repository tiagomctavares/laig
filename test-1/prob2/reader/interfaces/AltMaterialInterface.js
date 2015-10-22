//LAIGPROB2_inicio
function AltMaterialInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

AltMaterialInterface.prototype = Object.create(CGFinterface.prototype);
AltMaterialInterface.prototype.constructor = AltMaterialInterface;

AltMaterialInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	this.scene = application.scene;
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

    this.altMaterial={};

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 
	
	this.group=this.gui.addFolder("Alternative Materials");
	this.group.open();
	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	return true;
};


AltMaterialInterface.prototype.insertAltMaterial = function(id, nome, estado){

    var self = this;
    this.altMaterial[nome] = !!estado;
    
    this.group.add(this.altMaterial, nome).onChange(function(value){
       self.scene.altMaterial = value;
    });
	
};
//LAIGPROB2_fim