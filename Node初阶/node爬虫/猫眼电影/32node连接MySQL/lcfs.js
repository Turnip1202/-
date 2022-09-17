let fs = require('fs');

function fsRead(path) {
    //resolve成功结果   reject失败结果
    return new Promise(function (resolve, reject) {
        //异步写法           err失败结果 data成功结果
        //导入这个方法的时候记得把path改了
        fs.readFile(path, { flag: 'r', encoding: 'utf8' }, function (err, data) {
            //判断一下有没有错误
            if (err) {
                //错误时输出这个
                reject(err);
            } else {
                //没有错误时输出这个
                resolve(data)
            }
            //因为这里是异步操作先打印123
            console.log(456);
        });
    })
}

//promise   path是路径,content内容
function write(path,content){
    //返回一个promise 异步函数,resolve成功,reject失败
    return new Promise(function(resolve,reject){
        fs.writeFile(path,content,{flag:'a',encoding:"utf8"},(err)=>{
            //判断有没有出错
            if(err){
                //有错误的时候传错误err
                reject(err)
                //console.log("写入内容出错");
            }else{
                //没错误的时候传正确err
                resolve(err)
                //console.log("写入内容成功");
            }
        })
    })
}

//导出这两个模块,一个读取文件一个写入内容
module.exports = {fsRead,write};
