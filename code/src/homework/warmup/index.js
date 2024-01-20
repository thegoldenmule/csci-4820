
// Demo using 2d context
// Read:
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill

const speed = 0.1;
let acc = 0.1;

window.loop = (dt, canvas) => {
    acc += dt * speed;

    // grab the context
    const ctx = canvas.getContext('2d');

    /**
     * TODO:
     * 
     * Use path, stroke, and fill to tile the screen with any n-gon where n is odd.
     * No adjacent shape may use the same color.
     */
};
