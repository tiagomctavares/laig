/**
 * MyPatch
 * @constructor
 */
function MyPatch(scene, divs1, divs2, degree1, degree2, knots1, knots2, controlpoints) {
	
	MyPrimitive.call(this, scene);

	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlpoints);
	
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