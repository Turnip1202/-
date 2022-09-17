const axios = require("axios");
let httpUrl = "https://www.doutula.com/article/list/?page=1";
let options = {
    proxy: {
        host: '163.125.16.224',
        port: 8888,

    }
}
axios.get(httpUrl, options).then((res) => {
    console.log(res.data)
})