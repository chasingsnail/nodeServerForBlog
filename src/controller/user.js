const { exec } = require('../db/mysql')

const login = async(data) => {
  const { username, password } = data
  const sql = `select username, realname from users where username='${username}' and password='${password}'`
  const res = await exec(sql)
  return res[0] || {}
}

module.exports = {
  login
}