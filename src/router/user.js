const handleUserRouter = (req, res) => {
  const method = req.method

  if (method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: 'login api'
    }
  }
}

module.exports = handleUserRouter