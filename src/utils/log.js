const fs = require('fs')
const path = require('path')

// 创建 write stream
const createWriteStream = fileName => {
  const fullName = path.join(__dirname, '../', '../', 'logs/', fileName)
  return fs.createWriteStream(fullName, {
    flags: 'a'
  })
}

// 写入 log
const writeLog = (stream, log) => {
  stream.write(log + '\n')
}

const accessStream = createWriteStream('access.log')
const access = log => {
  writeLog(accessStream, log)
}

module.exports = {
  access
}