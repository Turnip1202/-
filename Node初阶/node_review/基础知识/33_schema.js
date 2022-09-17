let mongoose = require("./32_mongoose.js");
//定义集合规范
let userSchema = new mongoose.Schema({
	"name":{type:String},
	"age":{type:Number},
	"sex":{type:String}
});
//使用集合规范
//var user = mongoose.model("user",userSchema);
var user = mongoose.model("user",userSchema);
module.exports = user;

