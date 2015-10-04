function Material(reader, XMLElement) {
	this.reader = reader;
	// Parent Class
	BaseParser.call(this, reader);

	var colorElements = ['specular', 'diffuse', 'ambient', 'emission'];
	var singleValueElements = ['shininess'];

	this.parseId(XMLElement);
	this.parseSingleValueElements(XMLElement, singleValueElements);
	this.parseColorElements(XMLElement, colorElements);
}
Material.prototype = Object.create(BaseParser.prototype);

Material.prototype.parseColorElements = function(XMLElement, colorElements) {

	for (var index = 0; index < colorElements.length; ++index) {
		var tagName = colorElements[index];

		var childElement = XMLElement.getElementsByTagName(tagName)[0];

		this[tagName] = this.getColor(childElement);
	}
};

Material.prototype.parseSingleValueElements = function(XMLElement, singleValueElements) {
	
	for (var index = 0; index < singleValueElements.length; ++index) {

		var tagName = singleValueElements[index];
		
		var childElement = XMLElement.getElementsByTagName(tagName)[0];
		this[tagName] = this.getFloat(childElement, 'value');
	}
};


Material.prototype.toCGF = function(MyCGFapperance) {

	MyCGFapperance.setAmbient(this.ambient.r, this.ambient.g, this.ambient.b, this.ambient.a);
	MyCGFapperance.setDiffuse(this.diffuse.r, this.diffuse.g, this.diffuse.b, this.diffuse.a);
	MyCGFapperance.setSpecular(this.specular.r, this.specular.g, this.specular.b, this.specular.a);
	MyCGFapperance.setEmission(this.emission.r, this.emission.g, this.emission.b, this.emission.a);
	MyCGFapperance.setShininess(this.shininess);

	return MyCGFapperance;
}
