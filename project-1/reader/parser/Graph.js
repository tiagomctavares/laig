function Graph(parser, XMLElement) {
	this.reader = parser.reader;
	this.leaves = parser.leaves;

	var xmlRootNode = XMLElement.getElementsByTagName('ROOT')[0];
	var xmlNodes = XMLElement.getElementsByTagName('NODE');

	this.rootId = this.parseId(xmlRootNode);
	this.nodes = {};

	this.parseNodes(xmlNodes);
	this.buildGraphTree();

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

Graph.prototype.buildGraphTree = function() {
	this.graph = {};

	this.graph = this.nodes[this.rootId];
	this.buildDescendantsTree(this.graph);

	console.log(this.graph);
}

Graph.prototype.buildDescendantsTree = function(node) {

	var descendantsArray = node.descendants.slice(0);

	for (var i = 0; i < descendantsArray.length; i++) {
		
		if(this.nodes[descendantsArray[i]] == undefined)
			return;

		node.descendants[i] = {};
		node.descendants[i] = this.nodes[descendantsArray[i]];
		this.buildDescendantsTree(node.descendants[i]);
	};
};