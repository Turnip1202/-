let mysql = require("mysql");
let express = require("express");
let app = express();
//引入模板渲染页面
let ejs = require("ejs");
//将模板引擎和express应用相关联
app.set("views", "views"); //设置试图对应的目录--前者views是视图参数，后面的views是试图目录
app.set("view engine", "ejs"); //设置默认的模板引擎
app.engine("ejs", ejs.__express); //定义模板引擎

//封装query函数
async function SQLquery(cmd) {
    return new Promise(function(resolve, reject) {
        con.query(cmd, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
};
let option = {
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "kang",
    database: "book"
};
let con = mysql.createConnection(option);
con.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("数据库连接成功");
    }
})

module.exports = app;



app.get("/", async(req, res) => {
    // let str = "select*from book limit 0,10"
    // let data = await SQLquery(str);
    // let resjson = JSON.stringify(Array.from(data));
    // console.log(resjson);
    // res.send(resjson); //会按照html文档解析
    // res.json(Array.from(data)); //会返回json数据，按照json解析

    //使用模板
    let options = {
        title: "首页",
        article: "<h1>文章标题</h1>"
    }
    res.render("index.ejs", options);

})