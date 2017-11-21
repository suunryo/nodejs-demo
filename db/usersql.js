var UserSQL = {
    insert: 'INSERT INTO personDb(name,age,gender) VALUES(?,?,?)',
    queryAll: 'SELECT * FROM personDb',
    getUserById: 'SELECT * FROM personDb WHERE id = ? ',
    deleteUserById: 'DELETE FROM personDb WHERE id = ? ',
    updateAge: 'UPDATE personDb SET age=age+1 WHERE id = ?'
}
module.exports = UserSQL;