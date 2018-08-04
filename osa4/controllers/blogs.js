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
    await blog.save()
    response.status(201).json(result)


}
catch (err) {
    console.log(err);
    response.status(500).json('vituiks män')
  }
})
module.exports = blogsRouter
