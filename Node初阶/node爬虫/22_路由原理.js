let http = require("http");
let url = require("url");
let fs = require("fs");
let path = require("path");
class App {
    constructor() {
        this.server = http.createServer();
        this.reqEvent = {};
        this.server.on("request", (req, res) => {
            //解析路径
            let pathObj = path.parse(req.url);
            // pathObj = path.parse(pathObj.pathname);
            if (pathObj.dir in this.reqEvent) { //箭头函数内，故可以使用this
                res.render = render;
                res.setHeader("content-type", "text/html;charset=utf-8");
                req.pathObj = pathObj;
                this.reqEvent[pathObj.dir](req, res);
            } else if (pathObj.dir == "/static") {
                res.setHeader("content-type", this.getContentType(pathObj.ext));
                let rs = fs.createReadStream("./static/" + pathObj.base);
                rs.pipe(res);
            } else {
                res.setHeader("content-type", "text/html;charset=utf-8");
                res.end("<h1>404！页面找不到</h1>");
            }

        });
    }
    on(url, fn) {
        this.reqEvent[url] = fn;
    };
    run(port, callback) {
        this.server.listen(port, callback)
    }
    getContentType(extName) {
        switch (extName) {
            case ".jpg":
                return "image/jpeg";
            case ".html":
                return "text/html;charset=utf-8";
        }
    }

}
//定义模板函数，即渲染函数，匹配要替换的内容进行模板替换
function render(options, path) {
    fs.readFile(path, { encoding: "utf-8", flag: "r" }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            let reg = /\{\{(.*?)\}\}/igs
            let result;
            while (result = reg.exec(data)) {
                //去除2边的空白
                let strKey = result[1].trim();
                let strValue = options[strKey];
                data = data.replace(result[0], strValue);
            }​
            this.end(data); //返回到render
        }
    })
}
module.exports = App;