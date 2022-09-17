//给客户端响应内容

let http = require("http"); //引入http模块
http.createServer(function(req, res) {
    res.write("Hello world!"); //响应内容
    res.end(); //响应结束
}).listen(2007);