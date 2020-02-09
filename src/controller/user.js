const { exec, escape } = require('../db/mysql')

const login = async(data) => {
  const { username, password } = data
  const _username = escape(username)
  const _pwd = escape(password)
  const sql = `select username, realname from users where username=${_username} and password=${_pwd}`
  const res = await exec(sql)
  return res[0] || {}
}

module.exports = {
  login
}