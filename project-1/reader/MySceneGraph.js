
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
	 
	this.reader.open('scenes/'+filename, this);  
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("LSX Loading finished.");

	var parser = new Parser(this.reader, this.scene);
	this.lights = parser.lights;
	this.textures = parser.textures;
	this.materials = parser.materials;

	this.leaves = parser.leaves;
	this.nodes = parser.nodes;

	this.rootNode = this.nodes[parser.rootId];

	console.log('Done!');

	this.scene.initLights(this.lights);
		
	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};

////////////////////////////////////////////////

MySceneGraph.prototype.display= function()
{

	//como é um map, este leaf contem apenas a chave
	this.rootNode.display(this);

	/*for(var leaf in this.leaves){
		this.leaves[leaf].display();	
	}*/
};
////////////////////////////////////////////////

	
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
		this.scene.pushTexture(this.textures[textureId]);
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