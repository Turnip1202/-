//多个中间件加载，调用next的运行逻辑

let Koa = require("koa"); //引入koa模块
var app = new Koa();

let one = (ctx, next) => {
    console.log("one+");
    next();
    console.log("one-");

}
let two = (ctx, next) => {
    console.log("two+");

    console.log("two-");

}
let three = (ctx, next) => {
    console.log("three+");
    next();
    console.log("three-");

};
//输出顺序是one+,two+,three+；three-,two-,one-
app.use(one);
app.use(two);
app.use(three);

app.listen(2990);