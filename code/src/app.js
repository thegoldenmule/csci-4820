let _canvas;
let _lastFrameTime;

const loop = (time) => {
    if (!_lastFrameTime) {
        _lastFrameTime = time;
    }

    const dt = time - _lastFrameTime;
    _lastFrameTime = time;

    if (_canvas) {
        _canvas.width = _canvas.clientWidth
        _canvas.height = _canvas.clientHeight;
    }

    if (window.loop) {
        window.loop(dt, _canvas);
    }

    window.requestAnimationFrame(loop);
};

const getLessonParameter = () => {
    // pull off the lesson query parameter
    const params = new URLSearchParams(window.location.search);
    return params.get('lesson') || '00';
};

const attachScript = (lesson) => {
    // try to attach the lesson
    const url = `./src/${lesson}/index.js`;

    console.log(`Attaching '${url}'.`);

    const scriptTag = document.createElement('script');
    scriptTag.src = url;
    document.head.appendChild(scriptTag);

    document.title = `Lesson ${lesson}`;

    // start loop
    window.requestAnimationFrame(loop);
};

// Add a listener for the page load.
// See: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)
window.onload = () => {
    _canvas = document.getElementById('canvas');

    // attach lesson
    attachScript(getLessonParameter());
};
