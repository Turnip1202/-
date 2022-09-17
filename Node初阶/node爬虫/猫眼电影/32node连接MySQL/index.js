// 引入第三方mysql包
let mysql = require('mysql');

/*
  创建配置对象
  host 域名
  port 端口号
  user 用户
  password 密码
  database 数据库名
*/
let options = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'mall'
}

// 创建与数据库连接的对象
let con = mysql.createConnection(options);

// 开始连接
con.connect((err)=>{
  // 如果链接失败,输出报错信息
  if(err){
    console.log(err);
  }else{
    console.log('数据库连接成功');
  }
});

// 执行数据库的语句
// 1 .执行查询语句   database: 'shop'前提下查询shop内表
let strSql = 'select * from user';
/*
  err 报错信息
  result 结果
  fields 字段信息
  如果无法找到数据,将Navicat里的数据库关闭连接再重新打开
*/
// con.query(strSql,(err,result,fields)=>{
//   console.log(err);
//   console.log(result);
//   // console.log(fields); // 因为这个字段太长了暂时注释
// });

// 2.删除表操作 OKPacket:删除成功 user表名   database: 'shop'前提下删除shop内表
let strSql2 = 'drop table user';
// con.query(strSql2,(err,results)=>{
//   console.log(err);
//   console.log(results);
// })

// 3.删除库操作 shop库名   database: 'shop'前提下删除shop库
let strSql3 = 'drop database shop';
// con.query(strSql3,(err,results)=>{
//   console.log(err);
//   console.log(results);
// })

// 4.创建库操作 mall库名,创建库的之前需要把shop相关操作和database: 'shop'删掉; 创建库之后把shop转成mall
let strSql4 = 'create database mall';
// con.query(strSql4,(err,results)=>{
//   console.log(err);
//   console.log(results);
// })

// 5.创建表操作 database: 'mall'前提下创建一个user表 创建id username等键值,属性名不用反引号会出错
let strSql5 = 'CREATE TABLE `user` (`id`  int NOT NULL AUTO_INCREMENT ,`username` varchar(255) NULL ,`password` varchar(255) NULL ,`mail` varchar(255) NULL ,PRIMARY KEY (`id`));';
// con.query(strSql5,(err,results)=>{
//   console.log(err);
//   console.log(results);
// });

// 6.插入数据操作,插入进user表里面
let strSql6 = "insert into user(id,username,password,mail) values(1,'hzh','123456','1084350163@qq.com')";
// con.query(strSql6,(err,results)=>{
//   console.log(err);
//   console.log(results);
// });

// 7. ?占位符动态传递数据,按顺序插入, 因为我们AUTO_INCREMENT设置了id自动递增,id可以不写
let strSql7 = 'insert into user (username,password,mail) values(?,?,?)';
con.query(strSql7,['小红','123','123@qq.com'],(err,results)=>{
  console.log(err);
  console.log(results);
});