//目标网站：https://sobooks.cc

let puppeteer = require("puppeteer"); //引入puppeteer模块
let axios = require("axios"); //引入axios模块
const url = require('url');
let fs = require("fs");
let http_URL = "https://sobooks.cc";
//创建自执行异步函数
(async function() {
    //打开浏览器
    //设置浏览器的参数
    let debugOptions = {
        //设置浏览器的宽和高
        defaultViewprot: {
            width: 1400,
            height: 800
        },
        //设置是否有界面，true为无界面
        headless: false,
        //设置放慢操作浏览器的步骤
        slowMo: 200
    };
    let options = { headless: false };
    let browser = await puppeteer.launch(debugOptions);

    //将延迟函数封装成promise对象
    function Await(milliSecondes) {
        return new Promise(function(resolve, reject) {
            var j = 1;
            setTimeout(function() {
                resolve("延迟函数执行成功,延迟了" + milliSecondes + "毫秒")
            }, milliSecondes * j);
            j++;
        })
    }

    async function getAllNum() {
        let page = await browser.newPage();
        await page.goto(http_URL);
        //设置选择器，获取总页数，选择li的最后一个元素
        let pageNum = await page.$eval(".pagination li:list-child span", (element) => {
            //获取元素内容，trim去除首尾空格
            let text = element.innerHTML.trim();
            //截取字符串
            text.substring(1, text.length - 2);
            return text; //返回总页数给选择器函数
        });
        page.close()
        return pageNum; //返回总页数给getAllNum
    }


    //获取列表页的数据
    async function pageList(num) {
        let pageList_url = "https://sobooks.cc/page/" + num;
        let page = await browser.newPage();
        //我们的页面会发送请求到服务器。但是有些请求响应的太慢，所以我们对请求进行截取，
        //拦截部分请求，只发送我们想要的请求到服务器，如下面对谷歌请求的拦截
        //截取谷歌请求
        await page.setRequestInterception(true); //启用拦截器
        //监听请求事件，并对请求进行拦截。
        page.on("request", interceptedRequest => { //监听请求
            //通过url的parse对请求地址进行解析，
            let urlObj = url.parse(interceptedRequest.url());
            //解析出主机地址，进行判断
            // if (urlObj.hostname == "googleads.g.doubleclick.net") {
            //强力拦截谷歌请求
            if (urlObj.hostname.indexOf("goole") != -1) {
                //如果是谷歌的广告地址，则拒绝请求。因为谷歌的广告响应太慢
                interceptedRequest.abort();
            } else {
                //否则，请求继续
                interceptedRequest.continue();
            };
        });
        //访问列表页地址
        await goto(pageList_url);
        let arrpage = await page.$$eval(".card .card-item .thumb-img>a", (elements) => {
            let arr = [];
            //elemnts是一个数组(forEach只能遍历数组)，对element进行遍历
            elements.forEach((element, i) => {
                var obj = {
                    href: element.getAttribute("href"),
                    title: element.getAttribute("title")
                };
                //像数组尾部添加内容
                arr.push(obj);
            });
            console.log(arr); //测试是否有内容
            return arr;
        })
        page.close();
        //通过获取数组的地址和标题去请求书籍的详情页人
        arrpage.forEach(async(pageObj, i) => {
            await Await(1000)
            getPageInfo(pageObj);
        });
    };

    async function getPageInfo(pageObj, title) {
        let page = await browser.newPage();
        //我们的页面会发送请求到服务器。但是有些请求响应的太慢，所以我们对请求进行截取，
        //拦截部分请求，只发送我们想要的请求到服务器，如下面对谷歌请求的拦截
        //截取谷歌请求
        await page.setRequestInterception(true);
        //监听请求事件，并对请求进行拦截。
        page.on("request", interceptedRequest => {
            //通过url的parse对请求地址进行解析，
            let urlObj = url.parse(interceptedRequest.url());
            //解析出主机地址，进行判断
            // if (urlObj.hostname == "googleads.g.doubleclick.net") {
            //提高对谷歌广告的拦截力度，即只要出现谷歌直接拦截
            if (urlObj.hostname.indexOf("goole") != -1) { //找到了则为-1，进入
                //如果是谷歌的广告地址，则拒绝请求。因为谷歌的广告响应太慢
                interceptedRequest.abort();
            } else {
                //否则，请求继续
                interceptedRequest.continue();
            };
        });

        //转到详情页
        await page.goto(pageObj.href);
        //获取下载地址
        let eleA = page.$(".dltable tr:nth-child(3) a:last-child");
        //获取所选对象的属性
        let aHref = await eleA.getProperty("href");
        aHref = aHref._remoteObject.value;
        //对字符串进行分隔，得到真正的下载地址
        aHref.split("?url=")[1];
        let content = `{"title":"${pageObj.title},"href":"${aHref}---\n"}`;
        //写入文件，从这里可以看出，写入流是从服务器接受来数据，由于数据接收速度的原因，故慢慢流入文件内
        //而此时的writeFile是将数据直接写入文件。当然这里使用写入流亦可以，但没必要
        fs.writeFile("book.txt", content, { flag: "a" }, function() {
            console.log("写入完成" + title);
            //写入完成后，关闭
            page.close();
        });
        // console.log(aHref);
    };
    // pageList(); //测试
    var pageNum = await getAllNum;
    // console.log(pageNum)
    // pageList(pageNum); //进入列表页函数
    var count = 1;
    if (count != pageNum) {
        pageList(count);
        count++;
    }



})();

//进入网站，获取整个网站列表的页数

//获取列表页的所有链接

//进入每个电子书的详情页获取下载电子书的网盘地址