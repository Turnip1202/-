//使用koa-route设置路由。并重定向redirect

let Koa = require("koa")
let route = require("koa-route");
let app = new Koa();
//中间件
let main = function (ctx) {
    ctx.response.body = "成功";
    //重定向，即转到路由的login页面
    ctx.response.redirect("/login");
};
let login = function (ctx) {
    ctx.response.body = "失败" + new Date().toLocaleString();
};
//加载中间件，并使用路由定向
app.use(route.get("/main", main))
app.use(route.get("/login", login))
app.listen(2000);