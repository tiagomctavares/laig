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

		this.vertices = [
            v1[0], v1[1], v1[2],
            v2[0], v2[1], v2[2],
            v3[0], v3[1], v3[2]
			];

	this.indices = [
            0, 1, 2
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;

	this.normals = [
		0, 0, 1,
		0, 0, 1, 
		0, 0, 1
		];

	this.initGLBuffers();

	this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor=MyTriangle;
