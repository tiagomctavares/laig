
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

	var rootElement = this.reader.xmlDoc.documentElement;
	
	console.log(rootElement);

	var error = this.lerInitials(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	var error = this.lerIlumination(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	var node = rootElement.getElementsByTagName('LIGHTS');

	error = this.lerLights(node[0]);
	
	if (error != null) {
   		this.onXMLError(error);
    	return;
	}

	var node = rootElement.getElementsByTagName('MATERIALS');

	error = this.lerMaterial(node[0]);
	
	if (error != null) {
   		this.onXMLError(error);
    	return;
	}

	var node = rootElement.getElementsByTagName('TEXTURES');

	error = this.lerTexture(node[0]);
	
	if (error != null) {
   		this.onXMLError(error);
    	return;
	}

	var node = rootElement.getElementsByTagName('LEAVES');

	error = this.lerLeaf(node[0])
	
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


MySceneGraph.prototype.lerIlumination = function(root) {

	var elems = root.getElementsByTagName('ILUMINATION');

	if(elems == null) {
		return "ILUMINATION element is missing.";
	}

	if(elems.length != 1) {
		return "either zero or more than one 'ILUMINATION' element found.";
	}

	var ambient = this.lerCoordenadasRGBA(elems[0], 'ambient');
	this.verificaArray(ambient, 'ambient', elems[0].nodeName);

	var nodeDoubleside = elems[0].getElementsByTagName('doubleside');
	var doubleside = this.reader.getBoolean(nodeDoubleside[0],'value', true);

	if(doubleside == null)
		return "Valor do doubleside:" + doubleside + " não é válido."; 

	var background = this.lerCoordenadasRGBA(elems[0], 'background');
	this.verificaArray(background, 'background', elems[0].nodeName);

	this.scene.setBackground(background);
	this.scene.setDoubleside(doubleside);
	this.scene.setAmbient(ambient);

};

MySceneGraph.prototype.lerInitials = function(root) {
	
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

return null;
};

MySceneGraph.prototype.lerLight = function(root, id){

	//falta verificar o numero de luzes em cena (nao podem ser mais de 8)

	var elems = root.getElementsByTagName('LIGHTS');

	if(elems == null) {
		return "LIGHTS element is missing.";
	}

	if(elems.length != 1) {
		return "either zero or more than one 'LIGHTS' element found.";
	}

	var nodeEnable = elems[0].getElementsByTagName('enable');
	var enable = this.reader.getBoolean(nodeEnable[0],'value', true);

	if(enable == null)
		return "Valor de enable:" + enable + " não válido."; 
	
	var position = this.lerCoordenadasXYZW(elems[0], 'position');
	this.verificaArray(position, 'position', elems[0].nodeName);

	var ambient = this.lerCoordenadasRGBA(elems[0], 'ambient');
	this.verificaArray(ambient, 'ambient', elems[0].nodeName);

	var diffuse = this.lerCoordenadasRGBA(elems[0], 'diffuse');
	this.verificaArray(diffuse, 'diffuse', elems[0].nodeName);
	
	var specular = this.lerCoordenadasRGBA(elems[0], 'specular');
	this.verificaArray(specular, 'specular', elems[0].nodeName);

	this.lights[id] = this.scene.arrayLights(enable, position, ambient, diffuse, specular);

	return null;

/*
	this.scene.setScenePosition(position);
	this.scene.setSceneAmbient(ambient);
	this.scene.setSceneDiffuse(diffuse);
	this.scene.setSceneSpecular(specular);
*/
	
};

MySceneGraph.prototype.lerLights = function (root){

	return this.lerArray(root, 'LIGHTS', this.lerLight);
};


MySceneGraph.prototype.lerMaterial = function(root, id){

	var elems = root.getElementsByTagName('MATERIALS');

	if(elems == null) {
		return "MATERIALS element is missing.";
	}

	if(elems.length != 1) {
		return "either zero or more than one 'MATERIALS' element found.";
	}

	var nodeShininess = elems[0].getElementsByTagName('shininess');
	var shininess = this.reader.getBoolean(nodeEnable[0],'value', true);

	if(shininess == null)
		return "Valor de enable:" + shininess + " não válido.";

	var specular = this.lerCoordenadasRGBA(elems[0], 'specular');
	this.verificaArray(specular, 'specular', elems[0].nodeName);

	var diffuse = this.lerCoordenadasRGBA(elems[0], 'diffuse');
	this.verificaArray(diffuse, 'diffuse', elems[0].nodeName);

	var ambient = this.lerCoordenadasRGBA(elems[0], 'ambient');
	this.verificaArray(ambient, 'ambient', elems[0].nodeName);

	var emission = this.lerCoordenadasRGBA(elems[0], 'emission');
	this.verificaArray(emission, 'emission', elems[0].nodeName);

/*
	this.scene.setSceneSpecular(specular);
	this.scene.setScenediffuse(diffuse);
	this.scene.setSceneAmbient(ambient);
	this.scene.setSceneEmission(emission);
*/

	var myMaterial = new CGFappearance(this.scene);

	myMaterial.setAmbient(ambient[0], ambient[1], ambient[2], ambient[3]);
	myMaterial.setDiffuse(diffuse[0], diffuse[1], diffuse[2], diffuse[3]);
	myMaterial.setSpecular(specular[0], specular[1], specular[2], specular[3]);
	myMaterial.setEmission(emission[0], emission[1], emission[2], emission[3]);
	myMaterial.setShininess(shininess);

	this.materials[id] = new Material;

};

MySceneGraph.prototype.lerMaterials = function (root){

	return this.lerArray(root, 'MATERIALS', this.lerMaterial);
		
};

MySceneGraph.prototype.lerTexture = function(root, id){

	var elems = root.getElementsByTagName('TEXTURES');

	if(elems == null) {
		return "TEXTURES element is missing.";
	}

	if(elems.length != 1) {
		return "either zero or more than one 'TEXTURES' element found.";
	}

	var nodeFile = elems[0].getElementsByTagName('file');

	var filePath =  this.reader.getString(nodeFile[0], 'path', true);
	this.verificaArray(filePath);

	var nodeFactor = elems[0].getElementsByTagName('amplif_factor');

	var amplificaS = this.reader.getFloat(nodeFactor[0], 's', true);

	var amplificaT = this.reader.getFloat(nodeFactor[0], 't', true);

	this.textures[id] = [filePath, amplificaS, amplificaT];

	return null;
};

MySceneGraph.prototype.lerTextures = function (root){
	return this.lerArray(root, 'TEXTURES', this.lerTexture);
		
};

MySceneGraph.prototype.lerLeaf = function(root, id){

	var elems = root.getElementsByTagName('LEAVES');

	if(elems == null) {
		return "LEAVES element is missing.";
	}

	if(elems.length != 1) {
		return "either zero or more than one 'LEAVES' element found.";
	}

	var nodeLeaf = elems[0].getElementsByTagName('leaf');

	var leafType =  this.reader.getFloat(nodeLeaf[0], 'type', true);
	this.verificaArray(leafType);

	//var leafArgs =  this.reader.getFloat(nodeLeaf[0], 'args', true);
	//this.verificaArray(leafArgs);
	

};

MySceneGraph.prototype.lerLeaves = function (root){

		return this.lerArray(root, 'LEAVES', this.lerLeaf);
};

MySceneGraph.prototype.lerArray = function(root, nodeName, func){

	//root -> apontador para uma estrutura que contém uma lista de tags (ex: <LIGHTS></LIGHTS><MATERIALS></MATERIALS>)
	//nodeName -> tags lá dentro com o mesmo nome
	//func -> apontador para a função que processa cada elemento da lista

	
	for(var i = 0; i < root.children.length; i++){

		//aceder aos elementos da lista
		var elemento = root.children[i];

		if( elemento.nodeName != nodeName)
			console.warn("tá mal, mas passa xD");
			continue;
		
		//ler id respectivos
		var id = this.reader.getString(elemento, 'id', false);

		if(id == null)
			console.warn("atributo id: " + id + "nao encontrado.");
			continue;
		

		var ret = func.call(this, id, elemento);

		if(ret != null)
			this.onXMLError(ret);
	}

return null;

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


