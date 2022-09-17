let mongoose = require("../mongoDB/mongoose.js");
//定义集合规范
let userSchema = new mongoose.Schema({
    col_username: { type: String },
    col_password: { type: String },
    col_tel: { type: String },
    col_email: { type: String }
});
//使用集合规范
var User = mongoose.model("user", userSchema);
module.exports = User;