let express = require("express");
let app = express();
let ejs = require("ejs");
let path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
//解析post提交的数据
app.use(express.urlencoded());
app.post("/post", (req, res) => {
    //post的数据在res.body内，且需要app.use(express.urlencoded());解析
    console.log(req.query);
    console.log(req.body);
    res.send("post");
})

app.get("/", async(req, res) => {
    res.render("index.ejs");
})
app.get("/form", async(req, res) => {
    let url = req.url;
    res.send("表单页");
    let data = req.query;
    console.log(data, url);
})
app.get("/ajax", (req, res) => {
    res.render("ajax.ejs");

})
module.exports = app;