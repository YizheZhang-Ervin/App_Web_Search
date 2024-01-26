const mysql = require('mysql2');
let config = require("../config/app.json")
let connection = undefined

let openOfMysqlConnection = () => {
    connection = mysql.createConnection(config["mysql"])
    connection.connect((err) => {
        if (err) {
            throw err
        }
    })
}

let closeOfMysqlConnection = () => {
    connection.end((err) => {
        if (err) {
            console.log('关闭数据库连接失败！')
            throw err
        }
    })
    connection = undefined
}

// 如'SELECT * FROM `xxTable` WHERE `xxKey` = ?', ['xxVal']
let SearchOfMysql = (sqlStr, paramList) => {
    openOfMysqlConnection()
    connection.query(sqlStr, paramList, (error, results, fields) => {
        if (error) {
            console.log('[SELECT ERROR] - ', error.message);
            return;
        }
        return results ? JSON.parse(JSON.stringify(results)) : null;
    });
    closeOfMysqlConnection()
}

// 如'UPDATE xxTable SET xxKey = ? WHERE xxKey2 = ?'，['xxx', 'yyy', zzz]
let UpdateOfMysql = (sqlStr, paramList) => {
    openOfMysqlConnection()
    connection.query(sqlStr, paramList, (err, result) => {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }
        return result.affectedRows
    });
    closeOfMysqlConnection()
}

// 如'INSERT INTO xxTable(xxKey1, xxKey2) VALUES(?,?)'，['xxVal1', 'xxVal2']
let CreateOfMysql = (sqlStr, paramList) => {
    openOfMysqlConnection()
    connection.query(sqlStr, paramList, (err, result) => {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        return result
    });
    closeOfMysqlConnection()
}

// 如'DELETE FROM xxTable where xxKey=xxVal'
let DeleteOfMysql = (sqlStr) => {
    openOfMysqlConnection()
    connection.query(sqlStr, (err, result) => {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }
        return result.affectedRows
    });
    closeOfMysqlConnection()
}

let TransactionOfMysql = (sql1, param1, sql2, param2) => {
    openOfMysqlConnection()
    // 开启一个简单的事务
    connection.beginTransaction((err) => {
        if (err) { throw err; }
        connection.query(sql1, param1, (error, results, fields) => {
            if (error) {
                return connection.rollback(() => {
                    throw error;
                });
            }
            connection.query(sql2, param2, (error, results, fields) => {
                if (error) {
                    return connection.rollback(() => {
                        throw error;
                    });
                }
                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            throw err;
                        });
                    }
                    console.log('success!');
                });
            });
        });
    });
    closeOfMysqlConnection()
}

module.exports = {
    SearchOfMysql, UpdateOfMysql, CreateOfMysql, DeleteOfMysql, TransactionOfMysql
}