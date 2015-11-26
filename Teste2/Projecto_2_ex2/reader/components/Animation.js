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
	//LAIGPROB2_inicio
	this.rotation = this.getFloat(XMLElement, 'rotation');
	//LAIGPROB2_fim
	this.type = this.getString(XMLElement, 'type');
};

// self -> this nas outras funções da classes
Animation.prototype.circular = function(self) {
	var center = self.getVector3(self.root, 'center');
	var radius = self.getFloat(self.root, 'radius');
	var startang = self.getFloat(self.root, 'startang');
	var rotang = self.getFloat(self.root, 'rotang');
	//LAIGPROB2_inicio
	return new CircularAnimation(self.id, self.span, self.rotation, center, radius, startang, rotang);
	//LAIGPROB2_fim
};

Animation.prototype.linear = function(self) {

	var controlpointsNode = self.root.getElementsByTagName('controlpoint');
	var controlpoints = [];

	for (var i = 0; i < controlpointsNode.length; i++) {
		var coordinates = self.getCoordinates(controlpointsNode[i], ['xx', 'yy', 'zz']);
		controlpoints.push([coordinates.xx, coordinates.yy, coordinates.zz]);
	}
	
	//LAIGPROB2_inicio
	return new LinearAnimation(self.id, self.span, self.rotation, controlpoints);
	//LAIGPROB2_fim
};

/**
* Transforma/Aplica o objecto para os elementos relativos na biblioteca CGF
* @param {XMLscene} scene
* @return {Object}
*/
Animation.prototype.toCGF = function(scene) {
	return new (this[this.type])(this);
};