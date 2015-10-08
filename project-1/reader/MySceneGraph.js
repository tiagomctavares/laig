
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

	console.log('Done!');
	
	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};

////////////////////////////////////////////////

MySceneGraph.prototype.display= function(){

	//como é um map, este leaf contem apenas a chave

	for(var leaf in this.leaves){
			this.leaves[leaf].display();
	}
};
////////////////////////////////////////////////

	
/*
 * Callback to be executed on any read error
 */


MySceneGraph.prototype.lerCoordenadas = function(root, atrib, c1, c2, c3, c4){
	
	//todas as tags com nome: atrib
	var node = root.getElementsByTagName(atrib);

	//nao foi encontrado nenhuma tag com o nome atrib
	if(node == null || node.length == 0){
		return null;
	}

	var x = this.reader.getFloat(node[0], c1, true);
	
	if(x != x || x == null)
		return NaN;
	
	var y = this.reader.getFloat(node[0], c2, true);
	
	if(y != y || y == null)
		return NaN;
	
	var z = this.reader.getFloat(node[0], c3, true);
	
	if(z != z || z == null)
		return NaN;

	//verificar se as coordenadas sao validas

	if(arguments.length == 6){

		var w = this.reader.getFloat(node[0], c4, true);

		if(w != w || w == null)
			return NaN;
		
		return [x, y, z, w];

	}

	return [x, y, z];

};

MySceneGraph.prototype.lerCoordenadasXYZW = function(root, atrib)
{
	return this.lerCoordenadas(root, atrib, 'x', 'y', 'z', 'w');
};

MySceneGraph.prototype.lerCoordenadasRGBA = function(root, atrib)
{
 	return this.lerCoordenadas(root, atrib, 'r', 'g', 'b', 'a');
};

MySceneGraph.prototype.lerCoordenadasXYZ = function(root, atrib)
{
	return this.lerCoordenadas(root, atrib, 'x', 'y', 'z');
};

MySceneGraph.prototype.lerCoordenadasEscalamento = function(root, atrib)
{
	return this.lerCoordenadas(root, atrib, 'sx', 'sy', 'sz');
};

MySceneGraph.prototype.verificaArray = function(valor, atrib, pai, id)
{
	if(valor == null){

		if(id == undefined)
			console.warn("o atributo " + atrib + " de  <" + pai + "> nao foi encontrado");
		else
			console.warn("o atributo " + atrib + " da " + pai + " com id=" + id + " nao foi encontrado");
	}

	else if(valor != valor){

		if(id == undefined)
			console.warn("o atributo " + atrib + " de  <" + pai + "> nao é valido");
		else
			console.warn("o atributo " + atrib + " da " + pai + " com id=" + id + "nao é valido");

	}	

};



 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


