function Node(reader, XMLElement) {
	this.reader = reader;
	var xmlMaterial = XMLElement.getElementsByTagName('MATERIAL')[0];
	var xmlTexture = XMLElement.getElementsByTagName('TEXTURE')[0];
	var xmlTranslation = XMLElement.getElementsByTagName('TRANSLATION');
	var xmlRotation = XMLElement.getElementsByTagName('ROTATION');
	var xmlScale = XMLElement.getElementsByTagName('SCALE');
	var xmlDescendants = XMLElement.getElementsByTagName('DESCENDANTS')[0];
	xmlDescendants = xmlDescendants.getElementsByTagName('DESCENDANT');

	this.id = this.parseId(XMLElement);

	this.translations = {};
	this.rotations = {};
	this.scales = {};

	this.material = this.parseId(xmlMaterial);
	this.texture = this.parseId(xmlTexture);

	this.parseRotations(xmlRotation);
	this.parseScales(xmlScale);
	this.parseTranslations(xmlTranslation);

	this.parseDescendants(xmlDescendants);

	// Parent Class
	BaseParserObject.call(this, reader);
}
Node.prototype = Object.create(BaseParserObject.prototype);

Node.prototype.parse = function(first_argument) {

};

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
		this.rotations[i].axis = this.getString(XMLElements[i], 'axis');
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