//http创建服务器及响应结束

let http = require("http");
let server = http.createServer(function(request, response) {
    //响应结束
    response.end("响应结束"); //响应结束后，end方法有一个返回响应内容的参数,中文会乱吗
}).listen(2011, "127.0.0.1", function() {
    console.log("创建服务器成功");
});