const serverHandler = (req, res) => {
  res.setHeader('Content-type', 'application/json')

  const mockData = {
    name: 'chasingsnail',
    site: 'github',
    env: process.env.NODE_ENV
  }


  res.end(
    JSON.stringify(mockData)
  )
}

module.exports = serverHandler