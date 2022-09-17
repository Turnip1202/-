//使用koa向客户端响应内容

let Koa = require("koa");
let app = new Koa();
//加载中间件
app.use(function(ctx) {
    //向客户端响应内容
    ctx.response.body = "<h1>Hello World!</h1>";
})
app.listen(2002);