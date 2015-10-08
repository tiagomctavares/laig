function Texture(reader, XMLElement) {
	this.reader = reader;
	// Parent Class
	BaseParser.call(this, reader);

	console.log('node');
	this.parseFile(XMLElement.getElementsByTagName('file'));
	this.parseAmplif_factor(XMLElement.getElementsByTagName('amplif_factor'));

}
Texture.prototype = Object.create(BaseParser.prototype);

Texture.prototype.parseAmplif_factor = function(XMLElement) {
	this.amplif_factor = this.getCoordinates(xmlAmplif_factor, ['s', 't']);
}

Texture.prototype.parseFile = function(XMLElement) {
	this.file = this.getString(XMLElement, 'path');
}

Texture.prototype.toCGF = function(scene) {


	return scene;
}
