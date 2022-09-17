//使用写入流写入数据

let fs = require("fs");
//创建写入流.参数：文件路径
let ws = fs.createWriteStream("./turnip.txt");
//定义写入内容
let str = "柯南";
//通过写入流对象写入数据
ws.write(str, "utf-8", function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("写入成功");
    }
});
//写入结束
ws.end();
//监听写入完成finish事件
ws.on("finish", function() {
    console.log("写入完成");
})