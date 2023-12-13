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

const getParameter = (name) => {
    // pull off query parameter
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
};

const attachScript = (type, index) => {
    // try to attach the script
    const url = `./src/${type}/${index}/index.js`;

    console.log(`Attaching '${url}'.`);

    const scriptTag = document.createElement('script');
    scriptTag.src = url;
    document.head.appendChild(scriptTag);
    document.title = `${type}/${index}`;

    // start loop
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    window.requestAnimationFrame(loop);
};

const createLink = (type, index) => {
    const container = document.getElementById('container');
    const link = document.createElement('a');
    link.href = `?${type}=${index}`;
    link.innerText = `${type}/${index}`;

    container.prepend(link);
    container.prepend(document.createElement('br'));
};

// Add a listener for the page load.
// See: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)
window.onload = () => {
    _canvas = document.getElementById('canvas');

    // example?
    const example = getParameter("example");
    const homework = getParameter("homework");
    const solution = getParameter("solution");
    const solutionTarget = getParameter("solution-target");
    if (example) {
        attachScript("example", example);
    } else if (homework) {
        attachScript("homework", homework);
    } else if (solution) {
        attachScript("solution", solution);
    } else if (solution) {
        attachScript("solution-target", solutionTarget);
    } else {
        ["01", "00"].map(i => createLink("example", i));
    }
};
