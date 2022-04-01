const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

const PAGES_ROOT = path.resolve('.', 'pages');
const ASSETS_ROOT = path.resolve('.', 'assets');

async function copyCssAssets({
    pagePath,
    pageContext
}) {
    const cssSourcePath = path.resolve(pagePath, 'style.css');
    const cssDestDir = path.resolve(ASSETS_ROOT, 'css');
    const cssDestPath = path.resolve(cssDestDir, `${pageContext}.css`);

    if (!fsSync.existsSync(cssSourcePath)) return false;

    await fs.mkdir(cssDestDir, {
        recursive: true
    });

    await fs.writeFile(cssDestPath, await fs.readFile(cssSourcePath));
    return true;
}

async function copyJsAssets({
    pagePath,
    pageContext
}) {
    const jsSourcePath = path.resolve(pagePath, 'script.js');
    const jsDestDir = path.resolve(ASSETS_ROOT, 'js');
    const jsDestPath = path.resolve(jsDestDir, `${pageContext}.js`);

    if (!fsSync.existsSync(jsSourcePath)) return false;

    await fs.mkdir(jsDestDir, {
        recursive: true
    });

    await fs.writeFile(jsDestPath, await fs.readFile(jsSourcePath));
    return true;
}

async function copyAssets({
    pagePath,
    pageContext
}) {

    const copiedCss = await copyCssAssets({
        pagePath,
        pageContext
    });

    const copiedJs = await copyJsAssets({
        pagePath,
        pageContext
    });

    return {
        css: copiedCss ? `/assets/css/${pageContext}.css` : undefined,
        js: copiedJs ? `/assets/js/${pageContext}.js` : undefined
    };
}

async function buildPagesAssets() {
    const pages = (await fs.readdir(PAGES_ROOT))
        .filter(d => d != '.' && d != '..' && fsSync.statSync(path.resolve(PAGES_ROOT, d)).isDirectory())
        .map(d => {
            return {
                pagePath: path.resolve(PAGES_ROOT, d),
                pageContext: d
            };
        });

    for (const pageData of pages) {
        await copyAssets(pageData);
    }
}

module.exports = {
    buildPagesAssets
};