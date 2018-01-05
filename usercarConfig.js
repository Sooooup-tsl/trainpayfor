// 导入css
function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

// 导入js
function loadScript(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("body")[0].appendChild(script);
}

loadCss("./usecarentrance.css");
loadCss("//file.40017.cn/fed/touch/css/modules/select/0.0.5/select.css");
loadScript("//file.40017.cn/combo/fed/???" + (window.Zepto ? "" : "touch/js/zepto.1.2.0.js,") + "touch/js/modules/select/0.0.5/select.js,touch/js/modules/timePick/0.0.3/timePick.js");
loadScript("./usecarentrance.js");