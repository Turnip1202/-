//定义缓动动画函数
function Animate(obj, target, cb) {
    //先清除以前的定时器执行，多次调用时，会有函数队列阻塞
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        let step;
        //对步长进行取整,分正负
        // 一般是除以10
        step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 如果到达指定位置,停止定时器
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 之后执行回调函数,有则
            cb && cb(); //存在则调用
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}