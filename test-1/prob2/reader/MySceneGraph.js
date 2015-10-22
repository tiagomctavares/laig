/**
 * MySceneGraph
 * @param filename - lsx File para ler
 * @param {XMLscene} scene
 */
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
	this.rootNode = parser.rootId;

	console.log('Done!');

	this.scene.initLights(this.lights);
		
	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();

};

/**
 * Mostra o grafo lido do ficheiro lsx
 * @return {null}
 */
MySceneGraph.prototype.display  = function()
{
	var rootNode = this.nodes[this.rootNode];
	this.drawNode(rootNode, this.materialDefault, null);
};

/**
 * Le o material Id do Node e retorna o material respetivo, se não existir retorna o material anterior
 * @param node - o node a retirar o material Id
 * @param parentMaterial - o material lida do pai
 * @return {CGFAppearance}
 */
MySceneGraph.prototype.getNodeMaterial = function(node, parentMaterial) {
	//LAIGPROB2_inicio		
	var materialId = node.getMaterialId(this.scene.altMaterial);
	//LAIGPROB2_fim
	
	if(materialId === undefined)
		return parentMaterial;

	return this.materials[materialId];
};

/**
 * Le a textura Id do Node e retorna a textura respetiva, se não existir retorna o textura anterior
 * @param node - o node a retirar a texture Id
 * @param parentTexture - a textura lida do pai
 * @return {CGFTexture}
 */
MySceneGraph.prototype.getNodeTexture = function(node, parentTexture) {
	var textureId = node.getTextureId();
	
	if(textureId === undefined)
		return parentTexture;

	// Clear texture
	if(textureId === null)
		return null;

	return this.textures[textureId];
};

/**
 * Desenha o Nó e os seus descendentes
 * @param node - o nó a desenhar
 * @param material - o material usado nos nós pais
 * @param texture - o textura usada nos nós pais
 * @return {null}
 */
MySceneGraph.prototype.drawNode = function(node, material, texture) 
{
	this.scene.pushMatrix();
	
	// Apply transformations in scene
	this.scene.multMatrix(node.transformations);

	// Get Actual Material and Texture
	var material = this.getNodeMaterial(node, material);
	var texture = this.getNodeTexture(node, texture);

	for (var i = 0; i < node.descendants.length; i++) {

		var descendantId = node.descendants[i];

		if(this.leaves[descendantId] != undefined)
			this.drawLeaf(this.leaves[descendantId], material, texture);
		else
			this.drawNode(this.nodes[descendantId], material, texture);
	}

	this.scene.popMatrix();
}

/**
 * Desenha a folha
 * @param leaf - a folha a desenhar
 * @param material - material a aplicar
 * @param texture - textura a aplicar
 * @return {null}
 */
MySceneGraph.prototype.drawLeaf = function(leaf, material, texture) {
	// Update leaf textCoords if texture is defined
	if(texture !== null) {

		leaf.updateTexCoords(texture.amplif_factor.s, texture.amplif_factor.t);
	
		// Set texture in apperance
		material.setTexture(texture.texture);
	} else
		material.setTexture(null);

	// Apply Appearance in scene
	this.scene.applyMaterial(material);

	// DrawLeaf in scene
	this.scene.drawLeaf(leaf);

};
	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};
