// Add a listener for the page load.
// See: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)
window.onload = () => {
    // pull off the lesson query parameter
    const params = new URLSearchParams(window.location.search);
    const lesson = params.get('lesson') || '00';

    // try to attach the lesson
    const url = `./src/${lesson}/index.js`;

    console.log(`Attaching '${url}'.`);

    const scriptTag = document.createElement('script');
    scriptTag.src = url;
    document.head.appendChild(scriptTag);
};
