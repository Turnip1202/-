let User = require("../model/user_scream"); //引入集合规范
const jwt = require("jsonwebtoken");
//将延迟函数封装成promise对象,登陆后，延迟几秒
function Await(milliSecondes) {
    return new Promise(function(resolve, reject) {
        //使用函数setTimeut
        setTimeout(function() {
            resolve(`延迟了${milliSecondes}秒,即将跳转到登陆页面`);
        }, milliSecondes);
    })
}

let login = async(ctx) => {
    let data = ctx.request.body; //获取页面发送来的数据
    //ajax发送来的就是一个和数据库内相同字段的对象，故直接查询
    // console.log(data)
    // let user_name = data.user; //获取页面发送来的账户
    // let user_pass = data.pass; //获取页面发送来的密码
    var result = { //定义验证信息
        "errCode": 0,
        "errMsg": ""
    };
    let user = await User.findOne(data, (err, res) => {
        if (err) {
            console.log(err);
        }
    });

    // console.log(user);
    if (!user) {
        result.errCode = 1;
        result.errMsg = "账户或密码错误，请重新登陆";
        ctx.body = result;
    } else {
        let secret = "turnip"; //密钥
        let token = jwt.sign(
            //可放置的信息
            {
                user: user.__id,
                id: user.col_username
            },
            //密钥
            secret,
            // token时间
            {
                expiresIn: "60000"
            });
        console.log(token);
        result.token = token;
        result.errCode = 0;
        result.errMsg = "登陆成功";
        ctx.body = result;

    }

}


module.exports = login;