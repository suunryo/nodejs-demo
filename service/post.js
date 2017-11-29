let express = require('express');
var mysql = require('mysql')
var dbConfig = require('../db/DBconfig.js'); //数据库配置
var UserSQL = require('../db/usersql.js') // SQL语句
let router = express.Router();
var connection = mysql.createConnection(dbConfig.mysql) // 建立连接池
connection.connect()

router.post('/queryAll', function(req, res) {
    let number = req.body.pageNumber;
    let size = req.body.pageSize;
    connection.query(UserSQL.queryAll, [(number - 1) * size, number * size], function(err, rows, fields) {
        if (err) {
            res.send({
                code: 500,
                msg: 'error'
            })
        } else {
            res.send({
                code: 200,
                msg: 'success',
                result: rows
            })
        }
    })
})

// 新增
router.post('/add', function(req, res) {
    connection.query(UserSQL.insert, [req.body.name, req.body.age, req.body.gender], function(err, rows) {
        if (err) {
            res.send({
                code: 500,
                msg: 'error'
            })
        } else {
            res.send({
                code: 200,
                msg: 'success',
                result: rows
            })
        }
    })
})

// 删除
router.post('/delById', function(req, res) {
    connection.query(UserSQL.deleteUserById, [req.body.id], function(err, rows, fields) {
        if (err) {
            res.send({
                code: 500,
                msg: 'error'
            })
        } else {
            res.send({
                code: 200,
                msg: 'success'
            })
        }
    })
})

// 修改
router.post('/updateAge', function(req, res) {
    connection.query(UserSQL.updateAge, [req.body.id], function(err, rows, fields) {
        if (err) {
            res.send({
                code: 500,
                msg: 'error'
            })
        } else {
            res.send({
                code: 200,
                msg: 'success'
            })
        }
    })
})

module.exports = router