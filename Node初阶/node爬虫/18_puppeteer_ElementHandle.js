//操作浏览器，获取页面元素，使用事件点击click页面元素

let puppeteer = require("puppeteer");
//理论上这种有证书的网站，无法访问。
// async function http() {
//     let axios = require("axios")
//     await axios.get("https://www.dytt8.net/index.htm").then((res) => {
//         console.log(res.data)
//     })
// }
// http();

async function test() {
    //配置浏览器
    //puppeteer.launch实例开启浏览器，可以配置为无界浏览器，
    //也可以配置有界面的浏览器。
    //无界浏览器的性能更高更快，有界浏览器一般用于调试
    let options = {
        ignoreHTTPSErrors: true,
        //设置视窗宽高
        defaultViewport: {
            width: 1400,
            height: 800
        },
        //设置有界面，true为无界面
        headless: false,
        //放慢操作
        slowMo: 200
    }
    let browser = await puppeteer.launch(options); //有界浏览器
    //打开一个新页面
    const page = await browser.newPage();
    //在页面内打开一个网站
    await page.goto("https://www.baidu.com");

    //获取页面对象。一个$是获取一个。两个$是获取多个
    // let ElementHandle = await page.$$("#s-top-left a");
    // //点击页面元素
    // ElementHandle[3].click();

    //找到搜索框
    let search = await page.$("#kw");
    await search.focus(); //聚焦搜索框
    await page.keyboard.type("萝卜"); //搜索萝卜
    //取消父级冒泡，防止全屏广告。eval可以获取元素内的数据
    await page.$eval(".bg s_ipt_wr", (element) => {
        element.addEventListener("click", function(event) {
            event.cancelBubble = true;
        })
    });
    //找到搜索按钮
    let search_btn = await page.$("#su");
    //点击搜索按钮
    await search_btn.click();


    // 关闭浏览器
    // await browser.close()


}


test()