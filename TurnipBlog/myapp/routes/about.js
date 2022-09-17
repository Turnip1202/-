const router = require('koa-router')();
const mysql = require("mysql");
// mysql数据库
let SQL_option = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "kang",
    database: "db_turnip" //数据库
};
//创建连接池
let SQL_pool = mysql.createPool(SQL_option);

function sqlQuery(strSQL, arr) {
    return new Promise(function (resolve, reject) {

        SQL_pool.getConnection((err, coon) => {
            if (err) {
                reject(err)
            } else {
                coon.query(strSQL, arr, async (err, results) => {
                    if (err) {
                        reject(err)
                    } else {
                        await coon.release();
                        resolve(results);
                        console.log(new Date().toLocaleString() + "\t" + '数据库操作成功')
                    }
                })

            }
        })


    })
}


router.get('/about_me', async (ctx, next) => {
    let strSQL1 = `select t_name,t_text,t_date,t_writingPlatform from t_message order by t_id desc limit 0,3;`
    let result1 = await sqlQuery(strSQL1)
    let arr_message1 = [];

    if (result1[0]) {
        result1.forEach((element, i) => {
            // console.log(JSON.parse(JSON.stringify(element)))
            arr_message1.push(JSON.parse(JSON.stringify(element)));
        });
        await ctx.render('T_about_me.hbs', { arr_message1 })

    } else {
        await ctx.render('T_about_me.hbs')

    }
})
router.get('/about_net', async (ctx, next) => {
    let strSQL1 = `select t_name,t_text,t_date,t_writingPlatform from t_message order by t_id desc limit 0,3;`
    let result1 = await sqlQuery(strSQL1)
    let arr_message1 = [];

    if (result1[0]) {
        result1.forEach((element, i) => {
            // console.log(JSON.parse(JSON.stringify(element)))
            arr_message1.push(JSON.parse(JSON.stringify(element)));
        });
        await ctx.render('T_about_net.hbs', { arr_message1 })

    } else {
        await ctx.render('T_about_net.hbs')

    }
})


module.exports = router