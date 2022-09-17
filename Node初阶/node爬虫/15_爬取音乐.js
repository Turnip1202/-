//AJAX请求数据的获取案例


const axios = require("axios");
const fs = require("fs");
//目标：下载音乐
// 1.获取音乐的相关信息，从而获取下载地址
// 2.通过音乐列表获取大量的音乐信息
// 3.通过音乐分类获取音乐列表

//获取各页面的数据
async function getPage(num) {
    let httpUrl = "http://www.app-echo.com/api/recommend/sound-day?page=" + num;
    let res = await axios.get(httpUrl)
        // console.log(res.data.list)
    res.data.list.forEach((item, i) => {
        let sound_Name = item.sound.name;
        let sound_Url = item.sound.source;
        // console.log(sound_Name, sound_Url)
        download(sound_Name, sound_Url)

    });

}
getPage(1);

async function download(sound_Name, sound_Url) {
    let res = await axios.get(sound_Url, { responseType: "stream" })
    let ws = fs.createWriteStream("./mp3/" + sound_Name + ".mp3")
    res.data.pipe(ws);
    res.data.on("close", function(err) {
        ws.close();
    })



}