function Light(reader, XMLElement) {
	this.reader = reader;
	// Parent Class
	BaseParser.call(this, reader);

	var colorElements = ['ambient', 'diffuse', 'specular'];
	var singleValueElements = ['enable'];

	this.parseId(XMLElement);
	this.parseSingleValueElements(XMLElement, singleValueElements);
	this.parsePosition(XMLElement);
	this.parseColorElements(XMLElement, colorElements);
}
Light.prototype = Object.create(BaseParser.prototype);

Light.prototype.parsePosition = function(XMLElement) {
	this.position = this.getCoordinates(XMLElement, ['x', 'y', 'z', 'w']);
}

Light.prototype.toCGF = function(scene) {
	var light = new CGFlight(scene, this.id);

	light.setPosition(this.position.x, this.position.y, this.position.z, this.position.w);
	light.setAmbient(this.ambient.r, this.ambient.g, this.ambient.b, this.ambient.a);
	light.setDiffuse(this.diffuse.r, this.diffuse.g, this.diffuse.b, this.diffuse.a);
	light.setSpecular(this.specular.r, this.specular.g, this.specular.b, this.specular.a);
	
	if(this.enable)
		light.enable();
	else
		light.disable();

	return light;
}
