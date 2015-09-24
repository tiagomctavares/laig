/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, 0.5, //vertice 0
            0.5, -0.5, 0.5, //vertice 1
            0.5, -0.5, -0.5, //vertice 2
            -0.5, -0.5, -0.5, //vertice 3
            -0.5, 0.5, 0.5, //vertice 4
            0.5, 0.5, 0.5, //vertice 5
            0.5, 0.5, -0.5, //vertice 6
            -0.5, 0.5, -0.5 //vertice 7
			];

	this.indices = [
			//face da frente, sentido anti-horário 
            4, 0, 1, 
			4, 1, 5,
			//face da direita, sentido anti-horário
			5, 1, 2,
			5, 2, 6,
			//face de trás, sentido horário
			6, 3, 7,
			6, 2, 3,
			//face da esquerda, sentido horário
			3, 0, 4,
			3, 4, 7,
			//base de baixo, sentido horário
			3, 1, 0,
			3, 2, 1,
			//base de cima, sentido anti-horário
			7, 4, 5,
			7, 5, 6
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
