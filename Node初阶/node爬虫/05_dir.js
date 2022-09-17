let fs = require("fs");
let { fsReadFile, fsWrite } = require("./04_RW");
const txtpath = "all.txt";
fs.readdir("../node_进阶", function(err, files) {
    if (err) {
        console.log(err)
    } else {
        console.log(files)
        files.forEach(async function(filename, i) {
            //读取文件夹里所有文件的内容
            let content = await fsReadFile("../node_进阶/" + filename)
            await fsWrite(txtpath, content);
        })
    }
})