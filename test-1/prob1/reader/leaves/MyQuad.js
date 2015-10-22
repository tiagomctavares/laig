/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyQuad(scene, x1,y1, x2, y2) {
	CGFobject.call(this,scene);

	this.minX = x1;
	this.maxY = y1;
	this.maxX = x2;
	this.minY = y2;
	this.ampS = 0.0;
	this.ampT = 0.0;
	this.initBuffers();
};

MyQuad.prototype = Object.create(MyPrimitive.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {
	this.vertices = [
            this.minX, this.minY, 0,
            this.maxX, this.minY, 0,
            this.minX, this.maxY, 0,
            this.maxX, this.maxY, 0
			];

	this.indices = [
            0, 1, 2, 3
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLE_STRIP;

	this.normals = [
		0, 0, 1,
		0, 0, 1, 
		0, 0, 1,
		0, 0, 1
		];

		this.texCoords = [
		0.0, 1.0,
		1.0, 1.0,
		0.0, 0.0,
		1.0, 0.0
	];

	this.initGLBuffers();
};

MyQuad.prototype.updateTexCoords = function(ampS, ampT) {

	if (ampS == this.ampS && ampT == this.ampT) {
		return;
	}

    // declarar novas coordenadas de textura em função dos fatores de amplificação
   	this.ampS = ampS;
   	this.ampT = ampT;

   	var maxS_novo = (this.maxX - this.minX) / this.ampS;
	var maxT_novo = (this.maxY - this.minY) / this.ampT;

    this.texCoords = [
		0.0, maxT_novo,
		maxS_novo, maxT_novo,
		0.0, 0.0,
		maxS_novo, 0.0
	];
 
    this.updateTexCoordsGLBuffers();
};