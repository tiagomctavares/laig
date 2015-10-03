/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks) {
    CGFobject.call(this, scene);
    
    this.slices = slices;
    this.stacks = stacks;
    
    this.initBuffers();
}
;

MyCylinder.prototype = Object.create(MyPrimitive.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {
    /*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
    
    var ang = 2 * Math.PI / this.slices;
    var tamanho = 1.0 / this.stacks;
    
    this.vertices = [];
    
    this.indices = [];
    
    this.normals = [];

    //defenir vertices
    
    for (var k = 0; k < this.stacks; k++) {
        
        this.vertices.push(Math.cos(0), Math.sin(0), k * tamanho);
        this.vertices.push(Math.cos(0), Math.sin(0), (k + 1) * tamanho);
        this.normals.push(Math.cos(0), Math.sin(0), 0);
        this.normals.push(Math.cos(0), Math.sin(0), 0);
        this.indices.push(k * 2 * this.slices, 1 + k * 2 * this.slices, (k+1) * 2 * this.slices - 1);
        this.indices.push(- 1 + (k+1) * 2 * this.slices, - 2 + (k+1) * 2 * this.slices, k * 2 * this.slices);
        
        for (var i = 1; i < this.slices; i++) {
            this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), k * tamanho);
            this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), (k + 1) * tamanho);
            
            this.indices.push(i * 2 + k * 2 * this.slices, i * 2 + 1 + k * 2 * this.slices, i * 2 - 1 + k * 2 * this.slices);
            this.indices.push(i * 2 - 1 + k * 2 * this.slices, i * 2 - 2 + k * 2 * this.slices, i * 2 + k * 2 * this.slices);
            
            
            for (var j = 0; j < 2; j++)
                this.normals.push(Math.cos(i * ang), Math.sin(i * ang), 0);
        }
    
    }
    
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

MyCylinder.prototype.updateTexCoords= function(ampS, ampT)
{
    return null;
};