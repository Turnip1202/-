const Koa = require('koa');
const app = new Koa();
let path = require("path")
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const index = require('./routes/index');
const backSystem = require('./routes/backSystem');
const articlePage = require('./routes/articlePage');
const about = require('./routes/about');
const message = require('./routes/message')
const cors = require("koa2-cors"); //处理跨域
const open = require('open');



app.use(cors({ //使用跨域中间件
    origin: "*",
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));


// error handler
onerror(app);

// middlewares
app.use(koaBody({
    // 如果不加multipart：true ctx.request.body会获取不到值
    multipart: true,
    formidable: {
        maxFileSize: 100 * 1024 * 1024,
        uploadDir: path.join(__dirname, './file'),
        keepExtensions: true,
        multiples: false
    }
}))
//加密cookie
// app.use(cookieParser("secret"));

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    map: { hbs: "handlebars" }
}))



// logger
app.use(async (ctx, next) => {

    const start = new Date()
    await next()
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(backSystem.routes(), backSystem.allowedMethods())
app.use(articlePage.routes(), articlePage.allowedMethods())
app.use(about.routes(), about.allowedMethods())
app.use(message.routes(), message.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});
app.listen(80, () => {
    console.log('启动成功')
    console.log('http://127.0.0.1:80/')

})

// module.exports = app