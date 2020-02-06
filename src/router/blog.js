const {
	getList,
	getDetail,
	createBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 登录验证
const loginCheck = req => {
	if (!req.session.username) {
		return Promise.resolve(
			new ErrorModel('尚未登录')
		)
	}
}

const handleBlogRouter = async(req, res) => {
  const method = req.method
  const id = req.query.id

	const query = req.query

	// 博客列表
	if (method === 'GET' && req.path === '/api/blog/list') {
		let author = query.author || ''
		const keyword = query.keyword || ''
		if (query.isadmin === '1') {
			const loginResult = loginCheck(req)
			if (loginResult) {
				return loginResult
			}
			author = req.session.username
		}
		const data = await getList(author, keyword)
		return new SuccessModel(data)
	}

	// 博客详情
	if (method === 'GET' && req.path === '/api/blog/detail') {
		const data = await getDetail(id)
		return new SuccessModel(data)
	}

	// 新增博客
	if (method === 'POST' && req.path === '/api/blog/new') {
		const loginResult = loginCheck(req)
		if (loginResult) {
			return loginResult
		}
		req.body.author = req.session.username
		const data = await createBlog(req.body)
		return new SuccessModel(data, '新增成功')
  }
  
  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
		const loginResult = loginCheck(req)
		if (loginResult) {
			return loginResult
		}
		const flag = await updateBlog(id, req.body)
		return flag ? new SuccessModel('修改成功') : new ErrorModel('失败')
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
		const loginResult = loginCheck(req)
		if (loginResult) {
			return loginResult
		}
		const flag = await delBlog(id, req.session.username)
		return flag ? new SuccessModel('删除成功') : new ErrorModel('失败')
  }
}

module.exports = handleBlogRouter
