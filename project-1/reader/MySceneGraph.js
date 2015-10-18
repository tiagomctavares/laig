
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
/*
MySceneGraph.prototype.display= function()
{

	//como é um map, este leaf contem apenas a chave
	this.rootNode.display(this);

	/*for(var leaf in this.leaves){
		this.leaves[leaf].display();	
	}*//*
};*/
////////////////////////////////////////////////

MySceneGraph.prototype.display = function() {

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
			this.processNodes(nextElement, this.getNodeMaterial(mId, nextElement), this.getNodeTexture(tId, nextElement));			
			this.scene.popMatrix();
		}		
	}
};

MySceneGraph.prototype.getNodeTexture = function(currTextureId, nextElement) {

	if (nextElement.texture == 'null') {
		return currTextureId;
	}

	if (nextElement.texture == 'clear') {
		return null;
	}

	return nextElement.texture;
};

MySceneGraph.prototype.getNodeMaterial = function(currMaterialId, nextElement) {

	if (nextElement.material == 'null') {
		return currMaterialId;
	}

	return nextElement.material;
};


	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};

MySceneGraph.prototype.applyTexture = function(textureId) {
	if(textureId === null)
		this.scene.pushTexture(null);
	else
		this.scene.pushTexture(this.textures[textureId].texture);
}

MySceneGraph.prototype.applyMaterial = function(materialId) {
	this.scene.pushAppearance(this.materials[materialId]);
}

MySceneGraph.prototype.removeMaterial = function() {
	this.scene.popAppearance();
}

MySceneGraph.prototype.removeTexture = function(materialId) {
	this.scene.popTexture();
}

MySceneGraph.prototype.updateAppearance = function() {
	this.scene.updateAppearance();
}