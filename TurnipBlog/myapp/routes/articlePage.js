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
                    }
                })

            }
        })


    })
}
let str_SQL = `select t_route from t_article;`

SQL_pool.getConnection((err, coon) => {
    if (err) {
        console.log(err)
    } else {
        coon.query(str_SQL, async (err, results) => {
            if (err) {
                console.log(err)
            } else {
                // console.log(results);
                if (results[0]) {
                    results.forEach(element => {
                        console.log('路由' + element.t_route + '渲染完成')
                        router.get(`${element.t_route}`, async (ctx, next) => {
                            //渲染留言
                            let strSQL1 = `select t_name,t_text,t_date,t_writingPlatform from t_message order by t_id desc limit 0,3;`
                            let result1 = await sqlQuery(strSQL1)
                            let arr_message1 = [];
                            if (result1[0]) {
                                result1.forEach((element, i) => {
                                    // console.log(JSON.parse(JSON.stringify(element)))
                                    arr_message1.push(JSON.parse(JSON.stringify(element)));
                                });
                            }
                            let str_SQL = `select t_id,t_content from t_article where t_route=?;;`
                            let result = await sqlQuery(str_SQL, element.t_route);
                            let article = result[0].t_content;
                            let page = result[0].t_id;
                            // console.log(article)
                            await ctx.render('T_article.hbs', {
                                article, arr_message1, page
                            })
                        })


                    });

                } else {
                    console.log('路由渲染失败，未查到数据')
                }

                await coon.release();

            }
        })

    }
})
router.post('/', async (ctx, next) => {
    //阅读阅读自增
    let data = ctx.request.body;
    console.log(new Date().toLocaleString() + '看了文章' + data.code);
    let str_SQL_s = 'select t_readNumber from t_article where t_id =? '
    let read_s_n = ((await sqlQuery(str_SQL_s, data.code))[0].t_readNumber);
    read_s_n++;
    // console.log(read_s_n)
    let str_SQL_up = 'update t_article set t_readNumber=? where t_id =?'
    let result = await sqlQuery(str_SQL_up, [read_s_n, data.code]);

    // console.log(result)
    ctx.body = {
        code: 1
    }
})


router.get('/', async (ctx, next) => {
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