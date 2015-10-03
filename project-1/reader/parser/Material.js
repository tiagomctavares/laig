function Material(reader, XMLElement) {
	this.reader = reader;
	var colorElements = ['specular', 'diffuse', 'ambient', 'emission'];
	var singleValueElements = ['shininess'];

	this.parseId(XMLElement);
	this.parseSingleValueElements(XMLElement, singleValueElements);
	this.parseColorElements(XMLElement, colorElements);

	// Parent Class
	BaseParser.call(this, reader);
}
Material.prototype = Object.create(BaseParser.prototype);

Material.prototype.parseColorElements = function(XMLElement, colorElements) {

	for (var index = 0; index < colorElements.length; ++index) {
		var tagName = colorElements[index];

		var childElement = XMLElement.getElementsByTagName(tagName)[0];

		this[tagName] = new RGBA(this.reader, childElement);
	}
};

Material.prototype.parseSingleValueElements = function(XMLElement, singleValueElements) {
	
	for (var index = 0; index < singleValueElements.length; ++index) {

		var tagName = singleValueElements[index];
		
		var childElement = XMLElement.getElementsByTagName(tagName)[0];
		this[tagName] = this.getFloat(childElement, 'value');
	}
};


Material.prototype.toCGFapperance = function(MyCGFapperance) {

	MyCGFapperance.setAmbient(this.ambient.red, this.ambient.green, this.ambient.blue, this.ambient.alpha);
	MyCGFapperance.setDiffuse(this.diffuse.red, this.diffuse.green, this.diffuse.blue, this.diffuse.alpha);
	MyCGFapperance.setSpecular(this.specular.red, this.specular.green, this.specular.blue, this.specular.alpha);
	MyCGFapperance.setEmission(this.emission.red, this.emission.green, this.emission.blue, this.emission.alpha);
	MyCGFapperance.setShininess(this.shininess);

	return MyCGFapperance;
}
