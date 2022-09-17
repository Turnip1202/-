let User = require("../moudle/DB_schema.js"); //引入准备好的数据库模块

//将延迟函数封装成promise对象,注册后，延迟，重定向到登陆页面
function Await(milliSecondes) {
    return new Promise(function(resolve, reject) {
        //使用函数setTimeut
        setTimeout(function() {
            resolve(`延迟了${milliSecondes}秒,即将跳转到登陆页面`);
        }, milliSecondes);
    })
}

var reg = async(ctx) => {
    let data = ctx.request.body; //获取页面内post方式发送来的数据
    console.log(data);
    // //将发送来的数据插入数据库
    let DB_user = new User({
        //注意要和schema规范的键一样
        col_username: data.username,
        col_password: data.password,
        col_tel: data.tel,
        col_email: data.email
    });
    await DB_user.save(); //执行插入插入功能
    //调用、等待延迟函数
    await Await(3000);
    //重定向到登陆页面
    ctx.response.redirect("/login");

};
module.exports = reg;