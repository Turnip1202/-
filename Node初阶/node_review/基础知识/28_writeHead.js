//给客户端写入响应头部信息

let http = require("http");
http.createServer(function(req, res) {
    res.writeHead(200, { "content-type": "text/html;charset=utf-8", "concat-length": 20 }); //写入头部信息
    res.write("你好，世界"); //响应给客户端内容
    res.end(); //相应结束
}).listen(2006);