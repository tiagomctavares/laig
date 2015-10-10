function Node(reader) {
	this.reader = reader;
	this.transformationsTypes = ['ROTATION', 'TRANSLATION', 'SCALE'];

	// Parent Class
	BaseParserObject.call(this, reader);
}
Node.prototype = Object.create(BaseParserObject.prototype);

Node.prototype.parseXML = function(XMLElement) {
	var xmlMaterial = XMLElement.getElementsByTagName('MATERIAL')[0];
	var xmlTexture = XMLElement.getElementsByTagName('TEXTURE')[0];
	/*var xmlTranslation = XMLElement.getElementsByTagName('TRANSLATION');
	var xmlRotation = XMLElement.getElementsByTagName('ROTATION');
	var xmlScale = XMLElement.getElementsByTagName('SCALE');*/
	var xmlDescendants = XMLElement.getElementsByTagName('DESCENDANTS')[0];
	xmlDescendants = xmlDescendants.getElementsByTagName('DESCENDANT');

	this.id = this.parseId(XMLElement);

	this.transformations = mat4.create();
	mat4.identity(this.transformations);

	this.material = this.parseId(xmlMaterial);
	this.texture = this.parseId(xmlTexture);
	this.parseTransformations(XMLElement);

	this.parseDescendants(xmlDescendants);
}

Node.prototype.parseDescendants = function(XMLElements) {
	this.descendants = [];
	for (var i = 0; i < XMLElements.length; i++) {
			this.descendants[i] = this.parseId(XMLElements[i]);
	}
};

Node.prototype.parseTransformations = function(XMLElement) {
	var children = XMLElement.children;

	for (var index = 0; index < children.length; index++) {
		if(children[index].tagName == this.transformationsTypes[0]) {
			this.parseRotation(children[index]);
		}
		else if(children[index].tagName == this.transformationsTypes[1]) {
			this.parseTranslation(children[index]);
		}
		else if(children[index].tagName == this.transformationsTypes[2]) {
			this.parseScale(children[index]);
		}
	}
}

Node.prototype.parseRotation = function(XMLElement) {

	var rotation = {}
	rotation.x = rotation.y = rotation.z = 0
	var axis = this.getString(XMLElement, 'axis');
	rotation[axis] = 1;

	var degrees = this.getFloat(XMLElement, 'angle');
	rotation.angle = degrees*Math.PI/180.0;

	mat4.rotate(this.transformations, rotation.angle, [rotation.x, rotation.y, rotation.z], this.transformations);
}

Node.prototype.parseScale = function(XMLElement) {
	var scale = this.getFloat(XMLElement, ['sx', 'sy', 'sz']);
	mat4.scale(this.transformations, [scale.sx, scale.sy, scale.sz], this.transformations);
}

Node.prototype.parseTranslation = function(XMLElement) {
	var transformation = this.getCoordinates(XMLElement);
	var oldMatrix = this.transformations;
	mat4.translate(oldMatrix, [transformation.x, transformation.y, transformation.z], this.transformations);
}

Node.prototype.display = function(sceneGraph) {

	sceneGraph.scene.pushMatrix();

	this.applyTransformations(sceneGraph.scene);
	this.applyAppearances();

	console.log('drawing: ' + this.id);

	for (var i = 0; i < this.descendants.length; i++) {
		var descendantId = this.descendants[i];

		if(sceneGraph.nodes[descendantId] === undefined)
			sceneGraph.leaves[descendantId].display(sceneGraph);
		else
			sceneGraph.nodes[descendantId].display(sceneGraph);
	}

	sceneGraph.scene.popMatrix();
}

Node.prototype.applyTransformations = function(scene) {
	scene.multMatrix(this.transformations);
}

Node.prototype.applyAppearances = function() {

}