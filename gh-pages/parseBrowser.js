!function(e,r){if("function"==typeof define&&define.amd)define(["module"],r);else if("undefined"!=typeof exports)r(module);else{var i={exports:{}};r(i),e.parseBrowser=i.exports}}(this,function(e){"use strict";var o={"Windows Phone":"winphone",Windows:"win",Macintosh:"mac",iPhone:"iphone",iPad:"ipad",iPod:"ipod",Android:"android",Linux:"linux","RIM Tablet OS":"blackberry",BB:"blackberry"};e.exports=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:window.navigator.userAgent,r=function(e){var r=void 0;if(/iPad|iPhone|iPod/.test(e)&&!/IEMobile/.test(e))r="iOS";else if(/(Edge)\/([\w.]+)/.test(e))r="Edge";else if(/IEMobile|ZuneWP7/.test(e))r="ExplorerMobile";else if(/MSIE|Trident/.test(e))r="Explorer";else if(/Opera Mini.+Presto/.test(e))r="OperaMini";else if(/UCBrowser/.test(e)&&/U[23]/.test(e))r="UCAndroid";else if(/(OPR\/|Presto)/.test(e))r=e.includes("Android")?"OperaMobile":"Opera";else if(/Firefox/.test(e))r=e.includes("Android")?"FirefoxAndroid":"Firefox";else if(/(SamsungBrowser)[ /]([\w.]+)/.test(e))r="Samsung";else if(/(BB\d{1,}|RIM Tablet OS)/.test(e))r="BlackBerry";else if(/Chromium/.test(e))r="Chrome";else{var i=e.includes("Safari"),a=e.includes("Android")&&e.includes("Mozilla/5.0")&&e.includes("AppleWebKit"),o=e.match(/Android ([\d.]+)/),n=o?parseFloat(o[1]):null,s=e.match(/AppleWebKit\/([\d.]+)/),d=s?parseFloat(s[1]):null,t=e.match(/Chrome\/([\d.]+)/),l=t?parseFloat(t[1]):null,c=!!l,u=a&&(null!==d&&d<537||null!==l&&l<37),f=/Version\/4.0/.test(e);!i||c||a?(f||u&&!c)&&n<4.5?r="Android":c&&a?r="ChromeAndroid":c&&(r="Chrome"):r="Safari"}return r}(e);return{name:r,version:function(e,r){var i=void 0;switch(r){case"Edge":i=e.match(new RegExp(r+"/([\\d.]+)"))[1];break;case"BlackBerry":case"Safari":case"OperaMini":i=e.match(/Version\/([\d.]+)/)[1];break;case"Firefox":case"FirefoxAndroid":i=e.match(/Firefox\/([\d.]+)/)[1];break;case"Opera":case"OperaMobile":i=e.match(e.includes("Presto")?/Version\/([\d.]+)/:/OPR\/([\d.]+)/)[1];break;case"Explorer":case"ExplorerMobile":i=e.match(e.includes("MSIE")?/MSIE ([\d.]+)/:/rv:([\d.]+)/)[1];break;case"Chrome":case"ChromeAndroid":i=e.match(/(?:Chrome|Chromium)\/([\d.]+)/)[1];break;case"Samsung":i=e.match(/SamsungBrowser\/([\d.]+)/)[1];break;case"UCAndroid":i=e.match(/UCBrowser\/([\d.]+)/)[1];break;case"iOS":i=e.match(/OS ([\d_]+)/)[1].replace(/_/g,".");break;case"Android":i=e.match(/Android ([\d.]+)/)[1]}return{major:i?parseInt(i,10):0,minor:i?parseFloat(i):0,full:i||0}}(e,r),platform:function(r,e){var i=void 0;switch(e){case"Explorer":i="win";break;case"ExplorerMobile":i="winphone";break;case"BlackBerry":i="blackberry";break;case"UCAndroid":i="android";break;default:var a=Object.keys(o).find(function(e){return r.includes(e)});i=o[a]}return i}(e,r)}}});