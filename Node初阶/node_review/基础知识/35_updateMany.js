var user = require("./33_schema.js")
user.updateMany({"name":"张三"},{"age":16},(err,res) => {
	console.log(res)
})
