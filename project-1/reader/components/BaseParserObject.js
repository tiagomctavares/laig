function BaseParserObject(reader) {
	this.reader = reader;
}

BaseParserObject.prototype.getString = function(XMLElement, attribute, required) {
	// Optional parameter
	required = typeof required !== 'undefined' ? required : true;

	return this.reader.getString(XMLElement, attribute, required);
}

BaseParserObject.prototype.parseId = function(XMLElement) {

	return this.reader.getString(XMLElement, 'id', true);

}

BaseParserObject.prototype.getCoordinates = function(XMLElement, coordinates) {
	if(coordinates === undefined)
		coordinates = ['x', 'y', 'z'];

	return this.getFloat(XMLElement, coordinates);
}

BaseParserObject.prototype.getColor = function(XMLElement) {
	return this.getFloat(XMLElement, ['r', 'g', 'b', 'a']);
}


BaseParserObject.prototype.getFloat = function(XMLElement, attribute, required) {
	// Optional parameter
	required = typeof required !== 'undefined' ? required : true;

	if(attribute instanceof Array)
		return this.getFloatArray(XMLElement, attribute, required);

	return this.getFloatItem(XMLElement, attribute, required);
}

BaseParserObject.prototype.getFloatArray = function(XMLElement, attributes, required) {
	var object = {};
	for (var i = 0; i < attributes.length; i++) {
		object[attributes[i]] = this.getFloatItem(XMLElement, attributes[i], required);
	};

	return object;
}

BaseParserObject.prototype.getFloatItem = function(XMLElement, attribute, required) {
	return this.reader.getFloat(XMLElement, attribute, required);
}

BaseParserObject.prototype.parseColorElements = function(XMLElement, colorElements) {

	for (var index = 0; index < colorElements.length; ++index) {
		var tagName = colorElements[index];

		var childElement = XMLElement.getElementsByTagName(tagName)[0];

		this[tagName] = this.getColor(childElement);
	}
};

BaseParserObject.prototype.parseSingleValueElements = function(XMLElement, singleValueElements) {
	
	for (var index = 0; index < singleValueElements.length; ++index) {

		var tagName = singleValueElements[index];
		
		var childElement = XMLElement.getElementsByTagName(tagName)[0];
		this[tagName] = this.getFloat(childElement, 'value');
	}
};

BaseParserObject.prototype.getColorArray = function(colorObject) {
	return [colorObject.r, colorObject.g, colorObject.b, colorObject.a];
}