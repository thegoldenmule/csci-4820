const vec2 = glMatrix.vec2;

const drawHand = (ctx, center, rad, length) => {
  // calculate rotated vector
  const rotated = vec2.rotate(
    vec2.create(),
    vec2.fromValues(0, -length), vec2.create(), rad);
  
  // draw
  ctx.beginPath();
  {
    ctx.moveTo(center[0], center[1]);
    ctx.lineTo(center[0] + rotated[0], center[1] + rotated[1]);
  }
  ctx.stroke();
};

window.loop = (dt, canvas) => {
  // grab the context
  const ctx = canvas.getContext('2d');
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#DDDDDD';

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // dark background
  ctx.fillStyle = '#212121';
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();

  // draw the circle
  const diameter = 100;
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, diameter, 0, Math.PI * 2);
  ctx.stroke();

  // get hours, minutes, seconds
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // calculate inputs
  const center = vec2.fromValues(canvas.width / 2, canvas.height / 2);
  const hoursRad = ((2 * Math.PI) / 12) * (hours % 12);
  const minutesRad = ((2 * Math.PI) / 60) * minutes;
  const secondsRad = ((2 * Math.PI) / 60) * seconds;

  // draw the hands
  drawHand(ctx, center, hoursRad, 1 / 2 * diameter);
  drawHand(ctx, center, minutesRad, 2 / 3 * diameter);
  drawHand(ctx, center, secondsRad, 3 / 4 * diameter);
};
