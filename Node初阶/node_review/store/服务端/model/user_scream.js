//定义数据的集合规范
let mongoose = require("../mongo/user_DB"); //引入已连接的数据库模块
//定义集合规范
let userSchema = new mongoose.Schema({
    col_username: { type: String },
    col_password: { type: String },
    col_tel: { type: String }
});
var User = mongoose.model("user", userSchema);
module.exports = User;