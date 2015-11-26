/**
* Leaf
 * @param {CGFXMLreader} reader 
*/
function Leaf(reader) {
	this.reader = reader;
	// Parent Class
	BaseParserObject.call(this, reader);
}

Leaf.prototype = Object.create(BaseParserObject.prototype);
Leaf.prototype.constructor = Leaf;
/**
* Realiza o parse das leafs do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
Leaf.prototype.parse = function(XMLElement) {
	this.root = XMLElement;
	this.id = this.parseId(XMLElement);
	this.type = this.getString(XMLElement, 'type');
};

/**
* Transforma/Aplica o objecto para os elementos relativos na biblioteca CGF
* @param {XMLscene} scene
* @return {Object}
*/
Leaf.prototype.toCGF = function(scene) {
	return new (this[this.type])(scene, this);
}

/**
* Cria e retorna um retangulo
* @param {XMLscene} scene
* @param args - argumentos do rectangulo
* @return {MyQuad}
*/
Leaf.prototype.rectangle = function(scene, self) {

	var unprocessedArgs = self.getString(self.root, 'args');
	var args = unprocessedArgs.replace(/\s+/g, ' ').split(' ');

	if(args.length != 4) return "O numero de parametros para um retangulo não é valido.";
	
	var x1 = parseFloat(args[0]);
	var y1 = parseFloat(args[1]);

	if(x1 != x1 || y1 != y1) return "O valor de x1: " + x1 + "ou de y1: " + y1 + "não é valido.";

	var x2 = parseFloat(args[2]);
	var y2 = parseFloat(args[3]);

	if(x2 != x2 || y2 != y2) return "O valor de x2: " + x2 + "ou de y2: " + y2 + "não é valido.";

	return new MyQuad(scene, x1, y1, x2, y2);
};

/**
* Cria e retorna um cilindro
* @param {XMLscene} scene
* @param args - argumentos do rectangulo
* @return {MyCylinder}
*/
Leaf.prototype.cylinder = function(scene, self) {
	
	var unprocessedArgs = self.getString(self.root, 'args');
	var args = unprocessedArgs.replace(/\s+/g, ' ').split(' ');

	if(args.length != 5) return "O numero de parametros para um cilindro não é valido";
	
	var altura = parseFloat(args[0]);
	var raio_base = parseFloat(args[1]);
	var raio_topo = parseFloat(args[2]);

	if(altura != altura || raio_base != raio_base || raio_topo != raio_topo)
		return "O valor da altura: " + altura + "ou do raio_base" + raio_base + "ou do raio_topo" + raio_topo + "não é valido." ;

	var stacks = parseInt(args[3]);
	var slices = parseInt(args[4]);

	if(slices != slices || stacks != stacks)
		return "O valor das slices" + slices + "ou das stacks" + stacks + "não é valido." ;

	return new MyCylinder(scene, altura, raio_base, raio_topo, stacks, slices);
};

/**
* Cria e retorna uma esfera
* @param {XMLscene} scene
* @param args - argumentos do rectangulo
* @return {MySphere}
*/
Leaf.prototype.sphere = function(scene, self) {

	var unprocessedArgs = self.getString(self.root, 'args');
	var args = unprocessedArgs.replace(/\s+/g, ' ').split(' ');

	if(args.length != 3)
		return "O numero de parametros para uma esfera não é valido";
	
	var raio = parseFloat(args[0]);
	var slices = parseInt(args[1]);
	var stacks = parseInt(args[2]);

	if(raio != raio || slices != slices || stacks != stacks)
		return "O valor do raio: " + raio + "ou das slices" + slices + "ou das stacks" + stacks + "não é valido." ;

	
	return new MySphere(scene, raio, slices, stacks);
};

/**
* Cria e retorna um triangulo
* @param {XMLscene} scene
* @param args - argumentos do rectangulo
* @return {MyTriangle}
*/
Leaf.prototype.triangle = function(scene, self) {
	
	var unprocessedArgs = self.getString(self.root, 'args');
	var args = unprocessedArgs.replace(/\s+/g, ' ').split(' ');

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

	return new MyTriangle(scene, v1, v2, v3);
};

/**
* Cria e retorna um veículo "voador"
* @param {XMLscene} scene
* @return {MyVehicle}
*/
Leaf.prototype.vehicle = function(scene, self) {
	return new MyVehicle(scene);
}

/**
* Cria e retorna um terreno
* @param {XMLscene} scene
* @return {MyVehicle}
*/
Leaf.prototype.terrain = function(scene, self) {
	var texture = self.getString(self.root, 'texture');
	var heightmap = self.getString(self.root, 'heightmap');
	return new MyTerrain(scene, texture, heightmap);
}

/**
* Cria e retorna um plano
* @param {XMLscene} scene
* @return {MyVehicle}
*/
Leaf.prototype.plane = function(scene, self) {
	var parts = self.getFloat(self.root, 'parts');
	return new MyPlane(scene, parts);
}

/**
* Cria e retorna uma patch
* @param {XMLscene} scene
* @return {MyVehicle}
*/
//LAIGPROB1_inicio
Leaf.prototype.patch = function(scene, self) {
	var divs1 = self.getInteger(self.root, 'partsU');
	var divs2 = self.getInteger(self.root, 'partsV');
	
	/*
	// antes: o mesmo grau nas duas direcções da curva
	var degree = self.getInteger(self.root, 'order');
	*/
	
	/*
		agora: cada direcção tem um grau e divisões
	*/
	var degree1 = self.getInteger(self.root, 'orderU');
	var degree2 = self.getInteger(self.root, 'orderV');
	
	if (degree1 < 0 || degree1 > 3) {
		// erro! grau das superfície curva em U deve ser 1, 2 ou 3
		return null;
	}
	if (degree2 < 0 || degree2 > 3) {
		// erro! grau das superfície curva em V deve ser 1, 2 ou 3
		return null;
	}

	var controlpointsNode = self.root.getElementsByTagName('controlpoint');
	
	// antes: (degree + 1)^2
	// agora: (degree1 + 1) * (degree2 + 1)
	if ((degree1 + 1) * (degree2 + 1) != controlpointsNode.length) {
		// erro! número de pontos de controlo deve ser (degree + 1) ^ 2
		return null;
	}
	
	var controlpoints = [];
	var index = 0;
	
	// U0	<- ciclo for exterior (U0... degree1)
	//		V0
	//		V1 <- ciclo for interior (V0... degree2)
	//		V2
	// U1
	//		V0
	//		V1
	//		V2
	for (var i = 0; i <= degree1; i++) {
		
		var vCoords = [];
		
		for (var j = 0; j <= degree2; j++) {		
			var thisCoordinates = self.getCoordinates(controlpointsNode[index++], ['x', 'y', 'z']);
			vCoords.push([thisCoordinates.x, thisCoordinates.y, thisCoordinates.z, 1.0]);
		}
		
		controlpoints.push(vCoords);
	}
	
	return new MyPatch(scene, divs1, divs2, degree1, degree2, controlpoints);
}
//LAIGPROB1_fim