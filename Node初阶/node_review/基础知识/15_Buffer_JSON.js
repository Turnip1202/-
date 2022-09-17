//Buffer转成JSON对象

let bu = Buffer.from("我爱吃萝卜");
//使用toJSON转换Buffer
var JSON = bu.toJSON();
console.log(JSON)