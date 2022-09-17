let App = require("./22_路由原理");
let app = new App();
app.on("/", (req, res) => {
    res.setHeader("content-type", "text/html;charset=utf-8");
    res.end("首页");
});
app.on("/login", (req, res) => {
    res.setHeader("content-type", "text/html;charset=utf-8");
    res.end("登陆")
});
app.on("/movice", (req, res) => {
    let movies = [{
        name: "雪暴",
        brief: "电影《雪暴》讲述了在一座极北的边陲小镇，一伙穷凶极恶、作案手法老到的悍匪为抢夺黄金，打劫运金车，并借助大雪掩盖了所有犯罪痕迹。为了探求真相，警察王康浩暗地里搜集证据，熟悉地形，终于在一场灾难级的暴雪降临时，与谋财害命的悍匪发生了惊心动魄的正面对决……",
        author: "张震"
    }, {
        name: "少年的你",
        brief: "陈念（周冬雨 饰）是一名即将参加高考的高三学生，同校女生胡晓蝶（张艺凡 饰）的跳楼自杀让她的生活陷入了困顿之中。胡晓蝶死后，陈念遭到了以魏莱（周也 饰）为首的三人组的霸凌，魏莱虽然表面上看来是乖巧的优等生，实际上却心思毒辣，胡晓蝶的死和她有着千丝万缕的联系。",
        author: "周冬雨 "
    }];
    //根据模板渲染内容
    let index = req.pathObj.base; //base即目录后面的内容
    res.render(movies[index], './template/index.html');
})
app.run(800, () => {
    console.log("服务启动");
})