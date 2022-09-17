function fs_ReadFile(path) {
    return new Promise(function(resolve, reject) {
        var fs = require("fs");
        fs.readFile(path, { flag: "r", encoding: "utf-8" }, (err, data1) => {
            if (err) {
                reject(err); //返回错误到promise
            } else {
                resolve(data1); //返回数据到promise
            }
        })
    })
}


function fs_WriteFile(path, content) {
    return new Promise(function(resolve, reject) {
        var fs = require("fs");
        fs.writeFile(path, content, { flag: "a", encoding: "utf-8" }, function(err) {
            if (err) {
                reject(err)
            } else {
                resolve(err)
            }
        })

    })
};

function fs_mkDir(path) {
    return new Promise(function(resolve, reject) {
        var fs = require("fs");
        fs.mkdir(path, function(err) {
            if (err) {
                reject(err)
            } else {
                resolve("目录创建成功")
            }

        })
    })
};

function fs_rename(oldPath, newPath) {
    return new Promise(function(resolve, reject) {
        var fs = require("fs");
        fs.rename(oldPath, newPath, (error) => {
            if (error) {
                resolve(error);
            } else {
                reject("rename success!");
            }
        })
    })

}

function fs_readir(path, options) {
    return new Promise(function(resolve, reject) {
        var fs = require("fs");
        fs.readdir(path, options, function(error, files) {
            if (error) {
                resolve(error);
            } else {
                reject(files);
            }
        })
    })
}

//将延迟函数封装成promise对象
function Await(milliSecondes) {
    return new Promise(function(resolve, reject) {
        var j = 1;
        setTimeout(function() {
            resolve("延迟函数执行成功,延迟了" + milliSecondes + "毫秒")
        }, milliSecondes * j);
        j++;
    })
}

function addLoadEvent(func) {
    let oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        oldonload();
        func();
    }
}

function sqlQuery(strSQL, arr) {
    return new Promise(function(resolve, reject) {
        con.query(strSQL, arr, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results);
            }
        })
    })
}



module.exports = { fs_ReadFile, fs_WriteFile, fs_mkDir, fs_rename, fs_readir, Await, addLoadEvent, sqlQuery }