/**
* ANIMATION
 * @param {CGFXMLreader} reader
*/
function Animation(reader) {
	this.reader = reader;
	// Parent Class
	BaseParserObject.call(this, reader);
};

Animation.prototype = Object.create(BaseParserObject.prototype);
Animation.prototype.constructor = Animation;

/**
* Realiza o parse das animações do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
Animation.prototype.parse = function(XMLElement) {
	this.root = XMLElement;
	this.id = this.parseId(XMLElement);
	this.span = this.getFloat(XMLElement, 'span');
	this.type = this.getString(XMLElement, 'type');
};

Animation.prototype.circular = function(self) {
	var center = self.getVector3(self.root, 'center');
	var radius = self.getFloat(self.root, 'radius');
	var startang = self.getFloat(self.root, 'startang');
	var rotang = self.getFloat(self.root, 'rotang');
	return new CircularAnimation(self.id, self.span, center, radius, startang, rotang);
};

Animation.prototype.linear = function(self) {

	var controlpointsNode = self.root.getElementsByTagName('controlpoint');
	var controlpoints = [];

	for (var i = 0; i < controlpointsNode.length; i++) {
		var coordinates = self.getCoordinates(controlpointsNode[i], ['xx', 'yy', 'zz']);
		controlpoints.push([coordinates.xx, coordinates.yy, coordinates.zz]);
	}

	return new LinearAnimation(self.id, self.span, controlpoints);
};

//LAIGPROB2_inicio
Animation.prototype.sinus = function(self) {

	var amplitude = self.getFloat(self.root, 'amplitude');
	var cycles = self.getFloat(self.root, 'cycles');
	var zFinal = self.getFloat(self.root, 'zFinal');

	return new SinusAnimation(self.id, self.span, amplitude, cycles, zFinal);
};
//LAIGPROB2_fim

/**
* Transforma/Aplica o objecto para os elementos relativos na biblioteca CGF
* @param {XMLscene} scene
* @return {Object}
*/
Animation.prototype.toCGF = function(scene) {
	return new (this[this.type])(this);
};