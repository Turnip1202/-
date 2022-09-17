//使用toString将Buffer转换为字符串，Buffer本身是一个二进制数据，显示的时候以16进制显示

//创建Buffer对象
let bu = Buffer.from("我爱吃萝卜");
console.log(bu);
//toString转换Buffer数据，2和5是截取Buffer长度
let str = bu.toString("utf-8", 2, 5);
console.log(str);