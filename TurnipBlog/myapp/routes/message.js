const router = require('koa-router')();
const mysql = require("mysql");
const parser = require('ua-parser-js');

// mysql数据库
let SQL_option = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "kang",
    database: "db_turnip" //数据库
};
let SQL_pool = mysql.createPool(SQL_option);

function sqlQuery(strSQL, arr) {
    return new Promise(function (resolve, reject) {
        SQL_pool.getConnection((err, coon) => {
            if (err) {
                reject(err)
            } else {
                console.log('数据库连接成功')
                coon.query(strSQL, arr, async (err, results) => {
                    if (err) {
                        reject(err)
                    } else {
                        await coon.release();
                        resolve(results);
                    }
                })

            }
        })


    })
}

// let strSQL1 = `select t_name,t_text,t_date,t_writingPlatform from t_message order by t_id desc limit 0,3;`
// let result1 = await sqlQuery(strSQL1)
// let arr_message1 = [];
// result1.forEach((element, i) => {
//     // console.log(JSON.parse(JSON.stringify(element)))
//     arr_message1.push(JSON.parse(JSON.stringify(element)));
// });
router.get('/message', async (ctx, next) => {
    let strSQL = `select t_name,t_text,t_date,t_writingPlatform from t_message order by t_id desc;`
    let strSQL1 = `select t_name,t_text,t_date,t_writingPlatform from t_message order by t_id desc limit 0,3;`
    let results = await sqlQuery(strSQL)
    let result1 = await sqlQuery(strSQL1)
    if (results[0] && result1[0]) {
        let arr_message = [];
        results.forEach((element, i) => {
            // console.log(JSON.parse(JSON.stringify(element)))
            arr_message.push(JSON.parse(JSON.stringify(element)));
        });
        let arr_message1 = [];
        result1.forEach((element, i) => {
            // console.log(JSON.parse(JSON.stringify(element)))
            arr_message1.push(JSON.parse(JSON.stringify(element)));
        });

        console.log(arr_message)

        await ctx.render('T_message.hbs', { arr_message, arr_message1 });
    } else {
        await ctx.render('T_message.hbs')
    }

})
router.post('/message', async (ctx, next) => {
    let data = ctx.request.body;
    let SQLresult = {};
    //操作源信息
    let ua = ctx.headers['user-agent'];
    let ua_parser = new parser(ua);
    let t_browser = ua_parser.getBrowser().name; //浏览器
    let t_writingPlatform = ua_parser.getOS().name; //系统
    let t_name = data.name;
    let t_email = data.email;
    let t_text = data.text;
    let t_date = (new Date()).toLocaleString();
    console.log(t_name, t_email, t_text, t_date, t_browser, t_writingPlatform);
    let arr_item = [t_name, t_email, t_text, t_date, t_writingPlatform, t_browser]
    let str_SQL = `insert into 
t_message(t_name, t_email, t_text, t_date, t_writingPlatform, t_browser) 
values(?,?,?,?,?,?);`
    let SQL_data = await sqlQuery(str_SQL, arr_item);
    // console.log(SQL_data)
    if (SQL_data) {
        SQLresult.success = 200;
        ctx.body = SQLresult;
    }

})



module.exports = router