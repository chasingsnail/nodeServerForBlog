const redis = require('redis')

const redisClient = redis.createClient(6379, '127.0.0.1')

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
