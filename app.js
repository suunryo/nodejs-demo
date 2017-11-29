var express = require('express');
var bodyParser = require('body-parser')
var routes = require('./service/post.js') // 接口

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

// 查询所有
app.post('/queryAll', routes)

// 新增
app.post('/add', routes)

// 删除
app.post('/delById', routes)

// 修改
app.post('/updateAge', routes)