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
};

// Add a listener for the page load.
// See: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)
window.onload = () => {
    // attach lesson
    attachScript(getLessonParameter());
};
