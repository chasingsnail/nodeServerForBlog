const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')
const readStream = fs.createReadStream(fileName)

const rl = readline.createInterface({
	input: readStream
})

let chromeNum = 0
let sum = 0

rl.on('line', data => {
	if (!data) {
		return
	}
	sum++
	const itemArr = data.split(' - ')
	if (itemArr[2] && itemArr[2].includes('Chrome')) {
		chromeNum++
	}
})

rl.on('close', () => {
	console.log('readline end, Chrome rate is', chromeNum / sum)
})
