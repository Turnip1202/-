//判断是否为文件或目录

let fs = require("fs");
fs.stat("./06_stat.js", function(err, stats) {
    //判断是否为文件
    let stats_s = stats.isFile();
    //判断是否为目录
    let stats_s_S = stats.isDirectory();
    console.log(stats_s, "\n", stats_s_S)
})