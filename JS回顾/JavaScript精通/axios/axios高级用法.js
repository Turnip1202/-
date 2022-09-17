const axios = require('axios');

// // 创建实例
// const axios1 = axios.create();
// // 并发
// axios.all(iterable)

axios({
  url: 'http://152.136.185.210:7878/api/m5'
}).then((data) => {
  console.log(data)

})