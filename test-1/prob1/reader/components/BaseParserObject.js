/**
* BaseParserObject
 * @param {CGFXMLreader} reader 
*/
function BaseParserObject(reader) {
	this.reader = reader;
}

/**
* Lê attributo do elementoXML
* @param XMLElement - Elemento XML
* @param attribute - attributo a ler do elemento XML
* @param required - se o attribute é required ou não
* @return {string}
*/
BaseParserObject.prototype.getString = function(XMLElement, attribute, required) {
	// Optional parameter
	required = typeof required !== 'undefined' ? required : true;

	return this.reader.getString(XMLElement, attribute, required);
}

/**
* Devolve o id de um elemento XML
* @param XMLElement - Elemento XML
* @return {string}
*/
BaseParserObject.prototype.parseId = function(XMLElement) {

	return this.reader.getString(XMLElement, 'id', true);

}

/**
* Retorna as coordenadas x, y, z do elemento
* @param XMLElement - Elemento XML
* @return {float[]}
*/
BaseParserObject.prototype.getCoordinates = function(XMLElement, coordinates) {
	if(coordinates === undefined)
		coordinates = ['x', 'y', 'z'];

	return this.getFloat(XMLElement, coordinates);
}

/**
* Retorna as cor do objecto r, g, b, a do elemento
* @param XMLElement - Elemento XML
* @return {null}
*/
BaseParserObject.prototype.getColor = function(XMLElement) {
	return this.getFloat(XMLElement, ['r', 'g', 'b', 'a']);
}

/**
* retorna um attribute float ou um array de floats
* @param XMLElement - Elemento XML
* @param attribute - O attributo a ler, pode ser array ou apenas 1 elemento
* @param required - Se os atributos a ler são obrigatórios ou não
* @return {float[]}
*/
BaseParserObject.prototype.getFloat = function(XMLElement, attribute, required) {
	// Optional parameter
	required = typeof required !== 'undefined' ? required : true;

	if(attribute instanceof Array)
		return this.getFloatArray(XMLElement, attribute, required);

	return this.getFloatItem(XMLElement, attribute, required);
}

/**
* retorna um array de floats relativos aos attributos recebidos
* @param XMLElement - Elemento XML
* @param attributes - Um array dos atributos a ler
* @param required - Se os atributos a ler são obrigatórios ou não
* @return {float[]}
*/
BaseParserObject.prototype.getFloatArray = function(XMLElement, attributes, required) {
	var object = {};
	for (var i = 0; i < attributes.length; i++) {
		object[attributes[i]] = this.getFloatItem(XMLElement, attributes[i], required);
	};

	return object;
}

/**
* aplica a transformacao de rotacao a um eixo, com o respetivo angulo
* @param XMLElement - Elemento XML
* @param attributes - Um array dos atributos a ler
* @param required - Se os atributos a ler são obrigatórios ou não
* @return {float}
*/
BaseParserObject.prototype.getFloatItem = function(XMLElement, attribute, required) {
	return this.reader.getFloat(XMLElement, attribute, required);
}

/**
* aplica a transformacao de rotacao a um eixo, com o respetivo angulo
* @param XMLElement - Elemento XML
* @param attributes - Um array dos atributos a ler
* @param required - Se os atributos a ler são obrigatórios ou não
* @return {float}
*/
BaseParserObject.prototype.parseColorElements = function(XMLElement, colorElements) {

	for (var index = 0; index < colorElements.length; ++index) {
		var tagName = colorElements[index];

		var childElement = XMLElement.getElementsByTagName(tagName)[0];

		this[tagName] = this.getColor(childElement);
	}
};

/**
* lê de um elemento XML os seus filhos de id presentes no array singleValueElements e retorna o value
* @param XMLElement - Elemento XML
* @param singleValueElements - o array de elementos xml a ler o atributo 'value'
* @return {float}
*/
BaseParserObject.prototype.parseSingleValueElements = function(XMLElement, singleValueElements) {
	
	for (var index = 0; index < singleValueElements.length; ++index) {

		var tagName = singleValueElements[index];
		
		var childElement = XMLElement.getElementsByTagName(tagName)[0];
		this[tagName] = this.getFloat(childElement, 'value');
	}
};

/**
* transforma um objecto de cor num array [x, y, z]
* @return {float[]}
*/
BaseParserObject.prototype.getColorArray = function(colorObject) {
	return [colorObject.r, colorObject.g, colorObject.b, colorObject.a];
}