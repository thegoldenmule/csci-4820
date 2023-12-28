
let speed = 0.5;
let acc = 0.0;

window.loop = (dt, canvas) => {
    acc += dt * speed;

    // grab the context
    const ctx = canvas.getContext('2d');

    // bouncing rect
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, acc, 100, 100);

    if (acc > canvas.height - 100 || acc < 0) {
        speed *= -1;
    }
};
