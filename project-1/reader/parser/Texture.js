function Texture(reader, XMLElement) {
	this.TEXTURE_PATH = './textures/';
	this.reader = reader;
	// Parent Class
	BaseParserObject.call(this, reader);

	var xmlFile = XMLElement.getElementsByTagName('file')[0];
	var xmlAmplif_factor = XMLElement.getElementsByTagName('amplif_factor')[0];

	this.parseId(XMLElement);
	this.parseFile(xmlFile);
	this.parseAmplif_factor(xmlAmplif_factor);

}
Texture.prototype = Object.create(BaseParserObject.prototype);

Texture.prototype.parseAmplif_factor = function(XMLElement) {
	this.amplif_factor = this.getCoordinates(XMLElement, ['s', 't']);
}

Texture.prototype.parseFile = function(XMLElement) {
	this.file = this.TEXTURE_PATH + this.getString(XMLElement, 'path');
}

Texture.prototype.toCGF = function(scene) {
	var texture = new CGFtexture(scene, this.file);

	return texture;
}
