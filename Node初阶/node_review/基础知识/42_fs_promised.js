//fs.promised模块，即读写文件readFile变为流的形式

let Koa = require("koa"); //引入koa模块
let fs = require("fs.promised"); //引入fs.promised模块
let app = new Koa(); //创建构造函数
//使用异步async-等待await函数，及fs.readFile读取文件
var main = async(ctx) => {
    var data = await fs.readFile("./42_fs_promised.js", "utf-8") //读取文件。设置编码格式
    ctx.response.body = data; //响应数据
}
app.use(main); //加载中间件
app.listen(2991); //监听端口及ip