//设置请求头信息
let http = require("http");
http.createServer(function(req, res) {
    res.statusCode = 200;
    res.setHeader("content-type", "json;charset=utf-8"); //设置头部信息
    res.setHeader("content-length", 200); //设置头部信息
    res.write("<h1>你好世界</h1>"); //响应数据
    res.end();
}).listen(2005);