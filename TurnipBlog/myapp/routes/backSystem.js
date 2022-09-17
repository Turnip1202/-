const router = require('koa-router')();
const mysql = require("mysql");
const parser = require('ua-parser-js');
let fs = require("fs");
//open回调函数的参数fd是文件地址


let key = 'turnip';
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


// 设置路由前缀
router.prefix('/T_background');
//查看
router.post('/show', async (ctx, next) => { 
    let data = ctx.request.body.code;
    let str_SQL = `select t_id from t_article;`
    console.log(data)
    if (data) {
        let SQL_data = await sqlQuery(str_SQL);
    console.log(SQL_data)
        ctx.body = SQL_data;

    } else { 
        ctx.body = 0;

    }
})

//删除
router.post('/delete', async (ctx, next) => {
    let data = ctx.request.body;
    let row = data.val;//文章
    let pro = data.pro;//授权码
    let str_SQL = `delete from t_article where t_id=?;`
    console.log(data)

        //删除
    if (pro=='turnip') { 
        let SQL_data = await sqlQuery(str_SQL, row);
        console.log(SQL_data)
        if (SQL_data) { 

        }
        ctx.body = 1;

    }
    else { 
        ctx.body = 0;

    }
});
// 后台登陆
router.post('/', async (ctx, next) => {

    let data = ctx.request.body;
    // console.log(data)
    if (data.Code == key) {
        //设置cookies属性,maxAge多久后失效;signed是否加密
        ctx.cookies.set("code", data.Code);
        //给客户端页面响应内容
        // ctx.response.body = `当前cookies的name属性为：${cookies}`;
        //简写
        ctx.body = data.Code;
        //重定向:koa-router   区分koa-route的重定向爱ctx.response.redirect("/login");
        // ctx.redirect('/T_background/Editor');
        // 重定向貌似只能get

    } else {
        ctx.body = 0;
    }
})

// 后台登陆
router.get('/login', async (ctx, next) => {


})
router.post('/login', async (ctx, next) => {


});


// 编辑器
router.get('/Editor', async (ctx, next) => {


    // 获取cookies属性
    let cookies = ctx.cookies.get("code");
    // 没有cookie则不渲染
    if (cookies == key) {
        await ctx.render('Editor.hbs', {
            title: "渲染Turnip"
        })
    }


})

router.post('/article', async (ctx, next) => {
    let data = ctx.request.body;
    // console.log(data);
    let SQLresult = {};
    if (data.adminCode == key) {
        //reset
        fs.writeFile("./turnip.js", "萝卜", function (err) {
            if (err) console.log(err);
        });

        //操作源信息
        let ua = ctx.headers['user-agent'];
        let ua_parser = new parser(ua);
        let t_browser = ua_parser.getBrowser().name; //浏览器
        let t_writingPlatform = ua_parser.getOS().name; //系统
        //文章数据
        let regex = /\>(.*?)\</g;
        let t_picture = data.t_picture; //文章配图
        let t_tag = data.t_tag; //文章标签
        let t_content = data.t_content; //全部内容
        let t_headline = t_content.match(regex)[0].slice(1, t_content.match(regex)[0].length - 1); //文章标题
        // 文章字数
        // console.log(data.t_content.match(regex))
        let arr = [];
        for (let i = 0; i < t_content.match(regex).length; i++) {
            arr.push(t_content.match(regex)[i].slice(1, t_content.match(regex)[i].length - 1))
        }
        //文章主要内容
        // console.log(arr)
        let t_text = arr.join('').slice(t_headline.length)
        // console.log(t_text)
        let t_textNumber = arr.join("").length; //字数
        //文章路由
        let t_route = data.t_route;
        //时间
        let t_date = data.t_date;
        // console.log(data.t_date)
        let arr_item = [t_picture, t_headline, t_content, t_text, t_tag, t_route, t_date, t_textNumber, t_writingPlatform, t_browser]
        let str_SQL = `insert into 
    t_article(t_picture,t_headline,t_content,t_text,t_tag,t_route,t_date,t_textNumber,t_writingPlatform,t_browser) 
    values(?,?,?,?,?,?,?,?,?,?);`
        let SQL_data = await sqlQuery(str_SQL, arr_item);
        // console.log(SQL_data)
        if (SQL_data) {
            SQLresult.success = 200;
            ctx.body = SQLresult;
        }
    } else {
        SQLresult.err = '授权码错误'
        ctx.body = SQLresult
    }
});


// 后台系统
router.get('/System', async (ctx, next) => {

});
router.post('/System', async (ctx, next) => {

})




module.exports = router