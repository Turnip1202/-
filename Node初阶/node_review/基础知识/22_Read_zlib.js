//使用fs流，及zlib模块读取gz压缩包,写入到文件
//以.tar.gz为后缀的文件是一种压缩文件，在Linux和macOS下常见，Linux和macOS都可以直接解压使用这种压缩文件。

let fs = require("fs"); //引入fs模块
let zlib = require("zlib"); //引入zlib模块
let rs = fs.createReadStream("./turnip.tar.gz"); //fs流 读取压缩包
let Write = fs.createWriteStream("./turnip.txt")
let zlib_s = zlib.createGzip(); //创建压缩包对象
let zlib_s_s = rs.pipe(zlib_s); //流入压缩包对象
zlib_s_s.pipe(Write); //将压缩包流入文件内.流入的是二进制数据。尝试使用toString()，也不行