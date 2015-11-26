//LAIGPROB3_inicio
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D heightMap;
uniform sampler2D textureMask;

varying vec2 vTextureCoord;
varying float vMask;

void main() {
	
	vTextureCoord = aTextureCoord;
	
	// obter componente R da textura de máscara para o vértice atual
	vMask = texture2D(textureMask, vTextureCoord).r;
	// obter componente R da textura de heightmap para o vértice atual
	//float vAmount = texture2D(heightMap, vTextureCoord).r;
	
	vec3 offset;
	
	// se componente R da máscara for menor do que 0.25
	if (vMask < 0.2) {
	
		offset = vec3(0.0, texture2D(heightMap, aTextureCoord).r, 0.0);
	
	}
	else {
		// vértice tem comportamento normal (reage ao heightmap)
		offset = vec3(0, 0.5, 0.0);
	}
	
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

//LAIGPROB3_fim.