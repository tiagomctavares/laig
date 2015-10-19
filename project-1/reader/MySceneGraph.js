
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;

		
	// File reading 
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */

	this.lights = {};
	this.textures = {};
	this.materials = {};
	this.leaves = {};

	this.materialDefault = new CGFappearance(this.scene);

	this.materialDefault.setAmbient(0.5,0.5,0.5,1);
	this.materialDefault.setDiffuse(0.5,0.5,0.5,1);
	this.materialDefault.setSpecular(0.5,0.5,0.5,1);
	 
	var lsxFile = 'scenes/'+filename;

	this.reader.open(lsxFile, this); 

	//substring(a,b) retorna a string compreendida entre o índice a e o índice b da string original
	//lastIndexOf retorna o índice da última ocorrência do caracter
	
	this.texturePath = lsxFile.substring(0, lsxFile.lastIndexOf('/')) + '/';


}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("LSX Loading finished.");

	var parser = new Parser(this.reader, this.scene, this.texturePath);
	this.lights = parser.lights;
	this.textures = parser.textures;
	this.materials = parser.materials;

	this.leaves = parser.leaves;
	this.nodes = parser.nodes;

	//this.rootNode = this.nodes[parser.rootId];

	this.rootNode = parser.rootId;

	console.log('Done!');

	this.scene.initLights(this.lights);
		
	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();

	//var Parser = new Parser(this.reader, this.scene, this.texturePath);
};

////////////////////////////////////////////////


MySceneGraph.prototype.display  = function()
{
	var rootNode = this.nodes[this.rootNode];

	this.drawNode(rootNode, this.materialDefault, null);

	// console.log('finished');
};

MySceneGraph.prototype.getNodeMaterial = function(node, parentMaterial) {
	var materialId = node.getMaterialId();
	
	if(materialId === undefined)
		return parentMaterial;

	return this.materials[materialId];
};

MySceneGraph.prototype.getNodeTexture = function(node, parentTexture) {
	var textureId = node.getTextureId();
	
	if(textureId === undefined)
		return parentTexture;

	// Clear texture
	if(textureId === null)
		return null;

	return this.textures[textureId];
};

MySceneGraph.prototype.drawNode = function(node, material, texture) 
{
	// console.log(node.id);

	this.scene.pushMatrix();
	
	// Apply transformations in scene
	this.scene.multMatrix(node.transformations);

	// Get Actual Material and Texture
	var material = this.getNodeMaterial(node, material);
	var texture = this.getNodeTexture(node, texture);

	for (var i = 0; i < node.descendants.length; i++) {

		var descendantId = node.descendants[i];
		var isLeaf = (descendantId in this.leaves);

		if(isLeaf)
			this.drawLeaf(this.leaves[descendantId], material, texture);
		else
			this.drawNode(this.nodes[descendantId], material, texture);
	}

	this.scene.popMatrix();
}

MySceneGraph.prototype.drawLeaf = function(leaf, material, texture) {
	// Update leaf textCoords if texture is defined
	if(texture !== null) {
		leaf.updateTexCoords(texture.amplif_factor.s, texture.amplif_factor.t);
		// Set texture in apperance
		material.setTexture(texture.texture);
	} else
		material.setTexture(null);

	// console.log(texture, material);
	// Apply Appearance in scene
	this.scene.applyMaterial(material);

	// DrawLeaf in scene
	this.scene.drawLeaf(leaf);

};

////////////////////////////////////////////////
/*MySceneGraph.prototype.display2 = function() {

	var rootNode = this.nodes[this.rootNode];
	var rootMaterial = this.materialDefault;

	this.scene.pushMatrix();
	
	if (rootNode.material != null && rootNode.material != 'null') {
		rootMaterial = this.materials[rootNode.material];
	}

	if (rootNode.texture != null && rootNode.texture != 'null' && rootNode.texture != 'clear') {
		rootMaterial.setTexture(this.textures[rootNode.texture].tex);	
	}
	
	this.scene.applyMaterial(rootMaterial);
	this.processNodes(rootNode, rootNode.material, rootNode.texture);

	this.scene.popMatrix();
};

MySceneGraph.prototype.processNodes = function(node, materialId, textureId) {

	this.scene.multMatrix(node.transformations);

	for (var i = 0; i < node.descendants.length; i++) {			
		
		var nextId = node.descendants[i];
		var nextElement = null;
		var isLeaf = false;
		var mId = materialId;
		var tId = textureId;

		if (nextId in this.nodes) {
			nextElement = this.nodes[nextId];
		}	
		else if (nextId in this.leaves) {
			isLeaf = true;
			nextElement = this.leaves[nextId];			
		}
		else {
			continue;
		}

		if (isLeaf) {

			var leafMaterial = this.materialDefault;
			var leafTexture = null;

			if (mId != null && mId != 'null') {
				leafMaterial = this.materials[mId];
			}

			if (tId == null || tId == 'null') {
				leafMaterial.setTexture(null);
			}
			else {
				leafTexture = this.textures[tId];
				nextElement.updateTexCoords(leafTexture.amplif_factor.s, leafTexture.amplif_factor.t);
				leafMaterial.setTexture(leafTexture.texture);
			}

			this.scene.applyMaterial(leafMaterial);
			this.scene.drawLeaf(nextElement);
		}
		else {
			this.scene.pushMatrix();	
			this.processNodes(nextElement, this.getNodeMaterialId(mId, nextElement), this.getNodeTextureId(tId, nextElement));			
			this.scene.popMatrix();
		}		
	}
};

MySceneGraph.prototype.getNodeTextureId = function(currTextureId, nextElement) {

	if (nextElement.texture == 'null') {
		return currTextureId;
	}

	if (nextElement.texture == 'clear') {
		return null;
	}

	return nextElement.texture;
};

MySceneGraph.prototype.getNodeMaterialId = function(currMaterialId, nextElement) {

	if (nextElement.material == 'null') {
		return currMaterialId;
	}

	return nextElement.material;
};


*/
	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};
