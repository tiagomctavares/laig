
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

	// Refactor code
	var xmlMaterials = node[0].getElementsByTagName('MATERIAL');

	for (var index = 0; index < xmlMaterials.length; ++index) {
		var material = new Material(this.reader, xmlMaterials[index]);
		this.materials[material.id] = material.toCGFapperance(new CGFappearance(this.scene));
	}

	console.log(this.materials);

	error = this.lerMaterials(node[0]);
	
	if (error != null) {
   		this.onXMLError(error);
    	return;
	}

	var node = rootElement.getElementsByTagName('TEXTURES');

	error = this.lerTextures(node[0]);
	
	if (error != null) {
   		this.onXMLError(error);
    	return;
	}

	var node = rootElement.getElementsByTagName('LEAVES');

	error = this.lerLeaves(node[0])
	
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

/*
	var nodeDoubleside = elems[0].getElementsByTagName('doubleside');
	var doubleside = this.reader.getBoolean(nodeDoubleside[0],'value', true);

	if(doubleside == null)
		return "Valor do doubleside:" + doubleside + " não é válido."; 
*/
	var background = this.lerCoordenadasRGBA(elems[0], 'background');
	this.verificaArray(background, 'background', elems[0].nodeName);

	this.scene.setBackground(background);
	//this.scene.setDoubleside(doubleside);
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
/*
	var elems = root.getElementsByTagName('LIGHTS');

	if(elems == null) {
		return "LIGHTS element is missing.";
	}

	if(elems.length != 1) {
		return "either zero or more than one 'LIGHTS' element found.";
	

	*/

	
	var nodeEnable = root.getElementsByTagName('enable');
	var enable = this.reader.getBoolean(nodeEnable[0],'value', true);

	if(enable == null)
		return "Valor de enable:" + enable + " não válido."; 
	
	var position = this.lerCoordenadasXYZW(root, 'position');
	this.verificaArray(position, 'position', root.nodeName);

	var ambient = this.lerCoordenadasRGBA(root, 'ambient');
	this.verificaArray(ambient, 'ambient', root.nodeName);

	var diffuse = this.lerCoordenadasRGBA(root, 'diffuse');
	this.verificaArray(diffuse, 'diffuse', root.nodeName);
	
	var specular = this.lerCoordenadasRGBA(root, 'specular');
	this.verificaArray(specular, 'specular', root.nodeName);

	

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


	return this.lerArray(root, 'LIGHT', this.lerLight);

};


MySceneGraph.prototype.lerMaterial = function(root, id){

	var nodeShininess = root.getElementsByTagName('shininess');
	var shininess = this.reader.getFloat(nodeShininess[0],'value', true);

	if(shininess == null)
		return "Valor de enable:" + shininess + " não válido.";

	var specular = this.lerCoordenadasRGBA(root, 'specular');
	this.verificaArray(specular, 'specular', root.nodeName);

	var diffuse = this.lerCoordenadasRGBA(root, 'diffuse');
	this.verificaArray(diffuse, 'diffuse', root.nodeName);

	var ambient = this.lerCoordenadasRGBA(root, 'ambient');
	this.verificaArray(ambient, 'ambient', root.nodeName);

	var emission = this.lerCoordenadasRGBA(root, 'emission');
	this.verificaArray(emission, 'emission', root.nodeName);

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

	this.materials[id] = myMaterial;

	return null;
};

MySceneGraph.prototype.lerMaterials = function (root){
	return this.lerArray(root, 'MATERIAL', this.lerMaterial);
		
};

MySceneGraph.prototype.lerTexture = function(root, id){

/*
	var elems = root.getElementsByTagName('TEXTURES');

	if(elems == null) {
		return "TEXTURES element is missing.";
	}

	if(elems.length != 1) {
		return "either zero or more than one 'TEXTURES' element found.";
	}
*/

	var nodeFile = root.getElementsByTagName('file');

	var filePath =  this.reader.getString(nodeFile[0], 'path', true);
	this.verificaArray(filePath);

	var nodeFactor = root.getElementsByTagName('amplif_factor');

	var amplificaS = this.reader.getFloat(nodeFactor[0], 's', true);

	var amplificaT = this.reader.getFloat(nodeFactor[0], 't', true);

	this.textures[id] = [filePath, amplificaS, amplificaT];

	return null;
};

MySceneGraph.prototype.lerTextures = function (root)
{
	return this.lerArray(root, 'TEXTURE', this.lerTexture);
};


MySceneGraph.prototype.lerLeaf = function(root, id){
/*
	var elems = root.getElementsByTagName('LEAVES');

	if(elems == null) {
		return "LEAVES element is missing.";
	}

	if(elems.length != 1) {
		return "either zero or more than one 'LEAVES' element found.";
	}
*/

	//var nodeLeaf = root.getElementsByTagName('leaf');

	var leafType =  this.reader.getString(root, 'type', true);
	this.verificaArray(leafType);

	var leafArgs =  this.reader.getString(root, 'args', true);
	this.verificaArray(leafArgs);

	var argArray = leafArgs.trim().split(' ');

	console.log(argArray);

	switch(leafType){
		case 'rectangle':
			this.criarRetangulo(id, argArray);
			break;

		case 'cylinder':
			this.criarCilindro(id, argArray);
			break;
		
		case 'sphere':
			this.criarEsfera(id, argArray);			
			break;

		case 'triangle':
			this.criarTriangulo(id, argArray);
			break;
		
		default:
			break;
	}
	
	return null;
};

