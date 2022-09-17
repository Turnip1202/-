//2021年4月16日
//昨天的爬取失败令我反思了一夜，故今天只有拿出必杀技了
//目标网址首页https://www.aibooks.cc/
//目标第二页https://www.aibooks.cc/page/2
//规律 page页码递增
//经分析，下载页面属于AJAX请求来的，故普通的爬取无用
//今天使用puppeteer模拟浏览器爬取！

//开始引入模块
let axios = require("axios"); //用于请求服务器
const cheerio = require("cheerio");
let cherrio = require("cheerio"); //用于解析页面
let fs = require("fs"); //用于写入数据
let mysql = require("mysql"); //用于将爬取的数据插入数据库
let path = require("path"); //用于解析数据存放的路径
let url = require("url"); //用于解析网址
let puppeteer = require("puppeteer");
let { fs_ReadFile, fs_WriteFile, fs_mkDir, fs_rename, fs_readir } = require("./RWD.js");
// emitter.setMaxListeners(100);





let http_URL = "https://www.aibooks.cc/page/";

//将延迟函数封装成promise对象
function Await(milliSecondes) {
    return new Promise(function(resolve, reject) {
        var j = 1;
        setTimeout(function() {
            resolve("延迟函数执行成功,延迟了" + milliSecondes + "毫秒")
        }, milliSecondes * j);
        j++;
    })
};
//设置请求头
let options = {
    Headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Host": "www.aibooks.cc",
        "Referer": "https://www.aibooks.cc/",
        "TE": "Trailers",
        "Upgrade-Insecure-Requests": "1"
    }
    // timeout: 6000
};
let options2 = {
    Headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "DNT": "1",
        "Host": "www.aibooks.cc",
        "Referer": "https://www.aibooks.cc/",
        "TE": "Trailers",
        "Upgrade-Insecure-Requests": "1"
    }
    // timeout: 6000
}





//获得每一页的网址
async function parseList_book_url(page_url) {
    let arr = [];
    //循环，得到各页面的网址
    for (var i = 107; i <= 118; i++) {
        var page_book_url = (`${page_url}${i}`);
        arr.push(page_book_url)
    }
    // console.log(arr);
    try {
        await parse_page_url(arr);
    } catch (error) {
        try {
            await parse_page_url(arr);
            console.log(error);
        } catch (error) {
            await parse_page_url(arr);
            console.log(error);
        }

    }


}


//解析每一页网址内的书籍详情页网址
async function parse_page_url(arr_url) {
    let arr_page = arr_url;
    // console.log(arr_page);
    // let arr = [];
    for (var i = 0; i < arr_page.length; i++) {
        // await Await(2000);
        try {
            parse_data(arr_page[i]);
        } catch (error) {
            continue;
        }


    }
    return;
};

//解析每个页面的数据,便于插入数据库
async function parse_data(book_url) {
    let res = await axios.get(book_url, options);
    let $ = cheerio.load(res.data);
    let arr = [];
    await Await(1000);
    $("#cardslist .card-item .thumb-img>a").each(async(j, ele) => { //每一页解析24本书
        //在这里使用延迟函数貌似是失效的
        let href = $(ele).attr("href");
        arr.push(href);
    })
    var num = 1;
    for (var i = 0; i < arr.length; i++) {
        book_data(arr[i]);
        // let u = await book_download(arr[i])
        // console.log(u);


    }


};



