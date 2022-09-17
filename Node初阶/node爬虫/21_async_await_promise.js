//promise aysnc await proxy Iteratror
class LcPromise {
    constructor(fn) {

        //将成功的事件函数集成在successList数组里
        this.successList = [];
        //这里将所有的失败函数集成到failList里
        this.failList = [];
        //pending,fullfilled,rejected
        this.state = "pending";
        //传入的函数对象,(异步操作的函数内容)
        fn(this.resolveFn.bind(this), this.rejectFn.bind(this));
    }
    then(successFn, failFn) {
        if (typeof successFn == 'function') {
            this.successList.push(successFn)
        }
        if (typeof failFn == 'function') {
            this.failList.push(failFn)
        }
    }
    catch (failFn) {
        if (typeof failFn == 'function') {
            this.failList.push(failFn)
        }
    }
    resolveFn(res) {
        this.state = "fullfilled"
        this.successList.forEach(function(item, index) {
            //将成功的事件循环调用
            item(res)
        })
    }
    rejectFn(res) {
        this.state = 'rejected'
            //注册到的失败所有事件进行调用
        this.failList.forEach(function(item, index) {
            item(res)
        })

        throw Error(res);
    }

};
var fu = function(resolve, reject) {
    setTimeout(function() {
        if (false) {
            resolve("promise成功");
        } else {
            reject("失败");
        }
    }, 1000)
};
var p1 = new LcPromise(fn)​
p1.then(function(res) {
    // document.body.style.background = "greenyellow";
    console.log("这是成功做的事情");
    console.log(res);
})​
p1.catch(function(res) {
    // document.body.style.background = "pink";
    console.log("这是失败做的事情");
    console.log(res);
});