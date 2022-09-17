// 2021/4/3;Turnip自制
//爬取html5资源分享网站的资源
// 目标网址:https://www.html5tricks.com/page/1

//引入模块，事先下载
const cheerio = require("cheerio");
const axios = require("axios");
const path = require("path");
const url = require("url")
const fs = require("fs");
var html5_Url = "https://www.html5tricks.com/page/1";

//获取要爬取的总页数
async function getAll_Page() {
    let res = await axios.get(html5_Url) //这只是单纯的获取页面对象，未做解析
    let $ = cheerio.load(res.data); //解析页面的数据，即整个页面标签的内容,否则则无法使用下面的text()方法
    let All_PAge = $("#nav-below .wp-pagenavi>span").text();
    let All_PAge_1 = All_PAge.slice(5, 8)
    console.log(All_PAge_1);
    return All_PAge_1;
}
getAll_Page();

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

//解析每个页面
async function parse_Page() {
    let All_page_2 = await getAll_Page(); //获取总数
    // console.log(All_page_2)
    for (var i = 52; i <= All_page_2; i++) { //循环调用下载函数
        html5_Url_2 = "https://www.html5tricks.com/page/" + i;
        //引入下载函数,和延迟函数，并对文件下载进行异步操作。每隔3秒执行一次
        await Await(10000); //延迟函数是异步函数，故不*i则还是同一时间执行，因此*了i
        try { //捕捉下载函数的错误
            downLoad(html5_Url_2, i); //执行下载函数
        } catch (error) {
            //输出错误信息
            console.log(error);
            //出现报错，则重试下载函数，并等待一下
            await downLoad(html5_Url_2, i);
        }

    }

}

// parse_Page()

// 获取下载链接
async function downLoad(downLoad_Url, number) {
    let res = await axios.get(downLoad_Url); //获取网页对象
    let $ = cheerio.load(res.data); //解析网页
    // console.log(res.data)
    //遍历当前页面的所有下载链接和对应名字

    //定义文件名和下载连接
    let arr_FileName = [];
    let arr_downLoad = [];
    $("#primary #content .download").each((i, element) => { //循环下载链接10个
        let down_load_url = $(element).attr("href"); //获取下载链接
        // console.log(down_load_url)
        arr_downLoad.push(down_load_url); //将下载链接追加到arr_downLoad数组

    });
    $("#primary #content .entry-title>a").each((i, element) => { //循环资源名称
        let title = $(element).text(); //获取资源名称
        // console.log(title)
        arr_FileName.push(title); //将资源名称追加到arr_FileName数组
    });
    for (var i = 0; i < arr_downLoad.length; i++) {
        let res = await axios.get(arr_downLoad[i], { responseType: "stream" }); //获取下载链接对象，并定义获取数据的方式位流
        //我发现写入流貌似不会自己创建文件夹。所以，注意，要先创建路径
        let ws = fs.createWriteStream("./html5/" + number + "页_" + arr_FileName[i] + ".rar"); //写入到对应文件
        await res.data.pipe(ws); //连通管道
        await res.data.on("close", function(err) { //监听close事件，即服务器请求数据完成，连接断开
            console.log(`第${number}页文件下载完成了一个`)
            ws.on("finish", function(err) {
                if (err) {
                    console.log(err);
                } else {
                    ws.close(); //关闭管道流
                }
            })
        });
        // console.log(arr_FileName[i], arr_downLoad[i])
    }




}
// downLoad("https://www.html5tricks.com/page/1");

//得到数据
async function get_Date() {
    let res = await axios.get(html5_Url)
    let $ = cheerio.load(res.data)
        // console.log(res.data)//测试是否能得到数据
    parse_Page()
}
//执行获取数据的函数
// get_Date(html5_Url)
get_Date()