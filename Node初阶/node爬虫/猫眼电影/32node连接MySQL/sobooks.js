let mysql = require('mysql');
let cheerio = require('cheerio');
let axios = require('axios');

// 获取初始页数
var num = 40;
// 获取数据读取次数
var  count = 0;

// 创建与book数据库的链接配置
let options = {
  hodt: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'book'
}

function lcWait(milliSecondes){
  // 返回一个异步函数
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve('成功执行函数,延迟:'+milliSecondes)
    },milliSecondes)
  });
}

// 创建与数据库连接的对象
let con = mysql.createConnection(options);

// 开始连接,如果没有报错就不需要写错误回调函数了
con.connect();

// 获取第N个页面所有书籍的链接
async function getPageUrl(){
  num++;
  let httpUrl = 'https://www.sobooks.cc/page/'+num;
  let res = await axios.get(httpUrl);

  // 设置为jQuery查找的cheerio模块
  let $ = cheerio.load(res.data);
  $('#cardslist .card-item .thumb-img > a').each((i,ele)=>{
    let href = $(ele).attr('href');
    lcWait(500);
    // 遍历到每一页的所有a链接详情页,然后传值给详情页处理函数
    getBookInfo(href,num);
    // console.log(href);
  });
}


async function getBookInfo(href,num){
  // href是每一个详情页
  await axios.get(href);
  // 过验证码,验证码要去微信中拿
  let res = await axios.post(href,'e_secret_key=885570');
  // 通过jQuery去获取到页面中的数据,会css选择器就行了
  let $ = cheerio.load(res.data);

  // 书籍名称
  let bookname = $('.book-left .bookinfo li:nth-child(1)').text();
  bookname = bookname.slice(3);
  // 书籍作者
  let author = $('.book-left .bookinfo li:nth-child(2)').text();
  author = author.slice(3);
  // 拿到格式
  let format = $('.book-left .bookinfo li:nth-child(3)').text();
  format = format.slice(3);
  // 拿到标签
  let tag = $('.book-left .bookinfo li:nth-child(4)').text();
  tag = tag.slice(3);
  // 拿到时间
  let pubtime = $('.book-left .bookinfo li:nth-child(5)').text();
  pubtime = pubtime.slice(3);
  // 拿到评分
  let score = $('body > section > div.content-wrap > div > article > div.book-info > div.book-left > div > div.bookinfo > ul > li:nth-child(6) > b').attr('class');
  score = score[score.length-1];
  // 拿到出版社
  let publisher = '暂无';
  // 获取图片路径,会css选择器就行了,简单一批,选择器可以手写也可以直接右键copy selector
  let bookimg = $('.book-left .bookpic img').attr('src');
  // 拿到分类
  let cataory = $('#mute-category > a').text().trim();
  // 拿到详细信息的布局
  let brief = $('.article-header').html()+$('.article-content').html()+$('.article-footer').html();
  // 获取当前页面的链接
  let bookUrl = href;
  /*
    获取书的下载链接
    let http = https://www.aibooks.cc/go.html?url=http://tesscn.aibooks.cc/dir/938796-39450300-f55b78
    比方说?url=后面的才是我们想要的真实地址   http.split('?url=')[1]; 就可以了,但是我们这里不用,只是
    说一下,老师的用,主要是学方法
  */
  try{
    var download = $('div.e-secret > b > a:nth-child(1)').attr('href').split('?url=')[1];
  }catch (err){
    var download = null;
  }
  // 数组存放这些变量,最后把这些变量传给数据库
  let arr = [bookname,author,format,tag,pubtime,score,publisher,bookimg,cataory,brief,bookUrl,download];


  // // 插入数据进数据库
  let strSql = 'insert into book (bookname,author,format,tag,pubtime,score,publisher,bookimg,cataory,brief,bookUrl,download) values(?,?,?,?,?,?,?,?,?,?,?,?)';
  con.query(strSql,arr,(err,results) => {
    if(err){
      count++;
      console.log('第'+num+'页,第'+ count +'条数据读取失败');
    }
    count++;
    console.log('当前第'+num+'页,已读取'+ count +'条数据');

    // 同步化axios的处理,当一个页面读取了24条数据以后再读取下一页
    if(count >= 32 && num < 304){
      count = 0;
      getPageUrl();
    }
  });

}

// getBookInfo('https://sobooks.cc/books/17574.html');


getPageUrl();

/*
  在传数据的时候,不要在Navicat里面刷新数据库,不然有可能导致爬取数据的中断
*/