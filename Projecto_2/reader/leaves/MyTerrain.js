/**
 * MyTerrain
 * @constructor
 */
function MyTerrain(scene, texture, heightMap) {
	
	MyPrimitive.call(this, scene);
	
	this.terrainPlane = new MyPlane(scene, 32);
	this.terrainPlane.initBuffers();

	this.shader = new CGFshader(scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
	this.texture = new CGFtexture(scene, texture);
	this.heightMap = new CGFtexture(scene, heightMap);
	
	this.shader.setUniformsValues({
		texture: 0,
		heightMap: 1
	});
};

MyTerrain.prototype = Object.create(MyPrimitive.prototype);
MyTerrain.prototype.constructor = MyTerrain;

MyTerrain.prototype.display  = function() {
	
	this.scene.setActiveShader(this.shader);
	this.texture.bind(0);
	this.heightMap.bind(1);
	
	this.terrainPlane.display();
	
	this.heightMap.unbind(1);
	this.texture.unbind(0);
	this.scene.resetShader();
};