
// Demo using 2d context
// Read: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

const speed = 0.1;
let acc = 0.1;

window.loop = (dt, canvas) => {
    acc += dt * speed;

    // grab the context
    const ctx = canvas.getContext('2d');

    // draw squares
    const size = 50;
    for (let x = 0, width = canvas.width; x < width; x += size) {
        for (let y = 0, height = canvas.height; y < height; y += size) {
            ctx.fillStyle = (x / size + y / size) % 2 === 1 ? '#222222' : '#c0c0c0';
            ctx.fillRect(x, y, size, size);
        }
    }

    // draw circle
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
    ctx.fillStyle = '#ff0000';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    // draw plus sign
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 50, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + 50, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, canvas.height / 2 - 50);
    ctx.lineTo(canvas.width / 2, canvas.height / 2 + 50);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
};
