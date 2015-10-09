function Graph(parser, XMLElement) {
	this.reader = parser.reader;

	var xmlRootNode = XMLElement.getElementsByTagName('ROOT')[0];
	var xmlNodes = XMLElement.getElementsByTagName('NODE');

	this.rootId = this.parseId(xmlRootNode);
	this.nodes = {};

	this.parseNodes(xmlNodes);

	// Parent Class
	BaseParserObject.call(this, this.reader);
}
Graph.prototype = Object.create(BaseParserObject.prototype);

Graph.prototype.parseNodes = function(XMLElements) {
	for (var i = 0; i < XMLElements.length; i++) {
		var elementId = this.parseId(XMLElements[i]);
		this.nodes[elementId] = new Node(this.reader, XMLElements[i]);
	}
};