#version 300 es
precision highp float;

in highp vec3 vertexPosition;
in highp vec2 vertexUv;

out mediump vec4 fragColor;

void main(void)
{
  fragColor = vec4(vertexUv.x, vertexUv.y, 0.0, 1.0);
}
