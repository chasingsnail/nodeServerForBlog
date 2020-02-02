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
const createNew = data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000);
  })
}

module.exports = {
	getList,
  getDetail,
  createNew
}
