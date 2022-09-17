let url = require("url");
let request = require("request");
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
    console.log(result)
        //(.*?)代表所匹配数组的标号
    let regs = /<a href="javascript:void\(0\);" onclick="location\.href='(.*?)';return false;"(.*?)>(.*?)<\/a>/igs
    let arrClass = [];
    var res;
    while (res = regs.exec(result)) {
        if (res[3] != "全部") {
            // let obj = {
            //     className: res[3],
            //     url: res[1]
            // }
            // arrClass.push(obj)
            getMovies(res[1], res[3])
        }

    }
    console.log(arrClass)
}
async function getMovies(url, moviesType) {
    let { response, body } = await req(url)
    let reg = /<a class="pic-pack-outer" target="_blank" href="(.*?)".*?><img/igs;
    var res;
    var arrList = [];
    while (res = reg.exec(body)) {
        //可以改为迭代器
        arrList.push(res[1])
    }
    // console.log("分类", moviesType)
    // console.log(arrList)
}




getClassUrl();