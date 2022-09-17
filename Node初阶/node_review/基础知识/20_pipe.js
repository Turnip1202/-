//使用管道流写入文件

let fs = require("fs");
//创建读取流
let rs = fs.createReadStream("./turnip.txt");
//创建写入流
let ws = fs.createWriteStream("./kang.txt");
//使用管道流入文件
rs.pipe(ws);