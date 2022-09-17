var express = require('express');
var router = express.Router();
let crypto = require("crypto"); //加密模块

/* GET home page. */
router.get('/', function(req, res, next) {
    res.cookie("name", "turnip", { signed: true, maxAge: 300000 });
    //解密cookies
    let cookie = req.signedCookies;
    //控制台输出cookies
    console.log(cookie)
    res.render('index', { title: 'Express' });
    //设置cookies属性,maxAge多久后失效;signed是否加密


});
//加密cookies的原理
router.get('/cookies', function(req, res, next) {
    let pass = "123";
    //创建加密对象，加密方式为MD5
    let sf = crypto.createHash("md5");
    // 对密码进行MD5加密
    sf.update(pass);
    //将加密后的二进制转换为字符串
    let content = sf.digest("hex");
    console.log(content);
    res.send(content);

});

function jm(str) {
    let pass = str;
    pass = "turnip" + pass;
    //创建加密对象，加密方式为MD5
    let sf = crypto.createHash("md5");
    // 对密码进行MD5加密
    sf.update(pass);
    //将加密后的二进制转换为字符串
    let content = sf.digest("hex");
    return content;
};


let strobj = {};

function my(str, secretStr) {
    // 对象[属性名]=属性值
    strobj[str] = secretStr;
}

function jiemi(miyao) {
    return strobj[miyao];
}


//加密cookies的原理
router.get('/cookiesjm', function(req, res, next) {
    let jm_str = jm("kang");
    console.log(jm_str);
    res.cookie("turnip", jm_str, { signed: true });
    //将加密的数据、对应的明文放置在某个位置
    my(jm_str, "kang");
    res.send("cookies加密成功");
    let req_str = req.signedCookies.turnip;
    // console.log(req_str)
    let reqStr = jiemi(req_str)
    console.log(reqStr);



});




module.exports = router;