// 31.07.2018

const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
	author: String,
	url: String,
	likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

 blogSchema.statics.format = function(blog) {
    const obj =  {
		title: blog.title,
		author: blog.author,
		url: blog.url,
		likes: blog.likes,

	}
	return obj
};

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
