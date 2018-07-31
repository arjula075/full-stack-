// 31.07.2018

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  return {
    	title: blog.title,
		author: blog.author,
		url: blog.url,
		likes: blog.likes,
		id: blog._id
  }
}

blogsRouter.get('/', (request, response) => {
  console.log('in get all')
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter