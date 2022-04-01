const fs = require('fs').promises;
const fsSync = require('fs');
const pathLib = require('path');

const COMPONENTS_ROOT = './components';
const ASSETS_ROOT = './assets/components';

const component = {
    name: '',
    html: '',
    scripts: [''],
    styles: ['']
};

async function scanForContexts(path, context) {
    const stack = (await fs.readdir(path))
        .filter(d => d != '.' && d != '..' && fsSync.statSync(pathLib.resolve(path, d)).isDirectory())
        .map(d => {
            return {
                name: d,
                path: pathLib.resolve(path, d),
                context: context ? `${context}-${d}` : d
            };
        })
        .reverse();

    return stack;
}

async function copyCssAssets({
    path,
    context
}) {
    const cssSourcePath = pathLib.resolve(path, 'style.css');
    const cssDestDir = pathLib.resolve(ASSETS_ROOT, 'css', ...context.split('-'));
    const cssDestPath = pathLib.resolve(cssDestDir, 'style.css');

    if (!fsSync.existsSync(cssSourcePath)) return false;

    await fs.mkdir(cssDestDir, {
        recursive: true
    });

    await fs.writeFile(cssDestPath, await fs.readFile(cssSourcePath));
    return true;
}

async function copyJsAssets({
    path,
    context
}) {
    const jsSourcePath = pathLib.resolve(path, 'script.js');
    const jsDestDir = pathLib.resolve(ASSETS_ROOT, 'js', ...context.split('-'));
    const jsDestPath = pathLib.resolve(jsDestDir, 'script.js');

    if (!fsSync.existsSync(jsSourcePath)) return false;

    await fs.mkdir(jsDestDir, {
        recursive: true
    });

    await fs.writeFile(jsDestPath, await fs.readFile(jsSourcePath));
    return true;
}

async function copyAssets({
    name,
    path,
    context
}) {

    const copiedCss = await copyCssAssets({
        path,
        context
    });

    const copiedJs = await copyJsAssets({
        path,
        context
    });

    return {
        css: copiedCss ? `/assets/components/css/${context.split('-').join('/')}/style.css` : undefined,
        js: copiedJs ? `/assets/components/js/${context.split('-').join('/')}/script.js` : undefined
    };
}

async function compileComponents() {
    const stack = await scanForContexts(COMPONENTS_ROOT, '');
    const components = [];

    while (stack.length) {
        const current = stack.pop();

        const subContexts = await scanForContexts(current.path, current.context);
        if (subContexts.length) {
            stack.push(...subContexts);
            continue;
        }

        //component
        const componentHtml = (await fs.readFile(pathLib.resolve(current.path, 'index.html'))).toString();
        const cssPath = pathLib.resolve(current.path, 'style.css');
        const jsPath = pathLib.resolve(current.path, 'script.js');


        components.push({
            name: current.context.toUpperCase(),
            html: componentHtml,
            ...(await copyAssets(current))
        });
    }

    await fs.writeFile('components.json', JSON.stringify(components, null, 4));
}

module.exports = {
    compileComponents
};