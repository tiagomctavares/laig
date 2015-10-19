function Node(reader) {
	this.reader = reader;
	this.transformationsTypes = ['ROTATION', 'TRANSLATION', 'SCALE'];

	// Parent Class
	BaseParserObject.call(this, reader);
}
Node.prototype = Object.create(BaseParserObject.prototype);

Node.prototype.parse = function(XMLElement) {
	var xmlMaterial = XMLElement.getElementsByTagName('MATERIAL')[0];
	var xmlTexture = XMLElement.getElementsByTagName('TEXTURE')[0];

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

	mat4.rotate(this.transformations, this.transformations, rotation.angle, [rotation.x, rotation.y, rotation.z]);
}

Node.prototype.parseScale = function(XMLElement) {
	var scale = this.getFloat(XMLElement, ['sx', 'sy', 'sz']);
	mat4.scale(this.transformations, this.transformations, [scale.sx, scale.sy, scale.sz]);
}

Node.prototype.parseTranslation = function(XMLElement) {
	var transformation = this.getCoordinates(XMLElement);
	this.translate = mat4.translate(this.transformations, this.transformations, [transformation.x, transformation.y, transformation.z]);
}

Node.prototype.display = function(sceneGraph) {	

	this.applyTransformations(sceneGraph.scene);
	this.applyAppearance(sceneGraph);

	for (var i = 0; i < this.descendants.length; i++) {

		var descendantId = this.descendants[i];

		if (descendantId in sceneGraph.leaves) {

			// Updates scene to proper appearance
			sceneGraph.updateAppearance();
			if (this.texture != 'null' && this.texture != 'clear') {
				var thisTexture = sceneGraph.textures[this.texture];
				sceneGraph.leaves[descendantId].updateTexCoords(thisTexture.amplif_factor.s, thisTexture.amplif_factor.t);
			}
			sceneGraph.leaves[descendantId].display(sceneGraph);
		}
		else if(descendantId in sceneGraph.nodes) {
			sceneGraph.nodes[descendantId].display(sceneGraph);
		}
	}

	this.removeAppearance(sceneGraph);
	sceneGraph.scene.popMatrix();
}

Node.prototype.applyTransformations = function(scene) {
	scene.multMatrix(this.transformations);
}

Node.prototype.applyAppearance = function(sceneGraph) {

	if(this.material != 'null')
		sceneGraph.applyMaterial(this.material);

	if(this.texture != 'null')
		if(this.texture == 'clear')
			sceneGraph.applyTexture(null);
		else
			sceneGraph.applyTexture(this.texture);
}

Node.prototype.removeAppearance = function(sceneGraph) {
	if(this.material != 'null')
		sceneGraph.removeMaterial();

	if(this.texture != 'null')
		sceneGraph.removeTexture();
}

Node.prototype.getMaterialId = function() {

	if(this.material != 'null')
		return this.material;
	
	return undefined;
};

Node.prototype.getTextureId = function() {

	if(this.texture != 'null')
		if(this.texture == 'clear')
			return null;
		else
			return this.texture;

	return undefined;
}