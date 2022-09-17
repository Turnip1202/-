//addEventListener第三个参数冒泡
//文档加载完成，即仅html文档，仅立即操作dom时
window.addEventListener('DOMContentLoaded', () => {


    //header功能

    // 获取DOM元素
    let T_nav, qr_code, qr_code_img;
    T_nav = document.querySelector('.T_nav');
    qr_code = document.querySelectorAll('.qr_code');
    qr_code_img = document.querySelector('.qr_code_img'); //二维码

    document.addEventListener('scroll', e => {
        if (window.pageYOffset > 60) {
            // T_nav.style.backgroundColor = 'rgba(205, 205, 205, 0.7)'
        } else {
            // T_nav.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
        }
    }, false);

    //header功能--弹出二维码
    for (let i = 0; i < qr_code.length; i++) {
        qr_code[i].addEventListener('mouseenter', () => {
            qr_code_img.style.display = 'block';
        });
        qr_code[i].addEventListener('mouseout', () => {
            qr_code_img.style.display = 'none';
        });
        qr_code[i].addEventListener('click', () => {
            if (!k) {
                qr_code_img.style.display = 'block';
                k = true;
            } else {
                qr_code_img.style.display = 'none';
                k = false;

            }
        });
    };
    // 公告栏
    let T_notice_item_hd = document.querySelector('.T_notice_item_hd');
    let notice_item_bd = document.querySelector('.T_notice_item_bd');
    let T_notice_hd_item = T_notice_item_hd.querySelectorAll('li');
    let notice_item_bd_item = notice_item_bd.querySelectorAll('div')
    for (let i = 0; i < T_notice_hd_item.length; i++) {

        T_notice_hd_item[i].addEventListener('click', function () {
            for (let i = 0; i < notice_item_bd_item.length; i++) {
                notice_item_bd_item[i].style.display = 'none';
                T_notice_hd_item[i].classList.remove('T_notice_active')
            }
            this.classList.add('T_notice_active')
            if (this.dataset.text == 'notice') document.querySelector('.T_net_note').style.display = 'block'
            if (this.dataset.text == 'vip') document.querySelector('.T_vip_login').style.display = 'block'
            if (this.dataset.text == 'contact') document.querySelector('.T_contact').style.display = 'block'
        }, true)
    }





}, false);


// 需要立即操作资源性文件时
window.addEventListener('load', () => {
    // 后台系统
    document.querySelector('#back_system').addEventListener('click', () => {
        //动态引入axios
        // let script_axios = document.createElement('script');
        // script_axios.src = "https://unpkg.com/axios/dist/axios.min.js"
        // document.body.appendChild(script_axios);
        let code = prompt('请输入授权码');

        // 发送 POST 请求
        axios({
            method: 'post',
            url: '/T_background',
            // 将授权码和数据一同发送
            data: {
                Code: code
            }
        }).then(function (response) {
            if (response.data) {
                window.location.href = '/T_background/Editor'
            } else {
                console.log(response.data);
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    });
    //昼夜切换
    document.querySelector('#night').addEventListener('click', function (e) {
        let body = document.body;
        let nav = document.querySelector('.nav_bg');
        let main_l = document.querySelector('.T_main_content_left');
        let notice = document.querySelector('.T_notice');
        let daily = document.querySelector('.T_daily')
        let message = document.querySelector('.T_message');
        let footer = document.querySelector('.T_footer');
        let article = document.querySelector('#article');
        let example = document.querySelector('.example')
        console.log(example)
        if (this.querySelector('svg>use').getAttribute('xlink:href') == '#icon-yewan') {
            // 夜
            if (body) body.style.background = '#121212';
            if (nav) nav.style.backgroundColor = 'rgba(39, 39, 39, 0.3)';
            if (main_l) main_l.style.background = '#1f1b24';
            if (notice) notice.style.background = '#1f1b24';
            if (daily) daily.style.background = '#1f1b24';
            if (message) message.style.background = '#1f1b24';
            if (footer) footer.style.background = '#1f1b24';
            if (article) article.style.backgroundColor = '#1f1b24';
            if (example) example.style.color = '#fff'
            this.querySelector('svg>use').setAttribute('xlink:href', '#icon-baitian');
        } else {
            if (body) body.style.background = 'rgba(223, 222, 222, 0.7)';
            if (nav) nav.style.backgroundColor = 'rgba(255, 255, 255, 0.1);';
            if (main_l) main_l.style.background = 'rgba(255, 255, 255,.7)';
            if (notice) notice.style.background = 'rgba(255, 255, 255,.7)';
            if (daily) daily.style.background = 'rgba(255, 255, 255,.7)';
            if (message) message.style.background = 'rgba(255, 255, 255,.7)';
            if (footer) footer.style.background = 'rgba(255, 255, 255,.7)';
            if (article) article.style.backgroundColor = 'rgba(255, 255, 255, .7)';
            if (example) example.style.color = '#000'
            this.querySelector('svg>use').setAttribute('xlink:href', '#icon-yewan');
        }
    });



    if (new Date().getHours() >= 19 || new Date().getHours() <= 6) {
        document.querySelector('#night').click();
    }


})