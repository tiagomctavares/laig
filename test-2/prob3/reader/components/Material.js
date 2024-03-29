/**
* Material
 * @param {CGFXMLreader} reader 
*/
function Material(reader) {
	this.reader = reader;
	// Parent Class
	BaseParserObject.call(this, reader);
}
Material.prototype = Object.create(BaseParserObject.prototype);

/**
* Realiza o parse dos materiais do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
Material.prototype.parse = function(XMLElement) {
	var colorElements = ['specular', 'diffuse', 'ambient', 'emission'];
	var singleValueElements = ['shininess'];

	this.id = this.parseId(XMLElement);
	this.parseSingleValueElements(XMLElement, singleValueElements);
	this.parseColorElements(XMLElement, colorElements);
};

/**
* Transforma/Aplica o objecto para os elementos relativos na biblioteca CGF
* @param {XMLscene} scene
* @return {CGFAppearance}
*/
Material.prototype.toCGF = function(scene) {
	var material = new CGFappearance(scene);
	
	material.setAmbient(this.ambient.r, this.ambient.g, this.ambient.b, this.ambient.a);
	material.setDiffuse(this.diffuse.r, this.diffuse.g, this.diffuse.b, this.diffuse.a);
	material.setSpecular(this.specular.r, this.specular.g, this.specular.b, this.specular.a);
	material.setEmission(this.emission.r, this.emission.g, this.emission.b, this.emission.a);
	material.setShininess(this.shininess);
	
	return material;
}
