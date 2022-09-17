let Koa = require("koa");
let route = require("koa-route");
let Koa_body = require("koa-body"); //引入koa-body模块
let app = new Koa(); //实例化Koa
app.use(Koa_body()); //加载koa-body模块中间件
//加载中间件，并使用路由定向
app.use(route.post("/reg", require("./route/reg"))) //使用路由定向注册页面
app.use(route.get("/login", require("./route/login"))) //使用路由定向登陆页面
app.listen(2000);