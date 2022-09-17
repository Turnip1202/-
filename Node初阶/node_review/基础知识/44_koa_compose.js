//koa-compose加载多个中间件，及加载中间件时next的逻辑

let Koa = require("koa"); //引入koa模块
//引入koa-compose模块，作用是可以加载多个中间件
let compose = require("koa-compose"); //
let app = new Koa(); //创建构造函数
//创建中间件，发掘中间件的加载逻辑。即至next()后，加载下一个中间件。如果不加，中间件只加载一次,即第一个
let one = function(ctx, next) {
    console.log("one");
    next();
};
let two = (ctx, next) => {
    console.log("two");
    next();
};
let three = (ctx, next) => {
    console.log("three");
    next(); //加不加无所谓，如果加上，会继续乡下找，无意义
};
//合并多个中间件
app.use(one);
app.use(two);
app.use(three);
// let num = compose([one, two, three]);
// app.use(num); //加载中间件
app.listen(2993); //监听端口及ip