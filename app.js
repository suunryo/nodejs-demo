var express = require('express');
var bodyParser = require('body-parser')
var mysql = require('mysql')
var dbConfig = require('./db/DBconfig.js'); //数据库配置
var UserSQL = require('./db/usersql.js') // SQL语句


var app = express();

app.get('/', function(req, res) {
    res.redirect('/index.html')
});

app.use(express.static('app')) // 管理app文件夹下静态文件
app.use(bodyParser.urlencoded({ extended: true })) // 解析表单提交
app.use(bodyParser.json()) // 解析json

var server = app.listen(8080, function() {
    // 监听3000接口
    console.log('test app listening at http://localhost:8080');
});

// 所有请求
app.use(function(req, res, next) {
    console.log('======request type:', req.method, '; request url:', req.url, '======');
    next();
});

// 处理/test的所有请求
app.use('/test', function(req, res, next) {
    console.log('request body:', req.body);
    next();
});

// 处理/test的post请求
app.post('/test', function(req, res, next) {
    var name = req.body.name;
    name = name + ' is sb'
    var result = {
        code: 200,
        msg: 'success',
        result: name
    };
    res.send(result);
});


var connection = mysql.createConnection(dbConfig.mysql) // 建立连接池
connection.connect()

// 查询所有
app.post('/queryAll', function(req, res) {
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
app.post('/add', function(req, res) {
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
app.post('/delById', function(req, res) {
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
app.post('/updateAge', function(req, res) {
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