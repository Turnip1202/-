let readline = require("readline");
let { fsWrite } = require("./04_RW.js")
    //实例化接口对象
let r = readline.createInterface({
    output: process.stdout,
    input: process.stdin
})

function lcQuestion(title) {
    return new Promise(function(resolve, reject) {
        r.question(title, function(answer) {
            resolve(answer)
        })

    })
}
async function createPackage() {
    let name = await lcQuestion("输入包名：")
    let description = await lcQuestion("输入描述")
    let user = await lcQuestion("输入作者")
    let main = await lcQuestion("输入入口")
    let content = `{"name":"${name}",
                "description":"${description}",
                "user":"${user}",
                "main":"${main}"
 } `;
    fsWrite("./package.json", content);
    r.close();
}
createPackage();
r.on("close", function() {
    process.emit(0);
})