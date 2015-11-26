/**
* Illumination
 * @param {CGFXMLreader} reader 
*/
function Illumination(reader) {
	this.reader = reader;
	// Parent Class
	BaseParserObject.call(this, reader);
}
Illumination.prototype = Object.create(BaseParserObject.prototype);

/**
* Realiza o parse dos componentes de iluminação do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
Illumination.prototype.parse = function(XMLElement) {
	var colorElements = ['ambient', 'background'];
	
	this.parseColorElements(XMLElement, colorElements);
};

/**
* Transforma/Aplica o objecto para os elementos relativos na biblioteca CGF
* @param {XMLscene} scene
* @return {null}
*/
Illumination.prototype.toCGF = function(scene) {
	scene.setBackground(this.getColorArray(this.background));
	scene.setAmbient(this.getColorArray(this.ambient));
}
