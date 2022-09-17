//引入zlib模块，创建压缩对象，使用写入流创建压缩包。
//以.tar.gz为后缀的文件是一种压缩文件，在Linux和macOS下常见，Linux和macOS都可以直接解压使用这种压缩文件。

let fs = require("fs"); //引入fs模块
let zlib = require("zlib"); //引入zlib模块
let rs = fs.createReadStream("./turnip.txt"); //创建读取流
let zlib_s = zlib.createGzip(); //创建zlib压缩对象;
let Write_zlib = fs.createWriteStream("./turnip.tar.gz"); //创建写入流
//实现压缩逻辑
// rs.pipe(zlib_s).pipe(Write_zlib);//简写
let zlib_s_s = rs.pipe(zlib_s)
zlib_s_s.pipe(Write_zlib)