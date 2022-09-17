//计时器

////法一:函数递归法 
//function T1(){
//function time(){
//console.clear();
//var date1=new Date();
//var s=date1.getSeconds();
//console.log(date1.toLocaleString())
//var t= setTimeout(time,1000);
////删除下段代码后，程序一旦运行，只能关闭HB才能停止
//if(s==30){
//	clearTimeout(t);//防止卡死,当时间的秒数到30时，会暂停，等待即可
//}
//
//}
//setTimeout(time,1000)}
//T1();
//法二：使用setInterval()连续执行时间函数
function T2() {
    function time2() {
        var date2 = new Date();
        console.clear();
        console.log(date2.toLocaleString())
        var s = date2.getSeconds();
        ////删除下段代码后，程序一旦运行，只能关闭HB才能停止
        if (s == 30) {
            clearInterval(t2); //防止卡死,当时间的秒数到30时，会暂停，等待即可
        }
    }
    var t2 = setInterval(time2, 1000)
}
T2();


//var date=new Date();
//var y=date.getFullYear();
//var m=pd(date.getMonth()+1);
//var d=pd(date.getDate());
//var h=pd(date.getHours());
//var f=pd(date.getMinutes());
//var s=pd(date.getSeconds());