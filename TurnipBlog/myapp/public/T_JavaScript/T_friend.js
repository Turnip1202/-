window.addEventListener('load', () => {
    document.querySelector("#f_btn").addEventListener("click", (e) => {
        let arr_input = document.querySelectorAll('.T_form>input');
        axios({
            method: 'post',
            url: '/friend',
            data: {
                name: arr_input[0].value,
                link: arr_input[1].value,
                describe: arr_input[2].value,
                headImg: arr_input[3].value
            }
        }).then((res) => {
            console.log(res)
            if (res.data) {
                e.target.innerHTML = '成功，请刷新'
            }
        }).catch((err) => {
            sconsole.log(err)
        })
    })
})