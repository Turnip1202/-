//__fileanem当前文件所在位置
//__dirname当前文件所在文件夹


//console.log(__filename)//当前文件路径
console.log(__dirname) //当前文件父级路径
    //console.log(global)//global是全局函数
    //process.stdout.write("kang\n")
process.stdout.write("123\n")
    ////process.stdout.write(123)//会报错，即仅可输入字符串
process.stderr.write("456\n") //变红
console.log(process.uptime()) //返回执行时长
console.log(process.version) //返回node的版本
console.log(process.platform) //运行程序所在的平台
console.log(process.execPath) //当前脚本的路径，即node.exe的路径
console.log(process.cwd()) //返回当前进程的工作目录，现在即js的路径的父级目录

function time() {

    console.log("3秒后")
}

var a = setTimeout(time, 3000)
clearTimeout(a)

var s = setInterval(time, 3000)
clearInterval(s)