/** @type {WebGLRenderingContext} */
let gl;

let program;
const clearColor = { r:Math.random(), g:Math.random(), b:Math.random() };
const shapes = [];

window.init = async (canvas) => {
  // context
  gl = canvas.getContext('webgl2');
  gl.clearColor(clearColor.r, clearColor.g, clearColor.b, 1.0);

  // load vertex and fragment shaders + create program
  const vertex = await window.loadShader({ gl, name: 'vertex', type: gl.VERTEX_SHADER });
  const fragment = await window.loadShader({ gl, name: 'fragment', type: gl.FRAGMENT_SHADER });
  program = gl.createProgram();
  program.attributes = {};

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(`Could not init shaders: ${gl.getProgramInfoLog(program)}`);
    return;
  }

  gl.useProgram(program);
  program.attributes.p = gl.getAttribLocation(program, 'aVertexPosition');

  // create a triangle!
  shapes.push(createQuad());
};

const createQuad = () => {
  const verts = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, verts);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -0.5, 0.5, 0,
      -0.5, -0.5, 0,
      0.5, -0.5, 0,
      0.5, 0.5, 0,
    ]),
    gl.STATIC_DRAW);

  const indices = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([0, 1, 2, 0, 2, 3]),
    gl.STATIC_DRAW);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  
  return { 
    draw: () => {
      gl.bindBuffer(gl.ARRAY_BUFFER, verts);
      gl.vertexAttribPointer(program.attributes.p, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(program.attributes.p);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    },
  };
};

window.loop = (dt, canvas) => {
  // clear
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  for (const shape of shapes) {
    shape.draw();
  }
  
};