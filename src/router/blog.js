const { getList, getDetail, createNew } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method

  const query = req.query

  let postData = ''

  // 博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = query.author || ''
    const keyword = query.keyword || ''
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }

  // 博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const id = req.query.id
    const data = getDetail(id)
    return new SuccessModel(data)
  }
  
  // 新增博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', async() => {
      await createNew()
      res.end(JSON.stringify(new SuccessModel('新增成功')))
    }) 
  }
}

module.exports = handleBlogRouter