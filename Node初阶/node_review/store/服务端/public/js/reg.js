$(function() {
    var yzm = new GVerify("v_container");
    var regTel = /^1[356789][0-9]{9}/;
    $("#button").on("click", function() {
        //获取表单数据
        let userName = $("#userName").val().trim();
        let userPass = $("#userPass").val().trim();
        let userPassAg = $("#userPassAg").val();
        let tel = $("#tel").val().trim();
        let telCode = $("#telCode").val().trim();
        var res = yzm.validate($("#code_input").val().trim());
        if (!res) {
            $("#tip").html("验证码输入错误，请重新输入");
        } else {
            if (userName.length < 6 || userName.length > 16) {
                $("#tip").html("用户名应在6~16位之间");
            } else if (userPass.length < 6 || userPass.length > 16) {
                $("#tip").html("密码应在6~16位之间");
            } else if (userPassAg != userPass) {
                $("#tip").html("两次密码不一致");
            } else if (!regTel.test(tel)) {
                $("#tip").html("手机号应为11位");
            } else if (telCode.length != 4) {
                $("#tip").html("验证码应为4位");
            } else {
                // $("#tip").html("");

                //              $("#tip").empty();
                $.ajax({
                    type: "post",
                    url: "http://localhost:3001/reg", //请求服务器的地址
                    data: {
                        userName: userName,
                        userPass: userPass,
                        tel: tel,
                        telCode: telCode
                    },
                    //                  dataType: "html",
                    //响应内容
                    success: function(result) {
                        //console.log(typeof result);
                        if (result.errCode == 0) {
                            window.location.href = "login.html"
                        } else {
                            $("#tip").html(result.errMsg);


                        }
                        /* for(var key in result){
                         	console.log(key+":"+result[key])
                         }*/

                    }
                });
            }

        }
    })

    $("#regButton").on("click", function() {
        $(this).attr("disabled", "disabled").addClass("disable");
        var t = 60;
        $(this).html(`${t}秒后可以重新发送`);
        var time = setInterval(() => { //箭头函数this指向上一级函数
            t--;
            $(this).html(`${t}秒后可以重新发送`);
            if (t == 0) {
                clearInterval(time);
                $(this).removeAttr("disabled").removeAttr("disabled");
                $(this).html("点击注册")

            }
        }, 1000)
    })
})