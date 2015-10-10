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

	this.transformations = [];
	/*this.translations = [];
	this.rotations = [];
	this.scales = [];*/

	this.material = this.parseId(xmlMaterial);
	this.texture = this.parseId(xmlTexture);

	// this.parseTransformations();
	/*this.parseRotations(xmlRotation);
	this.parseScales(xmlScale);
	this.parseTranslations(xmlTranslation);*/
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
	var counter = 0;
	for (var index = 0; index < children.length; index++) {
		if(children[index].tagName == this.transformationsTypes[0]) {
			this.transformations[counter] = this.parseRotation(children[index]);
			this.transformations[counter].type = this.transformationsTypes[0];
			counter++;
		}
		else if(children[index].tagName == this.transformationsTypes[1]) {
			this.transformations[counter] = this.parseTranslation(children[index]);
			this.transformations[counter].type = this.transformationsTypes[1];
			counter++;
		}
		else if(children[index].tagName == this.transformationsTypes[2]) {
			this.transformations[counter] = this.parseScale(children[index]);
			this.transformations[counter].type = this.transformationsTypes[2];
			counter++;
		}
	}
}

Node.prototype.parseRotation = function(XMLElement) {

	var rotation = {}
	rotation.x = rotation.y = rotation.z = 0
	var axis = this.getString(XMLElement, 'axis');
	rotation[axis] = 1;
	var degrees = this.getFloat(XMLElement, 'angle');
	rotation.angle = degrees*(pi/180.0);
	rotation.id = 'ROTATION';
	return rotation;
}

Node.prototype.parseScale = function(XMLElement) {
	var scale = this.getFloat(XMLElement, ['sx', 'sy', 'sz']);

	return scale;
}

Node.prototype.parseTranslation = function(XMLElement) {
	var transformation = this.getCoordinates(XMLElement);
	return transformation;
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
	}

	sceneGraph.scene.popMatrix();
}

Node.prototype.applyTransformations = function(scene) {
	for (var index = 0; index < this.transformations.length; index++) {
		var transformation = this.transformations[index];

		if(transformation.type == this.transformationsTypes[0]) {
			scene.rotate(transformation.angle, transformation.x, transformation.y, transformation.z);
		}
		else if(transformation.type == this.transformationsTypes[1]) {
			scene.translate(transformation.x, transformation.y, transformation.z);	
		}
		else if(transformation.type == this.transformationsTypes[2]) {
			scene.scale(transformation.sx, transformation.sy, transformation.sz);		
		}
	}
}

Node.prototype.applyAppearances = function() {

}