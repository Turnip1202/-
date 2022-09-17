//koa-static加载静态资源

let Koa = require("koa"); //引入koa模块
let path = require("path"); //引入path模块
let route = require("koa-route");
let static = require("koa-static"); //引入koa-static静态资源模块,注意是文件全名
let app = new Koa(); //创建构造函数
//static(path)会加载路径里的内容
//path.join()是将多个(有的话)路径规范换，比如"aa"，"bb"，即aa/bb
let main = static(__dirname); //加载当前文件所在文件夹里的内容
// app.use(route.get("/", main)) //
app.use(main); //加载中间件
app.listen(2992); //监听端口和ip