  /**
 * myLamp
 * @constructor
 */
function MyLamp(scene, radius, slices, stacks) {
    CGFobject.call(this, scene);
    
    this.slices = slices;
    this.stacks = stacks;
    this.radius = radius;
    
    this.textS = 1.0 / this.slices;
    this.textT = 1.0 / this.stacks;
    
    this.initBuffers();
};

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function() {
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

    this.texCoords = [];
    
    
    var t = 1;

    //defenir vertices
    
    for (var k = 0; k < this.stacks; k++) {
        
        var mult1 = this.radius * Math.sqrt(1 - (k * tamanho)*(k * tamanho));
        var mult2 = this.radius * Math.sqrt(1 - ((k+1) * tamanho)*((k+1) * tamanho));

        this.vertices.push(Math.cos(0)*mult1, Math.sin(0)*mult1, this.radius * k * tamanho);
        this.vertices.push(Math.cos(0)*mult2, Math.sin(0)*mult2, this.radius * (k + 1) * tamanho);

        var s = 0;
        this.texCoords.push(s, t);
        this.texCoords.push(s, t - this.textT);

        this.normals.push(Math.cos(0)*mult1, Math.sin(0)*mult1, k*tamanho);
        this.normals.push(Math.cos(0)*mult2, Math.sin(0)*mult2, (k+1)*tamanho);
        this.indices.push(k * 2 * this.slices, 1 + k * 2 * this.slices, (k + 1) * 2 * this.slices - 1);
        this.indices.push(-1 + (k + 1) * 2 * this.slices, -2 + (k + 1) * 2 * this.slices, k * 2 * this.slices);
        
        for (var i = 1; i <= this.slices; i++) {
            this.vertices.push(Math.cos(i * ang)*mult1, Math.sin(i * ang)*mult1, this.radius * k * tamanho);
            this.vertices.push(Math.cos(i * ang)*mult2, Math.sin(i * ang)*mult2, this.radius * (k + 1) * tamanho);

            s += this.textS;
            this.texCoords.push(s, t);
            this.texCoords.push(s, t - this.textT);
            
            this.indices.push(i * 2 + k * 2 * (this.slices+1), i * 2 + 1 + k * 2 * (this.slices+1), i * 2 - 1 + k * 2 * (this.slices+1));
            this.indices.push(i * 2 - 1 + k * 2 * (this.slices+1), i * 2 - 2 + k * 2 * (this.slices+1), i * 2 + k * 2 * (this.slices+1));
            
            for (var j = 0; j < 2; j++)
                this.normals.push(Math.cos(i * ang)*mult1, Math.sin(i * ang)*mult1, k*tamanho);
        }
         t -= this.textT;
    
    }
    
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
