console.log('Loaded 00.');

// Demo using 2d context
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const resize = (canvas) => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight;
};

const speed = 0.1;
let acc = 0.1;

const loop = () => {
    resize(canvas);

    acc += speed;

    const size = 50;
    for (let x = 0, width = canvas.width; x < width; x += size) {
        for (let y = 0, height = canvas.height; y < height; y += size) {
            ctx.fillStyle = (x / size + y / size) % 2 === 1 ? '#222222' : '#c0c0c0';
            ctx.fillRect(x, y, size, size);
        }
    }

    for (let x = 0, width = canvas.width; x < width; x += size) {
        ctx.beginPath();
        ctx.setLineDash([100 * Math.cos(acc / x) * Math.sin(acc / x), 100 * Math.sin(acc / x)]);
        ctx.moveTo(x + size / 2, 0);
        ctx.lineTo(x + size / 2, canvas.height);
        ctx.stroke();
    }

    window.requestAnimationFrame(loop);
};

window.requestAnimationFrame(loop);