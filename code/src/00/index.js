console.log('Loaded 00.');

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

    // draw dashed lines
    for (let x = 0, width = canvas.width; x < width; x += size) {
        ctx.beginPath();
        ctx.setLineDash([
            Math.cos(acc / x) * canvas.height / 4,
            Math.cos(acc / x) * canvas.height / 8,
        ]);
        ctx.moveTo(x + size / 2, 0);
        ctx.lineTo(x + size / 2, canvas.height);
        ctx.stroke();
    }
};
