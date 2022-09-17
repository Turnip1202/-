// //开辟一个空的buffer（缓存区），性能相对较低
// let buf1 = Buffer.alloc(10);
// //直接开辟缓存区（不一定为空）,赋值的话，会覆盖。性能高
// let buf2 = Buffer.allocUnsafe(20);
// console.log(buf2.toString());


