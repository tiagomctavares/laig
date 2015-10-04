function BaseParser(reader) {
	this.reader = reader;
}

BaseParser.prototype.getFloat = function(XMLElement, attribute, required) {
	// Optional parameter
	required = typeof required !== 'undefined' ? required : true;

	return this.reader.getFloat(XMLElement, attribute, required);
}

BaseParser.prototype.getString = function(XMLElement, attribute, required) {
	// Optional parameter
	required = typeof required !== 'undefined' ? required : true;

	return this.reader.getString(XMLElement, attribute, required);
}

BaseParser.prototype.parseId = function(XMLElement) {

	this.id = this.reader.getString(XMLElement, 'id', true);
}
