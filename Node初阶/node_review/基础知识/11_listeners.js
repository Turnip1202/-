//EventEmitter绑定同一事件one的多个函数f1,f2,f3;listeners监听事件one

let EventEmitter = require("events").EventEmitter;
let event = new EventEmitter();

function f1() {
    console.log("函数1");
}

function f2() {
    console.log("函数2");
}

function f3() {
    console.log("函数3");
}
//同一事件绑定多个函数
event.on("one", f1);
event.on("one", f2);
event.on("one", f3);
//监听事件
let L = event.listeners("one");
console.log(L)