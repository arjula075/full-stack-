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

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(formatBlog(blog))
    }
    else {
      response.status(404).json("NOT FOUND")
    }

})


blogsRouter.delete('/:id', async (request, response) => {
  await Blog
	    .findByIdAndRemove(request.params.id)
    response.status(200).json("OK")
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

blogsRouter.put('/:id', async(request, response) => {

	const updatedBlog = request.body
	console.log('updatedBLog', updatedBlog)

  if (validateBlog(updatedBlog)) {
	   await Blog
	    .findByIdAndUpdate(request.params.id, updatedBlog, { new: true } )
      response.json(formatBlog(updatedBlog))
  }
  else {
    response.status(400).json('INCOMPLETE DATA')
  }

})

const validateBlog = (blog) => {

  if (!blog.title) {
    return false
  }
  if (!blog.author) {
    return false
  }
  if (!blog.url) {
    return false
  }
  if (!blog.title) {
    blog.title = 0;
    return true
  }
  return true
}


module.exports = blogsRouter
