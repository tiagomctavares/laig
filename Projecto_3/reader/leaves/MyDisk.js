/**
 * MyDisk
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyDisk(scene, slices) {
    MyPrimitive.call(this, scene);
    
    this.slices = slices;
	
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    
    this.initBuffers();
}
;

MyDisk.prototype = Object.create(CGFobject.prototype);
MyDisk.prototype.constructor = MyDisk;

MyDisk.prototype.initBuffers = function() {
    
    var ang = 2 * Math.PI / this.slices;
    
    var tCoord = 1.0;
	var sCoord = 1.0;
    var texelIncrementS = 1.0 / this.slices;
	var theta =0;
	var x = Math.cos(theta);
	var y = Math.sin(theta);
	var vertexNumber = 1;
	var z = 0;
    
    for (var i = 1; i <= this.slices; i++) {
		
        this.vertices.push(x, y, z);
		this.normals.push(x, y, 0);
        this.texCoords.push(sCoord, tCoord);
    
		 if (i > 0) {
			 
			 vertexNumber++;
		}

		theta += ang;
		sCoord -= texelIncrementS;
    }
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
