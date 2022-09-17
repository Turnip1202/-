//打开文件

let fs = require("fs");
//open回调函数的参数fd是文件地址
//打开文件
fs.open("./turnip.txt", "w+", function(err, fd) {
    console.log(err);
    console.log(fd); //文件地址
    //写入数据
    fs.write(fd, "我爱吃萝卜", function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("写入成功");
        }
    });
    //读取数据
    fs.readFile("./turnip.txt", "utf-8", function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    })
})