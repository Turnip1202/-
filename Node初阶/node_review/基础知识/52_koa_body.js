//使用Koa-body处理post请求


let Koa = require("koa");
let Koa_body = require("koa-body"); //引入koa-body模块
let app = new Koa();
app.use(Koa_body()); //使用koabody中间件
app.use(function(ctx) {
    var data = ctx.request.body; //获取post数据
    console.log(data);
});
app.listen(3000);