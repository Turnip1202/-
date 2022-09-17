// npm install opentype.js@1.3.3  一个解析字体文件的库
var opentype = require('opentype.js');

opentype.load('a.woff',function(err,font){
  if(err){
    alert('Font could not be loaded:' + err)
  }else{
    var path = font.getPath('',0,100,72);
    console.log(path.toSVG());
    // console.log(path);
    console.log("---------------------");
  }
})