/**
 * construtor default da classe 'XMLscene'
 * @constructor
 */
function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * inicializa a cena com valores por defeito, eixos e observador(Camara)
 assim como a matriz para aplicacao das transformacoes geometricas
 * @param {CGFapplication} application
 * @return {null}
 */
XMLscene.prototype.init = function (application) {

    CGFscene.prototype.init.call(this, application);

    this.initAppearancesStack();
    this.initTexturesStack();

    this.initCameras();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
	this.selectedObject = null;
    this.enableTextures(true);

    this.rotationAxis = [];
    this.rotationAngle = [];
	this.setUpdatePeriod(1000/60);
    this.sceneMatrix = mat4.create();
    mat4.identity(this.sceneMatrix);
    
	this.axis=new CGFaxis(this);
	
	this.pieceRed = new CGFappearance(this);
	this.pieceRed.loadTexture('../reader/scenes/images/red.jpg');
	
	this.pieceBlue = new CGFappearance(this);
	this.pieceBlue.loadTexture('../reader/scenes/images/blue.jpg');
	
	this.tabuleiro = new MyBoard(this);
	this.textYellow = new CGFappearance(this);
	this.textYellow.loadTexture('../reader/scenes/images/yellow.jpg');
	
	this.textGreen = new CGFappearance(this);
	this.textGreen.loadTexture('../reader/scenes/images/green.jpg');
	
	this.objects = [];
	var i;
	for(i =0; i< 64; i++)
	{
		this.objects[i] = new MyPiece(this);
	}
	
	
	this.piecesJog1 = [];
	this.piecesJog2 = [];
	
	var j;
	
	for(j = 0; j < 17; j++)
	{
		this.piecesJog1[j] = new MyPiece(this);
	}
	
	for(j = 0; j < 17; j++)
	{
		this.piecesJog2[j] = new MyPiece(this);
	}
	//RELOGIO
	
	momentoAtual = new Date();
	
	hora = momentoAtual.getHours(); 
	minuto = momentoAtual.getMinutes(); 
	segundo = momentoAtual.getSeconds(); 
	
	console.log(horaImprimivel = hora + " : " + minuto + " : " + segundo);
	
	setTimeout('segundo', 1000);	
	
	//MATERIALS
	this.red = new CGFappearance(this);
	this.red.setAmbient(0.66, 0.0, 0.02, 0.2);
	this.red.setDiffuse(0.66, 0.0, 0.05, 0.6);
	this.red.setSpecular(1.0, 1.0, 1.0, 1);
	this.red.setShininess(30);
	
	this.blue = new CGFappearance(this);
	this.blue.setAmbient(0.02, 0.0, 0.66, 0.2);
	this.blue.setDiffuse(0.05, 0.0, 0.66, 0.6);
	this.blue.setSpecular(1.0, 1.0, 1.0, 1);
	this.blue.setShininess(30);
	
	this.setPickEnabled(true);
};

/**
 * inicializa a stack de appearences com os valores por defeito
 * @return {null}
 */
XMLscene.prototype.initAppearancesStack = function() {
	this.appearancesStack = new Array();
	this.appearancesStack.push(this.createDefaultAppearance());
}

/**
 * inicializa a stack de texturas com uma textura inicialmente null
 * @return {null}
 */
XMLscene.prototype.initTexturesStack = function() {
	this.texturesStack = new Array();
	this.texturesStack.push(null);
}

/**
 * actualiza, fazendo push de texture para a stack de texturas
 * @param texture - recebe uma textura a aplicar
 * @return {null}
 */
XMLscene.prototype.pushTexture = function(texture) {
	this.texturesStack.push(texture);
}

/**
 * actualiza, fazendo pop da textura que está no topo da stack de texturas
 * @return {null}
 */
XMLscene.prototype.popTexture = function() {
	this.texturesStack.pop();
}

/**
 * actualiza, fazendo push de appearance para a stack de appearances
 * @param appearance - recebe uma appearance a aplicar
 * @return {null}
 */
XMLscene.prototype.pushAppearance = function(appearance) {
	this.appearancesStack.push(appearance);
}

/**
 * actualiza, fazendo pop da appearance que está no topo da stack de appearances
 * @return {null}
 */
XMLscene.prototype.popAppearance = function() {
	this.appearancesStack.pop();
}

/**
 * inicializa as luzes da cena, percorrendo o vetor de luzes
 * @param lights - recebe um vetor de luzes da cena
 * @return {null}
 */
XMLscene.prototype.initLights = function(lights) {
	
	

	for (var index = 0; index < lights.length; index++) {
		this.lights[index] = lights[index].bindInit(this.lights[index]);
		this.interface.insertLight(index, lights[index].id, lights[index].enable);
		this.lights[index].setVisible(true);
		this.lights[index].update();
	};

}

/**
 * atualiza cada luz, percorrendo o vetor de luzes
 * @return {null}
 */
