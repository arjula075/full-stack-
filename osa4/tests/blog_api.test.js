const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')

let idToBeDeleted = ''


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

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen'
		}


beforeAll(async () => {
	// empty database

	initiateConnection()

	await Blog.remove({})
	await User.remove({})


	// add initial data
	const user = new User({ username: 'root', password: 'sekret' })
	await user.save()
	const blogObjects = initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)

	// close connection after date has been inserted
	//mongoose.connection.close()

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

	describe('delete part of API', () => {
		test('deleting addedBlog', async () => {
			let response = await api
				.get('/api/blogs')
			const content = response.body.find(r => r.title === 'This is an ex-parrot')
			idToBeDeleted = content.id
			const url = '/api/blogs/' + content.id

			//first we test that it returns now something
			response = await api
				.get('/api/blogs/' + idToBeDeleted)
					.expect(200)

			response = await api
				.delete('/api/blogs/' + idToBeDeleted)
					.expect(200)

		})
		test('testing that addedBlog cant be found again', async () => {
			response = await api
				.get('/api/blogs/' + idToBeDeleted)
					.expect(404)
		})
	})
	describe('put part of API', () => {
		// first we put that one again there
		test('put updated item there', async () => {
			const newBlog = await api
			.post('/api/blogs')
			.set('data-type', 'application/json')
			.send(noLikes)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		})

		// then we get the id
		test('get the id', async () => {
		let response = await api
			.get('/api/blogs')
			const content = response.body.find(r => r.title === 'This is an ex-parrot')
			idToBeDeleted = content.id
			console.log('idToBeDeleted', idToBeDeleted);
			console.log('idToBeDeleted', typeof idToBeDeleted);
			expect(idToBeDeleted).not.toBeUndefined()

		})

		// then we try to update it with different malformatted data

		test('no title', async () => {
			noLikes.title = undefined
			const newBlog = await api
			.put('/api/blogs/' + idToBeDeleted)
			.set('data-type', 'application/json')
			.send(noLikes)
			.expect(400)
		})
		test('no author', async () => {
			noLikes.title ='This is my theory, and it is mine'
			noLikes.author = undefined
			const newBlog = await api
			.put('/api/blogs/' + idToBeDeleted)
			.set('data-type', 'application/json')
			.send(noLikes)
			.expect(400)
		})
		test('no url', async () => {
			noLikes.author = 'Eric Idle'
			noLikes.url = undefined
			const newBlog = await api
			.put('/api/blogs/' + idToBeDeleted)
			.set('data-type', 'application/json')
			.send(noLikes)
			.expect(400)
		})


		// then with real data
		test('correct data', async () => {
			noLikes.url = 'https://muuta.muualla'
			const newBlog = await api
			.put('/api/blogs/' + idToBeDeleted)
			.set('data-type', 'application/json')
			.send(noLikes)
			.expect(200)
		})

	})

})

describe('user part of API', () => {
	test('POST /api/users succeeds with a fresh username', async () => {
		const usersBeforeOperation = await usersInDb()
		console.log('usersBeforeOperation', usersBeforeOperation)
		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAfterOperation = await usersInDb()
		console.log('usersAfterOperation', usersAfterOperation)
		for (let i = 0; i < 10; i++) {
			console.log('')
		}
		expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
		const usernames = usersAfterOperation.map(u=>u.username)
		expect(usernames).toContain(newUser.username)
	})

})

afterAll(() => {
	if (server) {
		server.close()
	}
})

const usersInDb = async() => {
	try {
    const users = await User.find({})
		return users.map(user => User.format(user))

	}
	catch (e) {
		console.log(e)
	}
}

const initiateConnection = () => {
	try {
		let url = undefined
		url = config.mongoUrl
		mongoose.connect(url)
	}
	catch (e) {
		console.log(e)
	}
}
