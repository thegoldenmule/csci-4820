/** @type {WebGLRenderingContext} */
let gl;

const mat4 = glMatrix.mat4;
const vec3 = glMatrix.vec3;
const clearColor = { r:Math.random(), g:Math.random(), b:Math.random() };
const programs = {};
const shapes = [];

let AttributeDefinitions;

const loadShader = async ({ v = 'vertex', f = 'fragment' } = {}) => {
  // load vertex and fragment shaders + create program
  const vertex = await window.loadShader({ gl, name: v, type: gl.VERTEX_SHADER });
  const fragment = await window.loadShader({ gl, name: f, type: gl.FRAGMENT_SHADER });
  
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(`Could not init shaders: ${gl.getProgramInfoLog(program)}`);
    return;
  }

  program.attributes = {
    position: gl.getAttribLocation(program, AttributeDefinitions.POSITION.name),
    uv: gl.getAttribLocation(program, AttributeDefinitions.UV.name),
  };

  program.uniforms = {};
  program.uniforms.P = gl.getUniformLocation(program, "uProjectionMatrix");
  program.uniforms.MV = gl.getUniformLocation(program, "uModelViewMatrix");
  program.uniforms.Color = gl.getUniformLocation(program, "uColor");

  return program;
};

const initAttributeDefinitions = (gl) => {
  AttributeDefinitions = {
    POSITION: {
      key: 'position',
      name: 'aVertexPosition',
      size: 3,
      type: gl.FLOAT,
      normalize: false,
      stride: 0,
      offset: 0,
    },
    UV: {
      key: 'uv',
      name: 'aTextureCoord',
      size: 2,
      type: gl.FLOAT,
      normalize: false,
      stride: 0,
      offset: 0,
    }
  };
};

const geo = {
  quad: () => {
    return {
      vertices: [
        1, 0, 1,
        -1, 0, 1,
        -1, 0, -1,
        1, 0, -1,
      ],
      uvs: [
        1, 1,
        0, 1,
        0, 0,
        1, 0,
      ],
      indices: [
        0, 1, 2,
        0, 2, 3,
      ],
    };
  },

  octohedron: () => {
    return {
      vertices: [
        1, 0, 0,
        -1, 0, 0,
        0, 1, 0,
        0, -1, 0,
        0, 0, 1,
        0, 0, -1,
      ],
      uvs: [
        0, 0,
        1, 0,
        0, 1,
        1, 1,
        0, 0,
        1, 0,
      ],
      indices: [
        4, 0, 2,
        4, 2, 1,
        4, 1, 3,
        4, 3, 0,
        5, 2, 0,
        5, 1, 2,
        5, 3, 1,
        5, 0, 3,
      ],
    };
  },

  icosahedron: () => { 
    return {
      vertices: [
        -0.525731112119133606, 0, 0.850650808352039932,
        0.525731112119133606, 0, 0.850650808352039932,
        -0.525731112119133606, 0, -0.850650808352039932,

        0.525731112119133606, 0, -0.850650808352039932,
        0, 0.850650808352039932, 0.525731112119133606,
        0, 0.850650808352039932, -0.525731112119133606,

        0, -0.850650808352039932, 0.525731112119133606,
        0, -0.850650808352039932, -0.525731112119133606,
        0.850650808352039932, 0.525731112119133606, 0,

        -0.850650808352039932, 0.525731112119133606, 0,
        0.850650808352039932, -0.525731112119133606, 0,
        -0.850650808352039932, -0.525731112119133606, 0,
      ],
      indices: [
        1,4,0,
        4,9,0,
        4,5,9,
        8,5,4,
        1,8,4,
        1,10,8,
        10,3,8,
        8,3,5,
        3,2,5,
        3,7,2,
        3,10,7,
        10,6,7,
        6,11,7,
        6,0,11,
        6,1,0,
        10,1,6,
        11,0,9,
        2,11,9,
        5,2,9,
        11,2,7
      ],
    };
  },

  sphere: (iterations = 3) => {
    let { vertices, indices } = geo.icosahedron();

    for (let i = 0; i < iterations; i++) {
      const result = subdivide({ vertices, indices });

      vertices = result.vertices;
      indices = result.indices;
    }

    normalize(vertices);

    return {
      vertices,
      indices,
    };
  },
};

const subdivide = ({
  vertices,
  indices,
}) => {
  // cache of midpoint indices
  const midpointIndices = {};

  // create lists instead...
  const indexList = [];
  const vertexList = new Array(...vertices);

  // subdivide each triangle
  for (var i = 0; i < indices.length - 2; i += 3)
  {
      // grab indices of triangle
      const i0 = indices[i];
      const i1 = indices[i + 1];
      const i2 = indices[i + 2];

      // calculate new indices
      const m01 = getMidpointIndex(midpointIndices, vertexList, i0, i1);
      const m12 = getMidpointIndex(midpointIndices, vertexList, i1, i2);
      const m02 = getMidpointIndex(midpointIndices, vertexList, i2, i0);

      indexList.push(
        i0,   m01,  m02,
        i1,   m12,  m01,
        i2,   m02,  m12,
        m02,  m01,  m12,
      );
  }

  return {
    vertices: vertexList,
    indices: indexList,
  };
};

