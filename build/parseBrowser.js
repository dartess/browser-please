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
            browser = ua.includes('Android') ? 'OperaMobile' : 'Opera';
        } else if (/Firefox/.test(ua)) {
            browser = ua.includes('Android') ? 'FirefoxAndroid' : 'Firefox';
        } else if (/(SamsungBrowser)[ /]([\w.]+)/.test(ua)) {
            browser = 'Samsung';
        } else if (/(BB\d{1,}|RIM Tablet OS)/.test(ua)) {
            browser = 'BlackBerry';
        } else if (/Chromium/.test(ua)) {
            browser = 'Chrome';
        } else {
            // Safari detect
            var isSafari = ua.includes('Safari');

            // Android Mobile
            var isAndroidMobile = ua.includes('Android') && ua.includes('Mozilla/5.0') && ua.includes('AppleWebKit');
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
                version = ua.match(ua.includes('Presto') ? /Version\/([\d.]+)/ : /OPR\/([\d.]+)/)[1];
                break;
            case 'Explorer':
            case 'ExplorerMobile':
                version = ua.match(ua.includes('MSIE') ? /MSIE ([\d.]+)/ : /rv:([\d.]+)/)[1];
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
                {
                    platform = 'win';
                    break;
                }
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
                    var platformName = Object.keys(aliasesPlatforms).find(function (platformAlias) {
                        return ua.includes(platformAlias);
                    });
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