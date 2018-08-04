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

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(formatBlog))
})

blogsRouter.post('/', async(request, response) => {
  try {
    const blog = new Blog(request.body)
    if (typeof blog.likes == 'undefined') {
      blog.likes = 0
    }
    if (!blog.url || !blog.title) {
      response.status(400).json('INCOMPLETE DATA')
    }
    else {
      await blog.save()
      response.status(201).json('CREATED')
    }


  }
  catch (err) {
    console.log(err);
    response.status(500).json('vituiks män')
  }
})
module.exports = blogsRouter
