const env = process.env.NODE_ENV

const MYSQL_CONF_DEV = {
	host: 'localhost',
	user: 'chasingsnail',
	password: 'azure2576',
	port: '3306',
	database: 'myblog'
}

const MYSQL_CONF_PRD = {
	host: 'localhost',
	user: 'chasingsnail',
	password: 'azure2576',
	port: '3306',
	database: 'myblog'
}

const envConfMap = {
  dev: MYSQL_CONF_DEV,
  production: MYSQL_CONF_PRD
}

const MYSQL_CONF = envConfMap[env]

module.exports = {
  MYSQL_CONF
}
