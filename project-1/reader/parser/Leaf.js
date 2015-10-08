function Leaf(reader, XMLElement) {
	this.reader = reader;
	// Parent Class
	BaseParserObject.call(this, reader);

	var xmlFile = XMLElement.getElementsByTagName('file')[0];
	var xmlAmplif_factor = XMLElement.getElementsByTagName('amplif_factor')[0];

	this.parseId(XMLElement);
	this.parseFile(xmlFile);
	this.parseAmplif_factor(xmlAmplif_factor);

}
Leaf.prototype = Object.create(BaseParserObject.prototype);

Leaf.prototype.parseAmplif_factor = function(XMLElement) {
	this.amplif_factor = this.getCoordinates(XMLElement, ['s', 't']);
}

Leaf.prototype.parseFile = function(XMLElement) {
	this.file = this.getString(XMLElement, 'path');
}

Leaf.prototype.toCGF = function(scene) {
	var texture = new CGFtexture(scene, this.file);

	return texture;
}
