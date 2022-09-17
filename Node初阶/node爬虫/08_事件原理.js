let fs = require("fs");

fs.readFile("turnip2.txt", { flag: "r", encoding: "utf-8" }, function(err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data);
        turnip.emit("filesuccess", data)
    }
})

let turnip = {
    //函数列表
    event: {
        // filesuccess: [fn, fn, fn]
    },
    //监听
    on: function(eventName, eventFn) {
        console.log(this.event[eventName])
            //如果event有eventName属性的话，向其追加回调函数
        if (this.event[eventName]) {
            this.event[eventName].push(eventFn)
        } else {
            //如果event没有eventName属性的话，令其为一个数组，并追加一个函数
            console.log(this.event[eventName])
            this.event[eventName] = [];
            this.event[eventName].push(eventFn)
        }
    },
    //触发
    emit: function(eventName, eventMas) {
        if (this.event[eventName]) {
            this.event[eventName].forEach(itemFn => {
                itemFn(eventMas);
            });
        }
    }
}

turnip.on("filesuccess", function(eventMas) {
    console.log("查看用户");
})
turnip.on("filesuccess", function(eventMas) {
    console.log("查看年龄")
})
turnip.on("filesuccess", function(eventMas) {
    console.log("查看学校")
})