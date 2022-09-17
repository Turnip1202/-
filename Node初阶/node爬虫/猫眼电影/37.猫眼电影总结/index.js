let axios = require('axios');
let mysql = require('mysql');
let cheerio = require('cheerio');
let parseNum = require('./parseNum')
let fs = require('fs');

let options = {
  host: 'localhost',
  port: '3306',//可选 默认值3306
  user: 'root',
  password: '1234',
  database: 'book'
}

// axios请求头的配置信息
let options2 = {
  headers:{
    "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 SE 2.X MetaSr 1.0",
    "Cookie": "__mta=246848059.1608882973865.1610259391224.1610259412227.48; uuid_n_v=v1; uuid=A5C141C0468611EB8188BD955E1A95387E79DFC6A5874EB49A6AE15F5908C5A1; _lxsdk_cuid=17698e5e9bcc8-06df8daef3fd9a-66717e1d-1fa400-17698e5e9bdc8; _lxsdk=A5C141C0468611EB8188BD955E1A95387E79DFC6A5874EB49A6AE15F5908C5A1; _csrf=d7b40b7251dd50a44aef9168103e0ca738ef9d404bc0282fee0dd8b1b46f74df; Hm_lvt_703e94591e87be68cc8da0da7cbd0be2=1609408463,1609410103,1609410424,1610259362; _lx_utm=utm_source%3Dwww.sogou%26utm_medium%3Dorganic; __mta=246848059.1608882973865.1609411508918.1610259386248.45; Hm_lpvt_703e94591e87be68cc8da0da7cbd0be2=1610259412; _lxsdk_s=176eaeff2be-1aa-6de-ed5%7C%7C42",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "max-age=0",
    "Connection": "keep-alive",
    "Host": "maoyan.com",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "Referer": "https://maoyan.com/films?showType=3"
  },
  proxy: {
    // 封ip报错 The "url" argument must be of type string. Received undefined
    // 此时解决方案,DNS解析,然后用解析ip访问,或者可以通过资源监视器,但是切记不要打开群,会乱要等一会
    host: '120.53.133.61',
    port: 80
  }
}

// 创建与数据库连接的对象
let con = mysql.createConnection(options);

// 开始连接
con.connect((err)=>{
  // 如果链接失败,输出报错信息
  if(err){
    console.log(err);
  }else{
    console.log('数据库连接成功');
  }
});

let index = 0;
let k = 0;
let hrefList = [];
async function getPageList(index){
  let httpUrl = "https://maoyan.com/films?showType=3&offset="+index*30;
  let response = await axios.get(httpUrl,options2);
  // console.log(response.data);
  let $ = cheerio.load(response.data);

  $('.movie-list .movie-item > a').each(function(i,element){
    // console.log($(element).attr('href'));  // https://maoyan.com//films/1299955
    let href = "https://maoyan.com"+$(element).attr('href');
    hrefList.push(href);
  });
  getMovieInfo(hrefList[k]);
}

getPageList(index);

