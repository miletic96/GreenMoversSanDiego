let componentsToRender = new Map();

function removeDevPageAssets(){
    const devScriptsEl = document.getElementById('dev-lsf-boost-js');

    devScriptsEl.remove();
}

function addComponentToRender(componentName) {
    const key = componentName.toUpperCase();
    if (!componentsToRender.has(key)) {
        componentsToRender.set(key, 0);
    }

    componentsToRender.set(key, componentsToRender.get(key) + 1);
}

function finishComponentRendering(componentName) {
    const key = componentName.toUpperCase();

    if (!componentsToRender.has(key)) return;
    componentsToRender.set(key, componentsToRender.get(key) - 1);
}

function isRenderingFinished() {
    for (const componentName of componentsToRender.keys()) {
        if (componentsToRender.get(componentName) != 0) return false;
    }
    return true;
}

function insertCss(name, cssPath) {
    const linkId = `lsf-boost-${name}-css`;
    if (document.getElementById(linkId)) return;

    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);
}

function insertJs(name, jsPath) {
    const scriptId = `lsf-boost-${name}-js`;
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = jsPath;
    document.getElementById('lsf-boost-js').appendChild(script);
}


function renderComponent(node, componentName, componentData) {
    const component = node.querySelector(componentName);
    if (!component) return;

    addComponentToRender(componentName);
    const props = {};
    for (const attr of component.attributes) {
        if (!attr.name.startsWith('lb-props-')) continue;
        const propName = attr.name.replace('lb-props-', '');
        props[propName] = attr.value;
    }

    const rendered = document.createElement('section');
    rendered.innerHTML = componentData.html;
    for (const attr of rendered.firstChild.attributes) {
        if (!attr.name.startsWith('lb-props-')) continue;
        const propName = attr.name.replace('lb-props-', '');
        if (props[propName]) continue;

        props[propName] = attr.value;
    }

    props['lbContent'] = component.innerHTML;

    rendered.innerHTML = Mustache.render(componentData.html, props);

    for (const propName of Object.keys(props)) {
        rendered.firstChild.removeAttribute(`lb-props-${propName}`);
    }

    component.replaceWith(rendered.firstChild);

    if (componentData.css) {
        insertCss(componentName, componentData.css);
    }

    if (componentData.js) {
        insertJs(componentName, componentData.js);
    }
}

function rerender(componentsMap) {
    for (const componentName of componentsMap.keys()) {
        renderComponent(document.body, componentName, componentsMap.get(componentName));
    }
}

function watch(componentsMap) {
    const targetNode = document.body;
    const config = { attributes: true, childList: true, subtree: true };

    const checkForNewComponents = function (mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for (const mutation of mutationsList) {
            for (const node of mutation.addedNodes) {
                rerender(componentsMap);
            }
            for (const node of mutation.removedNodes) {
                finishComponentRendering(node.nodeName);
            }
        }

        if (isRenderingFinished()) {
            removeDevPageAssets();
            
            console.log('Zavrsen rendering');
            observer.disconnect();
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(checkForNewComponents);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    return observer;
}

async function init() {
    const components = new Map();

    const result = await fetch('/components.json');
    const data = await result.json();
    for (const c of data) {
        components.set(c.name, c);
    }

    watch(components);

    rerender(components);
}

init();
