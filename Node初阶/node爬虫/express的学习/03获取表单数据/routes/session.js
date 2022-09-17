var express = require('express');
var router = express.Router();
//session下的根目录
router.get("/", (req, res, next) => {
    req.session.kang = "康";
    req.session.turnip = "萝卜";
    res.send("session设置成功");



})
router.get("/get", (req, res, next) => {
    let data = req.session.kang;
    console.log(data)
    res.send("已获取")
})

module.exports = router;