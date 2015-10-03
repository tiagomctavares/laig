function RGBA(reader, XMLElement) {

	BaseParser.call(this, reader);

	if(XMLElement === undefined)
		this.red = this.blue = this.green = this.alpha = 0;
	else
		this.fromXMLElement(XMLElement);

}
RGBA.prototype = Object.create(BaseParser.prototype);

RGBA.prototype.fromXMLElement = function(XMLElement) {
	var attributes = ['r', 'g', 'b', 'a'];
	var attributesNames = ['red', 'green', 'blue', 'alpha'];

	for (var index = 0; index < attributes.length; ++index) {

		this[attributesNames[index]] = this.getFloat(XMLElement, attributes[index]);
	}


}