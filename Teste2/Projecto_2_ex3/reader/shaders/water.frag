#ifdef GL_ES
precision highp float;
#endif


//LAIGPROB3_inicio

varying vec2 vTextureCoord;
varying float vMask;

uniform sampler2D texture;
uniform sampler2D textureMask;
uniform sampler2D texture2;

void main() {
	// se componente R da máscara for menor do que 0.2
	
	if (vMask < 0.2) {
		// é aplicada ao fragmento a textura de cor original
		
		gl_FragColor =  texture2D(texture2, vTextureCoord);
		
	}
	else {
		// é aplicada ao fragmento a textura de máscara
		gl_FragColor =  texture2D(textureMask, vTextureCoord);
	}
}

//LAIGPROB3_fim