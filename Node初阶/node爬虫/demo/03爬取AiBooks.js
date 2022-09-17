//2021年4月15日13点45分
//目标网址首页https://www.aibooks.cc/
//目标第二页https://www.aibooks.cc/page/2
//规律 page页码递增
//初步分析页面没有特别的反爬措施，普通爬取即可

//开始引入模块
let axios = require("axios"); //用于请求服务器
const cheerio = require("cheerio");
let cherrio = require("cheerio"); //用于解析页面
let fs = require("fs"); //用于写入数据
let mysql = require("mysql"); //用于将爬取的数据插入数据库
let path = require("path"); //用于解析数据存放的路径
let url = require("url"); //用于解析网址
let puppeteer = require("puppeteer");


let aibook_url = "https://www.aibooks.cc/page/";
//配置请求头,防止检测
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
};

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

//是否继续解析
async function get_All_page(url) {
    let res = await axios.get(url, options); //请求服务器
    console.log(res.data)
    let $ = cherrio.load(res.data); //解析页面
    // let next = $(".pagination .next-page>a").text(); //当获取到下一页时，继续下一页
    // console.log(Boolean(next));
    // return next;
};
get_All_page(aibook_url + "1");

//获取每一页所有书籍的详情地址
async function main_get_page_details(url) {
    var all_page = get_All_page(url + "1"); //用是否中断循环
    let i = 1; //为了循环页数
    //遍历所有页，并获得所有页的书籍详情网址
    while (i) {
        let http_url = `${url}${i}`;
        console.log(http_url);
        try {
            await get_page_All_details_url(http_url, i); //等待对当前页面的解析
        } catch (error) {
            console.log(error);
            i++;
            var all_page = await get_All_page(http_url); //所有页面均解析完成后，将为null，则下一次不在进入while
            continue;
        }

        // await Await(500); //引入延迟函数,每解析完一个页面书籍的所有链接,延迟1秒
        // parse_page_All_details(http_url)
        i++;
        var all_page = await get_All_page(http_url); //所有页面均解析完成后，将为null，则下一次不在进入while
    }
    // console.log(arr);

}


//获取每一页的书籍详情地址,传入数组,这样可以一页一页的来
async function get_page_All_details_url(url, num) {
    let arr = []; //定义数组存放每一页书的详情地址#cardslist .card-item .thumb-img>a
    let res = await axios.get(url, options); //请求服务器
    let $ = cherrio.load(res.data); //解析页面
    $("#cardslist .card-item .thumb-img>a").each((i, element) => {
        let href = $(element).attr("href");
        arr.push(href);
    });
    // console.log(arr);
    try {
        await parse_page_All_details(arr, num);
    } catch (error) {
        return;
    }

}

//目的是等待详情页获取下载地址
async function parse_page_All_details(arr, num) {
    let arr_s = arr; //获取书籍详情页数组
    for (var i = 0; i < arr_s.length; i++) { //对数组进行循环
        try {
            await parse_page_download(arr_s[i], num); //将详情页地址传入
            // console.log(arr_s[i])
        } catch (error) {
            return;
        }


    }


}
//解析详情页,获取下载页面
async function parse_page_download(url, num) {
    //设置第二页的请求头,防止被发现
    let options2 = {
        Headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "Host": "www.aibooks.cc",
            "Referer": "https://www.aibooks.cc/",
            "TE": "Trailers",
            "Upgrade-Insecure-Requests": "1"
        }
    };
    let res = await axios.get(url, options2); //请求详情页
    let $ = cherrio.load(res.data);
    let title = $("h1.article-title a").html();
    let book_download = $("body > section > div.content-wrap > div > article > table > tbody > tr:nth-child(3) > td > a:nth-child(4)").attr("href");
    // console.log(book_download, title);
    await write_File(book_download, title, num);

}
// parse_page_download("https://www.aibooks.cc/books/9347.html");

function fs_WriteFile(path, content) {
    return new Promise(function(resolve, reject) {
        var fs = require("fs");
        fs.writeFile(path, content, { flag: "a", encoding: "utf-8" }, function(err) {
            if (err) {
                reject(err)
            } else {
                resolve(err)
            }
        })

    })
};


async function write_File(url, tit, num) {
    try {
        await fs_WriteFile(`./book/book.txt`, `0${num}${tit}:${url}\n`);
        console.log(`${num}页写入完成：${tit}`);
    } catch (error) {
        return;
    }

}



// main_get_page_details(aibook_url);


















// //页面是通过AJAX多次渲染来的，我目前没办法，只有启用puppeteer模块了
// //打开浏览器
// //设置浏览器的参数
// let debugOptions = {
//     //设置浏览器的宽和高
//     defaultViewprot: {
//         width: 1400,
//         height: 800
//     },
//     //设置是否有界面，true为无界面
//     headless: false,
//     //设置放慢操作浏览器的步骤
//     slowMo: 200
// };
// let options = { headless: true, slowMo: 200 };
// let browser = await puppeteer.launch(options);

// async function get_book_download_url(url) {
//     let page = await browser.newPage();
//     await page.goto(url);
//     await page.waitForSelector("#table_files > tbody > tr.odd", { visible: true });



//     //设置第二页的请求头,防止被发现
//     let options2 = {
//         Headers: {
//             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0",
//         }
//     };
//     let res = await axios.get(url, options2); //请求详情页
//     console.log(res.data.aaData)

//     // let book_download_url = $(".even > td:nth-child(2) > a:nth-child(2)").html();
//     // console.log(book_download_url);
//     // let down_load = path.join("http://tesscn.aibooks.cc/", book_download_url)
//     // console.log(down_load)

// }
// get_book_download_url("https://webapi.ctfile.com/api.php?item=file_act&action=file_list&folder_id=39515777&uid=938796&mb=0&display_subfolders=1&t=1618481159&k=c84cc07a9ad4336102da7132660c0fa9&sEcho=1&iColumns=4&sColumns=%2C%2C%2C&iDisplayStart=0&iDisplayLength=10&mDataProp_0=0&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=false&mDataProp_1=1&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&mDataProp_2=2&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=3&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&_=1618481161086");