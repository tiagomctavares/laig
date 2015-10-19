/**
* Texture
 * @param {CGFXMLreader} reader 
*/
function Texture(reader, texturePath) {

	this.TEXTURE_PATH = texturePath;
	this.reader = reader;
	// Parent Class
	BaseParserObject.call(this, reader);
}

Texture.prototype = Object.create(BaseParserObject.prototype);

/**
* Realiza o parse das texturas do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
Texture.prototype.parse = function(XMLElement) {

	var xmlFile = XMLElement.getElementsByTagName('file')[0];
	var xmlAmplif_factor = XMLElement.getElementsByTagName('amplif_factor')[0];

	this.id = this.parseId(XMLElement);
	this.parseFile(xmlFile);
	this.parseAmplif_factor(xmlAmplif_factor);
};

/**
* Realiza o parse do amplifFactor do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
Texture.prototype.parseAmplif_factor = function(XMLElement) {
	this.amplif_factor = this.getCoordinates(XMLElement, ['s', 't']);
}

/**
* Realiza o parse da localização da textura do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
Texture.prototype.parseFile = function(XMLElement) {
	this.file = this.TEXTURE_PATH + this.getString(XMLElement, 'path');
}

/**
* Transforma/Aplica o objecto para os elementos relativos na biblioteca CGF
* @param {XMLscene} scene
* @return {null}
*/
Texture.prototype.toCGF = function(scene) {
	this.texture = new CGFtexture(scene, this.file);
};