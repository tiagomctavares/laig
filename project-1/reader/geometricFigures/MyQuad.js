/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyQuad(scene, x1,y1, x2, y2) {
	CGFobject.call(this,scene);

	this.minX = x1;
	this.minY = y1;
	this.maxX = x2;
	this.maxY = y2;

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
            0, 1, 2, 
			3, 2, 1
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;

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

MyQuad.prototype.updateTexCoords = function(ampS, ampT)
{
    // declarar novas coordenadas de textura em função dos fatores de amplificação
   	var maxS_novo = Math.abs(this.maxX - this.minX) / ampS;
	var maxT_novo = Math.abs(this.maxY - this.minY) / ampT;

    this.texCoords = [
		0.0, maxT_novo,
		maxS_novo, maxT_novo,
		0.0, 0.0,
		maxS_novo, 0.0
	];
 
    this.updateTexCoordsGLBuffers();
};