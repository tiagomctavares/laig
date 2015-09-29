
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
	 
	this.reader.open('scenes/'+filename, this);  
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("LSX Loading finished.");

	var rootElement = this.reader.xmlDoc.documentElement;
	
	console.log(rootElement);

	var error = this.lerInitials(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};



/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.lerInitials= function(root) {
	
	var elems =  root.getElementsByTagName('INITIALS');
	if (elems == null) {
		return "INITIALS element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'INITIALS' element found.";
	}

	var nodeFrustum = elems[0].getElementsByTagName('frustum');

	var frustumNear =  this.reader.getFloat(nodeFrustum[0], 'near', true);
	this.verificaArray(frustumNear);

	var frustumFar =  this.reader.getFloat(nodeFrustum[0], 'far', true);
	this.verificaArray(frustumFar);
	this.scene.setFrustum(frustumNear, frustumFar);

	var translate = this.lerCoordenadasXYZ(elems[0], 'translate');
	this.verificaArray(translate, 'translate', elems[0].nodeName);

	
	var nodeRotate = elems[0].getElementsByTagName('rotation');
	var numRotates = nodeRotate.length;

	//eixos x, y, z (obrigatorios)
	var eixoLido = [false, false, false];
	var rotacoes = [];
	
	for(var i=0; i < numRotates; i++){
		var rotateAxis = this.reader.getItem(nodeRotate[i], 'axis', ['x', 'y', 'z']);
		var rotateAngle = this.reader.getFloat(nodeRotate[i], 'angle', true);

		if(rotateAxis == 'x' && !eixoLido[0]){
			eixoLido[0] = true;
			rotacoes[0] = rotateAngle;
		}

		else if(rotateAxis == 'y' && !eixoLido[1]){
			eixoLido[1] = true;
			rotacoes[1] = rotateAngle;
		}

		else if(rotateAxis == 'z' && !eixoLido[2]){
			eixoLido[2] = true;
			rotacoes[2] = rotateAngle;
		}
		else 
			console.warn("Eixo não válido");
		

	}

	if(!eixoLido[0] || !eixoLido[1] || !eixoLido[2])
		return "Pelo menos um dos eixos nao foi lido";


	var scale = this.lerCoordenadasEscalamento(elems[0], 'scale');
	this.verificaArray(scale, 'scale', elems[0].nodeName);

	var nodeReference = elems[0].getElementsByTagName('reference');

	var referenceLength = this.reader.getFloat(nodeReference[0], 'length', true);
	this.verificaArray(referenceLength);

	
	this.scene.setSceneScale(scale);
	this.scene.setSceneTranslate(translate);
	this.scene.setSceneRotation(rotacoes);

	console.log("Globals read from file: {background=" + frustumFar + ", drawmode=" + frustumNear + ", cullface=" + scale + ", cullorder=" + translate + "}");

/*	var tempList=rootElement.getElementsByTagName('list');

	if (tempList == null  || tempList.length==0) {
		return "list element is missing.";
	}
	
	this.list=[];
	// iterate over every element
	var nnodes=tempList[0].children.length;
	for (var i=0; i< nnodes; i++)
	{
		var e=tempList[0].children[i];

		// process each element and store its information
		this.list[e.id]=e.attributes.getNamedItem("coords").value;
		console.log("Read list item id "+ e.id+" with value "+this.list[e.id]);
	};
*/
};
	
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


