!function(e,r){if("function"==typeof define&&define.amd)define(["module"],r);else if("undefined"!=typeof exports)r(module);else{var o={exports:{}};r(o),e.parseBrowser=o.exports}}(this,function(e){"use strict";var t=Object.keys||function(e){if(e!==Object(e))throw new TypeError("Object.keys called on a non-object");var r,o=[];for(r in e)Object.prototype.hasOwnProperty.call(e,r)&&o.push(r);return o},n=Array.prototype.find||function(e){if(null==this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var r,o=Object(this),a=o.length>>>0,i=arguments[1],t=0;t<a;t++)if(r=o[t],e.call(i,r,t,o))return r},b=String.prototype.includes||function(e,r){return"number"!=typeof r&&(r=0),!(r+e.length>this.length)&&-1!==this.indexOf(e,r)},l={"Windows Phone":"winphone",Windows:"win",Macintosh:"mac",iPhone:"iphone",iPad:"ipad",iPod:"ipod",Android:"android",Linux:"linux","RIM Tablet OS":"blackberry",BB:"blackberry"};e.exports=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:window.navigator.userAgent,r=function(e){var r=void 0;if(/iPad|iPhone|iPod/.test(e)&&!/IEMobile/.test(e))r="iOS";else if(/(Edge)\/([\w.]+)/.test(e))r="Edge";else if(/IEMobile|ZuneWP7/.test(e))r="ExplorerMobile";else if(/MSIE|Trident/.test(e))r="Explorer";else if(/Opera Mini.+Presto/.test(e))r="OperaMini";else if(/UCBrowser/.test(e)&&/U[23]/.test(e))r="UCAndroid";else if(/(OPR\/|Presto)/.test(e))r=b.call(e,"Android")?"OperaMobile":"Opera";else if(/Firefox/.test(e))r=b.call(e,"Android")?"FirefoxAndroid":"Firefox";else if(/(SamsungBrowser)[ /]([\w.]+)/.test(e))r="Samsung";else if(/(BB\d{1,}|RIM Tablet OS)/.test(e))r="BlackBerry";else if(/Chromium/.test(e))r="Chrome";else{var o=b.call(e,"Safari"),a=b.call(e,"Mozilla/5.0"),i=b.call(e,"AppleWebKit"),t=b.call(e,"Android")&&a&&i,n=e.match(/Android ([\d.]+)/),l=n?parseFloat(n[1]):null,s=e.match(/AppleWebKit\/([\d.]+)/),d=s?parseFloat(s[1]):null,c=e.match(/Chrome\/([\d.]+)/),f=c?parseFloat(c[1]):null,p=!!f,u=t&&(null!==d&&d<537||null!==f&&f<37),h=/Version\/4.0/.test(e);!o||p||t?(h||u&&!p)&&l<4.5?r="Android":p&&t?r="ChromeAndroid":p&&(r="Chrome"):r="Safari"}return r}(e);return{name:r,version:function(e,r){var o=void 0;switch(r){case"Edge":o=e.match(new RegExp(r+"/([\\d.]+)"))[1];break;case"BlackBerry":case"Safari":case"OperaMini":o=e.match(/Version\/([\d.]+)/)[1];break;case"Firefox":case"FirefoxAndroid":o=e.match(/Firefox\/([\d.]+)/)[1];break;case"Opera":case"OperaMobile":o=e.match(b.call(e,"Presto")?/Version\/([\d.]+)/:/OPR\/([\d.]+)/)[1];break;case"Explorer":case"ExplorerMobile":o=e.match(b.call(e,"MSIE")?/MSIE ([\d.]+)/:/rv:([\d.]+)/)[1];break;case"Chrome":case"ChromeAndroid":o=e.match(/(?:Chrome|Chromium)\/([\d.]+)/)[1];break;case"Samsung":o=e.match(/SamsungBrowser\/([\d.]+)/)[1];break;case"UCAndroid":o=e.match(/UCBrowser\/([\d.]+)/)[1];break;case"iOS":o=e.match(/OS ([\d_]+)/)[1].replace(/_/g,".");break;case"Android":o=e.match(/Android ([\d.]+)/)[1]}return{major:o?parseInt(o,10):0,minor:o?parseFloat(o):0,full:o||0}}(e,r),platform:function(r,e){var o=void 0;switch(e){case"Explorer":o="win";break;case"ExplorerMobile":o="winphone";break;case"BlackBerry":o="blackberry";break;case"UCAndroid":o="android";break;default:var a=t(l),i=n.call(a,function(e){return b.call(r,e)});o=l[i]}return o}(e,r)}}});