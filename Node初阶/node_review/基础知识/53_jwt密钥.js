const jwt = require("jsonwebtoken");
let secret = "kang"; //密钥
let token = jwt.sign(
    //可放置的信息
    {
        user: "turnip",
        id: "123"
    },
    //密钥
    secret,
    // token时间
    {
        expiresIn: "1h"
    });
console.log(token);
let time = jwt.verify(token, secret); //解析token
console.log(time);
console.log(jwt)