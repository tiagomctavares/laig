/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

 	var ang = 2* Math.PI/ this.slices;
 	var tamanho = 1/this.stacks;

 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

 	//this.texCoords = [];

 	//defenir vertices

 	var incrementa = 0;
 	
 	for(var k =0; k <this.stacks; k++){

		for(var i=0; i < this.slices; i++){
 		
 		this.vertices.push(Math.cos(i*ang), Math.sin(i*ang), k*tamanho);
 		this.vertices.push(Math.cos(i*ang + ang), Math.sin(i*ang + ang), k*tamanho);
 		this.vertices.push(Math.cos(i*ang), Math.sin(i*ang), (k+1)*tamanho);
 		this.vertices.push(Math.cos(i*ang + ang), Math.sin(i*ang + ang), (k+1)*tamanho);

 		this.indices.push(3+incrementa, 2+incrementa, 0+incrementa);
 		this.indices.push(0+incrementa, 1+incrementa, 3+incrementa);

	for(var j=0; j < 4; j++){

 		this.normals.push(Math.cos(i*ang + ang/2), Math.sin(i*ang + ang/2), 0);

 	}
 	incrementa +=4;
 	}

 	}

 	//definir vertices de textura
 

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
