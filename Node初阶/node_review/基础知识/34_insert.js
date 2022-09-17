var user = require("./33_schema.js");
//写入规范数据
var user = new user({
	"name":"张三",
	"age":20,
	"sex":"男"
})
//将数据添加到数据库
user.save((err,res)=>{
	console.log(res)
})