function extend(base, sub) {
  // Avoid instantiating the base class just to setup inheritance
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
  // for a polyfill
  // Also, do a recursive merge of two prototypes, so we don't overwrite 
  // the existing prototype, but still maintain the inheritance chain
  // Thanks to @ccnokes
  var origProto = sub.prototype;
  sub.prototype = Object.create(base.prototype);
  for (var key in origProto)  {
     sub.prototype[key] = origProto[key];
  }
  // Remember the constructor property was set wrong, let's fix it
  sub.prototype.constructor = sub;
  // In ECMAScript5+ (all modern browsers), you can make the constructor property
  // non-enumerable if you define it like this instead
  Object.defineProperty(sub.prototype, 'constructor', { 
    enumerable: false, 
    value: sub 
  });
}

function BaseParser(reader) {
	this.reader = reader;
}

BaseParser.prototype.getString = function(XMLElement, attribute, required) {
	// Optional parameter
	required = typeof required !== 'undefined' ? required : true;

	return this.reader.getString(XMLElement, attribute, required);
}

BaseParser.prototype.parseId = function(XMLElement) {

	this.id = this.reader.getString(XMLElement, 'id', true);
}

BaseParser.prototype.getCoordinates = function(XMLElement, coordinates) {
	if(coordinates === undefined)
		coordinates = ['x', 'y', 'z'];

	return this.getFloat(XMLElement, coordinates);
}

BaseParser.prototype.getColor = function(XMLElement) {
	return this.getFloat(XMLElement, ['r', 'g', 'b', 'a']);
}


BaseParser.prototype.getFloat = function(XMLElement, attribute, required) {
	// Optional parameter
	required = typeof required !== 'undefined' ? required : true;

	if(attribute instanceof Array)
		return this.getFloatArray(XMLElement, attribute, required);

	return this.getFloatItem(XMLElement, attribute, required);
}

BaseParser.prototype.getFloatArray = function(XMLElement, attributes, required) {
	var object = {};
	for (var i = 0; i < attributes.length; i++) {
		object[attributes[i]] = this.getFloatItem(XMLElement, attributes[i], required);
	};

	return object;
}

BaseParser.prototype.getFloatItem = function(XMLElement, attribute, required) {
	return this.reader.getFloat(XMLElement, attribute, required);
}

BaseParser.prototype.parseColorElements = function(XMLElement, colorElements) {

	for (var index = 0; index < colorElements.length; ++index) {
		var tagName = colorElements[index];

		var childElement = XMLElement.getElementsByTagName(tagName)[0];

		this[tagName] = this.getColor(childElement);
	}
};

BaseParser.prototype.parseSingleValueElements = function(XMLElement, singleValueElements) {
	
	for (var index = 0; index < singleValueElements.length; ++index) {

		var tagName = singleValueElements[index];
		
		var childElement = XMLElement.getElementsByTagName(tagName)[0];
		this[tagName] = this.getFloat(childElement, 'value');
	}
};

BaseParser.prototype.getColorArray = function(colorObject) {
	return [colorObject.r, colorObject.g, colorObject.b, colorObject.a];
}