//分析加载多个中间件时try--catch捕捉错误的逻辑

let Koa = require("koa"); //引入koa模块
let app = new Koa(); //构造Koa函数
//创建中间件，用于检测多个中间件错误的返回逻辑
let err = async(ctx, next) => {
    try { //捕捉这里代码错误
        await next(); //等待执行下一个中间件
    } catch (err) { //如果try内的代码出现错误，则将错误通过参数err传递
        ////先判断错误状态和错误状态码是不是未定义或者空，亦或500
        ctx.response.status = err.status.Code || err.status || 500;
        //返回错误对象err.message
        ctx.response.body = { "mossage": err.message }
    }
}
let main = ctx => {
        // 修改context的状态码
        ctx.throw(404); //抛出错误
    }
    //加载中间件
app.use(err);
app.use(main);
app.listen(2997); //监听端口及ip,ip默认本机