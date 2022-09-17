//设置和获取cookies属性值


//cookies的默认有效期为到浏览器关闭为止

//引入koa模块
let Koa = require("koa");
let app = new Koa(); //构造Koa函数
//创建中间件，并设置和获取cookies属性（字段）

var cookieParser = require('cookie-parser');

//加密cookie
app.use(cookieParser("secret"));


var cookies = (ctx, next) => {
    //设置cookies属性,maxAge多久后失效;signed是否加密
    ctx.cookies.set("name", "turnip", { signed: true, maxAge: 3000 });
    // 获取cookies属性
    let cookies = ctx.cookies.get("name");
    //给客户端页面响应内容
    ctx.response.body = `当前cookies的name属性为：${cookies}`;
};
//使用中间件
app.use(cookies);
//监听ip及端口，ip默认为当前主机
app.listen(2999);