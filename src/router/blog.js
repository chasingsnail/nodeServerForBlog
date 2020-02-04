const {
	getList,
	getDetail,
	createBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = async(req, res) => {
  const method = req.method
  const id = req.query.id

	const query = req.query

	// 博客列表
	if (method === 'GET' && req.path === '/api/blog/list') {
		const author = query.author || ''
		const keyword = query.keyword || ''
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
		req.body.author = 'lisi'
		const data = await createBlog(req.body)
		return new SuccessModel(data, '新增成功')
  }
  
  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
		const flag = await updateBlog(id, req.body)
		return flag ? new SuccessModel('修改成功') : new ErrorModel('失败')
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
		const flag = await delBlog(id, 'lisi')
		return flag ? new SuccessModel('删除成功') : new ErrorModel('失败')
  }
}

module.exports = handleBlogRouter
