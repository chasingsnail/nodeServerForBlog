const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = async(data) => {
  const { username, password } = data
  const _username = escape(username)

  // 加密
  let _pwd = genPassword(password)
  _pwd = escape(_pwd)
  const sql = `select username, realname from users where username=${_username} and password=${_pwd}`
  const res = await exec(sql)
  return res[0] || {}
}

module.exports = {
  login
}