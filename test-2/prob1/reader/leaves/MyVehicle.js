/**
 * MyVehicle
 * @constructor
 */
function MyVehicle(scene) {
	
	MyPrimitive.call(this, scene);
	
	this.textVidro = new CGFappearance(scene);
	this.textVidro.loadTexture('scenes/images/nave1.png');
	
	this.textEspelho = new CGFappearance(scene);
	this.textEspelho.loadTexture('scenes/images/espelho.jpg');
	
	this.textPreto = new CGFappearance(scene);
	this.textPreto.loadTexture('scenes/images/preto.jpg');
		
	var controlpointsV = [ 
		[[-2.0,4.0,-4.5,1.0],[-1.0,5.0,-4.5,1.0], [1.0,5.0,-4.5,1.0], [2.0,4.0,-4.5,1.0]],
		[[-2.0,3.0,-4.0,1.0],[-1.0,4.6,-3.6,1.0], [1.0,4.6,-3.6,1.0], [2.0,3.0,-4.0,1.0]],
		[[-2.0,2.0,-3.5,1.0],[-0.5,4.4,-3.2,1.0], [1.0,4.4,-3.2,1.0], [2.0,2.0,-3.5,1.0]],
		[[-2.0,2.0,-3.0,1.0],[-1.0,4.0,-2.8,1.0], [1.0,4.0,-2.8,1.0], [2.0,2.0,-3.0,1.0]]		
	];	
	this.vidro = new MyPatch(scene, 20, 20, 3, controlpointsV);
	
	var controlpointsOvni = [ 
		[[-8.0,0.0,2.0,1.0],[-6.0,0.0,1.0,1.0], [-4.0,0.0,1.0,1.0], [-2.0,0.0,2.0,1.0]],
		[[-11.0,0.0,4.0,1.0],[-7.0,4.0,4.0,1.0], [-3.0,4.0,4.0,1.0], [1.0,0.0,4.0,1.0]],
		[[-11.0,0.0,8.0,1.0],[-7.0,4.0,8.0,1.0], [-3.0,4.0,8.0,1.0], [1.0,0.0,8.0,1.0]],
		[[-8.0,0.0,10.5,1.0],[-6.0,0.0,12.0,1.0], [-4.0,0.0,12.0,1.0], [-2.0,0.0,10.5,1.0]]		
	];	
	this.ovni = new MyPatch(scene, 20, 20, 3, controlpointsOvni);
	
	var controlpointsOvni2 = [ 
		[[-8.0,0.0,2.0,1.0],[-6.0,0.0,1.0,1.0], [-4.0,0.0,1.0,1.0], [-2.0,0.0,2.0,1.0]],
		[[-11.0,0.0,4.0,1.0],[-7.0,0.0,4.0,1.0], [-3.0,0.0,4.0,1.0], [1.0,0.0,4.0,1.0]],
		[[-11.0,0.0,8.0,1.0],[-7.0,0.0,8.0,1.0], [-3.0,0.0,8.0,1.0], [1.0,0.0,8.0,1.0]],
		[[-8.0,0.0,10.5,1.0],[-6.0,0.0,12.0,1.0], [-4.0,0.0,12.0,1.0], [-2.0,0.0,10.5,1.0]]		
	];	
	this.ovni2 = new MyPatch(scene, 20, 20, 3, controlpointsOvni2);

	this.perna = new MyCylinder(scene, 3, 0.5, 0.5, 50, 50);
	this.perna1 = new MyCylinder(scene, 3, 0.4, 0.4, 50, 50);
	this.perna2 = new MyCylinder(scene, 3, 0.3, 0.3, 50, 50);
	
	this.roda1 = new MyCylinder(scene, 3, 0.5, 8, 50, 50);
	
	this.center = new MySphere(scene, 3, 50, 50);
};

MyVehicle.prototype = Object.create(MyPrimitive.prototype);
MyVehicle.prototype.constructor = MyVehicle;

