function Initials(reader) {
	
	this.reader = reader;

	// Parent Class
	BaseParserObject.call(this, reader);
}
Initials.prototype = Object.create(BaseParserObject.prototype);

Initials.prototype.parse = function(XMLElement) {

	var frustumElement = XMLElement.getElementsByTagName('frustum')[0];
	var referenceElement = XMLElement.getElementsByTagName('reference')[0];
	var translateElement = XMLElement.getElementsByTagName('translation')[0];
	var rotationElements = XMLElement.getElementsByTagName('rotation');
	var scaleElement = XMLElement.getElementsByTagName('scale')[0];

	this.parseFrustum(frustumElement);
	this.translate = this.getCoordinates(translateElement);
	this.parseRotations(rotationElements);
	this.parseScale(scaleElement);
	this.parseReference(referenceElement);

};

Initials.prototype.parseFrustum = function(XMLElement) {
	this.frustum =  this.getFloat(XMLElement, ['near', 'far']);
}
/*
Initials.prototype.parseRotations = function(XMLElements) {
	this.rotation = {};
	for (var i = 0; i < XMLElements.length; i++) {
		this.parseRotation(XMLElements[i]);
	};
}

Initials.prototype.parseRotation = function(XMLElement) {
	var axis = this.getString(XMLElement, 'axis');

	this.rotation[axis] = this.getFloat(XMLElement, 'angle');
}*/

Initials.prototype.parseRotations = function(root){
	this.rotations = [];
	//eixos x, y, z (obrigatorios)
	var eixoLido = {
    'x': false,
    'y': false,
    'z': false
	};

	//contador auxiliar
	var j = 0;
	
	for(var i=0; i < root.length; i++){
		var rotateAxis = this.reader.getItem(root[i], 'axis', ['x', 'y', 'z']);
		var rotateAngle = this.reader.getFloat(root[i], 'angle', true);

		//verifica se o eixo da rotacao lida existe no map e se o valor deste no map nao é true
		if(rotateAxis in eixoLido && !eixoLido[rotateAxis]){
			eixoLido[rotateAxis] = true;
			this.rotations[j] = {};
			this.rotations[j].rotateAxis = rotateAxis;
			this.rotations[j].rotateAngle = rotateAngle;
			j++;
		}
		else 
			console.warn("Eixo não válido ou eixo repetido");	
	}

	if(!eixoLido[rotateAxis])
		return "Pelo menos um dos eixos nao foi lido";
	

	return null;
}

Initials.prototype.parseScale = function(XMLElement) {
	this.scale = this.getFloat(XMLElement, ['sx', 'sy', 'sz']);
}

Initials.prototype.parseReference = function(XMLElement) {
	this.reference = this.getString(XMLElement, 'length');
}

Initials.prototype.getTranslationArray = function() {
	return [this.translate.x, this.translate.y, this.translate.z];
}

Initials.prototype.getScaleArray = function() {
	return [this.scale.sx, this.scale.sy, this.scale.sz];
}

Initials.prototype.toCGF = function(scene) {
	scene.setFrustum(this.frustum.near, this.frustum.far);
	
	scene.setSceneScale(this.getScaleArray());
	scene.setSceneTranslate(this.getTranslationArray());

	for (var i = 0; i < this.rotations.length; i++) {
		scene.setRotation(i, this.rotations[i].rotateAxis, this.rotations[i].rotateAngle);
	};
	
	scene.axis = new CGFaxis(scene, this.reference);

	return scene;
}
