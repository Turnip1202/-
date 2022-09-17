window.addEventListener('load', () => {
    //查询
    let show = document.querySelector('#show');
    let show_texr = document.querySelector('.show');
    show.addEventListener('click', () => { 
        axios({
            method: 'post',
            url: '/T_background/show',
            // 将授权码和数据一同发送
            data: {code:1}
        }).then((res) => { 
            if (res.data = 0) {
                alert('失败')
            } else { 

            console.log(res)
            let arr = [];
          
            
            }
        }).catch(function(error) {
            console.log(error);
        });
    })
    //删除

    let del = document.querySelector('#delete');
    del.addEventListener('click', () => { 
        let val=  document.querySelector('#delete_val').value;
        let pro=  document.querySelector('#delete_pro').value;
        axios({
            method: 'post',
            url: '/T_background/delete',
            // 将授权码和数据一同发送
            data: {
                val,
                pro
            }
        }).then((res) => { 
            if (res.data = 0) {
                alert('失败')
            } else {
            //    alert(res.data)
            }
        }).catch(function(error) {
            console.log(error);
        });
    })


    //提交
    document.querySelector('#btn').addEventListener('click', (e) => {

        let adminCode = document.querySelector("#adminCode").value;
        let t_picture = document.querySelector("#t_picture").value;
        let t_tag = document.querySelector("#t_tag").value;
        let t_route = document.querySelector("#t_route").value;
        // console.log(t_route)
        let t_content = editor.txt.html()
            // 判断授权码
        if (!adminCode) {
            e.target.innerHTML = '请输入授权码';
            e.target.style.backgroundColor = 'red';
            setTimeout(() => {
                document.querySelector('#btn').innerHTML = '点击提交';
                document.querySelector('#btn').style.backgroundColor = 'skyblue';
            }, 2000)
        } else {
            if (!adminCode || !t_picture || !t_tag || !t_content || !t_route) {
                document.querySelector('#btn').innerHTML = '有未输入';
                document.querySelector('#btn').style.backgroundColor = '#fc011a';
                setTimeout(() => {
                    document.querySelector('#btn').innerHTML = '点击提交';
                    document.querySelector('#btn').style.backgroundColor = 'skyblue';

                }, 2000)
            } else {
                let date = new Date();
                let year = date.getFullYear(); //得到年份
                let month = date.getMonth() + 1; //得到月份
                let dates = date.getDate(); //得到日期
                let hour = date.getHours(); //得到小时
                let minu = date.getMinutes(); //得到分钟
                let sec = date.getSeconds(); //得到秒
                let mil = date.getMilliseconds(); //得到毫秒
                if (hour < 10) {
                    hour = '0' + hour
                }
                if (minu < 10) {
                    minu = '0' + minu
                }
                if (sec < 10) {
                    sec = '0' + sec
                }
                let t_date = `${year}-${month}-${dates} ${hour}:${minu}:${sec}.${mil}`;
                // 发送 POST 请求
                axios({
                        method: 'post',
                        url: '/T_background/article',
                        // 将授权码和数据一同发送
                        data: {
                            adminCode,
                            t_picture,
                            t_tag,
                            t_content,
                            t_route,
                            t_date
                        }
                    }).then(function(response) {
                        // console.log(response)
                        if (response.data.success == 200) {
                            document.querySelector('#btn').innerHTML = '上传成功';
                            document.querySelector('#btn').style.backgroundColor = '#0000fe';
                            setTimeout(() => {
                                document.querySelector('#btn').innerHTML = '点击提交';
                                document.querySelector('#btn').style.backgroundColor = 'skyblue';

                            }, 2000)
                        } else {
                            document.querySelector('#btn').innerHTML = response.data.err;
                            document.querySelector('#btn').style.backgroundColor = '#fc011a';
                            setTimeout(() => {
                                document.querySelector('#btn').innerHTML = '点击提交';
                                document.querySelector('#btn').style.backgroundColor = 'skyblue';

                            }, 2000)

                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }


        }
    })


})