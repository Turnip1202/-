//alloc定义Buffer长度

//定义一个25字节的Buffer
let bu = Buffer.alloc(25);
let str = "我爱吃萝卜";
// 向Buffer内写入内容
bu.write(str);
//将Buffer数据转换为字符串
let strs = bu.toString();
console.log(bu, "\n", strs);