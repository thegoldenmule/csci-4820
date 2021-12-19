console.log('Loaded 00.');

// Demo using 2d context
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const resize = (canvas) => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight;
};

const loop = () => {
    resize(canvas);

    const size = 50;
    for (let x = 0, width = canvas.width; x < width; x += size)
    {
        for (let y = 0, height = canvas.height; y < height; y += size)
        {
            ctx.fillStyle = ((x / size + y / size) % 2) === 1 ? '#000000' : '#F0F0F0';
            ctx.fillRect(x, y, size, size);
        }
    }

    window.requestAnimationFrame(loop);
};

window.requestAnimationFrame(loop);