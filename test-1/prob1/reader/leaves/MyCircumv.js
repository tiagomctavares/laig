//LAIGPROB1_inicio
function MyCircumv(scene, slices, stacks) {
		console.log(stacks);
        MyPrimitive.call(this, scene);
		
        this.radiusBottom = 0.5;
        this.radiusTop = 0.5;
        this.height = 1;
        this.slices = slices;
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        this.vertices = [];
        
		this.stacksArray = stacks;
		this.stacks = stacks.length;
		
        this.initBuffers();
		
};
 
MyCircumv.prototype = Object.create(MyPrimitive.prototype);
MyCircumv.prototype.constructor = MyCircumv;
 
MyCircumv.prototype.initBuffers = function() {
 
        var radiusIncrement = (this.radiusTop - this.radiusBottom) / this.stacks;
        var stackIncrement = this.height / this.stacks;
        var thetaIncrement = (2 * Math.PI) / this.slices;
        var texelIncrementS = 1.0 / this.slices;
        var texelIncrementT = 1.0 / this.stacks;
        var vertexNumber = 1;
        var sCoord = 1.0;
        var theta = 0;
 
        for (var i = 0; i <= this.slices; i++) {
 
                var tCoord = 1.0;
                var x = Math.cos(theta);
                var y = Math.sin(theta);
                var z = 0;
 
                for (var j = 0; j <= this.stacks; j++) {
						var nRadius = this.stacksArray[j];
 
                        this.vertices.push(x * nRadius, y * nRadius, z) ;
                        this.normals.push(x * nRadius, y * nRadius, 0);
                        this.texCoords.push(sCoord, tCoord);
 
                        if (i > 0 && j > 0) {
 
                                this.indices.push(vertexNumber, vertexNumber + this.stacks, vertexNumber + this.stacks + 1);
                                this.indices.push(vertexNumber + this.stacks, vertexNumber, vertexNumber - 1);
 
                                vertexNumber++;
                        }
 
                        z += stackIncrement;
                        tCoord -= texelIncrementT;
                }
 
                if (i > 0) {
                        vertexNumber++;
                }
 
                theta += thetaIncrement;
                sCoord -= texelIncrementS;
        }
 
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
};
//LAIGPROB1_fim;