function fsWrite(path, content) {
    return new Promise(function(resolve, reject) {
        let fs = require("fs");
        fs.writeFile(path, content, { flag: "a", encoding: "utf-8" }, function(err) {
            if (err) {
                reject(err)
            } else {
                resolve(err)
            }
        })

    })
}

//async是修饰作用，会使
async function writeList() {
    //await表示，等待后面的函数结束后，在执行下一行代码
    await writefs("turnip2.txt", "1我爱吃胡萝卜")
    await writefs("turnip2.txt", "2我爱吃胡萝卜")
    await writefs("turnip2.txt", "3我爱吃胡萝卜")
}
writeList();