XMLscene.prototype.updateLights = function() {
	for (var index = 0; index < this.lights.length; index++) {
		this.lights[index].update();
	};
}

/**
 * atualiza o estado de cada luz, consoante o estado: enable desta
 * @param id - identificador da luz
 * @param enable - estado da luz com i identificador: id
 * @return {null}
 */
XMLscene.prototype.setLight = function(id, enable) {
	if(enable)
		this.lights[id].enable();
	else
		this.lights[id].disable();
}


XMLscene.prototype.applyMaterial = function(material) {
	material.apply();
}

XMLscene.prototype.drawLeaf = function(leaf) {
	leaf.display();
}

XMLscene.prototype.setInterface = function(myInterface){
	this.interface=myInterface;
}

/**
 * aplica a transformacao de rotacao a um eixo, com o respetivo angulo
 * @param rotationId - id da rotacao
 * @param axis - a letra correspondente ao eixo de rotacao
 * @param angle - valor angulo a aplicar ao eixo em questao
 * @return {null}
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
	//this.camera.Animator();
};
/*
XMLscene.prototype.Animator = function () {
	  // controller for animation objects.
	  var self = this;
	  var intervalRate = 20;
	  this.tweenTypes = {
		// % of total distance to move per-frame, total always = 100
		'default': [1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1],
		'blast': [12,12,11,10,10,9,8,7,6,5,4,3,2,1],
		'linear': [10,10,10,10,10,10,10,10,10,10]
	  }
	  this.queue = [];
	  this.queueHash = [];
	  this.active = false;
	  this.timer = null;
	  this.createTween = function(start,end,type) {
		// return array of tween coordinate data (start->end)
		type = type||'default';
		var tween = [start];
		var tmp = start;
		var diff = end-start;
		var x = self.tweenTypes[type].length;
		for (var i=0; i<x; i++) {
		  tmp += diff*self.tweenTypes[type][i]*0.01;
		  tween[i] = {};
		  tween[i].data = tmp;
		  tween[i].event = null;
		}
		return tween;
	  };

	  this.enqueue = function(o,fMethod,fOnComplete) {
		// add object and associated methods to animation queue
		// writeDebug('animator.enqueue()');
		if (!fMethod) {
		  // writeDebug('animator.enqueue(): missing fMethod');
		}
		self.queue.push(o);
		o.active = true;
	  };

	  this.animate = function() {
		// interval-driven loop: process queue, stop if done
		var active = 0;
		for (var i=0,j=self.queue.length; i<j; i++) {
		  if (self.queue[i].active) {
			self.queue[i].animate();
			active++;
		  }
		}
		if (active == 0 && self.timer) {
		  // all animations finished
		  // writeDebug('Animations complete');
		  self.stop();
		} else {
		  // writeDebug(active+' active');
		}
	  };

	  this.start = function() {
		if (self.timer || self.active) {
		  // writeDebug('animator.start(): already active');
		  return false;
		}
		// writeDebug('animator.start()');
		// report only if started
		self.active = true;
		self.timer = setInterval(self.animate,intervalRate);
	  };

	  this.stop = function() {
		// writeDebug('animator.stop()',true);
		// reset some things, clear for next batch of animations
		clearInterval(self.timer);
		self.timer = null;
		self.active = false;
		self.queue = [];
	  };

	};

	var animator = new Animator();
*/

/**
 * aplica o background á cena
 * @param rgba - corresponde ás cores para o background
 * @return {null}
 */
XMLscene.prototype.setBackground = function(rgba) {
	this.background = rgba;
};

/*
XMLscene.prototype.setDoubleside = function(doubleside) {
	this.doubleside = doubleside;
};*/

/**
 * aplica a luz ambiente á cena
 * @param rgba - corresponde ás cores para a luz ambiente
 * @return {null}
 */
XMLscene.prototype.setAmbient = function(rgba) {
	this.ambient = rgba;
};

/**
 * altera as posicoes dos planos do observador
 * @param {number} near - plano mais proximo do observador
 * @param {number} far - plano mais afastado do observador
 * @return {null}
 */
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


/**
 * cria uma appearance por defeito
 * @param appearance - appearance por defeito da cena
 * @return {appearance}
 */
XMLscene.prototype.createDefaultAppearance = function (appearance) {
	var appearance = new CGFappearance(this);
    
    appearance.setAmbient(0.2, 0.4, 0.8, 1.0);
    appearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
    appearance.setSpecular(0.2, 0.4, 0.8, 1.0);
    appearance.setShininess(10.0);	

    return appearance;
};

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function () 
{
	this.updateInitials();
	this.updateIllumination();
};

XMLscene.prototype.update = function(deltaTempo) {
	if (this.graph.loadedOk) {
		this.graph.updateAnimations((deltaTempo - this.lastUpdate) * 0.001);	
	}
};

/**
 * atualiza as Initials, colocando a camera consoante o frustum no lsx, e aplicando a matriz de transformacoes 
 * geometricas 
 * @return {null}
 */