MySceneGraph.prototype.lerLeaves = function (root){

		return this.lerArray(root, 'LEAF', this.lerLeaf);
};

MySceneGraph.prototype.criarRetangulo = function(id, args){

	if(args.length != 4)
		return "O numero de parametros para um retangulo não é valido.";
	
	var x1 = parseFloat(args[0]);
	var y1 = parseFloat(args[1]);

	if(x1 != x1 || y1 != y1)
		return "O valor de x1: " + x1 + "ou de y1: " + y1 + "não é valido.";

	var x2 = parseFloat(args[2]);
	var y2 = parseFloat(args[3]);

	if(x2 != x2 || y2 != y2)
		return "O valor de x2: " + x2 + "ou de y2: " + y2 + "não é valido.";

	this.leaves[id] = new MyQuad(this.scene, x1, y1, x2, y2);

	return null;

};

MySceneGraph.prototype.criarCilindro = function(id, args){

	if(args.length != 5)
		return "O numero de parametros para um cilindro não é valido";
	
	var altura = parseFloat(args[0]);
	var raio_base = parseFloat(args[1]);
	var raio_topo = parseFloat(args[2]);

	//separar

	if(altura != altura || raio_base != raio_base || raio_topo != raio_topo)
		return "O valor da altura: " + altura + "ou do raio_base" + raio_base + "ou do raio_topo" + raio_topo + "não é valido." ;


	var slices = parseInt(args[3]);
	var stacks = parseInt(args[4]);

	if(slices != slices || stacks != stacks)
		return "O valor das slices" + slices + "ou das stacks" + stacks + "não é valido." ;

	this.leaves[id] = new MyCylinder(this.scene, altura, raio_base, raio_topo, slices, stacks);

	return null;	

};

MySceneGraph.prototype.criarEsfera = function(id, args){

	if(args.length != 3)
		return "O numero de parametros para uma esfera não é valido";
	
	var raio = parseFloat(args[0]);
	var slices = parseInt(args[1]);
	var stacks = parseInt(args[2]);

	if(raio != raio || slices != slices || stacks != stacks)
		return "O valor do raio: " + raio + "ou das slices" + slices + "ou das stacks" + stacks + "não é valido." ;

	
	this.leaves[id] = new MySphere(this.scene, raio, slices, stacks);
	
	return null;

};

MySceneGraph.prototype.criarTriangulo = function(id, args){

	if(args.length != 9)
		return "O numero de parametros para um triangulo não é valido";
	
	var x1 = parseFloat(args[0]);
	var y1 = parseFloat(args[1]);
	var z1 = parseFloat(args[2]);

	if(x1 != x1 || y1 != y1 || z1 != z1)
		return "O valor de x1: " + x1 + "ou de y1: " + y1 + "ou de z1: " + z1 + "não é valido.";

	var x2 = parseFloat(args[3]);
	var y2 = parseFloat(args[4]);
	var z2 = parseFloat(args[5]);

	if(x2 != x2 || y2 != y2 || z2 != z2)
		return "O valor de x2: " + x2 + "ou de y2: " + y2 + "ou de z2: " + z2 + "não é valido.";

	var x3 = parseFloat(args[6]);
	var y3 = parseFloat(args[7]);
	var z3 = parseFloat(args[8]);

	if(x3 != x3 || y3 != y3 || z3 != z3)
		return "O valor de x3: " + x3 + "ou de y3: " + y3 + "ou de z3: " + z3 + "não é valido.";

	v1 = [x1, y1, z1];
	v2 = [x2, y2, z2];
	v3 = [x3, y3, z3];

	this.leaves[id] = new MyTriangle(this.scene, v1, v2, v3);

	return null;	

};


MySceneGraph.prototype.lerArray = function(root, nodeName, func){

	//root -> apontador para uma estrutura que contém uma lista de tags (ex: <LIGHTS></LIGHTS><MATERIALS></MATERIALS>)
	//nodeName -> tags lá dentro com o mesmo nome
	//func -> apontador para a função que processa cada elemento da lista

	
	for(var i = 0; i < root.children.length; i++){

		//aceder aos elementos da lista
		var elemento = root.children[i];

		if( elemento.nodeName != nodeName){
			console.warn("Está mal, mas passa xD");
			continue;
		}
		
		//ler id respectivos
		var id = this.reader.getString(elemento, 'id', false);

		if(id == null){
			console.warn("atributo id: " + id + "nao encontrado.");
			continue;
		}

		var ret = func.call(this, elemento, id);

		if(ret != null)
			this.onXMLError(ret);
	}

	return null;

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


