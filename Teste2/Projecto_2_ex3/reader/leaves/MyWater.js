//LAIGPROB3_inicio
/**
 * MyWater
 * @constructor
 */
function MyWater(scene, texture, heightMap, textureMask) {
	MyPrimitive.call(this, scene);
	
	this.terrainPlane = new MyPlane(scene, 32);
	
	this.terrainTexture = new CGFtexture(scene, texture);
	this.mask = new CGFtexture(scene, textureMask);
	this.heightMap = new CGFtexture(scene, heightMap);
};

MyWater.prototype = Object.create(MyPrimitive.prototype);
MyWater.prototype.constructor = MyWater;

MyWater.prototype.display  = function() {
	
	this.scene.setWaterShader();
	this.terrainTexture.bind(0);
	this.heightMap.bind(1);
	this.mask.bind(2);
	this.terrainPlane.display();
	this.mask.unbind(2);
	this.heightMap.unbind(1);
	this.terrainTexture.unbind(0);
	this.scene.resetShader();
};
//LAIGPROB3_fim