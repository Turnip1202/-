let mysql = require("mysql");
let options = {
    host: "localhost",
    port: "3306", //可选，默认3306
    user: "root",
    password: "kang",
    database: "DB_kang" //也可以直接使用语句使用数据库
};
//创建数据库的连接对象
let con = mysql.createConnection(options);
//建立链接
con.connect((err) => {
    //若连接失败，则会返回失败原因
    if (err) {
        console.log(err);
    } else {
        console.log("数据库连接成功");
    }
});
//执行数据库语句
//执行查询语句
let strSQL_show = "select * from user";
con.query(strSQL, (err, results, fileds) => {
    console.log(err);
    console.log(results);
    console.log(fileds);

});
//将执行语句封装成promise对象
function SQL_data(SQL) {
    return new Promise(function(resolve, reject) {
        con.query(SQL, (err, results, fileds) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }

        });

    })
};
//删除表
let strSQL_drop_table = "drop table user";
SQL_data(strSQL_drop_table);


//删除数据库
let strSQL_drop_database = "drop database DB_kang";
con.query(strSQL_drop_database, (err, results, fileds) => {
    console.log(err);
    console.log(results);
    console.log(fileds);
});
//创建数据库
let strSQL_create_database = "create database DB_kang"; //注意连接配置
con.query(strSQL_create_database, (err, results, fileds) => {
    console.log(err);
    console.log(results);
    console.log(fileds);
});
//创建数据表
let strSQL_create_table = " CREATE TABLE user(id int(11),name varchar(20))";
con.query(strSQL_create_table, (err, results, fileds) => {
    console.log(err);
    console.log(results);
    console.log(fileds);
});
//插入数据
let strSQL_insert_into = "insert into user values(?,?,?)";
con.query(strSQL_insert_into, [1, "萝卜"], (err, fileds) => {
    console.log(err);
    console.log(results);
    console.log(fileds);
});