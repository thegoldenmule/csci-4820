const vec2 = glMatrix.vec2;

let velocity = vec2.fromValues(3.1, 1.46);
let acc = vec2.fromValues(0, 0);

window.loop = (dt, canvas) => {
  const d = vec2.create();
  vec2.scale(d, velocity, dt);
  vec2.add(acc, acc, d);

  const x = acc[0];
  const y = acc[1];

  // grab the context
  const ctx = canvas.getContext('2d');

  // bouncing rect
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#FF0000';
  ctx.fillRect(x, y, 100, 100);

  if (x > canvas.width - 100 || x < 0) {
    velocity[0] *= -1;
  }
  if (y > canvas.height - 100 || y < 0) {
    velocity[1] *= -1;
  }
};
