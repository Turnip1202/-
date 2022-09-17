let Koa = require("koa");
let route = require("koa-route");
let serve = require("koa-static") //加载静态资源
let cors = require("koa2-cors"); //处理跨域
let path = require("path");
let Koa_body = require("koa-body"); //处理post请求
const views = require('koa-views')
let koajwt = require("koa-jwt");
const jwt = require("jsonwebtoken");

let app = new Koa();
app.use(cors({ //使用跨域中间件
    origin: "*",
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));
app.use(require('koa-static')(__dirname + '/public'));
//加载静态后，相当于静态资源和模板资源在同意文件夹内
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// app.use((ctx, next) => {
//     return next().catch(err => {
//         if (err.status == 401) {
//             ctx.status = 200
//             ctx.body = {
//                 errCode: 401,
//                 errMsg: "登录失效"
//             }
//         } else {
//             throw err;
//         }

//     })
// })
app.use(route.get("/", async(ctx, next) => {
    await ctx.render('index')

}));
//需要把token拦截放在首页下面
let secret = "turnip"; //密钥
//这玩意儿会截获所有在其下面运行的路由。
app.use(koajwt({ secret: secret }).unless({
    path: [
        /^\/login/,
        /^\/reg/
    ]
}))

app.use(Koa_body()); //加载koa-body
app.use(serve(path.join(__dirname))); //加载当前文件所在d的文件夹
app.use(route.post("/reg", require("./route/user_reg")));
app.use(route.post("/login", require("./route/user_login")));

app.use(route.get("/good", ctx => {
    console.log(ctx.header.authorization)
    ctx.body = "<h1>可以访问</h1>"
}));
app.use(route.get("/goods", ctx => {
    console.log("商品")
    ctx.response.body = "商品"
}));



app.listen(3001);