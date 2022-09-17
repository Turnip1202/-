const router = require('koa-router')();
const mysql = require("mysql");
// 设置路由前缀，即输入/users后,路由渲染的是下面的/，users/bar渲染的是bar
router.prefix('/articlePage');
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
    return new Promise(function(resolve, reject) {

        SQL_pool.getConnection((err, coon) => {
            if (err) {
                reject(err)
            } else {
                coon.query(strSQL, arr, async(err, results) => {
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
let str_SQL = `select t_route from t_article;`


SQL_pool.getConnection((err, coon) => {
    if (err) {
        reject(err)
    } else {
        coon.query(str_SQL, async(err, results) => {
            if (err) {
                reject(err)
            } else {
                results.forEach(element => {
                    console.log('路由' + element.t_route + '渲染完成')
                    router.get(`/${element.t_route}`, async(ctx, next) => {
                        let str_SQL = `select t_content from t_article where t_route=?;;`
                        let result = await sqlQuery(str_SQL, element.t_route);
                        let article = result[0].t_content;
                        // console.log(article)
                        await ctx.render('T_article.hbs', {
                            article
                        })
                    })


                });
                await coon.release();

            }
        })

    }
})


// let str_SQL = `select count(*) from t_article;`
let count = null;
setTimeout(async() => {
    // let JSONtext = await sqlQuery(str_SQL);
    // let countstr = JSON.stringify(JSONtext[0]).toString()
    // count = countstr.slice(countstr.length - 2, countstr.length - 1);
    // let pageRoute = await sqlQuery(str_SQL);
    // pageRoute.forEach(element => {
    //     router.get(`/${element.t_route}`, async(ctx, next) => {
    //         let page = 1;
    //         let str_SQL = `select t_content from t_article where t_id=?;;`
    //         let result = await sqlQuery(str_SQL, page);
    //         let article = result[0].t_content;
    //         // console.log(article)
    //         await ctx.render('T_article.hbs', {
    //             article
    //         })
    //     })


    // });

})





router.get('/', async(ctx, next) => {
    let page = 1;
    let str_SQL = `select t_content from t_article where t_id=?;;`
    let result = await sqlQuery(str_SQL, page);
    let article = result[0].t_content;
    // console.log(article)
    await ctx.render('T_article.hbs', {
        article
    })
})




module.exports = router