XMLscene.prototype.updateInitials = function() {
	this.camera.far = this.frustumFar;
	this.camera.near = this.frustumNear;

	mat4.translate(this.sceneMatrix, this.sceneMatrix, this.sceneTranslate);
	mat4.rotate(this.sceneMatrix, this.sceneMatrix, this.rotationAngle[0], this.rotationAxis[0]);
	mat4.rotate(this.sceneMatrix, this.sceneMatrix, this.rotationAngle[1], this.rotationAxis[1]);
	mat4.rotate(this.sceneMatrix, this.sceneMatrix, this.rotationAngle[2], this.rotationAxis[2]);
	mat4.scale(this.sceneMatrix, this.sceneMatrix, this.sceneScale);

	    this.terrainShader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");
		this.terrainShader.setUniformsValues({
		texture: 0,
		heightMap: 1
	});
	}

	XMLscene.prototype.setTerrainShader = function() {
		this.setActiveShader(this.terrainShader);
	}
/**
 * atualiza a iluminacao, tanto a nivel do background como da iluminacao global
 * @return {null}
 */
XMLscene.prototype.updateIllumination = function() {
	// SET BACKGROUND
	this.gl.clearColor(this.background[0], this.background[1], this.background[2], this.background[3]);
	
	// SET GLOBAL ILLUMINATION
	this.setGlobalAmbientLight(this.ambient[0], this.ambient[1], this.ambient[2], this.ambient[3]);
}

/**
 * atualiza a appearance, 
 * @return {null}
 */
XMLscene.prototype.updateAppearance = function() {
	// Get Last
	var appearance = this.appearancesStack.pop();
	var texture = this.texturesStack.pop();

	// Apply
	appearance.setTexture(texture);
	appearance.apply();

	// Add it back to Stack
	this.appearancesStack.push(appearance);
	this.texturesStack.push(texture);
};

XMLscene.prototype.resetShader = function (){
	this.setActiveShader(this.defaultShader);
};

//PICKING
XMLscene.prototype.logPicking = function ()
{
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];				
					console.log("Picked object: " + obj + ", with pick id " + customId);
					this.clearSelection();
					this.select(this.pickResults[i][0]);
					
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}		
	}
}

XMLscene.prototype.select = function(object) {
	this.selectedObject = object;
	this.selectedObject.select();
}
XMLscene.prototype.clearSelection = function() {
	if (this.selectedObject != null) {
		this.selectedObject.clear();
		this.selectedObject = null;
	}
}

XMLscene.prototype.display = function () {
	// ---- BEGIN Background, camera and axis setup
    //this.shader.bind();
	
	this.logPicking();
	this.clearPickRegistration();
	
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
	
	
	//this.red.apply();
	this.textYellow.apply();
	// draw objects
	for (i =0; i<this.objects.length; i++) {
		this.pushMatrix();
		var x = 0.4 * (i % 8);
		var y = 0.4 * (~~(i / 8));
		this.translate(x + 5.5, -0.2, y - 0.8);
		this.scale(1.2, 1.0, 1.2);
		this.registerForPick(i+1, this.objects[i]);
		
		//this.translate(0,1,2);		
		//this.rotate(Math.PI/2.0,1,0,0);
		if (this.objects[i].isSelected()) {
			this.textGreen.apply();
			//this.translate(8.5, 2.75, 3.5);
			this.objects[i].display();
			this.textYellow.apply();
		} else {
			this.objects[i].display();
		}
		
		this.popMatrix();
	}
	
	
	this.pieceRed.apply();
	for (i =0; i<this.piecesJog1.length; i++) {
		this.pushMatrix();
		var x = 0.4 * (~~(i / 3));
		var y = 0.4 * (i % 3);
		this.translate(x + 5.5, y - 0.2, -1.8);
		this.scale(1.2, 1.0, 1.2);
		this.registerForPick(i+1, this.piecesJog1[i]);
		
		if (this.piecesJog1[i].isSelected()) {
			this.textGreen.apply();
			this.piecesJog1[i].display();
			this.pieceRed.apply();
		} else {
			this.piecesJog1[i].display();
		}
		
		this.popMatrix();
	}
	
	this.pieceBlue.apply();
	for (i =0; i<this.piecesJog2.length; i++) {
		this.pushMatrix();
		var x = 0.4 * (~~(i / 3));
		var y = 0.4 * (i % 3);
		this.translate(x + 5.5, y - 0.2, 3.0);
		this.scale(1.2, 1.0, 1.2);
		this.registerForPick(i+1, this.piecesJog2[i]);
		
		if (this.piecesJog2[i].isSelected()) {
			this.textGreen.apply();
			this.piecesJog2[i].display();
			this.pieceBlue.apply();
		} else {
			this.piecesJog2[i].display();
		}
		
		this.popMatrix();
	}
	
};

