function Transformation(reader) {
	this.reader = reader;
}
Transformation.prototype = Object.create(BaseParserObject.prototype);

Transformation.prototype.parseNodeXML = function(XMLElementChilds) {
	console.log(XMLElementChilds);
}