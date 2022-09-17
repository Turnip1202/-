let axios = require("axios");
var fs = require("fs");
let httpURL = "https://www.dy2018.com/index.html";
//执行完后，会带着数据进入后面的函数
axios.get(httpURL).then(function(res) {
    console.log(res)


})