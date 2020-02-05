const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = async(req, res) => {
  const method = req.method

  if (method === 'GET' && req.path === '/api/user/login') {
    const res = await login(req.query)
    if (res.username) {
      req.session.username = res.username
      req.session.realname = res.realname
      set(req.sessionId, req.session)
      return new SuccessModel('登陆成功')
      
    }
    return new ErrorModel('登陆失败')
  }

  if (method === 'GET' && req.path === '/api/user/loginTest') {
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          session: req.session
        })
      )
    } else {
      return Promise.resolve(
        new ErrorModel('尚未登录')
      )
    }
  }
}

module.exports = handleUserRouter