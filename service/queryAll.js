var queryAll = app.post('/queryAll', function(req, res) {
    queryDb(UserSQL.queryALl, function(err, rows) {
        if (err) {
            res.send({
                code: 500,
                msg: 'error'
            })
        } else {
            console.log(rows)
            res.send({
                code: 200,
                msg: 'success'
            })
        }
    })
})
module.exports = queryAll