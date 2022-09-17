let readline = require("readline");
//导入readline包
//实例化接口对象
let r = readline.createInterface({
        output: process.stdout,
        input: process.stdin
    })
    //设置r，提问事件
r.question("写作业？", function(answer) {
    console.log("喵的！", answer)
    r.close();
})
r.on("close", function() {
    process.emit(0);
})