function Initials(reader, XMLElement) {
	this.reader = reader;

	var frustumElement = XMLElement.getElementsByTagName('frustum')[0];
	var referenceElement = XMLElement.getElementsByTagName('reference')[0];
	var translateElement = XMLElement.getElementsByTagName('translate')[0];
	var rotationElements = XMLElement.getElementsByTagName('rotation');
	var scaleElement = XMLElement.getElementsByTagName('scale')[0];

	this.parseFrustum(frustumElement);
	this.translate = this.getCoordinates(translateElement);
	this.parseRotations(rotationElements);
	this.parseScale(scaleElement);
	this.parseReference(referenceElement);

	// Parent Class
	BaseParserObject.call(this, reader);
}
Initials.prototype = Object.create(BaseParserObject.prototype);

Initials.prototype.parseFrustum = function(XMLElement) {
	this.frustum =  this.getFloat(XMLElement, ['near', 'far']);
}

Initials.prototype.parseRotations = function(XMLElements) {
	this.rotation = {};
	for (var i = 0; i < XMLElements.length; i++) {
		this.parseRotation(XMLElements[i]);
	};
}

Initials.prototype.parseRotation = function(XMLElement) {
	var axis = this.getString(XMLElement, 'axis');

	this.rotation[axis] = this.getFloat(XMLElement, 'angle');
}

Initials.prototype.parseScale = function(XMLElement) {
	this.scale = this.getFloat(XMLElement, ['sx', 'sy', 'sz']);
}

Initials.prototype.parseReference = function(XMLElement) {
	this.reference = this.getString(XMLElement, 'length');
}

Initials.prototype.getRotationArray = function() {
	return [this.rotation.x, this.rotation.y, this.rotation.z];
}

Initials.prototype.getTranslationArray = function() {
	return [this.translate.x, this.translate.y, this.translate.z];
}

Initials.prototype.getScaleArray = function() {
	return [this.scale.sx, this.scale.sy, this.scale.sz];
}

Initials.prototype.toCGF = function(scene) {

	scene.setFrustum(this.frustum.near, this.frustum.far);

	scene.setSceneScale(this.getScaleArray());
	scene.setSceneTranslate(this.getTranslationArray());
	scene.setSceneRotation(this.getRotationArray());

	return scene;
}
