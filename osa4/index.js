// 31.07.2018

const http = require('http')
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
app.use('/api/blogs', blogsRouter)

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

morgan.token('payload', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :payload :status :response-time ms'))

const mongoose = require('mongoose')

const initiateConnection = () => {
	try {
		let url = undefined
		console.log('process.env.NODE_ENV', process.env.NODE_ENV)
		if ( process.env.NODE_ENV === 'production' ) {
			console.log('in production')
			require('dotenv').config()
			url = process.env.MONGODB_URI
			console.log('url', url)
			mongoose.connect(url)
		}
		else {
			// get the password
			console.log('somewhere else')
			console.log('getting password')
			let psw = ''
			fs = require('fs');
			fs.readFile('password.txt', 'utf8', function (err,data) {
				console.log('password getting',err, data)
				if (err) {
					return console.log(err);
				}
				url = `mongodb://admin:${data}@ds261521.mlab.com:61521/fs_blog_test`
				console.log('url', url)
				mongoose.connect(url)
			})
		}

	}
	catch (e) {
		console.log(e)
	}
}

initiateConnection()

app.use(cors())
app.use(bodyParser.json())

app.use(middleware.error)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})