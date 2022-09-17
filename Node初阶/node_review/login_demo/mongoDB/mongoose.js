const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/DB_user";
const warning = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(DB_URL, warning);
mongoose.connection.on("connected", () => {
    console.log("数据库连接成功")
})
mongoose.connection.on("error", err => {
    console.log(err)
})
mongoose.connection.on("disconnected", () => {
    console.log("数据库已断开")
})
module.exports = mongoose;