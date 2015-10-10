function Graph(SceneGraph) { 
	this.sceneGraph = SceneGraph;
	this.graph = {};
	// this.buildGraphTree();
}

Graph.prototype.buildGraphTree = function() {
	this.graph.root = this.scene.nodes[this.scene.rootId];
	this.buildDescendantsTree(this.graph.root);
	
	console.log(this.graph);

	this.debug(this.graph.root);
}

Graph.prototype.buildDescendantsTree = function(node) {
	var descendantsArray = node.descendants.slice(0);
	// console.log(descendantsArray, descendantsArray instanceof Node);
	

	for (var i = 0; i < descendantsArray.length; i++) {
		node.descendants[i] = [];
		
		// Already parsed this descendant just save reference
		/*if(descendantsArray[i] instanceof Node) {
			node.descendants[i] = descendantsArray[i];
			return ;
		}*/

		// If can't find the node it's a leaf
		if(this.scene.nodes[descendantsArray[i]] === undefined) {
			// console.log(node.id, i, descendantsArray, this.scene.leaves[descendantsArray[i]]);
			node.descendants[i] = this.scene.leaves[descendantsArray[i]];
			return ;
		}

		var cloneNode = this.scene.nodes[descendantsArray[i]];
		node.descendants[i] = cloneNode;
		this.buildDescendantsTree(node.descendants[i]);
	}
}

Graph.prototype.display = function() {
	this.sceneGraph.nodes[this.sceneGraph.rootId].display(this.sceneGraph);
}

Graph.prototype.debug = function(node) {
	if(node !== undefined && node.descendants !== undefined)
		for (var i = 0; i < node.descendants.length; i++) {
			if(node.descendants[i].id === undefined)
				console.log(node.descendants[i]);
			else
				console.log(node.descendants[i].id);
			this.debug(node.descendants[i]);
		};
}
