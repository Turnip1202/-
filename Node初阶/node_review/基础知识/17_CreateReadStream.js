//创建读取流，读取文件内容

let fs = require("fs");
//创建读取流
let rs = fs.createReadStream("./turnip.txt");
//设置读取的编码格式
rs.setEncoding("utf-8");
//监听数据读data事件，读取内容
let data = "";
rs.on("data", function(chunk) {
    data += chunk;
    console.log(data);
});
//监听读取结束end事件，
rs.on("end", function() {
    console.log("文件读取完成");
});
//监听读取异常eror事件
rs.on("error", function(err) {
    console.log(err)
})