MyVehicle.prototype.display = function () {
	
	this.scene.pushMatrix();
	this.scene.scale(0.2, 0.2, 0.2);
	this.scene.pushMatrix();
		
		this.scene.pushMatrix();
	
			this.scene.translate(0,0.2, 0);
			this.textVidro.apply();
			this.scene.pushMatrix();
				this.scene.rotate(Math.PI/2, 1, 0, 0);
				this.roda1.display();
			this.scene.popMatrix();
			
			this.scene.pushMatrix();
				this.scene.translate(0, -5.1, 0);
				this.scene.rotate((Math.PI*3)/2, 1, 0, 0);
				this.scene.scale(1,1,0.7);
				this.roda1.display();
			this.scene.popMatrix();
		
		////
		
			this.scene.pushMatrix();
				this.textPreto.apply();
				this.scene.translate(0,-3.5,5);
				this.scene.scale(1,0.5,1);
				this.scene.rotate(Math.PI/2, 1,0,0);
				this.scene.rotate(-Math.PI/8, 1,0,0);
				this.perna.display();
			this.scene.popMatrix();
		
			this.scene.pushMatrix();
				this.textEspelho.apply();
				this.scene.translate(0,-4.5, 5.8);
				this.scene.scale(1,0.5,1);
				this.scene.rotate(Math.PI/2, 1,0,0);
				this.scene.rotate(-Math.PI/8, 1,0,0);
				this.perna1.display();
			this.scene.popMatrix();
		
			this.scene.pushMatrix();
				this.textPreto.apply();
				this.scene.translate(0,-5.5, 6.6);
				this.scene.scale(1,0.5,1);
				this.scene.rotate(Math.PI/2, 1,0,0);
				this.scene.rotate(-Math.PI/8, 1,0,0);
				this.perna2.display();
			this.scene.popMatrix();
		
		this.scene.popMatrix();
		
		this.textEspelho.apply();
		this.scene.pushMatrix();
			this.scene.scale(0.8, 0.8, 0.8);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.translate(5, -43.5, 43);
			this.ovni.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.scale(0.8, 0.8, 0.8);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.translate(5, -43.5, 55.6);
			this.scene.rotate(Math.PI, 1,0,0);
			this.ovni2.display();
		this.scene.popMatrix();
		
		////
		
		this.scene.pushMatrix();
		
		this.scene.scale(-1, 1, -1);
		this.scene.pushMatrix();
				this.textPreto.apply();
				this.scene.translate(0,-3.5,5);
				this.scene.scale(1,0.5,1);
				this.scene.rotate(Math.PI/2, 1,0,0);
				this.scene.rotate(-Math.PI/8, 1,0,0);
				this.perna.display();
			this.scene.popMatrix();
		
			this.scene.pushMatrix();
				this.textEspelho.apply();
				this.scene.translate(0,-4.5, 5.8);
				this.scene.scale(1,0.5,1);
				this.scene.rotate(Math.PI/2, 1,0,0);
				this.scene.rotate(-Math.PI/8, 1,0,0);
				this.perna1.display();
			this.scene.popMatrix();
		
			this.scene.pushMatrix();
				this.textPreto.apply();
				this.scene.translate(0,-5.5, 6.6);
				this.scene.scale(1,0.5,1);
				this.scene.rotate(Math.PI/2, 1,0,0);
				this.scene.rotate(-Math.PI/8, 1,0,0);
				this.perna2.display();
			this.scene.popMatrix();
		
		//this.scene.popMatrix();
		
		this.textEspelho.apply();
		this.scene.pushMatrix();
			this.scene.scale(0.8, 0.8, 0.8);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.translate(5, -43.5, 43);
			this.ovni.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.scale(0.8, 0.8, 0.8);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.translate(5, -43.5, 55.6);
			this.scene.rotate(Math.PI, 1,0,0);
			this.ovni2.display();
		this.scene.popMatrix();
		
		this.scene.popMatrix();
		////
		
		this.scene.pushMatrix();
		
			this.scene.rotate(Math.PI/3, 0, 1, 0);
			
			this.scene.pushMatrix();
				this.textPreto.apply();
				this.scene.translate(0,-3.5,5);
				this.scene.scale(1,0.5,1);
				this.scene.rotate(Math.PI/2, 1,0,0);
				this.scene.rotate(-Math.PI/8, 1,0,0);
				this.perna.display();
			this.scene.popMatrix();
			
			this.scene.pushMatrix();
				this.textEspelho.apply();
				this.scene.translate(0,-4.5, 5.8);
				this.scene.scale(1,0.5,1);
				this.scene.rotate(Math.PI/2, 1,0,0);
				this.scene.rotate(-Math.PI/8, 1,0,0);
				this.perna1.display();
			this.scene.popMatrix();
			
			this.scene.pushMatrix();
				this.textPreto.apply();
				this.scene.translate(0,-5.5, 6.6);
				this.scene.scale(1,0.5,1);
				this.scene.rotate(Math.PI/2, 1,0,0);
				this.scene.rotate(-Math.PI/8, 1,0,0);
				this.perna2.display();
			this.scene.popMatrix();
		
		this.scene.popMatrix();
			
		this.scene.pushMatrix();
			this.textEspelho.apply();
			this.scene.scale(0.8, 0.8, 0.8);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.translate(48, -44.5, 18);
			this.ovni.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.scale(0.8, 0.8, 0.8);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.translate(47.9, -44.5, 30.5);
			this.scene.rotate(Math.PI, 1,0,0);
			this.ovni2.display();
		this.scene.popMatrix();
		
	//this.scene.popMatrix();
	
		
		this.scene.pushMatrix();
			this.scene.scale(-1, 1, -1);
			this.scene.rotate(Math.PI/3, 0, 1, 0);
			
			this.scene.pushMatrix();
				this.textPreto.apply();
				this.scene.translate(0,-3.5,5);
				this.scene.scale(1,0.5,1);
				this.scene.rotate(Math.PI/2, 1,0,0);
				this.scene.rotate(-Math.PI/8, 1,0,0);
				this.perna.display();
			this.scene.popMatrix();
			
			this.scene.pushMatrix();
				this.textEspelho.apply();
				this.scene.translate(0,-4.5, 5.8);
				this.scene.scale(1,0.5,1);
				this.scene.rotate(Math.PI/2, 1,0,0);
				this.scene.rotate(-Math.PI/8, 1,0,0);
				this.perna1.display();
			this.scene.popMatrix();
			
			this.scene.pushMatrix();
				this.textPreto.apply();
				this.scene.translate(0,-5.5, 6.6);
				this.scene.scale(1,0.5,1);
				this.scene.rotate(Math.PI/2, 1,0,0);
				this.scene.rotate(-Math.PI/8, 1,0,0);
				this.perna2.display();
			this.scene.popMatrix();
			
		this.scene.pushMatrix();
			this.textEspelho.apply();
			this.scene.scale(0.8, 0.8, 0.8);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.translate(5, -44.5, 42);
			this.ovni.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.scale(0.8, 0.8, 0.8);
			this.scene.scale(0.2, 0.2, 0.2);
			this.scene.translate(5.3, -44.5, 54.5);
			this.scene.rotate(Math.PI, 1,0,0);
			this.ovni2.display();
		this.scene.popMatrix();
		
		this.scene.popMatrix();
		///////
		
		////
		
		this.textEspelho.apply();
		this.center.display();
	
	//vidros(4)
		this.scene.pushMatrix();
			this.scene.translate(4.5, -2.0, 3.5);
			this.scene.rotate(Math.PI/10, 1, 0, 0);
			this.scene.rotate(-Math.PI/10, 0, 0, 1);
			this.scene.rotate(Math.PI/7, 0, 1, 0);
			this.scene.scale(0.2, 0.2, 0.2);
			this.ovni.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(-4.5, -1.9, 3.5);
			this.scene.rotate(Math.PI/10, 1, 0, 0);
			this.scene.rotate(Math.PI/15, 0, 0, 1);
			this.scene.rotate(Math.PI/3, 0, 1, 0);
			this.scene.scale(0.2, 0.2, 0.2);
			this.ovni.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(6.0, -2.6, -4.0);
			this.scene.rotate(-Math.PI/20, 1, 0, 0);
			this.scene.rotate(-Math.PI/11, 0, 0, 1);
			this.scene.rotate(Math.PI/7, 0, 1, 0);
			this.scene.scale(0.2, 2.2, 0.2);
			this.ovni.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(-2.5, -1.8, -4.0);
			this.scene.rotate(-Math.PI/15, 1, 0, 0);
			this.scene.rotate(Math.PI/15, 0, 0, 1);
			this.scene.rotate(-Math.PI/3, 0, 1, 0);
			this.scene.scale(0.2, 0.2, 0.2);
			this.ovni.display();
		this.scene.popMatrix();
		
	this.scene.popMatrix();
		
this.scene.popMatrix();
		
};