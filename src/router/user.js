const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 设置 cookie 过期时间（一天后）
const getCookieExpires = () => {
  let d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

const handleUserRouter = async(req, res) => {
  const method = req.method

  if (method === 'POST' && req.path === '/api/user/login') {
    const flag = await login(req.body)
    console.log('flag', flag)
    if (flag) {

      // httpOnly 标识 server 端作出限制
      // expires 标识过期时间
      res.setHeader('Set-Cookie', `username=${req.body.username}; path=/; httpOnly; expires=${getCookieExpires()}`) 
      return new SuccessModel('登陆成功')
      
    }
    return new ErrorModel('登陆失败')
  }
}

module.exports = handleUserRouter