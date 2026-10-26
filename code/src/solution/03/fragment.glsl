#version 300 es
precision mediump float;

uniform vec4 uColor;

// Color that is the result of this shader
out vec4 fragColor;

void main(void) {
  // Set the result
  fragColor = uColor;
}