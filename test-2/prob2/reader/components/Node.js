/**
* Node
 * @param {CGFXMLreader} reader 
*/
function Node(reader, scene) {
	this.reader = reader;
	this.scene = scene;
	this.transformationsTypes = ['ROTATION', 'TRANSLATION', 'SCALE'];

	// Parent Class
	BaseParserObject.call(this, reader);
}
Node.prototype = Object.create(BaseParserObject.prototype);

/**
* Realiza o parse dos nodes do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
Node.prototype.parse = function(XMLElement, animations) {
	
	var xmlMaterial = XMLElement.getElementsByTagName('MATERIAL')[0];
	var xmlTexture = XMLElement.getElementsByTagName('TEXTURE')[0];
	var xmlDescendants = XMLElement.getElementsByTagName('DESCENDANTS')[0];
	var xmlAnimations = XMLElement.getElementsByTagName('ANIMATIONREF');
	
	if (xmlAnimations.length > 0) {
		xmlAnimations = xmlAnimations[0].getElementsByTagName('ANIMATION');
	}
	
	xmlDescendants = xmlDescendants.getElementsByTagName('DESCENDANT');

	this.id = this.parseId(XMLElement);
	this.transformations = mat4.create();
	this.matrix = mat4.create();
	
	mat4.identity(this.transformations);
	mat4.identity(this.matrix);

	this.material = this.parseId(xmlMaterial);
	this.texture = this.parseId(xmlTexture);
	
	if (xmlAnimations != null) {
		this.parseAnimations(xmlAnimations, animations);
	}

	this.parseTransformations(XMLElement);
	this.parseDescendants(xmlDescendants);
}

/**
* Realiza o parse dos ids dos nodes descendentes do elemento XML recebido
* @param XMLElement - Elemento XML
* @return {null}
*/
Node.prototype.parseDescendants = function(XMLElements) {
	this.descendants = [];
	for (var i = 0; i < XMLElements.length; i++) {
			this.descendants[i] = this.parseId(XMLElements[i]);
	}
};

/**
* Realiza o parse dos ids das animações do node
* @param XMLElement - Elemento XML
* @return {null}
*/
Node.prototype.parseAnimations = function(XMLElements, animations) {	
	this.animations = [];
	this.animationPlaying = false;
	this.animationNumber = 0;	

	for (var i = 0; i < XMLElements.length; i++) {
		
		var animationId = this.parseId(XMLElements[i]);	
		this.animations.push(animations[animationId]);
	}
	
	if (this.animations.length > 0) {
		this.animationPlaying = true;
		this.animations[0].start();
	}
};

Node.prototype.stepAnimation = function(deltaTempo) {

	var currentAnimation = this.animations[this.animationNumber];
	
	if(this.animationPlaying && currentAnimation != null && currentAnimation != undefined)
	{
		if (currentAnimation.playing) {
			currentAnimation.step(deltaTempo);
		}
		else {
			if (++this.animationNumber < this.animations.length) {
				this.animations[this.animationNumber].start();
			}
			else {
				this.animationNumber = 0;
				this.animationPlaying = false;
			}
		}			
	}
};

Node.prototype.update = function() {

	this.matrix = mat4.clone(this.transformations);
	var currentAnimation = this.animations[this.animationNumber];
	
	if (this.animationPlaying && currentAnimation != null && currentAnimation != undefined)
	{
		if (currentAnimation.playing) {	
			currentAnimation.update();
			mat4.multiply(this.matrix, currentAnimation.matrix, this.matrix);
		}
		else
		{
			if (++this.animationNumber < this.animations.length) {
				this.animations[this.animationNumber].start();
			}
			else {
				this.animationNumber = 0;
				this.animationPlaying = false;
			}
		}			
	}
	
	return this.matrix;
};

/**
* Realiza o parse das transformações a aplicar do desenho deste node
* @param XMLElement - Elemento XML
* @return {null}
*/
Node.prototype.parseTransformations = function(XMLElement) {
	var children = XMLElement.children;

	for (var index = 0; index < children.length; index++) {
		if(children[index].tagName == this.transformationsTypes[0]) {
			this.parseRotation(children[index]);
		}
		else if(children[index].tagName == this.transformationsTypes[1]) {
			this.parseTranslation(children[index]);
		}
		else if(children[index].tagName == this.transformationsTypes[2]) {
			this.parseScale(children[index]);
		}
	}
}

/**
* Realiza o parse das rotação enviada no elemento e aplica à matrix de transformações
* @param XMLElement - Elemento XML
* @return {null}
*/
Node.prototype.parseRotation = function(XMLElement) {

	var rotation = {}
	rotation.x = rotation.y = rotation.z = 0
	var axis = this.getString(XMLElement, 'axis');
	rotation[axis] = 1;

	var degrees = this.getFloat(XMLElement, 'angle');
	rotation.angle = degrees*Math.PI/180.0;

	mat4.rotate(this.transformations, this.transformations, rotation.angle, [rotation.x, rotation.y, rotation.z]);
}

/**
* Realiza o parse do escalamento enviado no elemento e aplica à matrix de transformações
* @param XMLElement - Elemento XML
* @return {null}
*/
Node.prototype.parseScale = function(XMLElement) {
	var scale = this.getFloat(XMLElement, ['sx', 'sy', 'sz']);
	mat4.scale(this.transformations, this.transformations, [scale.sx, scale.sy, scale.sz]);
}

/**
* Realiza o parse das translação enviada no elemento e aplica à matrix de transformações
* @param XMLElement - Elemento XML
* @return {null}
*/
Node.prototype.parseTranslation = function(XMLElement) {
	var transformation = this.getCoordinates(XMLElement);
	this.translate = mat4.translate(this.transformations, this.transformations, [transformation.x, transformation.y, transformation.z]);
}

/**
* retorna o id do material lido no node - undefined quando for null
* @return {string}
*/
Node.prototype.getMaterialId = function() {

	if(this.material != 'null')
		return this.material;
	
	return undefined;
};

/**
* retorna o id da textura lida no node - undefined quando for null e null quando apresentar clear
* @return {string}
*/
Node.prototype.getTextureId = function() {

	if(this.texture != 'null')
		if(this.texture == 'clear')
			return null;
		else
			return this.texture;

	return undefined;
}