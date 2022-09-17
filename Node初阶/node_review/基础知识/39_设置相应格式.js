//设置响应数据的格式

let Koa = require("koa");
let fs = require("fs");
let app = new Koa();
//创建并加载
app.use(function(ctx) {
    //设置响应数据的格式
    ctx.response.type = "text/html";
    ctx.response.body = fs.createReadStream("../demo/server_Req_Res/new_file.html");
})
app.listen(2001);