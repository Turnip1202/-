//获取请求request信息

let http = require("http");
http.createServer(function(request, response) {
    //获取提交方式
    let method = request.method;
    //获取头部信息
    let Header = request.Header;
    //获取请求地址
    let url = request.url; //不是网址，是请求文件目录
    // 获取http版本
    let httpVersion = request.httpVersion;
    console.log(method, Header, url, httpVersion);
}).listen(2009, "127.0.0.1", function() {
    console.log("监听正常");
})