const browser = parseBrowser();

const $name = document.getElementById('name');
const $major = document.getElementById('major');
const $minor = document.getElementById('minor');
const $full = document.getElementById('full');
const $platform = document.getElementById('platform');

const $useragent = document.getElementById('useragent');
const $parseOtherString = document.getElementById('parseOtherString');

const $parseMoreTests = document.getElementById('parseMoreTests');
const $testsResult = document.getElementById('testsResult');

$parseOtherString.onclick = () => {
    [].forEach.call(document.querySelectorAll('.your'), (item) => {
        item.parentNode.removeChild(item);
    });
    displayData(parseBrowser($useragent.value));
};

$parseMoreTests.onclick = () => {
    $parseMoreTests.style.display = `none`;
    $testsResult.innerHTML = `
            <table>
                <tr>
                    <th>note</th>
                    <th>ua</th>
                    <th>name</th>
                    <th>versionMajor</th>
                    <th>versionMinor</th>
                    <th>versionFull</th>
                    <th>platform</th>
                </tr>
                ${
                testData.map((item) => {
                    const browserData = parseBrowser(item.ua);
                    const { name, version, platform } = browserData;
                    const { major: versionMajor, minor: versionMinor, full: versionFull } = version;
                    return `
                        <tr>
                            <td>
                                ${item.note}
                            </td>
                            <td>
                                ${item.ua}
                            </td>
                            <td class="${name === item.name ? 'ok' : 'bad'}">
                                ${name} ${name === item.name ? '' : `(${item.name})`}
                            </td>
                            <td class="${versionMajor === item.versionMajor ? 'ok' : 'bad'}">
                                ${versionMajor} ${versionMajor === item.versionMajor ? '' : `(${item.versionMajor})`}
                            </td>
                            <td class="${versionMinor === item.versionMinor ? 'ok' : 'bad'}">
                                ${versionMinor} ${versionMinor === item.versionMinor ? '' : `(${item.versionMinor})`}
                            </td>
                            <td class="${versionFull === item.versionFull ? 'ok' : 'bad'}">
                                ${versionFull} ${versionFull === item.versionFull ? '' : `(${item.versionFull})`}
                            </td>
                            <td class="${platform === item.platform ? 'ok' : 'bad'}">
                                ${platform} ${platform === item.platform ? '' : `(${item.platform})`}
                            </td>
                        </tr>
                        `;
                }).join('')
}
            </table>`;
};

displayData(browser);

function displayData(browser) {
    $name.textContent = browser.name;
    $major.textContent = browser.version.major;
    $minor.textContent = browser.version.minor;
    $full.textContent = browser.version.full;
    $platform.textContent = browser.platform;
}
