//写入文件内容

let fs = require("fs");
fs.writeFile("./turnip.txt", "萝卜", function(err) {
    console.log(err);
});