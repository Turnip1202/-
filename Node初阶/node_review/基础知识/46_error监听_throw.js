//error监听错误事件。可见，在try--catch捕捉后，不会触发error事件

let Koa = require("koa"); //引入koa模块
let app = new Koa(); //构造koa函数
//创建中间件，用throw抛出状态码
let main = ctx => {
    ctx.throw(404);
}
app.use(main); //加载中间件
//尝试监听error事件
app.on("error", (err, ctx) => { //可见，throw抛出的错误，error事件可以监听到
    console.log(err) //输出错误信息

})
app.listen(2995); //监听端口及ip