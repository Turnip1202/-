//移除监听的事件

let EventEmitter = require("events").EventEmitter;
let event = new EventEmitter(); //创建构造函数
//限制最大绑定的函数个数
event.setMaxListeners(2);

function f1() {
    console.log("函数1");
};

function f2() {
    console.log("函数2");
};

function f3() {
    console.log("函数3");
};
//给事件绑定函数
event.on("one", f1);
event.on("one", f2);
// event.on("one", f3);
//解除绑定
// event.removeAllListeners(); //移除所有
event.removeListener("one", f1); //单个移除
event.emit("one"); //触发事件