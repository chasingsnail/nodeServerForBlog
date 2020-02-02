const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method


  if (method === 'POST' && req.path === '/api/user/login') {
    const flag = login(res.body)
    return flag ? new SuccessModel('登陆成功') : new ErrorModel('登陆失败')
  }
}

module.exports = handleUserRouter