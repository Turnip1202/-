

function fsReadFile(path) {
    return new Promise(function(resolve, reject){ //返回Promise对象
	let fs = require("fs");

        fs.readFile(path, { flag: "r", encoding: "utf-8" }, (err, data1) => {
            if (err) {
                reject(err); //返回错误到promise
            } else {
                resolve(data1); //返回数据到promise
            }
        })
    })
}

//module.exports={fsReadFile};

//let pro = fsReadFile("01_promise.js"); //接收promise对象
//pro.then(function(data2) { //data1会传入data2
//console.log(data2)
//}).catch(function onRejected(error) {
//console.log(error); //上面的err会传进来
//})
//
// async function Readlist() {
//   var file1 = await fsReadFile("turnip.txt");
//   var file2 = await fsReadFile(`${file1}.txt`)
//   var file3 = await fsReadFile(`${file2}.txt`)
//   console.log(file3)
// }
// Readlist();