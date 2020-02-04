const { exec } = require('../db/mysql')

const loginCheck = async(data) => {
  const { username, password } = data
  const sql = `select username, password from users where username='${username}' and password='${password}'`
  const res = await exec(sql)
  return !!res.length
}

module.exports = {
  loginCheck
}