//手写express应用
// SET DEBUG=bookapp:* & npm start//debug可以看到出错情况
let express = require("express"); //引入express模块
let app = express();
// 加载路由
//浏览器直接发送的请求均是get请求
//1.字符串路由模式
app.get("/", (req, res) => {
    res.send("<h1>Hello world!  我是首页</h1>")
});
//2.类似正则模式,匹配turnikang 或者turnipkang 
app.get("/turnip?kang", (req, res) => {
    res.send("<h1>turnip/kang</h1>")
});
// 3.正则模式
app.get(/a/, (res, req) => {
    res.send("/a/")
});
// 4.动态路由
app.get("/news/:id/", (req, res) => {
    res.send("id页面：\n" + req.params.id); //paeams会直接解析请求路径的动态路由，这里即是获取id
});
app.get("/new/k:id", (req, res) => {
    res.send("id页面：\n" + req.params.id);
});
//创建服务器，监听端口
app.listen(8080, () => {
    console.log("服务器启动", "http://127.0.0.1:8080");
});
//将app导出，使用cnpm加载package.json内的start
//亦可直接使用node运行此文件
module.exports = app;