const axios = require("axios");
const path = require("path");
const url = require("url")
const fs = require("fs");
// 商城分页
let baseURL = "http://152.136.185.210:7878/api/m5";
let home = '/home/data?type=sell&page=';

async function download(page) {
  let res = await axios.get(baseURL + home + page, {
    responseType: "stream"
  });
  return res;
}
let i = 1;
let clear = setInterval(async () => {
  let j = i;
  let res = await download(j);
  let stop = await axios.get(baseURL + home + j);
  if (!stop.data) {
    clearInterval(clear);
    console.log('已停止')
    return false;
  }
  // 我发现写入流貌似不会自己创建文件夹。 所以， 注意， 要先创建路径
  let ws = fs.createWriteStream("./home/" + j + 'home_' + 'page' + j + '.json'); //写入到对应文件
  await res.data.pipe(ws); //连通管道
  await res.data.on("close", function (err) { //监听close事件，即服务器请求数据完成，连接断开
    if (err) console.log(err)
    else {
      console.log(`第${j}页文件下载完成了一个`)
      ws.on("finish", function (err) {
        if (err) {
          console.log(err);
        } else {
          ws.close(); //关闭管道流
        }
      });
    };
  });
  i++;
}, 3000)