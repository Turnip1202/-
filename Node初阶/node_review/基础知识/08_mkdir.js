//创建目录

let fs = require("fs");
fs.mkdir("./kang", function(err) {
    console.log(err);
})