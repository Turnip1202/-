const url = require('url');
var targetURL = "http://wwww.taobao.com/";
var httpURL = "./turnip.html"
var get_URL = new URL(httpURL, targetURL)
console.log(get_URL)