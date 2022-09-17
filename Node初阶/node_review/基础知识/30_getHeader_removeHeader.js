//获取和移除请求头部信息

let http = require("http");
http.createServer((req, res) => {
    //客户端访问服务器，会返回这些信息
    res.statusCode = 200;
    res.setHeader("content-type", "text/html;charset=utf-8"); //设置请求头类型
    res.setHeader("conten-length", 30); //设置请求头长度
    res.removeHeader("content-length"); //移除请求头长度
    let getHeader = res.getHeader("content-lenth"); //获取请求头长度
    console.log(getHeader); //控制台输出
    res.write("<h1>你好，世界</h1>")
    res.end()
}).listen(2004);