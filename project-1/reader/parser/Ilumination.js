function Ilumination(reader, XMLElement) {
	this.reader = reader;
	// Parent Class
	BaseParser.call(this, reader);

	var colorElements = ['ambient', 'background'];
	
	this.parseColorElements(XMLElement, colorElements);
}
Ilumination.prototype = Object.create(BaseParser.prototype);

Ilumination.prototype.toCGF = function(scene) {
	scene.setBackground(this.getColorArray(this.background));
	scene.setAmbient(this.getColorArray(this.ambient));
	return scene;
}
