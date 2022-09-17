//throw抛出异常和手动设置状态码的区别

const Koa = require("koa"); //引入koa框架内
let app = new Koa(); //构造koa函数
//创建中间件，对比throw和response.status的区别
let main = ctx => {
    ctx.throw(500) //会在控制输出错误
        // ctx.response.status = 500; //不会在控制台输出错误
}
app.use(main); //加载中间件
app.listen(2994); //监听端口和ip