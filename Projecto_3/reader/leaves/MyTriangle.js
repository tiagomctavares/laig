/**
 * MyTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTriangle(scene, v1, v2, v3) {
	CGFobject.call(this,scene);

	this.v1 = v1;
	this.v2 = v2;
	this.v3 = v3;
	this.ampS = 0.0;
	this.ampT = 0.0;

	this.a = Math.sqrt((v1[0] - v3[0]) * (v1[0] - v3[0]) + 
			 		   (v1[1] - v3[1]) * (v1[1] - v3[1]) +
			 		   (v1[2] - v3[2]) * (v1[2] - v3[2]));

	this.b = Math.sqrt((v2[0] - v1[0]) * (v2[0] - v1[0]) + 
			 		   (v2[1] - v1[1]) * (v2[1] - v1[1]) +
			 		   (v2[2] - v1[2]) * (v2[2] - v1[2]));

	this.c = Math.sqrt((v3[0] - v2[0]) * (v3[0] - v2[0]) + 
			 		   (v3[1] - v2[1]) * (v3[1] - v2[1]) +
			 		   (v3[2] - v2[2]) * (v3[2] - v2[2]));
	
	this.cosBeta =  ( this.a*this.a - this.b*this.b + this.c * this.c) / (2 * this.a * this.c);			
	this.sinBeta = Math.sin(Math.acos(this.cosBeta));
	this.initBuffers();
};

MyTriangle.prototype = Object.create(MyPrimitive.prototype);
MyTriangle.prototype.constructor = MyTriangle;

MyTriangle.prototype.initBuffers  = function() {
			this.vertices = [
            this.v1[0], this.v1[1], this.v1[2],
            this.v2[0], this.v2[1], this.v2[2],
            this.v3[0], this.v3[1], this.v3[2]
			];

	this.indices = [
            0, 1, 2
        ];
		

	this.normals = [
		0, 0, 1,
		0, 0, 1, 
		0, 0, 1
		];

	this.primitiveType=this.scene.gl.TRIANGLES;

	this.initGLBuffers();
}

MyTriangle.prototype.updateTexCoords = function(ampS, ampT)
{

	if (ampS == this.ampS && ampT == this.ampT) {
		return;
	}
	
    // declarar novas coordenadas de textura em função dos fatores de amplificação

   	this.ampS = ampS;
   	this.ampT = ampT;

    this.texCoords = [
  		(this.c - this.a * this.cosBeta) / this.ampS,  (this.a * this.sinBeta) / this.ampT,
		0.0, 0.0,
		this.c / this.ampS, 0.0
	];
 
    this.updateTexCoordsGLBuffers();
};