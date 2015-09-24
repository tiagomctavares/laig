/**
 * MyLeftWall
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
 
function MyLeftWall(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);
	this.minS = typeof minS !== 'undefined' ? minS : 0;
	this.maxS = typeof maxS !== 'undefined' ? maxS : 1;
	this.minT = typeof minT !== 'undefined' ? minT : 0;
	this.maxT = typeof maxT !== 'undefined' ? maxT : 1;


	this.quadTESTE = new MyQuad(this.scene, -1, 2, -0.5, 1.5);

	this.pontosX = [];
	this.pontosY = [];

	var MLADO = 0.345; // Margem lados
	var MALT = 0.273; // Margem cima e baixo
	var LBC = 0.035; // Largura barra central
	var DBL = 0.085; // Delta barras verticais
	var LBL = 0.007; // Largura barras verticais
	var YBA = 0.395; // Altura Barra Hozintal
	var LBA = 0.045; //Largura Barra Horizontal
	var LMB = 0.015; // Largura Mini Barras
	var YMB1 = 0.517; // Altura Mini Barra 1
	var YMB2 = 0.62; // Altura Mini Barra 2

	// Lado Esquerdo
	this.pontosX.push(0,MLADO,0,MLADO,0,MLADO);
	this.pontosY.push(0,MALT,MALT,1-MALT,1-MALT,1);
	// Baixo e cima
	this.pontosX.push(MLADO,2/3);
	this.pontosY.push(1-MALT,1);
	this.pontosX.push(MLADO,2/3);
	this.pontosY.push(0,MALT);
	// Lado Direito
	this.pontosX.push(1-MLADO,1,1-MLADO,1,1-MLADO,1);
	this.pontosY.push(0,MALT,MALT,1-MALT,1-MALT,1);
	// Barra vertical central
	this.pontosX.push(0.5-LBC/2,0.5+LBC/2);
	this.pontosY.push(MALT,1-MALT);
	// Barras verticais
	this.pontosX.push(0.5-DBL-LBL/2,0.5-DBL+LBL/2,0.5+DBL-LBL/2,0.5+DBL+LBL/2);
	this.pontosY.push(MALT,1-MALT,MALT,1-MALT);
	// Barra Horintal
	this.pontosX.push(MLADO,0.5-DBL-LBL/2,0.5-DBL+LBL/2,0.5-LBC/2,0.5+LBC/2,0.5+DBL-LBL/2,0.5+DBL+LBL/2,1-MLADO);
	this.pontosY.push(YBA-LBA/2,YBA+LBA/2,YBA-LBA/2,YBA+LBA/2,YBA-LBA/2,YBA+LBA/2,YBA-LBA/2,YBA+LBA/2);
	// Mini Barra 1
	this.pontosX.push(MLADO,0.5-DBL-LBL/2,0.5-DBL+LBL/2,0.5-LBC/2,0.5+LBC/2,0.5+DBL-LBL/2,0.5+DBL+LBL/2,1-MLADO);
	this.pontosY.push(YMB1-LMB/2,YMB1+LMB/2,YMB1-LMB/2,YMB1+LMB/2,YMB1-LMB/2,YMB1+LMB/2,YMB1-LMB/2,YMB1+LMB/2);
	// Mini Barra 2
	this.pontosX.push(MLADO,0.5-DBL-LBL/2,0.5-DBL+LBL/2,0.5-LBC/2,0.5+LBC/2,0.5+DBL-LBL/2,0.5+DBL+LBL/2,1-MLADO);
	this.pontosY.push(YMB2-LMB/2,YMB2+LMB/2,YMB2-LMB/2,YMB2+LMB/2,YMB2-LMB/2,YMB2+LMB/2,YMB2-LMB/2,YMB2+LMB/2);

	this.quads = [];
	for (var i = 0; i < this.pontosX.length; i+=2)
	{
		var minS = this.minS + this.pontosX[i]*(this.maxS-this.minS);
		var maxS = this.minS + this.pontosX[i+1]*(this.maxS-this.minS);
		var minT = this.minT + this.pontosY[i]*(this.maxT-this.minT);
		var maxT = this.minT + this.pontosY[i+1]*(this.maxT-this.minT);
		this.quads.push(new MyQuad(this.scene,minS,maxS,minT,maxT));
	}

};

MyLeftWall.prototype = Object.create(CGFobject.prototype);
MyLeftWall.prototype.constructor=MyLeftWall;

MyLeftWall.prototype.display = function() {

for (var i = 0; i < this.pontosX.length; i+=2)
{
	var largura = this.pontosX[i+1]-this.pontosX[i];
	var altura = this.pontosY[i+1]-this.pontosY[i];
	this.scene.pushMatrix();
	this.scene.translate(this.pontosX[i]-0.5+largura/2,-this.pontosY[i]+0.5-altura/2,0);
	this.scene.scale(largura, altura, 1);
	this.quads[i/2].display();
	this.scene.popMatrix();
}

};

