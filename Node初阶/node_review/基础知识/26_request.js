//创建服务器，请求request成功会触发data事件，且请求内容会放在回调函数的data参数内，data是二进制

let http = require("http");
http.createServer(function(request, response) {
    request.on("data", function(data) { //监听请求data事件,仅适用post方式
        console.log(data.toString());
    })
}).listen(2008, "127.0.0.1", function() {
    console.log("监听正常")
});