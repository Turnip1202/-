//try--catch捕捉错误 和 throw抛出错误的逻辑

let Koa = require("koa"); //引入koa模块
let app = new Koa(); //创建koa构造函数
//创建中间件，捕捉，并抛出错误
let main = ctx => {
    try {
        // ctx.status = 500;//设置状态码//不会在控制台显示
        ctx.throw(500); //抛出状态码。会显示在控制台
    } catch (err) {
        ctx.response.body = err; //响应内容
    }
}
app.use(main); //加载中间件
app.listen(2996); //监听端口及ip