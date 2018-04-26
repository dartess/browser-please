(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod);
        global.parseBrowser = mod.exports;
    }
})(this, function (module) {
    'use strict';

    /* eslint-disable */
    var objectKeys = Object.keys || function (o) {
        if (o !== Object(o)) throw new TypeError('Object.keys called on a non-object');
        var k = [],
            p;
        for (p in o) {
            if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
        }return k;
    };

    var arrayFind = Array.prototype.find || function (predicate) {
        if (this == null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };

    var stringIncludes = String.prototype.includes || function (search, start) {
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
    /* eslint-enable */

    var aliasesPlatforms = {
        'Windows Phone': 'winphone',
        'Windows': 'win',
        'Macintosh': 'mac',
        'iPhone': 'iphone',
        'iPad': 'ipad',
        'iPod': 'ipod',
        'Android': 'android',
        'Linux': 'linux',
        'RIM Tablet OS': 'blackberry',
        'BB': 'blackberry'
    };

    /**
     * определение баузера по UserAgent
     * @param {string} ua UserAgent
     * @return {string} browser имя браузера
     */
    function parseBrowserName(ua) {
        var browser = void 0;

        if (/iPad|iPhone|iPod/.test(ua) && !/IEMobile/.test(ua)) {
            browser = 'iOS';
        } else if (/(Edge)\/([\w.]+)/.test(ua)) {
            browser = 'Edge';
        } else if (/IEMobile|ZuneWP7/.test(ua)) {
            browser = 'ExplorerMobile';
        } else if (/MSIE|Trident/.test(ua)) {
            browser = 'Explorer';
        } else if (/Opera Mini.+Presto/.test(ua)) {
            browser = 'OperaMini';
        } else if (/UCBrowser/.test(ua) && /U[23]/.test(ua)) {
            browser = 'UCAndroid';
        } else if (/(OPR\/|Presto)/.test(ua)) {
            browser = stringIncludes.call(ua, 'Android') ? 'OperaMobile' : 'Opera';
        } else if (/Firefox/.test(ua)) {
            browser = stringIncludes.call(ua, 'Android') ? 'FirefoxAndroid' : 'Firefox';
        } else if (/(SamsungBrowser)[ /]([\w.]+)/.test(ua)) {
            browser = 'Samsung';
        } else if (/(BB\d{1,}|RIM Tablet OS)/.test(ua)) {
            browser = 'BlackBerry';
        } else if (/Chromium/.test(ua)) {
            browser = 'Chrome';
        } else {
            // Safari detect
            var isSafari = stringIncludes.call(ua, 'Safari');

            // Android Mobile
            var hasMozillaMark = stringIncludes.call(ua, 'Mozilla/5.0');
            var hasAppleWebKitMark = stringIncludes.call(ua, 'AppleWebKit');
            var hasAndroidMark = stringIncludes.call(ua, 'Android');
            var isAndroidMobile = hasAndroidMark && hasMozillaMark && hasAppleWebKitMark;
            var androidMatches = ua.match(/Android ([\d.]+)/);
            var androidVersion = androidMatches ? parseFloat(androidMatches[1]) : null;

            // Apple webkit
            var appleWebKitMatches = ua.match(/AppleWebKit\/([\d.]+)/);
            var appleWebKitVersion = appleWebKitMatches ? parseFloat(appleWebKitMatches[1]) : null;

            // Chrome
            var chromeMatches = ua.match(/Chrome\/([\d.]+)/);
            var chromeVersion = chromeMatches ? parseFloat(chromeMatches[1]) : null;
            var isChrome = !!chromeVersion;

            // Native Android Browser
            var oldAppleWebKit = appleWebKitVersion !== null && appleWebKitVersion < 537;
            var oldChrome = chromeVersion !== null && chromeVersion < 37;
            var androidBrowserStandardDetect = isAndroidMobile && (oldAppleWebKit || oldChrome);
            var androidBrowserLiteDetect = /Version\/4.0/.test(ua);
            var isAndroidBrowser = androidBrowserLiteDetect || androidBrowserStandardDetect && !isChrome;

            if (isSafari && !isChrome && !isAndroidMobile) {
                browser = 'Safari';
            } else if (isAndroidBrowser && androidVersion < 4.5) {
                browser = 'Android';
            } else if (isChrome && isAndroidMobile) {
                browser = 'ChromeAndroid';
            } else if (isChrome) {
                browser = 'Chrome';
            }
        }
        return browser;
    }

    /**
     * определение версии браузера по UserAgent
     * @param {string} ua UserAgent
     * @param {string} browser имя браузера, можно получить из parseBrowserName
     * @return {object} versionSplit массив версий браузера, ключи major/minor/full
     */
    function parseBrowserVersion(ua, browser) {
        var version = void 0;
        switch (browser) {
            case 'Edge':
                version = ua.match(new RegExp(browser + '/([\\d.]+)'))[1];
                break;
            case 'BlackBerry':
            case 'Safari':
            case 'OperaMini':
                version = ua.match(/Version\/([\d.]+)/)[1];
                break;
            case 'Firefox':
            case 'FirefoxAndroid':
                version = ua.match(/Firefox\/([\d.]+)/)[1];
                break;
            case 'Opera':
            case 'OperaMobile':
                version = ua.match(stringIncludes.call(ua, 'Presto') ? /Version\/([\d.]+)/ : /OPR\/([\d.]+)/)[1];
                break;
            case 'Explorer':
            case 'ExplorerMobile':
                version = ua.match(stringIncludes.call(ua, 'MSIE') ? /MSIE ([\d.]+)/ : /rv:([\d.]+)/)[1];
                break;
            case 'Chrome':
            case 'ChromeAndroid':
                version = ua.match(/(?:Chrome|Chromium)\/([\d.]+)/)[1];
                break;
            case 'Samsung':
                version = ua.match(/SamsungBrowser\/([\d.]+)/)[1];
                break;
            case 'UCAndroid':
                version = ua.match(/UCBrowser\/([\d.]+)/)[1];
                break;
            case 'iOS':
                version = ua.match(/OS ([\d_]+)/)[1].replace(/_/g, '.');
                break;
            case 'Android':
                version = ua.match(/Android ([\d.]+)/)[1];
                break;
            default:
                break;
        }

        var major = version ? parseInt(version, 10) : 0;
        var minor = version ? parseFloat(version) : 0;
        var full = version || 0;

        return {
            major: major,
            minor: minor,
            full: full
        };
    }

    /**
     * определение платформы по UserAgent
     * @param {string} ua UserAgent
     * @param {string} browser имя браузера, можно получить из parseBrowserName
     * @return {object} platformResult массив, описывающий платформу, ключ platform
     */
    function parseBrowserPlatform(ua, browser) {
        var platform = void 0;

        switch (browser) {
            case 'Explorer':
                platform = 'win';
                break;
            case 'ExplorerMobile':
                platform = 'winphone';
                break;
            case 'BlackBerry':
                platform = 'blackberry';
                break;
            case 'UCAndroid':
                platform = 'android';
                break;
            default:
                {
                    var keysAliasesPlatforms = objectKeys(aliasesPlatforms);
                    var arrayFindCalback = function arrayFindCalback(platformAlias) {
                        return stringIncludes.call(ua, platformAlias);
                    };
                    var platformName = arrayFind.call(keysAliasesPlatforms, arrayFindCalback);
                    platform = aliasesPlatforms[platformName];
                }
        }

        return platform;
    }

    /**
     * определение всех данных браузера по UserAgent, метод заполняет this->browserData
     * @param ua UserAgent браузера, опционально: по умолчанию UserAgent текущего пользователя
     */
    function parseBrowser() {
        var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.navigator.userAgent;

        var name = parseBrowserName(ua);
        var version = parseBrowserVersion(ua, name);
        var platform = parseBrowserPlatform(ua, name);
        return {
            name: name,
            version: version,
            platform: platform
        };
    }

    module.exports = parseBrowser;
});