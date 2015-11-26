/**
 * MyPatch
 * @constructor
 */
 //LAIGPROB1_inicio
function MyPatch(scene, divs1, divs2, degree1, degree2, controlpoints) {
	
	MyPrimitive.call(this, scene);
	
	var knotsArray = [
		[0,0,1,1], 
		[0,0,0,1,1,1], 
		[0,0,0,0,1,1,1,1]
	];
	
	//knots diferentes para cada direcção/grau 
	var knots1 = knotsArray[degree1 - 1];
	var knots2 = knotsArray[degree2 - 1];
	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlpoints);

	function getSurfacePoint(u, v) {
		return nurbsSurface.getPoint(u, v);
	}
	
	this.nurbsObject = new CGFnurbsObject(scene, getSurfacePoint, divs1, divs2);
	this.nurbsObject.initBuffers();
};
//LAIGPROB1_fim

MyPatch.prototype = Object.create(MyPrimitive.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.display  = function() {
	this.nurbsObject.display();
};