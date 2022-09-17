let User = require("../model/user_scream"); //引入集合规范
// console.log("dsad")
//将延迟函数封装成promise对象,注册后，延迟几秒
function Await(milliSecondes) {
    return new Promise(function(resolve, reject) {
        //使用函数setTimeut
        setTimeout(function() {
            resolve(`延迟了${milliSecondes}秒,即将跳转到登陆页面`);
        }, milliSecondes);
    })
}
//创建中间件
var reg = async(ctx) => {
    let data = ctx.request.body; //获取页面发送来的数据
    let username = data.userName;
    let password = data.userPass;
    let tel = data.tel;
    let telCode = data.telCode;
    var result = { //定义验证信息
        "errCode": 0,
        "errMsg": ""
    };
    let tel_verify = await User.findOne({ col_tel: tel });
    let user_verify = await User.findOne({ col_username: username });
    //  console.log(telCode)
    if (telCode != "1234") { //判断验证码
        result.errCode = 1;
        result.errMsg = "手机验证码输入错误，请重新输入";
        ctx.body = result;
    } else {
        if (tel_verify) {
            result.errCode = 2;
            result.errMsg = "手机号已存在";
            ctx.body = result;
        } else {
            if (user_verify) {
                result.errCode = 3;
                result.errMsg = "账户已存在";
            } else {
                let user = new User({
                    col_username: username,
                    col_password: password,
                    col_tel: tel
                })
                await user.save();
                result.errCode = 0;
                result.errMsg = "注册成功";
                ctx.body = result;
            }
        }
    }

    //调用延迟函数，等待数据库插入
    await Await(3000); //等待3秒，防止多次请求，造成拥堵

}

module.exports = reg;