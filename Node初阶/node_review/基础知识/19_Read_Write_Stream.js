//读写流，复制文件

let fs = require("fs");
let rs = fs.createReadStream("./kang.txt");
rs.setEncoding("utf-8"); //设置读取编码
//定义data变量，连续接受数据
let data = "";
//监听data事件，读取数据
rs.on("data", function(chunk) {
    data += chunk;
});
//监听end事件
rs.on("end", function() {
    let ws = fs.createWriteStream("./turnip.txt"); //创建写入流
    ws.write(data); //将data数据写入到写入流对象内
    ws.end(); //结束流入
    //监听完成finish事件
    ws.on("finish", function() {
        console.log("复制完成");
    })
})