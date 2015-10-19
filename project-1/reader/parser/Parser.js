function Parser(reader, scene, texturePath, rootElement) {
	
	this.reader = reader;
	this.scene = scene;

	this.lights = [];
	this.textures = {};
	this.materials = {};
	this.leaves = {};
	this.nodes = [];

	this.rootElement = this.reader.xmlDoc.documentElement;
	this.texturePath = texturePath;
	
	this.loadInitials();
	this.loadIlumination();
	this.loadLights();
	this.loadMaterials();
	this.loadTextures();
	this.loadLeaves();
	this.loadNodes();
};

Parser.prototype.loadInitials = function() {
	console.log('Parsing Initials.....');

	var xmlInitials = this.rootElement.getElementsByTagName('INITIALS')[0];
	var initials = new Initials(this.reader);
	initials.parse(xmlInitials);
	initials.toCGF(this.scene);
	
	console.log('DONE!');
};

Parser.prototype.loadIlumination = function() {
	console.log('Parsing Ilumination.....');

	var xmlInitials = this.rootElement.getElementsByTagName('ILLUMINATION')[0];
	var ilumination = new Illumination(this.reader);
	ilumination.parse(xmlInitials);
	ilumination.toCGF(this.scene);

	console.log('Done!');
};

Parser.prototype.loadLights = function() {
	console.log('Parsing Ligths.....');

	var node = this.rootElement.getElementsByTagName('LIGHTS')[0];
	var xmlLights = node.getElementsByTagName('LIGHT');

	for (var index = 0; index < xmlLights.length; ++index) {
		this.lights[index] = new Light(this.reader);
		this.lights[index].parse(xmlLights[index]);
	}

	console.log('DONE!');
};

Parser.prototype.loadMaterials = function() {
	console.log('Parsing Materials...');

	var node = this.rootElement.getElementsByTagName('MATERIALS')[0];
	var xmlMaterials = node.getElementsByTagName('MATERIAL');

	for (var index = 0; index < xmlMaterials.length; ++index) {
		var material = new Material(this.reader);
		material.parse(xmlMaterials[index]);
		this.materials[material.id] = material.toCGF(this.scene);
	}

	console.log('DONE!');
};

Parser.prototype.loadTextures = function() {
	console.log('Parsing Textures...');

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

Parser.prototype.loadLeaves = function() {
	console.log('Parsing Leafs...');

	var node = this.rootElement.getElementsByTagName('LEAVES')[0];
	var xmlLeafs = this.rootElement.getElementsByTagName('LEAF');

	for (var index = 0; index < xmlLeafs.length; ++index) {
		var leaf = new Leaf(this.reader);
		leaf.parse(xmlLeafs[index]);
		this.leaves[leaf.id] = leaf.toCGF(this.scene);
	}

	console.log('DONE!');
};

Parser.prototype.loadNodes = function() {
	console.log('Parsing NODES...');

	var nodes = this.rootElement.getElementsByTagName('NODES')[0];
	
	this.rootId = this.reader.getString(nodes.getElementsByTagName('ROOT')[0], 'id', true);

	var xmlNodes = nodes.getElementsByTagName('NODE');

	for (var i = 0; i < xmlNodes.length; i++) {
		var node = new Node(this.reader);
		node.parse(xmlNodes[i]);
		this.nodes[node.id] = node;
	}

	console.log('DONE!');
};
