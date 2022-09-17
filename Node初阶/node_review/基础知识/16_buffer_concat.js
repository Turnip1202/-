//合并多个buffer数据

//创建Buffer对象
let bu1 = Buffer.from("你好,");
let bu2 = Buffer.from("世界！");
//合并Buffer对象
let bu3 = Buffer.concat([bu1, bu2]);
console.log(bu3, "\n", bu3.toString());