const getMidpointIndex = (midpointIndices, vertices, i0, i1) => {
  // create a key
  const edgeKey = `${Math.min(i0, i1)}-${Math.max(i0, i1)}`;

  let midpointIndex = -1;

  // if there is not index already...
  if (!midpointIndices.hasOwnProperty(edgeKey))
  {
      // grab the vertex values
      const i0x = i0 * 3;
      const i0y = i0 * 3 + 1;
      const i0z = i0 * 3 + 2;

      const i1x = i1 * 3;
      const i1y = i1 * 3 + 1;
      const i1z = i1 * 3 + 2;

      const v0 = vec3.fromValues(
        vertices[i0x],
        vertices[i0y],
        vertices[i0z]);
      const v1 = vec3.fromValues(
        vertices[i1x],
        vertices[i1y],
        vertices[i1z]);

      // calculate
      const midpoint = vec3.fromValues(
        (v0[0] + v1[0]) / 2,
        (v0[1] + v1[1]) / 2,
        (v0[2] + v1[2]) / 2);

      midpointIndex = vertices.length / 3;
      vertices.push(midpoint[0], midpoint[1], midpoint[2]);

      midpointIndices[edgeKey] = midpointIndex;
  } else {
    midpointIndex = midpointIndices[edgeKey];
  }

  return midpointIndex;
};

const normalize = (vertices) => {
  for (let i = 0; i < vertices.length; i += 3) {
    const v = vec3.fromValues(
      vertices[i],
      vertices[i + 1],
      vertices[i + 2]);
    
    vec3.normalize(v, v);

    vertices[i] = v[0];
    vertices[i + 1] = v[1];
    vertices[i + 2] = v[2];
  }
};

const generatePrimitive = ({ vertices, indices, uvs, transform, }) => {
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertices),
    gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  const ibo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  let uvbo;
  if (uvs) {
    uvbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvbo);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(uvs),
      gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  const MV = mat4.create();

  const node = {
    program: programs.default,
    transform: transform || mat4.identity(mat4.create()),
    draw: ({ program, V }) => {
      const M = node.transform;
      mat4.multiply(MV, V, M);
      gl.uniformMatrix4fv(program.uniforms.MV, false, MV);

      // attributes
      {
        const { size, type, normalized, stride, offset } = AttributeDefinitions.POSITION;
        const pointer = program.attributes.position;
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.vertexAttribPointer(pointer, size, type, normalized, stride, offset);
        gl.enableVertexAttribArray(pointer);

        if (uvbo) {
          const pointer = program.attributes.uv;
          if (pointer !== -1) {
            const { size, type, normalized, stride, offset } = AttributeDefinitions.UV;
            gl.bindBuffer(gl.ARRAY_BUFFER, uvbo);
            gl.vertexAttribPointer(pointer, size, type, normalized, stride, offset);
            gl.enableVertexAttribArray(pointer);
          }
        }
      }

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    },
  };

  return node;
};

window.init = async (canvas) => {
  // context
  gl = canvas.getContext('webgl2');
  gl.clearColor(clearColor.r, clearColor.g, clearColor.b, 1.0);
  gl.clearDepth(100);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  initAttributeDefinitions(gl);

  programs.default = await loadShader();

  const octohedron = generatePrimitive(geo.sphere());
  octohedron.update = (dt) => {
    const speed = 0.1;
    const angle = speed * dt * (Math.PI / 180);
    mat4.rotateX(octohedron.transform, octohedron.transform, angle);
    mat4.rotateY(octohedron.transform, octohedron.transform, angle);
  };
  shapes.push(octohedron);
};

window.loop = (dt, canvas) => {
  const { width, height } = canvas;

  // clear
  gl.viewport(0, 0, width, height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // setup matrices
  const P = mat4.perspective(mat4.create(),
    45 * (Math.PI / 180),
    width / height,
    0.1, 10000);

  const V = mat4.identity(mat4.create());
  mat4.translate(V, V, [0, 0, -3]);
  mat4.rotateX(V, V, 0.05 * Math.PI);
  for (const { program, update, draw } of shapes) {
    if (update) {
      update(dt);
    }

    const { uniforms, } = program;
    gl.useProgram(program);
    {
      gl.uniformMatrix4fv(uniforms.P, false, P);
    }

    draw({ program, V });
  }
};