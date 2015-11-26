/**
 * MyPlane
 * @constructor
 */
function MyPlane(scene, nrDivs) {
	
	MyPrimitive.call(this, scene);
	
	var controlpoints = [
	[[0.5, 0.0, 0.5, 1.0], 
	[-0.5, 0.0, 0.5, 1.0]],
	[[0.5, 0.0, -0.5, 1.0], 
	[-0.5, 0.0, -0.5, 1.0]]
	];

	var nurbsSurface = new CGFnurbsSurface(1, 1, [0,0,1,1], [0,0,1,1], controlpoints);
	
	function getSurfacePoint(u, v) {
		return nurbsSurface.getPoint(u, v);
	}
	
	this.nurbsObject = new CGFnurbsObject(scene, getSurfacePoint, nrDivs, nrDivs);
	this.nurbsObject.initBuffers();
};

MyPlane.prototype = Object.create(MyPrimitive.prototype);
MyPlane.prototype.constructor = MyPlane;

MyPlane.prototype.display  = function() {
	this.nurbsObject.display();
};