 /**
 * MyDisk
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyDisk(scene, slices) {
    CGFobject.call(this, scene);
    
    this.slices = slices;
    
    this.initBuffers();
}
;

MyDisk.prototype = Object.create(CGFobject.prototype);
MyDisk.prototype.constructor = MyDisk;

MyDisk.prototype.initBuffers = function() {
    
    var ang = 2 * Math.PI / this.slices;
    
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    

    var next = 1.0 / this.slices;
    
    this.vertices.push(0, 0, 0);
    this.vertices.push(Math.cos(0), Math.sin(0), 0);

    this.normals.push(0, 0, 1);
    this.normals.push(0, 0, 1);
   // this.normals.push(1, 0, 0);
   // this.normals.push(1, 0, 0);

    this.texCoords.push(0.5, 0.5);
    this.texCoords.push(1, 0.5);

    for (var i = 1; i <= this.slices; i++) {
        var s = 0;
        this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), 0);
        this.normals.push(0, 0, 1);
        this.indices.push(0, i, i + 1);

        this.texCoords.push((1 + Math.cos(i * -ang))/2, (1 + Math.sin(i * -ang))/2);
    
    }
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
