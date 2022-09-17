let mysql = require('mysql');
let cheerio = require('cheerio');
let axios = require('axios');
// npm install iconv-lite@0.6.2
let iconv = require('iconv-lite');


// 创建与book数据库的链接配置
let options = {
  hodt: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'book'
}

let options2 = {
  responseType: 'stream'
}

// 创建与数据库连接的对象
let con = mysql.createConnection(options);

// 开始连接,如果没有报错就不需要写错误回调函数了
con.connect();

let chunks = [];
let count = 0;
// 获取所有句子
async function getSenTence(){
  let httpUrl = 'http://www.creditsailing.com/zuowensucai/935037.html';
  let res = await axios.get(httpUrl,options2);

  // 乱码追加到数组
  res.data.on('data', chunk =>{
    chunks.push(chunk);
  });

  // 通过第三方包将乱码数组转换成gbk
  res.data.on('end',()=>{
    let buffer = Buffer.concat(chunks);
    //通过iconv来进行转化。
    let str = iconv.decode(buffer,'gbk');
    // 设置为jQuery查找的cheerio模块
    let $ = cheerio.load(str);
    $('#con > p').each((i,item)=>{
      let sentence = $(item).text().split('、')[1];
      let strSql = 'insert into sentence (sentence) values(?)';
      con.query(strSql,sentence,(err,result)=>{
        if(err){
          console.log('插入数据失败');
        }else{
          count++;
          console.log('插入'+count+'条数据成功');
        }
      });
    });
  })
}

getSenTence()