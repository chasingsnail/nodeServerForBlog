const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { set, get } = require('./src/db/redis')

// session
const SESSION_DATA = {}

// 设置 cookie 过期时间（一天后）
const getCookieExpires = () => {
	let d = new Date()
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
	return d.toGMTString()
}

// 处理 post 传参
const getPostData = req => {
	return new Promise((resolve, reject) => {
		const method = req.method
		if (method === 'POST') {
			let postData = ''
			req.on('data', chunk => {
				postData += chunk
			})
			req.on('end', () => {
				if (!postData) {
					return resolve({})
				}
				return resolve(JSON.parse(postData))
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

	// 解析 query 参数
	req.query = querystring.parse(url.split('?')[1])

	// 解析 cookie
	req.cookie = {}
	const cookie = req.headers.cookie || ''
	cookie.split(';').forEach(item => {
		if (item) {
			const kv = item.split('=')
			req.cookie[kv[0].trim()] = kv[1].trim()
		}
	})

	// 解析 session
	let needSetCookie = false
	let userId = req.cookie.userid
	if (!userId) {
		needSetCookie = true
		userId = `${Date.now()}_${Math.random()}`
		// 初始化 redis
		set(userId, {})
	}
	req.sessionId = userId
	
	const session = await get(userId)
	if (session === null) {
		set(userId, {})
		req.session = {}
	} else {
		req.session = session
	}

	req.body = await getPostData(req)

	function checkUserId () {
		if (!needSetCookie) return 
		res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
	}

	const blogData = await handleBlogRouter(req, res)
	if (blogData) {
		checkUserId()
		res.end(JSON.stringify(blogData))
		return
	}
	const userData = await handleUserRouter(req, res)
	if (userData) {
		checkUserId()
		res.end(JSON.stringify(userData))
		return
	}
}

module.exports = serverHandler
