function Material(reader, XMLElement) {
	this.reader = reader;
	// Parent Class
	BaseParserObject.call(this, reader);

	var colorElements = ['specular', 'diffuse', 'ambient', 'emission'];
	var singleValueElements = ['shininess'];

	this.parseId(XMLElement);
	this.parseSingleValueElements(XMLElement, singleValueElements);
	this.parseColorElements(XMLElement, colorElements);
}
Material.prototype = Object.create(BaseParserObject.prototype);

Material.prototype.toCGF = function(scene) {
	var material = new CGFappearance(this.scene)
	material.setAmbient(this.ambient.r, this.ambient.g, this.ambient.b, this.ambient.a);
	material.setDiffuse(this.diffuse.r, this.diffuse.g, this.diffuse.b, this.diffuse.a);
	material.setSpecular(this.specular.r, this.specular.g, this.specular.b, this.specular.a);
	material.setEmission(this.emission.r, this.emission.g, this.emission.b, this.emission.a);
	material.setShininess(this.shininess);

	return material;
}
