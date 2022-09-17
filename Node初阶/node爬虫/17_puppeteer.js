// 操作浏览器，使用page.$$eval获取页面元素。goto实现跳转


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
        headless: false
    }
    let browser = await puppeteer.launch(options); //有界浏览器
    //打开一个新页面
    const page = await browser.newPage();
    //在页面内打开一个网站
    await page.goto("https://www.baidu.com");
    // await page.screenshot({ path: "./browser.png" })//截图
    //$$eval函数使得回调函数可以运行在回调函数中，并且可以通过浏览器的方式输出
    let elements = await page.$$eval("#s-top-left a", (elements) => {
        //创建一个数组收集需要元素信息
        let eles = [];
        elements.forEach(function(item, i) {
            // console.log(item.innerText)

            if (item.getAttribute("name") != "tj_briicon") {
                var eleObj = {
                    href: item.getAttribute("href"),
                    text: item.innerText
                };
                eles.push(eleObj);
            }
            console.log(eleObj);
        })
        return eles;
    });
    // //浏览器可以监听控制台的输出
    // page.on("console", function(...args) {
    //         console.log(args)
    //     })
    let livePage = await browser.newPage(); //创建一个标签页
    //跳转页面
    await livePage.goto(elements[3].href);
    console.log(elements);
    // 关闭浏览器
    // await browser.close()


}


test()