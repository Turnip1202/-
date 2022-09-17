module.exports = {
    sqlQuery: (strSQL, arr) => {
        return new Promise(function(resolve, reject) {
            // mysql数据库
            let SQL_option = {
                host: "localhost",
                port: "3306",
                user: "root",
                password: "kang",
                database: "db_turnip" //数据库
            };
            //创建连接池
            let SQL_pool = mysql.createPool(SQL_option);
            SQL_pool.getConnection((err, coon) => {
                if (err) {
                    reject(err)
                } else {
                    coon.query(strSQL, arr, (err, results) => {
                        if (err) {
                            reject(err)
                        } else {
                            coon.release();
                            resolve(results);
                        }
                    })

                }
            })


        })
    },
}