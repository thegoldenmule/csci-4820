#version 300 es
precision highp float;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

in vec3 aVertexPosition;
in vec2 aTextureCoord;

out highp vec3 vertexPosition;
out highp vec2 vertexUv;

void main(void) {
  vec4 result = uProjectionMatrix
    * uModelViewMatrix
    * vec4(aVertexPosition, 1.0);
  
  vertexPosition = result.xyz / result.w;
  vertexUv = aTextureCoord;
  gl_Position = result;
}
