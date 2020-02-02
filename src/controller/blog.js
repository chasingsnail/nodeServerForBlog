// 博客列表
const getList = (author, keyword) => {
	return [
		{
			id: 1,
			title: 'title1',
			content: 'content1',
			createTime: 1232434,
			author: 'zhangsan'
		},
		{
			id: 2,
			title: 'title2',
			content: 'content2',
			createTime: 121312,
			author: 'lisi'
		}
	]
}

// 博客详情
const getDetail = id => {
	return {
		id: 1,
		title: 'title1',
		content: 'content1',
		createTime: 1232434,
		author: 'zhangsan'
	}
}

// 新增博客
const createBlog = blogData => {
  return {
    id: 2
  }
}

// 更新博客
const updateBlog = (id, blogData) => {
  return true
}

// 删除博客
const delBlog = id => {
  return true
}

module.exports = {
	getList,
  getDetail,
  createBlog,
  updateBlog,
  delBlog
}
