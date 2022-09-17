window.addEventListener('load', () => {

    //main功能
    let T_slide_img, T_slide_js_ul, T_slide_s_l, T_slide_s_r, T_js_slide_s, T_slide_active;
    T_slide_img = document.querySelector('.T_slide_img'); //轮播框
    T_slide_js_ul = document.querySelector('.T_slide_js_ul');
    T_slide_s_l = document.querySelector('.T_slide_s_l');
    T_slide_s_r = document.querySelector('.T_slide_s_r');
    T_slide_active = document.querySelector('.T_slide_active');
    T_js_slide_s = document.querySelector('.T_js_slide_s');

    // 动态生成小圆圈
    for (let i = 0; i < T_slide_js_ul.children.length; i++) {
        let em = document.createElement('em');
        //给每个em添加索引
        em.setAttribute('data-index', i)
        em.innerHTML = `<svg class="icon" aria-hidden="true"><use xlink:href="#icon-weixuanzhongyuandian"></use></svg>`
        T_slide_active.appendChild(em);
        //下面的想法很美好，即全部动态创建
        // let em = document.createElement('em');
        // let svg = document.createElement('svg');
        // let use = document.createElement('use');
        // svg.setAttribute('class', 'icon');
        // svg.setAttribute('aria-hidden', 'true');
        // use.setAttribute('xlink:href', '#icon-weixuanzhongyuandian');
        // svg.appendChild(use);
        // em.appendChild(svg);
        // console.log(em);
    };
    //先把第一个圆点设置好
    let T_em = document.querySelectorAll('.T_slide_active>em');
    T_em[0].innerHTML = `<svg class="icon" aria-hidden="true"><use xlink:href="#icon-yuandian"></use></svg>`;

    // 克隆第一张图,和最后一张图片
    let first_node = T_slide_js_ul.children[0].cloneNode(true);
    T_slide_js_ul.appendChild(first_node);


    let slide_i = 0;
    let flag = true;
    let circle = 0;
    // 左右箭头点击
    // 右箭头
    T_slide_s_r.addEventListener('click', () => {
        if (flag) {
            flag = false;
            if (slide_i == T_slide_js_ul.children.length - 1) {
                T_slide_js_ul.style.left = 0
                slide_i = 0;
            }
            Animate(T_slide_js_ul, -(++slide_i) * T_slide_img.offsetWidth, () =>
                flag = true
            );
            circle++;
            // console.log(circle)
            if (circle == T_slide_js_ul.children.length - 1) {
                circle = 0;
            }
            //把圆点清空
            for (let i = 0; i < T_em.length; i++) {
                T_em[i].innerHTML = `<svg class="icon" aria-hidden="true"><use xlink:href="#icon-weixuanzhongyuandian"></use></svg>`
            }
            T_em[circle].innerHTML = `<svg class="icon" aria-hidden="true"><use xlink:href="#icon-yuandian"></use></svg>`;
        }


    });
    //左箭头
    T_slide_s_l.addEventListener('click', () => {
        if (flag) {
            flag = false;
            if (slide_i == 0) {
                slide_i = T_slide_js_ul.children.length - 1;
                T_slide_js_ul.style.left = -slide_i * T_slide_img.offsetWidth + 'px';
            }
            Animate(T_slide_js_ul, -(--slide_i) * T_slide_img.offsetWidth, () =>
                flag = true
            );
            circle--;
            // console.log(circle)
            if (circle < 0) {
                circle = T_slide_js_ul.children.length - 2;
            }
            //把圆点清空
            for (let i = 0; i < T_em.length; i++) {
                T_em[i].innerHTML = `<svg class="icon" aria-hidden="true"><use xlink:href="#icon-weixuanzhongyuandian"></use></svg>`
            }
            T_em[circle].innerHTML = `<svg class="icon" aria-hidden="true"><use xlink:href="#icon-yuandian"></use></svg>`;
        }
    })

    // 点击圆点
    for (let i = 0; i < T_em.length; i++) {
        T_em[i].addEventListener('click', function() {
            if (flag) {
                //把圆点清空
                circle = slide_i = this.dataset.index;
                for (let i = 0; i < T_em.length; i++) {
                    T_em[i].innerHTML = `<svg class="icon" aria-hidden="true"><use xlink:href="#icon-weixuanzhongyuandian"></use></svg>`
                }
                T_em[this.dataset.index].innerHTML = `<svg class="icon" aria-hidden="true"><use xlink:href="#icon-yuandian"></use></svg>`;
                Animate(T_slide_js_ul, -(this.dataset.index) * T_slide_img.offsetWidth, () =>
                    flag = true
                );
            }
        })
    }

    // 自动轮播
    let clear_slide;

    function T_slide() {
        clear_slide = setInterval(() => {
            T_slide_s_r.click();

        }, 2000);
    }
    T_slide();
    //悬停图片框
    T_slide_img.addEventListener('mousemove', () => {
        T_slide_s_l.style.display = 'block';
        T_slide_s_r.style.display = 'block';
        clearInterval(clear_slide);
    });
    T_slide_img.addEventListener('mouseout', (e) => {
        //先清除上一次的调用
        clearInterval(clear_slide);
        T_slide();
        T_slide_s_l.style.display = 'none';
        T_slide_s_r.style.display = 'none';
    });

    //获取连续获取数据
    //设置cookie
    let a_number = 0;
    // let all_item = document.querySelectorAll('.all_item');
    // all_item[0].style.display = 'none';
    document.querySelector('#load_all').addEventListener('click', (e) => {
        // let script = document.createElement('script');
        // script.src = 'https://cdn.jsdelivr.net/npm/vue@2';
        // document.body.appendChild(script);
        // let script_vue = document.createElement('script');
        // script_vue.innerText = "alert('ss')"
        // document.body.appendChild(script_vue);

        a_number += 2;
        document.cookie = 'a_Count=' + a_number;
        let cookie = document.cookie;
        // console.log(cookie)
        if (cookie) {
            // 发送 POST 请求
            axios({
                    method: 'post',
                    url: '/',
                    // 将授权码和数据一同发送
                }).then(function(response) {
                    // console.log(response.data)
                    if (response.data) {
                        let arr_data = response.data;
                        arr_data.forEach((element, i) => {
                            let item = document.querySelector('.T_main_article_item_1').cloneNode(false);
                            //先转换为对象字符串，在转换为对象
                            // console.log(element);
                            item.innerHTML = ` <a href="/articlePage${element.t_route}">
                                        <h5><img src="${element.t_picture}" alt=""></h5>
                                    </a>
                                    <a href="/articlePage${element.t_route}">
                                        <h3><svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-biaotiyouhua"></use>
                                          </svg>${element.t_headline}</h3>
                                    </a>
                                    <a href="/articlePage${element.t_route}">
                                        <h4>
                                            <p>${element.t_text}</p>
                                        </h4>
                                    </a>
                                    <span class="T_main_article_item_1_span"><em>
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-bianzubeifen3"></use>
                                          </svg>Turnip </em><i> 
                                            <svg class="icon" aria-hidden="true">
                                                <use xlink:href="#icon-riqi"></use>
                                              </svg>${element.t_date}</i>
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-huo"></use>
                                          </svg>阅读${element.t_readNumber}<i></i><label> 
                                            <svg class="icon" aria-hidden="true">
                                                <use xlink:href="#icon-biaoqian"></use>
                                              </svg>${element.t_tag}</label></span>`;

                            document.querySelector('.T_main_article').appendChild(item)



                        });
                    } else {
                        e.target.innerHTML = '已到达底线';

                    }

                })
                .catch(function(error) {
                    console.log(error);
                });

        }

    });
    // 获取每日一句
    // GET request for remote image
    axios({
            method: 'get',
            url: 'http://news.iciba.com/index.php?mod=dailysentence',
            headers: {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                "Cache-Control": "max-age=0",
                "Connection": "keep-alive",
                "Cookie": "testnews_iciba_user=96; bdshare_firstime=1626966921609; PHPSESSID=mri6up378q6fs36ighvdk2lnb2",
                "DNT": 1,
                "Host": "news.iciba.com",
                "Referer": "http://news.iciba.com/index.php",
                "Upgrade-Insecure-Requests": 1,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62"
            },
        })
        .then(function(response) {
            console.log(response);
        });


})