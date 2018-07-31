const http = require('http')
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

morgan.token('payload', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :payload :status :response-time ms'))

const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = Blog

app.use(cors())
app.use(bodyParser.json())

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

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/blogs', (request, response) => {
  console.log('in get all')
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})