const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = req => {
	return new Promise((resolve, reject) => {
		const method = req.method
		if (method === 'POST') {
			let postData = ''
			req.on('data', chunk => {
				postData += chunk
			})
			req.on('end', () => {
				return resolve(
          JSON.parse(postData)
        )
			})
    } else {
      return resolve({})
    }    
	})
}

const serverHandler = async(req, res) => {
	res.setHeader('Content-type', 'application/json')

	const url = req.url
	req.path = url.split('?')[0]

  req.query = querystring.parse(url.split('?')[1])
  
  req.body = await getPostData(req)

	const blogData = handleBlogRouter(req, res)
	if (blogData) {
		res.end(JSON.stringify(blogData))
		return
	}
	const userData = handleUserRouter(req, res)
	if (userData) {
		res.end(JSON.stringify(userData))
		return
	}
}

module.exports = serverHandler
