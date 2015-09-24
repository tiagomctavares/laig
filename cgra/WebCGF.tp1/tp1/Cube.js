/**
 * Cube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube (scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

Cube.prototype = Object.create(CGFobject.prototype);
Cube.prototype.constructor=Cube;

Cube.prototype.initBuffers = function () {
	this.vertices = [
            -1, -1, 1,
            1, -1, 1,
            1, -1, -1,
            -1, -1, -1,
            -1, 1, 1,
            1, 1, 1,
            1, 1, -1,
            -1, 1, -1
			];

	this.indices = [
            4, 0, 1, 
			4, 1, 5,
			5, 1, 2,
			5, 2, 6,
			6, 3, 7,
			6, 2, 3,
			3, 0, 4,
			3, 4, 7,
			3, 1, 0,
			3, 2, 1,
			7, 4, 5,
			7, 5, 6
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
