function Illumination(reader) {
	this.reader = reader;
	// Parent Class
	BaseParserObject.call(this, reader);
}
Illumination.prototype = Object.create(BaseParserObject.prototype);

Illumination.prototype.parse = function(XMLElement) {

	var colorElements = ['ambient', 'background'];
	
	this.parseColorElements(XMLElement, colorElements);

};

Illumination.prototype.toCGF = function(scene) {
	scene.setBackground(this.getColorArray(this.background));
	scene.setAmbient(this.getColorArray(this.ambient));
	return scene;
}
