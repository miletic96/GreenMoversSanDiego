# Quick Start

## Table of Contents

- [Quick Start](#quick-start)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Init project](#init-project)
  - [Start development environment](#start-development-environment)
    - [Using Browser Sync](#using-browser-sync)
    - [Using Live Server](#using-live-server)
  - [CLI Tool](#cli-tool)
  - [Add component](#add-component)
  - [Add page](#add-page)
  - [Production build](#production-build)

## Prerequisites

Applications:

- NodeJS LTS version (https://nodejs.org/en/)
- VS Code (https://code.visualstudio.com/download)

_NOTICE: Don't forget to add all applications to PATH variable during the installation._

## Init project

Copy project from git https://github.com/buaa00/lsf-boost

<img src="images/clone.png" width="300">

Start the VS Code inside cloned project and open up the terminal by clicking `View > Terminal` in the menu bar or using hotkey `Ctrl+~`.

<img src="images/start-vs-code.png" width="400">

Run following commands:

- To install all necessary modules

```console
npm install
```

- To install all necessary VS Code extensions

```console
npm run init-ide
```

## Start development environment

In the project terminal run

```console
npm run dev
```

To stop the development environment press `Ctrl+C` in running terminal or kill the whole terminal from VS Code.

<img src="images/stop-dev.png" width="300">

### Using Browser Sync

The browser should start on address `http://localhost:3000`

To open one of the pages add path to the page folder in the link `http://localhost:3000/pages/home`

### Using Live Server

Alternate way to run open one of the pages is to serve them using _LiveServer_ plugin for VS Code.

<img src="images/live-server.png" width="300">

_NOTICE: It's up to you what variant will you choose_

## CLI Tool

You can use CLI Tool to boost your productivity.

```console
npm run cli -- -h
```

## Add component

To add new component(only HTML and CSS) using CLI tool run the following command in the terminal

```console
npm run cli -- -c My-Component --no-script
```

The result should be component `My-Component` placed under `./components/My/Component` folder.

<img src="images/new-component.png" width="300">

This command creates folder structure and default files for specified component name.

Using CLI Tool is optional, new component can also be done manually by creating following folder and file structure:

- `./components/My/Component` - component directory(defines components name _My-Component_) **_required_**
- `./components/My/Component/index.html` - the HTML structure of the every component **_required_**
- `./components/My/Component/style.css` - the CSS styles for defining component look **_optional_**
- `./components/My/Component/script.js` - the JS script for definig component interactive behaviour **_optional_**

## Add page

To add new page(only HTML and CSS) using CLI tool run the following command in the terminal

```console
npm run cli -- -p MyPage --no-script
```

The result should be page `MyPage` placed under `./pages/MyPage` folder.

<img src="images/new-page.png" width="300">

Try visiting this page on <a href="http://localhost:3000/pages/MyPage" target="_blank">http://localhost:3000/pages/MyPage</a>

This command creates folder structure and default files for specified page name.

Using CLI Tool is optional, new component can also be done manually by creating following folder and file structure:

- `./pages/MyPage` - page directory(defines page name _MyPage_) **_required_**
- `./pages/MyPage/index.html` - the HTML structure of the every page **_required_**
- `./pages/MyPage/style.css` - the CSS styles for defining page look **_optional_**
- `./pages/MyPage/script.js` - the JS script for definig page interactive behaviour **_optional_**


## Production build

*NOTICE: To follow this step, development environment must be stopped!*

Run following commands:

- To build pages for production usage
```console
npm run build
```

- To generate SEO reports for built pages
```console
npm run seo-reports
```