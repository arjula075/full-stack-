// 31.07.2018

const blogsRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    .populate('user')
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(Blog.format(blog))
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

    // for 4.17, get the first user
    let userId = undefined
    const users = await User.find({})
    if (users === undefined || users.length == 0) {
      // array empty or does not exist
      console.log('no users')
    }
    else {
      userId = users[0]
      request.body.user = userId.id
    }

    const blog = new Blog(request.body)
    if (typeof blog.likes == 'undefined') {
      blog.likes = 0
    }
    if (!blog.url || !blog.title) {
      response.status(400).json('INCOMPLETE DATA')
    }
    else {
      const savedBlog = await blog.save()
      userId.blogs = userId.blogs.concat(savedBlog.id)
      await userId.save()
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

  if (validateBlog(updatedBlog)) {
	   await Blog
	    .findByIdAndUpdate(request.params.id, updatedBlog, { new: true } )
      response.json(Blog.format(updatedBlog))
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
