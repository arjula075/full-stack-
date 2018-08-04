const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const config = require('../utils/config')
const Blog = require('../models/blog')
const mongoose = require('mongoose')


// setting up test data
const initialBlogs = [
	{
		"title": "Ari's first blog",
		"Author": "Ari Lahti",
		"url": "https://jotain.jossain",
		"likes": 1
	},
	{
		"title": "And now to something completely different",
		"url": "https://muuta.muualla",
		"likes": 2,
	}
]

beforeAll(async () => {
	console.log('starting beforeAll', new Date())
	// empty database

	initiateConnection()

	await Blog.remove({})

	// add initial data
	const blogObjects = initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)

	// close connection after date has been inserted
	//mongoose.connection.close()
	console.log('ending beforeAll', new Date())

})

describe('blog API tests', () => {
	test('blogs are returned as json', async () => {
		console.log('starting', new Date())
	  const response = await api
	    .get('/api/blogs')
	    .expect(200)
	    .expect('Content-Type', /application\/json/)
		console.log('response body',response.body.length)

	})
	test('blogs contain correct number', async () => {
		console.log('starting', new Date())
		const response = await api
			.get('/api/blogs')

			expect(response.body.length).toBe(2)
	})
	test('blogs contain  correct title', async () => {
		console.log('starting', new Date())
		const response = await api
			.get('/api/blogs')

			const contents = response.body.map(r => r.title)
			expect(contents).toContainEqual('And now to something completely different')
	})
})

afterAll(() => {
	if (server) {
		server.close()
	}
})

const initiateConnection = () => {
	try {
		let url = undefined
		url = config.mongoUrl
		console.log('url', url)
		mongoose.connect(url)
	}
	catch (e) {
		console.log(e)
	}
}
