function Node(reader) {
	this.reader = reader;

	// Parent Class
	BaseParserObject.call(this, reader);
}
Node.prototype = Object.create(BaseParserObject.prototype);

Node.prototype.clone = function() {
	var copy = new Node(this.reader);
    for (var attr in this) {
        if (this.hasOwnProperty(attr)) copy[attr] = this[attr];
    }

    return copy;
}

Node.prototype.parseXML = function(XMLElement) {
	var xmlMaterial = XMLElement.getElementsByTagName('MATERIAL')[0];
	var xmlTexture = XMLElement.getElementsByTagName('TEXTURE')[0];
	var xmlTranslation = XMLElement.getElementsByTagName('TRANSLATION');
	var xmlRotation = XMLElement.getElementsByTagName('ROTATION');
	var xmlScale = XMLElement.getElementsByTagName('SCALE');
	var xmlDescendants = XMLElement.getElementsByTagName('DESCENDANTS')[0];
	xmlDescendants = xmlDescendants.getElementsByTagName('DESCENDANT');

	this.id = this.parseId(XMLElement);

	this.translations = [];
	this.rotations = [];
	this.scales = [];

	this.material = this.parseId(xmlMaterial);
	this.texture = this.parseId(xmlTexture);

	this.parseRotations(xmlRotation);
	this.parseScales(xmlScale);
	this.parseTranslations(xmlTranslation);

	this.parseDescendants(xmlDescendants);
}

Node.prototype.parseDescendants = function(XMLElements) {
	this.descendants = [];
	for (var i = 0; i < XMLElements.length; i++) {
			this.descendants[i] = this.parseId(XMLElements[i]);
	}
};

Node.prototype.parseRotations = function(XMLElements) {
	if(XMLElements === undefined)
		return;

	for (var i = 0; i < XMLElements.length; i++) {
		this.rotations[i] = {};
		this.rotations[i].x = this.rotations[i].y = this.rotations[i].z = 0
		var axis = this.getString(XMLElements[i], 'axis');
		this.rotations[i][axis] = 1;
		this.rotations[i].angle = this.getFloat(XMLElements[i], 'angle');
	};
}

Node.prototype.parseScales = function(XMLElements) {
	if(XMLElements === undefined)
		return;

	for (var i = 0; i < XMLElements.length; i++) {
		this.scales[i] = this.getFloat(XMLElements[i], ['sx', 'sy', 'sz']);
	};
}

Node.prototype.parseTranslations = function(XMLElements) {
	if(XMLElements === undefined)
		return;

	for (var i = 0; i < XMLElements.length; i++) {
		this.translations[i] = this.getCoordinates(XMLElements[i]);
	};
}

// NEED TO IMPLEMENT PROPERLY
Node.prototype.isLeaf = function(node, leaves) {
	return leaves.hasOwnProperty(node);
}

Node.prototype.display = function(sceneGraph) {

	sceneGraph.scene.pushMatrix();

	this.applyTransformations(sceneGraph.scene);
	this.applyAppearances();

	for (var i = 0; i < this.descendants.length; i++) {
		var descendantId = this.descendants[i];

		if(sceneGraph.nodes[descendantId] === undefined)
			sceneGraph.leaves[descendantId].display(sceneGraph);
		else
			sceneGraph.nodes[descendantId].display(sceneGraph);
	};

	sceneGraph.scene.popMatrix();
}

Node.prototype.applyTransformations = function(scene) {
	for (var index = 0; index < this.scales.length; index++) {
		scene.scale(this.scales[index].sx, this.scales[index].sy, this.scales[index].sz);		
	};
	
	for (var index = 0; index < this.rotations.length; index++) {
		scene.rotate(this.rotations[index].angle, this.rotations[index].x, this.rotations[index].y, this.rotations[index].z);		
	};
	
	for (var index = 0; index < this.translations.length; index++) {
		scene.translate(this.translations[index].x, this.translations[index].y, this.translations[index].z);		
	};
}

Node.prototype.applyAppearances = function() {

}