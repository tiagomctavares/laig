/**
* Parser
 * @param {CGFXMLreader} reader
*/
function Parser(reader, scene, texturePath) {

	//
	this.reader = reader;
	this.scene = scene;
	this.lights = [];
	this.textures = {};
	this.materials = {};
	this.animations = {};
	this.leaves = {};
	this.nodes = [];
	this.rootElement = this.reader.xmlDoc.documentElement;
	this.texturePath = texturePath;

	//
	this.loadInitials();
	this.loadIllumination();
	this.loadLights();
	this.loadMaterials();
	this.loadTextures();
	this.loadAnimations();
	this.loadLeaves();
	this.loadNodes();
};

/**
* Processa o carregamento da informação relativa aos initials presente no ficheiro XML
* @return {null}
*/
Parser.prototype.loadInitials = function() {

	console.log('Parsing initials.....');

	var xmlInitials = this.rootElement.getElementsByTagName('INITIALS')[0];
	var initials = new Initials(this.reader);

	initials.parse(xmlInitials);
	initials.toCGF(this.scene);
	console.log('DONE!');
};

/**
* Processa o carregamento da informação relativa à llumination presente no ficheiro XML
* @return {null}
*/
Parser.prototype.loadIllumination = function() {
	
	console.log('Parsing illumination.....');

	var xmlInitials = this.rootElement.getElementsByTagName('ILLUMINATION')[0];
	var ilumination = new Illumination(this.reader);
	
	ilumination.parse(xmlInitials);
	ilumination.toCGF(this.scene);
	console.log('Done!');
};

/**
* Processa o carregamento da informação relativa às luzes presentes no ficheiro XML
* @return {null}
*/
Parser.prototype.loadLights = function() {
	
	console.log('Parsing lights.....');

	var node = this.rootElement.getElementsByTagName('LIGHTS')[0];
	var xmlLights = node.getElementsByTagName('LIGHT');

	for (var index = 0; index < xmlLights.length; ++index) {
		this.lights[index] = new Light(this.reader);
		this.lights[index].parse(xmlLights[index]);
	}

	console.log('DONE!');
};

/**
* Processa o carregamento da informação relativa aos materiais presentes no ficheiro XML
* @return {null}
*/
Parser.prototype.loadMaterials = function() {
	
	console.log('Parsing materials...');

	var node = this.rootElement.getElementsByTagName('MATERIALS')[0];
	var xmlMaterials = node.getElementsByTagName('MATERIAL');

	for (var index = 0; index < xmlMaterials.length; ++index) {
		var material = new Material(this.reader);
		material.parse(xmlMaterials[index]);
		this.materials[material.id] = material.toCGF(this.scene);
	}

	console.log('DONE!');
};

/**
* Processa o carregamento da informação relativa às animações presentes no ficheiro XML
* @return {null}
*/
Parser.prototype.loadAnimations = function() {

	console.log('Parsing animations...');

	var node = this.rootElement.getElementsByTagName('ANIMATIONS')[0];
	var xmlAnimations = node.getElementsByTagName('ANIMATION');

	for (var index = 0; index < xmlAnimations.length; ++index) {
		var thisAnimation = new Animation(this.reader);
		thisAnimation.parse(xmlAnimations[index]);
		this.animations[thisAnimation.id] = thisAnimation.toCGF(this.scene);
	}

	console.log('DONE!');
};

/**
* Processa o carregamento da informação relativa às leaves presentes no ficheiro XML
* @return {null}
*/
Parser.prototype.loadLeaves = function() {

	console.log('Parsing leaves...');

	var node = this.rootElement.getElementsByTagName('LEAVES')[0];
	var xmlLeafs = node.getElementsByTagName('LEAF');

	for (var index = 0; index < xmlLeafs.length; ++index) {
		var leaf = new Leaf(this.reader);
		leaf.parse(xmlLeafs[index]);
		this.leaves[leaf.id] = leaf.toCGF(this.scene);
	}

	console.log('DONE!');
};

/**
* Processa o carregamento da informação relativa às texturas presentes no ficheiro XML
* @return {null}
*/
Parser.prototype.loadTextures = function() {

	console.log('Parsing textures...');

	var node = this.rootElement.getElementsByTagName('TEXTURES')[0];
	var xmlTextures = node.getElementsByTagName('TEXTURE');

	for (var index = 0; index < xmlTextures.length; ++index) {
		var texture = new Texture(this.reader, this.texturePath);
		texture.parse(xmlTextures[index]);
		texture.toCGF(this.scene);
		this.textures[texture.id] = texture;
	}

	console.log('DONE!');
};

/**
* Processa o carregamento da informação relativa aos Nodes presentes no ficheiro XML
* @return {null}
*/
Parser.prototype.loadNodes = function() {

	console.log('Parsing nodes...');

	var nodes = this.rootElement.getElementsByTagName('NODES')[0];
	this.rootId = this.reader.getString(nodes.getElementsByTagName('ROOT')[0], 'id', true);
	var xmlNodes = nodes.getElementsByTagName('NODE');

	for (var i = 0; i < xmlNodes.length; i++) {
		var node = new Node(this.reader);
		node.parse(xmlNodes[i], this.animations);
		this.nodes[node.id] = node;
	}

	console.log('DONE!');
};