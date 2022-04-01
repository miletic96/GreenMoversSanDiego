const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse');

const DIST_ROOT = path.resolve('.', 'dist');
const REPORTS_ROOT = path.resolve('.', 'reports', 'seo');
const SERVER_URL = 'http://localhost:3000';
let chrome = null;


async function generateSeoReport(pageName) {
    const options = { logLevel: 'error', output: 'html', onlyCategories: ['accessibility', 'best-practices', 'performance', 'seo'], port: chrome.port };
    const runnerResult = await lighthouse(`${SERVER_URL}/dist/${pageName}.html`, options);

    // `.report` is the HTML report as a string
    const reportHtml = runnerResult.report;

    await fs.writeFile(path.resolve(REPORTS_ROOT, `${pageName}-SeoReport.html`), reportHtml);

    // `.lhr` is the Lighthouse Result as a JS object
    console.log('Report is done for', runnerResult.lhr.finalUrl);
    console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
}

async function generateSeoReports() {
    const { default: Lws } = await import('local-web-server');

    const lws = await Lws.create({
        port: 3000,
        directory: '.'
    });

    chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

    await fs.mkdir(REPORTS_ROOT, {
        recursive: true
    });

    const pages = (await fs.readdir(DIST_ROOT)).filter(d => d.endsWith('.html')).map(d => d.replace('.html', ''));
    for (const page of pages) {
        await generateSeoReport(page);
    }

    await lws.server.close();
    await chrome.kill();
}

module.exports = {
    generateSeoReports
};