let gl;

const verts = [
  0, 0, 0,
  0.5, 0.5, 0,
  1, 0, 0,
];

const indices = [
  0, 1, 2,
];

const createTri = () => {
  const verts = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, verts);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
  // This is bad practice -- the book is wrong.
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  const indices = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  // This is bad practice -- the book is wrong.
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};

window.init = (canvas) => {
  // context
  gl = canvas.getContext('webgl2');

  // clear
  gl.clearColor(Math.random(), Math.random(), Math.random(), 1)
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, 0, 0);

  // buffer
  createTri();
};

window.loop = (dt, canvas) => {
  
};