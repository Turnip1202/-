//使用cookies记录客户端访问服务器次数

//引入koa模块,Koa的K之所以大写，是因为koa引入的是一个构造函数new Koa()
let Koa = require("koa");
// 构造函数Koa
let app = new Koa();
//创建cookies中间件，向cookies文件写入数据,Koa可以从Context对象内读取cookies的数据
let cookies = function(ctx) {
        var num; //定义num变量，用于记录浏览器发送cookies的次数
        //先尝试获取cookies的字段名对应的数据,
        var count = ctx.cookies.get("count");
        //对获取的数据进行判断
        if (!count) { //如果为空，则令访问次数为0
            num = 0;
        } else { //否则，获取访问次数的数据，进行强制转化，赋值给num
            num = Number(ctx.cookies.get("count"));
        }
        num++; //对访问次数进行自增
        //设置并将访问次数发送给cookies文件
        ctx.cookies.set("count", num);
        //响应客户端内容
        ctx.response.body = `你访问了${num}`;
    }
    //使用中间件
app.use(cookies);
//监听ip及，默认ip本机
app.listen(3000);