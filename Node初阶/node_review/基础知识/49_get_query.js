//koa使用context获取get请求对象

let Koa = require("koa"); //引入koa模块
let app = new Koa(); //构造Koa函数
let main = (ctx) => { //创建中间件
    let data1 = ctx.query; //返回get请求对象
    let data2 = ctx.querystring; //返回get请求字符串，基本不用
    let data3 = ctx.request.query; //返回请求对象
    console.log(data1, data2, data3);
    ctx.response.type = "text/html";
    ctx.response.body = `账号：${data1.name},密码：${data1.pass}`
}

app.use(main); //加载中间件
app.listen(2998); //监听端口和ip，默认ip为本机