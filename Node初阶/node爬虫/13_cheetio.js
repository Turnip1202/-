const cheerio = require("cheerio");
const axios = require("axios");
const path = require("path");
const { fsReadFile, fsWriteFile, fsDir } = require("./04_RWD");
const url = require("url")
const fs = require("fs");
const request = require("request");
let httpUrl = "https://www.doutula.com/article/list/?page=1"
    //解析内容

async function getListPage(pageNum) {
    let httpUrl = "https://www.doutula.com/article/list/?page=" + pageNum;
    let res = await axios.get(httpUrl)
        // console.log(res.data); //解析页面内容
    let $ = cheerio.load(res.data);
    //获取当前页面的所有表情包的链接
    $("#home .col-sm-9>a").each((i, element) => {
        let aUrl = $(element).attr("href");
        let title = $(element).find(".random_title").text()
        let reg = /(.*?)\d/igs
        title = reg.exec(title)[1].toString()
        title = title.split("。")[0];
        title = title.split("？")[0];
        title = title.split("#")[0];
        title = title.split("[")[0];
        fs.mkdir("./img/" + title, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("创建成功")
            }
        });
        console.log(title);

        parsePage(aUrl, title)
    })
}
async function getNum() { //获取总数
    res = await axios.get(httpUrl);
    let $ = cheerio.load(res.data)
    let btulength = $(".pagination li").length;
    let allNum = $(".pagination li").eq(btulength - 2).find("a").text();
    return allNum;
}

async function spider() {
    //获取所有页面的总数
    let allPageNum = await getNum();
    for (let i = 1; i < allPageNum.length; i++) {
        getListPage(i)
    }
}


async function parsePage(url, title) {
    let res = await axios.get(url);

    $(".artile_des img").each((i, element) => {
        //获取表情包下的每个表情的链接
        let imgUrl = $(element).attr("src");
        //写入文件
        let extName = path.extname(imgUrl)
        let paths = `./img/${title}/${title}-${i}${extName}`;
        let ws = fs.createWriteStream(paths)
            // console.log(imgUrl);
        axios.get(imgUrl, { responseType: 'stream' }).then(function(res) {
            res.data.pipe(ws)
            console.log("图片加载完成：" + paths)
            res.data.on("close", function() {
                ws.close()
            })
        })
    })
}
setInterval(spider, 2000);