// //获取验证码
// async function book_download(down_url) {
//     //启用模拟浏览器，进一步操作
//     //打开浏览器
//     let opt = { headless: false };
//     let browser = await puppeteer.launch(opt);
//     let res = await axios.get(down_url, options2);
//     let $ = cherrio.load(res.data);
//     let page = await browser.newPage();
//     //截取谷歌请求
//     await page.setRequestInterception(true); //启用拦截器
//     //监听请求事件，并对请求进行拦截。
//     page.on("request", interceptedRequest => { //监听请求
//         //通过url的parse对请求地址进行解析，
//         let urlObj = url.parse(interceptedRequest.url());
//         //解析出主机地址，进行判断
//         // if (urlObj.hostname == "googleads.g.doubleclick.net") {
//         //强力拦截谷歌请求
//         if (urlObj.hostname.indexOf("goole") != -1) {
//             //如果是谷歌的广告地址，则拒绝请求。因为谷歌的广告响应太慢
//             interceptedRequest.abort();
//         } else {
//             //否则，请求继续
//             interceptedRequest.continue();
//         };
//     });
//     page.goto(down_url);
//     await page.waitForSelector("#verifycode");
//     await page.waitForSelector("#verifybtn");
//     let input = await page.$("#verifycode");
//     await input.focus()
//     await page.keyboard.type("934811")
//     let btu = await page.$("#verifybtn")
//     await btu.click();
//     // await page.waitForSelector("body > section > div.content-wrap > div > article > div:nth-child(10) > div");
//     await page.waitForSelector("body > section > div.content-wrap > div > article > table > tbody > tr:nth-child(3) > td > a:nth-child(2)");
//     let Code = await page.$eval("body > section > div.content-wrap > div > article > div:nth-child(15) > div", ele => {
//         return ele.innerHTML;
//     });
//     let load_url = await page.$eval("body > section > div.content-wrap > div > article > table > tbody > tr:nth-child(3) > td > a:nth-child(3)", ele => {
//         return ele.href;
//     })
//     let code = Code.split("：")[2].trim();
//     await page.close();
//     // await Await(5000);
//     await browser.close();
//     console.log(code, load_url);
//     return code;
//     // console.log()
// };
// book_download("https://www.aibooks.cc/books/9384.html");
// parse_data("https://www.aibooks.cc")










//获取书的详情
async function book_data(data_url) {
    let res = await axios.get(data_url, options2);
    // let page_url = res.url;
    // console.log(page_url)
    let $ = cherrio.load(res.data);
    if (res.status != 200) {
        return;
    } else {
        let sort, book_Name, Author, source_address, download_url, Format, score, publishing_House, edition_year, tag, ISBN, prospectus, About_Author;
        sort = $("#mute-category>a").text().trim();
        book_Name = $(".bookinfo ul li:nth-child(1) strong").text().trim().split("名：")[1];
        Author = $(".bookinfo ul>li:nth-child(2)").text().trim().split("：")[1];
        Format = $(".bookinfo ul>li:nth-child(3)").text().trim().split("：")[1];
        score = $(".bookinfo ul>li:nth-child(4)").text().trim().split("：")[1];
        publishing_House = $(".bookinfo ul>li:nth-child(5)").text().trim().split("：")[1];
        edition_year = $(".bookinfo ul>li:nth-child(6)").text().trim().split("：")[1];
        tag = $(".bookinfo ul>li:nth-child(7) div.article-tags a").text();
        ISBN = $(".bookinfo ul>li:nth-child(8)").text().split("：")[1];
        prospectus = $("body > section > div.content-wrap > div > article").html().split("<h2>书籍下载</h2>")[0];
        About_Author = prospectus.split("<h2>作者简介</h2>")[1];
        download_url = $("body > section > div.content-wrap > div > article > table > tbody > tr:nth-child(3) > td > a:nth-child(3)").attr("href");
        source_address = data_url;
        let arr = [sort, book_Name, source_address, download_url, Author, Format, score, publishing_House, edition_year, tag, ISBN, prospectus, '<h2>作者简介</h2>' + About_Author];

        // console.log(arr);
        // console.log(sort, book_Name, Author, Format, score, publishing_House, edition_year, tag, ISBN, prospectus, About_Author);

        await SQL_data(arr);
        // return arr;
    }



}

// // mysql数据库
// let option = {
//     host: "localhost",
//     port: "3306",
//     user: "root",
//     password: "kang",
//     database: "book"
// }
// let con = mysql.createConnection(option)
// con.connect((err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("连接成功")
//     }
// });
var num = 1;
async function SQL_data(arrs) {
    // console.log(arrs);
    strSQL = "INSERT INTO book(sort, book_Name,source_address,download_url, Author, Format, score, publishing_House, edition_year, tag, ISBN, prospectus,About_Author) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    con.query(strSQL, arrs, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log("数据写入成功" + num);

        }
    });
    num++;
}

// parseList_book_url(http_URL)