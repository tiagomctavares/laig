function Texture(reader, scene, XMLElement, texturePath) {

	this.TEXTURE_PATH = texturePath;
	this.reader = reader;
	// Parent Class
	BaseParserObject.call(this, reader);

	var xmlFile = XMLElement.getElementsByTagName('file')[0];
	var xmlAmplif_factor = XMLElement.getElementsByTagName('amplif_factor')[0];

	this.id = this.parseId(XMLElement);
	this.parseFile(xmlFile);
	this.parseAmplif_factor(xmlAmplif_factor);
	this.texture = new CGFtexture(scene, this.file);
	this.texture.id = this.id;
}

Texture.prototype = Object.create(BaseParserObject.prototype);

Texture.prototype.parseAmplif_factor = function(XMLElement) {
	this.amplif_factor = this.getCoordinates(XMLElement, ['s', 't']);
}

Texture.prototype.parseFile = function(XMLElement) {
	this.file = this.TEXTURE_PATH + this.getString(XMLElement, 'path');
}