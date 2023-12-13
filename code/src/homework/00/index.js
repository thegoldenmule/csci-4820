const vec2 = glMatrix.vec2;

const drawHand = (ctx, center, rad, length) => {
  // TODO
};

window.loop = (dt, canvas) => {
  // grab the context
  const ctx = canvas.getContext('2d');

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // center of the clock
  const center = vec2.fromValues(canvas.width / 2, canvas.height / 2);

  // TODO: draw clock face
  // (extra credit for drawing the 12-hour clock face numbers)

  // TODO: get radians of hours, minutes, seconds

  // TODO: draw each hand
};