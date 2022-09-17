let puppeteer = require("puppeteer"); //引入puppeteer模块
let axios = require("axios"); //引入axios模块
const url = require('url');
let fs = require("fs");
const { fsReadFile, fsWriteFile, fsDir } = require("./04_RWD");

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

    async function parseTxt() {
        //读取文本内容
        let textContent = await fsReadFile("./book.txt");
        //正则匹配json字符串对象
        let reg = /(\{.*?\})---/igs;
        var tempRes;
        var bookArr = [];
        while (tempRes = reg.exec(textContent)) { //exec匹配后返回数组
            //获取匹配结果
            let jsonStr = tempRes[1];
            //将字符串解析成对象
            let jsonObj = JSON.parse(jsonStr);
            //获取匹配后的链接属性,文件内有title和href属性
            // let bookHref = jsonObj.href;

            //传入json对象，到下载函数
            // dowonloadBook(jsonObj);

            //传入定义的数组
            bookArr.push(jsonObj)
        }
        return bookArr;
    };

    //获得每本书的数据的数组
    let bookArr = await parseTxt();
    //定义数组索引
    let index = 0;
    //每次调用下载一本
    async function downloadBook(bookObj) {
        //如果索引值达到数组长度，则停止该函数
        if (index == bookArr.length) {
            return "完成";
        };
        let bookObj = bookArr[index]; //得到每本书的数据对象
        index++; //自增索引，循环每本书

        //打开新页面，下载书籍
        let page = await browser.newPage();
        await page.goto(bookObj.href);
        //我们要点击a元素
        //但是通过分析发现a元素是js通过Ajax访问后台渲染出来的，故需要使用等待渲染的方法，使浏览器等待
        await page.waitForSelector("#table_files tbody .even a", { visible: true });
        let elementAhref = await page.$eval("#table_files tbody .even a", (element) => {
            return element.getAttribute("href");
        });
        //获取a元素
        // await elementA.click(); //点击a元素
        // //关闭下载详情页页面
        page.close();
        //获取a元素的href属性
        // let elementAhref = (await elementA.getProperty("href"))._remoteObject.value;
        //链接传入到二级下载页面
        bookLinkPage(elementAhref, bookObj.title);
    }
    async function bookLinkPage(linkUrl, title) {
        let page = await browser.newPage();

        //我们的页面会发送请求到服务器。但是有些请求响应的太慢，所以我们对请求进行截取，
        //拦截部分请求，只发送我们想要的请求到服务器，如下面对谷歌请求的拦截
        //截取谷歌请求
        await page.setRequestInterception(true);
        //监听请求事件，并对请求进行拦截。
        page.on("request", interceptedRequest => {
            //通过url的parse对请求地址进行解析，
            let urlObj = url.parse(interceptedRequest.url());
            //解析出主机地址，进行判断,截获
            if (urlObj.hostname == "14804066.ch1.ctc.data.tv002.com") {
                // console.log("截获地址" + urlObj.href);
                interceptedRequest.abort();
                let ws = fs.createWriteStream("./book/" + title + ".epub");
                axios.get(urlObj.href, { responseType: "stream" }).then(function(res) {
                    res.data.pipe(ws);
                    ws.on("close", function() {
                        console.log("下载已完成：" + title);
                        //下完之后，在执行下载
                        downloadBook();
                        page.close();
                    })
                });
                //连续下载，会出现断流的情况
                // downloadBook();

            } else {
                //否则，请求继续
                interceptedRequest.continue();
            };
        });

        await page.goto("http://ctflie.sobooks.cc" + linkUrl);
        await page.waitForSelector(".btn.btn-outline-secondary.fs--1");
        //获取下载元素
        let btn = await page.$(".btn.btn-outline-secondary.fs--1");
        await btn.click();
        // //监听请求完成，获取请求地址
        // page.on("requestfinished", (req) => {
        //     console.log("下载已完成：", req.url())
        // })
        page.close();


    };



})();