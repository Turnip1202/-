let str = '2276157075@qq.com';
let a = '@'
// console.log(`/${a}/`.test(str)); //TypeError。因为正则字面量正则需要运行
console.log(eval(`/${a}/`).test(str));

// w等价于[A-Za-z0-9_]
console.log(str.replace(/\w/g, search => {
  return 'turnip'
}))

// d是数字，s是空白。大写就是反向的
console.log(/\S/.test('\ntur nip '))

// []代表逐个匹配
// {}代表范围
// ()代表一组