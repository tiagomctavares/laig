/**
 * MyTerrain
 * @constructor
 */
function MyTerrain(scene, texture, heightMap) {
	
	MyPrimitive.call(this, scene);
	
	this.terrainPlane = new MyPlane(scene, 32);
	
	this.terrainTexture = new CGFtexture(scene, texture);
	this.heightMap = new CGFtexture(scene, heightMap);

};

MyTerrain.prototype = Object.create(MyPrimitive.prototype);
MyTerrain.prototype.constructor = MyTerrain;

MyTerrain.prototype.display  = function() {
	
	this.scene.setTerrainShader();
	this.terrainTexture.bind(0);
	this.heightMap.bind(1);
	this.terrainPlane.display();
	this.heightMap.unbind(1);
	this.terrainTexture.unbind(0);
	this.scene.resetShader();
};