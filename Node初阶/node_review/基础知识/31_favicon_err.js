//去除标签页图标的响应

let http = require("http");
// 创建服务器，并监听端口及ip
http.createServer(function(req, res) {
    // console.log(req.url);
    if (req.url != "/favicon.ico") { //防止向/favicon.ico响应内容
        console.log(req.url);
        res.write("萝卜好吃"); //响应内容
        res.end();
    }
}).listen(2003, "127.0.0.1"); //监听端口