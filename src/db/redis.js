const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
	console.log('redis error: ', err)
})

const set = (key, value) => {
	redisClient.set(key, JSON.stringify(value), redis.print)
}

const get = key => {
	return new Promise((resolve, reject) => {
		redisClient.get(key, (err, result) => {
			if (err) {
				return reject(err)
			}
			if (result === null) {
				return resolve(null)
			}
			try {
				resolve(JSON.parse(result))
			} catch (error) {
				resolve(result)
			}
		})
	})
}

module.exports = {
	set,
	get
}
