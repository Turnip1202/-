//将延迟函数封装成promise对象

function Await(milliSecondes) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("延迟函数执行成功,延迟了" + milliSecondes + "毫秒")
        }, milliSecondes)
    })
}