var user = require("./33_schema.js")
user.deleteOne({"name":"张三"},(err,res)=>{
	console.log(res)
})
