//绑定函数，触发事件

//引入events模块
let EventEmitter = require("events").EventEmitter;
//构造函数
let event = new EventEmitter();
//给事件绑定函数
event.on("one", function() {
    console.log("事件1");
});
event.on("one", function() {
    console.log("事件2");
});
event.on("one", function() {
    console.log("事件3");
});
//触发事件,可多次触发
event.emit("one");
event.emit("one");
event.emit("one");