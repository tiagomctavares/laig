/**
 * MyPatch
 * @constructor
 */
function MyPatch(scene, divs1, divs2, degree, controlpoints) {
	
	MyPrimitive.call(this, scene);
	
	var knotsArray = [
		[0,0,1,1], 
		[0,0,0,1,1,1], 
		[0,0,0,0,1,1,1,1]
	];
	
	var knots = knotsArray[degree - 1];
	var nurbsSurface = new CGFnurbsSurface(degree, degree, knots, knots, controlpoints);
	
	function getSurfacePoint(u, v) {
		return nurbsSurface.getPoint(u, v);
	}
	
	this.nurbsObject = new CGFnurbsObject(scene, getSurfacePoint, divs1, divs2);
	this.nurbsObject.initBuffers();
};

MyPatch.prototype = Object.create(MyPrimitive.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.display  = function() {
	this.nurbsObject.display();
};