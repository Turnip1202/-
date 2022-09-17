$(() => {
    let yzm = new GVerify("v_container");
    $("#button").on("click", () => {
        let res = yzm.validate($("#code_input").val()); //判断验证码
        let username = $("#userName").val(); //获取账户
        let userpass = $("#userPass").val(); //获取密码
        if (!res) {
            $("#tip").html("验证码错误，请重试");
        } else {
            if (username.length < 6 || userpass.length > 16) {
                $("#tip").html("账户错误，请重试");
            } else if (userpass.length < 6 || userpass.length > 16) {
                $("#tip").html("密码错误，请重试");
            } else {
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1:3001/login",
                    async: true,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", "Bar");
                    },
                    data: {
                        col_username: username,
                        col_password: userpass
                    },
                    success: function(result) {
                        if (result.errCode == 0) {
                            console.log(result)
                                //removeItem移除，setItem设置。利于观看
                                //默认设置在此处，这句代码不写也行
                            window.localStorage.setItem("token", result.token)
                                // window.location.href = "index.html"
                        } else {
                            $("#tip").html(result.errMsg);
                        }
                    }
                })
            };
        };

    })
})