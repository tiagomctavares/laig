function MyPlane(scene, nrDivs) {

	CGFobject.call(this,scene);
	nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;

	this.nrDivs = nrDivs;
	this.width = 1;
	this.height = 1;
	this.patchLength = 1.0 / nrDivs;
	this.textS = 1.0 / nrDivs;
	this.textT = 1.0 / nrDivs;
	this.startS = 0.0;
	this.startT = 0.0;
	this.initBuffers();
};

MyPlane.prototype = Object.create(CGFobject.prototype);
MyPlane.prototype.constructor = MyPlane;

MyPlane.prototype.initBuffers = function() {

	this.vertices = [];
	this.normals = [];
	this.texCoords = [];

	var yCoord = 0.5;
	var t = this.startT;

	for (var j = 0; j <= this.nrDivs; j++) 
	{
		var xCoord = -0.5;
		var s = this.startS;
	
		for (var i = 0; i <= this.nrDivs; i++) 
		{
			this.vertices.push(xCoord, yCoord, 0);			
			this.normals.push(0,0,1);
			this.texCoords.push(s, t);

			xCoord += this.patchLength;
			s += this.textS;
		}

		yCoord -= this.patchLength;
		t += this.textT;
	}

	this.indices = [];
	var ind=0;

	for (var j = 0; j < this.nrDivs; j++) 
	{
		for (var i = 0; i <= this.nrDivs; i++) 
		{
			this.indices.push(ind);
			this.indices.push(ind+this.nrDivs+1);

			ind++;
		}

		if (j+1 < this.nrDivs)
		{
			this.indices.push(ind+this.nrDivs);
			this.indices.push(ind);
		}
	}
	
	this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
	this.initGLBuffers();
};