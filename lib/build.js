const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PAGES_ROOT = path.resolve('.', 'pages');
const LOCAL_SERVER = 'http://127.0.0.1:3000';
const DIST_ROOT = path.resolve('.', 'dist');
let browser = null;


async function renderPage(location) {
    const page = await browser.newPage();
    await page.goto(location, {
        waitUntil: 'networkidle0'
    });
    const content = await page.content();
    return content;
}

async function buildPage(pageName) {
    const pagePath = path.resolve(PAGES_ROOT, pageName.replace(/-/g, path.sep));
    if (!fsSync.existsSync(pagePath)) throw new Error('PAGE_NOT_EXIST');

    const pageIndexPath = path.resolve(pagePath, 'index.html');
    if (!fsSync.existsSync(pageIndexPath)) throw new Error('PAGE_NOT_EXIST');
    const location = `${LOCAL_SERVER}/pages/${pageName.replace(/-/g, '/')}/index.html`;
    const renderedPage = await renderPage(location);

    await fs.mkdir(DIST_ROOT, {
        recursive: true
    });

    await fs.writeFile(path.resolve(DIST_ROOT, `${pageName}.html`), renderedPage);
}

async function buildPages() {
    const { default: Lws } = await import('local-web-server');

    const lws = await Lws.create({
        port: 3000,
        directory: '.'
    });

    browser = await puppeteer.launch();

    const pageNames = (await fs.readdir(PAGES_ROOT)).filter(d => d != '.' && d != '..' && fsSync.statSync(path.resolve(PAGES_ROOT, d)).isDirectory());
    for (const pageName of pageNames) {
        await buildPage(pageName);
    }

    await lws.server.close();
    await browser.close();
}

module.exports = {
    buildPages
};