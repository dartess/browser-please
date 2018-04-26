const testData = require('./testData');
const parseBrowser = require('../build/parseBrowser');
const {JSDOM} = require("jsdom");
const {assert} = require('chai');
const fs = require('fs');

const testDataScript = fs.readFileSync(`${__dirname}/../build/parseBrowser.js`, 'utf8');
const jsDomPage = `<!DOCTYPE html><script>${testDataScript}</script><script>window.detectedBrowser = parseBrowser();</script>`;
const jsDomSettings = {
    runScripts: "dangerously",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.1.3325.181 Safari/537.36",
    includeNodeLocations: true
};

describe("Browser Detect", function () {
    it("parseBrowser is a function", function () {
        assert.equal(typeof parseBrowser, "function");
    });

    it("Correct parsing current browser useragent", function () {
        const {detectedBrowser: browser} = (new JSDOM(jsDomPage, jsDomSettings)).window;

        assert.equal(browser.name, "Chrome");
        assert.equal(browser.version.major, 65);
        assert.equal(browser.version.minor, 65.1);
        assert.equal(browser.version.full, "65.1.3325.181");
        assert.equal(browser.platform, "mac");
    });

    testData.forEach(function (testItem) {
        it(`Correct parsing ${testItem.note}`, function () {
            const parsedItem = parseBrowser(testItem.ua);
            assert.equal(parsedItem.name, testItem.name);
            assert.equal(parsedItem.version.major, testItem.versionMajor);
            assert.equal(parsedItem.version.minor, testItem.versionMinor);
            assert.equal(parsedItem.version.full, testItem.versionFull);
            assert.equal(parsedItem.platform, testItem.platform);
        });
    });
});
