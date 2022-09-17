const axios = require('axios');
// console.log(axios)
// 基本使用
// axios({
//   url: 'http://turnip.ren',
//   // get拼接
//   params: {
//     type: 'pop',
//     ID: 12345
//   }
// }).then(data => {
//   console.log(data)
// });
// axios({
//   url: 'http://turnip.ren',
//   method: 'post'
// }).then(data => {
//   console.log(data)
// });
// axios.get('http://turnip.ren').then(data => {
//   console.log(data)
// });
// axios.get('http://turnip.ren', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// axios.get('http://123.207.32.32:8000').then((data) => {
//   console.log(data)
// }).catch((err) => {
//   console.log(err)
// })