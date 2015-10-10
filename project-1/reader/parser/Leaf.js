function Leaf(reader, XMLElement) {
	this.reader = reader;
	// Parent Class
	BaseParserObject.call(this, reader);

	this.id = this.parseId(XMLElement);
	this.type = this.getString(XMLElement, 'type');
	this.parseArgs(XMLElement);
}

Leaf.prototype = Object.create(BaseParserObject.prototype);

Leaf.prototype.parseArgs = function(XMLElement) {

	var args = this.getString(XMLElement, 'args');
	this.args = args.trim().split(' ');

};

Leaf.prototype.toCGF = function(scene) {
	return new (this[this.type])(scene, this.args);
}

Leaf.prototype.rectangle = function(scene, args) {
	
	if(args.length != 4) return "O numero de parametros para um retangulo não é valido.";
	
	var x1 = parseFloat(args[0]);
	var y1 = parseFloat(args[1]);

	if(x1 != x1 || y1 != y1) return "O valor de x1: " + x1 + "ou de y1: " + y1 + "não é valido.";

	var x2 = parseFloat(args[2]);
	var y2 = parseFloat(args[3]);

	if(x2 != x2 || y2 != y2) return "O valor de x2: " + x2 + "ou de y2: " + y2 + "não é valido.";

	return new MyQuad(scene, x1, y1, x2, y2);
};

Leaf.prototype.cylinder = function(scene, args) {
	if(args.length != 5) return "O numero de parametros para um cilindro não é valido";
	
	var altura = parseFloat(args[0]);
	var raio_base = parseFloat(args[1]);
	var raio_topo = parseFloat(args[2]);

	if(altura != altura || raio_base != raio_base || raio_topo != raio_topo)
		return "O valor da altura: " + altura + "ou do raio_base" + raio_base + "ou do raio_topo" + raio_topo + "não é valido." ;

	var slices = parseInt(args[3]);
	var stacks = parseInt(args[4]);

	if(slices != slices || stacks != stacks)
		return "O valor das slices" + slices + "ou das stacks" + stacks + "não é valido." ;

	return new MyCylinder(scene, altura, raio_base, raio_topo, slices, stacks);
};

Leaf.prototype.sphere = function(scene, args) {

	if(args.length != 3)
		return "O numero de parametros para uma esfera não é valido";
	
	var raio = parseFloat(args[0]);
	var slices = parseInt(args[1]);
	var stacks = parseInt(args[2]);

	if(raio != raio || slices != slices || stacks != stacks)
		return "O valor do raio: " + raio + "ou das slices" + slices + "ou das stacks" + stacks + "não é valido." ;

	
	return new MySphere(scene, raio, slices, stacks);
};

Leaf.prototype.triangle = function(scene, args) {

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