/**
* init
 * @param {CGFXMLreader} reader 
*/
function Initials(reader) {
	
	this.reader = reader;

	// Parent Class
	BaseParserObject.call(this, reader);
}
Initials.prototype = Object.create(BaseParserObject.prototype);

/**
* Realiza o parse dos componentes iniciais do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
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

/**
* Realiza o parse Frustum do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
Initials.prototype.parseFrustum = function(XMLElement) {
	this.frustum =  this.getFloat(XMLElement, ['near', 'far']);
}

/**
* Realiza o parse das rotações do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
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

/**
* Realiza o parse do escalamento do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
Initials.prototype.parseScale = function(XMLElement) {
	this.scale = this.getFloat(XMLElement, ['sx', 'sy', 'sz']);
}

/**
* Realiza o parse da referência do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
Initials.prototype.parseReference = function(XMLElement) {
	this.reference = this.getString(XMLElement, 'length');
}

/**
* Realiza o parse das translações do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
Initials.prototype.getTranslationArray = function() {
	return [this.translate.x, this.translate.y, this.translate.z];
}

/**
* Realiza o parse do escalamento do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
Initials.prototype.getScaleArray = function() {
	return [this.scale.sx, this.scale.sy, this.scale.sz];
}

/**
* Transforma/Aplica o objecto para os elementos relativos na biblioteca CGF
* @param {XMLscene} scene
* @return {null}
*/
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
