let url = require("url");
const fs = require("fs");
const axios = require("axios");
let request = require("request");
let { fsReadFile, fsWriteFile, fsDir } = require("./04_RWD");
let httpurl = "https://www.1905.com/vod/list/n_1/o3p1.html"


function req(url) {
    return new Promise(function(resolve, reject) {
        request.get(url, function(err, response, body) {
            if (err) {
                reject(err)
            } else {
                resolve({ response, body })
            }
        })
    })
}

//获取起始页面的所有分类地址
async function getClassUrl() {
    let { response, body } = await req(httpurl)
    let reg = /<span class="search-index-L">类型(.*?)<div class="grid-12x">/igs;
    //解析html内容
    let result = reg.exec(body)[1];
    // console.log(result)
    //(.*?)代表所匹配数组的标号
    let regs = /<a href="javascript:void\(0\);" onclick="location\.href='(.*?)';return false;"(.*?)>(.*?)<\/a>/igs
    let arrClass = [];
    var res;
    //进一步解析网址
    while (res = regs.exec(result)) {
        if (res[3] != "全部") {
            // let obj = {
            //     className: res[3],
            //     url: res[1]
            // }
            // arrClass.push(obj)
            let { response, body } = await req(res[1])
            let reg_page = /<samp>...<\/samp><a href="(.*?)">(.*?)<\/a>/
            let regpage;
            if (regpage = reg_page.exec(body)) {
                console.log(regpage[2])
                for (var i = 1; i < regpage[2]; i++) {
                    if (res[1] != "https://www.1905.com/vod/list/n_1_t_17/o3p1.html") {
                        var res1 = res[1].split("p");
                        var res2 = `p${i}.html`
                        var res3 = res1[0] + "p".concat(res1[1], res2)
                            // console.log(res3)
                            // console.log(res[1])
                        getMovies(res3, res[3]);


                    }

                }

            }
            // console.log(res[1])
            // getMovies(res[1], res[3]);




        }

    }
    // console.log(arrClass)
}
async function getMovies(url, moviesType) {
    let { response, body } = await req(url)
    let reg = /<a class="pic-pack-outer" target="_blank" href="(.*?)".*?><img/igs;
    var res;
    var arrList = [];
    while (res = reg.exec(body)) {
        //可以改为迭代器
        arrList.push(res[1])
            // console.log(arrList.length)
    }
    // console.log("分类", moviesType)
    // await fsWriteFile("./kang1.html", moviesType + arrList.toString() + "\n");
    for (var i = 0; i < arrList.length; i++) {

        let paths = `./video/${i}.mp4`;
        let ws = fs.createWriteStream(paths)
        axios.get(arrList[i], { responseType: 'stream' }).then(function(res) {
            res.data.pipe(ws)
            console.log("视频下载完成：" + paths)
            res.data.on("close", function() {
                ws.close()
            })
        })

    }


    // console.log(arrList)
}




getClassUrl();