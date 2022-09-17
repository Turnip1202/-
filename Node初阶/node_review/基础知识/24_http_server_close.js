//http创建服务器的流程,及服务器触发的常用事件

let http = require("http"); //引入http模块
let server = http.createServer(function(request, response) {
    //服务器请求/响应代码处
}).listen(2010, "127.0.0.1", function() {
    console.log("监听正常");
});
server.on("listening", function() { //服务器监听事件
    console.log("正在监听服务器");
    //关闭服务器
    server.close();
});
server.on("close", function() { //服务器关闭事件
    console.log("服务器已关闭");
})