async function getMovieInfo(href){
  console.log(href);
  let response = await axios.get(href,options2);
  // console.log(response.data);
  let $ = cheerio.load(response.data);

  let moviename = $('.movie-brief-container > h1.name').text();
  let movieimg = $('.avatar-shadow > img.avatar').attr('src');
  let category = $('body > div.banner > div > div.celeInfo-right.clearfix > div.movie-brief-container > ul > li:nth-child(1)').text().replace(/\s/g,'');
  let areaTime = $('body > div.banner > div > div.celeInfo-right.clearfix > div.movie-brief-container > ul > li:nth-child(2)').text();
  let area = areaTime.split('/')[0].trim();
  if($('body > div.banner > div > div.celeInfo-right.clearfix > div.movie-brief-container > ul > li:nth-child(3)').text()){
    var pubtime = $('body > div.banner > div > div.celeInfo-right.clearfix > div.movie-brief-container > ul > li:nth-child(3)').text().substring(0,10);
  }else{
    var pubtime = 0;
  }
  // try catch兜住,当没有时长信息时显示为0
  try{
    var duration = parseInt(areaTime.split('/')[1].trim());
  }catch (error){
    var duration = 0;
  }
  // 下面是处理评分
  let score; // 评分
  let scorenum; // 评分数量
  let boxoffice;// 票房
  // 如果票房暂无,没有评分则3个值归0,并且写入数据库
  if($('.index-right .star-on').length == 0 || $('.movie-index-content .no-info').text() == '暂无'){
    score = 0;
    scorenum = 0;
    boxoffice = 0;
    // 电影简介
    if($('#app > div > div.main-content > div > div.tab-content-container > div.tab-desc.tab-content.active > div:nth-child(1) > div.mod-content > span').text()){
      var brief = $('#app > div > div.main-content > div > div.tab-content-container > div.tab-desc.tab-content.active > div:nth-child(1) > div.mod-content > span').text();
    }else{
      var brief = 'null';
    }
    // 导演
    let director = $('#app > div > div.main-content > div > div.tab-content-container > div.tab-desc.tab-content.active > div:nth-child(2) > div.mod-content > div > div:nth-child(1) > ul > li > div > a').text().trim();
    let arr = [moviename,movieimg,category,area,duration,pubtime,score,scorenum,boxoffice,brief,director];
    let strSql = 'insert into movie (moviename,movieimg,category,area,duration,pubtime,score,scorenum,boxoffice,brief,director) values(?,?,?,?,?,?,?,?,?,?,?)';
    await sqlQuery(strSql,arr);
    console.log(index,'页-',k,'电影信息已写入数据库:',moviename,href);
    // 当前数据自增,如果当前页面所有数据读取完,清空数组恢复默认值读取下一页,否则读取下一条数据
    k++;
    if(k==hrefList.length){
      hrefList = [];
      k = 0;

      index++;
      getPageList(index)
    }else{
      getMovieInfo(hrefList[k])
    }
  }else{
    // 如果评分不为0,则获取评分的数据
    score = $('.index-right .star-on').css('width').substring(0,2);
    // console.log(scorenum);

    let fontUrl = $('head > style').html();
    let reg = /format.*?url\('(.*?woff)'\)/igs;
    // console.log(fontUrl);
    let result = reg.exec(fontUrl);
    let fontPath = result[1];

    // 电影简介
    if($('#app > div > div.main-content > div > div.tab-content-container > div.tab-desc.tab-content.active > div:nth-child(1) > div.mod-content > span').text()){
      var brief = $('#app > div > div.main-content > div > div.tab-content-container > div.tab-desc.tab-content.active > div:nth-child(1) > div.mod-content > span').text();
    }else{
      var brief = 'null';
    }
    // 导演
    let director = $('#app > div > div.main-content > div > div.tab-content-container > div.tab-desc.tab-content.active > div:nth-child(2) > div.mod-content > div > div:nth-child(1) > ul > li > div > a').text().trim();
    
    axios.get('http:'+fontPath,{responseType:'stream'}).then(function(res){
      let ws = fs.createWriteStream('a.woff');
      res.data.pipe(ws);
      ws.on('close',()=>{
        console.log('字体文件写入');
        // 评分数量
        let aa = $('body > div.banner > div > div.celeInfo-right.clearfix > div.movie-stats-container > div:nth-child(1) > div > div > span > span').text();
        // console.log(aa);
        // console.log(hrefList);
        let arr1 = aa.split("");
        let b = 0;
        let arr11 = [];
        // 遍历评分里的字符串
        arr1.forEach(async (item,i)=>{
          // 调用比对字符串方法函数
          let result = await parseNum(item); 
          b++;
          // 对相似度进行比对,parseFloat小数点之前的字符串转换成数字
          arr11[i] = parseFloat(result.max) > 0.5? result.key : item;
          // 如果字符串比较完毕,开始处理比较后的字符串
          if(b == arr1.length){
            scorenum = arr11.join("");
            scorenum = parseChar(scorenum);
            // 如果评分非数值,评分为0
            scorenum = isNaN(scorenum) ? 0 : scorenum;
            // console.log(scorenum);
            // 票房
            let bb = $('body > div.banner > div > div.celeInfo-right.clearfix > div.movie-stats-container > div:nth-child(2) > div > span.stonefont').text();
            // console.log(bb);
            let arr2 = bb.split("");
            if(arr2.length == 0){
              arr2 = ["0"];
            }
            let arr22 = [];
            let a = 0;
            // 遍历所有的票房字符串,和上面的评分处理同理可得
            arr2.forEach(async (item,i)=>{
              let result = await parseNum(item);
              arr22[i] = parseFloat(result.max) > 0.5 ?  result.key : item;
              a++;
              if(a == arr2.length){
                boxoffice = arr22.join('') + $('body > div.banner > div > div.celeInfo-right.clearfix > div.movie-stats-container > div:nth-child(2) > div').text();
                boxoffice = parseChar(boxoffice);
                boxoffice = isNaN(boxoffice) ? 0 : boxoffice;
                // console.log(boxoffice);
                let arr = [moviename,movieimg,category,area,duration,pubtime,score,scorenum,boxoffice,brief,director];
                let strSql = 'insert into movie (moviename,movieimg,category,area,duration,pubtime,score,scorenum,boxoffice,brief,director) values(?,?,?,?,?,?,?,?,?,?,?)';
                await sqlQuery(strSql,arr);
                console.log(index,'页-',k,'电影信息已写入数据库:',moviename,href);
                k++;
                // 爬取完当前页爬取下一页
                if(k == hrefList.length){
                  hrefList = [];
                  k = 0;
                  console.log(index+'页-'+k+'数据已爬取完毕');
                  index++;
                  getPageList(index);

                }else{
                  getMovieInfo(hrefList[k]);
                }
              }
              // console.log(result);
            })
          }
        })
      })
    });
  }
  // console.log(moviename,movieimg,category,area,duration,pubtime,score,scorenum,boxoffice,director);
}

function parseChar(str){
  let unit = str[str.length-1];
  switch(unit){
    case '万':
      return parseFloat(str.substring(0,str.length-1))*10000;
    case '亿':
      return parseFloat(str.substring(0,str.length-1))*100000000;
    default:
      return parseFloat(str);
  }
}

// 封装一个查询的异步操作
function sqlQuery(strSql,arr){
  return new Promise(function(resolve,reject){
    con.query(strSql,arr,(err,results)=>{
      if(err){
        reject(err)
      }else{
        resolve(results)
      }
    })
  })
}