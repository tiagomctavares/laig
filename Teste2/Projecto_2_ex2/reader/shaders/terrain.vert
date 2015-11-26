attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D heightMap;

varying vec2 vTextureCoord;

void main() {
	
	vTextureCoord = aTextureCoord;
	float vAmount = texture2D(heightMap, vTextureCoord).r;
	
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + aVertexNormal * vAmount * 0.25, 1.0);
}

