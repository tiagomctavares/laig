/**
 * MyVehicle
 * @constructor
 */
function MyVehicle(scene, nrDivs) {
	
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

MyVehicle.prototype = Object.create(MyPrimitive.prototype);
MyVehicle.prototype.constructor = MyVehicle;

MyVehicle.prototype.display  = function() {
	this.nurbsObject.display();
};