const router = require('koa-router')()
const mysql = require("mysql");
const axios = require('axios');
let fs = require("fs");
let path = require("path")

let index = 0;//渲染自定义首页
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

const parser = require('ua-parser-js');

router.get('/', async (ctx, next) => {

    let ua = ctx.headers['user-agent'];
    let ua_parser = new parser(ua);
    console.log('host' + ctx.hostname)

    let t_writingPlatform = ua_parser.getOS().name; //系统
    console.log(new Date().toLocaleString() + "\n" + ctx.ip.slice(7));
    if (index == 1) {
        await ctx.render('index_t.hbs');
    } else {

        //查询网站访问数
        SQL_pool.getConnection((err, coon) => {
            if (err) {
                console.log(err)
            } else {
                coon.query('select t_visit from t_superadmin', async (err, results) => {
                    if (err) {
                        console.log(err)
                    } else {
                        await coon.release();
                        // results = Number(results);
                        let count = Number(results[0].t_visit);
                        count++;
                        // 更新网站访问数
                        SQL_pool.getConnection((err, coon) => {
                            if (err) {
                                console.log(err)
                            } else {
                                coon.query('update t_superadmin set t_visit=? where t_id = 1;', count, async (err, results) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        await coon.release();
                                    }
                                })

                            }
                        });

                    }
                })

            }
        });
        let str_SQL = "select * from t_article order by t_id desc limit 0,2;";
        let str_SQL_slide = "select t_picture,t_headline,t_route from t_article where t_id in(1,2,3,4,5);";
        // 轮播图
        let slide_item = {};
        let data_slide = await sqlQuery(str_SQL_slide);
        data_slide.forEach((element, index) => {
            slide_item['slide' + index] = JSON.parse(JSON.stringify(element));
        });
        // console.log(slide_item);
        // 文章渲染
        let article_item = [];
        let data = await sqlQuery(str_SQL);
        // console.log(data[0]);
        //侧边留言
        let strSQL1 = `select t_name,t_text,t_date,t_writingPlatform from t_message order by t_id desc limit 0,3;`
        let result1 = await sqlQuery(strSQL1)
        let arr_message1 = [];

        if (data[0] || result1[0]) {
            data.forEach(element => {
                //先转换为对象字符串，在转换为对象
                article_item.push(JSON.parse(JSON.stringify(element)));
            });
            if (result1[0]) {
                result1.forEach((element, i) => {
                    // console.log(JSON.parse(JSON.stringify(element)))
                    arr_message1.push(JSON.parse(JSON.stringify(element)));
                });
            }

            // console.log(article_item)
            if (t_writingPlatform == "Windows") {
                await ctx.render('index.hbs', { article_item, slide_item, arr_message1 })
            } else {
                await ctx.render('index_m.hbs', { article_item, slide_item, arr_message1 })
            }
        } else {//基本多余，就是无数据的库的话会渲染这个
            await ctx.render('index.hbs')
        }
    }
});
router.get("/upfile", async (ctx, next) => {
    await ctx.render('upfile.hbs')

})


router.post("/file", async (ctx, next) => {
    console.log(ctx.request.body.name + " 上传");
    let root = path.join(__dirname)
    root = root.slice(0, root.length - 7) + "\\file"


    let upfile = [];
    function readDirSync(path) {
        var pa = fs.readdirSync(path);
        pa.forEach(function (ele, index) {
            var info = fs.statSync(path + "/" + ele)
            if (info.isDirectory()) {

                readDirSync(path + "/" + ele);
            } else {
                upfile.push(root + ele)
            }
        })
    }
    await readDirSync(root)

    // console.log(upfile)

    ctx.body = upfile;
})

//连续请求
router.post('/', async (ctx, next) => {
    let cookies = ctx.cookies.get('a_Count') || 1;
    console.log(cookies);
    let str_SQL = `select * from t_article order by t_id desc limit ${cookies},2;`;
    // 文章渲染
    let article = await sqlQuery(str_SQL)
    if (article[0]) {
        ctx.body = article;

    } else {
        ctx.body = 0;
    }

});
//友情链接
router.get('/friend', async (ctx, next) => {

    let strSQL = `select t_name,t_link,t_describe,t_default from t_friend;`
    let results = await sqlQuery(strSQL);
    let strSQL1 = `select t_name,t_text,t_date,t_writingPlatform from t_message order by t_id desc limit 0,3;`
    let result1 = await sqlQuery(strSQL1)
    let arr_message1 = [];

    if (results[0] && result1[0]) {
        let arr_friend = [];
        results.forEach((element, i) => {
            // console.log(JSON.parse(JSON.stringify(element)))
            arr_friend.push(JSON.parse(JSON.stringify(element)));
        });
        // console.log(arr_friend);
        result1.forEach((element, i) => {
            // console.log(JSON.parse(JSON.stringify(element)))
            arr_message1.push(JSON.parse(JSON.stringify(element)));
        });
        await ctx.render('T_friend.hbs', { arr_friend, arr_message1 });
    } else {
        await ctx.render('T_friend.hbs')
    }


});

router.post('/friend', async (ctx, next) => {
    let data = ctx.request.body;
    let res = await axios.get(data.link);
    let arr = [data.name, data.link, data.describe, data.headImg];
    if (res) {
        let strSQL = `insert into t_friend(t_name,t_link,t_describe,t_headImg) values(?,?,?,?);`
        let results = await sqlQuery(strSQL, arr);
        // console.log(results)
        if (results) {
            ctx.body = 1;
        } else {
            ctx.body = 0;
        }

    }
});


module.exports = router