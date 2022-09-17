// 读取文件

let fs = require("fs");
/*
readFile回调函数内的
err:错误信息
data:读取的数据
*/
//异步读取,不返回数据
fs.readFile("./turnip.txt", { flag: "r", encoding: "utf-8" }, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
console.log(read);
// 同步读取，返回数据
let data = fs.readFileSync("turnip.txt", "utf-8");
console.log(data);