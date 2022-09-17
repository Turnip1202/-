let mysql = require("mysql");
let axios = require("axios");
let cheerio = require("cheerio");
let page = 1; //定义页码
let count = 1; //
let options = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "book"
};
let con = mysql.createConnection(options);
con.connect((err) => {
    //若连接失败，则会返回失败原因
    if (err) {
        console.log(err);
    } else {
        console.log("数据库连接成功");
    }
});
//获取第N个页面的所有书记
async function getPage_URL(num) {
    let httpURL = "https://sobooks.cc/page/" + num; //定义页数对应的URL地址
    let res = await axios.get(httpURL); //使用axios获取页面对象，其中data中存放着页面代码
    // console.log(res.data); //测试输出
    //each遍历所选中的对象
    $("#cardslist .card-item .thumb-img>a").each((i, ele) => { //each第一个是索引值，第二个是遍历对象
        let href = $(ele).attr("href"); //提取对象对应的属性
        // console.log(i); //输出拿到的书的序号
        // console.log(href); //输出对应的链接
        //根据地址访问书籍的详情页
    })
};

async function getBookInfo(href) {
    let res = await axios.get(href); //获取页面对象
    let $ = cheerio.load(res.data); //解析页面对象的data数据
    //获取书籍图片的链接
    let bookimg = $(".article-content .boookpic img").attr("src");
    //获取书籍名称的文本，这里需要先解析页面,才能使用text()方法
    let bookname = $(".article-content .bookinfo li:nth-child(1)").text();
    bookname = bookname.substring(3, bookname.length);
    //获取书籍作者
    let author = $(".article-content .bookinfo li:nth-child(2)").text();
    author = author.substring(3, author.length);
    //获取书籍浏览次数
    let viewcount = $(".article-content .bookinfo li:nth-child(3)").text();
    viewcount = viewcount.substring(3, viewcount.length - 1);
    //获取书籍标签
    let tag = $(".article-content .bookinfo li:nth-child(4)").text();
    tag = tag.substring(3, tag.length);
    //获取书籍时间
    let pubtime = $(".article-content .bookinfo li:nth-child(5)").text();
    pubtime = pubtime.substring(3, pubtime.length);
    //获取书籍评分
    let score = $(".article-content .bookinfo li:nth-child(6) b").attr("class"); //是字符串
    score = score[score.length - 1]; //我们只需要其中一个
    //获取书籍出版社
    let pubcompany = $(".article-content .bookinfo li:nth-child(8)").text(); //是字符串
    pubcompany = pubcompany.substring(3, pubcompany.length); //我们只需要其中一个
    // console.log(bookimg, bookname);
    let bookURL = href;
    let download = $("body>section>div.content-wrap>div>article>table>tbody>tr:nth-child(3)>td>a:nth-child(3)").attr("href").split("?url=")[1];
    let arr = [bookname, author, viewcount, tag, pubtime, score, pubcompany, bookURL, download];
    // console.log(arr)
    //插入数据库,这就是把变量和字段设置成一样的好处
    let strSQL = "insert into book(bookname, author, viewcount, tag, pubtime, score, pubcompany, bookURL, download) values(?,?,?,?,?,?,?,?,?)";
    //插入内容的时候，注意数据的长度
    con.query(strSQL, arr, (err, results) => {
        console.log(err, results);
    })

}
// getPage_URL(page);
// let tempBook = "https://sobooks.cc/books/14692.html"; //测试
// getBookInfo(tempBook); //测试