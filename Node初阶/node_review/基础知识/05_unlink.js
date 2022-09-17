let fs = require("fs");
//创建文件
fs.writeFile("./kang.txt", "萝卜", function(err) {
    if (err) {
        console.log(err);
    }
});
//删除文件
fs.unlink("./kang.txt", function(err) {
    if (err) {
        console.log(err)
    }
})