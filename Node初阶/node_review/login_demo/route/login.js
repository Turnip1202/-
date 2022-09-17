let fs = require("fs.promised"); //引入fs.promised模块
let User = require("../moudle/DB_schema.js"); //引入准备好的数据库模块
var login = async(ctx) => {
    ctx.response.type = "text/html"; //定义响应数据类型
    ctx.response.body = await fs.readFile("../login.html", "utf-8"); //读取文件。设置编码格式。并相应给客户端
    ////查询多条，返回一个
    User.findOne({ "username": "123" }, (err, res) => {
        console.log(res[0].age);
    })
    ctx.response.body = "登陆成功";
};
module.exports = login;