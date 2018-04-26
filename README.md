# browser-please

Yet another library to determine the browser by useragent

## Install

From npm:

```
npm install browser-please --save
```

Or download `build/parseBrowser.min.js`.

## Usage

From npm:

```
import parseBrowser from "browser-please";

const browser = parseBrowser();
````

If you choise builded version, `parseBrowser` available as global function.

## Syntax

```
browser = parseBrowser([ua])
```

**ua** *(optional)*: [user agent](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent) string. By default — user agent from current browser.

**browser**: object with parsed info, where:

* **browser.name**: name of browser or empty string if not detect;

* **browser.version.major**: major version of browser or zero if not detect;

* **browser.version.minor**: major and minor version of browser or zero if not detect;

* **browser.version.full**: full version of browser or zero if not detect;

* **browser.platform**: name of browser or empty string if not detect;

## Supported browsers:

* Explorer
* Edge
* ExplorerMobile
* Firefox
* Chrome
* Safari
* Opera
* iOS
* OperaMini
* Android
* BlackBerry
* ChromeAndroid
* FirefoxAndroid
* OperaMobile
* UCAndroid
* Samsung

## Supported platforms:

* win
* mac
* linux
* android
* iphone 
* ipad
* ipod
* winphone
* blackberry

## Why...

### ...these browsers?

The most important question. These are browsers that are used, for example, in [browserslist](https://github.com/browserslist/browserslist) and [caniuse](https://caniuse.com/).

### ...browser "Foo" is parsed as browser "Bar"?

You can open issue, and I'll add the answer to it here.

## Live demo

Available [here](https://dartess.github.io/browser-please/).
