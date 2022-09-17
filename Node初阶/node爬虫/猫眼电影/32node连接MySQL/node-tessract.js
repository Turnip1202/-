// npm install node-tesr@0.0.9
// npm install images@3.2.3

const tesseract = require('node-tesr');

// 或者如下也可以,注意这里的地址如果换成网址就无法识别,通过下载的npm包下至本地,然后进行处理
tesseract('./1.png', { l: 'eng' ,oem: 3, psm: 3 }, function(err, data) {
  // 此处获得识别内容
  console.log(data);
  if(err){
    throw Error(err);
  }
})

// let images = require('images');
// images(320, 46)
//   .fill(0xff, 0xff, 0xff, 1)
//   .draw(images('./123.jpg'), 10, 10)
//   .save('./456.jpg', {
//     quality: 100
//   });