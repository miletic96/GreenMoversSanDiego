const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const mustache = require('mustache');
const { compileComponents } = require('../lib/compile');
const { buildPagesAssets } = require('../lib/buildPageAssets');
const { generateSeoReports } = require('../lib/generateSeoReports');
const { buildPages } = require('../lib/build');

const COMPONENTS_ROOT = path.resolve('.', 'components');
const PAGES_ROOT = path.resolve('.', 'pages');
const TEMPLATES_ROOT = path.resolve('.', 'templates');

async function generateComponentHtmlFromTemplate({
    componentName
}) {
    const templatePath = path.resolve(TEMPLATES_ROOT, 'component.html');
    if (!fsSync.existsSync(templatePath)) return '';
    const template = (await fs.readFile(templatePath)).toString();

    return mustache.render(template, {
        componentName
    });
}

async function generateComponentCssFromTemplate({
    componentName
}) {
    const templatePath = path.resolve(TEMPLATES_ROOT, 'component.css');
    if (!fsSync.existsSync(templatePath)) return '';
    const template = (await fs.readFile(templatePath)).toString();

    return mustache.render(template, {
        componentName
    });
}

async function generateComponentDocFromTemplate({
    componentName,
    componentClass
}) {
    const templatePath = path.resolve(TEMPLATES_ROOT, 'component.md');
    if (!fsSync.existsSync(templatePath)) return '';
    const template = (await fs.readFile(templatePath)).toString();

    return mustache.render(template, {
        componentName,
        componentClass
    });
}

async function generatePageHtmlFromTemplate({
    includeCSS,
    includeJS,
    pageName
}) {
    const templatePath = path.resolve(TEMPLATES_ROOT, 'page.html');
    if (!fsSync.existsSync(templatePath)) return '';
    const template = (await fs.readFile(templatePath)).toString();

    return mustache.render(template, {
        includeCSS,
        includeJS,
        pageName
    });
}

async function createNewComponent(componentName, {
    createStyle,
    createScript,
    force
}) {
    const componentPath = path.resolve(COMPONENTS_ROOT, componentName.replace(/-/g, path.sep));
    if (fsSync.existsSync(componentPath) && !force) {
        console.log('Component already exists! Try using -f if you want to overwrite it.');
        return;
    }

    await fs.mkdir(componentPath, {
        recursive: true
    });

    await fs.writeFile(path.resolve(componentPath, 'index.html'), await generateComponentHtmlFromTemplate({
        componentName: componentName.toLowerCase()
    }));
    if (createStyle) {
        await fs.writeFile(path.resolve(componentPath, 'style.css'), await generateComponentCssFromTemplate({
            componentName: componentName.toLowerCase()
        }));
    }
    if (createScript) {
        await fs.writeFile(path.resolve(componentPath, 'script.js'), '');
    }

    await fs.writeFile(path.resolve(componentPath, 'doc.md'), await generateComponentDocFromTemplate({
        componentName,
        componentClass: componentName.toLowerCase()
    }));
}

async function createNewPage(pageName, {
    createStyle,
    createScript,
    force
}) {
    const pagePath = path.resolve(PAGES_ROOT, pageName.replace(/-/g, path.sep));
    if (fsSync.existsSync(pagePath) && !force) {
        console.log('Page already exists! Try using -f if you want to overwrite it.');
        return;
    }

    await fs.mkdir(pagePath, {
        recursive: true
    });

    await fs.writeFile(path.resolve(pagePath, 'index.html'), await generatePageHtmlFromTemplate({
        includeCSS: createStyle,
        includeJS: createScript,
        pageName
    }));
    if (createStyle) {
        await fs.writeFile(path.resolve(pagePath, 'style.css'), '');
    }
    if (createScript) {
        await fs.writeFile(path.resolve(pagePath, 'script.js'), '');
    }
}

const watch = require('watch');
const createWathcMonitor = (watchPath) => {
    return new Promise((resolve, reject) => {
        watch.createMonitor(watchPath, {
            interval: 1
        }, function (monitor) {
            resolve(monitor);
        });
    });
};

const watchComponents = (monitor) => {
    monitor.on('changed', () => {
        console.log('[+] Compiling components...');
        compileComponents().then(() => console.log('[+] Components compiled'));
    });
    monitor.on('removed', () => {
        console.log('[+] Compiling components...');
        compileComponents().then(() => console.log('[+] Components compiled'));
        console.log('[+] Compiling components...');
    });
    monitor.on('created', () => {
        console.log('[+] Compiling components...');
        compileComponents().then(() => console.log('[+] Components compiled'));
    });
};

const watchPages = (monitor) => {
    monitor.on('changed', () => {
        console.log('[+] Building page assets...');
        buildPagesAssets().then(() => console.log('[+] Page assets built'));
    });
    monitor.on('removed', () => {
        console.log('[+] Building page assets...');
        buildPagesAssets().then(() => console.log('[+] Page assets built'));
    });
    monitor.on('created', () => {
        console.log('[+] Building page assets...');
        buildPagesAssets().then(() => console.log('[+] Page assets built'));
    });
};

const initComponentWatch = async () => {
    const monitor = await createWathcMonitor(path.resolve('.', 'components'));
    watchComponents(monitor);
    return monitor;
};

const initPagesWatch = async () => {
    const monitor = await createWathcMonitor(path.resolve('.', 'pages'));
    watchPages(monitor);
    return monitor;
};

const { program } = require('commander');

program
    .option('-c, --new-component <name>', 'Create new component')
    .option('-p, --new-page <name>', 'Create new page')
    .option('--no-style', 'Don\'t create style.css')
    .option('--no-script', 'Don\'t create script.js')
    .option('-f, --force', 'Overwrite existing component/page')
    .option('-w, --watch', 'Watch for changes in components')
    .option('-wp, --watch-pages', 'Watch for changes in pages')
    .option('--compile-components', 'Compile components')
    .option('--build-page-assets', 'Build page assets')
    .option('--seo-reports', 'Generate seo reports')
    .option('--build', 'Build website');


async function main() {
    program.parse();

    const options = program.opts();

    if (options.newComponent) {
        await createNewComponent(options.newComponent, {
            createStyle: options.style,
            createScript: options.script,
            force: options.force
        });
        await compileComponents();
    }

    if (options.newPage) {
        await createNewPage(options.newPage, {
            createStyle: options.style,
            createScript: options.script,
            force: options.force
        });
        await compileComponents();
    }

    if (options.compileComponents) {
        await compileComponents();
    }

    if (options.buildPagesAssets) {
        await buildPagesAssets();
    }

    if (options.watch) {
        await initComponentWatch();
        console.log('[+] Watching for changes in components...');
    }

    if (options.watchPages) {
        await initPagesWatch();
        console.log('[+] Watching for changes in pages...');
    }

    if (options.seoReports) {
        console.log('[+] Generating seo reports...');
        await generateSeoReports();
    }

    if (options.build) {
        console.log('[+] Building pages...');
        await buildPages();
    }
}

main()
    .then(() => console.log(';)'))
    .catch(e => console.log(e));