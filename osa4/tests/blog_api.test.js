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
		"author": "Ari Lahti",
		"url": "https://jotain.jossain",
		"likes": 1
	},
	{
		"title": "And now to something completely different",
		"author": "John Cleese",
		"url": "https://muuta.muualla",
		"likes": 2,
	}
]

const addedBlog =
	{
		"title": "This is getting way too silly",
		"author": "Terry Gilliam",
		"url": "https://jotain.jossain",
		"likes": 1
	}

	const noLikes =
		{
			"title": "This is an ex-parrot",
			"author": "Graham Chapman",
			"url": "https://jotain.jossain"
		}


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
	describe('get part of API', () => {
		test('blogs are returned as json', async () => {
	  	const response = await api
	    	.get('/api/blogs')
	    	.expect(200)
	    	.expect('Content-Type', /application\/json/)

			})

			test('blogs contain correct number', async () => {
				const response = await api
				.get('/api/blogs')

				expect(response.body.length).toBe(2)
			})

			test('blogs contain  correct title', async () => {
				const response = await api
				.get('/api/blogs')

				const contents = response.body.map(r => r.title)
				expect(contents).toContainEqual('And now to something completely different')
			})

			test('blogs contain  correct author', async () => {
				const response = await api
							.get('/api/blogs')

				const contents = response.body.map(r => r.author)
				expect(contents).toContainEqual('John Cleese')
			})
		})

	describe('post part of API', () => {

		test('valid new object can be added', async () => {
			const newBlog = await api
			.post('/api/blogs')
			.set('data-type', 'application/json')
			.send(addedBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		})

		test('added data is correct', async () => {
			const response = await api
				.get('/api/blogs')
  		const contents = response.body.map(r => r.title)

  		expect(response.body.length).toBe(initialBlogs.length + 1)
  		expect(contents).toContainEqual('This is getting way too silly')

		})
		test('no likes', async () => {
			const newBlog = await api
			.post('/api/blogs')
			.set('data-type', 'application/json')
			.send(noLikes)

			const response = await api
				.get('/api/blogs')
			const content = response.body.find(r => r.title === 'This is an ex-parrot')
			console.log('content', content)

			expect(content.likes).toBe(0)

		})
		test('no title should return 400', async () => {
			const newBlog = await api
			.post('/api/blogs')
			.set('data-type', 'application/json')
			.send(	{"author": "Graham Chapman"})
			.expect(400)
		})
		test('no url should return 400', async () => {
			const newBlog = await api
			.post('/api/blogs')
			.set('data-type', 'application/json')
			.send(	{"": "Graham Chapman"})
			.expect(400)
		})

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
