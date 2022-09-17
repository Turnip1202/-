// []代表元子表
// {}代表范围
// ()代表一组
// ^代表开头，$代表结尾
// w等价于[A-Za-z0-9_]，即字母数字下划线
// d是数字，s是空白。大写就是反向的
// .即包含除换行符意外的任意字符
//匹配模式：i不区分大小写，g匹配全局，m每一行单独处理
//+即1个或多个，*是0个或多个



let str = 'kang2020turnip20212022qiaomanqi';
// console.log([...str]);
// isNaN和Number.isNaN的区别在于，前者会试图类型转换(整体效果相当于==)，后者===
// [...str].filter(item => ((typeof Number(item)) === 'number' && !Number.isNaN(Number(item)))).map(item => console.log(item));
// 高阶函数查找
// [...str].filter(item => !Number.isNaN(parseInt(item))).map((item, index, arr) => {
//   if (index == 0) {
//     console.log(arr.join(''))
//   }
// });
// console.log(str.match(/\d/g).join(''))
let reg = /\d/g;
console.log(reg.lastIndex);
reg.exec(str)
console.log(reg.lastIndex);